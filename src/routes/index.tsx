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
  const quotes = recommendations.slice(0, 2);
  const partnersLoop = [...profile.partners, ...profile.partners];
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="absolute inset-0 bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden />
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full blur-[120px] opacity-60"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-emerald) 22%, transparent), transparent 70%)" }} aria-hidden />
        <div className="absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full blur-[120px] opacity-50"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 28%, transparent), transparent 70%)" }} aria-hidden />
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28 md:pb-24">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-background/70 backdrop-blur px-3 py-1.5 shadow-sm">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-60 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-emerald)]"></span>
            </span>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink">
              Available for senior roles
            </span>
            <span className="h-3 w-px bg-ink/15" />
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
              Dubai · Global
            </span>
          </div>

          <h1 className="mt-7 font-instrument text-5xl md:text-7xl lg:text-[88px] text-ink leading-[0.98] max-w-5xl">
            I build payment infrastructure{" "}
            <span className="italic text-ink-soft">for complex markets.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed">
            Chief Product Officer at Simpaisa. 8+ years building regulated payment
            infrastructure across emerging markets — pay-in, payout, cross-border, FX,
            settlement, KYC, fraud and AML/CFT.{" "}
            <span className="text-ink font-medium">$1B+ GTV · 25M+ monthly transactions · 5 countries.</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={profile.resumeHref}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3.5 text-sm font-medium hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)]"
            >
              Download Resume
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>
            </a>
            <Link
              to="/product-work"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-background/60 backdrop-blur px-6 py-3.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
            >
              View Product Work
            </Link>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              Read Blog
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="relative border-t border-rule bg-background/60 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-6">
            {profile.metrics.map((m, i) => (
              <div key={m.label} className="relative">
                {i > 0 && <span className="hidden md:block absolute -left-3 top-1 bottom-1 w-px bg-rule" />}
                <div className="font-mono-tech text-2xl md:text-[28px] font-medium tracking-tight text-ink">
                  {m.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mt-1.5 font-mono-tech">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted partners marquee */}
      {profile.partners?.length ? (
        <section className="border-b border-rule bg-surface-2/50 overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 py-6 flex items-center gap-8">
            <div className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
              Partner ecosystem
            </div>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-10 marquee-track w-max">
                {partnersLoop.map((p, i) => (
                  <span key={`${p}-${i}`} className="text-sm font-medium text-ink-soft whitespace-nowrap">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Positioning */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
            ◆ Positioning
          </div>
        </div>
        <div className="md:col-span-9">
          <p className="font-instrument text-3xl md:text-5xl text-ink leading-[1.15]">
            {profile.positioning}
          </p>
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
      {/* Recommendations */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Recommendations</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mt-2 max-w-3xl">
            What people who've worked with me say.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {quotes.map((r) => (
              <figure
                key={r.name}
                className="border border-rule bg-surface p-8 rounded-lg flex flex-col"
              >
                <blockquote className="font-display text-lg text-ink leading-snug flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-rule">
                  <div className="text-sm font-medium text-ink">{r.name}</div>
                  <div className="text-xs text-ink-soft mt-1">
                    {r.title} · {r.company}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/about" className="text-sm text-ink-soft hover:text-ink">
              More on the about page →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
