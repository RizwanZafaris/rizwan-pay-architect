export type ProductStatus = "shipped" | "shipped-scaled" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  status: ProductStatus;
  statusLabel: string;
  oneLiner: string;
  description: string;
  metrics?: { label: string; value: string }[];
  /** Internal link (case-study or product detail page) */
  link: string;
  /** External label override for CTA */
  ctaLabel?: string;
  /** Optional waitlist email for coming-soon products */
  waitlistEmail?: string;
};

export const products: Product[] = [
  {
    slug: "simpaisa",
    name: "Simpaisa",
    status: "shipped-scaled",
    statusLabel: "Built · Scaled · Operating",
    oneLiner:
      "Regulated multi-rail payment infrastructure across pay-in, payout, wallets, DCB, IBFT, card acquiring, cross-border, FX, settlement, fraud and KYC/KYB.",
    description:
      "A five-market regulated payments platform serving global enterprises and local merchants. Unified pay-in/payout API across cards (MPGS/MDES), wallets, DCB, IBFT and cross-border corridors, with a canonical ledger, in-line risk service and partner-aware settlement.",
    metrics: [
      { label: "Annual GTV", value: "$1B+" },
      { label: "Annual transactions", value: "270M+" },
      { label: "Markets", value: "5" },
      { label: "Settlement SLA", value: "99.95%" },
      { label: "Fraud loss", value: "<0.1% GTV" },
    ],
    link: "/product-work/simpaisa-payment-infrastructure",
    ctaLabel: "Read case study",
  },
  {
    slug: "tapmad",
    name: "Tapmad",
    status: "shipped-scaled",
    statusLabel: "Built · Scaled monetization",
    oneLiner:
      "OTT billing, direct carrier billing, wallet migration and subscription monetization. Built and scaled the payment monetization and billing infrastructure.",
    description:
      "Re-architected the subscription billing rail mix for a regional OTT platform. Moved from high-cost rails to a portfolio of DCB, wallets and cards with intelligent rail selection per subscriber cohort, retry orchestration and lifecycle-aware dunning.",
    metrics: [
      { label: "Paid subscribers", value: "0 → 5M" },
      { label: "Payment cost", value: "~50% → ~1%" },
      { label: "ARPU", value: "+70%" },
    ],
    link: "/product-work/tapmad-wallet-billing-migration",
    ctaLabel: "Read case study",
  },
  {
    slug: "felo",
    name: "Felo App",
    status: "coming-soon",
    statusLabel: "In build · preview later",
    oneLiner: "A consumer fintech product in quiet build from Rizwan's product lab.",
    description:
      "Early-stage consumer fintech. Architecture, regulatory posture and onboarding flows are being designed in private, request preview to get on the early-access list when there is something real to show.",
    link: "mailto:rizwanzaffar.pk@gmail.com?subject=Preview%20access%20%C2%B7%20Felo%20App&body=Hi%20Rizwan%2C%0A%0APlease%20add%20me%20to%20the%20Felo%20App%20preview%20list.%0A%0AName%3A%20%0ACompany%3A%20%0ARole%3A%20%0A",
    ctaLabel: "Request preview",
    waitlistEmail: "rizwanzaffar.pk@gmail.com",
  },
  {
    slug: "job-hunt",
    name: "Job Hunt",
    status: "coming-soon",
    statusLabel: "In build · preview later",
    oneLiner:
      "An AI-assisted job-search and applicant-workflow product, built on Rizwan's own search process.",
    description:
      "Tools for senior operators running a focused job search, keyword/ATS profiling, target-company research, application tracking and outreach drafts. Built from Rizwan's own pipeline; request preview to get on the early-access list.",
    link: "mailto:rizwanzaffar.pk@gmail.com?subject=Preview%20access%20%C2%B7%20Job%20Hunt&body=Hi%20Rizwan%2C%0A%0APlease%20add%20me%20to%20the%20Job%20Hunt%20preview%20list.%0A%0AName%3A%20%0ACompany%3A%20%0ARole%3A%20%0A",
    ctaLabel: "Request preview",
    waitlistEmail: "rizwanzaffar.pk@gmail.com",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
