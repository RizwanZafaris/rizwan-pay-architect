import{v as t,k as n,L as d,n as m,A as p}from"./index-C5FF-4OT.js";import{c as u}from"./case-study-ui-DOkaIf3J.js";const i=[{id:"pci-iso",label:"PCI DSS · ISO 27001",match:e=>/(PCI|ISO\s?27001)/i.test([e.category,...e.keywords,...e.impact??[]].join(" "))},{id:"aml-cft",label:"AML/CFT · Sanctions",match:e=>/(AML|CFT|sanctions|PEP)/i.test([e.category,...e.keywords].join(" "))},{id:"kyc-kyb",label:"KYC / KYB",match:e=>/(KYC|KYB|onboarding)/i.test([e.category,...e.keywords].join(" "))},{id:"fraud-risk",label:"Fraud & Risk",match:e=>/(fraud|risk|chargeback)/i.test([e.category,...e.keywords].join(" "))},{id:"settlement",label:"Settlement & Recon",match:e=>/(settlement|reconcil|ledger|treasury)/i.test([e.category,...e.keywords].join(" "))},{id:"cross-border",label:"Cross-Border & FX",match:e=>/(cross-border|corridor|FX|remittance)/i.test([e.category,...e.keywords].join(" "))},{id:"infrastructure",label:"Payment Infrastructure",match:e=>/(infrastructure|platform|wallet|rail|API)/i.test([e.category,...e.keywords].join(" "))}],h=["Geidea","Magnati"],x=new Set([...p.relevantFor,...h]),g=Array.from(new Set(n.flatMap(e=>e.relevantFor??[]))).filter(e=>x.has(e)).sort(),f=i.filter(e=>n.some(a=>e.match(a))),w=e=>i.filter(a=>a.match(e)).map(a=>a.id).join("|"),y=`
(() => {
  if (window.__rzPwFilterBound) return;
  window.__rzPwFilterBound = true;

  const companySel = document.querySelector('#pw-company');
  const themeSel = document.querySelector('#pw-theme');
  const results = Array.from(document.querySelectorAll('[data-pw-result]'));
  if (!companySel || !themeSel || results.length === 0) return;
  const countEl = document.querySelector('[data-pw-count]');
  const emptyEl = document.querySelector('[data-pw-empty]');

  const params = new URLSearchParams(window.location.search);
  companySel.value = params.get('company') || '';
  themeSel.value = params.get('theme') || '';

  const hasToken = (value, selected) => !selected || (value || '').split('|').includes(selected);

  const apply = () => {
    const company = companySel.value;
    const theme = themeSel.value;
    let count = 0;
    for (const el of results) {
      const matches =
        hasToken(el.getAttribute('data-pw-companies'), company) &&
        hasToken(el.getAttribute('data-pw-themes'), theme);
      el.hidden = !matches;
      if (matches) count++;
    }
    if (countEl) countEl.textContent = String(count);
    if (emptyEl) emptyEl.hidden = count !== 0;
    // Merge into the existing query (preserving utm_*/click-ids for the
    // cal.com forwarder and analytics) and keep the hash; no-op when the
    // URL is already correct so the initial apply() never rewrites history.
    const next = new URLSearchParams(window.location.search);
    if (company) next.set('company', company); else next.delete('company');
    if (theme) next.set('theme', theme); else next.delete('theme');
    const qs = next.toString();
    const nextUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, '', nextUrl);
    }
  };

  companySel.addEventListener('change', apply);
  themeSel.addEventListener('change', apply);
  document.querySelectorAll('[data-pw-clear]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      companySel.value = '';
      themeSel.value = '';
      apply();
    });
  });

  apply();
})();
`;function j(){return t.jsxs("div",{className:"mx-auto max-w-6xl overflow-x-clip px-4 py-12 sm:px-6 sm:py-20",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech",children:"◆ Product work"}),t.jsxs("h1",{className:"mt-3 max-w-4xl break-words font-instrument text-[clamp(2.15rem,9vw,4.75rem)] leading-[0.98] text-ink [overflow-wrap:anywhere]",children:["Case studies in"," ",t.jsx("span",{className:"italic text-ink-soft",children:"regulated payments infrastructure."})]}),t.jsx("p",{className:"mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg",children:"Real systems shipped at $1B+ GTV scale. Filter by the companies this work is most relevant to, or by compliance theme."}),t.jsxs("div",{className:"mt-8 grid gap-4 rounded-2xl border border-rule bg-surface p-4 sm:mt-10 sm:grid-cols-2 sm:p-5",children:[t.jsx(o,{id:"pw-company",label:"Relevant company",options:g}),t.jsx(o,{id:"pw-theme",label:"Compliance theme",options:f.map(e=>({value:e.id,label:e.label}))})]}),t.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-ink-soft",children:[t.jsxs("span",{"aria-live":"polite",children:["Showing ",t.jsx("span",{"data-pw-count":!0,children:n.length})," of ",n.length," case"," ",n.length===1?"study":"studies"]}),t.jsx("button",{type:"button","data-pw-clear":!0,className:"uppercase tracking-[0.18em] text-ink hover:text-[var(--brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded",children:"Clear filters"})]}),t.jsxs("div",{className:"mt-8 grid gap-5",children:[t.jsxs("div",{hidden:!0,"data-pw-empty":!0,className:"rounded-2xl border border-dashed border-rule p-10 text-center text-ink-soft",children:["No case studies match those filters."," ",t.jsx("button",{type:"button","data-pw-clear":!0,className:"underline text-ink hover:text-[var(--brand)]",children:"Clear filters"})]}),n.map((e,a)=>t.jsxs(d,{to:"/product-work/$slug",params:{slug:e.slug},"data-pw-result":!0,"data-pw-companies":(e.relevantFor??[]).join("|"),"data-pw-themes":w(e),className:"case-study-card group grid min-w-0 items-stretch overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-all duration-200 hover:border-ink/30 lg:grid-cols-12",children:[t.jsx("div",{className:"relative min-w-0 aspect-[16/9] overflow-hidden border-b border-rule lg:col-span-4 lg:aspect-auto lg:border-b-0 lg:border-r",children:t.jsx("img",{src:m(e.slug),alt:e.imageAlt??`${e.title} — abstract editorial illustration`,width:800,height:450,loading:a<3?"eager":"lazy",decoding:"async",className:"absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"})}),t.jsxs("div",{className:"grid min-w-0 gap-5 p-5 sm:p-7 lg:col-span-8 lg:grid-cols-10 lg:p-8",children:[t.jsxs("div",{className:"min-w-0 lg:col-span-7",children:[t.jsxs("div",{className:"flex flex-wrap items-center gap-2 sm:gap-3",children:[t.jsx("span",{className:"text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent-emerald)] font-mono-tech sm:tracking-[0.18em]",children:e.category}),t.jsxs("span",{className:"font-mono-tech text-xs text-ink-soft",children:["/",String(a+1).padStart(2,"0")]})]}),t.jsx("h2",{className:"mt-2 break-words font-instrument text-[1.6rem] leading-[1.08] text-ink transition-colors group-hover:text-[var(--brand)] sm:text-2xl",children:e.title}),t.jsx("p",{className:"mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft",children:b(e.tagline)}),t.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:e.keywords.slice(0,4).map(s=>t.jsx("span",{className:"rounded-full border border-rule bg-background px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech",children:s},s))})]}),t.jsx("div",{className:"min-w-0 lg:col-span-3",children:t.jsx("div",{className:"grid grid-cols-2 gap-3 lg:grid-cols-1",children:e.metrics.slice(0,2).map(s=>t.jsxs("div",{className:"case-metric-card min-w-0 rounded-xl border border-rule bg-background p-3",children:[t.jsx("div",{className:"break-words font-mono-tech text-sm leading-snug text-ink sm:text-base",children:u(s)}),t.jsx("div",{className:"mt-1 text-[9px] uppercase tracking-[0.08em] text-ink-soft font-mono-tech",children:s.label})]},s.label))})})]})]},e.slug))]}),t.jsx("script",{dangerouslySetInnerHTML:{__html:y}})]})}function b(e){return e.length<=210?e:`${e.slice(0,207).replace(/\s+\S*$/,"")}...`}function o({id:e,label:a,options:s}){return t.jsxs("div",{className:"block",children:[t.jsx("label",{htmlFor:e,className:"text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech",children:a}),t.jsxs("select",{id:e,name:e,"aria-label":a,defaultValue:"",className:"mt-2 w-full rounded-lg border border-rule bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus:border-ink/60",children:[t.jsx("option",{value:"",children:"All"}),s.map(r=>{const l=typeof r=="string"?r:r.value,c=typeof r=="string"?r:r.label;return t.jsx("option",{value:l,children:c},l)})]})]})}export{j as component};
