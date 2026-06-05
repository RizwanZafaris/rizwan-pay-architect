# Analytics setup — GTM, GA4 and optional analytics tools

GTM container ID: **`GTM-TM5BP98G`** (configurable via `VITE_GTM_ID`).

This doc is the canonical reference for:

1. What events the site sends to `dataLayer`
2. How to wire each one to GA4, LinkedIn Insight, Meta Pixel, Google Ads or any other tag inside the GTM workspace
3. Which events to mark as conversions
4. How to verify the install end-to-end

---

Recommended architecture: **GTM is the hub**. Keep GA4, Google Ads, LinkedIn Insight, Meta Pixel and TikTok Pixel inside GTM so one workspace owns triggers, consent, preview/debug and publishing. Only direct-install tools that need their own lightweight script or meta verification, such as Microsoft Clarity, Plausible or Bing Webmaster Tools.

## 0 · Analytics stack

| Tool                          | Status in code           | Where to configure                   | Purpose                                                        |
| ----------------------------- | ------------------------ | ------------------------------------ | -------------------------------------------------------------- |
| Google Tag Manager            | Installed                | `VITE_GTM_ID` / GTM workspace        | Tag orchestration, triggers and debug                          |
| Google Analytics 4            | Ready via GTM events     | GTM + GA4 Measurement ID             | Traffic, funnels, conversions                                  |
| Google Search Console         | Verified in root meta    | Google Search Console                | Search indexing and query performance                          |
| Bing Webmaster Tools          | Optional meta ready      | `VITE_BING_SITE_VERIFICATION`        | Bing/Copilot search visibility                                 |
| Microsoft Clarity             | Optional script ready    | `VITE_MICROSOFT_CLARITY_ID`          | Heatmaps/session recordings                                    |
| Plausible                     | Optional script ready    | `VITE_PLAUSIBLE_DOMAIN`              | Privacy-friendly traffic analytics                             |
| LinkedIn Insight Tag          | Use GTM                  | GTM Custom HTML or LinkedIn template | Recruiter/audience retargeting                                 |
| Meta/TikTok/Google Ads pixels | Use GTM                  | GTM templates                        | Paid campaign tracking only if needed                          |
| AI bot analytics              | Requires server/CDN logs | Cloudflare/Hostinger logs            | GPTBot, ClaudeBot, PerplexityBot do not reliably run client JS |

## 1 · Event catalogue

All events live in [`src/lib/analytics.ts`](../src/lib/analytics.ts) as a typed union. Add a new one there first, then wire the matching trigger in GTM.

Production is a prerendered static export, so the site also includes a tiny vanilla analytics bridge in [`src/routes/__root.tsx`](../src/routes/__root.tsx). It listens for `data-analytics-*` attributes, PDF clicks, external clicks, blog views, case-study views and search submits, then pushes the same event names into `dataLayer`. This keeps analytics working even when React hydration is stripped from the Hostinger static build.

| Event name            | Fires when                                                                                                                              | Params (dataLayer keys)                                                                                | Recommended GA4 use                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `spa_pageview`        | Every client-side route change (TanStack Router navigation) — _not_ the initial server-rendered load (GTM's own `gtm.load` covers that) | `page_path`, `page_location`, `page_title`                                                             | GA4 page_view tag, override `page_location` and `page_title` from the dataLayer                |
| `cta_click`           | Any tracked CTA button or link                                                                                                          | `cta_id`, `cta_location`, `cta_destination` (optional)                                                 | Generic engagement event; useful for funnel analysis (where did they click before converting?) |
| `outbound_click`      | LinkedIn / mailto / external links                                                                                                      | `outbound_domain`, `outbound_url`, `outbound_location`                                                 | GA4 `click` event with `outbound: true` parameter                                              |
| `schedule_meeting`    | Cal.com / schedule-intent click from header, resume, contact or mobile menu                                                             | `source`, `schedule_url`                                                                               | **MARK AS CONVERSION** in GA4 + Google Ads — primary lead signal                               |
| `resume_download`     | PDF download from any surface                                                                                                           | `source` (hero / header / mobile_menu / about / for / resume_page / case_study)                        | **MARK AS CONVERSION** in GA4 — lead-quality signal                                            |
| `blog_view`           | Each `/blog/<slug>` mount                                                                                                               | `blog_slug`, `blog_category`, `blog_reading_time`                                                      | Content engagement; useful for finding which topics convert                                    |
| `case_study_view`     | Each `/product-work/<slug>` mount                                                                                                       | `case_study_slug`, `case_study_category`                                                               | Mid-funnel engagement                                                                          |
| `contact_form_start`  | First focus on any contact form field                                                                                                   | (none)                                                                                                 | Funnel step: form started                                                                      |
| `contact_form_submit` | Form submitted (any outcome)                                                                                                            | `submit_method` (`server` / `mailto`), `submit_status` (`sent` / `error`), `submit_error` (when error) | Operational funnel event; optional secondary conversion only                                   |
| `site_search`         | Homepage search submit or blog search intent                                                                                            | `search_term`, `search_location`, `search_filter`                                                      | Content demand signal; tells you what recruiters/readers look for                              |

### `cta_id` values (enumerated)

- `see_case_studies` · `download_resume` · `email_me` · `discuss_a_role`
- `book_intro_call` · `ask_availability` · `linkedin_contact` · `whatsapp_message`
- `full_resume` · `send_message` · `open_email_app` · `copy_email`
- `request_preview` (Felo / Job Hunt waitlist) · `newsletter_subscribe_request` · `rss_feed`

### `cta_location` values (enumerated)

- `hero` · `header` · `for_top` · `for_lens`
- `case_study_footer` · `blog_post_footer` · `contact_page`
- `products_card` · `footer` · `mobile_menu` · `resume_page` · `resume_contact`

---

## 2 · One-time GTM workspace setup

Open <https://tagmanager.google.com> → container **GTM-TM5BP98G** → Workspace.

### Step 1 — Create the Data Layer Variables

GTM doesn't auto-read dataLayer keys; you have to declare each one.

**Variables → New → Data Layer Variable** — create these variables (Variable Type: `Data Layer Variable`, Version: `Version 2`):

| Variable Name             | Data Layer Variable Name |
| ------------------------- | ------------------------ |
| DLV — page_path           | `page_path`              |
| DLV — page_location       | `page_location`          |
| DLV — page_title          | `page_title`             |
| DLV — cta_id              | `cta_id`                 |
| DLV — cta_location        | `cta_location`           |
| DLV — cta_destination     | `cta_destination`        |
| DLV — outbound_domain     | `outbound_domain`        |
| DLV — outbound_url        | `outbound_url`           |
| DLV — outbound_location   | `outbound_location`      |
| DLV — source              | `source`                 |
| DLV — schedule_url        | `schedule_url`           |
| DLV — link_location       | `link_location`          |
| DLV — blog_slug           | `blog_slug`              |
| DLV — blog_category       | `blog_category`          |
| DLV — case_study_slug     | `case_study_slug`        |
| DLV — case_study_category | `case_study_category`    |
| DLV — submit_status       | `submit_status`          |
| DLV — search_term         | `search_term`            |
| DLV — search_location     | `search_location`        |
| DLV — search_filter       | `search_filter`          |

### Step 2 — Create the Triggers

**Triggers → New → Custom Event** for each:

| Trigger Name            | Event Name (exact match) | Notes                                              |
| ----------------------- | ------------------------ | -------------------------------------------------- |
| CE — spa_pageview       | `spa_pageview`           | Fires on every SPA navigation                      |
| CE — cta_click          | `cta_click`              | All CTAs                                           |
| CE — outbound_click     | `outbound_click`         | All external links                                 |
| CE — schedule_meeting   | `schedule_meeting`       | Conversion trigger                                 |
| CE — resume_download    | `resume_download`        | Conversion trigger                                 |
| CE — blog_view          | `blog_view`              | Conversion-worthy                                  |
| CE — case_study_view    | `case_study_view`        | Mid-funnel engagement                              |
| CE — contact_form_start | `contact_form_start`     | Funnel step                                        |
| CE — contact_form_sent  | `contact_form_submit`    | Use this regex filter on `submit_status`: `^sent$` |
| CE — contact_form_error | `contact_form_submit`    | Filter `submit_status` matches regex `^error$`     |
| CE — linkedin_click     | `linkedin_click`         | Conversion trigger                                 |
| CE — site_search        | `site_search`            | Content demand / search intent                     |

For the two filtered `contact_form_*` triggers: under "This trigger fires on" → choose "Some Custom Events" → add the condition.

### Step 3 — Create the GA4 Configuration tag

**Tags → New → Google Analytics: GA4 Configuration**

- Measurement ID: paste your GA4 stream's measurement ID (`G-XXXXXXXXXX`) — get from Google Analytics → Admin → Data Streams → Web stream.
- Field to set:
  - `send_page_view` = `false` (we'll fire page_view manually so we can control parameters)
- Trigger: **Initialization — All Pages**

This single tag sets up GA4. All event tags below reference it implicitly.

### Step 4 — Create the page_view tag

**Tags → New → Google Analytics: GA4 Event**

- Configuration Tag: select the GA4 Config tag from Step 3
- Event Name: `page_view`
- Event Parameters:
  - `page_path` = `{{DLV — page_path}}`
  - `page_location` = `{{DLV — page_location}}`
  - `page_title` = `{{DLV — page_title}}`
- Triggers:
  - **Initialization — All Pages** (fires the GA4 page_view on initial load)
  - **CE — spa_pageview** (fires on subsequent client-side navigations)

### Step 5 — Event tags

Repeat the GA4 Event pattern for each event. Compact recipe:

| Tag Name                 | GA4 Event Name       | Parameters                                                                                                                | Trigger                 |
| ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| GA4 — cta_click          | `cta_click`          | `cta_id={{DLV — cta_id}}`, `cta_location={{DLV — cta_location}}`, `cta_destination={{DLV — cta_destination}}`             | CE — cta_click          |
| GA4 — outbound_click     | `click`              | `outbound=true`, `outbound_domain={{DLV — outbound_domain}}`, `outbound_url={{DLV — outbound_url}}`                       | CE — outbound_click     |
| GA4 — schedule_meeting   | `schedule_meeting`   | `source={{DLV — source}}`, `schedule_url={{DLV — schedule_url}}`                                                          | CE — schedule_meeting   |
| GA4 — resume_download    | `resume_download`    | `source={{DLV — source}}`                                                                                                 | CE — resume_download    |
| GA4 — linkedin_click     | `linkedin_click`     | `link_location={{DLV — link_location}}`                                                                                   | CE — linkedin_click     |
| GA4 — blog_view          | `blog_view`          | `blog_slug={{DLV — blog_slug}}`, `blog_category={{DLV — blog_category}}`                                                  | CE — blog_view          |
| GA4 — case_study_view    | `case_study_view`    | `case_study_slug={{DLV — case_study_slug}}`                                                                               | CE — case_study_view    |
| GA4 — contact_form_start | `contact_form_start` | (none)                                                                                                                    | CE — contact_form_start |
| GA4 — contact_form_sent  | `contact_form_sent`  | (none)                                                                                                                    | CE — contact_form_sent  |
| GA4 — contact_form_error | `contact_form_error` | (none)                                                                                                                    | CE — contact_form_error |
| GA4 — site_search        | `search`             | `search_term={{DLV — search_term}}`, `search_location={{DLV — search_location}}`, `search_filter={{DLV — search_filter}}` | CE — site_search        |

### Step 6 — Publish the container

Top-right **Submit** → name the version (e.g. "Initial event setup — v1") → **Publish**. Until you publish, nothing fires in production.

---

## 3 · GA4 admin setup (the side you control inside Google Analytics)

Open <https://analytics.google.com> → property **(Admin → Property Settings)**.

### Mark conversions

**Admin → Conversions → New conversion event** for these 3:

1. `schedule_meeting`
2. `resume_download`
3. `linkedin_click`

These become trackable goals in funnels, audience definitions, and ad attribution.

### Custom dimensions (so you can group/filter by these in reports)

**Admin → Custom definitions → Create custom dimensions** — Event-scoped:

| Dimension name      | Event parameter       |
| ------------------- | --------------------- |
| CTA ID              | `cta_id`              |
| CTA Location        | `cta_location`        |
| Source              | `source`              |
| Schedule URL        | `schedule_url`        |
| Blog slug           | `blog_slug`           |
| Blog category       | `blog_category`       |
| Case study slug     | `case_study_slug`     |
| Case study category | `case_study_category` |
| Outbound domain     | `outbound_domain`     |
| Outbound location   | `outbound_location`   |
| Link location       | `link_location`       |
| Submit status       | `submit_status`       |
| Search term         | `search_term`         |
| Search location     | `search_location`     |
| Search filter       | `search_filter`       |

Once registered, these show up as filterable columns in Reports → Engagement → Events.

### Recommended reports to build

In **Explore → Free form**:

1. **Top-of-funnel** — `page_view` segmented by `landing_page` (built-in) → which routes get traffic
2. **Mid-funnel** — `case_study_view` segmented by `case_study_slug` → which case studies earn attention
3. **Conversion path** — funnel: `page_view` → `case_study_view` → `cta_click (cta_id=book_intro_call)` → `schedule_meeting`
4. **CTA effectiveness** — `cta_click` events segmented by `cta_location` + `cta_id`
5. **Inbound CTA destinations** — referrals from LinkedIn vs Google by landing page

---

## 4 · Verifying the install

### Quick checks (DevTools console, no GA4 needed)

1. Open <https://rzifi.com> in Chrome.
2. DevTools → Console → type `dataLayer` → you should see an array with at least:
   - `{ event: "gtm.js", ... }`
   - `{ event: "gtm.dom", ... }`
   - `{ event: "gtm.load", ... }`
3. Click **Schedule call** in the header or **Book intro call** on the contact page → re-type `dataLayer` → look for:
   ```js
   { event: "schedule_meeting", source: "header", schedule_url: "https://cal.com/..." }
   ```
4. Click the **See case studies** button in the hero → look for:
   ```js
   { event: "cta_click", cta_id: "see_case_studies", cta_location: "hero", cta_destination: "/product-work" }
   ```
5. Click **Download resume** → look for both:
   ```js
   { event: "cta_click", cta_id: "download_resume", cta_location: "hero", cta_destination: "/Rizwan_Zafar_Resume.pdf" }
   { event: "resume_download", source: "hero" }
   ```
6. Click any LinkedIn link → look for:
   ```js
   { event: "linkedin_click", link_location: "..." }
   ```
7. Navigate to `/about` → look for:
   ```js
   { event: "spa_pageview", page_path: "/about", page_location: "...", page_title: "About — Rizwan Zafar..." }
   ```
8. Search from the homepage or blog page → look for:
   ```js
   { event: "site_search", search_term: "swift", search_location: "home" }
   ```

### Code/live checks

Run:

```bash
bun run seo:check-live
```

This verifies that the live homepage includes Google Tag Manager and Google Search Console verification, alongside the existing search/AI reachability checks.

### GTM Preview Mode (best while you build triggers)

In your GTM workspace, top-right **Preview** → paste your site URL → it opens a connected tab with a debug pane. Every dataLayer push appears with the matching triggers it fired. Iterate triggers until everything lights up green.

### GA4 DebugView (real-time event stream)

1. In your GTM Preview session, GA4 events flow into the GA4 property's **DebugView** (Admin → DebugView).
2. You'll see events appear in real time with all parameters expanded.
3. If an event shows in dataLayer but NOT in DebugView, the GA4 tag isn't firing — check the trigger.

### GA4 Realtime report

Open **Reports → Realtime** in the live site visit → click around → events should show within ~5 seconds. Once you've confirmed firing, give it 24 hours for the standard reports to populate.

---

## 5 · Operating model

### Local dev opts out automatically

```bash
# .env.local
VITE_GTM_ID=
```

Empty value → no GTM script injected → zero dev pollution in production analytics.

### Staging vs production

If you spin up a separate staging container later, set per-environment env vars:

| Env                      | `VITE_GTM_ID`                              |
| ------------------------ | ------------------------------------------ |
| Local dev                | (empty — opted out)                        |
| Staging / preview deploy | `GTM-XXXXXXXX` (new container for staging) |
| Production               | `GTM-TM5BP98G`                             |

### Optional direct tools

Set these only if you want the direct install:

```bash
VITE_BING_SITE_VERIFICATION=<bing-token>
VITE_MICROSOFT_CLARITY_ID=<clarity-project-id>
VITE_PLAUSIBLE_DOMAIN=rzifi.com
VITE_PLAUSIBLE_SRC=https://plausible.io/js/script.js
```

For LinkedIn Insight, Meta Pixel, TikTok Pixel and Google Ads conversions, use GTM instead of direct code. Create a Custom Event trigger for the events above and fire the vendor tag from GTM.

### When you add a new CTA / event

1. **Edit `src/lib/analytics.ts`** — add the new variant to the `SiteEvent` union.
2. **Call `trackEvent('your_event', { ... })`** at the call site.
3. **GTM workspace** — create matching Custom Event trigger + GA4 Event tag.
4. **GA4** — register any new custom dimensions you reference.

The TypeScript compiler enforces that any `trackEvent('new_thing', ...)` call has a matching union entry — so you can't ship an event your code/IDE doesn't already document.

### Privacy / consent (TODO if you want EU compliance later)

The current install fires GTM unconditionally. If you ever need EU GDPR cookie consent:

1. Install a consent management platform (Klaro, CookieScript, Iubenda — pick one).
2. Set the GTM container to use **Consent Mode v2** (in GTM admin → Container Settings → Consent Mode).
3. Mark each tag with required consent (analytics_storage / ad_storage).
4. The CMP fires `default consent` calls before GTM init, and `update consent` after the user accepts.

Not needed for personal portfolio + no EU advertising — but worth knowing the path.

---

## 6 · Files involved

- [`src/lib/analytics.ts`](../src/lib/analytics.ts) — typed event helper, the source of truth for what fires
- [`src/lib/seo.ts`](../src/lib/seo.ts) — exports `GTM_ID` (env-driven, defaults to `GTM-TM5BP98G`)
- [`src/routes/__root.tsx`](../src/routes/__root.tsx) — GTM `<script>` in head, static analytics bridge, optional Clarity/Plausible/Bing config, `<noscript>` in body, `GtmRouteTracker` for SPA page views
- [`src/components/SiteChrome.tsx`](../src/components/SiteChrome.tsx) — header / footer CTA tracking
- [`src/routes/index.tsx`](../src/routes/index.tsx) — hero CTA tracking
- [`src/routes/contact.tsx`](../src/routes/contact.tsx) — form lifecycle tracking
- [`src/routes/blog.$slug.tsx`](../src/routes/blog.$slug.tsx) — `blog_view`
- [`src/routes/product-work.$slug.tsx`](../src/routes/product-work.$slug.tsx) — `case_study_view` + CTA tracking
- [`.env.example`](../.env.example) — `VITE_GTM_ID` documentation
