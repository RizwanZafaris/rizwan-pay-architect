import { createFileRoute, Link } from "@tanstack/react-router";
import { markets, type Market } from "@/data/markets";
import { profile } from "@/data/profile";
import { CAREER, PLATFORM, DARAZ } from "@/content/facts";
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
// comes ONLY from the publishable, evidence-backed records in
// src/data/markets.ts (rendered as-is). Markets without a supporting work
// bullet are omitted from cards, map pins and structured data.

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
      "Named Youngest Project Manager of the Year in 2015.",
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
      `Daraz (Alibaba Group): ran payment operations across ${DARAZ.marketsWord} markets during a COVID-driven volume surge.`,
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
      `Built a ${PLATFORM.gtv} GTV gateway processing ${PLATFORM.annualPayments} payments a year.`,
      `Reached ${PLATFORM.merchants} merchants at a ${PLATFORM.settlementSla} settlement SLA.`,
      "Shipped four market launches in 2024 and led a 40-engineer payments organisation across 12 squads.",
      "Led PCI-DSS Level 1 and ISO 27001 from scratch.",
    ],
  },
];

// JSON-LD ItemList of the publishable market stops. markets.ts excludes any
// record without a source-backed shipped item, so the machine surface and the
// visible cards use the same contiguous list.
const journeyItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Operating markets — Rizwan Zafar",
  url: absUrl("/journey"),
  numberOfItems: markets.length,
  itemListElement: markets.map((m, i) => ({
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
        title: `${profile.career.years} Years, ${CAREER.marketCount} Markets: A Payments Operator's Journey | Rizwan Zafar`,
      },
      {
        name: "description",
        content: `Seventeen years, ${CAREER.marketsWord} markets, three industries — from Daraz's marketplaces to Tapmad's streaming business to Simpaisa's cross-border gateway.`,
      },
      {
        property: "og:title",
        content: `${profile.career.years} Years, ${CAREER.marketCount} Markets — A Payments Operator's Journey`,
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
        content: `${profile.career.years} Years, ${CAREER.marketCount} Markets — A Payments Operator's Journey`,
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
/* Layout note (2026-07-06, round 2): this section has now tried centered
   (rail sliced text) and alternating (each tall era left a half-screen void
   beside it at 1440px — read as broken). Left rail + one content column has
   no failure mode at any content height, so it wins on desktop AND matches
   the mobile structure. Cap the measure so bullets stay readable. */
.journey-era-content { max-width: 46rem; }

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

.journey-point { position: relative; padding-left: 1.4rem; }
.journey-point::before {
  content: ""; position: absolute; left: 0; top: 0.62em;
  width: 0.42rem; height: 0.42rem; border-radius: 999px;
  background: color-mix(in oklab, var(--signal) 70%, transparent);
}

/* ── Market cards ─────────────────────────────────────────────────────────*/
/* NB: the sheen overlay lives on ::before, NOT ::after — the cards now carry
   data-glow and the global engine (next.css) owns [data-glow]::after for the
   cursor bloom. Sharing ::after would let one rule clobber the other. */
/* The timeline's vertical hairline. NOT dead: the element is
   <div className="journey-rail"> in the era timeline. */
.journey-rail {
  position: absolute; top: 0; bottom: 0; left: 0; width: 2px;
  background: color-mix(in oklab, var(--rule) 78%, transparent);
  overflow: hidden;
}

/* ── Expanding market rail ─────────────────────────────────────────────
   Ported from the 21st.dev "expanding cards" interaction, minus everything
   that made it a stock component: no photography (we have none, and stock
   is banned by PRODUCT.md), no icon library, no JS. The original drives the
   grid template from React state; here flex-grow does it, so it survives the
   zero-hydration build and works with JS disabled.

   Below lg: a plain stacked list, every panel open. Scanning beats
   interaction for a recruiter on a phone.
   At lg+: ten collapsed name-plates; hover or keyboard focus expands one. */
.journey-market-rail {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  list-style: none;
  padding: 0;
}
.journey-panel-plate { display: none; }
.journey-panel-inner {
  position: relative;
  border: 1px solid var(--rule);
  border-radius: 16px;
  background: var(--surface-raised);
  padding: 1.5rem;
  height: 100%;
}
.journey-panel-inner:focus-visible {
  outline: none;
  border-color: color-mix(in oklab, var(--signal) 45%, var(--rule));
}
.journey-panel-head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; }

@media (min-width: 1024px) {
  .journey-market-rail {
    flex-direction: row;
    gap: 0.5rem;
    height: 27rem;
  }
  .journey-panel {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    transition: flex-grow 500ms var(--ease-soft);
  }
  .journey-panel-inner {
    overflow: hidden;
    width: 100%;
    padding: 1.25rem;
    cursor: pointer;
  }

  /* The first panel is open by default (the component's defaultActiveIndex).
     Once the pointer or focus enters the rail, it yields unless it is itself
     the target — the CSS equivalent of the original's activeIndex state. */
  .journey-panel:first-child { flex-grow: 5; }
  .journey-market-rail:hover .journey-panel:first-child,
  .journey-market-rail:focus-within .journey-panel:first-child { flex-grow: 1; }
  .journey-panel:hover,
  .journey-panel:focus-within,
  .journey-market-rail:hover .journey-panel:hover,
  .journey-market-rail:focus-within .journey-panel:focus-within { flex-grow: 5; }

  /* Collapsed: a vertical name-plate. */
  .journey-panel-plate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    opacity: 1;
    transition: opacity 220ms var(--ease-soft);
  }
  .journey-panel-name {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    color: var(--ink);
    white-space: nowrap;
  }
  .journey-panel-years {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-soft);
    white-space: nowrap;
  }

  /* Expanded content: present in the DOM always, revealed on expand. */
  .journey-panel-body {
    position: absolute;
    inset: 1.25rem;
    width: 22rem;
    max-width: calc(100% - 2.5rem);
    opacity: 0;
    transform: translateY(6px);
    transition:
      opacity 260ms var(--ease-soft) 120ms,
      transform 260ms var(--ease-soft) 120ms;
    pointer-events: none;
  }
  .journey-panel:hover .journey-panel-plate,
  .journey-panel:focus-within .journey-panel-plate { opacity: 0; }
  .journey-panel:hover .journey-panel-body,
  .journey-panel:focus-within .journey-panel-body {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
  /* Default-open first panel shows its body until the rail is engaged. */
  .journey-market-rail:not(:hover):not(:focus-within) .journey-panel:first-child .journey-panel-plate { opacity: 0; }
  .journey-market-rail:not(:hover):not(:focus-within) .journey-panel:first-child .journey-panel-body {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .journey-panel,
  .journey-panel-plate,
  .journey-panel-body { transition: none; }
}

.journey-pending {
  display: inline-flex; align-items: center; gap: 0.35rem;
  border: 1px dashed color-mix(in oklab, var(--ink) 30%, var(--rule));
  border-radius: 999px; padding: 0.2rem 0.5rem;
  color: var(--ink-soft);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.58rem; letter-spacing: 0.12em; line-height: 1; text-transform: uppercase;
}

/* The global stagger rule (.rz-js [data-rz-stagger].rz-in > *) is a TRANSITION
   with a per-child delay, and it out-specifies .journey-panel. Left alone it
   would clobber the rail's flex-grow transition and lag every hover expand by
   that child's delay. Run the ENTRANCE as a backwards-filled animation, and
   hand the transition back to the rail at lg. */
.rz-js [data-rz-stagger].rz-in > .journey-panel {
  transition: none;
  transition-delay: 0ms;
  animation: journey-card-in 600ms var(--ease-expo) backwards;
  animation-delay: calc(var(--i, 0) * 70ms);
}
@media (min-width: 1024px) {
  .rz-js [data-rz-stagger].rz-in > .journey-panel {
    transition: flex-grow 500ms var(--ease-soft);
  }
}
@keyframes journey-card-in {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
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
  .rz-js [data-rz-stagger].rz-in > .journey-panel {
    animation: none; transition: none; opacity: 1; transform: none;
  }
}
`;

function MarketPanel({ m }: { m: Market }) {
  return (
    <li className="journey-panel" data-glow>
      {/* tabIndex makes the panel focusable so keyboard users can expand it;
          :focus-within drives the same CSS as :hover. aria-label names the
          panel because the visible <h3> is rotated when collapsed. */}
      <article tabIndex={0} aria-label={m.name} className="journey-panel-inner">
        <div className="journey-panel-plate">
          <span className="journey-panel-name">{m.name}</span>
          <span className="journey-panel-years">{m.years}</span>
        </div>
        <div className="journey-panel-body">
          <div className="journey-panel-head">
            <h3 className="font-instrument text-2xl text-ink">{m.name}</h3>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              {m.city} · {m.years}
            </span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--brand)] font-mono-tech font-semibold">
            {m.brand}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink">{m.shipped}</p>
          <p className="mt-4 border-t border-rule pt-4 text-sm italic leading-relaxed text-ink-soft">
            {m.lesson}
          </p>
        </div>
      </article>
    </li>
  );
}

function JourneyPage() {
  return (
    <div className="journey-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      {/* Statement page header (Operator's Console language): ◆ mono eyebrow →
          monument serif H1 with the signature italic-cyan close. Copy is the
          same sentence; the em dash in the lede became a comma while
          re-wrapping (design-charter ban). */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 pt-20 pb-12 sm:pt-28 md:pb-16">
        <div className="journey-eyebrow text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ The operating map
        </div>
        <h1 className="mt-9 font-instrument tracking-[-0.02em] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink">
          Seventeen years. {CAREER.marketsWordCap} markets.{" "}
          <span className="italic text-[var(--brand)]">Three industries.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          I didn't study frontier markets, I shipped in them. This is the map: every market, what I
          built there, and what it taught me about payments, product and the distance between a
          regulation and a working checkout.
        </p>
      </section>

      {/* ── Signature visual: the world map ───────────────────────────── */}
      <section className="rz-beam border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="rounded-2xl border border-rule bg-surface p-4 sm:p-8">
            <WorldMap showLabels />
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
            ◆ Selected operating markets · arcs originate from the Dubai hub
          </p>
        </div>
      </section>

      {/* ── Timeline: three eras ──────────────────────────────────────── */}
      {/* LAYOUT IS LOAD-BEARING: left rail + one content column was the 3rd
          attempt that finally worked — this pass changes type scale + motion
          hooks only (header left-aligned to the console language, era content
          gets a top rule so the shared beam runs between eras). */}
      <section className="rz-beam border-t border-rule">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 py-14 md:py-20">
          <div className="mb-12 md:mb-16">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ The arc
            </div>
            <h2 className="mt-3 font-instrument text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-ink">
              Three eras, <span className="italic text-[var(--brand)]">one throughline</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed">
              Delivery discipline first, consumer scale next, then regulated payment infrastructure:
              each era compounding into the one after it.
            </p>
          </div>

          <div className="journey-timeline">
            <div className="journey-rail" aria-hidden="true">
              <div className="journey-rail-beam" />
            </div>

            <ol className="space-y-16 md:space-y-24">
              {eras.map((era, i) => (
                <li key={era.id} className="relative pl-8 md:pl-16">
                  <span className="journey-era-node" aria-hidden="true" />
                  <div
                    className={`journey-era-content${
                      i > 0 ? " rz-beam border-t border-rule pt-8" : ""
                    }`}
                  >
                    <div className="journey-era-label">
                      <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[var(--brand)]">
                        {era.span}
                      </span>
                      <span className="font-instrument text-xl md:text-2xl text-ink">
                        {era.title}
                      </span>
                    </div>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-ink">{era.lede}</p>
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
        </div>
      </section>

      {/* ── Per-market cards ──────────────────────────────────────────── */}
      {/* Cards keep their grid per the elevation brief (stagger + glow, not a
          re-layout): data-rz-stagger cascades them in; each card carries
          data-glow for the cursor bloom, composing with its hover lift. */}
      <section className="rz-beam border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 md:py-20">
          <div className="mb-10 md:mb-14">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ Every stop on the map
            </div>
            <h2 className="mt-3 font-instrument text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-ink">
              Markets that shaped <span className="italic text-[var(--brand)]">the work</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed">
              What shipped in each market, and the operating lesson it left behind.
            </p>
          </div>

          {/* Expanding market rail. Below lg it is a plain stacked list with
              every panel open (scannable). At lg+ the published markets collapse to
              a rail of vertical name-plates; hovering or keyboard-focusing one
              grows it to reveal what shipped there. Pure CSS (flex-grow), so
              it works with zero hydration and with JS off. All copy stays in
              the DOM at every width — nothing is hidden from screen readers or
              from Google, only visually collapsed. */}
          <ul data-rz-stagger className="journey-market-rail">
            {markets.map((m) => (
              <MarketPanel key={m.key} m={m} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── Close / CTA ───────────────────────────────────────────────── */}
      {/* Centered card → asymmetric console close: statement heading left,
          CTA pair right, beam on the top rule. CTAs match the homepage hero
          grammar (h-12 pills, ink primary, focus-visible rings). */}
      <section className="rz-beam border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-x-12 gap-y-8 px-5 sm:px-6 py-16 md:py-24">
          <div>
            <h2 className="font-instrument text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-ink max-w-2xl">
              The map is the story.{" "}
              <span className="italic text-[var(--brand)]">The work is the proof.</span>
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft leading-relaxed">
              See the case studies behind these markets, or start a conversation about what comes
              next.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/product-work"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the product work →
            </Link>
            <a
              href="/contact/#book"
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/20 px-6 text-sm font-semibold text-ink transition-colors hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book a conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
