# Content, SEO & AI-SEO Audit — Consolidated Results

_Three audit rounds ran on 2026-06-10 (four lenses each: content, SEO, tech, UX; ~84
essays individually scored). This file is the standing record; re-run the scoring
quarterly or after any 20-essay batch._

## Scoring methodology (per piece)

Each essay scored 0–10 across: **Depth** (word-count tier 0–3), **Operator voice**
(first-person Simpaisa/Daraz/Tapmad anecdote 0–2), **Originality** (operator data or
worked example vs commodity explainer 0–2), **Structure** (FAQ + case-study links +
sources 0–2), **Recruiter signal** (does a hiring manager learn about HIM 0–1).
The seven requested dimensions (quality / SEO / AI-SEO / readability / expertise /
originality / recruiter attractiveness) collapse into these five measurable ones —
readability was uniformly fine (it never differentiated), and SEO/AI-SEO are page-template
properties on this site (FAQ schema, entity links) rather than per-essay prose properties.

## Results

| Tier | Count | Meaning | Action |
|---|---|---|---|
| A (8–10) | 13 | Operator flagships: anecdote + verified metrics + full structure | Feature, repurpose, boost |
| B (5–7.5) | 34 | Deep (1,900–2,900w), well-structured, **voiceless** | One "operator lens" paragraph each — the cheapest quality lift on the site |
| C (3–4.5) | 25 | Competent 650–1,100w cluster fillers, zero personal signal | Expand the strategic ones; leave the rest until data says otherwise |
| D (<3) | 12 | Thin commodity stubs (avg ~620w) — the recent SWIFT drip | **Consolidate into 4–5 deep pieces with 301s** (or rewrite with corridor/UETR war stories) |

Hard numbers behind the tiers: only 28/84 essays mention an employer at all; ~60 have
no case-study link; 16 lack a FAQ; the 12 weakest are the 12 most recent. The corpus
is authoritative but anonymous — the inverse of what E-E-A-T and recruiters reward.

**Top 10 (feature/boost):** reconciliation-is-product-infrastructure ·
payment-cost-50-to-1 · hosted-checkout-vs-direct-card-processing ·
ai-in-payments-four-production-use-cases · three-million-dollar-transformation-postmortem ·
cross-border-corridors-are-operating-systems · okrs-billion-tpv-payment-goals-vs-saas ·
emerging-markets-pressure-test-payments · mena-south-asia-payment-infrastructure-country-map ·
payments-pm-career-ladder-ic-lead-director-vp

**Weakest 15 with actions:** the 12 SWIFT stubs (merge: delays+gpi+tracking → one
"where cross-border payments actually stall"; vs-wire + vs-card-rails → into the hub;
aml-cft → merge with sanctions-screening essay; fees-fx, compliance-checklist,
emerging-markets-banking, messaging-formats, crypto, in-2026 → rewrite-or-retire per
`02`), plus risk-tiering-merchants + onboarding-conversion-vs-default-rate (merge into
one 2,000w tradeoff essay) and correspondent-banking (rewrite — a topic he
operationally owns, currently a textbook entry).

### Identified issue classes (the prompt's checklist, answered)

- **Thin content:** 12 D-tier + 25 C-tier (above). **Generic/AI-sounding:** the B-tier's
  defining flaw — competent, anonymous, no first-person evidence. **Keyword stuffing:**
  not found (the corpus errs the other way). **Missing examples/data/statistics:**
  56 essays carry zero canonical metrics. **Missing thought leadership:** no contrarian
  thesis pieces in Fraud or Settlement clusters. **Missing internal links:** ~60 essays
  don't link any case study. **Missing external references:** D/C tiers cite nothing.
  **Missing schema:** 13 strong essays lack the FAQ block the other 59 have; ItemList
  missing on topic hubs.

## SEO audit (state: 87/100)

Strong and verified live: 116-URL sitemap = exactly the indexable set; zero duplicate
titles across 129 pages; self-canonicals + single-hop redirects; per-post OG cards
(now gated in CI); robots + llms.txt + feed.xml clean; entity graph (Person/Org/WebSite
with @id reuse) on all pages; immutable asset caching; HTML max-age 300.

Open items (tracked, not yet shipped): fonts load via CSS `@import` (render-blocking
3-hop chain — self-host); hero preload misses `imagesrcset`; HSTS header absent;
62 pages ship pre-truncated "…" titles; topic hubs lack `ItemList` schema and share
one OG image; author-entity loop (essay → /about → #person) absent on all essays —
ProfilePage.mainEntity duplication was fixed, the per-essay author box was not.

## AI-SEO / GEO audit

In place: llms.txt + llms-full.txt (746KB full corpus, regenerated in CI), Person
`disambiguatingDescription`, Wikidata Q140070742 + Crunchbase in sameAs, FAQ schema on
59 essays, definition-led openings on hub pages. hCDN serves real AI fetchers (verified);
keep the monthly Perplexity citation check as the canary.

Gaps that matter for ChatGPT/Gemini/Claude/Perplexity/Copilot visibility, in order:
1. **No original data asset** — engines cite sources of numbers; the MENA Index is the fix.
2. **No proprietary framework names** — the corpus has frameworks without names; name
   them (e.g. "the corridor-OS model", "risk-adjusted RICE overlay", "STP exception
   taxonomy") so LLMs can attribute them.
3. **Author-entity loop** — every essay should byline-link to /about (#person) so the
   84-essay corpus accrues to the person entity, not just the domain.
4. **Comparison/table coverage** — engines lift tables; the comparison pages in `02`
   double as AI-answer fodder.
5. **Citations in thin tiers** — C/D essays cite no external sources, which suppresses
   their trust-weighting in retrieval.

## What was deliberately NOT redone here

Per-piece scores for all 84 essays exist from today's run (tier assignments above);
re-printing 84 rows adds no decisions. The next full re-score belongs after the SWIFT
consolidation + B-tier retrofit, when the tier mix should read A:20+ / B:40 / C:20 / D:0.
