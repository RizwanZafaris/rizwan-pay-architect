import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/posts";
import { absUrl, SITE_URL } from "@/lib/seo";
import { DiagramFigure, RailsMapDiagram } from "@/components/diagrams/Diagrams";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  mainEntity: { "@type": "Person", name: profile.name, url: SITE_URL },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rizwan Zafar — Payments Product Executive | Dubai" },
      {
        name: "description",
        content:
          "Payments product executive: $1B+ GTV, cross-border rails, settlement, KYC/KYB, AML and fraud across MENA and South Asia.",
      },
      { property: "og:title", content: "Rizwan Zafar — Payments Product Executive | Dubai" },
      {
        property: "og:description",
        content:
          "Payments infrastructure for complex markets. $1B+ GTV. 25M+ monthly transactions. 5 markets.",
      },
      { property: "og:url", content: absUrl("/") },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(profilePageJsonLd) },
    ],
  }),
  component: HomePage,
});

const credBar = [
  { label: "Annual GTV", value: "$1B+" },
  { label: "Monthly transactions", value: "25M+" },
  { label: "Markets", value: "5" },
  { label: "Settlement SLA", value: "99.95%" },
  { label: "Downtime", value: "−90%" },
  { label: "Payment cost", value: "50% → 1%" },
];

const whereIFit = [
  {
    pill: "Payment Networks",
    title: "Acceptance, authorization, settlement.",
    points: [
      "Card acquiring (MPGS / MDES)",
      "Scheme readiness & partner enablement",
      "Authorization and settlement performance",
      "Dispute & chargeback product surface",
    ],
  },
  {
    pill: "Fintech Infrastructure",
    title: "APIs, onboarding, risk, reliability.",
    points: [
      "Pay-in / payout APIs and webhooks",
      "Local payment methods at API parity",
      "KYC / KYB, AML/CFT and fraud decisioning",
      "Platform reliability and observability",
    ],
  },
  {
    pill: "Emerging Markets",
    title: "Corridors, wallets, FX, regulators.",
    points: [
      "Cross-border corridors and routing",
      "Wallets, DCB, IBFT, cash-over-counter",
      "FX engine and corridor-level economics",
      "Regulatory operations across 6+ jurisdictions",
    ],
  },
];

function HomePage() {
  const featured = caseStudies.slice(0, 6);
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const latest = posts.filter((p) => p.slug !== featuredPost.slug).slice(0, 3);
  const ecosystem = [
    "TikTok", "Uber", "Temu", "MoneyGram", "PUBG",
    "DLocal", "Thunes", "Boku", "Coda", "Meta", "Spotify",
  ];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="absolute inset-0 bg-grid opacity-[0.45] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" aria-hidden />
        <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full blur-[140px] opacity-50"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-emerald) 22%, transparent), transparent 70%)" }} aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-16 md:pb-20 grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT — message */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-background/80 backdrop-blur px-3 py-1.5">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-emerald)]" />
              </span>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink">
                Available for senior payments roles
              </span>
              <span className="h-3 w-px bg-ink/15" />
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
                Dubai · Global
              </span>
            </div>

            <h1 className="mt-6 font-instrument text-[44px] md:text-6xl lg:text-[76px] text-ink leading-[1.02] tracking-tight">
              Payments infrastructure
              <br />
              for <span className="italic text-ink-soft">complex markets.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
              Payments product executive building regulated payment systems across{" "}
              <span className="text-ink">acceptance, APIs, cross-border corridors, FX,
              settlement, reconciliation, KYC/KYB, AML/CFT, fraud and risk, wallets,</span>{" "}
              and payment performance.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
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
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-background/70 backdrop-blur px-6 py-3.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
              >
                View Product Work
              </Link>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                Read Payments Essays
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — operator snapshot panel */}
          <aside className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-ink/10 bg-background/85 backdrop-blur-xl p-6 md:p-7 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
                  Operator snapshot
                </div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30 px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <dl className="mt-5 divide-y divide-rule">
                {[
                  ["Role", "Chief Product Officer, Simpaisa"],
                  ["Based in", "Dubai, UAE"],
                  ["Markets", "MENA + South Asia"],
                  ["Builds", "Pay-in · Payout · FX · Settlement · KYC · Fraud/Risk"],
                  ["Relevant for", "Visa · Mastercard · Stripe · Wise · Adyen · Thunes"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-3 py-3 text-sm">
                    <dt className="col-span-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft pt-0.5">
                      {k}
                    </dt>
                    <dd className="col-span-2 text-ink leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 pt-5 border-t border-rule flex items-center justify-between gap-3">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-xs text-ink-soft hover:text-ink inline-flex items-center gap-1.5">
                  LinkedIn <span aria-hidden>→</span>
                </a>
                <a href={`mailto:${profile.email}`} className="text-xs text-ink-soft hover:text-ink inline-flex items-center gap-1.5">
                  Reach me <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Credibility bar */}
        <div className="relative border-t border-rule bg-background/70 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6 py-7 grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-5">
            {credBar.map((m, i) => (
              <div key={m.label} className="relative">
                {i > 0 && <span className="hidden md:block absolute -left-3 top-1 bottom-1 w-px bg-rule" />}
                <div className="font-mono-tech text-xl md:text-[22px] font-medium tracking-tight text-ink">
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

      {/* ============ ECOSYSTEM STRIP (quiet) ============ */}
      <section className="border-b border-rule bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
            Ecosystem exposure
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-ink/70">
            {ecosystem.map((p) => (
              <span key={p} className="font-instrument text-base md:text-lg tracking-tight">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXECUTIVE THESIS ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
              ◆ Executive thesis
            </div>
            <p className="mt-3 text-xs text-ink-soft font-mono-tech">
              What I build, and why it's hard.
            </p>
          </div>
          <div className="md:col-span-9">
            <p className="font-instrument text-3xl md:text-[44px] text-ink leading-[1.15]">
              {profile.positioning}
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHERE I FIT ============ */}
      <section className="relative border-t border-rule bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
                ◆ Where I fit
              </div>
              <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-2xl leading-tight">
                Three orgs I operate inside <span className="italic text-ink-soft">fluently.</span>
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule rounded-2xl overflow-hidden">
            {whereIFit.map((col) => (
              <div key={col.pill} className="bg-background p-7">
                <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
                  {col.pill}
                </div>
                <h3 className="font-instrument text-2xl text-ink mt-3 leading-tight">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="text-[var(--accent-emerald)] mt-1.5 h-1 w-1 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT WORK ============ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
                ◆ Product work
              </div>
              <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-2xl leading-tight">
                Infrastructure shipped <span className="italic text-ink-soft">at scale.</span>
              </h2>
            </div>
            <Link to="/product-work" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              All case studies
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((c, i) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="group relative rounded-2xl border border-ink/10 bg-surface p-6 hover:border-ink/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.2)] flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--accent-emerald)]">
                    {c.category}
                  </span>
                  <span className="font-mono-tech text-xs text-ink-soft">/{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-instrument text-2xl text-ink mt-4 leading-tight group-hover:text-[var(--brand)] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed flex-1">{c.tagline}</p>
                {c.keywords?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.keywords.slice(0, 3).map((k) => (
                      <span key={k} className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-ink-soft border border-rule rounded-full px-2 py-0.5">
                        {k}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 pt-5 border-t border-rule flex items-end justify-between gap-3">
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {c.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="font-mono-tech text-base text-ink">{m.value}</div>
                        <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <span className="h-9 w-9 rounded-full border border-ink/15 grid place-items-center text-ink group-hover:bg-ink group-hover:text-background group-hover:border-ink transition-all">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED ESSAY ============ */}
      <section className="border-t border-rule bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
                ◆ Payments essays
              </div>
              <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-2xl leading-tight">
                A working knowledge base on <span className="italic text-ink-soft">regulated payments.</span>
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              All essays
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group lg:col-span-7 rounded-2xl border border-ink/10 bg-background p-8 md:p-10 hover:border-ink/30 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[var(--accent-emerald)]">
                  Featured · {featuredPost.category}
                </span>
                <span className="text-[10px] font-mono-tech text-ink-soft">{featuredPost.readingTime}</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-ink mt-4 leading-tight group-hover:text-[var(--brand)] transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-base text-ink-soft mt-4 leading-relaxed flex-1">
                {featuredPost.thesis ?? featuredPost.description}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-6 text-sm text-ink">
                Read essay
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
            <div className="lg:col-span-5 grid gap-5">
              {latest.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl border border-ink/10 bg-background p-6 hover:border-ink/30 transition-colors block"
                >
                  <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                    {p.category} · {p.readingTime}
                  </div>
                  <h4 className="font-instrument text-lg text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST / ECOSYSTEM ============ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
            ◆ Ecosystem
          </div>
          <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-3xl leading-tight">
            Built across payment ecosystems used by{" "}
            <span className="italic text-ink-soft">global merchants and partners.</span>
          </h2>
          <div className="mt-10 rounded-2xl border border-rule bg-surface p-8 md:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-5 items-center">
              {ecosystem.map((n) => (
                <div
                  key={n}
                  className="font-instrument text-xl md:text-2xl text-ink/85 tracking-tight border-b border-rule/60 pb-3"
                >
                  {n}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-ink-soft font-mono-tech leading-relaxed max-w-3xl">
              Names reflect ecosystem exposure, integrations, or partner/client contexts where applicable.
            </p>
          </div>
        </div>
      </section>

      {/* ============ ABOUT PREVIEW ============ */}
      <section className="border-t border-rule bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
              ◆ About
            </div>
            <p className="mt-3 text-xs text-ink-soft font-mono-tech">
              Operating discipline, then payments.
            </p>
          </div>
          <div className="md:col-span-9">
            <p className="font-instrument text-2xl md:text-3xl text-ink leading-[1.3]">
              Before payments, I learned reliability in systems where failure had real
              consequences. That operating discipline now shapes how I build financial
              infrastructure: <span className="italic text-ink-soft">controlled, scalable, auditable, and resilient.</span>
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 mt-8 text-sm text-ink hover:text-[var(--brand)] transition-colors"
            >
              Read full story
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ink text-background p-10 md:p-14">
            <div className="absolute -top-32 -right-20 h-[400px] w-[400px] rounded-full blur-[120px] opacity-50"
                 style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-emerald) 60%, transparent), transparent 70%)" }} aria-hidden />
            <div className="absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
                  ◆ Open to senior payments roles
                </div>
                <h2 className="font-instrument text-4xl md:text-5xl mt-3 leading-tight">
                  Need someone who can turn messy payment rails into{" "}
                  <span className="italic text-background/60">reliable products?</span>
                </h2>
                <p className="mt-4 text-background/70 max-w-xl">
                  Visa · Mastercard · Stripe · Wise · Adyen · Thunes · DLocal · regional fintechs in MENA, South Asia, Singapore and Europe.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
                <a
                  href={profile.resumeHref}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-background text-ink px-6 py-3.5 text-sm font-medium hover:bg-[var(--accent-emerald)] hover:text-background transition-colors"
                >
                  Download Resume
                  <span aria-hidden>↓</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
                >
                  Contact Rizwan
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/product-work"
                  className="inline-flex items-center gap-2 px-2 py-2 text-sm text-background/70 hover:text-background transition-colors"
                >
                  Read Product Work
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
