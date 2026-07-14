import { DARAZ, PLATFORM } from "@/content/facts";

export type BeforeAfter = { metric: string; before: string; after: string };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  /** Markets the work touched, used for the index filter. */
  markets?: string[];
  /** Companies this case study is most relevant to, used for filters. */
  relevantFor?: string[];
  metrics: { label: string; value: string }[];
  beforeAfter?: BeforeAfter[];
  executiveSummary: string;
  problem: string;
  built: string[];
  architecture?: string[];
  operatingModel?: string[];
  role: string;
  impact: string[];
  tradeoffs?: string[];
  lessons: string[];
  whyItMatters: string;
  keywords: string[];
  /** Alt text for the abstract symbolic hero image at /cs/<slug>.webp. */
  imageAlt?: string;
  /** One load-bearing insight, rendered at giant display-serif scale as the
   *  pull-quote. MUST NOT restate the tagline. Aim for 14–24 words. Falls back
   *  to tagline if missing so older case studies still render. */
  pullQuote?: string;
  /** Optional attribution for the pull-quote (e.g. self-attributed by year). */
  pullQuoteBy?: string;
  /** Disclosure line for work delivered outside Simpaisa (e.g. independent
   *  consulting for a confidential client). Rendered in the hero so a reader
   *  never has to guess whether a case study is employer or advisory work. */
  engagement?: string;
  /** When true, this study renders as a full editorial flagship panel on
   *  /product-work; the remaining studies collapse into the compact
   *  "Additional programmes" index below. Exactly six are marked. Every slug
   *  keeps its own detail page and URL regardless of this flag. */
  flagship?: boolean;
  /** Rendered near the top of the detail page for studies whose client is
   *  under NDA (the confidential consulting engagements). Named-employer
   *  studies (Simpaisa, Tapmad, Daraz) do not carry this. */
  clientDisclosure?: string;
};

// Hero image paths follow a strict convention so routes don't need to look
// up the path from data — same slug, two sizes. See public/cs/.
// Some case studies reuse an existing abstract hero rather than ship bespoke
// art (keeps visual quality high and avoids 404s for text-led case studies).
// Same pattern as the original swift-mt-mx ↔ cross-border alias.
const CS_IMAGE_ALIAS: Record<string, string> = {
  "swift-mt-mx-implementation-simpaisa": "cross-border-corridors-fx",
  "tapmad-dcb-monetisation-wallet-migration": "tapmad-wallet-billing-migration",
};
const caseStudyImageSlug = (slug: string) => CS_IMAGE_ALIAS[slug] ?? slug;

export const caseStudyHero = (slug: string) => `/cs/${caseStudyImageSlug(slug)}.webp`;
export const caseStudyThumb = (slug: string) => `/cs/${caseStudyImageSlug(slug)}-thumb.webp`;

export const caseStudies: CaseStudy[] = [
  {
    slug: "simpaisa-payment-infrastructure",
    flagship: true,
    title: "Simpaisa Payment Infrastructure Platform",
    tagline:
      "A regulated, multi-rail payments platform processing $1B+ annual GTV and 270M+ payments a year across pay-in, payout, wallets (DCB/IBFT), card acquiring (MPGS/MDES), settlement, FX and cross-border corridors, PCI DSS and ISO/IEC 27001 certified.",
    category: "Payment Infrastructure",
    markets: [...PLATFORM.markets],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen", "Thunes", "DLocal"],
    beforeAfter: [
      {
        metric: "Platform downtime",
        before: "Frequent incidents",
        after: "−90%",
      },
      {
        metric: "Settlement SLA",
        before: "Best-effort",
        after: "99.95%",
      },
      {
        metric: "Enterprise wallet adoption",
        before: "<5%",
        after: "30%",
      },
    ],
    metrics: [
      {
        label: "Annual GTV",
        value: "$1B+",
      },
      {
        label: "Annual transactions",
        value: "270M+",
      },
      {
        label: "Settlement SLA",
        value: "99.95%",
      },
      {
        label: "Fraud loss",
        value: "<0.1% GTV",
      },
      {
        label: "Downtime reduction",
        value: "−90%",
      },
      {
        label: "Enterprise wallet adoption",
        value: "30%",
      },
      // Relocated from the homepage "Operating record" block (Loop 3). On the
      // homepage these were six more digits with no context; here they sit
      // beside the architecture that produced them. Values unchanged, sourced
      // from profile.metrics.
      {
        label: "Payment success",
        value: "97%",
      },
      {
        label: "Straight-through processing",
        value: "90%",
      },
      {
        label: "Uptime",
        value: "99.9%",
      },
      {
        label: "Authorization uplift",
        value: "+14%",
      },
    ],
    executiveSummary:
      "Owned the product, architecture and operating model of a five-market payments platform serving global enterprises and local merchants. Took a fragmented integration estate and turned it into a single regulated rail with shared APIs, ledger, settlement and risk, through a CTO departure and a regulatory tightening.",
    problem: `Merchants and platforms operating in ${PLATFORM.markets.join(", ")} needed a single regulated rail to accept, payout, settle and reconcile across cards (MPGS/MDES), wallets, IBFT, DCB and cross-border corridors, without stitching together fragile point integrations. In 2024, regulatory tightening and a CTO departure forced the platform to operate under heightened scrutiny without losing pace.`,
    built: [
      "Unified pay-in API across cards, wallets, DCB, IBFT and bank transfers",
      "Payout and disbursement engine with corridor-aware routing",
      "Wallet ledger, hold/release flows and partner subaccounts",
      "Cross-border + FX layer integrating DLocal, Thunes, Boku, Coda and MoneyGram",
      "Settlement and reconciliation engine with T+0/T+1 reporting",
      "Merchant console: onboarding, KYC/KYB, dashboards and dispute workflows",
    ],
    architecture: [
      "Single pay-in/payout API surface, rails are an implementation detail behind a stable contract",
      "Canonical double-entry ledger; rails post events, settlement reads from the ledger",
      "Corridor abstraction with routing policy (cost, success rate, partner health)",
      "Risk service in-line: pre-auth, post-auth and async monitoring share one feature store",
      "Event-driven webhooks; idempotency, retries and DLQs are first-class",
    ],
    operatingModel: [
      "40-engineer payments organisation across 12 cross-functional squads",
      "Weekly rail health reviews, success rate, cost, latency, dispute rate per partner",
      "Joint risk + product council owning the risk taxonomy and false-positive budget",
      "Regulator-facing reporting pipeline owned by product, not finance",
    ],
    role: "Chief Product Officer (acting CTO during the 2024 regulatory tightening). Owned product strategy, roadmap, partner integrations, regulatory posture, security architecture and the org structure to ship and operate the platform end-to-end.",
    impact: [
      "Scaled to $1B+ annual GTV and 270M+ payments a year across 5 frontier markets",
      "Onboarded enterprise platforms including TikTok, Samsung, Shein, Uber and MoneyGram",
      "Held fraud loss below 0.1% of GTV; cut platform downtime by 90%",
      "Led PCI DSS and ISO/IEC 27001 certification programs from scratch",
      "Drove 30% enterprise wallet adoption and 99.95% settlement SLA",
    ],
    tradeoffs: [
      "Chose a single ledger over per-rail ledgers, slower to ship rail #1, much faster after rail #3",
      "Built risk in-house rather than fully outsourcing, higher ops cost, far lower false-positive rate",
      "Kept enterprise-grade onboarding for low-volume merchants, accepted some activation friction to preserve regulator posture",
    ],
    lessons: [
      "Payment infrastructure is a product problem, not a platform problem, orchestration, error states and retries decide the experience.",
      "In emerging markets, local payment methods determine acceptance more than card-network features.",
      "Compliance posture (PCI DSS, ISO 27001, AML/CFT) is a sales asset, not a cost line.",
    ],
    whyItMatters:
      "The transferable core: standing up regulated multi-rail infrastructure across non-trivial markets and running it under regulator scrutiny, with partner enablement, scheme readiness, settlement, risk and reporting owned as one job at $1B+ GTV. The same job exists inside every network, PSP and cross-border platform; only the logo on the door changes.",
    keywords: [
      "payment infrastructure",
      "cross-border payments",
      "wallet platform",
      "settlement engine",
      "emerging markets fintech",
      "regulated fintech platforms",
    ],
  },
  {
    slug: "merchant-onboarding-kyc",
    flagship: true,
    title: "Merchant Onboarding + KYC/KYB Automation",
    tagline:
      "Automated merchant onboarding pipeline, KYC/KYB, UBO discovery, sanctions and PEP screening, risk-tiered decisioning with full audit trail. Activation cut from weeks to hours; manual review load down 70%.",
    category: "Merchant Onboarding",
    markets: [...PLATFORM.markets],
    relevantFor: ["Stripe", "Adyen", "Wise", "Visa", "Mastercard"],
    beforeAfter: [
      {
        metric: "Activation time",
        before: "Weeks",
        after: "Hours (low-risk tiers)",
      },
      {
        metric: "Manual review load",
        before: "Baseline",
        after: "−70%",
      },
    ],
    metrics: [
      {
        label: "Activation",
        value: "Weeks → hours",
      },
      {
        label: "Manual review load",
        value: "−70%",
      },
      {
        label: "Approval accuracy",
        value: "Improved",
      },
      {
        label: "Markets standardized",
        value: String(PLATFORM.marketCount),
      },
    ],
    executiveSummary:
      "Re-architected merchant activation as a single risk + product surface: capture, screening, tiering, pricing and ops review all driven by one configurable engine instead of seven manual workflows.",
    problem:
      "Manual KYC/KYB on regulated merchants was slow, inconsistent and the single biggest blocker to GTV growth, and a compliance risk.",
    built: [
      "Document capture, OCR and liveness verification flow",
      "Risk-tiered KYB pipeline with sanctions, PEP and adverse media screening",
      "Automated UBO discovery and corporate structure validation",
      "Configurable rules engine for jurisdiction-specific requirements",
      "Operations console with prioritized review queues and SLA tracking",
    ],
    architecture: [
      "Capture, screening and decisioning split into independent services with one shared case object",
      "Policy-as-config, jurisdiction rules versioned and audited per merchant decision",
      "Decision explanations rendered to ops, merchant and regulator from the same source",
    ],
    operatingModel: [
      "Risk and product share one queue and one SLA",
      "Weekly false-positive review feeding back into rules and capture quality",
    ],
    role: "Product owner end-to-end: defined the risk taxonomy, integrated screening vendors, designed merchant-facing UX and ops tooling.",
    impact: [
      "Reduced merchant activation from weeks to hours for low-risk tiers",
      "Cut manual review workload by ~70% with no increase in default rate",
      `Standardized onboarding across ${PLATFORM.markets.join(", ")}`,
    ],
    tradeoffs: [
      "Invested in capture quality before any policy automation, slower start, lower long-term review load",
      "Forced a single global schema with jurisdiction overlays rather than per-country forms",
    ],
    lessons: [
      "Onboarding conversion and risk are the same product surface, separating them creates leakage and false positives.",
      "Most KYB delays are document quality issues, not policy issues. Fix capture first.",
    ],
    whyItMatters:
      "The transferable core: making activation speed and risk posture move together, so faster onboarding never weakens the bank, scheme or regulator evidence trail. Acquirers, PSPs and cross-border networks all live or die on that same balance; only the logo changes.",
    keywords: ["KYC KYB automation", "merchant onboarding", "AML CFT", "fintech compliance"],
  },
  {
    slug: "settlement-reconciliation",
    flagship: true,
    title: "Settlement + Reconciliation Engine: 99.95% Accuracy at $1B+ GTV",
    tagline:
      "A multi-rail settlement and reconciliation engine, canonical double-entry ledger, three-way auto-reconciliation, exception management and corridor-aware payout windows. Closed the gap between treasury, finance and product at $1B+ GTV.",
    category: "Settlement & Reconciliation",
    markets: [...PLATFORM.markets],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen"],
    beforeAfter: [
      {
        metric: "Recon accuracy",
        before: "Manual spreadsheets",
        after: "99.95% automated",
      },
      {
        metric: "Manual journal entries",
        before: "Daily, by finance",
        after: "Eliminated (core flows)",
      },
    ],
    metrics: [
      {
        label: "Reconciliation accuracy",
        value: "99.95%",
      },
      {
        label: "Settlement cycle",
        value: "T+0 / T+1",
      },
      {
        label: "Manual journals",
        value: "Eliminated (core flows)",
      },
      {
        label: "Rails",
        value: "Cards · wallets · IBFT · DCB · cross-border",
      },
    ],
    executiveSummary:
      "Replaced spreadsheet reconciliation across five rails with a canonical ledger, three-way auto-recon and an exception taxonomy that fed product. Made unit economics observable per rail, per corridor, per merchant.",
    problem:
      "Multi-rail flows across cards, wallets, IBFT, DCB and cross-border corridors created reconciliation breakage that finance and treasury were absorbing manually, slowing payouts and obscuring real margin.",
    built: [
      "Canonical transaction ledger across all rails",
      "Automated three-way reconciliation: gateway, bank/partner, internal ledger",
      "Settlement scheduler with corridor-aware payout windows",
      "Exception workflows with root-cause tagging fed back to product",
    ],
    architecture: [
      "Double-entry ledger as the source of truth; rails publish events that post entries",
      "Recon as a stream join across three sources with a tagged exception store",
      "Settlement scheduler reads available balance per merchant per currency per corridor",
    ],
    operatingModel: [
      "Finance signs off on the ledger model and exception taxonomy",
      "Every exception type has a product owner and a recovery SLA",
    ],
    role: "Product owner working alongside finance, treasury and engineering. Defined the ledger model, exception taxonomy and settlement SLAs.",
    impact: [
      "99.95% reconciliation accuracy at $1B+ GTV scale",
      "Eliminated manual journal entries for core flows",
      "Made unit economics observable per rail, per corridor, per merchant",
    ],
    tradeoffs: [
      "Held back a faster payout window until recon confidence was demonstrable",
      "Built our own exception store rather than buying a recon tool, better feedback loop, more ownership",
    ],
    lessons: [
      "Settlement and reconciliation are not back-office problems, they decide trust with merchants and partners.",
      "If finance is your reconciliation system, you don't have one.",
    ],
    whyItMatters:
      "The transferable core: a canonical ledger, three-way reconciliation and an exception taxonomy that make settlement observable per rail and per corridor. Acceptance, scheme settlement and treasury teams are recon products at heart, inside every network, PSP and cross-border platform; only the logo changes.",
    keywords: ["settlement reconciliation", "payments ledger", "treasury", "fintech operations"],
  },
  {
    slug: "fraud-risk-aml-cft",
    title: "Fraud, Risk and AML/CFT Controls: Layered Decisioning at $1B+ GTV",
    tagline:
      "Layered fraud, AML/CFT and sanctions decisioning built natively into the payments stack, vendor signals, device intelligence, internal velocity rules, SAR-ready audit trails. Fraud loss held <0.1% of GTV; fraud incidents down ~65%.",
    category: "Fraud & Risk",
    markets: [...PLATFORM.markets],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen"],
    metrics: [
      {
        label: "Fraud loss",
        value: "<0.1% GTV",
      },
      {
        label: "Fraud incidents",
        value: "−65%",
      },
      {
        label: "Certifications",
        value: "PCI DSS · ISO 27001",
      },
    ],
    executiveSummary:
      "Treated risk as a product, not a vendor. Combined vendor signals, internal velocity rules and analyst feedback into one decisioning layer with SAR-ready audit trails, held loss rates below benchmark at $1B+ GTV.",
    problem:
      "Cross-border, wallet and DCB flows expose multiple fraud vectors, chargebacks, account takeover, mule activity, structuring and sanctions exposure, that no single off-the-shelf vendor covers.",
    built: [
      "Real-time decisioning layer combining vendor signals, device intelligence and internal velocity rules",
      "Case management for analysts with SAR-ready audit trails",
      "Transaction monitoring scenarios for AML/CFT, sanctions and PEP screening",
      "Chargeback and dispute automation tied to merchant risk tier",
    ],
    architecture: [
      "Pre-auth, post-auth and async monitoring share one feature store",
      "Decisions are explainable end-to-end (rule + signal + outcome)",
      "Analyst feedback writes back to features, every closed case improves the model",
    ],
    role: "Defined the risk product strategy, selected vendors, built the internal rules platform and partnered with compliance and operations.",
    impact: [
      "Maintained fraud loss rates below industry benchmarks at $1B+ GTV",
      "Cleared regulator and partner audits including PCI DSS and ISO 27001",
      "Cut false positives without weakening AML/CFT controls",
    ],
    tradeoffs: [
      "Accepted higher vendor cost early to bootstrap signal coverage, then internalized once volume justified it",
      "Held a strict false-positive budget that occasionally cost short-term GTV",
    ],
    lessons: [
      "Risk that is not a product surface becomes ops debt. Build review tools as carefully as merchant flows.",
      "AML/CFT scenarios decay, they need a feedback loop with analysts, not just a launch.",
    ],
    whyItMatters:
      "The transferable core: keeping fraud loss below benchmark without strangling acceptance, through a decisioning layer that fuses vendor signals, velocity rules and SAR-ready audit trails. Every network, PSP and cross-border platform runs that identical playbook; only the logo changes.",
    keywords: ["payment fraud risk", "AML CFT payments", "transaction monitoring", "chargebacks"],
  },
  {
    slug: "cross-border-corridors-fx",
    title: "Cross-Border Corridors + FX Infrastructure",
    tagline:
      "Cross-border pay-in and payout corridors with FX, partner routing and corridor-level economics.",
    category: "Cross-Border Payments",
    markets: [...PLATFORM.markets],
    relevantFor: ["Wise", "Thunes", "DLocal", "Stripe", "Adyen", "Visa", "Mastercard"],
    metrics: [
      {
        label: "Corridors live",
        value: "5 (PK · BD · NP · LK · IQ)",
      },
      {
        label: "Partner stack",
        value: "DLocal · Thunes · Boku · Coda · MoneyGram",
      },
      {
        label: "Authorization uplift",
        value: "+14% on routed traffic",
      },
      {
        label: "Routing signals",
        value: "Cost × success-rate × partner health",
      },
      {
        label: "FX flow",
        value: "Quote-and-lock with margin controls",
      },
    ],
    executiveSummary:
      "Built a corridor abstraction over multiple PSPs and remittance partners so global merchants saw one API and one economic model, and routing, FX and compliance happened underneath.",
    problem: `Global merchants needed reliable, compliant pay-in and payout into ${PLATFORM.markets.join(", ")}, and local merchants needed cross-border payouts and FX.`,
    built: [
      "Corridor abstraction layer over multiple PSPs and remittance partners",
      "FX engine with margin controls and quote/lock flows",
      "Smart routing using cost, success rate and partner health",
      "Compliance overlays per corridor: limits, screening, reporting",
    ],
    architecture: [
      "Corridor = (source, destination, method, partner set, policy). Treated as a first-class product object.",
      "Quote/lock FX flow with hedge accounting awareness",
      "Per-corridor compliance pack (limits, KYC tier, reporting) versioned alongside the corridor",
    ],
    role: "Owned partner strategy, commercial negotiations and the product surface that exposed corridors to merchants.",
    impact: [
      `Live corridors covering ${PLATFORM.markets.join(", ")}`,
      "Lifted corridor success rates via cost+success-rate routing and per-rail retry curves",
      "Made cross-border economics transparent to merchants",
    ],
    tradeoffs: [
      "Standardized corridor contract slowed early partner onboarding; paid off after partner #3",
    ],
    lessons: [
      "A corridor is a product, not a partner integration. Owning the abstraction is owning the margin.",
      "Local methods plus FX, not cards alone, win cross-border in emerging markets.",
    ],
    whyItMatters:
      "The transferable core: corridor ownership as one product, partner selection, FX exposure, payout reliability, compliance overlays and merchant-facing economics managed together. That is the same job inside every network, PSP and cross-border platform; only the logo changes.",
    keywords: ["cross-border payments", "FX infrastructure", "remittance", "MENA fintech"],
  },
  {
    slug: "tapmad-wallet-billing-migration",
    title: "Tapmad Wallet/Billing Migration: 50% to 1%",
    tagline:
      "Migrated subscription billing off high-cost rails and rebuilt wallet/DCB flows, payment cost from 50% to 1%.",
    category: "Product Strategy",
    markets: ["Pakistan", "UAE", "KSA"],
    relevantFor: ["Stripe", "Adyen", "Visa", "Mastercard"],
    beforeAfter: [
      {
        metric: "Payment cost / revenue",
        before: "~50%",
        after: "~1%",
      },
      {
        metric: "Paid subscribers",
        before: "~0",
        after: "5M+",
      },
      {
        metric: "ARPU",
        before: "Baseline",
        after: "+70%",
      },
    ],
    metrics: [
      {
        label: "Payment cost",
        value: "50% → 1%",
      },
      {
        label: "Paid subscribers",
        value: "5M+",
      },
      {
        label: "ARPU",
        value: "+70%",
      },
      {
        label: "ARR",
        value: "$10M+",
      },
    ],
    executiveSummary:
      "Diagnosed unit economics as a payments problem, not a pricing problem. Rebuilt rail mix, retries and dunning around wallet/DCB economics, pulled payment cost from ~50% to ~1% of revenue while scaling to 5M+ paid subscribers.",
    problem:
      "Tapmad's subscription business was being eaten alive by payment cost, operator and aggregator margins consumed up to half of revenue, capping growth and ARPU.",
    built: [
      "Re-architected billing to prefer wallet, DCB and direct bank rails",
      "Smart retry and dunning flows tuned per rail and per cohort",
      "Pricing and packaging changes aligned to rail economics",
      "Reconciliation against operator settlements to recover leakage",
    ],
    architecture: [
      "Rail preference engine per subscriber state and prior failure history",
      "Per-rail retry curves instead of a single global retry policy",
    ],
    role: "Drove the payments product strategy, vendor renegotiation and the cross-functional migration with growth, finance and engineering.",
    impact: [
      "Reduced payment cost from ~50% to ~1% of revenue",
      "Scaled to 5M+ paid subscribers",
      "Increased ARPU by 70%",
    ],
    lessons: [
      "Payment cost is a product variable, not a procurement one.",
      "Retries and dunning are growth levers when rail economics are understood.",
    ],
    whyItMatters:
      "The transferable core: treating payment cost as a product variable, rebuilding rail mix, retries and dunning around wallet and DCB economics. Every subscription, marketplace and creator platform hits this wall eventually, inside every network, PSP and cross-border platform; only the logo changes.",
    keywords: ["subscription billing", "DCB", "wallet payments", "fintech product strategy"],
  },
  {
    slug: "daraz-payment-operations",
    flagship: true,
    title: "Daraz (Alibaba Group) Payment Operations Across Five Markets",
    tagline:
      "Ran payment operations governance across five South Asian markets during a COVID-driven volume surge, coordinating settlement, disputes, fraud rules, reconciliation and COD-to-digital conversion.",
    category: "Payment Operations",
    markets: [...DARAZ.markets],
    relevantFor: ["Stripe", "Adyen", "Wise", "DLocal", "Thunes"],
    metrics: [
      {
        label: "Markets",
        value: "5 (PK · BD · LK · NP · MM)",
      },
      {
        label: "Operating scope",
        value: "Settlement · disputes · fraud",
      },
      {
        label: "Checkout coverage",
        value: "~40% wider",
      },
      {
        label: "Dispute resolution",
        value: "Shortened",
      },
      {
        label: "Platform collaboration",
        value: "Alibaba Hangzhou",
      },
    ],
    beforeAfter: [
      {
        metric: "Checkout payment coverage",
        before: "Existing methods",
        after: "~40% wider",
      },
      {
        metric: "Dispute resolution",
        before: "Longer cycles",
        after: "Shortened",
      },
      {
        metric: "Operations governance",
        before: "Country-by-country",
        after: "Coordinated × 5 markets",
      },
    ],
    executiveSummary:
      "Ran delivery governance for payment operations across five South Asian markets through a COVID-driven volume surge. Coordinated settlement cycles, dispute resolution, fraud-rule configuration, reconciliation, compliance and vendor management, while working with Alibaba product teams in Hangzhou to localise Alipay and regional payment methods.",
    problem:
      "Payment operations across five markets needed a shared governance rhythm during a COVID-driven volume surge. Settlement cycles, disputes, fraud-rule configuration, reconciliation, compliance, vendor management and COD-to-digital conversion all had to stay coordinated across different local operating contexts.",
    built: [
      "PMO-style tracking and reporting for payment-operations KPIs across five markets",
      "Multi-country reconciliation, payment-compliance and vendor-management coordination",
      "Settlement-cycle and dispute-resolution governance through a COVID-driven volume surge",
      "Alipay and regional-method localisation with Alibaba Hangzhou product teams, widening checkout payment coverage by ~40%",
      "Targeted fraud-rule configuration for high-risk categories",
      "COD-to-digital conversion coordination across country operations",
    ],
    role: "Ran delivery governance for payment operations across five markets, coordinating with country teams, Alibaba Hangzhou product teams and regional payment partners.",
    impact: [
      "Expanded checkout payment coverage by ~40% through Alipay and regional-method localisation",
      "Shortened dispute resolution time",
      "Coordinated multi-country reconciliation, payment compliance and vendor management across five markets",
      "Maintained a shared payment-operations governance cadence through a COVID-driven volume surge",
      "Tightened fraud rules for high-risk categories",
    ],
    lessons: [
      "Multi-country payment operations need one KPI cadence across settlement, disputes, fraud and reconciliation.",
      "Regional payment-method localisation works best when country operations and platform product teams move together.",
      "High-risk marketplace categories need targeted fraud-rule configuration, not a single global threshold.",
    ],
    whyItMatters:
      "The transferable core is the governance layer connecting settlement, disputes, fraud, reconciliation and local payment methods across multiple markets. Marketplace payment teams need that operating discipline whenever regional complexity outgrows country-by-country coordination.",
    keywords: [
      "marketplace payment operations",
      "COD to digital conversion",
      "Alibaba payments",
      "Alipay localisation",
      "multi-country payment ops",
      "dispute resolution SLA",
      "marketplace fraud rules",
      "South Asia fintech",
    ],
  },
  {
    slug: "tapmad-digital-transformation-programme",
    title: "TapmadTV $3M Digital Transformation Programme",
    tagline:
      "Led a $3M programme launching Pakistan's first licensed OTT platform, 5 tech workstreams (iOS, Android, web, CMS, CDN), 25-person team, 8 international vendors, PMBOK + Agile hybrid governance.",
    category: "Program Management",
    markets: ["Pakistan"],
    relevantFor: ["Banks", "Sponsor banks", "Telcos", "Fintech transformation teams"],
    metrics: [
      {
        label: "Programme value",
        value: "$3M",
      },
      {
        label: "Workstreams",
        value: "5 (iOS · Android · Web · CMS · CDN)",
      },
      {
        label: "Team",
        value: "25 people",
      },
      {
        label: "Vendors",
        value: "8 international",
      },
      {
        label: "Launch",
        value: "On schedule",
      },
    ],
    executiveSummary:
      "Built the PMO from scratch and ran governance for Pakistan's first licensed OTT platform, risk register, RAID logs, milestone tracking, SteerCo reporting and stage-gated capital project delivery, landed on schedule across 5 technology workstreams.",
    problem:
      "A first-of-its-kind regulated OTT launch in Pakistan: no internal PMO, 8 international vendors with different delivery cultures, 5 parallel technology workstreams, content-rights obligations, and a regulator-facing launch deadline with no slip room.",
    built: [
      "PMO operating model, risk register, RAID logs, decision logs, milestone tracking",
      "PMBOK-based stage gates for capital project workstreams (CDN, CMS infrastructure)",
      "Agile delivery cadence for iOS, Android and web product workstreams",
      "Vendor governance: SLAs, escalation paths, joint planning ceremonies",
      "SteerCo with monthly board reporting; weekly programme reviews",
      "Content-rights and regulator-facing compliance tracking",
    ],
    architecture: [
      "Programme broken into 5 workstreams with named workstream leads + RACI",
      "RAID register as the single source of truth, no parallel risk lists",
      "Stage gates between vendor procurement → integration → UAT → launch",
      "Joint vendor war room for the final 6 weeks before launch",
    ],
    role: "Programme Manager / PMO Lead. Owned governance, stakeholder management, vendor relationships, risk posture and launch readiness end-to-end. Direct reporting line to the CEO and the board's tech committee.",
    impact: [
      "Delivered Pakistan's first licensed OTT platform on schedule",
      "Held 5 technology workstreams to a single launch milestone with zero workstream slip",
      "Built a PMO playbook the company continued to use after launch",
      "Established agile delivery practices across the 25-person product and engineering team",
    ],
    tradeoffs: [
      "Hybrid PMBOK + Agile model added overhead, accepted because the regulator-facing capital workstreams needed gate evidence",
      "Centralised vendor escalations through PMO, slowed minor decisions, prevented vendor-on-vendor finger-pointing",
    ],
    lessons: [
      "First-of-kind regulated launches do not survive a pure-Agile PMO, capital workstreams need stage gates with auditable evidence.",
      "Vendor governance is the highest-leverage PMO surface. Joint rituals beat written SLAs every time.",
      "RAID is only useful if every entry has an owner, a date and a decision path. Otherwise it is a log, not a register.",
    ],
    whyItMatters:
      "The transferable core: a PMO that carries capital workstreams, vendor stacks, regulator-facing launch dates and hybrid governance to a fixed launch. Banks, regulated fintechs and central-bank-licensed platforms all run programmes shaped exactly like this; only the logo changes.",
    keywords: [
      "programme management",
      "PMO",
      "digital transformation",
      "PMBOK",
      "RAID",
      "SteerCo",
      "vendor governance",
      "OTT launch",
    ],
  },
  {
    slug: "simpaisa-ai-solutions-suite",
    flagship: true,
    title: "Production GenAI at Simpaisa, 3 Systems and 1 Banking Pilot",
    tagline:
      "Identified and value-modeled three production GenAI systems across merchant integration support, incident auto-escalation and partner support automation, plus a fraud/AML AI pilot with a major banking partner.",
    category: "AI in Fintech",
    markets: [...PLATFORM.markets],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen", "Sponsor banks", "PSPs"],
    metrics: [
      {
        label: "Production systems + banking pilot",
        value: "3 + 1",
      },
      {
        label: "Merchant support time",
        value: "−65%",
      },
      {
        label: "Incident response MTTR",
        value: "−70%",
      },
      {
        label: "Partner queries auto-resolved",
        value: "90%",
      },
      {
        label: "Projected manual-review reduction",
        value: "−40% (pilot)",
      },
      {
        label: "Use cases evaluated",
        value: "20+",
      },
    ],
    executiveSummary:
      "Ran GenAI use-case identification across the organisation, evaluated 20+ candidates with value modeling (ROI / feasibility / data readiness), and shipped three production systems plus one banking pilot. Built the governance posture so AI runs alongside PCI DSS, ISO 27001 and AML/CFT controls, not despite them.",
    problem:
      "The organisation had more AI ideas than production candidates. The useful filter was not model novelty; it was whether a use case had clean source data, a measurable operating cost, a human fallback, and an audit trail a regulator or bank partner could understand.",
    built: [
      "AI Merchant Integration Chatbot (Slack + Telegram), RAG over API docs, error catalogue and integration playbooks. Cuts merchant integration support time by 65%.",
      "Intelligent System Monitoring & Auto-Escalation Bot, detects payment error spikes, runs log analysis, identifies root cause, auto-escalates with full diagnostics. −70% MTTR.",
      "AI Partner Support Automation, handles 90% of merchant payment queries (settlement, disputes, decline codes, integration) without human intervention.",
      "Fraud Detection & AML Pilot, active pilot with a major banking partner; value model projects 40% reduction in manual review queues.",
      "Use-case identification + value-modeling framework, ROI, feasibility, data readiness, regulatory risk per candidate.",
    ],
    architecture: [
      "RAG-first for any LLM surface that touches merchant/partner instructions, citations always shown",
      "Domain-specific embedding index per use case (integration docs, decline codes, dispute taxonomy)",
      "Audit trail for every AI decision (input, retrieved context, model output, human override)",
      "Feature store + analyst-feedback loop for the fraud/AML pilot",
      "Open-source LLMs for non-sensitive surfaces, vendor LLMs for narrower use cases",
    ],
    operatingModel: [
      "AI use cases reviewed in a monthly product + risk + compliance council",
      "Every AI surface ships with a kill-switch and a human-in-the-loop fallback",
      "Quarterly bias / drift / hallucination audit against held-out cases",
    ],
    role: "Led GenAI strategy end-to-end at Simpaisa, use-case identification, value modeling, vendor selection, regulator briefings, build/buy decisions, deployment governance and post-launch measurement.",
    impact: [
      "3 production AI systems live; 1 banking pilot in flight",
      "Merchant integration support time −65%, MTTR −70%, 90% partner queries auto-resolved",
      "Established the AI use-case discipline (ROI / feasibility / data readiness / regulatory risk) used quarterly",
      "Briefed regulators on Simpaisa's AI posture for licence reviews",
    ],
    tradeoffs: [
      "Chose RAG + open-source LLMs over closed APIs for the most sensitive merchant-facing surfaces, slower iteration, lower data-egress risk",
      "Built our own value-modeling framework rather than adopting a vendor scorecard, better fit, more upfront effort",
    ],
    lessons: [
      "Most AI value in payments today is in operations and integration support, not in the customer-facing UI.",
      "Auditable behaviour beats raw model performance. A 92% model with full citations is better than a 96% model that can't explain itself.",
      "The fraud/AML use case has the highest stated ROI and the longest validation timeline. Plan for that.",
    ],
    whyItMatters:
      "The transferable core: getting four use cases through value modelling, data-readiness review, risk sign-off, production fallback design and post-launch measurement, not the fact that AI was used. Every network, PSP and cross-border platform needs exactly that discipline; only the logo changes.",
    keywords: [
      "AI in payments",
      "GenAI fintech",
      "RAG architecture",
      "AI fraud detection",
      "AML AI",
      "merchant support automation",
      "value modeling AI",
      "regulated AI deployment",
    ],
  },
  {
    slug: "simpaisa-bnpl-launch",
    title: "BNPL Launch at Simpaisa: 0 → 100K Users in 8 Months",
    tagline:
      "Launched Simpaisa's BNPL product from scratch, full underwriting, repayment flows, collections, regulator briefings, to 100K users in 8 months through iterative agile discovery.",
    category: "Product Strategy",
    markets: ["Pakistan", "UAE"],
    relevantFor: ["Tabby", "Tamara", "Stripe", "Adyen", "Visa", "Mastercard", "BaaS providers"],
    beforeAfter: [
      {
        metric: "Active users",
        before: "0",
        after: "100K (8 months)",
      },
      {
        metric: "Time-to-first-product",
        before: "n/a",
        after: "Discovery → live in 14 weeks",
      },
      {
        metric: "Default rate",
        before: "n/a",
        after: "Within target band",
      },
    ],
    metrics: [
      {
        label: "Active users",
        value: "0 → 100K",
      },
      {
        label: "Launch time",
        value: "8 months",
      },
      {
        label: "Discovery → live",
        value: "14 weeks",
      },
      {
        label: "Markets",
        value: "Pakistan (launch), UAE (planned)",
      },
    ],
    executiveSummary:
      "Took BNPL from product concept to 100K active users in 8 months. Built the full stack, eligibility, underwriting, repayment, dunning, collections, regulatory posture, and the consumer UX, using rapid agile discovery cycles and a tight feedback loop with credit and risk.",
    problem:
      "BNPL was being launched across the region by Tabby and Tamara, but most local merchants needed a partner who already handled their acceptance. Simpaisa had the merchant base and rails; what was missing was a defensible BNPL product with a credit, risk and ops model that worked in Pakistan and could port to MENA.",
    built: [
      "Eligibility + underwriting engine (alt-data scoring + bureau where available)",
      "Repayment scheduling, dunning and collections workflows",
      "Merchant-facing BNPL integration (existing SDKs + new BNPL endpoints)",
      "Consumer onboarding KYC flow with friction-tier risk-based capture",
      "Regulator briefings + central-bank engagement on consumer-credit posture",
      "Analytics: cohort default tracking, ARPU per cohort, recovery funnel",
    ],
    role: "CPO. Owned product strategy, regulatory engagement, partner stack (bureau, alt-data, collections), and the cross-functional discovery cadence with risk, credit ops and engineering.",
    impact: [
      "Reached 100K active users in 8 months",
      "Discovery → first live merchant in 14 weeks",
      "Default rate held within target band through cohort-by-cohort tightening",
      "Created the product blueprint Simpaisa is using for MENA expansion",
    ],
    tradeoffs: [
      "Launched with bureau data only where available, alt-data scoring elsewhere, slower onboarding in low-data segments, but no skipped underwriting",
      "Built dunning + collections in-house instead of outsourcing, higher ops cost early, much tighter feedback into the credit model",
    ],
    lessons: [
      "BNPL is a credit product first, a checkout product second. Treating it as the latter is how funds get burnt.",
      "Cohort discipline is the difference between scale and a blowup. Track every cohort to maturity; do not average them.",
      "Regulator engagement should start before discovery, not after, especially in markets with developing consumer-credit law.",
    ],
    whyItMatters:
      "The transferable core: shipping BNPL inside a regulated payments org, fast, without taking unmanaged credit risk, with underwriting and cohort discipline built in from the first cohort. Tabby, Tamara, BNPL-curious banks and BaaS providers all face that same question; only the logo changes.",
    keywords: [
      "BNPL launch",
      "buy now pay later",
      "consumer credit fintech",
      "underwriting",
      "MENA BNPL",
      "Pakistan BNPL",
      "credit product strategy",
    ],
  },
  {
    slug: "swift-mt-mx-implementation-simpaisa",
    title: "SWIFT MT/MX Implementation: ISO 20022 Migration + gpi at Simpaisa",
    tagline:
      "Wired SWIFT MT and MX (ISO 20022) messaging into the Simpaisa cross-border stack with gpi tracking, CSP attestation and dual-rail parsing — sustained 99.9%+ message-acceptance rate through the ISO 20022 migration window.",
    category: "Cross-Border Payments",
    markets: [...PLATFORM.markets],
    relevantFor: ["Visa", "Mastercard", "Wise", "Thunes", "DLocal", "Banks", "Sponsor banks"],
    metrics: [
      {
        label: "Message types handled",
        value: "MT103 · MT202 · MT940 · MT950 · pacs.008 · camt.053",
      },
      {
        label: "Message acceptance rate",
        value: "99.9%+",
      },
      {
        label: "gpi adoption",
        value: "Live (UETR end-to-end tracking)",
      },
      {
        label: "CSP attestation",
        value: "Annual, on time",
      },
      {
        label: "Sanctions screening",
        value: "Real-time + batch re-screen",
      },
      {
        label: "ISO 20022 readiness",
        value: "MX-shaped data model from day one",
      },
    ],
    beforeAfter: [
      {
        metric: "Cross-border tracking",
        before: "Black-box (correspondent reliance)",
        after: "UETR end-to-end via gpi",
      },
      {
        metric: "Sanctions screening latency",
        before: "Batch only",
        after: "Real-time pre-send + batch re-screen",
      },
      {
        metric: "Message format flexibility",
        before: "MT-only",
        after: "MT + MX dual-rail",
      },
    ],
    executiveSummary:
      "Stood up SWIFT MT and MX (ISO 20022) messaging inside the Simpaisa cross-border stack — message parsing, gpi UETR tracking, real-time sanctions screening, CSP attestation, and a dual-rail data model designed to absorb the ISO 20022 migration without re-platforming. Maintained 99.9%+ message-acceptance rate through the most aggressive correspondent-bank deadline window.",
    problem:
      "Simpaisa's cross-border corridors needed reliable SWIFT messaging into and out of correspondent banks across five markets. The platform was on the wrong side of the ISO 20022 migration deadline, with MT-shaped data inside the ledger, no UETR-level tracking, sanctions screening running batch-only, and a CSP (Customer Security Programme) attestation that had been postponed two years in a row. Correspondent banks were starting to push back on every category.",
    built: [
      "Dual-rail message parser: MT (legacy) and MX (ISO 20022 pacs.008 / pacs.009 / camt.053 / camt.054) handled behind a single internal API",
      "UETR (Unique End-to-end Transaction Reference) generation and end-to-end tracking integrated with SWIFT gpi",
      "Real-time sanctions screening (pre-send block) plus batch re-screen daily, with auditable decision log",
      "Correspondent-bank reconciliation engine matching MT940/MT950 statements + camt.053 against the internal ledger",
      "CSP attestation evidence pipeline: control mappings, evidence collection cadence, audit-ready repository",
      "Data model designed MX-first: every internal record carries the structured fields ISO 20022 requires, even when the upstream message is MT",
    ],
    architecture: [
      "SWIFT integration sits behind a stable internal API; MT vs MX is an implementation detail",
      "UETR generated at transaction initiation; propagated through every internal hop; surfaced to merchants via the cross-border product UI",
      "Sanctions screening: WorldCheck / Dow Jones list + central-bank lists per market; cached with 24h TTL; pre-send call blocks on hit",
      "Ledger entries are MX-shaped (structured remitter, beneficiary, purpose, regulatory codes) regardless of upstream message format",
      "CSP control mappings tracked in a register with quarterly attestation cadence",
    ],
    operatingModel: [
      "Weekly SWIFT health review: message acceptance, gpi tracking coverage, sanctions screening hit rate, correspondent bank issues",
      "Quarterly CSP attestation prep with internal audit + external advisor",
      "Monthly correspondent-bank scorecard (uptime, response time, dispute resolution)",
      "Real-time alerting on message-format rejection rate > 0.1%",
    ],
    role: "Owned the SWIFT product surface end-to-end: integration architecture, gpi adoption, CSP attestation, sanctions-screening product design, correspondent-bank governance, and the ISO 20022 migration roadmap. Direct accountability for SWIFT operational KPIs and audit posture.",
    impact: [
      "Held 99.9%+ message-acceptance rate through the ISO 20022 migration deadline window — when many regional acquirers saw rejection-rate spikes",
      "Cut sanctions-screening false-positive rate by ~60% via per-corridor tuning, without lowering true-positive coverage",
      "Brought CSP attestation back onto annual cadence after two missed years",
      "Delivered gpi UETR end-to-end tracking, removing the 'black box' merchant complaint about cross-border transfers",
      "Established the MX-shaped data model that absorbed the ISO 20022 migration without a platform re-write",
    ],
    tradeoffs: [
      "Built MX-shaped data model before market demanded it — extra engineering cost in 2022/23, paid back the moment regulators set hard MX dates",
      "Chose real-time sanctions screening over async; added 200-400ms to send latency in exchange for the audit posture banks demanded",
      "Maintained MT parsing alongside MX — duplicate code paths during the migration window, accepted because correspondent banks moved at different paces",
    ],
    lessons: [
      "ISO 20022 is a data-model migration, not a message-format one. Teams that treat it as 'change the parser' rebuild in 18 months.",
      "gpi UETR visibility was the merchant-facing change with the clearest support impact; it turned cross-border status from a back-office chase into a product surface.",
      "CSP attestation is not a yearly audit event. It's a quarterly operating discipline that produces evidence as a by-product.",
      "Sanctions screening tuning is a continuous product job, not a configuration. Per-corridor false-positive rates diverge fast.",
    ],
    whyItMatters:
      "The transferable core: making MX-shaped data, gpi visibility, sanctions checks and CSP evidence part of the product rhythm rather than a migration afterthought. Any bank, PSP or remittance platform still carrying MT-era assumptions faces the same work; only the logo changes.",
    keywords: [
      "SWIFT MT MX implementation",
      "ISO 20022 migration",
      "SWIFT gpi UETR",
      "CSP attestation",
      "sanctions screening real-time",
      "correspondent banking",
      "cross-border payments infrastructure",
      "MENA fintech SWIFT",
    ],
  },
  {
    slug: "tapmad-dcb-monetisation-wallet-migration",
    flagship: true,
    title: "Tapmad OTT: 0→5M Subscribers, Payment Cost 50% → ~1%",
    tagline:
      "Built the billing engine for Pakistan's leading OTT platform — Direct Carrier Billing across all four telcos, wallet-billing migration that pulled payment cost from 50% of revenue to ~1%, 0→5M paid subscribers, ARPU +70%, $10M+ ARR, expanded into UAE and KSA.",
    category: "Product Strategy",
    markets: ["Pakistan", "UAE", "KSA"],
    relevantFor: ["Stripe", "Adyen", "Visa", "Mastercard"],
    beforeAfter: [
      {
        metric: "Payment cost / revenue",
        before: "~50%",
        after: "~1%",
      },
      {
        metric: "Paid subscribers",
        before: "~0",
        after: "5M+",
      },
      {
        metric: "ARPU",
        before: "Baseline",
        after: "+70%",
      },
    ],
    metrics: [
      {
        label: "Payment cost",
        value: "50% → ~1%",
      },
      {
        label: "Paid subscribers",
        value: "0 → 5M+",
      },
      {
        label: "ARPU",
        value: "+70%",
      },
      {
        label: "ARR",
        value: "$10M+",
      },
    ],
    executiveSummary:
      "Owned monetisation for Pakistan's leading OTT platform and built the billing infrastructure that turned near-zero revenue into a commercially viable business. Launched Direct Carrier Billing across all four telcos, diagnosed the ~50% telco revenue share as the core constraint, and led the migration to wallet-based billing that pulled payment cost to ~1% — scaling to 5M+ paid subscribers, +70% ARPU and $10M+ ARR, then expanding DCB and wallet billing into UAE and KSA.",
    problem:
      "The subscription business was being eaten alive by payment cost: operator and aggregator margins consumed up to half of revenue, capping growth and ARPU. Acquisition needed a billing rail that reached users without cards, and the unit economics needed a structural fix, not a pricing tweak.",
    built: [
      "Direct Carrier Billing across all four major telcos, reaching subscribers without cards",
      "Wallet-billing migration that moved subscription billing off high-cost operator rails",
      "Retention improvements: faster refunds, wallet-native subscription management, reduced payment failures",
      "Pricing, bundles and wallet promotions that lifted ARPU 70%",
      "DCB and wallet-billing expansion into UAE and KSA with regional telco and wallet partners",
    ],
    role: "Owned payments product strategy, telco and wallet partner negotiation, and the cross-functional migration with growth, finance and engineering. Direct accountability for subscriber growth, payment cost and ARPU.",
    impact: [
      "Scaled 0 → 5M paid subscribers in under three years",
      "Pulled payment cost from ~50% of revenue to ~1% via the wallet-billing migration",
      "Grew ARPU 70% through pricing, bundles and wallet promotions",
      "Reached $10M+ ARR and expanded DCB + wallet billing into UAE and KSA",
    ],
    tradeoffs: [
      "Prioritised DCB reach for acquisition first, accepted the high operator margin early to unlock scale, then migrated to wallet billing to fix the economics",
      "Ran the wallet migration cohort by cohort rather than a hard cutover, slower headline shift, protected retention through the change",
    ],
    lessons: [
      "Payment cost is a product variable, not a procurement one. The rail mix decides whether a subscription business is viable.",
      "DCB wins acquisition in card-light markets; wallet billing wins the unit economics. You need both, in that order.",
      "Retention levers — faster refunds, wallet-native management, fewer failures — compound with ARPU pricing to make the model work.",
    ],
    whyItMatters:
      "The transferable core: reaching users without cards through DCB, then fixing the rail economics with wallet billing before margin disappears. Every subscription, streaming and creator platform hits that same wall, inside every network, PSP and cross-border platform; only the logo changes.",
    keywords: [
      "subscription billing",
      "Direct Carrier Billing",
      "DCB monetisation",
      "wallet billing migration",
      "payment cost reduction",
      "OTT monetisation",
      "ARPU growth",
      "fintech product strategy",
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
