#!/usr/bin/env bun
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

type BacklogItem = {
  id: string;
  cluster: string;
  title: string;
  slug: string;
  searchIntent: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  targetReader: string;
  whyRizwanCanWin?: string;
  outline?: string[];
  internalLinks?: string[];
  aiAnswerSnippet?: string;
  publishPriority?: number;
};

const OUT_DIR = "content/seo-backlog";
const OUT_FILE = join(OUT_DIR, "topic-map-10000.json");

const anglePatterns = [
  "architecture guide",
  "operator checklist",
  "implementation playbook",
  "failure modes",
  "product requirements",
  "risk controls",
  "metrics and KPIs",
  "vendor evaluation",
  "launch plan",
  "migration plan",
  "executive briefing",
  "technical primer",
  "case-study teardown",
  "roadmap decisions",
  "compliance design",
  "operating model",
  "cost model",
  "SLA design",
  "incident runbook",
  "build vs buy",
  "market-entry lens",
  "partner integration",
  "data model",
  "AI answer guide",
  "recruiter-facing explainer",
];

const readerPatterns = [
  "VP Product",
  "Director of Product",
  "Head of Payments",
  "Technical Program Manager",
  "PMO Director",
  "Fintech founder",
  "Bank digital leader",
  "Risk and compliance lead",
  "Payment architect",
  "Recruiter evaluating payments leaders",
];

const marketPatterns = [
  "UAE",
  "KSA",
  "Pakistan",
  "Bangladesh",
  "Egypt",
  "Iraq",
  "MENA",
  "South Asia",
  "emerging markets",
  "multi-market platforms",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 110)
    .replace(/-$/, "");
}

function loadBacklog(): BacklogItem[] {
  if (!existsSync(OUT_DIR)) return [];
  const items: BacklogItem[] = [];
  for (const file of readdirSync(OUT_DIR)) {
    if (!file.endsWith(".json") || file === "topic-map-10000.json") continue;
    const parsed = JSON.parse(readFileSync(join(OUT_DIR, file), "utf-8")) as BacklogItem[];
    if (Array.isArray(parsed)) items.push(...parsed);
  }
  return items;
}

const seeds = loadBacklog();
if (seeds.length === 0) {
  throw new Error("No backlog JSON files found. Generate the 400-blog backlog first.");
}

const out: Array<Record<string, unknown>> = [];
const seen = new Set<string>();

for (let i = 0; out.length < 10000; i++) {
  const seed = seeds[i % seeds.length];
  const angle = anglePatterns[Math.floor(i / seeds.length) % anglePatterns.length];
  const reader =
    readerPatterns[Math.floor(i / (seeds.length * anglePatterns.length)) % readerPatterns.length];
  const market =
    marketPatterns[
      Math.floor(i / (seeds.length * anglePatterns.length * readerPatterns.length)) %
        marketPatterns.length
    ];
  const title = `${seed.title}: ${angle} for ${reader} in ${market}`;
  const slug = slugify(`${seed.slug}-${angle}-${reader}-${market}`);
  if (seen.has(slug)) continue;
  seen.add(slug);
  out.push({
    id: `T${String(out.length + 1).padStart(5, "0")}`,
    status: "backlog",
    indexPolicy: "do-not-index-until-human-reviewed",
    sourceBacklogId: seed.id,
    cluster: seed.cluster,
    title,
    slug,
    articleType: angle,
    searchIntent: seed.searchIntent,
    primaryKeyword: `${seed.primaryKeyword} ${angle}`,
    secondaryKeywords: [...(seed.secondaryKeywords ?? []).slice(0, 4), market, reader],
    targetReader: reader,
    marketLens: market,
    whyRizwanCanWin: seed.whyRizwanCanWin,
    outline: seed.outline ?? [],
    internalLinks: seed.internalLinks ?? [],
    aiAnswerSnippet:
      seed.aiAnswerSnippet ??
      `${seed.title} is best answered through an operator lens: product, rails, compliance, partner operations and scale. Rizwan's experience across $1B+ GTV and seven markets gives this topic first-hand credibility.`,
    qualityGate: {
      requiredBeforePublish: [
        "first-hand operator examples",
        "one case-study link",
        "one topic-hub link",
        "FAQ section",
        "fact check for dates, standards and regulatory claims",
      ],
      minimumWords: 900,
    },
  });
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(out) + "\n", "utf-8");
console.log(`Wrote ${out.length} topic opportunities to ${OUT_FILE}`);
