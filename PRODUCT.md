# Product

## Register

brand

> **Mixed surface note:** brand is the project default. Recruiter-facing surfaces (`/for`, `/resume`, the resume-preview strip) lean product-utility, tighter, denser, more scannable, without breaking the editorial register elsewhere.

## Users

**Primary:** hiring managers, VPs of Product, CPOs and senior recruiters at payments and fintech companies, Visa, Mastercard, American Express, Stripe, Adyen, Checkout.com, Wise, Thunes, dLocal, Nium, Airwallex, Rapyd, Tabby, Tamara, STC Pay, Network International, plus sponsor banks and BaaS providers.

**Context of use:** they arrive via LinkedIn, a referral, or a search for "payments product executive Dubai / MENA / cross-border / BNPL / AI in fintech". They are scanning to answer one question, _should I have a real conversation with this person about a real role?_ They want depth, not a pitch. They read 1–2 case studies fully if hooked.

**Conversion event:** a qualified email or LinkedIn DM with a named role attached. Not a download. Not a newsletter signup.

## Product Purpose

Surface the body of work, case studies, essays, AI deployments, programme delivery, that proves Rizwan operates at Director/VP/Head-of/CPO level in regulated payments, fintech, AI in payments, cross-border, and programme management.

Success metrics:

- Inbound conversations from named target companies (the 30-company shortlist in `src/data/profile.ts`).
- Time on case-study and long-form blog pages above 4 minutes (signals real consideration).
- Direct résumé downloads as a leading indicator.

## Brand Personality

**Three words:** Premium · Editorial · Curated.

**Voice:** senior IC briefing a peer CPO. Confident, specific, anti-fluff. Quotes a number where most people would write an adjective. Names partners. Acknowledges trade-offs without defensiveness.

**Tone:** considered. The reader should feel they are in the hands of someone who has _operated_ the thing being described, not theorised about it. No exclamation marks. No urgency framing. No "I am passionate about" sentences.

**Emotional goal in first 5 seconds:** "this is a Director-level operator." The visitor should feel they have walked into a printed annual report rendered in pixels, restrained, intentional, expensive without being loud.

## Anti-references

The site must explicitly **not** look or read like:

- **Generic AI SaaS landing pages.** No purple-to-blue gradients. No hero-CTA-feature-grid template. No Inter-for-everything. No gradient text. No identical card grids of 6 capabilities. No rounded-square icon tile above every heading.
- **Recruiter-bait CV sites.** No resume-as-website with a big headshot circle, a timeline component and a "hire me" CTA every 200 pixels.
- **Crypto / Web3 neon-on-black aesthetic.** Even though the site covers crypto on-ramps and stablecoin payments, the look must stay editorial fintech, not "cyber grid."
- **Agency / consultant stock photography.** No stock photos of professionals in suits, no overuse of "transform / empower / unlock / accelerate" verbs.
- **All cross-register absolute bans** from impeccable's shared design laws: side-stripe borders, gradient text, default glassmorphism, hero-metric templates, identical card grids, modals as first thought, em dashes in copy.

## Design Principles

1. **Show, don't tell.** Every claim is backed by a named number, a named partner, or a case study. Adjectives without numbers get rewritten. "$1B+ TPV, 50+ issuer partners, 4 production AI solutions" beats "scaled significantly."

2. **Senior-to-senior register.** The site is written as a peer briefing, not a sales pitch. No urgency framing, no salesy verbs, no exclamation marks. The reader is a Director or VP; treat them like one.

3. **Editorial pacing in product clothes.** Linear's tight, considered product-utility surfaces are the aesthetic reference, not magazine layouts. Premium feel through restraint, monospace details, generous whitespace, and one accent that does a lot of work. Not through ornament.

4. **Production-grade proof.** Case studies show architecture, operating model, trade-offs and lessons, not feature lists. Blog posts read like field notes from someone who shipped the thing, not summaries from someone who read about it.

5. **Recruiter ROI on the right surfaces.** `/for` and `/resume` answer "should I email this person?" in 30 seconds, KPI tiles, named roles, named locations, three CTAs above the fold. Other surfaces (`/blog`, `/product-work/<slug>`, `/about`) are allowed to take longer because the reader has already decided to invest time.

## Accessibility & Inclusion

- **WCAG 2.1 AA** target across all surfaces.
- **Respect `prefers-reduced-motion`**, disable scroll-driven and decorative animations.
- **Full keyboard navigation** with visible focus rings on every interactive element.
- **Semantic HTML first**, headings in order, no `div` soup, real `<button>` and `<a>`.
- **Colour contrast ≥ 4.5:1** for body text, ≥ 3:1 for large text and UI components.
- **Screen-reader sanity check** quarterly (VoiceOver pass on the homepage + one case study + the contact form).
- **No content depends on colour alone**, status badges have text labels, error states have icons and text.
