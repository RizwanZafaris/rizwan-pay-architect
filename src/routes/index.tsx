import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/caseStudies";
import { posts, categories } from "@/data/posts";
import { absUrl, SITE_URL } from "@/lib/seo";
import portrait from "@/assets/rizwan-zafar-cutout.png";

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

function HomePage() {
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const editorsPicked = posts.slice(0, 6);
  const featuredCases = caseStudies.slice(0, 3);

  // Hot topics = category cards with post counts
  const hotTopics = categories.map((cat) => ({
    name: cat,
    count: posts.filter((p) => p.category === cat).length,
  }));

  return (
    <div>
      {/* ============ HERO — Genz "Hello / I'm" concept ============ */}
      <section className="relative overflow-hidden">
        {/* Soft radial glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full opacity-60 blur-[140px]"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 28%, transparent), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-[-180px] h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 22%, transparent), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — Editorial intro + headline */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative z-10">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-[var(--brand)]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
                Introduction
              </span>
            </div>

            <h1 className="font-instrument tracking-tight leading-[0.85] text-[72px] md:text-[120px] lg:text-[148px] text-ink">
              I'm{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--brand), color-mix(in oklab, var(--ink) 88%, var(--brand)) 60%, var(--ink))",
                }}
              >
                Rizwan.
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-xl md:text-2xl text-ink-soft leading-snug font-light">
              Payments product executive in Dubai. I build regulated payment infrastructure across{" "}
              <span className="text-ink font-medium italic">acceptance</span>,{" "}
              <span className="text-ink font-medium">cross-border corridors</span>,{" "}
              <span className="font-medium italic text-[var(--brand)]">settlement</span>,{" "}
              KYC/KYB, AML and fraud.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto flex items-center bg-card border border-rule rounded-full pl-6 pr-2 py-2 shadow-[0_8px_24px_-16px_color-mix(in_oklab,var(--ink)_40%,transparent)]">
                <span className="text-sm text-ink-soft font-mono-tech mr-4 whitespace-nowrap">
                  {profile.email}
                </span>
                <a
                  href={profile.resumeHref}
                  download
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--brand-foreground)] bg-ink hover:bg-[var(--brand)] transition-colors whitespace-nowrap"
                >
                  Resume
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              <Link to="/product-work" className="hover:text-ink inline-flex items-center gap-1.5 group">
                Product work <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/blog" className="hover:text-ink inline-flex items-center gap-1.5 group">
                Payments essays <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/contact" className="hover:text-ink inline-flex items-center gap-1.5 group">
                Contact <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — Cutout portrait floating over brand disc */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="relative group mx-auto max-w-[460px] aspect-[4/5]">
              {/* Soft brand disc backdrop */}
              <div
                aria-hidden
                className="absolute inset-x-4 top-6 bottom-10 rounded-full blur-2xl opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--brand) 38%, transparent), color-mix(in oklab, var(--brand) 10%, transparent) 55%, transparent 75%)",
                }}
              />
              {/* Solid disc behind subject */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[78%] aspect-square rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--brand) 22%, var(--background)) 0%, color-mix(in oklab, var(--brand) 8%, var(--background)) 60%, transparent 78%)",
                }}
              />

              {/* Giant monogram backdrop */}
              <span
                aria-hidden
                className="pointer-events-none select-none absolute inset-x-0 top-[18%] text-center font-instrument font-bold leading-none text-[180px] md:text-[240px] -z-10"
                style={{ color: "color-mix(in oklab, var(--ink) 5%, transparent)" }}
              >
                RZ
              </span>

              {/* Portrait cutout */}
              <img
                src={portrait}
                alt="Portrait of Rizwan Zafar, Chief Product Officer, Payments"
                width={920}
                height={1150}
                loading="eager"
                className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_30px_40px_color-mix(in_oklab,var(--ink)_25%,transparent)] transition-transform duration-700 group-hover:-translate-y-1"
              />

              {/* Location tag */}
              <div className="absolute top-6 right-2 md:right-6 z-20 bg-card/95 backdrop-blur-sm border border-rule px-3 py-1 text-[10px] tracking-[0.22em] font-bold uppercase text-ink font-mono-tech shadow-sm">
                Dubai · UAE
              </div>

              {/* Floating decorative glyphs */}
              <span aria-hidden className="absolute top-8 left-4 z-20 text-[var(--brand)] text-3xl font-instrument animate-pulse">+</span>
              <span aria-hidden className="absolute top-24 right-6 z-20 text-[var(--brand)]/70 text-4xl font-instrument">✦</span>
              <span aria-hidden className="absolute bottom-32 -left-2 z-20 h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />

              {/* Subtle rotating geometric accent */}
              <div aria-hidden className="absolute -top-6 -right-6 opacity-25 z-0">
                <svg className="w-24 h-24 text-[var(--brand)] animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ============ HOT TOPICS — horizontal cards ============ */}
        <div className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-3xl border border-rule bg-card/70 backdrop-blur p-6 md:p-8 grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Hot topics
              </div>
              <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-tight">
                Where I write the most.
              </h2>
              <p className="text-xs text-ink-soft mt-2">
                Categories spanning payments infrastructure, settlement, risk and emerging markets.
              </p>
            </div>
            <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {hotTopics.map((t, i) => (
                <Link
                  key={t.name}
                  to="/blog"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] p-4 flex flex-col justify-end text-background border border-rule"
                  style={{
                    background: `linear-gradient(160deg, color-mix(in oklab, var(--brand) ${22 + (i % 4) * 10}%, transparent), color-mix(in oklab, var(--ink) ${70 - (i % 3) * 10}%, transparent))`,
                  }}
                >
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" aria-hidden />
                  <div className="relative">
                    <div className="font-instrument text-lg leading-tight">{t.name}</div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] mt-1 opacity-80">
                      {t.count} {t.count === 1 ? "article" : "articles"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EDITOR'S PICKED ============ */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Editor's picked
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02]">
                The essays I'd read <span className="italic text-[var(--brand)]">first.</span>
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              See all essays <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Big featured + small list (magazine layout) */}
          <div className="grid lg:grid-cols-12 gap-8">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group lg:col-span-7 block"
            >
              <div
                className="aspect-[16/10] rounded-3xl border border-rule mb-5 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, color-mix(in oklab, var(--brand) 35%, transparent), color-mix(in oklab, var(--ink) 80%, transparent))",
                }}
              >
                <div className="absolute inset-0 bg-noise opacity-25 mix-blend-overlay" aria-hidden />
                <div className="absolute top-5 left-5 text-[10px] font-mono-tech uppercase tracking-[0.22em] text-background bg-ink/40 backdrop-blur rounded-full px-3 py-1">
                  Featured · {featuredPost.category}
                </div>
              </div>
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
                {featuredPost.readingTime}
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-ink mt-3 leading-tight group-hover:text-[var(--brand)] transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-ink-soft mt-3 leading-relaxed max-w-2xl">
                {featuredPost.thesis ?? featuredPost.description}
              </p>
            </Link>

            <div className="lg:col-span-5 flex flex-col divide-y divide-rule">
              {editorsPicked.slice(1, 6).map((p, i) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group py-5 first:pt-0 grid grid-cols-[auto_1fr] gap-4 items-start"
                >
                  <div className="font-instrument text-3xl text-[var(--brand)] leading-none w-10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                      {p.category} · {p.readingTime}
                    </div>
                    <h4 className="font-instrument text-lg text-ink mt-1.5 leading-snug group-hover:text-[var(--brand)] transition-colors">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT BAND — sticker style ============ */}
      <section className="relative border-y border-rule bg-surface-2/60">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            <div
              className="rounded-3xl p-8 text-background relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, color-mix(in oklab, var(--brand) 80%, var(--ink)), color-mix(in oklab, var(--ink) 90%, var(--brand)))",
              }}
            >
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] opacity-80">
                ◆ About me
              </div>
              <div className="font-instrument text-3xl mt-3 leading-tight">
                14+ years.<br />
                $1B+ GTV.<br />
                5 markets.
              </div>
              <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm group">
                My story <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-instrument text-2xl md:text-[34px] text-ink leading-[1.25]">
              Before payments, I learned reliability in systems where failure had real
              consequences. That operating discipline now shapes how I build financial
              infrastructure: <span className="italic text-[var(--brand)]">controlled, scalable, auditable, and resilient.</span>
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.metrics.slice(0, 4).map((m) => (
                <div key={m.label} className="rounded-2xl border border-rule bg-card p-4">
                  <div className="font-mono-tech text-xl text-ink">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mt-1 font-mono-tech">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCT WORK — selected cases ============ */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Selected work
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02]">
                Infrastructure shipped <span className="italic text-[var(--brand)]">at scale.</span>
              </h2>
            </div>
            <Link to="/product-work" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              All case studies <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredCases.map((c, i) => (
              <Link
                key={c.slug}
                to="/product-work/$slug"
                params={{ slug: c.slug }}
                className="group relative rounded-3xl border border-rule bg-card p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_25px_50px_-25px_color-mix(in_oklab,var(--brand)_50%,transparent)] flex flex-col"
              >
                <div
                  className="aspect-[5/3] rounded-2xl mb-5 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(${120 + i * 40}deg, color-mix(in oklab, var(--brand) ${30 + i * 10}%, transparent), color-mix(in oklab, var(--ink) ${60 + i * 5}%, transparent))`,
                  }}
                >
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" aria-hidden />
                  <div className="absolute top-3 right-3 font-mono-tech text-[10px] tracking-[0.18em] text-background bg-ink/30 backdrop-blur rounded-full px-2 py-0.5">
                    /0{i + 1}
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]">
                  {c.category}
                </span>
                <h3 className="font-instrument text-xl text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed flex-1">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MARQUEE — ecosystem ============ */}
      <section className="border-y border-rule bg-card overflow-hidden py-7">
        <div className="flex gap-12 marquee-track whitespace-nowrap">
          {[...profile.partners, ...profile.partners].map((p, i) => (
            <span key={`${p}-${i}`} className="font-instrument text-3xl md:text-4xl text-ink/70 tracking-tight inline-flex items-center gap-12">
              {p}
              <span className="text-[var(--brand)]">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ============ SUBSCRIBE / CTA ============ */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Stay in the loop
          </div>
          <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
            Hire me or just <span className="italic text-[var(--brand)]">say hello.</span>
          </h2>
          <p className="text-ink-soft mt-5 max-w-xl mx-auto">
            Open to senior payments roles globally — Visa, Mastercard, Stripe, Wise,
            Adyen, Thunes, DLocal and regional fintechs.
          </p>
          <div className="mt-9 mx-auto max-w-md rounded-full border border-rule bg-card p-1.5 pl-5 flex items-center gap-3 shadow-[0_15px_40px_-20px_color-mix(in_oklab,var(--brand)_60%,transparent)]">
            <span className="text-sm text-ink-soft font-mono-tech truncate">
              {profile.email}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--brand-foreground)] bg-[var(--brand)] hover:opacity-90 transition whitespace-nowrap"
            >
              Reach me <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
