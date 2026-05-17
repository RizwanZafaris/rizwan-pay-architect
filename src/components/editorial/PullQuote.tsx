import type { ReactNode } from "react";

/**
 * PullQuote — magazine-grade quote block. Display serif at giant scale,
 * brand-cyan italic for emphasis fragment, optional attribution.
 *
 * Sits between body sections as a visual breath / second-read anchor.
 * Half-margin top/bottom on purpose so it disrupts the prose rhythm.
 */
export function PullQuote({
  children,
  emphasis,
  by,
  role,
  align = "left",
}: {
  /** Full quote text. */
  children: ReactNode;
  /** Optional fragment to italicise + brand-cyan; will be appended after children. */
  emphasis?: string;
  /** Optional attribution name. */
  by?: string;
  /** Role / company. */
  role?: string;
  align?: "left" | "center";
}) {
  return (
    <figure className={`my-12 md:my-20 ${align === "center" ? "text-center" : ""}`}>
      <div
        aria-hidden
        className="h-px w-12 bg-[var(--brand)] mb-6 mx-0 data-[align=center]:mx-auto"
        data-align={align}
      />
      <blockquote className="font-instrument text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink max-w-3xl">
        <span className="text-[var(--brand)] mr-2">&ldquo;</span>
        {children}
        {emphasis && (
          <>
            {" "}
            <span className="italic text-[var(--brand)]">{emphasis}</span>
          </>
        )}
        <span className="text-[var(--brand)] ml-1">&rdquo;</span>
      </blockquote>
      {(by || role) && (
        <figcaption className="mt-5 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
          {by}
          {by && role ? " · " : ""}
          {role}
        </figcaption>
      )}
    </figure>
  );
}
