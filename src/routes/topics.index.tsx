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
    <section className="rz-beam relative border-b border-rule bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 md:pt-24 pb-14 md:pb-20">
        {/* Page header — ◆ mono eyebrow → statement title with trailing italic
            cyan emphasis (Operator's Console masthead). Copy unchanged. */}
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Topic hubs
        </div>
        <h1 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink mt-4 max-w-4xl">
          {hubs.length} hubs for{" "}
          <span className="italic text-[var(--brand)]">regulated payments.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
          Every essay and case study is grouped under a topic hub. Pick a hub to see the working
          knowledge base for that domain.
        </p>

        {/* The hubs — full-width editorial index rows (mirrors the homepage
            IndustryPillars pattern): mono index numeral, statement serif hub
            title, right-column description + article counts, whole row is the
            link, arrow slides on hover. Stagger rides the list wrapper only
            (never the heading); children carry data-glow, not rz-reveal. */}
        <div data-rz-stagger className="mt-12 border-t border-rule md:mt-16">
          {hubs.map((h, i) => {
            const essays = postsForHub(h.slug).length;
            const studies = caseStudiesForHub(h.slug).length;
            return (
              <Link
                key={h.slug}
                to="/topics/$hub"
                params={{ hub: h.slug }}
                data-glow
                className="group relative grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-rule py-7 md:grid-cols-12 md:gap-x-10 md:py-9"
              >
                <span
                  className="font-mono-tech text-[10px] tracking-[0.22em] text-[var(--brand)] md:col-span-1"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-instrument text-3xl leading-[1.02] text-ink transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-2 sm:text-4xl md:col-span-6 md:text-5xl">
                  {h.title}
                </h2>
                <div className="col-span-2 mt-4 md:col-span-4 md:mt-0">
                  <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                    {h.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech">
                    <span>{essays} essays</span>
                    <span className="text-[var(--brand)]/50" aria-hidden>
                      ·
                    </span>
                    <span>{studies} case studies</span>
                  </div>
                </div>
                <span
                  className="hidden self-center justify-self-end text-2xl text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:col-span-1 md:inline-flex"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
