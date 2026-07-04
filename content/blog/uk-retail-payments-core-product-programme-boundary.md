---
title: "UK Payments Draws the Right Boundary Between Core Rails and Products"
slug: "uk-retail-payments-core-product-programme-boundary"
category: "Program Management"
metaTitle: "UK Payments: Separate Core Rails From Product Rules"
metaDescription: "The UK's new retail-payments model separates one core infrastructure from product-level rules. That boundary can make or break the programme."
excerpt: "The UK proposes one core clearing and messaging scheme with competitive product arrangements above it. Delivery depends on explicit interfaces and decision rights."
publishDate: "2026-07-04"
readingTime: "8 min read"
experiment: "operator story"
tags:
  - UK retail payments
  - programme governance
  - payments infrastructure
  - product schemes
  - payment migration
  - operating model
targetAudience:
  - Payments programme leaders
  - Infrastructure product executives
  - Fintech PMOs
  - Scheme and regulator teams
targetKeywords:
  - UK retail payments infrastructure
  - payments programme governance
  - core payment infrastructure scheme
  - product level arrangements
relatedArticles:
  - "/blog/gov-uk-pay-adyen-1000-service-migration"
  - "/blog/raid-steerco-pmo-stack-that-ships"
  - "/blog/vendor-governance-fintech-pmo"
  - "/blog/reconciliation-is-product-infrastructure"
---

# UK Payments Draws the Right Boundary Between Core Rails and Products

The UK's next-generation retail-payments programme has made a useful architectural decision before the architecture is final: separate the shared core from the products that compete above it.

On 2 July 2026, the Payments Vision Delivery Committee published an [illustrative update on future roles and responsibilities](https://www.gov.uk/government/publications/national-payments-vision/payments-vision-delivery-committee-update-roles-and-responsibilities-in-the-future-retail-payments-ecosystem). It describes one core clearing and messaging infrastructure, governed by a single core scheme and operator, with multiple product-level arrangements supporting journeys such as Direct Debit, instant payments, and account-to-account payments at the point of sale.

The document is not policy or regulatory guidance, and several market decisions remain open. The boundary still shows where standardisation is essential and competition should remain possible.

## The Short Answer

**A national payment programme should centralise the rules required for safe exchange, settlement, access, resilience, and interoperability. It should leave customer propositions, journey design, and differentiated services to product-level arrangements, provided those products meet explicit interface, liability, protection, and operating standards.**

If the boundary remains vague, every product decision escalates into the core programme and every infrastructure dependency becomes someone else's problem. If the boundary is executable, teams can move in parallel without creating an ungovernable collection of exceptions.

## One Core Does Not Mean One Product

The July update describes the core as the shared messaging and clearing layer. Subject to consultation, it could also include utility services such as directories, confirmation of payee identity, and alias services. Final settlement between customers of different private-money issuers would remain in central-bank money at the Bank of England.

The core scheme would set rules for participation, access, standards, settlement, resilience, risk, conduct, and governance. One operator would manage the scheme and infrastructure.

Product-level arrangements would govern journeys across several providers, including initiation, protection, disputes, liability, incentives, branding, acceptance, and service levels.

The core moves information and determines obligations consistently. Product arrangements turn those capabilities into propositions customers and merchants can use at scale.

## Turn The Boundary Into Five Contracts

A programme cannot operate on a diagram alone. The separation needs contracts that delivery teams can test.

1. **Capability contract:** message types, directories, settlement interfaces, time windows, availability, throughput, and data retention.
2. **Data contract:** ISO 20022 usage, identifiers, status semantics, errors, fraud and dispute data, and versioning.
3. **Risk and liability contract:** responsibility for unauthorized payments, scams, technical failures, duplicates, refunds, disputes, and participant default.
4. **Service contract:** uptime, recovery, response time, incident communication, settlement finality, support, and escalation.
5. **Change contract:** release notice, backward compatibility, certification, emergency change, and deprecation.

These contracts are the real programme boundary. Without them, “core” and “product” remain labels.

## Decision Rights Matter More Than Committees

The [Bank of England's Retail Payments Infrastructure Board](https://www.bankofengland.co.uk/payment-and-settlement/the-national-payments-vision/retail-payments-infrastructure-board) is translating the national vision into a high-level design. Its Design Authority is intended to shape requirements and a blueprint before handover to the Delivery Company. The current consultation remains open until 11 September 2026.

That structure creates at least four decision domains:

- the PVDC sets strategic outcomes and ecosystem direction;
- the RPIB and Design Authority shape the high-level core design;
- the Delivery Company builds and runs the delivery programme;
- product arrangements and participants design and operate specific payment journeys.

The PMO should publish a decision-rights matrix before design choices multiply. For every cross-boundary question, name who proposes, approves, and must be consulted, plus the evidence that closes the decision. The [RAID and SteerCo stack](/blog/raid-steerco-pmo-stack-that-ships) works only when risks and decisions have named owners, dates, and consequences.

## Run Two Portfolios With One Dependency Map

The programme needs core and product-readiness portfolios.

The core portfolio should track architecture, procurement, build, resilience, security, settlement, certification, transition, and operational readiness. The product portfolio should track use-case rules, customer protection, participant adoption, merchant acceptance, commercial viability, support, and communications.

They should share one dependency map. For example, account-to-account point-of-sale payments may depend on core instant-payment capability, directory or alias services, product-level branding, interoperable acceptance, fraud controls, dispute rules, and a sustainable merchant proposition. No single workstream owns the outcome.

Critical journeys may still need common standards and broad participation to reach national scale. The programme must expose those coordination points without centralising every product choice.

## Commercial Sustainability Is A Delivery Requirement

The update expects the core to operate as a utility and critical national infrastructure. Membership and participation fees may fund cost recovery, resilience, maintenance, renewal, and long-term investment. Product arrangements may use different commercial models above it.

The business model cannot wait until after technical design. Model volume, participant mix, operating costs, resilience investment, product-scheme fees, and adoption scenarios early. Open access that is commercially unsustainable will not remain open.

[Vendor governance](/blog/vendor-governance-fintech-pmo) applies even when the “vendors” include public bodies, schemes, operators, banks, fintechs, and delivery partners. Each dependency needs an accountable counterparty and a funded operating obligation.

## Migration Must Prove The Separation

The boundary will be tested during transition, not in the target-state diagram.

Each migrating product needs an inventory of current rules, interfaces, obligations, settlement and reconciliation, disputes, and communications. Decide which elements move into the core scheme, remain in product arrangements, or should be retired.

Run vertical pilots through both layers. Prove a full customer journey, participant processing, clearing, settlement, exceptions, reconciliation, support, and recovery. A core message test proves connectivity, not a viable payment product.

The recent [GOV.UK Pay provider migration](/blog/gov-uk-pay-adyen-1000-service-migration) offers the same lesson at a smaller scope: common platform abstraction reduces service-level change, but it does not remove onboarding, money movement, reconciliation, and operating readiness.

## What Programme Leaders Should Do Now

Create a core-versus-product responsibility map and attach it to every consultation response, requirement, and design decision.

Build the five contracts. Establish the decision-rights matrix. Separate the two portfolios but join their dependencies. Add commercial and migration evidence to architecture gates. Define the minimum end-to-end journey that each pilot must prove.

Maintain a live list of unresolved boundary decisions. Ambiguity becomes duplicated design, delayed certification, inconsistent protection, and late escalation.

If you are governing a payment-infrastructure or platform transformation, [contact Rizwan](/contact) to turn architecture boundaries, decision rights, migration controls, and operating readiness into one executable programme.

## Actionable Takeaway

The UK's proposed model has the right instinct: one interoperable core should not become one national product team.

Centralise what the ecosystem must share. Make the interfaces testable. Let products compete above the core within explicit protection, liability, access, and service rules. Then govern the dependencies with named decision rights.

The debate for programme leaders is where the boundary should sit. The failure mode is allowing nobody to own it.

## FAQ

**What did the UK Payments Vision Delivery Committee publish on 2 July 2026?**

It published an illustrative update on roles and responsibilities around the future retail-payments core infrastructure. The document is intended to inform consultation and is not policy or regulatory guidance.

**What is a product-level arrangement?**

It is a common set of rules and operating processes for a payment journey offered by multiple providers, including initiation, liability, protection, disputes, acceptance, and commercial considerations.

**Why should programme teams separate core and product portfolios?**

The core and journeys have different deliverables and owners, but their dependencies must be managed together to prove an end-to-end service.
