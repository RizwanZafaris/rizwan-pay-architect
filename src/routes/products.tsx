import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { PLATFORM } from "@/content/facts";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products, Rizwan Zafar | Payments Product Lab" },
      {
        name: "description",
        content:
          "Products Rizwan Zafar has built and is building: Simpaisa payment infrastructure, Tapmad billing migration, plus new products in quiet build.",
      },
      { property: "og:title", content: "Products, Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Payment infrastructure shipped at scale, plus new products in quiet build from Rizwan's product lab.",
      },
      { property: "og:url", content: absUrl("/products") },
      { name: "twitter:title", content: "Products, Rizwan Zafar" },
      {
        name: "twitter:description",
        content: "Payment infrastructure shipped at scale, plus new products in quiet build.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/products") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Products, Rizwan Zafar",
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
    <div className="overflow-x-clip">
      {/* ── Page header: statement type over the console ground ── */}
      <header className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Products
          </div>
          <h1 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.0] max-w-4xl">
            Products I have built, and products I am{" "}
            <span className="italic text-[var(--brand)]">building.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Shipped payment infrastructure, card acquiring, wallets, cross-border corridors,
            settlement and reconciliation, KYC/KYB, AML/CFT and fraud, that has cleared{" "}
            {PLATFORM.gtv} in annual GTV across {PLATFORM.marketsWord} regulated markets. Plus a
            small portfolio of new products in quiet build from the product lab.
          </p>
        </div>
        {/* Ledger strip: flat bordered tiles, tabular mono numerals. */}
        <div className="border-t border-rule bg-surface">
          <ul
            data-rz-stagger
            className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[color:var(--rule)]"
          >
            {[
              { v: PLATFORM.gtv, l: "annual GTV cleared" },
              { v: PLATFORM.annualPayments, l: "annual transactions" },
              { v: String(PLATFORM.marketCount), l: "regulated markets" },
              { v: PLATFORM.uptime, l: "platform uptime" },
            ].map((p) => (
              <li key={p.l} className="px-5 py-6 sm:px-6 md:py-8">
                <div className="font-mono-tech text-xl md:text-2xl text-ink leading-none tabular-nums">
                  {p.v}
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-2 font-mono-tech">
                  {p.l}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ── Portfolio: asymmetric 7/5 editorial spread, not a uniform grid ── */}
      <section className="rz-beam relative border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-sm)]">
          <div data-rz-stagger className="grid gap-5 md:grid-cols-12">
            {products.map((p, i) => {
              // Alternating asymmetry: 7/5 then 5/7 so no two rows read as clones.
              const wide = i % 4 === 0 || i % 4 === 3;
              return (
                <article
                  key={p.slug}
                  data-glow
                  className={`group relative flex flex-col bg-card border border-rule rounded-lg p-6 sm:p-7 transition-colors hover:border-ink/30 ${
                    wide ? "md:col-span-7" : "md:col-span-5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className="font-mono-tech text-[11px] tracking-[0.22em] text-[var(--brand)]"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-2 leading-tight">
                        {p.name}
                      </h2>
                    </div>
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
                  <p className="mt-3 text-sm text-ink-soft/90 leading-relaxed flex-1">
                    {p.description}
                  </p>

                  {p.metrics && p.metrics.length > 0 && (
                    <dl className="mt-6 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3 border-t border-rule pt-4">
                      {p.metrics.slice(0, 3).map((m) => (
                        <div key={m.label} className="min-w-0">
                          <dt className="text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-ink-soft font-mono-tech leading-tight">
                            {m.label}
                          </dt>
                          <dd className="font-mono-tech text-base sm:text-lg text-ink mt-1 tabular-nums leading-snug">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-6 pt-5 border-t border-rule">
                    {p.link.startsWith("/") ? (
                      <Link
                        to={p.link}
                        className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-[var(--brand)]"
                      >
                        <span className="rz-link">{p.ctaLabel ?? "Learn more"}</span>
                        <span
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={p.link}
                        className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-[var(--brand)]"
                      >
                        <span className="rz-link">{p.ctaLabel ?? "Learn more"}</span>
                        <span
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden
                        >
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Closing rail ── */}
      <section className="rz-beam relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16 flex flex-wrap gap-x-8 gap-y-5 items-center justify-between">
          <p className="max-w-xl font-instrument text-xl md:text-2xl text-ink leading-snug">
            Discussing senior payments product roles or a build partnership?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full bg-ink text-background px-5 text-sm font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Contact
            </Link>
            <Link
              to="/resume"
              className="inline-flex h-11 items-center rounded-full border border-ink/20 px-5 text-sm text-ink hover:border-ink/50 hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
