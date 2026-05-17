# Resume Page Review — `/resume`

**URL:** https://rizwan-pay-architect.lovable.app/resume
**Severity:** Medium (content is solid; formatting and density need work)

---

## Current state

| Element | Current value |
|---------|---------------|
| `<title>` | "Rizwan Zafar — Payments Product Executive" |
| Meta description | **Missing** ❌ |
| Sections | Summary · Key metrics · Target roles · Experience (7 roles) · Education · Certifications · Skills |
| CTAs | Download PDF (×3) · LinkedIn · Email |
| PDF link | `/Rizwan_Zafar_Resume.pdf` |

---

## What works — keep this

- **Headline metrics in the top fold** ($1B+ GTV, 25M+ tx/mo, 5 markets, 99.95% SLA, −90% downtime, 50%→1% cost) — perfect for scanning. Keep.
- **Target Roles list** (Director/VP Product, Cross-Border Lead, etc.) — gives recruiters a vocabulary match. Keep.
- **Geographic markets called out as a skill category** — smart, because recruiters filter on this.

---

## Issues

### P0 — fix first

**Three PDF download buttons on one page is too many.** Pick one location (top-right of the header, sticky). The repetition signals anxiety. One prominent button converts better than three competing ones.

**Add meta description.**
- Suggested: "Rizwan Zafar — résumé. Payments product executive (CPO, Simpaisa). 14+ yrs product/payments. $1B+ GTV. MIT Sloan, PMP, PCI DSS. Dubai-based, open globally."

**Expand abbreviations on first use.** The text fetch shows `DCB`, `IBFT`, `FX` without expansions. Most payments recruiters know these, but candidate sites are also read by HR, talent partners, and execs from adjacent domains. First-use expansion is free credibility:
- DCB → Direct Carrier Billing (DCB)
- IBFT → Inter-Bank Fund Transfer (IBFT)
- FX → foreign exchange (FX)

After first use, abbreviations only is fine.

### P1 — strong improvements

**Experience entries are dense blocks.** The fetch flagged this. Restructure each role as:

```
[Company]                       [Role]                          [Dates · Location]
[1-line "what the company is" if non-obvious]

Mandate
  Single sentence on what you were hired to do.

Built
  • bullet
  • bullet
  • bullet (max 5)

Outcomes
  • metric → result
  • metric → result
  • metric → result

What I personally owned
  Single sentence drawing the line between you and the team.
```

Apply consistently across all 7 roles. Even if some early roles only have 1–2 bullets, the structure makes the page much more scannable.

**The role "Assistant Manager, Projects · DR Congo · 2016–2017" needs context.** This is the most-asked-about line on your résumé (people will pause: *"What was he doing in DRC?"*). Add a single line: *"Industrial project delivery for a global infrastructure firm — sharpened risk and ops discipline that I now apply to payments."*

**Date overlaps and the "acting CTO 2024" line need clarity.** From the fetch:
- "CPO (acting CTO)" with dates "Aug 2020–Present" — recommend writing this as: *"CPO, Simpaisa (Aug 2020–present). Acting CTO during 2024 while we re-built the platform team."*

This shows that "acting CTO" was a specific, time-bound responsibility rather than a permanent dual title. More credible.

**Skills section should be ordered by recency and depth, not alphabet.** The categories (Payments Infrastructure, Risk & Compliance, Product & Leadership, Geographic Markets) are good. Within each, lead with what you've done in the last 18 months.

### P2 — polish

- The on-page résumé and the downloadable PDF should be 1:1 in content. **Verify this** — if they differ, recruiters notice.
- The PDF link uses `/Rizwan_Zafar_Resume.pdf` (underscores). Fine, but consider `/rizwan-zafar-resume.pdf` (kebab case) — more SEO-friendly URL.
- Add a "Last updated" date at the top — recruiters distrust undated résumés.
- Add a printable / print-stylesheet so the on-page version prints cleanly to a single page if recruiters use the browser print path.
- "Honors" section (if present here too) — same advice as `/about`: only list items recruiters will recognise.

### P3 — nice-to-have

- An "Anti-portfolio" or "What I'm not great at" callout — 2–3 sentences of self-awareness. Counter-intuitive but it disarms interviewers and pre-empts the gotcha questions.
- A "References available on request" line is unnecessary — drop it if present.
- Consider adding two versions of the PDF: a 1-page tactical and a 2-page detailed. Link both, label clearly.

---

## PDF résumé (the file, not the page)

Could not fetch the PDF directly in this review. **Manual checks for the PDF:**

- [ ] Loads when clicked (file actually exists at `/Rizwan_Zafar_Resume.pdf`)
- [ ] Filename matches what recruiters will save it as
- [ ] PDF text is selectable (not an image — ATS systems need to parse it)
- [ ] PDF metadata (Title, Author, Subject) is set in the PDF properties
- [ ] No tracked changes, comments, or hidden text
- [ ] Hyperlinks in the PDF work (LinkedIn, email, site URL)
- [ ] Last modified date on the file is recent
- [ ] Fits 1–2 pages — anything longer gets skimmed past page 2
- [ ] Font embeds properly across Mac/Windows/Linux viewers

---

## SEO

```html
<title>Résumé — Rizwan Zafar, payments product executive (Dubai)</title>
<meta name="description" content="Résumé of Rizwan Zafar — 14+ years product, payments, program delivery. CPO at Simpaisa: $1B+ GTV, 25M+ tx/mo, 99.95% SLA. MIT Sloan, PMP, PCI DSS. Open to senior roles globally.">
```

Note: most candidates `noindex` their resume page to keep older versions out of search results. **Recommend `<meta name="robots" content="noindex,follow">`** on this URL so only the current version is canonical and recruiters always hit the freshest copy via your homepage.

---

## Quick checklist

- [ ] Add meta description (+ noindex)
- [ ] Reduce to one PDF download button
- [ ] Expand abbreviations on first use (DCB, IBFT, FX)
- [ ] Restructure each role with consistent template
- [ ] Add 1-line context for DR Congo role
- [ ] Clarify "acting CTO 2024" as time-bound
- [ ] Order skills by recency, not alphabet
- [ ] Add "Last updated" date
- [ ] Verify on-page and PDF résumé match
- [ ] PDF: selectable text, embedded fonts, working hyperlinks, recent modified date
