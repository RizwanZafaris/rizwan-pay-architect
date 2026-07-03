/**
 * Site analytics — sends named, typed events straight to GA4 via gtag()
 * (single pipeline; the GTM container was retired 2026-06-12 because its
 * UI-built tags duplicated these sends and double-counted everything).
 *
 * Event catalogue and GA4 setup live in `docs/ANALYTICS_SETUP.md`.
 *
 * Rules:
 *   - All events are snake_case, mirroring GA4's recommended convention.
 *   - Params are flat (no nested objects) so GA4 custom dimensions can
 *     read them with a single key path.
 *   - We never push PII (email, name, etc.) from the contact form even
 *     though the user typed it — only the outcome status.
 */

type Primitive = string | number | boolean | null;
type EventParams = Record<string, Primitive>;

type DataLayerEntry = { event: string } & EventParams;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageAnalyticsContext(pathname = "/"): EventParams {
  const path = pathname || "/";
  if (path === "/") {
    return { page_type: "home", funnel_stage: "discovery", audience: "recruiter_hiring_manager" };
  }
  if (path.startsWith("/resume/")) {
    return {
      page_type: "resume",
      funnel_stage: "validation",
      audience: "recruiter_hiring_manager",
    };
  }
  if (path.startsWith("/for/")) {
    return {
      page_type: "recruiter",
      funnel_stage: "validation",
      audience: "recruiter_hiring_manager",
    };
  }
  if (path.startsWith("/contact/")) {
    return {
      page_type: "contact",
      funnel_stage: "conversion",
      audience: "recruiter_hiring_manager",
    };
  }
  if (path.startsWith("/product-work/") && path !== "/product-work/") {
    return { page_type: "case_study", funnel_stage: "proof", audience: "product_leadership" };
  }
  if (path.startsWith("/product-work/")) {
    return { page_type: "case_studies", funnel_stage: "proof", audience: "product_leadership" };
  }
  if (path.startsWith("/blog/") && path !== "/blog/") {
    return {
      page_type: "blog_post",
      funnel_stage: "authority",
      audience: "payments_product_leaders",
    };
  }
  if (path.startsWith("/blog/") || path.startsWith("/topics/")) {
    return {
      page_type: "authority_hub",
      funnel_stage: "authority",
      audience: "payments_product_leaders",
    };
  }
  return {
    page_type: "supporting_page",
    funnel_stage: "discovery",
    audience: "recruiter_hiring_manager",
  };
}

function sanitizeAnalyticsParams(params: EventParams): EventParams {
  const clean: EventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== "string") {
      clean[key] = value;
      continue;
    }
    if (key.includes("email")) continue;
    if (value.startsWith("mailto:")) {
      clean[key] = "mailto";
      continue;
    }
    clean[key] = value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted]");
  }
  return clean;
}

/** Send an event to GA4 via gtag. No-op on the server / when gtag is absent. */
export function trackEvent(eventName: SiteEvent["event"], params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const payload = {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
    ...pageAnalyticsContext(window.location.pathname),
    ...sanitizeAnalyticsParams(params),
  };
  window.gtag?.("event", eventName, payload);
}

// ─── Event catalogue (typed) ──────────────────────────────────────────────
// Each entry below is one event the site can fire. Keeps the GTM trigger
// surface enumerable from a single place.

export type SiteEvent =
  // SPA navigation. Fired by RouteAnalyticsTracker in __root.tsx on every
  // client route change (hydrated contexts only). Initial loads are captured
  // by gtag.js's configured page_view.
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
        | "book_intro_call"
        | "ask_availability"
        | "linkedin_contact"
        | "whatsapp_message"
        | "full_resume"
        | "send_message"
        | "open_email_app"
        | "copy_email"
        | "request_preview"
        | "newsletter_subscribe_request"
        | "rss_feed";
      cta_location:
        | "hero"
        | "header"
        | "campaign_header"
        | "mobile_menu"
        | "home_body"
        | "for_body"
        | "for_top"
        | "for_lens"
        | "case_study_footer"
        | "blog_post_footer"
        | "contact_page"
        | "products_card"
        | "footer"
        | "resume_page"
        | "resume_contact";
      cta_destination?: string;
    }

  // External link clicks (LinkedIn, partner sites, mailto).
  | {
      event: "outbound_click";
      outbound_domain: string;
      outbound_url: string;
      outbound_location: string;
      link_type?: "email" | "linkedin" | "external";
    }
  | {
      event: "email_click";
      link_location: string;
    }
  | {
      event: "linkedin_click";
      link_location: string;
    }

  // Cal.com / scheduling clicks. This is the primary paid-search conversion.
  // NOTE: the CTA-placement param is named `placement`, NOT `source` —
  // `source`/`medium`/`campaign` are GA4-reserved traffic-attribution params;
  // sending them as event params overrides the session's traffic source with
  // no medium, which files the session under the "Unassigned" channel (and
  // blanks the landing page when such an event starts a session).
  | {
      event: "schedule_meeting";
      placement:
        | "hero"
        | "header"
        | "mobile_menu"
        | "resume_page"
        | "resume_contact"
        | "contact_page"
        | "for"
        | "case_study"
        | "footer";
      schedule_url?: string;
    }

  // Resume download (separate from cta_click because it's a conversion event).
  | {
      event: "resume_download";
      placement: "hero" | "header" | "mobile_menu" | "about" | "for" | "resume_page" | "case_study";
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
    }

  // Site search intent. Does not send PII; only the typed query/filter.
  | {
      event: "site_search";
      search_term: string;
      search_location: "home" | "blog";
      search_filter?: string;
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
    const isEmail = u.protocol === "mailto:";
    const isLinkedIn = u.hostname.includes("linkedin.com");
    trackEvent("outbound_click", {
      outbound_domain: u.hostname || u.protocol.replace(":", ""),
      outbound_url: isEmail ? "mailto" : url,
      outbound_location: location,
      link_type: isEmail ? "email" : isLinkedIn ? "linkedin" : "external",
    });
    if (isEmail) trackEvent("email_click", { link_location: location });
    if (isLinkedIn) trackEvent("linkedin_click", { link_location: location });
  } catch {
    const isLinkedIn = url.includes("linkedin.com");
    trackEvent("outbound_click", {
      outbound_domain: url.split(":")[0] || "unknown",
      outbound_url: url.startsWith("mailto:") ? "mailto" : url,
      outbound_location: location,
      link_type: url.startsWith("mailto:") ? "email" : isLinkedIn ? "linkedin" : "external",
    });
    if (isLinkedIn) trackEvent("linkedin_click", { link_location: location });
  }
};

export const scheduleMeeting = (
  placement: Extract<SiteEvent, { event: "schedule_meeting" }>["placement"],
  schedule_url?: string,
): void => trackEvent("schedule_meeting", { placement, ...(schedule_url ? { schedule_url } : {}) });

export const resumeDownload = (
  placement: Extract<SiteEvent, { event: "resume_download" }>["placement"],
): void => trackEvent("resume_download", { placement });

export const siteSearch = (
  search_term: string,
  search_location: Extract<SiteEvent, { event: "site_search" }>["search_location"],
  search_filter?: string,
): void => {
  const normalized = search_term.trim().slice(0, 120);
  if (!normalized && !search_filter) return;
  trackEvent("site_search", {
    search_term: normalized,
    search_location,
    ...(search_filter ? { search_filter: search_filter.slice(0, 120) } : {}),
  });
};
