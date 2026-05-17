# Website Review — rizwan-pay-architect.lovable.app

**Reviewed:** 2026-05-17
**Site owner:** Rizwan Zafar — Payments Product Executive
**Hosting:** Lovable.app (subdomain)

---

## Files in this review

| #   | File                       | Page reviewed                      | Severity |
| --- | -------------------------- | ---------------------------------- | -------- |
| 00  | `00-INDEX.md`              | This file (master summary)         | —        |
| 01  | `01-homepage.md`           | `/` Homepage                       | High     |
| 02  | `02-products.md`           | `/products`                        | Medium   |
| 03  | `03-product-work.md`       | `/product-work` and 7 case studies | Medium   |
| 04  | `04-blog.md`               | `/blog` listing + article pages    | High     |
| 05  | `05-topics.md`             | `/topics`                          | Low      |
| 06  | `06-for-recruiters.md`     | `/for` + 3 vertical lens pages     | Medium   |
| 07  | `07-contact.md`            | `/contact`                         | High     |
| 08  | `08-about.md`              | `/about`                           | Medium   |
| 09  | `09-resume.md`             | `/resume`                          | Medium   |
| 10  | `10-global-site-issues.md` | Site-wide SEO, perf, a11y          | Critical |

Severity scale: **Critical** = blocks credibility · **High** = visible impact · **Medium** = polish · **Low** = nice-to-have.

---

## Top 10 fixes (do these first)

1. **Add unique `<meta name="description">` to every page** — only the homepage has one. This is the single biggest SEO loss. _(see 10-global-site-issues.md)_
2. **Move off the `lovable.app` subdomain to a custom domain** (e.g. `rizwanzafar.com`) — recruiters will not take a `*.lovable.app` URL on a CV seriously. _(see 10)_
3. **Replace the mailto-only contact form** with a real submission (Formspree, Web3Forms, or a Lovable backend). Many recruiters use webmail that does not trigger `mailto:`. _(see 07-contact.md)_
4. **Add Open Graph + Twitter Card meta tags** so the link previews well on LinkedIn, WhatsApp, and X. _(see 10)_
5. **Add JSON-LD `Person` and `Article` schema** for AI search visibility (ChatGPT, Perplexity, Google AI Overviews). _(see 10)_
6. **Fix the "Coming soon" copy on Felo App and Job Hunt** — either give a date or remove them from the public catalogue. Empty cards weaken the portfolio. _(see 02-products.md)_
7. **Clean up vague impact metrics** ("Materially reduced", "Significantly down") on case study tiles — replace with the actual number or remove. _(see 03-product-work.md)_
8. **Standardise the `<title>` format** — some pages render as `RZ Rizwan Zafar Payments · Product`, others as `Rizwan Zafar — Payments Product Executive`. Pick one pattern. _(see 10)_
9. **Add tooltips/short blurbs to the blog "Reader type" filters** (Network product / PSP / Bank) — first-time visitors do not know what to pick. _(see 04-blog.md)_
10. **Add explicit alt text to every image** beyond the portrait — confirm with a Lighthouse a11y pass. _(see 10)_

---

## What's already strong (don't break these)

- **Positioning is sharp.** "Payments product executive in Dubai. I build regulated payment infrastructure across acceptance, cross-border corridors, settlement, KYC/KYB, AML and fraud." Specific, scannable, no fluff.
- **Quantified proof points** ($1B+ GTV, 25M+ monthly tx, 99.95% SLA, 50%→1% cost). Recruiters need these in the first scroll — keep them above the fold.
- **The "For recruiters" lens pages** (Visa/Mastercard, Stripe/Adyen/Wise/Thunes, Banks/Fintechs) are a _very_ smart segmentation. Most candidate sites do not do this.
- **Topic-hub IA** (8 hubs with essay + case-study counts) is well-structured and SEO-friendly.
- **The portrait alt text is excellent**: "Portrait of Rizwan Zafar, Chief Product Officer, Payments" — descriptive, role-anchored.
- **Footer is clean and consistent** across pages.

---

## Notes on what was reviewed

- **9 unique page templates** were fetched and analysed (homepage, products, product-work index, one case study, blog index, topics, for-recruiters index, one lens page, contact, about, resume).
- **57 URLs were enumerated** from `sitemap.xml`; the 31 blog articles share the same template so the blog review covers the pattern, not each post.
- The case study slug pattern is `/product-work/<slug>` (not `/case-studies/<slug>` or `/work/<slug>` — those 404).
- `robots.txt` is correctly configured (`Allow: /`, sitemap referenced).
- `© 2026` in the footer is correct (today is 2026-05-17) — not a future-date bug as some automated scans flag.
- `rizwanzaffar.pk@gmail.com` is your actual email (per your profile); the `.pk` is part of the local-part, not the domain. Not a typo — leave it.

---

## Suggested order of work

**Week 1 — credibility blockers**

- Custom domain + DNS
- Meta descriptions on all pages
- Real contact form
- OG/Twitter meta tags

**Week 2 — SEO and AI visibility**

- JSON-LD schema (Person, Article, BreadcrumbList)
- Title tag standardisation
- Internal linking pass between essays and case studies
- Lighthouse audit + a11y fixes

**Week 3 — copy polish**

- Replace vague metrics on case study tiles
- Decide on Felo/Job Hunt: ship a preview, give a date, or hide
- Tooltips on blog filters
- Re-read every CTA aloud — many are duplicated

**Week 4 — extras**

- Add a `/now` page (what you're working on this month) — strong recruiter signal
- Add 2–3 video clips (Loom) on key case studies
- Add testimonials when the "in progress" section fills
