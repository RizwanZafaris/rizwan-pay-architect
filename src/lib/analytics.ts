/**
 * Site analytics — pushes named, typed events to window.dataLayer so GTM
 * triggers can fire on them.
 *
 * Event catalogue and corresponding GTM setup live in `docs/ANALYTICS_SETUP.md`.
 *
 * Rules:
 *   - All events are snake_case, mirroring GA4's recommended convention.
 *   - Params are flat (no nested objects) so GTM Data Layer Variables
 *     can read them with a single key path.
 *   - We never push PII (email, name, etc.) from the contact form even
 *     though the user typed it — only the outcome status.
 */

type Primitive = string | number | boolean | null;
type EventParams = Record<string, Primitive>;

type DataLayerEntry = { event: string } & EventParams;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

/** Safely push an event to the GTM dataLayer. No-op on the server / when GTM is absent. */
export function trackEvent(eventName: SiteEvent["event"], params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  // GTM's own snippet initialises dataLayer, but guard anyway.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

// ─── Event catalogue (typed) ──────────────────────────────────────────────
// Each entry below is one event the site can fire. Keeps the GTM trigger
// surface enumerable from a single place.

export type SiteEvent =
  // SPA navigation. Fired by GtmRouteTracker in __root.tsx on every client
  // route change. Initial server-rendered load is captured by GTM's own
  // gtm.js / gtm.dom / gtm.load events.
  | {
      event: "spa_pageview";
      page_path: string;
      page_location: string;
      page_title: string;
    }

  // CTA button / link clicks. cta_id is stable across redesigns; cta_location
  // tells you which surface the user converted from.
  | {
      event: "cta_click";
      cta_id:
        | "see_case_studies"
        | "download_resume"
        | "email_me"
        | "discuss_a_role"
        | "full_resume"
        | "send_message"
        | "open_email_app"
        | "copy_email"
        | "request_preview";
      cta_location:
        | "hero"
        | "header"
        | "for_top"
        | "for_lens"
        | "case_study_footer"
        | "blog_post_footer"
        | "contact_page"
        | "products_card"
        | "footer";
      cta_destination?: string;
    }

  // External link clicks (LinkedIn, partner sites, mailto).
  | {
      event: "outbound_click";
      outbound_domain: string;
      outbound_url: string;
      outbound_location: string;
    }

  // Resume download (separate from cta_click because it's a conversion event).
  | {
      event: "resume_download";
      source: "hero" | "header" | "about" | "for" | "resume_page" | "case_study";
    }

  // Blog post viewed (fires on mount of /blog/<slug>).
  | {
      event: "blog_view";
      blog_slug: string;
      blog_category: string;
      blog_reading_time: string;
    }

  // Case study viewed (fires on mount of /product-work/<slug>).
  | {
      event: "case_study_view";
      case_study_slug: string;
      case_study_category: string;
    }

  // Contact form lifecycle.
  | {
      event: "contact_form_start";
    }
  | {
      event: "contact_form_submit";
      submit_method: "server" | "mailto";
      submit_status: "sent" | "error";
      submit_error?: string;
    };

// ─── Convenience wrappers ─────────────────────────────────────────────────

export const ctaClick = (
  cta_id: Extract<SiteEvent, { event: "cta_click" }>["cta_id"],
  cta_location: Extract<SiteEvent, { event: "cta_click" }>["cta_location"],
  cta_destination?: string,
): void =>
  trackEvent("cta_click", {
    cta_id,
    cta_location,
    ...(cta_destination ? { cta_destination } : {}),
  });

export const outboundClick = (url: string, location: string): void => {
  try {
    const u = new URL(url);
    trackEvent("outbound_click", {
      outbound_domain: u.hostname || u.protocol.replace(":", ""),
      outbound_url: url,
      outbound_location: location,
    });
  } catch {
    trackEvent("outbound_click", {
      outbound_domain: url.split(":")[0] || "unknown",
      outbound_url: url,
      outbound_location: location,
    });
  }
};

export const resumeDownload = (
  source: Extract<SiteEvent, { event: "resume_download" }>["source"],
): void => trackEvent("resume_download", { source });
