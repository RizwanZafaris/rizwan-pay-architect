import { useEffect, useRef, useState } from "react";

/**
 * CountUp — counts a number up from 0 to {value} over {duration}ms when the
 * element scrolls into view. Magazine-style ease-out-quart curve so the last
 * 20% slows beautifully.
 *
 * Designed to wrap KPI tiles where the surrounding label/prefix/suffix is
 * static markup. Pass either:
 *   - a number (renders as locale-formatted integer)
 *   - a string template with `{n}` (e.g. "${n}B+") so the prefix/suffix sit
 *     in the same render flow as the animating number — keeps line-break,
 *     baseline and kerning identical to the static rendered value.
 *
 * Respects prefers-reduced-motion (renders final value, no animation).
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
  const ref = useRef<HTMLSpanElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Reduced motion: snap to final value, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);
              // ease-out-quart
              const eased = 1 - Math.pow(1 - t, 4);
              setCurrent(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setCurrent(value);
            };
            requestAnimationFrame(tick);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, started]);

  // Format: locale-formatted with the requested decimals.
  const formatted =
    decimals === 0 ? Math.round(current).toLocaleString("en-US") : current.toFixed(decimals);
  const rendered = template.replace("{n}", formatted);

  return (
    <span ref={ref} className={className}>
      {rendered}
    </span>
  );
}
