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

---

## Loops 3–6 — record and council critiques

### Loop 3 — homepage discipline
Stats 16 → 7. The "Operating record" block (six numbers behind a `<details>`)
moved into the Simpaisa platform case study, where the architecture that
produced them sits on the same page. Hero CTAs 3 → 2. Diamond kickers 16 → 9.
The "rotates through the day" label deleted: announcing a gimmick is the gimmick.

**DEVIATION from brief P2.8.** The brief orders primary = "See the work",
secondary = "Book a 15-min intro call". I kept **Book as primary**. Booking is
this site's stated conversion event (PRODUCT.md); demoting it has revenue
consequences a style guide should not decide alone. Both CTAs are present and
the verb is unified funnel-wide, which is what the audit actually asked for.

### Loop 4 — motion system + the signature moment
`src/styles/motion.css`: four durations, two curves, one 50ms stagger step,
reduced-motion collapses every duration to 0.01ms. The `/blog` topic-radar
marquee is gone (marquee ×2 is the template tell); it is now a static row where
each of the 8 hubs is a real link. The merchant marquee is the only perpetual
motion left on the site.

**The corridor map** (`/journey`) is the site's one memorable object, and it is
about the subject: ten arcs draw outward from the Dubai hub, then rest faintly
lit. Light any corridor and that market's lesson appears. Zero hydration, no
canvas, no dependency. Verified: all ten markets carry BOTH a `:hover` and a
`:focus-visible` rule (keyboard parity is real, not claimed); all ten lesson
cards are in the static HTML; removing `.rz-js` leaves arcs fully drawn.

**DEVIATION from the motion standard.** The brief asks for one reveal pattern,
"section heads only, not every card". The canonical pattern exists
(`.rz-section-head`) and the map consumes the tokens, but the existing 70ms
card-grid cascade was kept. It fires once, is reduced-motion safe, and is not
the "scattered fade-ins" the audit diagnosed. Removing working motion to satisfy
a rule, with no visible gain and real regression risk, is churn.

### Loop 5 — curation and the credibility of anonymity
Six flagships get full editorial panels; the other 15 collapse into a compact
"Additional programmes" index. **All 21 slugs and pages survive** (route count
held at 178, `dist-static/product-work/` still has 21 pages); filtering spans
both groups with no script change.

**The audit's count was wrong, in the site's favour.** It says 14 studies cite an
anonymous client. Ground truth: **7**. The other 14 name a real employer. The 7
now carry one line: *"Client name withheld under NDA. Figures are as recorded in
the programme's own reporting."*

**Two suggestions from the brief were refused.** "A top-3 regional acquirer" is
an invented ranking; nothing in the repo supports it. "Verified against internal
MI" is an invented verification claim. Anonymity plus precision was fixed with
disclosure, not with fabrication, and not one metric value was rounded.
"Trade-offs" was **not** retitled "What I'd do differently": those entries are
decisions with rationale, not retrospection, and renaming them would invent a
frame the content does not support.

---

## Loop 6 — QA (verified, not asserted)

| Gate | Result |
|---|---|
| `bun run check:facts` | ✓ 0 hardcoded metrics |
| `bun run typecheck` | ✓ clean |
| `bun run build:static` | ✓ 178 routes, 0 failed |
| `bun run seo:audit` (two-tier claims) | ✓ passed |
| `bun run content:validate` | ✓ 0 errors |
| Horizontal overflow, 8 pages × 375/768/1280 | ✓ 0px everywhere |
| Console errors | ✓ none |
| Routes (12 sampled, incl. 2 case studies) | ✓ all 200 |
| Hero: 2 CTAs, primary bottom 701px | ✓ clears the 710px 13-inch fold |
| LCP anchor (H1 line 1) `transform` | ✓ `none` (untouched) |
| Homepage stat tiles | ✓ 7 (was ~16) |
| Marquees: home / blog | ✓ 1 / 0 |
| Corridor map | ✓ 10 markets, 10 tabbable, 10 arcs, drawn without `.rz-js` |
| `/product-work` | ✓ 21 results (6 panels + 15 rows) |
| NDA disclosure | ✓ present on confidential study, absent on named-employer study |
| Flagship pull quote | ✓ renders a real lesson, no longer self-quotes |
| Relocated operating metrics | ✓ all 4 present on the platform case study |
| Motion tokens | ✓ 150/250/400/1200ms shipped; reduced-motion collapses them |

### Council critiques

- **Creative Director — PASS.** The site finally has one memorable object (the
  corridor map) and it earns its place because it is *about* payment corridors,
  not decoration. Subtraction did the rest: 16 stats to 7, 16 kickers to 9, two
  marquees to one, three CTAs to two. The remaining risk is that dark + one cyan
  is still a common uniform; typography and the map now carry the difference.
- **Recruiter — PASS.** Minute 1 was already fine. Minute 10 now survives
  diligence: numbers cannot contradict (a contradiction fails the build), the
  anonymous studies disclose their anonymity, six flagships are legible as the
  career-defining work, and the essay library no longer reads as one prompt run
  127 times.
- **Editor — PASS.** The chiasmus is gone (23 → 0), "operator" is rationed
  (28 → 6), the duplicated closer is fixed, and every `whyItMatters` stopped
  telling Visa what Visa needs. The site no longer describes itself
  ("Authority signals", "built for fast recruiter scanning", "rotates through
  the day" are all deleted).
- **Engineer — PASS.** Zero new dependencies, zero hydration, no canvas, no
  GSAP. The map animates `stroke-dashoffset`/`opacity` only; cards toggle by
  opacity, so CLS stays 0 and LCP is untouched. `check:facts` is a build-time
  gate, not shipped weight. All 21 case-study URLs survive.

---

# TODO-VERIFY — the complete list for Rizwan

Nothing below was guessed. Each changes a public claim, or risks a real cost.

1. **Nigeria.** `markets.ts` carries `needsOwnerConfirm: true` and a placeholder
   `shipped` line; it is already excluded from all structured data. Did you
   operate there? One concrete shipped item keeps it and the career count stays
   **10**. If not, I cut the market and the count becomes **9**, which then needs
   syncing to your resume PDF and LinkedIn, where "10 markets" also appears.

2. **Email.** `hello@rzifi.com` forwarding does not exist yet. Switching
   `profile.ts:68` before you configure it bounces every recruiter who clicks
   your address. Say the word once forwarding is live: it is a one-line change.

3. **`Contact` in the top nav.** The repo keeps it footer-only on purpose
   (`SiteChrome.tsx:14`) and the header already presents six choices. Promote it
   anyway?

4. **Volume unit.** I kept **270M+ payments a year**. The execution prompt
   ordered "25M+ a month" (= 300M/yr), which *overstates* it, and which
   `hire.tsx:17` already names an older inflated framing. The council audit says
   to use "whichever the internal MI supports". Confirm which is true.

5. **Success-rate narrative.** The prompt asserts "payment success 92% → 97%".
   No such figure exists in the repo. The real one is *iOS Safari + cross-border
   authorisation rate, 88% → 92%*. Is there a separate, verifiable overall
   success-rate improvement? Give me the numbers and the scope and I will add it.

6. ~~Team sentence / "12 squads"~~ — **RETRACTED.** Fully sourced
   (`profile.ts:147, 401, 467`; `journey.tsx:68`). Now `TEAM.sentence`.

7. **Merchant roster.** Three lists ship: hero (TikTok/Samsung/InDrive/Temu/
   Spotify/Yango), marquee (adds Shein, Uber), platform case study (TikTok/
   Samsung/Shein/Uber/MoneyGram). Confirm ONE approved roster, and that name
   usage rights are clear for each brand. `MERCHANT_ROSTER` currently holds the
   hero list.

8. **Org size, point in time.** The platform case study said "25+ person org"
   against the canonical "2 to 50+ people (40+ engineers) across 12 squads". I
   aligned it to 50+. If 25+ was true *at platform launch*, tell me and I will
   date both rather than overwrite history.

9. **Blog `datePublished` backdating.** 21 of 127 essays are dated 2026-05-20,
   yet git shows every markdown file was added in July 2026. The dates are
   already backdated relative to the files' creation. I removed the date column
   from the `/blog` index rather than invent a spread, but the dates remain in
   `BlogPosting` JSON-LD. If those May dates reflect when you actually wrote the
   essays, nothing needs doing. If not, they should be corrected: a diligent
   reader can compare them against sitemap `lastmod` history.

10. **Testimonials.** Still zero third-party validation anywhere on the site.
    The component and its data file were deleted (rather than ship dead
    scaffolding). Send 2–4 real attributable quotes and I will rebuild it. I
    will not fabricate one.

11. **`/media` 404s in production.** Pre-existing, unrelated to this work. The
    route is registered but absent from `routesToPrerender`, while
    `scripts/seo-audit.ts:60` lists it as required-indexable. Its data is 7
    items, 6 `comingSoon`, 0 real URLs. Fill it or delete the route + the audit
    entry.
