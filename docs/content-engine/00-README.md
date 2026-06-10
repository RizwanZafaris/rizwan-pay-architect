# Content Engine — Master Plan

_Built 2026-06-10. Owner: Rizwan Zafar. System of record for the content ecosystem that
positions him for Director/VP Product and senior Program roles at Visa/Mastercard/Stripe/
Adyen/Wise/Revolut/Nium/PayPal/Wio-class companies._

## The one-paragraph thesis

The site already has top-decile plumbing (entity schema, llms.txt, CI-published drip,
129 clean pages) and a real corpus (84 essays, 19 case studies). What it does not yet
have is **concentration**: proof concentrated into citable assets, voice concentrated
into the thin half of the corpus, and distribution concentrated on the one channel
recruiters actually live in (LinkedIn). This engine fixes concentration, not volume.
The single most damaging pattern found in the audit was high-volume thin content —
the cure is fewer, deeper, operator-voiced pieces with distribution behind them.

## File map

| File | Contents |
|---|---|
| `00-README.md` | This plan: thesis, MCP requirements, execution timeline, impact model |
| `01-audit-consolidated.md` | Content/SEO/AI-SEO audit results + per-piece action ledger |
| `02-cluster-map-roadmap-blogs.md` | Cluster map, gap analysis, 12-month roadmap, 50 blog ideas |
| `03-linkedin-engine.md` | LinkedIn strategy, hook system, 100 post ideas, 12 written posts, 30-day calendar |
| `04-repurposing-framework.md` | One-to-many repurposing system + worked example |
| `05-recruiter-attraction-brand-strategy.md` | Recruiter funnel + personal-brand growth plan |
| `case-studies/*.md` | 20 anonymized case studies (5× gateway, remittance, OTT, e-commerce) |

## MCP requirements (grounded in what is actually available here)

| MCP | Why needed | Expected output | Business value | Priority |
|---|---|---|---|---|
| **Google Search Console** | Site is verified; nothing else tells us which queries already earn impressions and which essays Google ignores. Every rewrite/expand decision in `01` should be re-ranked against GSC reality. | Query/page report per essay; index-coverage deltas after the SWIFT consolidation | Stops us optimizing blind; proves the drip publishes | **Critical** |
| **Google Analytics (GA4)** | GA4 + GTM already live with booked-call events. Closes the loop: which essay → which recruiter page → booked call. | Content-to-conversion attribution table, monthly | Tells us which clusters produce calls, not just traffic | **Critical** |
| **Ahrefs** | The cluster map's volume/difficulty columns are expert estimates; Ahrefs turns them into numbers and finds the competitor gap (who ranks for "payment orchestration" that he can out-experience). An Ahrefs plugin exists in this workspace — needs account auth. | Validated keyword table for all 50 ideas; backlink-gap list for outreach | Prevents writing into dead keywords; targets the off-page sprint | **Recommended** |
| **Perplexity** (connected ✓) | AI-visibility monitoring: run the entity queries ("who is Rizwan Zafar", "payments product leader Dubai", cluster questions) monthly and track whether rzifi.com is cited. | Monthly AI-citation scorecard | Direct measure of the GEO investment | **Recommended** |
| **Firecrawl** (self-hosted at :3002 ✓) | Competitor teardowns: crawl the 5 payments-content competitors and diff their cluster coverage against ours. | Competitor content inventory, quarterly | Finds the topics they own that we can out-operator | **Recommended** |
| **LinkedIn** | No official read API/MCP exists for personal post history. Honest path: LinkedIn Settings → Get a copy of your data → upload the posts export here for scoring; publishing stays manual (or Buffer/Taplio). | Past-post scoring + recycling list once export provided | The #1 distribution channel — but the constraint is real | **Critical (via export, not MCP)** |
| **BrightData** | SERP sampling + social listening at scale (brand-listening skill already installed). Useful at the "is the brand landing" stage, not before. | Quarterly share-of-voice report | Later-stage measurement | Optional |
| **Reddit** | r/payments, r/fintech, r/ProductManagement question mining for FAQ sections. | Question bank per cluster | Cheap AEO fodder | Optional |
| **YouTube** | Only after the three scripted Looms exist. Premature today. | — | — | Optional (defer) |
| **Notion** | The repo IS the system of record (calendar, backlog, briefs all in git, CI-published). Adding Notion adds sync drift, not value. | — | — | Optional (skip) |
| **SEMrush** | Redundant with Ahrefs; pick one. | — | — | Optional (skip) |
| **Supabase / Google Search MCP** | No use-case in this engine. | — | — | Skip |

## Execution timeline

| When | Workstream | Output | Expected impact |
|---|---|---|---|
| **Week 1** (Jun 11–17) | LinkedIn engine live (3 posts/wk from `03`); GSC + GA4 review ritual; LinkedIn data export uploaded | First 6 posts; baseline dashboards | Distribution starts; measurement baseline |
| **Weeks 2–4** | SWIFT-stub consolidation (12 D-tier → 4–5 deep pieces, 301s); operator-lens retrofit on first 10 B-tier essays; publish case-study library to site (new `/product-work` entries from `case-studies/`) | Corpus quality floor rises from D to C+ | AI engines stop sampling thin pages; recruiter scan path strengthens |
| **Months 2–3** | Approved 24-essay pipeline runs (already dated Jul 21–Oct 8, CI publishes); Agentic Commerce pillar drafted; testimonials sprint (off-content but gating credibility) | Pipeline live; first citable flagship (90% STP) | Cluster ownership begins; "agentic payments" positioning before the crowd |
| **Months 4–6** | MENA Payments Infrastructure Index v1 (original data asset); comparison pages; guest-post/off-page sprint using `docs/off-page-seo/` kit | The only structurally citable asset class | Backlinks + AI citations compound |
| **Months 7–12** | Quarterly refresh cycle; Index v2; video layer (Looms → YouTube); speaking | Durable authority loop | Inbound recruiter motion |

## Impact model (honest, not hockey-stick)

This engine's job is not traffic — it is **three to five warm conversations per month
with the right people**. Leading indicators in order: LinkedIn profile views from
target companies → rzifi.com sessions from LinkedIn → /hire + /for visits → booked
calls (cal.com) and recruiter DMs. Content volume is a vanity input; the tier mix of
the corpus and the citation rate of the flagships are the quality inputs that drive
those indicators. Review monthly against GSC + GA4; kill anything that two cycles of
data says nobody wants.

## Standing quality bar (applies to every artifact in this folder and every future piece)

- Canonical numbers only: $1B+ annual GTV · 270M+ payments/yr · 97% success · 90% STP ·
  5 frontier markets · 99.95% SLA · 150+ merchants · 14+ yrs. Banned forever: 25M+
  monthly · 7 markets · 50+ partners · 1,200+ merchants · 8%→1.2% · Business Insider · BIT25
  (the site build fails on these; treat docs the same).
- Website case studies stay anonymized; LinkedIn may name employers and public clients.
- One operator anecdote minimum per piece. No piece ships sounding like it could have
  been written by someone who has never carried a settlement pager.
