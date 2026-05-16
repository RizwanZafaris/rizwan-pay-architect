// Centralized SEO helpers. Keep canonical/og URLs absolute everywhere.
export const SITE_URL = "https://rizwan-pay-architect.lovable.app";

export const absUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

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
