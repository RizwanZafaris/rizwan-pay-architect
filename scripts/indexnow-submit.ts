#!/usr/bin/env bun
/**
 * IndexNow submitter — pings Bing + Yandex (and any IndexNow-compatible engine)
 * with the URLs from the current sitemap. Forces re-crawl within minutes
 * instead of waiting days for the regular crawl cadence.
 *
 * Run after deploys that meaningfully change content:
 *   bun scripts/indexnow-submit.ts
 *
 * Or pass specific URLs:
 *   bun scripts/indexnow-submit.ts /blog/new-post /product-work/new-study
 *
 * Setup:
 *   - The hex key in INDEXNOW_KEY is the same string written to
 *     public/<key>.txt; engines GET that URL to verify ownership.
 *   - The key here MUST match the filename in public/. Don't change one
 *     without changing the other.
 *
 * Spec: https://www.indexnow.org/documentation
 */

import { readFileSync } from "node:fs";

const INDEXNOW_KEY = "2b37cfa0f40ee28009e4db27f7f62a6b";
const HOST = "rzifi.com";
const SITE = `https://${HOST}`;
const KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;

// IndexNow has a shared API; submitting to one endpoint propagates to the
// other participating engines (Bing, Yandex, Seznam, etc).
const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

function readSitemapUrls(): string[] {
  // Prefer the prerendered sitemap if available.
  try {
    const xml = readFileSync("dist-static/sitemap.xml", "utf-8");
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((u) => u.startsWith(SITE));
  } catch {
    return [];
  }
}

async function submit(urls: string[], endpoint: string) {
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = received, 202 = accepted, 422 = some URLs failed validation, ...
  return { endpoint, status: res.status, ok: res.status >= 200 && res.status < 300 };
}

async function main() {
  const args = process.argv.slice(2);
  let urls: string[];
  if (args.length > 0) {
    urls = args.map((p) =>
      p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`,
    );
    console.log(`Submitting ${urls.length} URL(s) from CLI args.`);
  } else {
    urls = readSitemapUrls();
    if (urls.length === 0) {
      console.error(
        "✗ No URLs found in dist-static/sitemap.xml. Run `bun run build:static` first.",
      );
      process.exit(1);
    }
    console.log(`Submitting ${urls.length} URLs from sitemap.`);
  }

  // IndexNow API caps each request at 10 000 URLs; we're well under.
  const results = await Promise.allSettled(ENDPOINTS.map((e) => submit(urls, e)));
  let ok = 0;
  let fail = 0;
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.ok) {
      console.log(`✓ ${r.value.endpoint} → HTTP ${r.value.status}`);
      ok++;
    } else if (r.status === "fulfilled") {
      console.warn(`⚠ ${r.value.endpoint} → HTTP ${r.value.status}`);
      fail++;
    } else {
      console.warn(`✗ ${r.reason}`);
      fail++;
    }
  }
  console.log(`\n${ok}/${ENDPOINTS.length} endpoints accepted the ping.`);
  if (ok === 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
