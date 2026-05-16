// Generates src/data/posts.ts from content/blog/*.md
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const BLOG_DIR = "content/blog";
const OUT = "src/data/posts.ts";

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {} as Record<string, any>, body: raw };
  const data: Record<string, any> = {};
  const lines = m[1].split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const km = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!km) { i++; continue; }
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

// Strip the first H1 (essay title) since the page already renders title
function stripLeadingH1(md: string) {
  return md.replace(/^\s*#\s+[^\n]+\n+/, "");
}

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")).sort();

type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  thesis?: string;
  featured?: boolean;
  tags: string[];
  content: string;
};

const posts: Post[] = files.map((f) => {
  const raw = readFileSync(join(BLOG_DIR, f), "utf-8");
  const { data, body } = parseFrontmatter(raw);
  return {
    slug: data.slug || f.replace(/\.md$/, ""),
    title: data.title || "Untitled",
    date: data.publishDate || data.date || "2026-01-01",
    category: data.category || "Product Strategy",
    readingTime: data.readingTime || "8 min read",
    description: data.metaDescription || data.excerpt || "",
    thesis: data.excerpt || undefined,
    featured: data.featured === "true" || data.featured === true || undefined,
    tags: Array.isArray(data.tags) ? data.tags : [],
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
posts.forEach((p) => { if (flagshipSlugs.has(p.slug)) p.featured = true; });

const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

const header = `// AUTO-GENERATED from content/blog/*.md by scripts/generate-posts.ts
// Do not edit by hand. Run: bun scripts/generate-posts.ts

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  thesis?: string;
  featured?: boolean;
  tags: string[];
  content: string;
};

export const categories = ${JSON.stringify(categories, null, 2)};

export const posts: Post[] = ${JSON.stringify(posts, null, 2)};

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getRelated = (slug: string) => {
  const p = getPost(slug);
  if (!p) return [];
  return posts
    .filter((x) => x.slug !== slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t))))
    .slice(0, 3);
};
`;

writeFileSync(OUT, header);
console.log(`Wrote ${posts.length} posts to ${OUT}`);
console.log(`Categories: ${categories.join(", ")}`);
