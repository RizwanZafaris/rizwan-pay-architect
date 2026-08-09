---
title: "The Bank of England Just Turned Payment Vendor Risk Into a Programme Gate"
slug: "boe-payment-third-party-risk-programme-gates"
category: "Program Management"
metaTitle: "Bank of England Payment Third-Party Risk Gates"
metaDescription: "The Bank of England's 2026 IOREP rules show why payment programmes need gates for material vendors, incidents, registers, and exit plans."
excerpt: "The Bank of England's updated third-party and incident reporting framework turns payment-system vendor risk into a programme-delivery gate, not a procurement appendix."
publishDate: "2026-08-09"
readingTime: "7 min read"
experiment: "framework hook"
tags:
  - Bank of England
  - payment systems
  - third-party risk
  - programme management
  - operational resilience
  - vendor governance
targetAudience:
  - Programme directors
  - Payments PMO leads
  - Vendor governance teams
  - Fintech executives
targetKeywords:
  - Bank of England third party risk payment systems
  - IOREP payment programme governance
  - payment vendor risk programme gates
  - operational resilience payment systems
relatedArticles:
  - "/blog/vendor-governance-fintech-pmo"
  - "/blog/baringa-uk-payments-migration-delivery-gates"
  - "/blog/project-management-fintech-regulatory-programmes"
  - "/product-work/tapmad-digital-transformation-programme"
---

# The Bank of England Just Turned Payment Vendor Risk Into a Programme Gate

Most payment programmes treat vendor risk as a procurement workstream.

That is too late and too narrow.

The [Bank of England's updated supervisory statement](https://www.bankofengland.co.uk/paper/2026/ss/updated-outsourcing-and-third-party-risk-management-ss-recognised-payment-system-operators) for recognised payment system operators and specified service providers was published on 18 March 2026 and takes effect on 18 March 2027. It explains how payment-system operators should manage outsourcing and third-party risk, including governance, risk management, record keeping, due diligence, written agreements, data security, audit rights, sub-outsourcing, business continuity, and exit strategies.

The delivery message is simple: material third-party dependency is now a programme gate.

## The Short Answer

**Payment programmes should not pass design, vendor, go-live, or operate gates unless the team can show which third parties support important business services, what would happen if they fail, who owns the risk, and how incidents or material changes will be reported.**

The RAID register alone will not satisfy that bar.

## What Changed

The Bank's broader [IOREP policy statement](https://www.bankofengland.co.uk/paper/2026/ps/operational-resilience-operational-incident-and-outsourcing-and-third-party-reporting-for-fmis) sets a reporting framework for financial market infrastructures. It includes operational incident reporting, notification of new or significantly changed material third-party arrangements, and an annual register of material third-party arrangements.

The Bank says the rules take effect on 18 March 2027 and are part of a joint approach with the PRA and FCA. It also says reports will be submitted through FCA platforms.

The FCA's own [material third-party arrangements page](https://www.fca.org.uk/firms/outsourcing-and-operational-resilience/reporting-material-third-party-arrangements) points in the same direction for regulated firms: from 18 March 2027, the regulator expects more structured information about material third-party dependencies.

This is not only a compliance calendar item. It changes how payment change should be sequenced.

## Why Payment Programmes Are Exposed

Payments are built from dependencies.

A card acquiring flow may involve the merchant platform, payment gateway, acquirer processor, card network, issuer, 3DS provider, fraud engine, token service, cloud provider, observability stack, support tooling, dispute workflow, reconciliation system, and settlement bank.

An account-to-account or bank-transfer flow has a different dependency chain, but the problem is the same. The user sees one payment. The programme depends on many services staying inside tolerance.

The Bank's statement is especially relevant because it expects payment-system operators to understand risks to the end-to-end flow of payments. It also highlights cloud connectivity among participants, concentration risk, important business services, impact tolerances, materiality, and accountability.

That language should make programme leaders uncomfortable in a useful way.

If a delivery plan has a go-live date but cannot show the end-to-end dependency map, the plan is incomplete.

## The Programme Gates I Would Use

I would add four gates to any payment migration, cloud-connectivity change, processor switch, or critical vendor onboarding.

**Gate 1: Important-service map.** Name the payment service that matters to end users. Map the people, process, technology, data, facilities, and third parties needed to keep it inside tolerance.

**Gate 2: Materiality decision.** Decide whether each third party is material. Do not let procurement own this alone. Product, engineering, risk, compliance, operations, finance, and legal should agree the failure consequence.

**Gate 3: Contract and evidence pack.** For material dependencies, the agreement should cover service scope, data security, access and audit rights, sub-outsourcing, business continuity, exit, incident obligations, reporting, and accountable owners.

**Gate 4: Operate-ready register.** Before go-live, the team should have a live register, incident contacts, reporting workflow, test evidence, exit assumptions, resilience evidence, and a named owner for annual refresh.

These gates are not bureaucracy if they stop a launch that cannot explain its dependencies.

## The Trade-Off

There is a delivery cost.

Mapping dependencies, reviewing materiality, tightening agreements, and building reporting workflows will slow some programmes. That is not automatically failure. The alternative is moving fast with an unmeasured third-party chain, then discovering during an outage that no one knows which provider failed, what tolerance was breached, whether the regulator must be notified, or who can approve the workaround.

Payment systems do not fail politely. They fail into merchants, banks, customers, treasury teams, support desks, and sometimes the wider market.

The programme decision is whether to pay the governance cost before launch or the incident cost after launch.

## How PMO Should Change

The PMO should not become the owner of all third-party risk. That belongs with accountable business, technology, risk, and compliance owners.

The PMO should own the rhythm.

It should make the dependency map visible, keep gate evidence current, force unresolved materiality questions to decision, and prevent green status when the third-party evidence is not ready. It should also keep the annual-register obligation from becoming a scramble 11 months after go-live.

The best PMO move is to connect the RAID register to the material third-party register. A dependency without impact tolerance, owner, due diligence, exit path, or incident route is not a dependency. It is an unpriced delivery risk.

## What To Do Before March 2027

The runway is short enough to matter and long enough to use well.

For any UK payment system, processor, gateway, core payments platform, or regulated fintech programme with material third-party dependencies, I would run a 30-day inventory now:

- list important payment services;
- map third parties and sub-outsourcing chains;
- classify materiality and concentration risk;
- identify missing contract rights and exit assumptions;
- test incident-reporting workflow;
- assign evidence owners;
- create the register that will survive go-live.

Do not wait for a regulatory-reporting team to translate this later. The delivery team has the facts.

The decision test is direct: if a cloud provider, processor, fraud vendor, gateway, data provider, or service desk fails on launch day, can the programme show the affected payment service, impact tolerance, owner, incident path, regulator trigger, customer workaround, and exit option?

Relevant proof paths: [vendor governance in fintech PMO](/blog/vendor-governance-fintech-pmo/), [UK payments migration gates](/blog/baringa-uk-payments-migration-delivery-gates/), and [regulatory programme management](/blog/project-management-fintech-regulatory-programmes/). For help building delivery gates that survive payment-system scrutiny, start at [/contact/](/contact/).

## FAQ

**Who is the Bank of England statement relevant to?**

It is relevant to recognised payment system operators and specified service providers under the Bank's payment-system oversight framework, with the updated expectations taking effect on 18 March 2027.

**What should programme leaders change now?**

They should add explicit gates for important-service mapping, materiality decisions, contract evidence, incident reporting, annual registers, business continuity, and exit readiness.

## Sources

- [Bank of England: updated outsourcing and third-party risk management supervisory statement](https://www.bankofengland.co.uk/paper/2026/ss/updated-outsourcing-and-third-party-risk-management-ss-recognised-payment-system-operators)
- [Bank of England: IOREP policy statement for FMIs](https://www.bankofengland.co.uk/paper/2026/ps/operational-resilience-operational-incident-and-outsourcing-and-third-party-reporting-for-fmis)
- [FCA: Reporting material third-party arrangements](https://www.fca.org.uk/firms/outsourcing-and-operational-resilience/reporting-material-third-party-arrangements)
