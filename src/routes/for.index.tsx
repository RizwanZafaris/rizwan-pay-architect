import { createFileRoute, Link } from "@tanstack/react-router";
import { audiences } from "@/data/hubs";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/for/")({
  head: () => ({
    meta: [
      { title: "For Recruiters — Pick Your Lens | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Three recruiter paths: Visa & Mastercard, Stripe/Adyen/Wise/Thunes, and banks & regulated fintechs. Each path explains the relevant work in your language.",
      },
      { property: "og:title", content: "For Recruiters — Rizwan Zafar" },
      { property: "og:description", content: "Three lenses on the work: networks, orchestrators, and regulated fintechs." },
      { property: "og:url", content: absUrl("/for") },
    ],
    links: [{ rel: "canonical", href: absUrl("/for") }],
  }),
  component: ForIndex,
});

function ForIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
        ◆ For recruiters
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]">
        Pick your lens.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Three audience paths through the same body of work — networks, orchestrators, and regulated
        fintechs. Each path leads with the essays and case studies that map to your hiring lens.
      </p>

      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {audiences.map((a) => (
          <Link
            key={a.slug}
            to="/for/$audience"
            params={{ audience: a.slug }}
            className="group rounded-2xl border border-ink/10 bg-surface p-7 hover:border-ink/30 transition-colors flex flex-col"
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-emerald)] font-mono-tech">
              {a.shortTitle}
            </div>
            <h2 className="font-instrument text-2xl text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
              {a.title}
            </h2>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed flex-1">{a.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {a.companies.slice(0, 4).map((c) => (
                <span
                  key={c}
                  className="text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-background font-mono-tech uppercase tracking-[0.1em]"
                >
                  {c}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
