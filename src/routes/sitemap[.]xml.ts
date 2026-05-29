import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absUrl } from "@/lib/seo";
import { sitemapEntries } from "@/lib/sitemap-data";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Use absUrl() so every loc has the trailing slash Apache redirects to
        // — no 301 hops on sitemap fetches.
        const urls = sitemapEntries
          .map(
            (entry) =>
              `  <url><loc>${absUrl(entry.path)}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`,
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
