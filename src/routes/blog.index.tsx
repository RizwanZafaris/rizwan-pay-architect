import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { publishedPosts as posts } from "@/data/posts";
import { hubs, hubForPost, type HubSlug } from "@/data/hubs";
import { absUrl } from "@/lib/seo";

const READERS = [
  "Network product",
  "PSP / orchestration",
  "Bank / regulated fintech",
  "Founder / operator",
] as const;

const COMPANIES = ["Visa", "Mastercard", "Stripe", "Adyen", "Wise", "Thunes", "DLocal"] as const;

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  hub: fallback(z.string(), "").default(""),
  reader: fallback(z.string(), "").default(""),
  company: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Payments Essays, Knowledge Base | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Searchable essays on payment infrastructure, cross-border payments, SWIFT, ISO 20022, settlement, fraud and merchant onboarding.",
      },
      { property: "og:title", content: "Payments Essays, Rizwan Zafar" },
      {
        property: "og:description",
        content: "A searchable knowledge base for payments product leaders.",
      },
      { property: "og:url", content: absUrl("/blog") },
      { name: "twitter:title", content: "Payments Essays, Rizwan Zafar" },
      {
        name: "twitter:description",
        content:
          "Searchable essays on payment infrastructure, SWIFT, ISO 20022, settlement, fraud and onboarding.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/blog") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Payments Essays, Rizwan Zafar",
          url: absUrl("/blog"),
          author: { "@type": "Person", name: "Rizwan Zafar" },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absUrl(`/blog/${p.slug}`),
            datePublished: p.date,
            articleSection: p.category,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

// Heuristics, derived from existing post metadata so filters work without retagging.
function postRelevantFor(p: { tags: string[]; content: string; title: string }): string[] {
  const haystack = (p.title + " " + p.tags.join(" ") + " " + p.content).toLowerCase();
  return COMPANIES.filter((c) => haystack.includes(c.toLowerCase()));
}

function postReaders(p: { category: string; tags: string[] }): string[] {
  const t = p.tags.map((x) => x.toLowerCase()).join(" ");
  const out = new Set<string>();
  if (/network|scheme|visa|mastercard|tokeniz|acceptance/.test(t + " " + p.category.toLowerCase()))
    out.add("Network product");
  if (/orchestration|api|hosted|gateway|psp|local payment/.test(t)) out.add("PSP / orchestration");
  if (/swift|iso 20022|gpi|correspondent|aml|sanctions|pci|iso 27001|regulated/.test(t))
    out.add("Bank / regulated fintech");
  if (out.size === 0) out.add("Founder / operator");
  return [...out];
}

function blogFilterAttrs(p: (typeof posts)[number], featured = false) {
  return {
    "data-blog-result": "",
    "data-blog-featured": featured ? "true" : "false",
    "data-search": `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase(),
    "data-hub": hubForPost(p)?.slug ?? "",
    "data-readers": postReaders(p).join("|"),
    "data-companies": postRelevantFor(p).join("|"),
  };
}

const BLOG_FILTER_SCRIPT = `
(() => {
  if (window.__rzBlogFilterBound) return;
  window.__rzBlogFilterBound = true;

  const qInput = document.querySelector('#blog-q');
  const hubSelect = document.querySelector('#blog-hub');
  const readerSelect = document.querySelector('#blog-reader');
  const companySelect = document.querySelector('#blog-company');
  const status = document.querySelector('[data-blog-filter-status]');
  const countEl = document.querySelector('[data-blog-match-count]');
  const emptyEl = document.querySelector('[data-blog-empty]');
  const clearEl = document.querySelector('[data-blog-clear]');
  const results = Array.from(document.querySelectorAll('[data-blog-result]'));
  if (!qInput || !hubSelect || !readerSelect || !companySelect || results.length === 0) return;

  const params = new URLSearchParams(window.location.search);
  qInput.value = params.get('q') || '';
  hubSelect.value = params.get('hub') || '';
  readerSelect.value = params.get('reader') || '';
  companySelect.value = params.get('company') || '';

  const hasToken = (value, selected) => {
    if (!selected) return true;
    return (value || '').split('|').includes(selected);
  };

  const updateUrl = () => {
    const next = new URLSearchParams();
    if (qInput.value.trim()) next.set('q', qInput.value.trim());
    if (hubSelect.value) next.set('hub', hubSelect.value);
    if (readerSelect.value) next.set('reader', readerSelect.value);
    if (companySelect.value) next.set('company', companySelect.value);
    const qs = next.toString();
    const nextUrl = qs ? '/blog/?' + qs : '/blog/';
    window.history.replaceState(null, '', nextUrl);
  };

  const apply = () => {
    const q = qInput.value.trim().toLowerCase();
    const hub = hubSelect.value;
    const reader = readerSelect.value;
    const company = companySelect.value;
    const active = Boolean(q || hub || reader || company);
    let count = 0;

    for (const el of results) {
      const matches =
        (!q || (el.getAttribute('data-search') || '').includes(q)) &&
        (!hub || el.getAttribute('data-hub') === hub) &&
        hasToken(el.getAttribute('data-readers'), reader) &&
        hasToken(el.getAttribute('data-companies'), company);

      el.hidden = !matches;
      if (matches) count++;
    }

    if (status) status.classList.toggle('hidden', !active);
    if (countEl) countEl.textContent = count + ' match' + (count === 1 ? '' : 'es');
    if (emptyEl) emptyEl.classList.toggle('hidden', count !== 0);
    updateUrl();
  };

  qInput.addEventListener('input', apply);
  hubSelect.addEventListener('change', apply);
  readerSelect.addEventListener('change', apply);
  companySelect.addEventListener('change', apply);
  clearEl?.addEventListener('click', (event) => {
    event.preventDefault();
    qInput.value = '';
    hubSelect.value = '';
    readerSelect.value = '';
    companySelect.value = '';
    apply();
  });

  apply();
})();
`;

function BlogIndex() {
  const { q, hub, reader, company } = Route.useSearch();
  const navigate = useNavigate({ from: "/blog" });

  type SearchState = { q: string; hub: string; reader: string; company: string };
  const setParam = (key: keyof SearchState, value: string) =>
    navigate({ search: (prev: SearchState) => ({ ...prev, [key]: value }) });

  const ql = q.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    if (hub) {
      const h = hubForPost(p);
      if (h?.slug !== hub) return false;
    }
    if (reader && !postReaders(p).includes(reader)) return false;
    if (company && !postRelevantFor(p).includes(company)) return false;
    if (ql) {
      const hay = (p.title + " " + p.description + " " + p.tags.join(" ")).toLowerCase();
      if (!hay.includes(ql)) return false;
    }
    return true;
  });

  const featured =
    !q && !hub && !reader && !company ? (posts.find((p) => p.featured) ?? posts[0]) : null;
  const list = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;
  const activeHub = hub ? hubs.find((h) => h.slug === hub) : null;

  return (
    <div className="blog-page mx-auto max-w-6xl px-6 py-20">
      <div className="blog-soft-reveal text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ Payments essays
      </div>
      <h1
        className="blog-soft-reveal font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]"
        style={{ "--motion-delay": "60ms" } as CSSProperties}
      >
        A working knowledge base on{" "}
        <span className="italic text-ink-soft">regulated payments.</span>
      </h1>
      <p
        className="blog-soft-reveal mt-5 max-w-2xl text-lg text-ink-soft"
        style={{ "--motion-delay": "120ms" } as CSSProperties}
      >
        Practical writing from inside payments product, infrastructure, cross-border, settlement,
        risk, onboarding and the product decisions that shape them.
      </p>

      {/* Featured */}
      {featured && (
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          {...blogFilterAttrs(featured, true)}
          className="blog-result-card group mt-12 block rounded-lg border border-ink/10 bg-surface p-8 md:p-12"
          style={{ "--motion-delay": "180ms" } as CSSProperties}
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[var(--accent-emerald)]">
              Featured essay · {featured.category}
            </span>
            <span className="text-[10px] font-mono-tech text-ink-soft">{featured.readingTime}</span>
          </div>
          <h2 className="font-instrument text-3xl md:text-5xl text-ink mt-4 leading-[1.05] group-hover:text-[var(--brand)] transition-colors max-w-3xl">
            {featured.title}
          </h2>
          <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl">
            {featured.thesis ?? featured.description}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-6 text-sm text-ink">
            Read essay
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      )}

      {/* Search + filters */}
      <div
        className="blog-search-panel mt-12 rounded-lg border border-rule bg-surface/60 p-5 md:p-6"
        style={{ "--motion-delay": "220ms" } as CSSProperties}
      >
        <div className="grid md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <label
              className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech"
              htmlFor="blog-q"
            >
              Search
            </label>
            <input
              id="blog-q"
              type="search"
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
              placeholder="SWIFT, reconciliation, onboarding…"
              className="mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"
            />
          </div>
          <Select
            id="blog-hub"
            label="Topic"
            value={hub}
            onChange={(v) => setParam("hub", v)}
            options={[
              ["", "All topics"],
              ...hubs.map((h): [string, string] => [h.slug, h.shortTitle]),
            ]}
          />
          <Select
            id="blog-reader"
            label="Reader"
            value={reader}
            onChange={(v) => setParam("reader", v)}
            options={[["", "Any"], ...READERS.map((r): [string, string] => [r, r])]}
          />
          <Select
            id="blog-company"
            label="Relevant for"
            value={company}
            onChange={(v) => setParam("company", v)}
            options={[["", "Any"], ...COMPANIES.map((c): [string, string] => [c, c])]}
          />
        </div>
        <div
          data-blog-filter-status
          className={`mt-3 flex items-center justify-between gap-4 text-xs text-ink-soft ${
            q || hub || reader || company ? "" : "hidden"
          }`}
        >
          <span data-blog-match-count>
            {list.length} match{list.length === 1 ? "" : "es"}
            {activeHub && ` · ${activeHub.title}`}
          </span>
          <button
            type="button"
            data-blog-clear
            onClick={() => navigate({ search: { q: "", hub: "", reader: "", company: "" } })}
            className="underline underline-offset-4 hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 divide-y divide-rule border-y border-rule">
        <div
          data-blog-empty
          className={`py-12 text-center text-ink-soft ${list.length === 0 ? "" : "hidden"}`}
        >
          No essays match these filters.
        </div>
        {list.length > 0 &&
          list.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              {...blogFilterAttrs(p)}
              className="blog-result-card group grid md:grid-cols-12 gap-6 py-7 hover:bg-surface-2 px-2 -mx-2 rounded-lg transition-colors"
            >
              <div className="md:col-span-3 text-xs text-ink-soft font-mono-tech">
                <div>
                  {new Date(p.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="mt-1 uppercase tracking-[0.14em] text-[10px] text-[var(--accent-emerald)] font-medium">
                  {p.category}
                </div>
                <div className="mt-1">{p.readingTime}</div>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-instrument text-2xl text-ink group-hover:text-[var(--brand)] transition-colors leading-snug">
                  {p.title}
                </h2>
                <p className="mt-2 text-ink-soft leading-relaxed">{p.thesis ?? p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-surface font-mono-tech uppercase tracking-[0.1em]"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-ink-soft group-hover:text-ink inline-flex items-center gap-1">
                    Read essay{" "}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Topic hub links */}
      <div className="mt-14 pt-8 border-t border-rule">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3">
          Browse by topic hub
        </div>
        <div className="flex flex-wrap gap-2">
          {hubs.map((h) => (
            <Link
              key={h.slug}
              to="/topics/$hub"
              params={{ hub: h.slug }}
              className="text-xs px-3 py-1.5 rounded-full border border-rule text-ink-soft hover:text-ink hover:border-ink/40 transition-colors"
            >
              {h.shortTitle}
            </Link>
          ))}
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: BLOG_FILTER_SCRIPT }} />
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
};

function Select({ id, label, value, onChange, options }: SelectProps) {
  return (
    <div className="md:col-span-2">
      <label
        className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"
      >
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
