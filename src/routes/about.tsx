import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rizwan Zafar | Payments Product Executive" },
      {
        name: "description",
        content:
          "From engineering and program delivery to fintech product leadership: building regulated payments infrastructure at the intersection of product, compliance, network partnerships, risk and operations.",
      },
      { property: "og:title", content: "About Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Payments product executive working at the intersection of product, compliance, networks, risk and operations.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">About</div>
      <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
        Building regulated payments infrastructure where it's hardest.
      </h1>
      <div className="prose-editorial mt-10">
        <p>
          I started in engineering and program delivery, shipping systems where uptime and
          correctness mattered more than design polish. That foundation shaped how I work today:
          payments systems are infrastructure first, and good product leadership in payments is
          inseparable from operations, compliance and partnerships.
        </p>
        <p>
          Over the last decade I moved from delivery into fintech product leadership across South
          Asia and MENA — Pakistan, Bangladesh, Nepal, Iraq, Egypt and the UAE. The common thread
          is regulated payment infrastructure for complex markets: pay-in and payout APIs,
          wallets, DCB, IBFT, cross-border corridors, FX, settlement, reconciliation, KYC/KYB,
          AML/CFT, fraud and risk.
        </p>
        <h2>What I do best</h2>
        <p>
          I work at the intersection of product, compliance, network partnerships, risk and
          operations. That means owning the full surface — from API and merchant console to
          settlement reports, dispute workflows, regulator engagement and partner negotiations.
          At Simpaisa as Chief Product Officer, that surface scaled to $1B+ annual GTV and 25M+
          monthly transactions, with PCI DSS and ISO 27001 built from scratch.
        </p>
        <h2>Where I'm headed</h2>
        <p>
          I'm focused on senior product and payment infrastructure roles at companies building
          serious payments platforms — Visa, Mastercard, Stripe, Wise, Adyen, Thunes and similar.
          Based in Dubai, open to UAE, KSA, Singapore, MENA, Europe and global fintech.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/product-work" className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors">
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
    </div>
  );
}
