#!/usr/bin/env bun
/**
 * Live-site health check for SEO + AI visibility.
 *
 * Probes rzifi.com from the outside and reports every signal that should be
 * green for search engines + LLMs. Designed to run after each Hostinger
 * deploy and after any DNS / panel change.
 *
 *   bun scripts/check-live.ts                  # default host rzifi.com
 *   bun scripts/check-live.ts https://example  # check a different host
 *
 * Checks:
 *   - apex + www + http redirect chain (www / http MUST 301, not 200)
 *   - core SEO assets: index.html, robots.txt, sitemap.xml, og-default.png,
 *     llms.txt, llms-full.txt, .well-known/security.txt
 *   - trailing-slash policy: routes 200 on /<route>/, 301 on /<route>
 *   - canonical = final URL (no 1-hop drift)
 *   - sitemap loc URLs return 200 without redirect (no hop penalty)
 *   - no dev-server leakage in any served HTML
 *   - AI bot user agents receive the same 200 + correct content (no soft block)
 *   - deployed source provenance matches the GitHub commit that triggered the run
 */

const HOST = (process.argv[2] ?? "https://rzifi.com").replace(/\/$/, "");
const APEX_ORIGIN = HOST;
const WWW_ORIGIN = HOST.replace("//", "//www.");
const HTTP_ORIGIN = HOST.replace(/^https/, "http");
const DEV_IMPORT_PATTERN = ["/@id", "virtual"].join("/");
const START_ENTRY_PATTERN = ["tanstack", "start-client-entry"].join("-");
const EXPECTED_SOURCE_SHA = process.env.EXPECTED_SOURCE_SHA?.trim() ?? "";
const EXPECTED_GA_ID = process.env.VITE_GA_MEASUREMENT_ID || "G-F1NK5FJYJY";
const EXPECTED_GA_RE = EXPECTED_GA_ID.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const EXPECTED_GOOGLE_ADS_ID = process.env.VITE_GOOGLE_ADS_ID || "AW-790961325";
const EXPECTED_GOOGLE_ADS_RE = EXPECTED_GOOGLE_ADS_ID.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const EXPECTED_GOOGLE_ADS_PAGE_VIEW_CONVERSION_LABEL =
  process.env.VITE_GOOGLE_ADS_PAGE_VIEW_CONVERSION_LABEL || "6HJOCOTfn7ocEK25lPkC";
const EXPECTED_GOOGLE_ADS_PAGE_VIEW_CONVERSION_RE =
  EXPECTED_GOOGLE_ADS_PAGE_VIEW_CONVERSION_LABEL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type Probe = {
  name: string;
  url: string;
  expect: number | "redirect";
  required?: boolean;
  ua?: string;
  matchBody?: RegExp;
  forbidBody?: RegExp;
  // For redirect probes: expected Location prefix (lets us catch chains).
  expectRedirectTo?: string;
};

const probes: Probe[] = [
  // Apex must answer 200.
  {
    name: "Apex HTTPS /",
    url: `${APEX_ORIGIN}/`,
    expect: 200,
    required: true,
    matchBody: /<title>/i,
  },
  {
    // GTM retired 2026-06-12 (duplicate-tag double counting) — the direct
    // GA4 config is the analytics pipeline this probe guards now.
    name: "GA4 direct tag",
    url: `${APEX_ORIGIN}/`,
    expect: 200,
    required: true,
    matchBody: new RegExp(`gtag\\(["']config["'],["']${EXPECTED_GA_RE}["']`, "i"),
  },
  {
    name: "Retired GTM container absent",
    url: `${APEX_ORIGIN}/`,
    expect: 200,
    required: true,
    forbidBody: /googletagmanager\.com\/(?:gtm\.js|ns\.html)\?id=GTM-/i,
  },
  {
    name: "Google Ads base tag",
    url: `${APEX_ORIGIN}/`,
    expect: 200,
    required: true,
    matchBody: new RegExp(
      `googletagmanager\\.com/gtag/js\\?id=${EXPECTED_GOOGLE_ADS_RE}|gtag\\(["']config["'],["']${EXPECTED_GOOGLE_ADS_RE}["']`,
      "i",
    ),
  },
  {
    name: "Google Ads resume page-view conversion snippet",
    url: `${APEX_ORIGIN}/resume/`,
    expect: 200,
    required: true,
    matchBody: new RegExp(
      `gtag\\(["']event["'],["']conversion["'][\\s\\S]{0,220}${EXPECTED_GOOGLE_ADS_RE}/${EXPECTED_GOOGLE_ADS_PAGE_VIEW_CONVERSION_RE}`,
      "i",
    ),
  },
  {
    name: "Legacy CTA source markup absent",
    url: `${APEX_ORIGIN}/resume/`,
    expect: 200,
    required: true,
    forbidBody: /data-analytics-source\s*=/i,
  },
  {
    name: "Consulting conversion analytics contract",
    url: `${APEX_ORIGIN}/consulting/`,
    expect: 200,
    required: true,
    matchBody:
      /t="consulting";s="conversion";a="founders_payments_leaders"[\s\S]*cid==="book_scoping_call"[\s\S]{0,160}href==="#book"/,
  },
  {
    name: "Hire booking-created analytics contract",
    url: `${APEX_ORIGIN}/hire/`,
    expect: 200,
    required: true,
    matchBody: /t="hire_landing";s="conversion"[\s\S]*stage\("booking_submitted"/,
  },
  {
    name: "Client-side booking confirmation absent",
    url: `${APEX_ORIGIN}/hire/`,
    expect: 200,
    required: true,
    forbidBody:
      /(?:\b(?:stage|track|trackEvent|p)\s*\(\s*["'](?:booking_confirmed|book_call_confirmed)["']|\bgtag\s*\(\s*["']event["']\s*,\s*["'](?:booking_confirmed|book_call_confirmed)["'])/,
  },
  {
    name: "Google Search Console verification",
    url: `${APEX_ORIGIN}/`,
    expect: 200,
    required: true,
    matchBody: /name="google-site-verification"/i,
  },

  // www MUST 301 to apex in a single hop. (This was the bug — Apache's
  // directory-serving rule with [L] fired before the www → apex rewrite.)
  {
    name: "www HTTPS / → apex",
    url: `${WWW_ORIGIN}/`,
    expect: "redirect",
    required: true,
    expectRedirectTo: `${APEX_ORIGIN}/`,
  },
  {
    name: "www HTTPS /about/ → apex /about/",
    url: `${WWW_ORIGIN}/about/`,
    expect: "redirect",
    required: true,
    expectRedirectTo: `${APEX_ORIGIN}/about/`,
  },

  // http MUST 301 to https. Apex-host stays the same.
  { name: "http → https", url: `${HTTP_ORIGIN}/`, expect: "redirect", required: true },

  // About is a first-class portfolio page. The bare path should normalize to
  // the canonical trailing-slash URL, and the canonical route must serve 200.
  {
    name: "/about → /about/",
    url: `${APEX_ORIGIN}/about`,
    expect: "redirect",
    required: true,
    expectRedirectTo: `${APEX_ORIGIN}/about/`,
  },
  {
    name: "/about/",
    url: `${APEX_ORIGIN}/about/`,
    expect: 200,
    required: true,
    matchBody: /About Rizwan Zafar/i,
  },

  // Core SEO assets.
  {
    name: "robots.txt",
    url: `${APEX_ORIGIN}/robots.txt`,
    expect: 200,
    required: true,
    matchBody: /^Sitemap:\s*https:\/\/rzifi\.com\//m,
  },
  {
    name: "sitemap.xml",
    url: `${APEX_ORIGIN}/sitemap.xml`,
    expect: 200,
    required: true,
    matchBody: /<loc>https:\/\/rzifi\.com/,
  },
  {
    name: "llms.txt",
    url: `${APEX_ORIGIN}/llms.txt`,
    expect: 200,
    required: true,
    matchBody: /^# Rizwan Zafar/,
  },
  {
    name: "llms-full.txt",
    url: `${APEX_ORIGIN}/llms-full.txt`,
    expect: 200,
    matchBody: /# Profile/,
  },
  {
    name: "feed.xml",
    url: `${APEX_ORIGIN}/feed.xml`,
    expect: 200,
    matchBody: /<rss[\s>]/,
  },
  { name: "og-default.png", url: `${APEX_ORIGIN}/og-default.png`, expect: 200, required: true },
  {
    name: "security.txt",
    url: `${APEX_ORIGIN}/.well-known/security.txt`,
    expect: 200,
    matchBody: /^Contact:/m,
  },
  { name: "Resume PDF", url: `${APEX_ORIGIN}/Rizwan_Zafar_Resume.pdf`, expect: 200 },

  // Indexable routes — pick a representative sample. Use slash form so we hit
  // the post-redirect URL directly.
  { name: "/blog/", url: `${APEX_ORIGIN}/blog/`, expect: 200, required: true },
  {
    name: "/contact/",
    url: `${APEX_ORIGIN}/contact/`,
    expect: 200,
    required: true,
    matchBody: /Contact Rizwan Zafar/,
  },
  { name: "/resume/", url: `${APEX_ORIGIN}/resume/`, expect: 200, required: true },
  { name: "/sitemap/", url: `${APEX_ORIGIN}/sitemap/`, expect: 200, required: true },
  { name: "/product-work/", url: `${APEX_ORIGIN}/product-work/`, expect: 200, required: true },
  {
    name: "/for/visa-mastercard/",
    url: `${APEX_ORIGIN}/for/visa-mastercard/`,
    expect: 200,
    required: true,
  },
];

const AI_USER_AGENTS: Array<[string, string]> = [
  ["Googlebot", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"],
  [
    "GPTBot",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot",
  ],
  ["ClaudeBot", "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"],
  [
    "PerplexityBot",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot",
  ],
  [
    "Google-Extended",
    "Mozilla/5.0 (compatible; Google-Extended; +https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)",
  ],
];

type Result = {
  name: string;
  status: number | "redirect" | "err";
  pass: boolean;
  detail?: string;
};
const results: Result[] = [];

const TRANSIENT_STATUSES = new Set([403, 408, 425, 429, 500, 502, 503, 504]);

async function fetchOne(url: string, ua = "rzifi-check-live/1.1") {
  let lastResult:
    | { status: number; location: string; contentType: string; body: string; error?: undefined }
    | {
        status: "err";
        location: string;
        contentType: string;
        body: string;
        error: unknown;
      } = {
    status: "err",
    location: "",
    contentType: "",
    body: "",
    error: new Error("Probe did not run"),
  };

  // Hostinger's edge occasionally challenges a single GitHub-runner request
  // while the same URL is healthy from browsers and the next edge request.
  // Retry only challenge/rate-limit/server statuses; real 404s, redirects and
  // body mismatches still fail immediately and visibly.
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 800 : 2_000));
    }
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "manual",
        signal: AbortSignal.timeout(12_000),
        headers: { "user-agent": ua, accept: "*/*", "cache-control": "no-cache" },
      });
      const body = res.headers.get("content-type")?.match(/^(?:text|application\/(?:xml|json))/i)
        ? await res.text()
        : "";
      lastResult = {
        status: res.status,
        location: res.headers.get("location") ?? "",
        contentType: res.headers.get("content-type") ?? "",
        body,
      };
      if (!TRANSIENT_STATUSES.has(res.status)) return lastResult;
    } catch (error) {
      lastResult = { status: "err", location: "", contentType: "", body: "", error };
    }
  }

  return lastResult;
}

async function runProbes() {
  for (const p of probes) {
    const r = await fetchOne(p.url);
    if (r.status === "err") {
      results.push({ name: p.name, status: "err", pass: false, detail: String(r.error) });
      continue;
    }
    const expectedRedirect = p.expect === "redirect";
    const okStatus = expectedRedirect ? r.status >= 300 && r.status < 400 : r.status === p.expect;
    const okLocation =
      !p.expectRedirectTo || (r.location && r.location.startsWith(p.expectRedirectTo));
    const okBody = !p.matchBody || p.matchBody.test(r.body);
    const okForbidden = !p.forbidBody || !p.forbidBody.test(r.body);
    const okDevLeak = !r.body.includes(DEV_IMPORT_PATTERN) && !r.body.includes(START_ENTRY_PATTERN);
    const pass = okStatus && okLocation && okBody && okForbidden && okDevLeak;
    let detail = `HTTP ${r.status}`;
    if (expectedRedirect && r.location) detail += ` → ${r.location}`;
    if (p.expectRedirectTo && !okLocation) detail += ` (expected → ${p.expectRedirectTo})`;
    if (!okBody) detail += " (body mismatch)";
    if (!okForbidden) detail += " (forbidden analytics markup present)";
    if (!okDevLeak) detail += " (dev-only client entry leaked)";
    results.push({ name: p.name, status: r.status, pass, detail });
  }
}

// Sitemap loc resolution: every <loc> must return 200 without a redirect hop.
async function runSitemapLocs() {
  const r = await fetchOne(`${APEX_ORIGIN}/sitemap.xml`);
  if (r.status === "err" || r.status !== 200) {
    results.push({
      name: "Sitemap loc URLs (skipped)",
      status: r.status,
      pass: false,
      detail: "sitemap.xml not reachable",
    });
    return;
  }
  const locs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  let hopCount = 0;
  let firstHop = "";
  // Check up to 12 random locs to keep the run quick.
  const sample = locs.slice(0, 12);
  for (const loc of sample) {
    const lr = await fetchOne(loc);
    if (lr.status >= 300 && lr.status < 400) {
      hopCount++;
      if (!firstHop) firstHop = `${loc} → ${lr.location}`;
    } else if (lr.status !== 200) {
      hopCount++;
      if (!firstHop) firstHop = `${loc} → HTTP ${lr.status}`;
    }
  }
  results.push({
    name: "Sitemap loc URLs",
    status: hopCount === 0 ? 200 : "redirect",
    pass: hopCount === 0,
    detail:
      hopCount === 0
        ? `${sample.length}/${sample.length} return 200 directly`
        : `${hopCount}/${sample.length} hop. e.g. ${firstHop}`,
  });
}

// Canonical = final URL: fetch the homepage, parse its canonical, verify the
// canonical resolves to a 200 without redirect.
async function runCanonicalEqualsFinal() {
  const r = await fetchOne(`${APEX_ORIGIN}/`);
  if (r.status !== 200) {
    results.push({
      name: "Canonical = final URL",
      status: r.status,
      pass: false,
      detail: "couldn't fetch / to inspect canonical",
    });
    return;
  }
  const canonMatch = r.body.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/);
  if (!canonMatch) {
    results.push({
      name: "Canonical = final URL",
      status: 0,
      pass: false,
      detail: "no <link rel=canonical> on /",
    });
    return;
  }
  const cr = await fetchOne(canonMatch[1]);
  const pass = cr.status === 200;
  results.push({
    name: "Canonical = final URL",
    status: cr.status,
    pass,
    detail: pass
      ? `canonical ${canonMatch[1]} returns 200 directly`
      : `canonical ${canonMatch[1]} returns HTTP ${cr.status}${cr.location ? ` → ${cr.location}` : ""}`,
  });
}

async function runDeploymentProvenance() {
  if (!EXPECTED_SOURCE_SHA) return;

  const url = `${APEX_ORIGIN}/deployment.json?source=${encodeURIComponent(EXPECTED_SOURCE_SHA)}`;
  const r = await fetchOne(url);
  if (r.status === "err" || r.status !== 200) {
    results.push({
      name: "Deployment source SHA",
      status: r.status,
      pass: false,
      detail: "deployment.json not reachable",
    });
    return;
  }

  let actual = "";
  try {
    const manifest = JSON.parse(r.body) as { sourceSha?: unknown };
    actual = typeof manifest.sourceSha === "string" ? manifest.sourceSha : "";
  } catch {
    results.push({
      name: "Deployment source SHA",
      status: r.status,
      pass: false,
      detail: "deployment.json is not valid JSON",
    });
    return;
  }

  const pass = actual === EXPECTED_SOURCE_SHA;
  results.push({
    name: "Deployment source SHA",
    status: r.status,
    pass,
    detail: pass
      ? `live source ${actual.slice(0, 8)} matches this run`
      : `expected ${EXPECTED_SOURCE_SHA.slice(0, 8)}, got ${actual.slice(0, 8) || "missing"}`,
  });
}

async function runAiBots() {
  for (const [name, ua] of AI_USER_AGENTS) {
    const r = await fetchOne(`${APEX_ORIGIN}/`, ua);
    if (r.status === "err") {
      results.push({ name: `AI/${name}`, status: "err", pass: false, detail: String(r.error) });
      continue;
    }
    const pass = r.status === 200 && /<title>/i.test(r.body);
    results.push({
      name: `AI/${name}`,
      status: r.status,
      pass,
      detail: pass
        ? "200 + HTML"
        : `HTTP ${r.status}${/<title>/i.test(r.body) ? "" : " (no HTML)"}`,
    });
  }
}

async function main() {
  console.log(`\nChecking ${HOST}…\n`);
  await runProbes();
  await runDeploymentProvenance();
  await runSitemapLocs();
  await runCanonicalEqualsFinal();
  await runAiBots();

  let okCount = 0;
  let failCount = 0;
  const failures: Result[] = [];

  for (const r of results) {
    const icon = r.pass ? "✓" : "✗";
    const status = String(r.status).padEnd(5);
    const detail = r.detail ?? "";
    console.log(`  ${icon} ${r.name.padEnd(34)} ${status}  ${detail}`);
    if (r.pass) okCount++;
    else {
      failCount++;
      failures.push(r);
    }
  }

  console.log(`\n${okCount}/${results.length} checks passed.`);

  // Required = anything in `probes` flagged required, plus the new synthesised
  // checks (sitemap loc, canonical=final). AI bot failures stay as warnings.
  const requiredNames = new Set<string>();
  probes.filter((p) => p.required).forEach((p) => requiredNames.add(p.name));
  requiredNames.add("Sitemap loc URLs");
  requiredNames.add("Canonical = final URL");
  if (EXPECTED_SOURCE_SHA) requiredNames.add("Deployment source SHA");
  const requiredFails = failures.filter((f) => requiredNames.has(f.name));

  if (requiredFails.length > 0) {
    console.log(`\n✗ ${requiredFails.length} required check(s) failed.`);
    process.exit(1);
  }
  if (failCount > 0) {
    console.log(`⚠ ${failCount} optional check(s) failed (warnings only).`);
  } else {
    console.log("All green. Site is search-engine + AI-bot reachable.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
