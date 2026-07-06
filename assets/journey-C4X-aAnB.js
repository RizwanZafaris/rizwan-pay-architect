import{z as e,W as r,A as n,L as s}from"./index-CNSzerP1.js";const o=[{id:"foundations",span:"2009–2016",title:"Foundations",lede:"Engineering to product. Learning to run delivery before running a roadmap.",points:["Moved from field engineering into project and product leadership.","Ran PMO leadership at DS Engineering across a $15M portfolio and 400+ projects, and earlier at PESCO.","Named PMI Youngest Project Manager of the Year in 2015."]},{id:"scale-school",span:"2017–2020",title:"Scale school",lede:"Two operators, two continents of consumer scale — OTT subscriptions and Alibaba-scale marketplaces.",points:["Tapmad (OTT): launched Direct Carrier Billing across all four telcos and grew from 0 to 5M paid subscribers.","Tapmad: cut payment cost from 50% of revenue to about 1% and lifted ARPU by 70%, on the way to $10M+ ARR.","Tapmad: expanded DCB and wallet billing into the UAE and KSA with regional telco and wallet partners.","Daraz (Alibaba Group): ran payment operations across five markets — +15% checkout conversion, −20% false declines, 99.5% settlement.","Daraz: widened payment coverage by roughly 40% by localising regional methods on checkout."]},{id:"gateway-years",span:"2020–now",title:"The gateway years",lede:"Simpaisa — Chief Product Officer, and acting CTO through 2024. Building the cross-border gateway.",points:["Built a $1B+ GTV gateway processing 270M+ payments a year.","Reached 150+ merchants at a 99.95% settlement SLA.","Shipped four market launches in 2024, and grew the product org from 2 to 8 PMs across a 50+ team.","Led PCI-DSS Level 1 and ISO 27001 from scratch."]}],i=`
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
`;function l({m:a}){return e.jsxs("article",{className:"journey-market-card rounded-2xl border border-rule bg-card p-6",children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("span",{className:"text-3xl leading-none","aria-hidden":"true",children:a.flag}),e.jsx("span",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:a.years})]}),e.jsx("h3",{className:"mt-4 font-instrument text-2xl text-ink",children:a.name}),e.jsx("div",{className:"mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--brand)] font-mono-tech font-semibold",children:a.brand}),e.jsx("p",{className:"mt-4 text-sm leading-relaxed text-ink",children:a.shipped}),a.needsOwnerConfirm&&e.jsx("p",{className:"mt-3",children:e.jsx("span",{className:"journey-pending",children:"◇ Detail pending"})}),e.jsx("p",{className:"mt-4 border-t border-rule pt-4 text-sm italic leading-relaxed text-ink-soft",children:a.lesson})]})}function d(){return e.jsxs("div",{className:"journey-page",children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:i}}),e.jsxs("section",{className:"mx-auto max-w-6xl px-6 pt-20 pb-8 sm:pt-24",children:[e.jsx("div",{className:"journey-eyebrow text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ The operating map"}),e.jsx("h1",{className:"mt-8 font-instrument text-4xl leading-[1.05] text-ink sm:text-6xl",children:"Seventeen years. Ten markets. Three industries."}),e.jsx("p",{className:"mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft",children:"I didn't study frontier markets — I shipped in them. This is the map: every market, what I built there, and what it taught me about payments, product and the distance between a regulation and a working checkout."})]}),e.jsxs("section",{className:"mx-auto max-w-6xl px-6 pb-16",children:[e.jsx("div",{className:"rounded-2xl border border-rule bg-surface p-4 sm:p-8",children:e.jsx(r,{showLabels:!0})}),e.jsx("p",{className:"mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:"◆ Ten operating markets · arcs originate from the Dubai hub"})]}),e.jsxs("section",{className:"mx-auto max-w-4xl px-6 py-8",children:[e.jsxs("div",{className:"mb-12 text-center",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.28em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ The arc"}),e.jsx("h2",{className:"mt-4 font-instrument text-3xl text-ink sm:text-4xl",children:"Three eras, one throughline"}),e.jsx("p",{className:"mx-auto mt-3 max-w-xl text-ink-soft",children:"Delivery discipline first, consumer scale next, then regulated payment infrastructure — each era compounding into the one after it."})]}),e.jsxs("div",{className:"journey-timeline",children:[e.jsx("div",{className:"journey-rail","aria-hidden":"true",children:e.jsx("div",{className:"journey-rail-beam"})}),e.jsx("ol",{className:"space-y-16 md:space-y-24",children:o.map(a=>e.jsxs("li",{className:"relative pl-8 md:pl-16",children:[e.jsx("span",{className:"journey-era-node","aria-hidden":"true"}),e.jsxs("div",{className:"journey-era-content",children:[e.jsxs("div",{className:"journey-era-label",children:[e.jsx("span",{className:"font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[var(--brand)]",children:a.span}),e.jsx("span",{className:"font-instrument text-xl text-ink",children:a.title})]}),e.jsx("p",{className:"mt-5 text-base leading-relaxed text-ink",children:a.lede}),e.jsx("ul",{className:"mt-5 space-y-3",children:a.points.map(t=>e.jsx("li",{className:"journey-point text-sm leading-relaxed text-ink-soft",children:t},t))})]})]},a.id))})]})]}),e.jsxs("section",{className:"mx-auto max-w-6xl px-6 py-16",children:[e.jsxs("div",{className:"mb-10",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.28em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ Every stop on the map"}),e.jsx("h2",{className:"mt-4 font-instrument text-3xl text-ink sm:text-4xl",children:"Ten markets, ten lessons"}),e.jsx("p",{className:"mt-3 max-w-2xl text-ink-soft",children:"What shipped in each market — and the operating lesson it left behind."})]}),e.jsx("div",{className:"grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",children:n.map(a=>e.jsx(l,{m:a},a.key))})]}),e.jsx("section",{className:"mx-auto max-w-6xl px-6 pb-24",children:e.jsxs("div",{className:"rounded-2xl border border-rule bg-surface-2 p-8 text-center sm:p-12",children:[e.jsx("h2",{className:"font-instrument text-2xl text-ink sm:text-3xl",children:"The map is the story. The work is the proof."}),e.jsx("p",{className:"mx-auto mt-3 max-w-xl text-ink-soft",children:"See the case studies behind these markets, or start a conversation about what comes next."}),e.jsxs("div",{className:"mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",children:[e.jsx(s,{to:"/product-work",className:"inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5",children:"See the product work →"}),e.jsx("a",{href:"/contact/#book",className:"inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-[color-mix(in_oklab,var(--signal)_40%,var(--rule))]",children:"Book a conversation"})]})]})})]})}export{d as component};
