import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(
  root,
  "automation_runs/daily-fintech-pm-thought-leadership-blog/2026-08-29T03-03-00-000Z-radar-0630/creative/syria-card-source.png",
);
const output = path.join(root, "public/og/blog/syria-card-reconnection-acceptance-proof-v20260829.png");

mkdirSync(path.dirname(output), { recursive: true });

const svg = String.raw`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftPanel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#061119"/>
      <stop offset="68%" stop-color="#091923"/>
      <stop offset="100%" stop-color="#07131b"/>
    </linearGradient>
    <linearGradient id="sceneShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#061119" stop-opacity="0.56"/>
      <stop offset="38%" stop-color="#061119" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#061119" stop-opacity="0"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#02070A" flood-opacity="0.42"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="552" height="630" fill="url(#leftPanel)"/>
  <rect x="512" y="0" width="190" height="630" fill="url(#sceneShade)"/>
  <rect x="72" y="106" width="58" height="4" fill="#22C7B6"/>
  <text x="72" y="88" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="#22C7B6" letter-spacing="2.2">SYRIA / CARD ACCEPTANCE</text>
  <g filter="url(#softShadow)" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="800" letter-spacing="0" fill="#F5F4EE">
    <text x="72" y="207">CARD</text>
    <text x="72" y="273">RECONNECTION</text>
    <text x="72" y="339">NEEDS</text>
    <text x="72" y="405" fill="#D8A552">ACCEPTANCE</text>
    <text x="72" y="471" fill="#D8A552">PROOF</text>
  </g>
  <text x="72" y="546" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="500" fill="#A6B0B4">First payment is not the same as repeatable readiness.</text>
  <text x="72" y="586" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="#F5F4EE">rzifi.com</text>
</svg>`;

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .modulate({ saturation: 0.9, brightness: 0.92 })
  .composite([{ input: Buffer.from(svg), left: 0, top: 0 }])
  .png({ compressionLevel: 9, palette: false })
  .toFile(output);

console.log(output);
