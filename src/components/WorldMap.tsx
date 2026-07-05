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

// ── Label collision avoidance ────────────────────────────────────────────
// Half the ten markets (PK/UAE/KSA/Iraq/Egypt, and separately Nepal/
// Bangladesh/Myanmar) sit in two tight geographic clusters, so a fixed
// offset per label overlapped badly (confirmed live 2026-07-06). Instead:
// try a ranked list of candidate positions around each pin and greedily
// take the first one that collides with nothing placed so far (falling
// back to the least-bad option if every candidate collides). Runs once at
// module load against the static generated coordinates — still zero
// client JS, this is server/build-time only.
const LABEL_FONT_SIZE = 1.35;
const CHAR_WIDTH = LABEL_FONT_SIZE * 0.62;
const LABEL_HEIGHT = LABEL_FONT_SIZE * 1.3;
const PIN_EXCLUSION = 0.9;

type Anchor = "start" | "middle" | "end";
type Box = { x1: number; y1: number; x2: number; y2: number };

const CANDIDATES: { dx: number; dy: number; anchor: Anchor }[] = [
  { dx: 1.2, dy: -0.6, anchor: "start" },
  { dx: -1.2, dy: -0.6, anchor: "end" },
  { dx: 0, dy: -1.7, anchor: "middle" },
  { dx: 0, dy: 2.5, anchor: "middle" },
  { dx: 1.3, dy: 1.7, anchor: "start" },
  { dx: -1.3, dy: 1.7, anchor: "end" },
  { dx: 1.9, dy: -1.7, anchor: "start" },
  { dx: -1.9, dy: -1.7, anchor: "end" },
  { dx: 2.7, dy: -0.6, anchor: "start" },
  { dx: -2.7, dy: -0.6, anchor: "end" },
  { dx: 0, dy: -3.3, anchor: "middle" },
  { dx: 0, dy: 4.1, anchor: "middle" },
];

function labelBox(px: number, py: number, text: string, dx: number, dy: number, anchor: Anchor) {
  const w = text.length * CHAR_WIDTH;
  const tx = px + dx;
  const ty = py + dy;
  const x1 = anchor === "start" ? tx : anchor === "end" ? tx - w : tx - w / 2;
  return {
    x1,
    y1: ty - LABEL_FONT_SIZE,
    x2: x1 + w,
    y2: ty - LABEL_FONT_SIZE + LABEL_HEIGHT,
    tx,
    ty,
  };
}

function intersects(a: Box, b: Box) {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

function layoutLabels(markerPins: typeof pins) {
  const placed: (Box & { anchor: Anchor })[] = [];
  const pinBoxes: Box[] = markerPins.map((p) => ({
    x1: p.x - PIN_EXCLUSION,
    y1: p.y - PIN_EXCLUSION,
    x2: p.x + PIN_EXCLUSION,
    y2: p.y + PIN_EXCLUSION,
  }));

  return markerPins.map((p) => {
    const first = CANDIDATES[0]!;
    let choice = {
      ...labelBox(p.x, p.y, p.name, first.dx, first.dy, first.anchor),
      anchor: first.anchor,
    };
    let fewestOverlaps = Infinity;

    for (const c of CANDIDATES) {
      const box = labelBox(p.x, p.y, p.name, c.dx, c.dy, c.anchor);
      const overlaps =
        placed.filter((b) => intersects(box, b)).length +
        pinBoxes.filter((b) => intersects(box, b)).length;
      if (overlaps < fewestOverlaps) {
        fewestOverlaps = overlaps;
        choice = { ...box, anchor: c.anchor };
        if (overlaps === 0) break;
      }
    }

    placed.push(choice);
    return { key: p.key, name: p.name, tx: choice.tx, ty: choice.ty, anchor: choice.anchor };
  });
}

const labelLayout = layoutLabels(pins);

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
          labelLayout.map((l) => (
            <text key={`t-${l.key}`} className="wm-label" x={l.tx} y={l.ty} textAnchor={l.anchor}>
              {l.name}
            </text>
          ))}
      </svg>
    </div>
  );
}
