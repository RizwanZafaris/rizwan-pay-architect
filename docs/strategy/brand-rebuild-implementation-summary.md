# Brand Rebuild — Implementation Summary (feat/brand-rebuild-implementation)
**2026-07-06 · Implements `docs/strategy/brand-rebuild-2026-07-05.md` (P0 + P1 backlog). Use this as the PR description.**

Base: `origin/fix/content-consistency-dynamic-picks` (2d5aa81). Two commits: foundation (bdce9b6) + implementation (this one). **Not merged, not deployed** — owner reviews.

---

## 1. What was implemented (mapped to the strategy doc)

### P0 (doc §4, §7, §10)
| Item | Doc ref | Where |
|---|---|---|
| Hero rewrite — "I build payment and product infrastructure for the markets most operators avoid." + exact sub-copy + 3 CTAs | §4A | `src/routes/index.tsx` |
| Proof band — 6 scope-tagged cells (SINCE 2009 · 10 MARKETS · 3 INDUSTRIES · $1B+* · 270M+* · 150+*), footnote "* Simpaisa platform, current role" | §4B | `src/components/home/homeSections.tsx` |
| Map strip — dotted-world SVG, 10 markets, hub arcs, CSS-only motion | §4C | `WorldMap.tsx` + `scripts/gen-map.mjs` (build-time) |
| Industry pillars → `/product-work?industry=payments\|ecommerce\|ott` | §4D | homeSections + product-work filter |
| Credentials strip (MIT Sloan · PMI Youngest PM of the Year 2015 · PMI Karachi VP · PCI-DSS L1 + ISO 27001 "(platform)") | §4G | homeSections |
| Get-in-touch band → "The right conversation depends on who you are." + Hiring/Building/Press doorways | §4I | homeSections |
| Logo cloud relabel → "Merchants served by platforms I've led." | §10 P0 | index.tsx |
| Person schema: `workLocation` (9 verified markets — Nigeria excluded pending owner), `knowsAbout` career additions; past employers deliberately NOT forced into `worksFor` (no valid schema.org property — represented on /journey as ItemList instead) | §7 | `src/routes/__root.tsx` |
| New nav: **Work · Journey · Insights · Speaking · About** + Book CTA; For-recruiters/Resume/Contact moved to footer "Connect" | §3 | `SiteChrome.tsx` |

### P1 (doc §5, §10)
| Item | Where |
|---|---|
| **/journey** — the signature page: `<WorldMap showLabels />`, 3-era timeline (sticky labels, scroll-driven beam w/ static fallback), all 10 market cards from `src/data/markets.ts`, ItemList JSON-LD (9 confirmed markets) | `src/routes/journey.tsx` |
| **/about** — operator story (~600 words): cold open, the arc, 3 operating beliefs, scope-tagged credentials, 3 doorways; AboutPage JSON-LD via `#person` @id. **The /about→/resume 301 removed in BOTH `about.tsx` and `.htaccess`** | `src/routes/about.tsx` |
| **/speaking** — 3 ready-to-book talks (doc-verbatim titles, real-work abstracts), MoneyPetrol as *upcoming* (no embed/date claimed), CFP kit w/ 50/100/250-word bios | `src/routes/speaking.tsx` |
| **Industry filter** — `?industry=` in the Zod searchSchema + `INDUSTRY_RULES` (mirrors existing `THEME_RULES`), inline-script filtering, chip row; deep links verified: payments→17, ecommerce→3, ott→3 | `src/routes/product-work.index.tsx` |
| **3 new case studies** (verified numbers only): `daraz-checkout-conversion-false-declines` (+15% conversion, −20% false declines), `daraz-multi-market-settlement-reconciliation` (99.5% settlement, ~40% coverage), `tapmad-dcb-monetisation-wallet-migration` (0→5M subs, 50%→~1% cost, ARPU +70%, $10M+ ARR); OG cards generated | `src/data/caseStudies.ts` + `public/og/product-work/` |
| **Meta titles** — the 5 doc-specified strings on home/journey/work/about/speaking | route `head()`s |

### Foundation (commit bdce9b6)
`src/data/markets.ts` (canonical 10-market source) · `scripts/gen-map.mjs` → `world-map.generated.ts` (static SVG, 69KB) · `profile.ts` `career{}`/`platform{}` blocks · routes registered · **two-tier claims gate** added to `scripts/seo-audit.ts` (fails the build when a career marker and a platform metric share one clause; block-element boundaries = clause boundaries so the scope-tagged proof band passes by design).

## 2. Assumptions made — confirm or override
1. **Years canon = "operating since 2009"** (doc default). ⚠️ The resume PDF + LinkedIn still say "14+ years" — sync them the same week you merge, or the footprint-consistency rule is violated.
2. **10-market list used as given.** Nigeria has NO supporting bullet in `profile.experience` → rendered honestly with `TODO(owner)` text + "◇ Detail pending" tag, and **excluded from all structured data** (workLocation, ItemList).
3. **Hero H1 = the doc's recommended line** ("markets most operators avoid").
4. **Portrait unchanged** (existing cutout; no new photography sourced/generated).

## 3. TODO(owner) inventory
- `src/data/markets.ts` — Nigeria: years/brand/shipped item (then flip `needsOwnerConfirm`, re-run `bun scripts/gen-map.mjs`, and the map caption can upgrade "worked in"→"shipped in").
- `src/routes/speaking.tsx` — headshot download URL (site portrait is a hashed bundle asset; publish a print-ready file to /public first).
- Resume PDF + LinkedIn "since 2009" sync (assumption #1).
- Merchant name in hero uses "TikTok, Samsung, Shein and Uber" (all in `profile.partners`); the doc's "Temu" was NOT used — it isn't in the verified partner list. Add it to profile.ts first if you want it named.

## 4. Gate results (final run)
```
bun run build:static  → Done: 171 routes prerendered, 0 failed.
bun run seo:audit     → ✓ SEO audit passed. No issues.
bun run content:validate → 0 failure(s), 148 warning(s)  (warnings pre-existing)
bun run typecheck     → 0 errors
eslint (changed files) → 0 problems (after --fix formatting)
```
Output verification: hero/proof/map/pillars/credentials/doorways/marquee on home; journey = 10 labeled pins, 10 market cards, 3 eras, ItemList=9; about live (no 301 anywhere); speaking = 3 talks, MoneyPetrol coming-soon, 0 iframes; nav = Work·Journey·Insights·Speaking·About; Person.workLocation = 9; all 3 case-study pages + OG cards exist; industry chips live.

## 5. Explicitly out of scope (per the run brief)
Testimonials (needs real people) · podcast/video production + ElevenLabs/Transistor/YouTube wiring (owner accounts/recording) · weekly-flagship engine changes · `~/rzifi-content-pipeline` · Next.js migration gate (Oct decision) · anything in `~/.codex/automations/` (Codex app owns it; external edits don't persist).

## Integration notes (for the reviewer)
- Two cross-file typing issues from parallel work were resolved at integration: industry deep-links ship as plain `<a>` (static MPA — real navigations; the route now validates `?industry=`), and journey/see-the-work CTAs fire through the DOM analytics bridge (`data-analytics-*`), which needs no union change.
- The two-tier gate initially FAILED the integration build on the proof band (adjacent career+platform cells concatenated by tag-stripping). Fixed in the gate, not the page: block-element closes now count as clause boundaries. In-sentence mixing still fails — tested.
- One agent-authored meta description exceeded 165 chars (/speaking) and two more (home 181, about 173, journey 175) were caught on the second full-tail audit pass; all four trimmed.
