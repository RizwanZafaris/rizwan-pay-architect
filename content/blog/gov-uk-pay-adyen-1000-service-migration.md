---
title: "GOV.UK Pay's Adyen Migration Is a 1,000-Service Programme"
slug: "gov-uk-pay-adyen-1000-service-migration"
category: "Program Management"
metaTitle: "GOV.UK Pay's 1,000-Service Adyen Migration"
metaDescription: "GOV.UK Pay's move from Stripe to Adyen shows how to govern a 1,000-service payment migration without breaking user journeys or finance controls."
excerpt: "Moving roughly 1,000 public services to a new payment provider is a portfolio migration across identity, settlement, reconciliation, support, and release governance."
publishDate: "2026-06-30"
readingTime: "8 min read"
experiment: "operator story"
tags:
  - GOV.UK Pay
  - Adyen
  - payment migration
  - programme governance
  - public sector payments
  - reconciliation
targetAudience:
  - Payments programme leaders
  - Fintech PMOs
  - Platform migration teams
  - Public sector digital leaders
targetKeywords:
  - GOV.UK Pay Adyen migration
  - payment provider migration programme
  - PSP migration governance
  - payment platform cutover
relatedArticles:
  - "/blog/raid-steerco-pmo-stack-that-ships"
  - "/blog/vendor-governance-fintech-pmo"
  - "/blog/three-way-reconciliation-at-scale"
  - "/blog/settlement-windows-and-merchant-trust"
---

# GOV.UK Pay's Adyen Migration Is a 1,000-Service Programme

Changing a payment provider is usually described as an integration project.

That description stops working at 1,000 services.

On 2 June 2026, the Government Digital Service said [GOV.UK Pay would begin moving around 1,000 non-Crown services from Stripe to Adyen](https://gds.blog.gov.uk/2026/06/02/building-for-the-future-making-change-simple-on-gov-uk-pay/). The affected organisations include local authorities, police forces, armed forces, and other public bodies. Central government, the NHS, and arm's-length bodies remain on Worldpay.

The stated user promise is demanding: no interruption, no loss of functionality, and ideally no discernible difference for the person paying.

That is not a gateway swap. It is a portfolio migration across service owners, merchant onboarding, KYC, payment states, reporting, settlement, reconciliation, support, and incident response.

## The Short Answer

**A payment-provider migration at this scale should be governed as a repeatable migration product, not as 1,000 separate projects. The programme needs a standard readiness contract, service segmentation, evidence-based cutover gates, automated financial reconciliation, and a central control tower that can stop expansion when customer or money movement deviates.**

The best migration is invisible to users because its operating controls are highly visible to the programme team.

## The Unit of Delivery Is Not “The Integration”

GOV.UK Pay already places a common layer between public services and the underlying provider. A service creates a payment through the platform API, sends the user to a GOV.UK Pay payment page, and later checks the payment state. That abstraction should reduce the amount each service must change.

It does not remove the migration work underneath.

Each service can still differ by legal entity, bank account, transaction profile, refund behaviour, reporting metadata, operational owner, support model, digital-wallet configuration, and reconciliation process. A council-tax service and a police-service payment may share an API but carry different operational risks.

The programme therefore needs two delivery views at the same time:

- a platform release that changes provider behaviour centrally;
- a service migration that proves each organisation is ready to receive and reconcile money under the new arrangement.

If the programme tracks only code deployment, it will miss the financial and organisational cutover.

## Segment Before Sequencing

One migration wave should not mix every type of service.

I would segment the portfolio by at least six factors: transaction volume, payment-method mix, refund complexity, settlement account structure, reconciliation maturity, and operational criticality. Add KYC readiness because GDS explicitly notes that the migration must satisfy Know Your Customer requirements.

That produces useful cohorts:

- low-volume, standard card services with clean ownership;
- high-volume services with mature reporting and support;
- services with complex refunds or multiple settlement accounts;
- services that need pay by bank;
- services with weak KYC evidence or unclear operational owners;
- critical services where even a short disruption creates public harm.

Start with representative but recoverable services. A pilot made only of easy accounts proves the migration mechanism, not the operating model. A pilot made only of the hardest services creates unnecessary risk.

This is where the programme should apply the [RAID and SteerCo discipline](/blog/raid-steerco-pmo-stack-that-ships): risks must be written as observable failure modes, not broad status colours.

## Build a Readiness Contract

Every service should pass the same minimum contract before cutover.

The technical section should cover API compatibility, payment and refund paths, webhook or polling behaviour, wallets, failure states, idempotency, monitoring, and rollback. GOV.UK Pay's own [testing guidance](https://docs.payments.service.gov.uk/testing_govuk_pay/) distinguishes live and sandbox behaviour and recommends stubs for automated integration tests. That matters because a provider migration cannot depend on manual happy-path testing.

The financial section should prove bank-account ownership, payout configuration, fee treatment, settlement reporting, transaction exports, and opening-balance reconciliation.

The operational section should name the service owner, support contact, incident route, customer-communication owner, and the person authorized to accept or reject cutover.

The evidence should be machine-readable where possible. “Tested” is not a gate. A passed payment suite, reconciled settlement file, confirmed account, approved KYC pack, and signed rollback decision are gates.

## Reconciliation Is the Cutover Truth

A successful authorization does not prove a successful migration.

GOV.UK Pay's [reporting documentation](https://docs.payments.service.gov.uk/reporting/) shows why. Services need transaction outcomes, fees, payout information, settlement dates, metadata, and bank-account matching. The provider change can alter the shape and timing of those operational records even when the user-facing payment succeeds.

For every wave, I would require a three-part reconciliation:

1. payment requests and final transaction states;
2. provider settlement records and fees;
3. cash received in the organisation's bank account.

Exceptions should be aged, owned, and capped before the next wave expands. This is the same reason [three-way reconciliation](/blog/three-way-reconciliation-at-scale) belongs in the product design: migration velocity without money certainty is not progress.

## Run a Control Tower, Not a Status Meeting

The central team needs a near-real-time view of each wave.

Useful measures include payment success by service, provider errors, user abandonment, refund success, payout delay, unreconciled value, KYC exceptions, support contacts, and rollback readiness. Compare them with a pre-migration baseline rather than with an arbitrary green threshold.

Set explicit stop conditions. If payment success falls, settlement data does not reconcile, or support incidents exceed tolerance, pause the wave. Do not let a calendar date overrule evidence.

[Vendor governance](/blog/vendor-governance-fintech-pmo) also matters here. Adyen, GOV.UK Pay, public-service owners, finance teams, and support operations need one shared incident and decision model. “The provider is investigating” is not an owner or a recovery plan.

## The Operator Takeaway

The programme design should make complexity repeatable.

Create a service inventory. Segment it. Define one readiness contract. Automate the evidence. Migrate in waves. Reconcile money before expanding. Give the control tower authority to stop.

The user should not notice a provider migration. Finance and operations should be able to explain every payment before, during, and after it.

If you are planning a payment-platform migration, [contact Rizwan](/contact) to turn vendor change, service readiness, reconciliation, and cutover risk into one executable programme model.

The debate point is simple: should a programme measure success by services moved, or by services moved with customer behaviour, settlement, and support remaining inside tolerance?

Only the second measure is honest.

## FAQ

**What is GOV.UK Pay changing?**

GOV.UK Pay said it will move around 1,000 non-Crown public services from Stripe to Adyen for card payments and pay by bank. Services using Worldpay are not part of this change.

**Why is this more than a technical integration?**

Each service also needs KYC, bank-account setup, reporting, settlement, reconciliation, support, and cutover ownership. Those differences make it a portfolio programme.

**What should a PSP migration programme gate on?**

Gate on tested payment and refund paths, approved KYC, confirmed settlement configuration, reconciled money, named operational owners, monitoring, and a workable rollback decision.
