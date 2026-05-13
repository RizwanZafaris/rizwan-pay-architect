import { createFileRoute, Link } from "@tanstack/react-router";
import { caseStudies } from "@/data/caseStudies";

export const Route = createFileRoute("/product-work/")({
  head: () => ({
    meta: [
      { title: "Product Work — Payment Infrastructure Case Studies | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Case studies on payment infrastructure, cross-border corridors, settlement, merchant onboarding, KYC/KYB, fraud and risk — from $1B+ GTV platforms.",
      },
      { property: "og:title", content: "Product Work — Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Selected case studies on payments infrastructure, settlement, cross-border, fraud and risk.",
      },
      { property: "og:url", content: "/product-work" },
    ],
    links: [{ rel: "canonical", href: "/product-work" }],
  }),
  component: ProductWorkIndex,
});

function ProductWorkIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Product Work</div>
      <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 max-w-3xl leading-tight">
        Case studies in regulated payments infrastructure.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Real systems shipped at $1B+ GTV scale. No marketing fluff — problem, what was built,
        the role I played, the metrics that moved.
      </p>

      <div className="mt-14 grid gap-px bg-rule border border-rule rounded-lg overflow-hidden">
        {caseStudies.map((c) => (
          <Link
            key={c.slug}
            to="/product-work/$slug"
            params={{ slug: c.slug }}
            className="group bg-surface p-8 hover:bg-surface-2 transition-colors grid md:grid-cols-12 gap-6 items-start"
          >
            <div className="md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.14em] text-accent-emerald font-medium">
                {c.category}
              </div>
            </div>
            <div className="md:col-span-6">
              <h2 className="font-display text-xl text-ink group-hover:text-brand transition-colors">
                {c.title}
              </h2>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{c.tagline}</p>
            </div>
            <div className="md:col-span-3 flex md:justify-end">
              <div className="flex gap-5 md:gap-6">
                {c.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-base text-ink whitespace-nowrap">{m.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.1em] text-ink-soft">{m.label}</div>
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
