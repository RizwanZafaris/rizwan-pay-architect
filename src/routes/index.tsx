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

const services = [
  {
    title: "Cross-border rails",
    desc: "Pay-in, payout, FX and dynamic corridor pricing across MENA and South Asia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>
    ),
  },
  {
    title: "Merchant onboarding & KYB",
    desc: "Self-serve flows, automated KYC/KYB, tiered risk, category pricing — weeks to hours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="18" cy="17" r="3"/><path d="m20.5 19.5-1.5-1.5"/></svg>
    ),
  },
  {
    title: "Settlement & reconciliation",
    desc: "99.95% SLA. Real-time switches, treasury tooling, multi-jurisdiction reporting.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17l5-5 4 4 8-8"/><path d="M14 8h6v6"/></svg>
    ),
  },
  {
    title: "Risk, fraud & AML/CFT",
    desc: "Velocity, device fingerprinting, sanctions, SARs, chargebacks. Loss < 0.1% of GTV.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="m9 12 2 2 4-4"/></svg>
    ),
  },
];

function HomePage() {
  const featured = caseStudies.slice(0, 3);
  const latest = posts.slice(0, 3);
  const quotes = recommendations.slice(0, 2);
  const partnersLoop = [...profile.partners, ...profile.partners];
  const arc = profile.experience.slice(0, 6);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="absolute inset-0 bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_at_top_right,black_25%,transparent_70%)]" aria-hidden />
        <div className="absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full blur-[120px] opacity-60"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-emerald) 24%, transparent), transparent 70%)" }} aria-hidden />
        <div className="absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full blur-[120px] opacity-50"
             style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 30%, transparent), transparent 70%)" }} aria-hidden />
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24 md:pb-24 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
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

            <p className="mt-7 text-sm font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
              ◆ Hello — I'm
            </p>
            <h1 className="mt-3 font-instrument text-5xl md:text-7xl lg:text-[80px] text-ink leading-[0.98]">
              Rizwan{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--brand)]">Zafar.</span>
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-[var(--accent-emerald)]" viewBox="0 0 200 10" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M2 6 Q 50 1, 100 5 T 198 4" />
                </svg>
              </span>
              <br />
              <span className="italic text-ink-soft text-4xl md:text-5xl lg:text-[56px]">
                I build payment infrastructure.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
              Chief Product Officer at Simpaisa. 8+ years building regulated payment
              infrastructure across emerging markets — pay-in, payout, cross-border, FX,
              settlement, KYC, fraud and AML/CFT.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
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
                to="/contact"
                className="group inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                Get in touch
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right — credential card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[color-mix(in_oklab,var(--brand)_18%,transparent)] via-transparent to-[color-mix(in_oklab,var(--accent-emerald)_18%,transparent)] blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border border-ink/10 bg-background/80 backdrop-blur-xl p-6 md:p-7 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--brand)] to-ink text-background grid place-items-center font-instrument text-2xl shadow-inner">
                    RZ
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink leading-tight">{profile.name}</div>
                    <div className="text-[11px] text-ink-soft mt-0.5">{profile.role}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30 bg-[var(--accent-emerald)]/8 px-2 py-1 rounded-full">
                  Open
                </span>
              </div>

              {/* Facts grid */}
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                {[
                  ["Based in", "Dubai, UAE"],
                  ["Currently", "CPO @ Simpaisa"],
                  ["Education", "MIT Sloan · KU"],
                  ["Markets", "MENA · South Asia"],
                  ["Certified", "PMP · PCI DSS · ISO 27001"],
                  ["Honor", "PM of the Year, 2015"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">{k}</dt>
                    <dd className="mt-1 text-ink font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-rule flex items-center justify-between gap-3">
                <div className="flex -space-x-2">
                  {["TT", "Ub", "iD", "Tm", "MG"].map((p, i) => (
                    <span key={i} className="h-7 w-7 rounded-full border-2 border-background bg-surface-2 grid place-items-center text-[9px] font-mono-tech text-ink-soft">
                      {p}
                    </span>
                  ))}
                </div>
                <a href={`mailto:${profile.email}`} className="text-xs text-ink-soft hover:text-ink inline-flex items-center gap-1.5">
                  Reach me
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden md:flex absolute -left-6 -bottom-6 items-center gap-2 rounded-2xl border border-ink/10 bg-background/90 backdrop-blur px-4 py-3 shadow-lg rotate-[-3deg]">
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">Lifetime</div>
              <div className="font-instrument text-2xl text-ink leading-none">$1B+</div>
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">GTV processed</div>
            </div>
          </div>
        </div>

        {/* Metrics rail */}
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

      {/* ============ PARTNERS MARQUEE ============ */}
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

      {/* ============ POSITIONING ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="absolute inset-x-0 top-8 text-center pointer-events-none select-none" aria-hidden>
          <span className="font-instrument text-[clamp(80px,16vw,220px)] leading-none italic text-ink/[0.04]">
            Positioning
          </span>
        </div>
        <div className="relative grid md:grid-cols-12 gap-10">
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
        </div>
      </section>

      {/* ============ WHAT I BUILD ============ */}
      <section className="relative border-t border-rule bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
                ◆ What I build
              </div>
              <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-2xl leading-tight">
                Payment infrastructure that survives <span className="italic text-ink-soft">real markets.</span>
              </h2>
            </div>
            <p className="text-sm text-ink-soft max-w-sm">
              Four pillars I've shipped end-to-end across regulated, high-volume environments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-2xl border border-ink/10 bg-background p-6 hover:-translate-y-1 hover:border-ink/30 transition-all duration-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.2)]"
              >
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-ink/5 text-ink grid place-items-center group-hover:bg-[var(--accent-emerald)]/15 group-hover:text-[var(--accent-emerald)] transition-colors">
                    <span className="block w-5 h-5">{s.icon}</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-ink-soft">0{i + 1}</span>
                </div>
                <h3 className="font-instrument text-xl text-ink mt-5 leading-tight">{s.title}</h3>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED CASE STUDIES ============ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
                ◆ Selected work
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
          <div className="grid md:grid-cols-3 gap-5">
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
                  <span className="font-mono-tech text-xs text-ink-soft">/0{i + 1}</span>
                </div>
                <h3 className="font-instrument text-2xl text-ink mt-4 leading-tight group-hover:text-[var(--brand)] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed flex-1">{c.tagline}</p>
                <div className="mt-6 pt-5 border-t border-rule flex items-end justify-between gap-3">
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

      {/* ============ CAREER ARC ============ */}
      <section className="relative border-t border-rule bg-surface-2/40 overflow-hidden">
        <div className="absolute inset-x-0 top-12 text-center pointer-events-none select-none" aria-hidden>
          <span className="font-instrument text-[clamp(80px,18vw,260px)] leading-none italic text-ink/[0.035]">
            Experience
          </span>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
            ◆ Career arc
          </div>
          <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-3xl leading-tight">
            Engineering, PMO, then payments — <span className="italic text-ink-soft">a deliberate path.</span>
          </h2>
          <ol className="mt-12 relative border-l border-rule ml-3">
            {arc.map((e) => (
              <li key={e.company + e.period} className="pl-8 pb-10 relative">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-background border-2 border-ink" />
                <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                  {e.period} · {e.location}
                </div>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-instrument text-xl text-ink">{e.role}</h3>
                  <span className="text-ink-soft">— {e.company}</span>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/resume" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink group">
            Full resume
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* ============ RECOMMENDATIONS ============ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
            ◆ Recommendations
          </div>
          <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-3xl leading-tight">
            What people who've worked with me <span className="italic text-ink-soft">say.</span>
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {quotes.map((r) => (
              <figure
                key={r.name}
                className="relative rounded-2xl border border-ink/10 bg-surface p-8 flex flex-col"
              >
                <span className="absolute top-4 right-6 font-instrument text-7xl leading-none text-ink/10 select-none">"</span>
                <blockquote className="font-instrument text-xl text-ink leading-snug flex-1 relative">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-rule flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand)] to-ink text-background grid place-items-center text-xs font-mono-tech">
                    {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{r.name}</div>
                    <div className="text-xs text-ink-soft mt-0.5">
                      {r.title} · {r.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/about" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              More on the about page
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ LATEST WRITING ============ */}
      <section className="border-t border-rule bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-emerald)] font-mono-tech font-semibold">
                ◆ Writing
              </div>
              <h2 className="font-instrument text-4xl md:text-5xl text-ink mt-3 max-w-2xl leading-tight">
                Notes on payments, product and <span className="italic text-ink-soft">emerging markets.</span>
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              All posts
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {latest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group rounded-2xl border border-ink/10 bg-background p-6 hover:border-ink/30 hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                  {p.category} · {p.readingTime}
                </div>
                <h3 className="font-instrument text-xl text-ink mt-3 leading-tight group-hover:text-[var(--brand)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed">{p.description}</p>
                <span className="inline-flex items-center gap-1.5 mt-5 text-xs text-ink-soft group-hover:text-ink">
                  Read
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ink text-background p-10 md:p-14">
            <div className="absolute -top-32 -right-20 h-[400px] w-[400px] rounded-full blur-[120px] opacity-50"
                 style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-emerald) 60%, transparent), transparent 70%)" }} aria-hidden />
            <div className="absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
                  ◆ Open to senior payments roles
                </div>
                <h2 className="font-instrument text-4xl md:text-5xl mt-3 leading-tight">
                  Hiring for payments product, infrastructure or program leadership? <span className="italic text-background/60">Let's talk.</span>
                </h2>
                <p className="mt-4 text-background/70 max-w-xl">
                  Visa · Mastercard · Stripe · Wise · Adyen · Thunes · DLocal · regional fintechs in MENA, South Asia, Singapore and Europe.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-background text-ink px-6 py-3.5 text-sm font-medium hover:bg-[var(--accent-emerald)] hover:text-background transition-colors"
                >
                  {profile.email}
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={profile.resumeHref}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
