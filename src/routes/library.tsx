import { createFileRoute, Link } from "@tanstack/react-router";
import { caseStudies, caseStudyThumb, type CaseStudy } from "@/data/caseStudies";
import { hubs } from "@/data/hubs";
import { publishedPosts, type Post } from "@/data/posts";
import { absUrl } from "@/lib/seo";

const GUIDE_SLUGS = [
  "payments-prd-template-nine-sections",
  "three-way-reconciliation-at-scale",
  "hosted-checkout-vs-direct-card-processing",
  "swift-compliance-checklist-for-banks-and-fintechs",
  "agent-payment-guard-x402-risk-gates",
  "risk-adjusted-backlog-payments",
] as const;

const CASE_STUDY_SLUGS = [
  "simpaisa-payment-infrastructure",
  "settlement-reconciliation",
  "merchant-onboarding-kyc",
] as const;

function selectBySlug<T extends { slug: string }>(items: T[], slugs: readonly string[]): T[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  return slugs.map((slug) => bySlug.get(slug)).filter((item): item is T => Boolean(item));
}

const guides: Post[] = selectBySlug(publishedPosts, GUIDE_SLUGS);
const featuredStudies: CaseStudy[] = selectBySlug(caseStudies, CASE_STUDY_SLUGS);

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Payments Product Library | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Practical payments product guides, open-source systems, case studies and topic collections for regulated fintech operators.",
      },
      { property: "og:title", content: "Payments Product Library | Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "A curated library of practical guides, case studies and open-source product systems for regulated payments teams.",
      },
      { property: "og:url", content: absUrl("/library") },
      { name: "twitter:title", content: "Payments Product Library | Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Practical guides, case studies and open-source product systems for regulated payments teams.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/library") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Payments Product Library",
          url: absUrl("/library"),
          description:
            "Practical payments product guides, open-source systems, case studies and topic collections.",
          hasPart: [
            {
              "@type": "CreativeWork",
              name: "Product Manager OS",
              url: absUrl("/product-manager-os"),
            },
            ...guides.map((post) => ({
              "@type": "Article",
              name: post.title,
              url: absUrl("/blog/" + post.slug),
            })),
            ...featuredStudies.map((study) => ({
              "@type": "CreativeWork",
              name: study.title,
              url: absUrl("/product-work/" + study.slug),
            })),
            ...hubs.map((hub) => ({
              "@type": "CollectionPage",
              name: hub.title,
              url: absUrl("/topics/" + hub.slug),
            })),
          ],
        }),
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <div className="overflow-x-clip">
      <header className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24">
          <div className="text-[10px] font-mono-tech font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
            ◆ Public library
          </div>
          <h1 className="mt-4 max-w-4xl font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink">
            Working material for{" "}
            <span className="italic text-[var(--brand)]">regulated payments.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Open systems, practical guides, case studies and topic collections. Everything here is
            already published and available to read, use or inspect.
          </p>
        </div>
      </header>

      <section className="rz-beam relative border-b border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <div className="text-[10px] font-mono-tech font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
              01 · Open source
            </div>
            <h2 className="mt-3 font-instrument text-3xl leading-tight text-ink md:text-4xl">
              A product operating system you can inspect.
            </h2>
          </div>
          <article
            data-glow
            className="rounded-lg border border-rule bg-card p-6 md:col-span-8 md:p-8"
          >
            <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--accent-emerald)]">
              Open source · MIT
            </div>
            <h3 className="mt-3 font-instrument text-3xl text-ink">Product Manager OS</h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              A readable operating loop for product work, with human stage gates, fill-in templates
              and optional AI layers. Use the structure without needing a hosted product or account.
            </p>
            <Link
              to="/product-manager-os"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink hover:text-[var(--brand)]"
            >
              <span className="rz-link">Inspect Product Manager OS</span>
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </article>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="max-w-3xl">
            <div className="text-[10px] font-mono-tech font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
              02 · Practical guides
            </div>
            <h2 className="mt-3 font-instrument text-3xl text-ink md:text-5xl">
              Start with a decision, not a category.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              A focused set of working guides from the published knowledge base for product, risk,
              settlement and platform decisions.
            </p>
          </div>

          <div data-rz-stagger className="mt-10 grid gap-4 md:grid-cols-2">
            {guides.map((post, index) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                data-glow
                className="group relative flex min-h-56 flex-col rounded-lg border border-rule bg-card p-6 transition-colors hover:border-ink/30"
              >
                <div className="flex items-start justify-between gap-4 text-[10px] font-mono-tech uppercase tracking-[0.16em] text-ink-soft">
                  <span>{post.category}</span>
                  <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-instrument text-2xl leading-tight text-ink md:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {post.description}
                </p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs text-ink-soft">
                  <span>{post.readingTime}</span>
                  <span
                    className="text-lg transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rz-beam relative border-b border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="text-[10px] font-mono-tech font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
            03 · Case studies
          </div>
          <h2 className="mt-3 max-w-3xl font-instrument text-3xl text-ink md:text-5xl">
            See the operating decisions in context.
          </h2>

          <div data-rz-stagger className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredStudies.map((study) => (
              <Link
                key={study.slug}
                to="/product-work/$slug"
                params={{ slug: study.slug }}
                data-glow
                className="group overflow-hidden rounded-lg border border-rule bg-card transition-colors hover:border-ink/30"
              >
                <img
                  src={caseStudyThumb(study.slug)}
                  alt={study.imageAlt ?? ""}
                  loading="lazy"
                  width={800}
                  height={450}
                  className="aspect-video w-full object-cover"
                />
                <div className="p-6">
                  <div className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-ink-soft">
                    {study.category}
                  </div>
                  <h3 className="mt-3 font-instrument text-2xl leading-tight text-ink">
                    {study.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink group-hover:text-[var(--brand)]">
                    <span className="rz-link">Read case study</span>
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="text-[10px] font-mono-tech font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
            04 · Browse by domain
          </div>
          <h2 className="mt-3 max-w-3xl font-instrument text-3xl text-ink md:text-5xl">
            Follow a topic through the whole knowledge base.
          </h2>

          <div data-rz-stagger className="mt-10 border-t border-rule">
            {hubs.map((hub, index) => (
              <Link
                key={hub.slug}
                to="/topics/$hub"
                params={{ hub: hub.slug }}
                data-glow
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-rule py-6 md:gap-8"
              >
                <span
                  className="font-mono-tech text-[10px] tracking-[0.2em] text-[var(--brand)]"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-instrument text-2xl text-ink md:text-3xl">{hub.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
                    {hub.description}
                  </p>
                </div>
                <span
                  className="text-xl text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
