// Topic hubs, collection pages that group essays + case studies by domain.
// Hubs are derived from existing post categories and tag patterns, so we
// don't need to retag every post by hand.

import { posts, type Post } from "./posts";
import { caseStudies, type CaseStudy } from "./caseStudies";

export type HubSlug =
  | "payment-infrastructure"
  | "cross-border-payments"
  | "swift-iso-20022"
  | "settlement-reconciliation"
  | "merchant-onboarding"
  | "fraud-aml"
  | "payment-apis"
  | "emerging-markets"
  | "ai-in-fintech"
  | "crypto-stablecoins"
  | "program-management-pmo";

export type Hub = {
  slug: HubSlug;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  /** Post categories that always belong to this hub. */
  categories?: string[];
  /** Lowercased tag substrings, if any tag contains one, the post matches. */
  tagPatterns?: string[];
  /** Case-study categories that belong to this hub. */
  caseStudyCategories?: string[];
};

export const hubs: Hub[] = [
  {
    slug: "payment-infrastructure",
    title: "Payment Infrastructure",
    shortTitle: "Infrastructure",
    description:
      "Building the regulated rails, pay-in, payout, ledgers, orchestration and the operating model that runs them.",
    intro:
      "Payment infrastructure is the product surface where orchestration, ledger, settlement and risk meet. These essays and case studies cover what it actually takes to ship and operate a multi-rail platform at scale.",
    categories: ["Payment Infrastructure"],
    tagPatterns: ["payment infrastructure", "ledger", "orchestration", "rails"],
    caseStudyCategories: ["Payment Infrastructure"],
  },
  {
    slug: "cross-border-payments",
    title: "Cross-Border Payments",
    shortTitle: "Cross-border",
    description:
      "Corridors, FX, partner routing and the product economics of moving money across markets.",
    intro:
      "Cross-border is a product, not a partner integration. Essays here cover corridor design, FX, routing, last-mile delivery and the partner stack underneath.",
    categories: ["Cross-Border Payments"],
    tagPatterns: ["cross-border", "corridor", "FX", "remittance"],
    caseStudyCategories: ["Cross-Border Payments"],
  },
  {
    slug: "swift-iso-20022",
    title: "SWIFT & ISO 20022",
    shortTitle: "SWIFT · ISO 20022",
    description:
      "SWIFT messaging, gpi, ISO 20022 migration, correspondent banking and the standards layer of cross-border.",
    intro:
      "SWIFT is the standards layer behind most bank-to-bank cross-border. These essays cover gpi, ISO 20022, correspondent banking and what product teams must know to ship on it.",
    tagPatterns: ["swift", "iso 20022", "iso20022", "gpi", "correspondent", "uetr", "mt vs mx"],
  },
  {
    slug: "settlement-reconciliation",
    title: "Settlement & Reconciliation",
    shortTitle: "Settlement · Recon",
    description:
      "Ledger design, three-way reconciliation, exception management and treasury, the trust layer of payments.",
    intro:
      "Settlement and reconciliation are not back-office problems, they decide trust with merchants and partners. These essays cover ledger design, exception management and the operating model underneath.",
    categories: ["Settlement & Reconciliation"],
    tagPatterns: ["settlement", "reconciliation", "recon", "ledger", "treasury"],
    caseStudyCategories: ["Settlement & Reconciliation"],
  },
  {
    slug: "merchant-onboarding",
    title: "Merchant Onboarding",
    shortTitle: "Onboarding",
    description:
      "KYC/KYB automation, risk tiering, activation funnel and the trade-off between conversion and default.",
    intro:
      "Merchant onboarding is where growth, risk and compliance share the same surface. These essays cover KYC/KYB automation, risk tiering and the activation funnel.",
    categories: ["Merchant Onboarding"],
    tagPatterns: ["onboarding", "kyc", "kyb", "merchant"],
    caseStudyCategories: ["Merchant Onboarding"],
  },
  {
    slug: "fraud-aml",
    title: "Fraud & AML/CFT",
    shortTitle: "Fraud · AML",
    description:
      "Layered fraud controls, AML/CFT monitoring, sanctions screening, chargebacks and the false-positive budget.",
    intro:
      "Fraud and AML/CFT live in the same decision surface. These essays cover layered controls, sanctions screening, chargebacks and the feedback loop that keeps them honest.",
    categories: ["Fraud & Risk"],
    tagPatterns: ["fraud", "aml", "cft", "sanctions", "chargeback", "risk", "monitoring"],
    caseStudyCategories: ["Fraud & Risk"],
  },
  {
    slug: "payment-apis",
    title: "Payment APIs",
    shortTitle: "Payment APIs",
    description:
      "API design for pay-in, payout, local methods and developer experience in regulated environments.",
    intro:
      "Payment APIs are where partner enablement, idempotency and developer experience meet regulation. Essays here cover API surface design, local payment methods and the developer experience underneath.",
    tagPatterns: ["api", "developer experience", "local payment", "idempoten", "webhook"],
  },
  {
    slug: "emerging-markets",
    title: "Emerging Markets",
    shortTitle: "Emerging markets",
    description:
      "MENA, South Asia and the operating realities that pressure-test payments outside the OECD model.",
    intro:
      "Emerging markets pressure-test payment products on every dimension: rails, regulation, partner depth, FX and operations. Essays here cover what that pressure teaches.",
    categories: ["Emerging Markets", "Product Strategy"],
    tagPatterns: [
      "emerging market",
      "mena",
      "south asia",
      "pakistan",
      "egypt",
      "bangladesh",
      "uae",
    ],
  },
  {
    slug: "ai-in-fintech",
    title: "AI in Fintech & Payments",
    shortTitle: "AI · Fintech",
    description:
      "GenAI use-case identification, value modeling and four production AI deployments in regulated payments, merchant support, monitoring, partner ops and fraud/AML.",
    intro:
      "AI in payments is moving from demos to production. These posts cover use-case identification, value modeling (ROI / feasibility / data readiness), RAG architectures for merchant support, auto-escalation bots, AI fraud detection and the regulatory frame in which all of it has to ship.",
    categories: ["AI in Fintech"],
    tagPatterns: [
      "ai",
      "genai",
      "llm",
      "rag",
      "machine learning",
      "automation",
      "chatbot",
      "agent",
    ],
    caseStudyCategories: ["AI in Fintech"],
  },
  {
    slug: "crypto-stablecoins",
    title: "Crypto & Stablecoin Payments",
    shortTitle: "Crypto · Stablecoins",
    description:
      "On-ramps and off-ramps, stablecoin settlement, custody design, Travel Rule and VARA/FATF alignment for regulated payments teams.",
    intro:
      "Crypto on-ramps and off-ramps are now part of regulated payments. These posts cover product design for fiat↔crypto rails, stablecoin settlement, custody and the compliance frame (Travel Rule, VARA, FATF) that a payments product team has to ship inside.",
    categories: ["Crypto & Stablecoins"],
    tagPatterns: [
      "crypto",
      "stablecoin",
      "on-ramp",
      "off-ramp",
      "vara",
      "travel rule",
      "usdc",
      "usdt",
      "custody",
    ],
    caseStudyCategories: ["Crypto & Stablecoins"],
  },
  {
    slug: "program-management-pmo",
    title: "Program Management & PMO",
    shortTitle: "Program · PMO",
    description:
      "PMBOK + Agile hybrid frameworks, RAID logs, SteerCo governance, OKRs and the PMO stack that actually ships at $1B+ scale.",
    intro:
      "Programme management is the operating system underneath every regulated payments build. These posts cover building a PMO from scratch, PMBOK + Agile hybrids, RAID governance, SteerCo cadence, OKR design and the rituals that hold a 12-squad org together.",
    categories: ["Program Management", "PMO", "Product Strategy"],
    tagPatterns: [
      "pmo",
      "programme",
      "program management",
      "raid",
      "steerco",
      "pmbok",
      "okr",
      "scrum",
      "agile",
      "delivery",
      "governance",
    ],
    caseStudyCategories: ["Program Management"],
  },
];

export const getHub = (slug: string): Hub | undefined => hubs.find((h) => h.slug === slug);

function matchesHub(hub: Hub, category: string, tags: string[]): boolean {
  if (hub.categories?.includes(category)) return true;
  if (!hub.tagPatterns?.length) return false;
  const lower = tags.map((t) => t.toLowerCase());
  return hub.tagPatterns.some((p) => lower.some((t) => t.includes(p)));
}

export function postsForHub(slug: HubSlug): Post[] {
  const hub = getHub(slug);
  if (!hub) return [];
  return posts.filter((p) => matchesHub(hub, p.category, p.tags));
}

export function caseStudiesForHub(slug: HubSlug): CaseStudy[] {
  const hub = getHub(slug);
  if (!hub) return [];
  return caseStudies.filter((c) => {
    if (hub.caseStudyCategories?.includes(c.category)) return true;
    if (!hub.tagPatterns?.length) return false;
    const lower = c.keywords.map((k) => k.toLowerCase());
    return hub.tagPatterns.some((p) => lower.some((t) => t.includes(p)));
  });
}

export function hubForPost(p: Post): Hub | undefined {
  return hubs.find((h) => matchesHub(h, p.category, p.tags));
}

// Recruiter audience definitions, used by /for/* pages and filters.
export type Audience = {
  slug: "visa-mastercard" | "stripe-adyen-wise-thunes" | "banks-fintechs";
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  hubs: HubSlug[];
  /** Companies this audience speaks to. */
  companies: string[];
};

export const audiences: Audience[] = [
  {
    slug: "visa-mastercard",
    title: "For Visa & Mastercard",
    shortTitle: "Visa / Mastercard",
    description:
      "Network-rails work, acceptance, tokenization, scheme settlement, cross-border product and emerging-market expansion.",
    intro:
      "Network product roles need leaders who can stand up acceptance, tokenization and settlement against scheme requirements while operating in markets that don't read like the US. This is what that work looks like in production.",
    hubs: [
      "payment-infrastructure",
      "cross-border-payments",
      "settlement-reconciliation",
      "fraud-aml",
      "emerging-markets",
    ],
    companies: ["Visa", "Mastercard", "Visa Direct", "Mastercard Move"],
  },
  {
    slug: "stripe-adyen-wise-thunes",
    title: "For Stripe, Adyen, Wise & Thunes",
    shortTitle: "Stripe / Adyen / Wise / Thunes",
    description:
      "Orchestration, local methods, cross-border corridors, payouts and the developer-facing platform.",
    intro:
      "Orchestration platforms live or die on rail coverage, local methods and developer experience. These essays and case studies cover the corridor abstractions, payout engines and partner stacks that make that platform real.",
    hubs: [
      "payment-infrastructure",
      "payment-apis",
      "cross-border-payments",
      "merchant-onboarding",
      "emerging-markets",
    ],
    companies: ["Stripe", "Adyen", "Wise", "Thunes", "DLocal", "Checkout.com", "Rapyd"],
  },
  {
    slug: "banks-fintechs",
    title: "For Banks & Regulated Fintechs",
    shortTitle: "Banks / Regulated fintechs",
    description:
      "SWIFT, ISO 20022, AML/CFT, sanctions, PCI DSS, ISO 27001 and the operating model regulators expect.",
    intro:
      "Regulated fintechs and banks need product leaders who can hold up under audit, sponsor-bank scrutiny and central-bank engagement. This is the operating posture, with proof.",
    hubs: [
      "swift-iso-20022",
      "settlement-reconciliation",
      "fraud-aml",
      "merchant-onboarding",
      "payment-infrastructure",
    ],
    companies: ["Sponsor banks", "Regulated PSPs", "Central-bank licensed fintechs"],
  },
];

export const getAudience = (slug: string) => audiences.find((a) => a.slug === slug);
