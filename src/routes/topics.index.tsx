import { createFileRoute, Link } from "@tanstack/react-router";
import { hubs, postsForHub, caseStudiesForHub } from "@/data/hubs";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "Topics, Payments Knowledge Base | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Topic hubs for payment infrastructure, cross-border, SWIFT & ISO 20022, settlement, onboarding, fraud, payment APIs and emerging markets.",
      },
      { property: "og:title", content: "Topics, Payments Knowledge Base" },
      { property: "og:description", content: "Topic hubs for payments product leaders." },
      { property: "og:url", content: absUrl("/topics") },
      { name: "twitter:title", content: "Topics, Payments Knowledge Base" },
      {
        name: "twitter:description",
        content:
          "Topic hubs: infrastructure, cross-border, SWIFT/ISO 20022, settlement, fraud, APIs, emerging markets.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/topics") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Topics, Payments Knowledge Base",
          url: absUrl("/topics"),
          hasPart: hubs.map((h) => ({
            "@type": "CollectionPage",
            name: h.title,
            url: absUrl(`/topics/${h.slug}`),
            description: h.description,
          })),
        }),
      },
    ],
  }),
  component: TopicsIndex,
});

function TopicsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Topic hubs
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        Eight hubs for <span className="italic text-ink-soft">regulated payments.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Every essay and case study is grouped under a topic hub. Pick a hub to see the working
        knowledge base for that domain.
      </p>

      <div className="mt-14 grid sm:grid-cols-2 gap-5">
        {hubs.map((h) => {
          const essays = postsForHub(h.slug).length;
          const studies = caseStudiesForHub(h.slug).length;
          return (
            <Link
              key={h.slug}
              to="/topics/$hub"
              params={{ hub: h.slug }}
              className="group rounded-2xl border border-ink/10 bg-surface p-7 hover:border-ink/30 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                {h.shortTitle}
              </div>
              <h2 className="font-instrument text-2xl text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                {h.title}
              </h2>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{h.description}</p>
              <div className="mt-5 flex gap-4 text-xs text-ink-soft font-mono-tech">
                <span>{essays} essays</span>
                <span>·</span>
                <span>{studies} case studies</span>
                <span className="ml-auto text-ink group-hover:text-[var(--brand)]">
                  Explore hub →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
