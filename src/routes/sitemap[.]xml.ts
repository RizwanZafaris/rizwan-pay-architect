import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/posts";
import { audiences } from "@/data/hubs";
import { products } from "@/data/products";

const TODAY_ISO = "2026-05-17";

const BASE_URL = "https://rizwan-pay-architect.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/about",
          "/products",
          "/product-work",
          "/blog",
          "/topics",
          "/for",
          "/resume",
          "/contact",
        ];
        // Exclude coming-soon product detail pages (noindexed); they have no content yet.
        const productPaths = products
          .filter((p) => p.status !== "coming-soon")
          .map((p) => p.link)
          .filter((href) => href.startsWith("/products/"));
        // Only include posts dated on or before today.
        const publicPosts = posts.filter((p) => p.date <= TODAY_ISO);
        const paths = [
          ...staticPaths,
          // Topic hubs are currently thin (filter views) — excluded from sitemap until unique content lands.
          ...audiences.map((a) => `/for/${a.slug}`),
          ...productPaths,
          ...caseStudies.map((c) => `/product-work/${c.slug}`),
          ...publicPosts.map((p) => `/blog/${p.slug}`),
        ];
        const urls = paths
          .map(
            (p) =>
              `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
