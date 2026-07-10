import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";
import { videos, podcasts, talks, type MediaItem } from "@/data/media";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media, Videos, Podcasts and Talks | Rizwan Zafar" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content:
          "Videos, podcast appearances and conference talks by Rizwan Zafar on regulated payments, AI in fintech, cross-border corridors and program management.",
      },
      { property: "og:title", content: "Media, Videos, Podcasts and Talks" },
      {
        property: "og:description",
        content:
          "Loom walk-throughs of case studies, podcast appearances and conference talks on payments, AI in fintech and programme management.",
      },
      { property: "og:url", content: absUrl("/media") },
      { name: "twitter:title", content: "Media, Videos, Podcasts and Talks" },
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

const kindLabel = (kind: MediaItem["kind"]) =>
  kind === "video" ? "Video" : kind === "podcast" ? "Podcast" : "Talk";

// One coverage entry = one editorial index row (mono kind/duration rail →
// serif title → blurb → mono venue · date). Live entries (a real url, not
// coming-soon) become a stretched-link row; placeholders stay flat text with a
// dashed "Coming soon" affordance. Flat divider rows carry NO data-glow (the
// engine's card bloom is for surfaced cards — see the homepage FAQ note).
function MediaRow({ m }: { m: MediaItem }) {
  const isLink = Boolean(m.url) && !m.comingSoon;
  return (
    <li className="group relative py-7 first:pt-0 md:grid md:grid-cols-12 md:gap-8">
      <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          {kindLabel(m.kind)}
        </span>
        {m.duration && (
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
            {m.duration}
          </span>
        )}
      </div>
      <div className="mt-3 md:mt-0 md:col-span-9">
        <h3 className="font-instrument text-xl md:text-2xl text-ink leading-snug transition-colors group-hover:text-[var(--brand)]">
          {m.title}
          {isLink && (
            <span
              className="ml-2 inline-block text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]"
              aria-hidden
            >
              →
            </span>
          )}
        </h3>
        <p className="mt-2.5 max-w-2xl text-sm md:text-[15px] text-ink-soft leading-relaxed">
          {m.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-soft font-mono-tech">
          <span>{m.venue}</span>
          <span className="text-[var(--brand)]/40" aria-hidden>
            ·
          </span>
          <span>{m.date}</span>
          {m.comingSoon && (
            <span className="inline-flex items-center rounded-full border border-dashed border-rule px-2.5 py-0.5 tracking-[0.18em] text-ink-soft">
              Coming soon
            </span>
          )}
        </div>
      </div>
      {/* Stretched link: the whole row is the hit target (≥24px), external new
          tab, focus-visible ring on the row. sr-only names the destination. */}
      {isLink && (
        <a
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="sr-only">
            {m.title} — {kindLabel(m.kind)}
          </span>
        </a>
      )}
    </li>
  );
}

function MediaSection({
  tag,
  title,
  blurb,
  items,
}: {
  tag: string;
  title: string;
  blurb: string;
  items: MediaItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="rz-beam mt-16 md:mt-24 border-t border-rule pt-10 md:pt-14">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
        ◆ {tag}
      </div>
      <h2 className="mt-3 font-instrument text-[clamp(2rem,4vw,3.25rem)] text-ink leading-[1.05]">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">{blurb}</p>
      {/* Stagger cascades the rows; the ◆ eyebrow + h2 stay outside the wrapper
          so the child-hiding CSS never touches the heading. Rows carry no
          rz-reveal of their own (double-hide guard). */}
      <ul data-rz-stagger className="mt-8 border-t border-rule divide-y divide-rule">
        {items.map((m) => (
          <MediaRow key={`${m.kind}-${m.title}`} m={m} />
        ))}
      </ul>
    </section>
  );
}

function MediaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-20 pb-24">
      {/* Statement page header in the console language: ◆ mono eyebrow →
          monument serif H1 with the signature trailing italic-cyan span. */}
      <header>
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
          ◆ Media
        </div>
        <h1 className="mt-4 font-instrument tracking-[-0.02em] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink max-w-4xl">
          Videos, podcasts and talks,{" "}
          <span className="italic text-[var(--brand)]">payments, AI and program management.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
          Loom walk-throughs of the case studies, podcast appearances on regulated payments and AI
          in fintech, and conference talks on cross-border corridors and program management.
        </p>
      </header>

      <MediaSection
        tag="Videos"
        title="Videos"
        blurb="Short walk-throughs of the case studies, architecture, trade-offs, and what I'd do differently."
        items={videos}
      />
      <MediaSection
        tag="Podcasts"
        title="Podcasts"
        blurb="Conversations on payment infrastructure, AI in regulated payments and MENA fintech."
        items={podcasts}
      />
      <MediaSection
        tag="Conference talks"
        title="Conference talks"
        blurb="Talks on cross-border corridors, payment infrastructure at scale and program management."
        items={talks}
      />

      {/* Close — asymmetric console CTA (statement left, action right) on a
          beamed top rule, mirroring the /journey close. */}
      <section className="rz-beam mt-16 md:mt-24 border-t border-rule">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 pt-12 md:pt-16">
          <div>
            <h2 className="font-instrument text-[clamp(1.9rem,3.6vw,3rem)] text-ink leading-[1.08] max-w-2xl">
              Want to interview, host or invite me?
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft leading-relaxed">
              Open to podcast and conference invitations on regulated payments, AI in fintech,
              cross-border corridors, program management and MENA / South Asia market topics.
            </p>
          </div>
          <a
            href="mailto:rizwanzaffar.pk@gmail.com?subject=Podcast%20%2F%20interview%20invitation"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Invite via email
          </a>
        </div>
      </section>
    </div>
  );
}
