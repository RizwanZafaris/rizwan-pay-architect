import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { ctaClick, outboundClick, resumeDownload } from "@/lib/analytics";
import { SocialIconRow } from "@/components/SocialIcons";

// Recruiter-first nav. 6 tabs ordered along the executive scan path:
// Home → proof → case studies → fit (recruiters) → resume → contact.
// /products, /media, /topics stayed off the top bar because they
// dilute the senior narrative when scanned in 5 seconds. They remain
// reachable: products from /about (and the Products section on the
// homepage); media/topics from the footer's secondary nav and from
// in-context links inside the blog.
const nav = [
  { to: "/product-work", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
  { to: "/for", label: "Recruiters" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { location } = useRouterState();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Esc + focus trap + inert main on open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    // Inert main + footer so underlying links aren't tabbable while menu is open
    const inertTargets = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    inertTargets.forEach((n) => n.setAttribute("inert", ""));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // Focus the close button first
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      inertTargets.forEach((n) => n.removeAttribute("inert"));
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4">
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
                Payments · Product
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
                className="px-3 py-2.5 rounded-full hover:text-ink hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                activeProps={{ className: "text-ink font-medium bg-ink/5" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={profile.resumeHref}
              download
              aria-label="Download PDF résumé"
              data-analytics-event="cta_click"
              data-analytics-cta-id="download_resume"
              data-analytics-cta-location="header"
              data-analytics-cta-destination={profile.resumeHref}
              data-analytics-source="header"
              onClick={() => {
                ctaClick("download_resume", "header", profile.resumeHref);
                resumeDownload("header");
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-background px-3.5 sm:px-4 py-2.5 text-[12px] font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
            </a>
            {/* Mobile/tablet menu trigger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
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
                {open ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div data-mobile-menu-root>
          {/* Backdrop, not focusable; click closes */}
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden"
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-3 top-20 z-50 lg:hidden rounded-2xl border border-ink/10 bg-background shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                Menu
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-ink/5 text-ink"
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
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-base text-ink-soft hover:text-ink hover:bg-ink/5 transition-colors"
                  activeProps={{ className: "text-ink font-medium bg-ink/5" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={profile.resumeHref}
                download
                onClick={() => setOpen(false)}
                className="mt-2 px-3 py-3 rounded-lg text-base text-ink hover:bg-ink/5 transition-colors"
              >
                Resume, Download PDF
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
      )}
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
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-60 animate-ping"></span>
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
              <Link to="/products" className="hover:text-ink text-ink-soft">
                Products
              </Link>
            </li>
            <li>
              <Link to="/product-work" className="hover:text-ink text-ink-soft">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-ink text-ink-soft">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/topics" className="hover:text-ink text-ink-soft">
                Topics
              </Link>
            </li>
            <li>
              <Link to="/media" className="hover:text-ink text-ink-soft">
                Media
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-ink text-ink-soft">
                Sitemap
              </Link>
            </li>
            <li>
              <Link to="/for" className="hover:text-ink text-ink-soft">
                For Recruiters
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech mb-3">
            Contact
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/resume" className="hover:text-ink text-ink-soft">
                Resume
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ink text-ink-soft">
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
            © {new Date().getFullYear()} {profile.name} · Dubai, UAE
          </span>
          <span>Built for senior Product &amp; Program roles in fintech</span>
        </div>
      </div>
    </footer>
  );
}
