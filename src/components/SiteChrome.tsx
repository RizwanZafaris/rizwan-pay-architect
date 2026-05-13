import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/product-work", label: "Product Work" },
  { to: "/blog", label: "Blog" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="h-8 w-8 rounded-md bg-brand text-brand-foreground grid place-items-center font-display text-sm">
            RZ
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-[15px] text-ink">{profile.name}</span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Payments Product
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-soft">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-ink transition-colors"
              activeProps={{ className: "text-ink font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={profile.resumeHref}
          download
          className="hidden md:inline-flex items-center gap-2 rounded-md bg-ink text-background px-3.5 py-2 text-xs font-medium hover:bg-brand transition-colors"
        >
          Download Resume
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="font-display text-lg text-ink">{profile.name}</div>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Payments product executive. Dubai, UAE.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft mb-3">Site</div>
          <ul className="space-y-2">
            <li><Link to="/product-work" className="hover:text-ink text-ink-soft">Product Work</Link></li>
            <li><Link to="/blog" className="hover:text-ink text-ink-soft">Blog</Link></li>
            <li><Link to="/resume" className="hover:text-ink text-ink-soft">Resume</Link></li>
            <li><Link to="/about" className="hover:text-ink text-ink-soft">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft mb-3">Contact</div>
          <ul className="space-y-2">
            <li><a href={`mailto:${profile.email}`} className="hover:text-ink text-ink-soft">{profile.email}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink text-ink-soft">LinkedIn</a></li>
            <li><a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-ink text-ink-soft">Twitter / X</a></li>
            <li><a href={profile.personalSite} target="_blank" rel="noreferrer" className="hover:text-ink text-ink-soft">rizwan-zafar.com</a></li>
            <li><Link to="/contact" className="hover:text-ink text-ink-soft">Contact form</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-ink-soft mb-3">Resume</div>
          <a
            href={profile.resumeHref}
            download
            className="inline-flex items-center gap-2 rounded-md border border-ink/20 px-3 py-2 text-xs font-medium hover:bg-ink hover:text-background transition-colors"
          >
            Download PDF
          </a>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-ink-soft flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built for senior payments product roles.</span>
        </div>
      </div>
    </footer>
  );
}
