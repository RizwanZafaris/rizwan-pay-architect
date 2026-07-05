import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

// Subscriber confirmation — the NewsletterSignup forms' native (no-JS) POST
// redirects here (see the hidden `redirect` field in NewsletterSignup.tsx).
// Split from /contact/thanks/ because a subscriber didn't "send a message"
// and shouldn't be promised a 24-hour reply. noindex: post-submit only.
export const Route = createFileRoute("/newsletter_/thanks")({
  head: () => ({
    meta: [
      { title: "You're on the list | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Subscription confirmed — one operator email a week on payments infrastructure, fintech product and program leadership.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: absUrl("/newsletter/thanks") }],
  }),
  component: NewsletterThanksPage,
});

function NewsletterThanksPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--signal)] font-mono-tech font-semibold">
        ◆ Subscription confirmed
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05]">
        You&apos;re on the list.
      </h1>
      <p className="mt-5 text-ink-soft leading-relaxed max-w-md mx-auto">
        One operator email a week — payment acceptance, settlement and product delivery notes from
        running $1B+ annual GTV across frontier markets. Weekly at most, unsubscribe with one
        reply.
      </p>
      <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/blog"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-base font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          Read the latest essays
        </Link>
        <Link to="/" className="link-underline text-sm font-medium text-ink">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
