import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal — fades + translates a child into view when it scrolls into the
 * viewport. Uses IntersectionObserver (no scroll-event listener), respects
 * prefers-reduced-motion, fires once per element.
 *
 * Magazine-grade pacing: short distance (16px), long easing (700ms ease-out-quart).
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Honour reduced-motion: show immediately, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Render via React.createElement so polymorphic tag stays typed.
  const Tag = Component as unknown as "div";
  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
