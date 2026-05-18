# Blog Review — `/blog` + article template

**URLs:**

- Listing: `/blog`
- 31 article URLs in sitemap (pattern `/blog/<slug>`)

**Severity:** High (blog is your SEO + AI-search engine — biggest organic-traffic lever)

---

## Current state

| Element          | Current value                                                                       |
| ---------------- | ----------------------------------------------------------------------------------- |
| `<title>`        | "Rizwan Zafar \| Payments Product"                                                  |
| Meta description | **Missing** ❌                                                                      |
| H1               | "A working knowledge base on regulated payments"                                    |
| Featured essay   | "How SWIFT Payment Works: A Complete Overview"                                      |
| Filters          | Topic · Reader type (Network product / PSP-orchestration / Bank) · Relevant company |
| Article count    | 31 essays across 8 topic hubs                                                       |

---

## Issues — listing page

### P0 — fix first

**Add meta description.** This page should rank for "payments product blog", "payment infrastructure essays", etc.

- Suggested: "Essays on regulated payments infrastructure by Rizwan Zafar: SWIFT, ISO 20022, cross-border corridors, settlement, fraud/AML, KYC, payment APIs. Written from $1B+ GTV production experience."

**"Reader type" filters are opaque.** A first-time visitor sees `Network product · PSP/orchestration · Bank` and has no idea what those mean. Add hover tooltips OR a one-line explainer above the filter row:

> _"Pick the lens closest to your role — we'll surface the essays a Visa/MC product person, a Stripe/Adyen product person, or a bank-side product person will find most useful."_

**The featured essay needs more visual weight.** Currently it's one card among many. Make it 2× the size, add a hero image / abstract, and put it above the filter row, not below.

### P1 — strong improvements

**Article cards need date + read time + topic tag in a consistent row.** Right now read times are there but date is not visible from the listing — readers can't tell what's fresh vs. 2 years old.

Suggested card layout:

```
[Topic pill]   [Date · Read time]
[Title]
[2-line dek]
[Read essay →]
```

**Add an active "sort" control.** Right now the order is implied (probably newest-first). Make it explicit: `Latest · Most read · Editor's picks`.

**Search box has no visible results page.** If a user types "ISO 20022" and hits enter, where do they land? Either:

- Wire a real `/blog/search?q=...` page, or
- Remove the search box and trust filters.

**The "Topic hubs" navigation row at the top duplicates `/topics`.** Decide which is canonical. Recommendation: keep it on `/blog` for fast filtering, but make the styling subtle so it doesn't compete with the featured essay.

### P2 — polish

- "A working knowledge base on regulated payments" — H1 is good but the word "working" reads weak. Try: "A field guide to regulated payments" or "Essays on regulated payments infrastructure".
- Pagination strategy is unclear from the listing — 31 articles will need it. Use infinite scroll OR numbered pages, not both.
- Add an RSS feed link in the footer (`/rss.xml` or `/feed.xml`). Payments people read RSS more than the average; some recruiters check for RSS as a signal you're serious about content.

---

## Issues — article template (for the 31 essays)

Could not fetch a sample article directly (the slugs in the visible nav use query parameters not clean URLs, and `/blog/how-swift-payment-works` returned 404). **Verify the published slug pattern matches what's in `sitemap.xml`.** If the listing page links use one pattern but the sitemap uses another, you have a routing bug — recommend testing this end-to-end.

Assuming the article template renders correctly, these are the recommended must-haves:

### P0

**Every article needs:**

- Unique `<title>` ending with `— Rizwan Zafar`
- Unique meta description (~150 chars, summarises the takeaway)
- Author byline with link to `/about`
- Published date and "last updated" date
- Estimated read time (you already have this on the listing — surface it on the article too)
- A "Why this matters" callout in the first 200 words

**Add JSON-LD `Article` schema** to every essay. This is the single biggest unlock for AI search (Perplexity, ChatGPT browse, Google AI Overviews):

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How SWIFT Payment Works: A Complete Overview",
    "author": {
      "@type": "Person",
      "name": "Rizwan Zafar",
      "url": "https://rzifi.com/about"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-05-01",
    "image": "https://rzifi.com/og/swift-overview.png",
    "publisher": { "@type": "Person", "name": "Rizwan Zafar" },
    "about": [
      { "@type": "Thing", "name": "SWIFT" },
      { "@type": "Thing", "name": "Cross-border payments" }
    ],
    "wordCount": 2400,
    "mainEntityOfPage": "https://rzifi.com/blog/how-swift-payment-works"
  }
</script>
```

### P1

**Internal linking pass.** With 31 essays and 7 case studies, you should have dense cross-linking:

- Every essay should link to 2–3 related essays
- Every essay should link to 1+ related case study where relevant
- Case studies should link to 2–4 essays that go deeper

This is the single biggest lever for SEO + reader retention. Manually audit; consider a "Related" section auto-populated from shared topic tags.

**Add a "Subscribe" capture at the end of every essay** (or before the related links). One field, one button. Use ConvertKit or Buttondown — both free at this scale.

**Add "Was this useful?" feedback widget** (just two buttons). Cheap, gives you signal on which essays are worth expanding.

### P2

- Add a sticky table of contents on essays longer than 1,500 words.
- Add a "Cite this essay" snippet at the bottom (BibTeX / plain text) — academic readers love this and it signals depth.
- Add "Reading list" CTA — "Subscribe to get my monthly payments-infra reading list" — this is a softer ask than "subscribe to the blog".
- Make the topic pill at the top of each article clickable to the topic hub.

### P3

- Estimated reading level (e.g. "Intermediate · assumes familiarity with ISO 20022").
- Discussion: link to a LinkedIn post or X thread where you discussed the essay.
- Audio version (auto-generated TTS) — payments people commute long; some will listen.

---

## SEO — high-leverage topic gaps

Your topic spread is good. Topics with high search volume that you may want to add essays on (if not already covered):

| Search query                                      | Suggested angle                                     |
| ------------------------------------------------- | --------------------------------------------------- |
| "payment orchestration vs PSP"                    | Decision framework from a CPO's view                |
| "ISO 20022 migration checklist for product teams" | Practical, dated, with a downloadable PDF           |
| "real-time payments rails comparison 2026"        | Updated annually — great evergreen + AI-search bait |
| "open banking vs card networks"                   | You have authority here from MENA/SA work           |
| "MENA payments market map"                        | Regional authority play; few competitors            |

---

## Quick checklist

### Listing page

- [ ] Add meta description
- [ ] Tooltips/explainer for "Reader type" filters
- [ ] Promote featured essay visually (2× size + above filters)
- [ ] Add date + read time + topic on each card
- [ ] Wire search OR remove the search box
- [ ] Add RSS feed
- [ ] Tighten H1

### Per article

- [ ] Verify slug routing (sitemap vs. links)
- [ ] Unique title and meta description per essay
- [ ] Add `Article` JSON-LD schema
- [ ] Add "last updated" date
- [ ] Internal links: 2–3 related essays + 1 case study minimum
- [ ] Add subscribe widget
- [ ] Add "Was this useful?" feedback

### Editorial

- [ ] Pick 3 high-leverage topic gaps to add this quarter
- [ ] Set a publishing cadence and stick to it (even one essay/month signals momentum)
