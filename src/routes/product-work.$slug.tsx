import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  caseStudies,
  caseStudyHero,
  caseStudyThumb,
  getCaseStudy,
  type CaseStudy,
} from "@/data/caseStudies";
import { absUrl, SITE_URL, titleFor, trimToMax } from "@/lib/seo";
import { DiagramFigure, caseStudyDiagrams } from "@/components/diagrams/Diagrams";
import { ctaClick, resumeDownload, trackEvent } from "@/lib/analytics";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { Reveal } from "@/components/motion/Reveal";
import { PullQuote } from "@/components/editorial/PullQuote";

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
    return {
      meta: [
        { title: titleTag },
        { name: "description", content: metaDescription },
        { name: "keywords", content: s.keywords.join(", ") },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: s.title,
            description: s.tagline,
            keywords: s.keywords.join(", "),
            articleSection: s.category,
            author: { "@type": "Person", name: "Rizwan Zafar", url: SITE_URL },
            mainEntityOfPage: url,
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
    <section id={id} className="mt-14 scroll-mt-24">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ {label}
      </div>
      <h2 className="font-instrument text-3xl text-ink mt-2 leading-tight">{title}</h2>
      <div className="mt-5 prose-editorial">{children}</div>
    </section>
  );
}

function CaseStudyPage() {
  const { study: s } = Route.useLoaderData() as { study: CaseStudy };
  const others = caseStudies.filter((c) => c.slug !== s.slug).slice(0, 3);
  const diagram = caseStudyDiagrams[s.slug];

  // Per-case-study dim — fires after spa_pageview so GA4 can attribute the
  // specific study viewed.
  useEffect(() => {
    trackEvent("case_study_view", {
      case_study_slug: s.slug,
      case_study_category: s.category,
    });
  }, [s.slug, s.category]);

  return (
    <article>
      <header className="relative border-b border-rule overflow-hidden">
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
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-12">
          <Link
            to="/product-work"
            className="text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
          >
            ← Product Work
          </Link>
          <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech font-medium">
            {s.category}
          </div>
          <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
            {s.title}
          </h1>
          <p className="mt-5 text-lg text-ink-soft max-w-2xl">{s.tagline}</p>
        </div>
        <div className="bg-surface-2 border-t border-rule">
          <div className="mx-auto max-w-4xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {s.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 80}>
                <div className="font-mono-tech text-xl text-ink">
                  <AnimatedMetric value={m.value} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
                  {m.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Executive summary */}
        <Section id="summary" label="Executive summary" title="What this is, in one paragraph.">
          <p>{s.executiveSummary}</p>
        </Section>

        {/* Magazine-grade visual breath — uses the case study's own tagline
            at hero scale, so every CSU has at least one display-type moment. */}
        <Reveal>
          <PullQuote>{s.tagline}</PullQuote>
        </Reveal>

        {s.beforeAfter && s.beforeAfter.length > 0 && (
          <section className="mt-12 rounded-2xl border border-rule bg-surface p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
              ◆ Before / after
            </div>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {s.beforeAfter.map((b) => (
                <div key={b.metric} className="rounded-xl border border-rule bg-background p-5">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech">
                    {b.metric}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2 font-mono-tech text-sm">
                    <span className="text-ink-soft line-through">{b.before}</span>
                    <span className="text-ink-soft">→</span>
                    <span className="text-ink font-medium">{b.after}</span>
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

        <div className="mt-14 pt-8 border-t border-rule">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
            Keywords
          </div>
          <div className="flex flex-wrap gap-2">
            {s.keywords.map((k) => (
              <span
                key={k}
                className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface font-sans"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
        {/* CTA strip */}
        <div className="mt-16 rounded-3xl border border-ink/10 bg-surface p-8 md:p-10">
          <h2 className="font-instrument text-2xl text-ink leading-tight">
            Discussing payment infrastructure / product leadership roles?
          </h2>
          <p className="mt-3 text-ink-soft max-w-2xl">
            Reference-available. Download the résumé or get in touch.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/Rizwan_Zafar_Resume.pdf"
              download
              onClick={() => {
                ctaClick("download_resume", "case_study_footer", "/Rizwan_Zafar_Resume.pdf");
                resumeDownload("case_study");
              }}
              className="inline-flex rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
            >
              Download résumé (PDF)
            </a>
            <Link
              to="/contact"
              onClick={() => ctaClick("discuss_a_role", "case_study_footer", "/contact")}
              className="inline-flex rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
            >
              Discuss a role
            </Link>
          </div>
        </div>
      </div>

      <section className="border-t border-rule bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-instrument text-2xl text-ink mb-8">More case studies</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="group block bg-surface border border-rule rounded-2xl overflow-hidden hover:border-ink/30 transition-colors"
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
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                    {c.category}
                  </div>
                  <div className="font-instrument text-lg text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {c.title}
                  </div>
                  <p className="text-sm text-ink-soft mt-2">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
