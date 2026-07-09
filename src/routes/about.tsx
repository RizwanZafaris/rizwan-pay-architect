import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, personSchemaAwards, personSchemaCredentials } from "@/data/profile";
import { absUrl, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

// Operator-story /about page (brand-rebuild strategy doc §5). Replaces the
// old /resume redirect stub. JS-less: motion is the global vanilla engine only
// (rz-beam / data-rz-stagger / data-glow — attributes, no hydration, reduced-
// motion safe). Two-tier claims gate (career arc vs Simpaisa platform metrics)
// is respected — the two scopes never share a clause; see scripts/seo-audit.ts.
// No fabricated quotes/talks; every fact traces to src/data/profile.ts.

// AboutPage → the canonical #person node (defined site-wide in __root.tsx).
// We reference by @id instead of forking a second Person entity, and only
// attach owner-verified credentials/awards already used elsewhere.
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${absUrl("/about")}#aboutpage`,
  url: absUrl("/about"),
  name: "About Rizwan Zafar",
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
  primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE_URL, width: 1200, height: 630 },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    nationality: profile.nationality,
    jobTitle: profile.role,
    url: absUrl("/about"),
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    sameAs: profile.entitySameAs,
    worksFor: { "@type": "Organization", name: "SimPaisa", url: "https://simpaisa.com" },
    alumniOf: profile.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.school,
    })),
    hasCredential: personSchemaCredentials.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert,
    })),
    award: personSchemaAwards,
    knowsAbout: profile.entityKnowsAbout,
  },
};

// Three operating beliefs (strategy doc §5). Each gloss is grounded in real
// work from profile.experience — no invented claims.
const beliefs = [
  {
    claim: "Domestic rails beat international schemes.",
    gloss:
      "In frontier markets the cheapest, most reliable money movement is local: wallets, DCB, IBFT, bill-payment and cash-over-counter. My job at Simpaisa was to turn those fragmented local rails into products enterprises could actually integrate against — so global platforms could collect and disburse where they had no rails of their own.",
  },
  {
    claim: "The wallet is the market's real UX.",
    gloss:
      "At Tapmad I watched carrier billing bleed half of revenue to the telcos, then led the migration to wallet-based billing. The wallet — not the card, not the checkout page — is where retention, subscription management and unit economics are really decided in these markets.",
  },
  {
    claim: "Compliance is a product surface, not a checkbox.",
    gloss:
      "KYC/KYB, AML/CFT, sanctions screening and settlement controls are features you design, not paperwork you bolt on. Treating them as product is how onboarding went from weeks to hours for standard-risk merchants while fraud loss stayed under control.",
  },
] as const;

// Credentials, scope-tagged. Career-arc facts and the Simpaisa-platform
// compliance programmes live in SEPARATE items so no two-tier mix ever lands
// in one clause. Pulled from profile.certifications / education / honors /
// volunteering.
const credentialGroups = [
  {
    label: "Executive education",
    items: ["MIT Sloan — Mastering Design Thinking (executive program)"],
  },
  {
    label: "Professional certifications",
    items: ["PMP", "PMI-ACP", "CSPO", "CSM", "COBIT 5", "ITIL v3"],
  },
  {
    label: "Recognition",
    items: ['PMI "Youngest Project Manager of the Year", 2015'],
  },
  {
    label: "Service",
    items: [
      "PMI Karachi — VP, Volunteering (2022–2023)",
      "PMI Karachi — Director, Governance (2021–2022)",
    ],
  },
  {
    label: "Programmes led (Simpaisa platform)",
    items: ["Built PCI DSS Level 1 and ISO/IEC 27001 certification from scratch"],
  },
] as const;

// Multi-audience doorways — mirrors the homepage's three-doorway close.
const doorways = [
  {
    eyebrow: "Hiring?",
    title: "Read the recruiter brief and book a call.",
    body: "A 5-minute view of role fit, then a slot to talk.",
    links: [
      { label: "View resume", to: "/resume" as const },
      { label: "Book a call", href: "/contact/#book" },
    ],
  },
  {
    eyebrow: "Building?",
    title: "Payments essays and the infrastructure notes.",
    body: "Field notes on rails, reconciliation, KYB and AI in operations. Advisory opens Q4.",
    links: [
      { label: "Read the blog", to: "/blog" as const },
      { label: "Get the notes", href: profile.newsletter.href },
    ],
  },
  {
    eyebrow: "Press or speaking?",
    title: "Talks, podcasts and press.",
    body: "Frontier-market payments, regulated-fintech product and AI-assisted delivery.",
    // /speaking is PARKED until 2027-01-06 — route through /contact (has a
    // "Speaking / podcast" option) instead of the noindexed page.
    links: [{ label: "Get in touch", to: "/contact" as const }],
  },
] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      // Duration framing per owner ruling 2026-07-06 (never "since 2009");
      // the year count is computed in profile.ts so it can't go stale.
      { title: `About Rizwan Zafar — ${profile.career.years} Years Across MENA & South Asia` },
      {
        name: "description",
        content:
          "The operator story: engineering to product, why frontier markets became the specialty, and the beliefs that shape how I build payment infrastructure.",
      },
      {
        property: "og:title",
        content: "About Rizwan Zafar — A Payments Operator's Story",
      },
      {
        property: "og:description",
        content:
          "Engineering to delivery to product. Why frontier markets. Three operating beliefs from building regulated payment infrastructure.",
      },
      { property: "og:url", content: absUrl("/about") },
      { property: "og:type", content: "profile" },
      { name: "twitter:title", content: "About Rizwan Zafar — A Payments Operator's Story" },
      {
        name: "twitter:description",
        content:
          "Engineering to product, why frontier markets, and three operating beliefs from building payment infrastructure.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(aboutPageJsonLd) }],
  }),
  component: AboutPage,
});

function AboutPage() {
  // Shared chip-link grammar for the header CTAs: ≥24px tap target,
  // focus-visible ring parity with the homepage CTAs.
  const chipClass =
    "inline-flex items-center gap-1 rounded-full border border-ink/20 px-3.5 py-1.5 text-xs font-medium text-ink hover:border-ink/50 hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  // Text-link grammar for the doorway columns — mirrors the homepage
  // GetInTouchBand (py/-my grows the hit area past 24px without shifting layout).
  const doorLinkClass =
    "group/link inline-flex items-center gap-1.5 py-1.5 -my-1.5 text-sm text-ink hover:text-[var(--brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";
  return (
    <div className="pt-14 md:pt-20 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* 1 — Cold open. Statement page header in the console language: ◆ mono
            eyebrow → monument serif H1 with the italic-cyan signature close.
            Same sentence; the em dash became a colon while re-wrapping (charter
            ban). Long prose below stays on a max-w-3xl serif measure. */}
        <header>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ The operator story
          </div>
          <h1 className="mt-6 font-instrument tracking-[-0.02em] leading-[1.0] text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink">
            The first payment system I ran was judged by whether failure had consequences:
            reliability wasn't a metric,{" "}
            <span className="italic text-[var(--brand)]">it was the job.</span>
          </h1>
          <p className="mt-8 max-w-3xl font-serif text-[17px] md:text-lg text-ink-soft leading-[1.75]">
            That standard came from before payments. My career started on power-utility
            infrastructure — five substations, field operations, downtime monitoring — where a
            system that fell over had immediate, physical consequences. I have carried that
            definition of "done" through every role since.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Link to="/resume" className={chipClass}>
              View resume
            </Link>
            <a href="/Rizwan_Zafar_Resume.pdf" className={chipClass}>
              Download PDF
            </a>
          </div>
        </header>

        {/* 2 — The arc */}
        <section className="rz-beam mt-14 md:mt-20 border-t border-rule pt-10 md:pt-12">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ The arc
          </div>
          <h2 className="mt-3 font-instrument text-[clamp(1.75rem,3.4vw,3rem)] text-ink leading-[1.08]">
            Engineering → delivery → product
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 font-serif text-[17px] text-ink-soft leading-[1.75]">
            <p>
              I began as a planning engineer on utility and power infrastructure in Karachi (PESCO,
              2009), then moved into programme delivery — a $15M engineering portfolio at DS
              Engineering, ERP and IT projects in the Democratic Republic of the Congo at CIMKO, and
              my first Dubai role building a PMO from nothing for a $12M+ portfolio at Wing Logic.
              Different industries, one thread: plan for the day nothing is reliable.
            </p>
            <p>
              Product followed delivery. At Tapmad I owned monetization for Pakistan's leading OTT
              platform and built the billing that turned it into a business. At Daraz (Alibaba
              Group) I ran payment operations across five markets through a COVID volume surge. Then
              at Simpaisa I became Chief Product Officer, building full-stack payment infrastructure
              — card acquiring, wallets, cross-border corridors, settlement and the risk controls
              underneath.
            </p>
            <p>
              Frontier markets became the specialty on purpose. Constraint breeds operators: when
              the rails are fragmented, the regulator is watching and the infrastructure is
              unreliable, you learn to build products that survive contact with reality. That is the
              work I am best at, and the work I chose.
            </p>
          </div>

          {/* Compact career spine — honest, role-scoped, no platform metrics here.
              data-rz-stagger cascades the rows in; the ◆ eyebrow + h2 sit OUTSIDE
              this wrapper so the child-hiding CSS never touches the heading. */}
          <ol data-rz-stagger className="mt-9 border-t border-rule">
            {[
              { years: "2009", label: "PESCO — Sr. Planning Engineer (power infrastructure)" },
              { years: "2012", label: "DS Engineering — Project Manager, PMO" },
              { years: "2016", label: "CIMKO — Asst. Manager, Projects (DR Congo)" },
              { years: "2017", label: "Wing Logic — PMO & Project Manager (first Dubai role)" },
              { years: "2017", label: "Tapmad — Sr. Project & Product Manager (OTT billing)" },
              { years: "2020", label: "Daraz (Alibaba Group) — PM, Payments Operations" },
              { years: "2020", label: "Simpaisa — Chief Product Officer (acting CTO, 2024)" },
            ].map((step, i) => (
              <li
                key={`${step.years}-${i}`}
                className="flex items-baseline gap-5 border-b border-rule py-3.5"
              >
                <span className="font-mono-tech text-xs text-[var(--brand)] tabular-nums w-12 shrink-0">
                  {step.years}
                </span>
                <span className="text-sm md:text-[15px] text-ink leading-snug">{step.label}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 3 — Three operating beliefs. Numbered editorial index (statement
            numerals) on a divide-y list, not a callout card. */}
        <section className="rz-beam mt-14 md:mt-20 border-t border-rule pt-10 md:pt-12">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Operating beliefs
          </div>
          <h2 className="mt-3 font-instrument text-[clamp(1.75rem,3.4vw,3rem)] text-ink leading-[1.08]">
            Three operating beliefs
          </h2>
          <div data-rz-stagger className="mt-9 border-t border-rule divide-y divide-rule">
            {beliefs.map((belief, i) => (
              <div key={belief.claim} className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                <div
                  className="font-mono-tech text-4xl md:text-5xl leading-none text-[var(--brand)]/25 tabular-nums select-none md:col-span-2"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-instrument text-xl md:text-2xl text-ink leading-snug">
                    {belief.claim}
                  </h3>
                  <p className="mt-3 max-w-2xl font-serif text-[15px] md:text-base text-ink-soft leading-[1.7]">
                    {belief.gloss}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 — Credentials, scope-tagged */}
        <section className="rz-beam mt-14 md:mt-20 border-t border-rule pt-10 md:pt-12">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Credentials
          </div>
          <h2 className="mt-3 font-instrument text-[clamp(1.75rem,3.4vw,3rem)] text-ink leading-[1.08]">
            The paper trail
          </h2>
          <p className="mt-4 max-w-3xl font-serif text-[17px] text-ink-soft leading-[1.7]">
            Executive education, professional certifications, recognition, chapter service, and the
            compliance programmes I stood up. The last line is Simpaisa-platform scope.
          </p>
          <dl className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {credentialGroups.map((group) => (
              <div key={group.label}>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                  {group.label}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-rule bg-surface px-2.5 py-1 text-xs text-ink leading-snug"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 5 — Multi-audience close. Divided columns (homepage GetInTouchBand
            grammar), not a uniform card grid. Stagger on the columns wrapper
            only; each column carries data-glow (composes with the divide-x). */}
        <section className="rz-beam mt-14 md:mt-20 border-t border-rule pt-10 md:pt-12">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Three doorways
          </div>
          <h2 className="mt-3 font-instrument text-[clamp(1.75rem,3.4vw,3rem)] text-ink leading-[1.08]">
            Where to go next
          </h2>
          <div
            data-rz-stagger
            className="mt-9 grid gap-y-10 border-t border-rule pt-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[color:var(--rule)] md:pt-0"
          >
            {doorways.map((door) => (
              <div
                key={door.eyebrow}
                data-glow
                className="relative flex flex-col md:px-8 md:py-8 md:first:pl-0 md:last:pr-0"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                  {door.eyebrow}
                </div>
                <h3 className="mt-3 font-instrument text-xl md:text-2xl text-ink leading-snug">
                  {door.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft leading-relaxed">{door.body}</p>
                <div className="mt-6 flex flex-col gap-2.5">
                  {door.links.map((link) =>
                    "to" in link ? (
                      <Link key={link.label} to={link.to} className={doorLinkClass}>
                        {link.label}
                        <span
                          className="transition-transform group-hover/link:translate-x-0.5"
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    ) : (
                      <a key={link.label} href={link.href} className={doorLinkClass}>
                        {link.label}
                        <span
                          className="transition-transform group-hover/link:translate-x-0.5"
                          aria-hidden
                        >
                          →
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
