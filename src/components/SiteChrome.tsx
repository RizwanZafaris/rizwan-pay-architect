import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { ctaClick, outboundClick, resumeDownload } from "@/lib/analytics";
import { SocialIconRow } from "@/components/SocialIcons";

// Brand-rebuild primary nav (strategy doc §3): a narrative scan path that
// leads with the work and the arc. Order is Work → Journey → Insights →
// Resume, with the persistent "Book a 15-min intro call" pill carrying the
// single CTA. (Audit sprint 2026-07, ISSUE-001: Resume promoted into the
// top bar in place of About; About stays reachable in the footer.)
// De-emphasised surfaces (For recruiters, Contact) live in the footer so
// they stay reachable without diluting the senior narrative when scanned
// in 5 seconds. /products, /media, /topics stay off the top bar too and
// remain reachable via the footer, homepage sections and blog links.
// Advisory (/consulting) stays out of the nav — PARKED until 2026-10-02.
// Speaking (/speaking) stays out of the nav too — PARKED until 2027-01-06
// (owner call 2026-07-06, same treatment as /consulting: noindex + out of
// nav/footer/sitemap, page stays reachable by direct link for now).
const nav = [
  { to: "/product-work", label: "Work" },
  { to: "/journey", label: "Journey" },
  { to: "/blog", label: "Insights" },
  { to: "/resume", label: "Resume" },
] as const;

// Nav label with a vertical slide-swap on hover/focus — the JS-less port of a
// 21st.dev "menu hover effects" pattern. The visible label (a) rolls up and
// out while a brand-coloured duplicate (b) rolls up into its place; both are
// pure CSS transforms (.nav-swap in styles.css), so it works on the static,
// hydration-stripped build. The duplicate is aria-hidden so the label is not
// announced twice, and reduced-motion drops the roll for a plain tint.
function NavSwap({ label }: { label: string }) {
  return (
    <span className="nav-swap">
      <span className="nav-swap-a">{label}</span>
      <span className="nav-swap-b" aria-hidden>
        {label}
      </span>
    </span>
  );
}

const currentYearScript = `(() => {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = year;
  });
})();`;

// The static production build ships no React runtime, so the menu is wired by
// this inline vanilla script (same pattern as the blog filter and year stamp):
// the panel prerenders with `hidden` and the script toggles it. Do not move
// this behavior into useState — component state never runs in production.
const MOBILE_MENU_SCRIPT = `(() => {
  if (window.__rzMenuBound) return; window.__rzMenuBound = true;
  const root = document.querySelector('[data-mobile-menu-root]');
  const trigger = document.querySelector('[data-mobile-menu-trigger]');
  if (!root || !trigger) return;
  const setOpen = (open) => {
    root.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    const target = open ? root.querySelector('[data-mobile-menu-close]') : trigger;
    if (target && target.focus) target.focus();
  };
  trigger.addEventListener('click', () => setOpen(root.hidden));
  root.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest('[data-mobile-menu-close],[data-mobile-menu-backdrop]')) { setOpen(false); return; }
    if (t.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (root.hidden) return;
    if (e.key === 'Escape') { setOpen(false); return; }
    // Focus trap: while the dialog is open, Tab cycles within the panel.
    if (e.key === 'Tab') {
      const items = root.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });
  // Resizing/rotating past the lg breakpoint hides trigger+panel via CSS;
  // close properly so body scroll-lock doesn't survive into desktop layout.
  const mq = window.matchMedia('(min-width: 1024px)');
  const onMq = () => { if (mq.matches && !root.hidden) setOpen(false); };
  if (mq.addEventListener) mq.addEventListener('change', onMq);
})();`;

export function SiteHeader() {
  // /contact and /resume carry their own inline booking embed — the header
  // CTA should land on the local #book instead of forcing a navigation
  // away at peak intent (also keeps per-placement funnel attribution clean).
  const headerPathname = useRouterState({ select: (s) => s.location.pathname });
  const hasLocalEmbed =
    headerPathname.startsWith("/contact") || headerPathname.startsWith("/resume");
  const bookingHref = hasLocalEmbed ? "#book" : "/contact/#book";
  return (
    <header className="site-header sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-ink/10 bg-background/92 backdrop-blur-xl pl-3 pr-2 py-2 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_30px_-12px_rgba(15,23,42,0.18)]">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <span className="h-8 w-8 shrink-0 rounded-lg bg-ink text-background grid place-items-center font-display text-[13px] font-semibold tracking-tighter">
              RZ
            </span>
            <span className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-[13px] font-semibold tracking-tight text-ink truncate">
                {profile.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                Product · Program · Payments
              </span>
            </span>
          </Link>

          {/* Desktop nav, lg+ only so tablet has room for hamburger */}
          <nav
            className="hidden lg:flex items-center gap-1 text-[13px] text-ink-soft"
            aria-label="Primary"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="nav-link px-3 py-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                activeProps={{ className: "text-ink font-medium bg-ink/5" }}
              >
                <NavSwap label={n.label} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={bookingHref}
              aria-label="Book a 15-min intro call"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="header"
              data-analytics-cta-destination={bookingHref}
              onClick={() => {
                ctaClick("book_intro_call", "header", bookingHref);
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-background px-3.5 sm:px-4 py-2.5 min-h-[44px] min-w-[44px] sm:min-w-0 text-[12px] font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Book a 15-min intro call</span>
            </a>
            {/* Mobile/tablet menu trigger — wired by MOBILE_MENU_SCRIPT */}
            <button
              type="button"
              data-mobile-menu-trigger
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-ink/5 transition-colors text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                aria-hidden
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay — prerendered hidden; MOBILE_MENU_SCRIPT toggles it */}
      <div data-mobile-menu-root hidden>
        {/* Backdrop, not focusable; click closes (handled by the script) */}
        <div
          aria-hidden
          data-mobile-menu-backdrop
          className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden"
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-3 top-20 z-50 lg:hidden max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-ink/10 bg-background shadow-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
              Menu
            </span>
            <button
              type="button"
              data-mobile-menu-close
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-ink/5 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
            >
              <svg
                aria-hidden
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col" aria-label="Mobile primary">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-3 rounded-lg text-base text-ink-soft hover:text-ink hover:bg-ink/5 transition-colors"
                activeProps={{ className: "text-ink font-medium bg-ink/5" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="/contact/#book"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="mobile_menu"
              data-analytics-cta-destination="/contact/#book"
              className="mt-2 px-3 py-3 rounded-lg text-base text-ink hover:bg-ink/5 transition-colors"
            >
              Book a 15-min intro call
            </a>
            <a
              href={profile.resumeHref}
              download
              onClick={() => resumeDownload("mobile_menu")}
              className="px-3 py-3 rounded-lg text-base text-ink-soft hover:text-ink hover:bg-ink/5 transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <Download aria-hidden="true" className="h-4 w-4" />
                Download PDF
              </span>
            </a>
          </nav>
          <div className="mt-3 pt-3 border-t border-rule flex items-center justify-between text-xs text-ink-soft font-mono-tech">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`} className="text-ink underline">
              Email
            </a>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: MOBILE_MENU_SCRIPT }} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule mt-32 bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-ink text-background grid place-items-center font-display text-[13px] font-semibold">
              RZ
            </span>
            <div className="font-display text-lg text-ink">{profile.name}</div>
          </div>
          <p className="mt-3 text-ink-soft leading-relaxed max-w-md">
            Rizwan Zafar, Product &amp; Program Executive. Scaling regulated fintech infrastructure
            in complex markets across MENA and South Asia.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-xs text-ink-soft">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-60 motion-safe:animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-emerald)]"></span>
            </span>
            <span className="font-mono-tech uppercase tracking-[0.18em]">Open to senior roles</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech mb-3">
            Site
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/product-work" className="hover:text-ink text-ink-soft inline-block py-1">
                Work
              </Link>
            </li>
            <li>
              <Link to="/journey" className="hover:text-ink text-ink-soft inline-block py-1">
                Journey
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-ink text-ink-soft inline-block py-1">
                Insights
              </Link>
            </li>
            <li>
              <Link to="/resume" className="hover:text-ink text-ink-soft inline-block py-1">
                Resume
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-ink text-ink-soft inline-block py-1">
                Products
              </Link>
            </li>
            <li>
              <Link to="/topics" className="hover:text-ink text-ink-soft inline-block py-1">
                Topics
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-ink text-ink-soft inline-block py-1">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech mb-3">
            Connect
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/for" className="hover:text-ink text-ink-soft inline-block py-1">
                For recruiters
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ink text-ink-soft inline-block py-1">
                Contact
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                data-analytics-event="outbound_click"
                data-analytics-outbound-domain="mailto"
                data-analytics-outbound-url={`mailto:${profile.email}`}
                data-analytics-outbound-location="footer"
                onClick={() => outboundClick(`mailto:${profile.email}`, "footer")}
                className="hover:text-ink text-ink-soft break-all"
              >
                {profile.email}
              </a>
            </li>
          </ul>
          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech mb-3">
              Follow
            </div>
            <SocialIconRow source="footer" />
          </div>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-ink-soft flex flex-wrap justify-between gap-3 font-mono-tech">
          <span>
            © <span data-current-year>{new Date().getFullYear()}</span> {profile.name} · Dubai, UAE
          </span>
          <span>Built for senior Product &amp; Program roles in fintech</span>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: currentYearScript }} />
    </footer>
  );
}

// ─── Campaign chrome (paid landing pages, e.g. /hire) ────────────────────────
// Paid clicks cost money; the full nav is a set of exit paths that never come
// back. Campaign pages get a single-action header (logo home link + book-call
// CTA, no nav, no menu) and a one-line footer. Wired in __root.tsx by pathname.

export function CampaignHeader() {
  // The inline calendarCampaignParamsScript (see __root.tsx) appends campaign
  // params + ref to this href at load time — the static build never hydrates.
  const calendarUrl = profile.calendarUrl;
  return (
    <header className="site-header sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-ink/10 bg-background/92 backdrop-blur-xl pl-3 pr-2 py-2 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_30px_-12px_rgba(15,23,42,0.18)]">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <span className="h-8 w-8 shrink-0 rounded-lg bg-ink text-background grid place-items-center font-display text-[13px] font-semibold tracking-tighter">
              RZ
            </span>
            <span className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-[13px] font-semibold tracking-tight text-ink truncate">
                {profile.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                Product · Program · Payments
              </span>
            </span>
          </Link>
          <a
            href="#book"
            aria-label="Book a 15-min intro call"
            data-analytics-event="cta_click"
            data-analytics-cta-id="book_intro_call"
            data-analytics-cta-location="campaign_header"
            data-analytics-cta-destination="#book"
            onClick={() => {
              ctaClick("book_intro_call", "campaign_header", "#book");
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-background px-3.5 sm:px-4 py-2.5 text-[12px] font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Book a 15-min intro call</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="border-t border-rule mt-16">
      <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-ink-soft flex flex-wrap justify-between gap-3 font-mono-tech">
        <span>
          © <span data-current-year>{new Date().getFullYear()}</span> {profile.name} · Dubai, UAE
        </span>
        {/* Ordering matches the wordmark subline ruling: Product · Program · Payments. */}
        <span>Product · Program &amp; Payments leadership</span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: currentYearScript }} />
    </footer>
  );
}
