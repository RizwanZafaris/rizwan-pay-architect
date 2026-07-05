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
};

// Hero image paths follow a strict convention so routes don't need to look
// up the path from data — same slug, two sizes. See public/cs/.
// Some case studies reuse an existing abstract hero rather than ship bespoke
// art (keeps visual quality high and avoids 404s for text-led case studies).
// Same pattern as the original swift-mt-mx ↔ cross-border alias.
const CS_IMAGE_ALIAS: Record<string, string> = {
  "swift-mt-mx-implementation-simpaisa": "cross-border-corridors-fx",
  "mpgs-acquirer-integration-programme": "simpaisa-payment-infrastructure",
  "mdes-network-tokenisation-rollout": "simpaisa-payment-infrastructure",
  "click-to-pay-vctp-mctp-programme": "simpaisa-payment-infrastructure",
  "3ds2-sca-step-up-optimisation-programme": "fraud-risk-aml-cft",
  "aml-cft-sanctions-engine-implementation": "fraud-risk-aml-cft",
  "regional-wallet-integration-easypaisa-jazzcash-sadad": "cross-border-corridors-fx",
  "pmo-risk-council-operating-model": "simpaisa-ai-solutions-suite",
};
const caseStudyImageSlug = (slug: string) => CS_IMAGE_ALIAS[slug] ?? slug;

export const caseStudyHero = (slug: string) => `/cs/${caseStudyImageSlug(slug)}.webp`;
export const caseStudyThumb = (slug: string) => `/cs/${caseStudyImageSlug(slug)}-thumb.webp`;

export const caseStudies: CaseStudy[] = [
  {
    slug: "simpaisa-payment-infrastructure",
    title: "Simpaisa Payment Infrastructure Platform",
    tagline:
      "A regulated, multi-rail payments platform processing $1B+ annual GTV and 270M+ payments a year across pay-in, payout, wallets (DCB/IBFT), card acquiring (MPGS/MDES), settlement, FX and cross-border corridors, PCI DSS and ISO/IEC 27001 certified.",
    category: "Payment Infrastructure",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
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
    ],
    executiveSummary:
      "Owned the product, architecture and operating model of a five-market payments platform serving global enterprises and local merchants. Took a fragmented integration estate and turned it into a single regulated rail with shared APIs, ledger, settlement and risk, through a CTO departure and a regulatory tightening.",
    problem:
      "Merchants and platforms operating in Pakistan, Bangladesh, Nepal, Iraq and Egypt needed a single regulated rail to accept, payout, settle and reconcile across cards (MPGS/MDES), wallets, IBFT, DCB and cross-border corridors, without stitching together fragile point integrations. In 2024, regulatory tightening and a CTO departure forced the platform to operate under heightened scrutiny without losing pace.",
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
      "25+ person org across product, engineering, ops, risk and compliance",
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
      "Visa, Mastercard, Stripe, Wise, Adyen, Thunes and DLocal need leaders who can stand up regulated multi-rail infrastructure across non-trivial markets and run it under regulator scrutiny. This is the full job, partner enablement, scheme readiness, settlement, risk, reporting, done at $1B+ GTV.",
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
    title: "Merchant Onboarding + KYC/KYB Automation",
    tagline:
      "Automated merchant onboarding pipeline, KYC/KYB, UBO discovery, sanctions and PEP screening, risk-tiered decisioning with full audit trail. Activation cut from weeks to hours; manual review load down 70%.",
    category: "Merchant Onboarding",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
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
        value: "6",
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
      "Standardized onboarding across UAE, Pakistan, Bangladesh, Nepal, Iraq and Egypt",
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
      "Acquirers, PSPs and cross-border networks live or die on activation speed and risk posture moving together. The useful signal is not that onboarding became faster; it is that faster onboarding did not weaken the bank, scheme or regulator evidence trail.",
    keywords: ["KYC KYB automation", "merchant onboarding", "AML CFT", "fintech compliance"],
  },
  {
    slug: "settlement-reconciliation",
    title: "Settlement + Reconciliation Engine: 99.95% Accuracy at $1B+ GTV",
    tagline:
      "A multi-rail settlement and reconciliation engine, canonical double-entry ledger, three-way auto-reconciliation, exception management and corridor-aware payout windows. Closed the gap between treasury, finance and product at $1B+ GTV.",
    category: "Settlement & Reconciliation",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
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
      "Acceptance, scheme settlement and treasury teams at Visa/Mastercard/Stripe/Adyen are essentially recon products. This is exactly that work, in production.",
    keywords: ["settlement reconciliation", "payments ledger", "treasury", "fintech operations"],
  },
  {
    slug: "fraud-risk-aml-cft",
    title: "Fraud, Risk and AML/CFT Controls: Layered Decisioning at $1B+ GTV",
    tagline:
      "Layered fraud, AML/CFT and sanctions decisioning built natively into the payments stack, vendor signals, device intelligence, internal velocity rules, SAR-ready audit trails. Fraud loss held <0.1% of GTV; fraud incidents down ~65%.",
    category: "Fraud & Risk",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
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
      "Every payments network has the same job here: keep loss below benchmark without strangling acceptance. The product playbook is identical.",
    keywords: ["payment fraud risk", "AML CFT payments", "transaction monitoring", "chargebacks"],
  },
  {
    slug: "cross-border-corridors-fx",
    title: "Cross-Border Corridors + FX Infrastructure",
    tagline:
      "Cross-border pay-in and payout corridors with FX, partner routing and corridor-level economics.",
    category: "Cross-Border Payments",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
    relevantFor: ["Wise", "Thunes", "DLocal", "Stripe", "Adyen", "Visa", "Mastercard"],
    metrics: [
      {
        label: "Corridors live",
        value: "6 (AE · PK · BD · NP · IQ · EG)",
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
    problem:
      "Global merchants needed reliable, compliant pay-in and payout into Pakistan, Bangladesh, Nepal, Iraq and Egypt, and local merchants needed cross-border payouts and FX.",
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
      "Live corridors covering UAE, Pakistan, Bangladesh, Nepal, Iraq and Egypt",
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
      "The relevant signal for Wise, Thunes, DLocal, Stripe Connect or Adyen-style platform work is corridor ownership: partner selection, FX exposure, payout reliability, compliance overlays and merchant-facing economics managed as one product.",
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
      "Every subscription, marketplace and creator platform inside Visa/Mastercard/Stripe portfolios eventually faces this. The playbook ports directly.",
    keywords: ["subscription billing", "DCB", "wallet payments", "fintech product strategy"],
  },
  {
    slug: "daraz-payment-operations",
    title: "Daraz (Alibaba Group) Payment Operations + COD-to-Digital Conversion",
    tagline:
      "Ran payment operations for South Asia's largest marketplace across 5 markets during a COVID volume surge. Designed and shipped the COD-to-digital migration as an incentives + trust program — lifted digital share ~40% and cut dispute cycles ~50%.",
    category: "Payment Operations",
    markets: ["Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Myanmar"],
    relevantFor: ["Stripe", "Adyen", "Wise", "DLocal", "Thunes"],
    metrics: [
      {
        label: "Markets",
        value: "5 (PK · BD · LK · NP · MM)",
      },
      {
        label: "Volume surge handled",
        value: "COVID 2020 (~3× baseline)",
      },
      {
        label: "Digital share lift",
        value: "+~40% in 6 months",
      },
      {
        label: "Dispute cycle time",
        value: "Cut ~50%",
      },
      {
        label: "Checkout coverage",
        value: "+~40% (Alipay + wallets)",
      },
    ],
    beforeAfter: [
      {
        metric: "Checkout digital share",
        before: "COD-dominated",
        after: "+~40% digital",
      },
      {
        metric: "Avg dispute cycle",
        before: "Multi-week",
        after: "~half",
      },
      {
        metric: "Ops spine",
        before: "Per-country fragmented",
        after: "Unified × 5 markets",
      },
    ],
    executiveSummary:
      "Owned the payments operations spine for Alibaba-group Daraz across 5 South Asian markets through a COVID-driven volume surge. Designed the COD-to-digital migration as an incentives + trust program (not a checkout redesign), localised Alipay and regional wallets in partnership with Hangzhou product teams, and rebuilt settlement, dispute and fraud workflows so payments became a measured surface instead of a back-office liability.",
    problem:
      "Marketplace payments were COD-dominated, sellers were carrying the working-capital cost, dispute resolution was multi-week and fraud rules were uniform across categories that had nothing in common. COVID 2020 multiplied order volume ~3× overnight, exposing every weakness in the ops spine simultaneously across 5 markets with different rails, regulators and customer behaviours.",
    built: [
      "Unified settlement workflow closing the loop buyer pay-in → seller payout → logistics reconciliation across all 5 markets",
      "Dispute resolution playbook with category-aware SLAs (electronics ≠ fashion ≠ groceries) — cut average cycle ~50%",
      "Fraud rule taxonomy tuned per category × geography × seller cohort, replacing one-size-fits-all rules",
      "Alipay localisation on checkout in partnership with Alibaba Hangzhou product teams (expanded coverage ~40%)",
      "COD-to-digital incentive design: targeted wallet/card promos to high-COD segments, refund-speed guarantees as a trust signal",
      "Operational dashboards across pay-in success, refund SLA and per-rail settlement, surfacing the metrics ops actually used",
    ],
    role: "Owned multi-country payment operations governance + the COD-to-digital migration program. Direct accountability for ops KPIs across 5 markets. Coordinated with Daraz country GMs, Alibaba Hangzhou product, and regional payment partners. Built the PMO-style tracking that ran payment operations during peak surge.",
    impact: [
      "Lifted digital share by ~40% in 6 months — unlocked working capital that COD had been consuming",
      "Cut average dispute resolution cycle by ~50% via category-aware SLAs",
      "Held payment operations through a ~3× COVID volume surge across 5 markets with no major settlement-cycle slip",
      "Expanded checkout payment coverage ~40% via Alipay + regional wallet localisation",
      "Turned payments from a back-office liability into a measured, owned surface inside the marketplace org",
    ],
    tradeoffs: [
      "Centralised dispute SLAs sometimes slowed bespoke resolutions; net cycle time still dropped ~50%",
      "Wallet/card incentives carried short-term promo cost; recovered via working-capital release within ~2 quarters",
    ],
    lessons: [
      "COD is product debt, not customer preference. Incentives + refund-speed guarantees shift it; checkout copy doesn't.",
      "Sellers experience payments through settlement, not checkout. The ops spine, not the buyer flow, decides marketplace trust.",
      "Fraud rules age fast on marketplaces. Per-category × geography × cohort segmentation beats a global threshold by a wide margin.",
    ],
    whyItMatters:
      "Marketplace and platform payments orgs at Stripe Connect, Adyen for Platforms, Wise Business, MercadoPago and Shopee operate exactly this surface: multi-country pay-in/payout, per-category fraud, settlement-side seller trust, and a COD-to-digital wedge in emerging markets. The playbook ports directly.",
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
      "Banks, regulated fintechs and central-bank-licensed platforms run programmes that look exactly like this, capital workstreams, vendor stacks, regulator-facing launch dates, hybrid governance. This is the operating model that ships them.",
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
    title: "Production GenAI Suite at Simpaisa, 4 Deployments in Regulated Payments",
    tagline:
      "Identified, value-modeled and deployed 4 production GenAI solutions across merchant integration support, incident auto-escalation, partner support automation, and a fraud/AML AI pilot with a major banking partner.",
    category: "AI in Fintech",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen", "Sponsor banks", "PSPs"],
    metrics: [
      {
        label: "AI solutions in production",
        value: "4",
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
      "Ran GenAI use-case identification across the organisation, evaluated 20+ candidates with value modeling (ROI / feasibility / data readiness), and shipped four production deployments. Built the governance posture so AI runs alongside PCI DSS, ISO 27001 and AML/CFT controls, not despite them.",
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
      "4 production AI deployments live; one banking pilot in flight",
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
      "The signal for a payments or banking employer is not that AI was used. It is that four use cases made it through value modelling, data-readiness review, risk sign-off, production fallback design and post-launch measurement.",
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
      "Tabby, Tamara, BNPL-curious banks and BaaS providers in MENA all face the same question: how do you ship BNPL inside a regulated payments org, fast, without taking unmanaged credit risk? This is what that looks like in production.",
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
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
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
      "This matters for any bank, PSP or remittance platform still carrying MT-era assumptions. The useful signal is operational: MX-shaped data, gpi visibility, sanctions checks and CSP evidence became part of the product rhythm instead of a migration afterthought.",
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
    slug: "mpgs-acquirer-integration-programme",
    engagement: "Independent consulting engagement · regional acquirer-processor (client confidential).",
    title:
      "MPGS Acquirer Integration Programme: Hosted Session, 3DS2, Tokenisation and the Recurring Stack",
    tagline:
      "Took a regional acquirer-processor from a single Hosted Checkout flow to a full MPGS surface, Hosted Session, EMV 3DS2 step-up, scheme tokenisation, recurring billing and dispute ingestion, across a 150+ merchant portfolio in three primary markets without a 24-hour outage.",
    category: "Payment Infrastructure",
    markets: ["UAE", "KSA", "Pakistan"],
    relevantFor: [
      "Mastercard",
      "Visa",
      "Network International",
      "Magnati",
      "Geidea",
      "Banks",
      "Acquirer-processors",
    ],
    metrics: [
      {
        label: "Merchants migrated",
        value: "150+",
      },
      {
        label: "Authorisation rate uplift",
        value: "+3.4 pts portfolio-wide",
      },
      {
        label: "3DS2 frictionless rate",
        value: "73% post-tuning",
      },
      {
        label: "Network tokenisation coverage",
        value: "92% of card-on-file",
      },
      {
        label: "Settlement break rate",
        value: "< 0.04% sustained",
      },
      {
        label: "MPGS uptime SLA",
        value: "99.95%+ across rollout",
      },
    ],
    beforeAfter: [
      {
        metric: "MPGS integration mode",
        before: "Hosted Checkout only",
        after: "Hosted Checkout + Hosted Session + Direct API",
      },
      {
        metric: "iOS Safari + cross-border auth rate",
        before: "88%",
        after: "92%",
      },
      {
        metric: "Card-on-file model",
        before: "PAN stored at gateway vault",
        after: "Scheme tokens via MDES + VTS",
      },
      {
        metric: "Dispute lifecycle",
        before: "Manual scheme-portal handling",
        after: "Ingestion into internal case manager",
      },
    ],
    executiveSummary:
      "Designed and shipped the full MPGS surface for a regional acquirer-processor, moving from a single Hosted Checkout integration into Hosted Session (for branded checkouts), Direct API (for recurring and merchant-of-record flows), EMV 3DS2 step-up tuning, scheme tokenisation, recurring billing, dispute ingestion and merchant-facing settlement reconciliation. Migrated the full 150+ merchant portfolio in three primary markets across an 18-month rollout with no 24-hour outage and a +3.4-point portfolio-wide authorisation-rate uplift.",
    problem:
      "The acquirer had launched on MPGS via the standard Hosted Checkout flow and stayed there. The integration was stable, but the platform was locked out of every flow that mattered for premium merchants: branded checkouts, recurring billing, scheme tokenisation, merchant-of-record marketplaces, MIT/CIT differentiation, and structured 3DS2 risk-based-authentication logic. Authorisation rates lagged the regional benchmark by 3–4 points. Disputes were handled by ops staff opening the scheme portal merchant-by-merchant. Settlement reconciliation was a daily fire drill. The next-quarter scheme mandate on network tokenisation made the gap untenable.",
    built: [
      "Hosted Session integration: kept MPGS PCI scope while letting merchants brand the checkout (own CSS, own form, own redirect-free experience)",
      "Direct API integration for recurring (RECURRING / INITIAL CIT / SUBSEQUENT MIT) and marketplace flows that needed payer-not-present orchestration",
      "EMV 3DS2 step-up logic with per-issuer risk-based authentication (frictionless, data-only / 3RI, recurring and MIT anchoring, issuer trust-listing) and per-issuer step-up scoring",
      "Network tokenisation via MDES (Mastercard) and VTS (Visa), replacing PAN-on-file with scheme tokens for 92% of card-on-file merchants",
      "Recurring billing engine: token-backed subscriptions, retry ladder driven by decline-reason taxonomy, dunning sequences per market",
      "Dispute ingestion: scheme webhook + Notification Service consumer into the internal case-management system; evidence-upload portal for merchants",
      "Settlement reconciliation: MPGS settlement file + scheme report + bank statement triple-match with per-merchant break detection",
      "Per-merchant migration tooling: feature-flag rollout, dry-run mode for new flows, instant rollback to Hosted Checkout if a merchant tripped a guard-rail",
    ],
    architecture: [
      "MPGS integration sits behind a stable internal Acquirer API; Hosted Checkout vs Hosted Session vs Direct API is an internal routing decision per merchant, not a per-merchant SDK",
      "3DS2 step-up logic runs as a pre-auth service: scores the transaction, picks the lowest-friction authentication path, calls MPGS with the corresponding flag, falls back to step-up only when the score demands it",
      "Tokenisation is a one-way migration per merchant: PAN is detokenised inside a hardened service the merchant never sees; merchant-facing APIs only ever reference scheme tokens",
      "Recurring engine is event-sourced: every retry decision is a recorded event with the decline reason and the next-attempt rule that fired",
      "Settlement reconciliation runs T+1 morning; breaks are routed to per-merchant queues with named ops owners and SLA timers",
      "Dispute case manager is the system of record; the scheme portal is a downstream view kept in sync via the MPGS Notification Service",
    ],
    operatingModel: [
      "Weekly auth-rate review: per network, per BIN, per merchant tier, with decline-reason drilldown and the next experiment queued",
      "Weekly 3DS2 health review: frictionless rate, step-up rate, abandonment, issuer-level outliers",
      "Monthly tokenisation rollout review: merchants migrated, post-migration auth-rate delta, PCI-scope evidence captured",
      "Daily settlement-break standup with finance: prior-day breaks, root cause, remediation, evidence",
      "Quarterly MPGS / scheme certification window: SAQ refresh, scheme attestation, EMVCo recertification on any new flows",
    ],
    role: "Owned the MPGS programme end-to-end as Product & Program lead, integration architecture, merchant-rollout sequencing, scheme-certification path, auth-rate optimisation programme, tokenisation rollout, dispute-product surface, settlement-reconciliation product, and the per-merchant migration governance. Direct accountability for portfolio auth rate, dispute cycle time, settlement break rate and scheme-certification posture.",
    impact: [
      "Lifted portfolio-wide authorisation rate by +3.4 points across the 18-month programme, driven by 3DS2 risk-based-authentication tuning, BIN-routing optimisation, and tokenisation lift",
      "Migrated 150+ merchants from Hosted Checkout to the appropriate MPGS integration mode without a single 24-hour outage",
      "Reached 92% network-tokenisation coverage on card-on-file merchants ahead of the regional scheme deadline",
      "Compressed median dispute cycle time from 21 days to 12 days through ingestion + merchant evidence-upload portal",
      "Held settlement break rate below 0.04% throughout the rollout, including across the tokenisation migration window",
      "Established the auth-rate optimisation programme as a permanent operating cadence rather than a one-time project",
    ],
    tradeoffs: [
      "Chose Hosted Session over a pure-Direct API rollout for premium merchants, accepted slightly less UI freedom in exchange for keeping PCI scope inside MPGS",
      "Built a per-merchant migration tool rather than a portfolio-wide cutover, added programme complexity but removed the single-event blast radius that a portfolio cutover would have carried",
      "Ran scheme tokenisation as a one-way migration with no rollback path post-cutover per merchant, required earlier merchant comms and a higher reference-merchant bar, in exchange for clean PCI scope reduction",
      "Standardised on internal MPGS APIs rather than letting each squad call MPGS directly, slowed initial features by ~6 weeks; saved ~6 quarters of rework when MPGS shipped breaking changes",
    ],
    lessons: [
      "MPGS Hosted Checkout is the right starting integration; staying on it past $200M GTV is a strategic mistake, not a stability win",
      "Auth-rate optimisation is a permanent programme, not a project. The first 2 points come from 3DS2; the next 1–2 points come from BIN routing and tokenisation; the last 0.5 point comes from per-issuer experiments",
      "Network tokenisation is the highest-leverage migration on the MPGS surface. The PCI-scope reduction, the auth-rate lift, and the lifecycle automation each justify it on their own; together they pay back the migration cost inside two quarters",
      "Dispute product matters at portfolio scale. Once the platform crosses ~10k disputes/year, ingesting the scheme portal into the internal case manager removes more ops cost than any other single move",
      "Migration governance is the actual product. A per-merchant flag, a dry-run mode, a rollback, and a named ops owner per merchant tier, these are the artefacts that decided whether the programme shipped clean or shipped incidents",
    ],
    whyItMatters:
      "For an acquirer-processor, this is the difference between reselling a gateway flow and owning the payments surface. The evidence is in the migration control, auth-rate lift, dispute ingestion, tokenisation coverage and settlement break discipline.",
    keywords: [
      "MPGS integration programme",
      "MasterCard Payment Gateway Services",
      "MPGS Hosted Session",
      "EMV 3DS2 tuning",
      "network tokenisation MDES",
      "acquirer-processor architecture",
      "recurring billing MPGS",
      "dispute ingestion scheme portal",
      "settlement reconciliation MPGS",
      "auth rate optimisation MENA",
    ],
  },
  {
    slug: "mdes-network-tokenisation-rollout",
    engagement: "Independent consulting engagement · regional acquirer-processor (client confidential).",
    title:
      "MDES + VTS Network Tokenisation Rollout: 92% Coverage and the Auth-Rate Lift That Pays For Itself",
    tagline:
      "Migrated 150+ merchants from PAN-on-file to scheme-token credentials across MDES (Mastercard) and VTS (Visa), replaced three vault providers, rewired the recurring engine, and lifted post-tokenisation authorisation rate by 1.8 points portfolio-wide.",
    category: "Payment Infrastructure",
    markets: ["UAE", "KSA", "Pakistan"],
    relevantFor: [
      "Mastercard",
      "Visa",
      "Network International",
      "Magnati",
      "Stripe",
      "Adyen",
      "Acquirer-processors",
      "Subscription merchants",
    ],
    metrics: [
      {
        label: "Card-on-file merchants migrated",
        value: "150+",
      },
      {
        label: "Token coverage on CoF traffic",
        value: "92%",
      },
      {
        label: "Auth-rate lift on tokenised traffic",
        value: "+1.8 pts portfolio",
      },
      {
        label: "PCI scope reduction",
        value: "Vault PAN footprint -91%",
      },
      {
        label: "Lifecycle events handled per day",
        value: "~40k (issuance, reissuance, lifecycle, suspend)",
      },
      {
        label: "Cutover incidents",
        value: "0 sev-1, 0 sev-2 across rollout",
      },
    ],
    beforeAfter: [
      {
        metric: "Card-on-file storage model",
        before: "PAN-on-file across three vault providers",
        after: "Scheme tokens via MDES + VTS, single token broker",
      },
      {
        metric: "Card lifecycle events",
        before: "Manual reissuance reconciliation",
        after: "Real-time MDES / VTS lifecycle webhook → token-state engine",
      },
      {
        metric: "PCI scope footprint",
        before: "Three vaults under PCI DSS scope",
        after: "Single token broker; PAN-in-clear restricted to <9% of legacy merchants",
      },
      {
        metric: "Recurring failure rate (lapsed cards)",
        before: "11–14% on subscriber base",
        after: "3.6% on tokenised cohort",
      },
    ],
    executiveSummary:
      "Designed and shipped the network-tokenisation programme for a regional acquirer-processor, replacing PAN-on-file storage with scheme-issued tokens via MDES (Mastercard Digital Enablement Service) and VTS (Visa Token Service). Migrated 150+ card-on-file merchants across three primary markets, retired three legacy vault providers in favour of a single in-house token broker, and rewired the recurring billing engine around token lifecycle. Delivered +1.8 points portfolio-wide authorisation-rate lift and a 91% reduction in PAN footprint without a single sev-1 or sev-2 incident through the cutover window.",
    problem:
      "The acquirer carried PAN-on-file across three separate vault providers accumulated over five years of acquisitions and partnerships. Every reissuance event broke a merchant relationship: subscriptions failed silently, account-updater coverage was patchy, and the dispute team was losing Compelling Evidence 3.0 (CE3.0)-eligible disputes because the cardholder identity link was broken across reissuance. PCI scope across three vaults was tripling the audit cost. The next-quarter scheme push on mandatory tokenisation for card-on-file merchants made the gap untenable. The team needed a complete migration with no merchant-visible failure, on a portfolio of 150+ active merchants and ~14M token-able credentials.",
    built: [
      "Single in-house token broker: one service owns MDES + VTS lifecycle, exposes a stable internal API to every merchant integration",
      "Token-state engine: every credential has a state (active, suspended, reissued, deleted) updated from MDES / VTS lifecycle webhooks in real time",
      "Lifecycle webhook ingestion: ~40k events/day from MDES + VTS, tokenisation, reissuance, account closure, lifecycle suspension, routed to merchant-specific handlers",
      "Per-merchant migration tool: feature-flag rollout, dry-run mode against a sandboxed copy of the vault, instant rollback per merchant if token issuance failed for that merchant's BIN profile",
      "Recurring engine rewrite around token lifecycle: token-state-aware retry logic, dunning that respects suspended states, automatic re-trigger on reissuance events",
      "CE3.0 lookup index: cardholder-indexed transaction store keyed on scheme token, queryable across the 365-day dispute window",
      "Vault decommissioning sequence: per-vault traffic drain, residual PAN re-tokenisation, audit-evidenced decommissioning",
    ],
    architecture: [
      "Token broker sits between the acquirer's transaction switch and the schemes, MDES + VTS lifecycle endpoints behind a stable internal API",
      "Token-state is the canonical record; the underlying PAN is detokenised only inside the broker and never surfaces to merchant-facing services",
      "Lifecycle webhooks are idempotent; each event is keyed on the token ID + scheme event ID; replays produce no state drift",
      "Recurring engine queries token state before every charge; suspended tokens are retried only after the reissuance webhook fires",
      "CE3.0 evidence path: cardholder identifier = scheme token; lookups span the full lifecycle (including reissuance chains) via the token genealogy table",
      "Vault decommissioning was per-merchant, not portfolio-wide, every merchant had a documented cutover window with rollback and validation steps",
    ],
    operatingModel: [
      "Weekly token-state review: lifecycle event volume, suspension rates by issuer, reissuance match rate, anomaly detection on per-issuer token rejection",
      "Weekly auth-rate review per merchant: pre-tokenisation vs post-tokenisation auth-rate delta, decline-reason mix shift, recurring-success delta",
      "Monthly merchant-rollout review: merchants in flight, merchants completed, merchants paused, residual PAN footprint",
      "Quarterly scheme certification: MDES + VTS recertification on any new flows; vault attestation closeout for decommissioned vaults",
    ],
    role: "Owned the tokenisation programme end-to-end as Product & Program lead, token broker architecture, lifecycle event design, per-merchant migration governance, recurring-engine rewrite, vault decommissioning sequence, scheme certification, and the auth-rate measurement programme. Direct accountability for migration cadence, post-migration auth-rate delta, PCI scope reduction, and zero-incident cutover record.",
    impact: [
      "Migrated 150+ card-on-file merchants from PAN storage to scheme tokens across three markets in 14 months",
      "Reached 92% network-tokenisation coverage on card-on-file traffic, ahead of the scheme deadline",
      "Lifted portfolio-wide authorisation rate by +1.8 points on tokenised traffic, with the largest lift on iOS Safari + cross-border combinations (+3–4 pts)",
      "Reduced PCI PAN footprint by 91%, three vault providers retired, single in-house broker stood up",
      "Cut recurring-subscription failure rate on the subscriber cohort from 11–14% to 3.6% by leveraging real-time lifecycle webhooks for reissuance and suspension",
      "Closed the CE3.0 evidence gap, cardholder-indexed transaction history now persists across reissuance, lifting the win rate on Visa 10.4 (card-absent fraud) disputes by ~40 pts",
      "Zero sev-1 / sev-2 incidents across the 14-month rollout window",
    ],
    tradeoffs: [
      "Chose single in-house token broker over per-merchant vault retention, heavier upfront engineering investment; saved ongoing per-vault PCI cost and produced a single source of truth for lifecycle events",
      "Migrated per-merchant rather than portfolio-wide, slower headline cadence; removed single-event blast radius; allowed rollback per merchant",
      "Sequenced vault decommissioning after merchant migration was complete, kept the legacy vaults running in dual-write mode longer than ideal; protected reversibility through the cutover window",
      "Built lifecycle webhook ingestion as idempotent + replayable from day one, added two weeks of build effort; saved an entire incident class around webhook duplication and out-of-order events",
    ],
    lessons: [
      "Tokenisation is a credential-lifecycle programme, not a one-time migration. The webhooks, issuance, reissuance, suspension and deletion, are what make tokens pay back; migrations without the lifecycle engine create an avoidable event backlog inside 90 days.",
      "Per-merchant migration governance, feature flag, dry-run, rollback, named ops owner, is the actual product. Portfolio-wide cutovers on credentials are how good engineering teams ship sev-1 incidents.",
      "Token genealogy (the chain of token IDs across reissuance for the same cardholder) is the single most underrated artefact. CE3.0 lookups, recurring re-trigger, and audit replays all depend on it being clean.",
      "PCI scope reduction is the headline; the auth-rate lift is the substance. The 91% PAN footprint reduction got the audit team's attention; the +1.8 points auth-rate lift paid the programme back inside six months.",
      "Vault decommissioning is a separate programme. Building it as the final step of tokenisation produces a clean attestation; building it into the migration plan as 'phase 4' produces an audit observation.",
    ],
    whyItMatters:
      "The hiring signal is credential-lifecycle ownership. Tokenisation only pays back when lifecycle webhooks, recurring logic, dispute evidence, vault retirement and merchant migration governance are designed together.",
    keywords: [
      "MDES network tokenisation",
      "Visa Token Service VTS",
      "network token rollout",
      "PAN on file migration",
      "scheme tokenisation acquirer",
      "PCI scope reduction tokenisation",
      "recurring billing tokenisation",
      "card lifecycle webhook",
      "CE3.0 tokenisation",
      "MENA acquirer tokenisation",
    ],
  },
  {
    slug: "3ds2-sca-step-up-optimisation-programme",
    engagement: "Independent consulting engagement · regional acquirer-processor (client confidential).",
    title: "3DS2 Step-Up Optimisation: From 38% Frictionless to 73% Without Lifting Fraud",
    tagline:
      "Rebuilt the EMV 3DS2 step-up programme for a regional acquirer-processor — per-issuer risk-based authentication, the full 3DS2 frictionless / data-only path suite, abandon-recovery flows — lifting frictionless rate from 38% to 73% over three quarters while holding portfolio fraud below the 6 bps scheme fraud-monitoring threshold.",
    category: "Payment Infrastructure",
    markets: ["UAE", "KSA", "Pakistan", "Egypt"],
    relevantFor: [
      "Visa",
      "Mastercard",
      "Network International",
      "Geidea",
      "Stripe",
      "Adyen",
      "Acquirer-processors",
    ],
    metrics: [
      {
        label: "Frictionless rate",
        value: "38% → 73% (+35 pts)",
      },
      {
        label: "3DS2 step-up rate",
        value: "62% → 27% (-35 pts)",
      },
      {
        label: "Step-up abandonment recovered",
        value: "11% of abandons re-converted",
      },
      {
        label: "Portfolio fraud rate",
        value: "Held below 6 bps (scheme threshold)",
      },
      {
        label: "Auth-rate lift on CNP traffic",
        value: "+5.4 pts portfolio",
      },
      {
        label: "Issuers actively scored",
        value: "180+ issuer / BIN-range combinations",
      },
    ],
    beforeAfter: [
      {
        metric: "Risk-based authentication",
        before: "Portfolio-wide single flag",
        after: "Per-merchant, per-issuer, per-amount-band RBA profile",
      },
      {
        metric: "Recurring + MIT handling",
        before: "Step-up on every payment",
        after: "MIT flag at auth + recurring authentication anchor with token persistence",
      },
      {
        metric: "Step-up abandonment recovery",
        before: "No recovery flow",
        after: "OTP resend + alternative-method fallback + post-abandon outreach",
      },
      {
        metric: "Per-issuer scoring",
        before: "Single global step-up logic",
        after: "180+ issuer-range profiles refreshed monthly",
      },
    ],
    executiveSummary:
      "Rebuilt the EMV 3DS2 step-up programme for a regional acquirer-processor across UAE, KSA, Pakistan and Egypt — markets where cardholder step-up is governed by scheme mandates (Visa / Mastercard EMV 3DS2) and local-regulator e-commerce authentication rules (SAMA, CBUAE, SBP, CBE), not PSD2 / SCA. Moved from portfolio-wide step-up flagging to per-issuer, per-merchant, per-amount-band risk-based authentication (RBA); used the full 3DS2 frictionless / data-only (3RI) path suite, recurring and MIT authentication anchoring, and issuer trust-listing; and shipped step-up abandon-recovery flows. Lifted frictionless rate from 38% to 73% over three quarters while holding portfolio fraud below the 6 bps scheme fraud-monitoring threshold on routed traffic, and delivered +5.4 points portfolio CNP authorisation-rate lift — largest gains on iOS Safari + cross-border combinations.",
    problem:
      "The platform was stepping up 62% of card-not-present traffic with a portfolio frictionless rate of 38%, well below regional peers, while CNP authorisation rate trailed the regional benchmark by 4 points. Step-up was either always-on (high friction, high abandonment) or off (no risk-based strategy at all) depending on the merchant. Recurring subscriptions stepped up on every charge; MIT flags were inconsistently set; issuer trust signals were not in the flow. The scheme account manager had warned that the portfolio's fraud trend was approaching the fraud-monitoring-programme threshold. The team needed a complete rebuild of the risk-based-authentication and step-up surface, with no acceptable trade-off on the fraud rate — and it had to satisfy the local e-commerce authentication mandates in each market (SAMA, CBUAE, SBP, CBE) alongside the Visa / Mastercard 3DS2 rules.",
    built: [
      "Pre-auth RBA scoring service: scores every CNP transaction and picks the highest-value applicable 3DS2 path (frictionless, data-only / 3RI, or step-up)",
      "Per-issuer override map: 180+ issuer + BIN-range combinations with observed frictionless-honour rates, step-up override rates, and per-amount-band thresholds",
      "Per-merchant authentication profile: each merchant's typical transaction mix, fraud profile, and authentication preferences captured as a config",
      "MIT indicator pipeline: end-to-end correctness on the MIT flag at authorisation (not capture), including back-fill for recurring subscriptions",
      "Recurring authentication anchor with token persistence: token-backed subscriptions retain the first-CIT-authentication anchor; amount-drift detection re-arms step-up only when amount changes materially",
      "Issuer trust-listing in the auth flow (per-issuer; honoured where issuers expose the signal)",
      "Step-up abandonment recovery: OTP resend, push notification re-prompt, fallback to alternative payment method, post-abandonment outreach via merchant",
      "Real-time fraud-rate dashboard: per-segment visibility against the scheme fraud-monitoring threshold; auto-tightens frictionless flagging when rolling rate approaches the threshold",
    ],
    architecture: [
      "RBA scoring runs as a synchronous pre-auth service: < 80ms p95 added latency; cached per-issuer profile + per-merchant config + transaction risk score",
      "Per-issuer scoring updates monthly from observed honour rates; weighted toward last 30 days of behaviour; manual override allowed for known-issuer changes",
      "MIT pipeline keyed on a prior-authentication-reference table: every MIT request lookups the originating CIT and includes its authentication evidence in the auth request",
      "Step-up abandonment recovery sequenced: client-side OTP resend (zero latency), then alternative method offer, then session-recovery email for merchants who opt in",
      "Fraud-rate guard-rails are first-class: real-time portfolio rate + per-merchant rate + per-issuer rate; frictionless flagging tightens automatically when any segment approaches the scheme threshold",
      "Reconciliation: every authentication decision and step-up outcome is logged; available for scheme audit replay and per-merchant performance reporting",
    ],
    operatingModel: [
      "Weekly 3DS2 health review: frictionless rate, step-up rate, abandonment, fraud rate, by merchant tier, by network, by issuer cohort",
      "Monthly per-issuer profile refresh: re-score the 180+ issuer combinations based on observed behaviour from the last 30 days",
      "Quarterly merchant authentication-strategy review with top 30 merchants: their fraud profile, their authentication mix, their step-up abandonment, the auth-rate impact",
      "Real-time alerting when any merchant's fraud rate crosses 70% of the scheme threshold; programme tightens automatically and notifies the merchant-success team",
      "Annual scheme + regulator audit prep: authentication-decision logs, fraud-rate evidence, attestation of step-up programme controls against scheme and local-mandate requirements",
    ],
    role: "Owned the 3DS2 / risk-based-authentication programme end-to-end as Product & Program lead — RBA scoring architecture, per-issuer scoring model, MIT pipeline correctness, recurring-token integration, abandon-recovery flows, fraud-rate guard-rails and the scheme-audit posture. Direct accountability for frictionless rate, fraud rate, auth-rate lift, and the portfolio's scheme fraud-monitoring standing.",
    impact: [
      "Lifted portfolio frictionless rate from 38% to 73% in three quarters",
      "Cut step-up rate from 62% to 27% on the same traffic",
      "Recovered ~11% of step-up abandonment via OTP resend + alternative-method fallback",
      "Held portfolio fraud rate below 6 bps on routed traffic, keeping the portfolio clear of the scheme fraud-monitoring threshold throughout",
      "Delivered +5.4 points portfolio CNP authorisation-rate uplift, with +3-4 pts on iOS Safari + cross-border combinations",
      "Closed two outstanding scheme audit observations on authentication documentation",
      "Established the per-issuer profile as a permanent monthly artefact, not a project deliverable",
    ],
    tradeoffs: [
      "Built per-issuer scoring as a 180+ combination map rather than a model, heavier ops cadence (monthly refresh) than a self-learning model would need; saved a year of model-tuning time and produced interpretable decisions that scheme audits accept",
      "Required ~80ms pre-auth latency budget for the RBA scoring service, added P95 latency on the auth path; recovered the latency in lower step-up rate and lower abandonment",
      "Built abandon-recovery as a full surface (OTP resend, alternative-method, post-abandon outreach) rather than just OTP resend, heavier engineering; produced the 11% recovery rate that other platforms with single-mode resend do not see",
      "Held a strict portfolio-fraud-rate floor (auto-tighten on approach to the scheme threshold), accepted that some merchants temporarily lost frictionless coverage in bad weeks; protected the portfolio's scheme standing from drift",
    ],
    lessons: [
      "Risk-based authentication without per-issuer scoring is portfolio guesswork. Two acquirers running identical step-up logic see different frictionless rates because their merchant mix sends them to different issuer pools.",
      "Step-up abandonment recovery is part of the authentication programme, not separate from it. A step-up that abandons is worse than a frictionless decline; the recovery flow is where 10–15% of would-be losses come back.",
      "Fraud-rate guard-rails belong on the OKR slate as floors, not as dashboards. Programmes that ship without auto-tighten logic re-enter the bad-quarter spiral every fraud spike.",
      "MIT pipeline correctness is invisible until the chargeback arrives 60 days later. Build the prior-authentication-reference table early; verify the MIT flag is set at auth, not at capture; instrument the entire pipeline.",
      "Per-merchant authentication profiles are not optional. Portfolio defaults produce mediocre frictionless rates everywhere; per-merchant profiles produce category-best on the cohorts where the merchant mix supports it.",
    ],
    whyItMatters:
      "For CNP businesses, the commercial value sits in the uncomfortable middle: issuer scoring, authentication-path choice, fraud-rate guard rails and abandoned-challenge recovery. This case shows that friction can be reduced without treating fraud tolerance as a rounding error — under scheme and local-regulator rules, not PSD2.",
    keywords: [
      "3DS2 optimisation",
      "EMV 3DS2 risk-based authentication",
      "card step-up optimisation",
      "frictionless rate uplift",
      "step-up abandonment recovery",
      "per-issuer scoring 3DS2",
      "MIT pipeline payments",
      "auth-rate lift CNP",
      "card not present optimisation",
      "MENA acquirer 3DS2",
    ],
  },
  {
    slug: "click-to-pay-vctp-mctp-programme",
    engagement: "Independent consulting engagement · regional acquirer (client confidential).",
    title:
      "Click to Pay (VCTP + MCTP) Programme: Scheme-Led Checkout, Recognised Cardholders, and 7.2pt Conversion Lift",
    tagline:
      "Designed and shipped Click to Pay across a regional acquirer's top-tier merchant cohort, VCTP (Visa Click to Pay) + MCTP (Mastercard Click to Pay), recognised-cardholder enrolment, multi-card wallet, lifting CNP checkout conversion by 7.2 points on the routed traffic.",
    category: "Payment Infrastructure",
    markets: ["UAE", "KSA"],
    relevantFor: [
      "Visa",
      "Mastercard",
      "Network International",
      "Geidea",
      "Stripe",
      "Adyen",
      "Top-tier e-commerce merchants",
    ],
    metrics: [
      {
        label: "Merchants live on Click to Pay",
        value: "47 (top tier)",
      },
      {
        label: "Recognised-cardholder rate",
        value: "31% post-90-days",
      },
      {
        label: "Checkout conversion lift",
        value: "+7.2 pts on routed traffic",
      },
      {
        label: "Auth-rate on Click to Pay txns",
        value: "+1.4 pts vs PAN-entry control",
      },
      {
        label: "Cards enrolled in wallet",
        value: "210k+",
      },
      {
        label: "Cross-merchant card reuse",
        value: "44% of Click to Pay txns use a card enrolled at another merchant",
      },
    ],
    beforeAfter: [
      {
        metric: "CNP checkout pattern",
        before: "Manual PAN entry or single-merchant card vault",
        after: "Scheme-led wallet (VCTP + MCTP) with cross-merchant recognition",
      },
      {
        metric: "Cardholder recognition",
        before: "Each merchant maintained its own card vault and identity",
        after: "Scheme-managed cardholder identity recognised across merchants",
      },
      {
        metric: "Mobile checkout conversion",
        before: "32% on routed merchants",
        after: "39%+ post-rollout",
      },
    ],
    executiveSummary:
      "Designed and shipped the Click to Pay programme, VCTP (Visa Click to Pay) + MCTP (Mastercard Click to Pay), on a regional acquirer's top-tier merchant cohort. Integrated the scheme-led wallet flow into hosted-checkout, hosted-session and direct-API merchant integrations; built recognised-cardholder enrolment into the platform's checkout surface; rolled out across 47 merchants in the first three quarters. Delivered +7.2 points checkout conversion on routed Click to Pay traffic, +1.4 points auth-rate on the same cohort, and ~210k+ enrolled cards with 44% cross-merchant reuse, proving the scheme-led wallet thesis on a regional portfolio for the first time.",
    problem:
      "The acquirer's top-tier merchants ran their own one-merchant card vaults, each merchant individually owned the cardholder identity and re-asked for PAN on the first transaction in every session. CNP checkout conversion lagged the regional benchmark by 5–8 points on the mobile cohort. Apple Pay and Google Pay were patchily adopted (Apple wallet penetration ~40% of iOS users; Google Pay closer to 20% on Android). The scheme account managers had been pushing Click to Pay for two years; the platform had repeatedly deferred because the integration looked complex and the merchant case study evidence was thin. The next-quarter scheme push (with explicit MDR pressure tied to VCTP / MCTP enrolment) made the deferral untenable.",
    built: [
      "VCTP integration: Visa Click to Pay implemented behind the platform's unified checkout API, both EMVCo SRC (Secure Remote Commerce) and Visa-specific extensions",
      "MCTP integration: Mastercard Click to Pay implemented on the same surface, single internal checkout API, scheme-specific routing underneath",
      "Recognised-cardholder enrolment: in-checkout prompt at the moment the cardholder enters PAN; explicit opt-in; cards added to the scheme wallet under cardholder consent",
      "Cross-merchant recognition: cardholders who enrol at merchant A see the recognised-card prompt at merchant B without re-entering PAN",
      "Multi-card wallet UI: cardholders managing 2+ cards in the wallet can pick at checkout; default card per cardholder per merchant",
      "Federated checkout-state management: the wallet state persists across browsers, devices, and sessions via scheme cookies + cardholder identity",
      "Merchant onboarding tooling: per-merchant enrolment flow, configuration of the Click to Pay button placement, A/B testing harness for placement variants",
      "Fallback experience: when Click to Pay is unavailable (issuer mismatch, scheme outage, cardholder declines), the merchant's existing PAN-entry flow remains as primary",
    ],
    architecture: [
      "Single internal checkout API fronts VCTP, MCTP and the merchant's local PAN-entry flow, scheme choice is per-cardholder, per-merchant config decision",
      "Click to Pay flow runs as an embedded iframe (EMVCo SRC standard) with the scheme-hosted iframe handling cardholder identification, card presentation, and 3DS2 authentication invocation",
      "Cardholder recognition runs at PAN-entry time via scheme APIs, checks whether the cardholder is enrolled before showing the manual PAN-entry surface",
      "Network token issuance via MDES + VTS happens at enrolment; the merchant receives a token, not the PAN, after Click to Pay completes",
      "Per-merchant config: button placement, default card selection, fallback policy, A/B testing variants",
      "Telemetry: every Click to Pay event (prompt-shown, prompt-accepted, card-selected, 3DS2-invoked, authorisation-result, abandonment) instrumented; merchant-facing dashboard surfaces the funnel",
    ],
    operatingModel: [
      "Weekly Click to Pay funnel review: prompt-show rate, recognition rate, conversion rate, decline rate, by merchant, by issuer, by device class",
      "Monthly merchant rollout review: merchants live, in flight, paused, abandoned, with placement variant data and conversion delta",
      "Quarterly scheme alignment: VCTP + MCTP roadmap, scheme-specified enrolment growth targets, MDR programme participation",
      "Real-time alerting on Click to Pay availability (scheme outages); auto-fallback to merchant PAN-entry with no merchant-visible impact",
      "Annual scheme attestation: integration evidence, cardholder consent records, fraud-rate posture",
    ],
    role: "Owned the Click to Pay programme end-to-end as Product & Program lead, VCTP + MCTP integration architecture, in-checkout enrolment design, merchant-rollout sequencing, A/B testing programme for button placement, scheme-relationship management, and the conversion-funnel telemetry. Direct accountability for merchant adoption cadence, enrolment rate, conversion-lift delivery, and scheme posture.",
    impact: [
      "Rolled out across 47 top-tier merchants in three quarters",
      "Delivered +7.2 points checkout conversion lift on routed Click to Pay traffic, largest single CNP conversion programme in the platform's history",
      "+1.4 points authorisation-rate uplift on Click to Pay vs. manual PAN-entry traffic (driven by network-token presentation + cleaner 3DS2 hand-off)",
      "Enrolled 210k+ cards in the scheme wallet in the first 90 days",
      "Achieved 44% cross-merchant card reuse, cardholders enrolled at merchant A using their wallet at merchant B without re-entering PAN",
      "Mobile checkout conversion lifted from 32% to 39%+ on routed merchants",
      "Closed the scheme account managers' two-year-running ask; secured MDR programme participation for the merchants",
    ],
    tradeoffs: [
      "Chose iframe (EMVCo SRC) over white-label SDK, accepted less merchant brand control on the Click to Pay surface; saved 6+ months of engineering and delivered the scheme-recognised cardholder experience",
      "Built A/B harness for button placement on every merchant rollout, added 2-3 weeks per merchant; produced the placement playbook that turned a 4-point lift into a 7.2-point one",
      "Required cardholder explicit opt-in for enrolment (no auto-enrol), slower enrolment growth than scheme-pushed auto-enrol would have delivered; lower complaint rate; cleaner regulator posture on consent",
      "Rolled out to the top-tier merchant cohort first, left mid-tier on the legacy flow for two quarters longer; concentrated the conversion-lift evidence in the strongest cohort and avoided diluted A/B data",
    ],
    lessons: [
      "Click to Pay is a federated identity programme dressed as a checkout feature. The conversion lift comes from cross-merchant recognition, not from the Click to Pay button itself.",
      "Button placement carried more conversion variance than expected; per-merchant A/B placement produced 2-3 points of delta on otherwise-identical Click to Pay flows.",
      "Cardholder opt-in (no auto-enrol) is the right posture even when schemes push for the opposite. The complaint rate, the consent audit, and the regulator conversation are all easier with explicit opt-in.",
      "Network-token presentation through Click to Pay is what produces the auth-rate lift. The conversion lift is the headline; the auth-rate lift is the substance.",
      "Cross-merchant reuse rate is the leading indicator of programme success. 44% reuse on a regional cohort proved the scheme-led wallet thesis; below ~25% reuse and the programme is just an alternative checkout button.",
    ],
    whyItMatters:
      "The useful signal is not that Click to Pay was integrated; it is that the programme produced funnel evidence, enrolment discipline, button-placement learning and network-token auth lift across a real merchant cohort.",
    keywords: [
      "Click to Pay programme",
      "VCTP rollout",
      "MCTP rollout",
      "scheme-led checkout",
      "EMVCo SRC implementation",
      "recognised cardholder",
      "CNP conversion lift",
      "checkout button placement",
      "network token wallet",
      "MENA Click to Pay",
    ],
  },
  {
    slug: "aml-cft-sanctions-engine-implementation",
    engagement: "Independent consulting engagement · regional acquirer-processor (client confidential).",
    title:
      "AML/CFT Sanctions Engine: Real-Time Screening + 60% False-Positive Cut Across Five Markets",
    tagline:
      "Stood up the AML/CFT sanctions and PEP screening engine across six MENA + South Asia markets for a regulated fintech, real-time pre-send blocking + daily batch re-screen, per-corridor list tuning, cut sanctions false-positive rate by ~60% without lowering true-positive coverage.",
    category: "Fraud & Risk",
    markets: ["UAE", "KSA", "Pakistan", "Bangladesh", "Egypt", "Iraq"],
    relevantFor: [
      "Visa",
      "Mastercard",
      "Banks",
      "Sponsor banks",
      "Regulated remittance operators",
      "Cross-border payment platforms",
    ],
    metrics: [
      {
        label: "Markets live",
        value: "6 (UAE / KSA / PK / BD / EG / IQ)",
      },
      {
        label: "Sanctions screening latency",
        value: "p95 < 180ms (real-time pre-send)",
      },
      {
        label: "False-positive rate cut",
        value: "~60% reduction",
      },
      {
        label: "True-positive coverage",
        value: "Maintained at 100% (no missed sanctions hits)",
      },
      {
        label: "Daily transactions screened",
        value: "~1.4M (real-time + batch)",
      },
      {
        label: "Lists integrated",
        value: "OFAC, EU, UK, UN, GCC, per-country central-bank, WorldCheck, Dow Jones",
      },
      {
        label: "Regulator inquiries answered within SLA",
        value: "100% (≤ 24h response)",
      },
    ],
    beforeAfter: [
      {
        metric: "Screening posture",
        before: "Batch screening only, daily",
        after: "Real-time pre-send blocking + daily batch re-screen + monthly residual re-screen",
      },
      {
        metric: "Sanctions false-positive rate",
        before: "Portfolio: ~38% of alerts were name-collision FPs",
        after: "Portfolio: ~14% post-tuning",
      },
      {
        metric: "Tier-1 analyst throughput",
        before: "~35 alerts/day per analyst",
        after: "~95 alerts/day per analyst (FP triage automation + cleaner alert quality)",
      },
      {
        metric: "Regulator audit posture",
        before: "Two open observations on screening cadence",
        after: "Zero open observations; commendation in last cycle",
      },
    ],
    executiveSummary:
      "Designed and shipped the AML/CFT sanctions and PEP screening engine for a regulated fintech operating cross-border across six MENA + South Asia markets. Replaced legacy batch-only screening with a real-time pre-send blocking layer + daily batch re-screen + monthly residual re-screen architecture. Tuned per-corridor false-positive rates, cut overall false-positive rate by ~60% while maintaining 100% true-positive coverage. Cleared two long-running regulator observations and earned a commendation in the most recent supervisory cycle. Tier-1 analyst throughput nearly tripled because the alert quality improved and routine name-collision FPs were auto-dismissed under documented controls.",
    problem:
      "The platform was screening sanctions and PEP lists in a daily batch, every transaction was potentially exposed for up to 24 hours before being checked against the latest list updates. Two market regulators had open observations on screening cadence; one had warned that the observation would escalate at the next supervisory visit. False-positive rates ran ~38%, half the alert queue was Arabic-to-Latin transliteration collisions, common Pakistani / Indian / Bangladeshi name overlaps, and stale per-country list entries that had not been tuned for the platform's actual merchant and consumer mix. Tier-1 analysts were processing ~35 alerts per day per analyst and the queue was growing; tier-2 escalations were taking 8-12 days to close. Five markets, three sponsor banks, two scheme partners, and the legal team were all asking different questions about screening posture.",
    built: [
      "Real-time screening service: pre-send blocking call with p95 latency < 180ms; cached per-list results with appropriate TTLs (24h for sanctions, 1h for in-flight regulatory updates)",
      "Daily batch re-screen pipeline: every prior-day transaction re-screened against latest list updates; daily reconciliation against real-time results to catch list-delta hits",
      "Monthly residual re-screen: dormant counterparty records and merchant accounts re-screened on a rolling 30-day cycle",
      "Per-corridor tuning rules: market-aware name-matching thresholds (Arabic transliteration variants, Bengali script variants, Urdu script variants), per-corridor common-name suppression with documented controls",
      "Lists integrated: OFAC, EU consolidated, UK HMT, UN, GCC, per-country central-bank lists (CBUAE / SAMA / SBP / BB / CBE / CBI), WorldCheck + Dow Jones for PEP and adverse media",
      "Audit pipeline: every screening event logged with input, list version, matching result, analyst decision, list change since last screening; queryable per merchant, per regulator inquiry",
      "Analyst case-management surface: alert detail with all matching identifiers, prior decisions on similar cases, suggested triage based on cross-document consistency",
      "Per-list update ingestion: automated polling + parsing of OFAC SDN updates, EU consolidated list, UK HMT updates, UN designations, plus per-country list updates with manual review on format changes",
    ],
    architecture: [
      "Screening service is a synchronous pre-send call on every transaction initiation; cached per-counterparty for 24h with explicit invalidation on list update",
      "Cache invalidation propagates within 60 seconds of a list update; pre-send latency budget includes the worst-case uncached call",
      "Per-corridor matching rules run as overlays on top of base name-matching scores, they can suppress likely-FP alerts (with documented controls) but cannot increase the score",
      "Audit log is the system of record; every screening event is keyed on (transaction ID, list version, decision) for regulator-facing replay",
      "List update ingestion is monitored on three dimensions: cadence (have we received the expected updates), format (did the list arrive in the expected shape), content (did the list contain the expected size and structure)",
      "Failure mode: if the real-time screening service is down, the platform fails closed, transactions are held for batch screening rather than passing un-screened",
    ],
    operatingModel: [
      "Daily screening health review: alerts produced, alerts dismissed, alerts escalated, list-update freshness, real-time service uptime",
      "Weekly per-market tuning review: false-positive rate by market, by corridor, by name-script; suppression rule additions reviewed by senior analyst + audit team",
      "Monthly per-list audit: list update receipt evidence, format change handling, per-list match coverage",
      "Quarterly regulator-facing screening report: market-by-market alert volume, FP rate, true-positive disposition, list coverage attestation",
      "Annual external audit: full screening pipeline review with independent assessor",
    ],
    role: "Owned the AML/CFT screening programme end-to-end, real-time service architecture, list integration, per-corridor tuning, analyst-tooling design, regulator-facing audit posture, and the change-control governance for matching-rule updates. Direct accountability for sanctions screening true-positive coverage, false-positive rate, regulator observation closure, and analyst throughput.",
    impact: [
      "Shipped real-time pre-send sanctions blocking across five markets with p95 latency below 180ms",
      "Cut overall sanctions false-positive rate by ~60%, from 38% of alerts being name-collision FPs to 14%",
      "Maintained 100% true-positive coverage, every sanctions hit that should have been caught was caught",
      "Cleared two long-running regulator observations on screening cadence",
      "Earned commendation in the most recent supervisory cycle for the per-corridor tuning evidence and the audit trail quality",
      "Lifted tier-1 analyst throughput from ~35 alerts/day to ~95 alerts/day per analyst",
      "Cut tier-2 escalation cycle time from 8-12 days to 3-5 days",
    ],
    tradeoffs: [
      "Chose real-time pre-send blocking over async screen-and-allow, added 100-200ms to the send latency budget; produced the regulator-facing posture that closed two open observations",
      "Built per-corridor suppression rules with explicit controls + audit, heavier governance overhead than a portfolio-wide tuning would carry; produced the false-positive rate cut without lowering coverage",
      "Integrated 8+ lists rather than relying on a single consolidated vendor list, more list-ingestion engineering; tighter regulator posture (every market regulator could verify their list was specifically integrated)",
      "Built fail-closed for real-time screening downtime, accepted that brief screening-service outages would degrade transaction throughput; protected against the alternative (transactions passing un-screened during the outage)",
    ],
    lessons: [
      "Sanctions screening tuning is a continuous product job, not a configuration. Per-corridor false-positive rates diverge fast and must be re-tuned at least monthly.",
      "Real-time pre-send screening is non-negotiable for regulators in 2025. Batch-only screening reads as outdated in any supervisory cycle; the regulator's first question is 'how quickly are you blocked'.",
      "Per-corridor suppression rules need explicit controls: any rule that lowers false-positive rate must be defensible in the next regulator visit. Audit-trail governance on suppression is the part most teams miss.",
      "Tier-1 analyst throughput is the real lever. Better alert quality (lower FP rate) lifts throughput more than tooling improvements; both together is multiplicative.",
      "List ingestion monitoring is the under-invested guard rail. A list update that arrived in a new format on a Friday afternoon and silently failed to ingest is how sanctions hits get missed.",
    ],
    whyItMatters:
      "The hiring signal is operating control. Real-time screening, market-specific list coverage, explainable suppression rules and analyst throughput improved together, which is what sponsor banks and regulators care about when volumes scale.",
    keywords: [
      "AML CFT sanctions engine",
      "real-time sanctions screening",
      "PEP screening",
      "OFAC EU UK UN screening",
      "name matching tuning",
      "false positive sanctions",
      "fintech compliance MENA",
      "screening regulator observations",
      "WorldCheck Dow Jones integration",
      "cross-border AML screening",
    ],
  },
  {
    slug: "regional-wallet-integration-easypaisa-jazzcash-sadad",
    engagement: "Independent consulting engagement · regional acquirer (client confidential).",
    title:
      "Regional Wallet Integration: Easypaisa + JazzCash + SADAD + STC Pay Across MENA + South Asia",
    tagline:
      "Integrated the dominant regional wallets, Easypaisa, JazzCash, SADAD, STC Pay, plus Mada-rail acceptance, into a unified payment-acceptance surface for a regional fintech across four markets; produced 27% lift in non-card acceptance and removed three single-rail dependencies.",
    category: "Emerging Markets",
    markets: ["Pakistan", "KSA", "Bangladesh"],
    relevantFor: [
      "Cross-border payment platforms",
      "Regional acquirers",
      "Banks expanding fintech reach",
      "Wallet partner ecosystems",
      "Cross-corridor remittance operators",
    ],
    metrics: [
      {
        label: "Wallets integrated",
        value: "5 (Easypaisa, JazzCash, SADAD, STC Pay, plus Mada-rail)",
      },
      {
        label: "Markets covered",
        value: "4 (PK, KSA, BD, partial UAE consumer)",
      },
      {
        label: "Non-card acceptance lift",
        value: "+27% on cohort merchants",
      },
      {
        label: "Merchant onboarding cycle",
        value: "Cut from ~21 days to ~7 days for wallet-only merchants",
      },
      {
        label: "Per-transaction cost reduction",
        value: "Routed wallet traffic ~38% cheaper than international scheme equivalent",
      },
      {
        label: "Cross-rail fallback success",
        value: "94% of failed-card-attempt transactions completed via wallet fallback",
      },
    ],
    beforeAfter: [
      {
        metric: "Wallet acceptance posture",
        before:
          "Card-only acceptance; consumer drop-off on card-only checkouts in Pakistan + Bangladesh",
        after: "Unified wallet + card acceptance with intelligent routing per market",
      },
      {
        metric: "Per-wallet integration approach",
        before: "Bespoke per-wallet engineering each time",
        after:
          "Single internal Wallet API with per-wallet adapter; new wallet onboarding in ~4 weeks",
      },
      {
        metric: "Merchant cost structure",
        before: "Higher MDR on international-scheme-only acceptance",
        after: "Cheaper average MDR through wallet-route optimisation",
      },
    ],
    executiveSummary:
      "Designed and shipped the unified wallet-acceptance surface for a regional fintech operating across Pakistan, KSA, Bangladesh, and partial UAE consumer flows. Integrated five wallets, Easypaisa, JazzCash, SADAD, STC Pay, plus Mada-rail acceptance for consumer flows, behind a single internal Wallet API. Built per-merchant routing logic that picks the right rail per cardholder profile, lifted non-card acceptance by 27%, and produced a 94% cross-rail fallback completion rate on transactions that started on card and failed.",
    problem:
      "The platform's card-first acceptance strategy worked in UAE but lost meaningful conversion in Pakistan and Bangladesh, where consumer share is dominated by mobile-money wallets (Easypaisa + JazzCash + bKash + Nagad), and was suboptimal in KSA where SADAD and Mada-rail are mandated by SAMA + scheme regulation. Each wallet had been integrated piecemeal by different teams; the integrations were bespoke and brittle. Merchant onboarding for wallet-only or wallet-included flows took 3 weeks of bespoke engineering per merchant. The competitive pressure was clear: regional competitors who shipped wallet-first acceptance were winning the consumer-facing checkout conversion. The senior team needed a unified architecture, fast.",
    built: [
      "Single internal Wallet API: stable contract, per-wallet adapter beneath, identical merchant-facing experience for any wallet",
      "Per-wallet adapter library: Easypaisa, JazzCash, STC Pay, SADAD, Mada-rail, each as a separate adapter with consistent capability mapping (init, authenticate, capture, refund, status)",
      "Per-merchant routing rules: merchant-tier + per-market default + per-amount-band overrides; intelligent fallback when primary rail declines",
      "Reconciliation per-rail: each wallet has its own settlement file format; built per-wallet reconciliation matching with internal-ledger pairings",
      "AML/CFT screening integration: every wallet transaction runs through the same sanctions + PEP screening as card traffic; per-wallet KYC re-validation where wallet provides only partial counterparty data",
      "Dispute pipeline per-wallet: each wallet has its own dispute mechanism (different from scheme card disputes); built case-management ingestion for each",
      "Merchant onboarding tool: per-merchant wallet enablement, per-merchant fallback policy, A/B testing for routing variants",
      "Real-time observability: per-wallet uptime, per-wallet auth rate, per-wallet decline reason mix, per-wallet abandonment",
    ],
    architecture: [
      "Single internal API fronts all wallets; merchant integration is identical regardless of which wallet executes the transaction",
      "Per-wallet adapter handles wallet-specific authentication (Easypaisa OTP, JazzCash QR, SADAD merchant code, STC Pay deeplink, Mada PIN-on-glass)",
      "Routing engine picks the wallet per transaction: per-merchant default first, per-amount-band override, per-cardholder preference, then fallback",
      "When card route fails (decline / abandonment), the surface offers wallet fallback in the same checkout session, single-session cross-rail recovery",
      "Reconciliation runs per-wallet daily: wallet settlement file matched against internal ledger with per-wallet break detection",
      "Sanctions / PEP screening runs uniformly across wallet + card transactions, same screening engine, same audit trail",
    ],
    operatingModel: [
      "Weekly wallet health review: per-wallet uptime, auth rate, decline reasons, abandonment, by merchant tier, by market",
      "Monthly merchant routing review: routing-rule effectiveness, fallback-completion rate, per-merchant cost-per-transaction trends",
      "Quarterly wallet-partner alignment: per-wallet roadmap, fee adjustments, joint marketing, regulator-facing posture",
      "Real-time alerting per-wallet on availability + per-merchant routing anomalies",
      "Annual scheme + regulator attestation: wallet integration evidence, AML pipeline coverage, dispute-handling audit",
    ],
    role: "Owned the regional wallet integration programme end-to-end as Product & Program lead, unified Wallet API architecture, per-wallet adapter design, routing-engine logic, reconciliation per-rail, AML pipeline unification, merchant-onboarding tooling, and the wallet-partner relationship management. Direct accountability for non-card acceptance lift, merchant onboarding cycle compression, cross-rail fallback rate, and per-transaction cost reduction.",
    impact: [
      "Lifted non-card acceptance by 27% on cohort merchants, driven primarily by Easypaisa + JazzCash + STC Pay adoption",
      "Cut merchant onboarding cycle from ~21 days to ~7 days for wallet-only merchants",
      "Reduced average per-transaction acquiring cost by ~38% on routed wallet traffic vs. international scheme equivalent",
      "Reached 94% cross-rail fallback completion rate, transactions that failed on card recovered through wallet in the same session",
      "Removed three single-rail dependencies, each wallet had previously been a single point of failure; the unified API + adapter pattern eliminated that",
      "Established the per-merchant routing-rule discipline as a repeatable framework, not a per-engagement custom job",
      "Onboarded two additional wallets (after the initial five) in ~4 weeks each, validating the adapter pattern",
    ],
    tradeoffs: [
      "Chose unified API + per-wallet adapter over per-wallet integration, heavier upfront engineering; produced the 4-week new-wallet onboarding cycle and removed bespoke-per-engagement work",
      "Built single-session cross-rail fallback, added engineering complexity (state management across rails within a checkout session); recovered the engineering investment in the 94% fallback-completion rate",
      "Standardised reconciliation per-wallet to internal-ledger pairings, additional finance + engineering coordination per wallet; saved months of ops-cleanup when settlement files arrived in unexpected formats",
      "Insisted on uniform AML/CFT screening across wallet + card, required wallet partners to agree to additional KYC data sharing in some cases; produced the audit posture that closed regulator inquiries on wallet-traffic compliance",
    ],
    lessons: [
      "Regional wallets are the consumer experience in MENA + South Asia. Card-first acceptance in Pakistan or Bangladesh loses the largest segment of the market.",
      "Per-wallet adapter architecture is the right pattern over bespoke per-wallet integration. The investment in the adapter layer pays back at the third wallet, not the first.",
      "Single-session cross-rail fallback is the conversion-recovery move most platforms miss. Failed-card → next-session-retry loses 30%+ of the recoverable transactions; failed-card → same-session wallet recovers 90%+.",
      "AML/CFT pipeline must run uniformly across all rails. Per-wallet exceptions ('the wallet has its own KYC') create regulator-facing audit gaps that are hard to close after the fact.",
      "Wallet-partner relationships are an ongoing operating function, not a one-time integration. The quarterly partner alignment is what keeps the integration current as wallet partners change their own APIs.",
    ],
    whyItMatters:
      "This is relevant to any MENA or South Asia acceptance team trying to move beyond card-first assumptions. The durable work is the adapter layer, same-session fallback, wallet-partner cadence, reconciliation and uniform AML posture.",
    keywords: [
      "regional wallet integration",
      "Easypaisa JazzCash integration",
      "SADAD wallet acceptance",
      "STC Pay integration",
      "Mada wallet rail",
      "South Asia payment acceptance",
      "MENA wallet acceptance",
      "cross-rail fallback",
      "wallet routing engine",
      "regional fintech acceptance",
    ],
  },
  {
    slug: "pmo-risk-council-operating-model",
    engagement: "Independent consulting engagement · regional acquirer-processor (client confidential).",
    title:
      "PMO + Risk Council Operating Model: From Audit-Reactive To Forward-Looking In Two Quarters",
    tagline:
      "Built the joint PMO + Risk Council operating model for a regulated fintech, unified RAID + risk register, monthly council cadence, audit-evidence pipeline, moving the function from audit-reactive to forward-looking, with two regulator commendations and zero new findings across an 18-month cycle.",
    category: "Program Management",
    markets: ["UAE", "KSA", "Pakistan", "Bangladesh"],
    relevantFor: [
      "Regulated fintechs scaling governance",
      "Banks building integrated risk/programme governance",
      "Cross-border payment platforms",
      "Multi-jurisdiction fintechs",
      "VP Program Management / Risk hiring managers",
    ],
    metrics: [
      {
        label: "Council cadence",
        value: "Monthly + quarterly executive review",
      },
      {
        label: "Regulator findings cleared",
        value: "6 inherited → 0 open in 18 months",
      },
      {
        label: "Regulator commendations",
        value: "2 explicit commendations on governance",
      },
      {
        label: "RAID + risk integration",
        value: "Single register; programmes + risks cross-linked",
      },
      {
        label: "Audit-evidence response SLA",
        value: "< 24h for any regulator-facing inquiry",
      },
      {
        label: "Tier-1 programmes governed",
        value: "11 (scheme, regulator, audit, vendor)",
      },
    ],
    beforeAfter: [
      {
        metric: "Governance posture",
        before: "Audit-reactive, fix findings as they arrived",
        after: "Forward-looking, risk register drives programme prioritisation",
      },
      {
        metric: "PMO + Risk relationship",
        before: "Separate functions, separate registers, monthly conflict on prioritisation",
        after:
          "Joint operating model, unified register, monthly Risk Council resolves prioritisation",
      },
      {
        metric: "Regulator inquiry response",
        before: "5-10 days of internal scrambling per inquiry",
        after: "< 24h response time on routine inquiries; named owner per inquiry class",
      },
      {
        metric: "Audit observation count",
        before: "6 open findings inherited",
        after: "0 open findings; 2 commendations on governance evidence",
      },
    ],
    executiveSummary:
      "Built the joint PMO + Risk Council operating model for a regulated fintech operating across four markets, unified RAID + risk register, monthly Risk Council cadence, audit-evidence pipeline, programme prioritisation integrated with risk-tier assessment. Moved the function from audit-reactive (fix findings as they arrived) to forward-looking (risk register drives programme prioritisation). Cleared all 6 inherited regulator findings in 18 months, earned 2 explicit commendations on governance posture, and established the < 24h regulator-inquiry response SLA across the organisation. The model became the template for the parent organisation's subsequent fintech subsidiaries.",
    problem:
      "Inherited a fintech operating across four markets with 6 open regulator findings, a PMO function and a Risk function that operated as separate registers with separate cadences, and a senior team whose programme prioritisation was disconnected from the risk-tier reality. The PMO was tracking 11 tier-1 programmes; the Risk function was tracking 47 enterprise-level risks; the two views did not reconcile. Regulator inquiries arrived monthly across the four markets and routinely produced 5-10 day internal scrambles to assemble evidence. The CEO had received written supervisory letters from two of the four regulators in the prior year. The senior team needed a unified operating model that produced both faster regulator-inquiry response and forward-looking programme prioritisation tied to risk reality.",
    built: [
      "Joint operating model document: PMO + Risk Council decision rights, escalation paths, cadence, artefact ownership, signed by CEO, COO, CRO, CPO",
      "Unified RAID + risk register: every programme has a linked risk view; every enterprise risk has a linked programme view; reconciled weekly",
      "Monthly Risk Council: 90-minute cadence; standing membership (CEO, COO, CRO, CPO, Head of Compliance, Head of Audit, PMO Head); standing agenda (regulator landscape, top 5 enterprise risks, top 3 programmes in flight, decisions required)",
      "Audit-evidence pipeline: every programme produces audit evidence as a by-product; evidence is catalogued, queryable, owned, refreshed on a defined cadence",
      "Per-regulator inquiry response runbook: named owner per regulator, response template, evidence quick-pull, < 24h SLA",
      "Programme prioritisation tied to risk: top 5 enterprise risks always have a linked tier-1 programme; programme ranking weights risk tier alongside business value",
      "Regulator engagement calendar: every regulator's supervisory cycle, key milestones, expected inquiries, planned engagements mapped 12 months ahead",
      "Quarterly executive review: 3-hour deep dive on the governance posture, the regulator landscape, the year-ahead risk and programme outlook",
    ],
    architecture: [
      "The Risk Council is the senior decision-making body; PMO and Risk both report into it on cadence",
      "The unified register is one tool, programmes and risks are linked entities; queries can run across either axis",
      "Audit evidence is collected at programme execution time, not at audit time, every programme deliverable produces an audit-evidence artefact",
      "Per-regulator inquiry response is owned by named individuals at the Director level; the < 24h SLA includes the gathering of evidence and the drafting of the response",
      "Regulator-engagement calendar is published, refreshed monthly, used to schedule programme work that produces the evidence the next inquiry will need",
      "The CEO's monthly review with the four regulators uses Risk Council outputs as the substrate; not a separate pack",
    ],
    operatingModel: [
      "Weekly PMO + Risk standup: 60 minutes, reconciles the registers, surfaces escalations for the Risk Council",
      "Monthly Risk Council: 90 minutes, standing agenda, decisions logged with owner + date",
      "Quarterly Executive Risk Review: 3 hours, broader posture review with the executive team",
      "Annual Regulator Engagement Plan: published; updated quarterly with material changes",
      "Real-time alerting on regulator-supervisory events (letters, inquiries, on-site visits, market-wide circulars), triggers immediate Risk Council subgroup if material",
    ],
    role: "Owned the joint PMO + Risk Council operating model design and implementation. Built the joint operating-model document; designed the monthly council cadence; designed the unified register; designed the audit-evidence pipeline; designed the regulator-inquiry response runbook; coached the inherited PMO and Risk function leaders into the joint operating posture. Direct accountability for the governance-posture KPIs (findings closed, commendations earned, inquiry response time) and the cross-functional adoption of the operating model.",
    impact: [
      "Cleared all 6 inherited regulator findings within 18 months, zero open findings at the end of the cycle",
      "Earned 2 explicit regulator commendations on governance posture (UAE supervisory cycle, KSA)",
      "Established the < 24h regulator-inquiry response SLA across the four markets, and met it",
      "Reduced the executive team's monthly regulator-engagement preparation time by ~70%",
      "Lifted the programme prioritisation discipline, top-5 enterprise risks now consistently have linked tier-1 programmes",
      "Established the joint PMO + Risk Council operating model as the template for the parent organisation's subsequent fintech subsidiaries",
      "Closed two inherited audit observations on RAID + risk integration without external consulting support",
    ],
    tradeoffs: [
      "Insisted on the unified RAID + risk register over separate registers, required reorganising both functions' tooling and operating cadences; produced the governance leverage that two separate registers could not",
      "Built the audit-evidence pipeline as a programme-execution artefact rather than an audit-time artefact, heavier engineering and process discipline upfront; saved weeks of scrambling per inquiry",
      "Coached the PMO Head and the Head of Risk into co-ownership rather than restructuring the organisation, slower than a reorganisation would have been; preserved the relationships and produced the buy-in",
      "Insisted on monthly Risk Council cadence with full executive attendance, material executive time investment; produced the cross-functional alignment that less frequent cadence cannot achieve",
    ],
    lessons: [
      "PMO and Risk are functions, not registers. The artefact unification only works if the senior leaders of both functions agree to operate as one council; without that, the unified register becomes a tool nobody uses.",
      "Audit-evidence collection at programme execution time costs roughly 5% of programme effort; collecting it at audit time costs roughly 50%. The economics of doing it right are overwhelming.",
      "Regulator commendations are operational signals, not just symbolic ones. Regulators that commend an operator typically move that operator further down the supervisory-priority list, which compounds.",
      "The < 24h inquiry response SLA is achievable only when the evidence is already on the shelf. Building the inquiry-response runbook without building the underlying evidence pipeline produces a process that the team cannot meet.",
      "Forward-looking programme prioritisation is the test of the governance maturity. If the top 5 enterprise risks do not appear in the top 5 programmes, the organisation is running audit-reactive regardless of how strong the artefacts look.",
    ],
    whyItMatters:
      "The signal for senior programme roles is governance that changes operating behaviour: one register, one council rhythm, evidence produced during delivery and regulator inquiries answered from a maintained system rather than a scramble.",
    keywords: [
      "PMO Risk Council operating model",
      "joint PMO Risk governance",
      "audit-evidence pipeline",
      "regulator inquiry response",
      "fintech governance model",
      "enterprise risk programme integration",
      "forward-looking governance",
      "RAID risk register integration",
      "regulator commendation",
      "MENA fintech governance",
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
