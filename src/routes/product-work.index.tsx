import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { caseStudies, caseStudyThumb, type CaseStudy } from "@/data/caseStudies";
import { compactMetricValue, isCompactMetric } from "@/lib/case-study-ui";
import { profile } from "@/data/profile";
import { PLATFORM } from "@/content/facts";
import { absUrl } from "@/lib/seo";

const searchSchema = z.object({
  company: fallback(z.string(), "").default(""),
  theme: fallback(z.string(), "").default(""),
  // Homepage industry pillars deep-link here (?industry=payments|ecommerce|ott
  // …). Values are fixed by INDUSTRY_RULES below — see homeSections.tsx PILLARS.
  industry: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/product-work/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Product Work, Payments Case Studies | Rizwan Zafar" },
      {
        name: "description",
        content: `Case studies in regulated payments infrastructure: cross-border corridors, settlement, merchant onboarding, KYC/KYB, fraud and risk, from ${PLATFORM.gtv} GTV platforms.`,
      },
      { property: "og:title", content: "Product Work, Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Selected case studies on payments infrastructure, settlement, cross-border, fraud and risk.",
      },
      { property: "og:url", content: absUrl("/product-work") },
      { name: "twitter:title", content: "Product Work, Rizwan Zafar" },
      {
        name: "twitter:description",
        content: `Case studies from ${PLATFORM.gtv} GTV platforms: infrastructure, settlement, cross-border, fraud, KYC/KYB.`,
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/product-work") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Product Work, Payments Case Studies",
          url: absUrl("/product-work"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: caseStudies.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absUrl(`/product-work/${c.slug}`),
              name: c.title,
            })),
          },
        }),
      },
    ],
  }),
  component: ProductWorkIndex,
});

// Compliance / product themes derived from keywords + category.
const THEME_RULES: { id: string; label: string; match: (c: CaseStudy) => boolean }[] = [
  {
    id: "pci-iso",
    label: "PCI DSS · ISO 27001",
    match: (c) =>
      /(PCI|ISO\s?27001)/i.test([c.category, ...c.keywords, ...(c.impact ?? [])].join(" ")),
  },
  {
    id: "aml-cft",
    label: "AML/CFT · Sanctions",
    match: (c) => /(AML|CFT|sanctions|PEP)/i.test([c.category, ...c.keywords].join(" ")),
  },
  {
    id: "kyc-kyb",
    label: "KYC / KYB",
    match: (c) => /(KYC|KYB|onboarding)/i.test([c.category, ...c.keywords].join(" ")),
  },
  {
    id: "fraud-risk",
    label: "Fraud & Risk",
    match: (c) => /(fraud|risk|chargeback)/i.test([c.category, ...c.keywords].join(" ")),
  },
  {
    id: "settlement",
    label: "Settlement & Recon",
    match: (c) =>
      /(settlement|reconcil|ledger|treasury)/i.test([c.category, ...c.keywords].join(" ")),
  },
  {
    id: "cross-border",
    label: "Cross-Border & FX",
    match: (c) =>
      /(cross-border|corridor|FX|remittance)/i.test([c.category, ...c.keywords].join(" ")),
  },
  {
    id: "infrastructure",
    label: "Payment Infrastructure",
    match: (c) =>
      /(infrastructure|platform|wallet|rail|API)/i.test([c.category, ...c.keywords].join(" ")),
  },
];

// Static derivations — all cards prerender and PW_FILTER_SCRIPT (inline
// vanilla, same pattern as the blog filter) hides non-matching ones. Do not
// move filtering into React state: production ships no React runtime.
// The "Relevant company" dropdown lists real companies only. Audience-phrase
// tags ("Banks expanding fintech reach", "VP Operations / Treasury hiring
// managers"…) stay on the cards as relevance data but read as leaked taxonomy
// when surfaced as filter options. Allow-list = canonical target companies
// (profile.relevantFor) + regional acquirers named in the case studies.
const COMPANY_FILTER_EXTRAS = ["Geidea", "Magnati"] as const;
const companyAllowList = new Set<string>([...profile.relevantFor, ...COMPANY_FILTER_EXTRAS]);
const companies = Array.from(new Set(caseStudies.flatMap((c) => c.relevantFor ?? [])))
  .filter((name) => companyAllowList.has(name))
  .sort();
const themes = THEME_RULES.filter((t) => caseStudies.some((c) => t.match(c)));
const themeIdsFor = (c: CaseStudy) =>
  THEME_RULES.filter((t) => t.match(c))
    .map((t) => t.id)
    .join("|");

// Industry lens — maps each case study to one or more of the fixed industry
// slugs the homepage pillars deep-link to (payments | ecommerce | ott |
// compliance | cross-border | onboarding). Same match-rule shape as
// THEME_RULES; a study can belong to several industries (e.g. a cross-border
// study is also payments). Order here is the chip render order.
const INDUSTRY_RULES: { id: string; label: string; match: (c: CaseStudy) => boolean }[] = [
  {
    id: "payments",
    label: "Payments",
    match: (c) =>
      /(payment|acquir|wallet|DCB|IBFT|settlement|reconcil|billing|BNPL|MPGS|MDES|token|3DS|click to pay)/i.test(
        [c.category, c.title, ...c.keywords].join(" "),
      ),
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    match: (c) =>
      c.slug.startsWith("daraz-") ||
      /(marketplace|e-commerce|checkout conversion|COD to digital)/i.test(
        [c.category, c.title, ...c.keywords].join(" "),
      ),
  },
  {
    id: "ott",
    label: "OTT & subscriptions",
    match: (c) =>
      c.slug.startsWith("tapmad-") ||
      /(OTT|subscription|streaming|ARPU)/i.test([c.category, c.title, ...c.keywords].join(" ")),
  },
  {
    id: "compliance",
    label: "Compliance",
    match: (c) =>
      /(AML|CFT|sanctions|PEP|KYC|KYB|onboarding|PCI|ISO\s?27001|governance|CSP)/i.test(
        [c.category, c.title, ...c.keywords].join(" "),
      ),
  },
  {
    id: "cross-border",
    label: "Cross-border",
    match: (c) =>
      /(cross-border|corridor|FX|remittance|SWIFT|ISO 20022|gpi|correspondent)/i.test(
        [c.category, c.title, ...c.keywords].join(" "),
      ),
  },
  {
    id: "onboarding",
    label: "Onboarding",
    match: (c) =>
      /(onboarding|KYC|KYB|UBO|activation)/i.test([c.category, c.title, ...c.keywords].join(" ")),
  },
];

const industries = INDUSTRY_RULES.filter((t) => caseStudies.some((c) => t.match(c)));
const industryIdsFor = (c: CaseStudy) =>
  INDUSTRY_RULES.filter((t) => t.match(c))
    .map((t) => t.id)
    .join("|");

// Flagship curation (council audit 2026-07: "nineteen case studies is dilution,
// not proof"). Six deep studies render as full editorial panels, in this exact
// order; the remaining fifteen collapse into the compact "Additional
// programmes" index below. This is a LAYOUT change only — every slug keeps its
// own detail page and URL (see product-work.$slug.tsx), and the CollectionPage
// JSON-LD above still lists all of them, so no SEO equity is lost. The order
// here is the render order and does not have to match the data order; the
// `flagship: true` flag in caseStudies.ts is the single source of which six.
const FLAGSHIP_SLUGS = [
  "simpaisa-payment-infrastructure",
  "settlement-reconciliation",
  "merchant-onboarding-kyc",
  "mdes-network-tokenisation-rollout",
  "tapmad-dcb-monetisation-wallet-migration",
  "simpaisa-ai-solutions-suite",
] as const;
const bySlug = new Map(caseStudies.map((c) => [c.slug, c]));
// Ordered flagship panels. Falls back to the data-flagged set if a slug ever
// drifts, so the two never silently disagree.
const flagships: CaseStudy[] = FLAGSHIP_SLUGS.map((slug) => bySlug.get(slug)).filter(
  (c): c is CaseStudy => Boolean(c?.flagship),
);
const flagshipSlugSet = new Set<string>(flagships.map((c) => c.slug));
// Everything else keeps its original data order.
const additional = caseStudies.filter((c) => !flagshipSlugSet.has(c.slug));

const PW_FILTER_SCRIPT = `
(() => {
  if (window.__rzPwFilterBound) return;
  window.__rzPwFilterBound = true;

  const companySel = document.querySelector('#pw-company');
  const themeSel = document.querySelector('#pw-theme');
  const results = Array.from(document.querySelectorAll('[data-pw-result]'));
  if (!companySel || !themeSel || results.length === 0) return;
  const countEl = document.querySelector('[data-pw-count]');
  const emptyEl = document.querySelector('[data-pw-empty]');
  // Industry lens is a set of chip <button>s (not a <select>) so the homepage
  // pillars land on a visible, tappable state. Current value lives in a var,
  // seeded from ?industry= on load.
  const industryChips = Array.from(document.querySelectorAll('[data-pw-industry]'));

  const params = new URLSearchParams(window.location.search);
  companySel.value = params.get('company') || '';
  themeSel.value = params.get('theme') || '';
  let industry = params.get('industry') || '';

  const hasToken = (value, selected) => !selected || (value || '').split('|').includes(selected);

  const syncChips = () => {
    for (const chip of industryChips) {
      const on = chip.getAttribute('data-pw-industry') === industry;
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
      chip.dataset.pwActive = on ? 'true' : 'false';
    }
  };

  const apply = () => {
    const company = companySel.value;
    const theme = themeSel.value;
    let count = 0;
    for (const el of results) {
      const matches =
        hasToken(el.getAttribute('data-pw-companies'), company) &&
        hasToken(el.getAttribute('data-pw-themes'), theme) &&
        hasToken(el.getAttribute('data-pw-industries'), industry);
      el.hidden = !matches;
      if (matches) count++;
    }
    if (countEl) countEl.textContent = String(count);
    if (emptyEl) emptyEl.hidden = count !== 0;
    syncChips();
    // Merge into the existing query (preserving utm_*/click-ids for the
    // cal.com forwarder and analytics) and keep the hash; no-op when the
    // URL is already correct so the initial apply() never rewrites history.
    const next = new URLSearchParams(window.location.search);
    if (company) next.set('company', company); else next.delete('company');
    if (theme) next.set('theme', theme); else next.delete('theme');
    if (industry) next.set('industry', industry); else next.delete('industry');
    const qs = next.toString();
    const nextUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, '', nextUrl);
    }
  };

  companySel.addEventListener('change', apply);
  themeSel.addEventListener('change', apply);
  industryChips.forEach((chip) => {
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      const value = chip.getAttribute('data-pw-industry') || '';
      // Toggle: clicking the active chip clears the industry filter.
      industry = industry === value ? '' : value;
      apply();
    });
  });
  document.querySelectorAll('[data-pw-clear]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      companySel.value = '';
      themeSel.value = '';
      industry = '';
      apply();
    });
  });

  apply();
})();
`;

// px-5 at base, not px-4: every other page container on the site opens at
// px-5 sm:px-6 (about, blog, contact, resume, journey...). This page was the
// lone px-4, so entering /product-work nudged the content rail 4px left on mobile.
function ProductWorkIndex() {
  return (
    <div className="mx-auto max-w-6xl overflow-x-clip px-5 py-12 sm:px-6 sm:py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
        ◆ Product work
      </div>
      <h1 className="mt-3 max-w-4xl break-words font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink [overflow-wrap:anywhere]">
        Case studies in{" "}
        <span className="italic text-[var(--brand)]">regulated payments infrastructure.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        Real systems shipped at {PLATFORM.gtv} GTV scale. Filter by industry, by the companies this work is
        most relevant to, or by compliance theme.
      </p>

      {/* Industry lens — chip row. Matches the homepage pillar deep links
          (?industry=payments|ecommerce|ott…). Uncontrolled: PW_FILTER_SCRIPT
          owns the active state in production. */}
      <div className="mt-8 sm:mt-10">
        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
          Industry
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
          {industries.map((ind) => (
            <button
              key={ind.id}
              type="button"
              data-pw-industry={ind.id}
              aria-pressed="false"
              className="rounded-full border border-rule bg-surface px-3 py-1.5 text-xs font-mono-tech uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink/40 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 data-[pw-active=true]:border-[var(--brand)] data-[pw-active=true]:bg-[var(--brand)]/10 data-[pw-active=true]:text-[var(--brand)]"
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters — flat console rail, no card chrome */}
      <div className="mt-6 grid gap-4 border-y border-rule py-5 sm:grid-cols-2">
        <FilterSelect id="pw-company" label="Relevant company" options={companies} />
        <FilterSelect
          id="pw-theme"
          label="Compliance theme"
          options={themes.map((t) => ({ value: t.id, label: t.label }))}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-ink-soft">
        <span aria-live="polite">
          Showing <span data-pw-count>{caseStudies.length}</span> of {caseStudies.length} case{" "}
          {caseStudies.length === 1 ? "study" : "studies"}
        </span>
        <button
          type="button"
          data-pw-clear
          className="uppercase tracking-[0.18em] text-ink hover:text-[var(--brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded"
        >
          Clear filters
        </button>
      </div>

      <div
        hidden
        data-pw-empty
        className="mt-8 border border-dashed border-rule p-10 text-center text-ink-soft"
      >
        No case studies match those filters.{" "}
        <button type="button" data-pw-clear className="underline text-ink hover:text-[var(--brand)]">
          Clear filters
        </button>
      </div>
      {/* Flagships — six deep case studies as alternating editorial panels
          (homepage "Selected work" language): image field one side,
          display-scale hero metric + title the other, direction flipping per
          row. The panels stay flat DOM children of one stagger group so
          PW_FILTER_SCRIPT's hidden-toggle keeps working unchanged. Both this
          group AND the "Additional programmes" index below carry
          [data-pw-result] + the three data-pw-* attributes, so the inline
          vanilla filter spans both groups with zero script changes. The signal
          beam runs the section's top rule. */}
      <section className="rz-beam relative mt-12 border-t border-rule pt-10 md:mt-16 md:pt-12">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Selected work
        </div>
        <h2 className="mt-3 font-instrument text-3xl leading-tight text-ink md:text-4xl">
          Six flagship builds, in depth.
        </h2>
        <div data-rz-stagger className="mt-10 flex flex-col gap-14 md:mt-14 md:gap-24">
        {flagships.map((c, i) => {
          const heroStat = c.metrics?.[0];
          const flip = i % 2 === 1;
          return (
            <Link
              key={c.slug}
              to="/product-work/$slug"
              params={{ slug: c.slug }}
              data-pw-result
              data-pw-companies={(c.relevantFor ?? []).join("|")}
              data-pw-themes={themeIdsFor(c)}
              data-pw-industries={industryIdsFor(c)}
              data-glow
              className="group relative grid min-w-0 items-center gap-6 md:grid-cols-12 md:gap-12"
            >
              {/* Abstract symbolic image field — Higgsfield-generated, brand-coherent. */}
              <div
                className={`rz-unveil relative aspect-[16/10] min-w-0 overflow-hidden rounded-lg bg-ink md:col-span-7 ${
                  flip ? "md:order-2" : ""
                }`}
              >
                <img
                  src={caseStudyThumb(c.slug)}
                  alt={c.imageAlt ?? `${c.title} — abstract editorial illustration`}
                  width={800}
                  height={450}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:scale-[1.035]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in oklab, var(--background) 40%, transparent) 0%, transparent 40%, color-mix(in oklab, var(--background) 55%, transparent) 100%)",
                  }}
                />
                <div className="absolute top-4 left-5 z-10 font-mono-tech text-[10px] tracking-[0.18em] text-ink uppercase">
                  ◆ Case study /{String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className={`min-w-0 md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]">
                  {c.category}
                </span>
                {heroStat && (
                  <div className="mt-4">
                    {/* A metric that resists compaction (no numeric lede, no
                        parenthetical to shed) drops a type step rather than
                        being truncated. compactMetricValue no longer emits an
                        ellipsis, so the alternative to sizing down would be a
                        60-character string set at text-6xl. */}
                    <div
                      className={`break-words font-instrument italic leading-none tracking-tight text-ink tabular-nums ${
                        isCompactMetric(compactMetricValue(heroStat))
                          ? "text-4xl sm:text-5xl lg:text-6xl"
                          : "text-2xl sm:text-3xl lg:text-4xl"
                      }`}
                    >
                      {compactMetricValue(heroStat)}
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                      {heroStat.label}
                    </div>
                  </div>
                )}
                <h2 className="mt-5 break-words font-instrument text-2xl leading-tight text-ink transition-colors group-hover:text-[var(--brand)] md:text-3xl">
                  {c.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  {cardSummary(c.tagline)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.keywords.slice(0, 4).map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-rule bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-[var(--brand)]">
                  Read case study
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
        </div>
      </section>

      {/* Additional programmes — the remaining fifteen studies as a compact
          divide-y index. No images, no metric tiles: title + one-line tagline
          + category/market tags, the whole row links to the full study (every
          detail page still exists). Plain mono label, no ◆ diamond (overused).
          Each row carries [data-pw-result] + the three data-pw-* attributes so
          PW_FILTER_SCRIPT filters this group alongside the flagships. */}
      {additional.length > 0 && (
        <section className="rz-beam relative mt-16 border-t border-rule pt-10 md:mt-20 md:pt-12">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech font-semibold">
            Additional programmes
          </div>
          <h2 className="mt-3 font-instrument text-3xl leading-tight text-ink md:text-4xl">
            The rest of the record, in brief.
          </h2>
          <div data-rz-stagger className="mt-10 divide-y divide-rule border-t border-rule">
            {additional.map((c) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                data-pw-result
                data-pw-companies={(c.relevantFor ?? []).join("|")}
                data-pw-themes={themeIdsFor(c)}
                data-pw-industries={industryIdsFor(c)}
                data-glow
                className="group relative grid min-w-0 gap-y-2 py-6 md:grid-cols-12 md:gap-x-8 md:py-7"
              >
                <div className="md:col-span-3">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--brand)] font-mono-tech">
                    {c.category}
                  </span>
                </div>
                <div className="min-w-0 md:col-span-7">
                  <h3 className="break-words font-instrument text-xl leading-[1.15] text-ink transition-all duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5 group-hover:text-[var(--brand)] md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft md:line-clamp-1">
                    {cardSummary(c.tagline)}
                  </p>
                  {c.markets && c.markets.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.markets.slice(0, 5).map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-rule bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 md:col-span-2 md:justify-end md:self-center">
                  <span
                    className="hidden text-lg text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:inline"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <script dangerouslySetInnerHTML={{ __html: PW_FILTER_SCRIPT }} />
    </div>
  );
}

type Option = string | { value: string; label: string };

function cardSummary(text: string) {
  if (text.length <= 210) return text;
  return `${text.slice(0, 207).replace(/\s+\S*$/, "")}...`;
}

function FilterSelect({ id, label, options }: { id: string; label: string; options: Option[] }) {
  // Uncontrolled on purpose: PW_FILTER_SCRIPT owns the value in production.
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        aria-label={label}
        defaultValue=""
        className="mt-2 w-full rounded-lg border border-rule bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus:border-ink/60"
      >
        <option value="">All</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return (
            <option key={v} value={v}>
              {l}
            </option>
          );
        })}
      </select>
    </div>
  );
}
