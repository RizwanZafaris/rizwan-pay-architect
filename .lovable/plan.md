# Site Upgrade Plan — Rizwan Zafar Portfolio

This is a large, multi-area scope. I'll execute it in numbered phases so we can ship value incrementally and you can pause/redirect between phases. Today is **May 17, 2026**.

---

## Phase 1 — Critical fixes (ship first, ~same session)

1. **Future-dated blog posts**
   - Audit `content/blog/*.md` + `src/data/posts.ts` for dates > 2026-05-17.
   - Default approach: **shift dates to a realistic backlog ending 2026-05-17**, oldest → newest, evenly spaced. Posts not yet content-complete get `status: "draft"` and are filtered out of public lists + sitemap + noindexed.
   - Add a `status` field (`published | draft | coming-soon`) to the post type and filter in `blog.index.tsx`, topic hubs, and `sitemap.xml.ts`.

2. **Broken case-study links**
   - `/product-work/hosted-checkout-vs-direct-card-processing` → already exists as a **blog post**. I'll redirect to `/blog/hosted-checkout-vs-direct-card-processing` and fix the source link.
   - `/product-work/reconciliation-ledger-controls` → no matching case study. I'll either (a) point to the closest existing case study, or (b) create a new lightweight case study stub. **Default: redirect to closest existing study and remove dead reference.**

3. **Contact form backend**
   - Use **Resend via the Lovable connector** (cleanest, no DB). Server function `submitContact` posts to Resend, sends to your inbox + auto-reply.
   - Add zod validation, loading/success/error states, mailto fallback below.
   - Requires you to approve connecting Resend.

## Phase 2 — Products surface

4. **/products route + Products nav item + homepage section**
   - New `src/data/products.ts` with Simpaisa, Tapmad, Felo, Job Hunt (exact copy/metrics from your brief, Tapmad worded as "built/scaled monetization", not founder).
   - New `src/routes/products.tsx` (index) and `src/routes/products.$slug.tsx` for Felo + Job Hunt coming-soon detail pages with waitlist CTA (mailto for now; can wire to Resend later).
   - Homepage section card-grid linking to each.

## Phase 3 — Deepen case studies

5. **Product-work template upgrade**
   - Extend `CaseStudy` type with structured fields: `context`, `constraints`, `decisions`, `system`, `metricsBeforeAfter`, `risksControls`, `wouldDoDifferently`, `whyItMattersTo`.
   - Update `product-work.$slug.tsx` to render the new template with anchor TOC.
   - Expand existing thin studies to 1000–1500 words. **I'll do Simpaisa + Tapmad first** (highest signal) and queue the rest for a follow-up if scope balloons.

6. **Product visuals (SVG diagrams, not stock)**
   - Build into `src/components/diagrams/` (file already exists, extend it):
     - Payment rail map (Simpaisa)
     - Settlement & recon flow
     - Onboarding funnel + KYC/KYB decision tree
     - Fraud/risk control stack
     - Cross-border corridor operating model
     - Tapmad billing migration before/after
     - Product Lab roadmap
   - All pure SVG, themed via design tokens, responsive.

## Phase 4 — Editorial cleanup

7. **Article page cleanup**
   - Remove visible "Suggested internal links" / "Suggested external sources" drafting blocks.
   - Replace with curated **Related essays / Related case studies / Further reading** sections, computed from hub membership + manual overrides per post.

8. **Topic hubs** — already have `/topics/$hub`. I'll add the 8 hubs you listed (some already exist; will create missing slugs and ensure each has: H1, SEO meta, 300–600 word intro, featured articles, related case studies, key terms glossary, CTA).

## Phase 5 — Blog UX

9. **Search, filters, sort**
   - URL-driven (`?q=&category=&sort=`), same pattern as case-study filters.
   - Featured collections band at top of `/blog`.
   - Future-dated/draft posts excluded.

## Phase 6 — SEO

10. **SEO pass**
    - Tighten titles <60ch, descriptions ~120–155ch across all routes.
    - Add **BreadcrumbList** to leaf pages, **Article** on posts, **Person + ProfilePage** on `/` and `/about`, **CollectionPage** on `/blog`, `/product-work`, `/products`, topic hubs.
    - Sitemap: add `lastmod`, exclude drafts/coming-soon.
    - Generate **custom OG images** (1200×630 PNG) per major page via imagegen — themed dark editorial with title + role tag.
    - Add `noindex` meta on coming-soon pages.

## Phase 7 — Resume + proof

11. **Resume**
    - Add second download: **ATS resume PDF**. I'll generate a plain-text-friendly PDF from your existing content (single column, standard fonts, no graphics). Keep the existing Executive PDF as-is.
    - Resume page shows both with clear labels.

12. **Proof / credibility modules**
    - Reusable component placed on `/about` and `/product-work` index: "References on request", "Sanitized artifacts", "Launch checklists", "Risk/control maps", "Partner experience", "Metrics I can discuss in interview". Static, tasteful, no overclaim.

---

## Technical notes

- **Stack**: TanStack Start, file-based routes, semantic tokens in `src/styles.css`, framer-motion already present.
- **Backend**: Contact form via Resend connector (no DB needed). If you'd rather use Lovable Cloud + a `contact_submissions` table for record-keeping, say so and I'll switch.
- **Data shape changes** (`Post.status`, expanded `CaseStudy`) are additive and backwards-compatible.
- **OG images**: ~10 generations, premium tier for legible typography. Will batch.
- **Mobile overflow** sweep: audited at end of each phase.

---

## Execution order I propose

I'll ship in this order and stop after each phase for a quick check-in:

1. Phase 1 (critical fixes) + Phase 2 (Products) — same session.
2. Phase 3 (case study depth + diagrams) — Simpaisa & Tapmad first.
3. Phase 4 + 5 (article cleanup, topic hubs, blog UX).
4. Phase 6 (SEO + OG images).
5. Phase 7 (ATS resume + proof modules).

---

## Questions before I start

1. **Contact form backend**: OK to connect **Resend**? (Alternative: Lovable Cloud DB table, or keep mailto-only.)
2. **`/product-work/reconciliation-ledger-controls`**: redirect to closest existing study, or create a new full case study? (Creating one well takes real source material from you.)
3. **Tapmad metrics** — confirm any of these I should NOT publish: `0→5M paid subs`, `payment cost 50%→1%`, `ARPU +70%`, `$10M+ ARR`. I'll omit anything you flag.
4. **Felo & Job Hunt**: any one-line positioning you want, or pure "Coming soon from Rizwan's product lab"?

Reply with answers (or "go with defaults") and I'll start Phase 1 immediately.