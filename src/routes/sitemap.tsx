import { createFileRoute } from "@tanstack/react-router";
import { htmlSitemapSections } from "@/lib/sitemap-data";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Crawlable sitemap for Rizwan Zafar's executive portfolio, case studies, topic hubs and payments essays.",
      },
      { property: "og:title", content: "Sitemap | Rizwan Zafar" },
      {
        property: "og:description",
        content: "A clean map of the indexable pages on rzifi.com.",
      },
      { property: "og:url", content: absUrl("/sitemap") },
    ],
    links: [{ rel: "canonical", href: absUrl("/sitemap") }],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Sitemap
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        A clean map of the site.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Indexable pages grouped by section so search engines and people can reach the important work
        without relying only on JavaScript filters.
      </p>

      <div className="mt-12 space-y-12">
        {htmlSitemapSections.map((section) => (
          <section key={section.title} className="border-t border-rule pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl text-ink">{section.title}</h2>
              <span className="text-xs text-ink-soft font-mono-tech">
                {section.entries.length} page{section.entries.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {section.entries.map((entry) => (
                <a
                  key={entry.path}
                  href={entry.path === "/" ? "/" : `${entry.path}/`}
                  className="block rounded-lg border border-rule bg-surface px-5 py-4 hover:border-ink/40 transition-colors"
                >
                  <div className="font-medium text-ink">{entry.title}</div>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">{entry.description}</p>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
                    {entry.path === "/" ? "/" : `${entry.path}/`}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
