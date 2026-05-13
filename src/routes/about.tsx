import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { recommendations } from "@/data/recommendations";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rizwan Zafar | Payments Product Executive" },
      {
        name: "description",
          content:
          "Engineer-turned-CPO building regulated payment infrastructure across emerging markets — $1B+ GTV, PCI DSS and ISO 27001 from scratch.",
      },
      { property: "og:title", content: "About Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Engineer-turned-payments-CPO. $1B+ GTV. PCI DSS + ISO 27001 from scratch. Recommendations from people who've worked with him.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12">
        <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">About</div>
        <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
          Engineer first. Payments operator second. Product leader by design.
        </h1>
        <div className="prose-editorial mt-10">
          <p>
            I started in control rooms — five substations, real-time data, and people
            depending on the systems staying up. Three years at PESCO taught me what
            reliability actually means when failure has consequences. Then four years
            at DS Engineering running a $15M portfolio of 400+ projects, building
            reporting that lifted delivery efficiency 70%. I learned that execution
            matters more than plans.
          </p>
          <p>
            In 2016 I moved to the Democratic Republic of the Congo to run $8M+ of IT
            infrastructure work for CIMKO. Limited infrastructure, unpredictable
            logistics, frequent power cuts. I learned to plan when nothing is reliable
            — a mindset that carried into payments. Then Dubai, where I built a PMO from
            nothing for a $12M+ project portfolio at Wing Logic and dropped delays 40%.
          </p>
          <p>
            The leap into payments was Tapmad. The OTT business was being eaten alive
            by payment cost — telco margins consuming half the revenue. I designed and
            launched Direct Carrier Billing across all four major telcos, scaled from
            zero to 5M paid subscribers in under three years, then migrated billing to
            wallet-based rails and pulled payment cost from 50% to 1%. ARPU climbed
            70%. We expanded the rails into UAE and KSA. That's when I understood that
            payments product is unit-economics work first and UX work second.
          </p>
          <p>
            Daraz (Alibaba Group) followed — payment operations across five markets
            during a COVID-driven volume surge: settlement cycles, dispute resolution,
            fraud rule configuration, COD-to-digital conversion. Useful exposure to
            multi-country reconciliation and payment compliance at Alibaba scale.
          </p>
          <p>
            Since 2020 I've been Chief Product Officer at Simpaisa, building regulated
            payment infrastructure across Pakistan, Bangladesh, Nepal, Iraq and Egypt.
            Card acquiring (MPGS/MDES), wallets, DCB, IBFT, payouts, cross-border
            corridors with real-time FX. Merchant onboarding cut from weeks to hours.
            Fraud loss held below 0.1% of GTV. Platform downtime down 90%. Local
            infrastructure partner for DLocal, Thunes, Boku and Coda — enabling
            TikTok, Temu, Uber, InDrive, MoneyGram and PUBG to collect and disburse
            where they had no local rails. $1B+ GTV. 25M+ monthly transactions. 99.95%
            settlement SLA.
          </p>
          <p>
            In 2024 our CTO left as regulators tightened. I took on dual CPO + acting
            CTO and held platform stability, security architecture and product
            direction at the same time. Built PCI DSS and ISO 27001 from scratch. The
            team — 25+ people across product, engineering, ops, risk and compliance —
            kept shipping.
          </p>
          <h2>Where I'm headed</h2>
          <p>
            I'm focused on senior product and payment infrastructure roles at
            companies building serious payments platforms — Visa, Mastercard, Stripe,
            Wise, Adyen, Thunes and similar. Based in Dubai. Open to UAE, KSA,
            Singapore, MENA, Europe and global fintech.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/product-work"
            className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
          >
            See product work
          </Link>
          <a
            href={profile.resumeHref}
            download
            className="inline-flex items-center rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-background transition-colors"
          >
            Download resume
          </a>
        </div>
      </section>

      {/* Education + Honors strip */}
      <section className="border-t border-rule bg-surface-2">
        <div className="mx-auto max-w-5xl px-6 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Education</div>
            <ul className="mt-4 space-y-3">
              {profile.education.map((e) => (
                <li key={`${e.school}-${e.degree}`}>
                  <div className="font-display text-base text-ink">{e.degree}</div>
                  <div className="text-sm text-ink-soft">{e.school}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mt-1">
                    {e.period}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Certifications</div>
            <ul className="mt-4 space-y-2 text-ink">
              {profile.certifications.map((c) => (
                <li key={c} className="text-sm">· {c}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Honors</div>
            <ul className="mt-4 space-y-3">
              {profile.honors.map((h) => (
                <li key={h.title}>
                  <div className="font-display text-base text-ink">{h.title}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mt-1">
                    {h.issuer} · {h.year}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xs uppercase tracking-[0.14em] text-ink-soft">
              Volunteering
            </div>
            <ul className="mt-3 space-y-3">
              {profile.volunteering.map((v) => (
                <li key={`${v.org}-${v.role}`}>
                  <div className="text-sm text-ink">{v.role}</div>
                  <div className="text-xs text-ink-soft">{v.org} · {v.period}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">
            Recommendations
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mt-2 max-w-3xl">
            From the people who've actually worked with me.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {recommendations.map((r) => (
              <figure
                key={r.name}
                className="border border-rule bg-surface p-7 rounded-lg flex flex-col"
              >
                <blockquote className="text-ink leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-5 border-t border-rule">
                  <div className="text-sm font-medium text-ink">{r.name}</div>
                  <div className="text-xs text-ink-soft mt-1">
                    {r.title} · {r.company}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft mt-1">
                    {r.date}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
