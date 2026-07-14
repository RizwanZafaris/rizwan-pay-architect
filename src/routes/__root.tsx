import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { pageAnalyticsContext } from "@/lib/analytics";

// SPA page-view tracker: re-configs gtag on every client-side route change so
// GA4/Ads attribute SPA navigations (dev/hydrated contexts only — the static
// production build never hydrates; initial loads are tracked by gtag.js).
declare global {
  interface Window {
    // dataLayer is declared canonically in analytics.ts (DataLayerEntry[]).
    // GTM is retired, so the gtag bootstrap below is the only writer.
    gtag?: (...args: unknown[]) => void;
    __rzifiAdsResumePageViewConversion?: boolean;
  }
}

function maybeTrackGoogleAdsResumePageView(pathname: string) {
  if (
    !GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO ||
    !window.gtag ||
    window.__rzifiAdsResumePageViewConversion
  ) {
    return;
  }
  if (pathname !== "/resume" && pathname !== "/resume/") return;
  window.__rzifiAdsResumePageViewConversion = true;
  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO,
  });
}

function RouteAnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      ...pageAnalyticsContext(pathname),
    };
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: payload.page_path,
        page_location: payload.page_location,
        page_title: payload.page_title,
      });
    }
    if (GOOGLE_ADS_ID && window.gtag) {
      window.gtag("config", GOOGLE_ADS_ID, {
        page_path: payload.page_path,
        page_location: payload.page_location,
        page_title: payload.page_title,
      });
    }
    maybeTrackGoogleAdsResumePageView(pathname);
  }, [pathname]);
  return null;
}

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter, CampaignHeader, CampaignFooter } from "@/components/SiteChrome";
import { calendarCampaignParamsScript } from "@/lib/campaign";
import { personSchemaAwards, personSchemaCredentials, profile } from "@/data/profile";
import { markets } from "@/data/markets";
import { PLATFORM } from "@/content/facts";
import {
  absUrl,
  SITE_URL,
  OG_IMAGE_URL,
  SITE_KEYWORDS,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_PAGE_VIEW_CONVERSION_SEND_TO,
  BING_SITE_VERIFICATION,
  MICROSOFT_CLARITY_ID,
  PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SRC,
  LINKEDIN_PARTNER_IDS,
  POSTHOG_KEY,
  POSTHOG_HOST,
} from "@/lib/seo";

// Google Tag Manager was retired 2026-06-12 — the container's UI-built tags
// duplicated the direct tags below, double-counting GA4/Ads/LinkedIn events.
// Direct gtag is the single pipeline now (see docs/ANALYTICS_SETUP.md).

const googleTagLoaderId = GOOGLE_ADS_ID || GA_MEASUREMENT_ID;

// Consent Mode v2 (Gate-A 2026-07-08). Defaults are DENIED for every
// storage category before gtag.js loads, so EU/UK visitors get cookieless
// pings only until they opt in via the banner below. The banner's
// onConsent/onChange hook flips these with gtag("consent","update",...).
// This script MUST render before the gtag.js loader tag.
const consentDefaultScript = googleTagLoaderId
  ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500});gtag("set","url_passthrough",true);`
  : "";

const gaBootstrapScript = googleTagLoaderId
  ? [
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());`,
      GA_MEASUREMENT_ID ? `gtag("config","${GA_MEASUREMENT_ID}",{send_page_view:true});` : "",
      GOOGLE_ADS_ID ? `gtag("config","${GOOGLE_ADS_ID}");` : "",
    ].join("")
  : "";

const clarityScript = MICROSOFT_CLARITY_ID
  ? `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(MICROSOFT_CLARITY_ID)});`
  : "";

// LinkedIn Insight Tag — official snippet, wrapped in a consent gate
// (Gate-A 2026-07-08). Unlike gtag, LinkedIn has no cookieless consent
// mode, so the loader is exposed as window.__rzLoadLinkedIn and only
// invoked by the consent banner once the visitor accepts the marketing
// category. Retargeting audiences and Campaign Manager conversions build
// from consented traffic only. Partner id in src/lib/seo.ts.
const linkedInInsightScript = LINKEDIN_PARTNER_IDS.length
  ? `window.__rzLoadLinkedIn=function(){if(window.__rzLinkedInLoaded)return;window.__rzLinkedInLoaded=1;window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];${LINKEDIN_PARTNER_IDS.map((id) => `window._linkedin_data_partner_ids.push("${id}");`).join("")}(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);};`
  : "";

// PostHog product analytics — official array-stub snippet wrapped in a consent
// gate (like LinkedIn above). The loader is exposed as window.__rzLoadPostHog
// and invoked by the consent banner only once the visitor accepts the
// "analytics" category, so no PostHog request fires for visitors who decline.
// Modern defaults bundle (2025-05-24): autocapture + pageview/pageleave, and
// person_profiles "identified_only". Key/host in src/lib/seo.ts.
const postHogLoaderScript = POSTHOG_KEY
  ? `window.__rzLoadPostHog=function(){if(window.__rzPostHogLoaded)return;window.__rzPostHogLoaded=1;!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);window.posthog.init(${JSON.stringify(POSTHOG_KEY)},{api_host:${JSON.stringify(POSTHOG_HOST)},defaults:"2025-05-24"});};`
  : "";

// Consent banner boot (vanilla-cookieconsent v3, vendored under
// /vendor/ — run `bun run vendor:consent` after upgrading the package).
// Maps the two optional categories onto Consent Mode v2 and the LinkedIn
// loader. Copy follows PRODUCT.md register: specific, no urgency, no
// exclamation marks, no em dashes.
const consentInitScript = googleTagLoaderId
  ? `document.addEventListener("DOMContentLoaded",function(){var CC=window.CookieConsent;if(!CC)return;
function apply(){var an=CC.acceptedCategory("analytics"),mk=CC.acceptedCategory("marketing");
if(window.gtag){window.gtag("consent","update",{analytics_storage:an?"granted":"denied",ad_storage:mk?"granted":"denied",ad_user_data:mk?"granted":"denied",ad_personalization:mk?"granted":"denied"});}
if(mk&&window.__rzLoadLinkedIn)window.__rzLoadLinkedIn();
if(an){if(window.__rzLoadPostHog)window.__rzLoadPostHog();}else if(window.posthog&&window.posthog.opt_out_capturing){window.posthog.opt_out_capturing();}}
CC.run({guiOptions:{consentModal:{layout:"box inline",position:"bottom right",equalWeightButtons:true,flipButtons:false},preferencesModal:{layout:"box",equalWeightButtons:true}},
categories:{necessary:{enabled:true,readOnly:true},analytics:{},marketing:{}},
language:{default:"en",translations:{en:{
consentModal:{title:"Cookies, kept honest",description:"A few cookies measure which essays and case studies get read, and whether outreach converts. Decline and the site works exactly the same.",acceptAllBtn:"Accept all",acceptNecessaryBtn:"Essential only",showPreferencesBtn:"Choose per category"},
preferencesModal:{title:"Cookie preferences",acceptAllBtn:"Accept all",acceptNecessaryBtn:"Essential only",savePreferencesBtn:"Save choices",closeIconLabel:"Close",sections:[
{title:"Essential",description:"Required for the site to function. Always on.",linkedCategory:"necessary"},
{title:"Analytics",description:"GA4 and PostHog product analytics: which essays, case studies and CTAs get attention.",linkedCategory:"analytics"},
{title:"Marketing",description:"Google Ads and LinkedIn conversion measurement for outreach campaigns.",linkedCategory:"marketing"}]}}}},
onConsent:apply,onChange:apply});});`
  : "";

const analyticsBridgeScript =
  GA_MEASUREMENT_ID || GOOGLE_ADS_ID
    ? `!function(){if(window.__rzifiAnalyticsBridge)return;window.__rzifiAnalyticsBridge=1;
function ctx(){var p=location.pathname,t="supporting_page",s="discovery",a="recruiter_hiring_manager";if(p==="/"){t="home"}else if(p.indexOf("/resume/")===0){t="resume";s="validation"}else if(p.indexOf("/for/")===0){t="recruiter";s="validation"}else if(p.indexOf("/contact/")===0){t="contact";s="conversion"}else if(p.indexOf("/product-work/")===0&&p!=="/product-work/"){t="case_study";s="proof";a="product_leadership"}else if(p.indexOf("/product-work/")===0){t="case_studies";s="proof";a="product_leadership"}else if(p.indexOf("/blog/")===0&&p!=="/blog/"){t="blog_post";s="authority";a="payments_product_leaders"}else if(p.indexOf("/blog/")===0||p.indexOf("/topics/")===0){t="authority_hub";s="authority";a="payments_product_leaders"}return{page_path:p,page_location:location.href,page_title:document.title,page_type:t,funnel_stage:s,audience:a}}
function scrub(o){var c={},r=/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/gi;for(var k in o){if(!Object.prototype.hasOwnProperty.call(o,k))continue;var v=o[k];if(k.indexOf("email")>-1)continue;if(typeof v==="string"){if(v.indexOf("mailto:")===0)v="mailto";else v=v.replace(r,"[redacted]")}c[k]=v}return c}
function p(e,d){var payload=Object.assign({},ctx(),scrub(d||{}));if(window.gtag)window.gtag("event",e,payload)}
function k(s){return s.replace(/^analytics/,"").replace(/[A-Z]/g,function(c){return"_"+c.toLowerCase()}).replace(/^_/,"")}
function d(el){var o={};for(var n in el.dataset)if(n.indexOf("analytics")===0&&n!=="analyticsEvent")o[k(n)]=el.dataset[n];return o}
function place(){var x=location.pathname;if(x==="/")return"hero";if(x.indexOf("/resume/")===0)return"resume_page";if(x.indexOf("/for/")===0)return"for";if(x.indexOf("/product-work/")===0)return"case_study";return"header"}
function out(href){if(!href)return null;if(href.indexOf("mailto:")===0||href.indexOf("tel:")===0){var u=new URL(href,location.href);return{outbound_domain:u.hostname||u.protocol.replace(":",""),outbound_url:u.protocol==="mailto:"?"mailto":href,outbound_location:location.pathname,link_type:u.protocol==="mailto:"?"email":"external"}}if(/^https?:\\/\\//i.test(href)){var x=new URL(href,location.href);if(x.hostname!==location.hostname)return{outbound_domain:x.hostname,outbound_url:href,outbound_location:location.pathname,link_type:x.hostname.indexOf("linkedin.com")>-1?"linkedin":"external"}}return null}
document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest("[data-analytics-event],a[href]");if(!el)return;var href=el.getAttribute("href")||"",ev=el.dataset.analyticsEvent,cid=el.dataset.analyticsCtaId||"";if(ev)p(ev,d(el));if(cid==="book_intro_call"||cid==="ask_availability"||href.indexOf("cal.com")>-1)p("schedule_meeting",{placement:el.dataset.analyticsCtaLocation||place(),schedule_url:href});if(/\\.pdf(?:$|[?#])/i.test(href))p("resume_download",{placement:el.dataset.analyticsPlacement||el.dataset.analyticsSource||place()});var o=out(href);if(o){if(ev!=="outbound_click")p("outbound_click",o);if(o.link_type==="email")p("email_click",{link_location:o.outbound_location});if(o.link_type==="linkedin")p("linkedin_click",{link_location:o.outbound_location})}});
document.addEventListener("focusin",function(e){var el=e.target.closest&&e.target.closest('form[data-analytics-form="contact"]');if(!el||el.__rzifiContactStarted)return;el.__rzifiContactStarted=1;p("contact_form_start",{})});
document.addEventListener("submit",function(e){var f=e.target;if(!f||!f.matches||!f.matches("form"))return;if(f.dataset.analyticsForm==="newsletter"){p("newsletter_signup",{placement:f.dataset.analyticsPlacement||place()});return}var ev=f.dataset.analyticsEvent;if(!ev&&f.getAttribute("role")==="search")ev="site_search";if(ev==="site_search"){var fd=new FormData(f);p("site_search",{search_term:String(fd.get("q")||"").trim().slice(0,120),search_location:f.dataset.analyticsSearchLocation||"blog",search_filter:f.dataset.analyticsSearchFilter||""})}});
document.addEventListener("DOMContentLoaded",function(){var path=location.pathname,slug;if(path.indexOf("/blog/")===0&&path!=="/blog/"){slug=path.split("/").filter(Boolean).pop();p("blog_view",{blog_slug:slug||"",blog_category:(document.querySelector('meta[property="article:section"]')||{}).content||"",blog_reading_time:""})}if(path.indexOf("/product-work/")===0&&path!=="/product-work/"){slug=path.split("/").filter(Boolean).pop();p("case_study_view",{case_study_slug:slug||"",case_study_category:""})}})}();`
    : "";

// Universal scroll-reveal + count-up engine (Gate-B motion pass 2026-07-08).
// The production build ships zero React hydration, so the old React <Reveal>/
// <CountUp> components never animated in production and the CSS reveals were
// Chromium-only (animation-timeline). This single inline script drives every
// reveal from one IntersectionObserver, cross-browser, no hydration needed:
/* Theme bootstrap. Runs synchronously in <head>, before first paint.
 *
 * Precedence: an explicit stored choice wins; otherwise follow the OS. Dark is
 * the fallback — it is the brand's default palette, and it is what `:root`
 * carries, so if this script never runs (JS off) the page still renders
 * correctly in dark rather than half-themed.
 *
 * The server cannot know the visitor's theme (no cookie is set), so the SSR
 * markup has no `data-theme` and this script adds it before paint. React DOES
 * diff <html> attributes on hydration, so <html> carries
 * `suppressHydrationWarning` — the standard, and only, way to reconcile a
 * pre-paint theme script with SSR. The suppression is one level deep: it covers
 * <html>'s own attributes, not its subtree.
 *
 * `rz-theme-js` reveals the toggle. A theme switch is meaningless without JS,
 * so the control stays hidden rather than sitting there inert.
 */
const THEME_STORAGE_KEY = "rz-theme";
const themeBootstrapScript = `(function(){var e=document.documentElement;var t;try{t=localStorage.getItem('${THEME_STORAGE_KEY}');}catch(_){}
if(t!=='light'&&t!=='dark'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}
e.setAttribute('data-theme',t);e.classList.add('rz-theme-js');
try{var m=window.matchMedia('(prefers-color-scheme: light)');var h=function(ev){var s=null;try{s=localStorage.getItem('${THEME_STORAGE_KEY}');}catch(_){}
if(s==='light'||s==='dark')return;e.setAttribute('data-theme',ev.matches?'light':'dark');};
if(m.addEventListener)m.addEventListener('change',h);}catch(_){}})();`;

// Route art-direction classes are stamped during head parsing so the header and
// progress chrome cannot flash in the wrong state before route runtimes bind.
const routeArtBootstrapScript = `(function(){var e=document.documentElement,p=location.pathname,a=p.split('/').filter(Boolean);if(p==='/'||p==='/index.html')e.classList.add('corridor-home-active');if(a.length===2&&a[0]==='blog')e.classList.add('article-reader-active');if(p==='/resume'||p==='/resume/')e.classList.add('resume-editorial-active');})();`;

//   1. Adds `.rz-js` to <html> ONLY when motion is allowed (IO supported and
//      reduced-motion not set) so the CSS hidden state is gated safely — no-JS
//      and reduced-motion visitors keep content fully visible.
//   2. Elements in view on load reveal in a short top-to-bottom cascade
//      (the "alive from first view" entrance); below-fold reveal on scroll.
//   3. [data-rz-count] tiles count 0 → value on an ease-out-quart curve when
//      they enter view, then restore the exact server text (never drift).
//   4. A 2.6s safety timer force-reveals everything so content is never stuck.
const rzRevealScript = `(function(){var d=document,el=d.documentElement;try{if(!('IntersectionObserver'in window))return;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;el.classList.add('rz-js');}catch(e){return;}
function count(n){var t=parseFloat(n.getAttribute('data-rz-count'));if(isNaN(t))return;var tpl=n.getAttribute('data-rz-count-tpl')||'{n}',dc=parseInt(n.getAttribute('data-rz-count-dec')||'0',10),du=parseInt(n.getAttribute('data-rz-count-dur')||'1400',10),fin=n.textContent,s=0,done=false;
/* The server-rendered text is already the correct final value. If the tab is
   hidden (rAF would be throttled), leave it untouched — never reset to 0. */
if(document.hidden)return;
function f(v){var x=dc===0?Math.round(v).toLocaleString('en-US'):v.toFixed(dc);return tpl.replace('{n}',x);}
function settle(){if(done)return;done=true;n.textContent=fin;}
function k(now){if(done)return;if(!s)s=now;var p=Math.min((now-s)/du,1),e=1-Math.pow(1-p,4);n.textContent=f(t*e);if(p<1)requestAnimationFrame(k);else settle();}
n.textContent=f(0);requestAnimationFrame(k);
/* Hard guarantee: whatever happens to rAF, snap to the real final value. The
   number can never strand at 0 — the whole site is built on exact numbers. */
setTimeout(settle,du+800);}
function boot(){var tg=d.querySelectorAll('[data-rz-reveal],.rz-reveal,[data-rz-words],.bg-paths,.rz-unveil,.home-soft-reveal,.home-card,.home-topic-card,.home-search-panel,.case-study-card,.case-soft-card,.case-metric-card,[data-rz-stagger],.rz-beam'),ct=d.querySelectorAll('[data-rz-count]'),vh=window.innerHeight||el.clientHeight,seen=[];Array.prototype.forEach.call(tg,function(t){var r=t.getBoundingClientRect();if(r.top<vh*0.92&&r.bottom>0)seen.push(t);});seen.sort(function(a,b){return a.getBoundingClientRect().top-b.getBoundingClientRect().top;});seen.forEach(function(t,i){if(!t.style.getPropertyValue('--rz-delay'))t.style.setProperty('--rz-delay',Math.min(i*80,520)+'ms');});
var io=new IntersectionObserver(function(en,o){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('rz-in');o.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.08});Array.prototype.forEach.call(tg,function(t){io.observe(t);});
var cio=new IntersectionObserver(function(en,o){en.forEach(function(x){if(x.isIntersecting){count(x.target);o.unobserve(x.target);}});},{threshold:0.6});Array.prototype.forEach.call(ct,function(c){cio.observe(c);});
/* Catch-up safety net: reveal ONLY what is already in or above the viewport,
   in case the observer lagged on first paint. Below-fold elements stay hidden
   and wait for the scroll observer, so lingering on the hero never burns the
   reveals further down. IO is gated on support above, so below-fold reveals
   are never at risk of getting stuck. */
setTimeout(function(){var v=window.innerHeight||el.clientHeight;Array.prototype.forEach.call(tg,function(t){if(t.getBoundingClientRect().top<v)t.classList.add('rz-in');});},1200);
/* Hero entrance: fire two frames after boot so the H1 (LCP) has already
   painted, then the supporting cast + portrait stage in. */
requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('rz-hero-go');});});
/* --- Operator's Console modules (2026-07-09). Inherit the reduced-motion +
   IO gates above; pointer modules additionally require a fine pointer. --- */
Array.prototype.forEach.call(d.querySelectorAll('[data-rz-stagger]'),function(p){var i=0;Array.prototype.forEach.call(p.children,function(c){c.style.setProperty('--i',String(i++));});});
var sc=false;function onSc(){var s=(window.scrollY||el.scrollTop||0)>24;if(s!==sc){sc=s;el.classList.toggle('rz-scrolled',s);}}
window.addEventListener('scroll',onSc,{passive:true});onSc();
if(window.matchMedia&&window.matchMedia('(hover: hover) and (pointer: fine)').matches){
/* Probe glow: one delegated pointermove; rAF-throttled; a single
   getBoundingClientRect per frame only while a [data-glow] card is hot. */
var pe=null,px=0,py=0,praf=0;
function probe(){praf=0;if(!pe)return;var r=pe.getBoundingClientRect();if(!r.width)return;pe.style.setProperty('--gx',(((px-r.left)/r.width)*100).toFixed(2)+'%');pe.style.setProperty('--gy',(((py-r.top)/r.height)*100).toFixed(2)+'%');}
d.addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;var t=e.target&&e.target.closest?e.target.closest('[data-glow]'):null;if(t!==pe){if(pe)pe.classList.remove('rz-probe');pe=t;if(pe)pe.classList.add('rz-probe');}if(pe&&!praf)praf=requestAnimationFrame(probe);},{passive:true});
/* Magnetic CTA: bounded pull toward the cursor, spring-back on leave. */
Array.prototype.forEach.call(d.querySelectorAll('[data-magnetic]'),function(m){var r=null;
m.addEventListener('pointerenter',function(){r=m.getBoundingClientRect();m.classList.add('rz-mag-live');});
m.addEventListener('pointermove',function(e){if(!r)r=m.getBoundingClientRect();var dx=(e.clientX-(r.left+r.width/2))*0.18,dy=(e.clientY-(r.top+r.height/2))*0.22;dx=Math.max(-8,Math.min(8,dx));dy=Math.max(-6,Math.min(6,dy));m.style.setProperty('--mag-x',dx.toFixed(1)+'px');m.style.setProperty('--mag-y',dy.toFixed(1)+'px');},{passive:true});
m.addEventListener('pointerleave',function(){r=null;m.classList.remove('rz-mag-live');m.style.setProperty('--mag-x','0px');m.style.setProperty('--mag-y','0px');});});
}}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();})();`;

function NotFoundComponent() {
  useEffect(() => {
    document.title = "Page Not Found | Rizwan Zafar";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    const prev = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, follow");
    return () => {
      if (prev) meta!.setAttribute("content", prev);
      else meta!.remove();
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
        Error · 404
      </div>
      <h1 className="font-instrument text-5xl md:text-7xl text-ink mt-3">Page not found</h1>
      <p className="mt-4 text-ink-soft max-w-md mx-auto">
        That page does not exist. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Link to="/" className="rounded-md bg-ink text-background px-4 py-2 text-sm">
          Home
        </Link>
        <Link
          to="/product-work"
          className="rounded-md border border-ink/20 px-4 py-2 text-sm text-ink hover:border-ink/50"
        >
          Product Work
        </Link>
        <Link
          to="/blog"
          className="rounded-md border border-ink/20 px-4 py-2 text-sm text-ink hover:border-ink/50"
        >
          Essays
        </Link>
        <Link
          to="/resume"
          className="rounded-md border border-ink/20 px-4 py-2 text-sm text-ink hover:border-ink/50"
        >
          Resume
        </Link>
        <Link
          to="/contact"
          className="rounded-md border border-ink/20 px-4 py-2 text-sm text-ink hover:border-ink/50"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium text-ink">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">Something went wrong. Try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-ink text-background px-4 py-2 text-sm"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-ink/20 px-4 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  name: profile.name,
  alternateName: ["Rizwan Zafar payments", "Rizwan Zafar SimPaisa", "Rizwan Zafar CPO"],
  givenName: profile.givenName,
  familyName: profile.familyName,
  nationality: profile.nationality,
  jobTitle: "Chief Product Officer, Payments Infrastructure",
  // Duration is computed (owner ruling 2026-07-06) so it can't go stale. The
  // sentence break before the platform metrics keeps the two-tier gate green.
  description: `Fintech CPO with ${profile.career.years} years scaling regulated payment infrastructure. ${PLATFORM.gtv} GTV, ${PLATFORM.annualPayments} payments a year, ${PLATFORM.marketCount} frontier markets. Dubai, UAE.`,
  disambiguatingDescription: profile.entityDisambiguation,
  url: SITE_URL,
  image: `${SITE_URL}/og-default.png`,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  // Employer edge — lets answer engines resolve "who built/leads Simpaisa
  // payments infrastructure" to this Person entity.
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}#simpaisa`,
    name: "SimPaisa",
    url: "https://simpaisa.com",
    description:
      "Payments & fintech infrastructure company (Dubai). Rizwan Zafar is Chief Product Officer.",
  },
  sameAs: profile.entitySameAs,
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "Wikidata",
      value: "Q140070742",
      url: profile.wikidata,
    },
    {
      "@type": "PropertyValue",
      propertyID: "Crunchbase",
      value: "rizwan-zafar-aa54",
      url: profile.crunchbase,
    },
  ],
  subjectOf: [
    {
      "@type": "ProfilePage",
      name: "Rizwan Zafar on Crunchbase",
      url: profile.crunchbase,
    },
    {
      "@type": "ProfilePage",
      name: "Rizwan Zafar on Wikidata",
      url: profile.wikidata,
    },
  ],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "MIT Sloan School of Management" },
    { "@type": "EducationalOrganization", name: "University of Karachi" },
  ],
  hasCredential: personSchemaCredentials.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c,
  })),
  award: personSchemaAwards,
  // Operating markets as Place nodes (career-scope). Sourced from
  // @/data/markets; markets awaiting owner confirmation (needsOwnerConfirm,
  // e.g. Nigeria) are excluded so every node stays fully verified.
  workLocation: markets
    .filter((m) => !m.needsOwnerConfirm)
    .map((m) => ({ "@type": "Place", name: m.name })),
  // entityKnowsAbout (profile.ts) is Simpaisa/payments-scoped; append the
  // wider career-arc domains inline here (do not edit profile.ts) so the
  // Person entity reflects the full 17-year e-commerce/OTT/DCB/transformation
  // scope, not just the current payments role.
  knowsAbout: [
    ...profile.entityKnowsAbout,
    "E-commerce marketplaces",
    "OTT subscription monetisation",
    "Direct Carrier Billing",
    "Digital transformation programmes",
  ],
  // Past employers (Daraz, Tapmad) intentionally omitted from structured data
  // here: schema.org Person has no clean "former employer" property, so
  // worksFor stays scoped to the current role (Simpaisa) to avoid implying
  // they are current. The career history is represented on /journey as an
  // ItemList (owned by the /journey route), which is the valid home for it.
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: `${profile.name}, Payments Product Executive`,
  alternateName: "rzifi.com",
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
  publisher: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization JSON-LD complements the Person entity. AI tools (Perplexity,
// Bing Copilot, ChatGPT Search) use Organization to construct knowledge-panel
// style citations and link "Rizwan Zafar" the entity to rzifi.com the site.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "Rizwan Zafar — Payments Product Executive",
  alternateName: "rzifi",
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.png`,
  image: `${SITE_URL}/og-default.png`,
  founder: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
  sameAs: profile.entitySameAs,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Hiring inquiries",
    email: profile.email,
    areaServed: ["AE", "SA", "PK", "BD", "EG", "IQ", "SG", "GB", "EU"],
    availableLanguage: ["en"],
  },
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "kWHcLbkjB3HB8amvRUoa8gMfThcigOtXteUIZUPu8mc" },
      ...(BING_SITE_VERIFICATION
        ? [{ name: "msvalidate.01", content: BING_SITE_VERIFICATION }]
        : []),
      { title: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        name: "description",
        content:
          "Rizwan Zafar, payments product executive in Dubai building regulated payment infrastructure across emerging markets.",
      },
      { name: "author", content: profile.name },
      { name: "keywords", content: SITE_KEYWORDS },
      { name: "theme-color", content: "#0e4f4f" },
      // Open Graph
      { property: "og:site_name", content: `${profile.name}, Payments Product Executive` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        property: "og:description",
        content: `Product & Program Executive scaling fintech infrastructure in complex markets. ${PLATFORM.gtv} GTV, ${PLATFORM.annualPayments} payments a year, ${PLATFORM.marketCount} frontier markets. Acceptance, cross-border, settlement, KYC/KYB, AML and fraud.`,
      },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: `${profile.name}, Payments Product Executive` },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        name: "twitter:description",
        content: `Product & Program Executive scaling fintech infrastructure in complex markets. ${PLATFORM.gtv} GTV, ${PLATFORM.annualPayments} payments a year, ${PLATFORM.marketCount} frontier markets.`,
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
      { name: "twitter:image:alt", content: `${profile.name}, Payments Product Executive` },
    ],
    // Note: no root-level <link rel="canonical">. Every route sets its own
    // self-canonical via absUrl(path); a root canonical pointing at SITE_URL
    // would duplicate (and conflict with) the page-level one on every subpage.
    links: [
      // Brand favicon (SVG — modern browsers + Google SERP). Replaces the
      // generic globe shown for a site with no icon.
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "mask-icon", href: "/favicon.svg", color: "#0e4f4f" },
      // AI-discovery hint for the curated LLM index.
      { rel: "alternate", type: "text/markdown", href: "/llms.txt", title: "llms.txt" },
      // Keep hosted editorial fonts off the mobile critical path. The mobile
      // article route already has strong system fallbacks, and this avoids a
      // render-blocking Google Fonts stylesheet before first paint.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
        media: "(min-width: 768px)",
      },
      { rel: "stylesheet", href: appCss },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Rizwan Zafar Payments Essays",
        href: absUrl("/feed.xml"),
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the theme script stamps `data-theme` (and the
    // reveal engine stamps `.rz-js`) onto <html> before React hydrates. The
    // server cannot predict either. This suppresses the diff for <html>'s own
    // attributes only — it does not extend to the subtree.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme FIRST — before any stylesheet resolves and before paint, or the
            page renders in the default (dark) palette and then snaps to light. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <script dangerouslySetInnerHTML={{ __html: routeArtBootstrapScript }} />
        {/* Reveal engine next: adds `.rz-js` during head parse so the CSS
            hidden state is set before the body paints (no flash-of-visible
            then hide). Gated on IO support + reduced-motion inside the script. */}
        <script dangerouslySetInnerHTML={{ __html: rzRevealScript }} />
        {/* Consent defaults MUST precede the gtag.js loader (Consent Mode v2). */}
        {consentDefaultScript && (
          <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        )}
        {googleTagLoaderId && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagLoaderId}`} />
        )}
        {gaBootstrapScript && <script dangerouslySetInnerHTML={{ __html: gaBootstrapScript }} />}
        {analyticsBridgeScript && (
          <script dangerouslySetInnerHTML={{ __html: analyticsBridgeScript }} />
        )}
        <script dangerouslySetInnerHTML={{ __html: calendarCampaignParamsScript }} />
        {clarityScript && <script dangerouslySetInnerHTML={{ __html: clarityScript }} />}
        {linkedInInsightScript && (
          <script dangerouslySetInnerHTML={{ __html: linkedInInsightScript }} />
        )}
        {postHogLoaderScript && (
          <script dangerouslySetInnerHTML={{ __html: postHogLoaderScript }} />
        )}
        {consentInitScript && (
          <>
            <link rel="stylesheet" href="/vendor/cookieconsent.css" media="print" data-cc-css />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){var l=document.querySelector("link[data-cc-css]");if(l)l.media="all";})();`,
              }}
            />
            <script defer src="/vendor/cookieconsent.umd.js" />
            <script dangerouslySetInnerHTML={{ __html: consentInitScript }} />
          </>
        )}
        {PLAUSIBLE_DOMAIN && <script defer data-domain={PLAUSIBLE_DOMAIN} src={PLAUSIBLE_SRC} />}
        <HeadContent />
      </head>
      <body>
        {/* Animated brand gradient-mesh substrate — the field the light-glass
            panels refract. Fixed behind everything, decorative, non-interactive. */}
        <div className="rz-substrate" aria-hidden />
        {/* Site-wide film-grain texture overlay (decorative, non-interactive). */}
        <div className="rz-grain" aria-hidden />
        {LINKEDIN_PARTNER_IDS.length > 0 && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_IDS[0]}&fmt=gif`}
            />
          </noscript>
        )}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // Paid landing pages swap the full site chrome for a single-action header —
  // every nav tab on a paid click is an exit path the campaign paid for.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCampaignPage = pathname === "/hire" || pathname === "/hire/";
  return (
    <QueryClientProvider client={queryClient}>
      {(GA_MEASUREMENT_ID || GOOGLE_ADS_ID) && <RouteAnalyticsTracker />}
      <div className="min-h-screen flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {isCampaignPage ? <CampaignHeader /> : <SiteHeader />}
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        {isCampaignPage ? <CampaignFooter /> : <SiteFooter />}
      </div>
    </QueryClientProvider>
  );
}
