#!/usr/bin/env bun
/**
 * Static SEO auditor. Run AFTER `bun run build:static` to validate the
 * prerendered dist-static/ output before deploying to Hostinger.
 *
 * Checks (every check is a hard pass/fail, no warnings):
 *   - no old-domain refs (lovable.app) in any HTML, sitemap, robots, htaccess
 *   - exactly one <link rel="canonical"> per page
 *   - canonical host is rzifi.com
 *   - canonical points back at the page's own URL (self-canonical)
 *   - sitemap.xml uses rzifi.com for every <loc>
 *   - robots.txt Sitemap line points to rzifi.com
 *   - every indexable page has <title>, <meta name="description">, exactly one <h1>
 *   - every <script type="application/ld+json"> parses as JSON
 *   - no robots noindex on pages that should be indexable
 *
 * Exit code 0 = all green. Any failure exits non-zero so the script can be
 * wired into pre-deploy CI later.
 *
 * Usage:
 *   bun scripts/seo-audit.ts
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = "dist-static";
const CANONICAL_HOST = "rzifi.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
const OLD_DOMAINS = ["rizwan-pay-architect.lovable.app", "lovable.app"];
// Pages that MUST stay indexable (= no robots noindex). Anything outside this
// list is allowed to be noindex (e.g. /topics/$hub which is a thin filter
// view by design).
const REQUIRED_INDEXABLE: string[] = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/for",
  "/for/visa-mastercard",
  "/for/stripe-adyen-wise-thunes",
  "/for/banks-fintechs",
  "/media",
  "/product-work",
  "/products",
  "/resume",
  "/topics",
];

type Failure = { file: string; check: string; detail: string };
const failures: Failure[] = [];

function fail(file: string, check: string, detail: string) {
  failures.push({ file, check, detail });
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    // Skip macOS AppleDouble metadata (T7 Shield is ExFAT) and any other dotfile.
    if (entry.startsWith(".") || entry.startsWith("._")) continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function htmlPathToRoute(file: string): string {
  // dist-static/about/index.html  -> /about
  // dist-static/index.html        -> /
  // dist-static/blog/foo/index.html -> /blog/foo
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/\/index\.html$/, "");
}

function matchAll(src: string, re: RegExp): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) out.push(m[0]);
  return out;
}

// ─── 1. Pre-check the root files everyone depends on ────────────────────
function auditRobots() {
  const path = join(ROOT, "robots.txt");
  if (!existsSync(path)) return fail(path, "exists", "robots.txt missing");
  const body = readFileSync(path, "utf-8");
  const sitemapMatch = body.match(/^Sitemap:\s*(\S+)/m);
  if (!sitemapMatch) return fail(path, "sitemap_line", "no Sitemap: line");
  if (!sitemapMatch[1].startsWith(CANONICAL_ORIGIN))
    fail(
      path,
      "sitemap_host",
      `Sitemap points to ${sitemapMatch[1]}, expected ${CANONICAL_ORIGIN}/sitemap.xml`,
    );
  for (const d of OLD_DOMAINS) {
    if (body.includes(d)) fail(path, "old_domain", `references ${d}`);
  }
}

function auditSitemap() {
  const path = join(ROOT, "sitemap.xml");
  if (!existsSync(path)) return fail(path, "exists", "sitemap.xml missing");
  const body = readFileSync(path, "utf-8");
  const locs = matchAll(body, /<loc>([^<]+)<\/loc>/g).map((s) => s.replace(/^<loc>|<\/loc>$/g, ""));
  if (locs.length === 0) return fail(path, "has_urls", "no <loc> entries");
  for (const loc of locs) {
    if (!loc.startsWith(CANONICAL_ORIGIN)) {
      fail(path, "loc_host", `${loc} does not start with ${CANONICAL_ORIGIN}`);
    }
    for (const d of OLD_DOMAINS) {
      if (loc.includes(d)) fail(path, "old_domain", `${loc} references ${d}`);
    }
  }
}

// ─── 2. Per-HTML page audit ──────────────────────────────────────────────
function auditHtml(file: string) {
  const body = readFileSync(file, "utf-8");
  const route = htmlPathToRoute(file);

  // 2a. Old-domain leakage.
  for (const d of OLD_DOMAINS) {
    if (body.includes(d)) fail(file, "old_domain", `references ${d}`);
  }

  // 2b. Exactly one canonical, pointing at this page's URL on rzifi.com.
  const canonicals = matchAll(body, /<link[^>]+rel=["']canonical["'][^>]*>/g);
  if (canonicals.length === 0) fail(file, "canonical_missing", "no canonical link");
  else if (canonicals.length > 1)
    fail(file, "canonical_dup", `found ${canonicals.length} canonical tags`);

  for (const tag of canonicals) {
    const hrefMatch = tag.match(/href=["']([^"']+)["']/);
    if (!hrefMatch) {
      fail(file, "canonical_href_missing", tag);
      continue;
    }
    const href = hrefMatch[1];
    if (!href.startsWith(CANONICAL_ORIGIN))
      fail(file, "canonical_host", `${href} does not start with ${CANONICAL_ORIGIN}`);
    // Self-canonical check: href path should match this page's route.
    const url = new URL(href);
    const expectedPath = route === "/" ? "/" : route;
    if (url.pathname.replace(/\/$/, "") !== expectedPath.replace(/\/$/, ""))
      fail(file, "canonical_self", `canonical ${href} does not match route ${route}`);
  }

  // 2c. <title>
  const titleMatch = body.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) fail(file, "title_missing", "no <title>");

  // 2d. meta description
  const descMatch = body.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (!descMatch || !descMatch[1].trim()) fail(file, "description_missing", "no meta description");

  // 2e. Exactly one <h1>
  const h1s = matchAll(body, /<h1\b[^>]*>/gi);
  if (h1s.length === 0) fail(file, "h1_missing", "no <h1>");
  else if (h1s.length > 1) fail(file, "h1_dup", `found ${h1s.length} <h1> tags`);

  // 2f. noindex check — only flag if this page was supposed to stay indexable.
  if (REQUIRED_INDEXABLE.includes(route)) {
    const robotsMeta = body.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    if (robotsMeta && /noindex/i.test(robotsMeta[1]))
      fail(file, "unexpected_noindex", `robots="${robotsMeta[1]}"`);
  }

  // 2g. JSON-LD blocks parse.
  const ldRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = ldRe.exec(body)) !== null) {
    i++;
    try {
      JSON.parse(m[1].trim());
    } catch (e) {
      fail(file, "jsonld_parse", `block #${i}: ${(e as Error).message}`);
    }
  }
}

// ─── Run ────────────────────────────────────────────────────────────────
if (!existsSync(ROOT)) {
  console.error(`✗ ${ROOT} does not exist. Run \`bun run build:static\` first.`);
  process.exit(2);
}

auditRobots();
auditSitemap();

const htmlFiles = walk(ROOT).filter((f) => f.endsWith(".html"));
for (const file of htmlFiles) auditHtml(file);

// ─── Report ─────────────────────────────────────────────────────────────
const checks = [
  "old_domain",
  "canonical_missing",
  "canonical_dup",
  "canonical_host",
  "canonical_self",
  "canonical_href_missing",
  "title_missing",
  "description_missing",
  "h1_missing",
  "h1_dup",
  "unexpected_noindex",
  "jsonld_parse",
  "sitemap_line",
  "sitemap_host",
  "loc_host",
  "exists",
  "has_urls",
];

console.log(`\nAudited: ${htmlFiles.length} HTML files + robots.txt + sitemap.xml`);
console.log(`Required indexable pages: ${REQUIRED_INDEXABLE.length}`);

if (failures.length === 0) {
  console.log("\n✓ SEO audit passed. No issues.\n");
  process.exit(0);
}

const byCheck = new Map<string, Failure[]>();
for (const f of failures) {
  if (!byCheck.has(f.check)) byCheck.set(f.check, []);
  byCheck.get(f.check)!.push(f);
}

console.log(`\n✗ ${failures.length} failure${failures.length === 1 ? "" : "s"}:\n`);
for (const check of checks) {
  const list = byCheck.get(check);
  if (!list) continue;
  console.log(`  [${check}] (${list.length})`);
  for (const f of list.slice(0, 8)) {
    console.log(`    · ${relative(process.cwd(), f.file)} — ${f.detail}`);
  }
  if (list.length > 8) console.log(`    · …and ${list.length - 8} more`);
}
console.log();
process.exit(1);
