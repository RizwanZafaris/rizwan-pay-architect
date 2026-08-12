---
title: "FedNow Intermediary Banks Turn Cross-Border Into A Rulebook Problem"
slug: "fednow-intermediary-banks-cross-border-rulebook"
category: "Cross-Border Payments"
metaTitle: "FedNow Cross-Border Intermediary Bank Controls"
metaDescription: "FedNow intermediary-bank proposals show why cross-border instant payments need sanctions, settlement, exception, and respondent-bank controls."
excerpt: "The Federal Reserve's Regulation J proposal for FedNow intermediaries is not just a cross-border growth story. It turns real-time domestic settlement, correspondent banking, sanctions screening, message design, and exception ownership into one operating model."
publishDate: "2026-08-12"
readingTime: "7 min read"
experiment: "data-led regulatory hook"
tags:
  - FedNow
  - Regulation J
  - cross-border payments
  - correspondent banking
  - real-time payments
  - sanctions screening
targetAudience:
  - cross-border payment leaders
  - bank payment operations teams
  - fintech CPOs
  - payment programme directors
targetKeywords:
  - FedNow cross-border payments
  - FedNow intermediary banks
  - Regulation J FedNow proposal
  - real-time sanctions screening FedNow
relatedArticles:
  - "/blog/mastercard-send-visa-direct-push-payments"
  - "/blog/mbridge-cross-border-settlement-warning-shot"
  - "/blog/swift-november-2026-address-cutoff-product-problem"
  - "/product-work/simpaisa-payment-infrastructure"
---

# FedNow Intermediary Banks Turn Cross-Border Into A Rulebook Problem

FedNow's cross-border opening is not a new corridor by itself.

It is a rulebook change that could let U.S. banks and credit unions use non-Reserve Bank intermediaries in FedNow transfers. For operators, that is the difference between a domestic instant-payment rail and a domestic leg inside a larger correspondent transaction.

On 10 April 2026, the Federal Register published the Federal Reserve Board's proposed Regulation J amendment. The proposal would permit FedNow participants to designate intermediary banks other than Reserve Banks. The Board said the change could support private-sector cross-border payment solutions by letting participants use a correspondent bank for the international portion of a transaction and FedNow for the U.S. domestic portion.

The useful question is not "does this make FedNow global?" It is "who owns the controls when an always-on domestic settlement leg is placed inside a cross-border chain?"

## The Short Answer

**Banks should treat the FedNow intermediary proposal as a cross-border operating-model test. The material decision is whether sanctions screening, message identification, correspondent-bank ownership, funds-availability rules, exception handling, and customer communication are ready before the rail is marketed as instant cross-border delivery.**

If those controls are not designed together, FedNow can make the domestic leg faster while leaving the customer with the same old uncertainty on the international leg.

## What The Fed Proposed

The proposal is specific. Today, Regulation J generally prevents a FedNow participant from using an intermediary bank other than another Reserve Bank. The Federal Reserve says that limitation means a FedNow transfer can include only two U.S. banks other than a Reserve Bank.

The result has been domestic scope. A U.S. participant cannot use FedNow to send a payment through a correspondent outside the United States.

The proposed amendment would allow a FedNow payment order to designate a non-Reserve Bank intermediary. The Federal Reserve describes the model as using FedNow for the U.S. domestic portion while an intermediary, such as a correspondent bank, handles the international portion.

That is not the same as making every actor a FedNow participant. The Board also says the amendments would not change which entities can connect to FedNow or alter the payment flow between FedNow participants. The product opportunity lives at the boundary between rail rules and correspondent-bank workflow.

## The Immediate Availability Trap

The Regulation J proposal also leaves an important funds-availability boundary in place.

The Federal Reserve says the immediate funds-availability requirement would apply only when the beneficiary's bank accepts a payment order over FedNow. In an outbound cross-border payment where an intermediary bank accepts the FedNow payment order and the final beneficiary bank sits outside the United States, that foreign beneficiary bank would not be obliged under Regulation J to make funds available immediately.

That is the customer-promise trap.

The U.S. domestic leg may settle in real time. The beneficiary leg may not. The FX leg may not. The compliance review may not. If the product page says "instant cross-border" without separating those layers, support and complaints inherit the ambiguity.

The better promise is precise: instant U.S. domestic settlement into a cross-border correspondent workflow, with visible status for the international leg.

## Industry Support Comes With Conditions

The Bank Policy Institute and The Clearing House commented in June 2026. They supported the proposal's objectives and the resiliency benefit of allowing additional payment services to settle U.S. legs of cross-border transfers. Their comment also named the hard implementation issue: participating depository institutions may need real-time sanctions screening for FedNow messages that facilitate cross-border transactions.

They asked the Fed and FRFS to consider a specific FedNow message code for cross-border transactions. They also recommended an initial opt-in pilot, then broader acceptance depending on readiness and pilot results.

That is the operator signal. Support is not the same as readiness. The gap sits in message design, screening, and operational timeframes.

## The Operating Model I Would Require

I would not launch a FedNow-based cross-border product until six ownership questions are answered.

First, how is a cross-border FedNow leg identified in the message and downstream data? If operations cannot separate domestic-only and cross-border-supported transfers, it cannot triage the right exceptions.

Second, who screens in real time? Multiple banks may have obligations, but the product needs one accountable owner for the customer-facing workflow.

Third, what happens when the domestic leg settles and the correspondent leg slows? The answer cannot be a generic "pending" state. It needs reason codes for sanctions review, FX funding, beneficiary-bank delay, correspondent rejection, cut-off mismatch, or missing information.

Fourth, which bank owns the correction path? Cross-border exceptions often fail because every participant sees only its own slice. A faster rail does not fix weak evidence exchange.

Fifth, what customer promise is allowed? Product, compliance, legal, and operations should agree the exact language before launch: "available instantly" is materially different from "domestic leg settles instantly."

Sixth, what does reconciliation prove? The ledger should join FedNow settlement timestamp, intermediary bank, correspondent reference, FX rate, beneficiary credit status, fees, and final delivery evidence.

## Why This Matters For Fintechs

Most fintechs will not connect directly to FedNow as depository institutions. Many will experience this through sponsor banks, processors, BaaS platforms, or correspondent partners. That makes the control contract more important.

A fintech product leader should ask the sponsor bank three questions: can cross-border FedNow-supported traffic be tagged, can exception states be exposed through APIs, and can sanctions or correspondent delays be separated from ordinary domestic payment failures?

If the answer is no, the fintech should not build a premium promise on top of the rail. It should build a conservative status model and a reconciliation proof path first.

## The Strategic Read

The FedNow proposal creates another real-time settlement option for the U.S. leg of cross-border payments. It may help private providers design faster, more resilient flows without waiting for a single global instant-payment network.

But the proposal also shows why cross-border modernization is rarely a pure rail story. The rail can be instant while the operating model remains batch-minded.

The decision test is simple: can the bank explain, in one case file, what happened across the FedNow leg, intermediary leg, correspondent leg, screening, FX, beneficiary credit, and final reconciliation?

If not, faster settlement will only make unclear ownership show up sooner.

Related proof paths: [push-payment network design](/blog/mastercard-send-visa-direct-push-payments/), [cross-border settlement warning signs](/blog/mbridge-cross-border-settlement-warning-shot/), and [SWIFT address cut-off programme risk](/blog/swift-november-2026-address-cutoff-product-problem/). For cross-border operating-model work, start at [/hire/](/hire/).

## FAQ

**Does the FedNow proposal make FedNow a full cross-border network?**

No. The proposal would allow FedNow participants to use non-Reserve Bank intermediaries, supporting private-sector cross-border solutions where FedNow settles the U.S. domestic portion.

**What is the biggest implementation risk?**

The biggest risk is promising instant cross-border delivery before real-time sanctions screening, message identification, exception handling, correspondent ownership, and beneficiary-credit evidence are ready.

## Sources

- [Federal Register: Regulation J FedNow intermediary-bank proposal](https://www.federalregister.gov/documents/2026/04/10/2026-06996/collection-of-checks-and-other-items-by-federal-reserve-banks-and-funds-transfers-through-the)
- [Federal Reserve: public-comment invitation on FedNow intermediaries](https://www.federalreserve.gov/newsevents/pressreleases/other20260408a.htm)
- [BPI and The Clearing House: comment on FedNow cross-border payments rule](https://bpi.com/bpi-and-tch-comment-on-fednow-cross-border-payments-rule/)
- [Federal Reserve Financial Services: FedNow Service overview](https://www.frbservices.org/financial-services/fednow)
