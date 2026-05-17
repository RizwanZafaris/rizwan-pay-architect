// Centralized SEO helpers. Keep canonical/og URLs absolute everywhere.
// Override at build time with VITE_SITE_URL to point at a custom domain.
const DEFAULT_SITE_URL = "https://rizwan-pay-architect.lovable.app";

type ViteEnv = {
  VITE_SITE_URL?: string;
  VITE_OG_IMAGE_URL?: string;
  VITE_GTM_ID?: string;
};
const env: ViteEnv =
  typeof import.meta !== "undefined" && (import.meta as ImportMeta & { env?: ViteEnv }).env
    ? ((import.meta as ImportMeta & { env: ViteEnv }).env ?? {})
    : {};

export const SITE_URL = env.VITE_SITE_URL || DEFAULT_SITE_URL;

export const absUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// Default OG image. Override via VITE_OG_IMAGE_URL once a real 1200×630 card is hosted.
const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0319cd36-4c36-4074-94a5-31b4297f2150/id-preview-521d11ba--954ce4ea-9c96-4e5d-af14-ac4854ceaa16.lovable.app-1778708219949.png";
export const OG_IMAGE_URL = env.VITE_OG_IMAGE_URL || DEFAULT_OG_IMAGE;

// Google Tag Manager. Set VITE_GTM_ID in .env.local (or empty) to opt out for dev.
// The container live in production is GTM-TM5BP98G.
export const GTM_ID = env.VITE_GTM_ID ?? "GTM-TM5BP98G";

export const SITE_KEYWORDS = [
  "payments product executive",
  "payment infrastructure",
  "cross-border payments",
  "Visa product management",
  "Mastercard product management",
  "Stripe payments infrastructure",
  "fintech product leader Dubai",
  "MENA fintech product leader",
  "merchant onboarding",
  "KYC KYB automation",
  "AML CFT payments",
  "settlement reconciliation",
  "payment fraud risk",
  "payment acceptance",
  "payment APIs",
  "regulated fintech platforms",
].join(", ");
