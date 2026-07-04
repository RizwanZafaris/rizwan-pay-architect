import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  caseStudies,
  caseStudyHero,
  caseStudyThumb,
  getCaseStudy,
  type CaseStudy,
} from "@/data/caseStudies";
import { profile } from "@/data/profile";
import { compactMetricValue } from "@/lib/case-study-ui";
import { absUrl, SITE_URL, titleFor, trimToMax } from "@/lib/seo";
import { DiagramFigure, caseStudyDiagrams } from "@/components/diagrams/Diagrams";
import { ctaClick, resumeDownload, trackEvent } from "@/lib/analytics";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { Reveal } from "@/components/motion/Reveal";

const CASE_STUDY_SCHEMA_DATE = "2026-06-05";

function caseStudyWordCount(s: CaseStudy) {
  const parts = [
    s.title,
    s.tagline,
    s.executiveSummary,
    s.problem,
    s.role,
    s.whyItMatters,
    s.built.join(" "),
    s.architecture?.join(" ") ?? "",
    s.operatingModel?.join(" ") ?? "",
    s.impact.join(" "),
    s.tradeoffs?.join(" ") ?? "",
    s.lessons.join(" "),
  ];
  return parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export const Route = createFileRoute("/product-work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.study;
    if (!s) return { meta: [{ title: "Case Study" }] };
    const url = absUrl(`/product-work/${params.slug}`);
    const titleTag = titleFor(s.title);
    const metaDescription = trimToMax(s.tagline, 160);
    const ogImage = absUrl(`/og/product-work/${params.slug}.png`);
    const wordCount = caseStudyWordCount(s);
    return {
      meta: [
        { title: titleTag },
        { name: "description", content: metaDescription },
        { name: "keywords", content: s.keywords.join(", ") },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:alt", content: `${s.title} — ${profile.name}` },
        { property: "article:published_time", content: CASE_STUDY_SCHEMA_DATE },
        { property: "article:modified_time", content: CASE_STUDY_SCHEMA_DATE },
        { property: "article:section", content: s.category },
        { property: "article:author", content: profile.name },
        { name: "twitter:title", content: s.title },
        { name: "twitter:description", content: s.tagline },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:image:alt", content: `${s.title} — ${profile.name}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${url}#article`,
            headline: s.title,
            description: s.tagline,
            image: [ogImage],
            datePublished: CASE_STUDY_SCHEMA_DATE,
            dateModified: CASE_STUDY_SCHEMA_DATE,
            keywords: s.keywords.join(", "),
            articleSection: s.category,
            wordCount,
            inLanguage: "en",
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
            isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
            about: [
              { "@type": "Thing", name: s.category },
              ...s.keywords.slice(0, 8).map((keyword) => ({ "@type": "Thing", name: keyword })),
            ],
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: "Product Work",
                item: absUrl("/product-work"),
              },
              { "@type": "ListItem", position: 3, name: s.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">Case study not found</h1>
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

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 sm:mt-14">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ {label}
      </div>
      <h2 className="mt-2 break-words font-instrument text-2xl leading-tight text-ink sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 prose-editorial">{children}</div>
    </section>
  );
}

function CaseStudyPage() {
  const { study: s } = Route.useLoaderData() as { study: CaseStudy };
  const others = caseStudies.filter((c) => c.slug !== s.slug).slice(0, 3);
  const diagram = caseStudyDiagrams[s.slug];
  const heroMetrics = s.metrics.slice(0, 4);
  const secondaryMetrics = s.metrics.slice(4);
  const operatorLens = s.pullQuote ?? s.lessons[0] ?? s.executiveSummary;

  // Per-case-study dim — fires after spa_pageview so GA4 can attribute the
  // specific study viewed.
  useEffect(() => {
    trackEvent("case_study_view", {
      case_study_slug: s.slug,
      case_study_category: s.category,
    });
  }, [s.slug, s.category]);

  return (
    <article className="overflow-x-clip">
      <header className="relative min-w-0 overflow-hidden border-b border-rule">
        {/* Abstract symbolic hero image — Higgsfield-generated, brand-coherent.
            Sits BEHIND the text with a strong dark gradient overlay so the
            headline stays readable. Eagerly loaded (above the fold). */}
        <div className="absolute inset-0 -z-10">
          <img
            src={caseStudyHero(s.slug)}
            alt={
              s.imageAlt ??
              `Abstract symbolic illustration for ${s.title} — ${s.category}, brand-cyan editorial composition on dark canvas`
            }
            width={1600}
            height={900}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-60"
          />
          {/* Gradient overlay: heavier on the bottom-left where the H1 sits,
              lighter on the top-right so the image still reads. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 70%, transparent) 50%, color-mix(in oklab, var(--background) 50%, transparent) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16">
          <Link
            to="/product-work"
            className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
          >
            ← Product Work
          </Link>
          <div className="mt-6 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--accent-emerald)] font-mono-tech sm:tracking-[0.18em]">
            {s.category}
          </div>
          <h1 className="mt-3 max-w-4xl break-words font-instrument text-[clamp(2.15rem,8.6vw,4.7rem)] leading-[0.98] text-ink [overflow-wrap:anywhere]">
            {s.title}
          </h1>
          <p className="mt-5 max-w-3xl break-words text-base leading-relaxed text-ink-soft sm:text-lg">
            {s.tagline}
          </p>
          {s.engagement && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3.5 py-1.5 text-xs text-ink-soft font-mono-tech">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-emerald)]"
              />
              {s.engagement}
            </p>
          )}
        </div>
        <div className="bg-surface-2 border-t border-rule">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 px-5 py-5 sm:grid-cols-2 sm:px-6 md:grid-cols-4 md:gap-4">
            {heroMetrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 80}>
                <div className="case-metric-card min-w-0 rounded-xl border border-rule bg-background/70 p-4">
                  <div className="break-words font-mono-tech text-base leading-snug text-ink sm:text-lg md:text-xl">
                    <AnimatedMetric value={compactMetricValue(m)} />
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech">
                    {m.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12">
        {/* Executive summary */}
        <Section id="summary" label="Executive summary" title="What this is, in one paragraph.">
          <p>{s.executiveSummary}</p>
        </Section>

        {/* Operator lens: concise proof point without repeating the full hero copy. */}
        <Reveal>
          <aside className="case-soft-card mt-10 rounded-2xl border border-rule bg-surface p-5 sm:mt-12 sm:p-7">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
              ◆ Operator lens
            </div>
            <p className="mt-4 max-w-3xl break-words font-instrument text-2xl leading-[1.08] text-ink sm:text-3xl">
              {operatorLens}
            </p>
          </aside>
        </Reveal>

        {s.beforeAfter && s.beforeAfter.length > 0 && (
          <section className="case-soft-card mt-10 rounded-2xl border border-rule bg-surface p-5 sm:mt-12 sm:p-7 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
              ◆ Before / after
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.beforeAfter.map((b) => (
                <div
                  key={b.metric}
                  className="min-w-0 rounded-xl border border-rule bg-background p-4 sm:p-5"
                >
                  <div className="text-[10px] uppercase tracking-[0.1em] text-ink-soft font-mono-tech">
                    {b.metric}
                  </div>
                  <div className="mt-3 flex flex-wrap items-baseline gap-2 font-mono-tech text-sm">
                    <span className="text-ink-soft line-through">{b.before}</span>
                    <span className="text-ink-soft">-&gt;</span>
                    <span className="text-ink font-medium">{b.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {secondaryMetrics.length > 0 && (
          <section className="case-soft-card mt-10 rounded-2xl border border-rule bg-surface p-5 sm:p-7 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
              ◆ Additional proof
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {secondaryMetrics.map((m) => (
                <div
                  key={m.label}
                  className="case-metric-card min-w-0 rounded-xl border border-rule bg-background p-4"
                >
                  <div className="break-words font-mono-tech text-base leading-snug text-ink">
                    {compactMetricValue(m)}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {diagram ? (
          <DiagramFigure title={diagram.title} caption={diagram.caption}>
            <diagram.component />
          </DiagramFigure>
        ) : null}

        <Section id="problem" label="Problem" title="The job to be done.">
          <p>{s.problem}</p>
        </Section>

        <Section id="built" label="System built" title="What we shipped.">
          <ul>
            {s.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>

        {s.architecture && (
          <Section id="architecture" label="Architecture" title="How it's put together.">
            <ul>
              {s.architecture.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Section>
        )}

        {s.operatingModel && (
          <Section id="operating-model" label="Operating model" title="How it actually runs.">
            <ul>
              {s.operatingModel.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section id="role" label="My role" title="Where I sat in the work.">
          <p>{s.role}</p>
        </Section>

        <Section id="impact" label="Impact" title="What moved.">
          <ul>
            {s.impact.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>

        {s.tradeoffs && (
          <Section id="tradeoffs" label="Trade-offs" title="What we chose against.">
            <ul>
              {s.tradeoffs.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section id="lessons" label="Lessons" title="What I'd take into the next build.">
          <ul>
            {s.lessons.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>

        <Section
          id="why-it-matters"
          label="Why it matters"
          title="Relevance to networks, PSPs and cross-border platforms."
        >
          <p>{s.whyItMatters}</p>
        </Section>

        <div className="mt-14 border-t border-rule pt-8">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
            Keywords
          </div>
          <div className="flex flex-wrap gap-2">
            {s.keywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-rule bg-surface px-2.5 py-1 text-xs text-ink-soft"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
        {/* CTA strip */}
        <div className="case-soft-card mt-14 rounded-2xl border border-ink/10 bg-surface p-5 sm:mt-16 sm:p-8 md:p-10">
          <h2 className="break-words font-instrument text-2xl leading-tight text-ink">
            Discussing payment infrastructure / product leadership roles?
          </h2>
          <p className="mt-3 text-ink-soft max-w-2xl">
            Reference-available. Download the résumé or get in touch.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/contact/#book"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="case_study_footer"
              data-analytics-cta-destination="/contact/#book"
              onClick={() => ctaClick("book_intro_call", "case_study_footer", "/contact/#book")}
              className="inline-flex rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-brand"
            >
              Book a 15-min intro call
            </a>
            <a
              href="/Rizwan_Zafar_Resume.pdf"
              download
              data-analytics-event="cta_click"
              data-analytics-cta-id="download_resume"
              data-analytics-cta-location="case_study_footer"
              data-analytics-cta-destination="/Rizwan_Zafar_Resume.pdf"
              data-analytics-placement="case_study"
              onClick={() => {
                ctaClick("download_resume", "case_study_footer", "/Rizwan_Zafar_Resume.pdf");
                resumeDownload("case_study");
              }}
              className="inline-flex rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
            >
              Download résumé (PDF)
            </a>
            <Link
              to="/contact"
              data-analytics-event="cta_click"
              data-analytics-cta-id="discuss_a_role"
              data-analytics-cta-location="case_study_footer"
              data-analytics-cta-destination="/contact"
              onClick={() => ctaClick("discuss_a_role", "case_study_footer", "/contact")}
              className="inline-flex rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
            >
              Discuss a role
            </Link>
          </div>
        </div>
      </div>

      <section className="border-t border-rule bg-surface-2">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <h2 className="font-instrument text-2xl text-ink mb-8">More case studies</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="case-study-card group block min-w-0 overflow-hidden rounded-2xl border border-rule bg-surface transition-colors hover:border-ink/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-rule">
                  <img
                    src={caseStudyThumb(c.slug)}
                    alt={c.imageAlt ?? `${c.title} — abstract editorial illustration`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="min-w-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent-emerald)] font-mono-tech">
                    {c.category}
                  </div>
                  <div className="mt-2 break-words font-instrument text-lg leading-snug text-ink transition-colors group-hover:text-[var(--brand)]">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {shortText(c.tagline, 150)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function shortText(text: string, max = 180) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).replace(/\s+\S*$/, "")}...`;
}
