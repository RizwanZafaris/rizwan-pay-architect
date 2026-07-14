import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { profile } from "@/data/profile";
import { PLATFORM } from "@/content/facts";
import { BookingSection } from "@/components/BookingSection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { absUrl, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

// Advisory / consulting landing page — the client-intent counterpart to the
// recruiter-facing /hire page (which stays noindex + paid-only).
//
// Unlike /hire this page IS indexable and IS in the sitemap: founders and
// payment leaders discover consultants through organic + AI search, and the
// 8 client-intent essay CTAs ("work with Rizwan") now land here instead of
// on the recruiter pitch.
//
// DUAL-TRACK RULE: the owner is still open to senior full-time roles. This
// page ADDS the advisory track — it must never imply the employment track is
// closed (see the final FAQ entry, which addresses it head-on).
//
// FACTS: every number on this page comes from src/data/caseStudies.ts /
// src/data/profile.ts (canonical: 150+ merchants, $1B+ annual GTV, 270M+
// payments a year, computed career years, +3.4pts auth uplift, 38%→73% frictionless
// 3DS2, 92% CoF token coverage, 7.2pt Click-to-Pay lift, 60% AML
// false-positive cut, 99.95% settlement SLA). Do not introduce numbers,
// clients or testimonials that are not in those files. The merchant strip is
// borrowed-authority framing (platform relationships, NOT advisory clients)
// and must keep saying so.
//
// NO PRICES on this page (owner decision) — every offer converts to a scoping
// call via the shared inline cal.com embed (#book, ref consulting_inline_embed).

const proofMetrics = [
  { value: PLATFORM.gtv, label: "Annual GTV" },
  { value: PLATFORM.annualPayments, label: "Payments a year" },
  { value: PLATFORM.merchants, label: "Merchants" },
  { value: PLATFORM.settlementSla, label: "Settlement SLA" },
  { value: `${profile.career.years}`, label: "Years in payments & delivery" },
] as const;

// Enterprise platforms that ran on payment infrastructure Rizwan built and
// operated (see profile.partners) — platform relationships, not advisory
// clients. The visible framing below must keep that distinction explicit.
const merchantNames = profile.partners.slice(0, 5);

type Offer = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  scope: string[];
  proof: { label: string; href?: string }[];
};

// Three productized offers, each grounded in a real case study from
// src/data/caseStudies.ts and linking to it as proof.
const offers: Offer[] = [
  {
    id: "payment-performance-audit",
    eyebrow: "Fixed scope · 2–3 weeks",
    title: "Payment Performance Audit",
    description:
      "A fixed-scope diagnostic of where your payment stack leaks revenue: authorization rates, routing and retry logic, and 3DS2 step-up strategy. You get a prioritised findings report with the expected value per fix and a sequenced remediation plan your team can execute.",
    scope: [
      "Authorization-rate and decline-code diagnosis, by issuer, BIN and segment",
      "Routing, retry and dunning logic review against per-rail economics",
      "3DS2 step-up strategy: frictionless, data-only / 3RI and exemption posture",
    ],
    proof: [
      {
        label: `+14% authorization uplift across a ${PLATFORM.gtv} GTV platform`,
        href: "/product-work/simpaisa-payment-infrastructure/",
      },
      {
        label: "97% payment success at 90% straight-through processing",
        href: "/product-work/simpaisa-payment-infrastructure/",
      },
    ],
  },
  {
    id: "payments-advisory-retainer",
    eyebrow: "Monthly · founders & payment leaders",
    title: "Payments Advisory Retainer",
    description:
      "Standing monthly advisory for founders and payment leaders who need operator judgement on tap: PSP and orchestration selection, market entry in frontier markets, scheme compliance, and settlement / reconciliation design — before the decisions harden into contracts.",
    scope: [
      "PSP / orchestration selection and commercial negotiation posture",
      "Market entry across frontier and emerging markets: rails, licensing, partners",
      "Scheme compliance, settlement windows and reconciliation design",
    ],
    proof: [
      {
        label: `${PLATFORM.settlementSla} reconciliation accuracy at ${PLATFORM.gtv} GTV`,
        href: "/product-work/settlement-reconciliation/",
      },
      {
        label: `${PLATFORM.marketCount}-market pay-in, payout and cross-border infrastructure`,
        href: "/product-work/cross-border-corridors-fx/",
      },
    ],
  },
  {
    id: "ai-delivery-advisory",
    eyebrow: "Practical · production-grounded",
    title: "AI Delivery Advisory",
    description:
      "Practical AI-agent adoption for product and delivery organisations: use-case selection and value modelling, governance that survives regulated environments, and the operating cadence to actually ship. Grounded in AI systems I run in production myself — including the multi-agent automation behind my own delivery work — not slideware.",
    scope: [
      "Use-case identification and value modelling: ROI, feasibility, data readiness",
      "Governance for regulated orgs: audit trails, human fallback, kill-switches",
      "Team enablement: agent workflows your product and delivery org keeps",
    ],
    proof: [
      {
        label: "3 production GenAI systems + 1 regulated banking pilot",
        href: "/product-work/simpaisa-ai-solutions-suite/",
      },
    ],
  },
];

const engagementSteps = [
  {
    step: "01",
    title: "Scoping call",
    text: "15 minutes, no pitch. We establish whether the problem is a fit, what good looks like, and what data or access the work needs. Book it directly on this page.",
  },
  {
    step: "02",
    title: "Fixed-scope proposal",
    text: "A written scope within days: deliverables, timeline, price and what I need from your team. No open-ended discovery billing — you know what you are buying before you commit.",
  },
  {
    step: "03",
    title: "Weekly working cadence",
    text: "A weekly working session with async access in between. Findings land as working documents your team keeps — the goal is a capability transfer, not a dependency.",
  },
] as const;

const faqs = [
  {
    question: "What size are engagements?",
    answer:
      "The Payment Performance Audit is fixed-scope at two to three weeks. Advisory retainers run monthly with a quarterly review point, so neither side is locked in. Larger delivery programmes are scoped case-by-case, usually after a diagnostic has established the baseline.",
  },
  {
    question: "Do you work remotely and across time zones?",
    answer:
      "Yes. I am based in Dubai (GST, UTC+4), which overlaps cleanly with Europe, MENA and South Asia working hours, and with US East Coast mornings. Engagements run async-first with a weekly live working session, so time-zone distance is a scheduling detail, not a blocker.",
  },
  {
    question: "How do you handle confidentiality and NDAs?",
    answer:
      "An NDA is signed before any material changes hands — I work under client paper or provide a mutual template. Published advisory case studies on this site are anonymised (client confidential) and any future write-up of your engagement follows the same rule: nothing is published without written approval.",
  },
  {
    question: "How do you use AI in delivery?",
    answer:
      "As leverage, with governance. I run three production GenAI systems in regulated payments across merchant integration support, incident escalation and partner support, plus a fraud/AML banking pilot. I also use agent-assisted analysis and drafting in engagements, with every output human-verified before it reaches you. Client data is never put into public model training.",
  },
  {
    question: "What is the difference between advisory and hiring you full-time?",
    answer:
      "Both paths are open — I remain open to senior full-time product and program roles alongside advisory work. Advisory fits when you have a defined payments or delivery problem and need operator judgement now, without a headcount decision. If the conversation is about a full-time mandate, start from the resume page instead. Either way, the first step is the same 15-minute call.",
  },
] as const;

const consultingJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${absUrl("/consulting")}#service`,
  name: "Rizwan Zafar — Payments & Product Advisory",
  url: absUrl("/consulting"),
  description: `Independent payments and product advisory: fixed-scope payment performance audits, monthly payments advisory retainers and AI delivery advisory, led by an operator who scaled ${PLATFORM.gtv} annual GTV and ${PLATFORM.annualPayments} payments a year across frontier markets.`,
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: profile.name,
    url: SITE_URL,
  },
  areaServed: ["AE", "SA", "MENA", "South Asia", "GB", "EU", "Remote / global"],
  serviceType: [
    "Payment performance audit",
    "Authorization rate optimisation",
    "3DS2 step-up strategy",
    "Payments advisory retainer",
    "PSP and orchestration selection",
    "Settlement and reconciliation design",
    "Frontier-market payments entry",
    "AI delivery advisory",
  ],
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
};

const consultingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absUrl("/consulting")}#faqpage`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

// Print guard for the engine-staggered KPI grid: the global @media print rules
// reset [class*="reveal"] / [class*="motion"] but not [data-rz-stagger]
// children, whose hidden pre-reveal state lives in next.css.
const consultingPageCss = `
@media print {
  .consulting-page [data-rz-stagger] > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
@media (prefers-reduced-motion: reduce) {
  .consulting-page .consulting-primary-cta {
    transform: none !important;
    transition: none !important;
  }
}
`;

const primaryCtaClass =
  "consulting-primary-cta inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-8 py-4 text-base font-medium shadow-sm transition duration-200 hover:bg-brand hover:text-[var(--brand-foreground)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2";

const cardCtaClass =
  "inline-flex items-center gap-2 rounded-full bg-ink text-background px-4 py-2.5 text-sm font-medium transition duration-200 hover:bg-brand hover:text-[var(--brand-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2";

export const Route = createFileRoute("/consulting")({
  head: () => ({
    meta: [
      // PARKED until 2026-10-02 (owner decision 2026-07-04): the advisory
      // surface exists for direct sharing but must not draw or redirect any
      // traffic for 90 days — noindex + out of the sitemap (same treatment
      // as /hire) + no internal links point here. To re-launch: remove this
      // robots tag, restore the /consulting sitemap entry, nav/footer links
      // and the essay-CTA repoints (see docs/strategy/ audit, Positioning).
      { name: "robots", content: "noindex, follow" },
      { title: "Payments & Product Advisory | Rizwan Zafar" },
      {
        name: "description",
        content: `Independent payments & product advisory from an operator who scaled ${PLATFORM.gtv} GTV and ${PLATFORM.annualPayments} payments a year. Audits, retainers, AI delivery. Dubai, remote-friendly.`,
      },
      { property: "og:title", content: "Payments & Product Advisory — Rizwan Zafar" },
      {
        property: "og:description",
        content: `Payment performance audits, payments advisory retainers and AI delivery advisory — operator-led, grounded in ${PLATFORM.gtv} GTV production work.`,
      },
      { property: "og:url", content: absUrl("/consulting") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:alt", content: "Rizwan Zafar, Payments & Product Advisory" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Payments & Product Advisory — Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Payment performance audits, advisory retainers and AI delivery advisory from a payments operator. Dubai · remote-friendly.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: absUrl("/consulting") },
      // The inline booking embed loads embed.js + the booker iframe from
      // app.cal.com — warm the connection while the visitor reads the offers.
      { rel: "preconnect", href: "https://app.cal.com" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(consultingJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(consultingFaqJsonLd) },
    ],
  }),
  component: ConsultingPage,
});

function ConsultingPage() {
  const calendarUrl = profile.calendarUrl;
  return (
    <div className="consulting-page mx-auto max-w-5xl px-5 sm:px-6 py-16 md:py-24">
      <style dangerouslySetInnerHTML={{ __html: consultingPageCss }} />
      {/* Hero — client intent, single action */}
      <section className="text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Independent · operator-led · for founders and payment leaders
        </div>
        <h1 className="font-instrument text-[clamp(2.25rem,4vw,3.5rem)] text-ink mt-5 leading-[1.08] max-w-3xl mx-auto">
          Payments &amp; Product Advisory
        </h1>
        <p className="mt-5 text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
          I&apos;m {profile.name}. I&apos;ve scaled payment infrastructure to{" "}
          <span className="text-ink font-medium">{PLATFORM.gtv} annual GTV</span>,{" "}
          {PLATFORM.annualPayments} payments a year and {PLATFORM.merchants} merchants across
          frontier markets — as the operator, not the observer. I take a small number of advisory
          engagements alongside that work. Dubai (GST) &middot; remote-friendly.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href="#book"
            data-analytics-event="cta_click"
            data-analytics-cta-id="book_scoping_call"
            data-analytics-cta-location="consulting_hero"
            data-analytics-cta-destination="#book"
            className={primaryCtaClass}
          >
            <CalendarDays aria-hidden="true" className="h-5 w-5" />
            Book a scoping call
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <p className="text-sm text-ink-soft">
            15 minutes, no pitch &mdash; just whether the problem is a fit. Booking happens right on
            this page.
          </p>
        </div>
      </section>

      {/* Three productized offers */}
      <section className="mt-16" aria-labelledby="offers-heading">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ What I take on
          </div>
          <h2 id="offers-heading" className="font-instrument text-2xl md:text-3xl text-ink mt-3">
            Three ways to engage
          </h2>
          <p className="mt-2 text-sm text-ink-soft max-w-xl mx-auto">
            Every offer is grounded in a published case study — the proof links below go to the
            actual work.
          </p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="flex flex-col rounded-lg border border-rule bg-card p-6"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                {offer.eyebrow}
              </div>
              <h3 className="font-instrument text-xl text-ink mt-2 leading-snug">{offer.title}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{offer.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {offer.scope.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-rule pt-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Proof
                </div>
                <ul className="mt-2 space-y-1.5">
                  {offer.proof.map((proof) =>
                    proof.href ? (
                      <li key={proof.label}>
                        {/* Plain <a> with trailing slash — canonical form, no 301 hop
                            (same pattern as the essay-footer CTA links). */}
                        <a
                          href={proof.href}
                          data-analytics-event="cta_click"
                          data-analytics-cta-id="consulting_proof"
                          data-analytics-cta-location={`consulting_offer_${offer.id}`}
                          data-analytics-cta-destination={proof.href}
                          className="text-sm text-ink underline-offset-4 hover:underline hover:text-[var(--brand)] transition-colors"
                        >
                          {proof.label} →
                        </a>
                      </li>
                    ) : (
                      <li key={proof.label} className="text-sm text-ink">
                        {proof.label}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="mt-6 pt-1 mt-auto">
                <a
                  href="#book"
                  data-analytics-event="cta_click"
                  data-analytics-cta-id="book_scoping_call"
                  data-analytics-cta-location={`consulting_offer_${offer.id}`}
                  data-analytics-cta-destination="#book"
                  className={cardCtaClass}
                >
                  Book a scoping call
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How an engagement works */}
      <section className="mt-16" aria-labelledby="engagement-heading">
        <div className="text-center">
          <h2 id="engagement-heading" className="font-instrument text-2xl md:text-3xl text-ink">
            How an engagement works
          </h2>
        </div>
        <div className="mt-7 grid md:grid-cols-3 gap-4">
          {engagementSteps.map((s) => (
            <div key={s.step} className="rounded-lg border border-rule bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center bg-ink text-background text-xs font-semibold">
                  {s.step}
                </span>
                <h3 className="font-display text-base text-ink">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof strip — verified platform-scale figures + borrowed-authority
          merchant strip. Framing matters: these are merchants served by
          platforms Rizwan led as an operator, NOT advisory clients. */}
      <section className="mt-16" aria-label="Proof points">
        {/* Flat bordered KPI tiles, mono tabular-nums, engine-staggered with a
            single beam on this page's first ruled band. */}
        <div
          data-rz-stagger
          className="rz-beam relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {proofMetrics.map((m) => (
            <div key={m.label} className="border border-rule bg-surface px-4 py-3 text-center">
              <div className="font-mono-tech text-xl md:text-2xl text-ink leading-none tabular-nums">
                {m.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-rule bg-surface px-6 py-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Merchants served by platforms I&apos;ve led
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {merchantNames.map((name) => (
              <span key={name} className="font-instrument text-xl md:text-2xl text-ink/70">
                {name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            Enterprise platforms that ran on payment infrastructure I built and operated — platform
            relationships, not advisory clients.
          </p>
        </div>
      </section>

      {/* FAQ — native <details>, works with zero JS in the static build.
          Mirrored into FAQPage JSON-LD above. */}
      <section className="mt-16" aria-labelledby="faq-heading">
        <div className="text-center">
          <h2 id="faq-heading" className="font-instrument text-2xl md:text-3xl text-ink">
            Common questions
          </h2>
        </div>
        <div className="mt-7 space-y-3 max-w-3xl mx-auto">
          {faqs.map((f) => (
            <details key={f.question} className="group rounded-lg border border-rule bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-ink">
                {f.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Here about a full-time mandate instead?{" "}
          <Link to="/resume" className="text-ink underline-offset-4 hover:underline">
            Start from the resume
          </Link>{" "}
          — I remain open to senior product &amp; program roles.
        </p>
      </section>

      {/* Inline booking — the conversion moment stays on rzifi.com. Eager:
          converting a scoping call is this page's purpose. */}
      <BookingSection
        refName="consulting_inline_embed"
        fallbackLocation="consulting_embed_fallback"
        calendarUrl={calendarUrl}
        eager
      />

      {/* Not ready to book — low-commitment capture keeps the lead. */}
      <NewsletterSignup placement="consulting_page" fromPage="/consulting" className="mt-14" />
    </div>
  );
}
