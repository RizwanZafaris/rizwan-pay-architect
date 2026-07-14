// Email capture — the site's first owned-audience surface.
//
// Same zero-hydration constraint as the contact form: this must work as a
// plain native POST because production HTML ships without React. It reuses
// the proven Web3Forms pattern from src/routes/contact.tsx (same access key),
// redirecting to the subscriber-specific /newsletter/thanks/ confirmation.
//
// Interim backend: Web3Forms delivers each signup as an email. Swap `action`
// to a Buttondown/beehiiv embed-subscribe endpoint once an ESP account
// exists — the markup below already matches that shape (single email field,
// native POST, redirect).
//
// Analytics: data-analytics-form="newsletter" is picked up by the inline
// bridge in src/routes/__root.tsx, which fires `newsletter_signup` with the
// GA4 event param `placement` (never `source` — reserved param).
import { PLATFORM } from "@/content/facts";
import { absUrl } from "@/lib/seo";

const CONTACT_ENDPOINT = "https://api.web3forms.com/submit";
const DEFAULT_CONTACT_ACCESS_KEY = "011f7e03-1cb4-446d-b53b-1829dfbf3a05";
type ContactEnv = { VITE_CONTACT_ACCESS_KEY?: string };
const ACCESS_KEY =
  (import.meta.env as ContactEnv).VITE_CONTACT_ACCESS_KEY || DEFAULT_CONTACT_ACCESS_KEY;

export function NewsletterSignup({
  placement,
  fromPage,
  className = "",
}: {
  placement: string;
  fromPage: string;
  className?: string;
}) {
  return (
    <section className={`border border-rule rounded-lg bg-surface p-6 md:p-8 ${className}`}>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
        Payments Infrastructure Notes
      </div>
      <h2 className="font-display text-xl text-ink mt-2">One operator email a week. No filler.</h2>
      <p className="mt-2 text-sm text-ink-soft leading-relaxed">
        Payment acceptance, settlement and product delivery notes from running {PLATFORM.gtv} annual
        GTV across frontier markets — written for founders and payment leaders.
      </p>
      <form
        method="post"
        action={CONTACT_ENDPOINT}
        data-analytics-form="newsletter"
        data-analytics-placement={placement}
        className="mt-4 flex flex-col sm:flex-row gap-2"
      >
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        <input
          type="hidden"
          name="subject"
          value="Newsletter signup — Payments Infrastructure Notes"
        />
        <input type="hidden" name="from_name" value="rzifi.com newsletter signup" />
        <input type="hidden" name="from_page" value={fromPage} />
        <input type="hidden" name="botcheck" value="" />
        <input type="hidden" name="redirect" value={absUrl("/newsletter/thanks/")} />
        <label className="sr-only" htmlFor={`newsletter-email-${placement}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${placement}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="flex-1 rounded-md border border-rule bg-background px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-background hover:bg-[var(--brand)] transition-colors"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-2 text-xs text-ink-soft">Weekly at most. Unsubscribe with one reply.</p>
    </section>
  );
}
