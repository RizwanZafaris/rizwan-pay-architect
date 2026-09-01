import { caseStudies } from "../data/caseStudies";
import { audiences, hubs } from "../data/hubs";
import { posts, publishedPosts } from "../data/posts";
import { products } from "../data/products";

export type SitemapEntry = {
  path: string;
  title: string;
  section: string;
  description: string;
  lastmod: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

const SITE_REFRESH_DATE = "2026-06-05";

const staticEntries: SitemapEntry[] = [
  {
    path: "/",
    title: "Home",
    section: "Core",
    description: "Executive positioning, proof metrics and selected work.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "weekly",
    priority: 1,
  },
  {
    path: "/product-work",
    title: "Case Studies",
    section: "Core",
    description: "Payment infrastructure, onboarding, risk and transformation case studies.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    path: "/blog",
    title: "Payments Essays",
    section: "Core",
    description: "Practitioner essays on regulated payments, fintech product and PMO.",
    lastmod: publishedPosts[0]?.date ?? SITE_REFRESH_DATE,
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/journey",
    title: "The Journey",
    section: "Core",
    description:
      "Seventeen years, ten markets, three industries — a payments operator's map across MENA, South Asia and beyond.",
    lastmod: "2026-07-05",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/about",
    title: "About",
    section: "Core",
    description:
      "The operator story: engineering to product, why frontier markets, and the beliefs that shape the work.",
    lastmod: "2026-07-05",
    changefreq: "monthly",
    priority: 0.85,
  },
  {
    path: "/for",
    title: "For Recruiters",
    section: "Core",
    description: "Recruiter-facing fit for senior product and program leadership roles.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/resume",
    title: "Resume",
    section: "Core",
    description: "Executive resume for payments product and program leadership.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/contact",
    title: "Contact",
    section: "Core",
    description: "Contact page for senior roles, advisory and speaking.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/topics",
    title: "Topic Hubs",
    section: "Core",
    description: "Topical clusters across payments, risk, AI, PMO and emerging markets.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "weekly",
    priority: 0.75,
  },
  {
    path: "/products",
    title: "Products",
    section: "Core",
    description: "Products and platforms built or being developed.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "monthly",
    priority: 0.65,
  },
  {
    path: "/product-manager-os",
    title: "Product Manager OS",
    section: "Core",
    description:
      "Open-source operating loop for product work: six stage gates, fill-in lifecycle templates, PM canon cards and optional AI layers.",
    lastmod: "2026-09-02",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/sitemap",
    title: "HTML Sitemap",
    section: "Core",
    description: "A crawlable human-readable map of indexable pages.",
    lastmod: SITE_REFRESH_DATE,
    changefreq: "weekly",
    priority: 0.5,
  },
];

const productEntries: SitemapEntry[] = products
  .filter((p) => p.status !== "coming-soon")
  .map((p) => p.link)
  .filter((href) => href.startsWith("/products/"))
  .map((path) => {
    const product = products.find((p) => p.link === path);
    return {
      path,
      title: product?.name ?? path,
      section: "Products",
      description: product?.oneLiner ?? "Product detail page.",
      lastmod: SITE_REFRESH_DATE,
      changefreq: "monthly" as const,
      priority: 0.6,
    };
  });

const audienceEntries: SitemapEntry[] = audiences.map((a) => ({
  path: `/for/${a.slug}`,
  title: a.title,
  section: "Recruiter Fit",
  description: a.description,
  lastmod: SITE_REFRESH_DATE,
  changefreq: "monthly",
  priority: 0.8,
}));

const topicEntries: SitemapEntry[] = hubs.map((h) => ({
  path: `/topics/${h.slug}`,
  title: h.title,
  section: "Topic Hubs",
  description: h.description,
  lastmod: SITE_REFRESH_DATE,
  changefreq: "weekly",
  priority: 0.7,
}));

const caseStudyEntries: SitemapEntry[] = caseStudies.map((c) => ({
  path: `/product-work/${c.slug}`,
  title: c.title,
  section: "Case Studies",
  description: c.tagline,
  lastmod: SITE_REFRESH_DATE,
  changefreq: "monthly",
  priority: 0.85,
}));

const blogEntries: SitemapEntry[] = publishedPosts.map((p) => ({
  path: `/blog/${p.slug}`,
  title: p.title,
  section: "Essays",
  description: p.description,
  lastmod: p.date,
  changefreq: "monthly",
  priority: p.featured ? 0.85 : 0.75,
}));

export const sitemapEntries: SitemapEntry[] = [
  ...staticEntries,
  ...audienceEntries,
  ...productEntries,
  ...caseStudyEntries,
  ...topicEntries,
  ...blogEntries,
];

export const routesToPrerender = Array.from(
  new Set([
    ...sitemapEntries.map((entry) => entry.path),
    ...posts.map((p) => `/blog/${p.slug}`),
    // Paid-ads landing page: prerendered so the ad click lands on real HTML,
    // but intentionally kept OUT of `sitemapEntries` (and ships robots:noindex)
    // so it never competes with /resume in organic search.
    "/hire",
    // Advisory page — PARKED until 2026-10-02: prerendered so direct shares
    // work, but noindex + out of the sitemap + no internal links (owner
    // wants zero traffic redirected to it during the 90-day window).
    "/consulting",
    // Speaking page — PARKED until 2027-01-06 (owner call 2026-07-06, same
    // treatment as /consulting): prerendered for direct shares, but noindex
    // + out of the sitemap + no nav/footer links for the 6-month window.
    "/speaking",
    // Contact-form confirmation (Web3Forms native-POST redirect target).
    // Prerendered + noindex, out of the sitemap for the same reason.
    "/contact/thanks",
    // Newsletter-signup confirmation (same pattern, subscriber-correct copy).
    "/newsletter/thanks",
  ]),
);

export const htmlSitemapSections = [
  { title: "Core Pages", entries: staticEntries },
  { title: "Recruiter Fit", entries: audienceEntries },
  { title: "Case Studies", entries: caseStudyEntries },
  { title: "Topic Hubs", entries: topicEntries },
  { title: "Essays", entries: blogEntries },
].filter((section) => section.entries.length > 0);
