---
name: Rizwan Zafar, Payments Product Executive
description: Dark-cinematic executive portfolio for a regulated-payments CPO. "The Operator's Console" — a live payments network seen from the operator's seat.
colors:
  signal: "oklch(0.80 0.13 180)"
  signal-soft: "oklch(0.87 0.11 178)"
  signal-deep: "oklch(0.39 0.07 187)"
  paper: "oklch(0.14 0.004 285)"
  paper-2: "oklch(0.15 0.004 285)"
  paper-3: "oklch(0.18 0.005 285)"
  ink: "oklch(0.95 0.005 85)"
  ink-soft: "oklch(0.73 0.004 85)"
  rule: "oklch(1 0 0 / 0.1)"
  destructive: "oklch(0.65 0.22 27.325)"
typography:
  monument:
    fontFamily: "Instrument Serif, Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 8.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "Instrument Serif, Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  utility-title:
    fontFamily: "Instrument Serif, Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-editorial:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 600
    letterSpacing: "0.22em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  section-sm: "clamp(3.5rem, 6vw, 6rem)"
  section-md: "clamp(5rem, 9vw, 9rem)"
  section-lg: "clamp(6.5rem, 12vw, 11rem)"
motion:
  ease-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-soft: "cubic-bezier(0.22, 1, 0.36, 1)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.ink} / 0.2"
    rounded: "{rounded.full}"
  card-glass:
    backgroundColor: "rgba(22, 22, 27, 0.55)"
    borderColor: "{colors.rule}"
    rounded: "{rounded.lg}"
    padding: "28px"
  kpi-tile:
    backgroundColor: "{colors.paper-3}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: The Operator's Console

> Supersedes the retired "Quiet Daylight" light theme (inverted 2026-07-09).
> The `.dark` block still present in `styles.css` is dead code from that era.

## 1. Overview

**Creative North Star: "The Operator's Console."**

The visitor is looking at a live payments network from the operator's seat. One
narrative device carries every design decision: **signal moving along rails**.
Light pulses travel hairlines the way money travels infrastructure. Sections
hand off to each other with a beam running along their top rule. Numbers settle
like a ledger closing. The cursor is a probe: whatever surface it inspects
lights up from within. Nothing bounces, nothing spins. Everything routes.

The reader leaves with one feeling: _this person operates at Director / VP
level._ Cinematic, specific, expensive without being loud.

**Key characteristics**

- Warm near-black stage. Never `#000`, never `#fff`.
- Display serif at monument scale carries every hero; imagery is a supporting
  layer, not the subject.
- One accent (cyan) occupies under 5% of any viewport. Its rarity is the point.
- Mono-caps labels at `tracking-[0.22em]`, always led by the ◆ glyph.
- Zero shipped React hydration. Every interaction is CSS or one inline vanilla
  engine. This constraint is the reason LCP is ~180ms and CLS is 0.

## 2. Color: warm near-black, one signal

- **Signal** `#2dd4bf` — the only visible accent. Links, focus rings, eyebrows,
  rail pulses, section beams, probe glow, italic emphasis words. 9.6:1 on base.
- **Signal-deep** `#0e4f4f` — gradients and glows only. Never text (1.5:1).
- **Signal-soft** `#5eead4` — hover-bright rims and pulse cores.
- **Paper** `#0a0a0b` (base) / `#0c0c0e` (alt sections) / `#101013` (raised).
- **Ink** `#f2f0ec` (warm off-white) / **ink-soft** ~66% mix for secondary text.
- **Rule** `rgba(255,255,255,0.1)` — the only hairline on the site.

### Named rules

**The token-source rule.** The whole palette derives from six `:root` tokens in
`styles.css`. Everything else is `var()` or `color-mix(in oklab, ...)`. Change a
source token and the entire system recomputes. Never hardcode a color.

**The one-voice rule.** Cyan is spent like money. If it appears, it means
something: a link, a focus ring, a signal pulse, an emphasis word.

**The tint-every-neutral rule.** Every grey is a color-mix against the warm base.
No neutral greys, no pure black, no pure white.

## 3. Typography

**Display:** Instrument Serif. **Editorial body:** Source Serif 4. **UI body:**
Inter. **Data / labels:** JetBrains Mono.

- **Monument** `clamp(2.75rem, 7vw, 8.5rem)` — the homepage H1 only. Four short
  lines, full-bleed. Line 1 is the LCP anchor: never wrapped, transformed, or
  clipped.
- **Statement** `clamp(2.5rem, 5.5vw, 5.5rem)` — every brand-register section
  and inner-page title.
- **Utility title** `clamp(2.25rem, 4vw, 3.5rem)` — `/resume`, `/for`, `/hire`.
  Capped on purpose: these surfaces must stay scannable, not monumental.
- **Body editorial** 1.125rem / 1.75, capped at ~65ch via `max-w-3xl`.
- **Label** 10px mono caps, `tracking-[0.22em]`, always preceded by ◆.

### Named rules

**The 65ch rule.** Non-negotiable on any prose surface.

**The italic-as-accent rule.** Statement headings end in an italic cyan word:
_avoid._ · _three arenas._ · _at scale._ · _who you are._ The italic does the
rhetorical work that gradient text is banned from doing.

**The light-on-dark rule.** Light type reads lighter than dark type. Body copy on
this stage carries slightly more line-height than a light theme would need.

## 4. Layout

- **Monument shells** `max-w-[1400px]`, **content shells** `max-w-6xl`,
  **prose** `max-w-3xl`.
- Section spacing is assigned by editorial **weight**, not uniformly:
  `--space-section-sm/md/lg`. Ten identical gaps read as a template.
- Composition vocabulary, in order of preference: full-width **index rows**
  (huge mono index + statement serif title + right-column body, whole row is the
  link) → **alternating 12-col editorial panels** → **divide-y lists** →
  hairline-divided **open columns**. Cards are the last resort.

### Named rules

**The no-uniform-grid rule.** Three equal cards in a row is banned in the brand
register. The one sanctioned exception is the functional **KPI tile grid** on
`/resume` and `/for`, which earns its keep with specific operator metrics.

**The flat-at-rest rule.** Surfaces carry a 1px rule and no shadow at rest.
Depth arrives as a response to state (probe glow, hover lift), never as
decoration.

## 5. Motion

Three verbs. Two easings. Everything is `.rz-js`-gated, reduced-motion-silent,
and no-JS safe (content fully visible without the engine).

- **Route** — light travels a line: hero rail pulses (`offset-path`), section
  beams (`.rz-beam`), link underline wipes. 1.6–2.4s.
- **Settle** — content lands: staggered reveals (`data-rz-stagger`, 70ms
  cascade), count-ups with `tabular-nums`, once. 500–700ms, `--ease-expo`.
- **Answer** — the surface responds: probe glow (`data-glow`, cursor-tracked),
  magnetic CTA (`data-magnetic`, ±8/±6px), card lift, nav swap. 160–260ms,
  `--ease-soft`.

Cross-page: CSS View Transitions (fade-rise, 350ms). Chromium only, silent
fallback elsewhere.

### Named rules

**The one-infinite rule.** At most one perpetual animation per viewport (hero
rails, or the marquee, never both).

**The compositor rule.** Animate `transform` and `opacity` only. Never layout
properties. Decorative layers are `position:absolute`, `aria-hidden`,
`pointer-events:none` — CLS 0 by construction.

**The desktop-only-response rule.** Probe glow, magnetic pull, and cursor
parallax are gated behind `(hover:hover) and (pointer:fine)`. Touch devices get
scroll choreography instead.

## 6. Signature elements

- **The monument hero.** Four-line H1 at 7vw, portrait as a cinematic cut-out
  layer behind a legibility scrim, WebGL plasma-rails backdrop, top status rail
  (location + availability), bottom hairline rail (certifications + scroll cue).
- **The signal-words band.** Steering particles assemble domain vocabulary
  (PAYMENTS, WALLETS, CROSS-BORDER, SETTLEMENT, FRONTIER MARKETS), hold, then
  dissolve. Hold-and-drag scatters them.
- **The ledger.** Five counters settle left to right, `tabular-nums`, followed by
  a single cyan spotlight sweep. A ledger closes once; it does not shimmer.
- **The marquee.** Merchant names in display serif, ✦ dividers, paused on hover
  and focus-within.
- **The ghost signature.** "Rizwan Zafar" in outlined serif at `min(10.5vw,
  10rem)`, 7% ink stroke, rising behind the footer columns. The closing
  statement.

## 7. Do's and don'ts

### Do

- Lead every section with ◆ + mono-caps eyebrow.
- End statement headings with an italic cyan word.
- Reach for index rows before cards.
- Keep KPI tiles flat, bordered, mono, `tabular-nums`.
- Gate every animation behind `.rz-js` and `prefers-reduced-motion`.
- Derive every color from the six source tokens.

### Don't

- **Don't** ship a hydrated component. It renders dead markup in this build.
- **Don't** hardcode a hex, or use `#000` / `#fff`.
- **Don't** build a uniform three-card grid outside the KPI exception.
- **Don't** add side-stripe borders, gradient text, or decorative glassmorphism.
- **Don't** merge career-scope claims ("17 years", "ten markets") with
  platform-scope claims ("$1B+", "150+ merchants") inside one clause. The
  `seo:audit` gate fails the build, and the distinction is the credibility.
- **Don't** fabricate a testimonial. `src/data/testimonials.ts` stays empty
  until real attributable quotes exist.
- **Don't** add a modal, an emoji icon, or a second accent color.
- **Don't** rebrand the ◆ glyph.
- **Don't** install a motion library. GSAP, Lenis, and R3F all require shipping a
  runtime that would end the zero-hydration architecture. Every reference-site
  effect on this site is vanilla WebGL, canvas, or CSS.
