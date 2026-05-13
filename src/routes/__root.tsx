import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { profile } from "@/data/profile";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-ink">404</h1>
        <h2 className="mt-4 text-xl font-medium text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink-soft">
          That page doesn't exist. Try the homepage or product work.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="rounded-md bg-ink text-background px-4 py-2 text-sm">Home</Link>
          <Link to="/product-work" className="rounded-md border border-ink/20 px-4 py-2 text-sm">Product Work</Link>
        </div>
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
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-ink text-background px-4 py-2 text-sm"
          >Try again</button>
          <a href="/" className="rounded-md border border-ink/20 px-4 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Chief Product Officer — Payments",
  description: profile.positioning,
  email: `mailto:${profile.email}`,
  url: profile.personalSite,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: [profile.linkedin, profile.twitter, profile.personalSite],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "MIT Sloan School of Management" },
    { "@type": "EducationalOrganization", name: "University of Karachi" },
  ],
  award: ["Youngest Project Manager of the Year, 2015"],
  knowsAbout: [
    "Payment infrastructure",
    "Cross-border payments",
    "Settlement and reconciliation",
    "Merchant onboarding",
    "KYC KYB automation",
    "AML CFT",
    "Payment fraud and risk",
    "Wallets and DCB",
    "MENA fintech",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${profile.name} — Payments Product Executive`,
  url: "/",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rizwan Zafar — Payments Product Executive | Dubai" },
      {
        name: "description",
        content:
          "Rizwan Zafar is a payments product executive in Dubai building regulated payment infrastructure across emerging markets — $1B+ GTV, 25M+ monthly transactions.",
      },
      { name: "author", content: profile.name },
      { property: "og:site_name", content: `${profile.name} — Payments Product Executive` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
      <head><HeadContent /></head>
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
