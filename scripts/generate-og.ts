#!/usr/bin/env bun
/**
 * Generates 1200x630 Open Graph PNG cards:
 *   - public/og-default.png
 *   - public/og/blog/<slug>.png
 *   - public/og/product-work/<slug>.png
 *
 * Run after editing posts / case studies / headline copy:
 *   bun scripts/generate-og.ts
 */
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";
import { publishedPosts } from "../src/data/posts";
import { caseStudies } from "../src/data/caseStudies";
import { profile } from "../src/data/profile";

const WIDTH = 1200;
const HEIGHT = 630;

const BG = "#0f1115";
const INK = "#f6f7f9";
const SOFT = "#a6adb5";
const MUTED = "#59636f";
const BRAND = "#3ecbe6";
const GOLD = "#f4c76b";
const GREEN = "#5ee3a7";

type CardInput = {
  eyebrow: string;
  title: string;
  subtitle: string;
  section: string;
  footer: string;
  out: string;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(raw: string, maxChars: number, maxLines: number) {
  const words = raw.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    if (lines.length === maxLines) break;
  }
  if (current && lines.length < maxLines) lines.push(current);

  const usedWords = lines.join(" ").split(" ").filter(Boolean).length;
  if (usedWords < words.length && lines.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[,.!?;:]+$/, "")}...`;
  }
  return lines;
}

function multilineText(
  lines: string[],
  options: { x: number; y: number; size: number; lineHeight: number; color: string },
) {
  return lines
    .map(
      (line, index) => `
  <text x="${options.x}" y="${options.y + index * options.lineHeight}"
        font-family="'Instrument Serif', 'Source Serif 4', Georgia, serif"
        font-size="${options.size}" fill="${options.color}" font-weight="400">
    ${escapeXml(line)}
  </text>`,
    )
    .join("");
}

function cardSvg({ eyebrow, title, subtitle, section, footer }: Omit<CardInput, "out">) {
  const titleLines = wrapText(title, 26, 3);
  const subtitleLines = wrapText(subtitle, 68, 2);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.18"/>
      <stop offset="56%" stop-color="${GREEN}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="82%" cy="20%" r="70%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.14"/>
      <stop offset="50%" stop-color="${BRAND}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>

  <g opacity="0.82">
    <line x1="900" y1="145" x2="1088" y2="248" stroke="${BRAND}" stroke-width="2" opacity="0.34"/>
    <line x1="930" y1="386" x2="1088" y2="248" stroke="${GOLD}" stroke-width="2" opacity="0.28"/>
    <line x1="1088" y1="248" x2="1138" y2="430" stroke="${GREEN}" stroke-width="2" opacity="0.26"/>
    <circle cx="900" cy="145" r="16" fill="${BRAND}" opacity="0.74"/>
    <circle cx="1088" cy="248" r="28" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.72"/>
    <circle cx="930" cy="386" r="18" fill="${GREEN}" opacity="0.66"/>
    <circle cx="1138" cy="430" r="13" fill="${BRAND}" opacity="0.54"/>
    <rect x="790" y="485" width="195" height="2" fill="${MUTED}" opacity="0.42"/>
    <rect x="1010" y="485" width="90" height="2" fill="${BRAND}" opacity="0.72"/>
  </g>

  <rect x="76" y="96" width="64" height="2" fill="${BRAND}"/>
  <text x="158" y="104"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="13" letter-spacing="4" fill="${BRAND}" font-weight="700">
    ${escapeXml(eyebrow)}
  </text>

${multilineText(titleLines, { x: 76, y: 225, size: 62, lineHeight: 66, color: INK })}

  <text x="76" y="430"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="14" letter-spacing="3" fill="${GOLD}" font-weight="700">
    ${escapeXml(section.toUpperCase())}
  </text>

${multilineText(subtitleLines, { x: 76, y: 474, size: 24, lineHeight: 32, color: SOFT })}

  <text x="76" y="570"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="13" letter-spacing="3" fill="${SOFT}" font-weight="500">
    ${escapeXml(footer.toUpperCase())}
  </text>
</svg>
`.trim();
}

async function writeCard(input: CardInput) {
  await mkdir(dirname(input.out), { recursive: true });
  await sharp(Buffer.from(cardSvg(input)))
    .png({ compressionLevel: 9 })
    .toFile(input.out);
}

await writeCard({
  eyebrow: "RZIFI.COM · PAYMENTS PRODUCT",
  title: profile.name,
  subtitle: "Product & Program Executive scaling fintech infrastructure in complex markets.",
  section: "Dubai · $1B+ GTV · 270M+ payments/yr",
  footer: "Cross-border · Settlement · KYC/KYB · AML/CFT · ISO 20022",
  out: "public/og-default.png",
});

for (const post of publishedPosts) {
  await writeCard({
    eyebrow: "RZIFI.COM · ESSAY",
    title: post.title,
    subtitle: post.description,
    section: post.category,
    footer: `${profile.name} · ${post.readingTime} · ${post.date}`,
    out: `public/og/blog/${post.slug}.png`,
  });
}

for (const study of caseStudies) {
  const metric = study.metrics[0]
    ? `${study.metrics[0].value} ${study.metrics[0].label}`
    : "Case study";
  await writeCard({
    eyebrow: "RZIFI.COM · CASE STUDY",
    title: study.title,
    subtitle: study.tagline,
    section: study.category,
    footer: `${profile.name} · ${metric}`,
    out: `public/og/product-work/${study.slug}.png`,
  });
}

console.log(
  `✓ Wrote OG cards: 1 default, ${publishedPosts.length} essays, ${caseStudies.length} case studies`,
);
