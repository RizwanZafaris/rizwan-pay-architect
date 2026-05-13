import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/posts";
import { recommendations } from "@/data/recommendations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rizwan Zafar — Payments Product Executive | Dubai" },
      {
        name: "description",
        content:
          "Payments product executive with $1B+ GTV experience: cross-border rails, merchant onboarding, settlement, fraud/risk, wallets and regulated fintech platforms.",
      },
      { property: "og:title", content: "Rizwan Zafar — Payments Product Executive" },
      {
        property: "og:description",
        content:
          "I build payment infrastructure for complex markets. $1B+ GTV, 25M+ monthly transactions, 5 markets.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = caseStudies.slice(0, 3);
  const latest = posts.slice(0, 3);
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="text-xs uppercase tracking-[0.18em] text-ink-soft mb-6">
            Dubai · Payments Product · Available for senior roles
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-ink leading-[1.05] max-w-4xl">
            I build payment infrastructure for complex markets.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
            Payments product executive with $1B+ GTV experience across cross-border rails,
            merchant onboarding, settlement, fraud and risk, wallets, and regulated fintech
            platforms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
            >
              Download Resume
            </a>
            <Link
              to="/product-work"
              className="inline-flex items-center rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-background transition-colors"
            >
              View Product Work
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-ink-soft hover:text-ink underline underline-offset-4"
            >
              Read Blog →
            </Link>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="border-t border-rule bg-surface-2">
          <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-6">
            {profile.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-2xl text-ink">{m.value}</div>
                <div className="text-xs uppercase tracking-[0.12em] text-ink-soft mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Positioning</div>
        </div>
        <div className="md:col-span-2">
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug">
            {profile.positioning}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.partners.map((p) => (
              <span
                key={p}
                className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">
                Selected Product Work
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-2">
                Infrastructure shipped at scale.
              </h2>
            </div>
            <Link to="/product-work" className="text-sm text-ink-soft hover:text-ink hidden md:inline">
              All case studies →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((c) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="group border border-rule bg-surface p-6 rounded-lg hover:border-ink transition-colors flex flex-col"
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-accent-emerald font-medium">
                  {c.category}
                </div>
                <h3 className="font-display text-xl text-ink mt-3 group-hover:text-brand transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed flex-1">{c.tagline}</p>
                <div className="mt-5 pt-5 border-t border-rule flex flex-wrap gap-x-5 gap-y-2">
                  {c.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-sm text-ink">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-[0.1em] text-ink-soft">{m.label}</div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest writing */}
      <section className="border-t border-rule bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">From the Blog</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-2">
                Notes on payments, product and emerging markets.
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-ink-soft hover:text-ink hidden md:inline">
              All posts →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group border border-rule bg-surface p-6 rounded-lg hover:border-ink transition-colors block"
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                  {p.category} · {p.readingTime}
                </div>
                <h3 className="font-display text-lg text-ink mt-3 group-hover:text-brand transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
