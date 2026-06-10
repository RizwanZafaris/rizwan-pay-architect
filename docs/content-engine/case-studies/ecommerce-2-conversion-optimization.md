---
title: "The Declines That Shouldn't Happen: Tuning 3DS2 With Issuers to Stop Punishing Good Customers"
category: ecommerce
tags: [conversion-optimization, 3ds2, false-declines, fraud, issuer-collaboration]
anonymized_entity: "a major e-commerce marketplace (five South Asian markets)"
---

## Challenge

We were paying to acquire customers and then declining them at payment. As 3DS2 rolled out across the markets of a major e-commerce marketplace, authentication and risk policies tuned exclusively for fraud prevention were rejecting legitimate buyers — false declines, the silent tax. The asymmetry made it structurally hard to fix: a fraud loss shows up as a line item with an owner; a good customer declined and lost forever shows up nowhere at all.

## Context

Five South Asian markets, each with different issuer maturity, different 3DS2 readiness, and acquirer defaults set conservatively. Issuers, newly responsible for authentication decisions, defaulted to caution; step-up challenges fired broadly and failed often on unreliable OTP delivery. The fraud team's incentives were rational and asymmetric — they were measured on fraud losses, not on the revenue declined away. Nobody owned the false-decline number because nobody could see it.

## Approach

First, make the invisible visible. We built the false-decline evidence base: sampled manual review of declined transactions, analysis of customers who were declined and later succeeded on the same card or another method, and support-contact patterns from declined buyers. Once the scale of the problem was credible internally, we took the case outside: structured tuning sessions with issuers and acquirers, market by market — negotiating exemption strategy, enriching the data carried in authentication payloads, and adjusting routing where issuer behavior justified it.

## Product Strategy

The strategic reframe: authentication is a negotiation with issuers, not a configuration you set once. Issuers approve more when you give them more — richer, cleaner data in the 3DS2 payload lets their risk engines say yes without a challenge. And every relaxation was paired with a targeted tightening: we tightened fraud rules on demonstrably high-risk categories at the same time as we loosened policy where the evidence showed safety. That pairing was not just risk management; it was the political price of the program, because it let the fraud team co-own the change rather than veto it.

## Execution

Issuer-by-issuer working sessions are unglamorous: evidence packs, decline-code reconciliation, test cohorts, review, repeat. The near-failure came early — one of our first relaxations coincided with a fraud probe in a vulnerable category, chargebacks spiked in that segment, and the program was very nearly shut down on the spot. The high-risk-category tightening that became central to our strategy was forged in that incident: we re-scoped the relaxations away from exploitable segments, demonstrated containment to every stakeholder who had bet credibility on us, and rebuilt trust one issuer review at a time. Without that recovery, nothing else here would have shipped.

## Metrics

- False declines: down 20% through 3DS2 policy tuning with issuers and acquirers
- Fraud: held flat through the same period — the relaxations were funded by targeted tightening of fraud rules in high-risk categories
- Scope: rolled out across the marketplace's five markets

## Results

Recovered approvals at near-zero marginal cost — no media spend, no discounts, just customers we had already won finally being allowed to pay. The issuer relationships built through the tuning sessions outlasted the project and became the standing channel for handling new fraud patterns and authentication changes. Internally, false declines became a tracked metric with a named owner, which is the change that actually persists after the project team moves on.

## Lessons Learned

False declines are the most invisible large number in e-commerce; until you build the evidence base, the organization will rationally optimize for the loss it can see. You earn approval rates with data — issuers respond to payload quality and demonstrated control, not to escalation. Pair every loosening with a targeted tightening, for the risk position and for the politics alike. And expect your first relaxation to be tested by real fraud at the worst possible moment; the program that survives is the one that scoped for that day in advance.

> A 20% cut in false declines recovered more revenue than any campaign we ran that period — and the fraud line never moved.
