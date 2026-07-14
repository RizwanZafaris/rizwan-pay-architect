import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { CAREER, PLATFORM, MERCHANT_ROSTER } from "@/content/facts";
import { caseStudies, caseStudyThumb } from "@/data/caseStudies";
// publishedPosts, not posts: the homepage must never surface a future-dated
// drip essay (raw `posts` made the featured slot and counts drip-leaky).
import { publishedPosts as posts, categories } from "@/data/posts";
import { products } from "@/data/products";
import { HOW_I_WORK_FAQS } from "@/data/homeFaqs";
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
  HowIWorkFaq,
} from "@/components/home/homeSections";
import {
  RailsMapDiagram,
  OnboardingFlowDiagram,
  ReconciliationFlowDiagram,
} from "@/components/diagrams/Diagrams";
import { RevealHeading } from "@/components/RevealHeading";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CorridorHome } from "@/components/home/CorridorHome";
import portraitPng from "@/assets/rizwan-zafar-cutout.png";
import portraitWebp from "@/assets/rizwan-zafar-cutout.webp";
import portraitWebpSmall from "@/assets/rizwan-zafar-cutout-460.webp";

/* ONE source of truth for the hero portrait's `sizes`, used by BOTH the
   <source sizes> and the <link rel=preload imageSizes>.

   They used to disagree — preload said "…440px", the picture said
   "(max-width: 1024px) 44vw, 40vw". At 1440px those resolve to 440px and 576px,
   which select DIFFERENT srcset candidates, so the browser downloaded the 460w
   AND the 920w file on every homepage load. The comment above the preload
   claimed it prevented exactly that.

   The values track the real rendered box: the portrait is height-driven
   (70svh at lg) and the asset ratio is 0.8056, so its width is roughly half the
   viewport height. It is hidden below lg so tablet copy owns the composition;
   compact laptops use 44vw and wider screens settle at 36vw. */
const PORTRAIT_SIZES = "(max-width: 639px) 74vw, (max-width: 1023px) 52vw, 42vw";
// Kept for the legacy homepage implementation below; the active CorridorHome
// serves the portrait at every breakpoint.
const PORTRAIT_MEDIA = "(min-width: 1024px)";

/* A `display: none` <img> is still fetched. The portrait is `hidden` below lg,
   so phones and tablets should not download the 460w cut-out for an image that
   is never painted. Suppressing the preload is not enough — the element itself
   has to resolve to something free below the breakpoint.

   When a <source media> matches, the browser uses it and never touches the
   <img src> fallback. So the first source hands phones a 1x1 transparent GIF:
   zero network bytes, no layout consequence (the element is display:none). */
const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  // Reference the canonical #person node (defined in __root.tsx, emitted
  // site-wide) by @id instead of forking a second Person entity.
  mainEntity: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
};

// FAQPage schema for the "How I work" section — generated from the SAME
// HOW_I_WORK_FAQS array that renders the accordion, so the structured data and
// the visible answers cannot drift. Answers trace to the verified fact base.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOW_I_WORK_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rizwan Zafar | Payments Product & Program Executive" },
      {
        name: "description",
        content: `Rizwan Zafar is a Dubai payments executive. Across ${profile.career.years} years, he has scaled regulated platforms; Simpaisa processes ${PLATFORM.gtv} annual GTV and ${PLATFORM.annualPayments} payments a year.`,
      },
      {
        property: "og:title",
        content: "Rizwan Zafar — Payments Product & Program Executive",
      },
      {
        property: "og:description",
        content: `I scale regulated payment infrastructure across complex markets. Simpaisa platform: ${PLATFORM.gtv} annual GTV, ${PLATFORM.annualPayments} payments a year and ${PLATFORM.merchants} merchants.`,
      },
      { property: "og:url", content: absUrl("/") },
      { property: "og:type", content: "profile" },
      {
        name: "twitter:title",
        content: "Rizwan Zafar — Payments Product & Program Executive",
      },
      {
        name: "twitter:description",
        content: `I scale regulated payment infrastructure across complex markets. Simpaisa platform: ${PLATFORM.gtv} annual GTV, ${PLATFORM.annualPayments} payments a year, ${PLATFORM.merchants} merchants.`,
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: portraitWebpSmall,
        // imageSizes MUST be byte-identical to the <picture>'s `sizes`, or the
        // preload and the display element resolve to different srcset
        // candidates and the browser downloads both. Hence the shared constant.
        imageSrcSet: `${portraitWebpSmall} 460w, ${portraitWebp} 920w`,
        imageSizes: PORTRAIT_SIZES,
        type: "image/webp",
        fetchPriority: "high",
      },
      { rel: "canonical", href: absUrl("/") },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(profilePageJsonLd) }],
  }),
  component: CorridorHome,
});

// Deterministic string hash (djb2) — seeds the Editor's Picks rotation so a
// given date + 8-hour slot always renders the same board (reproducible
// builds, no Math.random in SSG output).
function pickSeed(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

const picksRotationScript = `!function(){try{var s=Math.floor(new Date().getUTCHours()/8);var el=document.querySelector("[data-picks-list]");if(el)el.setAttribute("data-pick-slot",String(s))}catch(e){}}();`;

const picksRotationCss = `
[data-picks-list] [data-pick-alt]{display:none}
[data-picks-list][data-pick-slot="0"] [data-pick-alt="0"],
[data-picks-list][data-pick-slot="1"] [data-pick-alt="1"],
[data-picks-list][data-pick-slot="2"] [data-pick-alt="2"]{display:grid}
`;

// Real architecture drawings, one per featured case. These SVGs are the
// artefacts of the work (named rails, named partners, real flows) and had been
// sitting unused in the repo while generated abstract art fronted the homepage.
const CASE_DIAGRAMS: Record<string, () => React.JSX.Element> = {
  "simpaisa-payment-infrastructure": RailsMapDiagram,
  "merchant-onboarding-kyc": OnboardingFlowDiagram,
  "settlement-reconciliation": ReconciliationFlowDiagram,
};

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
  // One-line editorial descriptions (ISSUE-011) — neutral summaries of what
  // each cluster covers. No metrics, no claims (two-tier gate + no-fabrication
  // guardrail): these describe the TOPIC, never the operator's numbers.
  const TOPIC_BLURBS: Record<string, string> = {
    "Cross-Border Payments":
      "Corridors, correspondent rails, FX and settlement finality — from the operator side.",
    "Fraud & Risk":
      "Fraud controls, chargebacks, sanctions screening and AML/CFT — risk versus conversion.",
    "Merchant Onboarding":
      "KYC/KYB, risk tiering and pricing — the mechanics of taking a merchant live.",
    "Payment Infrastructure":
      "Acquiring, routing, retries and tokenisation — the plumbing under every payment.",
    "Settlement & Reconciliation":
      "Settlement cycles, ledgers and break investigation — keeping books and money in sync.",
    "Emerging Markets":
      "Fragmented rails, local payment methods and regulation — where standard playbooks run out.",
  };
  const hotTopics = categories
    .filter((c) => CATEGORY_TO_HUB[c])
    .map((cat) => ({
      name: cat,
      hub: CATEGORY_TO_HUB[cat],
      count: posts.filter((p) => p.category === cat).length,
      blurb: TOPIC_BLURBS[cat] ?? "",
    }));

  return (
    <div className="home-page">
      {/* Route-scoped CSS for the brand-rebuild sections (proof band, pillars,
          map strip). Inlined per the site's JS-less/no-styles.css-edit rule. */}
      <style dangerouslySetInnerHTML={{ __html: homeSectionsCss }} />
      {/* ============ HERO ============ */}
      <section className="home-signal-field relative overflow-hidden border-b border-rule">
        {/* Hero stage: a restrained CSS/SVG signal field keeps the opening
            visually alive without pointer-tracking or continuous WebGL work. */}
        <div className="relative overflow-hidden">
          {/* Payment-rail field — now a full-bleed stage layer (v2 monument
            hero): faint circuit routes with cyan pulses travelling them,
            scaled-and-cropped by preserveAspectRatio slice. The pulses'
            offset-paths in hero-next.css use viewBox units, so they scale
            with the SVG untouched. Under the portrait and scrim. */}
          <div
            aria-hidden="true"
            className="rz-rail-field pointer-events-none absolute inset-0 z-0"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 520 640"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
            >
              <path
                className="rz-rail"
                strokeOpacity={0.12}
                d="M -24 128 H 168 Q 178 128 178 138 V 356 Q 178 366 188 366 H 544"
              />
              <path
                className="rz-rail"
                strokeOpacity={0.08}
                d="M 64 -24 V 186 Q 64 196 74 196 H 306 Q 316 196 316 206 V 664"
              />
              <path
                className="rz-rail"
                strokeOpacity={0.14}
                d="M 544 84 H 396 Q 386 84 386 94 V 258 Q 386 268 376 268 H 128 Q 118 268 118 278 V 664"
              />
              <path
                className="rz-rail"
                strokeOpacity={0.1}
                d="M -24 492 H 246 Q 256 492 256 482 V 336 Q 256 326 266 326 H 544"
              />
              <path
                className="rz-rail"
                strokeOpacity={0.06}
                d="M 442 -24 V 142 Q 442 152 452 152 H 544"
              />
              <circle className="rz-rail-node" cx={178} cy={250} r={1.6} />
              <circle className="rz-rail-node" cx={316} cy={330} r={1.6} />
              <circle className="rz-rail-node rz-rail-node-hot" cx={386} cy={176} r={1.8} />
              <circle className="rz-rail-pulse rz-rail-pulse-1" r={2.4} />
              <circle className="rz-rail-pulse rz-rail-pulse-2" r={2.2} />
              <circle className="rz-rail-pulse rz-rail-pulse-3" r={2.4} />
            </svg>
          </div>
          {/* Cinematic scrim — darkens the left/text field, seats the portrait
            into the stage, and fades the base so the monument type stays at
            AA+ everywhere it crosses the portrait. Above portrait (z-[1]),
            below content (z-10). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            /* The legibility scrim behind the monument type. Every stop was a
             hardcoded rgba(10,10,11,...) — the dark page colour — so on a light
             page it painted a black veil over white type. Now derived from
             --paper, so the scrim is whatever the page is. */
            style={{
              background: [
                "linear-gradient(90deg," +
                  " color-mix(in srgb, var(--paper) 90%, transparent) 0%," +
                  " color-mix(in srgb, var(--paper) 62%, transparent) 46%," +
                  " color-mix(in srgb, var(--paper) 22%, transparent) 76%," +
                  " color-mix(in srgb, var(--paper) 5%, transparent) 100%)",
                "linear-gradient(180deg," +
                  " color-mix(in srgb, var(--paper) 40%, transparent) 0%," +
                  " transparent 26%," +
                  " transparent 70%," +
                  " color-mix(in srgb, var(--paper) 85%, transparent) 100%)",
              ].join(", "),
            }}
          />

          {/* Portrait — a cinematic cut-out layer anchored to the stage's bottom
            edge, BEHIND the monument type (z-0, under the scrim). Eager + high
            priority: it is part of the first paint. Hidden below lg, where type
            carries the viewport.

            ALIGNMENT: the outer wrapper repeats the content container's own
            `mx-auto max-w-[1400px] px-…` so the portrait's right edge lands on
            exactly the same x as the headline's right edge. It used to be
            `right-0`, i.e. pinned to the VIEWPORT edge, 20px outside the type
            grid — and because the cut-out carries only ~19px (2%) of
            transparent margin beside the subject, his shoulder sat flush
            against the screen and read as accidentally cropped.

            SIZING: height drives the box (`h-[62svh] w-auto`); the intrinsic
            928x1152 ratio supplies the width. The old `aspect-[4/5]` fought
            both the real 0.8056 ratio (a 5px letterbox) and `max-w-[40vw]`
            (which clamped width, letterboxing again). `max-w-[44vw]` remains
            only as a guard so a short, wide viewport cannot drive the portrait
            into the headline. */}
          <div
            data-hero-portrait
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden lg:block"
          >
            <div className="mx-auto flex max-w-[1400px] justify-end px-5 sm:px-8 lg:px-12">
              <div className="relative h-[62svh] lg:h-[70svh]">
                <div
                  aria-hidden
                  className="rz-glow-par pointer-events-none absolute inset-x-[8%] inset-y-[14%] -z-10 rounded-[45%] blur-3xl opacity-70"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 55% 42%, color-mix(in oklab, var(--brand) 24%, transparent), transparent 74%)",
                  }}
                />
                <picture>
                  {/* Must come first: below lg the portrait is display:none, and a
                    hidden <img> still downloads. This costs 0 bytes. */}
                  <source media="(max-width: 1023px)" srcSet={TRANSPARENT_PIXEL} />
                  <source
                    type="image/webp"
                    media={PORTRAIT_MEDIA}
                    srcSet={`${portraitWebpSmall} 460w, ${portraitWebp} 920w`}
                    sizes={PORTRAIT_SIZES}
                  />
                  <img
                    src={portraitPng}
                    alt="Portrait of Rizwan Zafar, Chief Product Officer, Payments"
                    /* 928x1152 = the real asset. Was 920x1150, whose 0.800 ratio
                     disagreed with the file's 0.8056 and letterboxed the top. */
                    width={928}
                    height={1152}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-auto max-w-[44vw] object-contain object-bottom"
                  />
                </picture>
              </div>
            </div>
          </div>

          {/* ── Monument content: top status rail / full-width H1 / grounded
            subline+CTA row / bottom hairline rail. flex-col justify-between
            fills the 100svh stage. ── */}
          {/* Hero fits one viewport. `justify-between` + min-h:100svh used to
            spread the rows apart, pushing the primary CTA to y=835 — below the
            fold on a 13" MacBook (~710px usable), 1366x768 and 1440x900. The
            rows now stack naturally; the stage still dominates without voids. */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 sm:px-8 lg:px-12 pt-20 md:pt-[5.5rem] pb-6 md:pb-8">
            {/* TOP — status rail: eyebrow left, location + availability right. */}
            <div
              data-hero-in
              style={{ ["--i" as string]: 0 }}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
            >
              <span className="inline-flex items-center gap-4">
                <span className="home-rule-animate h-px w-10 bg-[var(--brand)]" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
                  ◆ <span>Product · Program · Payments</span>
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                <span>Dubai · UAE</span>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  Open to senior roles
                </span>
              </span>
            </div>

            {/* CENTER — the monument. Same sentence, recomposed to four short
              lines so the face can run at 7.4vw full-bleed. sr-only spaces
              keep the H1 extracting as one readable sentence. */}
            <h1 className="font-instrument tracking-[-0.02em] leading-[0.95] text-ink text-[clamp(2.5rem,5.6vw,6.75rem)] py-4">
              {/* Line 1 = LCP anchor. NEVER wrapped/transformed/clipped. */}
              <span className="block">
                I build payment<span className="sr-only"> </span>
              </span>
              <span className="block">
                and product infrastructure<span className="sr-only"> </span>
              </span>
              <span className="block">
                for the markets<span className="sr-only"> </span>
              </span>
              {/* Final line = signature line-mask rise, carries the scramble. */}
              <span className="block rz-line-clip">
                <span className="rz-line-rise">
                  most operators <span className="italic text-[var(--brand)]">avoid.</span>
                </span>
              </span>
            </h1>

            {/* GROUND — subline left, CTAs right, then the hairline rail. */}
            <div>
              <div className="max-w-2xl">
                {/* Two-tier safe: sentence 1 carries only career-scope markers
                  (years of experience, ten markets); sentence 2 carries only
                  platform metrics (PLATFORM.gtv, PLATFORM.merchants). The full
                  stop between them is a clause boundary for the seo-audit gate —
                  do not merge. */}
                <p
                  data-hero-in
                  style={{ ["--i" as string]: 1 }}
                  className="max-w-xl text-[15px] leading-[1.6] text-ink-soft md:text-base lg:max-w-[28rem] xl:max-w-xl"
                >
                  Product &amp; program executive with{" "}
                  <span className="text-ink font-medium">
                    {profile.career.years} years of experience
                  </span>{" "}
                  — {CAREER.marketsWord} markets across MENA and South Asia, from Daraz&rsquo;s
                  marketplaces to Tapmad&rsquo;s streaming business to Simpaisa&rsquo;s cross-border
                  acquiring, payouts &amp; gateway. Today I run payments moving{" "}
                  <span className="text-ink font-medium">{PLATFORM.gtv} a year</span> for{" "}
                  <span className="text-ink font-medium">
                    {PLATFORM.merchants} global merchants
                  </span>{" "}
                  including {MERCHANT_ROSTER.slice(0, -1).join(", ")} and{" "}
                  {MERCHANT_ROSTER[MERCHANT_ROSTER.length - 1]}.
                </p>
                <div
                  data-hero-in
                  style={{ ["--i" as string]: 2 }}
                  className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <Link
                    to="/product-work"
                    data-analytics-event="cta_click"
                    data-analytics-cta-id="see_case_studies"
                    data-analytics-cta-location="hero"
                    data-analytics-cta-destination="/product-work"
                    onClick={() => ctaClick("see_case_studies", "hero", "/product-work")}
                    className="rz-cta-primary group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-medium text-background bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                  >
                    See the work
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </Link>
                  <a
                    href="/contact/#book"
                    data-analytics-event="cta_click"
                    data-analytics-cta-id="book_intro_call"
                    data-analytics-cta-location="hero"
                    data-analytics-cta-destination="/contact/#book"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base text-ink border border-ink/20 hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                  >
                    Book a 15-min intro call
                  </a>
                  {/* Two CTAs, not three. "The 17-year journey" was a third
                    competing choice in the decisive first viewport; /journey is
                    one click away in the nav. Council audit B1 + P2.8. */}
                </div>
              </div>

              {/* Bottom hairline rail: certifications left, scroll cue right.
                Same ◆ mono language; text chips only, no fabricated badges.
                Names trace to profile.certifications. */}
              <div
                data-hero-in
                style={{ ["--i" as string]: 3 }}
                className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule pt-4 md:mt-8"
              >
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                    ◆ Certified
                  </span>
                  <ul
                    className="flex flex-wrap items-center gap-1.5"
                    aria-label="Professional certifications"
                  >
                    {["PMP", "PMI-ACP", "CSPO", "CSM", "COBIT 5", "ITIL"].map((cert) => (
                      <li
                        key={cert}
                        className="inline-flex items-center rounded-full border border-rule bg-card/60 px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-none"
                      >
                        {cert}
                      </li>
                    ))}
                  </ul>
                </span>
                <span
                  aria-hidden
                  className="hidden items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech md:inline-flex"
                >
                  Scroll
                  <span className="rz-scroll-cue text-[var(--brand)]">↓</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ B. PROOF BAND ============ */}
        <ProofBand />

        {/* ============ D. INDUSTRY PILLARS ============ */}
        {/* Homepage map strip (doc §4C) removed per owner call 2026-07-06 —
          the map lives on /journey only now. MapStrip component kept in
          homeSections.tsx in case this gets revisited. */}
        <IndustryPillars />

        {/* ============ PRODUCT WORK, selected cases ============ */}
        <section className="rz-beam">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)]">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                  ◆ Selected work
                </div>
                <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.02]">
                  <RevealHeading lead="Infrastructure shipped" emphasis="at scale." />
                </h2>
              </div>
              <Link
                to="/product-work"
                className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group py-1.5 -my-1.5"
              >
                <span className="rz-link">All case studies</span>{" "}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            {/* V2 monument pass: the 3-up card grid is gone. Each featured
              case is a full-width editorial panel — image field one side,
              display-scale hero metric + title the other, alternating
              direction. Same data, links and rz-unveil image treatment. */}
            <div data-rz-stagger className="flex flex-col gap-14 md:gap-24">
              {featuredCases.map((c, i) => {
                const heroStat = c.metrics?.[0];
                const flip = i % 2 === 1;
                return (
                  <Link
                    key={c.slug}
                    to="/product-work/$slug"
                    params={{ slug: c.slug }}
                    className="group relative grid items-center gap-6 md:grid-cols-12 md:gap-12"
                  >
                    {/* The panel art is the REAL architecture drawing for this
                      case, not decoration. It used to be a generated abstract
                      render (teal wireframes on black) — the single strongest
                      "AI made this" tell on the page, and it proved nothing.
                      These SVGs name actual rails and partners (MPGS/MDES,
                      JazzCash/Easypaisa, 1Link/NIFT, DLocal/Thunes/Boku/Coda).
                      They already existed in the repo, unused. Static SVG, so
                      no hydration and no image request. */}
                    <div
                      className={`rz-unveil relative overflow-hidden rounded-lg border border-rule bg-surface-2/60 md:col-span-7 ${
                        flip ? "md:order-2" : ""
                      }`}
                    >
                      <div className="flex items-baseline justify-between px-4 pt-4 sm:px-5">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[var(--brand)]">
                          ◆ Case study /0{i + 1}
                        </span>
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                          fig.
                        </span>
                      </div>
                      <div className="px-3 pb-5 pt-3 sm:px-5 [&_svg]:h-auto [&_svg]:w-full">
                        {CASE_DIAGRAMS[c.slug]?.() ?? (
                          <img
                            src={caseStudyThumb(c.slug)}
                            alt={c.imageAlt ?? `${c.title} — editorial illustration`}
                            width={800}
                            height={450}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[16/10] w-full rounded object-cover opacity-90"
                          />
                        )}
                      </div>
                    </div>
                    <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                      <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]">
                        {c.category}
                      </span>
                      {heroStat && (
                        <div className="mt-4">
                          <div className="font-instrument italic leading-none tracking-tight text-ink text-5xl md:text-6xl lg:text-7xl">
                            {heroStat.value}
                          </div>
                          <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                            {heroStat.label}
                          </div>
                        </div>
                      )}
                      <h3 className="font-instrument text-2xl md:text-3xl text-ink mt-5 leading-tight transition-colors group-hover:text-[var(--brand)]">
                        {c.title}
                      </h3>
                      <p className="text-sm md:text-[15px] text-ink-soft mt-3 leading-relaxed max-w-md">
                        {c.tagline}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-[var(--brand)]">
                        Read case study
                        <span
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ PRODUCTS, built & building ============ */}
        {/* Press Run 2026-07-08: tinted "signature" ground + more air so this
          featured beat breaks the Pillars→Products→Editor's-Picks paper run,
          and an asymmetric 7/5 spread so the two products read as one editorial
          spread rather than two clones. Cards go bg-card (white) for contrast
          on the tint. No copy change. */}
        {/* One world, one ambient system: the hero's payment rails. The
          infinite-grid backdrop that used to sit here was a second, unrelated
          metaphor (and a 21st.dev port) — removed 2026-07-10 so the rails
          carry the whole page. */}
        <section className="relative bg-surface border-y border-rule rz-beam overflow-hidden">
          <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-sm)]">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                  Products
                </div>
                <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.02] max-w-3xl">
                  <RevealHeading
                    lead="Products I have built, and products I am"
                    emphasis="building."
                  />
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group py-1.5 -my-1.5"
              >
                <span className="rz-link">All products</span>{" "}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Homepage shows only PROVEN products. The coming-soon items
              (Felo App, Job Hunt) live at /products in the full pipeline view —
              on the executive scan path they read as off-narrative noise. */}
            <div className="grid md:grid-cols-12 gap-5">
              {products
                .filter((p) => p.status === "shipped-scaled")
                .map((p, i) => {
                  const isInternal = p.link.startsWith("/");
                  // Asymmetric spread: first (flagship) product takes the wide
                  // 7-col field, the second the narrower 5-col field.
                  const span = i === 0 ? "md:col-span-7" : "md:col-span-5";
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
                      data-glow
                      className={`home-card home-card-lift rz-reveal group relative block bg-card border border-rule rounded-lg p-7 ${span}`}
                    >
                      {CardInner}
                    </Link>
                  ) : (
                    <a
                      key={p.slug}
                      href={p.link}
                      data-glow
                      className={`home-card home-card-lift rz-reveal group relative block bg-card border border-rule rounded-lg p-7 ${span}`}
                    >
                      {CardInner}
                    </a>
                  );
                })}
            </div>
          </div>
        </section>

        {/* ============ J. LOGO MARQUEE, ecosystem ============ */}
        {/* Borrowed-authority heading: these are merchants served by the
          platforms Rizwan has led, not personal clients — the wording keeps
          that distinction honest. */}
        <div className="border-t border-rule bg-surface">
          <Reveal className="mx-auto max-w-6xl px-5 sm:px-6 pt-12 md:pt-16 pb-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              Ecosystem
            </div>
            <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-2 leading-tight">
              Merchants served by platforms I&rsquo;ve led.
            </h2>
          </Reveal>
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

        {/* ============ HOT TOPICS, horizontal cards ============ */}
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-[var(--space-section-md)] pb-14">
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div
              className="home-soft-reveal md:col-span-4"
              style={{ "--motion-delay": "180ms" } as CSSProperties}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                Hot topics
              </div>
              <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-tight">
                Search the payments knowledge base.
              </h2>
              <p className="text-xs text-ink-soft mt-2">
                Essays across payment infrastructure, settlement, risk, SWIFT, onboarding and
                complex-market execution.
              </p>
              {/* Knowledge-base search (ISSUE-008) — relocated from the hero;
                  this section is its real entry point. The role="search" +
                  data-analytics-* bridge attributes travel with it unchanged. */}
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
                className="home-search-panel mt-4 rounded-lg border border-rule bg-card/90 p-2 flex flex-col gap-2"
                style={{ "--motion-delay": "220ms" } as CSSProperties}
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
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotTopics.map((t, i) => (
                <Link
                  key={t.name}
                  to="/topics/$hub"
                  params={{ hub: t.hub }}
                  data-glow
                  className="home-topic-card home-card-lift group relative overflow-hidden rounded-lg min-h-[132px] p-4 flex flex-col justify-between border border-rule bg-card text-ink"
                  style={{ "--motion-delay": `${220 + i * 45}ms` } as CSSProperties}
                >
                  {/* Article-count watermark. Kept fully INSIDE the card and
                      quiet — the old 110px corner numeral spilled past the
                      card edge and dominated the (then-empty) body, which
                      review read as broken. */}
                  <div
                    aria-hidden
                    className="absolute bottom-1 right-3 font-instrument italic text-[var(--brand)]/8 text-[56px] leading-none select-none pointer-events-none tabular-nums"
                  >
                    {String(t.count).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="font-instrument text-lg leading-tight group-hover:text-[var(--brand)] transition-colors">
                      {t.name}
                    </div>
                    {/* One-line editorial summary (ISSUE-011) — what the
                        cluster covers, never a metric or a claim. */}
                    {t.blurb && (
                      <p className="mt-1.5 text-[11px] text-ink-soft leading-snug">{t.blurb}</p>
                    )}
                  </div>
                  <div className="relative text-[10px] font-mono-tech uppercase tracking-[0.18em] mt-3 text-ink-soft">
                    {t.count} {t.count === 1 ? "article" : "articles"} · Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EDITOR'S PICKED ============ */}
      <section className="relative rz-beam">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)]">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                Editor's picks
              </div>
              <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.02]">
                <RevealHeading lead="The posts I'd read" emphasis="first." />
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group py-1.5 -my-1.5"
            >
              <span className="rz-link">All posts</span>{" "}
              <span className="transition-transform group-hover:translate-x-1">→</span>
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
      <section className="relative border-y border-rule bg-surface-2/60 rz-beam">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)] grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            {/* V2 monument pass: the mint gradient card is gone — the career
                scope reads as stacked statement numerals on the open ground. */}
            <div className="rz-reveal">
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[var(--brand)] font-semibold">
                ◆ About me
              </div>
              {/* Career-scope only, each on its own line (two-tier clean). The
                  platform GTV figure appears below in the band prose in its own
                  sentence, never joined to a career marker in one clause. */}
              <div className="font-instrument text-ink mt-5 leading-[1.08] text-[clamp(2.5rem,4.2vw,4rem)]">
                {profile.career.years} <span className="text-ink-soft">years.</span>
                <br />
                {profile.career.marketCount} <span className="text-ink-soft">markets.</span>
                <br />
                {profile.career.industryCount} <span className="text-ink-soft">industries.</span>
              </div>
              {/* py-1.5 keeps the visual gap while growing the hit area to
                  32px (Gate-A 2026-07-08, WCAG 2.5.8). */}
              <Link
                to="/resume"
                className="mt-6 py-1.5 -mb-1.5 inline-flex items-center gap-1.5 text-sm text-ink group"
              >
                <span className="rz-link">View resume</span>{" "}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-instrument text-[26px] md:text-[38px] lg:text-[42px] text-ink leading-[1.22]">
              Before payments, I learned reliability in systems where failure had real consequences.
              That operating discipline now shapes how I build financial infrastructure:{" "}
              <span className="italic text-[var(--brand)]">
                controlled, scalable, auditable, and resilient.
              </span>{" "}
              At Simpaisa today that platform moves {PLATFORM.gtv} a year.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.metrics.slice(0, 4).map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <div className="home-card rz-reveal rounded-lg border border-rule bg-card p-4 h-full">
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

      {/* ============ G. CREDENTIALS STRIP ============ */}
      <CredentialsStrip />

      {/* ============ TESTIMONIALS (renders only with real quotes) ======= */}

      {/* ============ HOW I WORK / FAQ ============ */}
      <HowIWorkFaq />

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
