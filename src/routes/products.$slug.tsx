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
        meta: [{ title: "Product — Rizwan Zafar" }, { name: "robots", content: "noindex" }],
      };
    const url = absUrl(`/products/${params.slug}`);
    const isComingSoon = p.status === "coming-soon";
    // Coming-soon detail pages have no unique content yet — canonical to /products and noindex.
    const canonical = isComingSoon ? absUrl("/products") : url;
    return {
      meta: [
        { title: `${p.name} — Rizwan Zafar` },
        { name: "description", content: p.oneLiner },
        ...(isComingSoon ? [{ name: "robots", content: "noindex, follow" }] : []),
        { property: "og:title", content: `${p.name} — Rizwan Zafar` },
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
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        to="/products"
        className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
      >
        ← Products
      </Link>
      <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech">
        ◆ {product.statusLabel}
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
        {product.name}
      </h1>
      <p className="mt-5 text-lg text-ink-soft">{product.oneLiner}</p>

      <div className="mt-10 bg-surface border border-rule rounded-2xl p-7">
        <h2 className="font-instrument text-xl text-ink">What it is</h2>
        <p className="mt-3 text-ink-soft leading-relaxed">{product.description}</p>

        {product.status === "coming-soon" && (
          <>
            <h2 className="font-instrument text-xl text-ink mt-8">Preview access</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              {product.name} is in quiet build. Tap below to join the preview list — you'll get a
              short, no-noise note when there is something to show.
            </p>
            {mailtoHref && (
              <a
                href={mailtoHref}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
              >
                Join the waitlist →
              </a>
            )}
          </>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-rule">
        <Link to="/products" className="text-sm text-ink-soft hover:text-ink">
          ← All products
        </Link>
      </div>
    </div>
  );
}
