import { worldMap } from "@/data/world-map.generated";

// Signature brand visual: a dotted world map with the ten operating markets
// lit and connection arcs drawn from the Dubai hub. SHIPS AS STATIC SVG — no
// client JS, nothing hydrates. Only the arcs (stroke-dashoffset draw-in) and
// pins (pulse) animate, both pure CSS, both gated on prefers-reduced-motion.
//
// The dot grid + projected coordinates come from src/data/world-map.generated.ts
// (built by scripts/gen-map.mjs from src/data/markets.ts).

const { viewBox, dots, hub, pins } = worldMap;

// Quadratic-bezier arc from the hub to a market pin, control point lifted
// above the higher of the two points so arcs bow outward like flight paths.
function arcPath(px: number, py: number) {
  const mx = (hub.x + px) / 2;
  const my = (hub.y + py) / 2;
  const dist = Math.hypot(px - hub.x, py - hub.y);
  const cy = Math.min(hub.y, py, my) - dist * 0.28;
  return `M ${hub.x} ${hub.y} Q ${mx} ${cy} ${px} ${py}`;
}

const css = `
.worldmap { --dot: color-mix(in oklab, var(--ink) 16%, transparent); }
.worldmap .wm-dots { fill: var(--dot); }
.worldmap .wm-arc {
  fill: none; stroke: var(--signal); stroke-width: .45; opacity: .55;
  stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1;
}
.worldmap .wm-pin { fill: var(--signal); }
.worldmap .wm-pin-halo { fill: var(--signal); opacity: .5; transform-box: fill-box; transform-origin: center; }
.worldmap .wm-label { fill: var(--ink-soft); font-size: 1.35px; letter-spacing: .04px; }
@media (prefers-reduced-motion: no-preference) {
  .worldmap .wm-arc { animation: wm-draw 1.5s cubic-bezier(.4,0,.2,1) forwards; }
  .worldmap .wm-pin-halo { animation: wm-pulse 2.6s ease-out infinite; }
  ${pins.map((_, i) => `.worldmap .wm-arc:nth-of-type(${i + 1}){animation-delay:${0.12 * i}s}`).join("")}
  ${pins.map((_, i) => `.worldmap .wm-pin-halo:nth-of-type(${i + 1}){animation-delay:${0.12 * i}s}`).join("")}
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .worldmap .wm-arc { animation-timeline: view(); animation-range: entry 15% entry 70%; }
  }
}
@keyframes wm-draw { to { stroke-dashoffset: 0 } }
@keyframes wm-pulse { 0% { transform: scale(1); opacity: .5 } 100% { transform: scale(3.4); opacity: 0 } }
`;

export function WorldMap({
  showLabels = false,
  className = "",
}: {
  showLabels?: boolean;
  className?: string;
}) {
  return (
    <div className={`worldmap ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg
        viewBox={viewBox}
        role="img"
        aria-label="World map highlighting ten operating markets across MENA, South Asia and West Africa"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="wm-dots" dangerouslySetInnerHTML={{ __html: dots }} />
        {/* Arcs first so pins render on top. */}
        {pins.map((p) => (
          <path key={`arc-${p.key}`} className="wm-arc" pathLength={1} d={arcPath(p.x, p.y)} />
        ))}
        {/* Pulsing halos. */}
        {pins.map((p) => (
          <circle key={`halo-${p.key}`} className="wm-pin-halo" cx={p.x} cy={p.y} r={0.5} />
        ))}
        {/* Solid pins. */}
        {pins.map((p) => (
          <circle key={`pin-${p.key}`} className="wm-pin" cx={p.x} cy={p.y} r={0.5} />
        ))}
        {showLabels &&
          pins.map((p) => (
            <text key={`t-${p.key}`} className="wm-label" x={p.x + 1} y={p.y - 0.8}>
              {p.name}
            </text>
          ))}
      </svg>
    </div>
  );
}
