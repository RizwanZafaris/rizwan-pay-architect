import { Link } from "@tanstack/react-router";
import { CAREER, DARAZ, PLATFORM, TEAM } from "@/content/facts";
import { profile } from "@/data/profile";
import { publishedPosts } from "@/data/posts";
import portraitPng from "@/assets/rizwan-zafar-cutout.png";
import portraitWebp from "@/assets/rizwan-zafar-cutout.webp";
import portraitWebpSmall from "@/assets/rizwan-zafar-cutout-460.webp";

const essays = [
  "cross-border-corridors-are-operating-systems",
  "payment-cost-50-to-1",
  "financial-controls-are-product-requirements",
]
  .map((slug) => publishedPosts.find((post) => post.slug === slug))
  .filter((post): post is NonNullable<typeof post> => Boolean(post));

const relationshipGroups = [
  {
    label: "Merchants & platforms",
    story: {
      label: "Enterprise reach",
      title: "Global platforms, locally connected.",
      body: "A regulated local-infrastructure layer for enterprise collection and disbursement where market access is fragmented.",
    },
    items: [
      ["ByteDance", "/partners/simpaisa/bytedance.svg", 168],
      ["Samsung", "/partners/simpaisa/samsung.svg", 190],
      ["SHEIN", "/partners/simpaisa/shein.svg", 136],
      ["Codashop", "/partners/simpaisa/codashop.svg", 149],
      ["myco", "/partners/simpaisa/myco.svg", 70],
    ],
  },
  {
    label: "Payment & network collaborators",
    story: {
      label: "Network depth",
      title: "Many networks. One product surface.",
      body: "Local rails and global payment collaborators brought into one acceptance, payout and cross-border operating model.",
    },
    items: [
      ["Tazapay", "/partners/simpaisa/tazapay.svg", 128],
      ["Thunes", "/partners/simpaisa/thunes.svg", 134],
      ["Boku", "/partners/simpaisa/boku.svg", 113],
      ["dLocal", "/partners/simpaisa/dlocal.svg", 127],
      ["TangoPay", "/partners/simpaisa/tangopay.svg", 103],
    ],
  },
] as const;

const corridorRuntime = String.raw`(() => {
  const root = document.querySelector('[data-corridor-home]');
  if (!root || root.dataset.bound === 'true') return;
  root.dataset.bound = 'true';

  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const canObserve = 'IntersectionObserver' in window;
  const observers = [];
  const controller = 'AbortController' in window ? new AbortController() : null;
  const listen = (target, type, handler, options = {}) => {
    target.addEventListener(type, handler, controller ? { ...options, signal: controller.signal } : options);
  };

  html.classList.add('corridor-home-active');

  const cleanup = () => {
    observers.forEach((observer) => observer.disconnect());
    if (controller) controller.abort();
    html.classList.remove(
      'corridor-home-active',
      'corridor-close-near',
      'corridor-pulses-started',
      'corridor-pulses-paused'
    );
  };

  if ('MutationObserver' in window && document.body) {
    const lifecycle = new MutationObserver(() => {
      if (root.isConnected) return;
      lifecycle.disconnect();
      cleanup();
    });
    lifecycle.observe(document.body, { childList: true, subtree: true });
  }

  if (!reduce && canObserve) {
    try {
      root.classList.add('corridor-motion');

      const scenes = root.querySelectorAll('[data-corridor-scene]');
      scenes.forEach((scene) => {
        scene.querySelectorAll('[data-corridor-reveal]').forEach((node, index) => {
          node.style.setProperty('--corridor-delay', Math.min(index * 50, 250) + 'ms');
        });
      });

      const sceneObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-entered');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
      scenes.forEach((scene) => sceneObserver.observe(scene));
      observers.push(sceneObserver);

      const focalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-focal-active');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '-10% 0px -20% 0px', threshold: 0.15 });
      root.querySelectorAll('[data-corridor-focal]').forEach((node) => focalObserver.observe(node));
      observers.push(focalObserver);

      const handoffObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-handoff-active');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
      root.querySelectorAll('[data-corridor-handoff]').forEach((node) => handoffObserver.observe(node));
      observers.push(handoffObserver);

      const hero = root.querySelector('.corridor-hero');
      if (hero) {
        let heroVisible = true;
        const syncHeroMotion = () => {
          html.classList.toggle('corridor-pulses-paused', document.hidden || !heroVisible);
        };
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            heroVisible = entry.isIntersecting;
            if (heroVisible) html.classList.add('corridor-pulses-started');
            syncHeroMotion();
          });
        }, { threshold: [0, 0.05, 0.4] });
        heroObserver.observe(hero);
        observers.push(heroObserver);
        listen(document, 'visibilitychange', syncHeroMotion);
      }

      const close = root.querySelector('.corridor-close');
      if (close) {
        const closeObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            html.classList.toggle('corridor-close-near', entry.isIntersecting);
          });
        }, { rootMargin: '-20% 0px -18% 0px', threshold: [0, 0.08] });
        closeObserver.observe(close);
        observers.push(closeObserver);
      }

      const story = root.querySelector('[data-corridor-story]');
      if (story) {
        const steps = [...story.querySelectorAll('[data-corridor-step]')];
        const ratios = new Map(steps.map((step) => [step, 0]));
        let stageFrame = 0;
        const applyStage = () => {
          stageFrame = 0;
          const ranked = steps
            .map((step) => [step, ratios.get(step) || 0])
            .filter(([, ratio]) => ratio > 0)
            .sort((a, b) => b[1] - a[1]);
          if (!ranked.length) return;
          const active = ranked[0][0];
          const stage = active.getAttribute('data-corridor-step') || '1';
          if (story.getAttribute('data-stage') === stage) return;
          story.setAttribute('data-stage', stage);
          steps.forEach((step) => step.toggleAttribute('data-active', step === active));
        };
        const stepObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
          if (!stageFrame) stageFrame = requestAnimationFrame(applyStage);
        }, { rootMargin: '-26% 0px -38% 0px', threshold: [0, 0.15, 0.35, 0.55, 0.75] });
        steps.forEach((step) => stepObserver.observe(step));
        observers.push(stepObserver);
      }

      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('corridor-ready')));
    } catch (_) {
      observers.forEach((observer) => observer.disconnect());
      root.classList.remove('corridor-motion');
      root.classList.add('corridor-ready');
    }
  }

  if (!reduce && finePointer) {
    const pointerSurfaces = [...root.querySelectorAll('[data-corridor-pointer]')];
    const pointerStates = new Map();
    const invalidatePointerRects = () => pointerStates.forEach((state) => { state.rect = null; });
    listen(window, 'resize', invalidatePointerRects, { passive: true });
    listen(window, 'scroll', invalidatePointerRects, { passive: true });

    pointerSurfaces.forEach((surface) => {
      const state = {
        rect: null,
        x: 0,
        y: 0,
        frame: 0,
        light: surface.querySelector('[data-corridor-pointer-light]'),
        art: surface.querySelector('[data-corridor-pointer-art]'),
      };
      pointerStates.set(surface, state);
      const paint = () => {
        state.frame = 0;
        if (!state.rect) state.rect = surface.getBoundingClientRect();
        if (!state.rect.width || !state.rect.height) return;
        const localX = state.x - state.rect.left;
        const localY = state.y - state.rect.top;
        const nx = Math.max(0, Math.min(1, localX / state.rect.width));
        const ny = Math.max(0, Math.min(1, localY / state.rect.height));
        if (state.light) state.light.style.transform = 'translate3d(' + localX + 'px,' + localY + 'px,0) translate3d(-50%,-50%,0)';
        if (state.art) state.art.style.transform = 'translate3d(' + ((nx - 0.5) * -12).toFixed(2) + 'px,' + ((ny - 0.5) * -8).toFixed(2) + 'px,0)';
      };
      listen(surface, 'pointerenter', (event) => {
        state.rect = surface.getBoundingClientRect();
        state.x = event.clientX;
        state.y = event.clientY;
        surface.classList.add('is-pointer-active');
        if (!state.frame) state.frame = requestAnimationFrame(paint);
      }, { passive: true });
      listen(surface, 'pointermove', (event) => {
        state.x = event.clientX;
        state.y = event.clientY;
        if (!state.frame) state.frame = requestAnimationFrame(paint);
      }, { passive: true });
      const resetPointer = () => {
        state.rect = null;
        surface.classList.remove('is-pointer-active');
        if (state.frame) cancelAnimationFrame(state.frame);
        state.frame = 0;
        if (state.light) state.light.style.transform = 'translate3d(-50%,-50%,0) scale(.82)';
        if (state.art) state.art.style.transform = '';
      };
      listen(surface, 'pointerleave', resetPointer, { passive: true });
      listen(surface, 'pointercancel', resetPointer, { passive: true });
    });

    root.querySelectorAll('[data-corridor-magnetic]').forEach((button) => {
      const target = button.querySelector('[data-corridor-magnetic-target]') || button;
      let rect = null;
      let frame = 0;
      let pointerX = 0;
      let pointerY = 0;
      const paint = () => {
        frame = 0;
        if (!rect) rect = button.getBoundingClientRect();
        const dx = (pointerX - rect.left - rect.width / 2) * 0.16;
        const dy = (pointerY - rect.top - rect.height / 2) * 0.18;
        const x = Math.max(-8, Math.min(8, dx));
        const y = Math.max(-6, Math.min(6, dy));
        target.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
      };
      listen(button, 'pointerenter', () => {
        rect = button.getBoundingClientRect();
        button.classList.add('is-magnetic-live');
      }, { passive: true });
      listen(button, 'pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frame) frame = requestAnimationFrame(paint);
      }, { passive: true });
      const resetMagnetic = () => {
        rect = null;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        button.classList.remove('is-magnetic-live');
        target.style.transform = 'translate3d(0,0,0)';
      };
      listen(button, 'pointerleave', resetMagnetic, { passive: true });
      listen(button, 'pointercancel', resetMagnetic, { passive: true });
    });
  }
})();`;

function Arrow() {
  return (
    <span aria-hidden="true" className="corridor-arrow">
      →
    </span>
  );
}

function Eyebrow({ children, inverse = false }: { children: React.ReactNode; inverse?: boolean }) {
  return (
    <p className={`corridor-eyebrow${inverse ? " corridor-eyebrow-inverse" : ""}`}>{children}</p>
  );
}

function CorridorHandoff({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      className={`corridor-handoff corridor-handoff-${tone}`}
      aria-hidden="true"
      data-corridor-handoff
    >
      <i />
      <b />
    </span>
  );
}

function HeroRailGraphic() {
  return (
    <svg
      className="corridor-hero-rails"
      viewBox="0 0 980 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-corridor-pointer-art
    >
      <g className="corridor-rail-dim">
        <path d="M-40 184H214C282 184 260 310 346 310H688C746 310 746 224 812 224H1034" />
        <path d="M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034" />
        <path d="M110-40V92C110 156 184 156 184 222V690" />
        <path d="M742-30V108C742 168 652 166 652 244V790" />
      </g>
      <g className="corridor-rail-hot">
        <path
          pathLength="1"
          d="M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"
        />
      </g>
      <g className="corridor-rail-pulses">
        <path
          pathLength="1"
          d="M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"
        />
        <path
          pathLength="1"
          d="M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"
        />
      </g>
      <g className="corridor-rail-nodes">
        {[
          [-2, 516],
          [328, 402],
          [652, 437],
          [812, 588],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
        ))}
      </g>
    </svg>
  );
}

function PlatformDiagram() {
  return (
    <svg
      className="corridor-platform-diagram"
      viewBox="0 0 760 470"
      aria-hidden="true"
      data-corridor-pointer-art
    >
      <defs>
        <linearGradient id="corridor-gate" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" stopOpacity=".22" />
          <stop offset=".58" stopColor="currentColor" stopOpacity=".06" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="corridor-gate-glow">
          <stop stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="platform-grid">
        <path d="M20 78H740M20 157H740M20 236H740M20 315H740M20 394H740" />
        <path d="M128 30V440M276 30V440M424 30V440M572 30V440" />
      </g>
      <g className="platform-state platform-state-fragmented">
        <g className="platform-fragments">
          <rect x="58" y="58" width="148" height="72" rx="3" />
          <rect x="92" y="190" width="148" height="72" rx="3" />
          <rect x="46" y="334" width="148" height="72" rx="3" />
          <rect x="492" y="88" width="164" height="72" rx="3" />
          <rect x="528" y="292" width="164" height="72" rx="3" />
          <text x="76" y="90">
            LOCAL RAIL
          </text>
          <text x="110" y="222">
            PARTNER RULE
          </text>
          <text x="64" y="366">
            RISK LOGIC
          </text>
          <text x="510" y="120">
            MARKET OPS
          </text>
          <text x="546" y="324">
            SETTLEMENT
          </text>
        </g>
        <g className="platform-conflict-routes">
          <path pathLength="1" d="M206 94C330 94 356 344 528 328" />
          <path pathLength="1" d="M240 226C346 226 370 120 492 124" />
          <path pathLength="1" d="M194 370C330 370 374 124 492 124" />
          <path pathLength="1" d="M206 94C354 94 400 328 528 328" />
        </g>
        <text className="platform-state-caption" x="380" y="446" textAnchor="middle">
          FRAGMENTED BY MARKET, PARTNER AND RULE
        </text>
      </g>

      <g className="platform-state platform-state-convergence">
        <g className="platform-inputs">
          {[82, 176, 294, 388].map((cy, index) => (
            <circle
              key={cy}
              className={`platform-input-node platform-input-node-${index + 1}`}
              cx="54"
              cy={cy}
              r="7"
            />
          ))}
          <text x="78" y="87">
            CARDS
          </text>
          <text x="78" y="181">
            WALLETS
          </text>
          <text x="78" y="299">
            BANKS
          </text>
          <text x="78" y="393">
            LOCAL RAILS
          </text>
        </g>
        <g className="platform-routes platform-routes-in">
          <path pathLength="1" d="M61 82C232 82 234 236 336 236" />
          <path pathLength="1" d="M61 176C220 176 250 236 336 236" />
          <path pathLength="1" d="M61 294C220 294 250 236 336 236" />
          <path pathLength="1" d="M61 388C232 388 234 236 336 236" />
        </g>
      </g>

      <g className="platform-state platform-state-gate">
        <ellipse
          cx="390"
          cy="236"
          rx="142"
          ry="168"
          fill="url(#corridor-gate-glow)"
          stroke="none"
        />
        <path className="platform-gate-shadow" d="M354 86L474 126V354L354 392Z" />
        <path
          className="platform-gate-plane"
          d="M332 102L452 136V338L332 374Z"
          fill="url(#corridor-gate)"
        />
        <path className="platform-gate-spine" d="M332 102V374M452 136V338" />
        <text x="390" y="222" textAnchor="middle">
          CANONICAL
        </text>
        <text className="platform-gate-title" x="390" y="246" textAnchor="middle">
          LEDGER
        </text>
        <text x="390" y="269" textAnchor="middle">
          ROUTING · RISK · CONTROL
        </text>
      </g>

      <g className="platform-state platform-state-controlled">
        <g className="platform-routes platform-routes-out">
          <path pathLength="1" d="M452 236C552 236 556 92 712 92" />
          <path pathLength="1" d="M452 236C562 236 566 188 712 188" />
          <path pathLength="1" d="M452 236C562 236 566 284 712 284" />
          <path pathLength="1" d="M452 236C552 236 556 380 712 380" />
        </g>
        <g className="platform-outputs">
          <circle className="platform-output platform-output-1" cx="712" cy="92" r="6" />
          <circle className="platform-output platform-output-2" cx="712" cy="188" r="6" />
          <circle className="platform-output platform-output-3" cx="712" cy="284" r="6" />
          <circle className="platform-output platform-output-4" cx="712" cy="380" r="6" />
          <text x="690" y="83" textAnchor="end">
            ACCEPT
          </text>
          <text x="690" y="179" textAnchor="end">
            PAYOUT
          </text>
          <text x="690" y="275" textAnchor="end">
            SETTLE
          </text>
          <text x="690" y="371" textAnchor="end">
            CONTROL
          </text>
        </g>
        <text className="platform-state-caption" x="550" y="446" textAnchor="middle">
          CONTROLLED SCALE, ONE OPERATING SURFACE
        </text>
      </g>
      <g className="platform-transaction-token">
        <circle className="platform-token-halo" cx="0" cy="0" r="11" />
        <circle className="platform-token-core" cx="0" cy="0" r="4" />
      </g>
    </svg>
  );
}

function MobileStoryState({ stage }: { stage: 1 | 2 | 3 }) {
  return (
    <svg
      className={`corridor-mobile-story-state corridor-mobile-story-state-${stage}`}
      viewBox="0 0 360 156"
      aria-hidden="true"
    >
      <g className="corridor-mobile-state-grid">
        <path d="M12 39H348M12 78H348M12 117H348" />
        <path d="M90 12V144M180 12V144M270 12V144" />
      </g>
      {stage === 1 && (
        <>
          <g className="corridor-mobile-state-paths">
            <path pathLength="1" d="M24 30C102 30 104 54 178 54" />
            <path pathLength="1" d="M24 60C96 60 110 72 178 72" />
            <path pathLength="1" d="M24 94C104 94 108 86 178 86" />
            <path pathLength="1" d="M24 126C96 126 112 104 178 104" />
          </g>
          <g className="corridor-mobile-state-nodes">
            <circle cx="24" cy="30" r="4" />
            <circle cx="24" cy="60" r="4" />
            <circle cx="24" cy="94" r="4" />
            <circle cx="24" cy="126" r="4" />
            <rect x="178" y="40" width="60" height="76" rx="2" />
          </g>
          <text x="268" y="82">
            FRAGMENTED
          </text>
        </>
      )}
      {stage === 2 && (
        <>
          <g className="corridor-mobile-state-paths">
            <path pathLength="1" d="M22 30C110 30 116 78 164 78" />
            <path pathLength="1" d="M22 62C106 62 116 78 164 78" />
            <path pathLength="1" d="M22 94C106 94 116 78 164 78" />
            <path pathLength="1" d="M22 126C110 126 116 78 164 78" />
          </g>
          <g className="corridor-mobile-state-nodes">
            <circle cx="22" cy="30" r="4" />
            <circle cx="22" cy="62" r="4" />
            <circle cx="22" cy="94" r="4" />
            <circle cx="22" cy="126" r="4" />
            <rect
              className="corridor-mobile-state-core"
              x="164"
              y="38"
              width="68"
              height="80"
              rx="2"
            />
          </g>
          <text x="198" y="75" textAnchor="middle">
            ONE
          </text>
          <text x="198" y="91" textAnchor="middle">
            PLATFORM
          </text>
        </>
      )}
      {stage === 3 && (
        <>
          <g className="corridor-mobile-state-paths">
            <path pathLength="1" d="M22 78H128" />
            <path pathLength="1" d="M196 78C238 78 244 28 336 28" />
            <path pathLength="1" d="M196 78C246 78 250 62 336 62" />
            <path pathLength="1" d="M196 78C246 78 250 96 336 96" />
            <path pathLength="1" d="M196 78C238 78 244 130 336 130" />
          </g>
          <g className="corridor-mobile-state-nodes">
            <circle cx="22" cy="78" r="4" />
            <rect
              className="corridor-mobile-state-core"
              x="128"
              y="38"
              width="68"
              height="80"
              rx="2"
            />
            <circle cx="336" cy="28" r="4" />
            <circle cx="336" cy="62" r="4" />
            <circle cx="336" cy="96" r="4" />
            <circle cx="336" cy="130" r="4" />
          </g>
          <text x="162" y="75" textAnchor="middle">
            CONTROLLED
          </text>
          <text x="162" y="91" textAnchor="middle">
            OUTPUT
          </text>
        </>
      )}
    </svg>
  );
}

export function CorridorHome() {
  return (
    <div className="corridor-home" data-corridor-home>
      <section className="corridor-hero" data-corridor-pointer>
        <HeroRailGraphic />
        <div
          className="corridor-hero-glow corridor-pointer-light"
          aria-hidden="true"
          data-corridor-pointer-light
        />
        <div className="corridor-hero-inner">
          <div className="corridor-hero-copy">
            <Eyebrow inverse>
              <span className="corridor-hero-kicker-complete">
                Rizwan Zafar · Chief Product Officer at Simpaisa · Dubai
              </span>
              <span className="corridor-hero-kicker-compact" aria-hidden="true">
                Rizwan Zafar · CPO, Simpaisa · Dubai
              </span>
            </Eyebrow>
            <h1 aria-label="I scale regulated payment infrastructure across complex markets.">
              <span className="corridor-hero-title-complete" aria-hidden="true">
                <span className="corridor-hero-line">
                  <span>I scale regulated</span>
                </span>
                <span className="corridor-hero-line corridor-hero-line-emphasis">
                  <span>payment infrastructure</span>
                </span>
                <span className="corridor-hero-line">
                  <span>
                    across complex markets.
                    <i className="corridor-hero-dot" aria-hidden="true" />
                  </span>
                </span>
              </span>
              <span className="corridor-hero-title-compact" aria-hidden="true">
                <span className="corridor-hero-line">
                  <span>I scale payments</span>
                </span>
                <span className="corridor-hero-line corridor-hero-line-emphasis">
                  <span>across complex</span>
                </span>
                <span className="corridor-hero-line">
                  <span>
                    markets.
                    <i className="corridor-hero-dot" aria-hidden="true" />
                  </span>
                </span>
              </span>
            </h1>
            <p className="corridor-hero-lede">
              I lead products and programmes where local rails, risk, compliance and operations
              meet.
            </p>
            <p className="corridor-hero-proof">
              <strong>{CAREER.years} years</strong>
              <span className="corridor-hero-proof-complete">
                across {CAREER.marketCount} career markets
              </span>
              <span className="corridor-hero-proof-compact" aria-hidden="true">
                · {CAREER.marketCount} markets
              </span>
            </p>
            <div className="corridor-actions">
              <Link
                to="/product-work"
                className="corridor-button corridor-button-primary"
                data-corridor-magnetic
              >
                <span className="corridor-button-label" data-corridor-magnetic-target>
                  View selected work <Arrow />
                </span>
              </Link>
              <span className="corridor-hero-links">
                <Link to="/journey" className="corridor-text-link corridor-text-link-inverse">
                  Leadership journey <Arrow />
                </Link>
                <a
                  href={profile.resumeHref}
                  download
                  className="corridor-text-link corridor-text-link-inverse"
                >
                  Résumé <span aria-hidden="true">↓</span>
                </a>
              </span>
            </div>
          </div>
          <figure className="corridor-portrait" aria-label="Portrait of Rizwan Zafar">
            <span className="corridor-portrait-frame" aria-hidden="true" />
            <picture>
              <source
                type="image/webp"
                srcSet={`${portraitWebpSmall} 460w, ${portraitWebp} 920w`}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 52vw, 42vw"
              />
              <img
                src={portraitPng}
                width="928"
                height="1152"
                alt="Rizwan Zafar, Chief Product Officer and payments executive"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <figcaption>Product · Programme · Payments</figcaption>
          </figure>
        </div>
        <a
          href="#platform-proof"
          className="corridor-scroll-cue"
          aria-label="Continue to platform proof"
        >
          <span>Continue</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section
        className="corridor-ledger"
        id="platform-proof"
        aria-labelledby="ledger-title"
        data-corridor-scene
      >
        <div className="corridor-section-shell">
          <header className="corridor-ledger-header" data-corridor-reveal>
            <Eyebrow inverse>Simpaisa platform · at a glance</Eyebrow>
            <h2 id="ledger-title">Scale, with its scope made explicit.</h2>
          </header>
          <div className="corridor-ledger-route" aria-hidden="true" data-corridor-focal>
            <i />
            <i />
            <i />
            <i />
          </div>
          <dl className="corridor-metrics" data-corridor-reveal>
            <div>
              <dt>Annual GTV</dt>
              <dd>{PLATFORM.gtv}</dd>
            </div>
            <div>
              <dt>Payments a year</dt>
              <dd>{PLATFORM.annualPayments}</dd>
            </div>
            <div>
              <dt>Merchants served</dt>
              <dd>{PLATFORM.merchants}</dd>
            </div>
            <div>
              <dt>Live markets today</dt>
              <dd>{PLATFORM.marketCount}</dd>
            </div>
          </dl>
          <div className="corridor-ledger-foot" data-corridor-reveal>
            <p>
              Platform metrics only — separate from {CAREER.years} years across {CAREER.marketCount}{" "}
              career markets.
            </p>
            <a href="#flagship-story" className="corridor-text-link corridor-text-link-inverse">
              See how the platform was built <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section
        className="corridor-flagship"
        id="flagship-story"
        aria-labelledby="flagship-title"
        data-corridor-story
        data-corridor-scene
        data-stage="1"
      >
        <CorridorHandoff tone="light" />
        <div className="corridor-flagship-folio" aria-hidden="true">
          01
        </div>
        <div className="corridor-flagship-layout">
          <div className="corridor-story-copy">
            <header data-corridor-reveal>
              <Eyebrow>Operating record</Eyebrow>
              <h2 id="flagship-title">From fragmented rails to one dependable platform.</h2>
              <p className="corridor-role-line">
                <strong>My role:</strong> Chief Product Officer; acting CTO during the 2024
                regulatory tightening. I owned product strategy, platform roadmap, partner
                integrations and the operating model.
              </p>
            </header>
            <article className="corridor-story-step" data-corridor-step="1" data-active>
              <span>01 / Challenge</span>
              <h3>One merchant. Too many rails.</h3>
              <p>
                Cards, wallets, bank transfers, DCB and cross-border payouts were fragmented by
                market, partner and operating rule.
              </p>
              <MobileStoryState stage={1} />
            </article>
            <article className="corridor-story-step" data-corridor-step="2">
              <span>02 / Decisions</span>
              <h3>Make complexity a platform concern.</h3>
              <p>
                A stable API, canonical ledger, corridor-aware routing and shared risk controls
                turned local rails into one product surface.
              </p>
              <MobileStoryState stage={2} />
            </article>
            <article className="corridor-story-step" data-corridor-step="3">
              <span>03 / Outcomes</span>
              <h3>Scale without losing control.</h3>
              <p>
                {PLATFORM.gtv} annual GTV, {PLATFORM.annualPayments} payments a year and{" "}
                {PLATFORM.uptime} platform uptime across {PLATFORM.marketCount} live markets.
              </p>
              <MobileStoryState stage={3} />
              <Link
                to="/product-work/$slug"
                params={{ slug: "simpaisa-payment-infrastructure" }}
                className="corridor-button corridor-button-dark"
              >
                Explore the full case study <Arrow />
              </Link>
            </article>
          </div>
          <div className="corridor-story-visual" data-corridor-pointer data-corridor-focal>
            <span
              className="corridor-pointer-light"
              aria-hidden="true"
              data-corridor-pointer-light
            />
            <div className="corridor-story-sticky">
              <div className="corridor-story-label">
                <span>Acceptance</span>
                <span>Payouts</span>
                <span>Cross-border</span>
                <span>Risk</span>
              </div>
              <PlatformDiagram />
              <div className="corridor-story-proof" aria-label="Platform outcomes">
                <span>
                  <strong>{PLATFORM.gtv}</strong> annual GTV
                </span>
                <span>
                  <strong>{PLATFORM.annualPayments}</strong> payments / yr
                </span>
                <span>
                  <strong>{PLATFORM.uptime}</strong> platform uptime
                </span>
              </div>
              <ol className="corridor-story-progress" aria-label="Case study progress">
                <li>Challenge</li>
                <li>Decisions</li>
                <li>Outcomes</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="corridor-support" aria-labelledby="support-title">
        <h2 id="support-title" className="sr-only">
          Selected operating stories
        </h2>
        <article className="corridor-support-story corridor-support-light" data-corridor-scene>
          <div className="corridor-support-copy">
            <Eyebrow>Selected story · Daraz, Alibaba Group</Eyebrow>
            <h3>Acceptance is a trust problem wearing a checkout interface.</h3>
            <dl className="corridor-case-record">
              <div>
                <dt>Context</dt>
                <dd>
                  Checkout acceptance across {DARAZ.marketsWord} South Asian markets through a
                  COVID-driven volume surge.
                </dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Treat COD-to-digital as a trust, local-method and risk-rules programme.</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>
                  <strong>~40%</strong> wider payment coverage · shorter dispute cycles
                </dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>Owned multi-country payment operations and the checkout-acceptance surface.</dd>
              </div>
            </dl>
            <Link
              to="/product-work/$slug"
              params={{ slug: "daraz-payment-operations" }}
              className="corridor-text-link"
            >
              View the Daraz story <Arrow />
            </Link>
          </div>
          <svg
            className="corridor-support-diagram corridor-support-diagram-journey"
            viewBox="0 0 820 340"
            aria-hidden="true"
          >
            <g className="corridor-checkout-steps">
              {[
                [36, "ORDER"],
                [226, "METHOD"],
                [416, "RISK"],
                [606, "ACCEPTED"],
              ].map(([x, label]) => (
                <g key={String(label)}>
                  <rect
                    className="corridor-support-target"
                    x={x}
                    y="42"
                    width="146"
                    height="92"
                    rx="4"
                  />
                  <text x={Number(x) + 73} y="94" textAnchor="middle">
                    {label}
                  </text>
                </g>
              ))}
              <path
                className="corridor-support-path"
                pathLength="1"
                d="M182 88H226M372 88H416M562 88H606"
              />
            </g>
            <path
              className="corridor-support-path corridor-market-path"
              pathLength="1"
              d="M70 262C194 186 284 300 404 230S612 186 758 258"
            />
            <g className="corridor-market-nodes">
              {[
                [70, 262, "PK"],
                [236, 238, "BD"],
                [404, 230, "LK"],
                [570, 222, "NP"],
                [758, 258, "MM"],
              ].map(([cx, cy, label]) => (
                <g key={String(label)}>
                  <circle className="corridor-support-node" cx={cx} cy={cy} r="8" />
                  <text x={Number(cx)} y={Number(cy) + 31} textAnchor="middle">
                    {label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </article>
        <article className="corridor-support-story corridor-support-dark" data-corridor-scene>
          <div className="corridor-support-copy">
            <Eyebrow inverse>Selected story · Tapmad</Eyebrow>
            <h3>Payment cost is a product variable.</h3>
            <dl className="corridor-case-record">
              <div>
                <dt>Context</dt>
                <dd>Operator economics consumed up to half of subscription revenue.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Build DCB, then migrate the billing model toward wallet-native payments.</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>
                  <strong>50% → ~1%</strong> payment cost · <strong>5M+</strong> subscribers
                </dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>Owned monetisation and billing across Pakistan, UAE and KSA.</dd>
              </div>
            </dl>
            <Link
              to="/product-work/$slug"
              params={{ slug: "tapmad-dcb-monetisation-wallet-migration" }}
              className="corridor-text-link corridor-text-link-inverse"
            >
              View the Tapmad story <Arrow />
            </Link>
          </div>
          <svg
            className="corridor-support-diagram corridor-support-diagram-cost"
            viewBox="0 0 520 340"
            aria-hidden="true"
          >
            <circle
              className="corridor-support-ring corridor-support-ring-outer"
              cx="112"
              cy="170"
              r="82"
            />
            <circle
              className="corridor-support-ring corridor-support-ring-inner"
              cx="112"
              cy="170"
              r="48"
            />
            <path className="corridor-support-path" pathLength="1" d="M194 170H338" />
            <path
              className="corridor-support-path corridor-support-arrow"
              pathLength="1"
              d="M314 146L338 170L314 194"
            />
            <rect
              className="corridor-support-target"
              x="366"
              y="106"
              width="112"
              height="128"
              rx="4"
            />
            <text
              className="corridor-support-label corridor-support-label-source"
              x="112"
              y="164"
              textAnchor="middle"
            >
              50%
            </text>
            <text x="112" y="188" textAnchor="middle">
              DCB COST
            </text>
            <text
              className="corridor-support-label corridor-support-label-target"
              x="422"
              y="164"
              textAnchor="middle"
            >
              ~1%
            </text>
            <text x="422" y="188" textAnchor="middle">
              WALLET
            </text>
          </svg>
        </article>
      </section>

      <section className="corridor-ecosystem" aria-labelledby="ecosystem-title" data-corridor-scene>
        <div className="corridor-section-shell">
          <header data-corridor-reveal>
            <Eyebrow>Platform ecosystem</Eyebrow>
            <h2 id="ecosystem-title">Global reach. Local depth.</h2>
            <p>Built across local rails, global platforms and regulated markets.</p>
          </header>
          <div className="corridor-trust-map" data-corridor-reveal data-corridor-focal>
            <div className="corridor-trust-origin" aria-hidden="true">
              <span>Simpaisa</span>
              <small>Local infrastructure layer</small>
            </div>
            <div className="corridor-relationship-groups">
              {relationshipGroups.map((group, groupIndex) => (
                <section
                  key={group.label}
                  className={`corridor-relationship-group corridor-relationship-group-${groupIndex + 1}`}
                  aria-labelledby={`relationship-${group.label.replaceAll(" ", "-")}`}
                >
                  <h3 id={`relationship-${group.label.replaceAll(" ", "-")}`}>
                    <span>0{groupIndex + 1}</span>
                    {group.label}
                  </h3>
                  <ul>
                    {group.items.map(([name, src, width], itemIndex) => (
                      <li
                        key={name}
                        style={
                          {
                            "--corridor-logo-index": groupIndex * 5 + itemIndex,
                          } as React.CSSProperties
                        }
                      >
                        <Link
                          to="/product-work/$slug"
                          params={{ slug: "simpaisa-payment-infrastructure" }}
                          className="corridor-relationship-link"
                          aria-label={`${name} — explore the Simpaisa platform story`}
                        >
                          <img
                            src={src}
                            width={width}
                            height="29"
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <aside className="corridor-featured-relationship" aria-label="Relationship context">
              {relationshipGroups.map((group, index) => (
                <article
                  key={group.story.label}
                  className={`corridor-featured-story corridor-featured-story-${index + 1}`}
                >
                  <span>{group.story.label}</span>
                  <h3>{group.story.title}</h3>
                  <p>{group.story.body}</p>
                  <small>{group.items.map(([name]) => name).join(" · ")}</small>
                </article>
              ))}
            </aside>
          </div>
          <div className="corridor-ecosystem-foot">
            <p>Public relationship marks reproduced from Simpaisa&rsquo;s current company page.</p>
            <Link
              to="/product-work/$slug"
              params={{ slug: "simpaisa-payment-infrastructure" }}
              className="corridor-button corridor-button-dark"
            >
              Explore the platform story <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="corridor-leadership"
        aria-labelledby="leadership-title"
        data-corridor-scene
      >
        <CorridorHandoff tone="dark" />
        <div className="corridor-section-shell">
          <div className="corridor-leadership-stage">
            <header className="corridor-leadership-header">
              <Eyebrow inverse>Leadership in practice</Eyebrow>
              <h2
                id="leadership-title"
                aria-label="Building payment systems that hold up in the real world."
              >
                <span className="corridor-leadership-title-line" aria-hidden="true">
                  <span>Building</span>
                </span>
                <span className="corridor-leadership-title-line" aria-hidden="true">
                  <span>payment systems</span>
                </span>
                <span className="corridor-leadership-title-line" aria-hidden="true">
                  <span>that hold up in</span>
                </span>
                <span className="corridor-leadership-title-line" aria-hidden="true">
                  <span>the real world.</span>
                </span>
              </h2>
              <p className="corridor-leadership-discipline" data-corridor-reveal>
                Strategy, infrastructure, operations.
              </p>
            </header>

            <figure className="corridor-leadership-portrait">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${portraitWebpSmall} 460w, ${portraitWebp} 920w`}
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
                <img
                  src={portraitPng}
                  width="928"
                  height="1152"
                  alt="Rizwan Zafar, payments product and technology leader"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>

            <ol className="corridor-leadership-eras" aria-label="Career progression">
              <li data-corridor-reveal>
                <Link to="/journey" className="corridor-leadership-era">
                  <span className="corridor-leadership-number" aria-hidden="true">
                    01
                  </span>
                  <div className="corridor-leadership-era-main">
                    <h3>Engineering → PMO</h3>
                    <span>Built the delivery discipline before owning product systems.</span>
                  </div>
                  <span className="corridor-leadership-era-meta">
                    <time dateTime="2009">2009 — 2016</time>
                    <strong>PESCO · DS Engineering Services</strong>
                    <small>Planning Engineer → Project Manager, PMO</small>
                  </span>
                  <span className="corridor-leadership-era-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
              <li data-corridor-reveal>
                <Link to="/journey" className="corridor-leadership-era">
                  <span className="corridor-leadership-number" aria-hidden="true">
                    02
                  </span>
                  <div className="corridor-leadership-era-main">
                    <h3>Programme → Product</h3>
                    <span>
                      Monetisation, checkout acceptance and multi-market payment operations.
                    </span>
                  </div>
                  <span className="corridor-leadership-era-meta">
                    <time dateTime="2017">2017 — 2020</time>
                    <strong>Tapmad · Daraz, Alibaba Group</strong>
                    <small>Product &amp; Programme Manager → Payments Operations</small>
                  </span>
                  <span className="corridor-leadership-era-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
              <li data-corridor-reveal>
                <Link to="/journey" className="corridor-leadership-era">
                  <span className="corridor-leadership-number" aria-hidden="true">
                    03
                  </span>
                  <div className="corridor-leadership-era-main">
                    <h3>Platform ownership</h3>
                    <span>
                      Product strategy, regulated infrastructure and the operating model together.
                    </span>
                  </div>
                  <span className="corridor-leadership-era-meta">
                    <time dateTime="2020">2020 — Now</time>
                    <strong>Simpaisa</strong>
                    <small>Chief Product Officer · Acting CTO, 2024</small>
                  </span>
                  <span className="corridor-leadership-era-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            </ol>

            <div className="corridor-leadership-proof" data-corridor-reveal>
              <p>
                <strong>{CAREER.years} years</strong>
                <span>{CAREER.marketsPhrase}</span>
              </p>
              <p>
                <strong>{TEAM.squads} squads</strong>
                <span>
                  {TEAM.total} · {TEAM.engineers} · {TEAM.productOrg}
                </span>
              </p>
              <Link to="/journey" className="corridor-text-link corridor-text-link-inverse">
                Read the full journey <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="corridor-writing" aria-labelledby="writing-title" data-corridor-scene>
        <div className="corridor-section-shell">
          <header data-corridor-reveal>
            <div>
              <Eyebrow>Field notes</Eyebrow>
              <h2 id="writing-title">Ideas tested against live systems.</h2>
            </div>
            <Link to="/blog" className="corridor-text-link">
              Read all essays <Arrow />
            </Link>
          </header>
          {essays.length === 3 && (
            <div className="corridor-editorial-grid">
              <Link
                to="/blog/$slug"
                params={{ slug: essays[0].slug }}
                className="corridor-featured-essay"
                data-corridor-reveal
                data-corridor-pointer
                data-corridor-focal
              >
                <div
                  className="corridor-featured-essay-art"
                  aria-hidden="true"
                  data-corridor-pointer-art
                >
                  <svg viewBox="0 0 780 520">
                    <defs>
                      <linearGradient id="publication-portal" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="currentColor" stopOpacity=".48" />
                        <stop offset="1" stopColor="currentColor" stopOpacity=".03" />
                      </linearGradient>
                    </defs>
                    <g className="corridor-publication-grid">
                      <path d="M54 466L390 258L726 466M94 466L390 286L686 466M144 466L390 316L636 466" />
                      <path d="M112 54L390 258L668 54M170 54L390 286L610 54M228 54L390 316L552 54" />
                      <path d="M54 466H726M108 432H672M166 394H614M226 356H554" />
                      <path d="M112 54V466M188 54V466M264 54V466M516 54V466M592 54V466M668 54V466" />
                    </g>
                    <g className="corridor-publication-frames">
                      <rect x="112" y="54" width="556" height="412" />
                      <rect x="188" y="106" width="404" height="312" />
                      <rect x="264" y="166" width="252" height="208" />
                      <rect
                        x="334"
                        y="222"
                        width="112"
                        height="112"
                        fill="url(#publication-portal)"
                      />
                    </g>
                    <path
                      className="corridor-publication-route"
                      pathLength="1"
                      d="M68 466C236 438 290 372 390 314V222"
                    />
                    <circle cx="390" cy="222" r="8" />
                  </svg>
                </div>
                <span>
                  {essays[0].category} · {essays[0].readingTime}
                </span>
                <h3>{essays[0].title}</h3>
                <Arrow />
              </Link>
              <div className="corridor-secondary-essays">
                {essays.slice(1).map((post, index) => (
                  <Link
                    key={post.slug}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    data-corridor-reveal
                  >
                    <span>
                      0{index + 1} · {post.category}
                    </span>
                    <h3>{post.title}</h3>
                    <p>{post.readingTime}</p>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </div>
          )}
          <nav className="corridor-topic-index" aria-label="Explore writing topics">
            {[
              "Cross-Border Payments",
              "Product Strategy",
              "Settlement & Reconciliation",
              "AI & Product Operations",
            ].map((topic) => (
              <Link key={topic} to="/blog" search={{ q: topic }}>
                {topic}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section
        className="corridor-close"
        aria-labelledby="close-title"
        data-corridor-pointer
        data-corridor-scene
      >
        <CorridorHandoff tone="dark" />
        <span className="corridor-pointer-light" aria-hidden="true" data-corridor-pointer-light />
        <div className="corridor-close-inner">
          <div className="corridor-close-copy" data-corridor-reveal>
            <Eyebrow inverse>Direct line</Eyebrow>
            <h2 id="close-title">Building through complexity?</h2>
            <p>
              I&rsquo;m open to senior product, payments and transformation roles — and thoughtful
              conversations about the systems behind them.
            </p>
            <div className="corridor-close-links">
              <Link to="/contact" className="corridor-text-link corridor-text-link-inverse">
                Contact details <Arrow />
              </Link>
              <a
                href={profile.resumeHref}
                download
                className="corridor-text-link corridor-text-link-inverse"
              >
                Download résumé ↓
              </a>
            </div>
          </div>
          <div className="corridor-close-channel" data-corridor-reveal data-corridor-pointer-art>
            <span>Email · {profile.location}</span>
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <Arrow />
            </a>
            <p>Product · Programme · Payments</p>
          </div>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: corridorRuntime }} />
    </div>
  );
}
