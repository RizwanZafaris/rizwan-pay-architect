import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { caseStudies, caseStudyThumb } from "@/data/caseStudies";
import { posts, categories } from "@/data/posts";
import { products } from "@/data/products";
import { absUrl, SITE_URL } from "@/lib/seo";
import { ctaClick, resumeDownload } from "@/lib/analytics";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { Reveal } from "@/components/motion/Reveal";
import portraitPng from "@/assets/rizwan-zafar-cutout.png";
import portraitWebp from "@/assets/rizwan-zafar-cutout.webp";
import portraitWebpSmall from "@/assets/rizwan-zafar-cutout-460.webp";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  mainEntity: { "@type": "Person", name: profile.name, url: SITE_URL },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rizwan Zafar | Product & Program Executive, Fintech" },
      {
        name: "description",
        content:
          "Product & Program Executive scaling fintech infrastructure in complex markets: $1B+ GTV, 25M+ monthly transactions, 7 markets, 50+ FI partners. Dubai.",
      },
      {
        property: "og:title",
        content: "Rizwan Zafar — Product & Program Executive Scaling Fintech Infrastructure",
      },
      {
        property: "og:description",
        content:
          "Payment infrastructure for complex markets. $1B+ GTV. 25M+ monthly transactions. 7 markets. 50+ bank & wallet partners. Used by TikTok, Uber, Temu.",
      },
      { property: "og:url", content: absUrl("/") },
      { property: "og:type", content: "profile" },
      {
        name: "twitter:title",
        content: "Rizwan Zafar — Product & Program Executive, Fintech Infrastructure",
      },
      {
        name: "twitter:description",
        content:
          "Payment infrastructure for complex markets. $1B+ GTV. 25M+ monthly transactions. 7 markets. 50+ bank & wallet partners.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(profilePageJsonLd) }],
  }),
  component: HomePage,
});

function HomePage() {
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  // Cluster-balanced Editor's Picks. Naively .slice(0, 6) gave us the 6
  // newest posts, but because the SWIFT cluster has 8 future-dated essays
  // it took ALL the slots — the homepage looked like a single-topic blog.
  // We pick the newest post from each of these 5 priority clusters so the
  // homepage telegraphs topical breadth (cross-border, program, AI,
  // settlement, fraud) within the recruiter's first scan.
  const PICK_ORDER = [
    "Cross-Border Payments",
    "Program Management",
    "AI in Fintech",
    "Settlement & Reconciliation",
    "Fraud & Risk",
    "Payment Infrastructure",
  ] as const;
  const editorsPicked: typeof posts = [];
  for (const cat of PICK_ORDER) {
    const next = posts.find((p) => p.category === cat && !editorsPicked.includes(p));
    if (next) editorsPicked.push(next);
    if (editorsPicked.length === 6) break;
  }
  // Backfill from the newest list if a category had no post.
  for (const p of posts) {
    if (editorsPicked.length >= 6) break;
    if (!editorsPicked.includes(p)) editorsPicked.push(p);
  }
  const featuredCases = caseStudies.slice(0, 3);

  // Hot topics map directly to blog filter URLs (?hub=...)
  const CATEGORY_TO_HUB: Record<string, string> = {
    "Cross-Border Payments": "cross-border-payments",
    "Fraud & Risk": "fraud-aml",
    "Merchant Onboarding": "merchant-onboarding",
    "Payment Infrastructure": "payment-infrastructure",
    "Settlement & Reconciliation": "settlement-reconciliation",
    "Emerging Markets": "emerging-markets",
    "Product Strategy": "",
  };
  const hotTopics = categories
    .filter((c) => CATEGORY_TO_HUB[c])
    .map((cat) => ({
      name: cat,
      hub: CATEGORY_TO_HUB[cat],
      count: posts.filter((p) => p.category === cat).length,
    }));

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Higgsfield-generated brand backdrop — flowing cyan network mesh on
            deep charcoal. Sits behind everything, low opacity so it never
            competes with the portrait or text. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/hero-bg.webp"
            alt=""
            aria-hidden="true"
            width={2400}
            height={1350}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-50"
          />
          {/* Light tint over the backdrop so the page background colour shows
              through. Keeps the hero feeling like the rest of the site. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--background) 60%, transparent) 0%, color-mix(in oklab, var(--background) 90%, transparent) 100%)",
            }}
          />
        </div>
        {/* Brand-cyan accent glows — kept on top of the backdrop for depth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-50 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand) 26%, transparent), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/4 right-[-140px] h-[460px] w-[460px] rounded-full opacity-35 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand) 20%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-4 md:pt-7 pb-6 md:pb-10 grid lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* LEFT — 58% (7/12). Narrative + proof. */}
          <div className="lg:col-span-7 order-1 relative z-10 min-w-0">
            <div className="inline-flex items-center gap-4 mb-3 md:mb-4">
              <span className="h-px w-10 bg-[var(--brand)]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Introduction · I'm Rizwan
              </span>
            </div>

            <h1 className="font-instrument tracking-tight leading-[1.05] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-ink">
              Product &amp; Program Executive Scaling{" "}
              <span className="italic text-[var(--brand)]">Fintech Infrastructure</span> in Complex
              Markets
            </h1>

            <p className="mt-3.5 md:mt-4 max-w-xl text-[15px] md:text-base text-ink-soft leading-relaxed">
              I build payment rails where market complexity and scale collide. As CPO at Simpaisa in
              Dubai, I helped scale infrastructure across{" "}
              <span className="text-ink font-medium">7 markets</span>,{" "}
              <span className="text-ink font-medium">$1B+ GTV</span>,{" "}
              <span className="text-ink font-medium">25M+ monthly transactions</span> and{" "}
              <span className="text-ink font-medium">50+ bank, wallet &amp; FI</span> partners.
            </p>

            {/* Proof row — compact tiles. Mobile: 2×2, desktop: 1×4. */}
            <div className="mt-4 md:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              {(
                [
                  { value: "$1B+", label: "GTV" },
                  { value: "25M+", label: "Monthly tx" },
                  { value: "7", label: "Markets" },
                  { value: "50+", label: "Bank & wallet" },
                ] as const
              ).map((m) => (
                <div key={m.label} className="rounded-lg border border-rule bg-card px-2.5 py-2">
                  <div className="font-mono-tech text-xl text-ink leading-none">
                    <AnimatedMetric value={m.value} />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-1 font-mono-tech leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Certification trust line — small mono-caps. */}
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              <span className="opacity-70">Certified:</span> <span className="text-ink">PMP</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">PMI-ACP</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">CSPO</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">CSM</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">COBIT 5</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">ITIL</span>
            </p>

            {/* CTAs — visible in first viewport. Primary uses text-background
                (cream/white) on bg-ink so contrast is unambiguous. The earlier
                text-[var(--brand-foreground)] resolved to the SAME dark colour
                as bg-ink in light mode, making the label invisible. */}
            <div className="mt-4 md:mt-5 flex flex-col sm:flex-row sm:items-center gap-2.5">
              <Link
                to="/product-work"
                onClick={() => ctaClick("see_case_studies", "hero", "/product-work")}
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base text-background bg-ink hover:bg-[var(--brand)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                See case studies
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
              <a
                href={profile.resumeHref}
                download
                onClick={() => {
                  ctaClick("download_resume", "hero", profile.resumeHref);
                  resumeDownload("hero");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base text-ink border border-ink/20 hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                Download resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => ctaClick("email_me", "hero", `mailto:${profile.email}`)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base text-ink border border-ink/20 hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                Email me
              </a>
            </div>

            {/* Used-by — small trust strip directly under the CTAs.
                Wording is intentionally precise: the platforms below are
                enterprise customers of the Simpaisa infrastructure I helped
                scale, not direct projects I owned end-to-end. */}
            <p className="mt-3 text-[10px] text-ink-soft font-mono-tech uppercase tracking-[0.18em] leading-relaxed">
              <span className="opacity-70">Infrastructure used by enterprise platforms incl.</span>{" "}
              <span className="text-ink">TikTok</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">Uber</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">Temu</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">MoneyGram</span>
              <span className="opacity-40 mx-1">·</span>
              <span className="text-ink">InDrive</span>
            </p>
          </div>

          {/* RIGHT — 42% (5/12). Portrait + premium depth backdrop. */}
          <div className="lg:col-span-5 order-2 relative min-w-0">
            <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[330px] lg:max-w-[400px] aspect-[4/5]">
              {/* Subtle depth: soft radial wash behind the portrait. Inset so
                  it can't touch the column edges and clip awkwardly. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-4 inset-y-8 -z-10 rounded-[40%] blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 75%)",
                }}
              />
              {/* Thin brand ring behind the portrait — premium framing without
                  a hard card edge. Slow breathing animation gives the hero a
                  pulse without distracting the viewer. */}
              <div
                aria-hidden
                className="hero-ring-breathe pointer-events-none absolute inset-2 -z-10 rounded-[36%]"
                style={{
                  border: "1px solid color-mix(in oklab, var(--brand) 40%, transparent)",
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--brand) 10%, transparent), 0 0 40px 4px color-mix(in oklab, var(--brand) 15%, transparent)",
                }}
              />

              <picture>
                <source
                  type="image/webp"
                  srcSet={`${portraitWebpSmall} 460w, ${portraitWebp} 920w`}
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px"
                />
                <img
                  src={portraitPng}
                  alt="Portrait of Rizwan Zafar, Chief Product Officer, Payments"
                  width={920}
                  height={1150}
                  loading="eager"
                  decoding="async"
                  {...({ fetchpriority: "high" } as any)}
                  className="relative z-10 h-full w-full object-contain object-bottom"
                />
              </picture>

              {/* Dubai tag — anchored to the top-right of the portrait box,
                  inset so it doesn't float off the column edge. */}
              <div className="absolute top-2 right-2 z-20 bg-card border border-rule px-2.5 py-1 text-[10px] tracking-[0.22em] font-bold uppercase text-ink font-mono-tech shadow-sm">
                Dubai · UAE
              </div>

              {/* Decorative accents — positioned at the portrait box's EDGES
                  so they never overlap the face. Each carries a CSS-only
                  ease-in-out animation; prefers-reduced-motion: reduce
                  suppresses all of them. */}
              {(
                [
                  // 3 pluses around the edges
                  {
                    type: "plus",
                    top: "-2%",
                    left: "94%",
                    size: "text-4xl md:text-5xl",
                    color: "text-[var(--brand)]",
                    anim: "hero-float-a",
                  },
                  {
                    type: "plus",
                    top: "60%",
                    left: "-4%",
                    size: "text-3xl md:text-4xl",
                    color: "text-[var(--brand)]/80",
                    anim: "hero-float-b",
                  },
                  {
                    type: "plus",
                    top: "98%",
                    left: "92%",
                    size: "text-3xl md:text-4xl",
                    color: "text-[var(--brand)]",
                    anim: "hero-float-a",
                  },
                  // 2 dots for rhythm
                  {
                    type: "dot",
                    top: "14%",
                    left: "-3%",
                    size: "h-2.5 w-2.5",
                    color: "bg-[var(--brand)]",
                    anim: "hero-glow-a",
                  },
                  {
                    type: "dot",
                    top: "92%",
                    left: "44%",
                    size: "h-3 w-3",
                    color: "bg-[var(--brand)]",
                    anim: "hero-glow-b",
                  },
                ] as const
              ).map((g, i) =>
                g.type === "plus" ? (
                  <span
                    key={i}
                    aria-hidden
                    className={`absolute z-20 font-light leading-none select-none ${g.size} ${g.color} ${g.anim}`}
                    style={{ top: g.top, left: g.left }}
                  >
                    +
                  </span>
                ) : (
                  <span
                    key={i}
                    aria-hidden
                    className={`absolute z-20 rounded-full ${g.size} ${g.color} ${g.anim}`}
                    style={{ top: g.top, left: g.left }}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* ============ HOT TOPICS, horizontal cards ============ */}
        <div className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-3xl border border-rule bg-card p-6 md:p-8 grid md:grid-cols-12 gap-6 items-start">
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
                  search={{ q: "", hub: t.hub, reader: "", company: "" }}
                  className="group relative overflow-hidden rounded-2xl aspect-square sm:aspect-[5/4] lg:aspect-[4/5] p-3 sm:p-4 flex flex-col justify-end text-background border border-rule bg-ink hover:-translate-y-1 transition-all duration-300"
                  style={{
                    backgroundImage: `radial-gradient(${80 + (i % 3) * 30}% 70% at ${(i * 30) % 100}% ${(i * 40) % 100}%, color-mix(in oklab, var(--brand) ${20 + (i % 3) * 8}%, transparent), transparent 65%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 bg-noise opacity-25 mix-blend-overlay"
                    aria-hidden
                  />
                  {/* Oversized post-count numeral as second-read art (different
                      per card) — gives the row visual variance instead of
                      6 identical gradient rectangles. */}
                  <div
                    aria-hidden
                    className="absolute -top-4 -right-2 font-instrument italic text-background/12 text-[110px] sm:text-[140px] leading-none select-none pointer-events-none tabular-nums"
                  >
                    {String(t.count).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="font-instrument text-base sm:text-lg leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] mt-1 opacity-80">
                      {t.count} {t.count === 1 ? "article" : "articles"} · Filter →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS, built & building ============ */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-4">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Products
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02] max-w-3xl">
                Products I have built, and products I am{" "}
                <span className="italic text-[var(--brand)]">building.</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group"
            >
              All products <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Homepage shows only PROVEN products. The coming-soon items
              (Felo App, Job Hunt) live at /products in the full pipeline view —
              on the executive scan path they read as off-narrative noise. */}
          <div className="grid md:grid-cols-2 gap-5">
            {products
              .filter((p) => p.status === "shipped-scaled")
              .map((p) => {
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
                ◆ Editor's picks
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02]">
                The posts I'd read <span className="italic text-[var(--brand)]">first.</span>
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group"
            >
              All posts <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Big featured + small list (magazine layout) */}
          <div className="grid lg:grid-cols-12 gap-8">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group lg:col-span-7 block"
            >
              {/* Magazine cover treatment — uses the post's own title at hero
                  scale as the artwork, not a generic gradient placeholder. */}
              <div
                className="aspect-[16/10] rounded-3xl border border-rule mb-5 relative overflow-hidden bg-ink"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 80% at 100% 0%, color-mix(in oklab, var(--brand) 45%, transparent), transparent 60%), radial-gradient(80% 60% at 0% 100%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%)",
                }}
              >
                <div
                  className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"
                  aria-hidden
                />
                {/* Top-left category chip */}
                <div className="absolute top-5 left-5 text-[10px] font-mono-tech uppercase tracking-[0.22em] text-background/95 bg-background/20 rounded-full px-3 py-1 border border-background/15">
                  ◆ Featured · {featuredPost.category}
                </div>
                {/* Bottom-left: oversized issue numeral as second-read moment */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 -left-2 font-instrument italic text-background/8 text-[180px] md:text-[260px] leading-none select-none pointer-events-none"
                >
                  №01
                </div>
                {/* Bottom-right: the post title in display serif, magazine-cover scale */}
                <div className="absolute bottom-5 right-5 max-w-[78%] text-right">
                  <div className="font-instrument italic text-background/95 leading-[0.95] text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    {featuredPost.title.length > 60
                      ? featuredPost.title.slice(0, 58) + "…"
                      : featuredPost.title}
                  </div>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-background/70 font-mono-tech">
                    {featuredPost.readingTime} · Read essay →
                  </div>
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

      {/* ============ ABOUT BAND, sticker style ============ */}
      <section className="relative border-y border-rule bg-surface-2/60">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            <div
              className="rounded-3xl p-8 text-background relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--brand) 80%, var(--ink)), color-mix(in oklab, var(--ink) 90%, var(--brand)))",
              }}
            >
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] opacity-80">
                ◆ About me
              </div>
              <div className="font-instrument text-3xl mt-3 leading-tight">
                14+ years.
                <br />
                $1B+ GTV.
                <br />7 markets.
              </div>
              <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm group">
                My story <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-instrument text-2xl md:text-[34px] text-ink leading-[1.25]">
              Before payments, I learned reliability in systems where failure had real consequences.
              That operating discipline now shapes how I build financial infrastructure:{" "}
              <span className="italic text-[var(--brand)]">
                controlled, scalable, auditable, and resilient.
              </span>
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.metrics.slice(0, 4).map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <div className="rounded-2xl border border-rule bg-card p-4 h-full">
                    <div className="font-mono-tech text-xl text-ink">
                      <AnimatedMetric value={m.value} />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-1 font-mono-tech">
                      {m.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCT WORK, selected cases ============ */}
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
            <Link
              to="/product-work"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group"
            >
              All case studies{" "}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredCases.map((c, i) => {
              // Pull the strongest stat from the case study for the card "art"
              const heroStat = c.metrics?.[0];
              return (
                <Reveal key={c.slug} delay={i * 120}>
                  <Link
                    to="/product-work/$slug"
                    params={{ slug: c.slug }}
                    className="group relative rounded-3xl border border-rule bg-card p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_25px_50px_-25px_color-mix(in_oklab,var(--brand)_50%,transparent)] flex flex-col h-full"
                  >
                    {/* Card hero: Higgsfield-generated brand-coherent thumb
                        with the strongest metric overlaid in display serif. */}
                    <div className="aspect-[5/3] rounded-2xl mb-5 relative overflow-hidden bg-ink">
                      <img
                        src={caseStudyThumb(c.slug)}
                        alt={c.imageAlt ?? `${c.title} — abstract editorial illustration`}
                        width={800}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {/* Dark gradient overlay so the stat reads cleanly. */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, color-mix(in oklab, #000 30%, transparent) 0%, transparent 35%, color-mix(in oklab, #000 70%, transparent) 100%)",
                        }}
                      />
                      <div className="absolute top-3 left-4 z-10 font-mono-tech text-[10px] tracking-[0.18em] text-background/95 uppercase">
                        ◆ Case study /0{i + 1}
                      </div>
                      {heroStat && (
                        <div className="absolute inset-x-0 bottom-3 z-10 flex flex-col items-center text-center px-4 pointer-events-none">
                          <div className="font-instrument italic text-background text-4xl md:text-5xl leading-none tracking-tight drop-shadow-lg">
                            {heroStat.value}
                          </div>
                          <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-background/80 font-mono-tech">
                            {heroStat.label}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]">
                      {c.category}
                    </span>
                    <h3 className="font-instrument text-xl text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-2 leading-relaxed flex-1">{c.tagline}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MARQUEE, ecosystem ============ */}
      <section
        className="marquee-wrap border-y border-rule bg-surface overflow-hidden py-6 md:py-7 w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-inset"
        aria-label="Partner ecosystem, scrolling. Hover or focus to pause."
        tabIndex={0}
      >
        <div className="flex gap-12 marquee-track whitespace-nowrap w-max">
          {[...profile.partners, ...profile.partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-instrument text-xl sm:text-2xl md:text-4xl text-ink/70 tracking-tight inline-flex items-center gap-12"
            >
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
            ◆ Get in touch
          </div>
          <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
            Hire me or just <span className="italic text-[var(--brand)]">say hello.</span>
          </h2>
          <p className="text-ink-soft mt-5 max-w-xl mx-auto">
            Open to senior Product &amp; Program roles in fintech and payment infrastructure, Visa,
            Mastercard, Stripe, Wise, Adyen, Thunes, DLocal, Checkout.com, Rapyd and regional
            fintechs. Replies within 24 hours, Sun–Thu (GST).
          </p>
          <div className="mt-9 mx-auto max-w-md rounded-2xl sm:rounded-full border border-rule bg-card p-2 sm:p-1.5 sm:pl-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm text-ink-soft font-mono-tech truncate min-w-0 px-2 sm:px-0">
              {profile.email}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="sm:ml-auto inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--brand-foreground)] bg-[var(--brand)] hover:opacity-90 transition whitespace-nowrap"
            >
              Reach me <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
