/**
 * check:facts — fails the build if a canonical metric is hardcoded in a page.
 *
 * Every number that makes a claim must come from src/content/facts.ts (which
 * re-exports the verified base in src/data/profile.ts). This gate exists
 * because the site once said "5 markets" on one page and "7 markets" on
 * another; a human will always retype a number eventually.
 *
 * SCOPE: route files and UI components only. The data layer (src/data) and the
 * facts module itself are where numbers are allowed to live. Long-form essay
 * prose (posts-content.ts, content/blog) is exempt: an essay quoting "$1B+ TPV"
 * inside an argument is authored writing, not a site claim.
 *
 * Run: bun run check:facts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SCAN_DIRS = ["src/routes", "src/components"];
const ALLOWLIST_FILES = new Set<string>([
  // AnimatedMetric documents its parser with example strings ("25M+", "−90%").
  // Those are format samples, not claims.
  "src/components/motion/AnimatedMetric.tsx",
]);

/** Claim-shaped literals. Each must be imported from facts.ts instead. */
const BANNED: { pattern: RegExp; why: string }[] = [
  { pattern: /\$1B\+/g, why: "GTV — use PLATFORM.gtv" },
  { pattern: /270M\+/g, why: "annual payments — use PLATFORM.annualPayments" },
  { pattern: /\b25M\+/g, why: "REJECTED framing (25M monthly overstates 270M+/yr)" },
  // Bare "150+" too: a KPI tile that renders just the number is still a claim.
  // (Group-B migration found one hiding beside converted siblings.)
  {
    pattern: /"150\+"|>\s*150\+|\b150\+\s*(global\s*)?merchants?/gi,
    why: "merchants — use PLATFORM.merchants",
  },
  {
    pattern: /\b(\d+)\s+markets?\b/gi,
    why: "markets — use CAREER.marketsPhrase or PLATFORM.marketsPhrase",
  },
  // Spelled-out counts evade the digit rule and are how "five" and "ten" drifted
  // apart in the first place. "ten lessons"/"three industries" are fine.
  // Up to two adjectives may sit between the count and "markets" — that is how
  // "Ten operating markets" and "five regulated frontier markets" slipped past
  // the first version of this rule.
  {
    pattern: /\b(five|seven|ten|nine)\s+(?:[a-z-]+\s+){0,2}markets?\b/gi,
    why: "markets — use CAREER/PLATFORM/DARAZ marketsWord",
  },
  { pattern: /\b7 markets\b/gi, why: "REJECTED framing (neither career 10 nor live 5)" },
  // RETIRED METRICS (owner ruling 2026-09-01). These six are not "use the
  // constant instead" — there is no constant, the claims are dead. The
  // publishable replacements are PLATFORM.uptime (99.9%),
  // PLATFORM.straightThrough (90%) and PLATFORM.fraudLoss (<0.1% GTV).
  { pattern: /\b99\.95/g, why: "RETIRED claim (settlement SLA / recon accuracy) — unpublishable" },
  { pattern: /97\s*%\s*(payment\s+)?success/gi, why: "RETIRED claim — unpublishable" },
  { pattern: /\+?\s*14\s*%\s*authori[sz]ation/gi, why: "RETIRED claim — unpublishable" },
  { pattern: /22\s*%\s*token/gi, why: "RETIRED claim — unpublishable" },
  { pattern: /\$14M/g, why: "RETIRED claim (smart-retry recovery) — unpublishable" },
  {
    pattern: /120[Kk],?0?0?0?\+?\s*(failed\s+)?transactions/g,
    why: "RETIRED claim — unpublishable",
  },
  { pattern: /\b\d{2}\s*years of experience/gi, why: "tenure — use CAREER.yearsLabel" },
  { pattern: /Schedule call/g, why: "CTA verb — use CTA_LABEL" },
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|ts)$/.test(entry)) out.push(p);
  }
  return out;
}

let failures = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    if (ALLOWLIST_FILES.has(file)) continue;
    // Strip block comments (/* … */ and JSX {/* … */}) before scanning, so a
    // continuation line inside a multi-line comment isn't mistaken for code.
    // Newlines are preserved to keep reported line numbers accurate.
    const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, (m) =>
      m.replace(/[^\n]/g, " "),
    );
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      // Comments are documentation, including the "do not reintroduce" notes.
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
      for (const { pattern, why } of BANNED) {
        pattern.lastIndex = 0;
        const hit = pattern.exec(line);
        if (hit) {
          failures++;
          console.error(`✗ ${file}:${i + 1}  "${hit[0].trim()}"  → ${why}`);
        }
      }
    });
  }
}

if (failures > 0) {
  console.error(
    `\n${failures} hardcoded metric${failures === 1 ? "" : "s"} found.\n` +
      `Import from "@/content/facts" instead. See src/content/facts.ts for the two-tier rule.`,
  );
  process.exit(1);
}
console.log("✓ check:facts passed. No hardcoded metrics in routes or components.");
