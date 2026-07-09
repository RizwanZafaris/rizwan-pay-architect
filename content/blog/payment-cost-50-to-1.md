---
title: "Payment Cost Is a Product Variable: From 50% to 1% (Tapmad Migration Playbook)"
slug: "payment-cost-50-to-1"
category: "Product Strategy"
metaTitle: "Payment Cost: From 50% to 1% | Rizwan Zafar"
metaDescription: "How a subscription business cut payment cost from ~50% of revenue to ~1% by treating cost as a product variable, rail mix, dunning, smart retries."
excerpt: "Tapmad was losing roughly half its revenue to payment cost. The rail-mix, dunning, and smart-retry rebuild took it to about 1%, past 5M subscribers, and 70% higher ARPU, with no new vendors."
publishDate: "2026-05-29"
readingTime: "11 min read"
tags: ["billing", "DCB", "wallets", "unit economics", "subscription", "OTT", "dunning"]
targetAudience: ["OTT PMs", "Subscription product leaders", "Fintech revenue PMs"]
targetKeywords:
  [
    "payment cost optimization",
    "subscription payment cost",
    "DCB billing",
    "wallet billing subscription",
    "dunning recovery",
  ]
relatedCaseStudies:
  - "/product-work/tapmad-wallet-billing-migration"
relatedArticles:
  - "/blog/dcb-vs-wallet-vs-card-ott"
  - "/blog/subscription-retention-payment-recovery"
  - "/blog/local-payment-methods-developer-experience"
---

# Payment Cost Is a Product Variable: From 50% to 1%.

A subscription business that loses 50% of revenue to payment cost is not a billing problem. It is a product architecture problem.

I led the migration at Tapmad that took payment cost from roughly 50% of revenue down to ~1%, grew subscribers past 5M, and lifted ARPU by ~70%. This essay is the operator playbook: the rail-mix decisions, the dunning rebuild, the smart-retry logic, and the commercial leverage that came out the other side. None of it required new vendors. All of it required treating payment cost as a product variable.

## Table of contents

- Where 50% came from
- The wrong framing: payment cost as procurement
- The right framing: payment cost as architecture
- Rail-mix as the first lever
- Smart retries tuned per rail
- Dunning that recovers, not notifies
- Commercial leverage from the new mix
- The numbers that moved
- Why this matters to OTT, SaaS, and subscription leaders
- Rizwan's operator lens
- Operator notes
- FAQ

## Where 50% came from

In several emerging markets, operator-billed and aggregator-billed subscriptions carry 30–50% payment cost. The economics are crushing: every $10 subscription delivers $5 to content, $5 to the rail, and zero to the company.

The first instinct of every CFO in this situation is to renegotiate. That instinct is correct and insufficient. The rail charges 30–50% because that is what the rail can sustainably charge when it is the only billing surface the merchant has. The fix is structural: change the merchant's surface.

## The wrong framing: payment cost as procurement

Procurement framing produces predictable moves: RFPs, MDR negotiations, volume tier deals. These produce single-digit percentage savings. They do not produce 50→1.

The reason: payment cost is mostly a function of which rail carries the volume, not which contract is on top of that rail. As long as 80% of volume is on the most expensive rail, the contract is the second-order variable.

## The right framing: payment cost as architecture

Payment cost is set by four product decisions, in order of impact:

1. **Rail preference order.** Which rail is offered first to the user.
2. **Rail fallback.** What happens when the preferred rail fails.
3. **Retry behavior.** How aggressively and how intelligently failed attempts are recovered.
4. **Pricing of the user-visible offer.** Whether the cheap rail is the default and the expensive rail is the exception.

Each of these is a product decision. The contract sits on top.

## Rail-mix as the first lever

At Tapmad, the rail mix before the migration was operator-billing-heavy. The migration reordered the preference:

- **Default offer:** wallet billing (lowest cost, high retention once linked).
- **Second choice:** DCB direct (mid cost, high success in markets with strong telco rails).
- **Third choice:** operator-aggregator billing (high cost, used only as fallback).
- **Cards:** offered to high-ARPU cohorts and cross-border subscribers.

The user-facing change was small, a re-ordering of options in checkout, with copy that nudged toward the cheaper rail. The cost-of-revenue change was large.

## Smart retries tuned per rail

Each rail fails for different reasons. A generic retry policy ("retry 3 times over 7 days") leaves money on the table on every rail.

The right pattern:

- **Wallets:** retry quickly (next few hours) on insufficient-balance failures, because top-up behavior is fast.
- **DCB:** retry on the next billing-eligible window (telco-specific), with shrinking attempts to avoid throttling.
- **Cards:** retry on issuer-specific reason codes, with network-token refresh, and back off on hard declines to avoid fraud signals.

Smart retries are a per-rail product feature, not a single cron job.

## Dunning that recovers, not notifies

The standard dunning playbook is a series of emails. That is a notification system, not a recovery system.

The recovery playbook adds:

- **In-app dunning surfaces.** A non-intrusive nudge on the user's home screen, not just an email.
- **Rail switching during dunning.** "Your card failed, try with wallet" as a one-tap action.
- **Win-back offers tied to failure reason.** A user who failed for insufficient balance gets a different offer than a user who failed for an expired card.
- **Pause-not-cancel** as a default option, with a clear return path.

Recovery rates on failed subscriptions typically move from low single digits to 20–40% with this rebuild, depending on market.

## Commercial leverage from the new mix

Once the platform has demonstrated it can move volume between rails, every commercial conversation changes. The expensive rail that used to carry 80% of volume now sees its share threatened by every product decision. Pricing improves. SLAs improve. Settlement timing improves.

The leverage was the new architecture, not the new RFP.

## The numbers that moved

The combined effect of rail-mix, smart retries, dunning rebuild, and renegotiated commercials:

- **Payment cost:** ~50% → ~1% of revenue.
- **Subscriber base:** grew past 5M.
- **ARPU:** lifted by ~70% as cheaper rails unlocked lower-priced plans that were previously unviable, and higher-value plans for high-ARPU cohorts.
- **Recovery rate on failed billing:** multiple-x improvement.

These outcomes were not produced by a single decision. They were the compounded effect of treating every layer of payment cost as a product surface.

## Why this matters to OTT, SaaS, and subscription leaders

Any subscription business in a market where the dominant rails are not cards faces the same architecture. The framing that wins is "rail mix is a product decision", not "billing is a vendor relationship." Companies that internalize this framing convert payment cost from a fixed line item into a managed variable. Companies that do not stay stuck at the rail's pricing.

## Rizwan's operator lens

The hardest part of the Tapmad work was not the engineering. It was convincing the organization that the rail mix could be moved at all. The dominant rail had cultural inertia, it was "how billing worked." The shift came when we showed, with a single cohort, that the cheaper rail could be the default without hurting acquisition. After that, the question stopped being "can we move" and became "how fast."

## Operator notes

- Payment cost is a product variable, not a procurement one.
- Rail preference order is the largest single lever.
- Smart retries are per-rail product features.
- Dunning is a recovery system, not a notification system.
- The new mix produces the commercial leverage to renegotiate, not the other way around.

## FAQ

**Does this work outside OTT?** Yes, any subscription product in emerging markets faces the same rail-mix question. SaaS, gaming, and lending all have analogues.

**Is wallet billing always cheaper?** Usually, once the user is linked. The first-link friction is a product investment that pays back across the subscriber's lifetime.

**What is the single first move?** Re-order the checkout rails so the cheapest viable rail is default. Measure the cost change in one cohort. The rest follows.

---

### LinkedIn teaser

> 50% of revenue going to payment cost is not a billing problem. It is a product architecture problem.
>
> The Tapmad playbook: rail-mix as default, smart retries per rail, dunning that recovers, commercial leverage from the new mix. ~50% → ~1%, 5M+ subscribers, ARPU up ~70%.
