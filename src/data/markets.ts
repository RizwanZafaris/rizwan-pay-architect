// Published market details for the career-scope brand surfaces (home map
// strip, /journey map + per-market cards). SINGLE SOURCE OF TRUTH — the
// build-time map generator (scripts/gen-map.mjs) and the WorldMap component
// both read coordinates from here, and /journey renders the cards from the
// same array. The canonical career market count lives in profile/facts; this
// detail list intentionally includes only markets backed by a concrete item.
//
// FACT DISCIPLINE (two-tier claims, strategy doc §2): every `shipped` line
// traces to a real bullet in src/data/profile.ts `experience`. A market with
// no supporting bullet is omitted from these public surfaces rather than
// rendered with verification language. Per-market copy is CAREER-scope
// (Daraz / Tapmad / Simpaisa work) and never attaches a Simpaisa-only platform
// metric ($1B / 270M / 150+ merchants / 99.95%).

export type Market = {
  key: string;
  name: string;
  /** Regional-indicator flag emoji. */
  flag: string;
  /** Main operating hub city (drives the map projection). */
  city: string;
  lat: number;
  lng: number;
  years: string;
  /** Brand(s) the work sat under — must exist in profile.experience. */
  brand: string;
  /** One concrete shipped item supported by the canonical profile. */
  shipped: string;
  /** One operating lesson — voice, not a metric claim. */
  lesson: string;
  /** Legacy guard for downstream filters; published records never set it. */
  needsOwnerConfirm?: boolean;
};

// The current operating base — every arc on the map originates here.
export const mapHub = { key: "hub", city: "Dubai", lat: 25.2, lng: 55.27 };

export const markets: Market[] = [
  {
    key: "pakistan",
    name: "Pakistan",
    flag: "🇵🇰",
    city: "Karachi",
    lat: 24.86,
    lng: 67.0,
    years: "2009–present",
    brand: "Tapmad · Daraz · Simpaisa",
    shipped: "Direct Carrier Billing across all four telcos; 0→5M OTT subscribers at Tapmad.",
    lesson: "The wallet, not the card, is the consumer rail.",
  },
  {
    key: "bangladesh",
    name: "Bangladesh",
    flag: "🇧🇩",
    city: "Dhaka",
    lat: 23.81,
    lng: 90.41,
    years: "2020–present",
    brand: "Daraz · Simpaisa",
    shipped: "Multi-country payment operations at Alibaba scale; cross-border corridor expansion.",
    lesson: "Reconciliation is the real product in cross-border.",
  },
  {
    key: "nepal",
    name: "Nepal",
    flag: "🇳🇵",
    city: "Kathmandu",
    lat: 27.72,
    lng: 85.32,
    years: "2020–present",
    brand: "Daraz · Simpaisa",
    shipped: "Payment operations across Daraz checkout; Simpaisa corridor expansion.",
    lesson: "Small markets still demand their own local rails.",
  },
  {
    key: "iraq",
    name: "Iraq",
    flag: "🇮🇶",
    city: "Baghdad",
    lat: 33.31,
    lng: 44.36,
    years: "2020–present",
    brand: "Simpaisa",
    shipped: "Cross-border corridor launch under a tightening regulatory regime.",
    lesson: "Compliance discipline is the entry ticket, not the afterthought.",
  },
  {
    key: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    city: "Cairo",
    lat: 30.04,
    lng: 31.24,
    years: "2020–present",
    brand: "Simpaisa",
    shipped: "Cross-border corridor launch into a mandated-domestic-scheme market.",
    lesson: "The domestic scheme beats international routing.",
  },
  {
    key: "ksa",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    city: "Riyadh",
    lat: 24.71,
    lng: 46.68,
    years: "2017–2020",
    brand: "Tapmad",
    shipped: "DCB and wallet-billing infrastructure expansion with regional telco partners.",
    lesson: "Mada-first routing is non-negotiable.",
  },
  {
    key: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    city: "Dubai",
    lat: 25.2,
    lng: 55.27,
    years: "2017–present",
    brand: "Wing Logic · Simpaisa",
    shipped: "Built a PMO for a $12M+ portfolio; today the base for the Simpaisa platform.",
    lesson: "Regulator engagement is high-touch and slow — plan for it.",
  },
  {
    key: "sri-lanka",
    name: "Sri Lanka",
    flag: "🇱🇰",
    city: "Colombo",
    lat: 6.93,
    lng: 79.86,
    years: "2020",
    brand: "Daraz",
    shipped: "Payment operations across five Daraz markets during a COVID-driven volume surge.",
    lesson: "COD-to-digital conversion is a trust problem before it is a tech one.",
  },
  {
    key: "myanmar",
    name: "Myanmar",
    flag: "🇲🇲",
    city: "Yangon",
    lat: 16.87,
    lng: 96.2,
    years: "2020",
    brand: "Daraz",
    shipped: "Payment operations and localisation across Daraz checkout.",
    lesson: "Payment coverage is a localisation problem, not a feature list.",
  },
];
