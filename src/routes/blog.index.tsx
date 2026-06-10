import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { publishedPosts as posts } from "@/data/posts";
import { hubs, hubForPost } from "@/data/hubs";
import { absUrl } from "@/lib/seo";
import { siteSearch } from "@/lib/analytics";

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
function postRelevantFor(p: { tags: string[]; content?: string; title: string }): string[] {
  const haystack = `${p.title} ${p.tags.join(" ")} ${p.content ?? ""}`.toLowerCase();
  return COMPANIES.filter((c) => haystack.includes(c.toLowerCase()));
}

function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
    // Merge into the existing query (preserving utm_*/click-ids for the
    // cal.com forwarder and analytics) and keep the hash; no-op when the URL
    // is already correct so the initial apply() never rewrites history.
    // Same pattern as the /product-work filter.
    const next = new URLSearchParams(window.location.search);
    const setOrDelete = (key, value) => { if (value) next.set(key, value); else next.delete(key); };
    setOrDelete('q', qInput.value.trim());
    setOrDelete('hub', hubSelect.value);
    setOrDelete('reader', readerSelect.value);
    setOrDelete('company', companySelect.value);
    const qs = next.toString();
    const nextUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, '', nextUrl);
    }
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
    <div className="blog-page mx-auto max-w-6xl px-6 py-16 md:py-20">
      <section className="blog-hero-shell relative grid gap-10 overflow-hidden rounded-lg border border-rule bg-surface px-5 py-7 md:px-7 md:py-8 lg:grid-cols-12 lg:items-end">
        <span aria-hidden="true" className="blog-signal-mark blog-signal-mark-a" />
        <span aria-hidden="true" className="blog-signal-mark blog-signal-mark-b" />
        <div className="relative z-10 lg:col-span-8">
          <div className="blog-soft-reveal blog-eyebrow text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
            ◆ Payments essays
          </div>
          <h1
            className="blog-soft-reveal font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-4xl leading-[1.02]"
            style={{ "--motion-delay": "60ms" } as CSSProperties}
          >
            Essays on regulated payments infrastructure{" "}
            <span className="blog-title-accent italic text-ink-soft">
              from the operator's seat.
            </span>
          </h1>
          <p
            className="blog-soft-reveal mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed"
            style={{ "--motion-delay": "120ms" } as CSSProperties}
          >
            Field notes on payment rails, cross-border corridors, settlement, risk, onboarding, AI
            in fintech and the programme discipline required to scale them in complex markets.
          </p>
        </div>
        <div
          className="blog-soft-reveal blog-authority-panel relative z-10 lg:col-span-4 rounded-lg border border-rule bg-background/90 p-5"
          style={{ "--motion-delay": "160ms" } as CSSProperties}
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            Authority signals
          </div>
          <div className="mt-4 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 sm:gap-3">
            <div className="min-w-0">
              <div className="font-mono-tech text-xl text-ink">{posts.length}</div>
              <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight">
                Essays
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-mono-tech text-xl text-ink">{hubs.length}</div>
              <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight">
                Hubs
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-mono-tech text-xl text-ink">$1B+</div>
              <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight">
                GTV lens
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="blog-kinetic-strip mt-5 overflow-hidden rounded-lg border border-rule bg-background"
        aria-label="Key blog topics"
      >
        <span className="blog-kinetic-label" aria-hidden="true">
          Topic radar
        </span>
        <div className="blog-kinetic-track flex w-max items-center gap-6 py-3 text-[10px] uppercase tracking-[0.2em] text-ink-soft font-mono-tech">
          {[...hubs.slice(0, 8), ...hubs.slice(0, 8)].map((h, index) => (
            <span key={`${h.slug}-${index}`} className="inline-flex items-center gap-6">
              <span>{h.shortTitle}</span>
              <span className="text-[var(--accent-emerald)]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          {...blogFilterAttrs(featured, true)}
          className="blog-result-card blog-feature-card group mt-12 grid gap-8 rounded-lg border border-ink/10 bg-surface p-6 md:p-9 lg:grid-cols-12 lg:items-stretch"
          style={{ "--motion-delay": "180ms" } as CSSProperties}
        >
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full border border-[var(--accent-emerald)]/25 bg-background px-3 py-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--accent-emerald)]">
                Featured essay
              </span>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-ink-soft">
                {featured.category}
              </span>
              <span className="text-[10px] font-mono-tech text-ink-soft">
                {formatPostDate(featured.date)} · {featured.readingTime}
              </span>
            </div>
            <h2 className="font-instrument text-3xl md:text-5xl text-ink mt-5 leading-[1.04] group-hover:text-[var(--brand)] transition-colors max-w-4xl">
              {featured.title}
            </h2>
            <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl">
              {featured.thesis ?? featured.description}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-7 text-sm font-medium text-ink">
              Read the featured essay
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
          <div className="lg:col-span-4 border-t border-rule pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Strongest lens
            </div>
            <div className="mt-4 space-y-3">
              {postReaders(featured)
                .slice(0, 3)
                .map((r) => (
                  <div
                    key={r}
                    className="rounded-md border border-rule bg-background px-3 py-2 text-sm text-ink"
                  >
                    {r}
                  </div>
                ))}
            </div>
            <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Related signals
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {featured.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="blog-tag-chip rounded-full border border-rule bg-background px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-ink-soft font-mono-tech"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      )}

      {/* Search + filters */}
      <div
        className="blog-search-panel mt-10 rounded-lg border border-rule bg-background p-5 md:p-6"
        style={{ "--motion-delay": "220ms" } as CSSProperties}
      >
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Search the library
            </div>
            <p className="mt-1 max-w-2xl text-sm text-ink-soft">
              Payments infrastructure writing mapped to topic, audience and company context.
            </p>
          </div>
          <div className="text-xs text-ink-soft font-mono-tech">
            {filtered.length} available essay{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
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
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                siteSearch(e.currentTarget.value, "blog", hub || reader || company || undefined);
              }}
              onBlur={(e) => {
                siteSearch(e.currentTarget.value, "blog", hub || reader || company || undefined);
              }}
              placeholder="Reconciliation, onboarding, fraud…"
              className="blog-filter-input mt-1 w-full border border-rule bg-surface px-3 py-2.5 rounded-md text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"
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
            label="Reader lens"
            value={reader}
            onChange={(v) => setParam("reader", v)}
            options={[["", "Any"], ...READERS.map((r): [string, string] => [r, r])]}
          />
          <Select
            id="blog-company"
            label="Company lens"
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
            className="rounded-full border border-rule px-3 py-1 text-[10px] uppercase tracking-[0.14em] hover:border-ink/40 hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* List */}
      <section className="blog-list-shell mt-10">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              Latest field notes
            </div>
            <h2 className="mt-1 font-instrument text-3xl text-ink">
              Practical essays for payments leaders.
            </h2>
          </div>
          <div className="text-xs text-ink-soft font-mono-tech">Sorted newest first</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div
            data-blog-empty
            className={`md:col-span-2 rounded-lg border border-rule bg-surface px-6 py-12 text-center text-ink-soft ${
              list.length === 0 ? "" : "hidden"
            }`}
          >
            No essays match these filters.
          </div>
          {list.length > 0 &&
            list.map((p, index) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                {...blogFilterAttrs(p)}
                className="blog-result-card group flex min-h-[260px] flex-col rounded-lg border border-rule bg-surface p-5 transition-colors hover:bg-background"
                style={{ "--motion-delay": `${260 + Math.min(index, 10) * 35}ms` } as CSSProperties}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft font-mono-tech">
                  <div className="rounded-full border border-[var(--accent-emerald)]/20 bg-background px-2.5 py-1 uppercase tracking-[0.12em] text-[10px] text-[var(--accent-emerald)] font-medium">
                    {p.category}
                  </div>
                  <div>
                    {formatPostDate(p.date)} · {p.readingTime}
                  </div>
                </div>
                <h3 className="mt-5 font-instrument text-2xl md:text-[1.7rem] text-ink group-hover:text-[var(--brand)] transition-colors leading-[1.12]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  {p.thesis ?? p.description}
                </p>
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="blog-tag-chip text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-background font-mono-tech uppercase tracking-[0.1em]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-rule pt-4">
                    <span className="blog-card-number text-xs text-ink-soft font-mono-tech">
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="blog-card-arrow text-xs text-ink-soft group-hover:text-ink inline-flex items-center gap-1">
                      Read essay
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

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
        className="mt-1 w-full border border-rule bg-surface px-3 py-2.5 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"
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
