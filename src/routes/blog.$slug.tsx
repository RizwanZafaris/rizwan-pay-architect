import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPost, getRelated, type Post } from "@/data/posts";
import { profile } from "@/data/profile";
import { absUrl, SITE_URL, OG_IMAGE_URL, titleFor, trimToMax } from "@/lib/seo";
import { DiagramFigure, postDiagrams } from "@/components/diagrams/Diagrams";
import { trackEvent } from "@/lib/analytics";
import { marked } from "marked";

// Pull Q&A pairs out of a "## FAQ" section so we can emit FAQPage JSON-LD.
// Question lines are "**…?**" inside the section; the answer is everything until the next "**…?**".
function extractFAQs(md: string): { question: string; answer: string }[] {
  // Find the FAQ heading.
  const headingMatch = md.match(/^##\s+(?:FAQ|Frequently Asked Questions)\s*$/im);
  if (!headingMatch || headingMatch.index === undefined) return [];

  // Slice from after the FAQ heading to either the next H2 (end of section) or end of document.
  const afterHeading = md.slice(headingMatch.index + headingMatch[0].length);
  const nextSectionMatch = afterHeading.match(/^##\s/m);
  const body = nextSectionMatch?.index
    ? afterHeading.slice(0, nextSectionMatch.index)
    : afterHeading;
  if (!body.trim()) return [];

  // Split on "**…?**" question lines. Skip the first chunk (everything before the first Q).
  const parts = body.split(/^\s*\*\*(.+?\?)\*\*\s*/m);
  const out: { question: string; answer: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const question = parts[i].trim();
    const answer = (parts[i + 1] ?? "").replace(/\s+/g, " ").trim();
    if (question && answer) out.push({ question, answer });
  }
  return out;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    // Dynamic import so the heavy posts-content map (~150KB minified) does not get
    // bundled into the main entry chunk. Vite splits this into its own lazy chunk
    // that is only fetched when a /blog/$slug route is hit.
    const { getPostContent } = await import("@/data/posts-content");
    return { post, content: getPostContent(params.slug) ?? "", related: getRelated(params.slug) };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const content = loaderData?.content ?? "";
    if (!p) return { meta: [{ title: "Essay" }] };
    const url = absUrl(`/blog/${params.slug}`);
    const wordCount = content.trim().split(/\s+/).length;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      image: [OG_IMAGE_URL],
      datePublished: p.date,
      dateModified: p.date,
      author: { "@type": "Person", name: profile.name, url: SITE_URL },
      publisher: { "@type": "Person", name: profile.name, url: SITE_URL },
      keywords: p.tags.join(", "),
      articleSection: p.category,
      wordCount,
      inLanguage: "en",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      // Speakable: tells Google Assistant / AI Overviews / voice answer
      // engines which parts of the page to read aloud. We mark the H1 and
      // the first paragraph of body (`.prose-editorial > p:first-of-type`).
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".prose-editorial > p:first-of-type"],
      },
    };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Essays", item: absUrl("/blog") },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    };

    const faqs = extractFAQs(content);
    const faqJsonLd =
      faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }
        : null;

    const scripts: Array<{ type: string; children: string }> = [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
      { type: "application/ld+json", children: JSON.stringify(crumbs) },
    ];
    if (faqJsonLd)
      scripts.push({ type: "application/ld+json", children: JSON.stringify(faqJsonLd) });

    // Use frontmatter `metaTitle` if it fits, else append the brand suffix
    // when the title is short enough, else smart-truncate.
    const titleTag = titleFor(p.title, { meta: p.metaTitle });
    // Meta description must stay under 160 chars (Google snippet truncation).
    // Many frontmatter `metaDescription`s exceed that — smart-trim here so
    // we don't have to hand-edit 55 markdown files.
    const metaDescription = trimToMax(p.description, 160);

    return {
      meta: [
        { title: titleTag },
        { name: "description", content: metaDescription },
        { name: "keywords", content: p.tags.join(", ") },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: OG_IMAGE_URL },
        { property: "article:published_time", content: p.date },
        { property: "article:modified_time", content: p.date },
        { property: "article:section", content: p.category },
        { property: "article:author", content: profile.name },
        ...p.tags.map((tag) => ({ property: "article:tag", content: tag })),
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: OG_IMAGE_URL },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">Essay not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-brand underline">
        Back to essays
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-ink-soft">{error.message}</p>
    </div>
  ),
  component: BlogPostPage,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugify(tokens.map((t) => t.raw ?? "").join(""));
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
  },
});

function renderContent(md: string) {
  const html = marked.parse(md, { async: false }) as string;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function extractTOC(md: string) {
  return md
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => {
      const text = l.replace(/^##\s+/, "").trim();
      return { id: slugify(text), text };
    });
}

function BlogPostPage() {
  const {
    post: p,
    content,
    related,
  } = Route.useLoaderData() as {
    post: Post;
    content: string;
    related: Post[];
  };
  const toc = extractTOC(content);
  const diagram = postDiagrams[p.slug];

  // Fire blog_view to dataLayer once per post mount (after spa_pageview, with
  // post-specific dims that the generic pageview can't carry).
  useEffect(() => {
    trackEvent("blog_view", {
      blog_slug: p.slug,
      blog_category: p.category,
      blog_reading_time: p.readingTime,
    });
  }, [p.slug, p.category, p.readingTime]);

  return (
    <article>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10">
          <Link
            to="/blog"
            className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
          >
            ← Essays
          </Link>
          <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech font-medium">
            {p.category}
          </div>
          <h1 className="font-instrument text-4xl md:text-5xl text-ink mt-3 leading-[1.08]">
            {p.title}
          </h1>
          <div className="mt-5 text-sm text-ink-soft flex flex-wrap gap-x-4 gap-y-1 font-mono-tech">
            <span>
              {new Date(p.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{p.readingTime}</span>
            <span>·</span>
            <span>By {profile.name}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-12 gap-10">
        {/* TOC */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          {toc.length > 0 && (
            <div className="lg:sticky lg:top-24">
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
                On this page
              </div>
              <ul className="space-y-2 text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-ink-soft hover:text-ink transition-colors">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Body */}
        <div className="lg:col-span-9 order-1 lg:order-2 prose-editorial">
          {renderContent(content)}
          {diagram ? (
            <DiagramFigure title={diagram.title} caption={diagram.caption}>
              <diagram.component />
            </DiagramFigure>
          ) : null}
          <div className="mt-10 pt-8 border-t border-rule">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
              Tags
            </div>
            <div className="flex flex-wrap gap-2 font-sans">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-rule bg-surface-2">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="font-instrument text-2xl text-ink mb-8">Related reading</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group block bg-surface border border-rule rounded-2xl p-6 hover:border-ink/30 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                    {r.category}
                  </div>
                  <div className="font-instrument text-lg text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {r.title}
                  </div>
                  <p className="text-sm text-ink-soft mt-2">{r.thesis ?? r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
