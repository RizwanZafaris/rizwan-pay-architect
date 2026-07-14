import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { personSchemaAwards, personSchemaCredentials, profile } from "@/data/profile";
import { PLATFORM, DARAZ } from "@/content/facts";
import { BookingSection } from "@/components/BookingSection";
import { absUrl, GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";
import portraitWebp from "@/assets/rizwan-zafar-cutout.webp";
import portraitWebpSmall from "@/assets/rizwan-zafar-cutout-460.webp";
import resumeEditorialCss from "@/styles/resume-editorial.css?url";

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
  dateModified: "2026-07-15",
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
    worksFor: { "@type": "Organization", name: "SimPaisa", url: "https://simpaisa.com" },
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
  { value: PLATFORM.gtv, label: "Annual GTV", note: "Regulated payment infrastructure" },
  { value: PLATFORM.annualPayments, label: "Payments / year", note: "Platform throughput" },
  {
    value: String(PLATFORM.marketCount),
    label: "Live markets",
    note: "Frontier-market operations",
  },
  { value: PLATFORM.settlementSla, label: "Settlement SLA", note: "Control and reliability" },
  { value: "40", label: "Engineers led", note: "Across 12 squads" },
] as const;

const roleFit = [
  {
    title: "Product leadership",
    body: "Payment infrastructure, pay-in and payout APIs, card acquiring, wallets, DCB, merchant onboarding, settlement, reconciliation, fraud controls, BNPL and cross-border corridors.",
  },
  {
    title: "Program leadership",
    body: "PMO governance, multi-squad delivery, vendor management, SteerCo reporting, regulatory programs, PCI DSS, ISO 27001 and complex-market execution.",
  },
  {
    title: "Platform scale",
    body: "Product and operating systems across fintech, ecommerce and OTT: payment rails, subscription billing, partner ecosystems, risk controls and AI-enabled operations.",
  },
] as const;

const selectedProofLinks = [
  {
    title: `${PLATFORM.gtv} regulated payment infrastructure`,
    body: `Multi-rail pay-in, payout, wallet, card acquiring, settlement and cross-border infrastructure across ${PLATFORM.marketsWord} frontier markets.`,
    slug: "simpaisa-payment-infrastructure",
  },
  {
    title: "Merchant onboarding, KYC/KYB and risk controls",
    body: "Activation cut from weeks to hours with risk-tiered onboarding, sanctions/PEP controls and auditable review flows.",
    slug: "merchant-onboarding-kyc",
  },
  {
    title: "Settlement and reconciliation at scale",
    body: `Canonical ledger, three-way reconciliation and ${PLATFORM.settlementSla} settlement SLA across fragmented rails and partners.`,
    slug: "settlement-reconciliation",
  },
  {
    title: "Fraud, AML/CFT and operational risk",
    body: "Payment risk controls, fraud loss below 0.1% of GTV and regulated operating cadence across complex markets.",
    slug: "fraud-risk-aml-cft",
  },
] as const;

const recruiterPathLinks = [
  { label: "Visa / Mastercard fit", audience: "visa-mastercard" },
  { label: "Stripe / Adyen / Wise / Thunes fit", audience: "stripe-adyen-wise-thunes" },
  { label: "Banks and regulated fintech fit", audience: "banks-fintechs" },
] as const;

const resumeExperience = [
  {
    company: "SimPaisa",
    role: "Chief Product Officer (acting CTO, 2024)",
    period: "Aug 2020 – Present",
    location: "Dubai, UAE",
    bullets: [
      "Owned product strategy and program execution for a regulated multi-rail payments platform spanning pay-in, payouts, wallets, DCB, IBFT, card acquiring, settlement, FX and cross-border corridors.",
      `Helped scale infrastructure from $0 to ${PLATFORM.gtv} GTV and ${PLATFORM.annualPayments} payments a year, working with leading global PSPs across ${PLATFORM.marketCount} frontier markets.`,
      `Built merchant onboarding, KYC/KYB, risk-tiering and category pricing flows that cut standard-risk activation from weeks to hours and supported ${PLATFORM.merchants} merchant integrations.`,
      "Led a 40-engineer payments organization across 12 squads; managed $5M+ technology budget, 15+ vendor relationships, PCI DSS, ISO/IEC 27001 and multi-jurisdiction reporting programs.",
      `Improved platform economics and control: 97% payment success at 90% straight-through processing, ${PLATFORM.settlementSla} settlement SLA, fraud loss below 0.1% of GTV and downtime down 90%.`,
      "Deployed three production AI/GenAI solutions across merchant support, incident auto-escalation and partner operations, plus a fraud/AML banking pilot.",
    ],
  },
  {
    company: "Daraz (Alibaba Group)",
    role: "Project Manager, Payments Operations",
    period: "Mar 2020 – Aug 2020",
    location: "Karachi, Pakistan",
    bullets: [
      `Ran payment operations governance across ${DARAZ.marketsWord} markets during a COVID-driven volume surge, covering settlement cycles, disputes, fraud rules and COD-to-digital conversion.`,
      "Coordinated multi-country reconciliation, vendor management and Alipay localization with Alibaba teams; expanded payment coverage on checkout by ~40%.",
    ],
  },
  {
    company: "Tapmad",
    role: "Senior Project & Product Manager",
    period: "Jul 2017 – Mar 2020",
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
    period: "Apr 2017 – Oct 2017",
    location: "Dubai, UAE",
    bullets: [
      "Built a PMO operating model for a $12M+ project portfolio, creating executive dashboards, KPI cadence and delivery governance for 50+ people.",
      "Reduced project delays by 40% through clearer ownership, reporting rhythm and cross-workstream dependency control.",
    ],
  },
  {
    company: "CIMKO (Nyumba Ya Akiba SA)",
    role: "Assistant Manager, Projects",
    period: "May 2016 – Jan 2017",
    location: "Democratic Republic of the Congo",
    bullets: [
      "Delivered $8M+ in IT infrastructure and ERP projects in a high-complexity operating environment; reduced project delays by 12% and procurement costs by 15%.",
    ],
  },
  {
    company: "DS Engineering Services",
    role: "Project Manager, PMO",
    period: "Sep 2012 – Feb 2016",
    location: "Karachi, Pakistan",
    bullets: [
      "Managed governance and reporting across 400+ engineering projects and a $15M utilities/power infrastructure portfolio; improved delivery efficiency by 70%.",
    ],
  },
  {
    company: "Pakistan Engineering Services Co. (PESCO)",
    role: "Senior Planning Engineer",
    period: "Jun 2009 – Aug 2012",
    location: "Karachi, Pakistan",
    bullets: [
      "Built planning and monitoring systems for substation field operations, improving downtime visibility and reducing downtime by 6%.",
    ],
  },
] as const;

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Product & Program Executive Resume | Rizwan Zafar" },
      {
        name: "description",
        content: `Rizwan Zafar resume: Product & Program Executive for fintech infrastructure, payments, PMO and AI operations. ${PLATFORM.gtv} GTV, ${PLATFORM.annualPayments} payments a year, ${PLATFORM.marketCount} markets.`,
      },
      { name: "keywords", content: resumeKeywords.join(", ") },
      { property: "og:title", content: "Rizwan Zafar Resume | Product & Program Executive" },
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
      { rel: "stylesheet", href: resumeEditorialCss },
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
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("resume-editorial-active");
    return () => html.classList.remove("resume-editorial-active");
  }, []);

  const formalCertifications = profile.certifications.filter(
    (credential) => !credential.startsWith("Led "),
  );
  const programCredentials = profile.certifications.filter((credential) =>
    credential.startsWith("Led "),
  );
  const capabilityGroups = profile.skills.filter((group) => group.group !== "Markets");
  const marketRegions = profile.skills.find((group) => group.group === "Markets")?.items ?? [];

  return (
    <div className="resume-page resume-editorial-page">
      <section className="resume-hero" aria-labelledby="resume-title">
        <div className="resume-shell">
          <div className="resume-masthead" aria-label="Resume edition details">
            <span>Executive résumé</span>
            <span>Updated 15 Jul 2026</span>
          </div>

          <div className="resume-hero-grid" data-rz-stagger>
            <div className="resume-hero-copy">
              <p className="resume-eyebrow">Product · Program · Payments</p>
              <h1 id="resume-title" className="resume-name">
                <span>Rizwan</span>
                <span>Zafar</span>
              </h1>
              <p className="resume-role">Product &amp; Program Executive</p>
              <p className="resume-intro">
                I build regulated payment infrastructure and the operating systems behind it—
                turning fragmented rails, risk controls and multi-market delivery into products that
                scale.
              </p>

              <div className="resume-actions" aria-label="Resume actions">
                <a
                  href={profile.resumeHref}
                  download
                  data-analytics-event="cta_click"
                  data-analytics-cta-id="download_resume"
                  data-analytics-cta-location="resume_hero"
                  data-analytics-cta-destination={profile.resumeHref}
                  data-analytics-cta-placement="resume_hero"
                  className="resume-button resume-button--primary"
                >
                  Download PDF
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="#book"
                  data-analytics-event="cta_click"
                  data-analytics-cta-id="book_intro_call"
                  data-analytics-cta-location="resume_hero"
                  data-analytics-cta-destination="#book"
                  className="resume-button resume-button--secondary"
                >
                  Book an intro
                  <span aria-hidden="true">↘</span>
                </a>
              </div>

              <div className="resume-hero-meta">
                <span>Dubai, UAE</span>
                <span>{profile.career.yearsLabel}</span>
                <span>Open to senior global roles</span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </div>
            </div>

            <figure className="resume-portrait-stage">
              <div className="resume-portrait-rule" aria-hidden="true" />
              <img
                src={portraitWebp}
                srcSet={portraitWebpSmall + " 460w, " + portraitWebp + " 928w"}
                sizes="(max-width: 1023px) 92vw, 38vw"
                width="928"
                height="1160"
                alt="Rizwan Zafar, Product and Program Executive"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                <span>Dubai / Global</span>
                <span>Payments infrastructure</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="resume-metric-band" aria-label="Selected operating outcomes">
        <div className="resume-shell resume-metric-grid" data-rz-stagger>
          {proofMetrics.map((metric) => (
            <div className="resume-metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </div>
      </section>

      <div className="resume-content">
        <section className="resume-section resume-experience" aria-labelledby="experience-title">
          <div className="resume-shell">
            <header className="resume-section-head rz-section-head" data-rz-reveal>
              <p>01 / Career record</p>
              <h2 id="experience-title">Experience</h2>
              <span>Selected scope, decisions and measurable outcomes.</span>
            </header>

            <div className="resume-experience-list">
              {resumeExperience.map((job, index) => (
                <details
                  className="resume-experience-item resume-row-reveal"
                  key={[job.company, job.role].join("-")}
                  open={index === 0}
                  data-rz-reveal
                >
                  <summary>
                    <span className="resume-experience-period">{job.period}</span>
                    <span className="resume-experience-marker" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="resume-experience-identity">
                      <strong>{job.company}</strong>
                      <span>{job.role}</span>
                    </span>
                    <span className="resume-experience-location">{job.location}</span>
                    <span className="resume-experience-toggle" aria-hidden="true" />
                  </summary>
                  <div className="resume-experience-body">
                    <p>Selected mandate</p>
                    <ul>
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="resume-section resume-proof" aria-labelledby="proof-title">
          <div className="resume-shell">
            <header className="resume-section-head resume-section-head--split" data-rz-reveal>
              <p>02 / Evidence</p>
              <h2 id="proof-title">Selected proof</h2>
              <span>Deep dives for interviewers who want the decisions behind the numbers.</span>
            </header>

            <div className="resume-proof-list">
              {selectedProofLinks.map((item, index) => (
                <Link
                  to="/product-work/$slug"
                  params={{ slug: item.slug }}
                  className="resume-proof-row resume-row-reveal"
                  key={item.slug}
                  data-rz-reveal
                >
                  <span className="resume-proof-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="resume-proof-copy">
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </span>
                  <span className="resume-proof-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="resume-section resume-leadership" aria-labelledby="leadership-title">
          <div className="resume-shell">
            <header className="resume-section-head" data-rz-reveal>
              <p>03 / Leadership system</p>
              <h2 id="leadership-title">What I lead</h2>
              <span>
                Product judgment, program control and platform accountability in one remit.
              </span>
            </header>

            <div className="resume-leadership-grid" data-rz-stagger>
              {roleFit.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="resume-capability-list" data-rz-reveal>
              {capabilityGroups.map((group) => (
                <div className="resume-capability-row" key={group.group}>
                  <h3>{group.group}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>

            <div className="resume-markets" data-rz-reveal>
              <p>Market exposure</p>
              <div>
                {marketRegions.map((market) => (
                  <span key={market}>{market}</span>
                ))}
              </div>
            </div>

            <nav className="resume-recruiter-paths" aria-label="Role-fit views" data-rz-reveal>
              <p>Shortlist paths</p>
              <div>
                {recruiterPathLinks.map((item) => (
                  <Link
                    key={item.audience}
                    to="/for/$audience"
                    params={{ audience: item.audience }}
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <section className="resume-section resume-credentials" aria-labelledby="credentials-title">
          <div className="resume-shell">
            <header className="resume-section-head resume-section-head--split" data-rz-reveal>
              <p>04 / Foundations</p>
              <h2 id="credentials-title">Credentials</h2>
              <span>Formal qualifications, operating certifications and community leadership.</span>
            </header>

            <div className="resume-credentials-grid" data-rz-stagger>
              <article>
                <p className="resume-column-label">Certifications</p>
                <ul>
                  {formalCertifications.map((credential) => (
                    <li key={credential}>{credential}</li>
                  ))}
                </ul>
                <div className="resume-program-credentials">
                  {programCredentials.map((credential) => (
                    <p key={credential}>{credential}</p>
                  ))}
                </div>
              </article>

              <article>
                <p className="resume-column-label">Education</p>
                <div className="resume-education-list">
                  {profile.education.map((item) => (
                    <div key={[item.school, item.degree].join("-")}>
                      <span>{item.period.replace(",", " –")}</span>
                      <strong>{item.school}</strong>
                      <p>{item.degree}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article>
                <p className="resume-column-label">Recognition &amp; contact</p>
                <div className="resume-recognition">
                  {profile.honors.map((honor) => (
                    <div key={honor.title}>
                      <strong>{honor.title}</strong>
                      <span>{honor.year}</span>
                    </div>
                  ))}
                  {profile.volunteering.map((item) => (
                    <div key={item.role}>
                      <strong>{item.role}</strong>
                      <span>
                        {item.org} · {item.period.replace(",", " –")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="resume-contact-links">
                  <a href={"mailto:" + profile.email}>{profile.email}</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                  <a
                    href="#book"
                    data-analytics-event="cta_click"
                    data-analytics-cta-id="book_intro_call"
                    data-analytics-cta-location="resume_contact"
                    data-analytics-cta-destination="#book"
                  >
                    Book an intro ↘
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      <section className="resume-close" aria-labelledby="resume-close-title">
        <div className="resume-shell">
          <div className="resume-close-kicker" data-rz-reveal>
            <span>Senior product &amp; program leadership</span>
            <span>Dubai · MENA · Global</span>
          </div>
          <div className="resume-close-grid" data-rz-stagger>
            <h2 id="resume-close-title">
              <span>Let&apos;s build</span>
              <span>the next system.</span>
            </h2>
            <div>
              <p>
                Looking for a payments leader who can connect strategy, architecture, regulation and
                delivery?
              </p>
              <div className="resume-actions resume-actions--inverse">
                <a
                  href={profile.resumeHref}
                  download
                  data-analytics-event="cta_click"
                  data-analytics-cta-id="download_resume"
                  data-analytics-cta-location="resume_close"
                  data-analytics-cta-destination={profile.resumeHref}
                  data-analytics-cta-placement="resume_close"
                  className="resume-button resume-button--primary"
                >
                  Download PDF <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="#book"
                  data-analytics-event="cta_click"
                  data-analytics-cta-id="book_intro_call"
                  data-analytics-cta-location="resume_close"
                  data-analytics-cta-destination="#book"
                  className="resume-button resume-button--secondary"
                >
                  Book an intro <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="resume-booking-wrap">
        <div className="resume-shell">
          <BookingSection
            refName="resume_inline_embed"
            fallbackLocation="resume_inline_embed"
            calendarUrl={profile.calendarUrl}
            className="resume-booking"
          />
        </div>
      </div>
    </div>
  );
}
