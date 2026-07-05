import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { absUrl, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

// /speaking — brand-rebuild strategy doc §5. Talks + podcasts/press + CFP kit
// for organisers. JS-less: motion is a single inline <style> block (CSS-only,
// honours prefers-reduced-motion). No fabricated talks or embeds: the three
// talks below are offered/ready-to-book (not claimed past appearances), and
// the MoneyPetrol podcast is INBOUND — shown as an upcoming recording, not a
// live embed or a claimed date. Two-tier claims gate respected: career-arc
// markers and Simpaisa-platform metrics never share a clause (see
// scripts/seo-audit.ts). Every fact traces to src/data/profile.ts.

const speakingPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absUrl("/speaking")}#profilepage`,
  url: absUrl("/speaking"),
  name: "Speaking — Rizwan Zafar",
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
  primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE_URL, width: 1200, height: 630 },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: profile.name,
    jobTitle: profile.role,
    url: absUrl("/speaking"),
    sameAs: profile.entitySameAs,
    knowsAbout: [
      "Frontier-market payments",
      "Payment acceptance",
      "Carrier billing (DCB)",
      "Regulated fintech product leadership",
      "AI-assisted software delivery",
    ],
  },
};

// Self-contained, page-namespaced motion (no styles.css edit). Opt-in under
// prefers-reduced-motion: no-preference; otherwise content is fully visible.
const speakingMotionCss = `
.speaking-page [data-reveal]{opacity:1}
@media (prefers-reduced-motion: no-preference){
  .speaking-page [data-reveal]{
    opacity:0;
    transform:translateY(12px);
    animation:speaking-reveal 620ms cubic-bezier(0.2,0.8,0.2,1) forwards;
    animation-delay:var(--motion-delay,0ms);
  }
  @keyframes speaking-reveal{to{opacity:1;transform:none}}
}
`;

const delayStyle = (ms: number) => ({ "--motion-delay": `${ms}ms` }) as CSSProperties;

// Ready-to-book talks — titles verbatim from the strategy doc. Abstracts are
// grounded in real work (Simpaisa acceptance; Tapmad DCB; the 4 production
// GenAI solutions). These are talks he can give, not past appearances.
// NOTE (two-tier gate): the first title carries "$1B" (platform scope); its
// abstract stays platform-scoped and never adds a career marker in the same
// clause.
const talks = [
  {
    tag: "Payments",
    title: "What $1B in frontier-market GTV taught me about acceptance",
    abstract:
      "The unglamorous mechanics behind payment success in hard markets: authorization-rate optimisation, retry orchestration, bank-SLA management and routing across acquiring partners. How a platform reached 97% payment success at 90% straight-through processing — and what breaks when you try.",
  },
  {
    tag: "Product",
    title: "Carrier billing: the payment method the West forgot",
    abstract:
      "Direct Carrier Billing put a streaming business on the map across four telcos and grew it to millions of paid subscribers — then its economics nearly killed it. The case for DCB, why it hands half your revenue to the carrier, and how the migration to wallet-based billing fixed the unit economics.",
  },
  {
    tag: "AI",
    title: "Shipping product with AI agents — a CPO's production diary",
    abstract:
      "Four GenAI systems running in real payment operations: a merchant-integration chatbot, an incident auto-escalation agent, partner-support automation and a fraud/AML pilot with a banking partner. What actually shipped, what stayed a pilot, and how to tell production value from AI theatre in a regulated environment.",
  },
] as const;

// CFP kit — three bio lengths, all built from owner-verified profile facts.
// Career-arc and Simpaisa-platform claims are kept in SEPARATE sentences so no
// two-tier mix lands in one clause.
const bios = [
  {
    length: "~50 words",
    label: "Short",
    text: "Rizwan Zafar is a payments and product executive based in Dubai. As Chief Product Officer at Simpaisa, he builds regulated payment infrastructure across frontier markets in MENA and South Asia — card acquiring, wallets, cross-border corridors, settlement and the risk controls underneath.",
  },
  {
    length: "~100 words",
    label: "Medium",
    text: "Rizwan Zafar is a payments and product executive based in Dubai, operating since 2009 across engineering, programme delivery and product. As Chief Product Officer at Simpaisa, he built full-stack payment infrastructure — card acquiring, wallets, DCB, cross-border corridors, settlement and reconciliation — that lets global platforms collect and disburse where they have no local rails. The Simpaisa platform scaled to $1B+ GTV and 270M+ payments a year across five frontier markets. Earlier he led OTT billing at Tapmad and payment operations at Daraz (Alibaba Group). He is PMP-, PMI-ACP- and MIT-Sloan-trained.",
  },
  {
    length: "~250 words",
    label: "Long",
    text: "Rizwan Zafar is a payments and product executive based in Dubai. He has operated since 2009 across a deliberate arc: power-utility engineering, then programme and PMO delivery, then product — a path that made frontier markets his specialty, because constraint breeds operators. He is currently Chief Product Officer at Simpaisa, a B2B payments platform he helped build from the ground up. There he owns full-stack payment infrastructure: card acquiring (MPGS/MDES), wallets, DCB, IBFT, bill payments, a payout switch, cash-over-counter and cross-border corridors with real-time FX. The Simpaisa platform scaled to $1B+ GTV, 270M+ payments a year, a 99.95% settlement SLA and 150+ merchant integrations across five regulated markets in MENA and South Asia. It became the local rail for enterprise platforms including TikTok, Samsung, Shein, Uber and MoneyGram. He led PCI DSS Level 1 and ISO/IEC 27001 certification from scratch, and shipped four production GenAI systems inside payment operations covering merchant support, incident escalation, partner support and a fraud/AML pilot. Earlier he owned monetization and Direct Carrier Billing for Tapmad, Pakistan's leading OTT platform, and ran payment operations across five markets at Daraz (Alibaba Group). He built and led a 40-engineer organisation across 12 cross-functional squads. He holds PMP, PMI-ACP, CSPO, CSM, COBIT 5 and ITIL certifications and completed MIT Sloan's Mastering Design Thinking executive program. He speaks on frontier-market payments, product leadership in regulated fintech, and AI-assisted delivery.",
  },
] as const;

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking & Media — Frontier-Market Payments | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Talks, podcasts and press on frontier-market payments, product leadership in regulated fintech, and AI-assisted delivery — with a CFP kit for organisers.",
      },
      {
        property: "og:title",
        content: "Talks, podcasts and press — Rizwan Zafar",
      },
      {
        property: "og:description",
        content:
          "Frontier-market payments, regulated-fintech product leadership and AI-assisted delivery — explained by an operator, not a slide deck.",
      },
      { property: "og:url", content: absUrl("/speaking") },
      { property: "og:type", content: "profile" },
      { name: "twitter:title", content: "Talks, podcasts and press — Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Ready-to-book talks on frontier-market payments, regulated-fintech product and AI-assisted delivery.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/speaking") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(speakingPageJsonLd) }],
  }),
  component: SpeakingPage,
});

function SpeakingPage() {
  return (
    <div className="speaking-page mx-auto max-w-4xl px-5 sm:px-6 py-12 md:py-16">
      <style>{speakingMotionCss}</style>

      {/* Hero */}
      <header data-reveal style={delayStyle(0)}>
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Speaking &amp; media
        </div>
        <h1 className="mt-5 font-instrument tracking-tight leading-[1.05] text-[30px] sm:text-[40px] md:text-[52px] text-ink text-wrap">
          Talks, podcasts and press.
        </h1>
        <p className="mt-5 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed">
          Frontier-market payments, product leadership in regulated fintech, and AI-assisted
          delivery — explained by an operator, not a slide deck.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a
            href="/contact/#book"
            data-analytics-event="cta_click"
            data-analytics-cta-id="book_intro_call"
            data-analytics-cta-location="home_body"
            data-analytics-cta-destination="/contact/#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand hover:text-[var(--brand-foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            Invite me to speak
            <span aria-hidden>→</span>
          </a>
          <a
            href="#cfp"
            className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/50 hover:bg-ink/5 transition-colors"
          >
            Organiser kit
          </a>
        </div>
      </header>

      {/* Ready-to-book talks */}
      <section
        className="mt-14 md:mt-16 border-t border-rule pt-10"
        data-reveal
        style={delayStyle(60)}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Ready-to-book talks
        </div>
        <h2 className="mt-3 font-instrument text-2xl md:text-3xl text-ink leading-tight">
          Three talks, ready to bring to your stage
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
          Each can run as a conference talk, a podcast conversation or an internal session. All
          three are drawn from work I actually shipped.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {talks.map((talk, i) => (
            <article
              key={talk.title}
              className="flex flex-col rounded-lg border border-rule bg-surface p-5"
              data-reveal
              style={delayStyle(80 + i * 60)}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
                  {talk.tag}
                </span>
                <span className="font-mono-tech text-[10px] text-ink-soft tabular-nums">
                  /0{i + 1}
                </span>
              </div>
              <h3 className="mt-3 font-instrument text-lg md:text-xl text-ink leading-snug">
                {talk.title}
              </h3>
              <p className="mt-2.5 text-sm text-ink-soft leading-relaxed">{talk.abstract}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-soft leading-relaxed">
          Formats can be tailored — keynote, panel, fireside or workshop. Ask about custom topics
          across payment infrastructure, risk/compliance and AI in operations.
        </p>
      </section>

      {/* Podcasts & press */}
      <section
        className="mt-14 md:mt-16 border-t border-rule pt-10"
        data-reveal
        style={delayStyle(60)}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Recent &amp; upcoming
        </div>
        <h2 className="mt-3 font-instrument text-2xl md:text-3xl text-ink leading-tight">
          Podcasts &amp; press
        </h2>
        <div className="mt-6 space-y-3">
          {/* MoneyPetrol — INBOUND / not yet recorded. Represented as upcoming;
              no embed, no claimed date, no claimed appearance. */}
          <article className="flex flex-col gap-3 rounded-lg border border-rule bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                Podcast
              </div>
              <h3 className="mt-1.5 font-instrument text-lg text-ink leading-snug">
                MoneyPetrol podcast
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                A conversation on frontier-market payments and building regulated fintech
                infrastructure. Recording is being scheduled — the episode will be linked here once
                it is live.
              </p>
            </div>
            <span className="shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 rounded-full border border-[var(--brand)]/40 bg-[var(--brand)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--brand)] font-mono-tech">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden />
              Coming soon
            </span>
          </article>

          {/* Room for future entries — placeholder framing, no fabricated items. */}
          <p className="text-xs text-ink-soft leading-relaxed">
            More appearances will be listed here as they publish. To have Rizwan on your show or
            panel, use the enquiry link below.
          </p>
        </div>
      </section>

      {/* For organisers — CFP kit */}
      <section
        id="cfp"
        className="mt-14 md:mt-16 scroll-mt-24 rounded-lg border border-rule bg-surface p-6 md:p-8"
        data-reveal
        style={delayStyle(60)}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ For organisers
        </div>
        <h2 className="mt-3 font-instrument text-2xl md:text-3xl text-ink leading-tight">
          Speaker kit
        </h2>

        {/* One-line proof stat, scope-tagged (Simpaisa platform). */}
        <p className="mt-4 max-w-2xl text-sm text-ink-soft leading-relaxed">
          One-line proof (Simpaisa platform scope):{" "}
          <span className="text-ink">
            scaled payment infrastructure to $1B+ GTV and 270M+ payments a year across five frontier
            markets.
          </span>
        </p>

        {/* Bios in three lengths */}
        <div className="mt-7">
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
            Speaker bio — three lengths
          </div>
          <div className="mt-4 space-y-4">
            {bios.map((bio) => (
              <div key={bio.label} className="rounded-md border border-rule bg-background p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-instrument text-base text-ink">{bio.label}</span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    {bio.length}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{bio.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Headshot + logistics */}
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
              Headshot
            </div>
            {/* The site's portrait is a bundled asset (src/assets/
                rizwan-zafar-cutout.*), not a downloadable public URL. Until a
                print-ready file is published, keep an explicit owner TODO
                rather than inventing a link. */}
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              A high-resolution headshot is available on request.
            </p>
            <p className="mt-2 font-mono-tech text-xs text-ink-soft leading-relaxed">
              {/* TODO(owner): publish a print-ready headshot to /public and
                  link it here (e.g. https://rzifi.com/rizwan-zafar-headshot.jpg).
                  The homepage portrait lives at src/assets/rizwan-zafar-cutout.*
                  and is bundled/hashed, so it is not a stable public download URL. */}
              TODO(owner): headshot download URL
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
              Logistics
            </div>
            <ul className="mt-2 space-y-2">
              {[
                `Based in ${profile.location} — available in-person across MENA and remote worldwide.`,
                "Formats: keynote, panel, fireside, podcast, workshop.",
                "Topics: frontier-market payments, regulated-fintech product, AI in operations.",
              ].map((item) => (
                <li key={item} className="relative pl-5 text-sm text-ink-soft leading-relaxed">
                  <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section
        className="mt-14 md:mt-16 rounded-lg border border-[var(--brand)] bg-[var(--brand)] text-background p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        data-reveal
        style={delayStyle(60)}
      >
        <div>
          <h2 className="font-instrument text-2xl md:text-3xl leading-tight">
            Have a stage, a mic or a deadline?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-background/70 leading-relaxed">
            Conference, podcast, panel or press enquiry — send the details and I'll come back with
            availability and a tailored angle.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href="/contact/#book"
            data-analytics-event="cta_click"
            data-analytics-cta-id="book_intro_call"
            data-analytics-cta-location="footer"
            data-analytics-cta-destination="/contact/#book"
            className="inline-flex items-center justify-center rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-background hover:text-ink transition-colors"
          >
            Book a slot
          </a>
          <a
            href={`mailto:${profile.email}?subject=Speaking%20enquiry`}
            data-analytics-event="cta_click"
            data-analytics-cta-id="email_me"
            data-analytics-cta-location="footer"
            data-analytics-cta-destination={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center rounded-full bg-background text-ink px-5 py-2.5 text-sm font-medium hover:bg-[var(--brand)] hover:text-background transition-colors"
          >
            Email the enquiry
          </a>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
          >
            About Rizwan
          </Link>
        </div>
      </section>
    </div>
  );
}
