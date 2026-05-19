import { profile } from "@/data/profile";
import { outboundClick } from "@/lib/analytics";

/**
 * Single source of truth for social-platform icons + handles, rendered in
 * two variants:
 *
 *   <SocialIconRow />    — compact icon-only row for the footer
 *   <SocialCardList />   — card-style list for the contact page
 *
 * The icons are inline SVG (no icon-font dep, no JS, no FOUC on the static
 * Hostinger deploy). currentColor on the strokes/fills so they inherit the
 * surrounding `text-ink-soft` / `text-ink` etc.
 *
 * To add a new platform: extend `profile.socials` in src/data/profile.ts —
 * UI surfaces pick it up automatically. Drop an additional case here for
 * the icon glyph.
 */

type Platform = (typeof profile.socials)[number]["platform"];

function Icon({ platform, className = "w-4 h-4" }: { platform: Platform; className?: string }) {
  switch (platform) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    default:
      return null;
  }
}

export function SocialIconRow({
  source = "footer",
  className = "",
}: {
  source?: string;
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {profile.socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer me"
            onClick={() => outboundClick(s.url, source)}
            aria-label={`${profile.name} on ${s.label}`}
            title={`${s.label} · ${s.handle}`}
            className="grid place-items-center h-9 w-9 rounded-full border border-rule text-ink-soft hover:text-ink hover:border-ink/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          >
            <Icon platform={s.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialCardList({ source = "contact_page" }: { source?: string }) {
  return (
    <ul className="space-y-3">
      {profile.socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer me"
            onClick={() => outboundClick(s.url, source)}
            className="flex items-center justify-between gap-3 border border-rule rounded-lg px-5 py-4 hover:border-ink focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-surface text-ink shrink-0">
                <Icon platform={s.platform} />
              </span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">{s.label}</div>
                <div className="font-display text-base text-ink truncate">{s.handle}</div>
              </div>
            </div>
            <span className="text-ink-soft group-hover:text-ink shrink-0">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
