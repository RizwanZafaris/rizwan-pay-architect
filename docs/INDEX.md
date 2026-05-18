# Project Index — Rizwan Zafar Portfolio

Everything related to this site lives under `docs/` (locally). Reference repos are gitignored — they live on disk for offline browsing but don't push to GitHub.

**Last consolidated:** 2026-05-18

---

## Quick links

| What                          | Where                                                                             | Notes                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Live site**                 | https://rzifi.com                                                                 | Auto-published from `main` via the `hostinger-static` branch          |
| **GitHub repo**               | https://github.com/RizwanZafaris/rizwan-pay-architect                             | Push to `main` to ship                                                |
| **Latest commit on `main`**   | [`2d53161`](https://github.com/RizwanZafaris/rizwan-pay-architect/commit/2d53161) | Perf fix: bundle 813KB→549KB, /about JPG 1.3MB→24KB                   |
| **Hostinger deploy artifact** | [`docs/deploy/site.zip`](deploy/site.zip)                                         | 2.1 MB. Upload via Hostinger File Manager → extract in `public_html/` |
| **Hostinger guide**           | [`HOSTINGER_DEPLOY.md`](../HOSTINGER_DEPLOY.md)                                   | Step-by-step deploy instructions                                      |
| **Brand strategy**            | [`PRODUCT.md`](../PRODUCT.md)                                                     | Register, audience, principles, anti-references                       |
| **Design system**             | [`DESIGN.md`](../DESIGN.md)                                                       | Tokens, typography, components, named rules                           |

---

## `docs/reviews/` — 14 markdown audit files

Original audit + page-by-page review of the live site. These are the "what needs fixing" docs that drove every change in this project.

| #   | File                                                           | Topic                                           |
| --- | -------------------------------------------------------------- | ----------------------------------------------- |
| 00  | [00-INDEX.md](reviews/00-INDEX.md)                             | Top 10 fixes, severity matrix                   |
| 01  | [01-homepage.md](reviews/01-homepage.md)                       | `/` review                                      |
| 02  | [02-products.md](reviews/02-products.md)                       | `/products` review                              |
| 03  | [03-product-work.md](reviews/03-product-work.md)               | `/product-work` + 7 case studies                |
| 04  | [04-blog.md](reviews/04-blog.md)                               | `/blog` + article template                      |
| 05  | [05-topics.md](reviews/05-topics.md)                           | `/topics`                                       |
| 06  | [06-for-recruiters.md](reviews/06-for-recruiters.md)           | `/for` + 3 lens pages                           |
| 07  | [07-contact.md](reviews/07-contact.md)                         | `/contact`                                      |
| 08  | [08-about.md](reviews/08-about.md)                             | `/about`                                        |
| 09  | [09-resume.md](reviews/09-resume.md)                           | `/resume`                                       |
| 10  | [10-global-site-issues.md](reviews/10-global-site-issues.md)   | Site-wide SEO / perf / a11y / tech              |
| 11  | [11-IMAGES_NEEDED.md](reviews/11-IMAGES_NEEDED.md)             | Gemini prompts for OG cards + case study heroes |
| 12  | [12-MCP_RECOMMENDATIONS.md](reviews/12-MCP_RECOMMENDATIONS.md) | What's installed / what to add                  |
| 13  | [13-CONTENT_ROADMAP.md](reviews/13-CONTENT_ROADMAP.md)         | What shipped, what's next, editorial cadence    |

---

## `docs/references/` — cloned skill / content source repos

**Gitignored.** Local browsing only. Each can be re-cloned from GitHub if missing.

| Folder               | Source                                                                                          | Used for                                                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `impeccable/`        | [pbakaus/impeccable](https://github.com/pbakaus/impeccable)                                     | The frontend design skill we used for the audit. Source of PRODUCT.md + DESIGN.md format.                                                               |
| `taste-skill/`       | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)                                 | Anti-slop frontend framework. Provides `brandkit`, `imagegen-frontend-web`, `image-to-code`, `imagegen-frontend-mobile` skills (all now installed).     |
| `addyosmani-skills/` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)                           | Web perf + dev workflow skills. We installed `performance-optimization` (used in last perf push), `frontend-ui-engineering`, `code-review-and-quality`. |
| `jobHunt-repo/`      | [RizwanZafaris/jobHunt](https://github.com/RizwanZafaris/jobHunt)                               | Source content for the site — master_profile.json, target_companies.json, keywords.json, cv.md. Drove the content rewrites.                             |
| `nextlevel-uiuxpro/` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Source of the already-installed `ui-ux-pro-max` skill. Reference only.                                                                                  |
| `awesome-seo-tools/` | [serpapi/awesome-seo-tools](https://github.com/serpapi/awesome-seo-tools)                       | Curated SEO tools list — reference material, not a skill set.                                                                                           |

To re-clone any one:

```bash
cd docs/references
git clone https://github.com/pbakaus/impeccable.git
# etc.
```

---

## `docs/deploy/` — Hostinger upload artifact

| File                        | Size   | What                                                             |
| --------------------------- | ------ | ---------------------------------------------------------------- |
| [site.zip](deploy/site.zip) | 2.1 MB | Zipped `dist-static/` (35 prerendered HTML + assets + .htaccess) |

Upload steps:

1. `hpanel.hostinger.com` → Files → File Manager → `public_html/`
2. Delete existing files (clean redeploy)
3. Upload `site.zip` → right-click → Extract
4. Delete `site.zip` after extraction
5. Visit your domain — site should be live

Full instructions: [`HOSTINGER_DEPLOY.md`](../HOSTINGER_DEPLOY.md)

To regenerate the zip after any code change:

```bash
bun run build:static
find dist-static -name "._*" -delete
cd dist-static && zip -r ../docs/deploy/site.zip . -x "._*" "**/._*" && cd ..
```

---

## Repo layout (high-level)

```
rizwan-pay-architect/
├── PRODUCT.md                   ← brand / users / principles (impeccable)
├── DESIGN.md                    ← tokens / components / rules (impeccable)
├── HOSTINGER_DEPLOY.md          ← deploy instructions
├── README.md                    ← project README
├── package.json                 ← bun scripts: dev, build, build:static, lint, format
├── content/blog/                ← 50 markdown blog posts (source of truth)
├── src/
│   ├── routes/                  ← TanStack Router file-routes
│   ├── data/                    ← profile, posts, posts-content, caseStudies, hubs, media, products
│   ├── components/              ← SiteChrome + diagrams + shadcn/ui
│   ├── lib/seo.ts               ← SITE_URL + OG_IMAGE_URL + SITE_KEYWORDS (env-driven)
│   └── styles.css               ← tokens + tailwind
├── scripts/
│   ├── generate-posts.ts        ← blog markdown → posts.ts + posts-content.ts
│   └── build-static.ts          ← SSR build → prerendered static HTML
├── public/
│   ├── .htaccess                ← Apache config for Hostinger (rewrites, cache, compression, security)
│   ├── Rizwan_Zafar_Resume.pdf  ← downloadable resume
│   ├── robots.txt
│   └── llms.txt
├── dist-static/                 ← built static export (gitignored)
└── docs/                        ← consolidation hub (THIS FOLDER)
    ├── INDEX.md                 ← this file
    ├── reviews/                 ← 14 audit markdown files
    ├── references/              ← cloned reference repos (gitignored)
    └── deploy/site.zip          ← upload artifact
```

---

## Session history (commits on `main`)

| Commit                                                                            | Description                                                                                                                |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [`2d53161`](https://github.com/RizwanZafaris/rizwan-pay-architect/commit/2d53161) | Performance: main JS bundle 813KB→549KB, strip 1.3MB /about JPG                                                            |
| [`d9583de`](https://github.com/RizwanZafaris/rizwan-pay-architect/commit/d9583de) | Impeccable setup (PRODUCT/DESIGN) + P0/P1 audit fixes (em dashes, gradient text, touch targets, focus rings, bundle split) |
| [`e314b51`](https://github.com/RizwanZafaris/rizwan-pay-architect/commit/e314b51) | Static export pipeline + .htaccess + Hostinger deploy guide                                                                |
| [`1f81e84`](https://github.com/RizwanZafaris/rizwan-pay-architect/commit/1f81e84) | Product+Program+AI+Crypto+PMO expansion + Media page + Essays→Blog                                                         |
| [`64e25c2`](https://github.com/RizwanZafaris/rizwan-pay-architect/commit/64e25c2) | SEO, content & contact-form overhaul + code-quality fixes                                                                  |

---

## What's installed (Claude skills relevant to this project)

| Skill                                                                            | Source     | Purpose                              |
| -------------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| `impeccable` (v3.0.4)                                                            | pbakaus    | Design framework, 23 commands (used) |
| `taste-skill`                                                                    | Leonxlnx   | Anti-slop frontend rules             |
| `brandkit`, `imagegen-frontend-web`, `image-to-code`, `imagegen-frontend-mobile` | Leonxlnx   | Image generation prompts             |
| `performance-optimization`                                                       | addyosmani | Web perf — used to cut the bundle    |
| `frontend-ui-engineering`                                                        | addyosmani | Production UI quality                |
| `code-review-and-quality`                                                        | addyosmani | Multi-axis code review               |

All discoverable via `awesome-agent-skills` skill or the standard skill list.

---

## What's NOT yet done (open items)

1. **OG card images** — per-route 1200×630 cards prompted in [`11-IMAGES_NEEDED.md`](reviews/11-IMAGES_NEEDED.md). The sitewide default at `public/og-default.png` is shipped; per-page cards still pending.
2. **Contact form backend** — set `VITE_CONTACT_ACCESS_KEY=<web3forms_key>` in the deploy environment to enable server-side submissions (otherwise falls back to mailto).
3. **Video walk-throughs** — [`/media`](https://rzifi.com/media) has placeholders for 3 Looms (Simpaisa architecture, BNPL launch, AI suite).
