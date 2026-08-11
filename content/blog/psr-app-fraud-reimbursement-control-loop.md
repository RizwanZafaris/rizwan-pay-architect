---
title: "PSR APP Fraud Data Turns Reimbursement Into A Payments Control Loop"
slug: "psr-app-fraud-reimbursement-control-loop"
category: "Fraud & Risk"
metaTitle: "PSR APP Fraud Reimbursement Control Loop"
metaDescription: "PSR APP fraud data shows UK payment firms need reimbursement, claims evidence, receiving-bank controls, CoP, and scam-source data in one loop."
excerpt: "The PSR's latest APP fraud evidence moves beyond consumer-protection coverage. It turns Faster Payments reimbursement into a measurable operating loop across sending PSPs, receiving PSPs, Pay.UK, Confirmation of Payee, claim handling, scam-source data, and board-level fraud controls."
publishDate: "2026-08-11"
readingTime: "7 min read"
experiment: "UK market data-led hook"
tags:
  - PSR
  - APP fraud
  - Faster Payments
  - Confirmation of Payee
  - fraud operations
  - UK payments
targetAudience:
  - UK payments leaders
  - Fraud operations teams
  - Faster Payments PSPs
  - Fintech CPOs
targetKeywords:
  - PSR APP fraud reimbursement
  - Faster Payments APP scam controls
  - APP fraud control loop
  - UK payment fraud reimbursement data
relatedArticles:
  - "/blog/mastercard-scam-merchant-monitoring-acquirer-operations"
  - "/blog/uk-open-banking-billion-payments-product-scorecard"
  - "/blog/baringa-uk-payments-migration-delivery-gates"
  - "/product-work/fraud-risk-aml-cft"
---

# PSR APP Fraud Data Turns Reimbursement Into A Payments Control Loop

The UK's APP fraud regime is moving from launch problem to operating problem.

In July 2026, the PSR said Frontier Economics' independent review found that the APP reimbursement policy has reduced APP fraud losses by an estimated GBP73 million per year and cut the number of APP scams by nearly 35,000. The same PSR update said reimbursement rates for all claims rose from 54% to 65%, while in-scope policy claims are now being reimbursed at 97%.

The important question is whether the reimbursement regime is making firms better at stopping scam money before it leaves the ecosystem, not only better at returning money after the damage.

## The Short Answer

**UK payment firms should treat APP reimbursement as a fraud-control loop, not a claims-cost line. The useful operating model joins payment initiation, Confirmation of Payee, receiving-bank risk, claim triage, evidence exchange, reimbursement timing, root-cause analysis, and scam-source data into one measurable system.**

If those pieces sit in separate teams, the policy can reimburse victims and still leave the prevention loop weak.

## What Changed In The Evidence

The PSR's 30 July 2026 reimbursement dashboard gives a clearer view of the operating baseline. It covers closed APP scam claims from UK Faster Payments between 1 April 2025 and 31 March 2026.

Over the 18 months from 7 October 2024 to 31 March 2026, the PSR says 88% of money lost to APP scams was reimbursed to victims, equal to GBP316 million. Consumers reported about 438,300 claims, with 301,500 in scope for reimbursement. The dashboard also says 82% of claims were closed within five business days and 98% within 35 business days.

It also creates a new management burden. A board can ask which scam types are rising, which receiving accounts keep appearing, where claims breach the five-day or 35-day handling windows, and whether reimbursement cost is feeding prevention controls.

The policy has moved from "are we compliant?" to "what did the claim data teach us?"

## Why This Is A Payment-System Control

APP scams are different from card disputes because the customer authorized the payment. The receiving account may be real. The payment may settle quickly. The fraud decision often depends on context outside the payment message: the story the customer believed, the payee name, the account history, the device journey, the platform where the scam started, and whether the receiving PSP should have spotted mule-account behavior.

That is why reimbursement cannot be owned only by customer operations.

The PSR's APP scams page makes the incentive design explicit: Faster Payments and CHAPS account-to-account payments are covered, sending and receiving firms split reimbursement costs 50:50, and most victims should be reimbursed within five business days, with additional protection for vulnerable customers.

That design changes the receiving-bank problem. Fraud controls need to run on both sides of the payment. Sender-side warnings are not enough if the receiver side has weak mule detection, poor account monitoring, or slow evidence exchange.

## The Operating Loop I Would Build

For a PSP exposed to Faster Payments APP claims, I would make one owner accountable for the end-to-end loop.

The loop should start before the payment: Confirmation of Payee behavior, beneficiary risk, account age, velocity, prior claim linkage, scam-pattern detection, and intervention rules that are tested against false positives.

It should then attach the claim record to the same control surface: scam type, vulnerable-customer flag, disputed facts, receiving PSP response, account-freeze decision, funds recovered, reimbursement value, liability split, cap treatment, and reason code.

The final step is the one that matters most: which control changed before the next payment?

Claims teams are often measured on closure. Fraud teams are measured on loss. Product teams are measured on journey completion. Compliance teams are measured on rule adherence. The APP regime needs a shared scorecard, or every function will optimize its own slice.

## August 2026 Is A Policy Design Window

The PSR's APP scams policy roadmap says August 2026 is a stakeholder-engagement period before a formal consultation planned for December 2026. The stated consultation scope includes claims that cannot be resolved within 35 business days, returns from investment under the policy, future fraud performance data, compliance reporting, consumer standard of caution, civil disputes, me-to-me transactions, and data on platforms and services used by fraudsters.

That list shows where the live operating model is still being stress-tested: slow claims, investment-scam treatment, the boundary between fraud and civil disputes, and whether the payment sector can keep treating scam origin as someone else's problem.

For operators, this is the moment to collect evidence from the actual workflow. Which claim categories are slow? Which receiving PSP interactions are weak? Which platform-origin data is missing? Which customer communications produce confusion? Which warnings protect customers without blocking legitimate payments?

Regulatory engagement is stronger when it comes from measured process pain, not generic policy preference.

## Pay.UK Is The Infrastructure Layer

The policy also depends on Pay.UK execution.

The PSR deadlines page says Pay.UK placed the reimbursement requirement into Faster Payments rules, monitors compliance, and provides operational systems for claims communication and reporting. Pay.UK's 2024 annual report adds that Confirmation of Payee covers 99% of transactions made to a new payee through Faster Payments and that Pay.UK launched the Reimbursement Claims Management System for APP fraud reporting and claims management.

That means the operating surface is rulebook plus directory plus claim-management rails plus reporting data plus name-checking coverage.

The product question becomes: can a firm join those infrastructure signals to its own customer, account, risk, and case-management data?

If not, the firm may comply manually while missing the bigger prevention signal.

## The Scorecard

For a UK PSP, I would run the APP fraud scorecard in five sections: customer outcome, sender controls, receiver controls, evidence quality, and loop closure.

The first four are familiar. The last one is the maturity test. It asks whether closed claims changed warning copy, onboarding rules, receiving-account monitoring, evidence exchange, platform-source reporting, or board review of residual exposure.

## What I Would Do Next

If I were running this inside a PSP, I would pick 50 closed APP claims from the last quarter and map each one end to end: payment initiation, warning, CoP result, receiving account, claim handling, evidence exchange, reimbursement decision, recovery action, and control change.

Then I would ask one uncomfortable question: which claims produced no prevention change?

Those are the expensive ones. The victim may have been reimbursed, but the system learned nothing.

Related proof paths: [acquirer scam-merchant operations](/blog/mastercard-scam-merchant-monitoring-acquirer-operations/), [UK open banking scale scorecards](/blog/uk-open-banking-billion-payments-product-scorecard/), and [UK payments migration gates](/blog/baringa-uk-payments-migration-delivery-gates/). For fraud-control scorecards, start at [/hire/](/hire/).

## FAQ

**What is APP fraud?**

APP fraud happens when a person is deceived into authorizing a payment to a fraudster or to an account controlled by a fraudster.

**Why does the PSR reimbursement policy matter to PSPs?**

It changes incentives. Sending and receiving firms share reimbursement cost, Pay.UK monitors compliance through Faster Payments rules, and claim data can expose weak prevention controls.

## Sources

- [PSR: Payment fraud falls by GBP73m following PSR reimbursement scheme](https://www.psr.org.uk/news-and-updates/latest-news/news/payment-fraud-falls-by-73m-following-psr-reimbursement-scheme/)
- [PSR: APP scams reimbursement dashboard for Q1 2026](https://www.psr.org.uk/information-for-consumers/app-scams-reimbursement-dashboard/)
- [PSR: APP scams policy roadmap](https://www.psr.org.uk/our-work/app-scams/app-scams-policy-roadmap/)
- [PSR: Deadlines for firms](https://www.psr.org.uk/our-work/app-scams/deadlines-for-firms/)
- [Pay.UK: Annual Report and Financial Statements 2024](https://www.wearepay.uk/wp-content/uploads/2025/07/2024-Annual-Report-and-Financial-Statements.pdf)
