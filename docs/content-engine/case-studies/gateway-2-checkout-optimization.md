---
title: "A 14% Authorization Uplift: Moving a Subscription Merchant from Hosted Checkout to Direct API"
category: payment-gateway
tags: [checkout-optimization, 3ds2-exemptions, authorization-rates, subscriptions, tokenization]
anonymized_entity: "a leading payment gateway in emerging markets, serving a high-volume subscription merchant"
---

## Challenge

A high-volume subscription merchant on our hosted checkout was bleeding renewals. Every recurring charge bounced through a redirect, and every redirect ran a full 3DS challenge, even for customers who had paid monthly for a year without incident. The merchant's growth team measured involuntary churn, traced it to payment friction, and put us on notice: fix authorization or they would split volume across a second provider.

## Context

We were a leading payment gateway in emerging markets, and this merchant was one of our largest subscription accounts. Subscription payments are really two products wearing one API: the initial customer-initiated transaction, where some friction is defensible, and merchant-initiated renewals, where any challenge is pure failure because there is no customer present to complete it. Issuer support for 3DS2 exemptions across our markets was inconsistent and in places undocumented, and our hosted checkout treated every transaction identically because that was the conservative default we had shipped years earlier.

## Approach

We migrated the merchant to a direct API integration with tokenized credentials, then built an exemption engine on top: classify each transaction as customer-initiated or merchant-initiated, attach the appropriate 3DS2 exemption flags for recurring and low-risk traffic where the issuer honored them, and fall back to a challenge only when risk signals or issuer behavior demanded one. In parallel we attacked token health, because expired and stale credentials were silently killing renewals before 3DS ever entered the picture.

## Product Strategy

The north star was revenue per attempted renewal, not raw authorization rate, because the cheap way to inflate an auth rate is to quietly stop attempting risky renewals. Risk owned the chargeback guardrail and held veto power per cohort. We rolled out issuer by issuer, starting with the largest BIN ranges, because exemption behavior is an issuer-level reality, not a scheme-level promise, and an aggregate rollout would have hidden exactly the failures we needed to see.

## Execution

We built a per-issuer test matrix and learned quickly that documentation was fiction in places. One major issuer accepted our exemption flags and then soft-declined a meaningful share of those transactions downstream; aggregate dashboards hid it completely, while the per-issuer view caught it within days. That incident produced our issuer playbooks: which exemptions each issuer honors in practice, what the fallback behavior should be, and what retry posture is safe. Token refresh automation went live mid-project and cut token-related failures by 22%, which moved the numbers as much as the exemption work did. The merchant's engineers were co-conspirators throughout, because their internal billing retry logic had to stop fighting ours.

## Metrics

- 14% authorization uplift on the merchant's renewal traffic
- 22% reduction in token-related failures after refresh automation
- Challenge rate on renewals fell from near-universal to exceptional cases
- Double-digit improvement in involuntary churn, per the merchant's own reporting

## Results

The merchant cancelled the second-provider plan and consolidated volume with us instead. The more durable outcome was infrastructural: the exemption engine and the issuer playbooks became reusable assets, and subsequent subscription merchants onboarded straight onto the direct API path as the default. Internally, the project reset how we measured checkout performance: per issuer and per transaction type, never aggregate-only, because the aggregate had lied to us once already.

## Lessons Learned

Hosted checkout is a fine starting point and a terrible destination for subscription businesses. Exemptions are relationships with issuers, not API flags; the specification tells you what is possible, and only live traffic tells you what is true. Token hygiene is the unglamorous half of authorization uplift, and we nearly attributed gains to the 3DS work that token refresh had actually delivered, which would have steered the roadmap wrong for a year. Next time I would build the per-issuer dashboards before the migration begins, not after the first anomaly forces the question.

> How do you lift authorization rates for subscription payments? Move renewals onto a direct API with healthy tokens, apply 3DS2 exemptions issuer by issuer based on observed behavior, and measure revenue per attempted renewal instead of aggregate authorization rate.
