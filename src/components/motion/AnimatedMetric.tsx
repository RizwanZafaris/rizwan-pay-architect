import { CountUp } from "./CountUp";

/**
 * AnimatedMetric — wraps a metric value string and animates the leading
 * number if one can be cleanly extracted. Falls back to static text for
 * compound values like "50% → 1%" or "0 → 100K in 8mo".
 *
 * Supported templates:
 *   "$1B+"      → counts 0..1, template "${n}B+"
 *   "25M+"      → counts 0..25, template "{n}M+"
 *   "5"         → counts 0..5
 *   "99.95%"    → counts 0..99.95 with 2 decimals, template "{n}%"
 *   "−90%"      → counts 0..-90 (handled as negative)
 *   anything    → renders verbatim, no animation
 *   else
 */
export function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const parsed = parseMetric(value);
  if (!parsed) return <span className={className}>{value}</span>;
  return (
    <CountUp
      value={parsed.n}
      template={parsed.template}
      decimals={parsed.decimals}
      className={className}
    />
  );
}

type Parsed = { n: number; template: string; decimals: number };

function parseMetric(raw: string): Parsed | null {
  // Compound transformations like "50% → 1%" or "0 → 100K in 8mo" — skip.
  if (raw.includes("→") || raw.includes("->")) return null;
  // Match e.g.  "$1B+"  "25M+"  "5"  "99.95%"  "−90%"  "$10M+"
  // Capture: optional prefix (currency), number, optional unit (B/M/K/%), optional suffix
  const match = raw.match(
    /^(?<prefix>[^\d−-]*?)(?<sign>[−-]?)(?<num>\d+(?:\.\d+)?)(?<unit>[BMK%]?)(?<suffix>.*)$/,
  );
  if (!match || !match.groups) return null;
  const { prefix = "", sign = "", num, unit = "", suffix = "" } = match.groups;
  const n = parseFloat(num) * (sign === "−" || sign === "-" ? -1 : 1);
  if (Number.isNaN(n)) return null;
  // Decimals: preserve 2 if the value had a decimal, else 0
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const template = `${prefix}${sign}{n}${unit}${suffix}`;
  return { n, template, decimals };
}
