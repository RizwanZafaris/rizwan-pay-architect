import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/posts";
import { hubs, audiences } from "@/data/hubs";

const BASE_URL = "https://rizwan-pay-architect.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about", "/product-work", "/blog", "/topics", "/for", "/resume", "/contact"];
        const paths = [
          ...staticPaths,
          ...hubs.map((h) => `/topics/${h.slug}`),
          ...audiences.map((a) => `/for/${a.slug}`),
          ...caseStudies.map((c) => `/product-work/${c.slug}`),
          ...posts.map((p) => `/blog/${p.slug}`),
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
