import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal — fades + lifts a child into view on scroll. Pure markup: it only
 * emits `data-rz-reveal` + a stagger delay. The actual motion is driven by a
 * single inline IntersectionObserver script (rzRevealScript in __root.tsx),
 * so it works on the zero-hydration static build in EVERY browser, not just
 * Chromium scroll-timeline. Progressive enhancement:
 *   - No JS / reduced-motion: the element renders fully visible (the `.rz-js`
 *     gate in styles.css never applies the hidden state), so content is never
 *     stranded invisible.
 *   - JS present: the observer adds `.rz-in` when the element enters view.
 *
 * `delay` staggers siblings (ms) via the --rz-delay custom property.
 *
 * Usage:
 *   <Reveal><h2>Section header</h2></Reveal>
 *   <Reveal delay={120}><p>Body that follows</p></Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  as: Component = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const Tag = Component as unknown as "div";
  const style = delay ? ({ "--rz-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag data-rz-reveal className={className} style={style}>
      {children}
    </Tag>
  );
}
