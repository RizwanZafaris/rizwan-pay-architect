// AUTO-GENERATED from content/blog/*.md by scripts/generate-posts.ts
// Do not edit by hand. Run: bun scripts/generate-posts.ts

export type Post = {
  slug: string;
  title: string;
  /** SEO-tightened title from frontmatter `metaTitle` (kept under 60 chars).
   *  Falls back to `title` + brand suffix when undefined. */
  metaTitle?: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  thesis?: string;
  featured?: boolean;
  tags: string[];
};

export const categories = [
  "AI in Fintech",
  "Cross-Border Payments",
  "Crypto & Stablecoins",
  "Emerging Markets",
  "Fraud & Risk",
  "Merchant Onboarding",
  "Payment Infrastructure",
  "Product Strategy",
  "Program Management",
  "Settlement & Reconciliation",
];

export const posts: Post[] = [
  {
    slug: "swift-compliance-checklist-for-banks-and-fintechs",
    title: "A SWIFT Compliance Checklist for Banks and Fintechs",
    metaTitle: "SWIFT Compliance Checklist for Banks and Fintechs | Rizwan Zafar",
    date: "2026-07-17",
    category: "Cross-Border Payments",
    readingTime: "7 min read",
    description:
      "A practitioner checklist for SWIFT-related compliance, sanctions, AML/CFT, CSP, ISO 20022 readiness, gpi adoption, and audit trail.",
    thesis:
      "A working checklist of the SWIFT compliance items that audits, sponsors, and regulators actually ask about.",
    tags: ["SWIFT compliance", "CSP", "AML CFT", "sanctions", "checklist"],
  },
  {
    slug: "swift-for-emerging-markets-banking",
    title: "The Role of SWIFT in Emerging-Markets Banking",
    metaTitle: "The Role of SWIFT in Emerging-Markets Banking | Rizwan Zafar",
    date: "2026-07-14",
    category: "Cross-Border Payments",
    readingTime: "8 min read",
    description:
      "How emerging-market banks actually use SWIFT, access, cost, correspondent dependence, and where fintech intermediation is reshaping the picture.",
    thesis:
      "For emerging-market banks, SWIFT is not optional. The fragility is in the correspondents on either end of the message.",
    tags: ["SWIFT", "emerging markets", "banking", "correspondent banking"],
  },
  {
    slug: "swift-messaging-formats-mt-vs-mx",
    title: "SWIFT Messaging Formats: MT vs MX (and Why It Matters Now)",
    metaTitle: "SWIFT Messaging Formats: MT vs MX | Rizwan Zafar",
    date: "2026-07-10",
    category: "Cross-Border Payments",
    readingTime: "7 min read",
    description:
      "MT is the legacy SWIFT format. MX is the ISO 20022 successor. What changes, what stays, and what product teams must understand.",
    thesis:
      "MT was a printer-line format. MX is structured data. The difference is the entire next decade of cross-border product.",
    tags: ["SWIFT MT", "SWIFT MX", "ISO 20022", "messaging formats"],
  },
  {
    slug: "swift-and-cryptocurrency-the-honest-take",
    title: "SWIFT and Cryptocurrency: The Honest Take",
    metaTitle: "SWIFT and Cryptocurrency: The Honest Take | Rizwan Zafar",
    date: "2026-07-07",
    category: "Cross-Border Payments",
    readingTime: "8 min read",
    description:
      "Will crypto and stablecoins replace SWIFT? The honest, operator-grade answer, what works, what does not, and where the two will coexist.",
    thesis:
      "Stablecoins solve a real cross-border problem in specific corridors. They do not solve every cross-border problem in every corridor.",
    tags: ["SWIFT", "cryptocurrency", "stablecoins", "cross-border", "blockchain"],
  },
  {
    slug: "tracking-a-swift-payment-step-by-step",
    title: "How to Track a SWIFT Payment Step by Step",
    metaTitle: "How to Track a SWIFT Payment Step by Step | Rizwan Zafar",
    date: "2026-07-03",
    category: "Cross-Border Payments",
    readingTime: "6 min read",
    description:
      "A practical guide to tracking a SWIFT payment using the UETR and gpi Tracker, what to ask your bank and how to read the status.",
    thesis:
      "If your bank cannot tell you where the payment is, the bank does not have the system. The system exists.",
    tags: ["SWIFT tracking", "UETR", "gpi tracker"],
  },
  {
    slug: "swift-in-2026-trends-to-watch",
    title: "SWIFT in 2026: ISO 20022, Instant Rails, and the Pressure on Correspondent Banking",
    metaTitle: "SWIFT in 2026: Trends to Watch | Rizwan Zafar",
    date: "2026-06-30",
    category: "Cross-Border Payments",
    readingTime: "8 min read",
    description:
      "Where SWIFT and cross-border payments are heading in 2026, ISO 20022 done, instant rails everywhere, correspondent banking under pressure, and the G20 roadmap deadline.",
    thesis:
      "ISO 20022 is the past-tense story by 2026. The future-tense story is interoperability with instant domestic rails.",
    tags: ["SWIFT", "2026 trends", "ISO 20022", "instant payments", "G20 roadmap"],
  },
  {
    slug: "swift-payment-delays-what-actually-causes-them",
    title: "SWIFT Payment Delays: What Actually Causes Them",
    metaTitle: "SWIFT Payment Delays: What Causes Them | Rizwan Zafar",
    date: "2026-06-26",
    category: "Cross-Border Payments",
    readingTime: "7 min read",
    description:
      "The real reasons SWIFT payments are delayed, compliance review, correspondent chain length, cut-offs, holidays, weak data, and how to mitigate each.",
    thesis:
      "Most SWIFT 'delays' are not network delays. They are compliance reviews, cut-offs, or bad data.",
    tags: ["SWIFT", "payment delays", "cross-border", "compliance"],
  },
  {
    slug: "swift-fees-fx-and-the-true-cost-of-cross-border",
    title: "SWIFT Fees, FX, and the True Cost of a Cross-Border Payment",
    metaTitle: "SWIFT Fees, FX, and True Cost of Cross-Border Payments | Rizwan Zafar",
    date: "2026-06-23",
    category: "Cross-Border Payments",
    readingTime: "8 min read",
    description:
      "Where the real cost of a cross-border SWIFT payment hides, fees, FX margin, charge bearer, and the product decisions that compress it.",
    thesis:
      "The sticker fee is the smallest part of the cost. The FX margin is most of it. The product decisions decide both.",
    tags: ["SWIFT fees", "cross-border cost", "FX margin", "charge bearer"],
  },
  {
    slug: "correspondent-banking-and-emerging-market-corridors",
    title: "Correspondent Banking and the Reality of Emerging-Market Corridors",
    metaTitle: "Correspondent Banking in Emerging-Market Corridors | Rizwan Zafar",
    date: "2026-06-19",
    category: "Cross-Border Payments",
    readingTime: "9 min read",
    description:
      "How correspondent banking actually works in emerging-market corridors, de-risking, nostro/vostro, FX, and the product opportunities created by friction.",
    thesis:
      "De-risking did not reduce risk. It moved the risk to the corridors that need access most.",
    tags: [
      "correspondent banking",
      "emerging markets",
      "cross-border",
      "de-risking",
      "nostro vostro",
    ],
  },
  {
    slug: "swift-vs-card-rails-vs-local-wallets",
    title: "SWIFT vs Card Rails vs Local Wallets: When to Use What",
    metaTitle: "SWIFT vs Card Rails vs Local Wallets | Rizwan Zafar",
    date: "2026-06-16",
    category: "Cross-Border Payments",
    readingTime: "9 min read",
    description:
      "A practitioner comparison of SWIFT, card rails, and local wallets, cost, speed, geography, risk, and when to use each.",
    thesis:
      "There is no universal best rail. There is the best rail for this corridor, this amount, this customer, this use case.",
    tags: ["SWIFT", "card rails", "wallets", "rail comparison", "cross-border"],
  },
  {
    slug: "swift-aml-cft-sanctions-screening",
    title: "SWIFT, AML/CFT, and Sanctions Screening in Practice",
    metaTitle: "SWIFT AML/CFT and Sanctions Screening in Practice | Rizwan Zafar",
    date: "2026-06-12",
    category: "Cross-Border Payments",
    readingTime: "9 min read",
    description:
      "How AML/CFT and sanctions screening actually work on SWIFT-instructed cross-border payments, and the product decisions that decide false-positive rates.",
    thesis:
      "Sanctions screening is where compliance theory meets throughput reality. The product decisions live in the list overlay, the matcher, and the review queue.",
    tags: ["AML", "CFT", "sanctions screening", "SWIFT", "compliance"],
  },
  {
    slug: "swift-gpi-tracking-and-the-end-of-payment-uncertainty",
    title: "SWIFT gpi, Tracking, and the End of Payment Uncertainty",
    metaTitle: "SWIFT gpi and End-to-End Payment Tracking | Rizwan Zafar",
    date: "2026-06-09",
    category: "Cross-Border Payments",
    readingTime: "8 min read",
    description:
      "SWIFT gpi added end-to-end tracking, fee transparency, and same-day credit to cross-border payments. What it actually changed for product teams.",
    thesis:
      "Before gpi, a cross-border payment was send-and-hope. After gpi, it is send-and-track.",
    tags: ["SWIFT gpi", "payment tracking", "cross-border", "UETR"],
  },
  {
    slug: "iso-20022-migration-what-product-teams-must-know",
    title: "ISO 20022 Migration: What Payment Product Teams Must Know",
    metaTitle: "ISO 20022 Migration for Product Teams | Rizwan Zafar",
    date: "2026-06-05",
    category: "Cross-Border Payments",
    readingTime: "10 min read",
    description:
      "ISO 20022 is the biggest change in payments messaging in a generation. What product teams must know to ship ahead of the deadlines.",
    thesis:
      "MT messages truncated reality to fit a 1980s field length. MX (ISO 20022) finally gives payments room to be structured.",
    tags: ["ISO 20022", "MX messages", "SWIFT", "structured data", "compliance"],
  },
  {
    slug: "swift-vs-wire-transfer",
    title: "SWIFT Payment vs Wire Transfer: Key Differences",
    metaTitle: "SWIFT Payment vs Wire Transfer: Key Differences | Rizwan Zafar",
    date: "2026-06-03",
    category: "Cross-Border Payments",
    readingTime: "7 min read",
    description:
      "SWIFT vs wire transfer explained, what each term actually means, where they overlap, and which one your product is really using.",
    thesis:
      "'Wire transfer' is the outcome. 'SWIFT' is one way to instruct it. The two are not the same thing.",
    tags: ["SWIFT", "wire transfer", "cross-border", "Fedwire", "TARGET2"],
  },
  {
    slug: "swift-payment-explained",
    title: "How SWIFT Payment Works: A Complete Overview",
    metaTitle: "How SWIFT Payment Works (2026) | Rizwan Zafar",
    date: "2026-06-02",
    category: "Cross-Border Payments",
    readingTime: "9 min read",
    description:
      "A practitioner overview of how SWIFT payments work, messaging, correspondent banking, settlement, gpi, and where ISO 20022 fits in.",
    thesis:
      "SWIFT is messaging, not movement. Understand the difference and most cross-border problems become legible.",
    featured: true,
    tags: ["SWIFT", "cross-border", "correspondent banking", "ISO 20022", "gpi"],
  },
  {
    slug: "sanctions-screening-without-killing-throughput",
    title: "Sanctions Screening Without Killing Throughput",
    metaTitle: "Sanctions Screening Without Killing Throughput | Rizwan Zafar",
    date: "2026-06-01",
    category: "Fraud & Risk",
    readingTime: "8 min read",
    description:
      "How to design sanctions screening that catches what it must catch without flooding ops with false positives or breaking real-time transaction performance.",
    thesis:
      "Sanctions screening is a latency problem and a false-positive problem dressed up as a compliance problem.",
    tags: ["sanctions", "screening", "compliance", "AML"],
  },
  {
    slug: "aml-cft-rules-vs-models",
    title: "AML/CFT: Rules vs Models, and Why You Need Both",
    metaTitle: "AML/CFT: Rules vs Models, and Why You Need Both | Rizwan Zafar",
    date: "2026-05-31",
    category: "Fraud & Risk",
    readingTime: "9 min read",
    description:
      "Where rules belong, where models belong, and how to design an AML/CFT detection stack that is both defensible to regulators and effective at catching real bad actors.",
    thesis:
      "Rules are explainable and weak. Models are powerful and unexplainable. Production AML needs both, layered.",
    tags: ["AML", "CFT", "compliance", "fraud", "risk"],
  },
  {
    slug: "emerging-markets-pressure-test-payments",
    title: "How Emerging Markets Pressure-Test Payment Product Strategy",
    metaTitle: "How Emerging Markets Pressure-Test Payment Strategy | Rizwan Zafar",
    date: "2026-05-31",
    category: "Emerging Markets",
    readingTime: "10 min read",
    description:
      "What payment product teams from Visa, Mastercard, Stripe, and Adyen learn the hard way when they ship into Pakistan, Bangladesh, Egypt, and Iraq.",
    thesis:
      "Cards-first thinking, monthly settlement assumptions, and English-only UX do not survive contact with the markets that will define the next decade of payment volume.",
    tags: ["emerging markets", "cross-border", "Pakistan", "MENA", "South Asia", "wallets", "DCB"],
  },
  {
    slug: "pci-dss-iso-27001-program-leadership",
    title: "PCI DSS and ISO 27001 as Product Programs",
    metaTitle: "Leading PCI DSS and ISO 27001 Programs from Scratch | Rizwan Zafar",
    date: "2026-05-30",
    category: "Fraud & Risk",
    readingTime: "10 min read",
    description:
      "What it takes to lead PCI DSS and ISO 27001 programs from scratch at a payments platform, scoping, evidence, controls, and the trap of treating compliance as paperwork.",
    thesis:
      "PCI DSS and ISO 27001 are not paperwork projects. Run as product programs, they make the platform measurably stronger.",
    tags: ["PCI DSS", "ISO 27001", "compliance", "security", "program management"],
  },
  {
    slug: "chargebacks-product-problem",
    title: "Chargebacks Are a Product Problem",
    metaTitle: "Chargebacks Are a Product Problem, Not an Ops Cost | Rizwan Zafar",
    date: "2026-05-29",
    category: "Fraud & Risk",
    readingTime: "8 min read",
    description:
      "How to treat chargebacks as a product surface, root-cause categorisation, prevention, representment, and the feedback loop that actually reduces the rate.",
    thesis: "A rising chargeback line is product debt that finance is paying. The fix is upstream.",
    tags: ["chargebacks", "disputes", "fraud", "product strategy"],
  },
  {
    slug: "payment-cost-50-to-1",
    title: "Payment Cost Is a Product Variable: From 50% to 1% (Tapmad Migration Playbook)",
    metaTitle: "Payment Cost: From 50% to 1% | Rizwan Zafar",
    date: "2026-05-29",
    category: "Product Strategy",
    readingTime: "11 min read",
    description:
      "How a subscription business cut payment cost from ~50% of revenue to ~1% by treating cost as a product variable, rail mix, dunning, smart retries.",
    thesis:
      "Payment cost is not procurement. It is product architecture. Here is the rail-mix playbook that pulled a subscription business from 50% to 1% cost-of-revenue.",
    featured: true,
    tags: ["billing", "DCB", "wallets", "unit economics", "subscription", "OTT", "dunning"],
  },
  {
    slug: "layered-fraud-controls-payments-stack",
    title: "Layered Fraud Controls in the Payments Stack",
    metaTitle: "Layered Fraud Controls in the Payments Stack | Rizwan Zafar",
    date: "2026-05-28",
    category: "Fraud & Risk",
    readingTime: "9 min read",
    description:
      "How to design layered fraud controls across device, identity, transaction, behavioural and network layers, without crushing conversion or throughput.",
    thesis:
      "No single fraud control survives a determined attacker. Layered controls do, and they do it without crushing conversion.",
    tags: ["fraud", "risk", "payment infrastructure", "controls"],
  },
  {
    slug: "kyc-conversion-designed-together",
    title: "KYC and Conversion Designed Together",
    metaTitle: "KYC and Conversion Designed Together | Rizwan Zafar",
    date: "2026-05-27",
    category: "Merchant Onboarding",
    readingTime: "8 min read",
    description:
      "Why KYC and conversion are the same product surface, how to design identity verification flows that compliance accepts and merchants actually finish.",
    thesis:
      "Splitting KYC from conversion produces the worst of both: friction that does not reduce risk, and risk that does not justify the friction.",
    tags: ["KYC", "onboarding", "conversion", "design thinking"],
  },
  {
    slug: "local-payment-methods-developer-experience",
    title: "Why Local Payment Methods Are a Developer-Experience Problem",
    metaTitle: "Local Payment Methods Are DX Problems | Rizwan Zafar",
    date: "2026-05-27",
    category: "Payment Infrastructure",
    readingTime: "10 min read",
    description:
      "Acceptance in emerging markets is decided at the SDK and webhook layer. Why local payment methods are developer-experience problems first.",
    thesis:
      "A merchant adopts a local payment method only if integrating it is as easy as integrating cards. Most LPM integrations fail that test.",
    tags: [],
  },
  {
    slug: "cross-border-corridors-are-operating-systems",
    title: "Cross-Border Corridors Are Operating Systems, Not Routes",
    metaTitle: "Cross-Border Payment Corridors Are Operating Systems | Rizwan Zafar",
    date: "2026-05-26",
    category: "Cross-Border Payments",
    readingTime: "11 min read",
    description:
      "A corridor is not a partner integration. It is a product with its own success rate, FX behavior, compliance overlay, and unit economics. A practitioner view from MENA and South Asia.",
    thesis:
      "Cards-first thinking breaks at the border. Owning the corridor abstraction is owning the margin in cross-border payments.",
    featured: true,
    tags: [],
  },
  {
    slug: "financial-controls-are-product-requirements",
    title: "Financial Controls Are Product Requirements, Not Compliance Afterthoughts",
    metaTitle: "Financial Controls Are Product Requirements | Rizwan Zafar",
    date: "2026-05-26",
    category: "Settlement & Reconciliation",
    readingTime: "9 min read",
    description:
      "Why financial controls, segregation of duties, audit trails, maker-checker, reversals, are product requirements, not compliance afterthoughts.",
    thesis:
      "If your audit trail is reconstructed from logs, you do not have controls. You have archaeology.",
    tags: [
      "financial controls",
      "audit",
      "SOX-like",
      "segregation of duties",
      "ledger",
      "compliance",
    ],
  },
  {
    slug: "onboarding-conversion-vs-default-rate-tradeoff",
    title: "Onboarding Conversion vs. Default Rate: The Real Tradeoff",
    metaTitle: "Merchant Onboarding Conversion vs Default Rate Tradeoff | Rizwan Zafar",
    date: "2026-05-26",
    category: "Merchant Onboarding",
    readingTime: "8 min read",
    description:
      "How to manage the real tradeoff between onboarding conversion and downstream default, fraud, and chargeback rates without picking a side.",
    thesis:
      "Conversion and default rate are not enemies. They are two sides of the same product surface.",
    tags: ["merchant onboarding", "conversion", "risk", "product strategy"],
  },
  {
    slug: "risk-tiering-merchants-product-decision",
    title: "Risk Tiering Merchants Is a Product Decision",
    metaTitle: "Risk Tiering Merchants Is a Product Decision | Rizwan Zafar",
    date: "2026-05-25",
    category: "Merchant Onboarding",
    readingTime: "8 min read",
    description:
      "Why merchant risk tiering belongs to product, not just risk, how tiers shape onboarding, limits, settlement, fees, and the entire merchant lifecycle.",
    thesis:
      "Tiering is the single most leveraged product decision in a payments platform. Most teams hand it to risk and never recover.",
    tags: ["risk tiering", "merchant onboarding", "product strategy"],
  },
  {
    slug: "kyb-automation-without-blowing-up-risk",
    title: "KYB Automation Without Blowing Up Risk",
    metaTitle: "KYB Automation Without Blowing Up Risk | Rizwan Zafar",
    date: "2026-05-24",
    category: "Merchant Onboarding",
    readingTime: "9 min read",
    description:
      "How to automate KYB onboarding for merchants without inflating fraud, sanctions, or default rates, tiering, data sources, and the review queue that scales.",
    thesis:
      "Automated KYB is not about removing humans. It is about putting them where they actually add risk-adjusted value.",
    tags: ["KYB", "merchant onboarding", "compliance", "automation"],
  },
  {
    slug: "ledger-design-for-multi-rail-payments",
    title: "Ledger Design for Multi-Rail Payments",
    metaTitle: "Ledger Design for Multi-Rail Payment Platforms | Rizwan Zafar",
    date: "2026-05-23",
    category: "Settlement & Reconciliation",
    readingTime: "11 min read",
    description:
      "How to design a double-entry payment ledger that holds across cards, wallets, IBFT, DCB and cross-border rails at $1B+ GTV, entities, postings, and invariants.",
    thesis:
      "The ledger is the source of truth for the entire platform. Most teams discover this after they have shipped the wrong one.",
    tags: ["ledger", "double-entry", "reconciliation", "payment infrastructure"],
  },
  {
    slug: "regulatory-ux-name-on-payment-screen",
    title: "Regulatory UX: Why the Name on a Payment Screen Can Block a Launch",
    metaTitle: "Regulatory UX: Names, Screens, and Launches | Rizwan Zafar",
    date: "2026-05-23",
    category: "Fraud & Risk",
    readingTime: "9 min read",
    description:
      "An operator essay on regulatory UX, why the words, names, and disclosures on a payment screen can be the difference between a launch and a six-month delay.",
    thesis: "Regulators do not read your roadmap. They read your screen.",
    tags: [
      "regulatory UX",
      "compliance",
      "fintech launches",
      "payment screen design",
      "disclosures",
    ],
  },
  {
    slug: "exception-management-reconciliation",
    title: "Exception Management in Reconciliation",
    metaTitle: "Exception Management in Payment Reconciliation | Rizwan Zafar",
    date: "2026-05-22",
    category: "Settlement & Reconciliation",
    readingTime: "9 min read",
    description:
      "How to design exception management for payment reconciliation so finance ops scales sublinearly with GTV, taxonomy, routing, SLAs, and product feedback loops.",
    thesis:
      "Exception management is where reconciliation either becomes a product or becomes a permanent ops queue.",
    tags: ["reconciliation", "operations", "exception management", "controls"],
  },
  {
    slug: "merchant-onboarding-growth-risk-compliance",
    title: "Merchant Onboarding: Where Growth, Risk and Compliance Collide",
    metaTitle: "Merchant Onboarding: Growth, Risk, Compliance | Rizwan Zafar",
    date: "2026-05-22",
    category: "Merchant Onboarding",
    readingTime: "10 min read",
    description:
      "Why merchant onboarding is a single product surface where growth, risk, and compliance must be designed together, not by three separate teams.",
    thesis:
      "Three teams own onboarding. The merchant only sees one experience. That gap is the product.",
    tags: ["merchant onboarding", "KYB", "KYC", "risk", "compliance", "growth"],
  },
  {
    slug: "hosted-checkout-vs-direct-card-processing",
    title: "Hosted Checkout vs Direct Card Processing: A Product Maturity Guide (MPGS, MDES, 3DS)",
    metaTitle: "Hosted Checkout vs Direct Card Processing | Rizwan Zafar",
    date: "2026-05-21",
    category: "Payment Infrastructure",
    readingTime: "12 min read",
    description:
      "Hosted checkout ships fast. Direct card processing ships maturity. A practitioner walk-through of MPGS, MDES, tokenization, 3DS, and PCI scope decisions.",
    thesis:
      "Why hosted checkout is the right first step and the wrong last step, and what direct card processing actually demands from a product team.",
    featured: true,
    tags: [],
  },
  {
    slug: "settlement-windows-and-merchant-trust",
    title: "Settlement Windows and Merchant Trust",
    metaTitle: "Settlement Windows and Merchant Trust | Rizwan Zafar",
    date: "2026-05-21",
    category: "Settlement & Reconciliation",
    readingTime: "8 min read",
    description:
      "Settlement timing is the most underrated product surface in payments. How T+0, T+1 and T+n settlement windows shape merchant trust, cashflow, and churn.",
    thesis: "Merchants do not churn because of fees. They churn because of settlement uncertainty.",
    tags: ["settlement", "merchant trust", "cashflow", "payment infrastructure"],
  },
  {
    slug: "click-to-pay-vctp-mctp-scheme-led-checkout",
    title: "Click to Pay (VCTP / MCTP): The Scheme-Led Checkout Standard, How It Actually Works",
    metaTitle: "Click to Pay (VCTP / MCTP): A Product Guide | Rizwan Zafar",
    date: "2026-05-20",
    category: "Payment Infrastructure",
    readingTime: "11 min read",
    description:
      "Click to Pay explained from the operator's lens — what VCTP and MCTP actually are, the merchant + issuer + consumer surface, why it shipped, where it works, where it's still patchy.",
    thesis:
      "Click to Pay is the schemes' answer to Apple Pay and Google Pay — a scheme-owned consumer checkout standard that lifts authorisation rate and removes card-number entry. It works. It's just under-marketed. This is the operator-grade map.",
    tags: [
      "Click to Pay",
      "VCTP",
      "MCTP",
      "scheme checkout",
      "card networks",
      "network tokenisation",
      "EMVCo SRC",
      "payment infrastructure",
      "Visa",
      "Mastercard",
    ],
  },
  {
    slug: "cybersource-architecture-visa-payment-gateway",
    title: "CyberSource Architecture: The Visa-Owned Payment Gateway, How It Differs From MPGS",
    metaTitle: "CyberSource Architecture: How Visa's Payment Gateway Works | Rizwan Zafar",
    date: "2026-05-20",
    category: "Payment Infrastructure",
    readingTime: "12 min read",
    description:
      "An operator's guide to CyberSource — Decision Manager, Token Management Service, Flex Microform, Payouts, and where the architecture differs meaningfully from MPGS.",
    thesis:
      "CyberSource is the gateway Visa wants you to standardise on. The product surface is broader than MPGS — Decision Manager and Flex Microform have no Mastercard equivalents — but the integration patterns and lifecycle traps are different in important ways.",
    tags: [
      "CyberSource",
      "Visa",
      "payment gateway",
      "Decision Manager",
      "Flex Microform",
      "Token Management Service",
      "VTS",
      "payment infrastructure",
      "scheme products",
    ],
  },
  {
    slug: "emv-3ds2-step-up-frictionless-optimisation",
    title:
      "EMV 3DS2: Step-Up Logic, Frictionless Flow and the Auth-Rate Optimisation Nobody Explains",
    metaTitle: "EMV 3DS2: Step-Up Logic + Frictionless Flow Optimisation | Rizwan Zafar",
    date: "2026-05-20",
    category: "Payment Infrastructure",
    readingTime: "11 min read",
    description:
      "An operator's guide to EMV 3DS2 — the three flows (frictionless, attempt, challenge), the exemption logic that decides which flow fires, and how to lift auth rate without breaking PSD2 SCA.",
    thesis:
      "3DS2 is the most consequential auth-rate lever most merchants don't touch. Default config gives you maximum step-up and minimum conversion. This is the operator's guide to the exemption logic that lifts auth rate without breaking compliance.",
    tags: [
      "EMV 3DS",
      "3DS2",
      "PSD2 SCA",
      "frictionless flow",
      "step-up authentication",
      "card acquiring",
      "payment infrastructure",
      "auth rate optimisation",
    ],
  },
  {
    slug: "payment-infrastructure-state-trust-failure",
    title: "Payment Infrastructure Is Not Just APIs, It Is State, Trust and Failure Handling",
    metaTitle: "Payment Infrastructure: State, Trust, Failure Handling | Rizwan Zafar",
    date: "2026-05-20",
    category: "Payment Infrastructure",
    readingTime: "10 min read",
    description:
      "An operator view of payment infrastructure at $1B+ GTV, why state, trust, and failure handling, not APIs, are the real product surface.",
    thesis:
      "APIs are the easy part. The hard part is what happens between the auth response and the bank statement.",
    tags: [],
  },
  {
    slug: "three-way-reconciliation-at-scale",
    title: "Three-Way Reconciliation at Scale",
    metaTitle: "Three-Way Reconciliation at Scale: A Practitioner Guide | Rizwan Zafar",
    date: "2026-05-20",
    category: "Settlement & Reconciliation",
    readingTime: "10 min read",
    description:
      "How to design three-way reconciliation across PSP, internal ledger and bank statement at $1B+ GTV, match keys, tolerances, exception taxonomy, and SLAs.",
    thesis:
      "Three-way reconciliation is the only model that survives multi-rail growth. Here is how to actually build it.",
    tags: ["reconciliation", "settlement", "ledger", "controls", "payment infrastructure"],
  },
  {
    slug: "mdes-network-tokenisation-how-it-actually-works",
    title: "MDES + Network Tokenisation: How It Actually Works (and Why You Should Default to It)",
    metaTitle: "MDES + Network Tokenisation: An Operator's Guide | Rizwan Zafar",
    date: "2026-05-19",
    category: "Payment Infrastructure",
    readingTime: "11 min read",
    description:
      "MDES, Visa Token Service, network tokens vs gateway tokens, the lifecycle the schemes own, Apple/Google Pay plumbing, and why every new card-on-file integration should default to network tokens.",
    thesis:
      "Network tokens are the most under-explained product in payments. They are the difference between a 60% authorisation rate and a 90% authorisation rate on stored cards. Default to them. Build for them. Migrate to them.",
    featured: true,
    tags: [
      "MDES",
      "VTS",
      "network tokenisation",
      "tokenisation",
      "card on file",
      "Apple Pay",
      "Google Pay",
      "payment infrastructure",
      "MasterCard",
      "Visa",
    ],
  },
  {
    slug: "mpges-mastercard-payment-gateway-services-architecture",
    title:
      "MPGS Architecture: How MasterCard Payment Gateway Services Actually Works (and Where It Breaks)",
    metaTitle: "MPGS Architecture: How MasterCard Payment Gateway Services Works | Rizwan Zafar",
    date: "2026-05-19",
    category: "Payment Infrastructure",
    readingTime: "12 min read",
    description:
      "An operator's guide to MPGS — Hosted Checkout vs. Hosted Session, 3DS2 step-up, tokenisation, recurring, the integration patterns that scale, and the failure modes nobody warns you about.",
    thesis:
      "MPGS is a payment gateway the way SAP is an ERP — vast, powerful, and indifferent to whether you understand it. The integration choices you make in the first sprint decide whether the platform scales for five years or rots for five.",
    featured: true,
    tags: [
      "MPGS",
      "MasterCard",
      "payment gateway",
      "3DS2",
      "tokenisation",
      "hosted checkout",
      "card acquiring",
      "payment infrastructure",
      "scheme products",
    ],
  },
  {
    slug: "reconciliation-is-product-infrastructure",
    title: "Reconciliation Is Product Infrastructure, Not Back Office",
    metaTitle: "Reconciliation Is Product Infrastructure, Not Back Office | Rizwan Zafar",
    date: "2026-05-19",
    category: "Settlement & Reconciliation",
    readingTime: "11 min read",
    description:
      "After running reconciliation at $1B+ GTV across multiple rails, here is why reconciliation is a product problem first, and what the architecture should look like.",
    thesis:
      "If finance is your reconciliation system, you do not have one. A practitioner view from running multi-rail settlement at scale.",
    featured: true,
    tags: [
      "reconciliation",
      "settlement",
      "ledger",
      "finance",
      "payment infrastructure",
      "controls",
    ],
  },
  {
    slug: "where-ml-beats-ai-payment-problems-llm-cant-touch",
    title: "Where ML Beats AI: Six Payment Problems an LLM Cannot Touch",
    metaTitle: "Where ML Beats AI: Six Payment Problems LLMs Can't Touch | Rizwan Zafar",
    date: "2026-05-19",
    category: "AI in Fintech",
    readingTime: "10 min read",
    description:
      "An operator's argument for picking classical ML over LLMs in payments. Six problems where a gradient-boosted model still wins, and why throwing a transformer at them is the wrong move.",
    thesis:
      "There is a quiet AI-in-fintech mistake teams keep making: reaching for an LLM the moment the word 'AI' shows up on the roadmap. Sometimes the right answer is a gradient-boosted tree and a clean feature pipeline. This is the operator's argument for the boring choice.",
    featured: true,
    tags: [
      "machine learning",
      "AI in fintech",
      "fraud detection",
      "credit scoring",
      "payment ML",
      "gradient boosting",
      "LLM limitations",
      "production ML",
    ],
  },
  {
    slug: "where-pmos-fail-six-patterns-fintech-programmes",
    title: "Where PMOs Fail: Six Patterns I've Watched in Fintech Programmes",
    metaTitle: "Where PMOs Fail: Six Patterns in Fintech Programmes | Rizwan Zafar",
    date: "2026-05-19",
    category: "Program Management",
    readingTime: "11 min read",
    description:
      "After standing up PMOs from scratch twice and reviewing others, the six failure patterns that show up most often. What they look like, why they happen, how to fix them.",
    thesis:
      "PMOs don't fail because the PMs are bad. They fail because the function gets miscast as governance theatre instead of decision-making infrastructure. Six failure shapes, the symptoms, the fix.",
    featured: true,
    tags: [
      "PMO",
      "program management",
      "PMO failures",
      "fintech operations",
      "delivery governance",
      "SteerCo",
      "RAID",
      "org design",
    ],
  },
  {
    slug: "virtual-card-accounts-product-guide",
    title:
      "Virtual Card Accounts (VCA): The Quiet Backbone of B2B, Travel and Marketplace Payments",
    metaTitle: "Virtual Card Accounts (VCA): A Product Guide for Payments Teams | Rizwan Zafar",
    date: "2026-05-18",
    category: "Payment Infrastructure",
    readingTime: "10 min read",
    description:
      "What virtual card accounts (VCAs) are, how they're issued, where they win against ACH and wires, the control surface that matters, and how product teams should think about interchange, reconciliation, and the four real use cases.",
    thesis:
      "VCAs look like a card primitive. They are actually a control primitive. The product job is to decide which controls travel with the number, and which sit in the platform.",
    featured: true,
    tags: [
      "virtual card accounts",
      "VCA",
      "B2B payments",
      "travel payments",
      "AP automation",
      "interchange",
      "issuing",
      "Visa",
      "Mastercard",
    ],
  },
  {
    slug: "open-banking-product-architecture",
    title:
      "Open Banking Product Architecture: Aggregator vs Direct, AISP vs PISP, and Where the Value Actually Lives",
    metaTitle: "Open Banking Product Architecture (PSD2, AISP, PISP, A2A) | Rizwan Zafar",
    date: "2026-05-17",
    category: "Payment Infrastructure",
    readingTime: "11 min read",
    description:
      "The product architecture of open banking: aggregator vs direct, AISP vs PISP scope, authentication UX as the entire product, A2A vs card-rail economics, and where the durable value lives beyond data access.",
    thesis:
      "Open banking is not a data product. It is a workflow product that happens to use bank data as its raw material. Teams that miss this build pretty dashboards and weak businesses.",
    featured: true,
    tags: [
      "open banking",
      "PSD2",
      "PSD3",
      "AISP",
      "PISP",
      "A2A payments",
      "aggregator",
      "account-to-account",
      "variable recurring payments",
      "VRP",
    ],
  },
  {
    slug: "product-management-for-payments-platforms",
    title: "Product Management for Payments Platforms: What's Different, and What's Not",
    metaTitle: "Product Management for Payments Platforms (What's Different) | Rizwan Zafar",
    date: "2026-05-16",
    category: "Product Strategy",
    readingTime: "11 min read",
    description:
      "What payments product management actually requires: five constituencies (merchant, consumer, scheme, regulator, ops), what translates from SaaS PM and what doesn't, the risk-adjusted backlog, the KPIs that matter, and the reconciliation reflex.",
    thesis:
      "A payments PM is a SaaS PM with three extra constituencies and one extra reflex. Get the reflex wrong and the other constituencies stop trusting you.",
    featured: true,
    tags: [
      "product management",
      "payments product management",
      "fintech PM",
      "product strategy",
      "authorization rate",
      "reconciliation",
      "risk-adjusted backlog",
      "product KPIs",
    ],
  },
  {
    slug: "ai-in-payments-four-production-use-cases",
    title: "GenAI in Fintech: 4 Production Use Cases That Actually Ship",
    metaTitle: "GenAI in Fintech: 4 Production Use Cases (2026) | Rizwan Zafar",
    date: "2026-05-15",
    category: "AI in Fintech",
    readingTime: "10 min read",
    description:
      "Four GenAI deployments running in production at a $1B+ TPV payments platform, merchant integration support, incident auto-escalation, partner support automation, and a fraud/AML AI pilot. What shipped, what didn't, and the operating model underneath.",
    thesis:
      "Most fintech AI work in 2026 is still demos. These four use cases are not, they're running in production at $1B+ TPV across five regulated markets.",
    tags: [
      "GenAI",
      "AI in payments",
      "RAG",
      "LLM",
      "merchant support",
      "fraud detection",
      "AML",
      "production AI",
    ],
  },
  {
    slug: "project-management-fintech-regulatory-programmes",
    title:
      "Project Management for Fintech Regulatory Programmes: PCI DSS, ISO 27001, SOC 2, AML/CFT",
    metaTitle:
      "Project Management for Fintech Regulatory Programmes (PCI, ISO, SOC 2, AML) | Rizwan Zafar",
    date: "2026-05-14",
    category: "Program Management",
    readingTime: "11 min read",
    description:
      "How to run regulatory programmes (PCI DSS, ISO 27001, SOC 2, AML/CFT) as actual projects with hard audit dates: scope, evidence, remediation, audit handling, document control, and the operational handoff that decides whether the certification survives.",
    thesis:
      "A regulatory programme is not a compliance exercise. It is a project with an immovable deadline (the audit), an external grader (the auditor), and a delivery cost (remediation) that gets paid up front or many times over.",
    tags: [
      "project management",
      "PCI DSS",
      "ISO 27001",
      "SOC 2",
      "AML CFT",
      "regulatory programme",
      "audit readiness",
      "compliance project management",
      "evidence management",
      "remediation",
    ],
  },
  {
    slug: "program-vs-product-management-fintech",
    title: "Program Management vs Product Management in Fintech: Lane Lines That Actually Hold",
    metaTitle: "Program Management vs Product Management in Fintech | Rizwan Zafar",
    date: "2026-05-13",
    category: "Program Management",
    readingTime: "10 min read",
    description:
      "The five places product and program management collide in fintech, what each role actually owns, the reporting lines and decision rights that work, and the sequencing (PM first, then PgM, then PMO) that lets a fintech scale without internal friction.",
    thesis:
      "Product and program management overlap because they have to. The overlap is where most fintechs break. Hold the lane lines and the overlap becomes the most productive seam in the org.",
    tags: [
      "program management",
      "product management",
      "PgM",
      "org design",
      "fintech operations",
      "PMO",
      "decision rights",
      "delivery",
    ],
  },
  {
    slug: "rag-for-merchant-integration-support",
    title: "RAG for Merchant Integration Support: A Production Playbook",
    metaTitle: "RAG for Merchant Integration Support (Playbook) | Rizwan Zafar",
    date: "2026-05-13",
    category: "AI in Fintech",
    readingTime: "9 min read",
    description:
      "How to build a RAG-based merchant integration support bot for a payments platform, corpus design, citation discipline, fallback paths and the operating model that keeps it useful at scale.",
    thesis:
      "RAG is the right starting architecture for merchant integration support, but only if the corpus is curated, the citations are mandatory and the fallback paths are designed before launch.",
    tags: [
      "RAG",
      "GenAI",
      "merchant support",
      "AI in payments",
      "LLM",
      "integration",
      "developer experience",
    ],
  },
  {
    slug: "ai-auto-escalation-payment-ops",
    title: "AI-Powered Auto-Escalation: Cutting Payment Incident MTTR by 70%",
    metaTitle: "AI Auto-Escalation for Payment Ops (−70% MTTR) | Rizwan Zafar",
    date: "2026-05-11",
    category: "AI in Fintech",
    readingTime: "8 min read",
    description:
      "How to deploy an AI auto-escalation agent for payment operations, error-spike detection, log analysis, root-cause hypothesis and on-call paging with full diagnostics. Cut MTTR by 70%.",
    thesis:
      "The first 15 minutes of any payment incident is reconstruction work. An AI auto-escalation bot does that reconstruction in seconds, and your incident commander walks in with the diagnostic already done.",
    tags: [
      "AI in payments",
      "LLM agent",
      "incident response",
      "payment operations",
      "MTTR",
      "SRE",
      "GenAI",
    ],
  },
  {
    slug: "value-modeling-genai-use-cases-fintech",
    title:
      "Value-Modeling GenAI Use Cases in Fintech: ROI, Feasibility, Data Readiness, Regulatory Risk",
    metaTitle: "Value-Modeling GenAI Use Cases in Fintech | Rizwan Zafar",
    date: "2026-05-09",
    category: "AI in Fintech",
    readingTime: "9 min read",
    description:
      "A four-axis framework for prioritising GenAI use cases in a regulated fintech: ROI, feasibility, data readiness and regulatory risk. The exact framework used to narrow 20+ candidates to 4 production deployments at Simpaisa.",
    thesis:
      "Most fintech AI roadmaps fail because they prioritise ambition over data readiness and regulatory risk. This is the four-axis framework that ships.",
    tags: [
      "GenAI",
      "AI in fintech",
      "product strategy",
      "value modeling",
      "prioritisation",
      "regulatory",
      "data readiness",
    ],
  },
  {
    slug: "ai-fraud-detection-vs-rule-engines",
    title: "AI Fraud Detection vs Rule Engines: A Field Comparison",
    metaTitle: "AI Fraud Detection vs Rule Engines: Field Comparison | Rizwan Zafar",
    date: "2026-05-07",
    category: "AI in Fintech",
    readingTime: "10 min read",
    description:
      "When does AI fraud detection beat a tuned rule engine in payments? A field comparison based on running both at $1B+ GTV, false positives, drift, explainability, regulator posture and the hybrid model that actually wins.",
    thesis:
      "AI fraud detection beats rule engines on novel-attack detection. Rule engines beat AI on explainability and ops cost. The right answer is almost always a hybrid, and the design of the hybrid is the actual work.",
    tags: [
      "AI fraud detection",
      "rule engine",
      "AML",
      "fraud risk",
      "payments",
      "machine learning",
      "false positives",
      "regulator",
    ],
  },
  {
    slug: "crypto-on-ramps-product-guide",
    title: "Crypto On-Ramps: A Product Guide for Banks and Fintechs",
    metaTitle: "Crypto On-Ramps: Product Guide for Banks and Fintechs (2026) | Rizwan Zafar",
    date: "2026-05-05",
    category: "Crypto & Stablecoins",
    readingTime: "10 min read",
    description:
      "How to design a crypto on-ramp inside a regulated bank or fintech, KYC tiers, sponsor liquidity, FX exposure, Travel Rule compliance, VARA alignment, and the product surfaces that make it actually convert.",
    thesis:
      "A crypto on-ramp is a payments product, not a crypto product. The hard parts are KYC tiering, sponsor liquidity, FX exposure and Travel Rule, not the wallet integration.",
    tags: [
      "crypto",
      "on-ramp",
      "fiat to crypto",
      "stablecoin",
      "VARA",
      "travel rule",
      "KYC",
      "regulated crypto",
    ],
  },
  {
    slug: "crypto-off-ramps-emerging-markets",
    title: "Crypto Off-Ramps in Emerging Markets: The Real Plumbing",
    metaTitle: "Crypto Off-Ramps in Emerging Markets (2026) | Rizwan Zafar",
    date: "2026-05-03",
    category: "Crypto & Stablecoins",
    readingTime: "9 min read",
    description:
      "Crypto off-ramps in emerging markets, Pakistan, Bangladesh, Egypt, Nigeria, Argentina, depend on local rail depth, regulator posture and partner-bank willingness, not the chain. The real product problem.",
    thesis:
      "An off-ramp is only as good as the local payout rail underneath it. In emerging markets, that rail is the hardest, most fragile part of the entire crypto stack.",
    tags: [
      "crypto off-ramp",
      "emerging markets",
      "stablecoin payout",
      "Pakistan",
      "MENA",
      "crypto",
      "remittance",
      "VARA",
    ],
  },
  {
    slug: "stablecoin-payments-2026",
    title: "Stablecoin Payments in 2026: Where USDC, USDT and Bank-Issued Stables Actually Fit",
    metaTitle: "Stablecoin Payments in 2026: USDC, USDT, Bank-Issued | Rizwan Zafar",
    date: "2026-05-01",
    category: "Crypto & Stablecoins",
    readingTime: "10 min read",
    description:
      "Where stablecoins actually fit in payments product strategy in 2026, B2B settlement, cross-border payouts, treasury, merchant acceptance. What's working, what's not, and the operating model underneath.",
    thesis:
      "Stablecoins are quietly winning the B2B cross-border settlement use case. They are still losing consumer acceptance. The interesting product work is at the boundary.",
    tags: [
      "stablecoin",
      "USDC",
      "USDT",
      "bank-issued stables",
      "B2B payments",
      "cross-border",
      "treasury",
      "merchant acceptance",
    ],
  },
  {
    slug: "building-pmo-from-scratch-fintech",
    title: "Building a PMO from Scratch in a Fintech: A 90-Day Playbook",
    metaTitle: "Build a PMO from Scratch in a Fintech (90-Day Playbook) | Rizwan Zafar",
    date: "2026-04-28",
    category: "Program Management",
    readingTime: "9 min read",
    description:
      "A practitioner playbook for standing up a PMO from scratch inside a fintech, what to build in the first 90 days, what to skip, what to govern centrally, and what to keep in the squads.",
    thesis:
      "A fintech PMO is not a governance overlay. It's the operating system that lets product, engineering, risk and compliance ship together at regulated-payments cadence.",
    tags: [
      "PMO",
      "programme management",
      "fintech operations",
      "delivery governance",
      "PMBOK",
      "Agile",
      "hybrid frameworks",
      "org design",
    ],
  },
  {
    slug: "pmbok-plus-agile-hybrid-frameworks",
    title: "PMBOK + Agile Hybrid Frameworks for Payments Teams",
    metaTitle: "PMBOK + Agile Hybrid for Payments Teams | Rizwan Zafar",
    date: "2026-04-25",
    category: "Program Management",
    readingTime: "8 min read",
    description:
      "Why payments organisations need hybrid PMBOK + Agile delivery frameworks, Agile sprints for product, PMBOK stage gates for capital and regulatory workstreams. The practitioner playbook.",
    thesis:
      "Pure Agile breaks on regulatory capital projects. Pure PMBOK breaks on product velocity. The right answer is a hybrid, and the design of the hybrid is the actual work.",
    tags: [
      "PMBOK",
      "Agile",
      "hybrid framework",
      "payments delivery",
      "PMO",
      "capital projects",
      "stage gates",
      "Scrum",
    ],
  },
  {
    slug: "three-million-dollar-transformation-postmortem",
    title: "Running a $3M Digital Transformation Programme: A Postmortem (TapmadTV)",
    metaTitle: "Postmortem: $3M Digital Transformation Programme (TapmadTV) | Rizwan Zafar",
    date: "2026-04-22",
    category: "Program Management",
    readingTime: "9 min read",
    description:
      "A practitioner postmortem on running a $3M digital transformation programme to launch Pakistan's first licensed OTT platform, 5 workstreams, 25 people, 8 international vendors, on-schedule landing.",
    thesis:
      "What it actually took to land a $3M transformation programme on schedule across 5 technology workstreams and 8 vendors, and the three things I would do differently.",
    tags: [
      "programme management",
      "PMO",
      "digital transformation",
      "postmortem",
      "vendor governance",
      "PMBOK",
      "SteerCo",
      "case study",
    ],
  },
  {
    slug: "raid-steerco-pmo-stack-that-ships",
    title: "RAID Logs, SteerCo and the PMO Stack That Actually Ships at $1B+ Scale",
    metaTitle: "RAID, SteerCo and the PMO Stack at $1B+ Scale | Rizwan Zafar",
    date: "2026-04-20",
    category: "Program Management",
    readingTime: "9 min read",
    description:
      "What an actually-working PMO stack looks like at $1B+ TPV, RAID register design, SteerCo cadence, OKR + RICE prioritisation, escalation paths, and the rituals that compound.",
    thesis:
      "Most PMO failure modes come from registers without owners, SteerCos without decisions, and OKRs without consequences. Fix the stack, fix the delivery.",
    tags: [
      "PMO",
      "RAID",
      "SteerCo",
      "OKR",
      "RICE",
      "programme governance",
      "delivery",
      "fintech operations",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getRelated = (slug: string) => {
  const p = getPost(slug);
  if (!p) return [];
  return posts
    .filter(
      (x) =>
        x.slug !== slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t))),
    )
    .slice(0, 3);
};
