---
title: "Marqeta and Riskified Move False Declines Into Issuer Controls"
slug: "marqeta-riskified-issuer-authorization-false-declines"
category: "Card Issuing"
metaTitle: "Marqeta Riskified Issuer Authorization Controls"
metaDescription: "Marqeta and Riskified show why issuer authorization needs merchant intelligence, fraud feedback, override rules, and false-decline evidence."
excerpt: "Marqeta and Riskified's issuer-risk integration is a card-programme signal: false declines are partly an issuer authorization problem. Issuers need merchant intelligence, rule feedback, override paths, and evidence that protects approvals without weakening fraud controls."
publishDate: "2026-08-10"
readingTime: "7 min read"
experiment: "data-led hook"
tags:
  - Marqeta
  - Riskified
  - card issuing
  - false declines
  - issuer authorization
  - fraud controls
targetAudience:
  - Issuer processing leaders
  - Card programme owners
  - Fintech CPOs
  - Fraud and risk teams
targetKeywords:
  - Marqeta Riskified issuer authorization
  - card issuer false declines
  - Real-Time Decisioning card issuing
  - issuer fraud feedback controls
relatedArticles:
  - "/blog/processor-only-card-issuing-operating-model"
  - "/blog/marqeta-stip-issuer-resilience-operating-model"
  - "/blog/adyen-refund-concentration-fraud-lifecycle-controls"
  - "/product-work/fraud-risk-aml-cft"
---

# Marqeta and Riskified Move False Declines Into Issuer Controls

False declines are usually discussed as a merchant checkout problem.

That is only half true.

On 5 August 2026, [Riskified announced a partnership with Marqeta](https://www.riskified.com/press/riskified-and-marqeta-partner/) to bring Riskified's pre-authorization risk intelligence into Marqeta's modern card issuing platform. The stated goal is to help issuers approve more legitimate ecommerce transactions, reduce false declines, and make authorization decisions with more merchant-side context.

That matters because the issuer often sees a narrower version of the transaction than the merchant or fraud platform does. The issuer can see card, account, device, amount, merchant category, velocity, and network signals. The merchant side may also know the customer history, account tenure, order behavior, basket pattern, fulfillment risk, refund behavior, and whether similar transactions later became chargebacks or good sales.

If those worlds stay disconnected, the issuer authorization model can be technically conservative and commercially wrong.

## The Short Answer

**Card issuers should treat false-decline reduction as an authorization-control problem, not as a generic approval-rate target. The useful operating model links merchant intelligence, issuer rules, fraud feedback, override windows, chargeback evidence, and customer communication into one measurable loop.**

Higher approvals are only valuable when the programme can prove which risks were accepted and why.

## What The Partnership Changes

The Marqeta and Riskified announcement says Riskified will provide enriched pre-authorization risk intelligence from its merchant transaction network directly into Marqeta's issuing platform. It also says the integration strengthens Marqeta's Real-Time Decisioning offering by feeding richer merchant data into its predictive risk score and fraud detection process.

In March 2026, a [Marqeta-distributed Business Wire release](https://www.nasdaq.com/press-release/marqeta-delivers-ai-driven-risk-decisioning-enhance-real-time-fraud-prevention-2026) described its AI-powered risk score as part of Real-Time Decisioning, analyzing transaction risk at the point of authorization. Marqeta said the score evaluates more than 300 real-time transaction attributes against historical behavioral patterns and supports millisecond-level responses.

The partnership adds another evidence source: merchant-side pre-authorization intelligence.

For an issuer, that can change the decision from "this transaction looks unusual against cardholder history" to "this transaction is unusual, but the merchant has strong evidence that this customer and order are legitimate." It can also support the opposite decision: a transaction may look normal to the card programme but suspicious to the merchant network.

That is the real product surface. The issuer is no longer deciding from only issuer-side memory.

## The Trade-Off

The upside is obvious: fewer good customers are blocked at checkout, merchants recover sales, cardholders have fewer embarrassing declines, and issuers protect top-of-wallet trust.

The trade-off is model accountability.

If an issuer accepts richer merchant intelligence, it has to decide how that intelligence is weighted, logged, challenged, and corrected. Otherwise the programme can create a black box where every decline is blamed on fraud and every fraud loss is blamed on approval growth.

For regulated or sponsor-bank-backed programmes, that is not enough.

The card programme owner needs to answer practical questions:

- Which merchant-intelligence fields influenced the authorization?
- Was the signal used to approve, decline, review, or suppress a rule?
- How does the programme detect false positives and false negatives?
- Who can override a triggered rule, for how long, and with what evidence?
- How are disputes and chargebacks fed back into the next decision?
- How are merchants and cardholders told what happened without exposing fraud logic?

Those answers separate a serious issuer-risk system from an approval-rate dashboard.

## Feedback Is The Control Loop

Marqeta's [Fraud Feedback API documentation](https://www.marqeta.com/docs/developer-guides/using-fraud-feedback-api) is useful because it shows the operational shape of the problem. It explains that Real-Time Decisioning rules can create false positives, where genuine transactions are incorrectly declined, and false negatives, where fraudulent transactions are authorized. The endpoint lets a programme report those outcomes back to refine RiskControl rule sets.

That feedback path is not a technical footnote. It is the governance mechanism.

If the programme cannot label wrong declines and wrong approvals, it cannot improve the decision system honestly. It can only tune rules by anecdote.

The same documentation describes a false-positive path where a declined cardholder contacts the team, the team reports the transaction as not fraud, rules can be suppressed for a retry, and the next transaction can succeed within a defined window. Product, risk, support, and operations meet there.

The owner should not leave that path implicit.

## The Scorecard I Would Run

For an issuer using merchant-side intelligence in authorization, I would track six groups of evidence.

**Authorization quality:** approval rate, decline rate, false-positive rate, false-negative rate, and approval uplift by merchant segment.

**Risk quality:** fraud losses, chargebacks, dispute rate, confirmed fraud after approval, and suspicious order clusters.

**Customer impact:** retry success after false-positive correction, support contacts per 1,000 declines, cardholder complaint rate, and wallet abandonment after decline.

**Merchant impact:** recovered legitimate sales, merchant-level false-decline pattern, chargeback impact by merchant, and cases where merchant intelligence conflicted with issuer rules.

**Control integrity:** rule overrides, suppression duration, owner, reason code, evidence link, and post-override fraud outcome.

**Model drift:** signal age, merchant-data coverage, rule performance by cohort, and whether specific merchant categories are being over-trusted or over-blocked.

The objective is not "approve more." It is "approve with evidence."

## Why This Is An Issuing Issue

Merchants experience the lost sale, but the issuer owns the cardholder authorization decision.

That means card programme leaders cannot treat false declines as someone else's checkout problem. If the card is declined at the wrong moment, the customer blames the issuer, the wallet, or the programme. If the card is approved too easily, the issuer carries fraud and dispute consequences.

Modern issuing is becoming a shared intelligence problem. Processor data, merchant data, network data, cardholder history, device behavior, and dispute feedback all need to meet inside one decision policy.

This is why the important question is not whether machine learning is involved. The question is who owns the authorization policy and whether the programme can explain a decision after money, customer trust, or loss exposure has moved.

## What Card Leaders Should Do Next

Before adding another risk signal to authorization, map the decision path.

Start with one ecommerce authorization. Show the input fields, model score, rule triggers, merchant evidence, decline or approval reason, override route, customer message, dispute outcome, and feedback record. Then decide which fields the programme is comfortable using automatically and which require human review or a staged rollout.

Do not let a promising data partnership become an ungoverned decision layer.

Relevant proof paths: [processor-only issuing controls](/blog/processor-only-card-issuing-operating-model/), [issuer resilience and STIP](/blog/marqeta-stip-issuer-resilience-operating-model/), and [fraud lifecycle controls](/blog/adyen-refund-concentration-fraud-lifecycle-controls/). For help pressure-testing card issuing authorization, fraud feedback, and programme controls, start at [/hire/](/hire/).

## FAQ

**What did Riskified and Marqeta announce?**

Riskified announced a partnership with Marqeta to bring pre-authorization risk intelligence into Marqeta's card issuing platform so issuers can improve authorization decisions and reduce false declines.

**Why do false declines matter for card issuers?**

A false decline blocks a legitimate cardholder at the moment of purchase. It can hurt merchant sales, customer trust, wallet preference, support volume, and issuer economics.

## Sources

- [Riskified: Riskified and Marqeta partner on issuer authorization decisions](https://www.riskified.com/press/riskified-and-marqeta-partner/)
- [Nasdaq / Business Wire: Marqeta AI-driven Real-Time Decisioning announcement](https://www.nasdaq.com/press-release/marqeta-delivers-ai-driven-risk-decisioning-enhance-real-time-fraud-prevention-2026)
- [Marqeta Docs: Using the Fraud Feedback API](https://www.marqeta.com/docs/developer-guides/using-fraud-feedback-api)
- [PYMNTS Intelligence and Nuvei: Fraud Management, False Declines and Improved Profitability](https://www.pymnts.com/wp-content/uploads/2023/11/PYMNTS-Fraud-Management-False-Declines-and-Improved-Profitability-November-2023.pdf)
