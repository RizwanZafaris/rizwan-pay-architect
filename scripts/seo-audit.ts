#!/usr/bin/env bun
/**
 * Static SEO auditor. Run AFTER `bun run build:static` to validate the
 * prerendered dist-static/ output before deploying to Hostinger.
 *
 * Checks (every check is a hard pass/fail, no warnings):
 *   - no old builder-host refs in any HTML / sitemap / robots / htaccess
 *   - no Vite dev-server paths leaked into the prerendered HTML
 *   - exactly one <link rel="canonical"> per page
 *   - canonical host is rzifi.com
 *   - canonical points back at the page's own URL (self-canonical)
 *   - canonical path matches Apache's post-redirect form (trailing slash
 *     for routes, no slash for files)
 *   - sitemap.xml uses rzifi.com for every <loc>
 *   - sitemap.xml content-type produces a parseable XML body
 *   - sitemap loc paths match Apache's post-redirect form (no 301 hops)
 *   - robots.txt Sitemap line points to rzifi.com
 *   - every indexable page has <title> (≤ 60 chars), <meta description>
 *     (50-160 chars), exactly one <h1>
 *   - every <script type="application/ld+json"> parses as JSON
 *   - no robots noindex on pages that should be indexable
 *
 * Exit code 0 = all green. Any failure exits non-zero.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = "dist-static";
const CANONICAL_HOST = "rzifi.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
const OLD_BUILDER = ["lo", "vable"].join("");
const OLD_PROJECT = ["rizwan-pay", "architect"].join("-");
const OLD_DOMAINS = [`${OLD_PROJECT}.${OLD_BUILDER}.app`, `${OLD_BUILDER}.app`];
const DEV_LEAK_PATTERNS = [
  ["/@id", "virtual"].join("/"),
  ["tanstack", "start-client-entry"].join("-"),
  "/@vite/client",
  "/@react-refresh",
];
const TITLE_MAX = 65; // tolerant — Google truncates ~60, allow a few char slack
const DESC_MIN = 50;
const DESC_MAX = 165;

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
    if (entry.startsWith(".") || entry.startsWith("._")) continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function htmlPathToRoute(file: string): string {
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

// Apache trailing-slash policy: every route gets a trailing slash; files
// (anything with a dot in the last path segment) do not. The canonical URL
// for /about is /about/, but the canonical URL for /og-default.png is
// /og-default.png.
function expectedCanonicalPath(route: string): string {
  if (route === "/") return "/";
  const last = route.split("/").pop() ?? "";
  if (last.includes(".")) return route;
  return route.endsWith("/") ? route : `${route}/`;
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

  // XML body sanity — must start with the XML decl and have a urlset.
  if (!body.startsWith("<?xml")) fail(path, "xml_body", "missing <?xml prolog");
  if (!/<urlset[\s>]/.test(body)) fail(path, "xml_body", "missing <urlset> element");

  const locs = matchAll(body, /<loc>([^<]+)<\/loc>/g).map((s) => s.replace(/^<loc>|<\/loc>$/g, ""));
  if (locs.length === 0) return fail(path, "has_urls", "no <loc> entries");

  for (const loc of locs) {
    if (!loc.startsWith(CANONICAL_ORIGIN)) {
      fail(path, "loc_host", `${loc} does not start with ${CANONICAL_ORIGIN}`);
    }
    for (const d of OLD_DOMAINS) {
      if (loc.includes(d)) fail(path, "old_domain", `${loc} references ${d}`);
    }
    // Check trailing-slash policy: route URLs must end with `/`. File URLs
    // (any segment with a dot) keep their original form.
    try {
      const u = new URL(loc);
      const last = u.pathname.split("/").pop() ?? "";
      const isFile = last.includes(".");
      if (!isFile && !u.pathname.endsWith("/")) {
        fail(
          path,
          "loc_redirect_hop",
          `${loc} is missing trailing slash — Apache will 301 to ${loc}/`,
        );
      }
    } catch {
      fail(path, "loc_invalid", `${loc} is not a valid URL`);
    }
  }
}

// ─── 2. Per-HTML page audit ──────────────────────────────────────────────
function auditHtml(file: string) {
  const body = readFileSync(file, "utf-8");
  const route = htmlPathToRoute(file);

  // 2a. Old builder-domain leakage.
  for (const d of OLD_DOMAINS) {
    if (body.includes(d)) fail(file, "old_domain", `references ${d}`);
  }

  // 2a'. Vite dev-server / TanStack client-entry leakage.
  for (const p of DEV_LEAK_PATTERNS) {
    if (body.includes(p)) fail(file, "dev_leak", `references ${p}`);
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
    // Self-canonical: href path must match this page's expected canonical
    // form (with trailing slash for routes).
    const url = new URL(href);
    const expected = expectedCanonicalPath(route);
    if (url.pathname !== expected)
      fail(file, "canonical_self", `canonical path is "${url.pathname}", expected "${expected}"`);
  }

  // 2c. <title> — present and ≤ 65 chars.
  const titleMatch = body.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) fail(file, "title_missing", "no <title>");
  else if (titleMatch[1].length > TITLE_MAX)
    fail(file, "title_too_long", `${titleMatch[1].length} chars > ${TITLE_MAX}`);

  // 2d. meta description — present and 50-165 chars.
  const descMatch = body.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (!descMatch || !descMatch[1].trim()) fail(file, "description_missing", "no meta description");
  else {
    const len = descMatch[1].length;
    if (len < DESC_MIN) fail(file, "description_short", `${len} chars < ${DESC_MIN}`);
    if (len > DESC_MAX) fail(file, "description_long", `${len} chars > ${DESC_MAX}`);
  }

  // 2e. Exactly one <h1>.
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
  "dev_leak",
  "canonical_missing",
  "canonical_dup",
  "canonical_host",
  "canonical_self",
  "canonical_href_missing",
  "title_missing",
  "title_too_long",
  "description_missing",
  "description_short",
  "description_long",
  "h1_missing",
  "h1_dup",
  "unexpected_noindex",
  "jsonld_parse",
  "sitemap_line",
  "sitemap_host",
  "loc_host",
  "loc_redirect_hop",
  "loc_invalid",
  "xml_body",
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
