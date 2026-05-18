#!/usr/bin/env bun
/**
 * One-shot: takes the 11 raw 2048×1152 PNGs from /tmp/hf-gen/ (output from
 * Higgsfield z_image generations) and produces production WebP variants at
 * two sizes:
 *
 *   public/cs/<slug>.webp        — 1600×900 hero (used on /product-work/<slug>)
 *   public/cs/<slug>-thumb.webp  —  800×450 thumb (used in card grids)
 *   public/hero-bg.webp          — 2400×1350 (full-bleed hero backdrop)
 *
 * Re-run only if the source images change.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "/tmp/hf-gen";
const OUT = "public/cs";

const mapping: Array<{ src: string; slug: string }> = [
  { src: "cs-simpaisa-1.png", slug: "simpaisa-payment-infrastructure" },
  { src: "cs-kyc-1.png", slug: "merchant-onboarding-kyc" },
  { src: "cs-settlement-1.png", slug: "settlement-reconciliation" },
  { src: "cs-fraud-1.png", slug: "fraud-risk-aml-cft" },
  { src: "cs-cross-border-1.png", slug: "cross-border-corridors-fx" },
  { src: "cs-tapmad-cost-1.png", slug: "tapmad-wallet-billing-migration" },
  { src: "cs-daraz-1.png", slug: "daraz-payment-operations" },
  { src: "cs-tapmad-transformation-1.png", slug: "tapmad-digital-transformation-programme" },
  { src: "cs-ai-1.png", slug: "simpaisa-ai-solutions-suite" },
  { src: "cs-bnpl-1.png", slug: "simpaisa-bnpl-launch" },
];

await mkdir(OUT, { recursive: true });

for (const { src, slug } of mapping) {
  const input = `${SRC}/${src}`;
  // Hero — 1600×900, used on the case study detail page above the H1
  await sharp(input)
    .resize(1600, 900, { fit: "cover" })
    .webp({ quality: 85, effort: 6 })
    .toFile(`${OUT}/${slug}.webp`);
  // Thumb — 800×450, used in card grids (homepage, /product-work)
  await sharp(input)
    .resize(800, 450, { fit: "cover" })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${OUT}/${slug}-thumb.webp`);
  console.log(`✓ ${slug}`);
}

// Hero backdrop — bigger, less aggressive compression so the network mesh
// stays sharp at the largest typical viewport.
await sharp(`${SRC}/hero-bg-1.png`)
  .resize(2400, 1350, { fit: "cover" })
  .webp({ quality: 82, effort: 6 })
  .toFile(`public/hero-bg.webp`);
console.log(`✓ hero-bg.webp`);
