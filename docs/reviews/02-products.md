# Products Page Review — `/products`

**URL:** https://rizwan-pay-architect.lovable.app/products
**Severity:** Medium (functional; two empty tiles hurt credibility)

---

## Current state

| Element          | Current value                                                       |
| ---------------- | ------------------------------------------------------------------- |
| `<title>`        | "RZ Rizwan Zafar Payments · Product"                                |
| Meta description | **Missing** ❌                                                      |
| H1               | "Products I have built — and products I am building"                |
| Tiles            | Simpaisa · Tapmad · Felo App (coming soon) · Job Hunt (coming soon) |
| Above-fold KPIs  | $1B+ GTV · 25M+ monthly tx · 5 markets · 99.95% SLA                 |

---

## Issues

### P0 — fix first

**The two "Coming soon" tiles (Felo App, Job Hunt) are net-negative right now.**
They say "No features announced yet" and "In quiet build". A recruiter sees two empty cards on a portfolio page and reads it as "this person ships less than I thought".

Three options, pick one:

1. **Hide them** until you have a demo, a screenshot, or even a paragraph of the problem you're solving. This is the safest move.
2. **Ship a preview page** with: 1-line elevator pitch, the problem, your hypothesis, target user, and a clear "Request access" form that captures real intent.
3. **Move them to a separate `/labs` or `/building` section** with a single-line explanation: _"Side projects I'm prototyping outside Simpaisa hours."_

**Add a meta description.** This page is one of your top recruiter targets.

- Suggested: "Payments products built by Rizwan Zafar — Simpaisa ($1B+ GTV across 5 markets), Tapmad (50%→1% payment cost migration), and projects in progress. Full case studies with architecture, trade-offs, and impact."

### P1 — strong improvements

**Tile descriptions vary in length and structure.** Use a consistent template:

```
[Product name]   [status pill: Shipped / Scaling / Building]
[1-line value prop]
[3 KPI stats in a row]
[1-line "What I owned" — your specific contribution]
[CTA: Read case study →]
```

**Make the "Request preview" forms useful.**

- Currently the form fields are Name + Company.
- Add: Role, "What problem are you trying to solve?", and "How did you hear about this?"
- These three additions let you triage requests and learn what's resonating.

**Simpaisa tile copy is dense.**

- Current: "pay-in, payout, wallets, DCB, IBFT, card acquiring, cross-border, FX, settlement, fraud and KYC/KYB"
- That is 11 categories in one line. Group them: _"Acceptance (cards, wallets, DCB, IBFT) · Cross-border + FX · Settlement · KYC/KYB · Fraud/AML."_
- Easier to scan, same content.

**Tapmad tile undersells the result.**

- Current: "reduced payment costs from ~50% to ~1% and increased ARPU by +70%"
- Stronger: "Cut payment cost from 50% of revenue to 1%. Lifted ARPU 70%. 5M+ subscribers migrated without churn spike."
- Adds the "without churn spike" qualifier which is the actual product win.

### P2 — polish

- The H1 "Products I have built — and products I am building" is slightly long. Try: "What I've built. What I'm building." (parallel structure, shorter, same intent).
- Add status pills (`Shipped` / `Scaling` / `Building`) to each tile so the visitor knows what stage each product is at without reading copy.
- Add a "How I work with founders / GTM teams" line at the bottom — turns this page into a soft pitch for advisory work too.

### P3 — nice-to-have

- A small filter row above the tiles: `All · Shipped · Building` (only useful once you have more products).
- One screenshot or architecture diagram per shipped product — even a redacted one. Visuals double dwell time.

---

## SEO

```html
<title>Products by Rizwan Zafar — Simpaisa, Tapmad and projects in progress</title>
<meta
  name="description"
  content="Payment products built by Rizwan Zafar: Simpaisa payments infrastructure ($1B+ GTV, 5 markets), Tapmad wallet/billing migration (50%→1% cost), and projects in build."
/>
```

---

## Copy rewrite — Felo App tile (option 2: preview page)

**Before:**

```
Felo App
Coming soon
No features announced yet
[Request preview →]
```

**After:**

```
Felo App                                  [Building · preview Q3 2026]
A consumer payments app I'm prototyping for [the specific user, e.g. "GCC remitters"].
What it solves: [one specific pain point].
Why now: [one sentence on the market shift].
[Request preview →]
```

If you cannot fill those blanks today, hide the tile. The empty version costs more than it earns.

---

## Quick checklist

- [ ] Decide: hide / ship preview / move "Coming soon" tiles
- [ ] Add meta description
- [ ] Standardise tile template (status pill + KPIs + "what I owned")
- [ ] Group Simpaisa's category list
- [ ] Rewrite Tapmad result line with "without churn spike"
- [ ] Expand preview-request form fields
- [ ] Tighten H1
