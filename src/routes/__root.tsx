import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { profile } from "@/data/profile";
import { SITE_URL, OG_IMAGE_URL, SITE_KEYWORDS } from "@/lib/seo";

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
  name: profile.name,
  jobTitle: "Chief Product Officer, Payments",
  description: profile.bio,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}/og-default.png`,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: [profile.linkedin, profile.twitter].filter(Boolean),
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
  name: `${profile.name}, Payments Product Executive`,
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: profile.name },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "kWHcLbkjB3HB8amvRUoa8gMfThcigOtXteUIZUPu8mc" },
      { title: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        name: "description",
        content:
          "Rizwan Zafar, payments product executive in Dubai building regulated payment infrastructure across emerging markets.",
      },
      { name: "author", content: profile.name },
      { name: "keywords", content: SITE_KEYWORDS },
      { name: "theme-color", content: "#0f1115" },
      // Open Graph
      { property: "og:site_name", content: `${profile.name}, Payments Product Executive` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        property: "og:description",
        content:
          "Payments product executive in Dubai. $1B+ GTV, 25M+ monthly transactions, 5 regulated markets, acceptance, cross-border, settlement, KYC/KYB, AML and fraud.",
      },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${profile.name}, Payments Product Executive` },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: SITE_URL },
      { name: "twitter:title", content: "Rizwan Zafar, Payments Product Executive | Dubai" },
      {
        name: "twitter:description",
        content:
          "Payments product executive in Dubai. $1B+ GTV, 25M+ monthly transactions, 5 regulated markets.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
      { name: "twitter:image:alt", content: `${profile.name}, Payments Product Executive` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
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
        <HeadContent />
      </head>
      <body>
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
