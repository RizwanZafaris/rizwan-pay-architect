import type { CSSProperties } from "react";

// Kinetic headline — words rise into place as the heading scrolls into view
// (JS-less port of the 21st.dev "Auto Revealing Heading" idea). This
// component ONLY server-renders the words as inline-block spans; the motion
// is a CSS scroll-driven animation (`.rz-word` in styles.css), gated behind
// @supports (animation-timeline: view()) AND prefers-reduced-motion. The
// static fallback is the full heading, fully visible — so it degrades to
// plain text on every browser that can't do it, with no layout shift.
//
// `lead` is the default-weight run; `emphasis` renders italic + brand, which
// matches the site's established "plain … italic." headline pattern without
// breaking the per-word split. The full text stays in the DOM in order, so
// SEO and screen-reader output are unchanged.

type RevealHeadingProps = {
  lead: string;
  emphasis?: string;
  /** Extra classes for the emphasis run (defaults to italic brand). */
  emphasisClassName?: string;
};

function words(text: string) {
  return text.trim().split(/\s+/);
}

export function RevealHeading({
  lead,
  emphasis,
  emphasisClassName = "italic text-[var(--brand)]",
}: RevealHeadingProps) {
  const leadWords = words(lead);
  const emphWords = emphasis ? words(emphasis) : [];
  let i = 0;
  const word = (w: string) => (
    <span className="rz-word" style={{ ["--i" as string]: i++ } as CSSProperties}>
      {w}
    </span>
  );
  return (
    <span className="rz-words">
      {leadWords.map((w, k) => (
        <span key={`l${k}`}>{word(w)} </span>
      ))}
      {emphWords.length > 0 && (
        <span className={emphasisClassName}>
          {emphWords.map((w, k) => (
            <span key={`e${k}`}>
              {word(w)}
              {k < emphWords.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
