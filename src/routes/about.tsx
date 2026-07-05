import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

// STUB — replaced by the brand-rebuild /about page (the operator story).
// The old beforeLoad redirect to /resume was removed 2026-07-05; the matching
// .htaccess 301 was removed in the same commit.
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rizwan Zafar — Operating Since 2009 Across MENA & South Asia" },
      {
        name: "description",
        content:
          "The operator story: engineering to product, why frontier markets, and the beliefs that shape how I build payment and product infrastructure.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-instrument text-4xl text-ink">About</h1>
      <p className="mt-4 text-ink-soft">Coming together.</p>
    </div>
  ),
});
