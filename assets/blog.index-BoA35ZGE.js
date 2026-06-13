import{R as q,y as L,p as g,z as N,h as i,j as e,L as h,s as y}from"./index-DMsm6l2h.js";const E=["Network product","PSP / orchestration","Bank / regulated fintech","Founder / operator"],w=["Visa","Mastercard","Stripe","Adyen","Wise","Thunes","DLocal"];function S(s){const a=`${s.title} ${s.tags.join(" ")} ${s.content??""}`.toLowerCase();return w.filter(r=>a.includes(r.toLowerCase()))}function k(s){return new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}function b(s){const a=s.tags.map(l=>l.toLowerCase()).join(" "),r=new Set;return/network|scheme|visa|mastercard|tokeniz|acceptance/.test(a+" "+s.category.toLowerCase())&&r.add("Network product"),/orchestration|api|hosted|gateway|psp|local payment/.test(a)&&r.add("PSP / orchestration"),/swift|iso 20022|gpi|correspondent|aml|sanctions|pci|iso 27001|regulated/.test(a)&&r.add("Bank / regulated fintech"),r.size===0&&r.add("Founder / operator"),[...r]}function j(s,a=!1){return{"data-blog-result":"","data-blog-featured":a?"true":"false","data-search":`${s.title} ${s.description} ${s.tags.join(" ")}`.toLowerCase(),"data-hub":N(s)?.slug??"","data-readers":b(s).join("|"),"data-companies":S(s).join("|")}}const C=`
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
`;function T(){const{q:s,hub:a,reader:r,company:l}=q.useSearch(),m=L({from:"/blog/"}),o=(t,c)=>m({search:p=>({...p,[t]:c})}),u=s.trim().toLowerCase(),x=g.filter(t=>!(a&&N(t)?.slug!==a||r&&!b(t).includes(r)||l&&!S(t).includes(l)||u&&!(t.title+" "+t.description+" "+t.tags.join(" ")).toLowerCase().includes(u))),n=!s&&!a&&!r&&!l?g.find(t=>t.featured)??g[0]:null,d=n?x.filter(t=>t.slug!==n.slug):x,v=a?i.find(t=>t.slug===a):null;return e.jsxs("div",{className:"blog-page mx-auto max-w-6xl px-6 py-16 md:py-20",children:[e.jsxs("section",{className:"blog-hero-shell relative grid gap-10 overflow-hidden rounded-lg border border-rule bg-surface px-5 py-7 md:px-7 md:py-8 lg:grid-cols-12 lg:items-end",children:[e.jsx("span",{"aria-hidden":"true",className:"blog-signal-mark blog-signal-mark-a"}),e.jsx("span",{"aria-hidden":"true",className:"blog-signal-mark blog-signal-mark-b"}),e.jsxs("div",{className:"relative z-10 lg:col-span-8",children:[e.jsx("div",{className:"blog-soft-reveal blog-eyebrow text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech",children:"◆ Payments essays"}),e.jsxs("h1",{className:"blog-soft-reveal font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-4xl leading-[1.02]",style:{"--motion-delay":"60ms"},children:["Essays on regulated payments infrastructure"," ",e.jsx("span",{className:"blog-title-accent italic text-ink-soft",children:"from the operator's seat."})]}),e.jsx("p",{className:"blog-soft-reveal mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed",style:{"--motion-delay":"120ms"},children:"Field notes on payment rails, cross-border corridors, settlement, risk, onboarding, AI in fintech and the programme discipline required to scale them in complex markets."})]}),e.jsxs("div",{className:"blog-soft-reveal blog-authority-panel relative z-10 lg:col-span-4 rounded-lg border border-rule bg-background/90 p-5",style:{"--motion-delay":"160ms"},children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Authority signals"}),e.jsxs("div",{className:"mt-4 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 sm:gap-3",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"font-mono-tech text-xl text-ink",children:g.length}),e.jsx("div",{className:"mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight",children:"Essays"})]}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"font-mono-tech text-xl text-ink",children:i.length}),e.jsx("div",{className:"mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight",children:"Hubs"})]}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"font-mono-tech text-xl text-ink",children:"$1B+"}),e.jsx("div",{className:"mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-ink-soft font-mono-tech leading-tight",children:"GTV lens"})]})]})]})]}),e.jsxs("div",{className:"blog-kinetic-strip mt-5 overflow-hidden rounded-lg border border-rule bg-background","aria-label":"Key blog topics",children:[e.jsx("span",{className:"blog-kinetic-label","aria-hidden":"true",children:"Topic radar"}),e.jsx("div",{className:"blog-kinetic-track flex w-max items-center gap-6 py-3 text-[10px] uppercase tracking-[0.2em] text-ink-soft font-mono-tech",children:[...i.slice(0,8),...i.slice(0,8)].map((t,c)=>e.jsxs("span",{className:"inline-flex items-center gap-6",children:[e.jsx("span",{children:t.shortTitle}),e.jsx("span",{className:"text-[var(--accent-emerald)]",children:"◆"})]},`${t.slug}-${c}`))})]}),n&&e.jsxs(h,{to:"/blog/$slug",params:{slug:n.slug},...j(n,!0),className:"blog-result-card blog-feature-card group mt-12 grid gap-8 rounded-lg border border-ink/10 bg-surface p-6 md:p-9 lg:grid-cols-12 lg:items-stretch",style:{"--motion-delay":"180ms"},children:[e.jsxs("div",{className:"lg:col-span-8",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-x-3 gap-y-2",children:[e.jsx("span",{className:"rounded-full border border-[var(--accent-emerald)]/25 bg-background px-3 py-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--accent-emerald)]",children:"Featured essay"}),e.jsx("span",{className:"text-[10px] font-mono-tech uppercase tracking-[0.16em] text-ink-soft",children:n.category}),e.jsxs("span",{className:"text-[10px] font-mono-tech text-ink-soft",children:[k(n.date)," · ",n.readingTime]})]}),e.jsx("h2",{className:"font-instrument text-3xl md:text-5xl text-ink mt-5 leading-[1.04] group-hover:text-[var(--brand)] transition-colors max-w-4xl",children:n.title}),e.jsx("p",{className:"mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl",children:n.thesis??n.description}),e.jsxs("span",{className:"inline-flex items-center gap-1.5 mt-7 text-sm font-medium text-ink",children:["Read the featured essay",e.jsx("span",{className:"transition-transform group-hover:translate-x-1",children:"→"})]})]}),e.jsxs("div",{className:"lg:col-span-4 border-t border-rule pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Strongest lens"}),e.jsx("div",{className:"mt-4 space-y-3",children:b(n).slice(0,3).map(t=>e.jsx("div",{className:"rounded-md border border-rule bg-background px-3 py-2 text-sm text-ink",children:t},t))}),e.jsx("div",{className:"mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Related signals"}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:n.tags.slice(0,4).map(t=>e.jsx("span",{className:"blog-tag-chip rounded-full border border-rule bg-background px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-ink-soft font-mono-tech",children:t},t))})]})]}),e.jsxs("div",{className:"blog-search-panel mt-10 rounded-lg border border-rule bg-background p-5 md:p-6",style:{"--motion-delay":"220ms"},children:[e.jsxs("div",{className:"mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Search the library"}),e.jsx("p",{className:"mt-1 max-w-2xl text-sm text-ink-soft",children:"Payments infrastructure writing mapped to topic, audience and company context."})]}),e.jsxs("div",{className:"text-xs text-ink-soft font-mono-tech",children:[x.length," available essay",x.length===1?"":"s"]})]}),e.jsxs("div",{className:"grid md:grid-cols-12 gap-3",children:[e.jsxs("div",{className:"md:col-span-5",children:[e.jsx("label",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",htmlFor:"blog-q",children:"Search"}),e.jsx("input",{id:"blog-q",type:"search",value:s,onChange:t=>o("q",t.target.value),onKeyDown:t=>{t.key==="Enter"&&y(t.currentTarget.value,"blog",a||r||l||void 0)},onBlur:t=>{y(t.currentTarget.value,"blog",a||r||l||void 0)},placeholder:"Reconciliation, onboarding, fraud…",className:"blog-filter-input mt-1 w-full border border-rule bg-surface px-3 py-2.5 rounded-md text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"})]}),e.jsx(f,{id:"blog-hub",label:"Topic",value:a,onChange:t=>o("hub",t),options:[["","All topics"],...i.map(t=>[t.slug,t.shortTitle])]}),e.jsx(f,{id:"blog-reader",label:"Reader lens",value:r,onChange:t=>o("reader",t),options:[["","Any"],...E.map(t=>[t,t])]}),e.jsx(f,{id:"blog-company",label:"Company lens",value:l,onChange:t=>o("company",t),options:[["","Any"],...w.map(t=>[t,t])]})]}),e.jsxs("div",{"data-blog-filter-status":!0,className:`mt-3 flex items-center justify-between gap-4 text-xs text-ink-soft ${s||a||r||l?"":"hidden"}`,children:[e.jsxs("span",{"data-blog-match-count":!0,children:[d.length," match",d.length===1?"":"es",v&&` · ${v.title}`]}),e.jsx("button",{type:"button","data-blog-clear":!0,onClick:()=>m({search:{q:"",hub:"",reader:"",company:""}}),className:"rounded-full border border-rule px-3 py-1 text-[10px] uppercase tracking-[0.14em] hover:border-ink/40 hover:text-ink",children:"Clear filters"})]})]}),e.jsxs("section",{className:"blog-list-shell mt-10",children:[e.jsxs("div",{className:"mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:"Latest field notes"}),e.jsx("h2",{className:"mt-1 font-instrument text-3xl text-ink",children:"Practical essays for payments leaders."})]}),e.jsx("div",{className:"text-xs text-ink-soft font-mono-tech",children:"Sorted newest first"})]}),e.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[e.jsx("div",{"data-blog-empty":!0,className:`md:col-span-2 rounded-lg border border-rule bg-surface px-6 py-12 text-center text-ink-soft ${d.length===0?"":"hidden"}`,children:"No essays match these filters."}),d.length>0&&d.map((t,c)=>e.jsxs(h,{to:"/blog/$slug",params:{slug:t.slug},...j(t),className:"blog-result-card group flex min-h-[260px] flex-col rounded-lg border border-rule bg-surface p-5 transition-colors hover:bg-background",style:{"--motion-delay":`${260+Math.min(c,10)*35}ms`},children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft font-mono-tech",children:[e.jsx("div",{className:"rounded-full border border-[var(--accent-emerald)]/20 bg-background px-2.5 py-1 uppercase tracking-[0.12em] text-[10px] text-[var(--accent-emerald)] font-medium",children:t.category}),e.jsxs("div",{children:[k(t.date)," · ",t.readingTime]})]}),e.jsx("h3",{className:"mt-5 font-instrument text-2xl md:text-[1.7rem] text-ink group-hover:text-[var(--brand)] transition-colors leading-[1.12]",children:t.title}),e.jsx("p",{className:"mt-3 text-sm text-ink-soft leading-relaxed",children:t.thesis??t.description}),e.jsxs("div",{className:"mt-auto pt-5",children:[e.jsx("div",{className:"flex flex-wrap gap-2",children:t.tags.slice(0,3).map(p=>e.jsx("span",{className:"blog-tag-chip text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-background font-mono-tech uppercase tracking-[0.1em]",children:p},p))}),e.jsxs("div",{className:"mt-4 flex items-center justify-between gap-4 border-t border-rule pt-4",children:[e.jsxs("span",{className:"blog-card-number text-xs text-ink-soft font-mono-tech",children:["/",String(c+1).padStart(2,"0")]}),e.jsxs("span",{className:"blog-card-arrow text-xs text-ink-soft group-hover:text-ink inline-flex items-center gap-1",children:["Read essay",e.jsx("span",{className:"transition-transform group-hover:translate-x-1",children:"→"})]})]})]})]},t.slug))]})]}),e.jsxs("div",{className:"mt-14 pt-8 border-t border-rule",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3",children:"Browse by topic hub"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:i.map(t=>e.jsx(h,{to:"/topics/$hub",params:{hub:t.slug},className:"text-xs px-3 py-1.5 rounded-full border border-rule text-ink-soft hover:text-ink hover:border-ink/40 transition-colors",children:t.shortTitle},t.slug))})]}),e.jsx("script",{dangerouslySetInnerHTML:{__html:C}})]})}function f({id:s,label:a,value:r,onChange:l,options:m}){return e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",htmlFor:s,children:a}),e.jsx("select",{id:s,value:r,onChange:o=>l(o.target.value),className:"mt-1 w-full border border-rule bg-surface px-3 py-2.5 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]",children:m.map(([o,u])=>e.jsx("option",{value:o,children:u},o))})]})}export{T as component};
