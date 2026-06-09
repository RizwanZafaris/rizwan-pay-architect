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
