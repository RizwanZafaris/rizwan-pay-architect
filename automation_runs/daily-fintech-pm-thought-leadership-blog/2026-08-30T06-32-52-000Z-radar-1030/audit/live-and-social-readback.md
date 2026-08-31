# Live And Social Readback

Checked at: 2026-08-31T05:49:30Z / 2026-08-31T09:49:30 GST.
Run completed as delayed verification for the 2026-08-30 10:30 GST checkpoint.

## Website

- Source SHA: `ed9fdbf8f355f967651ff3e4d826b38231e576dd`.
- Public `deployment.json`: matched `ed9fdbf8f355f967651ff3e4d826b38231e576dd`, deployed at `2026-08-31T01:27:39Z`, GitHub run `33347612118`.
- `EXPECTED_SOURCE_SHA=ed9fdbf8f355f967651ff3e4d826b38231e576dd bun run seo:check-live`: passed 32/32 with approved network access.
- Article URL: `https://rzifi.com/blog/sama-open-banking-licensed-operating-model/` returned HTTP 200 `text/html`.
- Public HTML contains self-canonical `https://rzifi.com/blog/sama-open-banking-licensed-operating-model/`, `article:published_time` `2026-08-30`, H1 `Saudi Open Banking Needs a Licensed Operating Model`, `/hire/`, and no visible `noindex` marker in the targeted metadata scan.
- OG/Twitter image URL: `https://rzifi.com/og/blog/sama-open-banking-licensed-operating-model-v20260830.png`.
- Public image returned HTTP 200 `image/png`; byte inspection confirmed PNG 1200x630.

## X

- `distribution/twitter_x.md` is non-empty and points to the live canonical article.
- Sandbox Buffer dry-run failed with `fetch failed`.
- Approved-network Buffer dry-run reached Buffer but failed with `Access token is not valid`.
- No X post was scheduled or mutated.

## LinkedIn

- This was a 10:30 GST checkpoint, so no LinkedIn approval package or native LinkedIn schedule was created.
- `distribution/linkedin.md` is blank/newline-only; `distribution/linkedin-candidates.md` records the SAMA open-banking candidate for a later 18:30 GST approval decision.
- Buffer/LinkedIn scheduled-post reconciliation remains unavailable because Buffer returned `Access token is not valid`.
- No Buffer LinkedIn release, browser duplicate, retry, backfill, roll-forward, package replacement, or queue release occurred.

## Comments

- Comments were not checked in this run. Leave comment handling to the separate Daily LinkedIn Comment Review automation.
