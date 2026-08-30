---
title: "Saudi Open Banking Needs a Licensed Operating Model"
slug: "sama-open-banking-licensed-operating-model"
category: "Payment Infrastructure"
metaTitle: "Saudi Open Banking Needs a Licensed Operating Model"
metaDescription: "SAMA's open-banking licensing shift turns API access into supervised operating work across consent, data access, denial handling and incidents."
excerpt: "Saudi open banking has moved from sandbox proof to licensed operations. The product question is whether every consent, access request, denial and exception can be proved."
publishDate: "2026-08-30"
readingTime: "7 min read"
experiment: "Saudi open-banking license-to-operate model"
tags:
  - Saudi open banking
  - SAMA
  - payment initiation
  - account information
  - consent management
targetAudience:
  - Gulf payments product leaders
  - open-banking fintech operators
  - bank API and digital-channel teams
  - payment compliance leaders
targetKeywords:
  - SAMA open banking licensing
  - Saudi open banking operating model
  - payment account information services
  - payment initiation consent controls
relatedArticles:
  - "/blog/uae-open-finance-pay-by-bank-checkout-gates"
  - "/blog/open-banking-product-architecture"
  - "/blog/lean-ziina-uae-one-tap-pay-by-bank"
  - "/hire"
---

# Saudi Open Banking Needs a Licensed Operating Model

Saudi open banking is moving from a controlled testing story into a supervised operating business.

That changes the product question.

On 26 March 2026, the Saudi Central Bank announced the commencement of licensing fintech companies to provide open banking services after the regulatory sandbox phase. SAMA framed open banking as a way for customers to share financial information securely with supervised entities, with consent, privacy and framework compliance at the centre.

The later licensing trail makes the shift more concrete. On 10 May 2026, SAMA licensed Tatbiq Darahem Company for Technology Almaliya to conduct payment services by providing account information, one of the services associated with open banking. On 22 July 2026, SAMA licensed Malaa Company for Information Technology to provide payment account information services, and said there were then 33 licensed companies offering payment services in Saudi Arabia.

This is a timely Gulf payments signal, but it needs careful language. A payment account information service is not the same thing as payment initiation. A license announcement is not proof of bank coverage, customer adoption, uptime, conversion or commercial success. It is proof that an API proposition now sits inside a licensed operating model.

## The Short Answer

**Saudi open-banking providers should treat licensing as a product operating model, not only regulatory permission. The useful launch bar is whether the bank, fintech and customer can reconstruct consent, access, authentication, data use, denial reason and recovery action without inventing ownership after a failure.**

APIs create reach. Licensing creates responsibility.

## Why This Is More Than API Access

Open banking is often discussed as a technical integration: bank APIs, consent screens, account data, payment initiation and third-party applications. That framing is incomplete once the market moves from sandbox to licensing.

SAMA's dedicated open-banking programme page says the framework includes use cases, business rules and technical standards, including customer-experience guidelines, API specifications, implementation requirements and operational guidelines. It also describes a lab for banks and fintechs to test and certify services against the framework.

That is not just a developer environment. It is an operating model in pieces: what the customer sees, what the bank exposes, how the fintech behaves, how conformance is tested and how exceptions are governed.

For product leaders, the hard work starts when those pieces meet production traffic.

## The Consent Record Is The Product

Consent is the control that makes open banking legitimate. It is also the first place weak product design creates risk.

A customer should not be asked to trust a generic permission screen. The consent record needs to answer practical questions: which institution, account, data fields, purpose, provider, duration, revocation route and authentication event supported the approval.

That record must be useful outside the happy path. If a customer complains, a bank blocks access, a fintech retries a call, or a regulator asks for evidence, support and operations should not have to translate engineering logs into a case file.

## Account Information Has Its Own Boundary

The two named SAMA licenses in May and July are useful because they keep the scope narrow. Tatbiq Darahem and Malaa were licensed around payment account information services. That matters.

Account information can power budgeting, cash-flow views, affordability checks, merchant underwriting and financial dashboards. It can also create privacy risk, stale-data risk, account-mapping errors and overcollection. The more useful the data becomes, the more important it is to prove necessity, accuracy, access duration and revocation behaviour.

The safest product design is to treat every data request as explainable. Which account was requested? Which fields were needed? Was the request inside the consent scope? Was the data cached? Was it shared onward? When did the customer revoke? What changed downstream?

If those answers are scattered across vendors, bank gateways, support tools and analytics, the product is not operationally ready.

## Payment Initiation Raises The Bar Again

Payment initiation is a sharper operating problem because it moves from visibility into action.

SAMA's rulebook is explicit about the shape of that obligation. Article 96 requires payment account service providers to grant access when the payment service user has consented, and to support secure communication, correct authentication and timely responses. It also allows denial of access based on reasonably justified and evidenced reasons relating to unauthorized or fraudulent access, with incident notification and restoration when denial is no longer justified.

Article 97 sets further boundaries for payment initiation service providers: obtain user consent, do not hold user funds, do not modify the amount or payee, keep credentials secure, avoid unnecessary data access or storage, and identify itself for each communication session.

Those are not back-office legal details. They are product requirements.

A payment initiation journey needs an owner for every state: consent captured, payer authenticated, order initiated, bank accepted, bank denied, payment failed, access restored, customer notified and evidence retained. Without that state model, open banking creates a faster path to unresolved ambiguity.

## Five Gates I Would Require Before Scale

First, consent reconstruction. Support, audit or compliance should be able to reconstruct the full consent record in minutes: customer, provider, account, purpose, scope, duration, authentication event, revocation path and current status.

Second, access-denial ownership. If a bank denies access for fraud or unauthorized-access reasons, the customer, fintech and bank need one evidence trail. The denial should not become a vague error code that everyone forwards to someone else.

Third, data-minimization discipline. Product teams should prove which fields are required and what is not collected. A convenient all-fields request is not a customer-trust strategy.

Fourth, payment-order immutability. For payment initiation, the amount, payee and other transaction features must remain consistent with the user's instruction. Any change should require a fresh customer decision, not a silent backend adjustment.

Fifth, incident and recovery measurement. Track failed consent completion, denied access, stale tokens, revocations, delayed bank responses, unresolved cases by age and time to produce an audit-ready consent file.

## What Banks And Fintechs Should Decide Now

The bank should not treat open banking as a compliance interface bolted onto digital channels. It needs product ownership across API availability, authentication, consent messages, denial handling and customer communication.

The fintech should not treat a SAMA license as proof that distribution is solved. It still has to show why a data field is needed, what the customer gets in return, how to revoke access and what happens when a bank says no.

For merchants and lenders, the opportunity is real. Better account information can improve underwriting, affordability checks, cash-flow visibility and customer onboarding. Payment initiation can support lower-cost account-to-account journeys. But those benefits are durable only when consent, confirmation, reconciliation and exception handling are designed together.

This is why open banking belongs with payment operations, not only API delivery.

## The Operator Decision

If I were launching a Saudi open-banking product, I would run a weekly license-to-operate review across product, engineering, risk, compliance, support and bank-partner operations.

The scorecard would not start with users connected. It would start with explainability: consent files reconstructed, access denials resolved, revoked permissions honoured, failed authentications recovered, data fields justified and incidents closed with clear owners.

That is the difference between an API connection and a supervised service.

The operator question for banks, fintechs and payment providers is straightforward:

**Can one case file prove the customer's consent, the exact account access, the bank response, the data used, and the recovery path when the flow breaks?**

If yes, open banking is becoming infrastructure.

If no, it is still an integration with a regulatory wrapper around it.

For adjacent operating models, read [UAE Open Finance checkout gates](/blog/uae-open-finance-pay-by-bank-checkout-gates/), [open banking product architecture](/blog/open-banking-product-architecture/), and [Lean/Ziina Pay by Bank](/blog/lean-ziina-uae-one-tap-pay-by-bank/). For help turning regulated payment APIs into launch-ready operating systems, start at [/hire/](/hire/).

## FAQ

**Does SAMA licensing prove Saudi open banking is already widely adopted?**

No. Licensing proves supervised authorization for defined activities. Adoption, bank coverage, uptime, customer usage and merchant outcomes require separate evidence.

**Are account information services the same as payment initiation services?**

No. Account information focuses on access to account data with consent. Payment initiation involves initiating a payment order and therefore needs stricter controls around customer instruction, credentials, amount, payee and execution evidence.

**What should product teams build first?**

Build the consent and exception evidence layer first: consent scope, authentication event, account access, bank response, revocation status, denial reason and recovery owner.

## Sources

- [SAMA: SAMA commences licensing of fintech companies to provide open banking services](https://sama.gov.sa/en-US/MediaCenter/News/pages/news-1135.aspx)
- [SAMA: Tatbiq Darahem licensed to provide open banking services](https://www.sama.gov.sa/en-US/MediaCenter/News/Pages/news-1148.aspx)
- [SAMA: Malaa licensed to provide open banking services](https://www.sama.gov.sa/en-US/MediaCenter/News/Pages/news-1161.aspx)
- [SAMA: Meeting with CEOs of open banking companies](https://www.sama.gov.sa/en-US/MediaCenter/News/pages/news-1149.aspx)
- [SAMA Open Banking Programme](https://www.openbanking.sama.gov.sa/index-en.html)
- [SAMA Rulebook: Article 96](https://www.rulebook.sama.gov.sa/en/article-96-0)
- [SAMA Rulebook: Article 97](https://www.rulebook.sama.gov.sa/en/article-97-0)
