# Homepage Review — `/`

**URL:** https://rizwan-pay-architect.lovable.app/
**Severity:** High (this is the first impression for every recruiter)

---

## Current state

| Element | Current value |
|---------|---------------|
| `<title>` | Rizwan Zafar — Payments Product Executive |
| Meta description | "Rizwan Zafar — Payments Product Executive. Building regulated payment infrastructure across MENA and South Asia." |
| H1 | "I'm Rizwan." |
| Hero portrait alt | "Portrait of Rizwan Zafar, Chief Product Officer, Payments" ✅ |
| Primary CTA | "Download resume →" + "Email me" |
| H2 sections | Where I write the most · Products built/building · Essays I'd read first · Infrastructure shipped at scale · Hire me or just say hello |

---

## Issues

### P0 — fix first

**H1 is too soft for an executive landing page.**
Current: `I'm Rizwan.`
A recruiter scanning a tab strip with 20 candidate sites open needs to know in 0.4 seconds what you do. "I'm Rizwan." forces them to read the next paragraph.

**Recommended H1:**
> Payments product executive. Regulated infrastructure at $1B+ GTV.

Keep "I'm Rizwan." as the eyebrow or as the second line — it's warm and personal and you should not lose it entirely.

**Suggested hero structure:**
```
[eyebrow]  I'm Rizwan.
[H1]       Payments product executive. Regulated infrastructure at $1B+ GTV.
[subhead]  Acceptance, cross-border, settlement, KYC/KYB, AML, fraud — built across 5 markets in MENA and South Asia.
[CTAs]     See case studies →   Download resume   Email me
```

### P1 — strong improvements

**Meta description is generic.** Add the keywords recruiters actually search.
- Current: "Rizwan Zafar — Payments Product Executive. Building regulated payment infrastructure across MENA and South Asia."
- Recommended: "Rizwan Zafar — Payments product executive (Dubai). 14+ yrs building regulated payments infra: acceptance, cross-border, settlement, KYC/KYB, AML/CFT. $1B+ GTV, 25M+ monthly tx, 99.95% SLA. Open to senior roles globally."
- Why: includes the proof points + the "open to roles" intent so the SERP snippet alone qualifies the click.

**Two duplicate CTAs above the fold** ("Download resume" appears in the hero AND in the sticky header). Pick one location for the hero; let the header carry the persistent one.

**The "Hot topics" / "Editor's picked" labels feel templated.**
- "Editor's picked" should be "Editor's picks" (grammar).
- Consider plainer language: "Most-read this month" and "Start here".

**"Hire me or just say hello" is great** — keep that line. But the section under it should make the next step trivially obvious. Add **one** primary button (`Email rizwanzaffar.pk@gmail.com`) and **one** secondary (`Book 15 min →` if you can wire Cal.com or similar).

### P2 — polish

- "Where I write the most." — period at the end of an H2 reads dated. Drop it. Same for other H2s with terminal periods.
- The "Stay in the loop" section heading suggests a newsletter signup but body text isn't shown to include one. Either ship a real subscribe field (email + button) or rename to "Latest essays" / "What I'm reading".
- Add a single-line credibility strip directly under the hero: `Built infrastructure used by TikTok · Uber · Temu` (you mention these on the Simpaisa case study — surface them on the homepage).
- The featured products grid lists two "Coming soon" tiles (Felo, Job Hunt). They drag the page down — see `02-products.md`.

### P3 — nice-to-have

- Add a small "Currently" line under the portrait: `Dubai · CPO @ Simpaisa · 2026`. Keeps the hero feeling current.
- Consider a light dark-mode toggle — payments people often work late and dark UIs are status-quo in the industry.

---

## SEO / structured data to add to this page

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rizwan Zafar",
  "jobTitle": "Chief Product Officer, Payments",
  "url": "https://rizwan-pay-architect.lovable.app/",
  "email": "mailto:rizwanzaffar.pk@gmail.com",
  "image": "https://rizwan-pay-architect.lovable.app/rizwan-zafar-cutout.png",
  "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
  "sameAs": ["https://www.linkedin.com/in/rizwanzaffar"],
  "knowsAbout": ["Payment infrastructure","Cross-border payments","Settlement and reconciliation","KYC/KYB","AML/CFT","Fraud risk","ISO 20022","SWIFT"],
  "alumniOf": [
    {"@type":"EducationalOrganization","name":"MIT Sloan School of Management"},
    {"@type":"EducationalOrganization","name":"University of Karachi"}
  ]
}
</script>
```

---

## Copy rewrite — hero section

**Before:**
```
I'm Rizwan.
Payments product executive in Dubai. I build regulated payment infrastructure across
acceptance, cross-border corridors, settlement, KYC/KYB, AML and fraud.
[Download resume →]  [Email me]
```

**After:**
```
I'm Rizwan.

Payments product executive. Regulated infrastructure at $1B+ GTV.
14+ years shipping acceptance, cross-border, settlement, KYC/KYB, AML and fraud across
5 markets in MENA and South Asia. Currently CPO at Simpaisa, Dubai.

Used in production by TikTok · Uber · Temu

[See case studies →]   [Download resume]   [Email me]
```

---

## Quick checklist

- [ ] Rewrite H1 to lead with role + proof
- [ ] Expand meta description with proof points
- [ ] Remove duplicate "Download resume" above the fold
- [ ] Fix "Editor's picked" → "Editor's picks"
- [ ] Drop terminal periods from H2s
- [ ] Add Person JSON-LD schema
- [ ] Decide on newsletter section (ship it or rename it)
- [ ] Add "Used by TikTok · Uber · Temu" credibility strip
- [ ] Add Open Graph image (1200×630) of you + tagline
