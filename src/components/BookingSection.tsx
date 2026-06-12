import { calInlineEmbedScript } from "@/lib/campaign";
import { profile } from "@/data/profile";

// Shared inline cal.com booking section — the single on-site conversion
// surface, used by /hire, /contact and /resume. Renders the #book anchor,
// the embed slot and the page-scoped boot script (the static build never
// hydrates React, so the embed is wired entirely by the inline script).
//
// One instance per page maximum: the boot script and the analytics funnel
// key on the #book / #cal-booking-slot ids.
//
// The cal.com fallback link below the embed is decorated by the
// calendarCampaignParamsScript UTM rewriter in __root.tsx, so attribution
// survives even when the iframe is blocked.
//
// Loading UX: the slot renders a #cal-booking-skeleton shimmer so a visitor
// never stares at a blank box while cal.com's embed.js + iframe load. The
// skeleton is hidden by the boot script on cal_embed_ready, with a
// :has(iframe) CSS rule as no-JS-event fallback. Pages whose entire purpose
// is booking (/hire) pass eager so the embed boots at page load and is
// usually interactive before the visitor scrolls to it.
export function BookingSection({
  refName,
  fallbackLocation,
  calendarUrl,
  className = "mt-14",
  eager = false,
}: {
  /** Funnel placement id, e.g. "hire_inline_embed" */
  refName: string;
  /** data-analytics-cta-location for the under-embed fallback links */
  fallbackLocation: string;
  calendarUrl: string;
  className?: string;
  /** Boot the cal embed at page load instead of on scroll-near. */
  eager?: boolean;
}) {
  return (
    <section id="book" className={`${className} scroll-mt-24`}>
      <div className="text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
          Book directly &mdash; right here
        </div>
        <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-3">
          Pick a time that suits you
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          15 minutes &middot; no pitch &middot; times shown in your timezone.
        </p>
      </div>
      <div className="mt-6 rounded-lg border border-rule bg-card p-2 sm:p-4">
        <div id="cal-booking-slot" className="relative min-h-[560px] md:min-h-[620px] w-full">
          <div id="cal-booking-skeleton" aria-hidden="true" className="cal-skeleton">
            <div className="cal-skeleton-bar w-36" />
            <div className="cal-skeleton-grid">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="cal-skeleton-cell" />
              ))}
            </div>
            <p className="cal-skeleton-note">Loading live availability&hellip;</p>
          </div>
          <noscript>
            <p className="p-6 text-center text-sm text-ink-soft">
              The booking calendar needs JavaScript.{" "}
              <a className="underline text-ink" href={calendarUrl}>
                Book on cal.com instead
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft">
        Prefer not to wait for the calendar?{" "}
        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="cta_click"
          data-analytics-cta-id="whatsapp_message"
          data-analytics-cta-location={fallbackLocation}
          data-analytics-cta-destination={profile.whatsapp}
          className="underline hover:text-ink"
        >
          WhatsApp me
        </a>
        ,{" "}
        <a
          href={`mailto:${profile.email}?subject=Intro%20call`}
          data-analytics-event="cta_click"
          data-analytics-cta-id="email_me"
          data-analytics-cta-location={fallbackLocation}
          className="underline hover:text-ink"
        >
          email {profile.email}
        </a>{" "}
        or{" "}
        <a
          href={calendarUrl}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="cta_click"
          data-analytics-cta-id="book_intro_call"
          data-analytics-cta-location={fallbackLocation}
          data-analytics-cta-destination={calendarUrl}
          className="underline hover:text-ink"
        >
          open cal.com in a new tab
        </a>
        .
      </p>
      <script dangerouslySetInnerHTML={{ __html: calInlineEmbedScript(refName, { eager }) }} />
    </section>
  );
}
