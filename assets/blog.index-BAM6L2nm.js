import{a as w,C as q,x as m,p as y,q as p,r as t,L as g,A as f}from"./index-DJUv4m2y.js";const L=["Network product","PSP / orchestration","Bank / regulated fintech","Founder / operator"],j=["Visa","Mastercard","Stripe","Adyen","Wise","Thunes","DLocal"];function k(a){const s=(a.title+" "+a.tags.join(" ")+" "+a.content).toLowerCase();return j.filter(r=>s.includes(r.toLowerCase()))}function S(a){const s=a.tags.map(n=>n.toLowerCase()).join(" "),r=new Set;return/network|scheme|visa|mastercard|tokeniz|acceptance/.test(s+" "+a.category.toLowerCase())&&r.add("Network product"),/orchestration|api|hosted|gateway|psp|local payment/.test(s)&&r.add("PSP / orchestration"),/swift|iso 20022|gpi|correspondent|aml|sanctions|pci|iso 27001|regulated/.test(s)&&r.add("Bank / regulated fintech"),r.size===0&&r.add("Founder / operator"),[...r]}function v(a,s=!1){return{"data-blog-result":"","data-blog-featured":s?"true":"false","data-search":`${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase(),"data-hub":y(a)?.slug??"","data-readers":S(a).join("|"),"data-companies":k(a).join("|")}}const C=`
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
    const next = new URLSearchParams();
    if (qInput.value.trim()) next.set('q', qInput.value.trim());
    if (hubSelect.value) next.set('hub', hubSelect.value);
    if (readerSelect.value) next.set('reader', readerSelect.value);
    if (companySelect.value) next.set('company', companySelect.value);
    const qs = next.toString();
    const nextUrl = qs ? '/blog/?' + qs : '/blog/';
    window.history.replaceState(null, '', nextUrl);
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
`;function A(){const{q:a,hub:s,reader:r,company:n}=w.useSearch(),d=q({from:"/blog"}),o=(e,c)=>d({search:N=>({...N,[e]:c})}),u=a.trim().toLowerCase(),h=m.filter(e=>!(s&&y(e)?.slug!==s||r&&!S(e).includes(r)||n&&!k(e).includes(n)||u&&!(e.title+" "+e.description+" "+e.tags.join(" ")).toLowerCase().includes(u))),l=!a&&!s&&!r&&!n?m.find(e=>e.featured)??m[0]:null,i=l?h.filter(e=>e.slug!==l.slug):h,b=s?p.find(e=>e.slug===s):null;return t.jsxs("div",{className:"blog-page mx-auto max-w-6xl px-6 py-20",children:[t.jsx("div",{className:"blog-soft-reveal text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech",children:"◆ Payments essays"}),t.jsxs("h1",{className:"blog-soft-reveal font-instrument text-4xl md:text-6xl text-ink mt-3 max-w-3xl leading-[1.05]",style:{"--motion-delay":"60ms"},children:["A working knowledge base on"," ",t.jsx("span",{className:"italic text-ink-soft",children:"regulated payments."})]}),t.jsx("p",{className:"blog-soft-reveal mt-5 max-w-2xl text-lg text-ink-soft",style:{"--motion-delay":"120ms"},children:"Practical writing from inside payments product, infrastructure, cross-border, settlement, risk, onboarding and the product decisions that shape them."}),l&&t.jsxs(g,{to:"/blog/$slug",params:{slug:l.slug},...v(l,!0),className:"blog-result-card group mt-12 block rounded-lg border border-ink/10 bg-surface p-8 md:p-12",style:{"--motion-delay":"180ms"},children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsxs("span",{className:"text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[var(--accent-emerald)]",children:["Featured essay · ",l.category]}),t.jsx("span",{className:"text-[10px] font-mono-tech text-ink-soft",children:l.readingTime})]}),t.jsx("h2",{className:"font-instrument text-3xl md:text-5xl text-ink mt-4 leading-[1.05] group-hover:text-[var(--brand)] transition-colors max-w-3xl",children:l.title}),t.jsx("p",{className:"mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl",children:l.thesis??l.description}),t.jsxs("span",{className:"inline-flex items-center gap-1.5 mt-6 text-sm text-ink",children:["Read essay",t.jsx("span",{className:"transition-transform group-hover:translate-x-1",children:"→"})]})]}),t.jsxs("div",{className:"blog-search-panel mt-12 rounded-lg border border-rule bg-surface/60 p-5 md:p-6",style:{"--motion-delay":"220ms"},children:[t.jsxs("div",{className:"grid md:grid-cols-12 gap-3",children:[t.jsxs("div",{className:"md:col-span-5",children:[t.jsx("label",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",htmlFor:"blog-q",children:"Search"}),t.jsx("input",{id:"blog-q",type:"search",value:a,onChange:e=>o("q",e.target.value),onKeyDown:e=>{e.key==="Enter"&&f(e.currentTarget.value,"blog",s||r||n||void 0)},onBlur:e=>{f(e.currentTarget.value,"blog",s||r||n||void 0)},placeholder:"SWIFT, reconciliation, onboarding…",className:"mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"})]}),t.jsx(x,{id:"blog-hub",label:"Topic",value:s,onChange:e=>o("hub",e),options:[["","All topics"],...p.map(e=>[e.slug,e.shortTitle])]}),t.jsx(x,{id:"blog-reader",label:"Reader",value:r,onChange:e=>o("reader",e),options:[["","Any"],...L.map(e=>[e,e])]}),t.jsx(x,{id:"blog-company",label:"Relevant for",value:n,onChange:e=>o("company",e),options:[["","Any"],...j.map(e=>[e,e])]})]}),t.jsxs("div",{"data-blog-filter-status":!0,className:`mt-3 flex items-center justify-between gap-4 text-xs text-ink-soft ${a||s||r||n?"":"hidden"}`,children:[t.jsxs("span",{"data-blog-match-count":!0,children:[i.length," match",i.length===1?"":"es",b&&` · ${b.title}`]}),t.jsx("button",{type:"button","data-blog-clear":!0,onClick:()=>d({search:{q:"",hub:"",reader:"",company:""}}),className:"underline underline-offset-4 hover:text-ink",children:"Clear filters"})]})]}),t.jsxs("div",{className:"mt-8 divide-y divide-rule border-y border-rule",children:[t.jsx("div",{"data-blog-empty":!0,className:`py-12 text-center text-ink-soft ${i.length===0?"":"hidden"}`,children:"No essays match these filters."}),i.length>0&&i.map(e=>t.jsxs(g,{to:"/blog/$slug",params:{slug:e.slug},...v(e),className:"blog-result-card group grid md:grid-cols-12 gap-6 py-7 hover:bg-surface-2 px-2 -mx-2 rounded-lg transition-colors",children:[t.jsxs("div",{className:"md:col-span-3 text-xs text-ink-soft font-mono-tech",children:[t.jsx("div",{children:new Date(e.date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}),t.jsx("div",{className:"mt-1 uppercase tracking-[0.14em] text-[10px] text-[var(--accent-emerald)] font-medium",children:e.category}),t.jsx("div",{className:"mt-1",children:e.readingTime})]}),t.jsxs("div",{className:"md:col-span-9",children:[t.jsx("h2",{className:"font-instrument text-2xl text-ink group-hover:text-[var(--brand)] transition-colors leading-snug",children:e.title}),t.jsx("p",{className:"mt-2 text-ink-soft leading-relaxed",children:e.thesis??e.description}),t.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[e.tags.slice(0,4).map(c=>t.jsx("span",{className:"text-[10px] px-2 py-0.5 border border-rule rounded-full text-ink-soft bg-surface font-mono-tech uppercase tracking-[0.1em]",children:c},c)),t.jsxs("span",{className:"ml-auto text-xs text-ink-soft group-hover:text-ink inline-flex items-center gap-1",children:["Read essay"," ",t.jsx("span",{className:"transition-transform group-hover:translate-x-1",children:"→"})]})]})]})]},e.slug))]}),t.jsxs("div",{className:"mt-14 pt-8 border-t border-rule",children:[t.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech mb-3",children:"Browse by topic hub"}),t.jsx("div",{className:"flex flex-wrap gap-2",children:p.map(e=>t.jsx(g,{to:"/topics/$hub",params:{hub:e.slug},className:"text-xs px-3 py-1.5 rounded-full border border-rule text-ink-soft hover:text-ink hover:border-ink/40 transition-colors",children:e.shortTitle},e.slug))})]}),t.jsx("script",{dangerouslySetInnerHTML:{__html:C}})]})}function x({id:a,label:s,value:r,onChange:n,options:d}){return t.jsxs("div",{className:"md:col-span-2",children:[t.jsx("label",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",htmlFor:a,children:s}),t.jsx("select",{id:a,value:r,onChange:o=>n(o.target.value),className:"mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]",children:d.map(([o,u])=>t.jsx("option",{value:o,children:u},o))})]})}export{A as component};
