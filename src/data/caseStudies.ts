export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  metrics: { label: string; value: string }[];
  problem: string;
  built: string[];
  role: string;
  impact: string[];
  keywords: string[];
  lessons: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "simpaisa-payment-infrastructure",
    title: "Simpaisa Payment Infrastructure Platform",
    tagline:
      "A regulated, multi-rail payments platform powering $1B+ GTV across pay-in, payout, wallets, DCB, IBFT, FX and cross-border corridors.",
    category: "Payment Infrastructure",
    metrics: [
      { label: "Annual GTV", value: "$1B+" },
      { label: "Monthly transactions", value: "25M+" },
      { label: "Settlement SLA", value: "99.95%" },
      { label: "Fraud loss", value: "<0.1% GTV" },
      { label: "Downtime reduction", value: "−90%" },
      { label: "Enterprise wallet adoption", value: "30%" },
    ],
    problem:
      "Merchants and platforms operating in Pakistan, Bangladesh, Nepal, Iraq and Egypt needed a single regulated rail to accept, payout, settle and reconcile across cards (MPGS/MDES), wallets, IBFT, DCB and cross-border corridors — without stitching together fragile point integrations. In 2024, regulatory tightening and a CTO departure forced the platform to operate under heightened scrutiny without losing pace.",
    built: [
      "Unified pay-in API across cards, wallets, DCB, IBFT and bank transfers",
      "Payout and disbursement engine with corridor-aware routing",
      "Wallet ledger, hold/release flows and partner subaccounts",
      "Cross-border + FX layer integrating DLocal, Thunes, Boku, Coda and MoneyGram",
      "Settlement and reconciliation engine with T+0/T+1 reporting",
      "Merchant console: onboarding, KYC/KYB, dashboards and dispute workflows",
    ],
    role:
      "Chief Product Officer. Owned product strategy, roadmap, partner integrations, regulatory posture and the org structure to ship and operate the platform end-to-end.",
    impact: [
      "Scaled to $1B+ annual GTV and 25M+ monthly transactions",
      "Onboarded enterprise platforms including TikTok, Uber, Temu, PUBG and MoneyGram",
      "Achieved PCI DSS and ISO 27001 certifications from scratch",
      "Reduced settlement cycle and improved reconciliation accuracy to 99.95%",
    ],
    keywords: [
      "payment infrastructure",
      "cross-border payments",
      "wallet platform",
      "settlement engine",
      "emerging markets fintech",
    ],
    lessons: [
      "Payment infrastructure is a product problem, not a platform problem — orchestration, error states and retries decide the experience.",
      "In emerging markets, local payment methods determine acceptance more than card-network features.",
      "Compliance posture (PCI DSS, ISO 27001, AML/CFT) is a sales asset, not a cost line.",
    ],
  },
  {
    slug: "merchant-onboarding-kyc",
    title: "Merchant Onboarding + KYC/KYB Automation",
    tagline:
      "An automated onboarding pipeline turning regulated merchant activation from weeks to hours.",
    category: "Merchant Onboarding",
    metrics: [
      { label: "Activation time", value: "Weeks → hours" },
      { label: "Manual review load", value: "−70%" },
      { label: "Approval accuracy", value: "Improved" },
    ],
    problem:
      "Manual KYC/KYB on regulated merchants was slow, inconsistent and the single biggest blocker to GTV growth — and a compliance risk.",
    built: [
      "Document capture, OCR and liveness verification flow",
      "Risk-tiered KYB pipeline with sanctions, PEP and adverse media screening",
      "Automated UBO discovery and corporate structure validation",
      "Configurable rules engine for jurisdiction-specific requirements",
      "Operations console with prioritized review queues and SLA tracking",
    ],
    role:
      "Product owner end-to-end: defined the risk taxonomy, integrated screening vendors, designed merchant-facing UX and ops tooling.",
    impact: [
      "Reduced merchant activation from weeks to hours for low-risk tiers",
      "Cut manual review workload by ~70% with no increase in default rate",
      "Standardized onboarding across UAE, Pakistan, Bangladesh, Nepal, Iraq and Egypt",
    ],
    keywords: ["KYC KYB automation", "merchant onboarding", "AML CFT", "fintech compliance"],
    lessons: [
      "Onboarding conversion and risk are the same product surface — separating them creates leakage and false positives.",
      "Most KYB delays are document quality issues, not policy issues. Fix capture first.",
    ],
  },
  {
    slug: "fraud-risk-aml-cft",
    title: "Fraud, Risk and AML/CFT Controls",
    tagline:
      "A layered fraud and AML/CFT program built natively into the payments stack.",
    category: "Fraud & Risk",
    metrics: [
      { label: "Fraud loss rate", value: "Below industry benchmark" },
      { label: "False positives", value: "Materially reduced" },
      { label: "Regulatory posture", value: "PCI DSS + ISO 27001" },
    ],
    problem:
      "Cross-border, wallet and DCB flows expose multiple fraud vectors — chargebacks, account takeover, mule activity, structuring and sanctions exposure — that no single off-the-shelf vendor covers.",
    built: [
      "Real-time decisioning layer combining vendor signals, device intelligence and internal velocity rules",
      "Case management for analysts with SAR-ready audit trails",
      "Transaction monitoring scenarios for AML/CFT, sanctions and PEP screening",
      "Chargeback and dispute automation tied to merchant risk tier",
    ],
    role:
      "Defined the risk product strategy, selected vendors, built the internal rules platform and partnered with compliance and operations.",
    impact: [
      "Maintained fraud loss rates below industry benchmarks at $1B+ GTV",
      "Cleared regulator and partner audits including PCI DSS and ISO 27001",
      "Cut false positives without weakening AML/CFT controls",
    ],
    keywords: ["payment fraud risk", "AML CFT payments", "transaction monitoring", "chargebacks"],
    lessons: [
      "Risk that is not a product surface becomes ops debt. Build review tools as carefully as merchant flows.",
      "AML/CFT scenarios decay — they need a feedback loop with analysts, not just a launch.",
    ],
  },
  {
    slug: "settlement-reconciliation",
    title: "Settlement + Reconciliation Engine",
    tagline:
      "A multi-rail settlement and reconciliation engine that closed the gap between treasury, finance and product.",
    category: "Settlement & Reconciliation",
    metrics: [
      { label: "Reconciliation accuracy", value: "99.95%" },
      { label: "Settlement cycle", value: "T+0 / T+1" },
      { label: "Manual journal entries", value: "Eliminated for core flows" },
    ],
    problem:
      "Multi-rail flows across cards, wallets, IBFT, DCB and cross-border corridors created reconciliation breakage that finance and treasury were absorbing manually — slowing payouts and obscuring real margin.",
    built: [
      "Canonical transaction ledger across all rails",
      "Automated three-way reconciliation: gateway, bank/partner, internal ledger",
      "Settlement scheduler with corridor-aware payout windows",
      "Exception workflows with root-cause tagging fed back to product",
    ],
    role:
      "Product owner working alongside finance, treasury and engineering. Defined the ledger model, exception taxonomy and settlement SLAs.",
    impact: [
      "99.95% reconciliation accuracy at $1B+ GTV scale",
      "Eliminated manual journal entries for core flows",
      "Made unit economics observable per rail, per corridor, per merchant",
    ],
    keywords: ["settlement reconciliation", "payments ledger", "treasury", "fintech operations"],
    lessons: [
      "Settlement and reconciliation are not back-office problems — they decide trust with merchants and partners.",
      "If finance is your reconciliation system, you don't have one.",
    ],
  },
  {
    slug: "cross-border-corridors-fx",
    title: "Cross-Border Corridors + FX Infrastructure",
    tagline:
      "Cross-border pay-in and payout corridors with FX, partner routing and corridor-level economics.",
    category: "Cross-Border Payments",
    metrics: [
      { label: "Corridors live", value: "Multi-market" },
      { label: "Partners", value: "DLocal, Thunes, Boku, Coda, MoneyGram" },
      { label: "Routing", value: "Cost + success-rate aware" },
    ],
    problem:
      "Global merchants needed reliable, compliant pay-in and payout into Pakistan, Bangladesh, Nepal, Iraq and Egypt — and local merchants needed cross-border payouts and FX.",
    built: [
      "Corridor abstraction layer over multiple PSPs and remittance partners",
      "FX engine with margin controls and quote/lock flows",
      "Smart routing using cost, success rate and partner health",
      "Compliance overlays per corridor: limits, screening, reporting",
    ],
    role:
      "Owned partner strategy, commercial negotiations and the product surface that exposed corridors to merchants.",
    impact: [
      "Live corridors covering UAE, Pakistan, Bangladesh, Nepal, Iraq and Egypt",
      "Materially improved success rates via routing and retries",
      "Made cross-border economics transparent to merchants",
    ],
    keywords: ["cross-border payments", "FX infrastructure", "remittance", "MENA fintech"],
    lessons: [
      "A corridor is a product, not a partner integration. Owning the abstraction is owning the margin.",
      "Local methods plus FX, not cards alone, win cross-border in emerging markets.",
    ],
  },
  {
    slug: "tapmad-wallet-billing-migration",
    title: "Tapmad Wallet/Billing Migration",
    tagline:
      "Migrated subscription billing off high-cost rails and rebuilt wallet/DCB flows — payment cost from 50% to 1%.",
    category: "Product Strategy",
    metrics: [
      { label: "Payment cost", value: "50% → 1%" },
      { label: "Paid subscribers", value: "5M+" },
      { label: "ARPU", value: "+70%" },
    ],
    problem:
      "Tapmad's subscription business was being eaten alive by payment cost — operator and aggregator margins consumed up to half of revenue, capping growth and ARPU.",
    built: [
      "Re-architected billing to prefer wallet, DCB and direct bank rails",
      "Smart retry and dunning flows tuned per rail and per cohort",
      "Pricing and packaging changes aligned to rail economics",
      "Reconciliation against operator settlements to recover leakage",
    ],
    role:
      "Drove the payments product strategy, vendor renegotiation and the cross-functional migration with growth, finance and engineering.",
    impact: [
      "Reduced payment cost from ~50% to ~1% of revenue",
      "Scaled to 5M+ paid subscribers",
      "Increased ARPU by 70%",
    ],
    keywords: ["subscription billing", "DCB", "wallet payments", "fintech product strategy"],
    lessons: [
      "Payment cost is a product variable, not a procurement one.",
      "Retries and dunning are growth levers when rail economics are understood.",
    ],
  },
  {
    slug: "daraz-payment-operations",
    title: "Daraz Payment Operations + COD-to-Digital Conversion",
    tagline:
      "Built the payment operations spine and shifted a marketplace from cash-on-delivery to digital.",
    category: "Payment Operations",
    metrics: [
      { label: "COD share", value: "Materially reduced" },
      { label: "Settlement disputes", value: "Significantly down" },
      { label: "Fraud rules", value: "Codified across categories" },
    ],
    problem:
      "Marketplace payments were dominated by COD with painful settlement, dispute and fraud workflows — limiting margin, working capital and digital growth.",
    built: [
      "Settlement and dispute workflows for sellers and logistics partners",
      "Fraud rules tuned per category, geography and seller cohort",
      "Incentive design to migrate buyers from COD to digital wallets and cards",
      "Operational dashboards across pay-in, refund and settlement",
    ],
    role:
      "Led payment operations and the COD-to-digital conversion program across multiple markets.",
    impact: [
      "Reduced COD share and improved working capital",
      "Cut settlement disputes and fraud loss",
      "Made payments a measured, owned surface inside the marketplace",
    ],
    keywords: ["payment operations", "COD to digital", "marketplace payments", "South Asia fintech"],
    lessons: [
      "COD is a product debt, not a customer preference. Incentives and trust shift it.",
      "Sellers experience payments through settlement, not checkout.",
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
