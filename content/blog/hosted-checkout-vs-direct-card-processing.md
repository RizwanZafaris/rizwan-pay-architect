---
title: "Hosted Checkout vs Direct Card Processing: A Product Maturity Guide (MPGS, MDES, 3DS)"
slug: "hosted-checkout-vs-direct-card-processing"
category: "Payment Infrastructure"
subcategory: "Card Acceptance"
metaTitle: "Hosted Checkout vs Direct Card Processing | Rizwan Zafar"
metaDescription: "Hosted checkout ships fast. Direct card processing ships maturity. A practitioner walk-through of MPGS, MDES, tokenization, 3DS, and PCI scope decisions."
excerpt: "Why hosted checkout is the right first step and the wrong last step — and what direct card processing actually demands from a product team."
publishDate: "2026-05-21"
readingTime: "12 min read"
tags:
  [
    "card processing",
    "hosted checkout",
    "MPGS",
    "MDES",
    "tokenization",
    "3DS",
    "PCI DSS",
    "payment infrastructure",
  ]
targetAudience: ["Fintech PMs", "Payments platform leaders", "Acquirer product teams"]
targetKeywords:
  [
    "hosted checkout vs direct card processing",
    "MPGS hosted checkout",
    "direct card processing PCI scope",
    "card tokenization product",
    "3DS2 product design",
  ]
relatedCaseStudies:
  - "/blog/hosted-checkout-vs-direct-card-processing"
  - "/product-work/simpaisa-payment-infrastructure"
  - "/product-work/fraud-risk-aml-cft"
relatedArticles:
  - "/blog/payment-infrastructure-state-trust-failure"
  - "/blog/local-payment-methods-developer-experience"
  - "/blog/pci-dss-iso-27001-program-leadership"
---

# Hosted Checkout Is Easy. Direct Card Processing Is Where Product Maturity Shows.

Every fintech ships hosted checkout first. That is the right call. It is also the moment most teams stop investing in card acceptance — and the reason the next two years of their product roadmap is bottlenecked by something they outsourced.

This is a practitioner walk-through of what hosted checkout actually gives you, what it costs you, and what direct card processing demands when you decide to graduate.

## Table of contents

- The hosted checkout default
- What hosted checkout actually outsources
- The five reasons teams graduate to direct
- What direct card processing demands
- PCI scope: the real tradeoff
- Tokenization, network tokens, and MDES
- 3DS2 as a product surface
- Why this matters
- Rizwan's operator lens
- What product leaders should do next
- Key takeaways
- FAQ

## The hosted checkout default

Hosted checkout — MPGS-hosted sessions, Stripe Checkout, Adyen Drop-in, Checkout.com Frames in hosted mode — gives you a working card acceptance flow in days. The PSP hosts the page or iframe, captures the PAN, runs 3DS, and returns a token or a result. Your platform never touches a card number.

For a platform under a few million USD in annual card volume, this is correct. The engineering cost of direct integration is not justified by the marginal control you gain.

## What hosted checkout actually outsources

Five things, every one of them eventually a product decision:

1. **Conversion.** The PSP owns the page layout, the error copy, the retry behavior, the localization.
2. **Failure handling.** When the issuer declines, the PSP decides what the customer sees and whether to offer an alternative rail.
3. **Tokenization strategy.** The token belongs to the PSP, which means moving away from that PSP later means losing the saved card vaults.
4. **3DS friction.** The PSP decides when to step up, when to use frictionless, and which exemptions to claim.
5. **Routing.** With more than one acquirer behind the scenes, the PSP picks. You see the result, not the decision.

These are not engineering details. They are the surface area of card acceptance.

## The five reasons teams graduate to direct

In my experience, platforms move to direct card processing for one or more of these reasons:

1. **Cost.** Hosted PSP mark-ups become material above mid-eight-figure card volume.
2. **Conversion.** A custom checkout that handles regional failure modes, retries, and rail fallback can lift acceptance by several hundred basis points.
3. **Tokenization control.** Owning network tokens (MDES, VTS) and the vault means PSP independence.
4. **3DS strategy.** Direct 3DS server access lets the platform decide when to step up — instead of inheriting the PSP's default.
5. **Routing.** Multi-acquirer routing, with real-time decisioning on BIN, country, currency, MCC, and historical acceptance rate, is only possible when the platform sees the auth request.

If none of these apply, stay hosted.

## What direct card processing demands

Direct is a different product. It needs:

- A **PCI DSS scope strategy** and a successful Level 1 assessment if volume justifies it (over 6M transactions per brand annually).
- A **tokenization layer**, ideally with network tokens through MDES (Mastercard) and VTS (Visa).
- A **3DS2 server integration** or partnership, with a real product position on when to step up.
- A **routing engine** with rules and observability.
- A **chargeback and dispute pipeline** integrated with the acquirer.
- **Sandboxing** that reproduces production failure modes, not only success paths.

The team profile shifts too. Direct card processing needs a product owner who can read ISO 8583 message specs, an engineering lead who has run a card tokenization vault before, and a compliance partner who has been through a Level 1 QSA assessment. Hiring this team is most of the cost.

## PCI scope: the real tradeoff

The PCI DSS scoping decision is the one that determines everything else.

| Approach                   | PCI scope                       | Pros                                   | Cons                                      |
| -------------------------- | ------------------------------- | -------------------------------------- | ----------------------------------------- |
| Hosted redirect            | SAQ A                           | Lowest scope, fastest launch           | Lowest control over UX and conversion     |
| Iframe / hosted fields     | SAQ A or A-EP                   | Low scope, branded UX                  | Limited control over failure flow         |
| Direct API, no PAN storage | SAQ D-Merchant + tokenization   | Full UX control, no card data at rest  | Active PCI program required               |
| Direct API + card vault    | SAQ D + Level 1 audit if volume | Maximum control, true PSP independence | Significant ongoing compliance investment |

Most platforms that graduate to direct land on "Direct API, no PAN storage" — they take the PAN in transit, immediately exchange it for a network token, and never store the raw number. That is the sweet spot: meaningful product control, manageable PCI scope, and PSP independence.

## Tokenization, network tokens, and MDES

The single most under-appreciated decision in direct card processing is who owns the token.

- **PSP tokens** are convenient and bind you to that PSP.
- **Acquirer tokens** are slightly better but still tie the platform to one acquirer.
- **Network tokens** (MDES for Mastercard, VTS for Visa) are issued by the network, refresh automatically when the card is reissued, and are portable across acquirers.

A direct card processing platform that does not have a network token strategy is a hosted platform that pays for direct. Network tokens are also material to conversion — issuers approve network-tokenized transactions at meaningfully higher rates than PAN-based ones, and refresh-on-reissue alone recovers a measurable share of recurring billing failures.

## 3DS2 as a product surface

3DS2 is not compliance plumbing. It is a conversion lever.

- **Frictionless flows** — when the issuer accepts the data the platform passes — convert almost identically to non-3DS.
- **Challenge flows** add friction and lose customers, but shift liability away from the merchant.
- **Exemptions** (SCA exemptions in EU, similar mechanisms in other regions) let the platform skip step-up for low-risk transactions.

The product decision is which transactions to step up. Step up everything and conversion collapses. Step up nothing and chargeback liability spikes. The right answer is a rule engine on top of 3DS that uses transaction risk score, BIN risk, customer tenure, and value to decide. Hosted checkout makes this decision for you. Direct gives you the keys.

## Why this matters

Card acceptance is the part of the payment product where every basis point compounds. A 100 bps improvement in card acceptance at $1B in card volume is $10M of additional throughput per year. The same improvement is invisible at $10M in volume.

The honest framing is: hosted checkout is a derivative product, direct card processing is a primary product. Most fintechs ship the derivative and never graduate. The ones who do graduate gain a structural advantage that hosted-only competitors cannot match.

## Rizwan's operator lens

At Simpaisa, the card acceptance journey followed exactly this arc. Hosted-first to get into market. Then a deliberate move to direct on MPGS, with a network token strategy and a routing engine that handled multi-acquirer fallback. The acceptance lift was meaningful, the cost reduction was meaningful, and the most important outcome was unrelated to either: the team developed muscle around card-level economics that hosted never would have produced.

The same maturity arc applied at Daraz in handling card disputes — owning the dispute pipeline end-to-end made COD-to-digital migration economics workable. And at Tapmad, network-token-style portability is what makes a 1% payment cost defensible across recurring billing.

## What product leaders should do next

1. **Be honest about volume.** Under $20M card volume per year, stay hosted.
2. **If you are graduating, decide on PCI scope first.** That decision constrains everything downstream.
3. **Own the token.** Network tokens, not PSP tokens.
4. **Treat 3DS as a conversion product.** Build the rule engine.
5. **Build routing on day one of direct.** Single-acquirer direct is most of the cost with little of the upside.

## Key takeaways

- Hosted checkout is the right first step and the wrong last step.
- Five forcing functions push platforms to direct: cost, conversion, tokenization, 3DS, routing.
- PCI scope decision determines team shape and ongoing compliance investment.
- Network tokens are the difference between true PSP independence and rebranded hosted.
- 3DS2 is conversion strategy, not compliance plumbing.

## Suggested internal links

- Case study: [Hosted Checkout vs Direct Card Processing](/blog/hosted-checkout-vs-direct-card-processing)
- Case study: [Simpaisa Payment Infrastructure](/product-work/simpaisa-payment-infrastructure)
- Essay: [Payment Infrastructure Is State, Trust, and Failure Handling](/blog/payment-infrastructure-state-trust-failure)
- Essay: [Standing Up PCI DSS and ISO 27001 Programs From Scratch](/blog/pci-dss-iso-27001-program-leadership)
- [Resume](/resume) · [Contact](/contact)

## Suggested external sources

- PCI Security Standards Council: _PCI DSS v4.0_ and SAQ types
- Mastercard MDES: _Digital Enablement Service_ documentation
- Visa VTS: _Visa Token Service_ developer documentation
- EMVCo: _3DS 2.x specifications_
- Stripe Docs: _Network tokens_ — for one well-documented implementation reference

## FAQ

**Is hosted checkout always wrong long-term?**
No. For low-volume platforms or those whose differentiation is not in payments, hosted is correct indefinitely.

**Can I get conversion lift without going fully direct?**
Some. Hosted-field iframes give partial UX control. They do not give 3DS or routing control.

**What is the cost of a PCI Level 1 program?**
The QSA audit is the smallest line item. The ongoing controls, scope reviews, and engineering work are the real cost — typically a small team in perpetuity.

**Do I need network tokens if I am already PSP-tokenized?**
Eventually yes. PSP tokens lock you in. Network tokens make migration possible and improve approval rates in their own right.

**Is direct card processing realistic for an emerging-market fintech?**
Yes. Most regional acquirers offer direct integration. The bottleneck is internal capability, not market access.

**What is the single biggest reason direct projects fail?**
Underestimating the 3DS step-up product. Teams ship direct, default to step-up-everything, and watch conversion fall below the hosted baseline they replaced.

---

### JSON-LD (BlogPosting)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Hosted Checkout Is Easy. Direct Card Processing Is Where Product Maturity Shows.",
  "description": "A practitioner walk-through of MPGS, MDES, tokenization, 3DS2, and PCI scope when moving from hosted checkout to direct card processing.",
  "author": {
    "@type": "Person",
    "name": "Rizwan Zafar",
    "url": "https://rizwan-pay-architect.lovable.app"
  },
  "datePublished": "2026-05-21",
  "articleSection": "Payment Infrastructure",
  "keywords": "hosted checkout, direct card processing, MPGS, MDES, tokenization, 3DS2, PCI DSS",
  "mainEntityOfPage": "https://rizwan-pay-architect.lovable.app/blog/hosted-checkout-vs-direct-card-processing"
}
```

### Open Graph

- **og:title:** Hosted Checkout vs Direct Card Processing — Where Product Maturity Shows
- **og:description:** Why hosted is the right first step and the wrong last step. PCI scope, network tokens, 3DS2, and routing as product decisions.

### LinkedIn teaser

> Every fintech ships hosted checkout first. The good ones graduate.
>
> Direct card processing is where the product team finally owns conversion, cost, tokenization, 3DS, and routing — and where PCI scope, network tokens, and acquirer routing become real product surfaces.
>
> A walk-through of when to graduate and what it actually demands.
