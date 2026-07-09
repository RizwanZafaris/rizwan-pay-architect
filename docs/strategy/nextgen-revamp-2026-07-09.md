# rzifi.com — Next-Generation Revamp (2026-07-09)

**Concept codename: THE OPERATOR'S CONSOLE.**
Creative direction, motion language, frame-by-frame animation plan, and build
record for the next-gen pass on top of the dark-cinematic base (commit 82d2a7f).

---

## 0. Repo audit (current state)

Base: TanStack Start static build (172 routes), **zero shipped hydration** —
all motion is vanilla CSS + one inline IntersectionObserver engine
(`rzRevealScript` in `__root.tsx`). Token-driven dark palette (`--paper`
near-black, `--ink` warm off-white, `--signal` cyan #2dd4bf as the single
accent). LCP 182ms, CLS 0, A11y/SEO 100.

What already works (keep, do not regress):
- WebGL2 fbm nebula hero backdrop + studio-light scrim (H1 contrast 17.4:1)
- H1 line-2 mask-rise entrance; proof-band glow sweep; count-up metrics
- Scroll-reveal engine with stagger delays; kinetic word-rise headings
- Dark glass cards, ecosystem marquee w/ edge fade, bg-paths footer backdrop
- Consent-gated GA4/LinkedIn/PostHog; seo:audit + two-tier claims CI gates

Audit — why it still reads below the Lusion/Oryzo tier:
1. **Nothing responds to the cursor.** Hover states exist, but no surface
   *tracks* the pointer. Premium sites feel sentient; this one feels filmed.
2. **One reveal grammar everywhere.** Every section enters the same way
   (fade+22px rise). No per-child stagger inside grids, no section handoff.
3. **Hard cuts between pages.** MPA navigation is a white-flash-free but
   abrupt swap; reference sites never cut, they *transition*.
4. **The close is weaker than the open.** Footer is a competent link grid;
   there is no finale. Reference sites end with a statement.
5. **Micro-defects:** hero plus-accent collides with the DUBAI·UAE tag;
   proof band's 5th metric orphans into its own row at small widths; the
   marquee doesn't pause on hover (usability).
6. **No scroll-position feedback** on long editorial pages.

## 1. Creative direction

**The Operator's Console.** The visitor is looking at a live payments network
from the operator's seat. One narrative device carried everywhere: **signal
moving along rails**. Light pulses travel hairlines the way money travels
infrastructure. Sections hand off to each other with a beam that runs along
their top rule. Numbers settle like a ledger closing. The cursor is a probe —
whatever surface it inspects lights up from within. Nothing bounces, nothing
spins; everything *routes*.

Story arc down the homepage: **Signal (hero) → Proof (ledger) → Territory
(map) → Arenas (pillars) → Evidence (case studies) → Network (marquee) →
Knowledge (topics) → Person (about) → Route in (doorways) → Finale (footer)**.

## 2. Visual identity direction

Unchanged canon, sharpened: near-black warm stage (#0a0a0b), warm off-white
serif voice, **one** visible accent (cyan #2dd4bf, chroma <5% of any
viewport), mono eyebrows with ◆, serif-italic cyan emphasis words. New
additions must spend cyan like money — pulses, beams and probe-glow are the
only new places it appears. No new colors, no gradients-as-decoration, no
glassmorphism beyond the existing budgeted dark glass.

## 3. Motion language

Two easings only (existing tokens): `--ease-expo` for entrances,
`--ease-soft` for hovers. Three motion verbs, used site-wide:
- **Route** — light travels along a line (rail pulses, border beams, link
  underline wipes). Duration 1.6–2.4s, linear-ish, infinite only in hero.
- **Settle** — content lands into place (reveals, counters, stagger). 500–700ms,
  ease-expo, once.
- **Answer** — surface responds to the visitor (probe glow, magnetic CTA,
  card lift, nav swap). 160–260ms, ease-soft, reversible.

Rules: nothing moves for more than 2.4s; at most one infinite animation per
viewport (hero rails, marquee); everything gated `.rz-js` + reduced-motion;
no-JS ships fully visible static page.

## 4. Page-by-page layout plan

- **Home:** section order unchanged (audited as sound); each section gets its
  motion identity below. Spacing scale untouched (`--space-section-*`).
- **Blog/case pages:** scroll progress hairline (CSS scroll-timeline,
  Chromium progressive enhancement).
- **All pages:** cross-document View Transitions (350ms fade-rise) so the site
  never hard-cuts. Chrome falls back silently elsewhere.
- **Journey/About/Resume:** inherit global systems (probe glow on cards,
  beams, staggers) — no structural change this pass.

## 5. Component system

New primitives (all zero-hydration, CSS + data-attributes):
- `[data-glow]` — probe-glow surface: radial cyan bloom that tracks the
  cursor inside the card (engine sets `--gx/--gy`), plus border highlight.
- `[data-magnetic]` — magnetic pull on the primary CTA (engine translates
  toward cursor within the button, spring-back on leave).
- `[data-rz-stagger]` — parent grid whose children reveal with 70ms cascade.
- `.rz-beam` — section top-rule beam: 1px cyan light runs the full width once
  when the section reveals.
- `.rz-rails` — hero SVG rail field with travelling pulses.
- `.rz-ghost-name` — footer finale outline typography.

## 6. Animation system (architecture)

One engine, one pass: `rzRevealScript` grows three small modules (pointer
probe, magnetic, header state) behind the same `.rz-js` gate. Pointer work is
delegated (single `pointermove` listener, `closest('[data-glow]')`,
rAF-throttled writes to CSS vars — no per-card listeners, no layout reads in
the hot path). All visual response happens in CSS via `transform`/`opacity`/
`background` on GPU-friendly properties. New CSS lives in
`src/styles/next.css` (+ per-area files), imported from `styles.css`.

## 7. Scroll interaction plan

- Reveal engine (existing IO) stays the single source of truth; new
  `data-rz-stagger` parents fan their children with `--i`-indexed delays.
- `.rz-beam` fires once per section on `.rz-in` (paired with the reveal, not a
  second observer).
- Header compacts after 24px scroll (`.rz-scrolled` on `<html>`, passive
  listener): pill tightens, backdrop deepens — the console acknowledges depth.
- Blog reading progress: `animation-timeline: scroll(root)` hairline, no JS.
- No scroll-jacking, no Lenis: native scroll is a deliberate choice (MPA,
  CLS 0, and smooth-scroll libraries need hydration we don't ship).

## 8. Frame-by-frame animation plan

**HERO — "Signal"**
- 0ms: H1 line 1 paints (LCP anchor — never wrapped, never transformed).
- ~180ms: line 2 rises from behind its clip; eyebrow + subline fade up
  (existing choreography, kept).
- +400ms: **rail field fades in** behind the right column — 5 SVG polylines
  tracing orthogonal "circuit" routes around the portrait; 3 light pulses
  begin travelling the rails on a 7–9s cycle (offset-path). The nebula stays
  as atmosphere; rails give it intent.
- Cursor: rails layer drifts 6px, plus-accents 10px, portrait glow-pocket 4px
  — three depths of parallax (fine pointers only). Nothing follows the cursor
  literally; the *scene leans*.
- Hover on "Book a 15-min intro call": magnetic pull ≤6px + glow ring
  (existing); arrow nudges forward.
- Avoided: typewriter gimmicks on the H1, mouse-trail effects, autoplaying
  numbers here (proof band owns numbers).

**PROOF BAND — "Ledger"**
- On reveal: numbers count up (existing), then the one-shot cyan spotlight
  sweeps L→R (existing). New: digits render `tabular-nums` so the count
  doesn't jitter; the 5 tiles stagger 70ms each so the ledger *closes*
  left-to-right; small-width grid rebalanced so no orphan tile.
- Avoided: infinite shimmer — a ledger settles once.

**MAP STRIP — "Territory"**: reveals with beam + stagger; market dots keep
their pulse (existing); no new motion — restraint after the loud hero.

**PILLARS / CASE STUDIES / TOPICS — "Arenas & Evidence"**
- Grids stagger-cascade on reveal (70ms).
- Cards become probe surfaces: cursor-tracked cyan bloom (~25% opacity ceiling)
  + hairline brightens; existing lift kept at 2px. Focus-visible gets the same
  bloom centered (keyboard parity).
- Section top rules run their beam once on reveal.
- Avoided: 3D tilt (fights the editorial voice), image zooms (no imagery in
  cards), skeleton shimmer.

**MARQUEE — "Network"**: pauses on hover/focus (usability defect fixed);
edge fades kept; speed untouched.

**ABOUT BAND — "Person"**: mint card keeps its identity (the one light
surface = the human moment); serif paragraph reveals with word-rise (existing
kinetic heading system).

**DOORWAYS ("who you are")** — three route cards get probe glow + stagger;
the bg-paths draw-in behind stays.

**FOOTER — "Finale"**
- Top rule runs a beam when footer enters.
- Behind the link columns: **ghost name** — "RIZWAN ZAFAR" in huge outlined
  serif (3–5% ink opacity, `-webkit-text-stroke`), clipped to the footer,
  rising 30px on reveal — the closing signature.
- Columns stagger in; every link keeps the underline-wipe.
- Avoided: marquees in the footer, social-icon bounce.

**CROSS-PAGE**: View Transitions — old page fades down 8px / new page rises
8px, 350ms ease-expo. Reduced-motion: instant swap.

## 9. Performance strategy

- Budgets: LCP ≤ 250ms local (hero line 1 stays untransformed), CLS = 0
  (all new layers `position:absolute`/`fixed`, `aria-hidden`, no layout
  participation), zero new network requests, JS additions < 2.5KB inline.
- Compositor-only response (`transform`, `opacity`); probe glow paints a
  `background` on hover-only elements (small area, low frequency).
- Rail pulses: CSS `offset-path` on 3 tiny nodes — no rAF, no canvas additions;
  nebula stays the single WebGL surface.
- Pointer engine rAF-throttled, passive listeners, zero layout reads on move
  (rects cached on `pointerenter`).
- `content-visibility` untouched; marquee pause is `animation-play-state`.

## 10. Responsive strategy

- Coarse pointers get **no** probe/magnetic/parallax (`(hover:hover) and
  (pointer:fine)` gate in both CSS and engine) — scroll choreography carries
  mobile instead.
- Rails hidden < md (the portrait column collapses; atmosphere is enough).
- Proof band: 2-col at ≤sm with the 5th tile spanning full width, centered.
- Ghost name scales with `clamp()`; beams full-bleed at all widths.
- Verified at 375 / 768 / 1280 / 1440.

## 11. Accessibility strategy

- Every new layer `aria-hidden="true"` + `pointer-events:none` (except cards
  themselves, which stay links with existing semantics).
- Reduced-motion: engine exits before attaching pointer modules; CSS belt
  disables beams/pulses/ghost-rise/view-transitions; content fully visible.
- Keyboard parity: probe bloom has a `:focus-visible` centered equivalent;
  magnetic never moves the button's hit area (transform only, ≤6px).
- Marquee `animation-play-state: paused` on `:hover` **and** `:focus-within`.
- Contrast: pulses/beams are decorative (non-text); all text tokens unchanged.

## 12. Build phases

1. Foundation: branch `feat/nextgen-revamp`; `src/styles/next.css`; engine
   modules (probe, magnetic, header state); View Transitions CSS.
2. Hero rails + parallax + accent-collision fix (`index.tsx`, `hero-next.css`).
3. Sections: stagger, beams, probe surfaces, ledger polish, marquee pause
   (`homeSections.tsx`, `index.tsx` sections, `sections-next.css`).
4. Chrome: scroll-aware header, footer finale (`SiteChrome.tsx`,
   `chrome-next.css`), blog progress hairline.
5. Integration + gates: build:static (172 routes), typecheck, seo:audit,
   content:validate.
6. Visual QA (preview MCP, forced end-states), responsive sweep, QA report.

## 13. Testing checklist

- [ ] `bun run build:static` — 172 routes, 0 failed
- [ ] `tsc` clean; `bun run seo:audit` clean
- [ ] 0 console errors on home/blog/case pages
- [ ] LCP element = H1 line 1, untransformed; CLS observer = 0
- [ ] No horizontal overflow 375/768/1280/1440
- [ ] Reduced-motion: no beams/pulses/parallax; all content visible
- [ ] No-JS: all content visible (engine gate intact)
- [ ] Keyboard: focus-visible bloom on cards; magnetic CTA hit-area stable
- [ ] Marquee pauses on hover and focus-within
- [ ] View transitions fire Chrome→Chrome, silent fallback Safari/Firefox
- [ ] Consent stack untouched (GA4/LinkedIn/PostHog still consent-gated)
