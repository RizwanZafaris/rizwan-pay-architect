import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { posts, categories } from "@/data/posts";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Payments Essays — Knowledge Base | Rizwan Zafar" },
      {
        name: "description",
        content:
          "A working knowledge base on payment infrastructure, cross-border payments, settlement & reconciliation, fraud & risk, merchant onboarding and emerging-markets fintech.",
      },
      { property: "og:title", content: "Payments Essays — Rizwan Zafar" },
      { property: "og:description", content: "Essays on payments infrastructure, risk and product strategy." },
      { property: "og:url", content: absUrl("/blog") },
    ],
    links: [{ rel: "canonical", href: absUrl("/blog") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Payments Essays — Rizwan Zafar",
          url: absUrl("/blog"),
          author: { "@type": "Person", name: "Rizwan Zafar" },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absUrl(`/blog/${p.slug}`),
            datePublished: p.date,
            articleSection: p.category,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [active, setActive] = useState<string>("All");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const list = (active === "All" ? posts : posts.filter((p) => p.category === active)).filter(
    (p) => p.slug !== featured.slug || active !== "All",
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Payments essays
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        A working knowledge base on <span className="italic text-ink-soft">regulated payments.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Practical writing from inside payments product — infrastructure, cross-border, settlement,
        risk, onboarding and the product decisions that shape them.
      </p>

      {/* Featured */}
      {active === "All" && (
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group mt-12 block rounded-3xl border border-ink/10 bg-surface p-8 md:p-12 hover:border-ink/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[var(--accent-emerald)]">
              Featured essay · {featured.category}
            </span>
            <span className="text-[10px] font-mono-tech text-ink-soft">{featured.readingTime}</span>
          </div>
          <h2 className="font-instrument text-3xl md:text-5xl text-ink mt-4 leading-[1.05] group-hover:text-[var(--brand)] transition-colors max-w-3xl">
            {featured.title}
          </h2>
          <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl">
            {featured.thesis ?? featured.description}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-6 text-sm text-ink">
            Read essay
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      )}

      {/* Categories */}
      <div className="mt-12 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              active === c
                ? "bg-ink text-background border-ink"
                : "border-rule text-ink-soft hover:text-ink hover:border-ink/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-8 divide-y divide-rule border-y border-rule">
        {list.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group grid md:grid-cols-12 gap-6 py-7 hover:bg-surface-2 px-2 -mx-2 rounded transition-colors"
          >
            <div className="md:col-span-3 text-xs text-ink-soft font-mono-tech">
              <div>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</div>
              <div className="mt-1 uppercase tracking-[0.14em] text-[10px] text-[var(--accent-emerald)] font-medium">
                {p.category}
              </div>
              <div className="mt-1">{p.readingTime}</div>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-instrument text-2xl text-ink group-hover:text-[var(--brand)] transition-colors leading-snug">
                {p.title}
              </h2>
              <p className="mt-2 text-ink-soft leading-relaxed">{p.thesis ?? p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-surface font-mono-tech uppercase tracking-[0.1em]">
                    {t}
                  </span>
                ))}
                <span className="ml-auto text-xs text-ink-soft group-hover:text-ink inline-flex items-center gap-1">
                  Read essay <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
