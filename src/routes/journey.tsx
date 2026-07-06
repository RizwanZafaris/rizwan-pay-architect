import { createFileRoute, Link } from "@tanstack/react-router";
import { markets, type Market } from "@/data/markets";
import { profile } from "@/data/profile";
import { WorldMap } from "@/components/WorldMap";
import { absUrl } from "@/lib/seo";

// /journey — the signature "operating map" page (strategy doc §5).
// SHIPS FULLY STATIC: no framer-motion, no hydration, no client JS. Every bit
// of motion is CSS (page <style> block below) and gated on
// prefers-reduced-motion. The timeline progress beam is scroll-driven via
// animation-timeline inside @supports, with a static-gradient fallback.
//
// FACT DISCIPLINE (two-tier claims, strategy doc §2 — the seo-audit.ts CI gate
// fails the build on a violation): a career marker ("since 2009", "seventeen
// years", "ten markets", "three industries") must never share a sentence/clause
// with a Simpaisa PLATFORM metric ("$1B", "270M", "150+ merchants", "99.95%").
// The hero H1 uses period-separated sentences; era-3's platform metrics each
// live in their OWN sentence with no career marker adjacent. Per-market copy
// comes ONLY from src/data/markets.ts (rendered as-is). Nigeria carries
// needsOwnerConfirm — its shipped line is a TODO(owner) placeholder rendered
// verbatim with a muted "detail pending" affordance; no achievement invented.

// The three career eras. Each `points` string is its own clause on the page so
// the two-tier gate never sees a platform metric beside a career marker.
type Era = {
  id: string;
  span: string;
  title: string;
  lede: string;
  points: string[];
};

const eras: Era[] = [
  {
    id: "foundations",
    span: "2009–2016",
    title: "Foundations",
    lede: "Engineering to product. Learning to run delivery before running a roadmap.",
    points: [
      "Moved from field engineering into project and product leadership.",
      "Ran PMO leadership at DS Engineering across a $15M portfolio and 400+ projects, and earlier at PESCO.",
      "Named PMI Youngest Project Manager of the Year in 2015.",
    ],
  },
  {
    id: "scale-school",
    span: "2017–2020",
    title: "Scale school",
    lede: "Two operators, two continents of consumer scale — OTT subscriptions and Alibaba-scale marketplaces.",
    points: [
      "Tapmad (OTT): launched Direct Carrier Billing across all four telcos and grew from 0 to 5M paid subscribers.",
      "Tapmad: cut payment cost from 50% of revenue to about 1% and lifted ARPU by 70%, on the way to $10M+ ARR.",
      "Tapmad: expanded DCB and wallet billing into the UAE and KSA with regional telco and wallet partners.",
      "Daraz (Alibaba Group): ran payment operations across five markets — +15% checkout conversion, −20% false declines, 99.5% settlement.",
      "Daraz: widened payment coverage by roughly 40% by localising regional methods on checkout.",
    ],
  },
  {
    id: "gateway-years",
    span: "2020–now",
    title: "The gateway years",
    lede: "Simpaisa — Chief Product Officer, and acting CTO through 2024. Building the cross-border gateway.",
    // Each string below is a standalone clause with NO career marker, so the
    // platform metrics never mix tiers. Do not merge these into one sentence.
    points: [
      "Built a $1B+ GTV gateway processing 270M+ payments a year.",
      "Reached 150+ merchants at a 99.95% settlement SLA.",
      "Shipped four market launches in 2024, and grew the product org from 2 to 8 PMs across a 50+ team.",
      "Led PCI-DSS Level 1 and ISO 27001 from scratch.",
    ],
  },
];

// JSON-LD ItemList of the market stops. The needsOwnerConfirm market (Nigeria)
// is excluded from structured data — we never assert an unconfirmed claim to a
// machine surface. Positions are re-numbered over the confirmed set so the list
// stays contiguous.
const journeyItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Operating markets — Rizwan Zafar",
  url: absUrl("/journey"),
  numberOfItems: markets.filter((m) => !m.needsOwnerConfirm).length,
  itemListElement: markets
    .filter((m) => !m.needsOwnerConfirm)
    .map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${m.name} — ${m.brand}`,
      description: m.shipped,
    })),
};

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      {
        title: `${profile.career.years} Years, 10 Markets: A Payments Operator's Journey | Rizwan Zafar`,
      },
      {
        name: "description",
        content:
          "Seventeen years, ten markets, three industries — from Daraz's marketplaces to Tapmad's streaming business to Simpaisa's cross-border gateway.",
      },
      {
        property: "og:title",
        content: `${profile.career.years} Years, 10 Markets — A Payments Operator's Journey`,
      },
      {
        property: "og:description",
        content:
          "Every market I shipped in, what I built there, and what it taught me about payments and product. From marketplaces to OTT to a cross-border gateway.",
      },
      { property: "og:url", content: absUrl("/journey") },
      { property: "og:type", content: "profile" },
      {
        name: "twitter:title",
        content: `${profile.career.years} Years, 10 Markets — A Payments Operator's Journey`,
      },
      {
        name: "twitter:description",
        content:
          "The operating map: every market, what I built there, and what it taught me about payments and product.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/journey") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(journeyItemListJsonLd) }],
  }),
  component: JourneyPage,
});

const css = `
.journey-page { isolation: isolate; }

/* Eyebrow rule that scales in — decorative, reduced-motion safe. */
.journey-eyebrow { position: relative; width: max-content; max-width: 100%; }
.journey-eyebrow::after {
  content: ""; position: absolute; left: 0; bottom: -0.7rem;
  width: min(12rem, 60vw); height: 1px; transform-origin: left;
  background: linear-gradient(90deg, color-mix(in oklab, var(--signal) 72%, transparent), transparent);
}

/* ── Timeline ─────────────────────────────────────────────────────────────
   The rail is a 2px track running the height of the timeline. A "beam" fills
   it as the section scrolls through the viewport (animation-timeline: scroll),
   with a static half-gradient fallback where scroll-driven animation is
   unsupported or motion is reduced. Era labels stick under the floating pill
   header via position: sticky (pure CSS, no JS). */
.journey-timeline { position: relative; }
.journey-rail {
  position: absolute; top: 0; bottom: 0; left: 0; width: 2px;
  background: color-mix(in oklab, var(--rule) 78%, transparent);
  overflow: hidden;
}
.journey-rail-beam {
  position: absolute; inset: 0 0 auto 0; width: 100%; transform-origin: top;
  /* Fallback: a fixed gradient that reads as a lit rail even with no motion. */
  height: 100%;
  background: linear-gradient(
    to bottom,
    color-mix(in oklab, var(--signal) 82%, transparent) 0%,
    color-mix(in oklab, var(--signal) 30%, transparent) 55%,
    transparent 100%
  );
  transform: scaleY(0.34);
}
@media (min-width: 768px) {
  .journey-rail { left: 50%; transform: translateX(-50%); }
  /* QA 2026-07-06: the era column used to be CENTERED across the centered
     rail, so the rail sliced through every paragraph. Desktop now alternates
     eras left/right of the rail — each 46% column sits fully clear of it. */
  .journey-era-content { width: 46%; }
  .journey-timeline li:nth-child(odd) .journey-era-content {
    margin-left: auto;
    padding-left: 2.25rem;
  }
  .journey-timeline li:nth-child(even) .journey-era-content {
    margin-right: auto;
    padding-right: 2.25rem;
  }
}

.journey-era-label {
  position: sticky; top: 5.25rem; z-index: 2;
  display: inline-flex; align-items: baseline; gap: 0.6rem;
  width: max-content; max-width: 100%;
  padding: 0.4rem 0.7rem;
  border: 1px solid color-mix(in oklab, var(--signal) 22%, var(--rule));
  border-radius: 999px;
  background: color-mix(in oklab, var(--paper) 86%, var(--signal) 5%);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px color-mix(in oklab, var(--ink) 6%, transparent);
}
.journey-era-node {
  position: absolute; left: 0; top: 0.75rem; width: 0.85rem; height: 0.85rem;
  border-radius: 999px; background: var(--signal);
  box-shadow: 0 0 0 5px color-mix(in oklab, var(--signal) 14%, transparent);
}
@media (min-width: 768px) {
  .journey-era-node { left: 50%; transform: translateX(-50%); }
}

.journey-point { position: relative; padding-left: 1.4rem; }
.journey-point::before {
  content: ""; position: absolute; left: 0; top: 0.62em;
  width: 0.42rem; height: 0.42rem; border-radius: 999px;
  background: color-mix(in oklab, var(--signal) 70%, transparent);
}

/* ── Market cards ─────────────────────────────────────────────────────────*/
.journey-market-card {
  position: relative; overflow: hidden;
  transition:
    transform 180ms ease, border-color 180ms ease,
    box-shadow 180ms ease, background-color 180ms ease;
}
.journey-market-card::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--paper) 60%, transparent),
    transparent 44%,
    color-mix(in oklab, var(--signal) 6%, transparent)
  );
}
.journey-market-card > * { position: relative; z-index: 1; }
.journey-market-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in oklab, var(--signal) 30%, var(--rule));
  box-shadow: 0 16px 40px color-mix(in oklab, var(--ink) 9%, transparent);
}
.journey-pending {
  display: inline-flex; align-items: center; gap: 0.35rem;
  border: 1px dashed color-mix(in oklab, var(--ink) 30%, var(--rule));
  border-radius: 999px; padding: 0.2rem 0.5rem;
  color: var(--ink-soft);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.58rem; letter-spacing: 0.12em; line-height: 1; text-transform: uppercase;
}

@media (prefers-reduced-motion: no-preference) {
  .journey-eyebrow::after { animation: journey-rule 5.5s ease-in-out infinite; }
  @supports (animation-timeline: scroll()) {
    .journey-rail-beam {
      transform: scaleY(0);
      animation: journey-beam linear both;
      animation-timeline: scroll(root);
      animation-range: cover;
    }
  }
}
@keyframes journey-rule {
  0%, 100% { transform: scaleX(0.34); opacity: 0.5; }
  50% { transform: scaleX(1); opacity: 0.95; }
}
@keyframes journey-beam {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@media (prefers-reduced-motion: reduce) {
  .journey-eyebrow::after { animation: none; }
}
`;

function MarketCard({ m }: { m: Market }) {
  return (
    <article className="journey-market-card rounded-2xl border border-rule bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">
          {m.flag}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
          {m.years}
        </span>
      </div>
      <h3 className="mt-4 font-instrument text-2xl text-ink">{m.name}</h3>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--brand)] font-mono-tech font-semibold">
        {m.brand}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink">{m.shipped}</p>
      {m.needsOwnerConfirm && (
        <p className="mt-3">
          <span className="journey-pending">◇ Detail pending</span>
        </p>
      )}
      <p className="mt-4 border-t border-rule pt-4 text-sm italic leading-relaxed text-ink-soft">
        {m.lesson}
      </p>
    </article>
  );
}

function JourneyPage() {
  return (
    <div className="journey-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-8 sm:pt-24">
        <div className="journey-eyebrow text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ The operating map
        </div>
        <h1 className="mt-8 font-instrument text-4xl leading-[1.05] text-ink sm:text-6xl">
          Seventeen years. Ten markets. Three industries.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          I didn't study frontier markets — I shipped in them. This is the map: every market, what I
          built there, and what it taught me about payments, product and the distance between a
          regulation and a working checkout.
        </p>
      </section>

      {/* ── Signature visual: the world map ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-rule bg-surface p-4 sm:p-8">
          <WorldMap showLabels />
        </div>
        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
          ◆ Ten operating markets · arcs originate from the Dubai hub
        </p>
      </section>

      {/* ── Timeline: three eras ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-12 text-center">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ The arc
          </div>
          <h2 className="mt-4 font-instrument text-3xl text-ink sm:text-4xl">
            Three eras, one throughline
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Delivery discipline first, consumer scale next, then regulated payment infrastructure —
            each era compounding into the one after it.
          </p>
        </div>

        <div className="journey-timeline">
          <div className="journey-rail" aria-hidden="true">
            <div className="journey-rail-beam" />
          </div>

          <ol className="space-y-16 md:space-y-24">
            {eras.map((era) => (
              <li key={era.id} className="relative pl-8 md:pl-0">
                <span className="journey-era-node" aria-hidden="true" />
                <div className="journey-era-content">
                  <div className="journey-era-label">
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[var(--brand)]">
                      {era.span}
                    </span>
                    <span className="font-instrument text-xl text-ink">{era.title}</span>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-ink">{era.lede}</p>
                  <ul className="mt-5 space-y-3">
                    {era.points.map((point) => (
                      <li
                        key={point}
                        className="journey-point text-sm leading-relaxed text-ink-soft"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Per-market cards ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Every stop on the map
          </div>
          <h2 className="mt-4 font-instrument text-3xl text-ink sm:text-4xl">
            Ten markets, ten lessons
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            What shipped in each market — and the operating lesson it left behind.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <MarketCard key={m.key} m={m} />
          ))}
        </div>
      </section>

      {/* ── Close / CTA ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-rule bg-surface-2 p-8 text-center sm:p-12">
          <h2 className="font-instrument text-2xl text-ink sm:text-3xl">
            The map is the story. The work is the proof.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            See the case studies behind these markets, or start a conversation about what comes
            next.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/product-work"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              See the product work →
            </Link>
            <a
              href="/contact/#book"
              className="inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-[color-mix(in_oklab,var(--signal)_40%,var(--rule))]"
            >
              Book a conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
