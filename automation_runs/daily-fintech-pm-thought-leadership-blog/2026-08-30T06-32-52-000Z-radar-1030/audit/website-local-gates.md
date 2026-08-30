# Website Local Gates

Checked at: 2026-08-30T10:46:51+04:00
Worktree: `/Users/rizwanzafar/Documents/Codex/2026-04-24/worktrees/daily-content-20260830-radar-1030`
Base: `origin/main` at `6122a9dba3c57488a6828e77f560c321109108ea`

## Cap And Scope

- 2026-08-30 Dubai-day article count before commit: 1.
- Slug: `sama-open-banking-licensed-operating-model`
- Body word count by local validator method: 1494.
- Website topic disposition: publish candidate; no second same-day website article is allowed after this commit.

## Passed Gates

- `bun run content:policy` - passed; required `docs/rzifi-cinematic-payments-split-v1.policy.json` exists and validates.
- `bun run content:validate` - passed with 0 failures; legacy site-wide warnings remain unrelated to this article.
- `bun run check:facts` - passed.
- `bun run typecheck` - passed.
- `TMPDIR=/private/tmp BUN_INSTALL_CACHE_DIR=/private/tmp/bun-cache bun run build:static` - passed; 231 routes prerendered, 0 failed.
- `bun run seo:audit` - passed after adding the slug-stable OG image.

## Non-Blocking Build Note

Wrangler attempted to write debug logs under `/Users/rizwanzafar/Library/Preferences/.wrangler/logs/`, which is outside the managed workspace and returned EPERM. The build continued and exited 0.

