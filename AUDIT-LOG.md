# AUDIT-LOG.md

Loop-by-loop record of the execution brief. Each loop ends with a four-persona
council critique (Creative Director, Recruiter, Editor, Engineer) and any
`TODO-VERIFY` questions for Rizwan.

---

## Loop 0 — Premise check (before any code)

**The brief was audited against the LIVE production site, not this branch.**
`feat/nextgen-revamp` is seven commits ahead of `main`. Several "verified"
findings do not exist here, and one instruction would have made the site less
truthful. Each claim was grepped before acting.

| Brief's finding | Verified? | Evidence |
|---|---|---|
| Numbers contradict across pages | **YES** | 98 hardcoded metrics across 15 files (`bun run check:facts`) |
| Nigeria "detail pending" card | **YES** | `markets.ts` — 1 market with `needsOwnerConfirm: true` |
| Visible keyword chips on case studies | **YES** | `product-work.$slug.tsx:415` |
| Stuffed `<meta name="keywords">` | **YES** | `product-work.$slug.tsx:54` |
| "Authority signals" label on /blog | **YES** | `blog.index.tsx:257` |
| "Advisory conversations open Q4" | **YES** | `homeSections.tsx:417` |
| Gmail address in UI | **YES** | `profile.ts:68` and the newsletter `mailto:` |
| Volume stated as both 270M+/yr AND 25M+/month | **NO** | "25M" appears only in a warning comment and a parser docstring. Zero claims. |
| "7 markets" somewhere | **NO** | Appears only inside `hire.tsx:17`, in a note telling future editors not to use it |
| Success rate stated as both 97% and 8%→1.2% | **NO** | `1.2%` appears nowhere. No contradiction exists. |
| `−-90%` double-negative typo | **NO** | Not present. `"−90%"` appears once, as a parser example. |
| Duplicate PNC blog card on homepage | **NO** | Not present. |
| Three marquees | **PARTLY** | Two strips: merchant marquee (home), topic radar (blog) |
| Team size stated as 25+, 40+, AND 50+ | **REAL** (corrected in Loop 0b) | 50/40/12 are one nested fact (`profile.ts:147`), but `caseStudies.ts:134` did say "25+ person org". My first grep scoped too narrowly and missed it. Fixed. |

### Two brief instructions REJECTED, with reasons

**1. `volume: "25M+ payments a month"` — rejected. It overstates.**
25M × 12 = **300M/yr**, higher than the verified **270M+/yr**. The repo already
names this framing as inflated, in its own words at `src/routes/hire.tsx:17`:

> "All figures are the VERIFIED canonical fact base — do not reintroduce the
> older inflated framings (7 markets, 25M monthly, 50+ partners)."

Adopting it would have re-inflated a number the owner previously corrected, on a
site whose entire credibility rests on not doing that. `facts.ts` keeps
`270M+ payments a year` and documents the rejection.

**2. `successRate: "payment success improved from ~92% to ~97%"` — rejected. It does not exist.**
No `97%`-from-`92%` narrative is in the repo. The real, sourced figure is
**iOS Safari + cross-border authorisation rate, 88% → 92%**
(`caseStudies.ts`, tokenisation study). Writing the brief's version would have
been inventing a metric — which the brief itself forbids under Hard Constraints.

---

## Loop 1 — facts.ts + P0 credibility

### Shipped

- **`src/content/facts.ts`** — the single source of truth. It does not invent
  values; it re-exports the owner-ruled base in `profile.ts` and attaches the
  ONE approved phrasing to each, so neither the number nor the wording can
  drift. Encodes the two-tier rule in types: `CAREER` (17 years · 10 markets ·
  3 industries) vs `PLATFORM` (Simpaisa: $1B+ · 270M+/yr · 150+ merchants ·
  5 markets).
- **`scripts/check-facts.ts` + `bun run check:facts`** — fails the build when a
  claim-shaped literal (`$1B+`, `270M+`, `N markets`, `99.95%`, `25M+`,
  `7 markets`) appears in a route or component. Comments are exempt (the
  "do not reintroduce" notes must survive). `AnimatedMetric.tsx` is allowlisted:
  its docstring shows the parser's input formats, not claims.
  **Baseline at introduction: 98 violations across 15 files.**
- Migration of all 98 to `@/content/facts` (three parallel workstreams).
- **Removed human-visible SEO artifacts:** the `Keywords` chip block and the
  stuffed `<meta name="keywords">` tag on every case study.

### Deliberately NOT done in Loop 1 (with reasons)

- **Nigeria card / market count.** Blocking on owner. See TODO-VERIFY 1.
- **Gmail → `hello@rzifi.com`.** Blocking on owner. See TODO-VERIFY 2. Switching
  before forwarding exists would silently bounce recruiter mail — a real,
  irreversible cost.
- **`Contact` added to the top nav.** The repo deliberately keeps Contact
  footer-only (`SiteChrome.tsx:14`), and an earlier council critique flagged the
  header for already exceeding four decision points. Adding a sixth item makes
  that worse. See TODO-VERIFY 3.

### Council critique — Loop 1

- **Creative Director — PASS (abstains).** No visual surface changed. The one
  aesthetic gain: case studies no longer end with a bag of SEO keyword pills,
  which read as machine exhaust under an otherwise editorial page.
- **Recruiter — PASS.** A recruiter now cannot catch the site contradicting
  itself, because a contradiction fails the build. The keyword chips were the
  clearest "this page was written for Google, not for me" tell on the site.
- **Editor — PASS with a note.** `facts.ts` fixes numbers, not sentences. The
  formula prose ("X is not Y. It is Z.", "the operator's…") is untouched and is
  Loop 2's job. The phrase "…is the actual work" still appears in two blurbs.
- **Engineer — PASS.** No runtime cost: `facts.ts` is compile-time constants,
  tree-shaken into the static build. Zero new dependencies, zero hydration.
  `check:facts` is a build-time gate, not a shipped artifact. Gates: typecheck
  clean, `build:static` 178/0, `seo:audit` clean (the two-tier gate still
  passes after migration), `content:validate` exit 0.

---

## TODO-VERIFY — questions for Rizwan

These change public claims. I will not guess at them.

1. **Nigeria.** `markets.ts` lists Nigeria with `needsOwnerConfirm: true` and a
   placeholder `shipped` line; it is already excluded from all structured data.
   The brief says delete it and retitle to "Nine markets, nine lessons."
   **Question:** did you operate in Nigeria? If yes, give me one concrete
   shipped item and it stays (career count remains 10). If no, I cut the market
   and the career count becomes **9** — which then needs syncing to your resume
   PDF and LinkedIn, because "10 markets" appears there too.

2. **Email.** Do you want `hello@rzifi.com` live *now*? Forwarding does not
   exist yet. If I switch before you set it up, every recruiter who clicks your
   email address gets a bounce. Say the word once forwarding is configured and
   it is a one-line change (`profile.ts:68`).

3. **`Contact` in the top nav.** The repo keeps it footer-only on purpose, and
   the header already presents six choices. Do you want it promoted anyway?

4. **Volume unit.** Confirm: **270M+ payments a year** is correct and
   **25M/month** was the older inflated framing. If 25M/month is in fact the
   true current run-rate, that implies ~300M/yr and every page needs the higher
   number — tell me and I will migrate to it, sourced.

5. **Success-rate narrative.** The brief asserts "payment success 92% → 97%".
   I can find no such figure. The repo has "iOS Safari + cross-border auth rate
   88% → 92%". Is there a separate, verifiable overall success-rate improvement?
   If so, give me the numbers and the scope and I will add it.

6. ~~**Team sentence.** "12 squads" appears nowhere in the repo.~~
   **RETRACTED (Loop 0b).** I was wrong: `12 squads` is supported at
   `profile.ts:147, 401, 467`, and `2 to 8 PMs` at `journey.tsx:68`. The brief's
   reconciling sentence is fully sourced and is now `TEAM.sentence` in facts.ts.
   No question remains here.

---

## Loop 0b — Reconciling the full Council Audit against this branch

The complete council audit (received after the execution prompt) was re-checked
line by line. It is a **live-site** audit; this branch is 7 commits ahead. Three
of its Critical findings resolve differently here.

### The two documents disagree with each other

The **execution prompt** hardcoded `volume: "25M+ payments a month"` as canonical
and forbade the annual figure. The **audit** says the opposite thing correctly:

> "Volume: pick **one** — either '270M+ payments a year' or '25M+ a month'
> (they disagree by ~11%; use whichever **the internal MI supports**)."

Only the owner's MI can settle that. `facts.ts` holds `270M+/yr` (the repo's
CI-gated value) and the question is TODO-VERIFY 4.

### Findings re-tested on this branch

| Audit finding | Status here | Evidence |
|---|---|---|
| Team stated as 25+ / 40+ / 50+ | **PARTLY REAL** | `profile.ts:147` reconciles them: "from 2 to 50+ people (40+ engineers) across 12 cross-functional squads". 50/40/12 are one nested fact. But `caseStudies.ts:134` said **"25+ person org"** — a genuine contradiction. **Fixed**, aligned to canonical, TODO-VERIFY logged. |
| Success rate: 97% vs "8% → 1.2%" | **NOT REAL** | `1.2%` appears nowhere. The `"8% to"` matches are `"38% to 73%"` — frictionless-rate lift on the 3DS2 study. The audit misread the substring. No contradiction exists. |
| "2 to 8 PMs" | **REAL, SUPPORTED** | `journey.tsx:68` |
| "12 squads" | **REAL, SUPPORTED** | `profile.ts:147, 401, 467` |
| Merchant roster differs across pages | **REAL** | Hero: TikTok/Samsung/InDrive/Temu/Spotify/Yango. Marquee adds Shein + Uber. Platform case study: TikTok/Samsung/Shein/Uber/MoneyGram. Three rosters. `MERCHANT_ROSTER` now holds the hero (owner-attested) list; TODO-VERIFY 7. |
| PUBG in case study only | **NOT REAL** | `PUBG` appears nowhere in this branch. |

### Fixed in this pass

- `caseStudies.ts:134` — "25+ person org" → canonical 50+ / 40+ engineers /
  12 squads, with the point-in-time question logged.
- `facts.ts` — added `TEAM.sentence`, the one approved reconciling sentence.

---

## TODO-VERIFY — additions

7. **Merchant roster.** Three different lists ship today (see table above).
   Confirm ONE approved roster, and confirm name-usage rights for each brand.
   Until you do, `MERCHANT_ROSTER` uses the hero list.

8. **Org size point-in-time.** The platform case study said "25+ person org";
   the canonical bio says 50+. I aligned to 50+. If 25+ was true *at platform
   launch*, say so and I will date both ("25+ at launch, 50+ today") rather than
   overwrite history.

---

## Loop 2 — Content & positioning (in progress)

### Blog dates — investigated, cannot be "honestly redistributed"

The audit says ~15 essays share a publish date; the real count is **21 essays
dated `2026-05-20`** out of 127 entries. The brief says *"If earlier draft dates
exist in repo history, redistribute honestly."*

**They do not.** `git log --diff-filter=A -- content/blog/` shows every markdown
file was **added in July 2026 commits**, while carrying May frontmatter dates.
The dates are already backdated relative to the files' real creation. There is
no earlier honest date to recover, and inventing a spread would be fabricating
publication history on a site whose entire pitch is verifiable claims.

**Decision:** remove the visible date from the `/blog` index cards (dates remain
on the essay page and in `BlogPosting` JSON-LD, where a date is structurally
required). This removes the batch-publication tell without asserting anything
new. Forward cadence should be 1–2/week from here.

**TODO-VERIFY 9 (owner):** the `datePublished` values in JSON-LD are backdated
relative to when the files entered the repo. If those May dates reflect when you
actually wrote the essays, nothing needs changing. If not, they should be
corrected — search engines and any diligent reader can compare them against the
sitemap's `lastmod` history.

### check:facts — the gate itself was too weak, twice

1. It missed a bare `"150+"` KPI tile (caught by a migration agent, who
   correctly migrated it anyway rather than leave one hardcoded literal beside
   converted siblings).
2. It missed **spelled-out** counts. `"five markets"` and `"ten markets"` are
   exactly how the digit forms drifted apart. Tightening the rule surfaced
   **18 more** occurrences the digit-only rule had passed.
3. It flagged two *comments* as violations, because it only skipped lines that
   *begin* with a comment marker, not continuation lines inside a `/* … */`
   block. Fixed by stripping block comments before scanning (line numbers
   preserved).

`facts.ts` now carries `marketsWord` / `marketsWordCap` so editorial prose keeps
its word form ("five frontier markets") while still deriving from one source.
Digits belong in KPI tiles; words belong in sentences.

**A subtlety the gate cannot see:** `journey.tsx:55` reads "Daraz (Alibaba
Group): ran payment operations across **five markets**". That five is the
*Daraz* footprint, a career-era fact that merely coincides with Simpaisa's five
today. Binding it to `PLATFORM.marketCount` would be a latent bug: the day
Simpaisa operates a sixth market, the Daraz sentence would silently change to
"six". Those lines stay literal, by design.
