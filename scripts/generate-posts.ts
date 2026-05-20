// Generates src/data/posts.ts from content/blog/*.md
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const BLOG_DIR = "content/blog";
const OUT = "src/data/posts.ts";

type FrontmatterValue = string | string[] | boolean;
type FrontmatterData = Record<string, FrontmatterValue>;

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {} as FrontmatterData, body: raw };
  const data: FrontmatterData = {};
  const lines = m[1].split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const km = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!km) {
      i++;
      continue;
    }
    const key = km[1];
    const rest = km[2];
    if (rest === "") {
      // multi-line list
      const arr: string[] = [];
      i++;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        arr.push(lines[i].replace(/^\s+-\s+/, "").replace(/^"(.*)"$/, "$1"));
        i++;
      }
      data[key] = arr;
      continue;
    }
    if (rest.startsWith("[")) {
      // inline array
      try {
        const arr = JSON.parse(rest.replace(/'/g, '"'));
        data[key] = arr;
      } catch {
        data[key] = rest;
      }
      i++;
      continue;
    }
    data[key] = rest.replace(/^"(.*)"$/, "$1");
    i++;
  }
  return { data, body: m[2] };
}

function textValue(value: FrontmatterValue | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

// Strip the first H1 (essay title) since the page already renders title
function stripLeadingH1(md: string) {
  return md.replace(/^\s*#\s+[^\n]+\n+/, "");
}

// Filter macOS AppleDouble metadata files (._*) and other dot-files
const files = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".md") && !f.startsWith("."))
  .sort();

type Post = {
  slug: string;
  title: string;
  /**
   * SEO-optimized title (frontmatter `metaTitle`). Used for the <title>
   * tag and og:title; the route renders `title` for the H1 and card UI.
   * Optional — falls back to a trimmed `title + " | Rizwan Zafar"`.
   */
  metaTitle?: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  thesis?: string;
  featured?: boolean;
  tags: string[];
  content: string;
};

const categoryAlias: Record<string, string> = {
  "Fraud, Risk & Compliance": "Fraud & Risk",
  "SWIFT & Cross-Border Payments": "Cross-Border Payments",
};

const posts: Post[] = files.map((f) => {
  const raw = readFileSync(join(BLOG_DIR, f), "utf-8");
  const { data, body } = parseFrontmatter(raw);
  const rawCat = textValue(data.category, "Product Strategy");
  return {
    slug: textValue(data.slug, f.replace(/\.md$/, "")),
    title: textValue(data.title, "Untitled"),
    metaTitle: textValue(data.metaTitle) || undefined,
    date: textValue(data.publishDate) || textValue(data.date, "2026-01-01"),
    category: categoryAlias[rawCat] || rawCat,
    readingTime: textValue(data.readingTime, "8 min read"),
    description: textValue(data.metaDescription) || textValue(data.excerpt),
    thesis: textValue(data.excerpt) || undefined,
    featured: data.featured === "true" || data.featured === true || undefined,
    tags: Array.isArray(data.tags) ? data.tags.filter((tag) => typeof tag === "string") : [],
    content: stripLeadingH1(body).trim(),
  };
});

// Sort newest first
posts.sort((a, b) => b.date.localeCompare(a.date));

// Mark a few flagships as featured
const flagshipSlugs = new Set([
  "payment-cost-50-to-1",
  "reconciliation-is-product-infrastructure",
  "cross-border-corridors-are-operating-systems",
  "swift-payment-explained",
  "hosted-checkout-vs-direct-card-processing",
]);
posts.forEach((p) => {
  if (flagshipSlugs.has(p.slug)) p.featured = true;
});

const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

// Split metadata (lightweight, imported everywhere) from content (heavy, blog post route only).
// Keeps the homepage / blog index / hubs from shipping ~150KB of markdown they do not render.
const postsMeta = posts.map(({ content: _content, ...meta }) => meta);
const postsContent: Record<string, string> = {};
for (const p of posts) postsContent[p.slug] = p.content;

const metaHeader = `// AUTO-GENERATED from content/blog/*.md by scripts/generate-posts.ts
// Do not edit by hand. Run: bun scripts/generate-posts.ts

export type Post = {
  slug: string;
  title: string;
  /** SEO-tightened title from frontmatter \`metaTitle\` (kept under 60 chars).
   *  Falls back to \`title\` + brand suffix when undefined. */
  metaTitle?: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  thesis?: string;
  featured?: boolean;
  tags: string[];
};

export const categories = ${JSON.stringify(categories, null, 2)};

export const posts: Post[] = ${JSON.stringify(postsMeta, null, 2)};

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getRelated = (slug: string) => {
  const p = getPost(slug);
  if (!p) return [];
  return posts
    .filter((x) => x.slug !== slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t))))
    .slice(0, 3);
};
`;

const contentHeader = `// AUTO-GENERATED from content/blog/*.md by scripts/generate-posts.ts
// Do not edit by hand. Run: bun scripts/generate-posts.ts
//
// Heavy markdown content keyed by slug. Imported only by /blog/$slug so the rest
// of the site does not ship ~150KB of essay text in the main bundle.

export const postContent: Record<string, string> = ${JSON.stringify(postsContent, null, 2)};

export const getPostContent = (slug: string): string | undefined => postContent[slug];
`;

writeFileSync(OUT, metaHeader);
writeFileSync(OUT.replace(/posts\.ts$/, "posts-content.ts"), contentHeader);
console.log(`Wrote ${posts.length} posts (meta) to ${OUT}`);
console.log(
  `Wrote ${posts.length} posts (content) to ${OUT.replace(/posts\.ts$/, "posts-content.ts")}`,
);
console.log(`Categories: ${categories.join(", ")}`);
