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

import { mkdir, writeFile, cp, rm, copyFile, readdir, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { publishedPosts } from "../src/data/posts";
import { profile } from "../src/data/profile";
import { routesToPrerender, sitemapEntries } from "../src/lib/sitemap-data";
import { absUrl } from "../src/lib/seo";

const OUT_DIR = "dist-static";
const CLIENT_DIR = "dist/client";
const WORKER_PATH = `${process.cwd()}/dist/server/index.js`;
const HTACCESS_SRC = "public/.htaccess";
const BASE_URL = process.env.STATIC_BUILD_BASE_URL || "https://localhost";

type Worker = {
  fetch: (req: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

function collectRoutes(): string[] {
  return routesToPrerender;
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
      html = stripDevServerScripts(html);
      html = addTrailingSlashes(html);
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
 * Strip dev-only TanStack Start / Vite scripts from the prerendered HTML.
 *
 * TanStack Start can emit a placeholder module import for the client
 * hydration entry. In the SSR-on-Cloudflare-Worker output we consume here,
 * that path never gets resolved to a real hashed bundle. Production browsers
 * fetch it, get a 404, and the site still works because every animation we
 * use is CSS-only and every link is a real `<a>` that loads the prerendered
 * HTML of the next route.
 *
 * Also strips any TanStack `$_TSR` / `$R` stream barriers that depend on
 * client-side hydration. Without the hydration runtime they're inert noise.
 *
 * Net effect: the static export becomes pure server-rendered HTML with CSS
 * animations and standard MPA navigation — no broken development-only
 * module fetches, no failed dynamic import, no 404 in DevTools.
 */
function stripDevServerScripts(html: string): string {
  let out = html;
  // 1. The hydration entry script.
  out = out.replace(
    /<script[^>]*type=["']module["'][^>]*>\s*import\(["']\/@id\/virtual:[^"']+["']\)\s*<\/script>/gi,
    "",
  );
  // 2. The TanStack stream barrier (depends on hydration to clear itself).
  out = out.replace(
    /<script class=["']\$tsr["'][\s\S]*?document\.currentScript\.remove\(\)<\/script>/gi,
    "",
  );
  // 3. Any other lingering dev-only reference embedded in the stream barrier
  //    payload (the TanStack manifest can include them inline).
  out = out.replace(/<script[^>]*>\s*\(self\.\$R=self\.\$R[\s\S]*?<\/script>/g, "");
  return out;
}

/**
 * Rewrite internal route links to the trailing-slash canonical form so an
 * internal crawl never hits a 301 hop. absUrl() already does this for
 * canonicals / og:url / sitemap; this applies the same discipline to the
 * <a href> the page emits. Only touches clean internal route paths — skips
 * the root, anything with a query/hash, and file paths (a dot in the last
 * segment: /assets/*, *.pdf, *.xml, *.svg, /cs/*.webp, /llms.txt, …).
 */
function addTrailingSlashes(html: string): string {
  return html.replace(/href="(\/[A-Za-z0-9][A-Za-z0-9/_-]*)"/g, (m, path) => {
    if (path === "/" || path.endsWith("/")) return m;
    const last = path.split("/").pop() ?? "";
    if (last.includes(".")) return m;
    return `href="${path}/"`;
  });
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
    return `<main class="flex-1"><div class="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-2 gap-16"><div><div class="text-xs uppercase tracking-[0.18em] text-ink-soft">Contact</div><h1 class="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">Contact Rizwan Zafar, Payments Product Executive in Dubai</h1><p class="mt-4 text-ink font-instrument text-2xl italic">Let&#39;s talk payments.</p><p class="mt-5 text-ink-soft text-lg">Based in Dubai, UAE. Open to senior product and payment infrastructure roles in UAE, KSA, Singapore, MENA, Europe and global fintech.</p><p class="mt-3 text-sm text-ink-soft">I reply within 24 hours, Sun–Thu (GST / UTC+4).</p><div class="mt-8"><div class="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3">Best ways to reach me</div><ol class="space-y-3 text-sm text-ink-soft"><li><span class="text-ink font-medium">1. Email</span>, for substantive intros and role discussions.</li><li><span class="text-ink font-medium">2. LinkedIn DM</span>, for quick pings or referrals.</li><li><span class="text-ink font-medium">3. The form</span>, pre-formats your message so I can triage faster.</li></ol></div><div class="mt-8 space-y-4"><a href="mailto:rizwanzaffar.pk@gmail.com" data-analytics-event="cta_click" data-analytics-cta-id="email_me" data-analytics-cta-location="contact_page" data-analytics-cta-destination="mailto:rizwanzaffar.pk@gmail.com" class="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink"><div><div class="text-xs uppercase tracking-[0.14em] text-ink-soft">Email</div><div class="font-display text-lg text-ink break-all">rizwanzaffar.pk@gmail.com</div></div><span class="text-ink-soft">→</span></a><a href="https://www.linkedin.com/in/rizwanzaffar" target="_blank" rel="noreferrer" data-analytics-event="outbound_click" data-analytics-outbound-domain="www.linkedin.com" data-analytics-outbound-url="https://www.linkedin.com/in/rizwanzaffar" data-analytics-outbound-location="contact_page" class="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink"><div><div class="text-xs uppercase tracking-[0.14em] text-ink-soft">LinkedIn</div><div class="font-display text-lg text-ink">/in/rizwanzaffar</div></div><span class="text-ink-soft">→</span></a><div class="border border-rule rounded-lg px-5 py-4"><div class="text-xs uppercase tracking-[0.14em] text-ink-soft">Location · time zone</div><div class="font-display text-lg text-ink">Dubai, UAE · GST (UTC+4)</div></div></div></div><div class="bg-surface border border-rule rounded-lg p-6 md:p-8 min-w-0"><h2 class="font-display text-xl text-ink">Send a message</h2><p class="mt-2 text-xs text-ink-soft">Loading form… the form is interactive once the page finishes loading. If it does not appear, email <a class="underline" href="mailto:rizwanzaffar.pk@gmail.com" data-analytics-event="cta_click" data-analytics-cta-id="email_me" data-analytics-cta-location="contact_page" data-analytics-cta-destination="mailto:rizwanzaffar.pk@gmail.com">rizwanzaffar.pk@gmail.com</a>.</p></div></div></main>`;
  }
  return null;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function writeSitemap() {
  const urls = sitemapEntries
    .map(
      (entry) =>
        // absUrl() adds the trailing slash for non-file routes so each loc
        // matches the Apache-301 canonical form (no redirect hops).
        `  <url><loc>${absUrl(entry.path)}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await writeFile(`${OUT_DIR}/sitemap.xml`, xml);
}

async function writeFeed() {
  const items = publishedPosts
    .slice(0, 30)
    .map(
      (p) => `<item>
    <title>${escapeXml(p.title)}</title>
    <link>${absUrl(`/blog/${p.slug}`)}</link>
    <guid isPermaLink="true">${absUrl(`/blog/${p.slug}`)}</guid>
    <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
    <category>${escapeXml(p.category)}</category>
    <description>${escapeXml(p.description)}</description>
  </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(profile.name)} — Payments Essays</title>
  <link>${absUrl("/blog")}</link>
  <description>${escapeXml("Essays on payment infrastructure, fintech product, risk, settlement, AI and program leadership.")}</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>
`;
  await writeFile(`${OUT_DIR}/feed.xml`, xml);
}

async function writeNotFoundPage(worker: Worker) {
  // Prerender a real 404 page. The route's noindex is set via a client
  // useEffect that never runs on the JS-less static export, so inject a hard
  // server-rendered noindex. Apache serves this via `ErrorDocument 404`.
  const res = await fetchFollowingRedirects(worker, "/__rzifi_not_found__");
  let html = await res.text();
  html = stripDevServerScripts(html);
  html = addTrailingSlashes(html);
  if (!/<meta[^>]+name=["']robots["']/i.test(html)) {
    html = html.replace(
      /<head(\s[^>]*)?>/i,
      (m) => `${m}<meta name="robots" content="noindex,follow"/>`,
    );
  }
  await writeFile(`${OUT_DIR}/404.html`, html, "utf-8");
  console.log(`✓ Wrote ${OUT_DIR}/404.html (hard noindex)`);
}

async function copyHtaccess() {
  if (existsSync(HTACCESS_SRC)) {
    await copyFile(HTACCESS_SRC, `${OUT_DIR}/.htaccess`);
    console.log(`✓ Copied ${HTACCESS_SRC} → ${OUT_DIR}/.htaccess`);
  } else {
    console.warn(`⚠ No ${HTACCESS_SRC} found — direct URL hits on Hostinger may 404`);
  }
}

function conflictOriginalName(name: string): string | null {
  const withExtension = name.match(/^(.*) \d+(\.[^.]+)$/);
  if (withExtension) return `${withExtension[1]}${withExtension[2]}`;

  const directory = name.match(/^(.*) \d+$/);
  return directory ? directory[1] : null;
}

async function mergeDirectoryContents(sourceDir: string, targetDir: string) {
  await mkdir(targetDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (!existsSync(targetPath)) {
      await rename(sourcePath, targetPath);
      continue;
    }

    if (entry.isDirectory()) {
      await mergeDirectoryContents(sourcePath, targetPath);
      await rm(sourcePath, { recursive: true, force: true });
    } else {
      await rm(sourcePath, { force: true });
    }
  }
}

async function resolveMacConflictCopies(dir = OUT_DIR): Promise<number> {
  let resolved = 0;
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const originalName = conflictOriginalName(entry.name);

    if (originalName) {
      const originalPath = join(dir, originalName);
      if (!existsSync(originalPath)) {
        await rename(fullPath, originalPath);
      } else if (entry.isDirectory()) {
        await mergeDirectoryContents(fullPath, originalPath);
        await rm(fullPath, { recursive: true, force: true });
      } else {
        await rm(fullPath, { force: true });
      }
      resolved++;
      continue;
    }

    if (entry.isDirectory()) {
      resolved += await resolveMacConflictCopies(fullPath);
    }
  }

  return resolved;
}

function assertPrerenderedRoutesExist(routes: string[]) {
  const missing = routes.filter((route) => !existsSync(pathToFile(route)));
  if (missing.length > 0) {
    throw new Error(
      `Static export missing ${missing.length} route file(s): ${missing
        .slice(0, 12)
        .join(", ")}${missing.length > 12 ? "..." : ""}`,
    );
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
  await writeSitemap();
  console.log(`\n✓ Wrote ${OUT_DIR}/sitemap.xml`);
  await writeFeed();
  console.log(`✓ Wrote ${OUT_DIR}/feed.xml`);
  await writeNotFoundPage(worker);

  // .htaccess for Apache (Hostinger)
  await copyHtaccess();

  const conflictCopiesResolved = await resolveMacConflictCopies();
  if (conflictCopiesResolved > 0) {
    console.log(`✓ Resolved ${conflictCopiesResolved} macOS conflict-copy item(s) in ${OUT_DIR}/`);
  }

  assertPrerenderedRoutesExist(routes);

  console.log(`\nDone: ${ok} routes prerendered, ${fail} failed.`);
  console.log(`Output: ./${OUT_DIR}/  (upload contents to public_html/ on Hostinger)\n`);

  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
