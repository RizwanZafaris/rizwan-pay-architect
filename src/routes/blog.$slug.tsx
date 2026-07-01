import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, type CSSProperties } from "react";
import { getPost, getRelated, isPostPublished, publishedPosts, type Post } from "@/data/posts";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/caseStudies";
import { hubForPost } from "@/data/hubs";
import { absUrl, SITE_URL, OG_IMAGE_URL, titleFor, trimToMax } from "@/lib/seo";
import { DiagramFigure, postDiagrams } from "@/components/diagrams/Diagrams";
import { trackEvent } from "@/lib/analytics";
import { marked } from "marked";
// 64×64 author avatar (24KB WebP, same asset the /about hero uses).
import authorPortrait from "@/assets/rizwan-zafar-cutout-460.webp";

const OG_IMAGE_OVERRIDES: Record<string, string> = {
  "visa-mastercard-open-usd-stablecoin-network-economics":
    "/og/blog/visa-mastercard-open-usd-stablecoin-network-economics-v20260701.png",
  "processor-only-card-issuing-operating-model":
    "/og/blog/processor-only-card-issuing-operating-model-v20260701.png",
  "gov-uk-pay-adyen-1000-service-migration":
    "/og/blog/gov-uk-pay-adyen-1000-service-migration-v20260630.png",
  "mercado-pago-claude-plugin-payment-integration-agent":
    "/og/blog/mercado-pago-claude-plugin-payment-integration-agent-v20260630.png",
  "revolut-adyen-uae-licences-dubai-fintech-signal":
    "/og/blog/revolut-adyen-uae-licences-dubai-fintech-signal-v20260630.png",
  "adyen-uae-license-merchant-acquiring-local-settlement":
    "/og/blog/adyen-uae-license-merchant-acquiring-local-settlement-v20260630.png",
  "lean-ziina-uae-one-tap-pay-by-bank":
    "/og/blog/lean-ziina-uae-one-tap-pay-by-bank-v20260627.png",
  "gocardless-sequence-direct-debit-product-design":
    "/og/blog/gocardless-sequence-direct-debit-product-design-v20260627.png",
  "us-bank-gigsafe-instant-payout-programme":
    "/og/blog/us-bank-gigsafe-instant-payout-programme-v20260627.png",
  "forter-ai-agents-commerce-risk-radar":
    "/og/blog/forter-ai-agents-commerce-risk-radar-v20260627.png",
  "visa-dcap-acquiring-economics-data-only-3ds":
    "/og/blog/visa-dcap-acquiring-economics-data-only-3ds-v20260627.png",
  "github-desktop-worktrees-ai-agent-control":
    "/og/blog/github-desktop-worktrees-ai-agent-control-v20260627.png",
  "thredd-sutton-bin-sponsorship-operating-model":
    "/og/blog/thredd-sutton-bin-sponsorship-operating-model-v20260630.png",
  "authorization-rate-merchant-pnl-operating-model":
    "/og/blog/authorization-rate-merchant-pnl-operating-model-v20260630.png",
  "openai-broadcom-jalapeno-ai-unit-economics":
    "/og/blog/openai-broadcom-jalapeno-ai-unit-economics-v20260629.png",
};

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
    const published = isPostPublished(p);
    const ogImagePath = OG_IMAGE_OVERRIDES[params.slug] ?? `/og/blog/${params.slug}.png`;
    const ogImage = published ? absUrl(ogImagePath) : OG_IMAGE_URL;
    const wordCount = content.trim().split(/\s+/).length;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: p.title,
      description: p.description,
      image: [ogImage],
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
        name: profile.name,
        url: SITE_URL,
      },
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
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:alt", content: `${p.title} — ${profile.name}` },
        { property: "article:published_time", content: p.date },
        { property: "article:modified_time", content: p.updated ?? p.date },
        { property: "article:section", content: p.category },
        { property: "article:author", content: profile.name },
        ...p.tags.map((tag) => ({ property: "article:tag", content: tag })),
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:image:alt", content: `${p.title} — ${profile.name}` },
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

function formatArticleDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

function articleSignals(post: Post, tocLength: number) {
  return [
    "Operator-written",
    `${post.readingTime}`,
    `${tocLength} section${tocLength === 1 ? "" : "s"}`,
    "Recruiter-readable",
  ];
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
              href="/contact/#book"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="blog_post_footer"
              data-analytics-cta-destination="/contact/#book"
              className="rounded-md bg-background text-ink px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Book a 15-min intro call
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

// Author-entity box. Closes the loop the SEO audit flagged: every essay now
// carries a visible byline linking back to /resume (the Person hub), reinforcing
// the BlogPosting -> #person authorship signal already in the JSON-LD. Rendered
// inside the article body column so it aligns with the prose.
function EssayAuthorBox() {
  return (
    <div className="mt-12 rounded-lg border border-rule bg-surface p-6 md:p-7">
      <div className="flex items-start gap-4">
        <img
          src={authorPortrait}
          alt={profile.name}
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          className="h-16 w-16 shrink-0 rounded-full border border-rule object-cover"
        />
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Written by
          </div>
          <Link
            to="/resume"
            className="mt-1 inline-block font-instrument text-xl text-ink hover:text-[var(--brand)] transition-colors"
          >
            {profile.name}
          </Link>
          <p className="mt-0.5 text-sm text-ink-soft">{profile.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Payments product &amp; program leader &mdash; scaled a regulated multi-rail platform
            from $0 to $1B+ GTV across five frontier markets. These essays are the public version of
            how I think through the work.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <Link to="/resume" className="text-ink underline-offset-4 hover:underline">
              View resume →
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
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
  const hub = hubForPost(p);

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
    <article className="blog-article-page overflow-x-clip">
      <header className="article-hero-shell relative overflow-hidden border-b border-rule bg-surface/45">
        <span aria-hidden="true" className="article-hero-rule article-hero-rule-a" />
        <span aria-hidden="true" className="article-hero-rule article-hero-rule-b" />
        <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-14 pb-12">
          <Link
            to="/blog"
            className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
          >
            ← Essays
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {hub ? (
                  <Link
                    to="/topics/$hub"
                    params={{ hub: hub.slug }}
                    className="rounded-full border border-[var(--accent-emerald)]/25 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--accent-emerald)] font-mono-tech font-medium hover:border-[var(--accent-emerald)]"
                  >
                    {hub.shortTitle}
                  </Link>
                ) : (
                  <span className="rounded-full border border-[var(--accent-emerald)]/25 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--accent-emerald)] font-mono-tech font-medium">
                    {p.category}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                  {p.category}
                </span>
              </div>
              <h1 className="font-instrument text-[2rem] sm:text-4xl md:text-6xl text-ink mt-5 leading-[1.04] max-w-4xl text-wrap">
                {p.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
                {p.thesis ?? p.description}
              </p>
              <div className="mt-6 text-xs sm:text-sm text-ink-soft flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 font-mono-tech">
                <span>{formatArticleDate(p.date)}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
                <span>·</span>
                <span>By {profile.name}</span>
              </div>
            </div>
            <div className="article-brief-card lg:col-span-4 min-w-0 rounded-lg border border-rule bg-background/90 p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
                Briefing note
              </div>
              <p className="text-sm leading-relaxed text-ink">{p.description}</p>
              <div className="article-status-stack mt-5 flex flex-wrap gap-2">
                {articleSignals(p, toc.length).map((signal, index) => (
                  <span
                    key={signal}
                    className="article-status-badge"
                    style={{ "--motion-delay": `${180 + index * 70}ms` } as CSSProperties}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 grid lg:grid-cols-12 gap-10">
        {/* TOC */}
        <aside className="lg:col-span-3 order-1">
          {toc.length > 0 && (
            <div className="article-rail-card lg:sticky lg:top-24 rounded-lg border border-rule bg-surface p-5">
              <div className="article-rail-progress" aria-hidden="true">
                <span />
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
                Article map
              </div>
              <ul className="space-y-2 text-sm leading-snug">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="article-map-link text-ink-soft hover:text-ink transition-colors"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-rule pt-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
                  Reader signals
                </div>
                <div className="flex flex-wrap gap-2">
                  {articleSignals(p, toc.length)
                    .slice(0, 3)
                    .map((signal) => (
                      <span key={signal} className="article-mini-chip">
                        {signal}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Body */}
        <div className="lg:col-span-9 order-2 min-w-0">
          <div className="prose-editorial max-w-3xl">
            {renderContent(content)}
            {diagram ? (
              <DiagramFigure title={diagram.title} caption={diagram.caption}>
                <diagram.component />
              </DiagramFigure>
            ) : null}
          </div>
          <div className="mt-10 pt-8 border-t border-rule">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
              Tags
            </div>
            <div className="flex flex-wrap gap-2 font-sans">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="blog-tag-chip text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <EssayAuthorBox />
          <div className="mt-12 rounded-lg border border-rule bg-surface p-6 md:p-7">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Continue the conversation
            </div>
            <div className="mt-3 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <p className="text-sm leading-relaxed text-ink-soft">
                This writing is the public version of how I think through product, programme and
                payment-infrastructure decisions in regulated markets.
              </p>
              <Link
                to="/contact"
                className="inline-flex justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-background hover:bg-brand transition-colors"
              >
                Contact Rizwan
              </Link>
            </div>
          </div>
        </div>
      </div>

      <EssayFooterCTA post={p} />

      {related.length > 0 && (
        <section className="border-t border-rule bg-surface-2/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Related reading
                </div>
                <h2 className="mt-1 font-instrument text-3xl text-ink">
                  Essays in the same operating context.
                </h2>
              </div>
              <Link
                to="/blog"
                className="text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-ink font-mono-tech"
              >
                View all essays →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="blog-result-card group flex min-h-[220px] flex-col rounded-lg bg-surface border border-rule p-6 hover:border-ink/30 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                    {r.category}
                  </div>
                  <div className="font-instrument text-xl text-ink mt-3 leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {r.title}
                  </div>
                  <p className="text-sm text-ink-soft mt-2">{r.thesis ?? r.description}</p>
                  <span className="mt-auto pt-5 text-xs text-ink-soft group-hover:text-ink inline-flex items-center gap-1">
                    Read essay{" "}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
