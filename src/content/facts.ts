/**
 * CANONICAL FACTS — the single source of truth for every number and named
 * claim that appears in the UI.
 *
 * WHY THIS FILE EXISTS
 * Numbers used to be retyped per page, which is how a site ends up saying
 * "5 markets" here and "7 markets" there. Pages now import from here; the
 * `check:facts` gate (scripts/check-facts.ts) fails the build if a raw metric
 * is hardcoded in a route file again.
 *
 * WHERE THE NUMBERS COME FROM
 * This module does NOT invent values. It re-exports the verified fact base in
 * src/data/profile.ts (owner-ruled, CI-gated) and adds the ONE approved
 * phrasing for each, so wording cannot drift either.
 *
 * THE TWO-TIER RULE (load-bearing — `bun run seo:audit` enforces it)
 * Career scope and platform scope must never share a clause:
 *   - CAREER  : 17 years · 10 markets · 3 industries  (Daraz, Tapmad, Simpaisa)
 *   - PLATFORM: $1B+ GTV · 270M+ payments a year · 150+ merchants · 5 markets
 *               (Simpaisa only, the platform Rizwan runs today)
 * "10 markets across my career" and "5 live markets today" are both true and
 * mean different things. Writing "10 markets, $1B+ GTV" in one breath is not.
 *
 * REJECTED VALUES — do not reintroduce (see AUDIT-LOG.md, Loop 1):
 *   - "25M+ payments a month"  → 25M × 12 = 300M/yr, which OVERSTATES the
 *     verified 270M+/yr. src/routes/hire.tsx:17 already names "25M monthly"
 *     as an older inflated framing.
 *   - "7 markets"              → same note; it is neither the career (10) nor
 *     the live (5) figure.
 *
 * RETIRED METRICS — banned outright (owner ruling 2026-09-01, enforced as a
 * hard fail by scripts/seo-audit.ts and scripts/check-facts.ts). None of these
 * six had a source and several were contradicted by the owner's own
 * dashboards. They must never appear as his own claim on any public surface:
 *   1. "$14M/month recovered" / "$14M+/mo GTV"
 *   2. "+14%" / "14% authorisation uplift"
 *   3. "22% token-failure reduction"
 *   4. "97% payment success"
 *   5. "99.95%" (settlement SLA, reconciliation accuracy, any platform claim)
 *   6. "120K+ failed transactions recovered monthly"
 * The publishable replacements are the safe set already exported here:
 *   $1B+ GTV · 270M+ payments a year · 150+ merchants · 5 live markets ·
 *   90% straight-through processing · 99.9% uptime · <0.1% fraud loss.
 * The one real authorisation figure in the repo is the tokenisation study's
 * iOS Safari + cross-border rate, 88% → 92% (src/data/caseStudies.ts).
 */
import { profile } from "@/data/profile";
import { markets } from "@/data/markets";

const { career, platform } = profile;

/** Career scope. Never combine with PLATFORM inside one clause. */
export const CAREER = {
  years: career.years,
  /** "17 years of experience" */
  yearsLabel: career.yearsLabel,
  /** Total markets worked across the whole career. */
  marketCount: career.marketCount,
  /** Spelled-out form, for editorial prose ("ten markets across MENA…").
   *  Digits belong in KPI tiles; words belong in sentences. */
  marketsWord: "ten",
  /** Sentence-initial / heading form ("Ten markets, ten lessons"). */
  marketsWordCap: "Ten",
  /** The ONLY approved phrasing. Keeps the scope explicit. */
  marketsPhrase: `${career.marketCount} markets across my career`,
  industryCount: career.industryCount,
  brands: career.brands,
} as const;

/** Platform scope — Simpaisa, the platform Rizwan runs today. */
export const PLATFORM = {
  company: platform.company,
  gtv: platform.gtv,
  /** ONE unit only: a year. Never restate this as a monthly figure. */
  annualPayments: platform.annualPayments,
  paymentsPhrase: `${platform.annualPayments} payments a year`,
  merchants: platform.merchants,
  marketCount: platform.marketCount,
  /** Official live Simpaisa operating markets. */
  markets: platform.markets,
  /** Spelled-out form, for editorial prose ("five frontier markets"). */
  marketsWord: "five",
  /** Sentence-initial / heading form. */
  marketsWordCap: "Five",
  /** The ONLY approved phrasing for the live footprint. */
  marketsPhrase: `${platform.marketCount} live markets today`,
  /** Platform uptime. The replacement tile wherever a settlement-SLA number
   *  used to sit — see the retired-claims note above. */
  uptime: platform.uptime,
  /** Straight-through processing rate. */
  straightThrough: platform.straightThrough,
  fraudLoss: platform.fraudLoss,
} as const;

/**
 * DARAZ scope — the Alibaba-Group marketplace era. A THIRD scope, distinct from
 * both CAREER and PLATFORM.
 *
 * Daraz payment operations ran across five South-Asian markets (Pakistan,
 * Bangladesh, Sri Lanka, Nepal, Myanmar — enumerated in profile.ts:288). That
 * five *coincides* with Simpaisa's five live markets today and is otherwise
 * unrelated.
 *
 * Binding the Daraz sentences to PLATFORM.marketCount would be a latent bug:
 * the day Simpaisa operates a sixth market, "Daraz ran payment operations
 * across five markets" would silently become "six" and the site would assert
 * something false about 2020. Hence a separate constant.
 */
export const DARAZ = {
  marketCount: 5,
  marketsWord: "five",
  markets: ["Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Myanmar"],
} as const;

/**
 * Team scale — only the evidence-backed organisation figure from the canonical
 * profile: 40 engineers across 12 cross-functional squads. Broader headcount
 * and product-org growth figures stay unpublished until owner-verified.
 */
export const TEAM = {
  total: "40-engineer payments organisation",
  engineers: "mobile, backend, payments, risk and compliance",
  squads: 12,
  productOrg: "platform-wide delivery",
  /** The one approved sentence. Use verbatim wherever team scale appears. */
  sentence: "40-engineer payments organisation across 12 cross-functional squads",
} as const;

/**
 * The merchant roster, in ONE order, used everywhere it appears.
 *
 * TODO-VERIFY(owner): three different rosters currently ship. The hero lists
 * TikTok/Samsung/InDrive/Temu/Spotify/Yango; the marquee adds Shein and Uber;
 * the platform case study lists TikTok/Samsung/Shein/Uber/MoneyGram. Confirm
 * ONE approved list (and that logo/name usage rights are clear for each).
 * Until then this is the hero list, which is the owner-attested set.
 */
export const MERCHANT_ROSTER = [
  "TikTok",
  "Samsung",
  "InDrive",
  "Temu",
  "Spotify",
  "Yango",
] as const;

/**
 * Markets whose `shipped` line is still an owner placeholder. These are
 * excluded from structured data and from any count we publish as evidence.
 * TODO-VERIFY(owner): confirm or cut Nigeria — see AUDIT-LOG.md.
 */
export const UNVERIFIED_MARKETS = markets.filter((m) => m.needsOwnerConfirm).map((m) => m.key);

/** Markets we can evidence with a real shipped item. */
export const VERIFIED_MARKET_COUNT = markets.length - UNVERIFIED_MARKETS.length;

/** The one CTA verb on the site. */
export const CTA_LABEL = "Book a 15-min intro call";

/** The one logo tagline. */
export const TAGLINE = "Payments · Product · Program";
