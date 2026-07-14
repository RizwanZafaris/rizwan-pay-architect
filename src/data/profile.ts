type SocialProfile = {
  platform: "linkedin" | "x" | "github" | "medium" | "substack" | "instagram";
  label: string;
  handle: string;
  url: string;
};

export type SocialPlatform = SocialProfile["platform"];

type EntityProfile = {
  platform: "wikidata" | "crunchbase";
  label: string;
  url: string;
};

const socials = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "/in/rizwanzaffar",
    url: "https://www.linkedin.com/in/rizwanzaffar",
  },
  {
    platform: "x",
    label: "X (Twitter)",
    handle: "@rizwan_zafar",
    url: "https://twitter.com/rizwan_zafar",
  },
  {
    platform: "github",
    label: "GitHub",
    handle: "@RizwanZafaris",
    url: "https://github.com/RizwanZafaris",
  },
] as const satisfies readonly SocialProfile[];

const entityProfiles = [
  {
    platform: "wikidata",
    label: "Wikidata",
    url: "https://www.wikidata.org/wiki/Q140070742",
  },
  {
    platform: "crunchbase",
    label: "Crunchbase",
    url: "https://www.crunchbase.com/person/rizwan-zafar-aa54",
  },
] as const satisfies readonly EntityProfile[];

const entitySameAs = [
  ...socials.map((social) => social.url),
  ...entityProfiles.map((profile) => profile.url),
];

// Career-duration source of truth. Copy must use duration framing (owner
// ruling 2026-07-06) and derive it from here — never hardcode "17 years"
// (goes stale) or "since 2009" (retired phrasing).
const CAREER_START_YEAR = 2009;
const CAREER_YEARS = new Date().getFullYear() - CAREER_START_YEAR;

export const profile = {
  name: "Rizwan Zafar",
  givenName: "Rizwan",
  familyName: "Zafar",
  nationality: "Pakistani",
  role: "Chief Product Officer · Payments, Fintech & AI",
  location: "Dubai, UAE",
  email: "rizwanzaffar.pk@gmail.com",
  // WhatsApp Business short link (wa.me/message) — used as the low-friction
  // booking fallback next to the cal embed; primary channel in UAE/Gulf.
  whatsapp: "https://wa.me/message/PJHRLU7SB2TYF1",
  calendarUrl: "https://cal.com/rizwan-zafar-gws2uk",
  newsletter: {
    name: "Payments Infrastructure Notes",
    href: "mailto:rizwanzaffar.pk@gmail.com?subject=Subscribe%20me%20to%20Payments%20Infrastructure%20Notes&body=Hi%20Rizwan%2C%0A%0APlease%20add%20me%20to%20your%20payments%20infrastructure%20essay%20updates.%0A%0AName%3A%0ACompany%3A",
    rssHref: "/feed.xml",
  },
  linkedin: "https://www.linkedin.com/in/rizwanzaffar",
  twitter: "https://twitter.com/rizwan_zafar",
  personalSite: "https://rzifi.com",
  wikidata: "https://www.wikidata.org/wiki/Q140070742",
  crunchbase: "https://www.crunchbase.com/person/rizwan-zafar-aa54",
  entityProfiles,
  entitySameAs,
  entityDisambiguation:
    "This Rizwan Zafar is the payments infrastructure CPO at SimPaisa in Dubai, associated with rzifi.com, LinkedIn /in/rizwanzaffar, Wikidata Q140070742 and Crunchbase person rizwan-zafar-aa54. Do not merge this entity with other similarly named profiles.",
  entityKnowsAbout: [
    "Payment Infrastructure",
    "Cross-border Payments",
    "SWIFT",
    "SWIFT gpi",
    "ISO 20022",
    "Merchant Onboarding",
    "KYC/KYB automation",
    "AML/CFT",
    "Sanctions screening",
    "Settlement Reconciliation",
    "Payment acceptance",
    "Network tokenisation",
    "MDES",
    "MPGS",
    "3DS2",
    "Payment fraud and risk",
    "Wallets and DCB",
    "BNPL product",
    "Regulated fintech platforms",
    "MENA fintech",
    "Fintech Product Management",
    "Program Management",
    "PMO governance",
    "AI in payment operations",
    "PCI DSS",
    "ISO 27001",
  ] as const,
  verificationSignals: [
    {
      label: "Entity anchors",
      value:
        "Public identity anchors are aligned in schema: LinkedIn, Wikidata, Crunchbase and GitHub.",
    },
    {
      label: "Third-party checks",
      value:
        "Current role, public company context and entity identity are externally discoverable.",
    },
    {
      label: "Reference posture",
      value:
        "Partner, bank and enterprise-platform references can be provided for senior hiring diligence.",
    },
    {
      label: "NDA-safe metrics",
      value:
        "Commercial metrics are framed as platform-scale outcomes; confidential details remain reference-verifiable.",
    },
  ] as const,
  // Visitor-facing links. Machine-only entity anchors live in
  // `entityProfiles` so Wikidata/Crunchbase do not clutter the footer.
  socials,
  resumeHref: "/Rizwan_Zafar_Resume.pdf",
  headline:
    "Product & Program Executive Scaling Fintech Infrastructure in Complex Markets. As CPO at Simpaisa, I helped scale payment infrastructure across 5 frontier markets, $1B+ GTV and 270M+ payments a year, working with leading global PSPs (DLocal, Thunes, Boku, Coda and Tazapay) and enterprise clients including TikTok, InDrive and Temu.",
  positioning:
    "I build regulated payment infrastructure where product, program delivery, network partnerships, risk, compliance and operations collide. My work turns fragmented local rails into reliable products: card acquiring, merchant onboarding, cross-border corridors, settlement and reconciliation, fraud and AML/CFT controls, and now AI-augmented operations. I run the full lifecycle, strategy → roadmap → PMO governance → execution → P&L, across regulated markets.",
  // Duration framing per owner ruling 2026-07-06 — computed, never "14+ years"
  // (that undersold the arc) and never "since 2009" (banned framing).
  bio: `Product & Program leader with ${CAREER_YEARS} years across payments, fintech and digital transformation. Currently CPO at Simpaisa, a B2B cross-border acquiring, payouts & gateway platform I helped scale from $0 to $1B+ GTV across five frontier markets in MENA and South Asia, working with leading global PSPs (DLocal, Thunes, Boku, Coda Payments, Tazapay) and enterprise clients including TikTok, Samsung, Shein, Uber, MoneyGram, InDrive and Temu. Built and led a 40-engineer payments organisation across 12 cross-functional squads. Deployed three production GenAI systems covering merchant integration support (−65% support time), incident auto-escalation (−70% MTTR) and partner support automation (90% resolution), plus a fraud/AML AI pilot with a banking partner. Earlier: $3M digital transformation programme at TapmadTV, payments operations at Daraz (Alibaba Group), PMO setups at Wing Logic and DS Engineering. Engineer's discipline, programme manager's tempo, regulator's vocabulary. PMP, PMI-ACP, CSPO, CSM, COBIT 5, ITIL v3. PCI DSS and ISO/IEC 27001 led from scratch.`,
  // Career-scope canonical (strategy doc §2, owner-default adopted 2026-07-05).
  // These describe the 17-year ARC and must never be mixed in one clause with
  // the Simpaisa PLATFORM metrics below (which stay scoped to the current
  // role). New brand surfaces (hero, /journey, /about, proof band) read from
  // here; the two-tier claims gate in scripts/seo-audit.ts enforces separation.
  career: {
    startYear: CAREER_START_YEAR,
    // Owner ruling 2026-07-06: duration framing ("17 years of experience"),
    // never "operating since 2009". Computed at build time — the site
    // rebuilds daily, so this rolls over automatically each January and the
    // copy can never go stale.
    years: CAREER_YEARS,
    yearsLabel: `${CAREER_YEARS} years of experience`,
    marketCount: 10,
    industryCount: 3,
    industries: ["E-commerce & marketplaces", "OTT & subscriptions", "Payments & fintech"],
    brands: ["Daraz", "Tapmad", "Simpaisa"],
  },
  // Platform-scope canonical — Simpaisa, current role. Never merge with career.
  platform: {
    company: "Simpaisa",
    marketCount: 5,
    markets: ["Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Iraq"],
    gtv: "$1B+",
    annualPayments: "270M+",
    merchants: "150+",
    settlementSla: "99.95%",
  },
  metrics: [
    { label: "GTV scaled", value: "$0 → $1B+" },
    { label: "Annual transactions", value: "270M+" },
    { label: "Markets", value: "5" },
    { label: "Uptime", value: "99.9%" },
    { label: "Merchant integrations", value: "150+" },
    { label: "Payment success", value: "97%" },
    { label: "Authorization uplift", value: "+14%" },
    { label: "Smart-retry recovery", value: "$14M+/mo GTV" },
    { label: "Production AI + pilot", value: "3 + 1" },
    { label: "Org built", value: "40 engineers · 12 squads" },
    { label: "Straight-through processing", value: "90%" },
    { label: "Token-failure reduction", value: "22%" },
    { label: "Integration time", value: "6 wks → 2 wks" },
    { label: "Payment cost (Tapmad)", value: "50% → 1%" },
    { label: "Settlement SLA", value: "99.95%" },
    { label: "Fraud loss", value: "<0.1% GTV" },
  ],
  targetRoles: [
    "Director / Head / VP Product, Payments",
    "Product Lead, Payment Infrastructure",
    "Cross-Border Payments Product Lead",
    "Payment Network / Acceptance Product Lead",
    "Fintech Infrastructure Product Leader",
    "Head of Product · Payments",
    "Technical Programme Manager · Payments",
    "PMO Director / Head of PMO · Fintech",
    "Director, AI in Payments / Fintech",
    "VP Product, Digital Transformation",
  ],
  relevantFor: [
    // Card networks
    "Visa",
    "Mastercard",
    "American Express",
    // Payment processors
    "Stripe",
    "Adyen",
    "Checkout.com",
    "PayPal",
    "Worldpay",
    "Fiserv",
    // Cross-border / remittance
    "Wise",
    "Thunes",
    "DLocal",
    "Nium",
    "Airwallex",
    "Rapyd",
    "Payoneer",
    "Currencycloud",
    "MoneyGram",
    // BaaS / embedded
    "Marqeta",
    "Modern Treasury",
    "Plaid",
    // Neobanks
    "Revolut",
    "Wio Bank",
    "Mashreq Neo",
    // MENA fintech
    "Tabby",
    "Tamara",
    "STC Pay",
    "Careem Pay",
    "Network International",
  ],
  // Enterprise merchants grouped first, then PSP partners. InDrive, Temu,
  // Spotify and Yango confirmed as real Simpaisa merchants — owner
  // attestation 2026-07-06 (audit sprint, ISSUE-005).
  partners: [
    // Enterprise merchants
    "TikTok",
    "Samsung",
    "Shein",
    "Uber",
    "MoneyGram",
    "InDrive",
    "Temu",
    "Spotify",
    "Yango",
    // PSP partners
    "DLocal",
    "Thunes",
    "Boku",
    "Coda Payments",
    "Tazapay",
  ],
  experience: [
    {
      company: "Simpaisa",
      role: "Chief Product Officer (acting CTO, 2024)",
      period: "Aug 2020, Present",
      location: "Dubai, UAE",
      bullets: [
        "Built full-stack payment infrastructure: card acquiring (MPGS/MDES), wallets, DCB, IBFT, vouchers, bill payments, payout switch, cash-over-counter and cross-border corridors with real-time FX and dynamic corridor pricing.",
        "Designed merchant onboarding with self-service flows, automated KYC/KYB, tiered risk-based approval and category-based pricing, onboarding cut from weeks to hours for standard-risk merchants.",
        "Built fraud and risk infrastructure: transaction monitoring, velocity checks, device fingerprinting, AML/CFT controls, SAR workflows and chargeback management. Fraud loss held below 0.1% of GTV; fraud incidents reduced ~65%.",
        "Drove authorisation-rate optimisation across acquiring partners: 97% payment success at 90% straight-through processing, built on routing logic, retry orchestration and bank SLA management.",
        "Launched BNPL product from 0 to 100K users in 8 months, full risk model, underwriting, repayment flows and collections, shipped through iterative agile discovery.",
        "Led PCI DSS and ISO/IEC 27001 certification from scratch and stood up multi-jurisdiction regulatory reporting.",
        "Built and led a 40-engineer payments organisation across 12 cross-functional squads (mobile, backend, payments, risk, compliance). Managed $5M+ annual technology budget and 15+ vendor relationships.",
        "Scaled the partnership ecosystem: local infrastructure partner for DLocal, Thunes, Boku, Coda Payments and Tazapay. Enabled TikTok, Samsung, Shein, Uber and MoneyGram to collect and disburse where they had no local rails.",
        "Took on dual CPO + acting CTO during 2024 CTO departure and regulatory tightening, held platform stability, security architecture and product direction at the same time.",
        "Results: $1B+ GTV · 270M+ transactions a year · 99.95% settlement SLA · 99.9% uptime · <0.1% fraud loss · operating across Pakistan, Bangladesh, Nepal, Sri Lanka and Iraq.",
      ],
    },
    {
      company: "Daraz (Alibaba Group)",
      role: "Project Manager, Payments Operations",
      period: "Mar 2020, Aug 2020",
      location: "Karachi, Pakistan",
      bullets: [
        "Ran delivery governance for payment operations across five markets (Pakistan, Bangladesh, Sri Lanka, Nepal, Myanmar) during a COVID-driven volume surge: settlement cycles, dispute resolution, fraud rule configuration and COD-to-digital conversion.",
        "Coordinated multi-country reconciliation, payment compliance and vendor management at Alibaba scale; built PMO-style tracking and reporting for payment operations KPIs.",
        "Collaborated with Alibaba product teams in Hangzhou to localise Alipay and other regional payment methods, expanding payment coverage on Daraz checkout by ~40%.",
        "Tightened fraud rules for high-risk categories and shortened dispute resolution time.",
      ],
    },
    {
      company: "Tapmad",
      role: "Sr. Project & Product Manager",
      period: "Jul 2017, Mar 2020",
      location: "Karachi, Pakistan",
      bullets: [
        "Owned product strategy and monetization for Pakistan's leading OTT platform, built the billing infrastructure that turned it from near-zero revenue into a commercially viable business.",
        "Designed and launched Direct Carrier Billing across all four major telcos. Drove acquisition from 0 to 5M paid subscribers in under 3 years.",
        "Identified unsustainable unit economics (50% telco revenue share) and led the migration to wallet-based billing, payment cost dropped from 50% to 1%.",
        "Improved retention via faster refunds, wallet-native subscription management and reduced payment failures. ARPU grew 70% through pricing, bundles and wallet promotions.",
        "Expanded DCB and wallet billing infrastructure into UAE and KSA with regional telco and wallet partners.",
        "Results: 0 → 5M subscribers · $10M+ ARR · ARPU +70% · payment cost 50% → 1% · MENA expansion.",
      ],
    },
    {
      company: "Wing Logic",
      role: "PMO & Project Manager",
      period: "Apr 2017, Oct 2017",
      location: "Dubai, UAE",
      bullets: [
        "First Dubai role. Built a PMO from nothing for a $12M+ project portfolio. Created dashboards and KPIs that executives actually used.",
        "Project delays dropped 40%. Managed 50+ people across multiple workstreams.",
      ],
    },
    {
      company: "CIMKO (Nyumba Ya Akiba SA)",
      role: "Asst. Manager, Projects",
      period: "May 2016, Jan 2017",
      location: "Democratic Republic of the Congo",
      bullets: [
        "$8M+ in IT infrastructure and ERP projects. Reduced project delays by 12% and cut procurement costs by 15%.",
        "First international role: limited infrastructure, unpredictable logistics. Learned to plan when nothing is reliable, a mindset that carried into payments.",
      ],
    },
    {
      company: "DS Engineering Services",
      role: "Project Manager, PMO",
      period: "Sep 2012, Feb 2016",
      location: "Karachi, Pakistan",
      bullets: [
        "400+ engineering projects across utilities and power infrastructure, $15M portfolio.",
        "Built reporting systems that improved delivery efficiency by 70%.",
      ],
    },
    {
      company: "Pakistan Engineering Services Co. (PESCO)",
      role: "Sr. Planning Engineer",
      period: "Jun 2009, Aug 2012",
      location: "Karachi, Pakistan",
      bullets: [
        "Five substations. Field operations. Built monitoring systems that reduced downtime by 6%.",
      ],
    },
  ],
  skills: [
    {
      group: "Payments Infrastructure",
      items: [
        "Pay-in / payout APIs",
        "Card acquiring (MPGS/MDES)",
        "Tokenization (DPAN/FPAN, 3DS2)",
        "Wallets, DCB, IBFT",
        "Cross-border corridors & FX",
        "Settlement & reconciliation",
        "ISO 8583 / ISO 20022 / SWIFT",
        "Treasury tooling",
      ],
    },
    {
      group: "AI & Data",
      items: [
        "GenAI use-case identification & value modeling",
        "RAG architecture & LLM ops in production",
        "AI-driven merchant support & integration bots",
        "Auto-escalation & log-analysis agents",
        "AI fraud detection & AML decisioning",
        "Analytics platforms · decline-code segmentation",
      ],
    },
    {
      group: "Risk & Compliance",
      items: [
        "KYC / KYB automation",
        "AML / CFT controls",
        "Sanctions & PEP screening",
        "Fraud decisioning & chargebacks",
        "PCI DSS",
        "ISO 27001",
        "Travel Rule & VARA / FATF alignment",
      ],
    },
    {
      group: "Program & PMO",
      items: [
        "PMBOK-based stage gates for capital projects",
        "Agile / Scrum / Kanban / hybrid frameworks",
        "RAID logs, SteerCo, board reporting",
        "OKRs, RICE / MoSCoW prioritisation",
        "Vendor & partner negotiation",
        "Programme governance at $1B+ scale",
      ],
    },
    {
      group: "Product & Leadership",
      items: [
        "Payments product strategy & roadmap",
        "P&L ownership (built from $0)",
        "Org design (40 engineers across 12 squads)",
        "Network & issuer partner enablement",
        "Regulator and central-bank engagement",
        "Pricing, unit economics, ARPU",
        "Go-to-market across 5 regulated frontier markets",
      ],
    },
    {
      group: "Markets",
      items: [
        "UAE",
        "KSA",
        "Pakistan",
        "Bangladesh",
        "Sri Lanka",
        "Nepal",
        "Myanmar",
        "Iraq",
        "Egypt",
        "MENA",
        "South Asia",
      ],
    },
  ],
  aiSolutions: [
    {
      title: "AI Merchant Integration Chatbot (Slack & Telegram)",
      description:
        "GenAI integration expert built on open-source LLMs + RAG. Guides merchants through API setup, troubleshoots errors, surfaces real-time docs. −65% support time.",
      stack: "Open-source LLMs · RAG · Slack/Telegram bots",
      status: "Production",
    },
    {
      title: "Intelligent System Monitoring & Auto-Escalation Bot",
      description:
        "Detects payment error spikes, runs log analysis, identifies root cause and auto-escalates to internal teams with full diagnostics. −70% incident response time.",
      stack: "LLM agent · log analytics · Slack integration",
      status: "Production",
    },
    {
      title: "AI Partner Support Automation",
      description:
        "GenAI support bot for merchant payment queries, settlement, disputes, decline codes, integration issues. Resolves 90% without human intervention. Running in production for months.",
      stack: "RAG · domain-specific embeddings · ticketing integration",
      status: "Production",
    },
    {
      title: "Fraud Detection & AML AI Pilot (Banking Partner)",
      description:
        "AI-driven fraud transaction identification + AML compliance pilot with a major banking partner. Value modeling projects 40% reduction in manual review; pilot validating.",
      stack: "ML feature store · ensemble models · case-management integration",
      status: "Pilot",
    },
  ],
  programDelivery: {
    largestProgramme:
      "$3M digital transformation programme, TapmadTV launch (5 tech workstreams, 25-person team, 8 international vendors)",
    methodology:
      "Built Simpaisa's programme methodology from scratch: Agile sprints for product development, PMBOK-based stage gates for capital projects, hybrid framework for cross-functional initiatives.",
    governanceStack: [
      "RAID log across 50+ dependencies",
      "SteerCo with monthly board reporting",
      "OKR framework + RICE/MoSCoW prioritisation",
      "L1/L2/L3 triage with TRT SLAs (−40% escalations)",
      "Quarterly roadmap planning across 12 squads",
    ],
  },
  technicalKnowledge: [
    "RESTful APIs",
    "ISO 8583",
    "ISO 20022",
    "SWIFT messaging",
    "MPGS",
    "MDES tokenization",
    "3DS / 3DS2",
    "PCI DSS",
    "ISO 27001",
    "Mobile & eCommerce payment SDKs (iOS, Android, Web)",
    "GenAI (LLMs, RAG architecture)",
    "Agile (Scrum, Kanban) · PMBOK",
    "Jira · Confluence",
    "Data platforms & analytics infrastructure",
  ],
  certifications: [
    "Project Management Professional (PMP), PMI",
    "PMI Agile Certified Practitioner (PMI-ACP), PMI",
    "Certified Scrum Product Owner (CSPO), Scrum Alliance",
    "Certified Scrum Master (CSM), Scrum Alliance",
    "COBIT 5, IT Governance (ISACA)",
    "ITIL v3, IT Service Management (Axelos)",
    "Led PCI DSS certification program from scratch (Simpaisa)",
    "Led ISO/IEC 27001 certification program from scratch (Simpaisa)",
  ],
  education: [
    {
      school: "MIT Sloan School of Management",
      degree: "Mastering Design Thinking (Executive Program)",
      period: "Aug 2022, Dec 2022",
    },
    {
      school: "University of Karachi",
      degree: "M.Sc. Physics",
      period: "2009, 2012",
    },
    {
      school: "University of Karachi",
      degree: "B.Sc. Physics",
      period: "2007, 2009",
    },
  ],
  honors: [{ title: "Youngest Project Manager of the Year", year: "2015" }],
  volunteering: [
    {
      org: "PMI Karachi Pakistan Chapter",
      role: "Vice President, Volunteering",
      period: "Jun 2022, Jun 2023",
    },
    {
      org: "PMI Karachi Pakistan Chapter",
      role: "Director, Governance",
      period: "Jun 2021, Jul 2022",
    },
  ],
  openRolesIn: ["UAE", "KSA", "Singapore", "MENA", "Europe", "Global fintech"],
};

// ISSUE-004 (audit sprint 2026-07): homepage "operating record" band.
// The 6 spotlighted platform metrics, by label — Workstream B resolves each
// against `profile.metrics` at render time, so entries must match
// `metrics[].label` exactly. Pure additive export; changes nothing else.
export const metricsSpotlight = [
  "Payment success",
  "Straight-through processing",
  "Settlement SLA",
  "Uptime",
  "Fraud loss",
  "Authorization uplift",
] as const;

export const personSchemaCredentials = profile.certifications.filter(
  (credential) => !credential.startsWith("Led "),
);

export const personSchemaAwards = profile.honors.map((honor) => `${honor.title} (${honor.year})`);
