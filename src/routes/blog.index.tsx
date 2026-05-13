import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { posts, categories } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Payments, Product & Emerging Markets | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Notes on payment infrastructure, cross-border payments, settlement, fraud and risk, merchant onboarding and emerging-markets fintech product strategy.",
      },
      { property: "og:title", content: "Blog — Rizwan Zafar" },
      {
        property: "og:description",
        content: "Writing on payments product strategy and infrastructure.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Blog</div>
      <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 max-w-3xl leading-tight">
        Notes on payments, product and emerging markets.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Practical writing from inside regulated payments — infrastructure, risk, settlement, and
        the product decisions that shape them.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
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

      <div className="mt-12 divide-y divide-rule border-y border-rule">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group grid md:grid-cols-12 gap-6 py-8 hover:bg-surface-2 px-2 -mx-2 rounded transition-colors"
          >
            <div className="md:col-span-3 text-xs text-ink-soft">
              <div>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</div>
              <div className="mt-1 uppercase tracking-[0.12em] text-[10px] text-accent-emerald font-medium">
                {p.category}
              </div>
              <div className="mt-1">{p.readingTime}</div>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-2xl text-ink group-hover:text-brand transition-colors">
                {p.title}
              </h2>
              <p className="mt-2 text-ink-soft leading-relaxed">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
