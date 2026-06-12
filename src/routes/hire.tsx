import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { BookingSection } from "@/components/BookingSection";
import { absUrl, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

// Dedicated, conversion-focused PAID landing page.
//
// The LinkedIn paid-social campaigns point their destination URL here (with their
// own UTMs). Google Ads keeps using the full /resume page. This page is intentionally
// NOT in the sitemap and ships `robots: noindex` so it never competes with the
// indexable /resume page in organic search — it exists purely to convert paid
// LinkedIn recruiter traffic into a booked call.
//
// Positioning shows a deliberate BALANCE between Product leadership and Program /
// PMO leadership (the two-lane section below). All figures are the VERIFIED canonical
// fact base — do not reintroduce the older inflated framings (7 markets, 25M monthly,
// 50+ partners).
//
// Tracking is inherited from the site shell (GTM/GA4/Google Ads/LinkedIn Insight
// tags live in __root.tsx). The `book_intro_call` CTA maps to the `schedule_meeting`
// event → Google Ads "Book appointment" (Primary) conversion + GA4 key event. The
// LinkedIn link auto-fires `linkedin_click` (Secondary).
//
// This route renders with CampaignHeader/CampaignFooter (no site nav — paid
// clicks shouldn't leak into the blog). The inline calendarCampaignParamsScript
// in __root.tsx appends the landing URL's UTMs/click-ids + a ref per placement
// to every cal.com link at load time (the static build never hydrates React).
//
// Booking is INLINE (shared <BookingSection/> renders the #book embed):
// both CTAs smooth-scroll there instead of redirecting, so the visitor never
// leaves the page at the conversion moment. Cal's bookingSuccessful event fires
// the GA4 `book_call_confirmed` event — the true booked-call conversion. A
// plain cal.com fallback link stays under the embed (and in <noscript>) for
// blocked-iframe/no-JS visitors; the link rewriter above still decorates it.

const proofMetrics = [
  { value: "$1B+", label: "Annual GTV" },
  { value: "270M+", label: "Payments a year" },
  { value: "99.95%", label: "Settlement SLA" },
  { value: "12", label: "Squads led" },
  { value: "40+", label: "Engineers led" },
] as const;

const productPoints = [
  "Payment infrastructure end-to-end: cross-border corridors, card acquiring (MPGS / MDES), wallets, DCB, settlement, FX",
  "Pay-in & payout rails on one API; merchant onboarding, KYC / KYB, fraud, AML / CFT",
  "Product strategy → roadmap → P&L ownership across 5 regulated frontier markets",
] as const;

const programPoints = [
  "Built the PMO and delivery methodology from scratch; ran 12 cross-functional squads",
  "SteerCo & board governance, RAID logs, OKRs, RICE/MoSCoW; $5M+ budget, 15+ vendors",
  "Led PCI-DSS L1 & ISO 27001 certification programs — both audited without findings",
  "Dual CPO + acting CTO in 2024; shipped 4 market launches; 14+ years delivery",
] as const;

const hireJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Book an intro call with Rizwan Zafar, Product & Program Executive",
  url: absUrl("/hire"),
  description:
    "Book a 15-minute intro call with Rizwan Zafar, CPO at Simpaisa - a payments product and program executive open to senior product, program and PMO roles.",
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: profile.name,
    jobTitle: "Product & Program Executive, Payments",
    url: SITE_URL,
  },
};

const primaryCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-8 py-4 text-base font-medium shadow-sm transition duration-200 hover:bg-brand hover:text-[var(--brand-foreground)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2";

const secondaryActionClass =
  "inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 text-sm font-medium text-ink transition duration-200 hover:border-ink/40 hover:bg-ink/[0.03] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Book a 15-min call | Rizwan Zafar, Product & Program Exec" },
      {
        name: "description",
        content:
          "Hiring a payments product & program leader? Book a 15-minute intro call with Rizwan Zafar - $1B+ GTV, 270M+ payments a year, 5 frontier markets, MIT Sloan.",
      },
      // Paid landing page — keep it out of organic search so it never competes
      // with the indexable /resume page.
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Book a 15-min intro call with Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Hiring a payments product & program leader? Book a 15-minute intro call - no pitch, just whether there's a fit for your role.",
      },
      { property: "og:url", content: absUrl("/hire") },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:alt", content: "Rizwan Zafar, Product & Program Executive" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book a 15-min intro call with Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Hiring a payments product & program leader? Book a 15-min intro call - $1B+ GTV, 270M+ payments a year, PMO at scale, MIT Sloan.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: absUrl("/hire") },
      // The inline booking embed loads embed.js + the booker iframe from
      // app.cal.com — warm the connection while the visitor reads the hero.
      { rel: "preconnect", href: "https://app.cal.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(hireJsonLd) }],
  }),
  component: HirePage,
});

function HirePage() {
  // Bare cal.com URL for the under-embed fallback link; the inline campaign
  // script rewrites it with UTMs/click-ids + ref at load time. The embed
  // itself forwards the same params via Cal.config.forwardQueryParams.
  const calendarUrl = profile.calendarUrl;
  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-6 py-16 md:py-24">
      {/* Hero — single intent, single action */}
      <section className="text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
          For hiring teams in payments, fintech &amp; financial institutions
        </div>
        <h1 className="font-instrument text-3xl sm:text-4xl md:text-5xl text-ink mt-5 leading-[1.08] max-w-3xl mx-auto">
          Hiring a payments product and program leader who&apos;s scaled $1B+ in frontier and
          emerging markets?
        </h1>
        <p className="mt-5 text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
          I&apos;m {profile.name}, CPO at Simpaisa. I pair payments{" "}
          <span className="text-ink font-medium">product</span> leadership &mdash; 270M+ payments a
          year across 5 regulated markets &mdash; with the{" "}
          <span className="text-ink font-medium">program &amp; PMO</span> discipline that delivers
          it: multi-squad execution, SteerCo governance, vendor management and PCI-DSS / ISO 27001
          programs run from scratch. MIT Sloan &middot; Dubai &middot; open globally.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href="#book"
            data-analytics-event="cta_click"
            data-analytics-cta-id="book_intro_call"
            data-analytics-cta-location="hire_hero"
            data-analytics-cta-destination="#book"
            className={primaryCtaClass}
          >
            <CalendarDays aria-hidden="true" className="h-5 w-5" />
            Book a 15-min intro call
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <p className="text-sm text-ink-soft">
            15 minutes, no pitch &mdash; just whether there&apos;s a fit for your role. Booking
            happens right on this page.
          </p>
        </div>
      </section>

      {/* Proof strip — verified figures spanning product scale + delivery leadership */}
      <section className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {proofMetrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-rule bg-surface px-4 py-3 text-center"
          >
            <div className="font-instrument text-xl md:text-2xl text-ink leading-none">
              {m.value}
            </div>
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-tight">
              {m.label}
            </div>
          </div>
        ))}
      </section>

      {/* Best-fit roles — both lanes */}
      <p className="mt-11 text-center text-base md:text-lg text-ink leading-relaxed max-w-3xl mx-auto">
        Best fit: VP / Director / Head of Product, Payments &middot; Program Director / Head of PMO
        &middot; Technical Program Manager &middot; Director, Digital Transformation. Open to UAE,
        KSA, Singapore, MENA and global roles.
      </p>

      {/* The balance: two equal lanes */}
      <section className="mt-7 grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-rule bg-card p-6">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
            Product leadership
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {productPoints.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-rule bg-card p-6">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
            Program &amp; PMO leadership
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {programPoints.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inline booking — the conversion moment stays on rzifi.com. */}
      <BookingSection
        refName="hire_inline_embed"
        fallbackLocation="hire_embed_fallback"
        calendarUrl={calendarUrl}
      />

      {/* Repeat CTA + de-emphasised secondary paths */}
      <section className="mt-12 text-center">
        <a
          href="#book"
          data-analytics-event="cta_click"
          data-analytics-cta-id="book_intro_call"
          data-analytics-cta-location="hire_footer"
          data-analytics-cta-destination="#book"
          className={primaryCtaClass}
        >
          <CalendarDays aria-hidden="true" className="h-5 w-5" />
          Book a 15-min intro call
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>

        <div className="mt-7 flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
            Prefer to connect first?
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className={secondaryActionClass}
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              View LinkedIn profile
            </a>
            <Link to="/product-work" className={secondaryActionClass}>
              View case studies
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-rule pt-6 max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Certifications
          </div>
          <p className="mt-2 text-xs text-ink-soft leading-relaxed">
            MIT Sloan &middot; PMP &middot; PMI-ACP &middot; CSPO &middot; CSM &middot; COBIT 5
            &middot; ITIL v3 &middot; Led PCI-DSS L1 &amp; ISO/IEC 27001 from scratch &mdash; both
            audited without findings.
          </p>
        </div>
      </section>

    </div>
  );
}
