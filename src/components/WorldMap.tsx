import { worldMap } from "@/data/world-map.generated";
import { CAREER } from "@/content/facts";

// Signature brand visual: a dotted world map with the ten operating markets
// lit and connection arcs drawn from the Dubai hub. SHIPS AS STATIC SVG — no
// client JS, nothing hydrates. Only the arcs (stroke-dashoffset draw-in) and
// pins (pulse) animate, both pure CSS, both gated on prefers-reduced-motion.
//
// The dot grid + projected coordinates come from src/data/world-map.generated.ts
// (built by scripts/gen-map.mjs from src/data/markets.ts).

const { viewBox, dots, hub, pins } = worldMap;

// Map-only display names. "United Arab Emirates" is so long it dominated the
// tight MENA cluster (QA 2026-07-06); the map shows the universally-read
// short form while every other surface (market cards, schema) keeps the full
// name from src/data/markets.ts.
const MAP_DISPLAY_NAME: Record<string, string> = {
  "United Arab Emirates": "UAE",
};

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
//
// QA follow-up (same day): the single 1.35px layout rendered ~8.5px labels
// at 375px viewports (illegible) and label→pin association was ambiguous in
// the MENA cluster. Now: TWO layouts are computed at build time — a desktop
// layout (1.35px) and a mobile layout (2.2px with wider offsets) — and a CSS
// media query shows exactly one. Every label placed away from its pin gets a
// LEADER LINE from the pin edge to the text, and label text carries a paper
// halo (paint-order: stroke) so it stays legible over the dot grid and arcs.
const PIN_EXCLUSION = 0.9;

type Anchor = "start" | "middle" | "end";
type Box = { x1: number; y1: number; x2: number; y2: number };
type Candidate = { dx: number; dy: number; anchor: Anchor };

// Candidate rings, nearest first. `scale` multiplies the offsets so the
// mobile layout (larger text) naturally searches a wider ring.
function candidateRing(scale: number): Candidate[] {
  const base: Candidate[] = [
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
    // Far ring — used by the dense MENA cluster; a leader line bridges the
    // distance so association survives the offset.
    { dx: 3.8, dy: -2.2, anchor: "start" },
    { dx: -3.8, dy: -2.2, anchor: "end" },
    { dx: 4.4, dy: 0.8, anchor: "start" },
    { dx: -4.4, dy: 0.8, anchor: "end" },
    { dx: 0, dy: -4.6, anchor: "middle" },
    { dx: 0, dy: 5.4, anchor: "middle" },
  ];
  return base.map((c) => ({ ...c, dx: c.dx * scale, dy: c.dy * scale }));
}

type LayoutParams = { fontSize: number; scale: number };

function layoutLabels(markerPins: typeof pins, { fontSize, scale }: LayoutParams) {
  const charWidth = fontSize * 0.62;
  const labelHeight = fontSize * 1.3;
  const candidates = candidateRing(scale);
  const placed: Box[] = [];
  const pinBoxes: Box[] = markerPins.map((p) => ({
    x1: p.x - PIN_EXCLUSION,
    y1: p.y - PIN_EXCLUSION,
    x2: p.x + PIN_EXCLUSION,
    y2: p.y + PIN_EXCLUSION,
  }));

  const labelBox = (px: number, py: number, text: string, c: Candidate) => {
    const w = text.length * charWidth;
    const tx = px + c.dx;
    const ty = py + c.dy;
    const x1 = c.anchor === "start" ? tx : c.anchor === "end" ? tx - w : tx - w / 2;
    return { x1, y1: ty - fontSize, x2: x1 + w, y2: ty - fontSize + labelHeight, tx, ty };
  };

  return markerPins.map((p) => {
    const name = MAP_DISPLAY_NAME[p.name] ?? p.name;
    const first = candidates[0]!;
    let choice = { ...labelBox(p.x, p.y, name, first), anchor: first.anchor };
    let fewestOverlaps = Infinity;

    for (const c of candidates) {
      const box = labelBox(p.x, p.y, name, c);
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

    // Leader line: from just outside the pin toward the near edge of the
    // text. Only drawn when the label sits far enough away that association
    // needs the visual bridge (QA: Egypt/UAE/KSA/Pakistan were ambiguous).
    const nearX =
      choice.anchor === "start"
        ? choice.tx
        : choice.anchor === "end"
          ? choice.tx
          : (choice.x1 + choice.x2) / 2;
    const nearY = choice.ty - fontSize * 0.38; // optical middle of the text
    const dist = Math.hypot(nearX - p.x, nearY - p.y);
    let leader: { x1: number; y1: number; x2: number; y2: number } | null = null;
    if (dist > 1.35 * scale) {
      const ux = (nearX - p.x) / dist;
      const uy = (nearY - p.y) / dist;
      leader = {
        x1: p.x + ux * 0.65, // start just outside the pin + halo
        y1: p.y + uy * 0.65,
        x2: nearX - ux * (fontSize * 0.45), // stop short of the text
        y2: nearY - uy * (fontSize * 0.45),
      };
    }

    return { key: p.key, name, tx: choice.tx, ty: choice.ty, anchor: choice.anchor, leader };
  });
}

function intersects(a: Box, b: Box) {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

// Two build-time layouts: desktop (compact) and mobile (larger type, wider
// ring). A media query shows exactly one — no JS, no reflow.
const desktopLayout = layoutLabels(pins, { fontSize: 1.35, scale: 1 });
const mobileLayout = layoutLabels(pins, { fontSize: 2.2, scale: 1.7 });

const css = `
.worldmap { --dot: color-mix(in oklab, var(--ink) 16%, transparent); }
.worldmap .wm-dots { fill: var(--dot); }
.worldmap .wm-arc {
  fill: none; stroke: var(--signal); stroke-width: .45; opacity: .55;
  stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1;
}
.worldmap .wm-pin { fill: var(--signal); }
.worldmap .wm-pin-halo { fill: var(--signal); opacity: .5; transform-box: fill-box; transform-origin: center; }
.worldmap .wm-label {
  fill: var(--ink-soft); letter-spacing: .04px;
  /* Paper halo: keeps the text legible when it crosses the dot grid or an
     arc stroke (paint-order is SVG-safe in all evergreen browsers). */
  paint-order: stroke fill;
  stroke: var(--paper); stroke-width: .55px; stroke-linejoin: round;
}
.worldmap .wm-labels-desktop .wm-label { font-size: 1.35px; }
.worldmap .wm-labels-mobile .wm-label { font-size: 2.2px; }
.worldmap .wm-leader {
  stroke: color-mix(in oklab, var(--ink) 34%, transparent);
  stroke-width: .14; fill: none;
}
.worldmap .wm-labels-mobile { display: none; }
@media (max-width: 640px) {
  .worldmap .wm-labels-desktop { display: none; }
  .worldmap .wm-labels-mobile { display: block; }
}
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

function LabelGroup({ layout, group }: { layout: typeof desktopLayout; group: string }) {
  return (
    <g className={group}>
      {layout.map((l) =>
        l.leader ? (
          <line
            key={`lead-${l.key}`}
            className="wm-leader"
            x1={l.leader.x1}
            y1={l.leader.y1}
            x2={l.leader.x2}
            y2={l.leader.y2}
          />
        ) : null,
      )}
      {layout.map((l) => (
        <text key={`t-${l.key}`} className="wm-label" x={l.tx} y={l.ty} textAnchor={l.anchor}>
          {l.name}
        </text>
      ))}
    </g>
  );
}

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
        aria-label={`World map highlighting ${CAREER.marketsWord} operating markets across MENA, South Asia and West Africa`}
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
        {showLabels && (
          <>
            <LabelGroup layout={desktopLayout} group="wm-labels-desktop" />
            <LabelGroup layout={mobileLayout} group="wm-labels-mobile" />
          </>
        )}
      </svg>
    </div>
  );
}
