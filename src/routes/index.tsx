import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/caseStudies";
import { posts, categories } from "@/data/posts";
import { products } from "@/data/products";
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

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-10 md:pt-20 pb-12 md:pb-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT — Editorial intro + headline (TEXT FIRST on mobile) */}
          <div className="lg:col-span-7 order-1 relative z-10 min-w-0">
            <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
              <span className="h-px w-12 bg-[var(--brand)]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
                Introduction
              </span>
            </div>

            <h1 className="font-instrument tracking-tight leading-[0.88] text-[56px] sm:text-[72px] md:text-[120px] lg:text-[148px] text-ink">
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

            <p className="mt-6 md:mt-10 max-w-2xl text-lg md:text-2xl text-ink-soft leading-snug font-light">
              Payments product executive in Dubai. I build regulated payment infrastructure across{" "}
              <span className="text-ink font-medium italic">acceptance</span>,{" "}
              <span className="text-ink font-medium">cross-border corridors</span>,{" "}
              <span className="font-medium italic text-[var(--brand)]">settlement</span>,{" "}
              KYC/KYB, AML and fraud.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={profile.resumeHref}
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--brand-foreground)] bg-ink hover:bg-[var(--brand)] transition-colors"
              >
                Download resume
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold text-ink border border-ink/20 hover:border-ink/50 transition-colors"
              >
                Email me
              </a>
            </div>

            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
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

          {/* RIGHT — Portrait (below text on mobile, smaller on mobile) */}
          <div className="lg:col-span-5 order-2 relative min-w-0">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] aspect-[4/5]">
              <img
                src={portrait}
                alt="Portrait of Rizwan Zafar, Chief Product Officer, Payments"
                width={920}
                height={1150}
                loading="eager"
                decoding="async"
                {...({ fetchpriority: "high" } as any)}
                className="relative z-10 h-full w-full object-contain object-bottom"
              />

              <div className="absolute top-3 right-2 md:right-6 z-20 bg-card/95 backdrop-blur-sm border border-rule px-3 py-1 text-[10px] tracking-[0.22em] font-bold uppercase text-ink font-mono-tech shadow-sm">
                Dubai · UAE
              </div>

              {([
                { type: "plus", top: "8%",  left: "88%", size: "text-4xl md:text-5xl", color: "text-[var(--brand)]" },
                { type: "plus", top: "30%", left: "92%", size: "text-2xl md:text-3xl", color: "text-[var(--brand)]/70" },
                { type: "plus", top: "48%", left: "4%",  size: "text-3xl md:text-4xl", color: "text-[var(--brand)]" },
                { type: "dot",  top: "22%", left: "6%",  size: "h-2 w-2",     color: "bg-[var(--brand)]/70" },
                { type: "dot",  top: "58%", left: "94%", size: "h-3 w-3",     color: "bg-[var(--brand)]" },
                { type: "dot",  top: "88%", left: "50%", size: "h-3 w-3 md:h-3.5 md:w-3.5", color: "bg-[var(--brand)]" },
              ] as const).map((g, i) =>
                g.type === "plus" ? (
                  <span
                    key={i}
                    aria-hidden
                    className={`absolute z-20 font-light leading-none select-none -translate-x-1/2 -translate-y-1/2 ${g.size} ${g.color}`}
                    style={{ top: g.top, left: g.left }}
                  >
                    +
                  </span>
                ) : (
                  <span
                    key={i}
                    aria-hidden
                    className={`absolute z-20 rounded-full -translate-x-1/2 -translate-y-1/2 ${g.size} ${g.color}`}
                    style={{ top: g.top, left: g.left }}
                  />
                )
              )}
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
                  className="group relative overflow-hidden rounded-2xl aspect-square sm:aspect-[5/4] lg:aspect-[4/5] p-3 sm:p-4 flex flex-col justify-end text-background border border-rule"
                  style={{
                    background: `linear-gradient(160deg, color-mix(in oklab, var(--brand) ${22 + (i % 4) * 10}%, transparent), color-mix(in oklab, var(--ink) ${70 - (i % 3) * 10}%, transparent))`,
                  }}
                >
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" aria-hidden />
                  <div className="relative">
                    <div className="font-instrument text-base sm:text-lg leading-tight">{t.name}</div>
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

      {/* ============ PRODUCTS — built & building ============ */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-4">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Products
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02] max-w-3xl">
                Products I have built — and products I am <span className="italic text-[var(--brand)]">building.</span>
              </h2>
            </div>
            <Link to="/products" className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group">
              All products <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {products.map((p) => {
              const isInternal = p.link.startsWith("/");
              const CardInner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-instrument text-2xl text-ink">{p.name}</div>
                    <span
                      className={`text-[10px] uppercase tracking-[0.18em] font-mono-tech px-2.5 py-1 rounded-full border ${
                        p.status === "coming-soon"
                          ? "border-rule text-ink-soft"
                          : "border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)]"
                      }`}
                    >
                      {p.statusLabel}
                    </span>
                  </div>
                  <p className="mt-3 text-ink-soft leading-relaxed">{p.oneLiner}</p>
                  {p.metrics && p.metrics.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft font-mono-tech">
                      {p.metrics.slice(0, 3).map((m) => (
                        <span key={m.label}>
                          <span className="text-ink font-semibold">{m.value}</span>{" "}
                          <span className="uppercase tracking-[0.12em]">{m.label}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 text-sm text-ink group-hover:text-[var(--brand)] inline-flex items-center gap-1.5 transition-colors">
                    {p.ctaLabel ?? "Learn more"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </>
              );
              return isInternal ? (
                <Link
                  key={p.slug}
                  to={p.link}
                  className="group block bg-surface border border-rule rounded-2xl p-7 hover:border-ink/30 transition-colors"
                >
                  {CardInner}
                </Link>
              ) : (
                <a
                  key={p.slug}
                  href={p.link}
                  className="group block bg-surface border border-rule rounded-2xl p-7 hover:border-ink/30 transition-colors"
                >
                  {CardInner}
                </a>
              );
            })}
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
