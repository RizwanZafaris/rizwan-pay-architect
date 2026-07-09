# QA Report — Next-Gen Revamp ("The Operator's Console"), 2026-07-09

Branch: `feat/nextgen-revamp` (local, not pushed — owner pushes/merges).
Scope: global interaction engine + hero rails + section motion + chrome/footer.

## Gates
| Check | Result |
|---|---|
| `bun run typecheck` (tsc --noEmit) | ✅ clean (all 3 workstreams + integration) |
| `bun run build:static` | ✅ 178 routes prerendered, 0 failed |
| `bun run seo:audit` (incl. two-tier claims + TODO gates) | ✅ passed, no issues |
| Console errors (home, static preview) | ✅ 0 |
| Horizontal overflow 1280 / 375 | ✅ 0px both |

## Interactive systems (verified live in preview DOM)
- Probe glow: `.rz-probe` class toggles on pointer entry/exit of all 17
  `[data-glow]` cards; delegated single listener; CSS var write is
  rAF-throttled. (rAF frames don't run in the hidden preview tab — class
  path verified there, var path verified by code review.)
- Magnetic CTA: pointer at 80%/80% of the button → `--mag-x/--mag-y`
  = 8.0px/3.2px (clamped ±8/±6); springs back on leave. ✅
- Header scroll state: `html.rz-scrolled` toggles on at scrollY 200 and off
  at 0. ✅
- Stagger: 5 `[data-rz-stagger]` parents; children auto-indexed `--i` 0…4;
  end-state opacity 1,1,1,1,1 (transition-frozen tab checked with
  animations disabled). ✅
- Beams: 10 `.rz-beam` sections observed by the reveal engine. ✅
- Marquee: `animation-play-state: paused` rule active on `:hover` and
  `:focus-within` for `.marquee-track`. ✅
- View Transitions CSS present (`@view-transition` + old/new keyframes);
  non-Chromium browsers ignore it silently. ✅
- Scroll progress hairline: `@supports (animation-timeline: scroll())`
  gated; `display:none` base for other engines. ✅

## Visual verification (screenshots, forced end-states*)
- Hero 1280: rail field renders as faint circuit routes around the portrait,
  3 pulses on offset-path; plus-accent no longer collides with DUBAI·UAE
  label; H1/subline/CTAs unchanged. ✅
- Proof band 1280: 5 tiles one row, tabular-nums, dividers intact, sweep
  overlay preserved. ✅  Mobile 375: 2+2+1 grid, 5th tile full-width —
  orphan fixed (tile widths 168/168/168/168/335). ✅
- Footer 1280: beam fires on the top rule; ghost "Rizwan Zafar" outline
  signature centered (rect 277→1003 @1280) after the `min(10.5vw, 10rem)`
  fix — the original `clamp(…14vw…)` cropped at the right edge. ✅
- Mobile hero 375: clean, rails `display:none`, CTAs stacked full-width. ✅

*The preview tab is hidden, which freezes CSS transitions/animations and rAF
(documented capture artifact): motion end-states were forced via injected
style for screenshots; mechanics verified via DOM/computed-style.

## Performance & safety
- No new dependencies, no hydration added; JS additions ≈2.2KB inline
  (engine modules + hero parallax script).
- No new network requests; nebula remains the only WebGL surface; pulses are
  3 composited circles on `offset-path`.
- LCP anchor (H1 line 1) untouched/untransformed; all new layers
  absolute + aria-hidden + pointer-events-none → CLS 0 by construction.
- Reduced-motion: engine exits before any module attaches; CSS belts in all
  four new files (pulses off, parallax off, stagger/beams/ghost static,
  view-transitions off). No-JS: full content visible (`.rz-js` gating).
- Consent stack untouched (GA4 / LinkedIn / PostHog still consent-gated).

## Known limitations / follow-ups
1. Probe/magnetic/parallax are desktop-only by design (fine pointer gate).
2. Rail pulses require `offset-path` (Safari ≥15.4); older engines see
   static rails, no orphaned dots (`@supports` gate).
3. Beams on borderless sections (pillars, doorways, case studies) run along
   an unruled edge — reads as a subtle light pass; flagged as a taste call.
4. Testimonials remain empty pending real quotes from the owner (never
   fabricate); the section is pre-wired with beam + stagger.
5. `.claude/launch.json` local preview change intentionally uncommitted.
6. In-browser eyeball at localhost:8788 recommended (hidden-tab capture
   can't show live motion): `python3 -m http.server 8788 -d dist-static`.

---

# V2 addendum — Monument teardown (2026-07-10)

Owner rejected v1 as "same as the old one" — correct: v1 layered motion on
the old skeleton. V2 tears down the homepage composition:

- Hero: split portrait-grid replaced by a full-viewport typographic monument
  (4-line H1 at clamp(2.75rem,7vw,8.5rem), portrait as a cinematic cut-out
  layer behind a legibility scrim, top status rail, bottom cert/scroll rail).
  Same sentence, same claims, same analytics IDs; LCP anchor still line 1.
- Pillars: 3-card grid → full-width index rows (mono index, 6xl serif title,
  right-column body, whole row is the link).
- Case studies: 3-up cards → alternating 12-col editorial panels with the
  hero metric at 7xl display scale in the text column.
- Doorways: boxed cards → open hairline-divided columns.
- About: mint gradient card → stacked statement numerals on open ground.
- Headings: text-4xl/6xl → clamp(2.5rem,5.5vw,5.5rem) sweep (6 sections).
- Hero newsletter instance removed (monument decluttering; capture remains
  in knowledge-base + get-in-touch band). Supersedes ISSUE-008 placement.

Defects caught & fixed in QA: literal ◆/→ escapes rendered as text
in pillars (python splice artifact); proof numerals at 5.5rem overflowed the
5-col grid (reverted to 7xl); status rail hidden under header scrim (pt-36);
CTAs collided with portrait (stacked left, portrait narrowed to 40vw);
mobile hero pushed CTA below fold (md-only 100svh, tighter mobile padding —
CTA top 731px @ 375×812 ✓).

Gates re-run: tsc clean, build:static 178/0, seo:audit clean, overflow 0 at
375/1280, 0 console errors.
