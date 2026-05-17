# Images Needed — Gemini Generation Guide

Generate each image at the size specified, save to `public/og/` (for OG cards) or `public/case-studies/` (for inline visuals), and we'll wire them into the relevant page.

---

## Priority 1 — Open Graph cards (1200×630, JPEG or PNG)

These show whenever your link is shared on LinkedIn, X, WhatsApp, Slack. The current generic R2 image is hurting your share-rate.

| File | Page | Prompt for Gemini |
|------|------|-------------------|
| `og-default.png` | Site-wide fallback | "1200×630 social card. Editorial / fintech aesthetic. Dark navy background (#0F1115) with subtle gradient. Large clean serif headline 'Rizwan Zafar' top-left. Below: 'Payments Product Executive · Dubai' in mono caps. Right side: clean abstract geometric visual representing payment rails — interlinked nodes, gradients of emerald and warm gold. Generous negative space. Minimal, premium, no AI artefacts." |
| `og-home.png` | `/` | Same template, headline: 'Payments · Fintech · AI · Cross-Border Systems'. Subhead: '$1B+ TPV across 5 markets'. |
| `og-products.png` | `/products` | Same template. Headline: 'Products I've Built'. Subhead: 'Simpaisa · Tapmad · BNPL · AI Suite'. |
| `og-case-studies.png` | `/product-work` | Same template. Headline: 'Case Studies in Regulated Payments'. Subhead: '10 production deployments at $1B+ GTV scale'. |
| `og-blog.png` | `/blog` | Same template. Headline: 'A working knowledge base on regulated payments'. Subhead: 'AI · crypto · settlement · cross-border'. |
| `og-about.png` | `/about` | Same template, with a stylized illustration of Rizwan's portrait silhouette in emerald/gold. Headline: 'Engineer first. Payments operator second. Product leader by design.' |
| `og-for.png` | `/for` | Same template. Headline: 'For Recruiters'. Subhead: 'Visa / Mastercard · Stripe / Adyen / Wise / Thunes · Banks & Fintechs'. |
| `og-media.png` | `/media` | Same template. Headline: 'Videos, Podcasts and Talks'. |

**Why these matter:** every page currently shares the same generic preview. Per-page OG cards typically lift share CTR 2–4×.

---

## Priority 2 — Case-study hero images (1600×900, PNG or WebP)

One per case study, inline at the top of `/product-work/<slug>`. Conceptual visuals — no people, no logos, no UI screenshots. Premium editorial fintech aesthetic.

| File | Case Study | Prompt |
|------|------------|--------|
| `cs-simpaisa.png` | Simpaisa Payment Infrastructure | "1600×900. Abstract isometric illustration of multi-rail payment infrastructure — overlapping translucent layers labelled cards, wallets, IBFT, cross-border, settlement, risk — emerald and warm gold gradients, dark navy background. Premium, fintech editorial." |
| `cs-merchant-onboarding.png` | Merchant Onboarding + KYC/KYB | "1600×900. Abstract document-stack illustration with progressive verification stages (capture → screen → tier → approve) shown as glowing tiers. Subtle ID-card glow, no actual ID details. Emerald primary." |
| `cs-settlement.png` | Settlement + Reconciliation Engine | "1600×900. Three streams merging into a single ledger — visual metaphor for three-way reconciliation. Subtle clock motif suggesting T+0 / T+1. Gold and emerald palette on dark navy." |
| `cs-fraud-aml.png` | Fraud, Risk and AML/CFT Controls | "1600×900. Multi-layered shield with each layer labelled (device, identity, transaction, behavioural, network). Subtle scan-line effect. Cold emerald palette." |
| `cs-cross-border.png` | Cross-Border Corridors + FX | "1600×900. Stylised world map with glowing corridors connecting UAE, Pakistan, Bangladesh, Nepal, Iraq, Egypt. FX symbols (currency arrows) flowing along the corridors. Dark navy, emerald and warm gold." |
| `cs-tapmad-billing.png` | Tapmad Wallet/Billing Migration | "1600×900. Visual journey from a thick red bar labelled '50% cost' shrinking to a thin gold bar labelled '1% cost', with subscriber growth curve from 0 to 5M overlaid. Editorial chart-style." |
| `cs-daraz-payments.png` | Daraz Payment Operations | "1600×900. Marketplace stylisation — package icons converting from cash-on-delivery (red) to digital (emerald). 5 country flags suggested subtly along the bottom." |
| `cs-tapmad-transformation.png` | TapmadTV $3M Transformation Programme | "1600×900. 5 parallel workstream lines (iOS, Android, web, CMS, CDN) converging at a launch milestone. Gantt-chart style but artistic. Gold and emerald." |
| `cs-ai-suite.png` | Simpaisa AI Solutions Suite | "1600×900. Abstract neural network nodes arranged as 4 distinct clusters labelled Merchant Bot, Auto-Escalate, Partner Support, Fraud/AML. Glowing connections between them. Cold electric blue and emerald." |
| `cs-bnpl.png` | BNPL Launch | "1600×900. Visual growth curve from 0 to 100K users with credit-decision tree overlaid. 8 milestone markers across the curve labelled month 1-8. Editorial chart-style." |

---

## Priority 3 — Blog hero images (1200×675, optional)

Generate as you publish each post. The 12 new posts in particular need these:

### AI posts
- `blog-ai-four-usecases.png` — abstract: 4 distinct AI nodes connected to a central payment ledger
- `blog-rag-merchant.png` — RAG architecture diagram, stylised as flowing data
- `blog-ai-escalation.png` — alert spike → diagnostic packet → on-call paging visual
- `blog-value-modeling.png` — 4-axis scoring chart (ROI / feasibility / data readiness / regulatory risk)
- `blog-ai-fraud-vs-rules.png` — two-layer architecture (rules + ML) with hand-off

### Crypto posts
- `blog-crypto-onramp.png` — stylised fiat → stablecoin flow with KYC tier badges
- `blog-crypto-offramp.png` — stylised crypto → local fiat flow with rail variations (bank, wallet, cash pickup)
- `blog-stablecoins-2026.png` — three stable categories (USDC / USDT / bank-issued) on parallel rails

### PMO posts
- `blog-build-pmo.png` — 90-day timeline with 3 phases (visibility → governance → rituals)
- `blog-pmbok-agile.png` — two parallel tracks (PMBOK gates vs Agile sprints) meeting at integration points
- `blog-3m-postmortem.png` — 5-workstream Gantt converging to single launch milestone
- `blog-raid-steerco.png` — 5-layer PMO stack diagram (RAID, SteerCo, OKRs, RICE, escalation)

---

## Priority 4 — Hero portrait variations (4:5 aspect ratio)

The current cutout is great. Consider these additional variations for variety:

- **Speaking variation** — Rizwan at a podium / conference setting; for `/media` page hero
- **Whiteboard variation** — Rizwan sketching an architecture diagram on a whiteboard; for `/about` page hero
- **Editorial b&w variation** — high-contrast black-and-white portrait; for blog post author bylines

These are nice-to-have, not blockers.

---

## Priority 5 — Diagrams (SVG preferred over raster)

Several blog posts and case studies would benefit from real architecture diagrams. The codebase already has a `DiagramFigure` component pattern at `src/components/diagrams/Diagrams.tsx` — extend it for these.

Don't generate these with Gemini — draw them in Excalidraw or Mermaid and commit as SVG. List for your design pass:

- Simpaisa multi-rail architecture (already partially present)
- Three-way reconciliation flow
- Cross-border corridor abstraction
- BNPL credit/underwriting decision tree
- AI auto-escalation agent flow
- PMBOK + Agile hybrid join points

---

## Gemini prompt tips for premium fintech aesthetic

To keep the visuals coherent with the existing site, add these to every prompt:

> "Style: editorial fintech, premium, minimal, ample negative space, dark navy background (#0F1115), emerald accent (#10B981), warm gold accent (#D4A574). No people, no logos, no UI mockups, no AI watermarks, no text in image except where specified. Subtle grain/noise overlay acceptable. High contrast. Magazine-grade composition."

Generate at 2× the listed dimensions if possible, then downscale — better edge quality.

---

## How to wire images in

Once you've generated and dropped them into `public/og/` or `public/case-studies/`:

- **OG cards**: in `src/lib/seo.ts`, set `VITE_OG_IMAGE_URL` env var to the new default, OR pass `og:image` per-page in each route's `head()`.
- **Case study heroes**: add `heroImage: "/case-studies/cs-simpaisa.png"` to each entry in `src/data/caseStudies.ts`, then render in `src/routes/product-work.$slug.tsx`.
- **Blog hero images**: add `heroImage` to the frontmatter of each markdown file, expose it in `scripts/generate-posts.ts`, render in `src/routes/blog.$slug.tsx`.

I can wire any of these once the images exist — just drop them in and tell me.
