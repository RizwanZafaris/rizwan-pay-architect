import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, type Product } from "@/data/products";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.product;
    if (!p)
      return {
        meta: [{ title: "Product, Rizwan Zafar" }, { name: "robots", content: "noindex" }],
      };
    const url = absUrl(`/products/${params.slug}`);
    const isComingSoon = p.status === "coming-soon";
    // Coming-soon detail pages have no unique content yet, canonical to /products and noindex.
    const canonical = isComingSoon ? absUrl("/products") : url;
    return {
      meta: [
        { title: `${p.name}, Rizwan Zafar` },
        { name: "description", content: p.oneLiner },
        ...(isComingSoon ? [{ name: "robots", content: "noindex, follow" }] : []),
        { property: "og:title", content: `${p.name}, Rizwan Zafar` },
        { property: "og:description", content: p.oneLiner },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-brand underline">
        Back to products
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-ink-soft">{error.message}</p>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const mailtoHref = product.waitlistEmail
    ? `mailto:${product.waitlistEmail}?subject=${encodeURIComponent(
        `Waitlist · ${product.name}`,
      )}&body=${encodeURIComponent(
        `Hi Rizwan,\n\nPlease add me to the ${product.name} preview waitlist.\n\nName: \nCompany: \nWhy I'm interested: \n`,
      )}`
    : null;

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6 py-16 md:py-24">
      <Link
        to="/products"
        className="inline-flex py-1.5 -my-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
      >
        ← Products
      </Link>
      <div className="mt-8 text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
        ◆ {product.statusLabel}
      </div>
      <h1 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.0]">
        {product.name}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">{product.oneLiner}</p>

      {/* Metric strip — flat bordered ledger tiles, mono tabular numerals,
          revealed as one stagger group (children carry no reveal of their own). */}
      {product.metrics && product.metrics.length > 0 && (
        <div
          data-rz-stagger
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 md:grid-cols-4 lg:grid-cols-5"
        >
          {product.metrics.map((m) => (
            <div key={m.label} className="min-w-0 border border-rule bg-surface-2 p-4">
              <div className="break-words font-mono-tech text-base leading-snug text-ink tabular-nums sm:text-lg md:text-xl">
                {m.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="rz-beam relative mt-12 border-t border-rule pt-8 md:mt-16 md:pt-10">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ What it is
        </div>
        <p className="mt-4 text-ink-soft leading-relaxed text-base md:text-lg">
          {product.description}
        </p>
      </section>

      {product.status !== "coming-soon" && product.link.startsWith("/") && (
        <Link
          to={product.link}
          data-glow
          className="group relative mt-12 block rounded-lg border border-rule bg-surface p-6 transition-colors hover:border-ink/30 md:mt-16 md:p-7"
        >
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ The full build
          </div>
          <div className="mt-3 font-instrument text-2xl leading-snug text-ink transition-colors group-hover:text-[var(--brand)]">
            {product.ctaLabel ?? "Read the case study"}
            <span
              className="ml-1.5 inline-block transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            The architecture, operating model and impact behind {product.name}.
          </p>
        </Link>
      )}

      {product.status === "coming-soon" && (
        <section
          data-glow
          className="rz-beam relative mt-12 border-t border-rule pt-8 md:mt-16 md:pt-10"
        >
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Preview access
          </div>
          <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed text-base md:text-lg">
            {product.name} is in quiet build. Tap below to join the preview list, you'll get a
            short, no-noise note when there is something to show.
          </p>
          {mailtoHref && (
            <a
              href={mailtoHref}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink text-background px-5 text-sm font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Join the waitlist
              <span aria-hidden>→</span>
            </a>
          )}
        </section>
      )}

      <div className="mt-14 border-t border-rule pt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 py-1.5 -my-1.5 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          ← <span className="rz-link">All products</span>
        </Link>
      </div>
    </div>
  );
}
