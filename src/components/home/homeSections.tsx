// Homepage brand-rebuild sections (strategy doc §4). Extracted from
// src/routes/index.tsx to keep the route file scannable. Every section here is
// JS-less/static: production strips hydration, so all motion is CSS, all state
// is server-rendered, and nothing depends on an onClick running. Numbers and
// names trace to src/data/profile.ts; two-tier claims (career-scope markers vs
// Simpaisa platform metrics) are kept in SEPARATE sentences/cells so the CI
// gate in scripts/seo-audit.ts stays green.
import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { WorldMap } from "@/components/WorldMap";
import { RevealHeading } from "@/components/RevealHeading";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { BackgroundPaths } from "@/components/BackgroundPaths";
import { testimonials } from "@/data/testimonials";

// The industry-filter deep links (?industry=…) intentionally use a raw <a>,
// not TanStack's typed <Link>. Two reasons: (1) the target route's search
// schema doesn't (yet) declare `industry`, so a typed Link/`search` prop won't
// compile; (2) production ships static HTML with hydration stripped, so a full
// navigation is the real behaviour anyway. A plain anchor emits the exact
// query URL the strategy calls for without reaching into the router types.

// ── Route-scoped CSS ──────────────────────────────────────────────────────
// Inlined via <style dangerouslySetInnerHTML> (same pattern the route already
// uses for picksRotationCss). Do NOT move this into styles.css — that file is
// owned elsewhere. All animation is wrapped in a prefers-reduced-motion guard.
export const homeSectionsCss = `
/* Proof-band numerals: a subtle rise-in on scroll-independent load. Static
   text is the baseline; motion only enriches it and is fully suppressed for
   reduced-motion users. */
@keyframes home-proof-rise {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
.home-proof-cell { opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .home-proof-cell {
    opacity: 0;
    animation: home-proof-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: var(--proof-delay, 0ms);
  }
}
/* Card hover lift — shared by pillar/topic/doorway cards. The old left
   accent bars were the design charter's banned callout pattern in diluted
   form (QA 2026-07-06 P2) and are gone; differentiation now comes from the
   numbered mono index + this lift. */
.home-card-lift {
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.22s ease;
}
.home-card-lift:hover,
.home-card-lift:focus-visible {
  transform: translateY(-3px);
  border-color: color-mix(in oklab, var(--brand) 28%, var(--rule));
  box-shadow: 0 14px 34px color-mix(in oklab, var(--ink) 9%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .home-card-lift { transition: none; }
  .home-card-lift:hover, .home-card-lift:focus-visible { transform: none; }
}
/* Map strip: a slow drift on the caption underline tick. */
.home-map-tick {
  transform-origin: left;
  animation: home-map-tick-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes home-map-tick-in { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) { .home-map-tick { animation: none; } }

/* "How I work" FAQ — native <details>, zero JS. Hide the default marker and
   draw our own +/− (a horizontal rule + a vertical one that rotates away on
   open). The answer fades in when the item opens; closing is instant, which
   native <details> does for free. */
.faq-item > summary { list-style: none; cursor: pointer; }
.faq-item > summary::-webkit-details-marker { display: none; }
.faq-item > summary:focus-visible {
  outline: 2px solid var(--brand); outline-offset: 4px; border-radius: 4px;
}
.faq-sign { position: relative; width: 14px; height: 14px; flex: none; }
.faq-sign::before, .faq-sign::after {
  content: ""; position: absolute; background: currentColor; border-radius: 2px;
}
.faq-sign::before { top: 50%; left: 0; right: 0; height: 1.5px; transform: translateY(-50%); }
.faq-sign::after {
  left: 50%; top: 0; bottom: 0; width: 1.5px; transform: translateX(-50%);
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.faq-item[open] .faq-sign::after { opacity: 0; transform: translateX(-50%) rotate(90deg); }
.faq-item[open] .faq-answer-inner { animation: faq-in 0.3s ease both; }
@keyframes faq-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .faq-sign::after { transition: none; }
  .faq-item[open] .faq-answer-inner { animation: none; }
}

/* PROOF-BAND GLOW-SWEEP — one-shot cyan spotlight across the 5 numbers, keyed to
   the existing IO adding .rz-in to the .rz-proof-sweep overlay. ::before content
   exists ONLY under .rz-js, so no-JS / reduced-motion never render the sweep. */
.rz-proof-sweep {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
/* Neutralise the generic .rz-reveal rise on the overlay itself (3 classes +
   unlayered component <style> beats @layer utilities' .rz-js .rz-reveal). */
.rz-js .rz-proof-sweep.rz-reveal {
  opacity: 1;
  transform: none;
  transition: none;
}
.rz-js .rz-proof-sweep::before {
  content: "";
  position: absolute;
  top: -40%;
  bottom: -40%;
  left: 0;
  width: 38%;
  background: radial-gradient(closest-side at 50% 50%,
    color-mix(in oklab, var(--brand) 24%, transparent),
    color-mix(in oklab, var(--brand) 9%, transparent) 55%,
    transparent 80%);
  mix-blend-mode: screen;
  opacity: 0;
  transform: translateX(-130%);
}
.rz-js .rz-proof-sweep.rz-in::before {
  animation: rz-proof-glow 1100ms var(--ease-expo) forwards;
  will-change: transform, opacity;
}
@keyframes rz-proof-glow {
  0%   { opacity: 0; transform: translateX(-130%); }
  12%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: translateX(290%); }
}
`;

// ── B. PROOF BAND ─────────────────────────────────────────────────────────
// Six scope-tagged stats, each its OWN cell (never a single text node that
// joins a career stat to a platform stat). Career stats read from
// profile.career; platform stats from profile.platform. The `*` marks the
// platform metrics; one footnote scopes both rows to the current role.

// Operating-record spotlight (ISSUE-004). Labels mirror the
// `metricsSpotlight` export contract in src/data/profile.ts; the lookup goes
// through profile.metrics BY LABEL so this renders the exact same entries
// whether or not that named export has landed yet (parallel workstream).
const SPOTLIGHT_METRIC_LABELS = [
  "Payment success",
  "Straight-through processing",
  "Settlement SLA",
  "Uptime",
  "Fraud loss",
  "Authorization uplift",
] as const;
type SpotlightMetric = (typeof profile.metrics)[number];

export function ProofBand() {
  const { career, platform } = profile;
  // PRIMARY proof — the five headline numbers only, as premium counters, so
  // the homepage's first proof beat is scannable in two seconds (Press Run
  // 2026-07-08: reduced from a 12-tile wall). Each counts up on scroll.
  const primary: { value: string; label: string }[] = [
    { value: `${career.years}+`, label: "Years" },
    { value: platform.gtv, label: "Annual GTV" },
    { value: platform.annualPayments, label: "Payments / yr" },
    { value: platform.merchants, label: "Merchants" },
    { value: `${career.marketCount}`, label: "Markets" },
  ];
  // SECONDARY proof — the operating record, moved behind a native <details> so
  // the homepage stays elegant while the deep reliability metrics stay one
  // click (and fully no-JS) away. Order preserved via map-then-find.
  const operating = SPOTLIGHT_METRIC_LABELS.map((label) =>
    profile.metrics.find((m) => m.label === label),
  )
    .filter((m): m is SpotlightMetric => Boolean(m))
    // Display-only reshape: a value like "<0.1% GTV" wraps to two lines in a
    // 1/6 column at desktop numeral sizes and breaks the row baseline. Move
    // the unit into the label; the canonical metric in profile.ts is untouched.
    .map((m) =>
      m.value.endsWith(" GTV")
        ? { ...m, value: m.value.slice(0, -4), label: `${m.label}, % of GTV` }
        : m,
    );
  return (
    <section className="relative border-b border-rule bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-sm)]">
        {/* Five premium counters. Large Instrument-serif numerals + count-up. */}
        <div className="relative">
          {/* One-shot cyan spotlight that sweeps L→R across the numbers as the
              band enters view. Reuses the EXISTING IntersectionObserver via
              .rz-reveal (gets .rz-in once — no new JS/observer). Sibling of the
              grid so divide-x can't paint a stray divider on it. aria-hidden +
              .rz-js-gated + position:absolute → invisible to no-JS /
              reduced-motion and CLS 0. */}
          <span aria-hidden className="rz-reveal rz-proof-sweep" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 md:gap-y-0 md:divide-x md:divide-[color:var(--rule)]">
            {primary.map((s, i) => (
            <div
              key={s.label}
              className="rz-reveal text-center md:px-8"
              style={{ ["--rz-delay" as string]: `${i * 90}ms` }}
            >
              <div className="font-instrument text-[46px] sm:text-6xl lg:text-7xl text-ink leading-[0.88] tabular-nums">
                <AnimatedMetric value={s.value} />
              </div>
              <div className="mt-3 md:mt-4 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                {s.label}
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Operating record: secondary, expandable (native details, no JS). */}
        {operating.length > 0 && (
          <details className="rz-reveal group mt-14 md:mt-20 border-t border-rule pt-6">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono-tech text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
              <span className="text-[var(--brand)]" aria-hidden>
                &#9670;
              </span>
              Operating record
              <span className="ml-auto inline-flex items-center gap-1 normal-case tracking-normal text-ink-soft/70">
                {platform.company} platform
                <span className="transition-transform group-open:rotate-90" aria-hidden>
                  &rsaquo;
                </span>
              </span>
            </summary>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
              {operating.map((m) => (
                <div key={m.label} className="text-center lg:text-left">
                  <div className="font-mono-tech text-xl sm:text-2xl text-ink leading-none tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  );
}

// ── C. MAP STRIP (unused on the homepage as of 2026-07-06) ─────────────────
// Owner call: no map on the homepage — the signature map lives on /journey
// only. Component kept (not deleted) in case this gets revisited; not
// imported from src/routes/index.tsx. Copy said "worked in", NOT "shipped
// in" — Nigeria was pending owner confirmation of shipped status.
export function MapStrip() {
  return (
    <section className="relative border-b border-rule bg-background overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold text-center">
          ◆ The map
        </div>
        <div className="mx-auto mt-6 max-w-4xl">
          <WorldMap />
        </div>
        <div className="mt-8 flex flex-col items-center">
          <span className="home-map-tick h-px w-16 bg-[var(--brand)]" aria-hidden />
          <p className="mt-4 max-w-2xl text-center font-instrument text-xl md:text-2xl text-ink leading-snug">
            Every market on this map is one I&rsquo;ve{" "}
            <span className="italic text-[var(--brand)]">worked in</span> — not researched from a
            deck.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── D. INDUSTRY PILLARS ───────────────────────────────────────────────────
// Three cards → the filtered case-study views. product-work.index.tsx reads
// ?industry= (payments | ecommerce | ott) via its Zod searchSchema and
// pre-applies the filter on load (verified live 2026-07-06).
const PILLARS = [
  {
    title: "Payments & cross-border",
    // Platform-scope sentence: $1B+ stands alone, no career marker in-clause.
    body: "A $1B+/yr gateway across five frontier markets: acceptance, wallets, settlement, compliance.",
    href: "/product-work?industry=payments",
  },
  {
    title: "E-commerce & marketplaces",
    body: "Daraz (Alibaba Group): payments and conversion across five South-Asian markets — +15% checkout conversion, −20% false declines.",
    href: "/product-work?industry=ecommerce",
  },
  {
    title: "OTT & subscriptions",
    body: "Tapmad: 0→5M subscribers; payment cost from 50% of revenue to ~1%; ARPU +70%.",
    href: "/product-work?industry=ott",
  },
] as const;

export function IndustryPillars() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)]">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Three industries
        </div>
        <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02] max-w-3xl">
          <RevealHeading lead="One operating discipline," emphasis="three arenas." />
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              className="home-pillar-card home-card home-card-lift rz-reveal group relative overflow-hidden rounded-lg border border-rule bg-card p-7 flex flex-col"
            >
              <div
                className="font-mono-tech text-[11px] tracking-[0.22em] text-[var(--brand)]"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-instrument text-2xl text-ink leading-tight group-hover:text-[var(--brand)] transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">{p.body}</p>
              <div className="mt-6 text-sm text-ink group-hover:text-[var(--brand)] inline-flex items-center gap-1.5 transition-colors">
                See the case studies
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── G. CREDENTIALS STRIP ──────────────────────────────────────────────────
// Mono row sourced from profile.education (MIT Sloan), profile.honors
// (Youngest PM of the Year 2015) and profile.volunteering (PMI Karachi VP).
// PCI/ISO tagged "(platform)" — those certs belong to the Simpaisa platform,
// not the individual.
export function CredentialsStrip() {
  const mitSloan = profile.education.find((e) => e.school.includes("MIT Sloan"));
  const youngestPm = profile.honors.find((h) => h.title.includes("Youngest Project Manager"));
  const pmiVp = profile.volunteering.find((v) => v.role.includes("Vice President"));
  const items = [
    mitSloan ? "MIT Sloan" : null,
    youngestPm ? `PMI Youngest Project Manager of the Year (${youngestPm.year})` : null,
    pmiVp ? "PMI Karachi VP '22–23" : null,
    "PCI-DSS L1 + ISO 27001 (platform)",
  ].filter(Boolean) as string[];
  return (
    <section className="relative border-y border-rule bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] md:text-xs uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
          {items.map((it, i) => (
            <li key={it} className="flex items-center gap-4">
              {i > 0 && (
                <span className="text-[var(--brand)]/50" aria-hidden>
                  ·
                </span>
              )}
              <span className="text-ink">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── I. GET-IN-TOUCH BAND ──────────────────────────────────────────────────
// Replaces "Hire me or just say hello" with an audience-router. Three
// mini-cards keyed to who the reader is. Booking CTA reuses the same
// data-analytics-* attributes the hero booking CTA carries.
export function GetInTouchBand() {
  const cards = [
    {
      eyebrow: "Hiring?",
      title: "See the résumé, then book time.",
      body: "Senior product & program roles in payments and fintech infrastructure.",
      links: [
        { label: "View résumé →", to: "/resume", kind: "internal" as const },
        { label: "Book a 15-min intro call →", to: "/contact/#book", kind: "book" as const },
      ],
    },
    {
      eyebrow: "Building?",
      title: "Read the essays, get the notes.",
      body: "Payment acceptance, settlement and delivery notes. Advisory conversations open Q4.",
      links: [
        { label: "Read the essays →", to: "/blog", kind: "internal" as const },
        {
          label: "Get the newsletter →",
          to: profile.newsletter.href,
          kind: "external" as const,
        },
      ],
    },
    {
      eyebrow: "Press / speaking?",
      title: "Talks, panels and commentary.",
      body: "Payments infrastructure and frontier-market fintech.",
      // /speaking is PARKED until 2027-01-06 — route press/speaking
      // inquiries through /contact (has a "Speaking / podcast" option)
      // instead of linking to the noindexed page.
      links: [{ label: "Get in touch →", to: "/contact", kind: "internal" as const }],
    },
  ];
  return (
    <section className="relative overflow-hidden">
      {/* kokonutd/background-paths, JS-less + brand-toned. Faint flowing teal
          strokes behind the closing CTA; a paper wash fades the edges so the
          copy stays crisp. */}
      <BackgroundPaths />
      <div className="bg-paths-mask" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-20 md:py-24">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Get in touch
          </div>
          <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05] max-w-3xl mx-auto">
            <RevealHeading lead="The right conversation depends on" emphasis="who you are." />
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div
              key={c.eyebrow}
              className="home-card home-card-lift rz-reveal rounded-lg border border-rule bg-card p-7 flex flex-col"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                {c.eyebrow}
              </div>
              <h3 className="font-instrument text-xl text-ink mt-3 leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">{c.body}</p>
              <div className="mt-6 flex flex-col gap-2.5">
                {/* Tap targets (Gate-A 2026-07-08, WCAG 2.5.8): py + negative
                    my grows each link's hit area past 24px (44px on the
                    booking CTA) without moving a pixel of the rendered
                    layout — the gap-2.5 rhythm stays as designed. */}
                {c.links.map((l) =>
                  l.kind === "internal" ? (
                    <Link
                      key={l.label}
                      to={l.to}
                      className="text-sm text-ink hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1.5 py-1.5 -my-1.5"
                    >
                      {l.label}
                    </Link>
                  ) : l.kind === "book" ? (
                    <a
                      key={l.label}
                      href={l.to}
                      data-analytics-event="cta_click"
                      data-analytics-cta-id="book_intro_call"
                      data-analytics-cta-location="home_get_in_touch"
                      data-analytics-cta-destination="/contact/#book"
                      className="text-sm font-medium text-[var(--brand)] hover:opacity-80 transition-opacity inline-flex items-center gap-1.5 py-3 -my-3"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <a
                      key={l.label}
                      href={l.to}
                      className="text-sm text-ink hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1.5 py-1.5 -my-1.5"
                    >
                      {l.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────
// Editorial pull-quote list — the JS-less port of the 21st.dev "Editorial
// Testimonial" (oversized light index numeral, light quote, monogram +
// attribution). No carousel state (the site never hydrates); the quotes
// simply stack. Renders nothing until src/data/testimonials.ts has a real
// entry, so no placeholder ever ships. The route also guards on length.
function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="relative border-t border-rule">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 py-20 md:py-24">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ In their words
        </div>
        <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.03] max-w-3xl">
          <RevealHeading lead="The people I've built with" emphasis="on the record." />
        </h2>
        <ol className="mt-14 divide-y divide-rule">
          {testimonials.map((t, i) => (
            <li
              key={`${t.author}-${i}`}
              className="grid gap-6 py-10 first:pt-0 md:grid-cols-[auto_1fr] md:gap-10"
            >
              <div
                className="font-mono-tech text-5xl md:text-6xl leading-none text-[var(--brand)]/15 tabular-nums select-none"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <figure>
                <blockquote className="font-instrument text-2xl md:text-3xl font-light leading-snug text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span
                    className="grid h-11 w-11 flex-none place-items-center rounded-full bg-ink text-background font-display text-sm font-semibold tracking-tight"
                    aria-hidden
                  >
                    {initials(t.author)}
                  </span>
                  <span className="text-sm text-ink-soft leading-tight">
                    <span className="font-medium text-ink">{t.author}</span>
                    <br />
                    {t.role} · {t.org}
                    {t.relationship ? (
                      <>
                        <span className="mx-1.5 text-[var(--brand)]/40">/</span>
                        {t.relationship}
                      </>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── HOW I WORK / FAQ ──────────────────────────────────────────────────────
// Native <details> accordion (zero JS). Every answer traces to profile.ts /
// the verified fact base, and this same array feeds the FAQPage JSON-LD in
// the route head — so the structured data can never drift from the copy.
// Two-tier note: career-scope markers (ten markets) and Simpaisa platform
// facts are kept in separate sentences within any single answer.
export const howIWorkFaqs: { q: string; a: string }[] = [
  {
    q: "What roles are you focused on?",
    a: "Senior product and program leadership in payments and fintech infrastructure — Director or VP of Product, Head of Product, and senior program or PMO roles. I own the full lifecycle: strategy, roadmap, PMO governance, execution and P&L.",
  },
  {
    q: "Which markets have you worked across?",
    a: "Ten markets across MENA and South Asia over my career, spanning payments, e-commerce and streaming. At Simpaisa specifically, I run the platform across five regulated frontier markets.",
  },
  {
    q: "How technical are you?",
    a: "I started in engineering and still operate close to the build. At Simpaisa I led a 40-plus engineer organisation across 12 squads and served as acting CTO through 2024 alongside the CPO role.",
  },
  {
    q: "What does your product scope cover?",
    a: "Regulated payment infrastructure end to end: card acquiring, merchant onboarding and KYC/KYB, pay-in and payout rails, cross-border corridors, settlement and reconciliation, fraud and AML/CFT controls, and AI-augmented operations.",
  },
  {
    q: "How do you use AI in delivery?",
    a: "I run four production GenAI systems in a regulated payments environment — merchant-integration support, incident auto-escalation, partner-support automation, and a fraud/AML pilot with a banking partner — plus a multi-agent automation behind my own delivery work.",
  },
  {
    q: "Where are you based and how do you work?",
    a: "Dubai (GST, UTC+4), which overlaps cleanly with Europe, MENA and South Asia working hours and with US East Coast mornings. I work async-first with a weekly live cadence.",
  },
];

export function HowIWorkFaq() {
  return (
    <section className="relative border-t border-rule bg-surface">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 py-[var(--space-section-sm)]">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ How I work
        </div>
        <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
          <RevealHeading lead="The questions I get" emphasis="most." />
        </h2>
        <div className="mt-10 border-t border-rule">
          {howIWorkFaqs.map((f, i) => (
            <details key={i} className="faq-item group border-b border-rule">
              <summary className="flex items-center justify-between gap-6 py-5">
                <span className="font-instrument text-lg md:text-xl text-ink leading-snug">
                  {f.q}
                </span>
                <span className="faq-sign text-[var(--brand)]" aria-hidden />
              </summary>
              <div className="faq-answer overflow-hidden">
                <p className="faq-answer-inner pb-6 pr-8 text-[15px] leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
