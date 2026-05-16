/**
 * Editorial product diagrams for case studies, blog posts and the home page.
 * Pure SVG, SSR-safe, themed via CSS variables (ink, ink-soft, rule, accent-emerald, surface, surface-2).
 */
import * as React from "react";

type FigureProps = {
  title: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
};

export function DiagramFigure({ title, caption, children, className = "" }: FigureProps) {
  return (
    <figure
      className={`my-10 rounded-2xl border border-rule bg-surface-2/50 px-4 sm:px-6 py-6 ${className}`}
    >
      <figcaption className="mb-4 flex items-baseline justify-between gap-4">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
          ◆ Diagram
        </span>
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          fig.
        </span>
      </figcaption>
      <div className="font-instrument text-xl text-ink leading-snug mb-5">{title}</div>
      <div className="w-full overflow-x-auto">{children}</div>
      {caption ? (
        <p className="mt-5 text-xs text-ink-soft font-mono-tech tracking-wide leading-relaxed">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

/* ───────── Shared SVG primitives ───────── */

const INK = "var(--ink)";
const SOFT = "var(--ink-soft)";
const RULE = "var(--rule)";
const SURFACE = "var(--surface)";
const EMERALD = "var(--accent-emerald)";

function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
  emphasis = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
  emphasis?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={emphasis ? INK : SURFACE}
        stroke={accent ? EMERALD : RULE}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fill={emphasis ? "var(--surface)" : INK}
        fontWeight={600}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize={9.5}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill={emphasis ? "var(--surface)" : SOFT}
          letterSpacing="0.04em"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={SOFT}
      strokeWidth={1}
      strokeDasharray={dashed ? "3 3" : undefined}
      markerEnd="url(#arrow)"
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill={SOFT} />
      </marker>
    </defs>
  );
}

function ColumnLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={9.5}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      fill={EMERALD}
      letterSpacing="0.22em"
      fontWeight={600}
    >
      {text.toUpperCase()}
    </text>
  );
}

/* ───────── 1. RailsMap ───────── */

export function RailsMapDiagram() {
  const W = 880;
  const H = 460;
  const rails = [
    { label: "Cards", sub: "MPGS · MDES" },
    { label: "Wallets", sub: "JazzCash · Easypaisa" },
    { label: "DCB", sub: "Direct carrier billing" },
    { label: "IBFT", sub: "1Link · NIFT" },
    { label: "Bank transfers", sub: "RTGS · ACH" },
    { label: "Cross-border", sub: "DLocal · Thunes · Boku · Coda" },
  ];
  const railX = 20;
  const railW = 200;
  const railH = 44;
  const railGap = 18;
  const railTop = 60;

  const hubX = 320;
  const hubW = 220;

  const outputX = 660;
  const outputW = 200;
  const outputs = [
    { label: "Merchants", sub: "Console · Webhooks" },
    { label: "Finance", sub: "T+0 / T+1 settlement" },
    { label: "Regulator", sub: "Reporting pipeline" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Multi-rail payments architecture">
      <Defs />
      <ColumnLabel x={railX} y={40} text="Rails" />
      <ColumnLabel x={hubX} y={40} text="Unified platform" />
      <ColumnLabel x={outputX} y={40} text="Consumers" />

      {rails.map((r, i) => (
        <Node
          key={r.label}
          x={railX}
          y={railTop + i * (railH + railGap)}
          w={railW}
          h={railH}
          label={r.label}
          sub={r.sub}
        />
      ))}

      {/* Hub stack: API → Routing → Risk → Ledger */}
      <Node x={hubX} y={80} w={hubW} h={56} label="Unified API" sub="Pay-in · Payout" emphasis />
      <Node x={hubX} y={156} w={hubW} h={48} label="Routing engine" sub="Cost · success · health" accent />
      <Node x={hubX} y={222} w={hubW} h={48} label="Risk service" sub="Pre-auth · post-auth · async" />
      <Node x={hubX} y={288} w={hubW} h={48} label="Canonical ledger" sub="Double-entry · idempotent" />
      <Node x={hubX} y={354} w={hubW} h={48} label="Settlement engine" sub="Multi-rail · corridor-aware" />

      {/* Lines: each rail → hub API */}
      {rails.map((_, i) => {
        const y = railTop + i * (railH + railGap) + railH / 2;
        return <Arrow key={i} x1={railX + railW} y1={y} x2={hubX - 4} y2={108} />;
      })}

      {/* Vertical hub flow arrows */}
      <Arrow x1={hubX + hubW / 2} y1={136} x2={hubX + hubW / 2} y2={154} />
      <Arrow x1={hubX + hubW / 2} y1={204} x2={hubX + hubW / 2} y2={220} />
      <Arrow x1={hubX + hubW / 2} y1={270} x2={hubX + hubW / 2} y2={286} />
      <Arrow x1={hubX + hubW / 2} y1={336} x2={hubX + hubW / 2} y2={352} />

      {/* Outputs */}
      {outputs.map((o, i) => (
        <Node
          key={o.label}
          x={outputX}
          y={120 + i * 90}
          w={outputW}
          h={56}
          label={o.label}
          sub={o.sub}
        />
      ))}

      {/* Hub → outputs */}
      <Arrow x1={hubX + hubW} y1={108} x2={outputX - 4} y2={148} />
      <Arrow x1={hubX + hubW} y1={378} x2={outputX - 4} y2={238} />
      <Arrow x1={hubX + hubW} y1={312} x2={outputX - 4} y2={328} />
    </svg>
  );
}

/* ───────── 2. Reconciliation Flow ───────── */

export function ReconciliationFlowDiagram() {
  const W = 880;
  const H = 380;
  const laneX = 20;
  const laneW = 200;
  const laneH = 56;
  const laneGap = 38;
  const lanes = [
    { y: 70, label: "Rail / PSP", sub: "Authorization events" },
    { y: 70 + (laneH + laneGap), label: "Internal ledger", sub: "Double-entry postings" },
    { y: 70 + 2 * (laneH + laneGap), label: "Bank statements", sub: "Settlement files · MT940" },
  ];

  const engineX = 360;
  const engineW = 220;
  const engineY = lanes[1].y;

  const outX = 660;
  const outW = 200;
  const outs = [
    { y: 70, label: "Matched", sub: "Closed automatically", accent: true },
    { y: 70 + (laneH + laneGap), label: "Exceptions", sub: "Typed · routed · SLA-tracked" },
    { y: 70 + 2 * (laneH + laneGap), label: "Product loop", sub: "Defects → backlog" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Three-way reconciliation flow">
      <Defs />
      <ColumnLabel x={laneX} y={40} text="Sources" />
      <ColumnLabel x={engineX} y={40} text="Reconciliation" />
      <ColumnLabel x={outX} y={40} text="Outcomes" />

      {lanes.map((l) => (
        <Node key={l.label} x={laneX} y={l.y} w={laneW} h={laneH} label={l.label} sub={l.sub} />
      ))}

      <Node
        x={engineX}
        y={engineY}
        w={engineW}
        h={laneH}
        label="Reconciliation engine"
        sub="3-way match · break taxonomy"
        emphasis
      />

      {/* sources → engine */}
      {lanes.map((l, i) => (
        <Arrow key={i} x1={laneX + laneW} y1={l.y + laneH / 2} x2={engineX - 4} y2={engineY + laneH / 2} />
      ))}

      {outs.map((o) => (
        <Node
          key={o.label}
          x={outX}
          y={o.y}
          w={outW}
          h={laneH}
          label={o.label}
          sub={o.sub}
          accent={o.accent}
        />
      ))}

      {/* engine → outcomes */}
      {outs.map((o, i) => (
        <Arrow key={i} x1={engineX + engineW} y1={engineY + laneH / 2} x2={outX - 4} y2={o.y + laneH / 2} />
      ))}

      {/* feedback loop: product loop → ledger */}
      <path
        d={`M ${outX + outW / 2} ${outs[2].y + laneH} V ${H - 20} H ${laneX + laneW / 2} V ${lanes[1].y + laneH}`}
        fill="none"
        stroke={SOFT}
        strokeWidth={1}
        strokeDasharray="3 3"
        markerEnd="url(#arrow)"
      />
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fontSize={9.5}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fill={SOFT}
        letterSpacing="0.18em"
      >
        FEEDBACK · DEFECTS BECOME LEDGER + PRODUCT FIXES
      </text>
    </svg>
  );
}

/* ───────── 3. Onboarding Flow ───────── */

export function OnboardingFlowDiagram() {
  const W = 880;
  const H = 360;
  const y = 110;
  const h = 60;
  const steps = [
    { x: 20, w: 140, label: "Applicant", sub: "Merchant / partner" },
    { x: 180, w: 160, label: "KYC / KYB", sub: "Capture · OCR · liveness" },
    { x: 360, w: 160, label: "Screening", sub: "Sanctions · PEP · AML" },
    { x: 540, w: 150, label: "Risk tiering", sub: "Policy engine" },
  ];

  const decX = 720;
  const decW = 140;
  const decisions = [
    { y: 40, label: "Auto-approve", sub: "Low risk", accent: true },
    { y: 130, label: "Manual review", sub: "Mid risk" },
    { y: 220, label: "Reject", sub: "High risk · sanctions" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Merchant onboarding and risk decision pipeline">
      <Defs />
      <ColumnLabel x={20} y={40} text="Pipeline" />
      <ColumnLabel x={decX} y={20} text="Decision" />

      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          <Node
            x={s.x}
            y={y}
            w={s.w}
            h={h}
            label={s.label}
            sub={s.sub}
            emphasis={i === steps.length - 1}
          />
          {i < steps.length - 1 ? (
            <Arrow x1={s.x + s.w} y1={y + h / 2} x2={steps[i + 1].x - 4} y2={y + h / 2} />
          ) : null}
        </React.Fragment>
      ))}

      {decisions.map((d) => (
        <Node key={d.label} x={decX} y={d.y} w={decW} h={50} label={d.label} sub={d.sub} accent={d.accent} />
      ))}

      {/* Risk tiering → decisions */}
      {decisions.map((d, i) => (
        <Arrow
          key={i}
          x1={steps[3].x + steps[3].w}
          y1={y + h / 2}
          x2={decX - 4}
          y2={d.y + 25}
        />
      ))}

      {/* Activation + monitoring loop */}
      <Node x={300} y={260} w={200} h={50} label="Activation" sub="Limits · capabilities" />
      <Arrow x1={decX + decW / 2} y1={90} x2={500} y2={285} dashed />
      <Node x={540} y={260} w={180} h={50} label="Ongoing monitoring" sub="Behavior · velocity · AML" />
      <Arrow x1={500} y1={285} x2={540} y2={285} />
      <path
        d={`M 540 285 V 330 H 440 V 320`}
        fill="none"
        stroke={SOFT}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text
        x={300}
        y={345}
        fontSize={9.5}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fill={SOFT}
        letterSpacing="0.18em"
      >
        MONITORING SIGNAL → RISK POLICY RETUNE
      </text>
    </svg>
  );
}

/* ───────── Slug → diagram registry ───────── */

type DiagramEntry = { component: React.FC; title: string; caption: string };

export const caseStudyDiagrams: Record<string, DiagramEntry> = {
  "simpaisa-payment-infrastructure": {
    component: RailsMapDiagram,
    title: "One regulated rail — many partners, one API contract.",
    caption:
      "Cards, wallets, DCB, IBFT, bank transfers and cross-border corridors converge behind a single pay-in/payout API. Routing, risk, ledger and settlement run as shared services — not per-integration code.",
  },
  "cross-border-corridors-fx": {
    component: RailsMapDiagram,
    title: "Corridors as a product, not a partner integration.",
    caption:
      "Each rail is wrapped behind the same contract; corridor routing chooses on cost, success rate and partner health. FX, sanctions and reporting are platform concerns, not corridor-specific glue.",
  },
  "settlement-reconciliation": {
    component: ReconciliationFlowDiagram,
    title: "Three-way reconciliation with a typed break taxonomy.",
    caption:
      "Rail events, internal ledger and bank statements are matched continuously. Exceptions are typed and routed; the defect stream feeds product backlog so the same break never recurs.",
  },
  "merchant-onboarding-kyc": {
    component: OnboardingFlowDiagram,
    title: "Onboarding and risk as one product surface.",
    caption:
      "Capture, screening, tiering and decisioning share one policy engine. Activation grants capabilities; monitoring feeds back into the same policy — so risk and conversion move together.",
  },
};

export const postDiagrams: Record<string, DiagramEntry> = {
  "settlement-reconciliation-not-back-office": {
    component: ReconciliationFlowDiagram,
    title: "What the back office looks like when product owns it.",
    caption:
      "Three sources, one engine, typed exceptions, a feedback loop. Once this exists, spreadsheets disappear — the product absorbed the work.",
  },
  "kyc-risk-conversion-designed-together": {
    component: OnboardingFlowDiagram,
    title: "Onboarding, screening and risk as one surface.",
    caption:
      "Splitting these creates leakage. Unified, the same policy decides activation and tiering — conversion and risk move on one dial.",
  },
  "payment-infrastructure-product-problem": {
    component: RailsMapDiagram,
    title: "Infrastructure that was designed, not assembled.",
    caption:
      "Every rail behind one contract. Routing, risk, ledger and settlement are platform services. This is what 'product ownership of infrastructure' actually means.",
  },
};
