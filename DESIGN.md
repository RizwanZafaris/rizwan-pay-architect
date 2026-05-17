---
name: Rizwan Zafar, Payments Product Executive
description: Editorial-product hybrid portfolio site for a regulated-payments CPO. Stratechery pacing in Linear clothes.
colors:
  brand-cyan: "oklch(0.78 0.12 215)"
  ink: "oklch(0.22 0.02 250)"
  ink-soft: "oklch(0.52 0.015 250)"
  background: "oklch(0.995 0.003 220)"
  surface: "oklch(0.985 0.006 220)"
  surface-2: "oklch(0.96 0.012 220)"
  rule: "oklch(0.92 0.01 220)"
  card: "oklch(1 0 0)"
  destructive: "oklch(0.65 0.22 27.325)"
typography:
  display:
    fontFamily: "Instrument Serif, Source Serif 4, Georgia, serif"
    fontSize: "clamp(56px, 12vw, 148px)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
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
  sm: "12px"
  md: "14px"
  lg: "16px"
  xl: "20px"
  "2xl": "24px"
  "3xl": "32px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  "2xl": "80px"
  "3xl": "160px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.brand-cyan}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "28px"
  card-feature:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.3xl}"
    padding: "32px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  pill-eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.brand-cyan}"
    typography: "{typography.label}"
    padding: "0"
---

# Design System: Rizwan Zafar, Payments Product Executive

## 1. Overview

**Creative North Star: "The Operator's Quarterly"**

A trade-press quarterly for specialists in regulated payments, written for peer Directors and CPOs, not for casual readers. Editorial pacing of a printed magazine, presented through the tight, considered surfaces of a serious product tool like Linear. The site is heavy on display serif, restrained colour, monospace metadata, and generous whitespace; it earns trust through specificity rather than ornament.

The design refuses the gravitational pull of every category cliché it could fall into. **It is not a SaaS landing page** (no purple-to-blue gradients, no hero-CTA-feature-grid template, no Inter-for-everything). **It is not a recruiter-bait CV site** (no resume-as-website with a big circle headshot and timeline component). **It is not the cyber-neon aesthetic** so common in crypto / Web3 / fintech ("trendy" → cliché → forgotten in 18 months). And it is not an agency consultant brochure with stock photography of professionals in suits.

The reader leaves with one feeling: _this person operates at Director / VP level._ Calm, specific, expensive without being loud.

**Key Characteristics:**

- Display serif (Instrument Serif) handles every hero moment; sans (Inter) carries body where readability dominates; serif (Source Serif 4) carries long-form prose.
- Monochromatic ink-on-near-white surface with one accent (cyan) used as restraint demands, typically <10% of any screen.
- Mono-cap labels with wide tracking (`tracking-[0.22em]`) for eyebrows, metric labels and meta, the Bloomberg-terminal detail that signals data depth.
- Cards are rounded `2xl` (24px) or `3xl` (32px), with subtle `bg-noise` overlays on hero gradients for film-grain texture.
- Diamond glyph (◆) as the section eyebrow lead, quietly maintained across all sections as the signature mark.

## 2. Colors: The Quiet-Daylight Palette

A near-white canvas tinted toward the brand cyan, with ink that is a deep desaturated navy rather than true black. The single accent (cyan) is the loudest colour on the site, used sparingly to signal navigation hover, brand callouts, and the eyebrow ◆ glyph. **There is no dark mode in production today**, a future variation lives in `src/styles.css` under `.dark` but is not user-toggleable.

### Primary

- **The Brand Cyan** (`oklch(0.78 0.12 215)`): the single accent. Used on the ◆ eyebrow, hover states, italic-emphasis spans (`<span class="text-[var(--brand)]">`), the resume-download pill on hover, and the marquee dividers. Almost never as a background fill except on the "About me" sticker card on the homepage.
- **The Brand Foreground** (`oklch(0.22 0.02 250)`): the dark ink colour, used when text sits on a brand-cyan field.

### Neutral

- **Ink** (`oklch(0.22 0.02 250)`): the body and heading colour. Desaturated deep navy. **Not** true black, true black on a near-white field looks brutalist and contradicts the editorial register.
- **Ink-soft** (`oklch(0.52 0.015 250)`): supporting copy, captions, nav default state, the "since 14+ years" voice. Use generously to create hierarchy without size or weight.
- **Background** (`oklch(0.995 0.003 220)`): the canvas. Tinted toward cyan by a chroma of 0.003, readable as "white" but ties everything together.
- **Surface** (`oklch(0.985 0.006 220)`): one tone above the canvas. Used on form-field backgrounds, blog and case-study cards, the resume preview strip.
- **Surface-2** (`oklch(0.96 0.012 220)`): one tone deeper. Used on the homepage "about" band, the footer, and the "more case studies" sibling band.
- **Rule** (`oklch(0.92 0.01 220)`): the only border colour on the site. Used at 1px on every card, divider and field.

### Destructive (used minimally)

- **Destructive** (`oklch(0.65 0.22 27.325)`): contact-form validation errors only.

### Named Rules

**The One Voice Rule.** The brand cyan is used on ≤10% of any given screen. Its rarity is the point, when it appears on a hover or in an italic span, it has to _mean_ something. Filling a hero with brand cyan would collapse the editorial register.

**The Tint-Every-Neutral Rule.** No `#fff`, no `#000`, no `#f3f4f6`. Every neutral on this site is tinted toward the brand hue with a chroma of 0.003–0.012. This is invisible at the pixel level and load-bearing at the system level, it is why the site reads as a unified surface rather than a stack of components.

## 3. Typography

**Display Font:** Instrument Serif (with Source Serif 4, Georgia, serif as fallback).
**Headline Font:** Source Serif 4 (Source Serif Pro, Georgia, serif).
**Body Font:** Inter (ui-sans-serif, system-ui).
**Editorial Body Font:** Source Serif 4 (for blog post and case study body copy, long-form reading).
**Label/Mono Font:** JetBrains Mono (ui-monospace, SFMono-Regular).

**Character:** a trio that pairs _editorial gravitas_ (Instrument Serif at hero scale) with _information density_ (Inter for nav, KPI tiles, button labels) and _data depth_ (JetBrains Mono for eyebrows, metric labels, dates, status badges). The serif carries the brand mood; the mono carries the operator credibility.

### Hierarchy

- **Display** (Instrument Serif, weight 400, `clamp(56px, 12vw, 148px)`, line-height 0.88, letter-spacing -0.02em): hero H1 only. "I'm Rizwan." sits here, gradient-clipped on the name only, a deliberate exception to the gradient-text ban because the gradient runs ink → ink, with brand-cyan only on the highlight, and is used exactly once on the entire site.
- **Headline** (Source Serif 4, weight 500, `clamp(2rem, 5vw, 3.75rem)`, line-height 1.05, letter-spacing -0.02em): section H2s ("Products I have built…", "The posts I'd read first."). Often paired with an italic span in brand cyan that does the colour work.
- **Title** (Source Serif 4, weight 500, 1.5rem, line-height 1.25): card titles, case study list titles, product names.
- **Body** (Inter, weight 400, 1rem, line-height 1.5): UI text, button labels, nav, CTAs, KPI strip copy.
- **Body Editorial** (Source Serif 4, weight 400, 1.125rem, line-height 1.75, capped at ~65ch by max-w-3xl containers): blog post body, case study prose, About page narrative.
- **Label** (JetBrains Mono, weight 600, 10px, letter-spacing 0.22em, uppercase): eyebrows (preceded by ◆), KPI labels, dates, status pills, navigation meta. The 0.22em tracking is the signature detail, it reads as data, not decoration.

### Named Rules

**The 65ch Rule.** Any prose surface (blog post body, case study prose, About page narrative) is capped at ~65 characters per line via a `max-w-3xl` container. This is non-negotiable for long-form reading.

**The Italic-as-Accent Rule.** Section headlines almost always end with an italic word in brand cyan: _"…I am building."_, _"…read first."_, _"…shipped at scale."_ The italic does the rhetorical work the gradient-text ban forbids.

**The Mono-Caps-Eyebrow Rule.** Every section starts with a label in `font-mono-tech`, uppercase, `tracking-[0.22em]`, prefixed with ◆ and the section name. This is the site's most repeated pattern and its strongest visual signature.

## 4. Elevation

The site is **flat by default**. Surfaces sit on the canvas without shadow at rest; depth comes from background tone (background → surface → surface-2) rather than blur. Two exceptions, both deliberate:

1. **Hover on case study cards**, a single warm shadow grows on `:hover` (`box-shadow: 0 25px 50px -25px color-mix(in_oklab,var(--brand)_50%,transparent)`). The shadow uses brand cyan at 50%, so the hover state quietly tints the page toward the brand colour. Pair with `hover:-translate-y-1` for a 4px lift on cards.
2. **Sticky header**, a soft inset highlight and a downward shadow (`0_8px_30px_-12px_rgba(15,23,42,0.18)`) keeps the header pill visually attached to the canvas while scrolling.

No other surface uses shadow. Blog cards, KPI tiles, the resume preview strip and the footer are all flat, depth is conveyed by the 1px `rule` border + a one-tone surface shift.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to a state change (hover, focus). A flat-at-rest design with motion-on-hover reads as confidence; a shadowed-at-rest design reads as decoration.

**The Brand-Tinted Shadow Rule.** When shadows do appear, they carry brand cyan at low alpha rather than being pure black. This is what keeps hover states from feeling Bootstrap-default.

## 5. Components

### Buttons

- **Shape:** fully pill (`rounded-full` = 9999px). No square buttons anywhere, pills are the entire button vocabulary.
- **Primary:** `bg-ink text-background` (dark navy fill, near-white text). On hover: `bg-brand` (cyan fill, ink text). Padding `12px 24px`. Used for the single most-important CTA on every page ("Download resume", "See product work", "Discuss a role").
- **Ghost:** `border border-ink/20` with `text-ink`. On hover: `border-ink/50`. Same pill shape and padding as primary. Used for secondary CTAs and for nav items in the sticky header.
- **Tiny pill:** mono-tech, uppercase, tracking 0.12em, used on filter chips, the audience anchor links on `/for`, and the lens chips at the top of `/product-work`. Always paired with the diamond ◆ glyph.

### Cards / Containers

- **Corner Style:** `rounded-2xl` (24px) on inline cards, `rounded-3xl` (32px) on hero / about-band / CTA cards.
- **Background:** `bg-surface` for inline cards (blog, case study, product), `bg-card` (pure white) only on the homepage editorial cards. The "About me" sticker card on the homepage is the one exception, a brand-cyan-to-ink gradient fill with white text.
- **Shadow Strategy:** none at rest. Hover applies the brand-tinted lift (see Elevation).
- **Border:** `border border-rule` always. The 1px tinted border is what makes flat-at-rest design feel intentional.
- **Internal Padding:** `p-6` to `p-7` on inline cards, `p-8` to `p-10` on hero / CTA cards.

### Inputs / Fields

- **Style:** `bg-background border border-rule rounded-md` (14px corners). White-on-near-white with a 1px ruled border.
- **Focus:** `focus:ring-2 focus:ring-ink/20 focus:border-ink`, the focus ring is dark ink at 20% alpha (not cyan), keeping the focus state quiet and not pulling colour into form-heavy surfaces.
- **Error:** the field gets `aria-invalid` and an error message in `destructive` colour below. The field border itself does not change colour (avoiding the all-red field look).

### Navigation

- **Sticky header** at `top-0 z-40`. Pill-shaped container (`rounded-full`) with `backdrop-blur-xl` and a soft inset/down shadow. Max-width `6xl`, padded 3-4 horizontally.
- **Logo mark:** "RZ" in a small ink-fill square (`h-8 w-8 rounded-lg bg-ink text-background`), sans label on mobile, paired with the name + "Payments · Product" mono-caps sub-label on `sm+`.
- **Nav items:** sans-serif, 13px, ink-soft default → ink + light ink-tinted background on hover. Active state via `activeProps`, ink + light bg.
- **Mobile menu:** trigger on `<lg`, opens a dialog with focus trap, inert main + footer, Esc-close, Tab-cycling. The dialog itself is a `bg-background` panel `rounded-2xl` positioned `inset-x-3 top-20`.

### Signature: The Marquee Strip

A horizontally-scrolling band of partner / customer names (TikTok · Uber · InDrive · Temu · MoneyGram · PUBG · DLocal · Thunes · Boku · Coda) in display serif, separated by a brand-cyan ✦ glyph. 40s linear infinite, paused on `:hover` and `:focus-within`. Disabled under `prefers-reduced-motion`. This is the site's most distinctive non-text element, it's the credibility proof that doesn't fit in a card grid.

### Signature: The Hero Gradient Pair

Two large radial blurs (`blur-[140px]` and `blur-[120px]`) on the hero, both using `color-mix(in_oklab,var(--brand)_X%,transparent)` at 28% and 22% respectively. They are atmosphere, not content, `aria-hidden`, `pointer-events-none`. Effect: a quiet wash of cyan light behind the H1 without committing the page to a saturated background.

## 6. Do's and Don'ts

### Do:

- **Do** lead every section with the ◆ + mono-caps eyebrow. It is the site's most-repeated and most-effective signature.
- **Do** end section H2s with an italic span in brand cyan when emphasis is needed. It does the rhetorical work the gradient-text ban forbids.
- **Do** use Source Serif 4 at 1.125rem with `line-height: 1.75` for any prose surface longer than ~150 words. Cap at ~65ch via `max-w-3xl`.
- **Do** keep KPI tiles flat with a 1px `rule` border, mono-tech values, and mono-caps labels at 10px / tracking 0.22em. This pattern is the data-depth proof on `/for`, the homepage about band, and case study heroes.
- **Do** tint every neutral toward the brand hue (chroma 0.003–0.012). It is invisible at the pixel level and load-bearing at the system level.
- **Do** keep cards flat at rest. Hover applies a brand-tinted lift only, never a default shadow.
- **Do** keep the `prefers-reduced-motion` opt-out on every animation (marquee, ring-pulse). Already in place; do not remove.
- **Do** use the resume preview strip pattern (12 KPI tiles + 3 panels + 3 CTAs) on `/for` and `/resume`, these are the product-utility surfaces inside the brand register.

### Don't:

- **Don't** introduce a purple-to-blue gradient. Anywhere. Even on a single button. The current cyan accent is the colour vocabulary, adding a second gradient breaks the personality.
- **Don't** use Inter for headlines. Inter is the body voice; the serif is the brand voice. Mixing them collapses the editorial register.
- **Don't** use `#000` or `#fff`. The tinted neutrals (`oklch(0.22 0.02 250)` for ink, `oklch(0.995 0.003 220)` for background) are the only valid blacks and whites on this site.
- **Don't** add side-stripe borders on cards or alerts (`border-left: 4px solid brand-cyan` style). It is one of the absolute bans in PRODUCT.md. Use a full border, a tinted background, a leading number, or nothing.
- **Don't** use glassmorphism as a default. The sticky header uses `backdrop-blur-xl` once, intentionally. Adding it elsewhere is decoration.
- **Don't** ship the hero-metric template (big number, small label, gradient accent, repeated 4×). The KPI strip pattern used on `/for` is the _only_ sanctioned version of this, and it earns its keep because it has 12 specific operator metrics, not 4 generic ones.
- **Don't** introduce identical card grids of 6 capabilities. The site already has too many `grid md:grid-cols-3 gap-5` repetitions, refactor toward varied layouts, not more of the same.
- **Don't** use em dashes (`,`) in copy. PRODUCT.md is explicit about this. Use commas, colons, or parentheses instead.
- **Don't** introduce a modal anywhere. The contact form is inline. The mobile menu is a panel. No modal pattern exists on the site and none should be added.
- **Don't** rebrand the diamond ◆ glyph. It is the section signature. Replacing it with a different glyph (▲, ●, ✦) per section would dilute the system.
- **Don't** add stock photography of people. The portrait of Rizwan is the only photograph on the site, and that is correct.
- **Don't** add a dark-mode toggle without a real reason. The `.dark` variables exist in CSS but no toggle is wired up. Adding one without a user need is decoration. If you do add it, audit every surface, the dark palette in `styles.css` has not been visually tested.
