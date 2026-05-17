import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";
import { videos, podcasts, talks, type MediaItem } from "@/data/media";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — Videos, Podcasts and Talks | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Videos, podcast appearances and conference talks by Rizwan Zafar on regulated payments, AI in fintech, cross-border corridors and program management.",
      },
      { property: "og:title", content: "Media — Videos, Podcasts and Talks" },
      {
        property: "og:description",
        content:
          "Loom walk-throughs of case studies, podcast appearances and conference talks on payments, AI in fintech and programme management.",
      },
      { property: "og:url", content: absUrl("/media") },
      { name: "twitter:title", content: "Media — Videos, Podcasts and Talks" },
      {
        name: "twitter:description",
        content:
          "Videos, podcasts and talks on regulated payments, AI in fintech, cross-border corridors and program management.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/media") }],
  }),
  component: MediaPage,
});

function MediaCard({ m }: { m: MediaItem }) {
  const card = (
    <article className="group bg-surface border border-rule rounded-2xl p-6 hover:border-ink/30 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
          {m.kind === "video" ? "Video" : m.kind === "podcast" ? "Podcast" : "Talk"}
        </span>
        {m.duration && (
          <span className="text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech">
            {m.duration}
          </span>
        )}
      </div>
      <h3 className="font-instrument text-xl text-ink mt-3 leading-snug group-hover:text-[var(--brand)] transition-colors">
        {m.title}
      </h3>
      <p className="text-sm text-ink-soft mt-3 leading-relaxed flex-1">{m.description}</p>
      <div className="mt-5 pt-4 border-t border-rule text-xs text-ink-soft flex flex-wrap justify-between gap-2">
        <span>{m.venue}</span>
        <span className="font-mono-tech">{m.date}</span>
      </div>
      {m.comingSoon && (
        <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech border border-dashed border-rule rounded-full px-3 py-1 self-start">
          Coming soon
        </div>
      )}
    </article>
  );
  if (m.url && !m.comingSoon) {
    return (
      <a href={m.url} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }
  return card;
}

function Section({ title, blurb, items }: { title: string; blurb: string; items: MediaItem[] }) {
  return (
    <section className="mt-16">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
        ◆ {title}
      </div>
      <h2 className="font-instrument text-3xl md:text-5xl text-ink mt-3 leading-tight">{title}</h2>
      <p className="mt-3 text-ink-soft max-w-2xl">{blurb}</p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((m) => (
          <MediaCard key={`${m.kind}-${m.title}`} m={m} />
        ))}
      </div>
    </section>
  );
}

function MediaPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
        ◆ Media
      </div>
      <h1 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.05] max-w-3xl">
        Videos, podcasts and talks — payments, AI and program management.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Loom walk-throughs of the case studies, podcast appearances on regulated payments and AI in
        fintech, and conference talks on cross-border corridors and program management.
      </p>

      <Section
        title="Videos"
        blurb="Short walk-throughs of the case studies — architecture, trade-offs, and what I'd do differently."
        items={videos}
      />
      <Section
        title="Podcasts"
        blurb="Conversations on payment infrastructure, AI in regulated payments and MENA fintech."
        items={podcasts}
      />
      <Section
        title="Conference talks"
        blurb="Talks on cross-border corridors, payment infrastructure at scale and program management."
        items={talks}
      />

      <div className="mt-20 rounded-3xl border border-ink/10 bg-surface p-8 md:p-10">
        <h2 className="font-instrument text-2xl text-ink leading-tight">
          Want to interview, host or invite me?
        </h2>
        <p className="mt-3 text-ink-soft max-w-2xl">
          Open to podcast and conference invitations on regulated payments, AI in fintech,
          cross-border corridors, program management and MENA / South Asia market topics.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="mailto:rizwanzaffar.pk@gmail.com?subject=Podcast%20%2F%20interview%20invitation"
            className="inline-flex rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
          >
            Invite via email
          </a>
        </div>
      </div>
    </div>
  );
}
