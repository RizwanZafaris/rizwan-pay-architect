## What I pulled from the LinkedIn export

Real, usable signal we should ground the site in:

- **Headline**: "Product & Program Leader | Payments Infrastructure, Cross-Border Systems & Delivery | $1B+ GTV | Emerging Markets"
- **Real summary**: 8+ years payments/fintech, current CPO at Simpaisa, 25+ person team, dual CPO+acting CTO during 2024 regulatory crisis, PCI DSS + ISO 27001 from scratch.
- **Real metrics** (more precise than current draft): $1B+ GTV, 25M+ monthly txns, 99.95% settlement SLA, fraud loss <0.1% of GTV, 90% downtime reduction, 30% enterprise wallet adoption, 0→5M subs at Tapmad, $10M+ ARR, ARPU +70%, payment cost 50%→1%, $12M+ portfolio at Wing Logic (delays −40%), $8M+ at CIMKO DRC, $15M / 400+ projects at DS Engineering (efficiency +70%).
- **Full career arc (8 roles)**: PIA intern → PESCO Sr. Planning Engineer → DS Engineering PMO → CIMKO DRC Asst Manager → Wing Logic PMO Dubai → Tapmad Sr. PM → Daraz (Alibaba) Project Manager → Simpaisa CPO.
- **Education**: MIT Sloan — Mastering Design Thinking (2022); MSc + BSc Karachi University (Physics).
- **Certs**: PMP (PMI), plus LinkedIn Learning items.
- **Honor**: Youngest Project Manager of the Year 2015.
- **Volunteering**: PMI Karachi Chapter — Director of Governance (2021–22), VP Volunteering (2022–23).
- **Recommendations**: 6 visible recs we can quote (Jan Kosela, Alfred Nilius, Hassam Mehmood, Naseem Hassan, Ateeb Ahsan, Shariq Ehsan).
- **Contact / social**: rizwanzaffar.pk@gmail.com, personal site www.rizwan-zafar.com, Twitter @rizwan_zafar, LinkedIn /in/rizwanzafar (assumed handle), Dubai UAE.
- **Markets corrected**: Pakistan, Bangladesh, Nepal, Iraq, Egypt (Simpaisa) + Sri Lanka, Myanmar (Daraz era) + UAE/KSA (Tapmad expansion). Senior CPO scope = 5 countries.
- **Partner ecosystem confirmed**: DLocal, Thunes, Boku, Coda; enabled TikTok, Temu, Uber, InDrive, MoneyGram, PUBG. Add InDrive (was missing).

## Plan

Keep the existing design system, route structure, and SEO/JSON-LD scaffolding. Replace placeholder copy with real data and add three small surfaces.

### 1. `src/data/profile.ts` — replace with real data
- Real headline + summary (lightly edited for the executive tone).
- Add `personalSite`, `twitter`, update `email`, `linkedin`.
- Add InDrive to partners.
- Replace 4-role experience array with the **full 8-role timeline** (PIA → Simpaisa), with real bullets and metrics from the export.
- Add `education` (MIT Sloan, Karachi University ×2).
- Add `honors` (Youngest PM of the Year 2015).
- Add `volunteering` (PMI Karachi — Director / VP).
- Refine metrics strip with the more credible numbers (add "fraud <0.1% GTV").

### 2. `src/data/recommendations.ts` (new)
Six structured rec entries with name, title/company, quote, date. Used on About page (and a 2-card teaser on Home).

### 3. `src/data/caseStudies.ts` — tighten with real numbers
- Simpaisa: add 99.95% SLA, fraud <0.1% GTV, 90% downtime reduction, 30% enterprise wallet adoption, dual CPO+CTO during regulatory tightening (2024), MPGS/MDES card acquiring detail.
- Tapmad: confirm 0→5M, $10M+ ARR, ARPU +70%, MENA expansion (UAE/KSA).
- Daraz: 5 markets (PK, BD, LK, NP, MM), COVID-driven volume surge context.
- Add a short "Wing Logic PMO" lighter case study OR keep it only on Resume — recommend Resume-only since it's not payments.

### 4. Pages

**Home (`/`)**
- Update headline to keep current punch but add subtler line: "Payments product executive · Dubai".
- Replace current subheadline with a tightened version of the real LinkedIn summary.
- Metrics strip: GTV, monthly txns, settlement SLA, fraud loss, payment cost reduction.
- Add **2-quote testimonial strip** above the footer (pulled from recs).

**About (`/about`)**
- Rewrite the narrative using the real arc: PIA intern → power infrastructure (PESCO) → engineering portfolios (DS) → DRC (CIMKO) → Dubai PMO (Wing Logic) → product leap at Tapmad → Alibaba/Daraz scale → CPO at Simpaisa.
- Pull the "execution matters more than plans", "DRC taught me to plan when nothing is reliable", and "dual CPO+CTO during regulatory crisis" beats verbatim — they're the differentiating texture.
- Add **Recommendations** section (4–6 quote cards).
- Add small Education + Honors strip (MIT Sloan + PMP + Youngest PM 2015).

**Resume (`/resume`)**
- Replace 4-role timeline with **all 8 roles**, period + location + bullets.
- Add **Education** block (MIT Sloan; Karachi University MSc + BSc).
- Add **Honors** (Youngest PM 2015).
- Add **Volunteering** (PMI Karachi Director → VP).
- Keep certifications (PMP + PCI DSS Program Lead + ISO 27001 Program Lead).
- Keep download button; PDF stays as the existing placeholder until a real one is provided.

**Contact (`/contact`)**
- Real email, real LinkedIn, add personal site link, add Twitter.

**Footer / Header**
- Footer: add personal site + Twitter alongside email/LinkedIn.
- No structural change to nav.

### 5. SEO / JSON-LD
- Update `Person` JSON-LD in `__root.tsx`: real `name`, real `sameAs` (LinkedIn, personal site, Twitter), `alumniOf` (MIT Sloan, Karachi University), `award` (Youngest PM of the Year 2015).
- Keep all per-route titles/descriptions — light edits where copy changed.

### 6. Things I will NOT do (unless you say otherwise)
- Won't change the design language, palette, or fonts.
- Won't add a real PDF resume — keep placeholder until you upload one.
- Won't add new routes (e.g. `/recommendations`); recs live inline on About + Home.
- Won't pull in your full LinkedIn skill list (95+ items) — keep the curated grouped skills already on Resume; add only the new genuinely-payments ones (e.g. Direct Carrier Billing, IBFT, Merchant Acquiring) if missing.

### Files touched
```
src/data/profile.ts            (rewrite)
src/data/caseStudies.ts        (edit Simpaisa, Tapmad, Daraz)
src/data/recommendations.ts    (new)
src/routes/__root.tsx          (JSON-LD + footer socials)
src/routes/index.tsx           (subheadline + metrics + testimonial strip)
src/routes/about.tsx           (full rewrite of body + recs section)
src/routes/resume.tsx          (8 roles + education + honors + volunteering)
src/routes/contact.tsx         (real contact links)
src/components/SiteChrome.tsx  (footer socials)
```

No new dependencies. Scope is data + copy + a couple of small UI blocks — should land cleanly.
