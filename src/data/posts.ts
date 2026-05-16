export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  thesis?: string; // one-line argument used in cards
  featured?: boolean;
  tags: string[];
  content: string; // simple markdown-ish (rendered as paragraphs/headings)
};

export const categories = [
  "Payment Infrastructure",
  "Cross-Border Payments",
  "Product Strategy",
  "Fraud & Risk",
  "Merchant Onboarding",
  "Settlement & Reconciliation",
  "Emerging Markets",
  "Career / Product Leadership",
];

export const posts: Post[] = [
  {
    slug: "payment-infrastructure-product-problem",
    title: "Why Payment Infrastructure Is a Product Problem",
    date: "2025-04-12",
    category: "Payment Infrastructure",
    readingTime: "7 min read",
    description:
      "Payment infrastructure is usually framed as a platform or engineering problem. After running it at $1B+ GTV, I argue it's a product problem first.",
    tags: ["payment infrastructure", "product strategy", "APIs"],
    content: `## The default framing is wrong

Most companies treat payment infrastructure as a platform problem: pick PSPs, wire them up, build a ledger, ship. That framing produces a working stack and a poor product.

Payment infrastructure is a product problem because every meaningful decision — error states, retries, idempotency keys, payout windows, dispute UX, reconciliation reports — is a user-visible decision for merchants, ops and finance.

## What product ownership looks like

- Treat the API as a product. Naming, errors, status codes and webhook semantics are UX.
- Treat reconciliation as a product. Finance is your highest-value internal user.
- Treat partner failure as a product. Routing, retries and fallback messaging are not engineering details.

## The $1B test

At $1B+ GTV, anything you didn't design becomes someone's manual workaround. Product ownership of infrastructure is the only thing that prevents ops debt from compounding.`,
  },
  {
    slug: "emerging-markets-cross-border",
    title: "What Emerging Markets Teach About Cross-Border Payments",
    date: "2025-03-21",
    category: "Cross-Border Payments",
    readingTime: "6 min read",
    description:
      "Cards-first thinking breaks in Pakistan, Bangladesh, Egypt and Iraq. Here's what cross-border product teams should learn.",
    tags: ["cross-border", "emerging markets", "FX", "MENA"],
    content: `## Cards are not the default

In most emerging markets, the dominant rails are wallets, IBFT, DCB and over-the-counter networks. A cross-border product that assumes cards as the baseline is leaving 60–80% of acceptance on the table.

## The corridor is the product

A "corridor" is not a partner integration — it is a product with its own success rate, cost, FX behavior and compliance overlay. Owning the corridor abstraction is owning the margin.

## Compliance is a feature

KYC/KYB, sanctions and AML/CFT are not blockers to cross-border growth. Done well, they are how you earn the right to scale into a new market.`,
  },
  {
    slug: "payment-cost-50-to-1",
    title: "How Payment Costs Went from 50% to 1%",
    date: "2025-02-08",
    category: "Product Strategy",
    readingTime: "8 min read",
    featured: true,
    thesis:
      "Payment cost is a product variable, not a procurement one. Here's the rail-mix and dunning playbook that pulled a subscription business from 50% cost-of-revenue down to 1%.",
    description:
      "A subscription business losing half its revenue to payment cost. The product moves that brought it down to 1%.",
    tags: ["billing", "DCB", "wallets", "unit economics"],
    content: `## Where the 50% came from

Operator-billed and aggregator-billed subscriptions in some markets carry 30–50% payment cost. That is not a procurement problem — it is a product architecture problem.

## What we changed

- Moved billing preference order to wallets, DCB direct, then operator
- Built smart retries tuned per rail
- Rebuilt dunning to recover, not just notify
- Renegotiated commercials with leverage from the new mix

## The result

Payment cost dropped from ~50% of revenue to ~1%. Subscribers grew to 5M+. ARPU rose by 70%.

The lesson: payment cost is a product variable.`,
  },
  {
    slug: "settlement-reconciliation-not-back-office",
    title: "Settlement and Reconciliation Are Not Back-Office Problems",
    date: "2025-01-19",
    category: "Settlement & Reconciliation",
    readingTime: "5 min read",
    description:
      "If finance is your reconciliation system, you don't have one. A note from running settlement at scale.",
    tags: ["settlement", "reconciliation", "finance", "ledger"],
    content: `## The symptom

Spreadsheets. End-of-month panic. Merchants asking where their money is.

## The cause

Multi-rail flows produce more breaks than any team can manually clear. The "back office" becomes a queue that hides product defects.

## The fix

A canonical ledger, three-way reconciliation, exception taxonomy fed back to product. Settlement scheduling that respects corridor reality. Then the back office disappears — because the product absorbed it.`,
  },
  {
    slug: "kyc-risk-conversion-designed-together",
    title: "KYC, Risk, and Conversion Should Be Designed Together",
    date: "2024-12-04",
    category: "Merchant Onboarding",
    readingTime: "6 min read",
    description:
      "Splitting onboarding from risk creates leakage and false positives. They are the same product surface.",
    tags: ["KYC", "KYB", "onboarding", "risk"],
    content: `## The split that hurts

Most fintechs ship onboarding as a growth surface and risk as a compliance surface. The two teams optimize different things and the merchant experiences the friction.

## The unified surface

Every onboarding decision is a risk decision and every risk decision is a conversion decision. Tier policies, capture quality, screening and review SLAs all belong to one product surface.

## What this changes

Activation moves from weeks to hours for low-risk tiers. Manual review load drops. Default rates hold or improve.`,
  },
  {
    slug: "local-payment-methods-developer-experience",
    title: "Why Local Payment Methods Are Developer Experience Problems",
    date: "2024-11-02",
    category: "Payment Infrastructure",
    readingTime: "5 min read",
    description:
      "Acceptance in emerging markets is decided at the SDK and webhook layer, not in marketing.",
    tags: ["LPM", "developer experience", "APIs"],
    content: `## The DX gap

A merchant adopts a local payment method only if integrating it is as easy as integrating cards. Most LPM integrations fail this test.

## What good looks like

- Same API surface across LPMs, cards and wallets
- Consistent error taxonomy and idempotency
- Webhooks that describe outcomes, not events
- Test mode that mirrors production failure modes

## The result

LPMs go from "long tail" to "default rail" — and acceptance reflects it.`,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getRelated = (slug: string) => {
  const p = getPost(slug);
  if (!p) return [];
  return posts
    .filter((x) => x.slug !== slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t))))
    .slice(0, 3);
};
