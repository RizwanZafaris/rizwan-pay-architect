# SEO + AI Visibility Playbook — rzifi.com

Everything that can't be committed to a repo. Walk through this top-to-bottom **once**, then revisit weekly using the checklist at the bottom.

Time budget: 90 minutes for first-time setup. After that: 5 minutes a week.

---

## What "in the repo" already covers (FYI)

You don't have to think about these — they ship with every build:

- ✅ Single canonical per page on `https://rzifi.com`
- ✅ `robots.txt` with explicit allowlist for 20+ AI/LLM bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc.)
- ✅ `sitemap.xml` (78 URLs, all rzifi.com)
- ✅ `llms.txt` (13 KB short index)
- ✅ `llms-full.txt` (364 KB full content dump for AI ingestion)
- ✅ JSON-LD: `Person`, `Organization`, `WebSite`, `ProfilePage`, `ContactPage`, `CollectionPage`, `BlogPosting`, `BreadcrumbList`, `FAQPage`, `Speakable` for voice/AI answers
- ✅ OG + Twitter cards (1200×630 self-hosted)
- ✅ Apex/www/http canonical-host enforcement (.htaccess)
- ✅ IndexNow key file (`/2b37cfa0f40ee28009e4db27f7f62a6b.txt`)
- ✅ `/.well-known/security.txt`
- ✅ GTM with SPA `spa_pageview` (GTM-TM5BP98G) and typed events (schedule_meeting, resume_download, linkedin_click, contact_form_submit, blog_view, case_study_view)

Run-anytime commands (already in `package.json`):

```bash
bun run seo:audit       # Static analysis of dist-static/ (0 failures = good)
bun run seo:check-live  # Live HTTP probes of rzifi.com (including AI bots)
bun run seo:llms        # Regenerate llms.txt + llms-full.txt
bun run seo:indexnow    # Ping Bing + Yandex with the sitemap URLs
bun run seo:og-image    # Regenerate og-default.png
```

---

## 1. Search Engine setup (one-time, free, 30 min)

### 1a. Google Search Console

This is non-negotiable. GSC is the only authoritative source for "how Google sees you."

1. Open <https://search.google.com/search-console>.
2. Click **Add property** → **URL prefix** → enter `https://rzifi.com`.
3. Verify ownership using **HTML tag**.
   - GSC gives you a meta tag like `<meta name="google-site-verification" content="kWHcLbkjB3HB8amvRUoa8gMfThcigOtXteUIZUPu8mc">`.
   - **The existing verification code is already wired in `src/routes/__root.tsx`.** If GSC gives you a different code, replace it there and redeploy.
4. After verification, **Sitemaps** → **Add new sitemap** → paste `sitemap.xml` → Submit.
5. **Settings → Crawl rate** → leave at "let Google decide" (sane default).
6. **URL Inspection** → paste `https://rzifi.com` → click **Request indexing**. Repeat once for `/blog` and `/product-work`. Don't spam this on every page; Google rate-limits aggressive requests.

What to watch in GSC weekly:

- **Performance** → impressions, clicks, average position, CTR. Track these in a Google Sheet.
- **Coverage** → "Indexed" should grow to ~78 (every URL in sitemap).
- **Enhancements** → confirm zero errors on Structured data, Breadcrumb, Article, FAQ.

### 1b. Bing Webmaster Tools

Bing also powers ChatGPT Search and Copilot. Free, takes 5 minutes.

1. Open <https://www.bing.com/webmasters>.
2. Sign in with the same Google account → click **Import from Google Search Console**. Bing auto-pulls everything.
3. If that's not available: **Add a site** → `https://rzifi.com` → verify via **XML file** (download `BingSiteAuth.xml`, drop into `public/`, redeploy).
4. **Sitemaps** → **Submit sitemap** → `https://rzifi.com/sitemap.xml`.

### 1c. IndexNow (instant indexing)

Already wired. After each meaningful content deploy:

```bash
bun run build:static
bun run seo:indexnow   # pings Bing + Yandex with the full URL list
```

This drops indexing latency from days to minutes for Bing/Yandex/Seznam.

### 1d. Yandex Webmaster (optional, 5 min)

If you want Russian-speaking traffic or you want belt-and-suspenders on IndexNow:

- <https://webmaster.yandex.com/> → add site → verify via HTML tag.

---

## 2. AI Visibility setup (this is the bigger half)

### 2a. Verify AI bots can crawl

Already wired in `robots.txt`. After deploy, verify externally:

```bash
bun run seo:check-live
```

The script simulates GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended user agents against `https://rzifi.com/`. Each should return 200 + HTML. If any fail, your CDN (Hostinger Edge / Cloudflare if you add it) is blocking AI traffic and needs an explicit override.

### 2b. Cloudflare in front of Hostinger (recommended — 15 min, free)

Currently rzifi.com goes direct to Hostinger's edge. Hostinger gives you no bot analytics. Cloudflare in front of Hostinger gives you:

- **AI Audit dashboard** — counts hits per AI crawler (GPTBot, ClaudeBot, etc.) for free. You can SEE who's indexing you.
- **Bot Fight Mode** — separates AI crawlers from spam scrapers.
- **Analytics** — geographic distribution, bandwidth, cached vs. origin
- **Cache** — faster TTFB worldwide (knock 200-400ms off LCP)

Setup:

1. Create Cloudflare account → **Add a site** → enter `rzifi.com`.
2. Cloudflare scans your DNS — confirm A records match your Hostinger IPs.
3. At your domain registrar (or Hostinger DNS), change the nameservers to the two Cloudflare nameservers Cloudflare gives you.
4. Wait 5–30 minutes for propagation, then verify status: "Active".
5. **SSL/TLS** → set mode to **Full (strict)** (Hostinger has Let's Encrypt; this avoids certificate-mismatch errors).
6. **Rules → Page Rules** (optional): set `https://rzifi.com/*` → Cache Level: Standard, Edge Cache TTL: 4 hours.
7. **Security → Bots → AI Audit**: enable. Free.
8. **Caching → Configuration**: Browser Cache TTL: Respect Existing Headers (matches our `.htaccess`).

What this changes for you:

- **AI crawler hits visible in Cloudflare Analytics** under Security → Bots
- Faster global TTFB
- DDoS protection for free

### 2c. Submit the site to AI tools directly

Some AI tools accept submissions. Worth 10 minutes:

- **Perplexity**: no submission form, but `llms.txt` + sitemap is read automatically.
- **ChatGPT / OpenAI**: GPTBot crawls based on robots.txt + popularity. There's no submit form.
- **You.com**: <https://about.you.com/contact/> — drop a note; YouBot then crawls.
- **Phind / Brave / Kagi**: all crawl from public web; no submissions needed.
- **Wikipedia**: if you've been quoted in a real publication, write a stub bio with citations. Wikipedia is THE highest-leverage source for AI grounding because every major LLM weights it heavily.

### 2d. Monitor AI citations (manual + free options)

There's no fully-automated free tool. The reliable workflow:

**Weekly: 10-minute manual check**

Run these queries in each tool and write down which mention `rzifi.com` or "Rizwan Zafar":

| Query                                           | ChatGPT | Claude | Perplexity | Gemini | Bing Copilot |
| ----------------------------------------------- | ------- | ------ | ---------- | ------ | ------------ |
| "Rizwan Zafar payments product executive"       | ☐       | ☐      | ☐          | ☐      | ☐            |
| "Who built Simpaisa payments infrastructure"    | ☐       | ☐      | ☐          | ☐      | ☐            |
| "Payments product leaders in Dubai"             | ☐       | ☐      | ☐          | ☐      | ☐            |
| "Cross-border payments product executives MENA" | ☐       | ☐      | ☐          | ☐      | ☐            |
| "Best blogs on payments infrastructure"         | ☐       | ☐      | ☐          | ☐      | ☐            |

Score: 1 point per "cited rzifi.com link", 0.5 per "mentioned Rizwan Zafar without link". Track the weekly total in a Google Sheet. The goal isn't 100% — it's the trend.

**Paid options (skip until you actually have results to track):**

- **Otterly.ai** (~$49/mo) — automates LLM brand citation tracking
- **Profound** (~$100/mo) — same but for enterprise
- **AthenaHQ** — same category
- **Daydream** — Google AI Overviews position tracking

Don't pay for these until you've shipped meaningful content for 8+ weeks and want signal-vs-noise on the trend.

---

## 3. Analytics setup (one-time, 20 min)

### 3a. GA4 (already wired via GTM)

Verify it's actually firing:

1. Open <https://analytics.google.com/>.
2. **Reports → Realtime**. Open `https://rzifi.com` in another tab.
3. You should see 1 user in realtime within 30 seconds.
4. **Admin → Property settings → Property details** → check Data Stream → confirm Measurement ID matches the one in GTM.

If realtime shows 0 users: the GTM container isn't actually published in production. Open GTM → **Workspace → Publish**.

### 3b. GA4 conversions to mark (10 min, important)

In GA4 **Admin → Events**, mark these as **Conversions** (toggle on):

- `schedule_meeting` — Cal.com / booking intent. Highest-intent lead signal.
- `resume_download` — PDF download. Strong recruiter-intent signal.
- `linkedin_click` — referral / validation intent from serious visitors.

These already fire from the existing GTM container. Marking them as conversions makes them show up in GSC + GA4 attribution reports.

### 3c. Custom dimensions in GA4 (5 min, useful)

**Admin → Custom definitions → Custom dimensions**. Add these 5 (all event-scoped):

| Dimension name  | Event parameter   |
| --------------- | ----------------- |
| Blog category   | `blog_category`   |
| Case study slug | `case_study_slug` |
| Hub             | `hub`             |
| Audience        | `audience`        |
| CTA location    | `cta_location`    |

Lets you slice "résumé downloads by audience" or "blog views by category" in GA4.

### 3d. Looker Studio dashboard (optional, 15 min)

<https://lookerstudio.google.com/> — free Google Sheets-style dashboard. Build one page with:

- **Sessions + users** (line chart, last 28 days)
- **Top landing pages** (table, ordered by sessions)
- **Conversions by type** (bar chart)
- **Channel split** (pie: organic search, direct, referral, social)

Connect GA4 + GSC as data sources. Schedule a weekly email with the PDF.

---

## 4. Off-page / authority moves

These are the levers AI tools weigh heavily when deciding who to cite. None require code changes.

Execution pack: see `docs/off-page-seo/README.md`.

### 4a. LinkedIn + X consistency (30 min, one-time)

- **LinkedIn**: headline = same as homepage tagline. About section opens with: "Rizwan Zafar is a Dubai-based Product & Program Executive scaling regulated fintech and payment infrastructure in complex markets. As CPO at Simpaisa, he helped scale payment infrastructure across 7 markets, $1B+ GTV, 25M+ monthly transactions and 50+ bank, wallet and financial institution partners." Use the featured links listed in `docs/off-page-seo/profile-entity-checklist.md`.
- **X bio**: "Payments product & program executive. CPO at Simpaisa, Dubai. Building regulated fintech infrastructure across complex markets." Pin one post that links to the strongest case study. AI tools read social bios for entity disambiguation.

### 4b. Wikipedia / Wikidata (only when eligible)

- **Wikidata** (<https://www.wikidata.org/>) — do not create yet unless there are independent third-party sources that verify the entity. A weak self-created item can be deleted and may look like vanity SEO.
- **Wikipedia** — only viable if you have been cited in 3+ independent reputable sources (industry publications, major news, conference talks). Do not write your own page.

### 4c. Crunchbase / industry profiles (20 min)

- Add or claim profiles on: Crunchbase (you're an exec at a startup), AngelList/Wellfound, Built In, Product Hunt (as a maker if any of your products are listed), MENA Bytes, Wamda. Every profile = one more strong link to `rzifi.com` from a high-domain-authority host.

### 4d. Guest posts / podcast appearances (ongoing)

Best AI-visibility move long-term. Each appearance plants a citation on a third-party domain that LLMs already trust:

- Pitch your essays to Finextra, PaymentsDive, MENA Bytes, The Fintech Times.
- Apply to be a guest on payments podcasts (11:FS Blockchain Insider, Fintech Insider, PaymentsJournal Podcast).
- Speak at conferences (Money 20/20 MENA, Seamless Middle East, Fintech Summit Dubai). The video lands on YouTube; YouTube is the #2 surface for AI grounding after Wikipedia.

---

## 5. Content cadence (the boring multiplier)

AI tools cite popularity. Popularity follows publishing frequency. Suggested cadence:

| Cadence          | Format                    | Length          | Purpose                              |
| ---------------- | ------------------------- | --------------- | ------------------------------------ |
| **2× / month**   | Essay on a payments topic | 1500–2500 words | Search + AI citations                |
| **1× / quarter** | Case study                | 1000–1500 words | High-trust depth signal              |
| **Once**         | "Definitive guide" pillar | 4000+ words     | Hub page that other essays link into |

Each piece must:

- Have a unique H1 keyword query (e.g., "Project Management for Fintech Regulatory Programmes")
- Have FAQ section (Google + AI love structured Q&A)
- Link to 2–3 related essays + 1 case study
- Include "Speakable" content in the first paragraph (AI Overviews / voice extract this)

The repo's `scripts/generate-posts.ts` + `scripts/generate-llms.ts` regenerate everything from the markdown files; you only have to add the `.md`.

---

## 6. Weekly maintenance (5 min)

Every Monday morning:

```bash
# 1. Build + verify
bun run build:static
bun run seo:audit         # static: must show 0 failures
bun run seo:check-live    # live: must show all required green

# 2. Push if anything new
bun run deploy:git-static # refreshes hostinger-static branch

# 3. Ping IndexNow with the new URL list
bun run seo:indexnow
```

Open in browser, 30 seconds each:

- Google Search Console → impressions trend (up?)
- Bing Webmaster → clicks trend (up?)
- Cloudflare → Security → Bots → AI Audit (which AI bots crawled this week?)
- GA4 → Acquisition → Sessions (organic up?)

Run the 5-query AI citation check from §2d. Log results in a sheet.

---

## 7. Triage table (when something looks wrong)

| Symptom                                               | First place to look                            | Fix                                                                                                           |
| ----------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| GSC "0 impressions" after 2 weeks                     | GSC → Coverage                                 | Check for "Crawled — not indexed". If you see that, content quality or thinness is the issue.                 |
| GSC "Discovered — currently not indexed"              | Same                                           | Submit URL manually via URL Inspection. Once or twice; not a recurring tool.                                  |
| AI tools never cite your URL                          | `bun run seo:check-live`                       | Verify AI bot UAs get 200. If they don't, your CDN is blocking them.                                          |
| Slow LCP                                              | <https://pagespeed.web.dev/> on rzifi.com      | Check the perf brief in CLAUDE / the existing performance-optimization skill.                                 |
| Sitemap not picked up                                 | GSC → Sitemaps                                 | Re-submit. If it fails to fetch: live-site sitemap.xml is 404 → deploy issue.                                 |
| Old subdomain URLs still in search results            | None (Google has them cached)                  | Wait 4–8 weeks for Google to drop the old URLs. The new canonicals point at rzifi.com so authority transfers. |
| Brand search "Rizwan Zafar" doesn't rank rzifi.com #1 | GSC → Performance → query filter for your name | Strengthen brand mentions on LinkedIn, Wikidata, Crunchbase. Brand SERP takes 4–12 weeks.                     |

---

## 8. What NOT to do

- **Don't buy backlinks.** Detected, demoted.
- **Don't keyword-stuff.** Already handled — keywords sit naturally in headings and body.
- **Don't translate the site automatically.** AI translations dilute authority. Either commit to a translated version with a real translator + `hreflang`, or stay English-only.
- **Don't add `noindex` to anything indexable** unless you have a specific reason. `seo:audit` will flag it.
- **Don't change canonical hosts again.** Every change costs 4–8 weeks of authority transfer. Stay on `rzifi.com` apex.
- **Don't disable JS for SEO.** Search engines render JS now; what matters is that the SSR HTML has the key signals (title, H1, canonical, schema) — which it does.

---

## Quick reference

| File                              | What it does                                | Edit?                                |
| --------------------------------- | ------------------------------------------- | ------------------------------------ |
| `public/robots.txt`               | Explicit AI bot allowlist + sitemap pointer | Yes, if adding bots                  |
| `public/llms.txt`                 | Short index for AI tools                    | Auto-generated                       |
| `public/llms-full.txt`            | Full content dump for AI ingestion          | Auto-generated                       |
| `public/.well-known/security.txt` | Trust signal                                | Update expiry yearly                 |
| `public/2b37cfa0…7f62a6b.txt`     | IndexNow ownership proof                    | Don't rename                         |
| `public/og-default.png`           | Social preview card                         | Regenerate via `seo:og-image`        |
| `src/lib/seo.ts`                  | SITE_URL, OG_IMAGE_URL, keywords            | Edit keywords as positioning evolves |
| `src/routes/__root.tsx`           | Sitewide Person/Org/Website JSON-LD         | Rarely                               |
| `scripts/seo-audit.ts`            | Static audit                                | Add checks as needed                 |
| `scripts/check-live.ts`           | Live audit incl. AI bots                    | Add bot UAs as new ones emerge       |
| `scripts/generate-llms.ts`        | LLM index generator                         | Re-run after content changes         |
| `scripts/indexnow-submit.ts`      | Bing/Yandex instant ping                    | Re-run after deploys                 |

---

Last reviewed: 2026-05-18
