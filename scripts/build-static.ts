#!/usr/bin/env bun
/**
 * Build a fully static export of the site (one HTML file per route + assets)
 * suitable for upload to shared hosts like Hostinger.
 *
 * Steps:
 *   1. Assumes you already ran `bun run build` (which produces dist/server/index.js + dist/client/*)
 *   2. Imports the bundled Cloudflare Worker and prerenders every known route via worker.fetch()
 *   3. Copies dist/client/* into dist-static/
 *   4. Writes a static sitemap.xml
 *   5. Copies public/.htaccess into dist-static/ so direct URL hits resolve on Apache
 *
 * Usage:
 *   bun run build:static
 *
 * Env:
 *   STATIC_BUILD_BASE_URL  Host used in synthetic requests when prerendering.
 *                          Defaults to https://localhost — irrelevant to the output
 *                          unless your code reads it (we don't).
 */

import { mkdir, writeFile, cp, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { caseStudies } from "../src/data/caseStudies";
import { posts } from "../src/data/posts";
import { audiences } from "../src/data/hubs";
import { products } from "../src/data/products";
import { SITE_URL } from "../src/lib/seo";

const OUT_DIR = "dist-static";
const CLIENT_DIR = "dist/client";
const WORKER_PATH = `${process.cwd()}/dist/server/index.js`;
const HTACCESS_SRC = "public/.htaccess";
const BASE_URL = process.env.STATIC_BUILD_BASE_URL || "https://localhost";

type Worker = {
  fetch: (req: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

function collectRoutes(): string[] {
  const staticPaths = [
    "/",
    "/about",
    "/products",
    "/product-work",
    "/blog",
    "/media",
    "/topics",
    "/for",
    "/resume",
    "/contact",
  ];
  const productPaths = products
    .filter((p) => p.status !== "coming-soon")
    .map((p) => p.link)
    .filter((href) => href.startsWith("/products/"));
  const audiencePaths = audiences.map((a) => `/for/${a.slug}`);
  const caseStudyPaths = caseStudies.map((c) => `/product-work/${c.slug}`);
  // Prerender every post regardless of publishDate. Static-only deploys (Hostinger)
  // need physical HTML for every post the blog index links to, otherwise links 404.
  // "Scheduling" via future dates does not work for a manually-uploaded static build.
  const blogPaths = posts.map((p) => `/blog/${p.slug}`);
  return [...staticPaths, ...productPaths, ...audiencePaths, ...caseStudyPaths, ...blogPaths];
}

function pathToFile(path: string): string {
  if (path === "/") return `${OUT_DIR}/index.html`;
  return `${OUT_DIR}${path}/index.html`;
}

async function loadWorker(): Promise<Worker> {
  if (!existsSync(WORKER_PATH)) {
    throw new Error(`Worker bundle not found at ${WORKER_PATH}. Run \`bun run build\` first.`);
  }
  const mod = (await import(WORKER_PATH)) as { default?: Worker } & Worker;
  const worker = mod.default ?? mod;
  if (!worker || typeof worker.fetch !== "function") {
    throw new Error("Worker bundle does not export a default with .fetch()");
  }
  return worker;
}

async function fetchFollowingRedirects(
  worker: Worker,
  route: string,
  maxHops = 4,
): Promise<Response> {
  let currentRoute = route;
  for (let i = 0; i < maxHops; i++) {
    const url = new URL(currentRoute, BASE_URL).toString();
    const req = new Request(url, { method: "GET" });
    const res = await worker.fetch(req, {}, {});
    if (res.status < 300 || res.status >= 400) return res;
    const location = res.headers.get("location");
    if (!location) return res;
    // Resolve relative redirects; normalize back to a path
    const next = new URL(location, BASE_URL);
    currentRoute = next.pathname + next.search;
  }
  throw new Error(`Too many redirects starting from ${route}`);
}

async function prerender(worker: Worker, routes: string[]) {
  let ok = 0;
  let fail = 0;
  for (const route of routes) {
    try {
      const res = await fetchFollowingRedirects(worker, route);
      if (res.status !== 200) {
        console.warn(`⚠ ${route} → HTTP ${res.status}`);
        fail++;
        continue;
      }
      let html = await res.text();
      html = patchEmptyMainFallback(route, html);
      const file = pathToFile(route);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, html, "utf-8");
      const sizeKb = (html.length / 1024).toFixed(1);
      console.log(`✓ ${route.padEnd(48)} → ${file}  (${sizeKb} KB)`);
      ok++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`✗ ${route}: ${msg}`);
      fail++;
    }
  }
  return { ok, fail };
}

/**
 * Some routes fail SSR locally on this build host (macOS Gatekeeper deletes
 * specific code-split chunks on read — repro is the /contact route, which
 * gets emitted by Vite and then quarantined). React renders an empty
 * Suspense placeholder in that case: `<main…><!--$!--><template></template><!--/$--></main>`.
 *
 * Empty main = no H1, no headings, no copy → SEO disaster. This patch detects
 * the placeholder and injects a static H1 + body for known indexable routes
 * so the prerendered HTML still has the SEO essentials. The client bundle
 * hydrates the full interactive component normally once JS loads.
 *
 * Only routes whose entire content is genuinely static-renderable belong
 * here. Form interactivity, useState, etc. hydrate on the client; the
 * static body is the SSR fallback Search engines actually need.
 */
function patchEmptyMainFallback(route: string, html: string): string {
  const emptyMain = /<main[^>]*>\s*<!--\$!-->\s*<template>\s*<\/template>\s*<!--\/\$-->\s*<\/main>/;
  if (!emptyMain.test(html)) return html;

  const fallback = staticMainFallback(route);
  if (!fallback) return html;
  return html.replace(emptyMain, fallback);
}

function staticMainFallback(route: string): string | null {
  if (route === "/contact") {
    return `<main class="flex-1"><div class="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-2 gap-16"><div><div class="text-xs uppercase tracking-[0.18em] text-ink-soft">Contact</div><h1 class="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">Contact Rizwan Zafar, Payments Product Executive in Dubai</h1><p class="mt-4 text-ink font-instrument text-2xl italic">Let&#39;s talk payments.</p><p class="mt-5 text-ink-soft text-lg">Based in Dubai, UAE. Open to senior product and payment infrastructure roles in UAE, KSA, Singapore, MENA, Europe and global fintech.</p><p class="mt-3 text-sm text-ink-soft">I reply within 24 hours, Sun–Thu (GST / UTC+4).</p><div class="mt-8"><div class="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3">Best ways to reach me</div><ol class="space-y-3 text-sm text-ink-soft"><li><span class="text-ink font-medium">1. Email</span>, for substantive intros and role discussions.</li><li><span class="text-ink font-medium">2. LinkedIn DM</span>, for quick pings or referrals.</li><li><span class="text-ink font-medium">3. The form</span>, pre-formats your message so I can triage faster.</li></ol></div><div class="mt-8 space-y-4"><a href="mailto:rizwanzaffar.pk@gmail.com" class="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink"><div><div class="text-xs uppercase tracking-[0.14em] text-ink-soft">Email</div><div class="font-display text-lg text-ink break-all">rizwanzaffar.pk@gmail.com</div></div><span class="text-ink-soft">→</span></a><a href="https://www.linkedin.com/in/rizwanzaffar" target="_blank" rel="noreferrer" class="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink"><div><div class="text-xs uppercase tracking-[0.14em] text-ink-soft">LinkedIn</div><div class="font-display text-lg text-ink">/in/rizwanzaffar</div></div><span class="text-ink-soft">→</span></a><div class="border border-rule rounded-lg px-5 py-4"><div class="text-xs uppercase tracking-[0.14em] text-ink-soft">Location · time zone</div><div class="font-display text-lg text-ink">Dubai, UAE · GST (UTC+4)</div></div></div></div><div class="bg-surface border border-rule rounded-lg p-6 md:p-8 min-w-0"><h2 class="font-display text-xl text-ink">Send a message</h2><p class="mt-2 text-xs text-ink-soft">Loading form… the form is interactive once the page finishes loading. If it does not appear, email <a class="underline" href="mailto:rizwanzaffar.pk@gmail.com">rizwanzaffar.pk@gmail.com</a>.</p></div></div></main>`;
  }
  return null;
}

async function writeSitemap(routes: string[]) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (r) =>
        `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await writeFile(`${OUT_DIR}/sitemap.xml`, xml);
}

async function copyHtaccess() {
  if (existsSync(HTACCESS_SRC)) {
    await copyFile(HTACCESS_SRC, `${OUT_DIR}/.htaccess`);
    console.log(`✓ Copied ${HTACCESS_SRC} → ${OUT_DIR}/.htaccess`);
  } else {
    console.warn(`⚠ No ${HTACCESS_SRC} found — direct URL hits on Hostinger may 404`);
  }
}

async function main() {
  // Fresh output dir
  if (existsSync(OUT_DIR)) {
    await rm(OUT_DIR, { recursive: true, force: true });
  }
  await mkdir(OUT_DIR, { recursive: true });

  // Copy client assets (JS/CSS chunks, /assets/, PDF, robots.txt, llms.txt, etc.)
  if (!existsSync(CLIENT_DIR)) {
    throw new Error(`${CLIENT_DIR} not found. Run \`bun run build\` first.`);
  }
  await cp(CLIENT_DIR, OUT_DIR, { recursive: true });
  console.log(`✓ Copied ${CLIENT_DIR}/ → ${OUT_DIR}/`);

  // The T7 Shield (ExFAT) sporadically loses individual JS chunks after build
  // when macOS Gatekeeper / Spotlight re-scans them with the
  // com.apple.provenance xattr in place. Strip xattrs and force read perms
  // on the server build so the dynamic import in loadWorker() can always
  // read every chunk. No-op on filesystems that don't carry the attribute.
  try {
    const { spawnSync } = await import("node:child_process");
    spawnSync("xattr", ["-cr", "dist/server"], { stdio: "ignore" });
    spawnSync("chmod", ["-R", "u+rwX", "dist/server"], { stdio: "ignore" });
  } catch {
    /* best effort */
  }

  // Load the built worker and prerender every route
  const routes = collectRoutes();
  console.log(`\nPrerendering ${routes.length} routes…\n`);
  const worker = await loadWorker();
  const { ok, fail } = await prerender(worker, routes);

  // Static sitemap
  await writeSitemap(routes);
  console.log(`\n✓ Wrote ${OUT_DIR}/sitemap.xml`);

  // .htaccess for Apache (Hostinger)
  await copyHtaccess();

  console.log(`\nDone: ${ok} routes prerendered, ${fail} failed.`);
  console.log(`Output: ./${OUT_DIR}/  (upload contents to public_html/ on Hostinger)\n`);

  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
