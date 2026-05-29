# SEO + AI SEO Content Backlog

This folder is the scale layer for rzifi.com.

It is intentionally **not** the publishing layer. Backlog items and the 10,000-topic map are planning assets. A topic becomes an indexable blog post only after it is rewritten into `content/blog/*.md`, reviewed, internally linked, and passed through:

```bash
bun run content:validate
bun scripts/generate-posts.ts
bun run seo:llms
bun run build:static
bun run seo:audit
```

## Why This Guardrail Exists

The goal is topical authority, not a page-count vanity metric. Google can treat mass low-value content as scaled content abuse. AI answer engines also prefer crisp entity signals, first-hand experience, strong internal linking and original analysis. For Rizwan's brand, 400 planned high-quality posts are useful; 400 thin indexed posts are a liability.

## Required Backlog Fields

- `id`
- `cluster`
- `title`
- `slug`
- `searchIntent`
- `primaryKeyword`
- `secondaryKeywords`
- `targetReader`
- `whyRizwanCanWin`
- `outline`
- `internalLinks`
- `aiAnswerSnippet`
- `publishPriority`

## Publishing Rule

Only publish posts that add first-hand operator value from Rizwan's positioning:

Product & Program Executive Scaling Fintech Infrastructure in Complex Markets.
