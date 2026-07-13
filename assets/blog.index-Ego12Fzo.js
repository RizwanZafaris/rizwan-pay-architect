import{f as S,a1 as q,Y as p,E as j,F as c,J as e,L as x,$ as v,P as L}from"./index-D2WlckTp.js";const E=["Network product","PSP / orchestration","Bank / regulated fintech","Founder / operator"],k=["Visa","Mastercard","Stripe","Adyen","Wise","Thunes","DLocal"];function N(a){const s=`${a.title} ${a.tags.join(" ")} ${a.content??""}`.toLowerCase();return k.filter(r=>s.includes(r.toLowerCase()))}function C(a){return new Date(a).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}function b(a){const s=a.tags.map(l=>l.toLowerCase()).join(" "),r=new Set;return/network|scheme|visa|mastercard|tokeniz|acceptance/.test(s+" "+a.category.toLowerCase())&&r.add("Network product"),/orchestration|api|hosted|gateway|psp|local payment/.test(s)&&r.add("PSP / orchestration"),/swift|iso 20022|gpi|correspondent|aml|sanctions|pci|iso 27001|regulated/.test(s)&&r.add("Bank / regulated fintech"),r.size===0&&r.add("Founder / operator"),[...r]}function y(a,s=!1){return{"data-blog-result":"","data-blog-featured":s?"true":"false","data-search":`${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase(),"data-hub":j(a)?.slug??"","data-readers":b(a).join("|"),"data-companies":N(a).join("|")}}const T=`
(() => {
  if (window.__rzBlogFilterBound) return;
  window.__rzBlogFilterBound = true;

  const qInput = document.querySelector('#blog-q');
  const hubSelect = document.querySelector('#blog-hub');
  const readerSelect = document.querySelector('#blog-reader');
  const companySelect = document.querySelector('#blog-company');
  const status = document.querySelector('[data-blog-filter-status]');
  const countEl = document.querySelector('[data-blog-match-count]');
  const emptyEl = document.querySelector('[data-blog-empty]');
  const clearEl = document.querySelector('[data-blog-clear]');
  const results = Array.from(document.querySelectorAll('[data-blog-result]'));
  if (!qInput || !hubSelect || !readerSelect || !companySelect || results.length === 0) return;

  const params = new URLSearchParams(window.location.search);
  qInput.value = params.get('q') || '';
  hubSelect.value = params.get('hub') || '';
  readerSelect.value = params.get('reader') || '';
  companySelect.value = params.get('company') || '';

  const hasToken = (value, selected) => {
    if (!selected) return true;
    return (value || '').split('|').includes(selected);
  };

  const updateUrl = () => {
    // Merge into the existing query (preserving utm_*/click-ids for the
    // cal.com forwarder and analytics) and keep the hash; no-op when the URL
    // is already correct so the initial apply() never rewrites history.
    // Same pattern as the /product-work filter.
    const next = new URLSearchParams(window.location.search);
    const setOrDelete = (key, value) => { if (value) next.set(key, value); else next.delete(key); };
    setOrDelete('q', qInput.value.trim());
    setOrDelete('hub', hubSelect.value);
    setOrDelete('reader', readerSelect.value);
    setOrDelete('company', companySelect.value);
    const qs = next.toString();
    const nextUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, '', nextUrl);
    }
  };

  const apply = () => {
    const q = qInput.value.trim().toLowerCase();
    const hub = hubSelect.value;
    const reader = readerSelect.value;
    const company = companySelect.value;
    const active = Boolean(q || hub || reader || company);
    let count = 0;

    for (const el of results) {
      const matches =
        (!q || (el.getAttribute('data-search') || '').includes(q)) &&
        (!hub || el.getAttribute('data-hub') === hub) &&
        hasToken(el.getAttribute('data-readers'), reader) &&
        hasToken(el.getAttribute('data-companies'), company);

      el.hidden = !matches;
      if (matches) count++;
    }

    if (status) status.classList.toggle('hidden', !active);
    if (countEl) countEl.textContent = count + ' match' + (count === 1 ? '' : 'es');
    if (emptyEl) emptyEl.classList.toggle('hidden', count !== 0);
    updateUrl();
  };

  qInput.addEventListener('input', apply);
  hubSelect.addEventListener('change', apply);
  readerSelect.addEventListener('change', apply);
  companySelect.addEventListener('change', apply);
  clearEl?.addEventListener('click', (event) => {
    event.preventDefault();
    qInput.value = '';
    hubSelect.value = '';
    readerSelect.value = '';
    companySelect.value = '';
    apply();
  });

  apply();
})();
`;function P(){return[{value:String(p.length),label:"Essays"},{value:String(c.length),label:"Hubs"},{value:L.gtv,label:"GTV lens"}]}function A(){const{q:a,hub:s,reader:r,company:l}=S.useSearch(),d=q({from:"/blog/"}),o=(t,h)=>d({search:w=>({...w,[t]:h})}),m=a.trim().toLowerCase(),u=p.filter(t=>!(s&&j(t)?.slug!==s||r&&!b(t).includes(r)||l&&!N(t).includes(l)||m&&!(t.title+" "+t.description+" "+t.tags.join(" ")).toLowerCase().includes(m))),n=!a&&!s&&!r&&!l?p.find(t=>t.featured)??p[0]:null,i=n?u.filter(t=>t.slug!==n.slug):u,f=s?c.find(t=>t.slug===s):null;return e.jsxs("div",{className:"blog-page",children:[e.jsxs("header",{className:"rz-beam relative border-b border-rule bg-background",children:[e.jsx("div",{className:"mx-auto max-w-6xl px-5 sm:px-6 pt-16 md:pt-24 pb-10 md:pb-14",children:e.jsxs("div",{className:"grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end",children:[e.jsxs("div",{className:"lg:col-span-9",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ Payments essays"}),e.jsxs("h1",{className:"font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] text-ink mt-4 max-w-5xl",children:["Essays on regulated payments infrastructure"," ",e.jsx("span",{className:"italic text-[var(--brand)]",children:"from the operator's seat."})]}),e.jsx("p",{className:"mt-6 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed",children:"Field notes on payment rails, cross-border corridors, settlement, risk, onboarding, AI in fintech and the programme discipline required to scale them in complex markets."})]}),e.jsxs("div",{className:"lg:col-span-3",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"The library"}),e.jsx("dl",{className:"mt-3 border-t border-rule",children:P().map(t=>e.jsxs("div",{className:"flex items-baseline justify-between gap-4 border-b border-rule py-3",children:[e.jsx("dt",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:t.label}),e.jsx("dd",{className:"font-instrument text-2xl leading-none text-ink tabular-nums",children:t.value})]},t.label))})]})]})}),e.jsx("nav",{className:"border-t border-rule bg-background","aria-label":"Key blog topics",children:e.jsx("ul",{className:"mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 sm:px-8 lg:px-12",children:c.slice(0,8).map(t=>e.jsx("li",{children:e.jsx(x,{to:"/topics/$hub",params:{hub:t.slug},className:"inline-block py-1 -my-1 text-[10px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background font-mono-tech",children:e.jsx("span",{className:"rz-link",children:t.shortTitle})})},t.slug))})})]}),n&&e.jsx("section",{className:"rz-beam relative border-b border-rule bg-surface",children:e.jsx("div",{className:"mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16",children:e.jsxs(x,{to:"/blog/$slug",params:{slug:n.slug},...y(n,!0),"data-glow":!0,className:"group relative grid gap-8 lg:grid-cols-12 lg:gap-12",children:[e.jsxs("div",{className:"lg:col-span-8",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] font-mono-tech",children:[e.jsx("span",{className:"text-[var(--brand)] font-semibold",children:"◆ Featured essay"}),e.jsx("span",{className:"text-ink-soft",children:n.category}),e.jsxs("span",{className:"text-ink-soft",children:[C(n.date)," · ",n.readingTime]})]}),e.jsx("h2",{className:"font-instrument text-[clamp(2rem,4.4vw,4rem)] text-ink mt-5 leading-[1.03] transition-colors group-hover:text-[var(--brand)] max-w-4xl",children:n.title}),e.jsx("p",{className:"mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl",children:n.thesis??n.description}),e.jsxs("span",{className:"mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink",children:[e.jsx("span",{className:"rz-link",children:"Read the featured essay"}),e.jsx("span",{className:"transition-transform group-hover:translate-x-1","aria-hidden":!0,children:"→"})]})]}),e.jsxs("div",{className:"lg:col-span-4 border-t border-rule pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Strongest lens"}),e.jsx("ul",{className:"mt-2 divide-y divide-rule",children:b(n).slice(0,3).map(t=>e.jsx("li",{className:"py-2.5 text-sm text-ink",children:t},t))}),e.jsx("div",{className:"mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Related signals"}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-x-4 gap-y-1.5",children:n.tags.slice(0,4).map(t=>e.jsx("span",{className:"text-[10px] uppercase tracking-[0.14em] text-ink-soft font-mono-tech",children:t},t))})]})]})})}),e.jsx("section",{className:"border-b border-rule bg-background",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-5 sm:px-6 py-10 md:py-12",children:[e.jsxs("div",{className:"mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ Search the library"}),e.jsx("p",{className:"mt-2 max-w-2xl text-sm text-ink-soft",children:"Payments infrastructure writing mapped to topic, audience and company context."})]}),e.jsxs("div",{className:"text-xs text-ink-soft font-mono-tech",children:[u.length," available essay",u.length===1?"":"s"]})]}),e.jsxs("form",{role:"search",action:"/blog/",method:"get",className:"grid md:grid-cols-12 gap-3",children:[e.jsxs("div",{className:"md:col-span-5",children:[e.jsx("label",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",htmlFor:"blog-q",children:"Search"}),e.jsx("input",{id:"blog-q",name:"q",type:"search",value:a,onChange:t=>o("q",t.target.value),onKeyDown:t=>{t.key==="Enter"&&v(t.currentTarget.value,"blog",s||r||l||void 0)},onBlur:t=>{v(t.currentTarget.value,"blog",s||r||l||void 0)},placeholder:"Reconciliation, onboarding, fraud…",className:"blog-filter-input mt-1 w-full border border-rule bg-surface px-3 py-2.5 rounded-md text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"})]}),e.jsx(g,{id:"blog-hub",label:"Topic",value:s,onChange:t=>o("hub",t),options:[["","All topics"],...c.map(t=>[t.slug,t.shortTitle])]}),e.jsx(g,{id:"blog-reader",label:"Reader lens",value:r,onChange:t=>o("reader",t),options:[["","Any"],...E.map(t=>[t,t])]}),e.jsx(g,{id:"blog-company",label:"Company lens",value:l,onChange:t=>o("company",t),options:[["","Any"],...k.map(t=>[t,t])]})]}),e.jsxs("div",{"data-blog-filter-status":!0,role:"status","aria-live":"polite",className:`mt-3 flex items-center justify-between gap-4 text-xs text-ink-soft ${a||s||r||l?"":"hidden"}`,children:[e.jsxs("span",{"data-blog-match-count":!0,children:[i.length," match",i.length===1?"":"es",f&&` · ${f.title}`]}),e.jsx("button",{type:"button","data-blog-clear":!0,onClick:()=>d({search:{q:"",hub:"",reader:"",company:""}}),className:"rounded-full border border-rule px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] hover:border-ink/40 hover:text-ink",children:"Clear filters"})]})]})}),e.jsx("section",{className:"rz-beam relative border-b border-rule bg-background",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16",children:[e.jsxs("div",{className:"mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold",children:"◆ Latest field notes"}),e.jsx("h2",{className:"mt-3 font-instrument text-3xl md:text-4xl text-ink leading-[1.05]",children:"Practical essays for payments leaders."})]}),e.jsx("div",{className:"text-xs text-ink-soft font-mono-tech",children:"Sorted newest first"})]}),e.jsx("div",{"data-blog-empty":!0,className:`border-y border-rule px-6 py-14 text-center text-ink-soft ${i.length===0?"":"hidden"}`,children:"No essays match these filters."}),i.length>0&&e.jsx("div",{"data-rz-stagger":!0,className:"border-t border-rule",children:i.map(t=>e.jsxs(x,{to:"/blog/$slug",params:{slug:t.slug},...y(t),"data-glow":!0,className:"group relative grid gap-y-2 border-b border-rule py-6 md:grid-cols-12 md:gap-x-8 md:py-7",children:[e.jsx("div",{className:"flex items-baseline gap-x-4 md:col-span-2 md:block",children:e.jsx("span",{className:"block font-mono-tech text-[11px] tracking-[0.14em] text-ink-soft/70",children:t.readingTime})}),e.jsxs("div",{className:"md:col-span-7",children:[e.jsx("h3",{className:"font-instrument text-2xl md:text-[1.75rem] leading-[1.1] text-ink transition-all duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-1.5 group-hover:text-[var(--brand)]",children:t.title}),e.jsx("p",{className:"mt-2 text-sm text-ink-soft leading-relaxed md:line-clamp-1",children:t.thesis??t.description})]}),e.jsxs("div",{className:"flex items-center justify-between gap-4 md:col-span-3 md:justify-end md:gap-6 md:self-center",children:[e.jsx("span",{className:"text-[10px] uppercase tracking-[0.14em] text-[var(--brand)] font-mono-tech",children:t.category}),e.jsx("span",{className:"hidden text-lg text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)] md:inline","aria-hidden":!0,children:"→"})]})]},t.slug))})]})}),e.jsx("section",{className:"bg-background",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-14",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold mb-4",children:"◆ Browse by topic hub"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:c.map(t=>e.jsx(x,{to:"/topics/$hub",params:{hub:t.slug},className:"text-xs px-3 py-1.5 rounded-full border border-rule text-ink-soft hover:text-ink hover:border-ink/40 transition-colors",children:t.shortTitle},t.slug))})]})}),e.jsx("script",{dangerouslySetInnerHTML:{__html:T}})]})}function g({id:a,label:s,value:r,onChange:l,options:d}){return e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",htmlFor:a,children:s}),e.jsx("select",{id:a,name:a.replace("blog-",""),value:r,onChange:o=>l(o.target.value),className:"mt-1 w-full border border-rule bg-surface px-3 py-2.5 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]",children:d.map(([o,m])=>e.jsx("option",{value:o,children:m},o))})]})}export{A as component};
