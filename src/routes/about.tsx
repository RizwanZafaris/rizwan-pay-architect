import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { legacyRecommendations, paymentsRecommendations } from "@/data/recommendations";
import { absUrl } from "@/lib/seo";
// 96×96 circle on this page — using the small WebP cutout (24KB) instead of the
// 1.3MB full JPG. Same person, same brand asset, 50× smaller payload.
import portrait from "@/assets/rizwan-zafar-cutout-460.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About, Rizwan Zafar | Payments Product Executive (Dubai)" },
      {
        name: "description",
        content:
          "Engineer-turned-payments-CPO building regulated payment infrastructure across emerging markets, $1B+ GTV, PCI DSS and ISO 27001 from scratch.",
      },
      { property: "og:title", content: "About Rizwan Zafar, Payments Product Executive" },
      {
        property: "og:description",
        content:
          "14+ years across product, payments and program delivery. 8+ years building regulated payments infrastructure.",
      },
      { property: "og:url", content: absUrl("/about") },
      { name: "twitter:title", content: "About Rizwan Zafar, Payments Product Executive" },
      {
        name: "twitter:description",
        content:
          "Engineer-first payments CPO. 14+ years; 8+ in regulated payments. $1B+ GTV at Simpaisa.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absUrl("/about"),
          mainEntity: { "@type": "Person", name: "Rizwan Zafar", url: absUrl("/about") },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12">
        <div className="flex items-center gap-5 mb-8">
          <img
            src={portrait}
            alt="Portrait of Rizwan Zafar"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover ring-1 ring-ink/10 shadow-sm"
          />
          <div>
            <div className="font-instrument text-xl text-ink leading-tight">{profile.name}</div>
            <div className="text-sm text-ink-soft mt-1">{profile.role} · Dubai</div>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
          ◆ About
        </div>
        <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
          Engineer first.
          <br />
          Payments operator second.
          <br />
          <span className="italic text-ink-soft">Product leader by design.</span>
        </h1>

        <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Product &amp; Program leader in regulated payments. 14+ years across product, payments,
          programme delivery and digital transformation. Currently CPO at Simpaisa: helped scale the
          B2B payments platform from $0 to $1B+ TPV across 7 markets, 50+ bank, wallet and FI
          partners, built the 40-engineer organisation from 2 people across 12 cross-functional
          squads, deployed 4 production GenAI solutions, and infrastructure now used by TikTok,
          Uber, Temu, InDrive, MoneyGram and PUBG. Earlier: $3M digital transformation programme at
          TapmadTV, payments ops at Daraz (Alibaba Group), PMO setups at Wing Logic and DS
          Engineering. PMP, PMI-ACP, CSPO, CSM, COBIT 5, ITIL v3. Engineer's discipline, programme
          manager's tempo, regulator's vocabulary.
        </p>

        <div className="prose-editorial mt-10">
          <p>
            Before payments, I learned reliability in systems where failure had real consequences,
            five substations, real-time data, control-room shifts. That operating discipline shaped
            how I build payment infrastructure today.
          </p>
          <p>
            14+ years across product, payments and complex program delivery, including 8+ years
            building regulated payment infrastructure at scale. PMO years at DS Engineering and Wing
            Logic taught me to make governance useful instead of bureaucratic. A year in the DRC
            running $8M of IT infrastructure taught me to plan when nothing is reliable.
          </p>
          <p>
            Tapmad was the leap into payments. A subscription business being eaten alive by telco
            margins. I launched DCB across all four major telcos, then migrated the rail mix to
            wallets, payment cost dropped from ~50% of revenue to ~1%, ARPU grew 70%, and we scaled
            past 5M paid subscribers. That's when I learned that payments product is unit-economics
            work first and UX work second.
          </p>
          <p>
            Daraz (Alibaba Group) added multi-country payment operations during a COVID volume surge
            , settlement, disputes, fraud rule configuration, COD-to-digital conversion across five
            markets. Useful exposure to recon and compliance at Alibaba scale.
          </p>
          <p>
            Since 2020 I've been CPO at Simpaisa, building regulated payment infrastructure across
            Pakistan, Bangladesh, Nepal, Iraq and Egypt. Card acquiring (MPGS/MDES), wallets, DCB,
            IBFT, payouts, cross-border corridors with real-time FX. Onboarding cut from weeks to
            hours. Fraud loss below 0.1% of GTV. Payment failure rate down from ~8% to ~1.2% through
            routing, retries and acquirer SLA management. Downtime down 90%. Local infrastructure
            partner for DLocal, Thunes, Boku and Coda, enabling TikTok, Temu, Uber, InDrive,
            MoneyGram and PUBG to collect and disburse where they had no local rails. $1B+ GTV. 25M+
            monthly transactions. 99.95% settlement SLA. Built and led a 40-engineer payments org
            across 12 cross-functional squads. Launched BNPL from 0 to 100K users in 8 months. PCI
            DSS and ISO/IEC 27001 from scratch. Dual CPO + acting CTO through 2024 regulatory
            tightening.
          </p>
          <h2>Where I'm headed</h2>
          <p>
            Senior product and payment infrastructure roles at companies building serious payments
            platforms, Visa, Mastercard, Stripe, Wise, Adyen, Thunes, DLocal and similar. Open to
            UAE, KSA, Singapore, MENA, Europe and global roles across fintechs, banks, financial
            institutions, payment networks and digital platforms.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/product-work"
            className="inline-flex items-center rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
          >
            See product work
          </Link>
          <a
            href={profile.resumeHref}
            download
            className="inline-flex items-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-background transition-colors"
          >
            Download resume
          </a>
        </div>
      </section>

      {/* Education + Certifications + Honors */}
      <section className="border-t border-rule bg-surface-2">
        <div className="mx-auto max-w-5xl px-6 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Education
            </div>
            <ul className="mt-4 space-y-3">
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
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Certifications
            </div>
            <ul className="mt-4 space-y-2 text-ink">
              {profile.certifications.map((c) => (
                <li key={c} className="text-sm">
                  · {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Honors
            </div>
            <ul className="mt-4 space-y-3">
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
        </div>
      </section>

      {/* Recommendations */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
            ◆ Recommendations
          </div>

          {/* Modern payments-era */}
          <h2 className="font-instrument text-3xl md:text-4xl text-ink mt-3 max-w-3xl">
            From payments leaders <span className="italic text-ink-soft">, in progress.</span>
          </h2>

          {paymentsRecommendations.length === 0 ? (
            <div className="mt-8 border border-dashed border-rule rounded-2xl p-8 bg-surface-2/60">
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                Proof still being gathered
              </div>
              <p className="mt-3 text-ink-soft max-w-2xl">
                Modern fintech recommendations from payments leaders, partners and regulators are
                being collected and will appear here. For now, references are available on request.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink hover:text-[var(--brand)]"
              >
                Request references <span aria-hidden>→</span>
              </a>
            </div>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 gap-5">
              {paymentsRecommendations.map((r) => (
                <figure key={r.name} className="border border-rule bg-surface p-7 rounded-2xl">
                  <blockquote className="font-instrument text-lg text-ink leading-snug">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-5 pt-5 border-t border-rule text-sm">
                    <div className="text-ink font-medium">{r.name}</div>
                    <div className="text-ink-soft text-xs mt-1">
                      {r.title} · {r.company}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {/* Legacy, collapsed and de-emphasized */}
          {legacyRecommendations.length > 0 && (
            <details className="mt-16 group">
              <summary className="cursor-pointer list-none flex items-center gap-3 text-sm text-ink-soft hover:text-ink">
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em]">
                  Earlier career references (pre-payments)
                </span>
                <span className="h-px flex-1 bg-rule" />
                <span className="text-xs">{legacyRecommendations.length} entries</span>
                <span className="transition-transform group-open:rotate-90">→</span>
              </summary>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {legacyRecommendations.map((r) => (
                  <figure key={r.name} className="border border-rule bg-surface/60 p-5 rounded-xl">
                    <blockquote className="text-sm text-ink-soft leading-relaxed">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 pt-4 border-t border-rule text-xs text-ink-soft">
                      <span className="text-ink">{r.name}</span> · {r.title} · {r.company} ·{" "}
                      {r.date}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </details>
          )}
        </div>
      </section>
    </div>
  );
}
