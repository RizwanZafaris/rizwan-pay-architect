import{f,w as b,K as j,N as k,J as m,y as e,L as n,I as l,j as N,u as g,P as u,l as w,O as S}from"./index-Cpe7O6sV.js";import{p as T,D as L}from"./Diagrams-CeOiSZLa.js";import{N as q}from"./NewsletterSignup-SFD_nWhr.js";function p(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}function h(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}g.use({renderer:{checkbox({checked:t}){return`<input ${t?'checked="" ':""}disabled="" type="checkbox" aria-hidden="true" tabindex="-1"> `},heading({tokens:t,depth:a}){const s=this.parser.parseInline(t),r=p(t.map(o=>o.raw??"").join(""));return`<h${a} id="${r}"${a===2?' data-rz-reveal class="rz-section-head"':""}>${s}</h${a}>
`}}});function C(t){const a=g.parse(I(t),{async:!1});return e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})}const A=new Set(m.map(t=>t.slug));function I(t){return t.replace(/\[([^\]]+)\]\(\/blog\/([^/#?)]+)\/?\)/g,(a,s,r)=>A.has(r)?a:s)}function _(t){return t.split(`
`).filter(a=>/^##\s+/.test(a)).map(a=>{const s=a.replace(/^##\s+/,"").trim();return{id:p(s),text:s}})}const z=`(() => {
  const article = document.querySelector('[data-article-reader]');
  if (!article || article.dataset.bound === 'true') return;
  article.dataset.bound = 'true';
  const html = document.documentElement;
  html.classList.add('article-reader-active');
  const body = article.querySelector('[data-article-body]');
  const bar = article.querySelector('[data-article-progress] > span');
  const rail = article.querySelector('[data-article-rail-progress]');
  const links = [...article.querySelectorAll('[data-article-toc-link]')];
  const ids = [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))];
  const headings = ids.map((href) => document.getElementById(href.slice(1))).filter(Boolean);
  const mapNav = article.querySelector('[data-article-map-nav]');
  const marker = article.querySelector('[data-article-toc-marker]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const controller = 'AbortController' in window ? new AbortController() : null;
  const manualCleanups = [];
  const timers = new Set();
  const listen = (target, type, handler, options = {}) => {
    if (controller) target.addEventListener(type, handler, { ...options, signal: controller.signal });
    else {
      target.addEventListener(type, handler, options);
      manualCleanups.push(() => target.removeEventListener(type, handler, options));
    }
  };
  const later = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
    return timer;
  };
  const clearLater = (timer) => {
    if (!timer) return;
    window.clearTimeout(timer);
    timers.delete(timer);
  };

  let frame = 0;
  let measureFrame = 0;
  let readyFrame = 0;
  let lifecycle = null;
  let resizeObserver = null;
  let cleaned = false;
  let progressStart = 0;
  let progressLength = 1;
  let headingPoints = [];
  let activeId = null;

  const transitionTitle = article.querySelector('[data-essay-transition-target]');
  const clearTransitionNames = () => {
    article.querySelectorAll('[data-essay-transition-title],[data-essay-transition-target]').forEach((node) => {
      node.style.removeProperty('view-transition-name');
      node.removeAttribute('data-shared-title-active');
    });
  };
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    if (controller) controller.abort();
    manualCleanups.forEach((dispose) => dispose());
    if (lifecycle) lifecycle.disconnect();
    if (resizeObserver) resizeObserver.disconnect();
    if (frame) cancelAnimationFrame(frame);
    if (measureFrame) cancelAnimationFrame(measureFrame);
    if (readyFrame) cancelAnimationFrame(readyFrame);
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
    clearTransitionNames();
    html.classList.remove('article-reader-active');
  };

  if ('MutationObserver' in window && document.body) {
    lifecycle = new MutationObserver(() => {
      if (article.isConnected) return;
      cleanup();
    });
    lifecycle.observe(document.body, { childList: true, subtree: true });
  }

  const supportsSharedTitle =
    !reduceMotion && 'CSS' in window && CSS.supports('view-transition-name: essay-title');
  if (supportsSharedTitle && transitionTitle) {
    try {
      const raw = sessionStorage.getItem('rz-essay-transition');
      const pending = raw ? JSON.parse(raw) : null;
      const fresh = pending && Date.now() - Number(pending.timestamp || 0) < 5000;
      if (fresh && pending.slug === article.getAttribute('data-article-slug')) {
        transitionTitle.style.viewTransitionName = 'essay-title';
        transitionTitle.setAttribute('data-shared-title-active', '');
        sessionStorage.removeItem('rz-essay-transition');
        listen(window, 'pagereveal', (event) => {
          if (event.viewTransition && event.viewTransition.finished) {
            event.viewTransition.finished.finally(clearTransitionNames);
          } else later(clearTransitionNames, 500);
        }, { once: true });
        later(clearTransitionNames, 2200);
      } else if (raw) sessionStorage.removeItem('rz-essay-transition');
    } catch (_) {
      try { sessionStorage.removeItem('rz-essay-transition'); } catch (_) {}
    }
  } else {
    try { sessionStorage.removeItem('rz-essay-transition'); } catch (_) {}
  }

  if (!reduceMotion) {
    article.classList.add('article-motion');
    readyFrame = requestAnimationFrame(() => {
      readyFrame = requestAnimationFrame(() => {
        readyFrame = 0;
        article.classList.add('article-ready');
      });
    });
  }

  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    let activeDesktopLink = null;
    links.forEach((link) => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
        if (mapNav && mapNav.contains(link)) activeDesktopLink = link;
      } else link.removeAttribute('aria-current');
    });
    if (marker && mapNav && activeDesktopLink) {
      const navRect = mapNav.getBoundingClientRect();
      const linkRect = activeDesktopLink.getBoundingClientRect();
      const y = linkRect.top - navRect.top + linkRect.height / 2 - 3;
      marker.style.transform = 'translate3d(0,' + y + 'px,0)';
      marker.classList.add('is-visible');
    } else if (marker) marker.classList.remove('is-visible');
  };

  const measure = () => {
    measureFrame = 0;
    if (!body) return;
    const scroll = window.scrollY;
    const rect = body.getBoundingClientRect();
    progressStart = scroll + rect.top - window.innerHeight * 0.22;
    progressLength = Math.max(1, body.offsetHeight - window.innerHeight * 0.58);
    headingPoints = headings.map((heading) => ({
      id: heading.id,
      top: scroll + heading.getBoundingClientRect().top,
    }));
    activeId = null;
    updateProgress();
  };

  const updateProgress = () => {
    frame = 0;
    if (!body) return;
    const progress = Math.max(0, Math.min(1, (window.scrollY - progressStart) / progressLength));
    article.style.setProperty('--article-progress', String(progress));
    if (bar) bar.style.transform = 'scaleX(' + progress + ')';
    if (rail) rail.style.transform = 'scaleY(' + progress + ')';
    if (headingPoints.length) {
      const readingLine = window.scrollY + window.innerHeight * 0.24;
      let current = '';
      for (const point of headingPoints) {
        if (point.top <= readingLine) current = point.id;
        else break;
      }
      setActive(current);
    }
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
  const scheduleMeasure = () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  };
  listen(window, 'scroll', onScroll, { passive: true });
  listen(window, 'resize', scheduleMeasure, { passive: true });
  if ('ResizeObserver' in window && body) {
    resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(body);
  }
  measure();

  links.forEach((link) => {
    listen(link, 'click', () => {
      const disclosure = link.closest('details');
      if (disclosure) disclosure.open = false;
    });
  });

  listen(article, 'click', (event) => {
    if (
      !supportsSharedTitle ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;
    const link = event.target.closest && event.target.closest('[data-essay-transition-link]');
    if (!link) return;
    const title = link.querySelector('[data-essay-transition-title]');
    const slug = link.getAttribute('data-essay-transition-link');
    if (!title || !slug) return;
    title.style.viewTransitionName = 'essay-title';
    try {
      sessionStorage.setItem('rz-essay-transition', JSON.stringify({ slug, timestamp: Date.now() }));
    } catch (_) {}
    later(() => title.style.removeProperty('view-transition-name'), 1600);
  });

  article.querySelectorAll('[data-copy-article]').forEach((button) => {
    let resetTimer = 0;
    listen(button, 'click', async () => {
      const shareGroup = button.closest('[data-article-share]');
      const status = shareGroup && shareGroup.querySelector('[data-share-status]');
      const label = button.querySelector('[data-copy-label]');
      clearLater(resetTimer);
      try {
        await navigator.clipboard.writeText(location.href.split('#')[0]);
        button.dataset.copyState = 'copied';
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Link copied';
      } catch (_) {
        button.dataset.copyState = 'error';
        if (label) label.textContent = 'Copy manually';
        if (status) status.textContent = 'Copy the address from your browser';
      }
      resetTimer = later(() => {
        button.dataset.copyState = '';
        if (label) label.textContent = 'Copy link';
        if (status) status.textContent = '';
      }, 2400);
    });
  });
})();`;function x({post:t}){const a=N(`/blog/${t.slug}`),s=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(a)}`,r=`mailto:?subject=${encodeURIComponent(t.title)}&body=${encodeURIComponent(a)}`;return e.jsxs("div",{className:"article-share",role:"group","aria-label":"Share this essay","data-article-share":!0,children:[e.jsxs("button",{type:"button","data-copy-article":!0,children:[e.jsx("span",{"data-copy-label":!0,children:"Copy link"}),e.jsx("span",{className:"article-share-check","aria-hidden":"true",children:"✓"})]}),e.jsx("a",{href:s,target:"_blank",rel:"noreferrer",children:"LinkedIn"}),e.jsx("a",{href:r,children:"Email"}),e.jsx("span",{className:"sr-only",role:"status","aria-live":"polite","data-share-status":!0})]})}function E({post:t}){return e.jsx("section",{className:"article-closing-cta",children:e.jsxs("div",{className:"article-closing-cta-inner","data-rz-reveal":!0,children:[e.jsxs("div",{className:"article-closing-conversation",children:[e.jsx("div",{className:"article-closing-cta-kicker",children:"Continue the conversation"}),e.jsx("h2",{children:"Building through similar complexity?"}),e.jsx("p",{children:"Discuss the operating decisions behind the essay, or explore where my experience can help."}),e.jsxs("div",{className:"article-closing-actions",children:[e.jsx("a",{href:"/contact/#book","data-analytics-event":"cta_click","data-analytics-cta-id":"book_intro_call","data-analytics-cta-location":"blog_post_footer","data-analytics-cta-destination":"/contact/#book",className:"article-closing-action-primary",children:"Book introduction"}),e.jsx("a",{href:`mailto:${l.email}`,"data-analytics-event":"cta_click","data-analytics-placement":"essay_footer","data-analytics-target":"email",className:"article-closing-action-secondary",children:"Email Rizwan"})]})]}),e.jsx(q,{placement:"essay_footer",fromPage:`/blog/${t.slug}`,className:"article-ending-newsletter"})]})})}function $({post:t}){const a=t.thesis??t.description,s=a.length,r=s>210?" article-ending-quote-long":s>130?" article-ending-quote-medium":"";return e.jsxs("div",{className:"article-ending-thesis","data-rz-stagger":!0,children:[e.jsxs("blockquote",{className:`article-ending-quote${r}`,children:[e.jsx("span",{className:"article-ending-quote-mark","aria-hidden":"true",children:"“"}),e.jsx("p",{children:a})]}),e.jsxs("aside",{className:"article-author-note","aria-label":`About ${l.name}`,children:[e.jsxs("p",{className:"article-author-note-copy",children:["Payments product & program leader — scaled a regulated multi-rail platform from $0 to ",u.gtv," GTV across ",u.marketsWord," frontier markets. These essays are the public version of how I think through the work."]}),e.jsxs("div",{className:"article-author-identity",children:[e.jsx("span",{className:"article-author-portrait",children:e.jsx("img",{src:w,alt:l.name,width:80,height:80,loading:"lazy",decoding:"async"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"article-author-label",children:"Written by"}),e.jsx(n,{to:"/resume",className:"article-author-name",children:l.name}),e.jsx("p",{className:"article-author-role",children:l.role})]})]}),e.jsxs("div",{className:"article-author-links",children:[e.jsx(n,{to:"/resume",children:"View resume →"}),e.jsx("a",{href:l.linkedin,target:"_blank",rel:"noreferrer",children:"LinkedIn"})]})]})]})}function R({post:t,newer:a,older:s}){return e.jsx("section",{className:"article-ending","aria-labelledby":`article-ending-${t.slug}`,children:e.jsxs("div",{className:"article-ending-inner",children:[e.jsx("h2",{id:`article-ending-${t.slug}`,className:"sr-only",children:"Closing thought and further reading"}),e.jsx($,{post:t}),e.jsxs("div",{className:"article-ending-navigation","data-rz-stagger":!0,children:[e.jsxs("div",{className:"article-ending-share",children:[e.jsx("div",{className:"article-ending-share-label",children:"Share article"}),e.jsx(x,{post:t})]}),(a||s)&&e.jsxs("nav",{className:`article-sequence${a&&s?"":" article-sequence-single"}`,"aria-label":"Previous and next essays",children:[s&&e.jsxs(n,{to:"/blog/$slug",params:{slug:s.slug},rel:"prev","data-essay-transition-link":s.slug,className:"article-sequence-previous",children:[e.jsx("span",{className:"article-sequence-arrow","aria-hidden":"true",children:"←"}),e.jsxs("span",{className:"article-sequence-copy",children:[e.jsx("span",{className:"article-sequence-label",children:"Previous article"}),e.jsx("strong",{"data-essay-transition-title":!0,children:s.title}),e.jsxs("span",{className:"article-sequence-meta",children:[s.category," · ",s.readingTime]})]})]}),a&&e.jsxs(n,{to:"/blog/$slug",params:{slug:a.slug},rel:"next","data-essay-transition-link":a.slug,className:"article-sequence-next",children:[e.jsxs("span",{className:"article-sequence-copy",children:[e.jsx("span",{className:"article-sequence-label",children:"Next article"}),e.jsx("strong",{"data-essay-transition-title":!0,children:a.title}),e.jsxs("span",{className:"article-sequence-meta",children:[a.category," · ",a.readingTime]})]}),e.jsx("span",{className:"article-sequence-arrow","aria-hidden":"true",children:"→"})]})]})]})]})})}function F(t){return S[t.slug]??`/og/blog/${t.slug}.png`}function O({posts:t}){return e.jsx("section",{className:"article-related-reading","aria-labelledby":"related-reading-heading",children:e.jsxs("div",{className:"article-related-inner",children:[e.jsxs("header",{className:"article-related-intro","data-rz-reveal":!0,children:[e.jsxs("div",{className:"article-related-kicker",children:[e.jsx("span",{"aria-hidden":"true"})," Keep reading"]}),e.jsx("h2",{id:"related-reading-heading",children:"Ideas that continue the thread."}),e.jsxs(n,{to:"/blog",activeOptions:{exact:!0},className:"article-related-all",children:["View all essays ",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]}),e.jsx("div",{className:"article-related-grid","data-rz-stagger":!0,children:t.map((a,s)=>e.jsxs(n,{to:"/blog/$slug",params:{slug:a.slug},"data-essay-transition-link":a.slug,className:"article-related-story",children:[e.jsxs("figure",{className:"article-related-media",children:[e.jsx("img",{src:F(a),alt:"",loading:"lazy",decoding:"async",width:1200,height:630,sizes:"(max-width: 640px) 92vw, (max-width: 1023px) 44vw, 22vw"}),e.jsx("span",{className:"article-related-index","aria-hidden":"true",children:String(s+1).padStart(2,"0")})]}),e.jsxs("div",{className:"article-related-copy",children:[e.jsx("span",{className:"article-related-category",children:a.category}),e.jsx("h3",{"data-essay-transition-title":!0,children:a.title}),e.jsx("p",{children:a.thesis??a.description}),e.jsxs("span",{className:"article-related-meta",children:[a.readingTime,e.jsx("span",{className:"article-related-arrow","aria-hidden":"true",children:"↗"})]})]})]},a.slug))})]})})}function B(){const{post:t,content:a,related:s}=f.useLoaderData(),r=_(a),c=T[t.slug],o=b(t);j.useEffect(()=>{k("blog_view",{blog_slug:t.slug,blog_category:t.category,blog_reading_time:t.readingTime})},[t.slug,t.category,t.readingTime]);const d=m.findIndex(i=>i.slug===t.slug),y=d>0?m[d-1]:null,v=d>=0&&d<m.length-1?m[d+1]:null;return e.jsxs("article",{className:"blog-article-page overflow-x-clip","data-article-reader":!0,"data-article-slug":t.slug,children:[e.jsx("div",{className:"article-reading-progress","data-article-progress":!0,"aria-hidden":"true",children:e.jsx("span",{})}),e.jsx("header",{className:"article-hero rz-beam relative overflow-hidden border-b border-rule bg-surface",children:e.jsxs("div",{className:"article-hero-inner mx-auto max-w-6xl px-5 sm:px-6 pt-14 pb-12 md:pt-16 md:pb-16",children:[e.jsx(n,{to:"/blog",className:"article-arrival-back inline-flex py-2 -my-2 text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech",children:"← Essays"}),e.jsxs("div",{className:"mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12",children:[e.jsxs("div",{className:"lg:col-span-8 min-w-0",children:[e.jsxs("div",{className:"article-arrival-meta flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] font-mono-tech",children:[o?e.jsxs(n,{to:"/topics/$hub",params:{hub:o.slug},className:"inline-flex py-2 -my-2 items-center gap-2 text-[var(--brand)] font-semibold hover:opacity-80 transition-opacity",children:["◆ ",o.shortTitle]}):e.jsxs("span",{className:"text-[var(--brand)] font-semibold",children:["◆ ",t.category]}),e.jsx("span",{className:"text-ink-soft",children:t.category}),e.jsxs("span",{className:"text-ink-soft",children:[h(t.date)," · ",t.readingTime]})]}),e.jsx("h1",{"data-essay-transition-target":!0,className:"article-arrival-title font-instrument text-[clamp(2.25rem,4.6vw,4.25rem)] text-ink mt-5 leading-[1.03] max-w-4xl",children:t.title}),e.jsx("p",{className:"article-arrival-lede mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft",children:t.thesis??t.description}),e.jsxs("div",{className:"article-arrival-byline mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech",children:["By ",l.name]})]}),e.jsxs("div",{className:"article-arrival-utilities lg:col-span-4 min-w-0 border-t border-rule pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech",children:"Article"}),e.jsxs("dl",{className:"article-facts",children:[e.jsxs("div",{children:[e.jsx("dt",{children:"Reading time"}),e.jsx("dd",{children:t.readingTime})]}),e.jsxs("div",{children:[e.jsx("dt",{children:"Sections"}),e.jsx("dd",{children:r.length})]}),e.jsxs("div",{children:[e.jsx("dt",{children:t.updated?"Updated":"Published"}),e.jsx("dd",{children:h(t.updated??t.date)})]})]}),e.jsx("div",{className:"mt-6",children:e.jsx(x,{post:t})})]})]})]})}),e.jsxs("div",{className:"mx-auto max-w-6xl px-5 sm:px-6 py-12 grid lg:grid-cols-12 gap-10",children:[r.length>0&&e.jsx("nav",{className:"hidden lg:block lg:col-span-3 order-1","aria-labelledby":"article-map-heading",children:e.jsxs("div",{className:"article-desktop-map-shell relative pl-5 lg:sticky lg:top-24","data-article-map-shell":!0,children:[e.jsx("div",{className:"article-rail-progress","aria-hidden":"true",children:e.jsx("span",{"data-article-rail-progress":!0})}),e.jsx("div",{id:"article-map-heading",className:"text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] mb-3 font-mono-tech font-semibold",children:"◆ Article map"}),e.jsxs("div",{className:"article-map-nav","data-article-map-nav":!0,children:[e.jsx("span",{className:"article-map-marker","data-article-toc-marker":!0,"aria-hidden":"true"}),e.jsx("ul",{className:"space-y-2 text-sm leading-snug",children:r.map(i=>e.jsx("li",{children:e.jsx("a",{href:`#${i.id}`,"data-article-toc-link":!0,className:"article-map-link text-ink-soft hover:text-ink transition-colors",children:i.text})},i.id))})]})]})}),e.jsxs("div",{className:"lg:col-span-9 order-2 min-w-0","data-article-body":!0,children:[r.length>0&&e.jsxs("details",{className:"article-mobile-map lg:hidden",children:[e.jsxs("summary",{children:[e.jsx("span",{id:"article-mobile-map-heading",className:"article-mobile-map-title",children:"In this essay"}),e.jsxs("span",{className:"article-mobile-map-meta",children:[r.length," sections ",e.jsx("i",{"aria-hidden":"true"})]})]}),e.jsx("div",{className:"article-mobile-map-disclosure",children:e.jsx("div",{children:e.jsx("nav",{"aria-labelledby":"article-mobile-map-heading",children:e.jsx("ol",{children:r.map(i=>e.jsx("li",{children:e.jsx("a",{href:`#${i.id}`,"data-article-toc-link":!0,children:i.text})},i.id))})})})})]}),e.jsxs("div",{className:"prose-editorial max-w-3xl",children:[C(a),c?e.jsx(L,{title:c.title,caption:c.caption,children:e.jsx(c.component,{})}):null]}),e.jsxs("div",{className:"mt-10 pt-8 border-t border-rule",children:[e.jsx("div",{className:"text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech",children:"Tags"}),e.jsx("div",{className:"flex flex-wrap gap-2 font-sans",children:t.tags.map(i=>e.jsx("span",{className:"blog-tag-chip text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface",children:i},i))})]})]})]}),e.jsx(R,{post:t,newer:y,older:v}),s.length>0&&e.jsx(O,{posts:s}),e.jsx(E,{post:t}),e.jsx("script",{dangerouslySetInnerHTML:{__html:z}})]})}export{B as component};
