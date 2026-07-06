import{w as t,k as s,L as m,n as p,F as u}from"./index-De2SE3Gk.js";import{c as h}from"./case-study-ui-DOkaIf3J.js";const l=[{id:"pci-iso",label:"PCI DSS · ISO 27001",match:e=>/(PCI|ISO\s?27001)/i.test([e.category,...e.keywords,...e.impact??[]].join(" "))},{id:"aml-cft",label:"AML/CFT · Sanctions",match:e=>/(AML|CFT|sanctions|PEP)/i.test([e.category,...e.keywords].join(" "))},{id:"kyc-kyb",label:"KYC / KYB",match:e=>/(KYC|KYB|onboarding)/i.test([e.category,...e.keywords].join(" "))},{id:"fraud-risk",label:"Fraud & Risk",match:e=>/(fraud|risk|chargeback)/i.test([e.category,...e.keywords].join(" "))},{id:"settlement",label:"Settlement & Recon",match:e=>/(settlement|reconcil|ledger|treasury)/i.test([e.category,...e.keywords].join(" "))},{id:"cross-border",label:"Cross-Border & FX",match:e=>/(cross-border|corridor|FX|remittance)/i.test([e.category,...e.keywords].join(" "))},{id:"infrastructure",label:"Payment Infrastructure",match:e=>/(infrastructure|platform|wallet|rail|API)/i.test([e.category,...e.keywords].join(" "))}],x=["Geidea","Magnati"],g=new Set([...u.relevantFor,...x]),y=Array.from(new Set(s.flatMap(e=>e.relevantFor??[]))).filter(e=>g.has(e)).sort(),b=l.filter(e=>s.some(a=>e.match(a))),f=e=>l.filter(a=>a.match(e)).map(a=>a.id).join("|"),c=[{id:"payments",label:"Payments",match:e=>/(payment|acquir|wallet|DCB|IBFT|settlement|reconcil|billing|BNPL|MPGS|MDES|token|3DS|click to pay)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"ecommerce",label:"E-commerce",match:e=>e.slug.startsWith("daraz-")||/(marketplace|e-commerce|checkout conversion|COD to digital)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"ott",label:"OTT & subscriptions",match:e=>e.slug.startsWith("tapmad-")||/(OTT|subscription|streaming|ARPU)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"compliance",label:"Compliance",match:e=>/(AML|CFT|sanctions|PEP|KYC|KYB|onboarding|PCI|ISO\s?27001|governance|CSP)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"cross-border",label:"Cross-border",match:e=>/(cross-border|corridor|FX|remittance|SWIFT|ISO 20022|gpi|correspondent)/i.test([e.category,e.title,...e.keywords].join(" "))},{id:"onboarding",label:"Onboarding",match:e=>/(onboarding|KYC|KYB|UBO|activation)/i.test([e.category,e.title,...e.keywords].join(" "))}],w=c.filter(e=>s.some(a=>e.match(a))),v=e=>c.filter(a=>a.match(e)).map(a=>a.id).join("|"),k=`
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
`;function C(){return t.jsxs("div",{className:"mx-auto max-w-6xl overflow-x-clip px-4 py-12 sm:px-6 sm:py-20",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech",children:"◆ Product work"}),t.jsxs("h1",{className:"mt-3 max-w-4xl break-words font-instrument text-[clamp(2.15rem,9vw,4.75rem)] leading-[0.98] text-ink [overflow-wrap:anywhere]",children:["Case studies in"," ",t.jsx("span",{className:"italic text-ink-soft",children:"regulated payments infrastructure."})]}),t.jsx("p",{className:"mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg",children:"Real systems shipped at $1B+ GTV scale. Filter by industry, by the companies this work is most relevant to, or by compliance theme."}),t.jsxs("div",{className:"mt-8 sm:mt-10",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:"Industry"}),t.jsx("div",{className:"mt-3 flex flex-wrap gap-2",role:"group","aria-label":"Filter by industry",children:w.map(e=>t.jsx("button",{type:"button","data-pw-industry":e.id,"aria-pressed":"false",className:"rounded-full border border-rule bg-surface px-3 py-1.5 text-xs font-mono-tech uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink/40 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 data-[pw-active=true]:border-[var(--brand)] data-[pw-active=true]:bg-[var(--brand)]/10 data-[pw-active=true]:text-[var(--brand)]",children:e.label},e.id))})]}),t.jsxs("div",{className:"mt-6 grid gap-4 rounded-2xl border border-rule bg-surface p-4 sm:grid-cols-2 sm:p-5",children:[t.jsx(o,{id:"pw-company",label:"Relevant company",options:y}),t.jsx(o,{id:"pw-theme",label:"Compliance theme",options:b.map(e=>({value:e.id,label:e.label}))})]}),t.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-ink-soft",children:[t.jsxs("span",{"aria-live":"polite",children:["Showing ",t.jsx("span",{"data-pw-count":!0,children:s.length})," of ",s.length," case"," ",s.length===1?"study":"studies"]}),t.jsx("button",{type:"button","data-pw-clear":!0,className:"uppercase tracking-[0.18em] text-ink hover:text-[var(--brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded",children:"Clear filters"})]}),t.jsxs("div",{className:"mt-8 grid gap-5",children:[t.jsxs("div",{hidden:!0,"data-pw-empty":!0,className:"rounded-2xl border border-dashed border-rule p-10 text-center text-ink-soft",children:["No case studies match those filters."," ",t.jsx("button",{type:"button","data-pw-clear":!0,className:"underline text-ink hover:text-[var(--brand)]",children:"Clear filters"})]}),s.map((e,a)=>t.jsxs(m,{to:"/product-work/$slug",params:{slug:e.slug},"data-pw-result":!0,"data-pw-companies":(e.relevantFor??[]).join("|"),"data-pw-themes":f(e),"data-pw-industries":v(e),className:"case-study-card group grid min-w-0 items-stretch overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-all duration-200 hover:border-ink/30 lg:grid-cols-12",children:[t.jsx("div",{className:"relative min-w-0 aspect-[16/9] overflow-hidden border-b border-rule lg:col-span-4 lg:aspect-auto lg:border-b-0 lg:border-r",children:t.jsx("img",{src:p(e.slug),alt:e.imageAlt??`${e.title} — abstract editorial illustration`,width:800,height:450,loading:a<3?"eager":"lazy",decoding:"async",className:"absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"})}),t.jsxs("div",{className:"grid min-w-0 gap-5 p-5 sm:p-7 lg:col-span-8 lg:grid-cols-10 lg:p-8",children:[t.jsxs("div",{className:"min-w-0 lg:col-span-7",children:[t.jsxs("div",{className:"flex flex-wrap items-center gap-2 sm:gap-3",children:[t.jsx("span",{className:"text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent-emerald)] font-mono-tech sm:tracking-[0.18em]",children:e.category}),t.jsxs("span",{className:"font-mono-tech text-xs text-ink-soft",children:["/",String(a+1).padStart(2,"0")]})]}),t.jsx("h2",{className:"mt-2 break-words font-instrument text-[1.6rem] leading-[1.08] text-ink transition-colors group-hover:text-[var(--brand)] sm:text-2xl",children:e.title}),t.jsx("p",{className:"mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft",children:j(e.tagline)}),t.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:e.keywords.slice(0,4).map(r=>t.jsx("span",{className:"rounded-full border border-rule bg-background px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech",children:r},r))})]}),t.jsx("div",{className:"min-w-0 lg:col-span-3",children:t.jsx("div",{className:"grid grid-cols-2 gap-3 lg:grid-cols-1",children:e.metrics.slice(0,2).map(r=>t.jsxs("div",{className:"case-metric-card min-w-0 rounded-xl border border-rule bg-background p-3",children:[t.jsx("div",{className:"break-words font-mono-tech text-sm leading-snug text-ink sm:text-base",children:h(r)}),t.jsx("div",{className:"mt-1 text-[9px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech",children:r.label})]},r.label))})})]})]},e.slug))]}),t.jsx("script",{dangerouslySetInnerHTML:{__html:k}})]})}function j(e){return e.length<=210?e:`${e.slice(0,207).replace(/\s+\S*$/,"")}...`}function o({id:e,label:a,options:r}){return t.jsxs("div",{className:"block",children:[t.jsx("label",{htmlFor:e,className:"text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:a}),t.jsxs("select",{id:e,name:e,"aria-label":a,defaultValue:"",className:"mt-2 w-full rounded-lg border border-rule bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus:border-ink/60",children:[t.jsx("option",{value:"",children:"All"}),r.map(n=>{const i=typeof n=="string"?n:n.value,d=typeof n=="string"?n:n.label;return t.jsx("option",{value:i,children:d},i)})]})]})}export{C as component};
