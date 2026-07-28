import{x as r,C as n,L as t,G as d,k as m,A as u,P as i,D as b,T as h,I as N,H as M}from"./index-Cx4UxcMz.js";const j="/assets/rizwan-zafar-cutout-DWyt46vk.png",l=["cross-border-corridors-are-operating-systems","payment-cost-50-to-1","financial-controls-are-product-requirements"].map(e=>N.find(s=>s.slug===e)).filter(e=>!!e),g=[{label:"Merchants & platforms",story:{label:"Enterprise reach",title:"Global platforms, locally connected.",body:"A regulated local-infrastructure layer for enterprise collection and disbursement where market access is fragmented."},items:[["ByteDance","/partners/simpaisa/bytedance.svg",168],["Samsung","/partners/simpaisa/samsung.svg",190],["SHEIN","/partners/simpaisa/shein.svg",136],["Codashop","/partners/simpaisa/codashop.svg",149],["myco","/partners/simpaisa/myco.svg",70]]},{label:"Payment & network collaborators",story:{label:"Network depth",title:"Many networks. One product surface.",body:"Local rails and global payment collaborators brought into one acceptance, payout and cross-border operating model."},items:[["Tazapay","/partners/simpaisa/tazapay.svg",128],["Thunes","/partners/simpaisa/thunes.svg",134],["Boku","/partners/simpaisa/boku.svg",113],["dLocal","/partners/simpaisa/dlocal.svg",127],["TangoPay","/partners/simpaisa/tangopay.svg",103]]}],w=String.raw`(() => {
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
})();`;function a(){return r.jsx("span",{"aria-hidden":"true",className:"corridor-arrow",children:"→"})}function o({children:e,inverse:s=!1}){return r.jsx("p",{className:`corridor-eyebrow${s?" corridor-eyebrow-inverse":""}`,children:e})}function p({tone:e}){return r.jsxs("span",{className:`corridor-handoff corridor-handoff-${e}`,"aria-hidden":"true","data-corridor-handoff":!0,children:[r.jsx("i",{}),r.jsx("b",{})]})}function C(){return r.jsxs("svg",{className:"corridor-hero-rails",viewBox:"0 0 980 760",preserveAspectRatio:"xMidYMid slice","aria-hidden":"true","data-corridor-pointer-art":!0,children:[r.jsxs("g",{className:"corridor-rail-dim",children:[r.jsx("path",{d:"M-40 184H214C282 184 260 310 346 310H688C746 310 746 224 812 224H1034"}),r.jsx("path",{d:"M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"}),r.jsx("path",{d:"M110-40V92C110 156 184 156 184 222V690"}),r.jsx("path",{d:"M742-30V108C742 168 652 166 652 244V790"})]}),r.jsx("g",{className:"corridor-rail-hot",children:r.jsx("path",{pathLength:"1",d:"M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"})}),r.jsxs("g",{className:"corridor-rail-pulses",children:[r.jsx("path",{pathLength:"1",d:"M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"}),r.jsx("path",{pathLength:"1",d:"M-40 516H162C252 516 224 402 328 402H628C724 402 706 588 812 588H1034"})]}),r.jsx("g",{className:"corridor-rail-nodes",children:[[-2,516],[328,402],[652,437],[812,588]].map(([e,s])=>r.jsx("circle",{cx:e,cy:s,r:"5"},`${e}-${s}`))})]})}function L(){return r.jsxs("svg",{className:"corridor-platform-diagram",viewBox:"0 0 760 470","aria-hidden":"true","data-corridor-pointer-art":!0,children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"corridor-gate",x1:"0",y1:"0",x2:"1",y2:"1",children:[r.jsx("stop",{stopColor:"currentColor",stopOpacity:".22"}),r.jsx("stop",{offset:".58",stopColor:"currentColor",stopOpacity:".06"}),r.jsx("stop",{offset:"1",stopColor:"currentColor",stopOpacity:"0"})]}),r.jsxs("radialGradient",{id:"corridor-gate-glow",children:[r.jsx("stop",{stopColor:"currentColor",stopOpacity:".28"}),r.jsx("stop",{offset:"1",stopColor:"currentColor",stopOpacity:"0"})]})]}),r.jsxs("g",{className:"platform-grid",children:[r.jsx("path",{d:"M20 78H740M20 157H740M20 236H740M20 315H740M20 394H740"}),r.jsx("path",{d:"M128 30V440M276 30V440M424 30V440M572 30V440"})]}),r.jsxs("g",{className:"platform-state platform-state-fragmented",children:[r.jsxs("g",{className:"platform-fragments",children:[r.jsx("rect",{x:"58",y:"58",width:"148",height:"72",rx:"3"}),r.jsx("rect",{x:"92",y:"190",width:"148",height:"72",rx:"3"}),r.jsx("rect",{x:"46",y:"334",width:"148",height:"72",rx:"3"}),r.jsx("rect",{x:"492",y:"88",width:"164",height:"72",rx:"3"}),r.jsx("rect",{x:"528",y:"292",width:"164",height:"72",rx:"3"}),r.jsx("text",{x:"76",y:"90",children:"LOCAL RAIL"}),r.jsx("text",{x:"110",y:"222",children:"PARTNER RULE"}),r.jsx("text",{x:"64",y:"366",children:"RISK LOGIC"}),r.jsx("text",{x:"510",y:"120",children:"MARKET OPS"}),r.jsx("text",{x:"546",y:"324",children:"SETTLEMENT"})]}),r.jsxs("g",{className:"platform-conflict-routes",children:[r.jsx("path",{pathLength:"1",d:"M206 94C330 94 356 344 528 328"}),r.jsx("path",{pathLength:"1",d:"M240 226C346 226 370 120 492 124"}),r.jsx("path",{pathLength:"1",d:"M194 370C330 370 374 124 492 124"}),r.jsx("path",{pathLength:"1",d:"M206 94C354 94 400 328 528 328"})]}),r.jsx("text",{className:"platform-state-caption",x:"380",y:"446",textAnchor:"middle",children:"FRAGMENTED BY MARKET, PARTNER AND RULE"})]}),r.jsxs("g",{className:"platform-state platform-state-convergence",children:[r.jsxs("g",{className:"platform-inputs",children:[[82,176,294,388].map((e,s)=>r.jsx("circle",{className:`platform-input-node platform-input-node-${s+1}`,cx:"54",cy:e,r:"7"},e)),r.jsx("text",{x:"78",y:"87",children:"CARDS"}),r.jsx("text",{x:"78",y:"181",children:"WALLETS"}),r.jsx("text",{x:"78",y:"299",children:"BANKS"}),r.jsx("text",{x:"78",y:"393",children:"LOCAL RAILS"})]}),r.jsxs("g",{className:"platform-routes platform-routes-in",children:[r.jsx("path",{pathLength:"1",d:"M61 82C232 82 234 236 336 236"}),r.jsx("path",{pathLength:"1",d:"M61 176C220 176 250 236 336 236"}),r.jsx("path",{pathLength:"1",d:"M61 294C220 294 250 236 336 236"}),r.jsx("path",{pathLength:"1",d:"M61 388C232 388 234 236 336 236"})]})]}),r.jsxs("g",{className:"platform-state platform-state-gate",children:[r.jsx("ellipse",{cx:"390",cy:"236",rx:"142",ry:"168",fill:"url(#corridor-gate-glow)",stroke:"none"}),r.jsx("path",{className:"platform-gate-shadow",d:"M354 86L474 126V354L354 392Z"}),r.jsx("path",{className:"platform-gate-plane",d:"M332 102L452 136V338L332 374Z",fill:"url(#corridor-gate)"}),r.jsx("path",{className:"platform-gate-spine",d:"M332 102V374M452 136V338"}),r.jsx("text",{x:"390",y:"222",textAnchor:"middle",children:"CANONICAL"}),r.jsx("text",{className:"platform-gate-title",x:"390",y:"246",textAnchor:"middle",children:"LEDGER"}),r.jsx("text",{x:"390",y:"269",textAnchor:"middle",children:"ROUTING · RISK · CONTROL"})]}),r.jsxs("g",{className:"platform-state platform-state-controlled",children:[r.jsxs("g",{className:"platform-routes platform-routes-out",children:[r.jsx("path",{pathLength:"1",d:"M452 236C552 236 556 92 712 92"}),r.jsx("path",{pathLength:"1",d:"M452 236C562 236 566 188 712 188"}),r.jsx("path",{pathLength:"1",d:"M452 236C562 236 566 284 712 284"}),r.jsx("path",{pathLength:"1",d:"M452 236C552 236 556 380 712 380"})]}),r.jsxs("g",{className:"platform-outputs",children:[r.jsx("circle",{className:"platform-output platform-output-1",cx:"712",cy:"92",r:"6"}),r.jsx("circle",{className:"platform-output platform-output-2",cx:"712",cy:"188",r:"6"}),r.jsx("circle",{className:"platform-output platform-output-3",cx:"712",cy:"284",r:"6"}),r.jsx("circle",{className:"platform-output platform-output-4",cx:"712",cy:"380",r:"6"}),r.jsx("text",{x:"690",y:"83",textAnchor:"end",children:"ACCEPT"}),r.jsx("text",{x:"690",y:"179",textAnchor:"end",children:"PAYOUT"}),r.jsx("text",{x:"690",y:"275",textAnchor:"end",children:"SETTLE"}),r.jsx("text",{x:"690",y:"371",textAnchor:"end",children:"CONTROL"})]}),r.jsx("text",{className:"platform-state-caption",x:"550",y:"446",textAnchor:"middle",children:"CONTROLLED SCALE, ONE OPERATING SURFACE"})]}),r.jsxs("g",{className:"platform-transaction-token",children:[r.jsx("circle",{className:"platform-token-halo",cx:"0",cy:"0",r:"11"}),r.jsx("circle",{className:"platform-token-core",cx:"0",cy:"0",r:"4"})]})]})}function x({stage:e}){return r.jsxs("svg",{className:`corridor-mobile-story-state corridor-mobile-story-state-${e}`,viewBox:"0 0 360 156","aria-hidden":"true",children:[r.jsxs("g",{className:"corridor-mobile-state-grid",children:[r.jsx("path",{d:"M12 39H348M12 78H348M12 117H348"}),r.jsx("path",{d:"M90 12V144M180 12V144M270 12V144"})]}),e===1&&r.jsxs(r.Fragment,{children:[r.jsxs("g",{className:"corridor-mobile-state-paths",children:[r.jsx("path",{pathLength:"1",d:"M24 30C102 30 104 54 178 54"}),r.jsx("path",{pathLength:"1",d:"M24 60C96 60 110 72 178 72"}),r.jsx("path",{pathLength:"1",d:"M24 94C104 94 108 86 178 86"}),r.jsx("path",{pathLength:"1",d:"M24 126C96 126 112 104 178 104"})]}),r.jsxs("g",{className:"corridor-mobile-state-nodes",children:[r.jsx("circle",{cx:"24",cy:"30",r:"4"}),r.jsx("circle",{cx:"24",cy:"60",r:"4"}),r.jsx("circle",{cx:"24",cy:"94",r:"4"}),r.jsx("circle",{cx:"24",cy:"126",r:"4"}),r.jsx("rect",{x:"178",y:"40",width:"60",height:"76",rx:"2"})]}),r.jsx("text",{x:"268",y:"82",children:"FRAGMENTED"})]}),e===2&&r.jsxs(r.Fragment,{children:[r.jsxs("g",{className:"corridor-mobile-state-paths",children:[r.jsx("path",{pathLength:"1",d:"M22 30C110 30 116 78 164 78"}),r.jsx("path",{pathLength:"1",d:"M22 62C106 62 116 78 164 78"}),r.jsx("path",{pathLength:"1",d:"M22 94C106 94 116 78 164 78"}),r.jsx("path",{pathLength:"1",d:"M22 126C110 126 116 78 164 78"})]}),r.jsxs("g",{className:"corridor-mobile-state-nodes",children:[r.jsx("circle",{cx:"22",cy:"30",r:"4"}),r.jsx("circle",{cx:"22",cy:"62",r:"4"}),r.jsx("circle",{cx:"22",cy:"94",r:"4"}),r.jsx("circle",{cx:"22",cy:"126",r:"4"}),r.jsx("rect",{className:"corridor-mobile-state-core",x:"164",y:"38",width:"68",height:"80",rx:"2"})]}),r.jsx("text",{x:"198",y:"75",textAnchor:"middle",children:"ONE"}),r.jsx("text",{x:"198",y:"91",textAnchor:"middle",children:"PLATFORM"})]}),e===3&&r.jsxs(r.Fragment,{children:[r.jsxs("g",{className:"corridor-mobile-state-paths",children:[r.jsx("path",{pathLength:"1",d:"M22 78H128"}),r.jsx("path",{pathLength:"1",d:"M196 78C238 78 244 28 336 28"}),r.jsx("path",{pathLength:"1",d:"M196 78C246 78 250 62 336 62"}),r.jsx("path",{pathLength:"1",d:"M196 78C246 78 250 96 336 96"}),r.jsx("path",{pathLength:"1",d:"M196 78C238 78 244 130 336 130"})]}),r.jsxs("g",{className:"corridor-mobile-state-nodes",children:[r.jsx("circle",{cx:"22",cy:"78",r:"4"}),r.jsx("rect",{className:"corridor-mobile-state-core",x:"128",y:"38",width:"68",height:"80",rx:"2"}),r.jsx("circle",{cx:"336",cy:"28",r:"4"}),r.jsx("circle",{cx:"336",cy:"62",r:"4"}),r.jsx("circle",{cx:"336",cy:"96",r:"4"}),r.jsx("circle",{cx:"336",cy:"130",r:"4"})]}),r.jsx("text",{x:"162",y:"75",textAnchor:"middle",children:"CONTROLLED"}),r.jsx("text",{x:"162",y:"91",textAnchor:"middle",children:"OUTPUT"})]})]})}function A(){return r.jsxs("div",{className:"corridor-home","data-corridor-home":!0,children:[r.jsxs("section",{className:"corridor-hero","data-corridor-pointer":!0,children:[r.jsx(C,{}),r.jsx("div",{className:"corridor-hero-glow corridor-pointer-light","aria-hidden":"true","data-corridor-pointer-light":!0}),r.jsxs("div",{className:"corridor-hero-inner",children:[r.jsxs("div",{className:"corridor-hero-copy",children:[r.jsxs(o,{inverse:!0,children:[r.jsx("span",{className:"corridor-hero-kicker-complete",children:"Rizwan Zafar · Chief Product Officer at Simpaisa · Dubai"}),r.jsx("span",{className:"corridor-hero-kicker-compact","aria-hidden":"true",children:"Rizwan Zafar · CPO, Simpaisa · Dubai"})]}),r.jsxs("h1",{"aria-label":"I scale regulated payment infrastructure across complex markets.",children:[r.jsxs("span",{className:"corridor-hero-title-complete","aria-hidden":"true",children:[r.jsx("span",{className:"corridor-hero-line",children:r.jsx("span",{children:"I scale regulated"})}),r.jsx("span",{className:"corridor-hero-line corridor-hero-line-emphasis",children:r.jsx("span",{children:"payment infrastructure"})}),r.jsx("span",{className:"corridor-hero-line",children:r.jsxs("span",{children:["across complex markets.",r.jsx("i",{className:"corridor-hero-dot","aria-hidden":"true"})]})})]}),r.jsxs("span",{className:"corridor-hero-title-compact","aria-hidden":"true",children:[r.jsx("span",{className:"corridor-hero-line",children:r.jsx("span",{children:"I scale payments"})}),r.jsx("span",{className:"corridor-hero-line corridor-hero-line-emphasis",children:r.jsx("span",{children:"across complex"})}),r.jsx("span",{className:"corridor-hero-line",children:r.jsxs("span",{children:["markets.",r.jsx("i",{className:"corridor-hero-dot","aria-hidden":"true"})]})})]})]}),r.jsx("p",{className:"corridor-hero-lede",children:"I lead products and programmes where local rails, risk, compliance and operations meet."}),r.jsxs("p",{className:"corridor-hero-proof",children:[r.jsxs("strong",{children:[n.years," years"]}),r.jsxs("span",{className:"corridor-hero-proof-complete",children:["across ",n.marketCount," career markets"]}),r.jsxs("span",{className:"corridor-hero-proof-compact","aria-hidden":"true",children:["· ",n.marketCount," markets"]})]}),r.jsxs("div",{className:"corridor-actions",children:[r.jsx(t,{to:"/product-work",className:"corridor-button corridor-button-primary","data-corridor-magnetic":!0,children:r.jsxs("span",{className:"corridor-button-label","data-corridor-magnetic-target":!0,children:["View selected work ",r.jsx(a,{})]})}),r.jsxs("span",{className:"corridor-hero-links",children:[r.jsxs(t,{to:"/journey",className:"corridor-text-link corridor-text-link-inverse",children:["Leadership journey ",r.jsx(a,{})]}),r.jsxs("a",{href:d.resumeHref,download:!0,className:"corridor-text-link corridor-text-link-inverse",children:["Résumé ",r.jsx("span",{"aria-hidden":"true",children:"↓"})]})]})]})]}),r.jsxs("figure",{className:"corridor-portrait","aria-label":"Portrait of Rizwan Zafar",children:[r.jsx("span",{className:"corridor-portrait-frame","aria-hidden":"true"}),r.jsxs("picture",{children:[r.jsx("source",{type:"image/webp",srcSet:`${m} 460w, ${u} 920w`,sizes:"(max-width: 767px) 100vw, (max-width: 1023px) 52vw, 42vw"}),r.jsx("img",{src:j,width:"928",height:"1152",alt:"Rizwan Zafar, Chief Product Officer and payments executive",fetchPriority:"high",decoding:"async"})]}),r.jsx("figcaption",{children:"Product · Programme · Payments"})]})]}),r.jsxs("a",{href:"#platform-proof",className:"corridor-scroll-cue","aria-label":"Continue to platform proof",children:[r.jsx("span",{children:"Continue"}),r.jsx("i",{"aria-hidden":"true"})]})]}),r.jsx("section",{className:"corridor-ledger",id:"platform-proof","aria-labelledby":"ledger-title","data-corridor-scene":!0,children:r.jsxs("div",{className:"corridor-section-shell",children:[r.jsxs("header",{className:"corridor-ledger-header","data-corridor-reveal":!0,children:[r.jsx(o,{inverse:!0,children:"Simpaisa platform · at a glance"}),r.jsx("h2",{id:"ledger-title",children:"Scale, with its scope made explicit."})]}),r.jsxs("div",{className:"corridor-ledger-route","aria-hidden":"true","data-corridor-focal":!0,children:[r.jsx("i",{}),r.jsx("i",{}),r.jsx("i",{}),r.jsx("i",{})]}),r.jsxs("dl",{className:"corridor-metrics","data-corridor-reveal":!0,children:[r.jsxs("div",{children:[r.jsx("dt",{children:"Annual GTV"}),r.jsx("dd",{children:i.gtv})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Payments a year"}),r.jsx("dd",{children:i.annualPayments})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Merchants served"}),r.jsx("dd",{children:i.merchants})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Live markets today"}),r.jsx("dd",{children:i.marketCount})]})]}),r.jsxs("div",{className:"corridor-ledger-foot","data-corridor-reveal":!0,children:[r.jsxs("p",{children:["Platform metrics only — separate from ",n.years," years across ",n.marketCount," ","career markets."]}),r.jsxs("a",{href:"#flagship-story",className:"corridor-text-link corridor-text-link-inverse",children:["See how the platform was built ",r.jsx(a,{})]})]})]})}),r.jsxs("section",{className:"corridor-flagship",id:"flagship-story","aria-labelledby":"flagship-title","data-corridor-story":!0,"data-corridor-scene":!0,"data-stage":"1",children:[r.jsx(p,{tone:"light"}),r.jsx("div",{className:"corridor-flagship-folio","aria-hidden":"true",children:"01"}),r.jsxs("div",{className:"corridor-flagship-layout",children:[r.jsxs("div",{className:"corridor-story-copy",children:[r.jsxs("header",{"data-corridor-reveal":!0,children:[r.jsx(o,{children:"Operating record"}),r.jsx("h2",{id:"flagship-title",children:"From fragmented rails to one dependable platform."}),r.jsxs("p",{className:"corridor-role-line",children:[r.jsx("strong",{children:"My role:"})," Chief Product Officer; acting CTO during the 2024 regulatory tightening. I owned product strategy, platform roadmap, partner integrations and the operating model."]})]}),r.jsxs("article",{className:"corridor-story-step","data-corridor-step":"1","data-active":!0,children:[r.jsx("span",{children:"01 / Challenge"}),r.jsx("h3",{children:"One merchant. Too many rails."}),r.jsx("p",{children:"Cards, wallets, bank transfers, DCB and cross-border payouts were fragmented by market, partner and operating rule."}),r.jsx(x,{stage:1})]}),r.jsxs("article",{className:"corridor-story-step","data-corridor-step":"2",children:[r.jsx("span",{children:"02 / Decisions"}),r.jsx("h3",{children:"Make complexity a platform concern."}),r.jsx("p",{children:"A stable API, canonical ledger, corridor-aware routing and shared risk controls turned local rails into one product surface."}),r.jsx(x,{stage:2})]}),r.jsxs("article",{className:"corridor-story-step","data-corridor-step":"3",children:[r.jsx("span",{children:"03 / Outcomes"}),r.jsx("h3",{children:"Scale without losing control."}),r.jsxs("p",{children:[i.gtv," annual GTV, ",i.annualPayments," payments a year and a"," ",i.settlementSla," settlement SLA across ",i.marketCount," live markets."]}),r.jsx(x,{stage:3}),r.jsxs(t,{to:"/product-work/$slug",params:{slug:"simpaisa-payment-infrastructure"},className:"corridor-button corridor-button-dark",children:["Explore the full case study ",r.jsx(a,{})]})]})]}),r.jsxs("div",{className:"corridor-story-visual","data-corridor-pointer":!0,"data-corridor-focal":!0,children:[r.jsx("span",{className:"corridor-pointer-light","aria-hidden":"true","data-corridor-pointer-light":!0}),r.jsxs("div",{className:"corridor-story-sticky",children:[r.jsxs("div",{className:"corridor-story-label",children:[r.jsx("span",{children:"Acceptance"}),r.jsx("span",{children:"Payouts"}),r.jsx("span",{children:"Cross-border"}),r.jsx("span",{children:"Risk"})]}),r.jsx(L,{}),r.jsxs("div",{className:"corridor-story-proof","aria-label":"Platform outcomes",children:[r.jsxs("span",{children:[r.jsx("strong",{children:i.gtv})," annual GTV"]}),r.jsxs("span",{children:[r.jsx("strong",{children:i.annualPayments})," payments / yr"]}),r.jsxs("span",{children:[r.jsx("strong",{children:i.settlementSla})," settlement SLA"]})]}),r.jsxs("ol",{className:"corridor-story-progress","aria-label":"Case study progress",children:[r.jsx("li",{children:"Challenge"}),r.jsx("li",{children:"Decisions"}),r.jsx("li",{children:"Outcomes"})]})]})]})]})]}),r.jsxs("section",{className:"corridor-support","aria-labelledby":"support-title",children:[r.jsx("h2",{id:"support-title",className:"sr-only",children:"Selected operating stories"}),r.jsxs("article",{className:"corridor-support-story corridor-support-light","data-corridor-scene":!0,children:[r.jsxs("div",{className:"corridor-support-copy",children:[r.jsx(o,{children:"Selected story · Daraz, Alibaba Group"}),r.jsx("h3",{children:"Acceptance is a trust problem wearing a checkout interface."}),r.jsxs("dl",{className:"corridor-case-record",children:[r.jsxs("div",{children:[r.jsx("dt",{children:"Context"}),r.jsxs("dd",{children:["Checkout acceptance across ",b.marketsWord," South Asian markets through a COVID-driven volume surge."]})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Decision"}),r.jsx("dd",{children:"Treat COD-to-digital as a trust, local-method and risk-rules programme."})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Outcome"}),r.jsxs("dd",{children:[r.jsx("strong",{children:"~40%"})," wider payment coverage · shorter dispute cycles"]})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"My role"}),r.jsx("dd",{children:"Owned multi-country payment operations and the checkout-acceptance surface."})]})]}),r.jsxs(t,{to:"/product-work/$slug",params:{slug:"daraz-payment-operations"},className:"corridor-text-link",children:["View the Daraz story ",r.jsx(a,{})]})]}),r.jsxs("svg",{className:"corridor-support-diagram corridor-support-diagram-journey",viewBox:"0 0 820 340","aria-hidden":"true",children:[r.jsxs("g",{className:"corridor-checkout-steps",children:[[[36,"ORDER"],[226,"METHOD"],[416,"RISK"],[606,"ACCEPTED"]].map(([e,s])=>r.jsxs("g",{children:[r.jsx("rect",{className:"corridor-support-target",x:e,y:"42",width:"146",height:"92",rx:"4"}),r.jsx("text",{x:Number(e)+73,y:"94",textAnchor:"middle",children:s})]},String(s))),r.jsx("path",{className:"corridor-support-path",pathLength:"1",d:"M182 88H226M372 88H416M562 88H606"})]}),r.jsx("path",{className:"corridor-support-path corridor-market-path",pathLength:"1",d:"M70 262C194 186 284 300 404 230S612 186 758 258"}),r.jsx("g",{className:"corridor-market-nodes",children:[[70,262,"PK"],[236,238,"BD"],[404,230,"LK"],[570,222,"NP"],[758,258,"MM"]].map(([e,s,c])=>r.jsxs("g",{children:[r.jsx("circle",{className:"corridor-support-node",cx:e,cy:s,r:"8"}),r.jsx("text",{x:Number(e),y:Number(s)+31,textAnchor:"middle",children:c})]},String(c)))})]})]}),r.jsxs("article",{className:"corridor-support-story corridor-support-dark","data-corridor-scene":!0,children:[r.jsxs("div",{className:"corridor-support-copy",children:[r.jsx(o,{inverse:!0,children:"Selected story · Tapmad"}),r.jsx("h3",{children:"Payment cost is a product variable."}),r.jsxs("dl",{className:"corridor-case-record",children:[r.jsxs("div",{children:[r.jsx("dt",{children:"Context"}),r.jsx("dd",{children:"Operator economics consumed up to half of subscription revenue."})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Decision"}),r.jsx("dd",{children:"Build DCB, then migrate the billing model toward wallet-native payments."})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"Outcome"}),r.jsxs("dd",{children:[r.jsx("strong",{children:"50% → ~1%"})," payment cost · ",r.jsx("strong",{children:"5M+"})," subscribers"]})]}),r.jsxs("div",{children:[r.jsx("dt",{children:"My role"}),r.jsx("dd",{children:"Owned monetisation and billing across Pakistan, UAE and KSA."})]})]}),r.jsxs(t,{to:"/product-work/$slug",params:{slug:"tapmad-dcb-monetisation-wallet-migration"},className:"corridor-text-link corridor-text-link-inverse",children:["View the Tapmad story ",r.jsx(a,{})]})]}),r.jsxs("svg",{className:"corridor-support-diagram corridor-support-diagram-cost",viewBox:"0 0 520 340","aria-hidden":"true",children:[r.jsx("circle",{className:"corridor-support-ring corridor-support-ring-outer",cx:"112",cy:"170",r:"82"}),r.jsx("circle",{className:"corridor-support-ring corridor-support-ring-inner",cx:"112",cy:"170",r:"48"}),r.jsx("path",{className:"corridor-support-path",pathLength:"1",d:"M194 170H338"}),r.jsx("path",{className:"corridor-support-path corridor-support-arrow",pathLength:"1",d:"M314 146L338 170L314 194"}),r.jsx("rect",{className:"corridor-support-target",x:"366",y:"106",width:"112",height:"128",rx:"4"}),r.jsx("text",{className:"corridor-support-label corridor-support-label-source",x:"112",y:"164",textAnchor:"middle",children:"50%"}),r.jsx("text",{x:"112",y:"188",textAnchor:"middle",children:"DCB COST"}),r.jsx("text",{className:"corridor-support-label corridor-support-label-target",x:"422",y:"164",textAnchor:"middle",children:"~1%"}),r.jsx("text",{x:"422",y:"188",textAnchor:"middle",children:"WALLET"})]})]})]}),r.jsx("section",{className:"corridor-ecosystem","aria-labelledby":"ecosystem-title","data-corridor-scene":!0,children:r.jsxs("div",{className:"corridor-section-shell",children:[r.jsxs("header",{"data-corridor-reveal":!0,children:[r.jsx(o,{children:"Platform ecosystem"}),r.jsx("h2",{id:"ecosystem-title",children:"Global reach. Local depth."}),r.jsx("p",{children:"Built across local rails, global platforms and regulated markets."})]}),r.jsxs("div",{className:"corridor-trust-map","data-corridor-reveal":!0,"data-corridor-focal":!0,children:[r.jsxs("div",{className:"corridor-trust-origin","aria-hidden":"true",children:[r.jsx("span",{children:"Simpaisa"}),r.jsx("small",{children:"Local infrastructure layer"})]}),r.jsx("div",{className:"corridor-relationship-groups",children:g.map((e,s)=>r.jsxs("section",{className:`corridor-relationship-group corridor-relationship-group-${s+1}`,"aria-labelledby":`relationship-${e.label.replaceAll(" ","-")}`,children:[r.jsxs("h3",{id:`relationship-${e.label.replaceAll(" ","-")}`,children:[r.jsxs("span",{children:["0",s+1]}),e.label]}),r.jsx("ul",{children:e.items.map(([c,y,f],v)=>r.jsx("li",{style:{"--corridor-logo-index":s*5+v},children:r.jsx(t,{to:"/product-work/$slug",params:{slug:"simpaisa-payment-infrastructure"},className:"corridor-relationship-link","aria-label":`${c} — explore the Simpaisa platform story`,children:r.jsx("img",{src:y,width:f,height:"29",alt:"",loading:"lazy",decoding:"async"})})},c))})]},e.label))}),r.jsx("aside",{className:"corridor-featured-relationship","aria-label":"Relationship context",children:g.map((e,s)=>r.jsxs("article",{className:`corridor-featured-story corridor-featured-story-${s+1}`,children:[r.jsx("span",{children:e.story.label}),r.jsx("h3",{children:e.story.title}),r.jsx("p",{children:e.story.body}),r.jsx("small",{children:e.items.map(([c])=>c).join(" · ")})]},e.story.label))})]}),r.jsxs("div",{className:"corridor-ecosystem-foot",children:[r.jsx("p",{children:"Public relationship marks reproduced from Simpaisa’s current company page."}),r.jsxs(t,{to:"/product-work/$slug",params:{slug:"simpaisa-payment-infrastructure"},className:"corridor-button corridor-button-dark",children:["Explore the platform story ",r.jsx(a,{})]})]})]})}),r.jsxs("section",{className:"corridor-leadership","aria-labelledby":"leadership-title","data-corridor-scene":!0,children:[r.jsx(p,{tone:"dark"}),r.jsx("div",{className:"corridor-section-shell",children:r.jsxs("div",{className:"corridor-leadership-stage",children:[r.jsxs("header",{className:"corridor-leadership-header",children:[r.jsx(o,{inverse:!0,children:"Leadership in practice"}),r.jsxs("h2",{id:"leadership-title","aria-label":"Building payment systems that hold up in the real world.",children:[r.jsx("span",{className:"corridor-leadership-title-line","aria-hidden":"true",children:r.jsx("span",{children:"Building"})}),r.jsx("span",{className:"corridor-leadership-title-line","aria-hidden":"true",children:r.jsx("span",{children:"payment systems"})}),r.jsx("span",{className:"corridor-leadership-title-line","aria-hidden":"true",children:r.jsx("span",{children:"that hold up in"})}),r.jsx("span",{className:"corridor-leadership-title-line","aria-hidden":"true",children:r.jsx("span",{children:"the real world."})})]}),r.jsx("p",{className:"corridor-leadership-discipline","data-corridor-reveal":!0,children:"Strategy, infrastructure, operations."})]}),r.jsx("figure",{className:"corridor-leadership-portrait",children:r.jsxs("picture",{children:[r.jsx("source",{type:"image/webp",srcSet:`${m} 460w, ${u} 920w`,sizes:"(max-width: 900px) 100vw, 44vw"}),r.jsx("img",{src:j,width:"928",height:"1152",alt:"Rizwan Zafar, payments product and technology leader",loading:"lazy",decoding:"async"})]})}),r.jsxs("ol",{className:"corridor-leadership-eras","aria-label":"Career progression",children:[r.jsx("li",{"data-corridor-reveal":!0,children:r.jsxs(t,{to:"/journey",className:"corridor-leadership-era",children:[r.jsx("span",{className:"corridor-leadership-number","aria-hidden":"true",children:"01"}),r.jsxs("div",{className:"corridor-leadership-era-main",children:[r.jsx("h3",{children:"Engineering → PMO"}),r.jsx("span",{children:"Built the delivery discipline before owning product systems."})]}),r.jsxs("span",{className:"corridor-leadership-era-meta",children:[r.jsx("time",{dateTime:"2009",children:"2009 — 2016"}),r.jsx("strong",{children:"PESCO · DS Engineering Services"}),r.jsx("small",{children:"Planning Engineer → Project Manager, PMO"})]}),r.jsx("span",{className:"corridor-leadership-era-arrow","aria-hidden":"true",children:"↗"})]})}),r.jsx("li",{"data-corridor-reveal":!0,children:r.jsxs(t,{to:"/journey",className:"corridor-leadership-era",children:[r.jsx("span",{className:"corridor-leadership-number","aria-hidden":"true",children:"02"}),r.jsxs("div",{className:"corridor-leadership-era-main",children:[r.jsx("h3",{children:"Programme → Product"}),r.jsx("span",{children:"Monetisation, checkout acceptance and multi-market payment operations."})]}),r.jsxs("span",{className:"corridor-leadership-era-meta",children:[r.jsx("time",{dateTime:"2017",children:"2017 — 2020"}),r.jsx("strong",{children:"Tapmad · Daraz, Alibaba Group"}),r.jsx("small",{children:"Product & Programme Manager → Payments Operations"})]}),r.jsx("span",{className:"corridor-leadership-era-arrow","aria-hidden":"true",children:"↗"})]})}),r.jsx("li",{"data-corridor-reveal":!0,children:r.jsxs(t,{to:"/journey",className:"corridor-leadership-era",children:[r.jsx("span",{className:"corridor-leadership-number","aria-hidden":"true",children:"03"}),r.jsxs("div",{className:"corridor-leadership-era-main",children:[r.jsx("h3",{children:"Platform ownership"}),r.jsx("span",{children:"Product strategy, regulated infrastructure and the operating model together."})]}),r.jsxs("span",{className:"corridor-leadership-era-meta",children:[r.jsx("time",{dateTime:"2020",children:"2020 — Now"}),r.jsx("strong",{children:"Simpaisa"}),r.jsx("small",{children:"Chief Product Officer · Acting CTO, 2024"})]}),r.jsx("span",{className:"corridor-leadership-era-arrow","aria-hidden":"true",children:"↗"})]})})]}),r.jsxs("div",{className:"corridor-leadership-proof","data-corridor-reveal":!0,children:[r.jsxs("p",{children:[r.jsxs("strong",{children:[n.years," years"]}),r.jsx("span",{children:n.marketsPhrase})]}),r.jsxs("p",{children:[r.jsxs("strong",{children:[h.squads," squads"]}),r.jsxs("span",{children:[h.total," · ",h.engineers," · ",h.productOrg]})]}),r.jsxs(t,{to:"/journey",className:"corridor-text-link corridor-text-link-inverse",children:["Read the full journey ",r.jsx(a,{})]})]})]})})]}),r.jsx("section",{className:"corridor-writing","aria-labelledby":"writing-title","data-corridor-scene":!0,children:r.jsxs("div",{className:"corridor-section-shell",children:[r.jsxs("header",{"data-corridor-reveal":!0,children:[r.jsxs("div",{children:[r.jsx(o,{children:"Field notes"}),r.jsx("h2",{id:"writing-title",children:"Ideas tested against live systems."})]}),r.jsxs(t,{to:"/blog",className:"corridor-text-link",children:["Read all essays ",r.jsx(a,{})]})]}),l.length===3&&r.jsxs("div",{className:"corridor-editorial-grid",children:[r.jsxs(t,{to:"/blog/$slug",params:{slug:l[0].slug},className:"corridor-featured-essay","data-corridor-reveal":!0,"data-corridor-pointer":!0,"data-corridor-focal":!0,children:[r.jsx("div",{className:"corridor-featured-essay-art","aria-hidden":"true","data-corridor-pointer-art":!0,children:r.jsxs("svg",{viewBox:"0 0 780 520",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"publication-portal",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{stopColor:"currentColor",stopOpacity:".48"}),r.jsx("stop",{offset:"1",stopColor:"currentColor",stopOpacity:".03"})]})}),r.jsxs("g",{className:"corridor-publication-grid",children:[r.jsx("path",{d:"M54 466L390 258L726 466M94 466L390 286L686 466M144 466L390 316L636 466"}),r.jsx("path",{d:"M112 54L390 258L668 54M170 54L390 286L610 54M228 54L390 316L552 54"}),r.jsx("path",{d:"M54 466H726M108 432H672M166 394H614M226 356H554"}),r.jsx("path",{d:"M112 54V466M188 54V466M264 54V466M516 54V466M592 54V466M668 54V466"})]}),r.jsxs("g",{className:"corridor-publication-frames",children:[r.jsx("rect",{x:"112",y:"54",width:"556",height:"412"}),r.jsx("rect",{x:"188",y:"106",width:"404",height:"312"}),r.jsx("rect",{x:"264",y:"166",width:"252",height:"208"}),r.jsx("rect",{x:"334",y:"222",width:"112",height:"112",fill:"url(#publication-portal)"})]}),r.jsx("path",{className:"corridor-publication-route",pathLength:"1",d:"M68 466C236 438 290 372 390 314V222"}),r.jsx("circle",{cx:"390",cy:"222",r:"8"})]})}),r.jsxs("span",{children:[l[0].category," · ",l[0].readingTime]}),r.jsx("h3",{children:l[0].title}),r.jsx(a,{})]}),r.jsx("div",{className:"corridor-secondary-essays",children:l.slice(1).map((e,s)=>r.jsxs(t,{to:"/blog/$slug",params:{slug:e.slug},"data-corridor-reveal":!0,children:[r.jsxs("span",{children:["0",s+1," · ",e.category]}),r.jsx("h3",{children:e.title}),r.jsx("p",{children:e.readingTime}),r.jsx(a,{})]},e.slug))})]}),r.jsx("nav",{className:"corridor-topic-index","aria-label":"Explore writing topics",children:["Cross-Border Payments","Product Strategy","Settlement & Reconciliation","AI & Product Operations"].map(e=>r.jsx(t,{to:"/blog",search:{q:e},children:e},e))})]})}),r.jsxs("section",{className:"corridor-close","aria-labelledby":"close-title","data-corridor-pointer":!0,"data-corridor-scene":!0,children:[r.jsx(p,{tone:"dark"}),r.jsx("span",{className:"corridor-pointer-light","aria-hidden":"true","data-corridor-pointer-light":!0}),r.jsxs("div",{className:"corridor-close-inner",children:[r.jsxs("div",{className:"corridor-close-copy","data-corridor-reveal":!0,children:[r.jsx(o,{inverse:!0,children:"Direct line"}),r.jsx("h2",{id:"close-title",children:"Building through complexity?"}),r.jsx("p",{children:"I’m open to senior product, payments and transformation roles — and thoughtful conversations about the systems behind them."}),r.jsxs("div",{className:"corridor-close-links",children:[r.jsxs(t,{to:"/contact",className:"corridor-text-link corridor-text-link-inverse",children:["Contact details ",r.jsx(a,{})]}),r.jsx("a",{href:d.resumeHref,download:!0,className:"corridor-text-link corridor-text-link-inverse",children:"Download résumé ↓"})]})]}),r.jsxs("div",{className:"corridor-close-channel","data-corridor-reveal":!0,"data-corridor-pointer-art":!0,children:[r.jsxs("span",{children:["Email · ",d.location]}),r.jsxs("a",{href:`mailto:${d.email}`,children:[d.email,r.jsx(a,{})]}),r.jsx("p",{children:"Product · Programme · Payments"})]})]})]}),r.jsx("script",{dangerouslySetInnerHTML:{__html:w}})]})}M.map(e=>({"@type":"Question",name:e.q,acceptedAnswer:{"@type":"Answer",text:e.a}}));const k=A;export{k as component};
