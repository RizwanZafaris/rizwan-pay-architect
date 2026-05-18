import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAudience, postsForHub, caseStudiesForHub, getHub, type Audience } from "@/data/hubs";
import { profile } from "@/data/profile";
import { absUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/for/$audience")({
  loader: ({ params }) => {
    const audience = getAudience(params.audience);
    if (!audience) throw notFound();
    return { audience };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.audience;
    if (!a) return { meta: [{ title: "For recruiters | Rizwan Zafar" }] };
    const forUrl = absUrl("/for");
    const url = absUrl(`/for/${params.audience}`);
    return {
      meta: [
        { title: `${a.shortTitle} | For recruiters — Rizwan Zafar` },
        { name: "description", content: a.description },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.description },
      ],
      // Self-canonical: this is a unique landing page tailored to a specific
      // recruiter audience (Visa/Mastercard, Stripe/Adyen/Wise/Thunes, banks/
      // fintechs). Each has unique copy, unique essay set and unique case
      // studies, so it earns its own canonical and stays indexable.
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: a.title,
            description: a.description,
            url,
            mainEntity: { "@type": "Person", name: "Rizwan Zafar", url: SITE_URL },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "For recruiters", item: forUrl },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">Page not found</h1>
      <Link to="/for" className="mt-6 inline-block text-brand underline">
        Recruiter paths
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-ink-soft">{error.message}</p>
    </div>
  ),
  component: AudiencePage,
});

function AudiencePage() {
  const { audience } = Route.useLoaderData() as { audience: Audience };
  const blocks = audience.hubs.map((slug) => {
    const hub = getHub(slug)!;
    return {
      hub,
      essays: postsForHub(slug).slice(0, 3),
      studies: caseStudiesForHub(slug).slice(0, 2),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Link
        to="/for"
        className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
      >
        ← For recruiters
      </Link>
      <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ {audience.shortTitle}
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        {audience.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">{audience.intro}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {audience.companies.map((c) => (
          <span
            key={c}
            className="text-[10px] px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface font-mono-tech uppercase tracking-[0.1em]"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Proof strip */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-rule bg-surface-2 p-6">
        {profile.metrics.slice(0, 4).map((m) => (
          <div key={m.label}>
            <div className="font-mono-tech text-xl text-ink">{m.value}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {blocks.map(({ hub, essays, studies }) => (
        <section key={hub.slug} className="mt-14 border-t border-rule pt-10">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
                ◆ {hub.shortTitle}
              </div>
              <h2 className="font-instrument text-3xl text-ink mt-2 leading-tight">{hub.title}</h2>
              <p className="mt-3 text-ink-soft max-w-2xl">{hub.description}</p>
            </div>
            <Link
              to="/topics/$hub"
              params={{ hub: hub.slug }}
              className="text-sm text-ink underline hover:text-brand"
            >
              All in this hub →
            </Link>
          </div>

          {studies.length > 0 && (
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {studies.map((c) => (
                <Link
                  key={c.slug}
                  to="/product-work/$slug"
                  params={{ slug: c.slug }}
                  className="group block bg-surface border border-rule rounded-2xl p-5 hover:border-ink/30 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                    Case study · {c.category}
                  </div>
                  <div className="font-instrument text-lg text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {c.title}
                  </div>
                  <p className="text-sm text-ink-soft mt-2">{c.tagline}</p>
                </Link>
              ))}
            </div>
          )}

          {essays.length > 0 && (
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {essays.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-center justify-between py-4 gap-4"
                  >
                    <span className="font-instrument text-lg text-ink group-hover:text-[var(--brand)] transition-colors">
                      {p.title}
                    </span>
                    <span className="text-xs text-ink-soft font-mono-tech whitespace-nowrap">
                      {p.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* CTA */}
      <div className="mt-20 rounded-3xl border border-ink/10 bg-surface p-10 md:p-12">
        <h2 className="font-instrument text-3xl text-ink leading-tight">
          Open to senior Product &amp; Program roles in fintech.
        </h2>
        <p className="mt-4 text-ink-soft max-w-2xl">
          Based in {profile.location}. Reference-available. Resume below or get in touch directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={profile.resumeHref}
            download
            className="inline-flex rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
          >
            Download résumé (PDF)
          </a>
          <Link
            to="/contact"
            className="inline-flex rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
          >
            Discuss a role
          </Link>
        </div>
      </div>
    </div>
  );
}
