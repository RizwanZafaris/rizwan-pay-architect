import type { CSSProperties } from "react";

// JS-less port of kokonutd's "Background Paths" (npx @21st-dev/cli add
// kokonutd/background-paths). The original renders two mirrored fields of 36
// generative S-curve strokes and animates each path's pathLength + pathOffset
// with framer-motion. This site strips hydration, so instead each stroke
// carries a normalised dash (pathLength=1) that travels along the curve via a
// CSS stroke-dashoffset loop — a seamless flow with no JS. Per-path duration
// and delay desync the field so it never visibly repeats.
//
// Brand, not default: colour is inherited (currentColor) and set by the
// wrapper to var(--brand); opacity stays low on purpose — this is a texture
// behind content, never a focal point. Fully static under prefers-reduced-
// motion, and aria-hidden (decorative).

function field(position: number) {
  return Array.from({ length: 36 }, (_, i) => ({
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    // Faint at the front, a touch stronger with depth — capped low for paper.
    opacity: 0.05 + i * 0.016,
    // Soft positive stagger so the strokes draw in as one gentle sweep when
    // the closing band scrolls into view (see .bg-paths draw-in in styles.css),
    // instead of the old infinite marching-dash loop that read as busy.
    dur: 2 + (i % 5) * 0.3,
    delay: (i % 12) * 0.05,
  }));
}

export function BackgroundPaths({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-paths ${className}`} aria-hidden>
      {[1, -1].map((position) => (
        <svg
          key={position}
          className="bg-paths-svg"
          viewBox="0 0 696 316"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {field(position).map((p, i) => (
            <path
              key={i}
              d={p.d}
              stroke="currentColor"
              strokeWidth={p.width}
              strokeOpacity={p.opacity}
              pathLength={1}
              className="bg-paths-line"
              style={{ ["--dur"]: `${p.dur}s`, ["--delay"]: `${p.delay}s` } as CSSProperties}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
