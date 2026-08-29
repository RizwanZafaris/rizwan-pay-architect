#!/usr/bin/env node
import { mkdir, copyFile } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "/Users/rizwanzafar/Documents/Codex/2026-04-24/rizwan-pay-architect/node_modules/sharp/lib/index.js";

const WIDTH = 1200;
const HEIGHT = 630;
const base =
  "/Users/rizwanzafar/.codex/generated_images/01a04c55-d9e5-7921-9ef0-7f594061ca97/call_0Wgr8KB9PiiV2ZVgW5xcdBNf.png";
const versioned =
  "public/og/blog/saudi-supply-chain-finance-merchant-cash-flow-evidence-v20260829.png";
const unversioned =
  "public/og/blog/saudi-supply-chain-finance-merchant-cash-flow-evidence.png";
const sourceCopy =
  "automation_runs/daily-fintech-pm-thought-leadership-blog/2026-08-29T13-07-45-998Z/images/saudi-supply-chain-finance-merchant-cash-flow-evidence-v20260829-source.png";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function overlaySvg() {
  const lines = [
    { text: "SUPPLY CHAIN", y: 262, fill: "#F5F4EE" },
    { text: "FINANCE NEEDS", y: 332, fill: "#F5F4EE" },
    { text: "CASH-FLOW", y: 402, fill: "#D8A552" },
    { text: "EVIDENCE", y: 472, fill: "#D8A552" },
  ];
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect x="0" y="0" width="552" height="630" fill="#061119" opacity="0.36"/>
  <rect x="515" y="0" width="130" height="630" fill="url(#fade)"/>
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#061119" stop-opacity="0.68"/>
      <stop offset="100%" stop-color="#061119" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="72" y="151" width="58" height="4" rx="2" fill="#22C7B6"/>
  <text x="72" y="196" fill="#22C7B6" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800">SAMA / B2B PAYMENTS</text>
  ${lines
    .map(
      (line) =>
        `<text x="72" y="${line.y}" fill="${line.fill}" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="900">${escapeXml(line.text)}</text>`,
    )
    .join("\n  ")}
  <text x="72" y="581" fill="#F5F4EE" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">rzifi.com</text>
</svg>`;
}

await mkdir(dirname(versioned), { recursive: true });
await mkdir(dirname(sourceCopy), { recursive: true });
await copyFile(base, sourceCopy);
await sharp(base)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
  .composite([{ input: Buffer.from(overlaySvg()), top: 0, left: 0 }])
  .png({ compressionLevel: 9 })
  .toFile(versioned);
await copyFile(versioned, unversioned);

const metadata = await sharp(versioned).metadata();
console.log(JSON.stringify({ versioned, unversioned, sourceCopy, width: metadata.width, height: metadata.height, format: metadata.format }, null, 2));
