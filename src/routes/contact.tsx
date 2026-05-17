import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { profile } from "@/data/profile";
import { absUrl } from "@/lib/seo";
import { ctaClick, outboundClick, trackEvent } from "@/lib/analytics";

// Web3Forms-compatible endpoint. Set VITE_CONTACT_ACCESS_KEY in your environment
// to enable server-side submission. When unset the form falls back to mailto:.
//   - Web3Forms (free, no sign-up email): https://web3forms.com
//   - Compatible: Formspree, Getform, FormSubmit, adjust ENDPOINT + payload as needed
type ContactEnv = { VITE_CONTACT_ACCESS_KEY?: string };
const CONTACT_ACCESS_KEY: string =
  (typeof import.meta !== "undefined"
    ? ((import.meta as ImportMeta & { env?: ContactEnv }).env?.VITE_CONTACT_ACCESS_KEY ?? "")
    : "") || "";
const CONTACT_ENDPOINT = "https://api.web3forms.com/submit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact, Rizwan Zafar | Payments Product Executive (Dubai)" },
      {
        name: "description",
        content:
          "Open to senior product and payment infrastructure roles in UAE, KSA, Singapore, MENA, Europe and global fintech. Reply within 24 hours, Sun–Thu Dubai time.",
      },
      { property: "og:title", content: "Contact Rizwan Zafar" },
      {
        property: "og:description",
        content:
          "Open to senior payments product roles. Based in Dubai. Replies within 24 hours, Sun–Thu GST.",
      },
      { property: "og:url", content: absUrl("/contact") },
      { name: "twitter:title", content: "Contact Rizwan Zafar" },
      {
        name: "twitter:description",
        content: "Open to senior payments product roles. Dubai-based. Reply within 24h, Sun–Thu.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact") }],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type SubmitState = "idle" | "sending" | "sent" | "mailto" | "error";

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
      `Company: ${values.company || ","}\n` +
      `Role you're hiring for: ${values.role || ","}\n` +
      `How did you hear about me: ${values.referral || ","}\n\n` +
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Bot detected, silently succeed (don't log to GTM — would dirty data)
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
        company: values.company || ",",
        role_hiring_for: values.role || ",",
        referral_source: values.referral || ",",
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
    "mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink";

  const isSent = state === "sent";
  const isSending = state === "sending";
  const usesServerSubmission = !!CONTACT_ACCESS_KEY;
  const submitLabel = isSending
    ? "Sending…"
    : usesServerSubmission
      ? "Send message"
      : "Open email app";

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-2 gap-16">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Contact</div>
        <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
          Let's talk payments.
        </h1>
        <p className="mt-5 text-ink-soft text-lg">
          Based in {profile.location}. Open to senior product and payment infrastructure roles in
          UAE, KSA, Singapore, MENA, Europe and global fintech.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          I reply within 24 hours, Sun–Thu (GST / UTC+4).
        </p>

        <div className="mt-8">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3">
            Best ways to reach me
          </div>
          <ol
            className="space-y-3 text-sm text-ink-soft"
            aria-label="Preferred contact channels in order"
          >
            <li>
              <span className="text-ink font-medium">1. Email</span>, for substantive intros and
              role discussions.
            </li>
            <li>
              <span className="text-ink font-medium">2. LinkedIn DM</span>, for quick pings or
              referrals.
            </li>
            <li>
              <span className="text-ink font-medium">3. The form</span>, pre-formats your message so
              I can triage faster.
            </li>
          </ol>
        </div>

        <div className="mt-8 space-y-4">
          <a
            href={`mailto:${profile.email}`}
            onClick={() => {
              ctaClick("email_me", "contact_page", `mailto:${profile.email}`);
              outboundClick(`mailto:${profile.email}`, "contact_page");
            }}
            className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors group"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Email</div>
              <div className="font-display text-lg text-ink break-all">{profile.email}</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => outboundClick(profile.linkedin, "contact_page")}
            className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors group"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">LinkedIn</div>
              <div className="font-display text-lg text-ink">/in/rizwanzaffar</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <div className="border border-rule rounded-lg px-5 py-4">
            <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">
              Location · time zone
            </div>
            <div className="font-display text-lg text-ink">{profile.location} · GST (UTC+4)</div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-rule rounded-lg p-6 md:p-8 min-w-0">
        <h2 className="font-display text-xl text-ink">Send a message</h2>
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
          <form onSubmit={onSubmit} onFocus={markStart} className="mt-6 space-y-4" noValidate>
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
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="email">
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
                <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="role">
                  Role you're hiring for
                </label>
                <input
                  id="role"
                  name="role"
                  placeholder="e.g. Director, Acceptance Product"
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
                rows={5}
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                aria-invalid={!!errors.message}
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
                <option value="">,</option>
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
                className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand focus:outline-none focus:ring-2 focus:ring-ink/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitLabel}
              </button>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center rounded-md border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/50 focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors"
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
    </div>
  );
}
