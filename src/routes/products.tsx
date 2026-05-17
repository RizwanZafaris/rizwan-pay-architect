import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Rizwan Zafar | Payments Product Lab" },
      {
        name: "description",
        content:
          "Products Rizwan Zafar has built and is building: Simpaisa payment infrastructure, Tapmad billing migration, plus new products in quiet build.",
      },
      { property: "og:title", content: "Products — Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Payment infrastructure shipped at scale, plus new products in quiet build from Rizwan's product lab.",
      },
      { property: "og:url", content: absUrl("/products") },
    ],
    links: [{ rel: "canonical", href: absUrl("/products") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Products — Rizwan Zafar",
          url: absUrl("/products"),
          hasPart: products.map((p) => ({
            "@type": "CreativeWork",
            name: p.name,
            url: absUrl(p.link),
            description: p.oneLiner,
          })),
        }),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
        ◆ Products
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05] max-w-3xl">
        Products I have built — and products I am building.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Shipped payment infrastructure that has cleared $1B+ in annual volume across five
        regulated markets, plus a small portfolio of new products in quiet build from the
        product lab.
      </p>
      <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
        {[
          { v: "$1B+", l: "annual GTV cleared" },
          { v: "25M+", l: "monthly transactions" },
          { v: "5", l: "regulated markets" },
          { v: "99.95%", l: "settlement SLA" },
        ].map((p) => (
          <li key={p.l} className="rounded-xl border border-rule bg-surface p-4">
            <div className="font-mono-tech text-lg text-ink">{p.v}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
              {p.l}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {products.map((p) => (
          <article
            key={p.slug}
            className="group flex flex-col bg-surface border border-rule rounded-2xl p-7 hover:border-ink/30 transition-colors"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-instrument text-2xl text-ink">{p.name}</h2>
              <span
                className={`text-[10px] uppercase tracking-[0.18em] font-mono-tech px-2.5 py-1 rounded-full border ${
                  p.status === "coming-soon"
                    ? "border-rule text-ink-soft"
                    : "border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)]"
                }`}
              >
                {p.statusLabel}
              </span>
            </div>
            <p className="mt-3 text-ink-soft leading-relaxed">{p.oneLiner}</p>
            <p className="mt-3 text-sm text-ink-soft/90 leading-relaxed">{p.description}</p>

            {p.metrics && p.metrics.length > 0 && (
              <dl className="mt-5 grid grid-cols-3 gap-3">
                {p.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className="border-l border-rule pl-3">
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                      {m.label}
                    </dt>
                    <dd className="font-instrument text-lg text-ink mt-0.5">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6 pt-5 border-t border-rule">
              {p.link.startsWith("/") ? (
                <Link
                  to={p.link}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-[var(--brand)] transition-colors"
                >
                  {p.ctaLabel ?? "Learn more"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              ) : (
                <a
                  href={p.link}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-[var(--brand)] transition-colors"
                >
                  {p.ctaLabel ?? "Learn more"} →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-rule flex flex-wrap gap-3 items-center justify-between">
        <p className="text-ink-soft">
          Discussing senior payments product roles or a build partnership?
        </p>
        <div className="flex gap-3">
          <Link
            to="/contact"
            className="inline-flex rounded-md bg-ink text-background px-4 py-2 text-sm hover:bg-brand transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/resume"
            className="inline-flex rounded-md border border-ink/20 px-4 py-2 text-sm text-ink hover:border-ink/40"
          >
            Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
