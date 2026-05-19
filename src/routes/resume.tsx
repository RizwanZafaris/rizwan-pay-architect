import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { absUrl } from "@/lib/seo";

const resumeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Resume, Rizwan Zafar",
  url: absUrl("/resume"),
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: "Product & Program Executive, Fintech Infrastructure",
    url: absUrl("/resume"),
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    sameAs: [profile.linkedin, profile.twitter].filter(Boolean),
  },
};

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
    body: "Payment infrastructure, pay-in/payout APIs, card acquiring, wallets, DCB, merchant onboarding, settlement, reconciliation, fraud controls and cross-border corridors.",
  },
  {
    title: "Program Leadership",
    body: "PMO governance, multi-squad delivery, vendor management, SteerCo reporting, regulatory programs, PCI DSS, ISO 27001 and complex-market execution.",
  },
  {
    title: "Commercial Scale",
    body: "Built product and operating systems that scaled GTV, improved authorization, reduced failure rates, controlled fraud loss and made local rails usable for enterprise platforms.",
  },
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
  "Product strategy",
  "Program governance",
  "Cross-border payments",
  "Settlement & reconciliation",
  "KYC/KYB automation",
  "Fraud & AML/CFT",
  "Bank/wallet partnerships",
  "PCI DSS / ISO 27001",
  "AI in payment operations",
  "Vendor management",
  "Complex-market execution",
] as const;

const delayStyle = (ms: number) => ({ "--motion-delay": `${ms}ms` }) as CSSProperties;

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume | Rizwan Zafar, Product & Program Executive" },
      {
        name: "description",
        content:
          "Executive resume for Rizwan Zafar: Product & Program leader in fintech infrastructure, $1B+ GTV, 25M+ monthly transactions, 7 markets.",
      },
      { property: "og:title", content: "Resume | Rizwan Zafar, Product & Program Executive" },
      {
        property: "og:description",
        content:
          "Payments and fintech infrastructure resume: product leadership, PMO governance, $1B+ GTV, 25M+ monthly transactions and 7 markets.",
      },
      { property: "og:url", content: absUrl("/resume") },
      { property: "og:type", content: "profile" },
      { name: "twitter:title", content: "Resume | Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Product & Program Executive resume for fintech, payments, PMO and digital transformation roles.",
      },
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
    scripts: [{ type: "application/ld+json", children: JSON.stringify(resumeJsonLd) }],
  }),
  component: ResumePage,
});

function ResumePage() {
  const formalCertifications = profile.certifications.filter((c) => !c.startsWith("Led "));
  const programCredentials = profile.certifications.filter((c) => c.startsWith("Led "));

  return (
    <div className="resume-page mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-14">
      <section className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start border-b border-rule pb-10 md:pb-12">
        <div className="resume-soft-reveal min-w-0" style={delayStyle(0)}>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
            Executive resume
          </div>
          <h1 className="font-instrument text-3xl sm:text-4xl md:text-6xl text-ink mt-3 leading-[1.02] max-w-4xl text-wrap">
            Rizwan Zafar, Product &amp; Program Executive
          </h1>
          <p className="mt-4 text-lg md:text-xl text-ink-soft leading-relaxed max-w-3xl">
            Dubai-based product and program leader scaling regulated fintech infrastructure in
            complex markets: payment rails, merchant onboarding, settlement, reconciliation,
            risk/AML controls, partner ecosystems and AI-enabled operations.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 max-w-full">
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand hover:text-[var(--brand-foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              Download PDF
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-w-0 max-w-full items-center justify-center rounded-full border border-ink/20 px-4 sm:px-5 py-2.5 text-center text-sm font-medium leading-tight text-ink break-all hover:bg-ink/5 transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <aside
          className="resume-soft-reveal rounded-2xl border border-rule bg-card/80 p-5 shadow-sm"
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
            {profile.location} · Open to UAE, KSA, Singapore, MENA, Europe and global fintech roles.
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
            className="resume-proof-card rounded-xl border border-rule bg-surface px-4 py-3"
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
            leadership, partner ecosystems and market expansion.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {roleFit.map((item, index) => (
              <div
                key={item.title}
                className="resume-soft-reveal rounded-xl border border-rule bg-card p-4"
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
                className="resume-skill-chip rounded-full border border-rule bg-surface px-3 py-1.5 text-sm text-ink"
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
          <div className="hidden md:block text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Action · Scope · Impact
          </div>
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
                    className="resume-skill-chip text-xs px-2.5 py-1 border border-rule rounded-full text-ink bg-surface"
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
              className="block text-ink underline underline-offset-4"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <a
              className="block text-ink underline underline-offset-4"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn profile
            </a>
          </div>
        </div>
      </section>

      <section className="resume-cta-panel rounded-2xl border border-rule bg-ink text-background p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
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
            href={profile.resumeHref}
            download
            className="inline-flex items-center justify-center rounded-full bg-background text-ink px-5 py-2.5 text-sm font-medium hover:bg-[var(--brand)] transition-colors"
          >
            Download PDF
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
          >
            Email me
          </a>
        </div>
      </section>
    </div>
  );
}
