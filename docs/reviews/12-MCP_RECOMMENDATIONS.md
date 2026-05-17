# MCP & Tool Recommendations — UI/UX, Images, Content

You asked about MCPs that can help with UI/UX and image generation. Here is what's already connected to your Claude environment and what would add the most leverage.

---

## Already connected MCPs you can lean on now

These are MCP servers I can already see in your environment. You can use them today.

### Image / design generation

| MCP                                           | What it does                                                                       | Good for                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Canva** (`mcp__c0287d4b...__*`)             | Generate full designs, brand-template variations, social photos, export to PNG/PDF | Quick branded social posts, presentation slides, brand template assets          |
| **Stitch** (`mcp__stitch__*`)                 | Google Stitch — generates UI mockups from text prompts                             | First-pass UI variants for new pages (e.g. /media, /resume), responsive screens |
| **Figma** (`mcp__b609d57b...__*`)             | Pull design context from Figma, generate diagrams, get component code              | If you build a Figma design system, I can pull tokens and component code        |
| **Claude Preview** (`mcp__Claude_Preview__*`) | Live preview of in-progress designs, click + screenshot + console logs             | Quick visual QA after making style changes                                      |

### Site / content workflow

| MCP                                                                  | What it does                                                                                           | Good for                                                                                           |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Vercel** (`mcp__981d58ba...__*`, plus `vercel:*` skills)           | Deploy, env vars, runtime logs, build logs                                                             | If you migrate from Lovable to Vercel for the custom-domain move                                   |
| **SearchFit SEO** (`searchfit-seo:*`)                                | Keyword clustering, on-page SEO, broken-link scans, schema markup, content briefs, AI-visibility check | High-leverage — run `searchfit-seo:seo-audit` after pushing this batch                             |
| **21st.dev** (`twentyfirst-dev` skill)                               | Curated production-ready React/Next components and blocks                                              | When you need a new section (e.g. testimonials, pricing, CTA) — pull a pattern instead of building |
| **shadcn/ui** (`vercel:shadcn`)                                      | shadcn component library — already in your stack                                                       | Already wired; use for any new UI component                                                        |
| **Awesome lists / skills** (`awesome-agent-skills`, `awesome-lists`) | Discover new skills/lists for any topic                                                                | Search when you have a new need                                                                    |

### Productivity / publishing

| MCP                                      | What it does                                | Good for                                                    |
| ---------------------------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| **Notion** (`mcp__93e307e4...__*`)       | Read/write Notion pages and databases       | If you draft blog posts in Notion first                     |
| **Google Drive** (`mcp__6ae656a7...__*`) | List recent files, read content             | If you keep your case-study source content in Drive         |
| **Slack**                                | Read/write Slack messages, drafts, canvases | Cross-posting blog posts or coordinating with collaborators |

### Outreach / job hunting (your existing work)

| MCP                                                   | What it does                                                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Apollo** (`mcp__6cdebdac...__*`, `apollo:*` skills) | Prospect, enrich-lead, sequence-load — for outbound targeting at the 68 target companies in your jobHunt repo |
| **Common Room** (`common-room:*` skills)              | Account research, contact research, call prep                                                                 |
| **Calendar** (`mcp__37406e58...__*`)                  | Schedule, suggest times, respond — pair with the contact form for inbound flow                                |

---

## High-leverage MCPs to add (not yet installed)

These would meaningfully improve the website-building loop. They exist as MCP servers but are not currently connected.

### 1. Gemini / Imagen MCP (for image generation directly from the chat)

Right now you're generating images in Gemini's web UI and dropping them in. An MCP for Imagen / Gemini image generation would let me:

- Generate the OG cards inline
- Iterate on a visual without leaving the chat
- Generate variants for A/B testing OG cards

**Install path**: There are community MCP servers for Gemini/Imagen image generation (search `awesome-agent-skills` for current names). Once installed, point me at it and I'll generate the case-study hero images directly.

### 2. Cloudflare R2 / Vercel Blob MCP (for hosting generated images)

So I can upload images directly without you handling the file shuffle:

- **Cloudflare R2** — fits your current Lovable + Cloudflare Workers stack
- **Vercel Blob** — fits if you migrate to Vercel

### 3. Web Vitals / Lighthouse MCP (for ongoing performance monitoring)

To run perf and accessibility audits on demand after each change. There are community MCPs that wrap Lighthouse / WebPageTest.

### 4. Plausible / Fathom / PostHog MCP (for analytics in-chat)

To read pageview / conversion data without leaving the chat. Lets me close the loop: "did the new OG cards lift LinkedIn click-through?"

### 5. ConvertKit / Buttondown MCP (for newsletter automation)

If you add a real newsletter capture on `/blog`. Lets me draft subscriber emails from blog posts directly.

---

## Recommended workflow once images are ready

Once you generate the OG cards and case-study heroes from Gemini:

1. Drop them into `public/og/` and `public/case-studies/` in the repo
2. Tell me they're in
3. I'll wire them into each route's `head()`, set `VITE_OG_IMAGE_URL` properly, add `heroImage` fields to the case study data, and render them
4. Run `searchfit-seo:seo-audit` to confirm the SEO surfaces are clean
5. Commit + push

For UI/UX iteration:

1. Use **Stitch** to generate mockups for any new section before I code it
2. Use **Claude Preview** to screenshot the live dev server and visually compare
3. Use **21st.dev** to find component patterns we can adapt (e.g. testimonials, pricing tables)
4. Use **searchfit-seo:on-page-seo** to audit each new page after changes

---

## Skills (not MCPs) worth knowing about for the site

| Skill                   | Use for                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| `frontend-design`       | Distinctive frontend work — non-generic aesthetic                        |
| `ui-ux-pro-max`         | Polish pass on UI quality                                                |
| `polish`                | Final-quality pass before shipping                                       |
| `audit`                 | Technical quality audit (a11y, perf, theming, responsive, anti-patterns) |
| `seo-audit` (searchfit) | SEO audit per page                                                       |
| `animate`               | Add purposeful animations and micro-interactions                         |
| `delight`               | Add memorable details                                                    |
| `clarify`               | Fix unclear UX copy                                                      |
| `typeset`               | Improve typography hierarchy                                             |
| `colorize`              | Add strategic color where the design is too monochromatic                |

You can invoke any of these by typing `/<skill-name>` in the chat. They are pre-loaded and ready.

---

## My recommended next steps

1. **You**: Generate the 8 Priority-1 OG cards from Gemini using the prompts in `11-IMAGES_NEEDED.md`. Drop them in `public/og/`.
2. **Me**: Wire them into per-page meta and run a full SEO audit.
3. **You**: Generate the 10 Priority-2 case-study hero images. Drop them in `public/case-studies/`.
4. **Me**: Add `heroImage` to case-study data, render in detail pages, wire OG image overrides per case study.
5. **You**: Record 2-3 Loom walk-throughs for the videos page (architecture, BNPL, AI suite).
6. **Me**: Update `src/data/media.ts` with URLs, remove "Coming soon" badges.
7. **You**: Approve a new content cadence (e.g. 2 posts/month). Tell me what topics next.
8. **Me**: Draft and ship.
