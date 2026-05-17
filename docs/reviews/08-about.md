# About Page Review — `/about`

**URL:** https://rizwan-pay-architect.lovable.app/about
**Severity:** Medium (good bones; needs sharper opening and proof)

---

## Current state

| Element          | Current value                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `<title>`        | "Rizwan Zafar — Payments Product Executive"                                                  |
| Meta description | **Missing** ❌                                                                               |
| H1               | "Engineer first. Payments operator second. Product leader by design."                        |
| Sections         | Where I'm headed · Education · Certifications · Honors · From payments leaders — in progress |

---

## What works — keep this

**H1 is one of the strongest on the entire site.** "Engineer first. Payments operator second. Product leader by design." — clear positioning, memorable rhythm, signals depth. **Do not change it.**

The "Engineer first" framing is your differentiation against PM candidates with weaker technical backgrounds. Lean harder into it elsewhere on the site.

---

## Issues

### P0 — fix first

**Add meta description.**

- Suggested: "Rizwan Zafar — engineer-first payments product leader. 14+ years in product/payments/program delivery. CPO at Simpaisa ($1B+ GTV). MIT Sloan, PMP, PCI DSS. Dubai-based, open to senior roles globally."

**"From payments leaders — in progress" reads as a placeholder.** If no one has written a recommendation yet, **hide the section entirely** until they do. A visible empty testimonial section reads worse than no section at all.

If you need to populate this in the next 30 days: pick 3 former managers/peers/customers and ask for a 2-sentence quote each. Make it easy — draft the quote yourself and ask them to edit. Most will say yes.

### P1 — strong improvements

**Open with a sharper 1-paragraph bio under the H1.** Right now the H1 is great but the supporting copy is thin. Suggested:

> _"I'm a payments product executive who came up through engineering. Eight years building regulated payment infrastructure across MENA and South Asia — currently CPO (acting CTO, 2024) at Simpaisa, where we process $1B+ in annual GTV across five markets for customers like TikTok, Uber and Temu. Before that, Daraz (multi-country payment ops) and Tapmad (cut payment cost from 50% to 1% of revenue). I write essays at /blog and document the production work at /product-work."_

This gives a recruiter everything they need in 30 seconds.

**"Where I'm headed" is currently vague.** Make it specific:

> _"Director or VP roles in payments product — acceptance, cross-border, settlement, fraud/AML, or platform. Targets: Visa, Mastercard, Stripe, Wise, Adyen, Thunes, dLocal, plus serious regional fintechs in MENA/SA. Remote or relocate (Dubai, KSA, Singapore, London preferred). Available from [DATE]."_

The "Available from" line is critical and almost never present on candidate sites.

**Add a "How I work" section.** 4–6 bullets on your operating style. Examples:

- _"Read the regulation before the user research."_
- _"Ship the smallest scheme-cert-passing version, then iterate."_
- _"Write the runbook before the launch — if you can't write it, the feature isn't ready."_
- _"Trade-offs in public — every roadmap doc starts with what we're not building and why."_

This is the section recruiters quote in calibration meetings. Make it good.

### P2 — polish

**Internal links are wrong** — the fetch shows `/about/products`, `/about/product-work`, etc. The links should be absolute (`/products`, `/product-work`), not nested under `/about`. **Verify this — if it's a real bug, every nav link from `/about` is broken.**

- "Honors" section — keep it short and only list items recruiters will recognise. Less is more.
- "Education" + "Certifications" + "Honors" can collapse into a single "Credentials" section with three columns. Saves a scroll.
- MIT Sloan Design Thinking is worth highlighting but be specific it's a short course, not the MBA — clarity protects credibility.

### P3 — nice-to-have

- A small "What I'm reading right now" section (updated quarterly) — humanises the page and gives recruiters a conversation hook.
- One photo from work (a whiteboard, an architecture diagram on a napkin, the office) — breaks up the text.
- A 60-second "About me" Loom video at the top. Recruiters will watch this in 100% of cases vs. ~30% who read the full page.

---

## Critical bug to verify

> Internal links on `/about` may resolve as `/about/products`, `/about/product-work`, `/about/blog`, etc. instead of `/products`, `/product-work`, `/blog`.

If this is a real routing bug, every internal link from the About page is 404-ing. **Verify in the browser by clicking each nav link from `/about` and checking the URL bar.** If broken, this is a P0 fix.

---

## Headers / titles to standardise

```html
<title>About Rizwan Zafar — engineer-first payments product executive</title>
<meta
  name="description"
  content="Rizwan Zafar — 14+ years in product, payments and program delivery. CPO at Simpaisa ($1B+ GTV). MIT Sloan, PMP, PCI DSS. Open to senior payments roles globally."
/>
```

---

## Quick checklist

- [ ] **Verify nav links from `/about` aren't nested as `/about/products` etc. (potential P0)**
- [ ] Add meta description
- [ ] Add 1-paragraph bio under H1
- [ ] Replace vague "Where I'm headed" with specific targets + availability date
- [ ] Add "How I work" section (4–6 bullets)
- [ ] Hide "From payments leaders — in progress" until you have real quotes
- [ ] Collapse Education/Cert/Honors into one "Credentials" section
- [ ] Clarify MIT Sloan as a short course
- [ ] Consider a 60-sec Loom intro
