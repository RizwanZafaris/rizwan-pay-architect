---
title: "Marqeta's STIP Lesson: Issuer Resilience Is a Product Control"
slug: "marqeta-stip-issuer-resilience-operating-model"
category: "Card Issuing"
metaTitle: "Issuer Resilience Is a Product Control"
metaDescription: "Marqeta's STIP and Commando Mode material shows why issuer resilience needs authorization policy, limits, evidence, and drills."
excerpt: "Stand-in processing is not just uptime insurance. It is a live authorization policy that decides which cardholders can still transact when the core path is broken."
publishDate: "2026-07-20"
readingTime: "7 min read"
experiment: "operator story"
tags:
  - card issuing
  - issuer processing
  - stand-in processing
  - authorization controls
  - Marqeta
  - payment resilience
targetAudience:
  - Issuer processing leaders
  - Card programme managers
  - Fintech CPOs
  - Payment operations teams
targetKeywords:
  - stand-in processing issuer operating model
  - Marqeta Commando Mode card issuing
  - issuer authorization controls resilience
  - card programme uptime controls
relatedArticles:
  - "/blog/processor-only-card-issuing-operating-model"
  - "/blog/cross-river-stripe-agentic-card-mandate-controls"
  - "/blog/thredd-sutton-bin-sponsorship-operating-model"
  - "/blog/where-pmos-fail-six-patterns-fintech-programmes"
---

# Marqeta's STIP Lesson: Issuer Resilience Is a Product Control

The easiest way to underestimate card issuing is to treat authorizations as a simple online request.

Most days, that is how the flow looks. A cardholder taps, the network routes, the issuer processor checks the account and controls, and a decision comes back in seconds.

The real test is what happens when the issuer path is not available.

On 13 July 2026, [Marqeta published an explanation of stand-in processing](https://www.marqeta.com/blog/keeping-transactions-moving-the-critical-role-of-stand-in-processing-stip-in-modern-card-payments) and its own fallback capability, Commando Mode. The useful point is not that outages are bad. Everyone knows that. The useful point is that issuer resilience is not just an infrastructure decision. It is a product-control decision.

## The Short Answer

**Stand-in processing is a live authorization policy for failure conditions. It should define which transactions can proceed, which must stop, what evidence is logged, how balances are reconciled, and who can change the rules before an outage becomes a customer-trust incident.**

That is a CPO-level issue because the decision trades off customer access, fraud exposure, regulatory obligations, ledger accuracy, and brand trust at the same time.

## STIP Is Not Just A Backup Switch

Marqeta defines stand-in processing as the fallback that starts when an issuing bank or issuer system cannot respond to an authorization request because of maintenance, an outage, network problems, or other interruption. In that moment, the issuer processor stands in and uses predefined rules to approve or decline.

That sounds operational. It is actually product architecture.

A card programme needs to know:

- whether low-value transactions can continue when the core ledger is unavailable;
- which merchant categories are too risky to approve in fallback mode;
- whether a suspended card should stay blocked;
- how velocity controls behave when the real-time balance path is delayed;
- which transactions must be marked as stand-in decisions for later review;
- how the programme avoids approving spend that the ledger cannot support.

If those answers are buried in processor defaults, the issuer has delegated customer experience and loss exposure to someone else's assumptions.

## Commando Mode Shows The Real Design Surface

[Marqeta's Commando Mode documentation](https://www.marqeta.com/docs/core-api/commando-mode) makes the design surface concrete. The docs describe Commando Mode as a fallback for Gateway Just-in-Time funded cards when the programme's decisioning system fails. Marqeta can make a decision based on defined business rules, store unsent webhooks for later transmission, and mark transactions so the programme can distinguish normal Gateway JIT funding from managed fallback activity.

That matters because many modern card programmes do not simply hold a static prepaid balance. They rely on real-time funding, ledger rules, account state, risk checks, merchant controls, and customer-specific policy. A fallback path that ignores those states can keep payments moving and create a reconciliation mess at the same time.

The operator question is not "do we have STIP?"

The better question is: "What exactly changes when STIP starts?"

For example, if a travel platform issues virtual cards to pay hotels, the fallback policy may need to approve a check-in authorization within a known trip window. If the same card is attempted outside the merchant, city, amount, or validity window, the fallback policy should decline. If the programme is a credit product, the policy needs balance and credit-limit discipline. If the programme serves gig workers or expense cards, the policy needs different limits for fuel, cash access, restaurants, and online purchases.

That is product management, not only uptime engineering.

## Network Stand-In Still Has A Role

Issuer processors are not the only layer. Network stand-in also exists in the card-processing chain; [Enfuce's card authorization documentation](https://docs.enfuce.com/guides/the-essentials/global-processing/authorisation-and-authentication-of-payments) notes that Mastercard and Visa can return a decline code during stand-in processing when the issuer is unavailable or unresponsive.

The distinction is important. Network stand-in can protect the customer experience when the network cannot reach the issuer or processor. Processor-level stand-in can protect the programme when the issuer's own decisioning path fails. A serious card programme should understand both layers and avoid assuming that one covers every failure mode.

The operating model should map failure paths: network-to-processor outage, processor-to-programme decisioning failure, degraded ledger state, delayed webhooks, planned maintenance, and suspected compromise. Each scenario can require a different answer. During scheduled maintenance, the issuer may allow known low-risk activity. During suspected compromise, it may want conservative declines. During ledger degradation, it may cap approvals.

## The Scorecard I Would Run

I would not let STIP sit as a processor feature checked once during implementation.

I would run it as a resilience scorecard:

- percentage of authorizations handled in normal path, processor stand-in, and network stand-in;
- fallback approvals and declines by amount band, merchant category, region, BIN, and programme;
- fraud, dispute, and complaint rate for fallback approvals;
- false-decline estimates during fallback windows;
- ledger and balance mismatches created by fallback activity;
- webhook replay latency and reconciliation completion time;
- override changes by user, reason, timestamp, and approval path;
- quarterly simulation results, including cyber and processor-timeout scenarios.

That scorecard gives executives the right argument. The goal is not maximum approval during failure. The goal is controlled continuity.

## What Issuers Should Fix Before The Outage

First, define fallback policy by customer job, not by generic amount limit. A fleet card, virtual travel card, consumer debit card, and expense card should not share the same failure behavior.

Second, separate customer-visible continuity from internal ledger certainty. Some transactions can be approved with delayed evidence. Others should never proceed without live state.

Third, rehearse the handback. The dangerous moment is not only the outage. It is the return to normal processing, when duplicate holds, delayed webhooks, stale balances, and manual support tickets can turn a clean fallback into days of operational drag.

Fourth, give product and risk leaders shared decision rights. Engineering can keep the path alive. Product and risk must decide what the path is allowed to do.

The debate point: if your issuer processor went into stand-in mode tomorrow, would your team know the customer promise it is making, or only that payments are still moving?

[Talk to me about card programme resilience and issuer processing](/hire/) or review related work on [processor-only issuing](/blog/processor-only-card-issuing-operating-model), [agentic card mandate controls](/blog/cross-river-stripe-agentic-card-mandate-controls), and [fintech programme governance](/blog/where-pmos-fail-six-patterns-fintech-programmes).
