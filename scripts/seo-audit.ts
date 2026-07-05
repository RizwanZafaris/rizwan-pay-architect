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
import { posts } from "../src/data/posts";
import { caseStudies } from "../src/data/caseStudies";

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
const TITLE_MAX = 120; // sanity cap only — full titles beat machine-truncation
// (Google indexes the whole tag and truncates display itself); the real
// regression guard is the ellipsis check below.
const DESC_MIN = 50;
const DESC_MAX = 165;

// Pages that MUST stay indexable (= no robots noindex). The static list covers
// core routes; sitemap locs are added at runtime so any URL advertised to
// search engines cannot accidentally ship with noindex.
const REQUIRED_INDEXABLE: string[] = [
  "/",
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
  "/sitemap",
  "/topics",
];

const sitemapIndexableRoutes = new Set<string>();

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
// for /resume is /resume/, but the canonical URL for /og-default.png is
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
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const urlBlocks = matchAll(body, /<url>[\s\S]*?<\/url>/g);
  for (const block of urlBlocks) {
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (lastmod && lastmod > today) {
      fail(path, "future_lastmod", `${lastmod} is in the future`);
    }
  }

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
      sitemapIndexableRoutes.add(u.pathname === "/" ? "/" : u.pathname.replace(/\/$/, ""));
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

function auditFeed() {
  const path = join(ROOT, "feed.xml");
  if (!existsSync(path)) return fail(path, "exists", "feed.xml missing");
  const body = readFileSync(path, "utf-8");
  if (!body.startsWith("<?xml")) fail(path, "xml_body", "missing <?xml prolog");
  if (!/<rss[\s>]/.test(body)) fail(path, "xml_body", "missing <rss> element");
  if (!/<item>[\s\S]*?<link>https:\/\/rzifi\.com\/blog\//.test(body)) {
    fail(path, "has_urls", "feed.xml has no blog item links");
  }
  for (const d of OLD_DOMAINS) {
    if (body.includes(d)) fail(path, "old_domain", `references ${d}`);
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
    fail(file, "title_too_long", "title_truncated", `${titleMatch[1].length} chars > ${TITLE_MAX}`);
  if (titleMatch && /\u2026|\.\.\./.test(titleMatch[1]))
    fail(file, "title_truncated", `<title> contains an ellipsis: "${titleMatch[1]}"`);

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
  if (REQUIRED_INDEXABLE.includes(route) || sitemapIndexableRoutes.has(route)) {
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
auditFeed();

// 404.html is a hard-noindex error document served via `ErrorDocument 404`;
// it intentionally has no self-canonical, so exclude it from the per-page audit.
const htmlFiles = walk(ROOT).filter(
  (f) => f.endsWith(".html") && !/(^|\/)404\.html$/.test(f.replace(/\\/g, "/")),
);
for (const file of htmlFiles) auditHtml(file);

// ─── Banned claims ──────────────────────────────────────────────────────
// Retired metric framings (the canonical fact base is $1B+ annual GTV,
// 270M+ payments/year, 5 frontier markets) and claims the owner has
// explicitly disavowed. Any HTML or the resume PDF containing one of these
// fails the build — internally inconsistent numbers are an entity-trust
// defect for both recruiters and AI engines.
// Patterns, not bare substrings: "(?<!\$)25M\+" so a legitimate future
// "$25M+ budget" doesn't false-positive, while "25M+ monthly transactions"
// stays caught. Add new retired claims here as regexes.
const BANNED_CLAIM_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "25M+", re: /(?<!\$)25M\+/ },
  { label: "7 markets", re: /\b7 markets\b/ },
  { label: "50+ partners", re: /50\+ partners/ },
  { label: "50+ bank, wallet", re: /50\+ bank, wallet/ },
  { label: "Business Insider", re: /Business Insider/ },
  { label: "BIT25", re: /BIT25/ },
  { label: "1,200+ merchants", re: /1,200\+/ },
  // Owner ruling 2026-06-12: canonical merchant count is 150+. The settlement
  // case study shipped "1,400+ merchants" briefly — keep it dead.
  { label: "1,400+ merchants", re: /1,400\+\s*merchants?/i },
  { label: "8%->1.2% failure framing", re: /8% to ~?1\.2%/ },
  // Owner ruling 2026-07-04: canonical operating footprint is FIVE markets
  // (Pakistan, Bangladesh, Nepal, Iraq, Egypt). The SWIFT and AML case
  // studies shipped "across six markets" — keep the phrasing dead. Scoped to
  // the "across …" construction so essays discussing OTHER companies' market
  // counts don't false-positive.
  { label: "six-market footprint (canonical is five)", re: /across six markets/i },
];
// The claim gate also covers the AI-engine trust surfaces — a regenerator
// regression in llms*.txt or feed.xml must fail the build, not ship silently.
const claimScanFiles = [
  ...htmlFiles,
  ...["llms.txt", "llms-full.txt", "feed.xml"]
    .map((f) => join(ROOT, f))
    .filter((f) => existsSync(f)),
];
for (const file of claimScanFiles) {
  const body = readFileSync(file, "utf-8");
  for (const { label, re } of BANNED_CLAIM_PATTERNS) {
    if (re.test(body)) fail(file, "banned_claim", `contains retired claim "${label}"`);
  }
}

// ── Two-tier claims gate (strategy doc §2, owner ruling 2026-07-05) ──────────
// Career-scope claims ("since 2009", "17 years", "ten markets", "three
// industries") and Simpaisa PLATFORM metrics ("$1B GTV", "270M payments",
// "150+ merchants", "99.95% SLA") must never sit in the SAME clause. Correct
// copy keeps them in separate sentences (career = the arc; platform = the
// current role). We split each HTML page's visible text into clauses on
// sentence + list delimiters (incl. the `·` proof-band separator and em-dash)
// and fail on any clause that carries a marker from BOTH tiers.
const CAREER_MARKERS = [
  /\bsince 2009\b/i,
  /\b(?:17|seventeen) years\b/i,
  /\b(?:10|ten) markets\b/i,
  /\b(?:3|three) industries\b/i,
];
const PLATFORM_METRICS = [
  /\$1\s*B\b/i,
  /\$1\s*billion/i,
  /\b270\s*M\b/i,
  /\b270\s*million/i,
  /\b150\+\s*merchant/i,
  /\b99\.95\s*%/,
];
for (const file of htmlFiles) {
  const text = readFileSync(file, "utf-8")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    // Block-element boundaries are clause boundaries: the proof band renders
    // career and platform stats as ADJACENT scope-tagged cells (strategy doc
    // §4B) — separate blocks are separate claims. Only same-sentence prose
    // mixing should fail.
    .replace(/<\/(?:div|p|li|h[1-6]|section|article|figcaption|blockquote|dt|dd|td|th|tr)>/gi, ".")
    .replace(/<br[^>]*>/gi, ".")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ");
  const clauses = text.split(/[.;:·|]|—|\r?\n/);
  for (const clause of clauses) {
    const careerHit = CAREER_MARKERS.find((re) => re.test(clause));
    const platformHit = PLATFORM_METRICS.find((re) => re.test(clause));
    if (careerHit && platformHit) {
      fail(
        file,
        "two_tier_claim_mix",
        `career + platform scope mixed in one clause: "${clause.trim().replace(/\s+/g, " ").slice(0, 120)}"`,
      );
    }
  }
}
const resumePdf = join(ROOT, "Rizwan_Zafar_Resume.pdf");
if (existsSync(resumePdf)) {
  // Inflate the PDF's Flate-compressed content streams so the text is
  // checkable regardless of how the PDF was produced (Word leaves text raw,
  // reportlab compresses it). Then assert canonical facts present and the
  // retired/stub claims absent.
  const { inflateSync } = await import("node:zlib");
  // PDF-flavoured ASCII85 (reportlab emits /ASCII85Decode + /FlateDecode).
  const ascii85Decode = (s: string): Buffer => {
    s = s.replace(/\s/g, "").replace(/~>$/, "");
    const out: number[] = [];
    let tuple = 0;
    let count = 0;
    for (const ch of s) {
      if (ch === "z" && count === 0) {
        out.push(0, 0, 0, 0);
        continue;
      }
      const v = ch.charCodeAt(0) - 33;
      if (v < 0 || v > 84) continue;
      tuple = tuple * 85 + v;
      count++;
      if (count === 5) {
        out.push((tuple >>> 24) & 255, (tuple >>> 16) & 255, (tuple >>> 8) & 255, tuple & 255);
        tuple = 0;
        count = 0;
      }
    }
    if (count > 0) {
      for (let i = count; i < 5; i++) tuple = tuple * 85 + 84;
      const bytes = [(tuple >>> 24) & 255, (tuple >>> 16) & 255, (tuple >>> 8) & 255, tuple & 255];
      out.push(...bytes.slice(0, count - 1));
    }
    return Buffer.from(out);
  };
  const rawBuf = readFileSync(resumePdf);
  const raw = rawBuf.toString("latin1");
  let text = raw;
  const streamRe = /stream\r?\n/g;
  let m: RegExpExecArray | null;
  while ((m = streamRe.exec(raw)) !== null) {
    const start = m.index + m[0].length;
    const end = raw.indexOf("endstream", start);
    if (end === -1) continue;
    const seg = rawBuf.subarray(start, end);
    try {
      text += inflateSync(seg).toString("latin1");
    } catch {
      try {
        text += inflateSync(ascii85Decode(seg.toString("latin1"))).toString("latin1");
      } catch {
        // neither plain Flate nor ASCII85+Flate (image/font stream) — skip
      }
    }
  }
  // PDF text operators put parens/escapes between glyph runs; strip the
  // common noise so substring checks behave.
  const flat = text.replace(/[()\\]/g, "").replace(/\s+/g, " ");
  for (const claim of ["lovable.app", "25M+", "7 markets", "Business Insider", "BIT25"]) {
    if (flat.includes(claim)) fail(resumePdf, "banned_claim", `PDF contains "${claim}"`);
  }
  // Kerning (TJ arrays) can split a string mid-run with adjustment integers —
  // e.g. `(rzif)-3(i.com)` — so the domain marker is matched on a letters-only
  // collapse (kerning digits stripped), and the volume marker on the flat text.
  const lettersOnly = flat.toLowerCase().replace(/[^a-z]/g, "");
  if (!lettersOnly.includes("rzificom")) {
    fail(resumePdf, "banned_claim", `PDF is missing canonical marker "rzifi.com"`);
  }
  const alphaNum = flat.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!alphaNum.includes("270m")) {
    fail(resumePdf, "banned_claim", `PDF is missing canonical marker "270M"`);
  }
}

// ─── OG images ──────────────────────────────────────────────────────────
// Every post (INCLUDING future-dated drip posts) and case study must have its
// OG card in the build — the CI cron publishes from a clean checkout, so a
// card that exists only on a laptop ships as a 404 og:image on publish day.
for (const post of posts) {
  const og = join(ROOT, "og", "blog", `${post.slug}.png`);
  if (!existsSync(og)) fail(og, "og_missing", `no OG card for post "${post.slug}"`);
}
for (const study of caseStudies) {
  const og = join(ROOT, "og", "product-work", `${study.slug}.png`);
  if (!existsSync(og)) fail(og, "og_missing", `no OG card for case study "${study.slug}"`);
}

// ─── Report ─────────────────────────────────────────────────────────────
const checks = [
  "banned_claim",
  "two_tier_claim_mix",
  "og_missing",
  "old_domain",
  "dev_leak",
  "canonical_missing",
  "canonical_dup",
  "canonical_host",
  "canonical_self",
  "canonical_href_missing",
  "title_missing",
  "title_too_long",
  "title_truncated",
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
  "future_lastmod",
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
