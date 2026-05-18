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

    // Synchronous in-viewport check on mount.
    // IntersectionObserver does fire its initial callback when observe() is
    // called, but that callback is async and may not flush in time when the
    // user lands mid-page (refresh + scroll restore, deep anchor link, or
    // programmatic scroll). Without this, Reveal-wrapped sections below the
    // initial fold can stay stuck at opacity:0 indefinitely.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const initiallyInView = rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
    if (initiallyInView) {
      setVisible(true);
      return;
    }

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

    // Belt-and-braces fallback: if the observer hasn't fired after 2s
    // (e.g. fast scroll fling, edge-case browser), force-reveal so content
    // never stays invisible. Cheap and idempotent.
    const fallback = window.setTimeout(() => setVisible(true), 2000);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
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
