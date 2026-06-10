#!/usr/bin/env bun
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type ClusterSeed = {
  file: string;
  prefix: string;
  cluster: string;
  audience: string;
  baseTopics: string[];
  lenses: string[];
  keywords: string[];
  links: string[];
};

const OUT_DIR = "content/seo-backlog";

const clusters: ClusterSeed[] = [
  {
    file: "payment-infrastructure-100.json",
    prefix: "PI",
    cluster: "Payment Infrastructure, Card Networks and Payment APIs",
    audience:
      "Payment product leaders, acquirer PMs, PSP architects and Visa/Mastercard recruiters",
    baseTopics: [
      "MPGS architecture",
      "CyberSource architecture",
      "MDES network tokenisation",
      "Visa Token Service",
      "3DS2 step-up logic",
      "Click to Pay",
      "hosted checkout vs direct API",
      "payment orchestration",
      "local payment methods",
      "wallet acceptance",
      "direct carrier billing",
      "webhook reliability",
      "idempotency in payment APIs",
      "payment retry logic",
      "gateway reconciliation",
      "multi-acquirer routing",
      "authorization rate optimisation",
      "scheme certification",
      "card-on-file lifecycle",
      "refund architecture",
    ],
    lenses: [
      "architecture guide",
      "implementation checklist",
      "product requirements",
      "failure modes",
      "vendor evaluation",
    ],
    keywords: ["payment infrastructure", "payment gateway", "payment API", "card acquiring"],
    links: [
      "/topics/payment-infrastructure",
      "/blog/hosted-checkout-vs-direct-card-processing",
      "/blog/payment-infrastructure-state-trust-failure",
      "/product-work/simpaisa-payment-infrastructure",
    ],
  },
  {
    file: "cross-border-emerging-markets-100.json",
    prefix: "CB",
    cluster: "Cross-Border Payments, SWIFT, ISO 20022 and Emerging Markets",
    audience:
      "Cross-border PMs, bank digital leaders, corridor operators and MENA/South Asia fintech teams",
    baseTopics: [
      "SWIFT gpi tracking",
      "ISO 20022 migration",
      "MT to MX coexistence",
      "correspondent banking",
      "nostro vostro operations",
      "FX margin transparency",
      "cross-border payout corridors",
      "last-mile wallet payouts",
      "stablecoin settlement",
      "Travel Rule operations",
      "UAE payment corridors",
      "KSA fintech market entry",
      "Pakistan payment rails",
      "Bangladesh wallet rails",
      "Egypt payment ecosystem",
      "Iraq payment infrastructure",
      "G20 cross-border roadmap",
      "instant rail interoperability",
      "de-risking",
      "UETR investigations",
    ],
    lenses: [
      "operator playbook",
      "corridor design",
      "market-entry checklist",
      "cost model",
      "risk and compliance guide",
    ],
    keywords: ["cross-border payments", "SWIFT", "ISO 20022", "emerging markets"],
    links: [
      "/topics/cross-border-payments",
      "/topics/swift-iso-20022",
      "/blog/swift-payment-explained",
      "/product-work/cross-border-corridors-fx",
    ],
  },
  {
    file: "risk-compliance-settlement-100.json",
    prefix: "RC",
    cluster: "Settlement, Reconciliation, Risk, Compliance and Merchant Onboarding",
    audience:
      "Risk leaders, compliance teams, payments PMs, treasury, finance and regulated fintech operators",
    baseTopics: [
      "three-way reconciliation",
      "double-entry ledger design",
      "settlement windows",
      "exception management",
      "treasury reporting",
      "merchant KYB automation",
      "UBO discovery",
      "risk-tiering merchants",
      "sanctions screening",
      "PEP screening",
      "AML/CFT monitoring",
      "chargeback operations",
      "fraud velocity rules",
      "device intelligence",
      "manual review queues",
      "PCI DSS scoping",
      "ISO 27001 evidence",
      "audit trails",
      "financial controls",
      "SAR-ready workflows",
    ],
    lenses: [
      "control framework",
      "product requirements",
      "operations playbook",
      "metrics guide",
      "failure-mode analysis",
    ],
    keywords: ["settlement reconciliation", "KYB", "AML CFT", "fraud risk"],
    links: [
      "/topics/settlement-reconciliation",
      "/topics/fraud-aml",
      "/blog/reconciliation-is-product-infrastructure",
      "/product-work/settlement-reconciliation",
    ],
  },
  {
    file: "product-program-ai-100.json",
    prefix: "PA",
    cluster: "Product Management, Program Management, PMO and AI in Fintech",
    audience: "VP Product, Head of Product, Program Directors, PMO leaders and AI product teams",
    baseTopics: [
      "payments PRD template",
      "risk-adjusted backlog",
      "RICE in regulated payments",
      "OKRs for payment teams",
      "fintech PM career ladder",
      "hiring fintech PMs",
      "PMO maturity model",
      "RAID governance",
      "SteerCo cadence",
      "vendor governance",
      "hybrid PMBOK and Agile",
      "incident auto-escalation",
      "RAG for merchant support",
      "KYB document extraction",
      "agentic payments operations",
      "AI fraud detection",
      "LLM vs ML decisions",
      "GenAI value modeling",
      "AI governance",
      "program rescue",
    ],
    lenses: [
      "executive guide",
      "operating model",
      "implementation playbook",
      "interview-grade explainer",
      "metrics and governance",
    ],
    keywords: ["payments product management", "fintech PMO", "AI in fintech", "program management"],
    links: [
      "/topics/program-management-pmo",
      "/topics/ai-in-fintech",
      "/blog/payments-prd-template-nine-sections",
      "/product-work/simpaisa-ai-solutions-suite",
    ],
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

mkdirSync(OUT_DIR, { recursive: true });

for (const cluster of clusters) {
  const items = [];
  let n = 1;
  for (const topic of cluster.baseTopics) {
    for (const lens of cluster.lenses) {
      const title = `${topic}: ${lens} for complex-market fintech teams`;
      items.push({
        id: `${cluster.prefix}-${String(n).padStart(3, "0")}`,
        cluster: cluster.cluster,
        title,
        slug: slugify(title),
        searchIntent: lens.includes("checklist")
          ? "Practical checklist"
          : lens.includes("architecture") || lens.includes("design")
            ? "Technical education"
            : lens.includes("interview")
              ? "Executive evaluation"
              : "Operator playbook",
        primaryKeyword: `${topic} ${lens}`,
        secondaryKeywords: [topic, lens, ...cluster.keywords].slice(0, 8),
        targetReader: cluster.audience,
        whyRizwanCanWin:
          "Rizwan can write this with first-hand credibility from scaling regulated payment infrastructure across 5 frontier markets to $1B+ annual GTV and 270M+ payments a year, with product/program leadership across payments, OTT and ecommerce.",
        outline: [
          `Define ${topic} and the decision context`,
          "Show where it sits in the payment/product/program stack",
          "Explain the product, risk, compliance and operating trade-offs",
          "Name failure modes that appear in production",
          "Define metrics and launch or governance gates",
          "Connect to a Rizwan case study or operator lesson",
          "Close with FAQ answers for AI search snippets",
        ],
        internalLinks: cluster.links,
        aiAnswerSnippet: `${topic} should be treated as an operating-system decision, not a standalone feature. The useful answer connects product design, partner dependency, risk controls, metrics and production operations.`,
        publishPriority: n <= 20 ? 5 : n <= 50 ? 4 : n <= 80 ? 3 : 2,
      });
      n++;
    }
  }
  writeFileSync(join(OUT_DIR, cluster.file), JSON.stringify(items, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${items.length} topics to ${join(OUT_DIR, cluster.file)}`);
}
