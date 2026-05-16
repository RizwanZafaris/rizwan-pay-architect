import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { absUrl } from "@/lib/seo";

const searchSchema = z.object({
  market: fallback(z.string(), "").default(""),
  company: fallback(z.string(), "").default(""),
  theme: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/product-work/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Product Work — Payments Case Studies | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Case studies in regulated payments infrastructure: cross-border corridors, settlement, merchant onboarding, KYC/KYB, fraud and risk — from $1B+ GTV platforms.",
      },
      { property: "og:title", content: "Product Work — Rizwan Zafar" },
      { property: "og:description", content: "Selected case studies on payments infrastructure, settlement, cross-border, fraud and risk." },
      { property: "og:url", content: absUrl("/product-work") },
    ],
    links: [{ rel: "canonical", href: absUrl("/product-work") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Product Work — Payments Case Studies",
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
  { id: "pci-iso", label: "PCI DSS · ISO 27001", match: (c) => /(PCI|ISO\s?27001)/i.test([c.category, ...c.keywords, ...(c.impact ?? [])].join(" ")) },
  { id: "aml-cft", label: "AML/CFT · Sanctions", match: (c) => /(AML|CFT|sanctions|PEP)/i.test([c.category, ...c.keywords].join(" ")) },
  { id: "kyc-kyb", label: "KYC / KYB", match: (c) => /(KYC|KYB|onboarding)/i.test([c.category, ...c.keywords].join(" ")) },
  { id: "fraud-risk", label: "Fraud & Risk", match: (c) => /(fraud|risk|chargeback)/i.test([c.category, ...c.keywords].join(" ")) },
  { id: "settlement", label: "Settlement & Recon", match: (c) => /(settlement|reconcil|ledger|treasury)/i.test([c.category, ...c.keywords].join(" ")) },
  { id: "cross-border", label: "Cross-Border & FX", match: (c) => /(cross-border|corridor|FX|remittance)/i.test([c.category, ...c.keywords].join(" ")) },
  { id: "infrastructure", label: "Payment Infrastructure", match: (c) => /(infrastructure|platform|wallet|rail|API)/i.test([c.category, ...c.keywords].join(" ")) },
];

function ProductWorkIndex() {
  const { market, company, theme } = Route.useSearch();
  const navigate = useNavigate({ from: "/product-work" });

  const markets = useMemo(
    () => Array.from(new Set(caseStudies.flatMap((c) => c.markets ?? []))).sort(),
    [],
  );
  const companies = useMemo(
    () => Array.from(new Set(caseStudies.flatMap((c) => c.relevantFor ?? []))).sort(),
    [],
  );
  const themes = useMemo(
    () => THEME_RULES.filter((t) => caseStudies.some((c) => t.match(c))),
    [],
  );

  const filtered = useMemo(() => {
    return caseStudies.filter((c) => {
      if (market && !(c.markets ?? []).includes(market)) return false;
      if (company && !(c.relevantFor ?? []).includes(company)) return false;
      if (theme) {
        const rule = THEME_RULES.find((t) => t.id === theme);
        if (rule && !rule.match(c)) return false;
      }
      return true;
    });
  }, [market, company, theme]);

  const hasFilters = Boolean(market || company || theme);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Product work
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        Case studies in <span className="italic text-ink-soft">regulated payments infrastructure.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Real systems shipped at $1B+ GTV scale. Filter by market, by the companies this work is
        most relevant to, or by compliance theme.
      </p>

      {/* Filters */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <FilterSelect
          label="Market"
          value={market}
          onChange={(v) => navigate({ search: (p: typeof Route.types.fullSearchSchema) => ({ ...p, market: v }) })}
          options={markets}
        />
        <FilterSelect
          label="Relevant company"
          value={company}
          onChange={(v) => navigate({ search: (p: typeof Route.types.fullSearchSchema) => ({ ...p, company: v }) })}
          options={companies}
        />
        <FilterSelect
          label="Compliance theme"
          value={theme}
          onChange={(v) => navigate({ search: (p: typeof Route.types.fullSearchSchema) => ({ ...p, theme: v }) })}
          options={themes.map((t) => ({ value: t.id, label: t.label }))}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-mono-tech text-ink-soft">
        <span>
          {filtered.length} of {caseStudies.length} case {filtered.length === 1 ? "study" : "studies"}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={() => navigate({ search: { market: "", company: "", theme: "" } })}
            className="uppercase tracking-[0.18em] text-ink hover:text-[var(--brand)]"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-5">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-rule p-10 text-center text-ink-soft">
            No case studies match those filters. Try clearing one.
          </div>
        )}
        {filtered.map((c, i) => (
          <Link
            key={c.slug}
            to="/product-work/$slug"
            params={{ slug: c.slug }}
            className="group rounded-2xl border border-ink/10 bg-surface p-7 md:p-8 hover:border-ink/30 hover:-translate-y-0.5 transition-all duration-200 grid md:grid-cols-12 gap-6 items-start"
          >
            <div className="md:col-span-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech font-medium">
                {c.category}
              </div>
              <div className="mt-2 font-mono-tech text-xs text-ink-soft">/0{i + 1}</div>
            </div>
            <div className="md:col-span-6">
              <h2 className="font-instrument text-2xl text-ink group-hover:text-[var(--brand)] transition-colors leading-snug">
                {c.title}
              </h2>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{c.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.keywords.slice(0, 4).map((k) => (
                  <span key={k} className="text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-background font-mono-tech uppercase tracking-[0.1em]">
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 flex md:justify-end">
              <div className="flex gap-5 md:gap-6">
                {c.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div className="font-mono-tech text-base text-ink whitespace-nowrap">{m.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.1em] text-ink-soft font-mono-tech">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

type Option = string | { value: string; label: string };

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-rule bg-surface px-3 py-2.5 text-sm text-ink focus:border-ink/40 focus:outline-none"
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
    </label>
  );
}
