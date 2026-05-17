# Product Work Review — `/product-work` + 7 case studies

**URLs:**
- Index: `/product-work`
- `/product-work/simpaisa-payment-infrastructure`
- `/product-work/merchant-onboarding-kyc`
- `/product-work/settlement-reconciliation`
- `/product-work/fraud-risk-aml-cft`
- `/product-work/cross-border-corridors-fx`
- `/product-work/tapmad-wallet-billing-migration`
- `/product-work/daraz-payment-operations`

**Severity:** Medium (case studies are well-structured; tile copy and meta need work)

---

## Current state — index page

| Element | Current value |
|---------|---------------|
| H1 | "Case studies in regulated payments infrastructure" |
| Filters | Company (Adyen, DLocal, Mastercard, Stripe, Thunes, Visa, Wise) · Compliance theme (PCI DSS, AML/CFT, KYC/KYB, Fraud & Risk, Settlement, Cross-Border, Payment Infrastructure) |
| Cards | 7 case studies with numbering 01–07 |
| Meta description | **Missing** ❌ |

## Current state — sample case study (Simpaisa)

Has all the right sections: Executive summary · Before/after · Problem · System built · Architecture · Operating model · My role · Impact · Trade-offs · Lessons · Why it matters. **This is the strongest content on the site.** Keep this template.

---

## Issues — index page

### P0 — fix first

**Vague metrics on tile descriptions.** Several case study tiles use words like "Materially reduced" and "Significantly down". Recruiters in payments will dismiss these immediately — they read those as "the number is not impressive enough to publish".

Audit every tile and either:
- Replace with the actual number (`Fraud loss <0.1% of GTV`), or
- Remove the line entirely.

If the number is under NDA, say so explicitly: *"Under NDA. Discussed in interviews."* That is far more credible than "materially reduced".

**Add meta description.**
- Suggested: "Seven case studies in regulated payments infrastructure: Simpaisa platform ($1B+ GTV), merchant onboarding/KYC, settlement engine (99.95% SLA), fraud/AML controls, cross-border corridors, Tapmad migration (50%→1% cost), Daraz payment ops."

### P1 — strong improvements

**The "Filter by company" row is clever** (lets a Visa recruiter find Visa-relevant work). But it can mislead: if I click "Stripe", I expect work you did *at* Stripe, not work *relevant to* Stripe. Add a one-line tooltip or header:
> "Work that maps to what each company hires for. I have not been employed at these companies."

This protects credibility — leaving the ambiguity open is risky.

**Numbering (01, 02, …07) implies ordering.** Make sure the order is meaningful — strongest case studies first, not chronological. Right now Simpaisa (your biggest) is #1, which is correct. Daraz at #7 is fine. But double-check this ranking matches what you most want recruiters to remember.

**Add a "Read time" or "Depth" indicator** to each card. Some case studies are scannable in 2 minutes, others are 15+ minutes of architecture diagrams. Recruiters need to know.

### P2 — polish

- Each card should have 3 KPI stats in a consistent format — currently some have stats, some have one line of prose.
- Add the company name and your role on each card (e.g. `Simpaisa · CPO · 2020–present`). Right now you have to click into the study to learn this.

---

## Issues — case study template (using Simpaisa as reference)

### What works — keep all of this

- Section structure (Exec summary → Before/after → Problem → System → Architecture → Operating model → My role → Impact → Trade-offs → Lessons → Why it matters).
- Specific named customers (TikTok, Uber, Temu).
- Honest trade-offs section — this is *very* rare on candidate sites and signals seniority.
- Geography list (Pakistan, Bangladesh, Nepal, Iraq, Egypt).

### P0 — fix on every case study

**Add an explicit "What I personally owned vs. what the team owned" callout.** Most senior payments hiring panels will assume the work is overstated unless you draw the line. The current "My role" section helps, but make it sharper:

```
[Callout box]
I owned:    Roadmap, vendor selection (Visa/Mastercard, banks),
            scheme cert programme, AML policy, eng leadership (acting CTO 2024).
Team owned: Backend implementation (8 eng), QA, ops runbooks.
```

**Add a "What this would look like at your company" closer.** A short paragraph that translates the work to a hiring company's context:

> *"At Visa, this would map to a Director, Acceptance Product role — owning issuer/acquirer cert programmes, scheme governance, and merchant tier strategy."*

This is the single most under-used technique on candidate sites. It does the recruiter's job for them.

### P1 — strong improvements

**Add 1–3 visuals to each case study.** Even simple architecture diagrams as SVG or PNG. The Simpaisa "System built" and "Architecture" sections will be 2–3× more memorable with a diagram.

**Add quotes if you can get them.** Even one line from a CEO, customer or co-founder per case study transforms the credibility. "Proof being gathered" (current copy) is fine as a placeholder for 30 days; after that, it reads stale.

**Trade-offs section is gold — make it longer.** Most candidate sites pretend everything went well. Yours doesn't. Add 2–3 *specific* trade-offs per study with the reasoning. Example:

> *"Built our own settlement engine instead of buying Modulr/Currencycloud. Trade-off: 6 months of build vs. 3 months to integrate. Why: cross-border requirements in Iraq/Egypt weren't supported by off-the-shelf rails. Would I do it again? Yes, but I'd hire a settlement specialist on day one."*

### P2 — polish

- The ◆ section break symbol is fine but inconsistent — make sure every section uses the same divider.
- Add a "Last updated" date so visitors know the case study is current.
- Add a sticky right-rail table of contents on case studies longer than ~2,000 words.
- At the bottom, add "Related case studies →" links to 2–3 others. Right now you have nav to siblings but not contextual links.

### P3 — nice-to-have

- A 30–60 second Loom video on each case study where you walk through the architecture. Reduces interview time and pre-qualifies.
- A redacted Miro / Whimsical board link for the architecture diagrams.

---

## SEO per case study

Each case study should have:
- Unique `<title>`: `<Case study name> — Rizwan Zafar`
- Unique meta description (~150 chars summarising problem + result)
- `Article` JSON-LD schema with `datePublished`, `author`, `about` (topic tags)
- `BreadcrumbList` schema: Home > Product Work > [Case study]

Example for Simpaisa:
```html
<title>Simpaisa Payment Infrastructure: $1B+ GTV across 5 markets — Rizwan Zafar</title>
<meta name="description" content="Building Simpaisa's regulated payment platform from scratch: cards, wallets, DCB, IBFT, cross-border, FX, settlement, KYC/KYB. $1B+ annual GTV, 25M+ tx/mo, 99.95% SLA across PK/BD/NP/IQ/EG. Customers include TikTok, Uber, Temu.">
```

---

## Quick checklist

- [ ] Audit all 7 tile descriptions for vague language ("materially", "significantly")
- [ ] Add tooltip to "Filter by company" explaining mapping
- [ ] Add read-time / depth indicator to each card
- [ ] Consistent 3-KPI format on all cards
- [ ] Add "What I owned vs. team owned" callout to each case study
- [ ] Add "What this maps to at your company" closer
- [ ] Add at least 1 visual per case study
- [ ] Expand Trade-offs sections with specifics
- [ ] Add Article + BreadcrumbList JSON-LD
- [ ] Add unique titles and meta descriptions per case study
- [ ] Replace "Proof being gathered" with real quotes or remove
