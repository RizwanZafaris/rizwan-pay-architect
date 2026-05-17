# Site-Wide Issues — SEO, Performance, A11y, Tech

**Severity:** Critical (these affect every page)

These are findings that apply across the whole site. Fix once, the impact propagates.

---

## 1. Hosting / domain

### Move off `lovable.app` subdomain

**Why it matters:** A `*.lovable.app` URL on a senior payments product candidate's CV reads as "still figuring this out". Recruiters at Visa/Mastercard/Stripe will share your URL internally — the domain is part of the first impression. A `lovable.app` subdomain also:

- Cannot rank as authoritatively on SEO as a custom domain.
- Inherits any reputation hits the parent domain receives.
- Looks transient (recruiters worry the site won't be there in 6 months).

**Recommendation:**

- Register **`rizwanzafar.com`** (or `.io` / `.dev` if .com is taken).
- Configure DNS to point at Lovable hosting.
- Add a 301 redirect from the old `lovable.app` URL so existing inbound links don't break.
- Cost: ~$12/year for the domain. ROI is immediate and permanent.

---

## 2. SEO — universal fixes

### 2a. Missing `<meta name="description">` on almost every page

Only the homepage has a meta description. Every other page is missing one. This is the single biggest organic-search loss on the site.

**Action:** Add a unique, ~150-char meta description to every page. Specific copy is suggested per page in `01–09`.

### 2b. Inconsistent `<title>` patterns

Some pages render as `"RZ Rizwan Zafar Payments · Product"`, others as `"Rizwan Zafar — Payments Product Executive"`, others have no title at all. Pick one pattern:

**Recommended:** `<Page-specific title> — Rizwan Zafar`

Examples:

- `Home — Rizwan Zafar` (or just `Rizwan Zafar — Payments Product Executive`)
- `Products — Rizwan Zafar`
- `Case studies — Rizwan Zafar`
- `Simpaisa Payment Infrastructure — Rizwan Zafar`
- `Essays on regulated payments — Rizwan Zafar`
- `Contact — Rizwan Zafar`

### 2c. Missing Open Graph + Twitter Card meta tags

Without these, when someone shares your URL on LinkedIn, WhatsApp, Slack, or X, the link preview is empty or generic. **You're being shared in private channels and showing nothing — fix this once and benefit forever.**

Add to every page's `<head>`:

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Rizwan Zafar" />
<meta property="og:url" content="https://rizwanzafar.com/<path>" />
<meta property="og:title" content="<page title>" />
<meta property="og:description" content="<page meta description>" />
<meta property="og:image" content="https://rizwanzafar.com/og/<page-slug>.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<page title>" />
<meta name="twitter:description" content="<page meta description>" />
<meta name="twitter:image" content="https://rizwanzafar.com/og/<page-slug>.png" />
```

You'll need a 1200×630 OG image per page (or at least one default). Tools: Vercel OG Image, Cloudinary, or hand-designed in Figma.

### 2d. Missing structured data (JSON-LD)

No structured data means you're invisible to AI search (ChatGPT browse, Perplexity, Google AI Overviews). Add per page type:

| Page                   | Schema type                       |
| ---------------------- | --------------------------------- |
| `/`                    | `Person`                          |
| `/about`               | `AboutPage` + `Person`            |
| `/resume`              | `Person` with `workExample` array |
| `/blog/<slug>`         | `Article`                         |
| `/product-work/<slug>` | `Article` (or `CreativeWork`)     |
| `/topics/<slug>`       | `CollectionPage`                  |
| All pages              | `BreadcrumbList`                  |

Person schema example provided in `01-homepage.md`. Article schema example in `04-blog.md`.

### 2e. Canonical URLs

Add `<link rel="canonical" href="...">` to every page pointing at the clean URL. This prevents duplicate-content issues from filter query params (e.g. `/blog?q=&hub=&reader=&company=`).

### 2f. XML sitemap is good — keep it

`sitemap.xml` exists and lists 57 URLs. Verify:

- It updates automatically when you publish new essays.
- All URLs return 200 (some `/case-studies/...` URLs returned 404 in testing — confirm slug pattern).
- `<lastmod>` is populated.

### 2g. robots.txt is good — keep it

`Allow: /` and sitemap referenced. No action needed.

### 2h. Internal linking is thin

Each essay should link to 2–3 sibling essays + 1 case study minimum. Cross-link between hubs. See `04-blog.md` for details.

---

## 3. Performance

Could not run Lighthouse from this environment. **Recommended manual checks:**

- Run Lighthouse in Chrome DevTools — aim for ≥90 on Performance, Accessibility, Best Practices, SEO.
- Check LCP (largest contentful paint) — should be < 2.5s on 4G.
- Hero portrait (`rizwan-zafar-cutout-DNSYj-3A.png`) — verify it's served as WebP or AVIF with proper `<picture>` fallback. PNG is typically 3–5× larger than necessary for portraits.
- Verify `loading="lazy"` on all below-the-fold images.
- Verify font files are preloaded if you use a custom typeface.

---

## 4. Accessibility

The portrait alt text ("Portrait of Rizwan Zafar, Chief Product Officer, Payments") is excellent. Beyond that:

### 4a. Verify all images have descriptive alt text

Every product tile, case study hero, blog header image, and decorative element should have appropriate `alt`. Decorative elements use `alt=""` (empty, not missing).

### 4b. Heading hierarchy

Make sure no page skips levels (H1 → H3 with no H2). The fetches suggest this is mostly clean — verify with a screen reader or [WAVE](https://wave.webaim.org/).

### 4c. Form labels

`/contact` form needs visible `<label>` elements, not just placeholders. Placeholder-only labels fail WCAG.

### 4d. Colour contrast

Verify all text passes WCAG AA contrast (4.5:1 for body text, 3:1 for large text). Lovable's defaults are usually OK but custom theming can break this.

### 4e. Keyboard navigation

Tab through every page. Every interactive element should:

- Show a visible focus ring.
- Be reachable in source order.
- Activate with Enter/Space.

### 4f. Screen reader pass

Run NVDA (free, Windows) or VoiceOver (built-in, Mac) on the homepage. Listen to the first 60 seconds. Identify anything unclear.

---

## 5. Site title pattern + brand mark

Some pages show `"RZ Rizwan Zafar Payments · Product"` in the title. The `RZ` is presumably from the navbar logo bleeding into the document title.

**Action:** Either remove the `RZ` prefix from titles entirely, or use it as the favicon/site mark only (not in `<title>`). Cleaner titles improve search snippet appearance.

---

## 6. Footer copyright

`© 2026 Rizwan Zafar · Dubai, UAE` is correct (today is 2026-05-17).

**Make it auto-update:** Replace static `2026` with `{new Date().getFullYear()}` so it doesn't go stale in January.

---

## 7. URL hygiene

**Filter URLs use ugly query parameters.** From the blog: `?q=&hub=&reader=&company=`. Two issues:

- Empty filter params bloat URLs and confuse analytics.
- Search engines may index multiple versions of the same page (duplicate content).

**Action:**

- Only include query params with non-empty values.
- Add `<link rel="canonical">` pointing to the clean URL.
- Consider rewriting filters to use path segments where possible (`/blog/topic/cross-border` instead of `/blog?topic=cross-border`).

---

## 8. Analytics + observability

Could not detect analytics from the fetch. Confirm:

- [ ] Analytics installed (Plausible, Fathom, or PostHog recommended over GA4 for a personal site)
- [ ] Search Console verified
- [ ] LinkedIn click-through traced via UTM (`?utm_source=linkedin&utm_medium=profile`)
- [ ] Resume PDF download tracked as a conversion event
- [ ] Contact form submission tracked as a conversion event

Without this, you cannot tell what's working.

---

## 9. Security / best practices

- [ ] HTTPS enforced (confirmed — Lovable does this)
- [ ] HSTS header set
- [ ] CSP header set (Lovable may not let you customise this — check)
- [ ] No mixed-content warnings
- [ ] No exposed `/.env` or admin endpoints

---

## 10. Maintenance

### Add a "Last updated" date to every page

Recruiters trust pages with recent dates. Stale pages signal inactive candidates. A small `Last updated: 2026-05-17` in the footer of each major page is a cheap trust signal.

### Set a publishing cadence

Even one essay per month signals momentum. The 31-essay archive is impressive — make sure the most-recent essay is dated within the last 60 days so visitors know you're active.

### Quarterly review

Block 2 hours every quarter to:

- Update the homepage credibility strip with newest customers
- Refresh the "Currently" line
- Update the "Available from" date on `/about`
- Run Lighthouse + fix anything that's regressed
- Check for broken internal links

---

## Cross-cutting checklist

### SEO

- [ ] Custom domain
- [ ] Meta description on every page
- [ ] Standardised title pattern
- [ ] Open Graph + Twitter Card tags
- [ ] JSON-LD schema (Person, Article, BreadcrumbList, CollectionPage)
- [ ] Canonical URLs
- [ ] Verify sitemap freshness
- [ ] Internal linking pass

### Performance

- [ ] Lighthouse ≥90 on all 4 metrics
- [ ] Hero portrait in WebP/AVIF
- [ ] Lazy-load below-fold images
- [ ] Preload custom fonts

### Accessibility

- [ ] Descriptive alt text on every image
- [ ] Heading hierarchy clean (no skipped levels)
- [ ] Visible form labels (not just placeholders)
- [ ] WCAG AA contrast
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader spot-check

### Tech hygiene

- [ ] Remove "RZ" prefix from titles
- [ ] Auto-update footer copyright year
- [ ] Clean filter URLs (drop empty params)
- [ ] Analytics + Search Console + conversion events
- [ ] HSTS / CSP / no mixed content
- [ ] "Last updated" date on every page
- [ ] Publishing cadence set
- [ ] Quarterly review on calendar
