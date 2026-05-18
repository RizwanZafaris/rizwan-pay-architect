#!/usr/bin/env bun
/**
 * Process the new portrait source into the 3 asset files the site loads:
 *
 *   src/assets/rizwan-zafar-cutout.png       — PNG fallback, 928×1152, alpha
 *   src/assets/rizwan-zafar-cutout.webp      — 920w WebP, alpha
 *   src/assets/rizwan-zafar-cutout-460.webp  — 460w WebP, alpha (mobile + avatar)
 *
 * The source from the bg-remove preview is a tight head+shoulders crop with
 * lots of transparent padding. The site expects a 4:5 portrait container with
 * `object-bottom`, so we:
 *   1. Trim to subject bounds
 *   2. Scale subject to canvas width (928 px)
 *   3. Composite into a 928×1152 alpha canvas anchored at the bottom
 *   4. Emit PNG + 2 WebP variants
 *
 *   bun scripts/process-portrait.ts <source.png>
 */
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";

const SRC = process.argv[2] ?? "/Users/rizwanzafar/Downloads/image-removebg-preview.png";
const OUT = "src/assets";
const CANVAS_W = 928;
const CANVAS_H = 1152;
const TARGET_SUBJECT_PCT = 0.96; // subject occupies 96% of canvas width

await mkdir(OUT, { recursive: true });

// 1. Trim source to subject bounds.
const trimmed = await sharp(SRC).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
const { width: tw, height: th } = trimmed.info;
console.log(`Source trimmed: ${tw}×${th}`);

// 2. Scale so the SUBJECT width fits TARGET_SUBJECT_PCT of canvas width.
const targetW = Math.round(CANVAS_W * TARGET_SUBJECT_PCT);
const scale = targetW / tw;
const scaledH = Math.round(th * scale);
const scaled = await sharp(trimmed.data).resize(targetW, scaledH, { kernel: "lanczos3" }).toBuffer();
console.log(`Subject scaled: ${targetW}×${scaledH}`);

// 3. Composite into a 928×1152 transparent canvas, anchored to the bottom.
const canvas = await sharp({
  create: {
    width: CANVAS_W,
    height: CANVAS_H,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: scaled,
      // Horizontal centre, vertical bottom-anchor.
      left: Math.round((CANVAS_W - targetW) / 2),
      top: CANVAS_H - scaledH,
    },
  ])
  .png({ compressionLevel: 9, palette: false })
  .toBuffer();
console.log(`Canvas composed: ${CANVAS_W}×${CANVAS_H}`);

// 4. Emit the three files.
await sharp(canvas)
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/rizwan-zafar-cutout.png`);
await sharp(canvas)
  .resize(920, null, { withoutEnlargement: true })
  .webp({ quality: 85, effort: 6, alphaQuality: 90 })
  .toFile(`${OUT}/rizwan-zafar-cutout.webp`);
await sharp(canvas)
  .resize(460, null, { withoutEnlargement: true })
  .webp({ quality: 80, effort: 6, alphaQuality: 85 })
  .toFile(`${OUT}/rizwan-zafar-cutout-460.webp`);

console.log("\n✓ Portrait files written:");
const files = [
  "rizwan-zafar-cutout.png",
  "rizwan-zafar-cutout.webp",
  "rizwan-zafar-cutout-460.webp",
];
for (const f of files) {
  const m = await sharp(`${OUT}/${f}`).metadata();
  console.log(`  ${f}: ${m.width}×${m.height}, ${m.size ?? "?"} bytes`);
}

// Keep the OG card source in sync — preserve the existing one by copy.
// (The OG card is text-only; it doesn't embed the portrait.)
