/**
 * CountUp — pure markup. Renders the FINAL formatted value as text (so
 * crawlers and no-JS visitors always see the real number) and tags itself
 * with the data the vanilla counter needs. The animation is driven by the
 * single inline reveal/count script (rzRevealScript in __root.tsx): when the
 * element scrolls into view it counts 0 → value on an ease-out-quart curve,
 * then restores this exact final text so the displayed number can never drift
 * from the server-rendered one. Works on the zero-hydration static build in
 * every browser; reduced-motion and no-JS leave the final value untouched.
 *
 * Usage:
 *   <CountUp value={1000} />                  → 1,000
 *   <CountUp value={1} template="${n}B+" />   → $1B+
 *   <CountUp value={99.95} template="{n}%" /> → 99.95%
 */
export function CountUp({
  value,
  template = "{n}",
  duration = 1400,
  decimals = 0,
  className = "",
}: {
  value: number;
  /** Use `{n}` as the placeholder, e.g. "${n}B+" or "{n}%". */
  template?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const formatted =
    decimals === 0 ? Math.round(value).toLocaleString("en-US") : value.toFixed(decimals);
  const rendered = template.replace("{n}", formatted);
  return (
    <span
      className={className}
      data-rz-count={value}
      data-rz-count-tpl={template}
      data-rz-count-dec={decimals}
      data-rz-count-dur={duration}
    >
      {rendered}
    </span>
  );
}
