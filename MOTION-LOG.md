# MOTION-LOG

Section-by-section record of the motion/interaction elevation of rzifi.com.
Each entry: what changed · source (21st.dev component name + id, or "custom") · before/after.

**Ground rules inherited from `src/styles/motion.css`** — durations 150/250/400ms
(map 1200ms, hero 900ms once), two curves, 50ms stagger, transform+opacity only,
`prefers-reduced-motion` → static, ONE marquee sitewide.

---

## Section 0 — Infrastructure (unplanned; blocking)

**Problem.** `bun run dev` had been dead for weeks. Two independent bugs, stacked:

1. **Vite dep-optimizer crash.** `@tanstack/start-server-core` imports virtual
   specifiers (`#tanstack-router-entry`, `#tanstack-start-entry`,
   `tanstack-start-manifest:v`, …) that only the Start plugin resolves. esbuild's
   prebundler does not run Vite resolvers, so scanning that package hard-failed
   `vite dev` before it could listen.
   *Fix:* `optimizeDeps.exclude` for that package — repeated under
   `environments.server` / `environments.ssr`, because the Cloudflare plugin runs
   its own Vite environment and per-environment `optimizeDeps` **replaces** the
   top-level one. (TanStack/router#5554, #5795.)

   **Amendment — excluding the package alone was not sufficient.** It appeared to
   work once, then the crash returned on the next cold boot. Excluding
   `@tanstack/start-server-core` only stops *that package* from being prebundled;
   it does not help when another scan path reaches the virtual specifiers
   directly, and whether it does is sensitive to optimizer-cache state. The
   durable fix names **each specifier** in the exclude list as well, so they
   resolve to `external` instead of hard-failing no matter which scan finds them.
   Verified on a cold boot (`.vite` deleted) *and* a warm boot with an 11 MB
   post-`build` cache present: both `ready` in ~2.5s, `HTTP 200`, zero
   `Could not resolve` errors. The fix now survives `bun run build`.

2. **Duplicate router plugin → `ReferenceError: TSRSplitComponent is not defined`.**
   `tanstackStart()` already bundles the router plugin (`start-plugin-core/start-router-plugin`).
   Registering `tanstackRouter()` alongside it applied the code-splitting codemod
   twice: pass 1 rewrote a route into a `TSRSplitComponent` reference, pass 2
   stripped the definition. Every SSR render 500'd.
   *Fix:* drop the standalone `tanstackRouter()`; move `autoCodeSplitting` into
   `tanstackStart({ router: { autoCodeSplitting: true } })`.

**Verification.** `/` → HTTP 200, `/journey` → HTTP 200, zero errors in the dev log.
`bun run build` → exit 0, worker emitted at `dist/server/index.js`, virtual modules
resolved (`_tanstack-start-manifest_v-*.js`). **Deploy path unchanged.**

**Why it belongs in a motion log.** Motion work is iterative; without HMR the loop
was "static rebuild → guess". This fix is the precondition for every section below.

Files: `vite.config.ts`.

---

## Section 0b — Audit: the motion contract is not actually in force

Before spending a dollar of the 21st.dev Pro subscription, I audited what the two
prior sprints (`loop4a: motion token system`, `loop4b: corridor map`) actually left
behind. The brief's premise — "the site feels static" — is **substantially out of date**:
the navbar already shrinks on scroll, a scroll-progress hairline exists, the merchant
marquee already pauses on hover, view transitions are declared, and the corridor map
is built.

But the headline guardrail — *one motion token system* — **is violated today.**

`src/styles/motion.css` declares "Four durations. Nothing else." and "Two curves."
The codebase disagrees:

| | Declared in `motion.css` | Actually used in stylesheets |
|---|---|---|
| Durations | 150 / 250 / 400 / 1200ms | `260ms` ×14, `180ms` ×14, `600ms` ×10, `620`, `520`, `420`, `160`… |
| Curves | `--ease-out-quart`, `--ease-in-out-quart` | `--ease-soft` ×21, `--ease-expo` ×19 (quart: ×13 / ×1) |

Usage splits perfectly by file:

| Stylesheet | rogue curve refs | sanctioned curve refs |
|---|---|---|
| `motion.css` | 0 | 4 |
| `corridor-map.css` | 0 | 10 |
| `styles.css` | 16 | 0 |
| `chrome-next.css` | 6 | 0 |
| `hero-next.css` | 6 | 0 |
| `next.css` | 7 | 0 |
| `sections-next.css` | 5 | 0 |

Reading: loop4a wrote the token file, loop4b honoured it for the map — and the later
"Operator's Console" (`-next`) layer ignored it completely. The sanctioned vocabulary
is the *minority dialect* in its own codebase.

Additional contract breaches found:

- `chrome-next.css` transitions **`padding`** (a layout property the contract bans)
  at `260ms` with `--ease-soft` — an unlisted duration *and* an unlisted curve.
- `styles.css:2274` — `transition: top 150ms ease` (layout property + raw `ease`).

**Consequence for this engagement.** The highest-value work is not bolting on new
animations; it is (a) unifying the vocabulary so the site reads as one designer, and
(b) filling the genuinely-missing interactions. Sections below are therefore marked
DONE / PARTIAL / MISSING against evidence, not against the brief's assumptions.

---

## Section 0c — The 22-section verdict matrix

Produced by a 12-agent parallel audit (6 readers × per-page evidence, then 21st.dev
sourcing for real gaps only). Every verdict is backed by a `file:line` citation.

**DONE: 11 · PARTIAL: 9 · MISSING: 2**

| # | Section | Verdict |
|---|---|---|
| 1 | Navbar | DONE — scroll-state pill, per-link swap, scroll-progress hairline |
| 2 | Hero | DONE — most motion-dense section on the site |
| 3 | Stat strip | DONE — cross-browser counters + signature sweep |
| 4 | Merchant strip | DONE — transform-only, hover/focus pausable, the one sanctioned marquee |
| 5 | Case study cards | DONE — stagger, art wipe, headline word-reveal |
| 6 | **Journey teaser** | **MISSING** — no bridge from homepage to /journey |
| 7 | Writing/Insights row | DONE |
| 8 | About/FAQ | DONE — JS-less disclosure morph |
| 9 | CTA/booking | DONE |
| 10 | Footer | DONE — top-rule beam + signature reveal |
| 11 | Filter bar | PARTIAL — no layoutId pill, no FLIP re-sort |
| 12 | Study grid | PARTIAL — no shared-element morph to detail |
| 13 | Corridor map | DONE — arcs draw on scroll, keyboard-lit |
| 14 | Era timeline | PARTIAL — not sticky-scroll storytelling; no pinned panel |
| 15 | Lesson cards | DONE |
| 16 | **Hiring lens switcher** | **MISSING** — jump-links, not a stateful segmented control |
| 17 | Proof/signal rows | PARTIAL — checklists reveal as one block; fire on load, not scroll |
| 18 | Blog index | PARTIAL — no underline draw; topic filter is `el.hidden`, no crossfade |
| 19 | Essay page | PARTIAL — no next-essay card; progress bar is Chromium-only |
| 20 | Route transitions | PARTIAL — **two view-transition systems collide**; 200/320ms, never 250ms |
| 21 | Scroll-reveal system | PARTIAL — **contract inverted**: 6 competing patterns, not 1 |
| 22 | Focus/press states | PARTIAL → **DONE (this sprint)** |

The three cross-cutting PARTIALs (20, 21, 22) are guardrail *violations*, not polish.
They are the highest-leverage work in the brief.

---

## Section 22 — Focus & press states  ✅ shipped

**Before.** `:active` was defined **zero** times across every stylesheet — the site had
no press feedback whatsoever. `:focus-visible` existed only per-component (`.nav-link`,
`.blog-result-card`, `.case-study-card`, the corridor map, `.skip-link`). A bare
`<button>` — the consent controls, the mobile menu toggle, form submits — had neither a
focus ring nor a press response.

**Source.** 21st.dev `Button` — **id 18672**, author `cnippet_dev` (Base UI). The only
catalog button shipping an explicit documented `focus-visible` ring *and* a real pressed
-state contract. Extracted the two **recipes**, not the polymorphic component: the ring
and the press. Rejected its `transition-shadow`/inset-shadow press styling (shadows are
outside the transform+opacity budget).

**After.** New `src/styles/focus-press.css`, imported last, as a base safety net.

The load-bearing decision is `:where()`. Every selector is wrapped in it, contributing
zero specificity, so each rule lands at `(0,1,0)` — the weight of its lone pseudo-class.
That makes it *strictly* a gap-filler:

- `.blog-result-card:focus-visible` `(0,2,0)` still wins → bespoke rings untouched.
- `.home-card-lift:hover` `(0,2,0)` still wins over the press transform `(0,1,0)` →
  cards keep their hover lift rather than fighting a press. Verified: card retains its
  own `0.22s` timing while a bare button gets `150ms`.

**The trap this hit, and the fix.** `focus-press.css` is unlayered, and unlayered CSS
outranks *every* `@layer` — including Tailwind's `utilities`. A first pass declaring
`transition-property: transform` silently deleted the colour fade of everything carrying
Tailwind's `transition-colors`; `.nav-link`'s hover colour began snapping. Caught by
reading computed styles in the browser, not by eye. The fix is a **superset**: Tailwind's
default transition-property list *plus* `transform`. Nothing that used to fade stopped
fading.

Contract compliance: press is `transform: translateY(1px)` (transform only, no layout),
`--dur-micro` (150ms), `--ease-out-quart`. Under `prefers-reduced-motion` the outline
survives (an outline does not move) and the translate is removed.

**Verified** (dev server, computed styles + served CSS):

| Element | `transition-property` | duration |
|---|---|---|
| `.nav-link` | `transform` + colour set | `150ms` |
| bare `<button>` | `transform` + colour set | `150ms` |
| `.home-card-lift` | its own set | `220ms` (unchanged) |

Served CSS contains `outline: 2px solid var(--signal)` and exactly one `translateY(1px)`.
`bun run typecheck` clean · `bun run build` exit 0 · all routes 200.

**Deliberately not done:** the source component's `pointer-coarse` 44px min-tap-target.
Applying `min-height` to every `a`/`button` is a *static layout* change (it would reflow
the cert chips and nav pills), not a motion change, and the brief forbids layout shift.
Flagged for a separate a11y pass.

Files: `src/styles/focus-press.css` (new), `src/styles.css` (import).

---

## Section 20 — Route transitions  ✅ shipped

**Before — a genuine bug, not a polish gap.** Two stylesheets each declared
`@view-transition { navigation: auto }` and each animated `::view-transition-old/new(root)`:

- `styles/next.css` — `rz-vt-out 200ms`, `rz-vt-in 320ms … 80ms`
- `styles.css` — `::view-transition-old/new(root) { animation-duration: 160ms }`

`next.css` is `@import`ed **above** `styles.css`, so the later `animation-duration: 160ms`
silently overrode both. The site actually crossfaded at **160ms**, while two files each
believed they owned the transition, and the brief's mandated 250ms existed nowhere.

**Source.** 21st.dev `Presence Fade` — **id 18251**, author `corr`. Used as the *structural*
reference (crossfade + reduced-motion collapse to opacity-only), not adopted as code: this
site does cross-document MPA navigations, where the native View Transitions API is strictly
better than an `AnimatePresence` route wrapper. Taking the component wholesale would have
meant deleting a working native implementation to reintroduce it in JS.

**After.** One owner. `next.css` holds the declaration and both keyframes, retimed to
`--dur-standard` (250ms) on `--ease-out-quart`, with the incoming root held back by exactly
one `--stagger-step` so old and new roots do not double-expose. The rival block and its
160ms override are deleted from `styles.css`; what remains there is the half that never
collided — `.site-header { view-transition-name: site-header }`, which is the shared-element
morph the brief asked for (the header persists across routes rather than crossfading).

**Verified** in the served CSS: `@view-transition` appears exactly twice (the declaration +
its `reduced-motion` override), `animation-duration: 160ms` appears **0** times, both roots
resolve to `var(--dur-standard) var(--ease-out-quart)`, and `view-transition-name` appears
exactly once.

Files: `src/styles/next.css`, `src/styles.css`.

---

## Section 21 — One motion language  ◑ partially shipped

The audit's verdict was "the contract is inverted". Two distinct problems; the first is
fixed, the second is scoped but not finished.

### 21a — The vocabulary is now singular  ✅

**The root cause, found in a comment.** `styles.css` declared, in its own words,
*"Two easing curves only"* — `--ease-expo` / `--ease-soft`. `styles/motion.css` declares,
in its own words, *"Two curves."* — `--ease-out-quart` / `--ease-in-out-quart`. **Two
competing "only two curves" systems**, 38 call sites to 14. That is the entire incoherence,
in one sentence.

Rather than edit 38 call sites (and miss some), the rival pair now **aliases into** the
constitution:

```css
--ease-expo: var(--ease-out-quart);   /* was cubic-bezier(0.16, 1, 0.3,  1) */
--ease-soft: var(--ease-out-quart);   /* was cubic-bezier(0.22, 1, 0.36, 1) */
```

Both were ease-out curves, so the feel is preserved within a few milliseconds while the
vocabulary collapses to one, atomically, with zero risk of a missed site. They are marked
deprecated; migrating the 38 names is a mechanical follow-up.

**Durations.** Every `transition` / `animation` / `delay` in the `-next` layer is now a
token. Off-grid literals in that layer: **0**. Notable corrections:

| Where | Was | Now | Why |
|---|---|---|---|
| `[data-rz-stagger] > *` | 18px / 600ms / 70ms | 14px / `--dur-section` / `--stagger-step` | a *second* near-miss reveal; now identical grammar to the heading reveal |
| `rzs-card-in` (stagger cards) | 18px / 600ms / 70ms | 14px / `--dur-section` / `--stagger-step` | same |
| `.rz-rail-field` (hero) | `opacity 1100ms … 420ms` → ends 1520ms | `--dur-section` @ `--hero-count` → ends 780ms | hero budget is 900ms **total**; it was 69% over |
| `.rz-beam` sweep | `1.7s` | `--dur-map` (1200ms) | it outlasted the corridor map, the site's one sanctioned long moment |
| `.header-pill` | `padding 260ms` | `padding --dur-standard` | see exception below |
| footer signature | `1100ms` | `--dur-section` | claimed a third long-moment exception it was never granted |

**Two exceptions, now named rather than scattered.** A transition that fires on every
pointer move is not a state change — it is a low-pass filter on cursor input, and its
number is a time constant. Forcing `60ms` magnetism onto a 150ms grid makes the magnet
feel elastic. So `motion.css` gained a clearly-separated category, `--track-magnet: 60ms`
and `--track-lean: 600ms`, with rule 1 amended to say the four durations govern *state
changes*. Previously these were unexplained `60ms`/`220ms`/`600ms` literals.

`.header-pill` still transitions `padding`, a layout property rule 4 bans. Kept as a
documented exception: it is a **one-shot** change when `html.rz-scrolled` flips at the 24px
threshold, not a scroll-linked animation, so the reflow is paid once per crossing and never
inside the scroll frame loop.

**The quiet win.** A hardcoded `transition: transform 600ms` *ignores* `motion.css`'s
reduced-motion override, because that override only rewrites the `--dur-*` variables. Every
such literal was therefore invisible to `prefers-reduced-motion`. Now that they are tokens,
reduced-motion actually reaches them. Proven in-browser by forcing `--dur-section: 0.01ms`
on `:root` and watching a revealed stagger child fall from `0.4s` → `1e-05s`
(and back). The tracking constants are zeroed in the reduced-motion block too, belt and braces.

### 21b — Rival reveal patterns still exist  ⏳ not done

Unifying the *numbers* is not the same as deleting the duplicate *patterns*. `styles.css`
still contains **21 off-grid declarations**, and — worse than off-grid durations — **raw
`cubic-bezier()` literals that are neither sanctioned curve**:

- `cubic-bezier(0.2, 0.8, 0.2, 1)` (blog underline, status rise)
- `cubic-bezier(0.22, 1, 0.36, 1)` (`bg-paths-draw`) — the old `--ease-soft` value, inlined
- `transition: transform 1150ms` on the hero — still over the 900ms hero budget
- `.rz-unveil` `clip-path 920ms` — a clip-wipe reveal that is not the one reveal
- per-child delays of `55ms`, `95ms + 140ms`, `200ms` — not the 50ms step

Remaining §21 work is to delete the rival reveals (`.rz-words`, `.rz-unveil`, `[data-hero-in]`,
the card/image stroke-draws) so only `.rz-section-head[data-rz-reveal]` and the `data-rz-stagger`
cascade survive, per 21st.dev **Scroll Reveal id 18654** (`educalvolpz`) as the locked primitive.
This is deliberately a separate change: it removes motion, so it needs its own before/after review.

**Verified this sprint:** `bun run typecheck` clean · `bun run build` exit 0 ·
`/`, `/journey`, `/for`, `/product-work`, `/blog` all 200 · all 7 tokens resolve in-browser ·
both deprecated curves compute to `cubic-bezier(0.25, 1, 0.5, 1)` · header pill 250ms ×4 ·
beam 1.2s @ 0.2s delay · stagger child 0.4s.

Files: `src/styles/motion.css`, `src/styles.css`, `src/styles/next.css`,
`src/styles/hero-next.css`, `src/styles/chrome-next.css`, `src/styles/sections-next.css`.

---

---

## Design review — alignment, polish, transformation/transaction sections

A 23-agent review (5 critics × all pages, then adversarial verification of every
P0/P1) produced 51 findings. **13 survived verification; 5 were rejected** as
intentional, documented decisions — notably "no real type scale" (the 11 clamp()
ramps are a deliberate, commented system) and "container widths vary across pages"
(6xl body / 4xl speaking / 5xl case-detail is editorial intent, not drift).

Terminology note: nothing on the site is named "transformation" or "transaction".
Those map to the case-study narratives (incl. the Tapmad digital-transformation
programme) and the payments/transaction-volume content.

### Shipped

**Hero portrait** (explicitly reported as misaligned).
- *Grid.* Was `right-0` — pinned to the VIEWPORT edge, 20px outboard of the type
  grid. The cut-out carries only ~19px (2%) of transparent margin beside the
  subject (measured: opaque bbox 19,203 → 910,1152 of a 928×1152 file), so his
  shoulder sat flush against the screen and read as accidentally cropped. The
  wrapper now repeats the content container's `mx-auto max-w-[1400px] px-…`.
  Verified: image right edge = 1372px = the headline's right edge, exactly.
- *Letterbox.* `aspect-[4/5]` (0.800) fought the file's real 0.8056 ratio AND
  `max-w-[40vw]`, letterboxing twice. Now height-driven (`h-[62svh] w-auto`);
  measured letterbox 0px top, 0px side (was 5px top). `width`/`height` corrected
  920×1150 → 928×1152.
- *Double fetch.* The preload's `imageSizes` ("…440px") and the `<picture>`'s
  `sizes` ("…44vw, 40vw") resolved to 440px and 576px at 1440 — DIFFERENT srcset
  candidates — so every homepage load downloaded both the 460w and the 920w file.
  The comment above the preload claimed it prevented exactly that. Both now read
  one `PORTRAIT_SIZES` constant. Verified: 1 image request, was 2.
- *Mobile waste.* The portrait is `hidden` below md, but a `display:none` <img>
  still downloads: phones were fetching 44KB for an image never painted. The
  preload is now `media`-gated, and a first `<source media="(max-width:767px)">`
  hands phones a 1×1 transparent GIF. Verified at 716px: `currentSrc` is a data
  URI, 0 bytes.

**Homepage rail jog (P0).** `IndustryPillars` carried the *hero's* measure
(`max-w-[1400px] px-5 sm:px-8 lg:px-12`) while `ProofBand` above and Selected-work
below sat at `max-w-6xl px-5 sm:px-6`. At 1440px its left rail was ~100px outboard
of its neighbours', so the eyebrow and headline visibly slid sideways mid-scroll —
the page read as three templates stitched together. Now 6xl. Verified: both
sections' content-box left edge = 168px. (The wide measure stays with the
full-bleed hero, which the portrait is anchored to.)

**Proof strip (P1).** `md:grid-cols-5` holding exactly 4 stats. `grid-cols-5`
compiles to 5 equal fixed tracks, so the tiles filled 4/5 of the row and the
`divide-x` hairline stopped short of the right edge. Now `md:grid-cols-4`.
Verified: `276px 276px 276px 276px` for 4 children.

**KPI tiles ending in "..." (P0).** `case-study-ui.ts` compacted long metrics with
`value.slice(0, 31) + "..."`. Flagship case-study heroes rendered
"Routed wallet traffic ~38%..." in giant italic serif. A KPI that trails off is
worse than one that wraps. The ellipsis branch is deleted; reducers now also
strip a trailing parenthetical and accept `~`-prefixed counts (`~40k (…)` used to
fall straight through). Where nothing compacts, the full value is returned intact
and the display-serif tile drops a type step via the new `isCompactMetric`.
Verified across all 111 metrics: **0 ellipses** (9 long values now size down).

**Essay body was the site's biggest static surface (P1).** `motion.css` defines
exactly one sanctioned reveal — `.rz-section-head[data-rz-reveal]` — and a
repo-wide grep found it applied to **zero elements**. The pattern was dormant.
That is, concretely, why the site feels static. It is now wired to `##` headings
in the markdown renderer, scoped to `depth === 2` so `###` sub-points stay still.
Verified on a live essay: 12/12 h2 revealed at 400ms / `--ease-out-quart`,
0 h3 leaked, TOC anchors intact.

**Form-field contrast (P1).** `--input` was defined in both themes with the
comment "3:1 non-text contrast for form-field boundaries", exported as
`--color-input`, and applied to nothing; all 14 fields drew `--rule`
(rgba(255,255,255,.1) = **1.25:1**, failing WCAG 1.4.11). Wired once in
`focus-press.css` rather than at 14 class sites.
*And the token itself was wrong*: at 35% ink it measures **2.42:1** — its own
comment overstated it. 41% is exactly 3.00, so it is now 43% (3.21:1).
Verified: 8 bordered fields, min contrast 3.21, all pass.

**Gutter (P1).** `/product-work` opened at `px-4` while every other page uses
`px-5 sm:px-6`; entering it nudged the content rail 4px left on mobile.

### Confirmed but NOT done (deliberately deferred)

- **Diagrams illegible on mobile** — fixed 880-wide viewBox yields ~4px text.
  Needs a real responsive strategy (min-width + scroll affordance, or a mobile
  variant), not a one-line patch.
- **Diagrams reused across studies; one caption describes a picture it isn't
  showing** — only 3 architecture SVGs exist against ~25 studies. Content work.
- **"AI-tell" abstract stock renders still front every case-study hero** — the
  exact imagery the homepage already removed. Content/asset work.
- **270M+ has three different labels; the two Tapmad studies disagree with each
  other** — a facts/consistency fix that must route through the fact base, not
  through me guessing.
- **Two serif display faces** (Source Serif 4 + Instrument Serif) — plausibly
  intentional; needs an owner decision, not a unilateral change.

Files: `src/routes/index.tsx`, `src/routes/product-work.index.tsx`,
`src/routes/blog.$slug.tsx`, `src/components/home/homeSections.tsx`,
`src/lib/case-study-ui.ts`, `src/styles.css`, `src/styles/focus-press.css`.

---

## Light / dark theme  ✅ shipped

**What was there.** Nothing. `:root` *is* the dark palette (`--paper: #0a0a0b`,
`--ink: #f2f0ec`), and a `.dark` block sat below it holding a stale `oklch`
palette from an earlier design — applied by **no element, ever**, with **zero**
`dark:` utilities anywhere in the codebase. It was a decoy: the file looked
themed while the site was dark-only. `:root { color-scheme: light }` on a
near-black page compounded the lie (a hack to stop forced-dark auto-inversion).

**Why it was tractable.** The token system is properly derived: `--ink-soft`,
`--muted-foreground`, `--input`, `--rule`, `--surface-raised-edge` and the chart
ramp are all `color-mix()` of `--paper` / `--ink` / `--signal`. Only the
primitives needed overriding — *after* six hardcoded values were tokenized:

| Was | Now |
|---|---|
| `--rule: rgba(255,255,255,.1)` | `color-mix(in srgb, var(--ink) 10%, transparent)` |
| `--rule-hi`, `--surface-raised-edge`, `--surface-raised-highlight` | ink-derived |
| `.rz-rail { stroke: #fff }` | `var(--ink)` — it was invisible on a light page |
| hero scrim `rgba(10,10,11,α)` ×4 | `color-mix(… var(--paper) α%, transparent)` |

That last one mattered: the scrim is the legibility veil behind the monument
type, hardcoded to the dark page colour. On a light page it painted a black
wash over black type.

**`--signal` had to change.** `#2dd4bf` is 9.6:1 on near-black and ~1.8:1 on a
light page — unreadable as link text. Light mode uses `#0d6e64`, same hue family.

**Mechanics.**
- A blocking `<head>` script (first script on the page) resolves
  `localStorage` → OS `prefers-color-scheme` → dark, and stamps `data-theme`
  before first paint. No flash.
- It also listens for OS changes and follows them *only* while the visitor has
  made no explicit choice.
- The toggle is **stateless in React**: both icons render server-side and CSS
  picks one off `html[data-theme]`. Putting the theme in React state would make
  the server render one icon and the client another — a guaranteed hydration
  mismatch on every load where the visitor's theme differs from the default.
- `<html>` carries `suppressHydrationWarning`. React *does* diff `<html>`
  attributes (I initially wrote a comment claiming it doesn't; the console
  proved otherwise). This is the standard reconciliation for a pre-paint theme
  script, and it scopes to `<html>`'s own attributes, not its subtree.
- The toggle is hidden until the script adds `.rz-theme-js` — an inert control
  is worse than no control.
- Colour cross-fades over `--dur-standard` via a **transient**
  `.rz-theme-switching` class (300ms), so the document never permanently carries
  a universal `transition` rule. Disabled under `prefers-reduced-motion`.
- `color-scheme` now tells the truth: `dark` on `:root`, `light` in the override.

**Verified** (measured contrast, both themes, on /contact):

| | dark | light | required |
|---|---|---|---|
| body text | 17.39 | 17.54 | 4.5 |
| muted text | 4.68 | 4.54 | 4.5 |
| link (`--signal`) | 10.63 | 5.82 | 4.5 |
| form border | 3.21 | 3.18 | 3.0 (1.4.11) |

Toggle flips, persists to `localStorage`, icons swap, transient class applies.
`typecheck` clean, `build` green.

**Harness note for whoever verifies this next.** In a headless/hidden tab the
hero looks broken — `[data-hero-in]` sits at `opacity: 0`. That is not a bug:
`rz-hero-go` is set from a double `requestAnimationFrame`, and rAF never fires
while `document.hidden`. Screenshot with the tab visible, or drop `.rz-js` and
suppress transitions first.

Files: `src/styles.css`, `src/styles/focus-press.css`, `src/styles/hero-next.css`,
`src/routes/__root.tsx`, `src/routes/index.tsx`, `src/components/SiteChrome.tsx`.
