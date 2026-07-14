// Videos, podcasts and conference talks. Add entries as they go live,
// the /media route renders all three sections from this single file.

export type MediaKind = "video" | "podcast" | "talk";

export type MediaItem = {
  kind: MediaKind;
  title: string;
  /** Where it lives (YouTube, Spotify, Loom, conference page, etc.). */
  url?: string;
  /** Optional thumbnail to render in the card. */
  thumbnailUrl?: string;
  /** Where it was published / recorded. */
  venue: string;
  /** Free-form date string (e.g. "Mar 2026"). */
  date: string;
  /** Short blurb shown on the card. */
  description: string;
  /** Topic tags, used to surface related content. */
  tags: string[];
  /** Mark true if the recording isn't public yet. */
  comingSoon?: boolean;
  /** Optional duration label (e.g. "32 min" or "5 min Loom"). */
  duration?: string;
};

export const mediaItems: MediaItem[] = [
  // --- Videos / Loom walk-throughs (placeholders, replace URLs as recorded) ---
  {
    kind: "video",
    title: "Walk-through: Simpaisa payments platform architecture",
    venue: "Loom · case-study companion",
    date: "Coming soon",
    description:
      "A 5-minute architecture walk-through of the Simpaisa platform, pay-in / payout API, canonical ledger, corridor abstraction and risk service.",
    tags: ["payment infrastructure", "architecture", "Simpaisa"],
    duration: "5 min",
    comingSoon: true,
  },
  {
    kind: "video",
    title: "Walk-through: BNPL launch from 0 → 100K users in 8 months",
    venue: "Loom · case-study companion",
    date: "Coming soon",
    description:
      "How we shipped Simpaisa's BNPL product from concept to 100K active users in 8 months, credit, risk, regulator engagement and cohort discipline.",
    tags: ["BNPL", "product strategy", "credit"],
    duration: "6 min",
    comingSoon: true,
  },
  {
    kind: "video",
    title: "Walk-through: 3 production GenAI systems + 1 banking pilot",
    venue: "Loom · case-study companion",
    date: "Coming soon",
    description:
      "Tour of three GenAI systems running in production at Simpaisa, merchant chatbot, auto-escalation and partner support automation, plus the fraud/AML banking pilot.",
    tags: ["AI in fintech", "GenAI", "production AI"],
    duration: "7 min",
    comingSoon: true,
  },

  // --- Podcasts (placeholders, add real episodes as recorded) ---
  {
    kind: "podcast",
    title: "Payments product leadership in MENA & South Asia",
    venue: "Guest appearance · pending",
    date: "Coming soon",
    description:
      "Conversation about building regulated payment infrastructure across 5 markets, the operating discipline behind $1B+ TPV, and where the next decade of MENA fintech is heading.",
    tags: ["MENA fintech", "payments leadership", "emerging markets"],
    comingSoon: true,
  },
  {
    kind: "podcast",
    title: "AI in regulated payments, what shipped, what didn't",
    venue: "Guest appearance · pending",
    date: "Coming soon",
    description:
      "Practitioner conversation on shipping production GenAI in a regulated payments org, value modeling, RAG, fraud / AML AI, and the operating model regulators want to see.",
    tags: ["AI in fintech", "GenAI", "regulator"],
    comingSoon: true,
  },

  // --- Conference talks (placeholders) ---
  {
    kind: "talk",
    title: "Cross-border corridors are operating systems, not routes",
    venue: "Conference TBA",
    date: "Coming soon",
    description:
      "Why a corridor is a first-class product object, and the design discipline that lets a corridor abstraction scale across MENA and South Asia.",
    tags: ["cross-border", "corridors", "FX"],
    comingSoon: true,
  },
];

export const videos = mediaItems.filter((m) => m.kind === "video");
export const podcasts = mediaItems.filter((m) => m.kind === "podcast");
export const talks = mediaItems.filter((m) => m.kind === "talk");
