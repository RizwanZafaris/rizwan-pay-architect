import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, type CSSProperties } from "react";
import { publishedPosts as posts } from "@/data/posts";
import { hubs, hubForPost } from "@/data/hubs";
import { absUrl } from "@/lib/seo";
import blogIndexCss from "@/styles/blog-index.css?url";

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
    links: [
      { rel: "canonical", href: absUrl("/blog") },
      { rel: "stylesheet", href: blogIndexCss },
    ],
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

/* One behavior owner for both delivery modes:
   - the inline invocation runs on the hydration-free static build;
   - the React effect invokes the same function in hydrated/SPA development.
   The root stores its cleanup function, so the two entry points cannot bind
   duplicate listeners and an SPA unmount never leaves stale result nodes. */
function blogFilterRuntime() {
  const root = document.querySelector<HTMLElement>("[data-blog-filter-root]");
  if (!root) return;

  type FilterRoot = HTMLElement & { __rzBlogFilterCleanup?: () => void };
  const ownedRoot = root as FilterRoot;
  if (ownedRoot.__rzBlogFilterCleanup) return ownedRoot.__rzBlogFilterCleanup;

  const qInput = root.querySelector<HTMLInputElement>("#blog-q");
  const filterForm = root.querySelector<HTMLFormElement>("[data-blog-filter-form]");
  const hubSelect = root.querySelector<HTMLSelectElement>("#blog-hub");
  const readerSelect = root.querySelector<HTMLSelectElement>("#blog-reader");
  const companySelect = root.querySelector<HTMLSelectElement>("#blog-company");
  const feedback = root.querySelector<HTMLElement>("[data-blog-filter-feedback]");
  const countEl = root.querySelector<HTMLElement>("[data-blog-match-count]");
  const availableEl = root.querySelector<HTMLElement>("[data-blog-available-count]");
  const emptyEl = root.querySelector<HTMLElement>("[data-blog-empty]");
  const clearEl = root.querySelector<HTMLButtonElement>("[data-blog-clear]");
  if (!filterForm || !qInput || !hubSelect || !readerSelect || !companySelect) return;
  filterForm.hidden = false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const controller = "AbortController" in window ? new AbortController() : null;
  const manualCleanups: Array<() => void> = [];
  const enterTimers = new Map<HTMLElement, number>();
  const hideTimers = new Map<HTMLElement, number>();
  const transitionTimers = new Set<number>();

  const listen = <K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    type: K,
    handler: (event: HTMLElementEventMap[K]) => void,
  ) => {
    if (controller) {
      target.addEventListener(type, handler as EventListener, { signal: controller.signal });
    } else {
      target.addEventListener(type, handler as EventListener);
      manualCleanups.push(() => target.removeEventListener(type, handler as EventListener));
    }
  };

  const params = new URLSearchParams(window.location.search);
  qInput.value = params.get("q") || "";
  hubSelect.value = params.get("hub") || "";
  readerSelect.value = params.get("reader") || "";
  companySelect.value = params.get("company") || "";

  const hasToken = (value: string | null, selected: string) =>
    !selected || (value || "").split("|").includes(selected);

  const updateUrl = () => {
    const next = new URLSearchParams(window.location.search);
    const setOrDelete = (key: string, value: string) => {
      if (value) next.set(key, value);
      else next.delete(key);
    };
    setOrDelete("q", qInput.value.trim());
    setOrDelete("hub", hubSelect.value);
    setOrDelete("reader", readerSelect.value);
    setOrDelete("company", companySelect.value);
    const qs = next.toString();
    const nextUrl = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, "", nextUrl);
    }
  };

  const setVisible = (element: HTMLElement, visible: boolean, immediate: boolean) => {
    if (
      visible &&
      !element.hidden &&
      (element.dataset.filterState === "visible" || element.dataset.filterState === "entering")
    ) {
      element.removeAttribute("aria-hidden");
      return;
    }
    if (
      !visible &&
      ((element.hidden && element.dataset.filterState === "hidden") ||
        element.dataset.filterState === "leaving")
    ) {
      return;
    }

    const existingEnterTimer = enterTimers.get(element);
    if (existingEnterTimer !== undefined) {
      window.clearTimeout(existingEnterTimer);
      enterTimers.delete(element);
    }
    const existingHideTimer = hideTimers.get(element);
    if (existingHideTimer !== undefined) {
      window.clearTimeout(existingHideTimer);
      hideTimers.delete(element);
    }

    if (visible) {
      element.hidden = false;
      element.removeAttribute("aria-hidden");
      if (immediate || reduceMotion) {
        element.dataset.filterState = "visible";
        return;
      }
      element.dataset.filterState = "entering";
      const timer = window.setTimeout(() => {
        enterTimers.delete(element);
        if (!element.hidden && element.dataset.filterState === "entering") {
          element.dataset.filterState = "visible";
        }
      }, 20);
      enterTimers.set(element, timer);
      return;
    }

    element.setAttribute("aria-hidden", "true");
    if (immediate || reduceMotion) {
      element.dataset.filterState = "hidden";
      element.hidden = true;
      return;
    }
    element.dataset.filterState = "leaving";
    const timer = window.setTimeout(() => {
      hideTimers.delete(element);
      if (element.dataset.filterState !== "leaving") return;
      element.hidden = true;
      element.dataset.filterState = "hidden";
    }, 180);
    hideTimers.set(element, timer);
  };

  const apply = (immediate = false) => {
    const q = qInput.value.trim().toLowerCase();
    const hub = hubSelect.value;
    const reader = readerSelect.value;
    const company = companySelect.value;
    const active = Boolean(q || hub || reader || company);
    const results = [...root.querySelectorAll<HTMLElement>("[data-blog-result]")];
    let count = 0;

    results.forEach((element) => {
      const matches =
        (!q || (element.getAttribute("data-search") || "").includes(q)) &&
        (!hub || element.getAttribute("data-hub") === hub) &&
        hasToken(element.getAttribute("data-readers"), reader) &&
        hasToken(element.getAttribute("data-companies"), company);
      setVisible(element, matches, immediate);
      if (matches) count += 1;
    });

    if (feedback) feedback.hidden = !active;
    if (countEl) countEl.textContent = `${count} match${count === 1 ? "" : "es"}`;
    if (availableEl) {
      availableEl.textContent = `${count} available essay${count === 1 ? "" : "s"}`;
    }
    if (emptyEl) emptyEl.hidden = count !== 0;
    updateUrl();
  };

  const armEssayTransition = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const link = (event.target as Element | null)?.closest<HTMLElement>(
      "[data-essay-transition-link]",
    );
    if (
      !link ||
      reduceMotion ||
      !("CSS" in window) ||
      !CSS.supports("view-transition-name: essay-title")
    ) {
      return;
    }
    const title = link.querySelector<HTMLElement>("[data-essay-transition-title]");
    const slug = link.dataset.essayTransitionLink;
    if (!title || !slug) return;
    title.style.viewTransitionName = "essay-title";
    try {
      sessionStorage.setItem(
        "rz-essay-transition",
        JSON.stringify({ slug, timestamp: Date.now() }),
      );
    } catch (_) {
      /* Storage can be unavailable in private browsing; the navigation still works. */
    }
    const timer = window.setTimeout(() => {
      transitionTimers.delete(timer);
      title.style.removeProperty("view-transition-name");
    }, 1600);
    transitionTimers.add(timer);
  };

  listen(qInput, "input", () => apply());
  listen(hubSelect, "change", () => apply());
  listen(readerSelect, "change", () => apply());
  listen(companySelect, "change", () => apply());
  if (clearEl) {
    listen(clearEl, "click", (event) => {
      event.preventDefault();
      qInput.value = "";
      hubSelect.value = "";
      readerSelect.value = "";
      companySelect.value = "";
      apply();
      qInput.focus();
    });
  }
  listen(root, "click", armEssayTransition);

  const cleanup = () => {
    controller?.abort();
    manualCleanups.forEach((dispose) => dispose());
    enterTimers.forEach((timer, element) => {
      window.clearTimeout(timer);
      if (!element.hidden && element.dataset.filterState === "entering") {
        element.dataset.filterState = "visible";
      }
    });
    hideTimers.forEach((timer, element) => {
      window.clearTimeout(timer);
      if (element.dataset.filterState === "leaving") {
        element.dataset.filterState = "hidden";
        element.hidden = true;
      }
    });
    transitionTimers.forEach((timer) => window.clearTimeout(timer));
    enterTimers.clear();
    hideTimers.clear();
    transitionTimers.clear();
    delete ownedRoot.__rzBlogFilterCleanup;
  };
  ownedRoot.__rzBlogFilterCleanup = cleanup;
  apply(true);
  return cleanup;
}

const BLOG_FILTER_SCRIPT = `(${blogFilterRuntime.toString()})();`;

function postArtwork(slug: string) {
  return `/og/blog/${slug}.png`;
}

function compactPostTitle(post: (typeof posts)[number]) {
  return post.metaTitle?.replace(/\s*\|\s*Rizwan Zafar$/, "") ?? post.title;
}

function BlogIndex() {
  const { q, hub, reader, company } = Route.useSearch();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const list = posts.filter((p) => p.slug !== featured.slug);
  const supportingStories = list.filter((p) => p.featured).slice(0, 2);
  const supportingSlugs = new Set(supportingStories.map((p) => p.slug));
  const archive = list.filter((p) => !supportingSlugs.has(p.slug));

  useEffect(() => blogFilterRuntime(), []);

  return (
    <div className="blog-page blog-index-page" data-blog-filter-root>
      <header className="field-notes-masthead">
        <div className="field-notes-shell">
          <div className="field-notes-masthead-grid">
            <div className="field-notes-intro">
              <p className="field-notes-eyebrow">Rizwan Zafar / Payments journal</p>
              <h1 className="field-notes-title">
                Field <em>Notes</em>
              </h1>
              <span className="field-notes-accent-rule" aria-hidden />
              <p className="field-notes-deck">
                Ideas from inside payments, products and markets, written from the operator's seat.
              </p>
            </div>

            <div className="field-notes-tools">
              <div className="field-notes-tools-heading">
                <span>Explore the library</span>
                <span data-blog-available-count>{posts.length} available essays</span>
              </div>
              {/* The production artifact is static, so query-string filtering is
                  provided by the compact inline runtime. No-script readers keep
                  the complete archive and topic-hub navigation below; the
                  noscript notice is candid about that delivery constraint. */}
              <noscript>
                <div className="field-notes-noscript" role="note">
                  <span>Search and lenses need JavaScript on this static edition.</span>
                  <span>
                    You can still <a href="#field-notes-archive-title">browse every essay</a> or
                    jump to the <a href="#field-notes-hubs-title">topic hubs</a>.
                  </span>
                </div>
              </noscript>
              <form
                role="search"
                action="/blog/"
                method="get"
                className="field-notes-filter"
                data-blog-filter-form
                hidden
              >
                <div className="field-notes-search">
                  <label htmlFor="blog-q">Search essays</label>
                  <div className="field-notes-search-line">
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <circle cx="11" cy="11" r="6.25" />
                      <path d="m16 16 4 4" />
                    </svg>
                    <input
                      id="blog-q"
                      name="q"
                      type="search"
                      defaultValue={q}
                      placeholder="Search essays"
                      className="blog-filter-input"
                    />
                  </div>
                </div>
                <Select
                  id="blog-hub"
                  label="Topic"
                  defaultValue={hub}
                  options={[
                    ["", "All topics"],
                    ...hubs.map((h): [string, string] => [h.slug, h.shortTitle]),
                  ]}
                />
                <Select
                  id="blog-reader"
                  label="Reader lens"
                  defaultValue={reader}
                  options={[["", "Any reader"], ...READERS.map((r): [string, string] => [r, r])]}
                />
                <Select
                  id="blog-company"
                  label="Company lens"
                  defaultValue={company}
                  options={[["", "Any company"], ...COMPANIES.map((c): [string, string] => [c, c])]}
                />
                <button type="submit" className="sr-only">
                  Apply filters
                </button>
              </form>
              <div data-blog-filter-feedback hidden className="field-notes-filter-status">
                <span data-blog-filter-status role="status" aria-live="polite">
                  <span data-blog-match-count>{posts.length} matches</span>
                </span>
                <button type="button" data-blog-clear>
                  Clear filters
                </button>
              </div>
              <div data-blog-empty hidden className="field-notes-empty">
                <span>No essays match this combination.</span>
                <span>Try clearing one lens or searching a broader phrase.</span>
              </div>
            </div>
          </div>

          <nav className="field-notes-topic-rail" aria-label="Featured topic hubs">
            <span className="field-notes-topic-label">Topic hubs</span>
            <ul>
              {hubs.slice(0, 8).map((h) => (
                <li key={h.slug}>
                  <Link to="/topics/$hub" params={{ hub: h.slug }}>
                    {h.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="field-notes-spotlight" aria-label="Selected essays">
        <div className="field-notes-shell field-notes-spotlight-inner">
          {featured && (
            <article
              className="blog-filter-result field-notes-lead"
              {...blogFilterAttrs(featured, true)}
              data-blog-featured-shell
              data-filter-state="visible"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                data-essay-transition-link={featured.slug}
                className="field-notes-lead-link"
              >
                <figure className="field-notes-media field-notes-lead-media">
                  <img
                    src={postArtwork(featured.slug)}
                    alt=""
                    width="1200"
                    height="630"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <span className="field-notes-media-wash" aria-hidden />
                </figure>
                <div className="field-notes-lead-copy">
                  <div className="field-notes-story-kicker">
                    <span>Featured essay</span>
                    <span>{featured.category}</span>
                  </div>
                  <h2 data-essay-transition-title>{featured.title}</h2>
                  <p>{featured.thesis ?? featured.description}</p>
                  <StoryMeta date={featured.date} readingTime={featured.readingTime} />
                  <span className="field-notes-read-link">
                    Read the essay <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
            </article>
          )}

          <div className="field-notes-supporting">
            {supportingStories.map((p, index) => (
              <article
                key={p.slug}
                className="blog-filter-result field-notes-support"
                {...blogFilterAttrs(p)}
                data-filter-state="visible"
                data-story-order={index === 1 ? "reverse" : "default"}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  data-essay-transition-link={p.slug}
                  className="field-notes-support-link"
                >
                  <div className="field-notes-support-copy">
                    <div className="field-notes-story-kicker">
                      <span>{index === 0 ? "Product perspective" : "Operator notes"}</span>
                    </div>
                    <h3 data-essay-transition-title>{compactPostTitle(p)}</h3>
                    <p>{p.thesis ?? p.description}</p>
                    <StoryMeta date={p.date} readingTime={p.readingTime} />
                  </div>
                  <figure className="field-notes-media field-notes-support-media">
                    <img
                      src={postArtwork(p.slug)}
                      alt=""
                      width="1200"
                      height="630"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="field-notes-media-wash" aria-hidden />
                  </figure>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="field-notes-archive" aria-labelledby="field-notes-archive-title">
        <div className="field-notes-shell">
          <header className="field-notes-archive-heading">
            <div>
              <p className="field-notes-eyebrow">The working archive</p>
              <h2 id="field-notes-archive-title">Latest field notes</h2>
            </div>
            <p>Practical essays for leaders building and scaling payments.</p>
          </header>

          {archive.length > 0 && (
            <div className="field-notes-archive-list">
              {archive.map((p, index) => (
                <article
                  key={p.slug}
                  className="blog-filter-result blog-archive-entry"
                  {...blogFilterAttrs(p)}
                  {...(index < 6 ? { "data-rz-reveal": "" } : {})}
                  style={
                    index < 6 ? ({ "--rz-delay": `${index * 40}ms` } as CSSProperties) : undefined
                  }
                  data-filter-state="visible"
                  data-rhythm={index % 7 === 0 ? "expanded" : "standard"}
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    data-essay-transition-link={p.slug}
                    className="field-notes-archive-link"
                  >
                    <span className="field-notes-archive-number" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="field-notes-archive-copy">
                      <span className="field-notes-archive-category">{p.category}</span>
                      <h3 data-essay-transition-title className="blog-row-title">
                        {p.title}
                      </h3>
                      <p>{p.thesis ?? p.description}</p>
                    </div>
                    <span className="field-notes-archive-connector" aria-hidden />
                    <div className="field-notes-archive-meta">
                      <time dateTime={p.date}>{formatPostDate(p.date)}</time>
                      <span>{p.readingTime}</span>
                    </div>
                    <span className="blog-row-arrow field-notes-archive-arrow" aria-hidden>
                      ↗
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="field-notes-hubs" aria-labelledby="field-notes-hubs-title">
        <div className="field-notes-shell">
          <header>
            <p className="field-notes-eyebrow">Follow a thread</p>
            <h2 id="field-notes-hubs-title">Browse by topic hub</h2>
          </header>
          <nav aria-label="All topic hubs">
            <ul>
              {hubs.map((h, index) => (
                <li key={h.slug}>
                  <Link to="/topics/$hub" params={{ hub: h.slug }}>
                    <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{h.shortTitle}</strong>
                    <span aria-hidden>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: BLOG_FILTER_SCRIPT }} />
    </div>
  );
}

function StoryMeta({ date, readingTime }: { date: string; readingTime: string }) {
  return (
    <div className="field-notes-story-meta">
      <time dateTime={date}>{formatPostDate(date)}</time>
      <span aria-hidden />
      <span>{readingTime}</span>
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  defaultValue: string;
  options: [string, string][];
};

function Select({ id, label, defaultValue, options }: SelectProps) {
  return (
    <div className="field-notes-select">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id.replace("blog-", "")} defaultValue={defaultValue}>
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
