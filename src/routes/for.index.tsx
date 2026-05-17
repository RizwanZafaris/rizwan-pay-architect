import { createFileRoute, Link } from "@tanstack/react-router";
import { audiences, getHub, postsForHub, caseStudiesForHub, type Audience } from "@/data/hubs";
import { profile } from "@/data/profile";
import { absUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/for/")({
  head: () => ({
    meta: [
      { title: "For Recruiters — Rizwan Zafar | Payments" },
      {
        name: "description",
        content:
          "Recruiter view by lens: Visa/Mastercard, Stripe/Adyen/Wise/Thunes, banks and regulated fintechs. Target roles, proof metrics, top case studies and essays.",
      },
      { property: "og:title", content: "For Recruiters — Rizwan Zafar" },
      { property: "og:description", content: "Recruiter lenses, proof and resume in one page." },
      { property: "og:url", content: absUrl("/for") },
      { name: "twitter:title", content: "For Recruiters — Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Lensed view for Visa/MC, Stripe/Adyen/Wise/Thunes, and banks. Target roles, proof, case studies.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/for") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absUrl("/for"),
          mainEntity: { "@type": "Person", name: profile.name, url: SITE_URL },
        }),
      },
    ],
  }),
  component: ForIndex,
});

// Recruiter-facing target roles per audience
const TARGET_ROLES: Record<Audience["slug"], string[]> = {
  "visa-mastercard": [
    "Director / Sr Director, Acceptance Product",
    "Head of Cross-Border Product",
    "Tokenization & Scheme Settlement PM",
    "Emerging-Markets Product Lead",
  ],
  "stripe-adyen-wise-thunes": [
    "Product Lead, Payment Orchestration",
    "Head of Local Payment Methods",
    "Director, Payouts & Cross-Border",
    "Product Manager, Developer Experience",
  ],
  "banks-fintechs": [
    "Head of Payments Product (Sponsor bank)",
    "Director, Compliance & Risk Product",
    "Head of SWIFT / ISO 20022 Programme",
    "Head of Regulated Onboarding (KYC/KYB)",
  ],
};

// Tailored proof per audience — avoids repeating the same metrics
const PROOF: Record<Audience["slug"], { label: string; value: string }[]> = {
  "visa-mastercard": [
    { label: "Annual GTV cleared", value: "$1B+" },
    { label: "Card acceptance markets", value: "5" },
    { label: "Scheme settlement SLA", value: "99.95%" },
    { label: "Tokenization & 3DS rollout", value: "MPGS · MDES" },
    { label: "Cross-border corridors", value: "MENA · S. Asia" },
    { label: "Fraud loss", value: "<0.1% GTV" },
  ],
  "stripe-adyen-wise-thunes": [
    { label: "Unified pay-in / payout API", value: "1 contract" },
    { label: "Local payment methods", value: "Cards · Wallets · DCB · IBFT" },
    { label: "Corridor partners integrated", value: "DLocal · Thunes · Boku · Coda" },
    { label: "Payment cost (OTT migration)", value: "~50% → ~1%" },
    { label: "Monthly transactions", value: "25M+" },
    { label: "Developer surface", value: "Idempotent · webhook-first" },
  ],
  "banks-fintechs": [
    { label: "AML/CFT monitoring", value: "Rules + models in prod" },
    { label: "Sanctions screening", value: "Real-time + batch re-screen" },
    { label: "PCI DSS", value: "Programme-led" },
    { label: "ISO 27001", value: "Programme-led" },
    { label: "SWIFT CSP attestation", value: "Annual" },
    { label: "ISO 20022 readiness", value: "MX-shaped data model" },
  ],
};

function ForIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16 sm:py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ For recruiters
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        Pick your lens. Read the work in your language.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Three recruiter paths through the same body of work — networks, orchestrators, and regulated
        fintechs. Each section lists target roles, proof you can verify, the most relevant case
        studies and essays, and a way to start a conversation.
      </p>

      {/* Quick anchor tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {audiences.map((a) => (
          <a
            key={a.slug}
            href={`#${a.slug}`}
            className="text-xs px-3 py-1.5 rounded-full border border-rule text-ink-soft hover:text-ink hover:border-ink/40 transition-colors font-mono-tech uppercase tracking-[0.12em]"
          >
            {a.shortTitle}
          </a>
        ))}
        <a
          href={profile.resumeHref}
          download
          className="ml-auto text-xs px-3 py-1.5 rounded-full bg-ink text-background hover:bg-brand transition-colors font-mono-tech uppercase tracking-[0.12em]"
        >
          Download résumé (PDF)
        </a>
      </div>

      {audiences.map((a) => {
        const studies = a.hubs
          .flatMap((h) => caseStudiesForHub(h))
          .filter((c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i)
          .slice(0, 3);
        const essays = a.hubs
          .flatMap((h) => postsForHub(h))
          .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
          .slice(0, 3);

        return (
          <section
            key={a.slug}
            id={a.slug}
            className="mt-16 scroll-mt-24 border-t border-rule pt-12"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
                  ◆ {a.shortTitle}
                </div>
                <h2 className="font-instrument text-3xl md:text-4xl text-ink mt-2 leading-tight max-w-2xl">
                  {a.title}
                </h2>
                <p className="mt-3 text-ink-soft max-w-2xl">{a.intro}</p>
              </div>
            </div>

            {/* Target companies */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-2">
                Target companies
              </div>
              <div className="flex flex-wrap gap-2">
                {a.companies.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface font-mono-tech uppercase tracking-[0.1em]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {/* Target roles */}
              <div className="rounded-2xl border border-rule bg-surface p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Target roles
                </div>
                <ul className="mt-3 space-y-2">
                  {TARGET_ROLES[a.slug].map((r) => (
                    <li key={r} className="text-sm text-ink leading-snug flex gap-2">
                      <span className="text-[var(--brand)] mt-1.5 h-1 w-1 rounded-full bg-current shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tailored proof */}
              <div className="rounded-2xl border border-rule bg-surface p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Proof tailored to this lens
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                  {PROOF[a.slug].map((m) => (
                    <div key={m.label}>
                      <dt className="text-[10px] uppercase tracking-[0.12em] text-ink-soft font-mono-tech">
                        {m.label}
                      </dt>
                      <dd className="font-instrument text-base text-ink mt-0.5 leading-tight">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Top case studies */}
            {studies.length > 0 && (
              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3">
                  Top 3 case studies for this lens
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {studies.map((c) => (
                    <Link
                      key={c.slug}
                      to="/product-work/$slug"
                      params={{ slug: c.slug }}
                      className="group block bg-surface border border-rule rounded-2xl p-5 hover:border-ink/30 transition-colors"
                    >
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent-emerald)] font-mono-tech">
                        {c.category}
                      </div>
                      <div className="font-instrument text-base text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                        {c.title}
                      </div>
                      <p className="text-xs text-ink-soft mt-2 leading-relaxed">{c.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Top essays */}
            {essays.length > 0 && (
              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3">
                  Top 3 essays for this lens
                </div>
                <ul className="divide-y divide-rule border-y border-rule">
                  {essays.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="group flex items-center justify-between py-3 gap-4"
                      >
                        <span className="font-instrument text-base text-ink group-hover:text-[var(--brand)] transition-colors">
                          {p.title}
                        </span>
                        <span className="text-xs text-ink-soft font-mono-tech whitespace-nowrap">
                          {p.readingTime}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resumeHref}
                download
                className="inline-flex rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
              >
                Download résumé (PDF)
              </a>
              <Link
                to="/contact"
                className="inline-flex rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
              >
                Discuss a role
              </Link>
              {a.hubs.slice(0, 2).map((slug) => {
                const h = getHub(slug);
                if (!h) return null;
                return (
                  <Link
                    key={slug}
                    to="/blog"
                    search={{ q: "", hub: slug, reader: "", company: "" }}
                    className="inline-flex items-center text-sm text-ink-soft hover:text-ink underline underline-offset-4"
                  >
                    Filter essays — {h.shortTitle}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Closing CTA */}
      <div className="mt-20 rounded-3xl border border-ink/10 bg-surface p-8 md:p-12">
        <h2 className="font-instrument text-2xl md:text-3xl text-ink leading-tight">
          Open to senior payments product roles.
        </h2>
        <p className="mt-3 text-ink-soft max-w-2xl">
          Based in {profile.location}. Reference-available. Most useful to networks, orchestrators,
          and regulated fintechs operating across MENA, South Asia, and global cross-border.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={profile.resumeHref}
            download
            className="inline-flex rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
          >
            Download résumé (PDF)
          </a>
          <Link
            to="/contact"
            className="inline-flex rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
