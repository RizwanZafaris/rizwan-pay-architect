import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, getRelated, type Post } from "@/data/posts";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelated(params.slug) };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Post" }] };
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      author: { "@type": "Person", name: profile.name },
      keywords: p.tags.join(", "),
      articleSection: p.category,
      mainEntityOfPage: `/blog/${params.slug}`,
    };
    return {
      meta: [
        { title: `${p.title} | Rizwan Zafar` },
        { name: "description", content: p.description },
        { name: "keywords", content: p.tags.join(", ") },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.category },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-ink">Post not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-brand underline">Back to blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-ink-soft">{error.message}</p>
    </div>
  ),
  component: BlogPostPage,
});

// Tiny markdown-ish renderer (## headings + paragraphs)
function renderContent(md: string) {
  const blocks = md.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.replace(/^##\s+/, "")}</h2>;
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((l) => l.replace(/^-\s+/, ""));
      return <ul key={i}>{items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    }
    return <p key={i}>{block}</p>;
  });
}

function BlogPostPage() {
  const { post: p, related } = Route.useLoaderData() as { post: Post; related: Post[] };
  return (
    <article>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10">
          <Link to="/blog" className="text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-ink">
            ← Blog
          </Link>
          <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-accent-emerald font-medium">
            {p.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
            {p.title}
          </h1>
          <div className="mt-5 text-sm text-ink-soft flex flex-wrap gap-x-4 gap-y-1">
            <span>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span>
            <span>{p.readingTime}</span>
            <span>·</span>
            <span>By {profile.name}</span>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-6 py-12 prose-editorial">
        {renderContent(p.content)}
        <div className="mt-10 pt-8 border-t border-rule">
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft mb-3">Tags</div>
          <div className="flex flex-wrap gap-2 font-sans">
            {p.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-rule bg-surface-2">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="font-display text-2xl text-ink mb-8">Related reading</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="block bg-surface border border-rule rounded-lg p-6 hover:border-ink transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-[0.14em] text-accent-emerald">{r.category}</div>
                  <div className="font-display text-lg text-ink mt-2">{r.title}</div>
                  <p className="text-sm text-ink-soft mt-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
