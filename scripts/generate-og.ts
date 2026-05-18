#!/usr/bin/env bun
/**
 * Generates a 1200×630 Open Graph card at public/og-default.png.
 *
 * Composition: dark canvas, brand cyan accent rule, name + title set in
 * Instrument Serif italic via SVG. Uses sharp's text rendering directly,
 * no font installation required (the SVG references the same Google Fonts
 * the site loads, but renders fallback if not installed — both look fine).
 *
 * Run once after edits to public/og-default.png:
 *   bun scripts/generate-og.ts
 *
 * Re-run only when the headline or palette changes.
 */
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

// Match site theme: dark ink background, brand cyan accent.
const BG = "#0f1115";
const INK = "#f6f7f9";
const SOFT = "#9aa0a6";
const BRAND = "#3ecbe6";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="${BRAND}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="80%" cy="20%" r="65%">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>

  <!-- Brand rule -->
  <rect x="80" y="120" width="64" height="2" fill="${BRAND}"/>
  <text x="160" y="128"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="14" letter-spacing="4" fill="${BRAND}" font-weight="600">
    RZIFI.COM · PAYMENTS PRODUCT
  </text>

  <!-- Name + title -->
  <text x="80" y="260"
        font-family="'Instrument Serif', 'Source Serif 4', Georgia, serif"
        font-size="88" fill="${INK}" font-weight="400" letter-spacing="-2">
    Rizwan Zafar
  </text>
  <text x="80" y="345"
        font-family="'Instrument Serif', 'Source Serif 4', Georgia, serif"
        font-size="48" fill="${BRAND}" font-style="italic" font-weight="400">
    Product &amp; Program Executive
  </text>
  <text x="80" y="395"
        font-family="'Instrument Serif', 'Source Serif 4', Georgia, serif"
        font-size="40" fill="${INK}" font-style="italic" font-weight="400">
    Scaling Fintech Infrastructure
  </text>
  <text x="80" y="455"
        font-family="'Inter', system-ui, sans-serif"
        font-size="24" fill="${SOFT}" letter-spacing="0.5">
    Dubai · $1B+ GTV · 25M+ tx/mo · 7 markets · 50+ bank &amp; wallet partners
  </text>

  <!-- Footer mono caps -->
  <text x="80" y="555"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="13" letter-spacing="4" fill="${SOFT}" font-weight="500">
    ◆ CROSS-BORDER · SETTLEMENT · KYC/KYB · AML/CFT · ISO 20022 · SWIFT
  </text>
</svg>
`.trim();

const out = "public/og-default.png";
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);

console.log(`✓ Wrote ${out} (1200×630)`);
