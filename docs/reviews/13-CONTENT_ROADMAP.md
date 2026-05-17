# Content & Site Roadmap — what's shipped, what's next

**Last updated:** 2026-05-17

## What shipped this session

### Structural
- ✅ Tagline + positioning rewritten — now leads with "Product & Program Leader · Payments · Fintech · AI"
- ✅ Profile data enriched with PMO, programme management and AI signals — 4 production AI solutions, 40-engineer org, full programme delivery stack
- ✅ Bio under About-page H1 added; surfaces PMO + AI experience
- ✅ Hero subhead now name-checks card acquiring, cross-border, settlement, KYC/KYB, AML/CFT, fraud AND AI-augmented operations + PMBOK/Agile governance
- ✅ Credibility strip on hero now includes TikTok · Uber · Temu · MoneyGram · PUBG · InDrive
- ✅ "Essays" rebranded to "Blog" in nav, footer, page CTAs; "Work" rebranded to "Case Studies"
- ✅ Resume preview strip added to `/for` (above the lens sections) — 30-second view with 12 metrics, "Now", "Open to", "Locations" panels
- ✅ New `/media` page (Videos / Podcasts / Talks) with 6 placeholder entries
- ✅ Sitemap updated to include `/media`
- ✅ Navigation expanded to include Media

### Content (data + markdown)
- ✅ 3 new case studies added (now 10 total):
  - TapmadTV $3M Digital Transformation Programme (Program Management)
  - Production GenAI Suite at Simpaisa — 4 deployments (AI in Fintech)
  - BNPL Launch at Simpaisa: 0 → 100K Users in 8 Months (Product Strategy)
- ✅ 12 new blog posts added (now 50 total):
  - **AI in Fintech (5):** "GenAI in Fintech: 4 Production Use Cases", "RAG for Merchant Integration Support", "AI-Powered Auto-Escalation", "Value-Modeling GenAI Use Cases", "AI Fraud Detection vs Rule Engines"
  - **Crypto & Stablecoins (3):** "Crypto On-Ramps: A Product Guide", "Crypto Off-Ramps in Emerging Markets", "Stablecoin Payments in 2026"
  - **Program Management & PMO (4):** "Building a PMO from Scratch (90-day playbook)", "PMBOK + Agile Hybrid Frameworks", "Running a $3M Transformation Programme: Postmortem", "RAID, SteerCo and the PMO Stack at $1B+ Scale"
- ✅ 3 new topic hubs added:
  - AI in Fintech & Payments
  - Crypto & Stablecoin Payments
  - Program Management & PMO

### Code & infra
- ✅ All new content has full SEO frontmatter (metaTitle, metaDescription, keywords, FAQ sections)
- ✅ Posts.ts regenerated (38 → 50 posts; 7 → 10 categories)
- ✅ Build still passes
- ✅ Pushed to `origin/main`

---

## What's next — priority order

### P0 — visual polish (you do)
- [ ] Generate 8 OG card images per `11-IMAGES_NEEDED.md` Priority 1
- [ ] Generate 10 case-study hero images per `11-IMAGES_NEEDED.md` Priority 2
- [ ] Drop into `public/og/` and `public/case-studies/`, ping me to wire them in

### P0 — first videos (you do)
- [ ] Record 3 Loom walk-throughs (Simpaisa architecture, BNPL launch, AI suite)
- [ ] Update `src/data/media.ts` with URLs; remove "Coming soon" badges (or ask me to)

### P1 — content depth (next 30 days)
- [ ] **Write 6 more blog posts** to round out the AI / Crypto / PMO hubs:
  - AI: "Building a value-modeling council for fintech AI", "AI compliance posture: what regulators actually ask"
  - Crypto: "Travel Rule integration: what your platform actually needs to ship", "Stablecoin settlement: the working capital implications"
  - PMO: "Quarterly OKR design for a 12-squad fintech", "The vendor war room: PMO playbook for multi-vendor launches"
- [ ] **Add 2 more case studies**:
  - Wing Logic PMO Setup (Dubai, $12M+ project portfolio)
  - Issuer Enablement Programme (50+ partners, +14% authorisation uplift)

### P1 — distribution
- [ ] Custom domain (`rizwanzafar.com` or similar) — see `00-INDEX.md`
- [ ] Real contact form backend — set `VITE_CONTACT_ACCESS_KEY` in Lovable env (see `.env.example`)
- [ ] LinkedIn weekly cross-post of the most relevant blog post to each lens audience

### P2 — site structure
- [ ] Per-topic landing pages (`/topics/<slug>`) — currently topics route exists but doesn't deep-dive each hub
- [ ] Per-company sub-pages under `/for` (e.g. `/for/visa`, `/for/stripe`) — only 3 lens pages today; we could spin out top 8 companies
- [ ] Testimonials section once you have real recommendations from payments leaders
- [ ] A `/now` page (what you're working on this month) — strong recruiter signal

### P2 — discovery
- [ ] Subscribe widget on blog posts (ConvertKit or Buttondown — free at this scale)
- [ ] RSS feed at `/feed.xml`
- [ ] Newsletter monthly digest auto-composed from the month's posts

### P3 — long-term
- [ ] First conference talk lined up; update `/media`
- [ ] First podcast appearance lined up
- [ ] Open-source one of the diagrams (e.g. the multi-rail architecture) as a reusable reference

---

## Editorial cadence recommendation

**2 blog posts per month, indefinitely.** That signals momentum without being unsustainable.

Suggested rotation (12 months out):
- Month 1–2: finish the AI / Crypto / PMO scaffolds with 6 more posts
- Month 3–4: real customer-quote + case-study refresh
- Month 5–6: video walk-throughs for top 5 case studies
- Month 7–9: 3 conference talks / podcasts
- Month 10–12: book-length deep dive on one topic (e.g. "Cross-Border Corridors at Scale" — could become a real book)

---

## Categories now live

| Hub | Essays | Case studies | Live link |
|-----|--------|--------------|-----------|
| Payment Infrastructure | 10+ | 1 | `/topics` |
| Cross-Border Payments | 15+ | 1 | `/topics` |
| SWIFT & ISO 20022 | 16+ | 0 | `/topics` |
| Settlement & Reconciliation | 6+ | 1 | `/topics` |
| Merchant Onboarding | 6+ | 1 | `/topics` |
| Fraud & AML/CFT | 12+ | 1 | `/topics` |
| Payment APIs | 2+ | 0 | `/topics` |
| Emerging Markets | 6+ | 0 | `/topics` |
| **AI in Fintech** (new) | **5** | **1** | `/topics` |
| **Crypto & Stablecoins** (new) | **3** | **0** | `/topics` |
| **Program Management & PMO** (new) | **4** | **1** | `/topics` |

---

## Quick sanity check

Visit https://rizwan-pay-architect.lovable.app after the next deploy and verify:
- Nav reads: Products · Case Studies · Blog · Media · Topics · For recruiters · Contact
- Hero subhead mentions AI-augmented operations + PMBOK/Agile
- `/for` has the new "Résumé · 30-second view" panel near the top
- `/media` exists with 6 placeholder cards
- `/blog` shows new AI / Crypto / PMO categories in the filter chips
- `/product-work` shows 10 case studies (was 7)
