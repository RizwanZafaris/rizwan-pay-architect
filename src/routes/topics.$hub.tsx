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
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Link
        to="/topics"
        className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
      >
        ← Topics
      </Link>
      <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ {hub.shortTitle}
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        {hub.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">{hub.intro}</p>

      {studies.length > 0 && (
        <section className="mt-14">
          <h2 className="font-instrument text-2xl text-ink mb-6">Case studies</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {studies.map((c) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="group block bg-surface border border-rule rounded-2xl p-6 hover:border-ink/30 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                  {c.category}
                </div>
                <div className="font-instrument text-xl text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                  {c.title}
                </div>
                <p className="text-sm text-ink-soft mt-2">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="font-instrument text-2xl text-ink mb-6">
          Essays{" "}
          {essays.length > 0 && <span className="text-ink-soft text-base">· {essays.length}</span>}
        </h2>
        {essays.length === 0 ? (
          <p className="text-ink-soft">More essays coming to this hub soon.</p>
        ) : (
          <div className="divide-y divide-rule border-y border-rule">
            {essays.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group grid md:grid-cols-12 gap-6 py-6 hover:bg-surface-2 px-2 -mx-2 rounded transition-colors"
              >
                <div className="md:col-span-3 text-xs text-ink-soft font-mono-tech">
                  <div>
                    {new Date(p.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="mt-1">{p.readingTime}</div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-instrument text-xl text-ink group-hover:text-[var(--brand)] transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-ink-soft leading-relaxed">{p.thesis ?? p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="mt-16 pt-8 border-t border-rule flex flex-wrap gap-3 items-center justify-between">
        <p className="text-ink-soft">Discussing senior payments product roles? Get in touch.</p>
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
