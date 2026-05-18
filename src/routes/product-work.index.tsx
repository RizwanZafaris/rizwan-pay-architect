import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { caseStudies, caseStudyThumb, type CaseStudy } from "@/data/caseStudies";
import { absUrl } from "@/lib/seo";

const searchSchema = z.object({
  company: fallback(z.string(), "").default(""),
  theme: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/product-work/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Product Work, Payments Case Studies | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Case studies in regulated payments infrastructure: cross-border corridors, settlement, merchant onboarding, KYC/KYB, fraud and risk, from $1B+ GTV platforms.",
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
        content:
          "Case studies from $1B+ GTV platforms: infrastructure, settlement, cross-border, fraud, KYC/KYB.",
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

function ProductWorkIndex() {
  const { company, theme } = Route.useSearch();
  const navigate = useNavigate({ from: "/product-work" });

  const companies = useMemo(
    () => Array.from(new Set(caseStudies.flatMap((c) => c.relevantFor ?? []))).sort(),
    [],
  );
  const themes = useMemo(() => THEME_RULES.filter((t) => caseStudies.some((c) => t.match(c))), []);

  const filtered = useMemo(() => {
    return caseStudies.filter((c) => {
      if (company && !(c.relevantFor ?? []).includes(company)) return false;
      if (theme) {
        const rule = THEME_RULES.find((t) => t.id === theme);
        if (rule && !rule.match(c)) return false;
      }
      return true;
    });
  }, [company, theme]);

  const hasFilters = Boolean(company || theme);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16 sm:py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Product work
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        Case studies in{" "}
        <span className="italic text-ink-soft">regulated payments infrastructure.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Real systems shipped at $1B+ GTV scale. Filter by the companies this work is most relevant
        to, or by compliance theme.
      </p>

      {/* Filters */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <FilterSelect
          id="pw-company"
          label="Relevant company"
          value={company}
          onChange={(v) =>
            navigate({ search: (p: Record<string, unknown>) => ({ ...p, company: v }) })
          }
          options={companies}
        />
        <FilterSelect
          id="pw-theme"
          label="Compliance theme"
          value={theme}
          onChange={(v) =>
            navigate({ search: (p: Record<string, unknown>) => ({ ...p, theme: v }) })
          }
          options={themes.map((t) => ({ value: t.id, label: t.label }))}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-mono-tech text-ink-soft">
        <span aria-live="polite">
          Showing {filtered.length} of {caseStudies.length} case{" "}
          {caseStudies.length === 1 ? "study" : "studies"}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={() => navigate({ search: { company: "", theme: "" } })}
            className="uppercase tracking-[0.18em] text-ink hover:text-[var(--brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-5">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-rule p-10 text-center text-ink-soft">
            No case studies match those filters.{" "}
            <button
              type="button"
              onClick={() => navigate({ search: { company: "", theme: "" } })}
              className="underline text-ink hover:text-[var(--brand)]"
            >
              Clear filters
            </button>
          </div>
        )}
        {filtered.map((c, i) => (
          <Link
            key={c.slug}
            to="/product-work/$slug"
            params={{ slug: c.slug }}
            className="group rounded-2xl border border-ink/10 bg-surface overflow-hidden hover:border-ink/30 hover:-translate-y-0.5 transition-all duration-200 grid md:grid-cols-12 items-stretch"
          >
            {/* Abstract symbolic thumb — Higgsfield-generated, brand-coherent. */}
            <div className="md:col-span-4 relative aspect-[16/9] md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-rule">
              <img
                src={caseStudyThumb(c.slug)}
                alt={c.imageAlt ?? `${c.title} — abstract editorial illustration`}
                width={800}
                height={450}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="md:col-span-8 p-7 md:p-8 grid md:grid-cols-9 gap-5">
              <div className="md:col-span-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech font-medium">
                    {c.category}
                  </span>
                  <span className="font-mono-tech text-xs text-ink-soft">/0{i + 1}</span>
                </div>
                <h2 className="mt-2 font-instrument text-2xl text-ink group-hover:text-[var(--brand)] transition-colors leading-snug">
                  {c.title}
                </h2>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">{c.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.keywords.slice(0, 4).map((k) => (
                    <span
                      key={k}
                      className="text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-background font-mono-tech uppercase tracking-[0.1em]"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 flex md:justify-end">
                <div className="flex gap-5 md:gap-6">
                  {c.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <div className="font-mono-tech text-base text-ink whitespace-nowrap">
                        {m.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.1em] text-ink-soft font-mono-tech">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
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
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
