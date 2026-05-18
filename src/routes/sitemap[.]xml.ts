import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/posts";
import { audiences } from "@/data/hubs";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const todayIso = new Date().toISOString().slice(0, 10);

        const staticPaths = [
          "/",
          "/about",
          "/products",
          "/product-work",
          "/blog",
          "/media",
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
        // Include every post. Each post has its own indexable HTML, and the
        // build script (scripts/build-static.ts) prerenders every slug, so a
        // date-based filter here would simply omit content from search engines.
        const paths = [
          ...staticPaths,
          // Topic hubs are currently thin (filter views), excluded from sitemap until unique content lands.
          ...audiences.map((a) => `/for/${a.slug}`),
          ...productPaths,
          ...caseStudies.map((c) => `/product-work/${c.slug}`),
          ...posts.map((p) => `/blog/${p.slug}`),
        ];
        const urls = paths
          .map(
            (p) =>
              `  <url><loc>${SITE_URL}${p}</loc><lastmod>${todayIso}</lastmod><changefreq>weekly</changefreq></url>`,
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
