import { useEffect, useRef, useState } from "react";

/**
 * CountUp — counts a number up from 0 to {value} over {duration}ms when the
 * element scrolls into view. Magazine-style ease-out-quart curve so the last
 * 20% slows beautifully.
 *
 * SSR-safe: the initial render and hydration both produce the FINAL value.
 * Crawlers and pre-hydration users see the real number, not "0". Only after
 * the client hydrates do we reset to 0 and animate up, and only for elements
 * that start BELOW the fold. Above-the-fold elements (e.g. the hero H1) keep
 * showing the final value without a flash.
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
  // Seed with the final value so the SSR HTML (and the matching first client
  // render) shows the real number. Crawlers must never see "0".
  const [current, setCurrent] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    // Reduced motion: stay at value, never animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startedRef.current = true;
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Above-the-fold check: if the element is already in the viewport at
    // hydration, skip the animation entirely. The user has already seen the
    // real number; resetting to 0 and counting back up would just flash.
    const rect = el.getBoundingClientRect();
    const initiallyVisible =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth;
    if (initiallyVisible) {
      startedRef.current = true;
      return;
    }

    // Below the fold: reset to 0, then animate up the first time the element
    // crosses the viewport.
    setCurrent(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
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
  }, [value, duration]);

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
