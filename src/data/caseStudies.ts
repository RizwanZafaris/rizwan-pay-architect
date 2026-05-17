export type BeforeAfter = { metric: string; before: string; after: string };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  /** Markets the work touched — used for the index filter. */
  markets?: string[];
  /** Companies this case study is most relevant to — used for filters. */
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
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "simpaisa-payment-infrastructure",
    title: "Simpaisa Payment Infrastructure Platform",
    tagline:
      "A regulated, multi-rail payments platform processing $1B+ annual GTV and 25M+ monthly transactions across pay-in, payout, wallets (DCB/IBFT), card acquiring (MPGS/MDES), settlement, FX and cross-border corridors — PCI DSS and ISO/IEC 27001 certified.",
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
      { label: "Annual GTV", value: "$1B+" },
      { label: "Monthly transactions", value: "25M+" },
      { label: "Settlement SLA", value: "99.95%" },
      { label: "Fraud loss", value: "<0.1% GTV" },
      { label: "Downtime reduction", value: "−90%" },
      { label: "Enterprise wallet adoption", value: "30%" },
    ],
    executiveSummary:
      "Owned the product, architecture and operating model of a five-market payments platform serving global enterprises and local merchants. Took a fragmented integration estate and turned it into a single regulated rail with shared APIs, ledger, settlement and risk — through a CTO departure and a regulatory tightening.",
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
    architecture: [
      "Single pay-in/payout API surface — rails are an implementation detail behind a stable contract",
      "Canonical double-entry ledger; rails post events, settlement reads from the ledger",
      "Corridor abstraction with routing policy (cost, success rate, partner health)",
      "Risk service in-line: pre-auth, post-auth and async monitoring share one feature store",
      "Event-driven webhooks; idempotency, retries and DLQs are first-class",
    ],
    operatingModel: [
      "25+ person org across product, engineering, ops, risk and compliance",
      "Weekly rail health reviews — success rate, cost, latency, dispute rate per partner",
      "Joint risk + product council owning the risk taxonomy and false-positive budget",
      "Regulator-facing reporting pipeline owned by product, not finance",
    ],
    role: "Chief Product Officer (acting CTO during the 2024 regulatory tightening). Owned product strategy, roadmap, partner integrations, regulatory posture, security architecture and the org structure to ship and operate the platform end-to-end.",
    impact: [
      "Scaled to $1B+ annual GTV and 25M+ monthly transactions across 5 countries",
      "Onboarded enterprise platforms including TikTok, Uber, InDrive, Temu, PUBG and MoneyGram",
      "Held fraud loss below 0.1% of GTV; cut platform downtime by 90%",
      "Led PCI DSS and ISO/IEC 27001 certification programs from scratch",
      "Drove 30% enterprise wallet adoption and 99.95% settlement SLA",
    ],
    tradeoffs: [
      "Chose a single ledger over per-rail ledgers — slower to ship rail #1, much faster after rail #3",
      "Built risk in-house rather than fully outsourcing — higher ops cost, far lower false-positive rate",
      "Kept enterprise-grade onboarding for low-volume merchants — accepted some activation friction to preserve regulator posture",
    ],
    lessons: [
      "Payment infrastructure is a product problem, not a platform problem — orchestration, error states and retries decide the experience.",
      "In emerging markets, local payment methods determine acceptance more than card-network features.",
      "Compliance posture (PCI DSS, ISO 27001, AML/CFT) is a sales asset, not a cost line.",
    ],
    whyItMatters:
      "Visa, Mastercard, Stripe, Wise, Adyen, Thunes and DLocal need leaders who can stand up regulated multi-rail infrastructure across non-trivial markets and run it under regulator scrutiny. This is the full job — partner enablement, scheme readiness, settlement, risk, reporting — done at $1B+ GTV.",
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
      "Automated merchant onboarding pipeline — KYC/KYB, UBO discovery, sanctions and PEP screening, risk-tiered decisioning with full audit trail. Activation cut from weeks to hours; manual review load down 70%.",
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
      { label: "Activation", value: "Weeks → hours" },
      { label: "Manual review load", value: "−70%" },
      { label: "Approval accuracy", value: "Improved" },
      { label: "Markets standardized", value: "6" },
    ],
    executiveSummary:
      "Re-architected merchant activation as a single risk + product surface: capture, screening, tiering, pricing and ops review all driven by one configurable engine instead of seven manual workflows.",
    problem:
      "Manual KYC/KYB on regulated merchants was slow, inconsistent and the single biggest blocker to GTV growth — and a compliance risk.",
    built: [
      "Document capture, OCR and liveness verification flow",
      "Risk-tiered KYB pipeline with sanctions, PEP and adverse media screening",
      "Automated UBO discovery and corporate structure validation",
      "Configurable rules engine for jurisdiction-specific requirements",
      "Operations console with prioritized review queues and SLA tracking",
    ],
    architecture: [
      "Capture, screening and decisioning split into independent services with one shared case object",
      "Policy-as-config — jurisdiction rules versioned and audited per merchant decision",
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
      "Invested in capture quality before any policy automation — slower start, lower long-term review load",
      "Forced a single global schema with jurisdiction overlays rather than per-country forms",
    ],
    lessons: [
      "Onboarding conversion and risk are the same product surface — separating them creates leakage and false positives.",
      "Most KYB delays are document quality issues, not policy issues. Fix capture first.",
    ],
    whyItMatters:
      "Acquirers, PSPs and cross-border networks live or die on activation funnel and risk posture. This is the playbook the Visa/Stripe/Adyen onboarding orgs operate from.",
    keywords: ["KYC KYB automation", "merchant onboarding", "AML CFT", "fintech compliance"],
  },
  {
    slug: "settlement-reconciliation",
    title: "Settlement + Reconciliation Engine: 99.95% Accuracy at $1B+ GTV",
    tagline:
      "A multi-rail settlement and reconciliation engine — canonical double-entry ledger, three-way auto-reconciliation, exception management and corridor-aware payout windows. Closed the gap between treasury, finance and product at $1B+ GTV.",
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
      { label: "Reconciliation accuracy", value: "99.95%" },
      { label: "Settlement cycle", value: "T+0 / T+1" },
      { label: "Manual journals", value: "Eliminated (core flows)" },
      { label: "Rails", value: "Cards · wallets · IBFT · DCB · cross-border" },
    ],
    executiveSummary:
      "Replaced spreadsheet reconciliation across five rails with a canonical ledger, three-way auto-recon and an exception taxonomy that fed product. Made unit economics observable per rail, per corridor, per merchant.",
    problem:
      "Multi-rail flows across cards, wallets, IBFT, DCB and cross-border corridors created reconciliation breakage that finance and treasury were absorbing manually — slowing payouts and obscuring real margin.",
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
      "Built our own exception store rather than buying a recon tool — better feedback loop, more ownership",
    ],
    lessons: [
      "Settlement and reconciliation are not back-office problems — they decide trust with merchants and partners.",
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
      "Layered fraud, AML/CFT and sanctions decisioning built natively into the payments stack — vendor signals, device intelligence, internal velocity rules, SAR-ready audit trails. Fraud loss held <0.1% of GTV; fraud incidents down ~65%.",
    category: "Fraud & Risk",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen"],
    metrics: [
      { label: "Fraud loss", value: "<0.1% GTV" },
      { label: "Fraud incidents", value: "−65%" },
      { label: "Certifications", value: "PCI DSS · ISO 27001" },
    ],
    executiveSummary:
      "Treated risk as a product, not a vendor. Combined vendor signals, internal velocity rules and analyst feedback into one decisioning layer with SAR-ready audit trails — held loss rates below benchmark at $1B+ GTV.",
    problem:
      "Cross-border, wallet and DCB flows expose multiple fraud vectors — chargebacks, account takeover, mule activity, structuring and sanctions exposure — that no single off-the-shelf vendor covers.",
    built: [
      "Real-time decisioning layer combining vendor signals, device intelligence and internal velocity rules",
      "Case management for analysts with SAR-ready audit trails",
      "Transaction monitoring scenarios for AML/CFT, sanctions and PEP screening",
      "Chargeback and dispute automation tied to merchant risk tier",
    ],
    architecture: [
      "Pre-auth, post-auth and async monitoring share one feature store",
      "Decisions are explainable end-to-end (rule + signal + outcome)",
      "Analyst feedback writes back to features — every closed case improves the model",
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
      "AML/CFT scenarios decay — they need a feedback loop with analysts, not just a launch.",
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
      { label: "Corridors", value: "Multi-market" },
      { label: "Partners", value: "DLocal · Thunes · Boku · Coda · MoneyGram" },
      { label: "Routing", value: "Cost + success-rate aware" },
    ],
    executiveSummary:
      "Built a corridor abstraction over multiple PSPs and remittance partners so global merchants saw one API and one economic model — and routing, FX and compliance happened underneath.",
    problem:
      "Global merchants needed reliable, compliant pay-in and payout into Pakistan, Bangladesh, Nepal, Iraq and Egypt — and local merchants needed cross-border payouts and FX.",
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
      "Wise, Thunes, DLocal, Stripe Connect and Adyen for Platforms all sell some version of this. This is what shipping it actually looks like.",
    keywords: ["cross-border payments", "FX infrastructure", "remittance", "MENA fintech"],
  },
  {
    slug: "tapmad-wallet-billing-migration",
    title: "Tapmad Wallet/Billing Migration: 50% to 1%",
    tagline:
      "Migrated subscription billing off high-cost rails and rebuilt wallet/DCB flows — payment cost from 50% to 1%.",
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
      { label: "Payment cost", value: "50% → 1%" },
      { label: "Paid subscribers", value: "5M+" },
      { label: "ARPU", value: "+70%" },
      { label: "ARR", value: "$10M+" },
    ],
    executiveSummary:
      "Diagnosed unit economics as a payments problem, not a pricing problem. Rebuilt rail mix, retries and dunning around wallet/DCB economics — pulled payment cost from ~50% to ~1% of revenue while scaling to 5M+ paid subscribers.",
    problem:
      "Tapmad's subscription business was being eaten alive by payment cost — operator and aggregator margins consumed up to half of revenue, capping growth and ARPU.",
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
      "Built the multi-country payment operations spine for South Asia's largest marketplace — settlement, dispute resolution, fraud rule configuration, Alipay localisation, and the COD-to-digital conversion program across 5 markets.",
    category: "Payment Operations",
    markets: ["Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Myanmar"],
    relevantFor: ["Stripe", "Adyen", "Wise"],
    metrics: [
      { label: "COD share", value: "Reduced (program-led)" },
      { label: "Dispute resolution", value: "Faster cycle time" },
      { label: "Markets", value: "5 (PK · BD · LK · NP · MM)" },
    ],
    executiveSummary:
      "Stood up payment operations across five markets at Alibaba scale during a COVID volume surge, then ran the COD-to-digital migration as an incentives + trust program rather than a checkout change.",
    problem:
      "Marketplace payments were dominated by COD with painful settlement, dispute and fraud workflows — limiting margin, working capital and digital growth.",
    built: [
      "Settlement and dispute workflows for sellers and logistics partners",
      "Fraud rules tuned per category, geography and seller cohort",
      "Incentive design to migrate buyers from COD to digital wallets and cards",
      "Operational dashboards across pay-in, refund and settlement",
    ],
    role: "Led payment operations and the COD-to-digital conversion program across multiple markets.",
    impact: [
      "Reduced COD share and improved working capital through incentive design and trust-building",
      "Cut settlement disputes and fraud loss",
      "Made payments a measured, owned surface inside the marketplace",
    ],
    lessons: [
      "COD is a product debt, not a customer preference. Incentives and trust shift it.",
      "Sellers experience payments through settlement, not checkout.",
    ],
    whyItMatters:
      "Marketplace and platform payments orgs at Stripe, Adyen for Platforms and Wise Business operate exactly this surface.",
    keywords: [
      "payment operations",
      "COD to digital",
      "marketplace payments",
      "South Asia fintech",
    ],
  },
  {
    slug: "tapmad-digital-transformation-programme",
    title: "TapmadTV $3M Digital Transformation Programme",
    tagline:
      "Led a $3M programme launching Pakistan's first licensed OTT platform — 5 tech workstreams (iOS, Android, web, CMS, CDN), 25-person team, 8 international vendors, PMBOK + Agile hybrid governance.",
    category: "Program Management",
    markets: ["Pakistan"],
    relevantFor: ["Banks", "Sponsor banks", "Telcos", "Fintech transformation teams"],
    metrics: [
      { label: "Programme value", value: "$3M" },
      { label: "Workstreams", value: "5 (iOS · Android · Web · CMS · CDN)" },
      { label: "Team", value: "25 people" },
      { label: "Vendors", value: "8 international" },
      { label: "Launch", value: "On schedule" },
    ],
    executiveSummary:
      "Built the PMO from scratch and ran governance for Pakistan's first licensed OTT platform — risk register, RAID logs, milestone tracking, SteerCo reporting and stage-gated capital project delivery — landed on schedule across 5 technology workstreams.",
    problem:
      "A first-of-its-kind regulated OTT launch in Pakistan: no internal PMO, 8 international vendors with different delivery cultures, 5 parallel technology workstreams, content-rights obligations, and a regulator-facing launch deadline with no slip room.",
    built: [
      "PMO operating model — risk register, RAID logs, decision logs, milestone tracking",
      "PMBOK-based stage gates for capital project workstreams (CDN, CMS infrastructure)",
      "Agile delivery cadence for iOS, Android and web product workstreams",
      "Vendor governance: SLAs, escalation paths, joint planning ceremonies",
      "SteerCo with monthly board reporting; weekly programme reviews",
      "Content-rights and regulator-facing compliance tracking",
    ],
    architecture: [
      "Programme broken into 5 workstreams with named workstream leads + RACI",
      "RAID register as the single source of truth — no parallel risk lists",
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
      "Hybrid PMBOK + Agile model added overhead — accepted because the regulator-facing capital workstreams needed gate evidence",
      "Centralised vendor escalations through PMO — slowed minor decisions, prevented vendor-on-vendor finger-pointing",
    ],
    lessons: [
      "First-of-kind regulated launches do not survive a pure-Agile PMO — capital workstreams need stage gates with auditable evidence.",
      "Vendor governance is the highest-leverage PMO surface. Joint rituals beat written SLAs every time.",
      "RAID is only useful if every entry has an owner, a date and a decision path. Otherwise it is a log, not a register.",
    ],
    whyItMatters:
      "Banks, regulated fintechs and central-bank-licensed platforms run programmes that look exactly like this — capital workstreams, vendor stacks, regulator-facing launch dates, hybrid governance. This is the operating model that ships them.",
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
    title: "Production GenAI Suite at Simpaisa — 4 Deployments in Regulated Payments",
    tagline:
      "Identified, value-modeled and deployed 4 production GenAI solutions across merchant integration support, incident auto-escalation, partner support automation, and a fraud/AML AI pilot with a major banking partner.",
    category: "AI in Fintech",
    markets: ["UAE", "Pakistan", "Bangladesh", "Nepal", "Iraq", "Egypt"],
    relevantFor: ["Visa", "Mastercard", "Stripe", "Adyen", "Sponsor banks", "PSPs"],
    metrics: [
      { label: "AI solutions in production", value: "4" },
      { label: "Merchant support time", value: "−65%" },
      { label: "Incident response MTTR", value: "−70%" },
      { label: "Partner queries auto-resolved", value: "90%" },
      { label: "Projected manual-review reduction", value: "−40% (pilot)" },
      { label: "Use cases evaluated", value: "20+" },
    ],
    executiveSummary:
      "Ran GenAI use-case identification across the organisation, evaluated 20+ candidates with value modeling (ROI / feasibility / data readiness), and shipped four production deployments. Built the governance posture so AI runs alongside PCI DSS, ISO 27001 and AML/CFT controls — not despite them.",
    problem:
      "Payments organisations are flooded with low-leverage AI demos. The real questions are which use cases survive the regulatory frame, which have data and feedback loops in place, and which produce auditable, explainable behaviour in production. Without a value-modeling discipline, AI becomes a procurement exercise instead of a product surface.",
    built: [
      "AI Merchant Integration Chatbot (Slack + Telegram) — RAG over API docs, error catalogue and integration playbooks. Cuts merchant integration support time by 65%.",
      "Intelligent System Monitoring & Auto-Escalation Bot — detects payment error spikes, runs log analysis, identifies root cause, auto-escalates with full diagnostics. −70% MTTR.",
      "AI Partner Support Automation — handles 90% of merchant payment queries (settlement, disputes, decline codes, integration) without human intervention.",
      "Fraud Detection & AML Pilot — active pilot with a major banking partner; value model projects 40% reduction in manual review queues.",
      "Use-case identification + value-modeling framework — ROI, feasibility, data readiness, regulatory risk per candidate.",
    ],
    architecture: [
      "RAG-first for any LLM surface that touches merchant/partner instructions — citations always shown",
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
    role: "Led GenAI strategy end-to-end at Simpaisa — use-case identification, value modeling, vendor selection, regulator briefings, build/buy decisions, deployment governance and post-launch measurement.",
    impact: [
      "4 production AI deployments live; one banking pilot in flight",
      "Merchant integration support time −65%, MTTR −70%, 90% partner queries auto-resolved",
      "Established the AI use-case discipline (ROI / feasibility / data readiness / regulatory risk) used quarterly",
      "Briefed regulators on Simpaisa's AI posture for licence reviews",
    ],
    tradeoffs: [
      "Chose RAG + open-source LLMs over closed APIs for the most sensitive merchant-facing surfaces — slower iteration, lower data-egress risk",
      "Built our own value-modeling framework rather than adopting a vendor scorecard — better fit, more upfront effort",
    ],
    lessons: [
      "Most AI value in payments today is in operations and integration support, not in the customer-facing UI.",
      "Auditable behaviour beats raw model performance. A 92% model with full citations is better than a 96% model that can't explain itself.",
      "The fraud/AML use case has the highest stated ROI and the longest validation timeline. Plan for that.",
    ],
    whyItMatters:
      "Every payments network, PSP, BaaS and regulated fintech is running this exact play in 2026. The operating model — use-case identification, value modeling, regulator-aware deployment, human-in-the-loop fallback — is the work, not the model choice.",
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
      "Launched Simpaisa's BNPL product from scratch — full underwriting, repayment flows, collections, regulator briefings — to 100K users in 8 months through iterative agile discovery.",
    category: "Product Strategy",
    markets: ["Pakistan", "UAE"],
    relevantFor: ["Tabby", "Tamara", "Stripe", "Adyen", "Visa", "Mastercard", "BaaS providers"],
    beforeAfter: [
      { metric: "Active users", before: "0", after: "100K (8 months)" },
      { metric: "Time-to-first-product", before: "n/a", after: "Discovery → live in 14 weeks" },
      { metric: "Default rate", before: "n/a", after: "Within target band" },
    ],
    metrics: [
      { label: "Active users", value: "0 → 100K" },
      { label: "Launch time", value: "8 months" },
      { label: "Discovery → live", value: "14 weeks" },
      { label: "Markets", value: "Pakistan (launch), UAE (planned)" },
    ],
    executiveSummary:
      "Took BNPL from product concept to 100K active users in 8 months. Built the full stack — eligibility, underwriting, repayment, dunning, collections, regulatory posture, and the consumer UX — using rapid agile discovery cycles and a tight feedback loop with credit and risk.",
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
      "Launched with bureau data only where available, alt-data scoring elsewhere — slower onboarding in low-data segments, but no skipped underwriting",
      "Built dunning + collections in-house instead of outsourcing — higher ops cost early, much tighter feedback into the credit model",
    ],
    lessons: [
      "BNPL is a credit product first, a checkout product second. Treating it as the latter is how funds get burnt.",
      "Cohort discipline is the difference between scale and a blowup. Track every cohort to maturity; do not average them.",
      "Regulator engagement should start before discovery, not after — especially in markets with developing consumer-credit law.",
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
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
