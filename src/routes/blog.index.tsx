import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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

// Authority ledger rows — same three signals the old boxed panel carried,
// recomposed as a ruled mono ledger for the journal masthead.
function authoritySignals() {
  return [
    { value: String(posts.length), label: "Essays" },
    { value: String(hubs.length), label: "Hubs" },
    { value: "$1B+", label: "GTV lens" },
  ];
}

function BlogIndex() {
  const { q, hub, reader, company } = Route.useSearch();
  const navigate = useNavigate({ from: "/blog/" });

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
    <div className="blog-page">
      {/* ============ MASTHEAD — journal front page, not a boxed hero ======= */}
      <header className="rz-beam relative border-b border-rule bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 md:pt-24 pb-10 md:pb-14">
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Payments essays
              </div>
              <h1 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink mt-4 max-w-5xl">
                Essays on regulated payments infrastructure{" "}
                <span className="italic text-[var(--brand)]">from the operator's seat.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
                Field notes on payment rails, cross-border corridors, settlement, risk, onboarding,
                AI in fintech and the programme discipline required to scale them in complex
                markets.
              </p>
            </div>
            {/* Authority signals — ruled mono ledger, right column of the spread */}
            <div className="lg:col-span-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                Authority signals
              </div>
              <dl className="mt-3 border-t border-rule">
                {authoritySignals().map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                      {s.label}
                    </dt>
                    <dd className="font-instrument text-2xl leading-none text-ink tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        {/* Topic radar — kinetic strip rides the masthead's base rule */}
        <div
          className="blog-kinetic-strip overflow-hidden border-t border-rule bg-background"
          aria-label="Key blog topics"
        >
          <span className="blog-kinetic-label" aria-hidden="true">
            Topic radar
          </span>
          <div className="blog-kinetic-track flex w-max items-center gap-6 py-3 text-[10px] uppercase tracking-[0.2em] text-ink-soft font-mono-tech">
            {[...hubs.slice(0, 8), ...hubs.slice(0, 8)].map((h, index) => (
              <span key={`${h.slug}-${index}`} className="inline-flex items-center gap-6">
                <span>{h.shortTitle}</span>
                <span className="text-[var(--brand)]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ============ FEATURED — the lead essay as an asymmetric spread ===== */}
      {featured && (
        <section className="rz-beam relative border-b border-rule bg-surface">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              {...blogFilterAttrs(featured, true)}
              data-glow
              className="group relative grid gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] font-mono-tech">
                  <span className="text-[var(--brand)] font-semibold">◆ Featured essay</span>
                  <span className="text-ink-soft">{featured.category}</span>
                  <span className="text-ink-soft">
                    {formatPostDate(featured.date)} · {featured.readingTime}
                  </span>
                </div>
                <h2 className="font-instrument text-[clamp(2rem,4.4vw,4rem)] text-ink mt-5 leading-[1.03] transition-colors group-hover:text-[var(--brand)] max-w-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl">
                  {featured.thesis ?? featured.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  <span className="rz-link">Read the featured essay</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </div>
              <div className="lg:col-span-4 border-t border-rule pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Strongest lens
                </div>
                <ul className="mt-2 divide-y divide-rule">
                  {postReaders(featured)
                    .slice(0, 3)
                    .map((r) => (
                      <li key={r} className="py-2.5 text-sm text-ink">
                        {r}
                      </li>
                    ))}
                </ul>
                <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                  Related signals
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {featured.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ============ SEARCH + FILTERS — flat ruled band =================== */}
      <section className="border-b border-rule bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-12">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Search the library
              </div>
              <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                Payments infrastructure writing mapped to topic, audience and company context.
              </p>
            </div>
            <div className="text-xs text-ink-soft font-mono-tech">
              {filtered.length} available essay{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
          {/* Real <form>: Enter submits a GET back to /blog/ (which the inline
              filter script reads from the URL on load), no-JS visitors get a
              working filter, and role="search" lets the analytics bridge fire
              site_search on submit. */}
          <form role="search" action="/blog/" method="get" className="grid md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <label
                className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech"
                htmlFor="blog-q"
              >
                Search
              </label>
              <input
                id="blog-q"
                name="q"
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
          </form>
          <div
            data-blog-filter-status
            role="status"
            aria-live="polite"
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
              className="rounded-full border border-rule px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] hover:border-ink/40 hover:text-ink"
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      {/* ============ THE INDEX — divide-y journal entries, no card wall ==== */}
      <section className="rz-beam relative border-b border-rule bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Latest field notes
              </div>
              <h2 className="mt-3 font-instrument text-3xl md:text-4xl text-ink leading-[1.05]">
                Practical essays for payments leaders.
              </h2>
            </div>
            <div className="text-xs text-ink-soft font-mono-tech">Sorted newest first</div>
          </div>
          <div
            data-blog-empty
            className={`border-y border-rule px-6 py-14 text-center text-ink-soft ${
              list.length === 0 ? "" : "hidden"
            }`}
          >
            No essays match these filters.
          </div>
          {list.length > 0 && (
            <div data-rz-stagger className="border-t border-rule">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  {...blogFilterAttrs(p)}
                  data-glow
                  className="group relative grid gap-y-2 border-b border-rule py-6 md:grid-cols-12 md:gap-x-8 md:py-7"
                >
                  <div className="flex items-baseline gap-x-4 md:col-span-2 md:block">
                    <span className="block font-mono-tech text-[11px] tracking-[0.14em] text-ink-soft tabular-nums">
                      {formatPostDate(p.date)}
                    </span>
                    <span className="block font-mono-tech text-[11px] tracking-[0.14em] text-ink-soft/70 md:mt-1">
                      {p.readingTime}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-instrument text-2xl md:text-[1.75rem] leading-[1.1] text-ink transition-all duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5 group-hover:text-[var(--brand)]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed md:line-clamp-1">
                      {p.thesis ?? p.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end md:gap-6 md:self-center">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--brand)] font-mono-tech">
                      {p.category}
                    </span>
                    <span
                      className="hidden text-lg text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:inline"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ TOPIC HUBS ============================================ */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-14">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold mb-4">
            ◆ Browse by topic hub
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
      </section>
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
        // Named so the no-JS GET form round-trips the value (?hub=…, ?reader=…,
        // ?company=…) in the exact shape the inline filter script reads.
        name={id.replace("blog-", "")}
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
