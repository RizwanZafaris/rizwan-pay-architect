---
title: "Zero to Five Million: Growing Paid Subscribers in a Market Where Cards Barely Exist"
category: ott
tags: [subscriber-growth, direct-carrier-billing, emerging-markets, subscriptions, distribution]
anonymized_entity: "a large OTT streaming platform (South Asia's leading streaming service)"
---

## Challenge

Start with the constraint, because the constraint was the whole job. A large OTT streaming platform — South Asia's leading streaming service — had compelling content, a fast-growing free audience, and almost no way to take money from most of it. Card penetration in the market was single digits. The textbook subscription model, card-on-file with monthly auto-renewal, addressed a thin slice of the people actually watching. The paid subscriber count was zero, and the honest diagnosis was that this was not a content problem or a marketing problem. It was a billing-rails problem.

## Context

I led the payments work behind this growth story. The market context matters: prepaid mobile dominant, cash dominant, formal banking penetration low. The one stored-value instrument almost every adult carried was a prepaid airtime balance. Live sport drove enormous concurrent viewing, so demand was never in question. But demand without a payment instrument is just traffic, and the platform was carrying the cost of that traffic with no monetization engine underneath it.

## Approach

If the only ubiquitous wallet is an airtime balance, make the airtime balance the wallet. We committed to direct carrier billing — and specifically to launching DCB with all four major telecom operators, not one or two, because partial coverage would have recreated the exact exclusion problem we were trying to solve. I also accepted, eyes open, the ugliest number in the model: telco revenue share put payment costs around 50% of every subscription. I treated that as tuition for distribution rather than a dealbreaker, and we dealt with it later — that turnaround is its own case study.

## Product Strategy

Three deliberate product choices turned DCB from a checkout option into a growth engine. First, pricing had to match how prepaid users hold money: daily and weekly passes alongside monthly plans, sized to typical top-up amounts. Second, the phone number became the identity layer — no cards, no forms, no email — which collapsed signup and payment into nearly the same act. Third, we treated each operator as an acquisition channel, not just a rail: operator promotion to their own subscriber bases brought users we could never have bought with performance marketing.

## Execution

Four operators meant four genuinely different integrations: different charging gateways, different settlement behaviors, different approval committees, different ideas of what a subscription even was. Two things nearly derailed us. Mid-rollout, consumer-protection rules around subscription consent tightened, and the mandated double opt-in threatened to gut completion; we redesigned the consent flow to be unambiguous and compliant without burying the user in steps. And on one operator, the dominant failure mode turned out to be insufficient airtime balance rather than technical declines — which forced us to build proper failure handling and retry logic far earlier than planned. Both near-misses became permanent capabilities.

## Metrics

- Paid subscribers: 0 to 5M in under three years
- Coverage: DCB live with all four major telecom operators
- Cost of distribution: payment costs around 50% via telco revenue share, accepted deliberately at this stage

## Results

The platform became the market's reference case for paid streaming, in a market where the consensus had been that nobody would pay. Subscription behavior, once established on airtime, later became the base for migrating users to wallets and cards on far better economics. The same playbook — local rails first, identity through the phone number, operator partnerships as distribution — carried into the platform's MENA expansion across UAE and KSA, where the instrument mix differed but the logic held.

## Lessons Learned

Distribution beats elegance. DCB was expensive, operationally messy, and unfashionable — and it was also the only rail that reached the audience. The expensive rail that exists outperforms the cheap rail that doesn't. Coverage is binary in the user's mind: either there is a payment method that works for their network and their balance, or there isn't, and they churn. And if you accept a painful revenue share to buy distribution, account for it as acquisition cost and plan its retirement from day one, because the rail that builds your base is rarely the rail that builds your business.

> Where card penetration is single-digit, subscriber growth is a payments problem before it is a content problem — the team that fixes the rails owns the market.
