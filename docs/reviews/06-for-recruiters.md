# For Recruiters Review — `/for` + 3 vertical lens pages

**URLs:**
- Index: `/for`
- `/for/visa-mastercard`
- `/for/stripe-adyen-wise-thunes`
- `/for/banks-fintechs`

**Severity:** Medium (this is one of your most differentiating features — sharpen it)

---

## Current state

| Element | Current value |
|---------|---------------|
| `<title>` | Inconsistent ("RZ Rizwan Zafar — Payments Product Executive" on vertical pages) |
| Meta description | **Missing** ❌ |
| H1 (index) | "Pick your lens. Read the work in your language." |
| Lens pages | Visa & Mastercard · Stripe, Adyen, Wise & Thunes · Banks & Regulated Fintechs |
| Per-lens content | Target companies · Relevant roles · Quantified proof points · Case studies · Essays |

---

## Why this is a strong idea

Almost no candidate site segments by audience. Recruiters at Visa want very different proof than recruiters at Stripe. By front-loading the right work for each lens, you save them 5–10 minutes. **Do not weaken this — sharpen it.**

---

## Issues — index page

### P0 — fix first

**The H1 promise needs a 1-line subhead that names the three lenses.**
- Current: "Pick your lens. Read the work in your language."
- After: "Pick your lens. Read the work in your language. Different recruiters care about different things — networks, orchestrators, or banks. Pick one and I'll surface the work that maps to your hiring profile."

This converts a cute headline into a clear value prop.

**Add meta description.**
- Suggested: "Rizwan Zafar — payments product work, organised by recruiter lens. Visa/Mastercard roles, Stripe/Adyen/Wise/Thunes roles, and bank/fintech roles. See the case studies and essays that map to your hiring profile."

### P1 — strong improvements

**Add a fourth lens or be clear three is enough.** Common gaps:
- "For founders / GTM partners" — useful if you want advisory work.
- "For investors / boards" — useful if you want board-advisor work.

If you don't want these gigs, three is right. But the absence reads as a gap to anyone who isn't a recruiter at one of the named companies.

**Show stat differences across lenses.** Each lens page currently shows the same hero stats ($1B+ GTV etc.). Vary them:
- Visa/Mastercard lens — lead with scheme cert programmes, AML/CFT controls, fraud loss rates.
- Stripe/Adyen lens — lead with merchant onboarding, API design, latency, settlement.
- Banks lens — lead with compliance, reconciliation, regulatory mapping.

Same underlying data, but tailored framing. This is the *whole point* of segmenting — finish the job.

### P2 — polish

- "Pick your lens" is great. Add a visual: three large cards on the index page, each with the lens name and the most-quoted stat for that audience.
- Add a small "Why I segment this way" expandable section — shows thoughtfulness about hiring panels.

---

## Issues — vertical lens pages

### P0

**Title pattern is wrong on vertical pages.** Currently `"RZ Rizwan Zafar — Payments Product Executive"`. Should be specific:
- `/for/visa-mastercard` → `"For Visa & Mastercard recruiters — Rizwan Zafar"`
- `/for/stripe-adyen-wise-thunes` → `"For Stripe, Adyen, Wise & Thunes recruiters — Rizwan Zafar"`
- `/for/banks-fintechs` → `"For bank and fintech recruiters — Rizwan Zafar"`

Search engines and link-preview cards will use these.

**Add a relevant-roles section that's specific.** Don't just list "Director, Product." List the *actual JD titles* you've researched:
- Visa: "Senior Director, Acceptance Solutions" · "Director, Issuer Solutions, CEMEA"
- Mastercard: "VP Product, Cross-Border Services" · "Director, Acceptance, Middle East"
- Stripe: "Product Lead, Cross-Border" · "Product Manager, Issuing"

This signals you've done the homework. It's a 30-minute job once and pays for itself.

### P1

**Add a "What we'd talk about in the first interview" section per lens.** 4–6 bullets of the specific topics you'd dig into. This pre-sells your interview value and helps recruiters frame internal calibration.

Example for Stripe/Adyen lens:
> *"Topics I can speak to depth on:*
> *— Orchestration vs. acquirer-direct trade-offs in MENA*
> *— Building a settlement engine vs. buying Modulr/Currencycloud*
> *— Fraud thresholds for emerging markets vs. EU*
> *— Latency budgets in markets with weak telco infra"*

**Per-lens "case studies most relevant to you" should already be filtered.** Confirm that the Visa/MC lens leads with the fraud/AML/scheme cert case studies, not Tapmad (which is more orchestrator-relevant).

**Per-lens "essays most relevant to you" — same logic.** Lead with the SWIFT/ISO 20022 essays for the Visa/MC lens, ledger/API essays for Stripe/Adyen, compliance/reconciliation for banks.

### P2

- "Open to senior payments product roles" footer line is repeated across lens pages. Differentiate slightly: *"Open to Director/VP Acceptance roles at Visa/MC"* vs. *"Open to Product Lead, Cross-Border or Issuing roles at Stripe/Adyen/Wise/Thunes"*.
- Add a "Reply within 24 hours" promise if you can keep it — recruiters notice.
- Add the "Discuss a role" CTA twice — once near the top, once near the bottom.

### P3

- One short video per lens (60 seconds) — *"Here's how I'd think about Director, Acceptance Solutions at Visa"* — turns the page into a soft pitch.

---

## SEO

```html
<!-- /for/visa-mastercard -->
<title>For Visa & Mastercard recruiters — Rizwan Zafar, Payments Product</title>
<meta name="description" content="Payments product work mapped to Visa & Mastercard hiring profiles: scheme cert programmes, AML/CFT, fraud (< 0.1% GTV loss), settlement (99.95% SLA), cross-border corridors across 5 markets.">

<!-- /for/stripe-adyen-wise-thunes -->
<title>For Stripe, Adyen, Wise & Thunes recruiters — Rizwan Zafar</title>
<meta name="description" content="Payments product work mapped to orchestration/PSP hiring profiles: merchant onboarding (weeks → hours), settlement engine, multi-rail API design, fraud at $1B+ GTV scale.">

<!-- /for/banks-fintechs -->
<title>For bank & fintech recruiters — Rizwan Zafar</title>
<meta name="description" content="Payments product work mapped to bank and regulated-fintech hiring profiles: regulatory mapping (PK/BD/NP/IQ/EG), reconciliation, AML/CFT, KYC/KYB, settlement, audit-grade controls.">
```

---

## Quick checklist

### Index
- [ ] Subhead under H1 naming the three lenses
- [ ] Meta description
- [ ] Decide on a 4th lens (founders/investors) or commit to three

### Each lens page
- [ ] Unique `<title>` per lens
- [ ] Unique meta description per lens
- [ ] Specific JD titles in "relevant roles" section
- [ ] Tailored hero stats (don't repeat homepage stats verbatim)
- [ ] "What we'd talk about in the first interview" section
- [ ] Confirm case study + essay ordering is genuinely tailored, not generic
- [ ] CTA twice per page
