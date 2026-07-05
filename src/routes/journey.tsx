import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

// STUB — replaced by the brand-rebuild /journey page (map + timeline).
export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "17 Years, 10 Markets: A Payments Operator's Journey | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Seventeen years, ten markets, three industries — from Daraz's marketplaces to Tapmad's streaming business to Simpaisa's cross-border gateway.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/journey") }],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-instrument text-4xl text-ink">The Journey</h1>
      <p className="mt-4 text-ink-soft">Coming together.</p>
    </div>
  ),
});
