#!/usr/bin/env bun
/**
 * LinkedIn ad creatives (1200x627, 1.91:1 single-image spec) for the
 * rzifi.com/hire campaign — real portrait + canonical metrics only.
 *
 *   bun scripts/generate-ad-cards.ts
 *
 * Outputs to /Volumes/T7 Shield/rzifi-ad-cards/
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const W = 1200;
const H = 627;
const OUT_DIR = "/Volumes/T7 Shield/rzifi-ad-cards";
const PORTRAIT = "src/assets/rizwan-zafar-cutout.png";

// dark theme (matches OG cards / site dark accents)
const BG = "#0f1115";
const INK = "#f6f7f9";
const SOFT = "#a6adb5";
const MUTED = "#59636f";
const BRAND = "#3ecbe6";
const GOLD = "#f4c76b";
const GREEN = "#5ee3a7";

// light theme (matches site paper)
const L_BG = "#f4efe4";
const L_INK = "#16191d";
const L_SOFT = "#555d66";
const L_BRAND = "#0c7f96";
const L_GOLD = "#a87a24";

const SERIF = "'Instrument Serif', 'Source Serif 4', Georgia, serif";
const MONO = "ui-monospace, 'JetBrains Mono', Menlo, monospace";

function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const mono = (
  x: number,
  y: number,
  size: number,
  fill: string,
  text: string,
  ls = 3,
  weight = 700,
  anchor = "start",
) =>
  `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" letter-spacing="${ls}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(text)}</text>`;

const serif = (x: number, y: number, size: number, fill: string, text: string, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="${SERIF}" font-size="${size}" fill="${fill}" font-weight="400" text-anchor="${anchor}">${esc(text)}</text>`;

/** shared decorative glow behind the portrait (right side) */
function portraitGlow(brand = BRAND, gold = GOLD) {
  return `
  <radialGradient id="pglow" cx="79%" cy="55%" r="46%">
    <stop offset="0%" stop-color="${brand}" stop-opacity="0.16"/>
    <stop offset="60%" stop-color="${brand}" stop-opacity="0.05"/>
    <stop offset="100%" stop-color="${brand}" stop-opacity="0"/>
  </radialGradient>
  <rect width="${W}" height="${H}" fill="url(#pglow)"/>
  <circle cx="950" cy="350" r="252" fill="none" stroke="${brand}" stroke-width="1.5" opacity="0.28"/>
  <circle cx="950" cy="350" r="286" fill="none" stroke="${gold}" stroke-width="1" opacity="0.16"/>`;
}

/* ----------------------------- variant 1 ------------------------------ */
/* Authority card: name + title + 2x2 metric grid                          */
function v1() {
  const gridX = [76, 392];
  const gridY = [356, 452];
  const metrics: Array<[string, string]> = [
    ["$1B+", "ANNUAL GTV"],
    ["270M+", "PAYMENTS PER YEAR"],
    ["97%", "PAYMENT SUCCESS"],
    ["90%", "STRAIGHT-THROUGH PROCESSING"],
  ];
  const cells = metrics
    .map(([value, label], i) => {
      const x = gridX[i % 2];
      const y = gridY[Math.floor(i / 2)];
      return (
        serif(x, y, 50, i % 2 === 0 ? BRAND : INK, value) +
        mono(x, y + 28, 11, SOFT, label, 1.5, 600)
      );
    })
    .join("\n");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.14"/>
      <stop offset="60%" stop-color="${GREEN}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${portraitGlow()}

  <rect x="76" y="92" width="64" height="2" fill="${BRAND}"/>
  ${mono(158, 100, 13, BRAND, "PAYMENTS PRODUCT & PROGRAM EXECUTIVE", 3.5)}

  ${serif(76, 196, 84, INK, "Rizwan Zafar")}
  ${serif(76, 250, 26, SOFT, "14+ years building payment infrastructure")}
  ${serif(76, 286, 26, SOFT, "in frontier & emerging markets.")}

  ${cells}

  <rect x="76" y="524" width="560" height="1" fill="${MUTED}" opacity="0.5"/>
  ${mono(76, 570, 15, BRAND, "RZIFI.COM/HIRE", 3)}
  ${mono(268, 570, 13, SOFT, "·  BOOK A 15-MIN INTRO CALL", 2.5, 500)}
</svg>`.trim();
}

/* ----------------------------- variant 2 ------------------------------ */
/* Metrics-dominant: huge $1B+, stacked proof rows                         */
function v2() {
  const rows: Array<[string, string]> = [
    ["270M+", "PAYMENTS PROCESSED A YEAR"],
    ["97%", "PAYMENT SUCCESS RATE"],
    ["99.95%", "SETTLEMENT SLA"],
  ];
  const rowSvg = rows
    .map(
      ([value, label], i) =>
        serif(76, 348 + i * 62, 44, INK, value) +
        mono(280, 344 + i * 62, 12.5, SOFT, label, 2.5, 600),
    )
    .join("\n");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${portraitGlow(GOLD, BRAND)}

  <rect x="76" y="86" width="64" height="2" fill="${GOLD}"/>
  ${mono(158, 94, 13, GOLD, "TRACK RECORD · 5 FRONTIER MARKETS", 3.5)}

  ${serif(76, 218, 116, BRAND, "$1B+")}
  ${mono(76, 262, 14, SOFT, "ANNUAL GROSS TRANSACTION VALUE", 3, 600)}

  ${rowSvg}

  <rect x="76" y="532" width="560" height="1" fill="${MUTED}" opacity="0.5"/>
  ${serif(76, 570, 22, SOFT, "Rizwan Zafar — Payments Product & Program Executive")}
  ${mono(76, 600, 13, GOLD, "RZIFI.COM/HIRE", 3)}
</svg>`.trim();
}

/* ----------------------------- variant 3 ------------------------------ */
/* Question hook + CTA pill                                                */
function v3() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="glow3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow3)"/>
  ${portraitGlow()}

  <rect x="76" y="96" width="64" height="2" fill="${BRAND}"/>
  ${mono(158, 104, 13, BRAND, "FOR FINTECH & PSP LEADERSHIP TEAMS", 3.5)}

  ${serif(76, 204, 58, INK, "Hiring a payments product")}
  ${serif(76, 272, 58, INK, "leader who has scaled in")}
  ${serif(76, 340, 58, INK, "frontier markets?")}

  ${mono(76, 412, 14, GOLD, "$1B+ GTV  ·  270M+ PAYMENTS/YR  ·  97% SUCCESS  ·  90% STP", 2, 600)}

  <rect x="76" y="468" width="496" height="58" rx="29" fill="none" stroke="${BRAND}" stroke-width="2"/>
  ${mono(324, 504, 14, BRAND, "BOOK A 15-MIN INTRO CALL", 3, 700, "middle")}
  ${mono(76, 580, 13, SOFT, "RZIFI.COM/HIRE  ·  RIZWAN ZAFAR  ·  DUBAI", 2.5, 500)}
</svg>`.trim();
}

/* ----------------------------- variant 4 ------------------------------ */
/* Light editorial (paper) — stands out against LinkedIn's white feed via
   the double-rule frame; mirrors the site's print look                    */
function v4() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${L_BG}"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="${L_INK}" stroke-width="2"/>
  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="none" stroke="${L_INK}" stroke-width="0.75" opacity="0.55"/>

  ${mono(76, 104, 13, L_BRAND, "PAYMENTS PRODUCT & PROGRAM EXECUTIVE · DUBAI", 3)}
  <rect x="76" y="122" width="560" height="1" fill="${L_INK}" opacity="0.7"/>

  ${serif(76, 212, 80, L_INK, "Rizwan Zafar")}
  ${serif(76, 266, 25, L_SOFT, "Payment infrastructure for markets")}
  ${serif(76, 300, 25, L_SOFT, "where payments are hard.")}

  ${serif(76, 392, 46, L_BRAND, "$1B+")}
  ${mono(76, 420, 11.5, L_SOFT, "ANNUAL GTV", 2, 600)}
  ${serif(300, 392, 46, L_INK, "270M+")}
  ${mono(300, 420, 11.5, L_SOFT, "PAYMENTS / YEAR", 2, 600)}
  ${serif(76, 488, 46, L_INK, "97%")}
  ${mono(76, 516, 11.5, L_SOFT, "PAYMENT SUCCESS", 2, 600)}
  ${serif(300, 488, 46, L_GOLD, "5")}
  ${mono(300, 516, 11.5, L_SOFT, "FRONTIER MARKETS", 2, 600)}

  ${mono(76, 576, 14, L_INK, "RZIFI.COM/HIRE", 3)}
  ${mono(262, 576, 12.5, L_SOFT, "·  BOOK A 15-MIN INTRO CALL", 2.5, 500)}
</svg>`.trim();
}

/* ------------------------------- render ------------------------------- */

type Variant = {
  name: string;
  svg: string;
  /** portrait height in px; bottom-flush, right-anchored */
  portraitH: number;
  /** nudge portrait left edge (default: flush right) */
  left?: number;
};

const variants: Variant[] = [
  { name: "ad-1-authority", svg: v1(), portraitH: 600 },
  { name: "ad-2-metrics", svg: v2(), portraitH: 600 },
  { name: "ad-3-question", svg: v3(), portraitH: 560 },
  { name: "ad-4-paper", svg: v4(), portraitH: 580, left: 700 },
];

await mkdir(OUT_DIR, { recursive: true });

const meta = await sharp(PORTRAIT).metadata();
const ratio = (meta.width ?? 920) / (meta.height ?? 1142);

for (const v of variants) {
  const ph = v.portraitH;
  const pw = Math.round(ph * ratio);
  const portrait = await sharp(PORTRAIT).resize({ height: ph, width: pw }).png().toBuffer();

  const left = v.left ?? W - pw;
  const top = H - ph;

  await sharp(Buffer.from(v.svg))
    .composite([{ input: portrait, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_DIR}/${v.name}.png`);
  console.log(`✓ ${v.name}.png  (portrait ${pw}x${ph} at ${left},${top})`);
}

console.log(`\nAll cards → ${OUT_DIR}`);
