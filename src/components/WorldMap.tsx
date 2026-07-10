import { worldMap } from "@/data/world-map.generated";
import { markets } from "@/data/markets";
import { CAREER } from "@/content/facts";

// Signature brand visual: a dotted world map with the ten operating markets
// lit and connection arcs drawn from the Dubai hub.
//
// SHIPS AS STATIC SVG — nothing hydrates, no client JS runs here. The living
// behaviour is 100% CSS (styles in src/styles/corridor-map.css) hung off the
// zero-hydration reveal engine in __root.tsx:
//   • On /journey (showLabels ⇒ `interactive`) the arcs DRAW from the Dubai
//     hub when the map's wrapper gets `.rz-in`, and a visitor can light a
//     single corridor — with hover OR keyboard — to read that market's lesson.
//   • The ten lesson cards are always in the DOM (crawlable + in the a11y
//     tree); CSS reveals the engaged one. Nothing is hidden behind JS.
//   • Reduced-motion / no-JS: arcs render fully drawn and static; identical
//     content, no dash animation.
// Only per-market rules (which depend on the market keys) are generated below
// as a tiny <style>; everything structural lives in corridor-map.css.
//
// The dot grid + projected coordinates come from src/data/world-map.generated.ts
// (built by scripts/gen-map.mjs from src/data/markets.ts); the per-market copy
// (city/years/brand/shipped/lesson/needsOwnerConfirm) comes from markets.ts and
// is rendered verbatim — no data, name, lesson or Nigeria handling is changed.

const { viewBox, dots, hub, pins } = worldMap;

const marketByKey = new Map(markets.map((m) => [m.key, m]));

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

// Per-market CSS. Everything structural is in corridor-map.css; only the rules
// that name a specific market key are generated here. Because this <style>
// renders in <body> (after the head stylesheet), the per-key "light" rules win
// the specificity tie against the generic "dim all" rule in corridor-map.css.
// Both `:hover` and `:focus-visible` are listed, so pointer and keyboard light
// a corridor identically — the whole moment works with zero JS.
const perKeyCss = pins
  .map((p) => {
    const k = p.key;
    return (
      `.wm-interactive:has(.wm-m-${k}:hover) .wm-arc-${k},` +
      `.wm-interactive:has(.wm-m-${k}:focus-visible) .wm-arc-${k}` +
      `{opacity:var(--wm-arc-lit);stroke-width:var(--wm-arc-w-lit);stroke:var(--signal-soft)}` +
      `.wm-interactive:has(.wm-m-${k}:hover) .wm-label-${k},` +
      `.wm-interactive:has(.wm-m-${k}:focus-visible) .wm-label-${k}` +
      `{fill:var(--signal-soft);stroke-width:.62px}` +
      `.wm-interactive:has(.wm-m-${k}:hover) .wm-card-${k},` +
      `.wm-interactive:has(.wm-m-${k}:focus-visible) .wm-card-${k}` +
      `{opacity:1;transform:none;pointer-events:auto}`
    );
  })
  .join("");

function LabelGroup({ layout, group }: { layout: typeof desktopLayout; group: string }) {
  return (
    <g className={group}>
      {layout.map((l) =>
        l.leader ? (
          <line
            key={`lead-${l.key}`}
            className={`wm-leader wm-leader-${l.key}`}
            x1={l.leader.x1}
            y1={l.leader.y1}
            x2={l.leader.x2}
            y2={l.leader.y2}
          />
        ) : null,
      )}
      {layout.map((l) => (
        <text
          key={`t-${l.key}`}
          className={`wm-label wm-label-${l.key}`}
          x={l.tx}
          y={l.ty}
          textAnchor={l.anchor}
        >
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
  // The labelled map is the /journey signature — that is where the corridor
  // interaction (focusable markets + lesson cards) belongs. The unlabelled map
  // (home strip) stays a decorative, non-interactive graphic: no extra tab
  // stops, no card stack, but it still gets the scroll-driven arc draw-in.
  const interactive = showLabels;

  return (
    <div className={`worldmap ${interactive ? "wm-interactive " : ""}${className}`} data-rz-reveal>
      {interactive && <style dangerouslySetInnerHTML={{ __html: perKeyCss }} />}
      <svg
        viewBox={viewBox}
        role={interactive ? "group" : "img"}
        aria-label={
          interactive
            ? `Operating map — ${CAREER.marketsWord} markets radiating from the Dubai hub. Focus a market to light its corridor and read the lesson it left.`
            : `World map highlighting ${CAREER.marketsWord} operating markets across MENA, South Asia and West Africa`
        }
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="wm-dots" dangerouslySetInnerHTML={{ __html: dots }} />

        {/* Arc layer (bottom): every corridor draws hub→pin. pathLength=1 so one
            dasharray value fits them all. --arc-i drives the draw stagger. */}
        <g className="wm-arcs">
          {pins.map((p, i) => (
            <path
              key={`arc-${p.key}`}
              className={`wm-arc wm-arc-${p.key}`}
              pathLength={1}
              d={arcPath(p.x, p.y)}
              style={{ "--arc-i": i } as React.CSSProperties}
            />
          ))}
        </g>

        {/* Marker layer (top): pins sit above all arcs. When interactive each
            group is a focusable button (real tabindex → keyboard reaches all
            ten) with an enlarged transparent hit target for the pointer. */}
        <g className="wm-marks">
          {pins.map((p, i) => {
            const m = marketByKey.get(p.key);
            const label = m ? `${m.name} — ${m.lesson}` : p.name;
            return (
              <g
                key={`mk-${p.key}`}
                className={`wm-market wm-m-${p.key}`}
                style={{ "--arc-i": i } as React.CSSProperties}
                {...(interactive
                  ? { tabIndex: 0, role: "button" as const, "aria-label": label }
                  : {})}
              >
                {interactive && (
                  <circle className="wm-hit-target" cx={p.x} cy={p.y} r={1.3} fill="transparent" />
                )}
                <circle className="wm-pin-halo" cx={p.x} cy={p.y} r={0.5} />
                {interactive && (
                  <circle className="wm-focusring" cx={p.x} cy={p.y} r={1.15} />
                )}
                <circle className="wm-pin" cx={p.x} cy={p.y} r={0.5} />
              </g>
            );
          })}
        </g>

        {showLabels && (
          <>
            <LabelGroup layout={desktopLayout} group="wm-labels-desktop" />
            <LabelGroup layout={mobileLayout} group="wm-labels-mobile" />
          </>
        )}
      </svg>

      {/* Lesson cards — all ten always in the DOM (crawlable + in the a11y
          tree; toggled by opacity only, never display/visibility/JS). CSS
          reveals the engaged market's card; the idle legend shows otherwise.
          The reserved min-height (corridor-map.css) keeps CLS at 0. */}
      {interactive && (
        <div className="wm-cards">
          <div className="wm-idle" aria-hidden="true">
            <span className="wm-idle-eyebrow">◆ {CAREER.marketsWordCap} corridors</span>
            <p className="wm-idle-text">
              Every arc is a market I shipped in, drawn from the Dubai hub.{" "}
              <b>Hover or tab to a market</b> to light its corridor and read the lesson it left.
            </p>
          </div>
          {markets.map((m) => (
            <article key={`card-${m.key}`} id={`wm-card-${m.key}`} className={`wm-card wm-card-${m.key}`}>
              <div className="wm-card-head">
                <h3 className="wm-card-name">{m.name}</h3>
                <span className="wm-card-meta">
                  {m.city} · {m.years}
                </span>
              </div>
              <div className="wm-card-brand">{m.brand}</div>
              <p className="wm-card-shipped">{m.shipped}</p>
              {m.needsOwnerConfirm && (
                <p>
                  <span className="wm-pending">◇ Detail pending</span>
                </p>
              )}
              <p className="wm-card-lesson">{m.lesson}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
