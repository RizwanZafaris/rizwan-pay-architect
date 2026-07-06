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
  const stats: { value: string; label: string; scoped?: boolean }[] = [
    // Career-scope (the arc) — no asterisk. Duration framing per owner
    // ruling 2026-07-06 ("17 years", never "since 2009"); the number is
    // computed in profile.ts so it can't go stale.
    { value: `${career.years}`, label: "Years experience" },
    { value: `${career.marketCount}`, label: "Markets" },
    { value: `${career.industryCount}`, label: "Industries" },
    // Platform-scope (Simpaisa, current role) — asterisked.
    { value: platform.gtv, label: "Annual GTV", scoped: true },
    { value: platform.annualPayments, label: "Payments / yr", scoped: true },
    { value: platform.merchants, label: "Merchants", scoped: true },
  ];
  // ALL spotlight metrics are Simpaisa platform scope → every cell is
  // asterisked and covered by the shared footnote below. Order is the
  // display order, so map-then-find (a bare .filter() would re-order to
  // profile.metrics order).
  const spotlight = SPOTLIGHT_METRIC_LABELS.map((label) =>
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
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
          {stats.map((s, i) => (
            // Each stat is a separate cell — a career stat and a platform stat
            // never share a text node (two-tier gate safety).
            <div
              key={s.label}
              className="home-proof-cell text-center lg:text-left"
              style={{ ["--proof-delay" as string]: `${i * 70}ms` }}
            >
              <div className="font-mono-tech text-2xl sm:text-3xl md:text-4xl text-ink leading-none tabular-nums">
                {s.value}
                {s.scoped && (
                  <span className="text-[var(--brand)]" aria-hidden>
                    {" "}
                    *
                  </span>
                )}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        {/* ── Operating record (ISSUE-004) — second row of the proof band. ──
            Six platform-scope reliability/performance metrics, each its own
            cell (never two metrics or a career marker in one text node). */}
        {spotlight.length > 0 && (
          <div className="mt-10 border-t border-rule pt-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ Operating record
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
              {spotlight.map((m, i) => (
                <div
                  key={m.label}
                  className="home-proof-cell text-center lg:text-left"
                  style={{ ["--proof-delay" as string]: `${420 + i * 70}ms` }}
                >
                  <div className="font-mono-tech text-2xl sm:text-3xl md:text-4xl text-ink leading-[1.05] tabular-nums">
                    {m.value}
                    {/* NBSP glues the scope asterisk to the value so it can
                        never wrap onto a line of its own in narrow cells. */}
                    <span className="text-[var(--brand)]" aria-hidden>
                      {" "}*
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
          <span className="text-[var(--brand)]" aria-hidden>
            *{" "}
          </span>
          {platform.company} platform, current role
        </p>
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
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16 md:py-20">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Three industries
        </div>
        <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02] max-w-3xl">
          One operating discipline,{" "}
          <span className="italic text-[var(--brand)]">three arenas.</span>
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
    <section>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 md:py-24">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Get in touch
          </div>
          <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05] max-w-3xl mx-auto">
            The right conversation depends on{" "}
            <span className="italic text-[var(--brand)]">who you are.</span>
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
                {c.links.map((l) =>
                  l.kind === "internal" ? (
                    <Link
                      key={l.label}
                      to={l.to}
                      className="text-sm text-ink hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1.5"
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
                      className="text-sm font-medium text-[var(--brand)] hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <a
                      key={l.label}
                      href={l.to}
                      className="text-sm text-ink hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1.5"
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
