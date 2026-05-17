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
  const today = new Date().toISOString().slice(0, 10);
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
  const blogPaths = posts.filter((p) => p.date <= today).map((p) => `/blog/${p.slug}`);
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
      const html = await res.text();
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
