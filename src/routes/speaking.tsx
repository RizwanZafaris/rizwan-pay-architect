import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

// STUB — replaced by the brand-rebuild /speaking page.
export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking & Media — Frontier-Market Payments | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Talks, podcasts and press on frontier-market payments, product leadership in regulated fintech, and AI-assisted delivery.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/speaking") }],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-instrument text-4xl text-ink">Speaking &amp; Media</h1>
      <p className="mt-4 text-ink-soft">Coming together.</p>
    </div>
  ),
});
