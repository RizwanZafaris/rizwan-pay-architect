import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { absUrl, SITE_URL } from "@/lib/seo";
import { ctaClick, outboundClick, trackEvent } from "@/lib/analytics";
import { SocialCardList } from "@/components/SocialIcons";
import { BookingSection } from "@/components/BookingSection";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// Web3Forms-compatible endpoint. The access key is PUBLIC BY DESIGN (Web3Forms
// keys ship in the form's hidden input either way — same trust class as the
// GA/Ads ids hardcoded in seo.ts). Override with VITE_CONTACT_ACCESS_KEY;
// set it to "" to force the mailto: fallback.
//   - Web3Forms (free, no sign-up email): https://web3forms.com
//   - Compatible: Formspree, Getform, FormSubmit, adjust ENDPOINT + payload as needed
const DEFAULT_CONTACT_ACCESS_KEY = "011f7e03-1cb4-446d-b53b-1829dfbf3a05";
type ContactEnv = { VITE_CONTACT_ACCESS_KEY?: string };
const CONTACT_ACCESS_KEY: string =
  typeof import.meta !== "undefined"
    ? ((import.meta as ImportMeta & { env?: ContactEnv }).env?.VITE_CONTACT_ACCESS_KEY ??
      DEFAULT_CONTACT_ACCESS_KEY)
    : DEFAULT_CONTACT_ACCESS_KEY;
const CONTACT_ENDPOINT = "https://api.web3forms.com/submit";
const CONTACT_MAILTO_ACTION = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Inbound from rzifi.com contact form",
)}`;

export const Route = createFileRoute("/contact")({
  head: () => {
    const url = absUrl("/contact");
    return {
      meta: [
        { title: "Contact Rizwan Zafar | Payments Product & Program Executive" },
        {
          name: "description",
          content:
            "Contact Rizwan Zafar for senior Product & Program roles across fintech, banking, payments and digital platforms in UAE, KSA, Singapore, MENA and Europe.",
        },
        { property: "og:title", content: "Contact Rizwan Zafar, Payments Product Executive" },
        {
          property: "og:description",
          content:
            "Open to senior Product & Program roles across fintechs, banks, payment networks and digital platforms in UAE, KSA, Singapore, MENA, Europe and global markets.",
        },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: "Contact Rizwan Zafar" },
        {
          name: "twitter:description",
          content:
            "Open to senior Product & Program roles across fintechs, banks, payment networks and digital platforms in UAE, KSA, Singapore, MENA, Europe and global markets.",
        },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url,
            name: "Contact Rizwan Zafar, Payments Product Executive",
            mainEntity: {
              "@type": "Person",
              name: profile.name,
              givenName: profile.givenName,
              familyName: profile.familyName,
              nationality: profile.nationality,
              url: SITE_URL,
              email: `mailto:${profile.email}`,
              jobTitle: "Product & Program Executive, Fintech Infrastructure",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
              sameAs: profile.entitySameAs,
              contactPoint: {
                "@type": "ContactPoint",
                email: profile.email,
                contactType: "Hiring inquiries",
                areaServed: ["AE", "SA", "SG", "PK", "GB", "EU", "MENA"],
                availableLanguage: ["English"],
              },
              knowsAbout: [
                "Payments infrastructure",
                "Product management",
                "Program management",
                "Fintech infrastructure",
                "Payment networks",
                "Cross-border payments",
                "Settlement and reconciliation",
                "Risk and compliance",
              ],
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Contact", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type SubmitState = "idle" | "sending" | "sent" | "mailto" | "error";

const contactProof = [
  { value: "Dubai", label: "GST / UTC+4" },
  { value: "24h", label: "Typical reply" },
  { value: "Senior", label: "Product & program roles" },
] as const;

const calendarUrl = profile.calendarUrl.trim();
// With the inline embed on this page, the schedule CTA anchors to #book
// instead of leaving the site; mailto fallback only when no calendar is set.
const scheduleHref =
  (calendarUrl && "#book") ||
  `mailto:${profile.email}?subject=${encodeURIComponent("Intro call availability")}&body=${encodeURIComponent(
    "Hi Rizwan,\n\nI found your portfolio and would like to schedule an intro call.\n\nCompany:\nRole/context:\nPreferred times:\n",
  )}`;

const priorityChannels = [
  {
    label: calendarUrl ? "Book a 15-min intro call" : "Ask for availability",
    detail: calendarUrl ? "Books right here on this page" : "Email pre-filled for scheduling",
    href: scheduleHref,
    id: calendarUrl ? "book_intro_call" : "ask_availability",
  },
  {
    label: "Email",
    detail: "Best for role context and serious intros",
    href: `mailto:${profile.email}`,
    id: "email_me",
  },
  {
    label: "LinkedIn",
    detail: "Good for referrals and quick validation",
    href: profile.linkedin,
    id: "linkedin_contact",
  },
] as const;

const contactSignals = [
  "24h response",
  "Email scheduling ready",
  "Cal.com booking ready",
  "Senior mandates",
] as const;

// Static build never hydrates React — the "Copy email" buttons are wired by
// this inline script (same pattern as the menu/embed scripts). The React
// onClick above still covers dev/hydrated contexts; double-copy is harmless.
const COPY_EMAIL_SCRIPT = `document.querySelectorAll("[data-copy-email]").forEach(function(b){if(b.__rzifiCopyBound)return;b.__rzifiCopyBound=1;b.addEventListener("click",function(){var e=b.getAttribute("data-copy-email");function done(ok){var t=b.textContent;b.textContent=ok?"Copied":"Copy failed";setTimeout(function(){b.textContent=t},2000)}try{navigator.clipboard.writeText(e).then(function(){done(true)},function(){done(false)})}catch(x){done(false)}})});`;

function ContactPage() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    referral: "",
    // honeypot, bots fill this; humans don't
    website: "",
  });

  function validate(v: typeof values): Errors {
    const e: Errors = {};
    if (!v.name.trim() || v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email.";
    if (!v.message.trim() || v.message.trim().length < 10)
      e.message = "Please write at least a short message (10+ characters).";
    return e;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      ctaClick("copy_email", "contact_page", profile.email);
    } catch {
      /* noop */
    }
  }

  function openMailto() {
    const subject = `Inbound from ${values.name}${values.company ? ` (${values.company})` : ""}`;
    const body =
      `Name: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `Company: ${values.company || "Not provided"}\n` +
      `Role you're hiring for: ${values.role || "Not provided"}\n` +
      `How did you hear about me: ${values.referral || "Not provided"}\n\n` +
      `${values.message}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setState("mailto");
    trackEvent("contact_form_submit", { submit_method: "mailto", submit_status: "sent" });
  }

  // Fire "contact_form_start" on first interaction with any field (not every
  // keystroke). We track first touch by checking if any field has length.
  const [hasInteracted, setHasInteracted] = useState(false);
  function markStart() {
    if (hasInteracted) return;
    setHasInteracted(true);
    trackEvent("contact_form_start", {});
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Bot detected, silently succeed (don't emit analytics — would dirty data)
    if (values.website.trim().length > 0) {
      setState("sent");
      return;
    }

    // No backend configured, fall back to mailto so the form still works
    if (!CONTACT_ACCESS_KEY) {
      openMailto();
      return;
    }

    setState("sending");
    setErrorMsg("");
    try {
      const payload = {
        access_key: CONTACT_ACCESS_KEY,
        from_name: values.name,
        replyto: values.email,
        subject: `Inbound from ${values.name}${values.company ? ` (${values.company})` : ""}`,
        name: values.name,
        email: values.email,
        company: values.company || "Not provided",
        role_hiring_for: values.role || "Not provided",
        referral_source: values.referral || "Not provided",
        message: values.message,
        // honeypot for Web3Forms
        botcheck: "",
      };
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (res.ok && json.success !== false) {
        setState("sent");
        trackEvent("contact_form_submit", { submit_method: "server", submit_status: "sent" });
      } else {
        setState("error");
        const errMsg = json.message || "Submission failed. Please try the email link below.";
        setErrorMsg(errMsg);
        trackEvent("contact_form_submit", {
          submit_method: "server",
          submit_status: "error",
          submit_error: errMsg.slice(0, 200),
        });
      }
    } catch (err) {
      setState("error");
      const msg =
        err instanceof Error ? err.message : "Network error. Please use the email link below.";
      setErrorMsg(msg);
      trackEvent("contact_form_submit", {
        submit_method: "server",
        submit_status: "error",
        submit_error: msg.slice(0, 200),
      });
    }
  }

  const field =
    "mt-1 min-h-11 w-full border border-rule bg-card px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-1 focus:ring-offset-background focus:border-[var(--brand)]";

  const isSent = state === "sent";
  const isSending = state === "sending";
  const usesServerSubmission = !!CONTACT_ACCESS_KEY;
  const nativeFormAction = usesServerSubmission ? CONTACT_ENDPOINT : CONTACT_MAILTO_ACTION;
  const nativeFormEncType = usesServerSubmission
    ? "application/x-www-form-urlencoded"
    : "text/plain";
  const submitLabel = isSending
    ? "Sending…"
    : usesServerSubmission
      ? "Send message"
      : "Open email app";

  return (
    <div className="contact-page mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-14">
      <section className="priority-hero-shell relative overflow-hidden grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 border-b border-rule pb-10 md:pb-12">
        <span aria-hidden="true" className="priority-hero-rule priority-hero-rule-a" />
        <span aria-hidden="true" className="priority-hero-rule priority-hero-rule-b" />
        <div className="contact-soft-reveal relative z-10 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Contact
          </div>
          <h1 className="mt-7 max-w-4xl font-instrument text-[clamp(2.25rem,4vw,3.5rem)] text-ink leading-[1.04] text-wrap">
            Contact Rizwan Zafar for Senior Product &amp; Program Roles
          </h1>
          <p className="mt-5 max-w-3xl text-lg md:text-xl text-ink-soft leading-relaxed">
            For roles where payment infrastructure, partner rails, compliance, risk and execution
            pressure meet. Based in Dubai, open to senior mandates across UAE, KSA, Singapore, MENA,
            Europe and global fintech.
          </p>
          <div
            data-rz-stagger
            className="mt-7 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 sm:gap-3 max-w-2xl"
            aria-label="Contact proof points"
          >
            {contactProof.map((item) => (
              <div
                key={item.label}
                className="min-w-0 border border-rule bg-surface px-2.5 sm:px-3 py-3"
              >
                <div className="font-mono-tech text-xl sm:text-2xl text-ink leading-none tabular-nums truncate">
                  {item.value}
                </div>
                <div className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside
          className="priority-brief-card contact-soft-reveal contact-cta-panel relative z-10 border border-rule bg-surface p-5"
          style={{ "--motion-delay": "90ms" } as CSSProperties}
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
            For recruiters
          </div>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            Best for serious roles in payments product leadership, payment infrastructure, regulated
            fintech, cross-border corridors, PMO and executive transformation programs.
          </p>
          <div className="mt-5 grid gap-2">
            <a
              href={scheduleHref}
              data-analytics-event="cta_click"
              data-analytics-cta-id={calendarUrl ? "book_intro_call" : "ask_availability"}
              data-analytics-cta-location="contact_page"
              data-analytics-cta-destination={scheduleHref}
              onClick={() => {
                ctaClick(
                  calendarUrl ? "book_intro_call" : "ask_availability",
                  "contact_page",
                  scheduleHref,
                );
                if (!calendarUrl) outboundClick(scheduleHref, "contact_page");
              }}
              className="contact-card flex items-center justify-between border border-ink bg-ink px-4 py-3 text-sm text-background hover:bg-[var(--brand)]"
            >
              <span>{calendarUrl ? "Book a 15-min intro call" : "Ask for availability"}</span>
              <span aria-hidden="true">→</span>
            </a>
            <Link
              to="/resume"
              data-analytics-event="cta_click"
              data-analytics-cta-id="full_resume"
              data-analytics-cta-location="contact_page"
              data-analytics-cta-destination="/resume"
              className="contact-card flex items-center justify-between border border-rule bg-background px-4 py-3 text-sm text-ink hover:border-ink/30"
            >
              <span>View resume</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/for"
              data-analytics-event="cta_click"
              data-analytics-cta-id="request_preview"
              data-analytics-cta-location="contact_page"
              data-analytics-cta-destination="/for"
              className="contact-card flex items-center justify-between border border-rule bg-background px-4 py-3 text-sm text-ink hover:border-ink/30"
            >
              <span>Recruiter brief</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/product-work"
              data-analytics-event="cta_click"
              data-analytics-cta-id="see_case_studies"
              data-analytics-cta-location="contact_page"
              data-analytics-cta-destination="/product-work"
              className="contact-card flex items-center justify-between border border-rule bg-background px-4 py-3 text-sm text-ink hover:border-ink/30"
            >
              <span>Case studies</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-5 border-t border-rule pt-4 text-xs text-ink-soft leading-relaxed">
            Typical reply: within 24 hours, Sunday to Thursday, GST / UTC+4.
          </div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Contact signals">
            {contactSignals.map((signal, index) => (
              <span
                key={signal}
                className="priority-status-badge"
                style={{ "--motion-delay": `${220 + index * 55}ms` } as CSSProperties}
              >
                {signal}
              </span>
            ))}
          </div>
        </aside>
      </section>

      {/* First ruled section below the hero — the beam runs its top rule once. */}
      <section className="rz-beam relative grid lg:grid-cols-12 gap-8 lg:gap-12 py-10 md:py-12">
        <div
          className="lg:col-span-5 contact-soft-reveal"
          style={{ "--motion-delay": "120ms" } as CSSProperties}
        >
          <h2 className="font-instrument text-2xl md:text-3xl text-ink">Best ways to reach me</h2>
          <ol
            className="mt-5 space-y-3 text-sm text-ink-soft"
            aria-label="Preferred contact channels in order"
          >
            <li>
              <span className="text-ink font-medium">1. Scheduled intro</span>, best when the role
              is serious and timing matters.
            </li>
            <li>
              <span className="text-ink font-medium">2. Email</span>, for substantive intros and
              role discussions.
            </li>
            <li>
              <span className="text-ink font-medium">3. LinkedIn</span>, for quick validation,
              referrals or scheduling follow-up.
            </li>
          </ol>

          <div className="mt-7 space-y-4">
            <div className="grid gap-3">
              {priorityChannels.map((channel) => {
                const isExternal =
                  channel.href.startsWith("http") && !channel.href.startsWith(SITE_URL);
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    data-analytics-event="cta_click"
                    data-analytics-cta-id={channel.id}
                    data-analytics-cta-location="contact_page"
                    data-analytics-cta-destination={channel.href}
                    onClick={() => {
                      ctaClick(channel.id, "contact_page", channel.href);
                      outboundClick(channel.href, "contact_page");
                    }}
                    data-glow
                    className="contact-card flex items-center justify-between gap-4 border border-rule bg-background px-5 py-4 hover:border-ink/30 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition-colors group"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-lg text-ink">{channel.label}</span>
                      <span className="mt-0.5 block text-xs text-ink-soft leading-snug">
                        {channel.detail}
                      </span>
                    </span>
                    <span className="shrink-0 text-ink-soft group-hover:text-ink">→</span>
                  </a>
                );
              })}
            </div>
            <SocialCardList source="contact_page" />
            <div className="contact-card border border-rule bg-surface px-5 py-4">
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">
                Location · time zone
              </div>
              <div className="font-display text-lg text-ink">{profile.location} · GST (UTC+4)</div>
            </div>
            <NewsletterSignup
              placement="contact_page"
              fromPage="/contact"
              className="contact-card"
            />
          </div>
        </div>

        <div
          className="lg:col-span-7 contact-soft-reveal bg-surface border border-rule p-6 md:p-8 min-w-0"
          style={{ "--motion-delay": "180ms" } as CSSProperties}
        >
          <h2 className="font-display text-xl text-ink">Send a focused hiring note</h2>
          <p className="mt-2 text-xs text-ink-soft">
            {usesServerSubmission
              ? "Submissions go straight to my inbox. I reply within 24 hours."
              : "This form opens your email app with your message pre-filled. Nothing is sent from this site."}
          </p>
          {isSent ? (
            <div className="mt-6 space-y-3" role="status" aria-live="polite">
              <div className="text-ink font-medium">
                Message sent. I'll reply within 24 hours, Sun–Thu GST.
              </div>
              <p className="text-sm text-ink-soft">
                In the meantime, you can also reach me via the channels on the left.
              </p>
              <button
                type="button"
                onClick={() => {
                  setState("idle");
                  setValues({
                    name: "",
                    email: "",
                    company: "",
                    role: "",
                    message: "",
                    referral: "",
                    website: "",
                  });
                }}
                className="mt-2 text-sm text-ink-soft hover:text-ink underline"
              >
                Send another
              </button>
            </div>
          ) : state === "mailto" ? (
            <div className="mt-6 space-y-3" role="status" aria-live="polite">
              <div className="text-ink font-medium">
                If your email app did not open, copy the address below.
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-rule bg-background px-3 py-2">
                <span className="text-sm text-ink font-mono-tech break-all min-w-0">
                  {profile.email}
                </span>
                <button
                  type="button"
                  data-copy-email={profile.email}
                  onClick={copyEmail}
                  className="ml-auto text-xs uppercase tracking-[0.14em] rounded-md border border-ink/20 px-3 py-1.5 hover:border-ink/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                >
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setState("idle");
                  setValues({
                    name: "",
                    email: "",
                    company: "",
                    role: "",
                    message: "",
                    referral: "",
                    website: "",
                  });
                }}
                className="mt-2 text-sm text-ink-soft hover:text-ink underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              action={nativeFormAction}
              method="post"
              encType={nativeFormEncType}
              onSubmit={onSubmit}
              onFocus={markStart}
              data-analytics-form="contact"
              className="mt-6 space-y-4"
            >
              {usesServerSubmission && (
                <>
                  <input type="hidden" name="access_key" value={CONTACT_ACCESS_KEY} />
                  <input type="hidden" name="subject" value="Inbound from rzifi.com contact form" />
                  <input type="hidden" name="from_name" value="rzifi.com contact form" />
                  <input type="hidden" name="botcheck" value="" />
                  {/* Web3Forms honours `redirect` on native (no-JS) POSTs, so the
                      static production build lands on a branded confirmation
                      instead of Web3Forms' generic success page. */}
                  <input type="hidden" name="redirect" value={absUrl("/contact/thanks/")} />
                </>
              )}

              {/* Honeypot, visually hidden from sighted users + screen readers */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => setValues({ ...values, website: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-err" : undefined}
                  className={field}
                />
                {errors.name && (
                  <p id="name-err" className="mt-1 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="text-xs uppercase tracking-[0.12em] text-ink-soft"
                  htmlFor="email"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                  className={field}
                />
                {errors.email && (
                  <p id="email-err" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-xs uppercase tracking-[0.12em] text-ink-soft"
                    htmlFor="company"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => setValues({ ...values, company: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <label
                    className="text-xs uppercase tracking-[0.12em] text-ink-soft"
                    htmlFor="inquiry_type"
                  >
                    I'm reaching out about
                  </label>
                  {/* Native select: works without hydration, posts with the form. */}
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    defaultValue="Hiring for a role"
                    className={field}
                  >
                    <option>Hiring for a role</option>
                    <option>Advisory / consulting engagement</option>
                    <option>Speaking / podcast</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label
                    className="text-xs uppercase tracking-[0.12em] text-ink-soft"
                    htmlFor="role"
                  >
                    Role or problem context
                  </label>
                  <input
                    id="role"
                    name="role"
                    placeholder="e.g. Director, Acceptance Product — or 'auth rate dropped 4pts'"
                    value={values.role}
                    onChange={(e) => setValues({ ...values, role: e.target.value })}
                    className={field}
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-xs uppercase tracking-[0.12em] text-ink-soft"
                  htmlFor="message"
                >
                  Message *
                </label>
                <p id="message-help" className="mt-1 text-[11px] text-ink-soft">
                  Helpful to include: company, location, contractor or full-time, target start.
                </p>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={20}
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues({ ...values, message: e.target.value })}
                  aria-describedby={errors.message ? "message-err message-help" : "message-help"}
                  className={field}
                />
                {errors.message && (
                  <p id="message-err" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="text-xs uppercase tracking-[0.12em] text-ink-soft"
                  htmlFor="referral"
                >
                  How did you hear about me?
                </label>
                <select
                  id="referral"
                  name="referral"
                  value={values.referral}
                  onChange={(e) => setValues({ ...values, referral: e.target.value })}
                  className={field}
                >
                  <option value="">Select source</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Google search">Google search</option>
                  <option value="Referral">Referral</option>
                  <option value="Blog/essay">A blog or essay I wrote</option>
                  <option value="Conference/event">Conference / event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSending}
                  data-analytics-event="cta_click"
                  data-analytics-cta-id={usesServerSubmission ? "send_message" : "open_email_app"}
                  data-analytics-cta-location="contact_page"
                  data-analytics-cta-destination={
                    usesServerSubmission ? "contact_form" : `mailto:${profile.email}`
                  }
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand focus:outline-none focus:ring-2 focus:ring-ink/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitLabel}
                </button>
                <button
                  type="button"
                  data-copy-email={profile.email}
                  onClick={copyEmail}
                  data-analytics-event="cta_click"
                  data-analytics-cta-id="copy_email"
                  data-analytics-cta-location="contact_page"
                  data-analytics-cta-destination={profile.email}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/50 focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors"
                >
                  {copied ? "Email copied ✓" : "Copy email"}
                </button>
              </div>
              <p role="status" aria-live="polite" className="min-h-[1.25rem] text-xs">
                {state === "error" ? (
                  <span className="text-red-600 font-medium">
                    {errorMsg || "Something went wrong. Use the email link on the left."}
                  </span>
                ) : copied ? (
                  <span className="text-[var(--accent-emerald)] font-medium">
                    Email address copied to clipboard.
                  </span>
                ) : (
                  <span className="text-ink-soft">
                    {usesServerSubmission
                      ? "Submissions are protected with a spam filter and sent straight to my inbox."
                      : "This opens your email app with the message pre-filled, it does not send from this site."}
                  </span>
                )}
              </p>
            </form>
          )}
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: COPY_EMAIL_SCRIPT }} />

      {calendarUrl && (
        <BookingSection
          refName="contact_inline_embed"
          fallbackLocation="contact_embed_fallback"
          calendarUrl={calendarUrl}
          className="mt-4 pb-12"
        />
      )}
    </div>
  );
}
