#!/usr/bin/env bun
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

type FrontmatterValue = string | string[] | boolean;
type FrontmatterData = Record<string, FrontmatterValue>;

const BLOG_DIR = "content/blog";
const BACKLOG_DIR = "content/seo-backlog";
const MIN_WORDS_HARD = 350;
const MIN_WORDS_RECOMMENDED = 750;
const DESC_MIN = 50;
const DESC_MAX = 165;
const TITLE_MAX = 70;

const SYNTHETIC_PATTERNS = [
  { label: "playbook_claim", re: /\bThis is the playbook\b/gi },
  { label: "highest_leverage", re: /\bsingle highest-(?:leverage|risk)\b/gi },
  { label: "generic_good_looks_like", re: /^##\s+What good looks like/im },
  { label: "generic_key_takeaways", re: /^##\s+Key takeaways/im },
  { label: "exact_problem", re: /\bexact (?:problem|play|migration)\b/gi },
  { label: "teams_that_ship", re: /\bteams that ship (?:it )?(?:well|badly|cleanly)\b/gi },
];

type Issue = { file: string; check: string; detail: string };
const failures: Issue[] = [];
const warnings: Issue[] = [];

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {} as FrontmatterData, body: raw };
  const data: FrontmatterData = {};
  const lines = m[1].split("\n");
  let i = 0;
  while (i < lines.length) {
    const km = lines[i].match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!km) {
      i++;
      continue;
    }
    const key = km[1];
    const rest = km[2];
    if (rest === "") {
      const arr: string[] = [];
      i++;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        arr.push(lines[i].replace(/^\s+-\s+/, "").replace(/^"(.*)"$/, "$1"));
        i++;
      }
      data[key] = arr;
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

function boolValue(value: FrontmatterValue | undefined) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
}

function words(body: string) {
  return (body.replace(/^#\s+[^\n]+\n+/, "").match(/\b[\w'-]+\b/g) ?? []).length;
}

function fail(file: string, check: string, detail: string) {
  failures.push({ file, check, detail });
}

function warn(file: string, check: string, detail: string) {
  warnings.push({ file, check, detail });
}

function syntheticHits(text: string) {
  const hits: string[] = [];
  for (const pattern of SYNTHETIC_PATTERNS) {
    pattern.re.lastIndex = 0;
    const matches = text.match(pattern.re);
    if (matches?.length) hits.push(`${pattern.label}:${matches.length}`);
  }
  return hits;
}

function auditBlogPosts() {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("."));
  const slugs = new Map<string, string>();

  for (const file of files) {
    const path = join(BLOG_DIR, file);
    const { data, body } = parseFrontmatter(readFileSync(path, "utf-8"));
    const status = textValue(data.status).toLowerCase();
    const draft = boolValue(data.draft) || status === "draft";
    const slug = textValue(data.slug, file.replace(/\.md$/, ""));
    const title = textValue(data.title);
    const metaTitle = textValue(data.metaTitle) || title;
    const description = textValue(data.metaDescription) || textValue(data.excerpt);
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const related = Array.isArray(data.relatedArticles) ? data.relatedArticles : [];
    const wc = words(body);

    if (slugs.has(slug)) fail(path, "duplicate_slug", `also used by ${slugs.get(slug)}`);
    slugs.set(slug, path);

    if (!title) fail(path, "title_missing", "frontmatter title is required");
    if (!slug) fail(path, "slug_missing", "frontmatter slug is required");
    if (!textValue(data.category))
      fail(path, "category_missing", "frontmatter category is required");
    if (!textValue(data.publishDate) && !draft)
      fail(path, "publish_date_missing", "published posts need publishDate");
    if (!description) fail(path, "description_missing", "metaDescription or excerpt is required");
    if (!draft && wc < MIN_WORDS_HARD)
      fail(path, "too_thin", `${wc} words < hard minimum ${MIN_WORDS_HARD}`);

    if (metaTitle.length > TITLE_MAX)
      warn(path, "meta_title_long", `${metaTitle.length} chars > ${TITLE_MAX}`);
    if (description && description.length < DESC_MIN)
      warn(path, "description_short", `${description.length} chars < ${DESC_MIN}`);
    if (description && description.length > DESC_MAX)
      warn(path, "description_long", `${description.length} chars > ${DESC_MAX}`);
    if (!draft && wc < MIN_WORDS_RECOMMENDED)
      warn(path, "expand_recommended", `${wc} words < recommended ${MIN_WORDS_RECOMMENDED}`);
    if (!draft && tags.length < 3) warn(path, "tags_low", `${tags.length} tags < 3`);
    if (!draft && related.length < 2)
      warn(path, "internal_links_low", `${related.length} relatedArticles < 2`);
    if (!/##\s+FAQ/im.test(body)) warn(path, "faq_missing", "FAQ section improves AI answers");

    const phrasingHits = syntheticHits(`${title}\n${description}\n${body}`);
    if (!draft && phrasingHits.length >= 2)
      warn(path, "synthetic_phrasing", phrasingHits.join(", "));
  }
}

function auditCaseStudies() {
  const path = "src/data/caseStudies.ts";
  if (!existsSync(path)) return;
  const hits = syntheticHits(readFileSync(path, "utf-8"));
  if (hits.length) warn(path, "case_study_synthetic_phrasing", hits.join(", "));
}

function auditBacklog() {
  if (!existsSync(BACKLOG_DIR)) return;
  const files = readdirSync(BACKLOG_DIR).filter((f) => f.endsWith(".json"));
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const file of files) {
    const path = join(BACKLOG_DIR, file);
    if (file === "topic-map-10000.json") continue;
    const parsed = JSON.parse(readFileSync(path, "utf-8")) as unknown;
    if (!Array.isArray(parsed)) {
      fail(path, "backlog_shape", "expected an array");
      continue;
    }
    for (const [i, item] of parsed.entries()) {
      const row = item as Record<string, unknown>;
      const id = String(row.id ?? "");
      const slug = String(row.slug ?? "");
      const outline = Array.isArray(row.outline) ? row.outline : [];
      const links = Array.isArray(row.internalLinks) ? row.internalLinks : [];
      if (!id) fail(path, "backlog_id_missing", `row ${i + 1}`);
      if (id && ids.has(id)) fail(path, "backlog_id_duplicate", id);
      ids.add(id);
      if (!slug) fail(path, "backlog_slug_missing", id || `row ${i + 1}`);
      if (slug && slugs.has(slug)) fail(path, "backlog_slug_duplicate", slug);
      slugs.add(slug);
      for (const key of ["title", "cluster", "searchIntent", "primaryKeyword", "targetReader"]) {
        if (!row[key]) fail(path, `backlog_${key}_missing`, id || `row ${i + 1}`);
      }
      if (outline.length < 5) warn(path, "backlog_outline_short", `${id}: ${outline.length} items`);
      if (links.length < 2) warn(path, "backlog_links_low", `${id}: ${links.length} links`);
    }
  }
}

auditBlogPosts();
auditCaseStudies();
auditBacklog();

console.log(`Content validation: ${failures.length} failure(s), ${warnings.length} warning(s).`);
for (const issue of failures.slice(0, 60)) {
  console.log(`FAIL [${issue.check}] ${issue.file}: ${issue.detail}`);
}
if (failures.length > 60) console.log(`...and ${failures.length - 60} more failures`);
for (const issue of warnings.slice(0, 80)) {
  console.log(`WARN [${issue.check}] ${issue.file}: ${issue.detail}`);
}
if (warnings.length > 80) console.log(`...and ${warnings.length - 80} more warnings`);

process.exit(failures.length ? 1 : 0);
