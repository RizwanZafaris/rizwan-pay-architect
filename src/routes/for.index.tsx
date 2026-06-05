import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { audiences, getHub, postsForHub, caseStudiesForHub, type Audience } from "@/data/hubs";
import { profile } from "@/data/profile";
import { absUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/for/")({
  head: () => ({
    meta: [
      { title: "Recruiter Brief | Rizwan Zafar, Product & Program Executive" },
      {
        name: "description",
        content:
          "Recruiter-ready brief for Rizwan Zafar: senior product and program leader in payments infrastructure, $1B+ GTV, 25M+ transactions and 7 markets.",
      },
      {
        property: "og:title",
        content: "Recruiter Brief | Rizwan Zafar, Product & Program Executive",
      },
      {
        property: "og:description",
        content:
          "Senior product and program leadership proof for payments infrastructure, regulated fintech, PMO and complex-market roles.",
      },
      { property: "og:url", content: absUrl("/for") },
      { name: "twitter:title", content: "Recruiter Brief | Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Recruiter brief for senior payments product, program, fintech infrastructure and digital transformation roles.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/for") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Recruiter Brief, Rizwan Zafar",
          url: absUrl("/for"),
          mainEntity: {
            "@type": "Person",
            name: profile.name,
            jobTitle: "Product & Program Executive, Fintech Infrastructure",
            url: SITE_URL,
            email: `mailto:${profile.email}`,
            address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
            sameAs: profile.entitySameAs,
            knowsAbout: [
              "Payments infrastructure",
              "Product management",
              "Program management",
              "Fintech",
              "Cross-border payments",
              "Settlement and reconciliation",
              "Fraud and AML",
              "Merchant onboarding",
            ],
          },
        }),
      },
    ],
  }),
  component: ForIndex,
});

const delayStyle = (ms: number) => ({ "--motion-delay": `${ms}ms` }) as CSSProperties;

const proofMetrics = [
  { value: "$1B+", label: "GTV / TPV scaled" },
  { value: "25M+", label: "Monthly transactions" },
  { value: "7", label: "Markets" },
  { value: "50+", label: "Bank, wallet & FI partners" },
  { value: "40+", label: "Engineers led" },
  { value: "4", label: "Production AI deployments" },
] as const;

const roleLanes = [
  {
    title: "Product Leadership",
    fit: "VP Product, Head of Product, Director Product, Product Lead for payments or fintech infrastructure.",
    proof: [
      "Scaled multi-rail pay-in, payout, wallet, DCB, IBFT, card acquiring and cross-border products.",
      "Owned product strategy, roadmap, partner coverage, authorization, activation and platform economics.",
      "Built infrastructure used by enterprise platforms including TikTok, Uber, Temu and MoneyGram.",
    ],
  },
  {
    title: "Program / PMO Leadership",
    fit: "Program Director, Head of PMO, Technical Program Manager or transformation leader.",
    proof: [
      "Led 12 squads, 40+ engineers, $5M+ technology budget and 15+ vendor relationships.",
      "Built governance across product, engineering, risk, compliance, operations and executive reporting.",
      "Delivered PCI DSS and ISO/IEC 27001 certification programs from scratch.",
    ],
  },
  {
    title: "Payments Infrastructure",
    fit: "Payment infrastructure, payment orchestration, cross-border corridors, settlement and reconciliation.",
    proof: [
      "Built regulated rails across local methods, cards, wallets, payout flows, FX and partner routing.",
      "Improved payment failure from ~8% to ~1.2% and held settlement SLA at 99.95%.",
      "Worked where compliance, risk, bank partnerships and market operations are part of the product.",
    ],
  },
  {
    title: "AI In Fintech Operations",
    fit: "AI-enabled product operations, support automation, fraud/AML decisioning and incident response.",
    proof: [
      "Shipped 4 production AI/GenAI deployments inside payment operations.",
      "Reduced merchant support time, incident response time and partner support load with practical AI systems.",
      "Can separate production value from AI theater, especially in regulated environments.",
    ],
  },
] as const;

const targetRoles: Record<Audience["slug"], string[]> = {
  "visa-mastercard": [
    "Director / Senior Director, Acceptance Product",
    "Head of Cross-Border Product",
    "Tokenization, settlement or scheme-readiness product lead",
    "Emerging-market payment infrastructure lead",
  ],
  "stripe-adyen-wise-thunes": [
    "Product Lead, Payment Orchestration",
    "Head of Local Payment Methods",
    "Director, Payouts / Cross-Border",
    "Product Manager, Developer Experience for payments",
  ],
  "banks-fintechs": [
    "Head of Payments Product",
    "Director, Compliance / Risk Product",
    "Program Director, SWIFT / ISO 20022 / payments modernization",
    "Head of Regulated Merchant Onboarding",
  ],
};

const audienceProof: Record<Audience["slug"], { label: string; value: string }[]> = {
  "visa-mastercard": [
    { label: "Acceptance & acquiring", value: "MPGS · MDES · 3DS" },
    { label: "Scale", value: "$1B+ GTV" },
    { label: "Controls", value: "<0.1% fraud loss" },
    { label: "Markets", value: "MENA · South Asia" },
  ],
  "stripe-adyen-wise-thunes": [
    { label: "Rails", value: "Cards · wallets · DCB · IBFT" },
    { label: "Coverage", value: "50+ partners" },
    { label: "Transactions", value: "25M+ / month" },
    { label: "Developer surface", value: "APIs · webhooks · routing" },
  ],
  "banks-fintechs": [
    { label: "Compliance programs", value: "PCI DSS · ISO 27001" },
    { label: "Risk domain", value: "AML/CFT · sanctions · fraud" },
    { label: "Governance", value: "PMO · SteerCo · audit trail" },
    { label: "Data standards", value: "SWIFT · ISO 20022" },
  ],
};

const recruiterSignals = [
  "5-minute screen",
  "Role-fit mapped",
  "Proof-linked",
  "Case-study backed",
] as const;

function ForIndex() {
  return (
    <div className="recruiter-page mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-14">
      <section className="priority-hero-shell relative overflow-hidden grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start border-b border-rule pb-10 md:pb-12">
        <span aria-hidden="true" className="priority-hero-rule priority-hero-rule-a" />
        <span aria-hidden="true" className="priority-hero-rule priority-hero-rule-b" />
        <div className="relative z-10 min-w-0 recruiter-soft-reveal" style={delayStyle(0)}>
          <div className="flex items-center gap-4">
            <span className="grid h-9 w-9 place-items-center bg-ink text-background text-sm font-semibold">
              02
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink font-mono-tech">
              Recruiter brief
            </span>
          </div>
          <h1 className="mt-7 max-w-4xl font-instrument text-3xl sm:text-4xl md:text-6xl text-ink leading-[1.02] text-wrap">
            Product &amp; Program Executive for Payments Infrastructure
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-ink-soft leading-relaxed">
            A 5-minute view of Rizwan Zafar's fit for senior product, program and fintech
            infrastructure roles: regulated payment rails, complex markets, bank and wallet
            partnerships, risk/compliance and execution at scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 max-w-full">
            <a
              href={profile.resumeHref}
              download
              data-analytics-event="cta_click"
              data-analytics-cta-id="download_resume"
              data-analytics-cta-location="for_top"
              data-analytics-cta-destination={profile.resumeHref}
              data-analytics-source="for"
              className="inline-flex items-center justify-center rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand hover:text-[var(--brand-foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
            >
              Download resume
            </a>
            <Link
              to="/resume"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
            >
              View resume
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech leading-relaxed">
            Certified: PMP · PMI-ACP · CSPO · CSM · COBIT 5 · ITIL
          </div>
        </div>

        <aside
          className="priority-brief-card recruiter-soft-reveal recruiter-cta-panel relative z-10 rounded-lg border border-rule bg-surface p-5"
          style={delayStyle(90)}
          aria-label="Recruiter summary"
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Best used for
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {[
              "VP / Head / Director Product, Payments",
              "Product Lead, Fintech Infrastructure",
              "Program Director / Head of PMO",
              "Technical Program Manager, Payments",
              "Digital transformation leadership",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-rule pt-4 text-xs text-ink-soft leading-relaxed">
            Based in {profile.location}. Relevant for UAE, KSA, Singapore, MENA, Europe and global
            fintech roles.
          </div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Recruiter brief signals">
            {recruiterSignals.map((signal, index) => (
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
        className="recruiter-soft-reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 border-b border-rule py-6"
        style={delayStyle(140)}
        aria-label="Proof points"
      >
        {proofMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className="recruiter-proof-card rounded-lg border border-rule bg-surface px-4 py-3"
            style={delayStyle(180 + index * 45)}
          >
            <div className="font-instrument text-2xl text-ink leading-none">{metric.value}</div>
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-tight">
              {metric.label}
            </div>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-12 gap-8 border-b border-rule py-10 md:py-12">
        <div className="md:col-span-3 recruiter-soft-reveal" style={delayStyle(0)}>
          <h2 className="font-instrument text-2xl text-ink">Where The Fit Is Strongest</h2>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            This page is built for fast recruiter scanning, not biography browsing.
          </p>
        </div>
        <div className="md:col-span-9 grid sm:grid-cols-2 gap-4">
          {roleLanes.map((lane, index) => (
            <article
              key={lane.title}
              className="recruiter-soft-reveal recruiter-card rounded-lg border border-rule bg-surface p-5"
              style={delayStyle(80 + index * 60)}
            >
              <h3 className="font-instrument text-xl text-ink leading-snug">{lane.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{lane.fit}</p>
              <ul className="mt-4 space-y-2">
                {lane.proof.map((item) => (
                  <li key={item} className="relative pl-5 text-sm text-ink-soft leading-relaxed">
                    <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="recruiter-soft-reveal" style={delayStyle(0)}>
            <h2 className="font-instrument text-3xl md:text-4xl text-ink leading-tight">
              Hiring Lenses
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
              Same track record, three recruiter views. Use the lens closest to the search mandate.
            </p>
          </div>
          <div className="recruiter-soft-reveal flex flex-wrap gap-2" style={delayStyle(80)}>
            {audiences.map((audience) => (
              <a
                key={audience.slug}
                href={`#${audience.slug}`}
                className="rounded-full border border-rule bg-surface px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech hover:border-ink/30 hover:text-ink transition-colors"
              >
                {audience.shortTitle}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {audiences.map((audience, index) => {
            const studies = uniqueBySlug(
              audience.hubs.flatMap((hub) => caseStudiesForHub(hub)),
            ).slice(0, 3);
            const essays = uniqueBySlug(audience.hubs.flatMap((hub) => postsForHub(hub))).slice(
              0,
              2,
            );
            const hubLinks = audience.hubs
              .map((slug) => getHub(slug))
              .filter((hub): hub is NonNullable<typeof hub> => Boolean(hub))
              .slice(0, 4);

            return (
              <article
                key={audience.slug}
                id={audience.slug}
                className="recruiter-soft-reveal recruiter-card scroll-mt-24 rounded-lg border border-rule bg-surface p-5 md:p-6"
                style={delayStyle(80 + index * 70)}
              >
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                      {audience.shortTitle}
                    </div>
                    <h3 className="mt-2 font-instrument text-2xl md:text-3xl text-ink leading-tight">
                      {audience.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-ink-soft leading-relaxed">
                      {audience.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {audience.companies.map((company) => (
                        <span
                          key={company}
                          className="rounded-full border border-rule bg-background px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-ink-soft font-mono-tech"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid md:grid-cols-2 gap-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                        Target roles
                      </div>
                      <ul className="mt-3 space-y-2">
                        {targetRoles[audience.slug].map((role) => (
                          <li
                            key={role}
                            className="relative pl-5 text-sm text-ink-soft leading-relaxed"
                          >
                            <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" />
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                        Proof signals
                      </div>
                      <dl className="mt-3 grid grid-cols-2 gap-3">
                        {audienceProof[audience.slug].map((item) => (
                          <div key={item.label}>
                            <dt className="text-[10px] uppercase tracking-[0.12em] text-ink-soft font-mono-tech leading-tight">
                              {item.label}
                            </dt>
                            <dd className="mt-1 font-instrument text-base text-ink leading-tight">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid lg:grid-cols-3 gap-5 border-t border-rule pt-5">
                  <div className="lg:col-span-2">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                      Best case studies
                    </div>
                    <div className="mt-3 divide-y divide-rule border-y border-rule">
                      {studies.map((study) => (
                        <Link
                          key={study.slug}
                          to="/product-work/$slug"
                          params={{ slug: study.slug }}
                          className="group flex items-start justify-between gap-4 py-3"
                        >
                          <span>
                            <span className="block font-instrument text-base text-ink group-hover:text-[var(--brand)] transition-colors leading-snug">
                              {study.title}
                            </span>
                            <span className="mt-1 block text-xs text-ink-soft leading-relaxed">
                              {study.category}
                            </span>
                          </span>
                          <span className="mt-1 text-sm text-ink-soft transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                      Supporting topics
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {hubLinks.map((hub) => (
                        <Link
                          key={hub.slug}
                          to="/topics/$hub"
                          params={{ hub: hub.slug }}
                          className="rounded-full border border-rule bg-background px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-ink-soft font-mono-tech hover:border-ink/30 hover:text-ink transition-colors"
                        >
                          {hub.shortTitle}
                        </Link>
                      ))}
                    </div>
                    {essays.length > 0 && (
                      <div className="mt-5">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                          Useful essays
                        </div>
                        <ul className="mt-2 space-y-2">
                          {essays.map((essay) => (
                            <li key={essay.slug}>
                              <Link
                                to="/blog/$slug"
                                params={{ slug: essay.slug }}
                                className="text-sm text-ink underline underline-offset-4 hover:text-[var(--brand)]"
                              >
                                {essay.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Link
                      to="/for/$audience"
                      params={{ audience: audience.slug }}
                      className="mt-5 inline-flex rounded-full border border-ink/20 px-4 py-2 text-xs font-mono-tech uppercase tracking-[0.12em] text-ink hover:border-ink/50 transition-colors"
                    >
                      Open full lens
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="recruiter-soft-reveal recruiter-cta-panel rounded-lg border border-[var(--brand)] bg-[var(--brand)] text-background p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="font-instrument text-2xl md:text-3xl leading-tight">
            Shortlist for serious payments, product and program mandates.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-background/70 leading-relaxed">
            Best fit: fintech infrastructure, payment networks, PSPs, banks, OTT/ecommerce platforms
            and transformation programs where product strategy and delivery discipline must work
            together.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={profile.resumeHref}
            download
            data-analytics-event="cta_click"
            data-analytics-cta-id="download_resume"
            data-analytics-cta-location="for_lens"
            data-analytics-cta-destination={profile.resumeHref}
            data-analytics-source="for"
            className="inline-flex items-center justify-center rounded-full bg-background text-ink px-5 py-2.5 text-sm font-medium hover:bg-[var(--brand)] hover:text-background transition-colors"
          >
            Download resume
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  return items.filter(
    (item, index, array) => array.findIndex((candidate) => candidate.slug === item.slug) === index,
  );
}
