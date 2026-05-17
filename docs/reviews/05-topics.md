# Topics Page Review — `/topics`

**URL:** https://rizwan-pay-architect.lovable.app/topics
**Severity:** Low (functional and well-structured; minor polish only)

---

## Current state

| Element | Current value |
|---------|---------------|
| `<title>` | "RZ Rizwan Zafar Payments · Product" |
| Meta description | **Missing** ❌ |
| H1 | "Eight hubs for regulated payments" |
| Hubs | Payment Infrastructure (10e/2cs) · Cross-Border (17e/2cs) · SWIFT·ISO 20022 (16e/0cs) · Settlement·Recon (6e/2cs) · Onboarding (6e/1cs) · Fraud·AML (12e/2cs) · Payment APIs (2e/0cs) · Emerging markets (6e/3cs) |
| CTA per hub | "Filter essays →" |

`e` = essays · `cs` = case studies

---

## Issues

### P0 — fix first

**Add meta description.** This page targets browse-by-topic intent — high SEO value.
- Suggested: "Eight topic hubs on regulated payments: infrastructure, cross-border, SWIFT/ISO 20022, settlement, onboarding, fraud/AML, payment APIs, emerging markets. Essays + case studies from $1B+ GTV production work."

**Hub CTA wording is inconsistent with the page's purpose.** "Filter essays →" suggests you're going back to `/blog` with a filter applied. If that's the actual behaviour, fine — but the page title says "Eight *hubs*", which implies a destination page per topic. Decide:

- **Option A (recommended):** Build a real hub page per topic at `/topics/<slug>` with: intro paragraph (your point of view on the topic), top 3 essays, all essays list, related case studies, related external resources you respect. This is far better for SEO and reader retention.
- **Option B:** Rename "hubs" to "filters" and accept this is just a categorised view of `/blog`. Less ambitious but honest.

If you go with A, the CTA becomes `Open hub →` not `Filter essays →`.

### P1 — strong improvements

**Two hubs are under-resourced.**
- SWIFT·ISO 20022: 16 essays but **0 case studies**.
- Payment APIs: only **2 essays** and 0 case studies.

Either:
- Add 1–2 case studies to SWIFT·ISO 20022 (you must have done MX/MT work given your background), OR
- Hide the "0 case studies" count so the gap doesn't draw attention.

Payment APIs hub looks thin. Either add essays this quarter (good topic — high SEO value) or fold it into Payment Infrastructure.

**The 8-hub grid is symmetric and reads as templated.** Add a one-line POV under each hub title so visitors know *your* angle, not just the topic:

```
Cross-border
"Corridors are won at the regulator's office, not the engineering offsite."
17 essays · 2 case studies
[Open hub →]
```

This converts a generic topic list into a content brand.

### P2 — polish

- "Eight hubs for regulated payments" — fine but a touch dry. Try: "Eight topics. Production-grade depth." or "What I write about, organised."
- Hub icons would help scannability — a small icon per hub (network, globe, lock, scale, etc.).
- The number "Eight" can flex over time. Either keep it generic ("Topics. Production-grade depth.") or commit to maintaining exactly eight.

### P3 — nice-to-have

- A "Roadmap" section: "Topics I'm writing about next quarter" — signals momentum.
- "Most-asked questions" per topic — for each hub, list the 3–5 questions you get most often. Great for AI search (Perplexity, ChatGPT) which loves Q&A-formatted content.

---

## SEO

If you build real hub pages (`/topics/<slug>`), each one should have:

```html
<title>Cross-Border Payments — essays and case studies by Rizwan Zafar</title>
<meta name="description" content="Field notes on cross-border payments infrastructure: corridor design, FX, settlement, regulatory mapping. 17 essays and 2 case studies from production deployments in MENA and South Asia.">
```

Add `CollectionPage` schema:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Cross-Border Payments",
  "url": "https://rizwan-pay-architect.lovable.app/topics/cross-border",
  "hasPart": [/* list of article URLs in this hub */]
}
</script>
```

---

## Quick checklist

- [ ] Add meta description
- [ ] Decide: real hub pages or filter aliases? (Recommend real hub pages)
- [ ] Rename CTA to match decision ("Open hub →" or "Filter essays →")
- [ ] Add 1-line POV under each hub title
- [ ] Fix the two thin hubs (SWIFT case studies; Payment APIs essays)
- [ ] Add hub icons for scannability
- [ ] If building hub pages: add CollectionPage JSON-LD
