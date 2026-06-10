---
title: "Easy to Leave, Hard to Lose: Wallet-Native Subscription Management and Faster Refunds"
category: ott
tags: [retention, subscription-management, wallets, refunds, trust]
anonymized_entity: "a large OTT streaming platform (South Asia's leading streaming service)"
---

## Challenge

The retention problem arrived disguised as a trust problem. As the platform's paying base — built to 5M subscribers largely on carrier billing — began shifting toward mobile wallets and cards, a new pattern showed up in research and complaints: people hesitated to subscribe on digital rails because they feared a subscription they could not see, could not cancel, and could not get refunded from. In a first-generation digital payments market, "auto-renew" reads less like convenience and more like a trap.

## Context

Carrier billing had been forgiving in odd ways: when the airtime balance ran out, billing simply stopped, so users never felt locked in. Wallets changed the contract — money sat in a balance the user actively managed and watched. Meanwhile our refund path ran through partner rails and manual queues: slow, opaque, resolved through support tickets. Every slow refund became a story told to friends and family, in a market where word of mouth governs financial trust.

## Approach

We made a bet that still feels counterintuitive to many subscription operators: make leaving easy and money-back fast, then measure whether that increases willingness to subscribe and to stay. Concretely, that meant wallet-native subscription management — view, pause, cancel, and request refunds from inside the wallet apps users already trusted — plus an internal rebuild of refund operations from a manual queue into an event-driven process with a service-level commitment attached.

## Product Strategy

The strategic insight was about where subscription state should live. Users do not think of subscriptions as living inside a streaming app; they think of them as living where their money lives. Surfacing the subscription natively in wallet partners' apps meant the user's mental model and the system's behavior finally matched. Cancellation without a support ticket was non-negotiable. And refund speed was framed internally as a retention feature rather than a cost center: a fast refund converts a billing dispute into a trust event, and a trusted biller gets a second chance at the subscription later.

## Execution

The hard part was not engineering — it was alignment. Finance feared refund abuse if money-back became fast and easy. Wallet partners feared support load landing on their side. This is the part that almost failed: the program stalled for a stretch on exactly these objections, and what unstuck it was a controlled rollout with explicit abuse monitoring, reviewed jointly. The feared behavior never materialized at anywhere near the predicted level — refund volumes stayed manageable, and the abuse patterns finance had modeled mostly did not show up. The design work that took longest was keeping subscription state authoritative on our side while management actions lived inside the wallet, so the two systems could never tell the user different stories.

## Metrics

I am deliberately keeping this case qualitative — cohort-level retention deltas belong to the business and do not survive anonymization honestly. The directional outcomes: refund turnaround dropped from a multi-step support process to a fast, largely automated path; billing-related complaints fell as wallet-native management rolled out; and renewal behavior among wallet-based subscribers improved relative to the period before self-serve management existed. The 5M-subscriber base built earlier is the scale context for all of it.

## Results

Subscription management inside wallets became a differentiator in partner conversations — the wallets promoted the capability themselves, because it made their own product stickier. The retention economics of the wallet-and-card base improved enough to support the platform's broader migration away from high-cost carrier billing, which is the subject of a separate case study. Most durably, the refund commitment survived as an organizational habit: money-back speed stayed a tracked metric long after the original project ended.

## Lessons Learned

Users do not churn because cancellation is easy; they refuse to subscribe because they fear it will be hard. Subscription state should live where the user's money lives, not where your app would prefer it to live. Refund speed is a retention lever that most organizations price purely as a cost. And when finance and partners both predict abuse, do not argue from conviction — run the controlled rollout and let the data settle it, because the feared user mostly does not exist.

> The fastest way to keep subscribers in a low-trust market is to make leaving effortless — retention you have to lock in was never retention.
