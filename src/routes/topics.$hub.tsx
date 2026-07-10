import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getHub, postsForHub, caseStudiesForHub, type Hub, type HubSlug } from "@/data/hubs";
import type { Post } from "@/data/posts";
import type { CaseStudy } from "@/data/caseStudies";
import { absUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/topics/$hub")({
  loader: ({ params }) => {
    const hub = getHub(params.hub);
    if (!hub) throw notFound();
    return {
      hub,
      essays: postsForHub(hub.slug as HubSlug),
      studies: caseStudiesForHub(hub.slug as HubSlug),
    };
  },
  head: ({ loaderData, params }) => {
    const h = loaderData?.hub;
    if (!h) return { meta: [{ title: "Topic" }, { name: "robots", content: "noindex" }] };
    const url = absUrl(`/topics/${params.hub}`);
    const canonical = url;
    return {
      meta: [
        { title: `${h.title} | Rizwan Zafar` },
        { name: "description", content: h.description },
        { property: "og:title", content: `${h.title}, Rizwan Zafar` },
        { property: "og:description", content: h.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Topics", item: absUrl("/topics") },
              { "@type": "ListItem", position: 3, name: h.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">Topic not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-brand underline">
        Back to topics
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-ink-soft">{error.message}</p>
    </div>
  ),
  component: HubPage,
});

function HubPage() {
  const { hub, essays, studies } = Route.useLoaderData() as {
    hub: Hub;
    essays: Post[];
    studies: CaseStudy[];
  };

  return (
    <div className="topics-hub-page">
      {/* ============ MASTHEAD — statement page title + hub intro =========== */}
      <header className="rz-beam relative border-b border-rule bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 md:pt-24 pb-10 md:pb-14">
          <Link
            to="/topics"
            className="inline-flex items-center gap-1.5 py-1.5 -my-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <span aria-hidden>←</span> Topics
          </Link>
          <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ {hub.shortTitle}
          </div>
          <h1 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink mt-4 max-w-4xl">
            {hub.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
            {hub.intro}
          </p>
        </div>
      </header>

      {/* ============ CASE STUDIES — editorial index rows ================== */}
      {studies.length > 0 && (
        <section className="rz-beam relative border-b border-rule bg-surface">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ Case studies
            </div>
            <h2 className="mt-3 font-instrument text-3xl md:text-4xl text-ink leading-[1.05]">
              Shipped in this domain.
            </h2>
            <div data-rz-stagger className="mt-8 border-t border-rule">
              {studies.map((c) => (
                <Link
                  key={c.slug}
                  to="/product-work/$slug"
                  params={{ slug: c.slug }}
                  data-glow
                  className="group relative grid gap-y-1 border-b border-rule py-6 md:grid-cols-12 md:gap-x-8 md:py-7"
                >
                  <div className="md:col-span-3 text-[10px] uppercase tracking-[0.16em] text-[var(--brand)] font-mono-tech md:self-center">
                    {c.category}
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-instrument text-2xl leading-[1.1] text-ink transition-all duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5 group-hover:text-[var(--brand)]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{c.tagline}</p>
                  </div>
                  <span
                    className="hidden self-center justify-self-end text-lg text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:col-span-1 md:inline"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ ESSAYS — divide-y editorial index ==================== */}
      <section className="rz-beam relative border-b border-rule bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Essays
              </div>
              <h2 className="mt-3 font-instrument text-3xl md:text-4xl text-ink leading-[1.05]">
                Field notes for this hub.
              </h2>
            </div>
            {essays.length > 0 && (
              <div className="text-xs text-ink-soft font-mono-tech">
                {essays.length} essay{essays.length === 1 ? "" : "s"}
              </div>
            )}
          </div>
          {essays.length === 0 ? (
            <p className="mt-8 border-y border-rule px-6 py-14 text-center text-ink-soft">
              More essays coming to this hub soon.
            </p>
          ) : (
            <div data-rz-stagger className="mt-8 border-t border-rule">
              {essays.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  data-glow
                  className="group relative grid gap-y-2 border-b border-rule py-6 md:grid-cols-12 md:gap-x-8 md:py-7"
                >
                  <div className="flex items-baseline gap-x-4 md:col-span-3 md:block">
                    <span className="block font-mono-tech text-[10px] tracking-[0.14em] text-ink-soft tabular-nums">
                      {formatHubDate(p.date)}
                    </span>
                    <span className="block font-mono-tech text-[10px] tracking-[0.14em] text-ink-soft/70 md:mt-1">
                      {p.readingTime}
                    </span>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-instrument text-2xl leading-[1.1] text-ink transition-all duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5 group-hover:text-[var(--brand)]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                      {p.thesis ?? p.description}
                    </p>
                  </div>
                  <span
                    className="hidden self-center justify-self-end text-lg text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:col-span-1 md:inline"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA — flat ruled band ================================ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-14 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-ink-soft">Discussing senior payments product roles? Get in touch.</p>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-ink text-background px-5 py-2.5 text-sm hover:bg-[var(--brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Contact
            </Link>
            <Link
              to="/resume"
              className="inline-flex items-center rounded-full border border-rule px-5 py-2.5 text-sm text-ink hover:border-ink/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatHubDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
