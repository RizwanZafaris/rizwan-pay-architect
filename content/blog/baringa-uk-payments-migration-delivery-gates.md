---
title: "Baringa's UK Payments Migration Shows Why Delivery Gates Matter"
slug: "baringa-uk-payments-migration-delivery-gates"
category: "Program Management"
metaTitle: "UK Payments Migration: Delivery Gates That Work"
metaDescription: "Baringa's UK payments-hub migration case shows why regulated programmes need delivery gates, dependency control, live proving, and exit plans."
excerpt: "The useful lesson is not that a bank migrated a payments hub. It is that gates, evidence, dependencies, and exit planning made the change governable."
publishDate: "2026-07-09"
readingTime: "7 min read"
experiment: "operator story"
tags:
  - payments migration
  - programme governance
  - delivery gates
  - operational resilience
  - Faster Payments
  - PMO
targetAudience:
  - Programme directors
  - Payments transformation leaders
  - PMO teams
  - Bank technology executives
targetKeywords:
  - payments migration delivery gates
  - UK bank payments hub migration
  - regulated programme governance
  - payments transformation PMO
relatedArticles:
  - "/blog/gov-uk-pay-adyen-1000-service-migration"
  - "/blog/raid-steerco-pmo-stack-that-ships"
  - "/blog/uk-retail-payments-core-product-programme-boundary"
  - "/blog/vendor-governance-fintech-pmo"
---

# Baringa's UK Payments Migration Shows Why Delivery Gates Matter

Payments migrations do not fail because a steering committee lacked slides.

They fail because nobody can prove readiness when the programme enters the dangerous part.

[Baringa published a 22 June 2026 case study](https://www.baringa.com/en/impact/case-studies/legacy-to-leading-edge/) about a UK high-street bank moving its core payments hub to a newly created group-owned third-party provider. Baringa describes it as a first-of-its-kind migration for a UK high-street bank, designed to improve resilience, simplify operations, and move toward cloud-ready payments while meeting regulatory expectations.

The detail that should get a programme leader's attention is not the word "cloud." It is the delivery model: seven delivery gates across Faster Payments, roughly 30 million monthly payments migrated through new technologies, an end-to-end technology roadmap, consolidated metrics and controls, and PRA-compliant exit-planning uplift.

That is a serious programme pattern.

## The Short Answer

**A regulated payments migration needs gates that prove operational readiness, not status meetings that describe progress. Each gate should test a specific risk: dependency alignment, non-functional readiness, operational support, reconciliation, regulatory evidence, live proving, and exit planning. If the programme cannot produce evidence at the gate, it is not ready to move the payment flow.**

Baringa does not name the bank, provider, or internal architecture. The operator lesson is therefore about governance design, not vendor selection.

## Gates Are Evidence, Not Ceremony

Many programmes use gates as calendar checkpoints. The team presents a deck, leaders ask questions, a few amber items are noted, and the programme moves on because the date is politically important.

That is not a gate. That is a meeting.

A real gate has entry criteria, exit criteria, owners, evidence, failure conditions, and an escalation path. It exists because moving to the next stage increases risk.

For Faster Payments or any critical rail, the gate should force the programme to answer practical questions:

- Do business and technology teams agree on the scope being moved?
- Are upstream and downstream dependencies ready?
- Has performance been tested at realistic volume?
- Can operations detect, triage, and recover incidents?
- Can finance reconcile the new flow?
- Has customer-impact handling been rehearsed?
- Is the fallback or exit path documented and credible?

The programme should not need executive confidence. It should earn it with evidence.

## Third-Party Migration Changes The Risk Shape

Baringa says the migration moved a core payments hub to a group-owned third-party provider. That phrase matters.

The risk is not only "will the new platform work?" It is "can the bank govern an important payment capability when delivery and operation cross organisational boundaries?"

The [PRA's SS2/21 outsourcing and third-party risk management expectations](https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/outsourcing-and-third-party-risk-management-ss) make that operating posture explicit for PRA-regulated firms: governance, risk management, business continuity, and exit planning are not optional decorations around third-party dependencies.

That makes [vendor governance](/blog/vendor-governance-fintech-pmo) a programme control, not a procurement appendix.

That is why exit planning belongs inside the migration, not after go-live.

If the new provider relationship becomes stressed, the bank still has to protect important business services. A credible exit plan should explain which services are affected, what data and access are required, how the bank would continue or migrate the service, who owns the decision, and what conditions trigger the plan.

## The PMO Needs One Truth, Not More Reporting

Baringa says the programme used a single real-time view of risks, issues, and dependencies. That sounds basic, but it is usually where large programmes drift.

Payments migrations cross too many teams for fragmented reporting to survive:

- channel owners;
- payment hub teams;
- fraud and sanctions controls;
- operations;
- finance and reconciliation;
- service management;
- vendor delivery;
- security;
- data and reporting;
- regulatory engagement;
- customer support.

Each team can be locally green while the programme is globally amber.

The PMO's job is to expose the integration risk. Not to collect optimistic updates. Not to polish the status color. The useful PMO view connects dependency, decision, risk, issue, test result, customer impact, operational readiness, and accountable owner.

That is the difference between [a RAID stack that ships](/blog/raid-steerco-pmo-stack-that-ships) and a RAID log that nobody trusts.

## Five Gates I Would Require

For a payments-hub migration, I would not rely on one generic go/no-go meeting. I would run at least five gates.

### 1. Scope And Dependency Gate

Confirm which payment types, channels, customers, settlement flows, reports, and operational teams are included. Freeze the migration slice. Identify every upstream and downstream dependency with an accountable owner.

### 2. Functional And Data Gate

Prove message transformation, validation, routing, exception handling, reference data, reporting, reconciliation files, and customer notifications. Payment correctness is not only "the transaction moved." It is "the right data moved and can be explained."

### 3. Non-Functional Gate

Prove volume, latency, resilience, observability, recovery, security controls, and batch or cutover timing. A payment platform that works in a demo can still fail under peak or degraded conditions.

### 4. Operational Readiness Gate

Prove runbooks, incident ownership, support handoffs, finance procedures, customer scripts, fraud/risk escalation, and supplier governance. Operations should not be introduced to the system on go-live weekend.

### 5. Live Proving And Exit Gate

Run controlled live traffic, reconcile it, monitor defects, prove customer handling, and confirm fallback or exit decision rights. This is where confidence becomes evidence.

## What To Measure After Go-Live

The first month after migration is not a celebration period. It is a control period.

Track:

- payment success and rejection reasons;
- latency by channel and payment type;
- exception ageing;
- reconciliation breaks;
- incident volume and mean time to restore;
- customer contacts;
- manual workarounds;
- third-party SLA performance;
- regulatory evidence pack completeness;
- backlog of defects deferred from migration.

A good migration reduces operational risk over time. A bad one hides it in manual work, support calls, and finance adjustments.

If you are running a payment migration, [work with Rizwan](/contact) to build the gate model, dependency map, readiness evidence, PMO controls, and live proving plan before the programme reaches the irreversible stage.

## Actionable Takeaway

The Baringa case is useful because it points to a disciplined truth: regulated payments migrations are governed through evidence.

Delivery gates are not bureaucracy when they protect a critical rail. They are the mechanism that tells leadership whether the next step is ready, reversible, and operationally understood.

The debate for programme leaders is simple: are your gates proving readiness, or are they just giving everyone a date to present status?

## FAQ

**What did Baringa describe?**

Baringa described a UK high-street bank migrating its core payments hub to a group-owned third-party provider, including seven Faster Payments delivery gates and roughly 30 million monthly payments moved through new technologies.

**Why are gates important in payments migrations?**

Each migration stage increases operational risk. Gates force evidence on dependencies, testing, resilience, reconciliation, support, regulatory readiness, and exit planning before payment flows move.

**What should a PMO measure after go-live?**

Measure payment success, latency, exceptions, reconciliation breaks, incidents, support contacts, manual workarounds, third-party service performance, and unresolved migration defects.
