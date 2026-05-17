import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { profile } from "@/data/profile";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rizwan Zafar | Payments Product Executive (Dubai)" },
      {
        name: "description",
        content:
          "Open to senior product and payment infrastructure roles in UAE, KSA, Singapore, MENA, Europe and global fintech. Get in touch.",
      },
      { property: "og:title", content: "Contact Rizwan Zafar" },
      { property: "og:description", content: "Open to senior payments product roles. Based in Dubai." },
      { property: "og:url", content: absUrl("/contact") },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact") }],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });

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
    } catch {
      /* noop */
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const subject = `Inbound from ${values.name}${values.company ? ` (${values.company})` : ""}`;
    const body = `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "—"}\n\n${values.message}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSubmitted(true);
  }

  const field =
    "mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink";

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
        <div className="mt-10 space-y-4">
          <a href={`mailto:${profile.email}`} className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors group">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Email</div>
              <div className="font-display text-lg text-ink">{profile.email}</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink focus:outline-none focus:ring-2 focus:ring-ink/30 transition-colors group">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">LinkedIn</div>
              <div className="font-display text-lg text-ink">/in/rizwanzaffar</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <div className="border border-rule rounded-lg px-5 py-4">
            <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Location</div>
            <div className="font-display text-lg text-ink">{profile.location}</div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-rule rounded-lg p-6 md:p-8 min-w-0">
        <h2 className="font-display text-xl text-ink">Send a message</h2>
        <p className="mt-2 text-xs text-ink-soft">
          This form opens your email app with your message pre-filled. Nothing is sent from this site.
        </p>
        {submitted ? (
          <div className="mt-6 space-y-3" role="status" aria-live="polite">
            <div className="text-ink font-medium">If your email app did not open, copy the address below.</div>
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-rule bg-background px-3 py-2">
              <span className="text-sm text-ink font-mono-tech break-all min-w-0">{profile.email}</span>
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
              onClick={() => { setSubmitted(false); setValues({ name: "", email: "", company: "", message: "" }); }}
              className="mt-2 text-sm text-ink-soft hover:text-ink underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="name">Name</label>
              <input
                id="name" name="name" required autoComplete="name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                className={field}
              />
              {errors.name && <p id="name-err" className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                className={field}
              />
              {errors.email && <p id="email-err" className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="company">Company</label>
              <input
                id="company" name="company" autoComplete="organization"
                value={values.company}
                onChange={(e) => setValues({ ...values, company: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="message">Message</label>
              <textarea
                id="message" name="message" required rows={5}
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
                className={field}
              />
              {errors.message && <p id="message-err" className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <button type="submit" className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand focus:outline-none focus:ring-2 focus:ring-ink/40 transition-colors">
                Open email app
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
              {copied ? (
                <span className="text-[var(--accent-emerald)] font-medium">
                  Email address copied to clipboard.
                </span>
              ) : (
                <span className="text-ink-soft">
                  This opens your email app with the message pre-filled — it does not send from this site.
                </span>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
