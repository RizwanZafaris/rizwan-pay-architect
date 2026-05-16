import { createFileRoute, Link } from "@tanstack/react-router";
import { caseStudies } from "@/data/caseStudies";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/product-work/")({
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

function ProductWorkIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Product work
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        Case studies in <span className="italic text-ink-soft">regulated payments infrastructure.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Real systems shipped at $1B+ GTV scale. Problem, system built, role, metrics, and why
        this work is relevant to Visa, Mastercard, Stripe, Wise, Adyen, Thunes and DLocal-class
        companies.
      </p>

      <div className="mt-14 grid gap-5">
        {caseStudies.map((c, i) => (
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
