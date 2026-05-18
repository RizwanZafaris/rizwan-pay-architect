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
 *   - apex + www + http redirect chain
 *   - core SEO assets: index.html, robots.txt, sitemap.xml, og-default.png,
 *     llms.txt, llms-full.txt, .well-known/security.txt
 *   - canonical host points at apex, not www
 *   - sample of indexable routes return 200 with content
 *   - AI bot user agents (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
 *     receive the same 200 + correct content (no soft block)
 *
 * Exits non-zero if any required check fails so the script can gate deploys.
 */

const HOST = (process.argv[2] ?? "https://rzifi.com").replace(/\/$/, "");

type Probe = {
  name: string;
  url: string;
  expect: number | "redirect";
  required?: boolean;
  ua?: string;
  matchBody?: RegExp;
};

const probes: Probe[] = [
  { name: "Apex HTTPS", url: HOST, expect: 200, required: true, matchBody: /<title>/i },
  {
    name: "Apex HTTP redirect",
    url: HOST.replace(/^https/, "http"),
    expect: "redirect",
    required: true,
  },
  { name: "www redirect", url: HOST.replace("//", "//www."), expect: "redirect" },
  {
    name: "robots.txt",
    url: `${HOST}/robots.txt`,
    expect: 200,
    required: true,
    matchBody: /^Sitemap:\s*https:\/\/rzifi\.com\//m,
  },
  {
    name: "sitemap.xml",
    url: `${HOST}/sitemap.xml`,
    expect: 200,
    required: true,
    matchBody: /<loc>https:\/\/rzifi\.com/,
  },
  {
    name: "llms.txt",
    url: `${HOST}/llms.txt`,
    expect: 200,
    required: true,
    matchBody: /^# Rizwan Zafar/,
  },
  {
    name: "llms-full.txt",
    url: `${HOST}/llms-full.txt`,
    expect: 200,
    required: true,
    matchBody: /# Profile/,
  },
  { name: "og-default.png", url: `${HOST}/og-default.png`, expect: 200, required: true },
  {
    name: "security.txt",
    url: `${HOST}/.well-known/security.txt`,
    expect: 200,
    matchBody: /^Contact:/m,
  },
  { name: "Resume PDF", url: `${HOST}/Rizwan_Zafar_Resume.pdf`, expect: 200 },
  // Indexable routes — pick a representative sample.
  { name: "/about", url: `${HOST}/about`, expect: 200, required: true, matchBody: /<h1[^>]*>/ },
  { name: "/blog", url: `${HOST}/blog`, expect: 200, required: true },
  {
    name: "/contact",
    url: `${HOST}/contact`,
    expect: 200,
    required: true,
    matchBody: /Contact Rizwan Zafar/,
  },
  { name: "/resume", url: `${HOST}/resume`, expect: 200, required: true },
  { name: "/product-work", url: `${HOST}/product-work`, expect: 200, required: true },
  { name: "/for/visa-mastercard", url: `${HOST}/for/visa-mastercard`, expect: 200, required: true },
];

// AI bots: same URL set, just with different user agents. We expect 200 from
// all of them on the homepage. A 403 from one of these would mean an upstream
// CDN (Cloudflare, Hostinger Edge) is blocking AI crawlers.
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
  [
    "Applebot-Extended",
    "Mozilla/5.0 (compatible; Applebot-Extended/0.1; +http://www.apple.com/go/applebot)",
  ],
];

type Result = { name: string; status: number | "redirect" | "err"; pass: boolean; detail?: string };
const results: Result[] = [];

async function fetchHead(url: string, ua = "rzifi-check-live/1.0") {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: { "user-agent": ua, accept: "*/*" },
    });
    const body = res.headers.get("content-type")?.startsWith("text/") ? await res.text() : "";
    return { status: res.status, location: res.headers.get("location") ?? "", body };
  } catch (err) {
    return { status: "err" as const, location: "", body: "", error: err };
  }
}

async function runProbes() {
  for (const p of probes) {
    const r = await fetchHead(p.url);
    if (r.status === "err") {
      results.push({ name: p.name, status: "err", pass: false, detail: String(r.error) });
      continue;
    }
    const expectedRedirect = p.expect === "redirect";
    const okStatus = expectedRedirect ? r.status >= 300 && r.status < 400 : r.status === p.expect;
    const okBody = !p.matchBody || p.matchBody.test(r.body);
    const pass = okStatus && okBody;
    let detail = `HTTP ${r.status}`;
    if (expectedRedirect && r.location) detail += ` → ${r.location}`;
    if (!okBody) detail += " (body mismatch)";
    results.push({ name: p.name, status: r.status, pass, detail });
  }
}

async function runAiBots() {
  for (const [name, ua] of AI_USER_AGENTS) {
    const r = await fetchHead(`${HOST}/`, ua);
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
  await runAiBots();

  let okCount = 0;
  let failCount = 0;
  const failures: Result[] = [];

  for (const r of results) {
    const icon = r.pass ? "✓" : "✗";
    const status = String(r.status).padEnd(5);
    const detail = r.detail ?? "";
    console.log(`  ${icon} ${r.name.padEnd(28)} ${status}  ${detail}`);
    if (r.pass) okCount++;
    else {
      failCount++;
      failures.push(r);
    }
  }

  console.log(`\n${okCount}/${results.length} checks passed.`);

  // Treat AI bots + non-required as warnings, only the required SEO assets
  // as hard failures.
  const requiredFails = failures.filter((f) => {
    const probe = probes.find((p) => p.name === f.name);
    return probe?.required;
  });

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
