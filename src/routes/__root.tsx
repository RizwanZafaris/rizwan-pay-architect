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
import { SITE_URL } from "@/lib/seo";

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
  description: profile.bio,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: [profile.linkedin, profile.twitter],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "MIT Sloan School of Management" },
    { "@type": "EducationalOrganization", name: "University of Karachi" },
  ],
  award: ["Youngest Project Manager of the Year, 2015"],
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
    "Regulated fintech platforms",
    "MENA fintech",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${profile.name} — Payments Product Executive`,
  url: SITE_URL,
  author: { "@type": "Person", name: profile.name },
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
          "Rizwan Zafar — payments product executive in Dubai building regulated payment infrastructure across emerging markets.",
      },
      { name: "author", content: profile.name },
      { property: "og:site_name", content: `${profile.name} — Payments Product Executive` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Rizwan Zafar — Payments Product Executive | Dubai" },
      { name: "twitter:title", content: "Rizwan Zafar — Payments Product Executive | Dubai" },
      { property: "og:description", content: "Premium personal profile and fintech blog for a payments product executive in regulated payment infrastructure." },
      { name: "twitter:description", content: "Premium personal profile and fintech blog for a payments product executive in regulated payment infrastructure." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0319cd36-4c36-4074-94a5-31b4297f2150/id-preview-521d11ba--954ce4ea-9c96-4e5d-af14-ac4854ceaa16.lovable.app-1778708219949.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0319cd36-4c36-4074-94a5-31b4297f2150/id-preview-521d11ba--954ce4ea-9c96-4e5d-af14-ac4854ceaa16.lovable.app-1778708219949.png" },
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
