import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { absUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/resume")({
  head: () => {
    const url = absUrl("/resume");
    return {
      meta: [
        { title: "Resume | Rizwan Zafar, Product & Program Executive" },
        {
          name: "description",
          content:
            "Executive resume — Product & Program leader in fintech: 14+ years, $1B+ GTV, 25M+ monthly transactions, 7 markets, 50+ FI partners. Dubai.",
        },
        { property: "og:title", content: "Resume — Rizwan Zafar, Payments Product Executive" },
        {
          property: "og:description",
          content:
            "Executive resume: payments product leadership, payment infrastructure, settlement, KYC/KYB, AML/CFT, fraud, cross-border rails. $1B+ GTV, 25M+ tx/mo.",
        },
        { property: "og:url", content: url },
        { property: "og:type", content: "profile" },
        { name: "twitter:title", content: "Resume — Rizwan Zafar, Payments Product Executive" },
        {
          name: "twitter:description",
          content:
            "Executive resume: payments product, infrastructure, risk, cross-border. $1B+ GTV, 25M+ tx/mo.",
        },
      ],
      links: [
        { rel: "canonical", href: url },
        {
          rel: "alternate",
          type: "application/pdf",
          href: profile.resumeHref,
          title: "Download PDF resume",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url,
            mainEntity: {
              "@type": "Person",
              name: profile.name,
              jobTitle: "Chief Product Officer, Payments",
              url: SITE_URL,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Resume", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {/* Top, recruiter snapshot */}
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Resume
      </div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-instrument text-4xl md:text-5xl text-ink leading-tight">
            {profile.name}, Payments Product Executive
          </h1>
          <p className="mt-2 text-ink-soft">
            {profile.role} · {profile.location}
          </p>
        </div>
        <a
          href={profile.resumeHref}
          download
          className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
          Download Resume (PDF)
        </a>
      </div>

      {/* Executive summary */}
      <section className="mt-10 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
            Executive summary
          </div>
        </div>
        <p className="md:col-span-8 font-instrument text-2xl text-ink leading-snug">
          14+ years across product, payments and complex program delivery, including 8+ years
          building regulated payment infrastructure in complex markets. Currently CPO at Simpaisa:
          $1B+ annual GTV, 25M+ monthly transactions across 7 markets, 50+ bank, wallet and FI
          partners. Led PCI DSS and ISO/IEC 27001 certification programs from scratch and held a
          dual CPO + acting CTO role through a regulatory tightening.
        </p>
      </section>

      {/* Metrics */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-6 border-y border-rule py-6">
        {profile.metrics.map((m) => (
          <div key={m.label}>
            <div className="font-mono-tech text-xl text-ink">{m.value}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
              {m.label}
            </div>
          </div>
        ))}
      </section>

      {/* Target roles */}
      <section className="mt-10 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
            Target roles
          </div>
        </div>
        <div className="md:col-span-8">
          <ul className="grid sm:grid-cols-2 gap-2 text-ink">
            {profile.targetRoles.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm">
                <span className="text-[var(--accent-emerald)] mt-1.5 h-1 w-1 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-5 text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
            Relevant for
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.relevantFor.map((c) => (
              <span
                key={c}
                className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink bg-surface"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-14">
        <h2 className="font-instrument text-3xl text-ink mb-6">Experience</h2>
        <div className="space-y-10">
          {profile.experience.map((e) => (
            <div key={e.company} className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3 text-sm text-ink-soft">
                <div className="font-mono-tech">{e.period}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] mt-1 font-mono-tech">
                  {e.location}
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="font-instrument text-lg text-ink">
                  {e.role} · {e.company}
                </div>
                <ul className="mt-3 space-y-2 text-ink-soft">
                  {e.bullets.map((b) => (
                    <li key={b} className="pl-4 relative text-sm">
                      <span className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-accent-emerald" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="font-instrument text-3xl text-ink mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {profile.skills.map((s) => (
            <div key={s.group}>
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft mb-3 font-mono-tech">
                {s.group}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink bg-surface"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education + Certifications */}
      <section className="mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-instrument text-2xl text-ink mb-4">Education</h2>
          <ul className="space-y-4">
            {profile.education.map((e) => (
              <li key={`${e.school}-${e.degree}`}>
                <div className="font-instrument text-base text-ink">{e.degree}</div>
                <div className="text-sm text-ink-soft">{e.school}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
                  {e.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-instrument text-2xl text-ink mb-4">Certifications</h2>
          <ul className="space-y-2 text-ink-soft">
            {profile.certifications.map((c) => (
              <li key={c} className="text-sm">
                · {c}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">
            PCI DSS and ISO/IEC 27001 reflect program leadership at Simpaisa, not personal
            lead-auditor certification.
          </p>
          <h2 className="font-instrument text-2xl text-ink mb-4 mt-10">Honors</h2>
          <ul className="space-y-3">
            {profile.honors.map((h) => (
              <li key={h.title}>
                <div className="font-instrument text-base text-ink">{h.title}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-1 font-mono-tech">
                  {h.issuer} · {h.year}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14 border-t border-rule pt-8 flex flex-wrap gap-3">
        <a
          href={profile.resumeHref}
          download
          className="inline-flex items-center rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
        >
          Download Resume (PDF)
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink/5"
        >
          LinkedIn profile
        </a>
      </section>
    </div>
  );
}
