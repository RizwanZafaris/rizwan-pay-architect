---
title: "Aani's Next Product Problem Is Merchant Operating Adoption"
slug: "aani-merchant-adoption-operating-model"
category: "Payment Infrastructure"
metaTitle: "Aani Merchant Adoption Needs an Operating Model"
metaDescription: "Aani has scale in users and merchants. The next UAE instant-payments problem is repeat merchant use, exception ownership, reconciliation and evidence."
excerpt: "Aani's public numbers show reach. Durable merchant adoption now depends on checkout behaviour, confirmation, refunds, reconciliation and support."
publishDate: "2026-08-25"
readingTime: "7 min read"
experiment: "UAE instant-payments merchant operating model"
tags:
  - Aani
  - UAE instant payments
  - account-to-account payments
  - QR payments
  - merchant acceptance
targetAudience:
  - UAE payments product leaders
  - banks and licensed financial institutions
  - merchant acquiring and acceptance teams
  - payment operations leaders
targetKeywords:
  - Aani merchant payments
  - UAE instant payment platform
  - Aani QR payments
  - account-to-account merchant acceptance
relatedArticles:
  - "/blog/uae-open-finance-pay-by-bank-checkout-gates"
  - "/blog/checkout-friction-acceptance-operating-model"
  - "/blog/three-way-reconciliation-at-scale"
  - "/hire"
---

# Aani's Next Product Problem Is Merchant Operating Adoption

Aani has already moved beyond an early-adopter story.

In an April 2026 release, Al Etihad Payments reported more than 12.5 million registered users, connections across 74 licensed financial institutions, a sixfold year-on-year increase in transfers, and approximately 774,000 merchants using the UAE's national instant-payment platform. It also reported average transaction completion of no more than three seconds for the merchant flows described in the release.

Those are scale signals. They do not, by themselves, tell a product team whether Aani has become a merchant's default way to request, confirm, refund, reconcile and explain a payment.

That is the next operating problem.

## The Short Answer

**Aani's next merchant-adoption decision is not how many QR codes can be placed at counters. It is whether banks, payment providers and merchants can make the full payment lifecycle as dependable as the transfer itself: clear checkout choice, immediate confirmation, clean refunds, daily reconciliation, named exception ownership and evidence that the merchant received the money.**

Reach gets a payment method onto the counter. Operational trust keeps it there.

## The Public Numbers Change the Question

Al Etihad Payments' results describe a platform with meaningful consumer and institutional reach. The release says 85% of the connected institutions are banks, with exchange houses, digital wallets and finance companies making up the remaining mix. It also reports around 25,000 daily transfers made using mobile numbers alone.

The current product surface is broader than a simple person-to-person transfer. The official Aani materials list proxy payments, QR-code payments and Request to Pay. For small merchants and sole proprietors, Al Etihad Payments says a customer can scan a static or dynamic QR code, accept a request in the Aani application, or pay using a merchant tag without knowing the merchant's IBAN.

That gives product teams several useful ways to initiate a payment. It also creates several operating paths to control.

A static QR at a café is not the same journey as a dynamic QR attached to an order. A Request to Pay is not the same state model as a customer-initiated transfer. A merchant tag can reduce data-entry friction, but the customer and merchant still need to know which order the payment belongs to.

The scale question is therefore no longer "can a customer pay?"

It is "can the merchant close the sale and the books without manual investigation?"

## Merchant Adoption Has Five Product Gates

### 1. The checkout-choice gate

Aani should appear when it gives the customer and merchant a clear benefit, not as another logo in an already crowded checkout.

At a physical counter, the instruction has to be obvious: scan, confirm the merchant, approve, and wait for a successful result. In a digital journey, the customer needs a clean handoff into the participating bank or payment-provider experience and a reliable return to the merchant order.

The team should measure more than QR scans. Track Aani selection, initiated payments, customer approval, merchant confirmation, completed orders and abandonment at each transition. Otherwise an increase in scans can hide a weak completed-payment rate.

### 2. The confirmation gate

Instant settlement is useful only when the merchant can trust the confirmation.

The cashier should not release goods because a customer shows a phone screen. The merchant system needs its own authoritative event, tied to the right amount, merchant, order and payment reference. Duplicate callbacks, delayed notifications and customer retries need idempotent handling.

For small merchants without a deep point-of-sale integration, the operating design still needs an answer: which app or device confirms receipt, which user can see it, and what happens when connectivity is poor?

The product metric is confirmed orders, not customer screenshots.

### 3. The refund-and-exception gate

Every payment method is easy when the happy path works. Adoption is decided when it does not.

Teams need explicit states for customer paid but merchant did not receive confirmation, merchant received a duplicate, the amount is wrong, the order is cancelled, a refund is requested, or a transfer cannot be linked to an order. Each state needs a named owner across merchant, bank or payment provider, and the platform operator.

The customer message also matters. "Pending" must mean something operational: who is checking, what should the customer avoid doing, and when will the state resolve?

### 4. The reconciliation gate

Fast payment does not automatically create fast finance operations.

The merchant needs a daily view that connects the checkout or invoice, the Aani payment reference, the receiving account, fees if applicable, refunds, exceptions and the general ledger. Static QR payments are particularly sensitive to reference quality because the payment can arrive without a merchant-generated order identifier.

I would track automatic match rate, unmatched value, duplicate-reference rate, refund ageing and time to explain a customer complaint. If the payment clears in seconds but finance spends days matching it, the operating benefit has been overstated.

### 5. The repeat-use gate

Registered merchants and first transactions show distribution. Repeat use shows product value.

Segment merchants by size, channel and use case. Measure active merchants, transactions per active merchant, repeat customer use, share of eligible sales, average value, support contacts and reconciliation exceptions. Then compare static QR, dynamic QR, Request to Pay and merchant-tag journeys.

This turns adoption into a product decision. The team can see which journey is earning trust and which one is creating support work.

## Keep Future Services in the Roadmap, Not the Current-State Claim

The April release says cross-border payments, electronic direct debit, e-cheques and business-to-business payments are expected as additional services. The official Aani help material likewise describes some future functionality.

That distinction is important. Product strategy can prepare for those services, but a current merchant proposition should be written around what is actually available through participating institutions today. Planned capability is not production evidence.

The same discipline should apply to every partner rollout. Confirm the feature, participant, customer segment and date before describing it as live.

## The Merchant Scorecard I Would Run

A weekly Aani merchant scorecard should include:

- eligible checkouts and Aani selection rate;
- initiated, confirmed and completed payments by journey;
- median and tail confirmation time;
- repeat active merchants and transactions per active merchant;
- merchant-order automatic match rate;
- pending and unmatched payment ageing;
- refund completion time;
- duplicate attempts and duplicate receipts;
- support contacts per 10,000 payments;
- share of eligible merchant sales paid through Aani.

That scorecard connects national-platform growth to merchant reality. It also prevents one strong metric, such as registered users or raw transfer volume, from substituting for product-market fit at the counter.

## The Operator Decision

Aani's public results show that the UAE instant-payment platform has reach. The next decision is where to deepen repeat merchant behaviour.

I would choose a small number of merchant journeys, instrument the full order-to-reconciliation lifecycle, and scale only the ones that can prove confirmation, exception ownership and repeat use. QR placement should follow operating readiness, not lead it.

The question for a bank, payment provider or merchant is simple:

**Can one support agent explain an Aani payment from customer approval to merchant ledger without opening three systems and calling finance?**

If yes, Aani is becoming a merchant product.

If no, it is still a fast rail surrounded by slow operations.

For adjacent operating models, read [UAE Open Finance checkout gates](/blog/uae-open-finance-pay-by-bank-checkout-gates/), [checkout friction as an acceptance model](/blog/checkout-friction-acceptance-operating-model/), and [three-way reconciliation at scale](/blog/three-way-reconciliation-at-scale/). For help designing merchant payment controls and evidence, start at [/hire/](/hire/).

## FAQ

**What merchant-payment journeys does Aani support?**

Al Etihad Payments' public materials describe QR-code payments, Request to Pay and proxy-based transfers. For small merchants and sole proprietors, they describe static or dynamic QR codes and merchant tags as payment options.

**Does a three-second transfer mean the full checkout completes in three seconds?**

Not necessarily. The transfer can complete quickly while merchant confirmation, order matching, customer return, refund handling or reconciliation takes longer. Product teams should measure the full order outcome.

**Are cross-border payments and e-cheques live on Aani?**

The April 2026 release describes cross-border payments, electronic direct debit, e-cheques and B2B payments as expected additional services. Verify live availability with the participating institution before making a current-state claim.

## Sources

- [Al Etihad Payments: Aani 2026 results](https://centralbank.ae/media/ljadncs0/aani-delivers-a-transformational-leap-in-the-uae-s-digital-payments-landscape-12-5-million-users-and-instant-transfers-in-3-seconds-en.pdf)
- [Al Etihad Payments: Aani product page](https://aep.ae/en/services/aani/)
- [Al Etihad Payments: Aani help for merchants](https://aep.ae/en/services/aani-help/)
