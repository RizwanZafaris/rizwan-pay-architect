import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/product-work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.study;
    if (!s) return { meta: [{ title: "Case Study" }] };
    return {
      meta: [
        { title: `${s.title} — Case Study | Rizwan Zafar` },
        { name: "description", content: s.tagline },
        { name: "keywords", content: s.keywords.join(", ") },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/product-work/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product-work/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-ink">Case study not found</h1>
      <Link to="/product-work" className="mt-6 inline-block text-brand underline">
        Back to product work
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-ink-soft">{error.message}</p>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study: s } = Route.useLoaderData() as { study: CaseStudy };
  const others = caseStudies.filter((c) => c.slug !== s.slug).slice(0, 3);
  return (
    <article>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-12">
          <Link to="/product-work" className="text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-ink">
            ← Product Work
          </Link>
          <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-accent-emerald font-medium">
            {s.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
            {s.title}
          </h1>
          <p className="mt-5 text-lg text-ink-soft max-w-2xl">{s.tagline}</p>
        </div>
        <div className="bg-surface-2 border-t border-rule">
          <div className="mx-auto max-w-4xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {s.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-xl text-ink">{m.value}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 prose-editorial">
        <h2>Problem</h2>
        <p>{s.problem}</p>

        <h2>What we built</h2>
        <ul>{s.built.map((b) => <li key={b}>{b}</li>)}</ul>

        <h2>My role</h2>
        <p>{s.role}</p>

        <h2>Impact</h2>
        <ul>{s.impact.map((b) => <li key={b}>{b}</li>)}</ul>

        <h2>Lessons learned</h2>
        <ul>{s.lessons.map((b) => <li key={b}>{b}</li>)}</ul>

        <div className="mt-10 pt-8 border-t border-rule">
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft mb-3">Keywords</div>
          <div className="flex flex-wrap gap-2">
            {s.keywords.map((k) => (
              <span key={k} className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface font-sans">
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="border-t border-rule bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl text-ink mb-8">More case studies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="block bg-surface border border-rule rounded-lg p-6 hover:border-ink transition-colors"
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-accent-emerald">{c.category}</div>
                <div className="font-display text-lg text-ink mt-2">{c.title}</div>
                <p className="text-sm text-ink-soft mt-2">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
