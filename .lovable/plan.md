## Goal

Apply the "High-impact changes for Lovable" list from `blog.md` (items 1–10) and the "UX Changes For Case Study Pages" list from `case_studies.md` to the live site — using the existing posts/case studies already in the repo (no mass content generation).

## Scope (in)

1. **Topic hubs** — 8 hub routes for: Payment Infrastructure, Cross-Border Payments, SWIFT & ISO 20022, Settlement & Reconciliation, Merchant Onboarding, Fraud & AML, Payment APIs, Emerging Markets. Each hub is a collection page listing related essays + case studies, with its own SEO metadata, H1, intro, and CollectionPage JSON-LD.
2. **Blog search + filters** — add keyword search, topic filter (hubs), reader-type filter, and company-relevance filter on `/blog`. URL-driven via `validateSearch` + `zodValidator` so filters are shareable.
3. **Tag posts with metadata** — extend `Post` type with `hub`, `reader[]`, `relevantFor[]` (small backwards-compatible additions inferred from existing `category`/`tags`). Same for case studies.
4. **Case-study page upgrades** — fixed structure (Context · Problem · Constraints · Decisions · System · Metrics · Controls · Lessons · Relevance), before/after metric cards, risk-control matrix block, launch-timeline block, and a "Discuss roles" CTA + resume download under every case study. Reuse `@/components/diagrams/Diagrams.tsx` where possible.
5. **Case-study index filters** — rail, market, product area, company relevance.
6. **Recruiter paths** — 3 routes:
   - `/for/visa-mastercard` — network rails, acceptance, tokenization, settlement
   - `/for/stripe-adyen-wise-thunes` — orchestration, cross-border, local methods
   - `/for/banks-fintechs` — SWIFT, ISO 20022, AML/CFT, PCI DSS
   Each speaks the reader's language, links to relevant essays + case studies, and ends with resume CTA.
7. **Schema upgrades** — add Author schema (Person, sameAs LinkedIn/Twitter) on root; Article schema with author + publisher on every blog post; BreadcrumbList on blog post, case study, and hub pages; FAQPage schema on posts that have a FAQ block; CollectionPage on each hub.
8. **Certification language audit** — replace any "PCI DSS / ISO 27001 certified" wording with "Led PCI DSS and ISO 27001 certification programs" across `profile.ts`, About, Resume, Home.
9. **Contact form** — keep mailto behavior, but add a clearly visible "Direct email" primary path and a graceful inline success/failure path (no spinner stuck states). Note: full Resend/Cloud backend is out of scope for this pass — flagged below.
10. **Header nav** — add "Topics" dropdown linking to the 8 hubs; add "For recruiters" link.

## Scope (out — flagged for follow-up)

- Mass-generating the 500 blog briefs + 500 case-study briefs as published posts. (Per `blog.md` rule: "do not publish 500 posts at once".) Briefs stay in `content/*.md` as a backlog.
- Custom domain setup (`rizwanzafar.com`) — user action.
- Real contact-form backend (Lovable Cloud + Resend) — separate task; mailto fallback stays.
- Sanitized dashboard screenshots / regulator artifacts — need real assets from user.

## Technical Notes

```text
src/routes/
  topics.tsx                       # hub index
  topics.$hub.tsx                  # individual hub page (validateSearch hub slug)
  for.visa-mastercard.tsx
  for.stripe-adyen-wise-thunes.tsx
  for.banks-fintechs.tsx
src/data/
  hubs.ts                          # 8 hubs + mapping from category/tag -> hub
  posts.ts                         # extend Post type with hub, reader, relevantFor
  caseStudies.ts                   # add fixed-structure sections
src/components/
  ArticleSchema.tsx                # Article + BreadcrumbList + optional FAQ
  CaseStudyArtifacts.tsx           # before/after, risk matrix, timeline blocks
```

- Blog search uses `validateSearch` with `zodValidator` + `fallback` (q, hub, reader, relevantFor). Reads via `Route.useSearch()`, writes via `useNavigate({ search: prev => ... })`. No `useState` for filter state.
- Hubs derived from existing `categories` + a tag→hub map so we don't have to retag every post by hand.
- Recruiter pages are static React with curated lists from `posts`/`caseStudies` filtered by `relevantFor`.
- All new pages get per-route `head()` with title/description/og:title/og:description and canonical.
- Sitemap (`sitemap[.]xml.ts`) extended to include hubs + recruiter pages.

## Acceptance

- 8 hub pages render with curated essay + case-study lists and CollectionPage JSON-LD.
- `/blog?q=swift&hub=cross-border-payments` filters server-renderable + shareable.
- Every case-study page shows the fixed 9-section structure with at least one before/after metric card and a CTA strip.
- 3 recruiter pages live with language tailored per audience.
- Article/Breadcrumb/Author schema visible in page source on a sample blog post.
- Certification wording corrected everywhere.
- Sitemap includes all new routes; nothing 404s.

If this looks right I'll implement it in one pass — flag anything you want dropped or expanded first.