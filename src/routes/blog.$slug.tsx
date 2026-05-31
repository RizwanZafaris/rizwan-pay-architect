import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPost, getRelated, isPostPublished, publishedPosts, type Post } from "@/data/posts";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/caseStudies";
import { hubForPost } from "@/data/hubs";
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

// Detect a sequential step/checklist structure ("## Step 1: …" or "## 1. …")
// and emit HowTo JSON-LD — one of the most-lifted formats for AI Overviews &
// voice answers. Only fires when ≥3 ordered step-headings exist, so ordinary
// essays don't get mis-tagged.
function extractHowToSteps(md: string): { name: string; text: string }[] {
  const lines = md.split("\n");
  const isStep = (h: string) => /^(step\s+\d+\b|\d+[.):]\s)/i.test(h.trim());
  const steps: { name: string; buf: string[] }[] = [];
  let cur: { name: string; buf: string[] } | null = null;
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      if (cur) steps.push(cur);
      const heading = h2[1].replace(/\*\*/g, "").trim();
      cur = isStep(heading) ? { name: heading, buf: [] } : null;
      continue;
    }
    if (cur) cur.buf.push(line);
  }
  if (cur) steps.push(cur);
  return steps
    .map((s) => ({
      name: s.name,
      text: s.buf
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`#>]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 320),
    }))
    .filter((s) => s.text);
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
      "@id": `${url}#article`,
      headline: p.title,
      description: p.description,
      image: [OG_IMAGE_URL],
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
        name: profile.name,
        url: SITE_URL,
      },
      keywords: p.tags.join(", "),
      articleSection: p.category,
      wordCount,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
      about: [
        { "@type": "Thing", name: p.category },
        ...p.tags.slice(0, 8).map((tag) => ({ "@type": "Thing", name: tag })),
      ],
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

    const howToSteps = extractHowToSteps(content);
    const howToJsonLd =
      howToSteps.length >= 3
        ? {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: p.title,
            description: p.description,
            step: howToSteps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.name,
              text: s.text,
            })),
          }
        : null;

    const scripts: Array<{ type: string; children: string }> = [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
      { type: "application/ld+json", children: JSON.stringify(crumbs) },
    ];
    if (faqJsonLd)
      scripts.push({ type: "application/ld+json", children: JSON.stringify(faqJsonLd) });
    if (howToJsonLd)
      scripts.push({ type: "application/ld+json", children: JSON.stringify(howToJsonLd) });

    // Use frontmatter `metaTitle` if it fits, else append the brand suffix
    // when the title is short enough, else smart-truncate.
    const titleTag = titleFor(p.title, { meta: p.metaTitle });
    // Meta description must stay under 160 chars (Google snippet truncation).
    // Many frontmatter `metaDescription`s exceed that — smart-trim here so
    // we don't have to hand-edit 55 markdown files.
    const metaDescription = trimToMax(p.description, 160);
    const published = isPostPublished(p);

    return {
      meta: [
        { title: titleTag },
        { name: "description", content: metaDescription },
        ...(!published ? [{ name: "robots", content: "noindex, follow" }] : []),
        { name: "keywords", content: p.tags.join(", ") },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: OG_IMAGE_URL },
        { property: "article:published_time", content: p.date },
        { property: "article:modified_time", content: p.updated ?? p.date },
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
  const html = marked.parse(stripUnpublishedBlogLinks(md), { async: false }) as string;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const publishedSlugs = new Set(publishedPosts.map((p) => p.slug));

function stripUnpublishedBlogLinks(md: string) {
  return md.replace(/\[([^\]]+)\]\(\/blog\/([^/#?)]+)\/?\)/g, (match, label, slug) =>
    publishedSlugs.has(slug) ? match : label,
  );
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

// End-of-essay conversion block. Routes the reader (organic or AI-referred)
// from the most-linked, most-indexed surface (essays) toward the parent topic
// hub, a relevant case study, and the recruiter actions — the linking the
// content roadmap mandated but the route never rendered. Plain <a> with
// trailing slashes (matches canonical form, no 301 hop) + data-analytics-*
// so the static inline analytics bridge tracks each cta_click without JS.
function EssayFooterCTA({ post }: { post: Post }) {
  const hub = hubForPost(post);
  const caseStudy =
    caseStudies.find((c) => c.category === post.category) ??
    caseStudies.find((c) => c.keywords?.some((k) => post.tags.includes(k)));
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {(hub || caseStudy) && (
          <div className="grid sm:grid-cols-2 gap-4">
            {hub && (
              <a
                href={`/topics/${hub.slug}/`}
                data-analytics-event="cta_click"
                data-analytics-source="essay_footer"
                data-analytics-target="hub"
                className="group block rounded-2xl border border-rule p-5 hover:border-ink/30 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Topic hub
                </div>
                <div className="font-instrument text-lg text-ink mt-1 group-hover:text-[var(--brand)] transition-colors">
                  Explore {hub.title} →
                </div>
              </a>
            )}
            {caseStudy && (
              <a
                href={`/product-work/${caseStudy.slug}/`}
                data-analytics-event="cta_click"
                data-analytics-source="essay_footer"
                data-analytics-target="case_study"
                className="group block rounded-2xl border border-rule p-5 hover:border-ink/30 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Related case study
                </div>
                <div className="font-instrument text-lg text-ink mt-1 group-hover:text-[var(--brand)] transition-colors">
                  {caseStudy.title} →
                </div>
              </a>
            )}
          </div>
        )}
        <div className="mt-6 rounded-2xl bg-ink text-background p-6 sm:flex sm:items-center sm:justify-between gap-6">
          <div>
            <div className="font-instrument text-xl leading-snug">
              Hiring for a senior payments product role?
            </div>
            <p className="text-sm opacity-80 mt-1">
              {profile.name} — {profile.role}.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2 shrink-0">
            <a
              href="/contact/"
              data-analytics-event="cta_click"
              data-analytics-source="essay_footer"
              data-analytics-target="contact"
              className="rounded-md bg-background text-ink px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Get in touch
            </a>
            <a
              href="/resume/"
              data-analytics-event="cta_click"
              data-analytics-source="essay_footer"
              data-analytics-target="resume"
              className="rounded-md border border-background/40 px-4 py-2 text-sm hover:bg-background/10"
            >
              Résumé
            </a>
            <a
              href="/for/"
              data-analytics-event="cta_click"
              data-analytics-source="essay_footer"
              data-analytics-target="for"
              className="rounded-md border border-background/40 px-4 py-2 text-sm hover:bg-background/10"
            >
              For recruiters
            </a>
          </div>
        </div>
      </div>
    </section>
  );
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

      <EssayFooterCTA post={p} />

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
