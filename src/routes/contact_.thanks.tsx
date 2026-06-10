import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { absUrl } from "@/lib/seo";

// Branded confirmation target for the contact form's native (no-JS) POST —
// Web3Forms redirects here after a successful submission (see the hidden
// `redirect` field in contact.tsx). noindex: this page only exists post-submit
// and must never compete with /contact in search.
export const Route = createFileRoute("/contact_/thanks")({
  head: () => ({
    meta: [
      { title: "Message sent | Rizwan Zafar" },
      {
        name: "description",
        content: "Your message has been sent. Rizwan replies within 24 hours, Sunday to Thursday.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact/thanks") }],
  }),
  component: ContactThanksPage,
});

function ContactThanksPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--signal)] font-mono-tech font-semibold">
        ◆ Message sent
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
        Thank you — it&apos;s in my inbox.
      </h1>
      <p className="mt-5 text-ink-soft leading-relaxed max-w-md mx-auto">
        I reply within 24 hours, Sunday&ndash;Thursday (GST). If it&apos;s time-sensitive, the
        fastest path is a 15-minute intro call.
      </p>
      <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={profile.calendarUrl}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="cta_click"
          data-analytics-cta-id="book_intro_call"
          data-analytics-cta-location="contact_thanks"
          data-analytics-cta-destination={profile.calendarUrl}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-base font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          Book a 15-min intro call
        </a>
        <Link to="/" className="link-underline text-sm font-medium text-ink">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
