import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const out = "public/og/blog/qatar-psp-rtgs-direct-access-settlement-control-v20260902.png";
const fallback = "public/og/blog/qatar-psp-rtgs-direct-access-settlement-control.png";
const preview = "automation_runs/daily-fintech-pm-thought-leadership-blog/2026-09-02T02-37-00-000Z-radar-0630/creative/qatar-psp-rtgs-direct-access-settlement-control-v20260902-preview-360.png";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b1014"/>
  <rect x="0" y="0" width="555" height="630" fill="#0d1218"/>
  <rect x="555" y="0" width="645" height="630" fill="#172025"/>
  <path d="M555 0h645v630H555z" fill="#121a1f"/>
  <path d="M664 118h354c45 0 82 37 82 82v230c0 45-37 82-82 82H664c-45 0-82-37-82-82V200c0-45 37-82 82-82z" fill="#1d2a2f"/>
  <path d="M610 450c130-46 235-46 360 0 53 20 91 43 130 58v41H610z" fill="#10171b"/>
  <rect x="633" y="162" width="236" height="294" rx="25" fill="#dfe8e4"/>
  <rect x="655" y="191" width="192" height="223" rx="14" fill="#132024"/>
  <rect x="680" y="222" width="142" height="18" rx="9" fill="#44c7ca" opacity="0.9"/>
  <rect x="680" y="262" width="106" height="14" rx="7" fill="#f0bd57" opacity="0.9"/>
  <rect x="680" y="300" width="130" height="12" rx="6" fill="#6d7e84"/>
  <rect x="680" y="331" width="91" height="12" rx="6" fill="#6d7e84"/>
  <circle cx="751" cy="439" r="10" fill="#10171b"/>
  <rect x="895" y="238" width="175" height="148" rx="22" fill="#233238"/>
  <rect x="919" y="270" width="126" height="20" rx="10" fill="#44c7ca"/>
  <rect x="919" y="310" width="92" height="15" rx="7" fill="#8ea0a5"/>
  <rect x="919" y="340" width="112" height="15" rx="7" fill="#f0bd57"/>
  <path d="M825 318c34-46 67-46 101 0" fill="none" stroke="#44c7ca" stroke-width="6" stroke-linecap="round"/>
  <path d="M826 350c34 46 67 46 101 0" fill="none" stroke="#f0bd57" stroke-width="6" stroke-linecap="round"/>
  <circle cx="875" cy="334" r="38" fill="#10171b" stroke="#47575d" stroke-width="3"/>
  <text x="836" y="343" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" fill="#dfe8e4">RTGS</text>
  <rect x="952" y="152" width="94" height="62" rx="8" fill="#0f171b" stroke="#44565d" stroke-width="2"/>
  <rect x="966" y="177" width="66" height="12" rx="6" fill="#44c7ca"/>
  <rect x="966" y="197" width="43" height="8" rx="4" fill="#f0bd57"/>
  <path d="M618 488h500" stroke="#34444b" stroke-width="2"/>
  <path d="M620 491l489-2" stroke="#44c7ca" stroke-width="2" opacity="0.45"/>
  <text x="76" y="103" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="4" fill="#44c7ca">QATAR PAYMENTS</text>
  <rect x="76" y="124" width="74" height="3" fill="#44c7ca"/>
  <text x="76" y="246" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#f5f1e8">PAYMENT FIRMS</text>
  <text x="76" y="324" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#f5f1e8">GET</text>
  <text x="76" y="402" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#f0bd57">RTGS ACCESS</text>
  <text x="76" y="467" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#a9b5b8">Direct access shifts proof,</text>
  <text x="76" y="499" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#a9b5b8">liquidity and exceptions closer</text>
  <text x="76" y="531" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#a9b5b8">to the payment provider.</text>
  <text x="76" y="580" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="3" fill="#a9b5b8">RZIFI.COM</text>
</svg>
`;

await mkdir(dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(fallback);
await mkdir(dirname(preview), { recursive: true });
await sharp(out).resize({ width: 360 }).png({ compressionLevel: 9 }).toFile(preview);
