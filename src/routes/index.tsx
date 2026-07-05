import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { caseStudies, caseStudyThumb } from "@/data/caseStudies";
// publishedPosts, not posts: the homepage must never surface a future-dated
// drip essay (raw `posts` made the featured slot and counts drip-leaky).
import { publishedPosts as posts, categories } from "@/data/posts";
import { products } from "@/data/products";
import { absUrl, SITE_URL } from "@/lib/seo";
import { ctaClick, siteSearch } from "@/lib/analytics";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { Reveal } from "@/components/motion/Reveal";
import {
  homeSectionsCss,
  ProofBand,
  IndustryPillars,
  CredentialsStrip,
  GetInTouchBand,
} from "@/components/home/homeSections";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import portraitPng from "@/assets/rizwan-zafar-cutout.png";
import portraitWebp from "@/assets/rizwan-zafar-cutout.webp";
import portraitWebpSmall from "@/assets/rizwan-zafar-cutout-460.webp";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  // Reference the canonical #person node (defined in __root.tsx, emitted
  // site-wide) by @id instead of forking a second Person entity.
  mainEntity: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
};

const heroScrambleScript = `
(() => {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+";
  const nodes = document.querySelectorAll("[data-text-scramble]");
  const scramble = (node, delay = 0) => {
    const finalText = node.getAttribute("data-text-scramble") || node.textContent || "";
    const letters = Array.from(finalText);
    const duration = 560;
    window.setTimeout(() => {
      const startedAt = performance.now();
      const timer = window.setInterval(() => {
        const progress = Math.min((performance.now() - startedAt) / duration, 1);
        const revealed = Math.floor(progress * (letters.length + 1));
        node.textContent = letters
          .map((char, index) => {
            if (char === " ") return char;
            if (index < revealed) return char;
            return alphabet[Math.floor(Math.random() * alphabet.length)] || char;
          })
          .join("");
        if (progress >= 1) {
          window.clearInterval(timer);
          node.textContent = finalText;
        }
      }, 38);
    }, delay);
  };

  nodes.forEach((node, index) => {
    scramble(node, 260 + index * 90);
    node.addEventListener("mouseenter", () => scramble(node));
    node.addEventListener("focus", () => scramble(node));
  });
})();
`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rizwan Zafar | Payments & Product Executive, Frontier Markets" },
      {
        name: "description",
        content:
          "Product & program executive operating since 2009 across ten markets. Today I run payments moving $1B+ a year for 150+ global merchants.",
      },
      {
        property: "og:title",
        content: "Rizwan Zafar — Payments & Product Infrastructure for Frontier Markets",
      },
      {
        property: "og:description",
        content:
          "I build payment and product infrastructure for the markets most operators avoid. Simpaisa platform: $1B+ a year, 150+ global merchants including TikTok, Samsung, Shein and Uber.",
      },
      { property: "og:url", content: absUrl("/") },
      { property: "og:type", content: "profile" },
      {
        name: "twitter:title",
        content: "Rizwan Zafar — Payments & Product Infrastructure for Frontier Markets",
      },
      {
        name: "twitter:description",
        content:
          "Payment infrastructure for the markets most operators avoid. Simpaisa platform: $1B+ a year, 270M+ payments a year, 150+ merchants.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: portraitWebpSmall,
        // Match the <picture> selection so retina screens don't fetch both
        // the 460w preload AND the 920w display asset.
        imageSrcSet: `${portraitWebpSmall} 460w, ${portraitWebp} 920w`,
        imageSizes: "(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px",
        type: "image/webp",
        fetchPriority: "high",
      },
      { rel: "canonical", href: absUrl("/") },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(profilePageJsonLd) },
      { children: heroScrambleScript },
    ],
  }),
  component: HomePage,
});

// Deterministic string hash (djb2) — seeds the Editor's Picks rotation so a
// given date + 8-hour slot always renders the same board (reproducible
// builds, no Math.random in SSG output).
function pickSeed(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

// Client half of the picks rotation: sets the active 8-hour slot on the side
// list so the CSS below reveals that slot's alternates. Runs without
// hydration (same inline-script pattern as the rest of the site); no-JS
// visitors keep the build-time slot.
const picksRotationScript = `!function(){try{var s=Math.floor(new Date().getUTCHours()/8);var el=document.querySelector("[data-picks-list]");if(el)el.setAttribute("data-pick-slot",String(s))}catch(e){}}();`;

const picksRotationCss = `
[data-picks-list] [data-pick-alt]{display:none}
[data-picks-list][data-pick-slot="0"] [data-pick-alt="0"],
[data-picks-list][data-pick-slot="1"] [data-pick-alt="1"],
[data-picks-list][data-pick-slot="2"] [data-pick-alt="2"]{display:grid}
`;

function HomePage() {
  // ── Dynamic Editor's Picks ─────────────────────────────────────────────
  // The board refreshes 2-3× per day with zero frameworks, via two layers:
  //  1. BUILD-TIME seeded rotation — the site rebuilds at least twice a day
  //     (daily publish run + the 23:30 UTC cron), and the seed (UTC date +
  //     8-hour slot) rotates the featured essay and each cluster's pick.
  //  2. CLIENT slot rotation — each side-list slot server-renders its 3
  //     rotation candidates (data-pick-alt 0/1/2); a 1-line inline script
  //     flips the visible alternate per 8-hour UTC window between builds.
  // Cluster balance is kept from the earlier fix (one pick per priority
  // cluster so a hot news cluster can't take the whole board), and the
  // cluster list deliberately spans payments AND the product/program
  // management lanes so the board always reflects all three practices.
  const dayStamp = new Date().toISOString().slice(0, 10);
  const buildSlot = Math.floor(new Date().getUTCHours() / 8); // 0 | 1 | 2
  const featuredPool = posts.filter((p) => p.featured);
  const featuredPost = featuredPool.length
    ? featuredPool[pickSeed(`${dayStamp}:${buildSlot}:featured`) % featuredPool.length]
    : posts[0];
  const PICK_ORDER = [
    "Cross-Border Payments",
    "Product Management",
    "Program Management",
    "AI in Fintech",
    "Settlement & Reconciliation",
    "Fraud & Risk",
    "Payment Infrastructure",
    "Product Strategy",
  ] as const;
  // One slot per cluster (first five clusters with content), each carrying
  // its 3 most-recent published essays as rotation alternates, phase-shifted
  // by the build seed.
  const sidePicks: { key: string; alts: typeof posts }[] = [];
  for (const cat of PICK_ORDER) {
    if (sidePicks.length === 5) break;
    const candidates = posts
      .filter((p) => p.category === cat && p.slug !== featuredPost.slug)
      .slice(0, 3);
    if (!candidates.length) continue;
    const start = pickSeed(`${dayStamp}:${buildSlot}:${cat}`) % candidates.length;
    sidePicks.push({
      key: cat,
      alts: [0, 1, 2].map((i) => candidates[(start + i) % candidates.length]),
    });
  }
  // Backfill from the newest list if fewer than 5 clusters had a post.
  for (const p of posts) {
    if (sidePicks.length >= 5) break;
    if (p.slug !== featuredPost.slug && !sidePicks.some((s) => s.alts[0].slug === p.slug)) {
      sidePicks.push({ key: p.slug, alts: [p, p, p] });
    }
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
    <div className="home-page">
      {/* Route-scoped CSS for the brand-rebuild sections (proof band, pillars,
          map strip). Inlined per the site's JS-less/no-styles.css-edit rule. */}
      <style dangerouslySetInnerHTML={{ __html: homeSectionsCss }} />
      {/* ============ HERO ============ */}
      <section className="home-signal-field relative overflow-hidden border-b border-rule">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-7 md:pt-9 pb-8 md:pb-12 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT — 58% (7/12). Narrative + proof. */}
          <div className="home-soft-reveal lg:col-span-7 order-1 relative z-10 min-w-0">
            <div className="inline-flex items-center gap-4 mb-3 md:mb-4">
              <span className="home-rule-animate h-px w-10 bg-[var(--brand)]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Payments · Product · Frontier Markets
              </span>
            </div>

            <h1 className="font-instrument tracking-tight leading-[1.06] text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] text-ink">
              {/* sr-only spaces keep the H1 extracting as readable text for
                  screen readers and AI crawlers — block spans alone concatenate
                  words (same fix as the resume H1). */}
              <span className="block">
                I build payment and product infrastructure<span className="sr-only"> </span>
              </span>
              <span className="block">
                for the markets most operators{" "}
                <span
                  className="text-scramble italic text-[var(--brand)]"
                  data-text-scramble="avoid."
                  tabIndex={0}
                >
                  avoid.
                </span>
              </span>
            </h1>

            {/* Two-tier safe: sentence 1 carries only career-scope markers
                ("since 2009", "ten markets"); sentence 2 carries only platform
                metrics ("$1B+", "150+ merchants"). The full stop between them is
                a clause boundary for the seo-audit gate — do not merge. */}
            <p className="mt-3.5 md:mt-4 max-w-xl text-[15px] md:text-base text-ink-soft leading-relaxed">
              Product &amp; program executive, operating{" "}
              <span className="text-ink font-medium">since 2009</span> — ten markets across MENA and
              South Asia, from Daraz&rsquo;s marketplaces to Tapmad&rsquo;s streaming business to
              Simpaisa&rsquo;s cross-border gateway. Today I run payments moving{" "}
              <span className="text-ink font-medium">$1B+ a year</span> for{" "}
              <span className="text-ink font-medium">150+ global merchants</span> including TikTok,
              Samsung, Shein and Uber.
            </p>

            {/* CTAs — visible in first viewport. Primary uses text-background
                on bg-ink so contrast is unambiguous. Tertiary pill reuses the
                exact data-analytics-* attributes of the site's booking CTA. */}
            <div className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5">
              <Link
                to="/product-work"
                data-analytics-event="cta_click"
                data-analytics-cta-id="see_case_studies"
                data-analytics-cta-location="hero"
                data-analytics-cta-destination="/product-work"
                onClick={() => ctaClick("see_case_studies", "hero", "/product-work")}
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base text-background bg-ink hover:bg-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                See the work
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
              {/* Journey CTA: no typed ctaClick() call because the analytics
                  CtaId union has no journey id and that lib is out of scope to
                  extend. The DOM bridge in __root.tsx fires cta_click from the
                  data-analytics-* attributes below, so tracking still works. */}
              <Link
                to="/journey"
                data-analytics-event="cta_click"
                data-analytics-cta-id="the_journey"
                data-analytics-cta-location="hero"
                data-analytics-cta-destination="/journey"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base text-ink border border-ink/20 hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                The 17-year journey
              </Link>
              <a
                href="/contact/#book"
                data-analytics-event="cta_click"
                data-analytics-cta-id="book_intro_call"
                data-analytics-cta-location="hero"
                data-analytics-cta-destination="/contact/#book"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--brand-foreground)] bg-[var(--brand)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
              >
                Book a 15-min call <span aria-hidden>→</span>
              </a>
            </div>

            {/* Certification trust line — small mono-caps. */}
            <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech leading-relaxed">
              <span className="opacity-70">Certified:</span> <span className="text-ink">PMP</span>
              <span className="opacity-40">·</span>
              <span className="text-ink">PMI-ACP</span>
              <span className="opacity-40">·</span>
              <span className="text-ink">CSPO</span>
              <span className="opacity-40">·</span>
              <span className="text-ink">CSM</span>
              <span className="opacity-40">·</span>
              <span className="text-ink">COBIT 5</span>
              <span className="opacity-40">·</span>
              <span className="text-ink">ITIL</span>
            </p>

            <form
              action="/blog/"
              method="get"
              role="search"
              data-analytics-event="site_search"
              data-analytics-search-location="home"
              onSubmit={(event) => {
                const q = new FormData(event.currentTarget).get("q");
                siteSearch(typeof q === "string" ? q : "", "home");
              }}
              className="home-search-panel mt-3 max-w-xl rounded-lg border border-rule bg-card/90 p-2 flex flex-col sm:flex-row gap-2"
              style={{ "--motion-delay": "180ms" } as CSSProperties}
            >
              <label htmlFor="home-blog-search" className="sr-only">
                Search payments essays
              </label>
              <input
                id="home-blog-search"
                name="q"
                type="search"
                placeholder="Search SWIFT, reconciliation, KYB..."
                className="min-w-0 flex-1 rounded-md border border-transparent bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-[var(--brand)]"
              />
              <button
                type="submit"
                className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-background hover:bg-[var(--brand)] transition-colors"
              >
                Search essays
              </button>
            </form>
          </div>

          {/* RIGHT — 42% (5/12). Portrait + premium depth backdrop. */}
          <div
            className="home-soft-reveal lg:col-span-5 order-2 relative min-w-0"
            style={{ "--motion-delay": "120ms" } as CSSProperties}
          >
            <div className="home-portrait-frame relative mx-auto w-full max-w-[260px] sm:max-w-[330px] lg:max-w-[400px] aspect-[4/5]">
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
                  fetchPriority="high"
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
                  // Thin ticks for rhythm, avoiding decorative blobs.
                  {
                    type: "tick",
                    top: "14%",
                    left: "-3%",
                    size: "h-px w-10",
                    color: "bg-[var(--brand)]",
                    anim: "hero-glow-a",
                  },
                  {
                    type: "tick",
                    top: "92%",
                    left: "44%",
                    size: "h-px w-12",
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
                    className={`absolute z-20 ${g.size} ${g.color} ${g.anim}`}
                    style={{ top: g.top, left: g.left }}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* ============ HOT TOPICS, horizontal cards ============ */}
        <div className="relative mx-auto max-w-6xl px-6 pb-14">
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div
              className="home-soft-reveal md:col-span-4"
              style={{ "--motion-delay": "180ms" } as CSSProperties}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Hot topics
              </div>
              <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-tight">
                Search the payments knowledge base.
              </h2>
              <p className="text-xs text-ink-soft mt-2">
                Essays across payment infrastructure, settlement, risk, SWIFT, onboarding and
                complex-market execution.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotTopics.map((t, i) => (
                <Link
                  key={t.name}
                  to="/topics/$hub"
                  params={{ hub: t.hub }}
                  className="home-topic-card group relative overflow-hidden rounded-lg min-h-[132px] p-4 flex flex-col justify-between border border-rule bg-card text-ink"
                  style={{ "--motion-delay": `${220 + i * 45}ms` } as CSSProperties}
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-[var(--brand)]" aria-hidden />
                  <div
                    aria-hidden
                    className="absolute -top-5 -right-2 font-instrument italic text-[var(--brand)]/10 text-[110px] leading-none select-none pointer-events-none tabular-nums"
                  >
                    {String(t.count).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="font-instrument text-lg leading-tight group-hover:text-[var(--brand)] transition-colors">
                      {t.name}
                    </div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] mt-1 text-ink-soft">
                      {t.count} {t.count === 1 ? "article" : "articles"} · Explore →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ B. PROOF BAND ============ */}
      <ProofBand />

      {/* ============ D. INDUSTRY PILLARS ============ */}
      {/* Homepage map strip (doc §4C) removed per owner call 2026-07-06 —
          the map lives on /journey only now. MapStrip component kept in
          homeSections.tsx in case this gets revisited. */}
      <IndustryPillars />

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
                    className="home-card group block bg-surface border border-rule rounded-lg p-7"
                  >
                    {CardInner}
                  </Link>
                ) : (
                  <a
                    key={p.slug}
                    href={p.link}
                    className="home-card group block bg-surface border border-rule rounded-lg p-7"
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
                ◆ Editor's picks · rotates through the day
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
                className="aspect-[16/10] rounded-lg border border-rule mb-5 relative overflow-hidden bg-ink"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, color-mix(in oklab, var(--brand) 68%, var(--ink)) 0%, var(--ink) 46%, color-mix(in oklab, var(--rule) 12%, var(--ink)) 100%)",
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

            <div
              className="lg:col-span-5 flex flex-col divide-y divide-rule"
              data-picks-list
              data-pick-slot={buildSlot}
            >
              <style dangerouslySetInnerHTML={{ __html: picksRotationCss }} />
              {sidePicks.map((slot, i) => (
                // min-height pins the slot geometry so client-side alternate
                // swaps (different title lengths) can't reflow the section.
                <div key={slot.key} className="py-5 first:pt-0 min-h-[104px]">
                  {slot.alts.map((p, a) => (
                    <Link
                      key={`${p.slug}-${a}`}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      data-pick-alt={a}
                      className="group grid grid-cols-[auto_1fr] gap-4 items-start"
                    >
                      <div className="font-instrument text-3xl text-[var(--brand)] leading-none w-10">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                          {p.category} · {p.readingTime}
                        </div>
                        <h4 className="font-instrument text-lg text-ink mt-1.5 leading-snug line-clamp-2 group-hover:text-[var(--brand)] transition-colors">
                          {p.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
              <script dangerouslySetInnerHTML={{ __html: picksRotationScript }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT BAND, sticker style ============ */}
      <section className="relative border-y border-rule bg-surface-2/60">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            <div
              className="home-card rounded-lg p-8 text-background relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--brand) 80%, var(--ink)), color-mix(in oklab, var(--ink) 90%, var(--brand)))",
              }}
            >
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] opacity-80">
                ◆ About me
              </div>
              {/* Career-scope only, each on its own line (two-tier clean). The
                  platform "$1B+" appears below in the band prose in its own
                  sentence, never joined to a career marker in one clause. */}
              <div className="font-instrument text-3xl mt-3 leading-tight">
                Since {profile.career.startYear}.
                <br />
                {profile.career.marketCount} markets.
                <br />
                {profile.career.industryCount} industries.
              </div>
              <Link to="/resume" className="mt-6 inline-flex items-center gap-1.5 text-sm group">
                View resume{" "}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-instrument text-2xl md:text-[34px] text-ink leading-[1.25]">
              Before payments, I learned reliability in systems where failure had real consequences.
              That operating discipline now shapes how I build financial infrastructure:{" "}
              <span className="italic text-[var(--brand)]">
                controlled, scalable, auditable, and resilient.
              </span>{" "}
              At Simpaisa today that platform moves $1B+ a year.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.metrics.slice(0, 4).map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <div className="home-card rounded-lg border border-rule bg-card p-4 h-full">
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
                    className="home-card group relative rounded-lg border border-rule bg-card p-6 flex flex-col h-full"
                  >
                    {/* Card hero: Higgsfield-generated brand-coherent thumb
                        with the strongest metric overlaid in display serif. */}
                    <div className="aspect-[5/3] rounded-md mb-5 relative overflow-hidden bg-ink">
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

      {/* ============ G. CREDENTIALS STRIP ============ */}
      <CredentialsStrip />

      {/* ============ J. LOGO MARQUEE, ecosystem ============ */}
      {/* Borrowed-authority heading: these are merchants served by the
          platforms Rizwan has led, not personal clients — the wording keeps
          that distinction honest. */}
      <div className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-8 pb-1">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Ecosystem
          </div>
          <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-2 leading-tight">
            Merchants served by platforms I&rsquo;ve led.
          </h2>
        </div>
      </div>
      <section
        className="marquee-wrap border-b border-rule bg-surface overflow-hidden py-6 md:py-7 w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-inset"
        aria-label="Partner ecosystem, scrolling. Hover or focus to pause."
        tabIndex={0}
      >
        <div className="flex gap-12 marquee-track whitespace-nowrap w-max">
          {[...profile.partners, ...profile.partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              // The second half is a visual loop duplicate — hide it from
              // screen readers so the brand list isn't announced twice.
              aria-hidden={i >= profile.partners.length || undefined}
              className="font-instrument text-xl sm:text-2xl md:text-4xl text-ink/70 tracking-tight inline-flex items-center gap-12"
            >
              {p}
              <span className="text-[var(--brand)]">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ============ I. GET-IN-TOUCH BAND (audience router) ============ */}
      <GetInTouchBand />

      {/* Owned-audience surface — the newsletter the "Building?" card points to.
          Kept as the shared NewsletterSignup so the Web3Forms wiring and the
          newsletter_signup analytics event stay consistent site-wide. */}
      <div className="mx-auto max-w-3xl px-5 sm:px-6 pb-24">
        <NewsletterSignup placement="home_get_in_touch" fromPage="/" />
      </div>
    </div>
  );
}
