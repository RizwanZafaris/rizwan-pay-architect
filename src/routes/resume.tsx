import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Download, Linkedin, Mail } from "lucide-react";
import { personSchemaAwards, personSchemaCredentials, profile } from "@/data/profile";
import { absUrl, GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

const resumeKeywords = [
  "Product & Program Executive",
  "fintech infrastructure resume",
  "payments product leader",
  "VP Product payments",
  "Head of Product fintech",
  "Program Director fintech",
  "Technical Program Manager payments",
  "payment infrastructure product management",
  "settlement reconciliation",
  "merchant onboarding KYC KYB",
  "cross-border payments",
  "fraud AML payments",
  "AI in payment operations",
] as const;

const resumeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absUrl("/resume")}#profilepage`,
  name: "Rizwan Zafar Resume, Product & Program Executive",
  url: absUrl("/resume"),
  description:
    "Executive resume for Rizwan Zafar, a Product & Program Executive focused on fintech infrastructure, payments, PMO governance and AI-enabled payment operations.",
  dateModified: "2026-06-05",
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
  primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE_URL, width: 1200, height: 630 },
  about: resumeKeywords,
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    nationality: profile.nationality,
    jobTitle: [
      "Product & Program Executive",
      "Chief Product Officer, Payments",
      "Fintech Infrastructure Product Leader",
    ],
    url: absUrl("/resume"),
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    sameAs: profile.entitySameAs,
    worksFor: { "@type": "Organization", name: "Simpaisa", url: "https://simpaisa.com" },
    hasCredential: personSchemaCredentials.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert,
    })),
    award: personSchemaAwards,
    knowsAbout: resumeKeywords,
    hasOccupation: {
      "@type": "Occupation",
      name: "Product & Program Executive, Fintech Infrastructure",
      occupationalCategory: [
        "Product Management",
        "Program Management",
        "Fintech Infrastructure",
        "Payments",
      ],
      skills: resumeKeywords.join(", "),
    },
  },
};

const resumeBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Resume", item: absUrl("/resume") },
  ],
};

const googleAdsResumeConversionScript = GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO
  ? `if(window.gtag&&!window.__rzifiAdsResumePageViewConversion){window.__rzifiAdsResumePageViewConversion=true;gtag("event","conversion",{"send_to":"${GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO}"});}`
  : "";

const proofMetrics = [
  { value: "$1B+", label: "GTV / TPV scaled" },
  { value: "25M+", label: "Monthly transactions" },
  { value: "7", label: "Complex markets" },
  { value: "50+", label: "Bank, wallet & FI partners" },
  { value: "40+", label: "Engineers led" },
  { value: "4", label: "Production AI deployments" },
] as const;

const roleFit = [
  {
    title: "Product Leadership",
    body: "Payment infrastructure, pay-in/payout APIs, card acquiring, wallets, DCB, merchant onboarding, settlement, reconciliation, fraud controls, BNPL and cross-border corridors.",
  },
  {
    title: "Program Leadership",
    body: "PMO governance, multi-squad delivery, vendor management, SteerCo reporting, regulatory programs, PCI DSS, ISO 27001 and complex-market execution.",
  },
  {
    title: "Platform Scale",
    body: "Built product and operating systems across fintech, ecommerce and OTT: payment rails, subscription billing, partner ecosystems, risk controls and AI-enabled operations.",
  },
] as const;

const recruiterSearchFit = [
  "VP Product, Payments",
  "Head of Product, Fintech Infrastructure",
  "Director Product, Payment Platforms",
  "Product Lead, Cross-Border Payments",
  "Program Director, Fintech / PMO",
  "Technical Program Manager, Payments",
  "Director, Digital Transformation",
  "AI in Fintech Operations Lead",
] as const;

const selectedProofLinks = [
  {
    title: "$1B+ regulated payment infrastructure",
    body: "Multi-rail pay-in, payout, wallet, card acquiring, settlement and cross-border infrastructure across seven markets.",
    to: "/product-work/simpaisa-payment-infrastructure",
  },
  {
    title: "Merchant onboarding, KYC/KYB and risk controls",
    body: "Activation cut from weeks to hours with risk-tiered onboarding, sanctions/PEP controls and auditable review flows.",
    to: "/product-work/merchant-onboarding-kyc",
  },
  {
    title: "Settlement and reconciliation at scale",
    body: "Canonical ledger, three-way reconciliation and 99.95% settlement SLA across fragmented rails and partners.",
    to: "/product-work/settlement-reconciliation",
  },
  {
    title: "Fraud, AML/CFT and operational risk",
    body: "Payment risk controls, fraud loss below 0.1% of GTV and regulated operating cadence across complex markets.",
    to: "/product-work/fraud-risk-aml-cft",
  },
] as const;

const recruiterPathLinks = [
  { label: "Visa / Mastercard fit", to: "/for/visa-mastercard" },
  { label: "Stripe / Adyen / Wise / Thunes fit", to: "/for/stripe-adyen-wise-thunes" },
  { label: "Banks and regulated fintech fit", to: "/for/banks-fintechs" },
] as const;

const resumeExperience = [
  {
    company: "Simpaisa",
    role: "Chief Product Officer (acting CTO, 2024)",
    period: "Aug 2020 - Present",
    location: "Dubai, UAE",
    bullets: [
      "Owned product strategy and program execution for a regulated multi-rail payments platform spanning pay-in, payouts, wallets, DCB, IBFT, card acquiring, settlement, FX and cross-border corridors.",
      "Helped scale infrastructure from $0 to $1B+ GTV, 25M+ monthly transactions and 50+ bank, wallet and financial institution partners across complex markets.",
      "Built merchant onboarding, KYC/KYB, risk-tiering and category pricing flows that cut standard-risk activation from weeks to hours and supported 150+ merchant integrations.",
      "Led a 40-engineer payments organization across 12 squads; managed $5M+ technology budget, 15+ vendor relationships, PCI DSS, ISO/IEC 27001 and multi-jurisdiction reporting programs.",
      "Improved platform economics and control: payment failure rate down from ~8% to ~1.2%, 99.95% settlement SLA, fraud loss below 0.1% of GTV and downtime down 90%.",
      "Deployed four production AI/GenAI solutions across merchant support, incident auto-escalation, partner operations and fraud/AML decisioning.",
    ],
  },
  {
    company: "Daraz (Alibaba Group)",
    role: "Project Manager, Payments Operations",
    period: "Mar 2020 - Sep 2020",
    location: "Karachi, Pakistan",
    bullets: [
      "Ran payment operations governance across five markets during a COVID-driven volume surge, covering settlement cycles, disputes, fraud rules and COD-to-digital conversion.",
      "Coordinated multi-country reconciliation, vendor management and Alipay localization with Alibaba teams; expanded payment coverage on checkout by ~40%.",
    ],
  },
  {
    company: "Tapmad",
    role: "Senior Project & Product Manager",
    period: "Jul 2017 - May 2020",
    location: "Karachi, Pakistan",
    bullets: [
      "Owned product strategy and program delivery for OTT monetization, subscription billing and payment rails, turning a high-cost billing model into a commercially viable product.",
      "Launched direct carrier billing across all four major telcos and scaled acquisition from 0 to 5M paid subscribers in under three years.",
      "Led wallet-billing migration that reduced payment cost from ~50% of revenue to ~1%, improved refund/subscription UX and supported MENA expansion.",
    ],
  },
  {
    company: "Wing Logic",
    role: "PMO & Project Manager",
    period: "Apr 2017 - Oct 2017",
    location: "Dubai, UAE",
    bullets: [
      "Built a PMO operating model for a $12M+ project portfolio, creating executive dashboards, KPI cadence and delivery governance for 50+ people.",
      "Reduced project delays by 40% through clearer ownership, reporting rhythm and cross-workstream dependency control.",
    ],
  },
  {
    company: "CIMKO (Nyumba Ya Akiba SA)",
    role: "Assistant Manager, Projects",
    period: "May 2016 - Jan 2017",
    location: "Democratic Republic of the Congo",
    bullets: [
      "Delivered $8M+ in IT infrastructure and ERP projects in a high-complexity operating environment; reduced project delays by 12% and procurement costs by 15%.",
    ],
  },
  {
    company: "DS Engineering Services",
    role: "Project Manager, PMO",
    period: "Sep 2012 - Feb 2016",
    location: "Karachi, Pakistan",
    bullets: [
      "Managed governance and reporting across 400+ engineering projects and a $15M utilities/power infrastructure portfolio; improved delivery efficiency by 70%.",
    ],
  },
  {
    company: "Pakistan Engineering Services Co. (PESCO)",
    role: "Senior Planning Engineer",
    period: "Jun 2009 - Aug 2012",
    location: "Karachi, Pakistan",
    bullets: [
      "Built planning and monitoring systems for substation field operations, improving downtime visibility and reducing downtime by 6%.",
    ],
  },
] as const;

const prioritySkills = [
  "Payment infrastructure",
  "Pay-in & payout rails",
  "Product strategy",
  "Program governance",
  "Cross-border payments",
  "Settlement & reconciliation",
  "KYC/KYB automation",
  "BNPL & subscription billing",
  "Crypto on/off-ramp strategy",
  "Fraud & AML/CFT",
  "Bank/wallet partnerships",
  "PCI DSS / ISO 27001",
  "AI in payment operations",
  "Vendor management",
  "Complex-market execution",
] as const;

const resumeSignals = [
  "Recruiter scan-ready",
  "$1B+ scale validated",
  "Schedule call ready",
  "Global fintech ready",
] as const;

const delayStyle = (ms: number) => ({ "--motion-delay": `${ms}ms` }) as CSSProperties;

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Product & Program Executive Resume | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Rizwan Zafar resume: Product & Program Executive for fintech infrastructure, payments, PMO and AI operations. $1B+ GTV, 25M+ transactions, 7 markets.",
      },
      { name: "keywords", content: resumeKeywords.join(", ") },
      {
        property: "og:title",
        content: "Rizwan Zafar Resume | Product & Program Executive",
      },
      {
        property: "og:description",
        content:
          "Executive resume for senior payments product, fintech infrastructure, program leadership, PMO and AI-enabled operations roles.",
      },
      { property: "og:url", content: absUrl("/resume") },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:alt", content: "Rizwan Zafar, Product & Program Executive resume" },
      { name: "twitter:title", content: "Rizwan Zafar Resume" },
      {
        name: "twitter:description",
        content:
          "Product & Program Executive resume for fintech, payments, PMO and digital transformation roles.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: absUrl("/resume") },
      {
        rel: "alternate",
        type: "application/pdf",
        href: profile.resumeHref,
        title: "Download PDF resume",
      },
    ],
    scripts: [
      ...(googleAdsResumeConversionScript ? [{ children: googleAdsResumeConversionScript }] : []),
      { type: "application/ld+json", children: JSON.stringify(resumeJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(resumeBreadcrumbJsonLd) },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const formalCertifications = profile.certifications.filter((c) => !c.startsWith("Led "));
  const programCredentials = profile.certifications.filter((c) => c.startsWith("Led "));

  return (
    <div className="resume-page mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-14">
      <section className="priority-hero-shell relative overflow-hidden grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start border-b border-rule pb-10 md:pb-12">
        <span aria-hidden="true" className="priority-hero-rule priority-hero-rule-a" />
        <span aria-hidden="true" className="priority-hero-rule priority-hero-rule-b" />
        <div className="resume-soft-reveal relative z-10 min-w-0" style={delayStyle(0)}>
          <div className="flex items-center gap-4">
            <span className="grid h-9 w-9 place-items-center bg-ink text-background text-sm font-semibold">
              01
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink font-mono-tech">
              Executive resume
            </span>
          </div>
          <h1
            className="font-instrument text-4xl sm:text-5xl md:text-6xl text-ink mt-7 leading-[1.02] max-w-4xl text-wrap"
            aria-label="Rizwan Zafar, Product and Program Executive scaling fintech infrastructure"
          >
            <span className="block">Rizwan Zafar</span>
            <span className="resume-role-line mt-3 block font-sans text-base sm:text-lg md:text-2xl leading-snug text-ink-soft">
              <span className="sr-only">, </span>
              Product &amp; Program Executive{" "}
              <span className="resume-role-accent text-ink">Scaling Fintech Infrastructure</span>
            </span>
          </h1>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Primary executive positioning">
            {["Product Leadership", "Program Leadership", "Payments", "Fintech Infrastructure"].map(
              (item, index) => (
                <span
                  key={item}
                  className="resume-identity-chip"
                  style={delayStyle(120 + index * 55)}
                >
                  {item}
                </span>
              ),
            )}
          </div>
          <p className="mt-4 text-lg md:text-xl text-ink-soft leading-relaxed max-w-3xl">
            Senior product and program leader who has scaled fintech, ecommerce and OTT
            infrastructure in complex markets: pay-in and payout rails, merchant onboarding,
            settlement, reconciliation, risk/AML controls, partner ecosystems, BNPL/subscription
            billing and AI-enabled operations.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 max-w-full">
            <a
              href={profile.calendarUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="resume_page"
              data-analytics-cta-destination={profile.calendarUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand hover:text-[var(--brand-foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Schedule meeting
            </a>
            <a
              href={profile.resumeHref}
              download
              data-analytics-event="cta_click"
              data-analytics-cta-id="download_resume"
              data-analytics-cta-location="resume_page"
              data-analytics-cta-destination={profile.resumeHref}
              data-analytics-source="resume_page"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download PDF
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <aside
          className="priority-brief-card resume-soft-reveal relative z-10 rounded-lg border border-rule bg-surface p-5"
          style={delayStyle(90)}
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Best fit
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {[
              "VP / Head / Director Product, Payments",
              "Product Lead, Fintech Infrastructure",
              "Program Director / Head of PMO",
              "Technical Program Manager, Payments",
              "Director, Digital Transformation",
            ].map((role) => (
              <li key={role} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                <span>{role}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-rule pt-4 text-xs text-ink-soft">
            Open to UAE, KSA, Singapore, MENA, Europe and global roles across fintechs, banks,
            financial institutions, payment networks and digital platforms.
          </div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Resume readiness signals">
            {resumeSignals.map((signal, index) => (
              <span
                key={signal}
                className="priority-status-badge"
                style={delayStyle(220 + index * 55)}
              >
                {signal}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section
        className="resume-soft-reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 border-b border-rule py-6"
        style={delayStyle(140)}
      >
        {proofMetrics.map((m, index) => (
          <div
            key={m.label}
            className="resume-proof-card rounded-lg border border-rule bg-surface px-4 py-3"
            style={delayStyle(180 + index * 45)}
          >
            <div className="font-instrument text-2xl text-ink leading-none">{m.value}</div>
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-tight">
              {m.label}
            </div>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-12 gap-8 border-b border-rule py-10">
        <div className="resume-soft-reveal md:col-span-3" style={delayStyle(0)}>
          <h2 className="font-instrument text-2xl text-ink">Recruiter Search Fit</h2>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            Built for senior hiring managers searching for product, program and payments leadership
            across regulated fintech, banks, payment networks and infrastructure platforms.
          </p>
        </div>
        <div className="md:col-span-9 space-y-6">
          <div className="flex flex-wrap gap-2">
            {recruiterSearchFit.map((role, index) => (
              <span
                key={role}
                className="resume-skill-chip rounded-md border border-rule bg-surface px-3 py-1.5 text-sm text-ink"
                style={delayStyle(index * 30)}
              >
                {role}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {selectedProofLinks.map((proof, index) => (
              <Link
                key={proof.to}
                to={proof.to}
                className="resume-soft-reveal group rounded-lg border border-rule bg-card p-4 transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                style={delayStyle(120 + index * 50)}
              >
                <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                  Proof case study
                </span>
                <h3 className="mt-2 font-instrument text-lg text-ink group-hover:text-[var(--brand)] transition-colors">
                  {proof.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{proof.body}</p>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {recruiterPathLinks.map((path) => (
              <Link
                key={path.to}
                to={path.to}
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
              >
                {path.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-12 gap-8 border-b border-rule py-10">
        <div className="resume-soft-reveal md:col-span-3" style={delayStyle(0)}>
          <h2 className="font-instrument text-2xl text-ink">Executive Summary</h2>
        </div>
        <div className="md:col-span-9 space-y-5">
          <p
            className="resume-soft-reveal font-instrument text-2xl md:text-3xl text-ink leading-snug"
            style={delayStyle(80)}
          >
            Product &amp; Program Executive with 14+ years across payments, fintech, OTT, ecommerce
            operations and digital transformation.
          </p>
          <p
            className="resume-soft-reveal text-base text-ink-soft leading-relaxed max-w-3xl"
            style={delayStyle(120)}
          >
            Currently CPO at Simpaisa, where I helped scale regulated payment infrastructure to $1B+
            GTV, 25M+ monthly transactions and 50+ bank, wallet and FI partners. My operating lane
            sits between product strategy, program delivery, compliance, risk, engineering
            leadership, partner ecosystems and market expansion, with adjacent work across BNPL, OTT
            subscription billing and crypto on/off-ramp product strategy.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {roleFit.map((item, index) => (
              <div
                key={item.title}
                className="resume-soft-reveal rounded-lg border border-rule bg-card p-4"
                style={delayStyle(160 + index * 55)}
              >
                <h3 className="font-instrument text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-12 gap-8 border-b border-rule py-10">
        <div className="resume-soft-reveal md:col-span-3" style={delayStyle(0)}>
          <h2 className="font-instrument text-2xl text-ink">Priority Skills</h2>
        </div>
        <div className="md:col-span-9">
          <div className="flex flex-wrap gap-2">
            {prioritySkills.map((skill, index) => (
              <span
                key={skill}
                className="resume-skill-chip rounded-md border border-rule bg-surface px-3 py-1.5 text-sm text-ink"
                style={delayStyle(index * 35)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-end justify-between gap-6 mb-7">
          <h2 className="font-instrument text-3xl md:text-4xl text-ink">Experience</h2>
        </div>
        <div className="space-y-9">
          {resumeExperience.map((job, index) => (
            <article
              key={`${job.company}-${job.role}`}
              className="resume-timeline-card grid md:grid-cols-12 gap-5"
              style={delayStyle(index * 65)}
            >
              <div className="md:col-span-3 text-sm text-ink-soft">
                <div className="font-mono-tech text-ink">{job.period}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] font-mono-tech">
                  {job.location}
                </div>
              </div>
              <div className="resume-divider md:col-span-9 border-l border-rule pl-5 md:pl-6">
                <h3 className="font-instrument text-xl text-ink leading-snug">
                  {job.role}
                  <span className="text-ink-soft"> · {job.company}</span>
                </h3>
                <ul className="mt-3 space-y-2.5 text-ink-soft">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-5 text-sm leading-relaxed">
                      <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 border-y border-rule py-10">
        <div className="lg:col-span-3">
          <h2 className="font-instrument text-2xl text-ink">Skills & Credentials</h2>
        </div>
        <div className="lg:col-span-9 grid md:grid-cols-2 gap-8">
          {profile.skills.map((group) => (
            <div key={group.group}>
              <h3 className="text-[10px] uppercase tracking-[0.16em] text-ink-soft mb-3 font-mono-tech">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, index) => (
                  <span
                    key={item}
                    className="resume-skill-chip text-xs px-2.5 py-1 border border-rule rounded-md text-ink bg-surface"
                    style={delayStyle(index * 25)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-10">
        <div>
          <h2 className="font-instrument text-2xl text-ink mb-4">Certifications</h2>
          <ul className="space-y-2 text-sm text-ink-soft">
            {formalCertifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
          {programCredentials.length > 0 && (
            <p className="mt-4 text-xs text-ink-soft leading-relaxed">
              Also led PCI DSS and ISO/IEC 27001 certification programs from scratch at Simpaisa.
            </p>
          )}
        </div>
        <div>
          <h2 className="font-instrument text-2xl text-ink mb-4">Education</h2>
          <ul className="space-y-4">
            {profile.education.map((item) => (
              <li key={`${item.school}-${item.degree}`}>
                <div className="font-instrument text-base text-ink">{item.degree}</div>
                <div className="text-sm text-ink-soft">{item.school}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
                  {item.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-instrument text-2xl text-ink mb-4">Recognition</h2>
          <ul className="space-y-3">
            {profile.honors.map((honor) => (
              <li key={honor.title}>
                <div className="font-instrument text-base text-ink">{honor.title}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
                  {honor.issuer} · {honor.year}
                </div>
              </li>
            ))}
          </ul>
          <h3 className="font-instrument text-xl text-ink mt-8 mb-3">Contact</h3>
          <div className="space-y-2 text-sm text-ink-soft">
            <div>{profile.location}</div>
            <a
              className="flex w-fit items-center gap-2 text-ink underline underline-offset-4"
              href={profile.calendarUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="resume_contact"
              data-analytics-cta-destination={profile.calendarUrl}
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Schedule a meeting
            </a>
            <a
              className="flex w-fit items-center gap-2 text-ink underline underline-offset-4"
              href={`mailto:${profile.email}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              className="flex w-fit items-center gap-2 text-ink underline underline-offset-4"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              LinkedIn profile
            </a>
          </div>
        </div>
      </section>

      <section className="resume-cta-panel rounded-lg border border-[var(--brand)] bg-[var(--brand)] text-background p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="font-instrument text-2xl md:text-3xl leading-tight">
            Ready for senior product, payments and program leadership roles.
          </h2>
          <p className="mt-2 text-sm text-background/70 max-w-2xl">
            Best fit: fintech infrastructure, payment networks, PSPs, banks, OTT/ecommerce platforms
            and digital transformation programs that need product judgment plus delivery discipline.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={profile.calendarUrl}
            target="_blank"
            rel="noreferrer"
            data-analytics-event="cta_click"
            data-analytics-cta-id="book_intro_call"
            data-analytics-cta-location="resume_page"
            data-analytics-cta-destination={profile.calendarUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-ink px-5 py-2.5 text-sm font-medium hover:bg-[var(--brand)] hover:text-background transition-colors"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Schedule meeting
          </a>
          <a
            href={profile.resumeHref}
            download
            data-analytics-event="cta_click"
            data-analytics-cta-id="download_resume"
            data-analytics-cta-location="resume_page"
            data-analytics-cta-destination={profile.resumeHref}
            data-analytics-source="resume_page"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </section>
    </div>
  );
}
