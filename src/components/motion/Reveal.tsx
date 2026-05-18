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
  // CRITICAL: default to `true` so the prerendered HTML is always visible.
  // The Hostinger static deploy ships zero client JS bundles (only GTM + the
  // JSON-LD scripts) — React never hydrates there, so any opacity-0 initial
  // state would freeze the content invisible forever. Default-visible means:
  //   - Static-HTML viewers always see the content (no JS dependency).
  //   - If hydration ever runs (Lovable, dev server, future SPA host), the
  //     useEffect below temporarily flips visibility off and back on to play
  //     the fade-up animation. That's a progressive enhancement, not a gate.
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydration has happened — we can now play the animation if appropriate.
    setHydrated(true);

    // Honour reduced-motion: stay visible, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    // If the element is already in viewport at hydration time, don't animate
    // — the user already saw it. Animating would be a distracting flash.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const initiallyInView = rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
    if (initiallyInView) return;

    // Below the fold — hide, then animate up on intersection.
    setVisible(false);
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

    // Fallback: if observer never fires (rare browser edge cases, scroll
    // restore quirks), force-reveal after 2s so content can never get stuck.
    const fallback = window.setTimeout(() => setVisible(true), 2000);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // Pre-hydration: render fully visible with no transition.
  // Post-hydration: apply transition + below-fold-hide-and-animate-in.
  const style: React.CSSProperties = hydrated
    ? {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform",
      }
    : {};

  // Render via React.createElement so polymorphic tag stays typed.
  const Tag = Component as unknown as "div";
  return (
    <Tag ref={ref as unknown as React.Ref<HTMLDivElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}
