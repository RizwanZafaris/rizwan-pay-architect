import{J as t,P as f,q as r,L as l,t as b,X as v}from"./index-CiI51hHb.js";import{c as o,i as w}from"./case-study-ui-3pp72JBT.js";const h=[{id:"pci-iso",label:"PCI DSS · ISO 27001",match:e=>/(PCI|ISO\s?27001)/i.test([e.category,...e.keywords,...e.impact??[]].join(" "))},{id:"aml-cft",label:"AML/CFT · Sanctions",match:e=>/(AML|CFT|sanctions|PEP)/i.test([e.category,...e.keywords].join(" "))},{id:"kyc-kyb",label:"KYC / KYB",match:e=>/(KYC|KYB|onboarding)/i.test([e.category,...e.keywords].join(" "))},{id:"fraud-risk",label:"Fraud & Risk",match:e=>/(fraud|risk|chargeback)/i.test([e.category,...e.keywords].join(" "))},{id:"settlement",label:"Settlement & Recon",match:e=>/(settlement|reconcil|ledger|treasury)/i.test([e.category,...e.keywords].join(" "))},{id:"cross-border",label:"Cross-Border & FX",match:e=>/(cross-border|corridor|FX|remittance)/i.test([e.category,...e.keywords].join(" "))},{id:"infrastructure",label:"Payment Infrastructure",match:e=>/(infrastructure|platform|wallet|rail|API)/i.test([e.category,...e.keywords].join(" "))}],k=["Geidea","Magnati"],j=new Set([...v.relevantFor,...k]),S=Array.from(new Set(r.flatMap(e=>e.relevantFor??[]))).filter(e=>j.has(e)).sort(),N=h.filter(e=>r.some(a=>e.match(a))),c=e=>h.filter(a=>a.match(e)).map(a=>a.id).join("|"),x=[{id:"payments",label:"Payments",match:e=>/(payment|acquir|wallet|DCB|IBFT|settlement|reconcil|billing|BNPL|MPGS|MDES|token|3DS|click to pay)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"ecommerce",label:"E-commerce",match:e=>e.slug.startsWith("daraz-")||/(marketplace|e-commerce|checkout conversion|COD to digital)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"ott",label:"OTT & subscriptions",match:e=>e.slug.startsWith("tapmad-")||/(OTT|subscription|streaming|ARPU)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"compliance",label:"Compliance",match:e=>/(AML|CFT|sanctions|PEP|KYC|KYB|onboarding|PCI|ISO\s?27001|governance|CSP)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"cross-border",label:"Cross-border",match:e=>/(cross-border|corridor|FX|remittance|SWIFT|ISO 20022|gpi|correspondent)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"onboarding",label:"Onboarding",match:e=>/(onboarding|KYC|KYB|UBO|activation)/i.test([e.category,e.title,...e.keywords].join(" "))}],C=x.filter(e=>r.some(a=>e.match(a))),d=e=>x.filter(a=>a.match(e)).map(a=>a.id).join("|"),A=["simpaisa-payment-infrastructure","settlement-reconciliation","merchant-onboarding-kyc","mdes-network-tokenisation-rollout","tapmad-dcb-monetisation-wallet-migration","simpaisa-ai-solutions-suite"],P=new Map(r.map(e=>[e.slug,e])),g=A.map(e=>P.get(e)).filter(e=>!!e?.flagship),F=new Set(g.map(e=>e.slug)),m=r.filter(e=>!F.has(e.slug)),T=`
(() => {
  if (window.__rzPwFilterBound) return;
  window.__rzPwFilterBound = true;

  const companySel = document.querySelector('#pw-company');
  const themeSel = document.querySelector('#pw-theme');
  const results = Array.from(document.querySelectorAll('[data-pw-result]'));
  if (!companySel || !themeSel || results.length === 0) return;
  const countEl = document.querySelector('[data-pw-count]');
  const emptyEl = document.querySelector('[data-pw-empty]');
  // Industry lens is a set of chip <button>s (not a <select>) so the homepage
  // pillars land on a visible, tappable state. Current value lives in a var,
  // seeded from ?industry= on load.
  const industryChips = Array.from(document.querySelectorAll('[data-pw-industry]'));

  const params = new URLSearchParams(window.location.search);
  companySel.value = params.get('company') || '';
  themeSel.value = params.get('theme') || '';
  let industry = params.get('industry') || '';

  const hasToken = (value, selected) => !selected || (value || '').split('|').includes(selected);

  const syncChips = () => {
    for (const chip of industryChips) {
      const on = chip.getAttribute('data-pw-industry') === industry;
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
      chip.dataset.pwActive = on ? 'true' : 'false';
    }
  };

  const apply = () => {
    const company = companySel.value;
    const theme = themeSel.value;
    let count = 0;
    for (const el of results) {
      const matches =
        hasToken(el.getAttribute('data-pw-companies'), company) &&
        hasToken(el.getAttribute('data-pw-themes'), theme) &&
        hasToken(el.getAttribute('data-pw-industries'), industry);
      el.hidden = !matches;
      if (matches) count++;
    }
    if (countEl) countEl.textContent = String(count);
    if (emptyEl) emptyEl.hidden = count !== 0;
    syncChips();
    // Merge into the existing query (preserving utm_*/click-ids for the
    // cal.com forwarder and analytics) and keep the hash; no-op when the
    // URL is already correct so the initial apply() never rewrites history.
    const next = new URLSearchParams(window.location.search);
    if (company) next.set('company', company); else next.delete('company');
    if (theme) next.set('theme', theme); else next.delete('theme');
    if (industry) next.set('industry', industry); else next.delete('industry');
    const qs = next.toString();
    const nextUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, '', nextUrl);
    }
  };

  companySel.addEventListener('change', apply);
  themeSel.addEventListener('change', apply);
  industryChips.forEach((chip) => {
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      const value = chip.getAttribute('data-pw-industry') || '';
      // Toggle: clicking the active chip clears the industry filter.
      industry = industry === value ? '' : value;
      apply();
    });
  });
  document.querySelectorAll('[data-pw-clear]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      companySel.value = '';
      themeSel.value = '';
      industry = '';
      apply();
    });
  });

  apply();
})();
`;function L(){return t.jsxs("div",{className:"mx-auto max-w-6xl overflow-x-clip px-5 py-12 sm:px-6 sm:py-20",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ Product work"}),t.jsxs("h1",{className:"mt-3 max-w-4xl break-words font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink [overflow-wrap:anywhere]",children:["Case studies in"," ",t.jsx("span",{className:"italic text-[var(--brand)]",children:"regulated payments infrastructure."})]}),t.jsxs("p",{className:"mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg",children:["Real systems shipped at ",f.gtv," GTV scale. Filter by industry, by the companies this work is most relevant to, or by compliance theme."]}),t.jsxs("div",{className:"mt-8 sm:mt-10",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:"Industry"}),t.jsx("div",{className:"mt-3 flex flex-wrap gap-2",role:"group","aria-label":"Filter by industry",children:C.map(e=>t.jsx("button",{type:"button","data-pw-industry":e.id,"aria-pressed":"false",className:"rounded-full border border-rule bg-surface px-3 py-1.5 text-xs font-mono-tech uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink/40 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 data-[pw-active=true]:border-[var(--brand)] data-[pw-active=true]:bg-[var(--brand)]/10 data-[pw-active=true]:text-[var(--brand)]",children:e.label},e.id))})]}),t.jsxs("div",{className:"mt-6 grid gap-4 border-y border-rule py-5 sm:grid-cols-2",children:[t.jsx(u,{id:"pw-company",label:"Relevant company",options:S}),t.jsx(u,{id:"pw-theme",label:"Compliance theme",options:N.map(e=>({value:e.id,label:e.label}))})]}),t.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-ink-soft",children:[t.jsxs("span",{"aria-live":"polite",children:["Showing ",t.jsx("span",{"data-pw-count":!0,children:r.length})," of ",r.length," case"," ",r.length===1?"study":"studies"]}),t.jsx("button",{type:"button","data-pw-clear":!0,className:"uppercase tracking-[0.18em] text-ink hover:text-[var(--brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded",children:"Clear filters"})]}),t.jsxs("div",{hidden:!0,"data-pw-empty":!0,className:"mt-8 border border-dashed border-rule p-10 text-center text-ink-soft",children:["No case studies match those filters."," ",t.jsx("button",{type:"button","data-pw-clear":!0,className:"underline text-ink hover:text-[var(--brand)]",children:"Clear filters"})]}),t.jsxs("section",{className:"rz-beam relative mt-12 border-t border-rule pt-10 md:mt-16 md:pt-12",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ Selected work"}),t.jsx("h2",{className:"mt-3 font-instrument text-3xl leading-tight text-ink md:text-4xl",children:"Six flagship builds, in depth."}),t.jsx("div",{"data-rz-stagger":!0,className:"mt-10 flex flex-col gap-14 md:mt-14 md:gap-24",children:g.map((e,a)=>{const n=e.metrics?.[0],s=a%2===1;return t.jsxs(l,{to:"/product-work/$slug",params:{slug:e.slug},"data-pw-result":!0,"data-pw-companies":(e.relevantFor??[]).join("|"),"data-pw-themes":c(e),"data-pw-industries":d(e),"data-glow":!0,className:"group relative grid min-w-0 items-center gap-6 md:grid-cols-12 md:gap-12",children:[t.jsxs("div",{className:`rz-unveil relative aspect-[16/10] min-w-0 overflow-hidden rounded-lg bg-ink md:col-span-7 ${s?"md:order-2":""}`,children:[t.jsx("img",{src:b(e.slug),alt:e.imageAlt??`${e.title} — abstract editorial illustration`,width:800,height:450,loading:a<2?"eager":"lazy",decoding:"async",className:"absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:scale-[1.035]"}),t.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(180deg, color-mix(in oklab, var(--background) 40%, transparent) 0%, transparent 40%, color-mix(in oklab, var(--background) 55%, transparent) 100%)"}}),t.jsxs("div",{className:"absolute top-4 left-5 z-10 font-mono-tech text-[10px] tracking-[0.18em] text-ink uppercase",children:["◆ Case study /",String(a+1).padStart(2,"0")]})]}),t.jsxs("div",{className:`min-w-0 md:col-span-5 ${s?"md:order-1":""}`,children:[t.jsx("span",{className:"text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]",children:e.category}),n&&t.jsxs("div",{className:"mt-4",children:[t.jsx("div",{className:`break-words font-instrument italic leading-none tracking-tight text-ink tabular-nums ${w(o(n))?"text-4xl sm:text-5xl lg:text-6xl":"text-2xl sm:text-3xl lg:text-4xl"}`,children:o(n)}),t.jsx("div",{className:"mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:n.label})]}),t.jsx("h2",{className:"mt-5 break-words font-instrument text-2xl leading-tight text-ink transition-colors group-hover:text-[var(--brand)] md:text-3xl",children:e.title}),t.jsx("p",{className:"mt-3 max-w-md text-sm leading-relaxed text-ink-soft md:text-[15px]",children:p(e.tagline)}),t.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:e.keywords.slice(0,4).map(i=>t.jsx("span",{className:"rounded-full border border-rule bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech",children:i},i))}),t.jsxs("span",{className:"mt-5 inline-flex items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-[var(--brand)]",children:["Read case study",t.jsx("span",{className:"transition-transform group-hover:translate-x-1","aria-hidden":!0,children:"→"})]})]})]},e.slug)})})]}),m.length>0&&t.jsxs("section",{className:"rz-beam relative mt-16 border-t border-rule pt-10 md:mt-20 md:pt-12",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech font-semibold",children:"Additional programmes"}),t.jsx("h2",{className:"mt-3 font-instrument text-3xl leading-tight text-ink md:text-4xl",children:"The rest of the record, in brief."}),t.jsx("div",{"data-rz-stagger":!0,className:"mt-10 divide-y divide-rule border-t border-rule",children:m.map(e=>t.jsxs(l,{to:"/product-work/$slug",params:{slug:e.slug},"data-pw-result":!0,"data-pw-companies":(e.relevantFor??[]).join("|"),"data-pw-themes":c(e),"data-pw-industries":d(e),"data-glow":!0,className:"group relative grid min-w-0 gap-y-2 py-6 md:grid-cols-12 md:gap-x-8 md:py-7",children:[t.jsx("div",{className:"md:col-span-3",children:t.jsx("span",{className:"text-[10px] uppercase tracking-[0.14em] text-[var(--brand)] font-mono-tech",children:e.category})}),t.jsxs("div",{className:"min-w-0 md:col-span-7",children:[t.jsx("h3",{className:"break-words font-instrument text-xl leading-[1.15] text-ink transition-all duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5 group-hover:text-[var(--brand)] md:text-2xl",children:e.title}),t.jsx("p",{className:"mt-2 text-sm leading-relaxed text-ink-soft md:line-clamp-1",children:p(e.tagline)}),e.markets&&e.markets.length>0&&t.jsx("div",{className:"mt-3 flex flex-wrap gap-1.5",children:e.markets.slice(0,5).map(a=>t.jsx("span",{className:"rounded-full border border-rule bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech",children:a},a))})]}),t.jsx("div",{className:"flex items-center gap-4 md:col-span-2 md:justify-end md:self-center",children:t.jsx("span",{className:"hidden text-lg text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:inline","aria-hidden":!0,children:"→"})})]},e.slug))})]}),t.jsx("script",{dangerouslySetInnerHTML:{__html:T}})]})}function p(e){return e.length<=210?e:`${e.slice(0,207).replace(/\s+\S*$/,"")}...`}function u({id:e,label:a,options:n}){return t.jsxs("div",{className:"block",children:[t.jsx("label",{htmlFor:e,className:"text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:a}),t.jsxs("select",{id:e,name:e,"aria-label":a,defaultValue:"",className:"mt-2 w-full rounded-lg border border-rule bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus:border-ink/60",children:[t.jsx("option",{value:"",children:"All"}),n.map(s=>{const i=typeof s=="string"?s:s.value,y=typeof s=="string"?s:s.label;return t.jsx("option",{value:i,children:y},i)})]})]})}export{L as component};
