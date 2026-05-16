import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";

const nav = [
  { to: "/product-work", label: "Work" },
  { to: "/blog", label: "Essays" },
  { to: "/resume", label: "Resume" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-ink/10 bg-background/70 backdrop-blur-xl px-3 py-2 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_30px_-12px_rgba(15,23,42,0.18)]">
          <Link to="/" className="flex items-center gap-2.5 pl-1.5 group">
            <span className="h-8 w-8 rounded-lg bg-ink text-background grid place-items-center font-display text-[13px] font-semibold tracking-tighter">
              RZ
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[13px] font-semibold tracking-tight text-ink">{profile.name}</span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                Payments · Product
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-[13px] text-ink-soft">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-1.5 rounded-full hover:text-ink hover:bg-ink/5 transition-colors"
                activeProps={{ className: "text-ink font-medium bg-ink/5" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href={profile.resumeHref}
            download
            aria-label="Download resume (PDF)"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-background px-4 py-2 text-[12px] font-medium hover:bg-brand transition-colors"
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>
            <span className="hidden sm:inline">Resume</span>
            <span className="sr-only sm:hidden">Download resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule mt-32 bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-ink text-background grid place-items-center font-display text-[13px] font-semibold">RZ</span>
            <div className="font-display text-lg text-ink">{profile.name}</div>
          </div>
          <p className="mt-3 text-ink-soft leading-relaxed max-w-md">
            Rizwan Zafar — Payments Product Executive. Building regulated payment
            infrastructure across MENA and South Asia.
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
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech mb-3">Site</div>
          <ul className="space-y-2">
            <li><Link to="/product-work" className="hover:text-ink text-ink-soft">Product Work</Link></li>
            <li><Link to="/blog" className="hover:text-ink text-ink-soft">Blog</Link></li>
            <li><Link to="/resume" className="hover:text-ink text-ink-soft">Resume</Link></li>
            <li><Link to="/about" className="hover:text-ink text-ink-soft">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech mb-3">Contact</div>
          <ul className="space-y-2">
            <li><a href={`mailto:${profile.email}`} className="hover:text-ink text-ink-soft">{profile.email}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink text-ink-soft">LinkedIn</a></li>
            <li><Link to="/contact" className="hover:text-ink text-ink-soft">Contact form</Link></li>
            <li><a href={profile.resumeHref} download className="hover:text-ink text-ink-soft">Download Resume</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-ink-soft flex flex-wrap justify-between gap-3 font-mono-tech">
          <span>© {new Date().getFullYear()} {profile.name} · Dubai, UAE</span>
          <span>Built for senior payments product roles</span>
        </div>
      </div>
    </footer>
  );
}
