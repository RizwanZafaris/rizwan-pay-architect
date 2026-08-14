// Campaign attribution for booking links.
//
// The production site is fully static — no React hydration runs in the built
// HTML (same reason the analytics bridge and the resume-page Google Ads
// conversion are inline scripts in __root.tsx / resume.tsx). Anything that
// must execute for real visitors ships as an inline vanilla script.
//
// This script rewrites every cal.com link at load time:
//   - forwards the landing URL's campaign params (utm_*, gclid, gbraid,
//     wbraid, li_fat_id, msclkid) onto the booking URL, so a booked call
//     attributes back to the ad that paid for the click;
//   - appends ref=<data-analytics-cta-location> naming the CTA placement
//     (hire_hero, campaign_header, resume_page, …) on every visit.
// cal.com stores unknown query params with the booking; click ids also enable
// offline-conversion uploads later.
export const calendarCampaignParamsScript = `!function(){function a(){try{var q=new URLSearchParams(location.search),k=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","gbraid","wbraid","li_fat_id","msclkid"];document.querySelectorAll('a[href*="cal.com"]').forEach(function(e){try{var u=new URL(e.href);k.forEach(function(n){var v=q.get(n);if(v)u.searchParams.set(n,v)});var l=e.dataset.analyticsCtaLocation;if(l)u.searchParams.set("ref",l);e.href=u.toString();if(e.dataset.analyticsCtaDestination)e.dataset.analyticsCtaDestination=u.toString()}catch(x){}})}catch(x){}}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",a);else a()}();`;

import { LINKEDIN_BOOKING_CONVERSION_ID } from "@/lib/seo";

// Inline cal.com booking embed (used on /hire, /contact and /resume via
// <BookingSection/>) — the visitor books WITHOUT leaving the site. `ref`
// names the placement (hire_inline_embed / contact_inline_embed /
// resume_inline_embed) for funnel attribution.
//
// Same zero-hydration constraint as above: everything is a vanilla inline
// script. Behaviour:
//   - boot timing: by default embed.js loads lazily when the #book section
//     nears the viewport (IntersectionObserver, 900px margin) or a CTA
//     targeting #book is clicked. Pass {eager:true} on pages whose whole
//     purpose is booking (/hire): the embed then boots on load, so the
//     calendar is already interactive by the time the visitor scrolls to it
//     (a paid click must never stare at a blank slot);
//   - a #cal-booking-skeleton placeholder (rendered by BookingSection) covers
//     the pre-iframe gap; it is hidden on cal_embed_ready and by the
//     :has(iframe) CSS rule as a no-JS fallback;
//   - Cal.config.forwardQueryParams forwards the landing URL's utm_* / gclid /
//     li_fat_id etc. into the booking, same attribution contract as the link
//     rewriter above; ref=hire_inline_embed names the placement;
//   - theme is hard-coded "light": the site itself has no dark mode, so an
//     OS-dark visitor must not get a dark widget on the paper-white page;
//   - cal-brand matches the site palette;
//   - FUNNEL TRACKING for drop-off analysis. Stable, named GA4 stages replace
//     the noisy `cal_embed_step` + `cal_action` catch-all:
//       page_view             (site shell)                  — landed
//       schedule_meeting      (analytics bridge)            — booking intent
//       cal_embed_viewed      (here, IO ≥15%)               — calendar seen
//       cal_embed_ready       (bookerReady/linkReady/first  — widget usable
//                              public Cal action fallback)
//       booking_flow_started  (bookerViewed or              — Cal flow entered
//                              navigatedToBooker)
//       booking_submitted     (bookingSuccessfulV2)         — booking created
//       cal_embed_failed      (linkFailed/boot exception)   — technical failure
//     Cal's public embed API does not expose reliable date-selected,
//     time-selected, or form-started events. Do not infer those stages from
//     undocumented iframe messages. It also cannot prove that a created
//     booking was accepted/confirmed; that future event belongs in a trusted
//     Cal webhook/server path, never this browser script.
export const calInlineEmbedScript = (ref: string, opts?: { eager?: boolean }) => `!function(){
var section=document.getElementById("book");if(!section)return;
function track(ev,params){try{if(typeof gtag==="function"){params=params||{};params.placement=params.placement||"${ref}";gtag("event",ev,params)}}catch(x){}}
var stageSeen={};function stage(ev,params){if(stageSeen[ev])return;stageSeen[ev]=1;track(ev,params)}
function eventData(e){try{return e&&e.detail&&e.detail.data||{}}catch(x){return{}}}
function statusOf(data){var s=data&&data.status;return typeof s==="string"?s.toLowerCase().slice(0,40):"unknown"}
var bookingHandled=false,legacyTimer=0;
function recordBooking(e,version){if(bookingHandled)return;bookingHandled=true;var data=eventData(e),status=version==="legacy"?"unknown":statusOf(data),params={booking_status:status,cal_event_version:version};stage("booking_submitted",params);${
  LINKEDIN_BOOKING_CONVERSION_ID
    ? `try{if(window.lintrk)window.lintrk("track",{conversion_id:${Number(LINKEDIN_BOOKING_CONVERSION_ID)}})}catch(x){}`
    : ""
}}
function markFailed(reason){try{var sk=document.getElementById("cal-booking-skeleton");if(sk){sk.style.display="";sk.innerHTML='<p class="text-sm text-ink-soft py-4">The calendar could not load right now — use the booking links below instead.</p>'}}catch(x){}stage("cal_embed_failed",{failure_reason:String(reason||"unknown").slice(0,90)})}
var booted=false;
function boot(){if(booted)return;booted=true;
try{
(function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace])}else p(cal,ar);return}p(cal,ar)}})(window,"https://app.cal.com/embed/embed.js","init");
Cal("init","15min",{origin:"https://app.cal.com"});
Cal.config=Cal.config||{};Cal.config.forwardQueryParams=true;
Cal.ns["15min"]("inline",{elementOrSelector:"#cal-booking-slot",config:{layout:"month_view",useSlotsViewOnSmallScreen:true,theme:"light",ref:"${ref}"},calLink:"rizwan-zafar-gws2uk/15min"});
Cal.ns["15min"]("ui",{cssVarsPerTheme:{light:{"cal-brand":"#0e4f4f"},dark:{"cal-brand":"#3ecbe6"}},hideEventTypeDetails:false,layout:"month_view"});
var ready=false;function markReady(){if(!ready){ready=true;try{var sk=document.getElementById("cal-booking-skeleton");if(sk)sk.style.display="none"}catch(x){}stage("cal_embed_ready")}}
Cal.ns["15min"]("on",{action:"linkReady",callback:markReady});
Cal.ns["15min"]("on",{action:"bookerReady",callback:markReady});
Cal.ns["15min"]("on",{action:"bookerViewed",callback:function(){markReady();stage("booking_flow_started")}});
Cal.ns["15min"]("on",{action:"navigatedToBooker",callback:function(){markReady();stage("booking_flow_started")}});
Cal.ns["15min"]("on",{action:"linkFailed",callback:function(e){var data=eventData(e);markFailed(data.code||"unknown")}});
Cal.ns["15min"]("on",{action:"bookingSuccessfulV2",callback:function(e){if(legacyTimer)clearTimeout(legacyTimer);recordBooking(e,"v2")}});
Cal.ns["15min"]("on",{action:"bookingSuccessful",callback:function(e){legacyTimer=setTimeout(function(){recordBooking(e,"legacy")},1000)}});
Cal.ns["15min"]("on",{action:"*",callback:function(e){try{var a=e&&e.detail&&(e.detail.type||(e.detail.data&&e.detail.data.action));if(!a||typeof a!=="string"||a.indexOf("__")===0||a==="linkFailed")return;markReady()}catch(x){}}});
}catch(x){markFailed("embed_boot_exception")}}
try{if("IntersectionObserver" in window){${
  opts?.eager
    ? ""
    : `var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){boot();io.disconnect()}})},{rootMargin:"900px 0px"});io.observe(section);
`
}var seen=false,vo=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!seen){seen=true;stage("cal_embed_viewed");vo.disconnect()}})},{threshold:0.15});vo.observe(section)}else{stage("cal_embed_viewed");boot()}}catch(x){boot()}
${opts?.eager ? "boot();" : ""}
document.querySelectorAll('a[href="#book"]').forEach(function(a){a.addEventListener("click",function(ev){boot();try{ev.preventDefault();section.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"","#book")}catch(x){location.hash="book"}})});
window.addEventListener("hashchange",function(){if(location.hash==="#book"){boot();try{section.scrollIntoView({behavior:"smooth",block:"start"})}catch(x){}}});
if(location.hash==="#book")boot();
}();`;
