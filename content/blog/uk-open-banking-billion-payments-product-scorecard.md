---
title: "UK Open Banking Has a Product Scale Scorecard Now"
slug: "uk-open-banking-billion-payments-product-scorecard"
category: "Product Management"
metaTitle: "UK Open Banking Product Scale Scorecard"
metaDescription: "UK Open Banking's one-billion-payment milestone shows why product teams need scale metrics for reliability, consent, VRP, and disputes."
excerpt: "UK Open Banking's one billion payments and 100 billion API calls should push product teams from adoption storytelling into a harder scale scorecard: reliability, consent completion, VRP quality, fraud, disputes, and cash-flow outcomes."
publishDate: "2026-08-08"
readingTime: "7 min read"
experiment: "data-led hook"
tags:
  - UK Open Banking
  - product management
  - account-to-account payments
  - API reliability
  - variable recurring payments
  - fintech product strategy
targetAudience:
  - Product managers
  - Open banking leaders
  - Fintech CPOs
  - Payments platform teams
targetKeywords:
  - UK Open Banking one billion payments
  - open banking product scorecard
  - variable recurring payments product metrics
  - open banking API reliability
relatedArticles:
  - "/blog/open-banking-product-architecture"
  - "/blog/lean-ziina-uae-one-tap-pay-by-bank"
  - "/blog/product-management-for-payments-platforms"
  - "/product-work/tapmad-dcb-monetisation-wallet-migration"
---

# UK Open Banking Has a Product Scale Scorecard Now

Product teams love milestone numbers because they are easy to repeat.

One billion payments. One hundred billion API calls. Record monthly API volume.

The better question is what those numbers force product leaders to manage next.

On 30 July 2026, [Open Banking Limited announced](https://www.openbanking.org.uk/news/open-banking-surpasses-one-billion-payments-and-100-billion-api-calls/) that the UK open banking ecosystem had passed more than one billion open banking payments and more than 100 billion API calls across the CMA9 banks since launch. It also reported 2.81 billion API calls in June 2026, 40.16 million payments, 7.73 million sweeping variable recurring payments, weighted availability of 99.80%, and average response time of 349ms.

Those numbers are product-scale markers, not simple adoption applause.

## The Short Answer

**Open banking product teams should now manage a scale scorecard alongside adoption. The scorecard needs to connect API reliability, consent completion, payment conversion, VRP quality, fraud, dispute handling, reconciliation, and customer value by use case.**

Once a payment rail is used at this scale, product quality is measured in operational detail.

## Scale Changes The PM Job

In early open banking, the product question was often basic: can customers connect accounts, initiate payments, and trust the handoff?

At one billion payments, the question changes.

The rail is no longer an experiment. It is part of financial infrastructure for consumers, SMEs, merchants, lenders, accounting platforms, payment service providers, and banks. That creates a broader PM responsibility. The product manager has to understand journeys, but also availability, latency, exception handling, consent recovery, bank-by-bank performance, fraud controls, and value capture.

Open Banking Limited's own homepage shows the same shift. It displays June API performance metrics alongside ecosystem numbers: average API availability, response time, successful calls, weighted availability, successful-call volume, and failed-call percentage. That is infrastructure language, not campaign language.

Product teams should take the hint.

## Payments And API Calls Are Different Signals

The one-billion-payment milestone proves that account-to-account payment initiation has moved beyond novelty.

The 100-billion-API-call milestone says something different. It reflects repeated data access, account-information journeys, provider integrations, bank infrastructure, and service reliability. A product leader should not blend these into one success story.

Payments measure customer willingness to move money through the rail. API calls measure ecosystem dependency. VRP growth measures whether recurring account-to-account use cases are becoming practical. Response time and availability measure whether the infrastructure is robust enough to carry that dependency.

Those signals need separate owners.

A payment PM should care about initiation conversion, authentication drop-off, bank redirect failure, payment status clarity, refunds, reconciliation, and support tickets. A data-access PM should care about consent renewal, data freshness, API coverage, categorization quality, and customer value. A platform PM should care about bank-specific reliability, retry policy, rate limits, incident communication, and developer experience.

One umbrella metric will hide too much.

## VRP Is The Product Test

The June numbers are especially useful because sweeping VRPs grew 6.7% month on month while Single Domestic Payments declined 1.2%. That does not prove a permanent trend from one month. It does point to the next product battlefield.

Variable recurring payments are where open banking becomes more than a one-off checkout alternative. They can support savings sweeps, account funding, subscription-like flows, repayment, treasury movement, and cash management. They also demand more customer trust because the authorization persists beyond one moment.

That means the PM cannot treat VRP as "direct debit, but modern."

VRP needs its own customer controls: amount limits, frequency, cancellation, merchant identity, notification timing, failed-payment recovery, dispute path, and understandable consent language. If the customer cannot explain what they approved, growth will create complaints before it creates durable adoption.

The [Open Banking Customer Experience Guidelines](https://standards.openbanking.org.uk/customer-experience-guidelines/) matter here because journey clarity becomes a growth control. Consent is not a legal screen. It is part of the product.

## The Scorecard I Would Use

For a bank, PSP, or fintech building on UK open banking, I would not report only payments and active users.

I would use a product-scale scorecard:

- payment initiation starts, completions, failures, and abandonments by bank and device;
- authentication completion and redirect-return rate;
- payment status clarity, including pending, accepted, rejected, completed, and failed;
- VRP setup, active consent, successful sweep, cancellation, and failed-sweep rates;
- bank API availability, latency, and error codes by critical journey;
- customer support contacts per 10,000 journeys;
- fraud, unauthorized-payment claims, and dispute cycle time;
- merchant or user cash-flow outcome beyond payment volume;
- reconciliation breaks and unresolved exceptions;
- value by use case, such as lower cost, better approval, faster funding, or improved forecasting.

This is not dashboard excess. It is how a PM keeps the product promise honest when usage becomes infrastructure.

## Why This Matters Outside The UK

The UK numbers matter for Gulf and emerging-market product leaders too.

Many markets are building open finance, account-to-account payments, instant payment systems, and consent-based data sharing. The early temptation is to celebrate regulatory launch, sandbox participation, or first merchant integrations.

The UK milestone shows the later operating bar. A rail can be technically live and still weak as a product if the customer journey is brittle, bank performance varies too much, disputes are unclear, or merchants cannot reconcile payment states.

That is why [UAE Pay by Bank launches](/blog/lean-ziina-uae-one-tap-pay-by-bank/) should be measured beyond novelty. The question is not whether customers can move money from an account. It is whether the flow becomes reliable enough for merchants, lenders, wallets, and platforms to build real economics around it.

## What Product Leaders Should Do Now

If I owned an open banking payment product, I would pick three use cases and make the scorecard specific.

For account funding, I would watch completion, instant availability, failed bank returns, and funding reversals.

For merchant checkout, I would watch conversion against cards, refund handling, settlement timing, reconciliation, support contacts, and repeat usage.

For VRP, I would watch setup comprehension, active consent retention, successful collections, failed-payment recovery, cancellation clarity, and complaint rate.

The product discipline is to stop asking whether open banking is "growing" and start asking where it is becoming dependable.

One billion payments is a milestone. The next product advantage belongs to the teams that can explain quality at the journey level.

Relevant proof paths: [open banking product architecture](/blog/open-banking-product-architecture/), [UAE one-tap Pay by Bank](/blog/lean-ziina-uae-one-tap-pay-by-bank/), and [product management for payments platforms](/blog/product-management-for-payments-platforms/). For help turning payment rails into measurable product systems, start at [/contact/](/contact/).

## FAQ

**Why is the UK open banking milestone important for product teams?**

It shows that open banking is now operating at infrastructure scale, so product teams need to manage reliability, journey completion, consent quality, VRP behavior, fraud, and reconciliation instead of only adoption.

**What is the most important product metric after payment volume?**

Completion quality by use case. A product team should know where customers abandon, which banks create friction, how payment status is communicated, and whether the journey creates support or reconciliation issues.

## Sources

- [Open Banking Limited: Open Banking surpasses one billion payments and 100 billion API calls](https://www.openbanking.org.uk/news/open-banking-surpasses-one-billion-payments-and-100-billion-api-calls/)
- [Open Banking Limited: latest API performance stats](https://www.openbanking.org.uk/)
- [Open Banking Standard: Customer Experience Guidelines](https://standards.openbanking.org.uk/customer-experience-guidelines/)
