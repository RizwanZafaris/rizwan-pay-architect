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

// SPA page-view tracker: pushes to dataLayer on every client-side route change
// so GTM tags fire on navigation, not just the initial load. Pair with GTM's
// "History Change" or a Custom Event ("spa_pageview") trigger.
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}
function GtmRouteTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      ...pageAnalyticsContext(pathname),
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "spa_pageview", ...payload });
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: payload.page_path,
        page_location: payload.page_location,
        page_title: payload.page_title,
      });
    }
  }, [pathname]);
  return null;
}

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { profile } from "@/data/profile";
import {
  absUrl,
  SITE_URL,
  OG_IMAGE_URL,
  SITE_KEYWORDS,
  GTM_ID,
  GA_MEASUREMENT_ID,
  BING_SITE_VERIFICATION,
  MICROSOFT_CLARITY_ID,
  PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SRC,
} from "@/lib/seo";

// Google Tag Manager bootstrap, runs as early as possible. Mirrors Google's
// official snippet. Skipped when GTM_ID is empty (e.g. local dev).
const gtmScript = GTM_ID
  ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
  : "";

const gaBootstrapScript = GA_MEASUREMENT_ID
  ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_MEASUREMENT_ID}",{send_page_view:true});`
  : "";

const clarityScript = MICROSOFT_CLARITY_ID
  ? `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(MICROSOFT_CLARITY_ID)});`
  : "";

const analyticsBridgeScript =
  GTM_ID || GA_MEASUREMENT_ID
    ? `!function(){if(window.__rzifiAnalyticsBridge)return;window.__rzifiAnalyticsBridge=1;
function ctx(){var p=location.pathname,t="supporting_page",s="discovery",a="recruiter_hiring_manager";if(p==="/"){t="home"}else if(p.indexOf("/resume/")===0){t="resume";s="validation"}else if(p.indexOf("/for/")===0){t="recruiter";s="validation"}else if(p.indexOf("/contact/")===0){t="contact";s="conversion"}else if(p.indexOf("/product-work/")===0&&p!=="/product-work/"){t="case_study";s="proof";a="product_leadership"}else if(p.indexOf("/product-work/")===0){t="case_studies";s="proof";a="product_leadership"}else if(p.indexOf("/blog/")===0&&p!=="/blog/"){t="blog_post";s="authority";a="payments_product_leaders"}else if(p.indexOf("/blog/")===0||p.indexOf("/topics/")===0){t="authority_hub";s="authority";a="payments_product_leaders"}return{page_path:p,page_location:location.href,page_title:document.title,page_type:t,funnel_stage:s,audience:a}}
function scrub(o){var c={},r=/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/gi;for(var k in o){if(!Object.prototype.hasOwnProperty.call(o,k))continue;var v=o[k];if(k.indexOf("email")>-1)continue;if(typeof v==="string"){if(v.indexOf("mailto:")===0)v="mailto";else v=v.replace(r,"[redacted]")}c[k]=v}return c}
function p(e,d){var payload=Object.assign({},ctx(),scrub(d||{}));window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:e},payload));if(window.gtag)window.gtag("event",e,payload)}
function k(s){return s.replace(/^analytics/,"").replace(/[A-Z]/g,function(c){return"_"+c.toLowerCase()}).replace(/^_/,"")}
function d(el){var o={};for(var n in el.dataset)if(n.indexOf("analytics")===0&&n!=="analyticsEvent")o[k(n)]=el.dataset[n];return o}
function source(){var x=location.pathname;if(x==="/")return"hero";if(x.indexOf("/resume/")===0)return"resume_page";if(x.indexOf("/for/")===0)return"for";if(x.indexOf("/about/")===0)return"about";if(x.indexOf("/product-work/")===0)return"case_study";return"header"}
function out(href){if(!href)return null;if(href.indexOf("mailto:")===0||href.indexOf("tel:")===0){var u=new URL(href,location.href);return{outbound_domain:u.hostname||u.protocol.replace(":",""),outbound_url:u.protocol==="mailto:"?"mailto":href,outbound_location:location.pathname,link_type:u.protocol==="mailto:"?"email":"external"}}if(/^https?:\\/\\//i.test(href)){var x=new URL(href,location.href);if(x.hostname!==location.hostname)return{outbound_domain:x.hostname,outbound_url:href,outbound_location:location.pathname,link_type:x.hostname.indexOf("linkedin.com")>-1?"linkedin":"external"}}return null}
document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest("[data-analytics-event],a[href]");if(!el)return;var href=el.getAttribute("href")||"",ev=el.dataset.analyticsEvent;if(ev)p(ev,d(el));if(/\\.pdf(?:$|[?#])/i.test(href))p("resume_download",{source:el.dataset.analyticsSource||source()});var o=out(href);if(o){if(ev!=="outbound_click")p("outbound_click",o);if(o.link_type==="email")p("email_click",{link_location:o.outbound_location});if(o.link_type==="linkedin")p("linkedin_click",{link_location:o.outbound_location})}});
document.addEventListener("focusin",function(e){var el=e.target.closest&&e.target.closest('form[data-analytics-form="contact"]');if(!el||el.__rzifiContactStarted)return;el.__rzifiContactStarted=1;p("contact_form_start",{})});
document.addEventListener("submit",function(e){var f=e.target;if(!f||!f.matches||!f.matches("form"))return;var ev=f.dataset.analyticsEvent;if(!ev&&f.getAttribute("role")==="search")ev="site_search";if(ev==="site_search"){var fd=new FormData(f);p("site_search",{search_term:String(fd.get("q")||"").trim().slice(0,120),search_location:f.dataset.analyticsSearchLocation||"blog",search_filter:f.dataset.analyticsSearchFilter||""})}});
document.addEventListener("DOMContentLoaded",function(){var path=location.pathname,slug;if(path.indexOf("/blog/")===0&&path!=="/blog/"){slug=path.split("/").filter(Boolean).pop();p("blog_view",{blog_slug:slug||"",blog_category:(document.querySelector('meta[property="article:section"]')||{}).content||"",blog_reading_time:""})}if(path.indexOf("/product-work/")===0&&path!=="/product-work/"){slug=path.split("/").filter(Boolean).pop();p("case_study_view",{case_study_slug:slug||"",case_study_category:""})}})}();`
    : "";

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
  jobTitle: "Chief Product Officer, Payments",
  // Employer edge — lets answer engines resolve "who built/leads Simpaisa
  // payments infrastructure" to this Person entity.
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}#simpaisa`,
    name: "Simpaisa",
    url: "https://simpaisa.com",
    description:
      "Payments & fintech infrastructure company (Dubai). Rizwan Zafar is Chief Product Officer.",
  },
  description: profile.bio,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}/og-default.png`,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: profile.socials.map((s) => s.url),
  alumniOf: [
    { "@type": "EducationalOrganization", name: "MIT Sloan School of Management" },
    { "@type": "EducationalOrganization", name: "University of Karachi" },
  ],
  hasCredential: profile.certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c,
  })),
  award: profile.honors.map((h) => `${h.title} (${h.issuer}, ${h.year})`),
  knowsAbout: [
    "Payment infrastructure",
    "Cross-border payments",
    "Payment acceptance",
    "Settlement and reconciliation",
    "Merchant onboarding",
    "KYC KYB automation",
    "AML CFT",
    "Payment fraud and risk",
    "Wallets and DCB",
    "BNPL product",
    "Regulated fintech platforms",
    "MENA fintech",
    "ISO 20022",
    "SWIFT gpi",
    "PCI DSS",
    "ISO 27001",
  ],
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
  sameAs: profile.socials.map((s) => s.url),
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
        content:
          "Product & Program Executive scaling fintech infrastructure in complex markets. $1B+ GTV, 25M+ monthly transactions, 7 markets, 50+ bank, wallet and FI partners. Acceptance, cross-border, settlement, KYC/KYB, AML and fraud.",
      },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: `${profile.name}, Payments Product Executive` },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: SITE_URL },
      { name: "twitter:title", content: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        name: "twitter:description",
        content:
          "Product & Program Executive scaling fintech infrastructure in complex markets. $1B+ GTV, 25M+ monthly transactions, 7 markets, 50+ bank & wallet partners.",
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
    <html lang="en">
      <head>
        {/* GTM, kept as the first <script> in <head> per Google's spec */}
        {gtmScript && <script dangerouslySetInnerHTML={{ __html: gtmScript }} />}
        {GA_MEASUREMENT_ID && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        )}
        {gaBootstrapScript && <script dangerouslySetInnerHTML={{ __html: gaBootstrapScript }} />}
        {analyticsBridgeScript && (
          <script dangerouslySetInnerHTML={{ __html: analyticsBridgeScript }} />
        )}
        {clarityScript && <script dangerouslySetInnerHTML={{ __html: clarityScript }} />}
        {PLAUSIBLE_DOMAIN && <script defer data-domain={PLAUSIBLE_DOMAIN} src={PLAUSIBLE_SRC} />}
        <HeadContent />
      </head>
      <body>
        {/* GTM noscript fallback, must be the first child of <body> */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
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
  return (
    <QueryClientProvider client={queryClient}>
      {(GTM_ID || GA_MEASUREMENT_ID) && <GtmRouteTracker />}
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
