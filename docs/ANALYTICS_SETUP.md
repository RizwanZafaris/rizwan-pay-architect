# Analytics setup — direct gtag (single pipeline)

This is the canonical analytics reference for rzifi.com. It documents the
events emitted by the site, the GA4 follow-up required outside the repository,
and the release checks that protect the measurement contract.

## Architecture

The site uses **direct `gtag` as its only Google analytics pipeline**:

- GA4: `G-F1NK5FJYJY`, configurable with `VITE_GA_MEASUREMENT_ID`.
- Google Ads: `AW-790961325`, configurable with `VITE_GOOGLE_ADS_ID`.
- LinkedIn Insight: loaded directly from the IDs in `src/lib/seo.ts`.
- React/hydrated contexts call the typed helpers in `src/lib/analytics.ts`.
- The static Hostinger export uses the vanilla bridge in
  `src/routes/__root.tsx` and the Cal embed script in `src/lib/campaign.ts`.

Consent Mode defaults Google storage to denied before `gtag.js` loads. The
cookie-consent banner grants or denies the analytics and marketing categories;
LinkedIn loads only after marketing consent, and PostHog loads only after
analytics consent.

The URL `https://www.googletagmanager.com/gtag/js?...` loads Google's
**gtag.js library**. Its hostname does not mean a Google Tag Manager container
is active.

## GTM retired — 2026-06-12

Container `GTM-TM5BP98G` is not loaded. Its UI-built GA4, Ads, and LinkedIn
tags duplicated the direct tags and contaminated the historical baseline with
double-counted events.

Guardrails:

1. Do not add a GTM runtime ID, loader, or noscript iframe while direct tags
   remain.
2. Publishing the retired container has no effect because the site does not
   load it.
3. If GTM is deliberately restored later, remove every overlapping direct tag
   first and treat GTM as the only pipeline. Never run both.

`gtag()` writes commands into `window.dataLayer`; seeing those commands is
normal and is not evidence that GTM is running.

## Event contract

The typed catalogue lives in
[`src/lib/analytics.ts`](../src/lib/analytics.ts). The production static bridge
emits equivalent names directly through `gtag("event", ...)`.

Every custom event also receives `page_path`, `page_location`, `page_title`,
`page_type`, `funnel_stage`, and `audience` where the sender supports that
shared context.

| Event                 | Trigger                                     | Key parameters                                                      | Reporting use                           |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------- |
| `page_view`           | Initial page load and hydrated route config | GA4 page fields                                                     | Traffic baseline                        |
| `cta_click`           | Tracked CTA                                 | `cta_id`, `cta_location`, `cta_destination`                         | CTA effectiveness                       |
| `outbound_click`      | External, mailto, or LinkedIn link          | `outbound_domain`, `outbound_url`, `outbound_location`, `link_type` | Exit intent                             |
| `email_click`         | Email link                                  | `link_location`                                                     | Contact intent                          |
| `linkedin_click`      | LinkedIn link                               | `link_location`                                                     | Profile-validation intent               |
| `schedule_meeting`    | Booking CTA or Cal link click               | `placement`, `schedule_url`                                         | Booking intent; not a booking           |
| `resume_download`     | Resume PDF click                            | `placement`                                                         | Recruiter intent                        |
| `newsletter_signup`   | Newsletter form submit                      | `placement`                                                         | Owned-audience intent                   |
| `blog_view`           | Blog detail load                            | `blog_slug`, `blog_category`, `blog_reading_time`                   | Content performance                     |
| `case_study_view`     | Case-study detail load                      | `case_study_slug`, `case_study_category`                            | Proof-stage engagement                  |
| `contact_form_start`  | First focus in contact form                 | none                                                                | Contact funnel start                    |
| `contact_form_submit` | Contact submission outcome                  | `submit_method`, `submit_status`, `submit_error`                    | Contact funnel outcome                  |
| `site_search`         | Site search submit                          | `search_term`, `search_location`, `search_filter`                   | Content demand                          |

### Reserved GA4 attribution fields

Do **not** send custom event parameters named `source`, `medium`, or `campaign`
for UI placement. Those names belong to GA4 acquisition reporting; values such
as `header` or `resume_page` can pollute source/medium and channel reports.

The established UI placement parameter is `placement`. Both analytics senders
contain a compatibility guard that remaps stale custom `source` metadata to
`placement` and drops raw custom `medium`/`campaign` metadata. Campaign
attribution remains in the real `utm_source`, `utm_medium`, `utm_campaign`,
click-ID, and referrer fields. The Cal link/embed forwarders do not change
those fields.

## Cal booking funnel

The inline booking script emits stable stages rather than exposing raw Cal
action names as the reporting contract:

| Stage             | Event                  | Signal                                                          |
| ----------------- | ---------------------- | --------------------------------------------------------------- |
| Booking intent    | `schedule_meeting`     | Site click bridge                                               |
| Calendar seen     | `cal_embed_viewed`     | Booking section at least 15% visible                            |
| Calendar usable   | `cal_embed_ready`      | `bookerReady`, `linkReady`, or first supported public Cal event |
| Booker entered    | `booking_flow_started` | `bookerViewed` or `navigatedToBooker`                           |
| Booking created   | `booking_submitted`    | `bookingSuccessfulV2` or legacy success fallback                |
| Technical failure | `cal_embed_failed`     | `linkFailed` code or embed boot exception                       |

`bookingSuccessfulV2` proves that Cal created a booking. It does not prove the
booking was later accepted or confirmed, even if its browser payload happens to
contain a status-like field. The legacy success fallback is recorded with
`booking_status=unknown` rather than promoted to a stronger state.

The browser emits neither `booking_confirmed` nor `book_call_confirmed`.
`booking_confirmed` is reserved for a future trusted Cal webhook/server path
that can prove that lifecycle state and deduplicate it against booking creation.
`book_call_confirmed` is historical only and must not remain a key event.

Cal's documented embed API does not expose reliable date-selected,
time-selected, or form-started events. The iframe is cross-origin, so the site
must not infer those stages from undocumented internal messages.

No booking identifiers, names, email addresses, meeting titles, URLs, or
timestamps are sent to GA4. Booking events contain only `placement`, a
normalized `booking_status`, and `cal_event_version`. Technical failures send
only a bounded Cal error code.

## Direct Google Ads and LinkedIn measurement

- Google Ads base tag: `AW-790961325`, configurable with
  `VITE_GOOGLE_ADS_ID`.
- Resume page-view conversion:
  `AW-790961325/6HJOCOTfn7ocEK25lPkC`, configurable with
  `VITE_GOOGLE_ADS_PAGE_VIEW_CONVERSION_LABEL`.
- The resume page-view conversion is a landing-page signal, not a qualified
  lead. Do not optimize it as if it were a booking.
- The LinkedIn booking conversion fires only with marketing consent and on
  `booking_submitted`: a browser-observed successful booking creation, not an
  acceptance/confirmation signal.

## GA4 administration (external follow-up)

Repository changes do not update the GA4 property. After the new events have
been observed in DebugView/Realtime:

### Key events

1. `booking_submitted` — primary browser-observed booking-created conversion.
2. `contact_form_submit` filtered to `submit_status=sent` — primary or
   secondary depending on lead quality.
3. `schedule_meeting` — secondary intent event; do not report it as a booking.
4. `resume_download` — secondary recruiter-intent event.

Mark `booking_submitted` as the replacement key event and retire
`book_call_confirmed`; do not import both as primary Google Ads conversions.
If a future trusted webhook emits `booking_confirmed`, treat that as a separate
downstream lifecycle event and deduplicate conversion optimization deliberately.

### Event-scoped custom dimensions

| Dimension            | Event parameter       |
| -------------------- | --------------------- |
| CTA ID               | `cta_id`              |
| CTA location         | `cta_location`        |
| Placement            | `placement`           |
| Booking status       | `booking_status`      |
| Cal event version    | `cal_event_version`   |
| Embed failure reason | `failure_reason`      |
| Blog slug            | `blog_slug`           |
| Blog category        | `blog_category`       |
| Case-study slug      | `case_study_slug`     |
| Case-study category  | `case_study_category` |
| Outbound domain      | `outbound_domain`     |
| Outbound location    | `outbound_location`   |
| Submit status        | `submit_status`       |
| Search term          | `search_term`         |
| Search location      | `search_location`     |

Do not create or retain a custom `source` definition for CTA placement.
Historical rows cannot be repaired in place; use a clean post-release date as
the new attribution baseline.

## Verification

### Repository checks

```bash
bun run typecheck
bun run build:static
bun run seo:audit
```

The static audit fails if generated HTML contains a retired GTM container
loader, a legacy `data-analytics-source` attribute, or either forbidden
client-side booking-confirmation event.

### Browser and GA4 checks

1. Accept analytics cookies in the test browser.
2. Open DevTools → Network and filter for `collect?v=2` or `g/collect`.
3. Trigger a CTA and confirm placement is sent as `placement`; no custom
   `source=header`, `source=resume_page`, or similar value should be present.
4. On a page with the inline calendar, confirm one `cal_embed_viewed`, one
   `cal_embed_ready`, and at most one `booking_flow_started` per page load.
5. Complete a booking only in an approved test flow. Confirm one
   `booking_submitted` and confirm that no client-side `booking_confirmed` or
   `book_call_confirmed` event is emitted.
6. Check GA4 Realtime/DebugView. Standard reports may take up to a day.

After deployment, run:

```bash
EXPECTED_SOURCE_SHA=<deployed-main-sha> bun scripts/check-live.ts https://rzifi.com
```

The live check verifies the direct tags, absence of the retired GTM loader and
legacy CTA-source markup, site health, and exact deployment provenance.

## Adding an event

1. Add or update the variant in `src/lib/analytics.ts`.
2. Use `trackEvent()` in hydrated code, or add equivalent static-bridge
   behavior when the production export needs it.
3. Use flat, non-PII parameters. Never use reserved acquisition names for UI
   metadata.
4. Update this event contract.
5. Run typecheck, static build, and the static audit.
6. Register only required dimensions/key events after observing the deployed
   event in DebugView.

## Files involved

- [`src/lib/analytics.ts`](../src/lib/analytics.ts) — typed events, sanitizing,
  and direct gtag helper.
- [`src/routes/__root.tsx`](../src/routes/__root.tsx) — direct tag bootstrap,
  consent handling, and the static analytics bridge.
- [`src/lib/campaign.ts`](../src/lib/campaign.ts) — campaign forwarding and Cal
  embed funnel.
- [`src/lib/seo.ts`](../src/lib/seo.ts) — integration IDs and environment
  defaults.
- [`scripts/seo-audit.ts`](../scripts/seo-audit.ts) — generated-output gates.
- [`scripts/check-live.ts`](../scripts/check-live.ts) — deployed-site gates.
- [`.env.example`](../.env.example) — environment contract.
