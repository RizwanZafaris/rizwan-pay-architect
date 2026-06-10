---
title: "Reconciling 270M+ Payments a Year with a Flat Ops Headcount"
category: payment-gateway
tags: [reconciliation, settlement-operations, finance-ops, automation, exception-management]
anonymized_entity: "a leading payment gateway in emerging markets"
---

## Challenge

Reconciliation at our gateway was spreadsheets at heroic scale. Every payment rail sent settlement files in its own format on its own schedule, breaks were investigated by hand, and month-end close consumed the operations team entirely. The forcing event was a headcount request: to keep up with volume growth, ops needed to double. The CFO's question was the right one: why does reconciliation headcount scale with transaction volume at all? My mandate became reconciling everything, keeping headcount flat, and committing to a settlement SLA we could actually defend to merchants and partners.

## Context

The gateway processed 270M+ payments a year and over $1B in annual GTV across cards, wallets, bank transfers, and carrier billing. Every partner had its own file format, cutoff, timezone, and habits: some delivered via SFTP, some via API, one still emailed CSVs, and several re-sent amended files days after the original. At our GTV, small percentage breaks were material money, and the company was committing to a 99.95% settlement SLA that the spreadsheet process could not honestly underwrite. Audit season made it worse, since evidence assembly was itself a manual project.

## Approach

We built a canonical internal ledger as the single source of truth, with ingestion adapters per partner normalizing every inbound file into it. Matching ran three ways: internal ledger against rail-side confirmations against settlement files, with tolerance rules for known fee and rounding behavior. Everything that matched flowed straight through. Everything that did not landed in an exception queue with typed break categories, timing, amount, missing, duplicate, and fee variance, each with an investigation playbook attached.

## Product Strategy

I treated reconciliation as a product with an SLA rather than a back-office chore. The north star was the auto-match rate, with time-to-close and break aging as supporting metrics, and the ops analysts as the users we designed for. The flat-headcount constraint was accepted upfront, which made automation rate the only viable path and ended the debate about hiring our way out. The key framing: exceptions are the product surface. The goal was never zero exceptions; it was that a human only ever looks at a real one.

## Execution

Amended files almost sank us. One bank partner re-sent corrected settlement files days later under the same filename, our first ingestion happily counted both, and for one alarming day finance believed we had a material surplus. We rebuilt ingestion to be idempotent and content-versioned, so a corrected file superseded rather than duplicated. Timezone and cutoff mismatches generated phantom breaks every month-end until we modeled each partner's cutoff explicitly instead of assuming calendar days meant the same thing everywhere. The human risk was as real as the technical one: the ops team initially read the project as their replacement. The turn came when we co-designed the exception queue with them, and their tribal knowledge, which partner shorts on which fee, which rail double-posts on holidays, became the playbooks the system runs on.

## Metrics

- 90% straight-through processing: matched and closed with no human touch
- 99.95% settlement SLA met
- Ops headcount flat while transaction volume scaled
- Month-end close compressed from days to hours
- Audit evidence generated from the ledger; PCI-DSS Level 1 and ISO 27001 audits passed without findings

## Results

Settlement disputes with partners became short conversations backed by transaction-level data instead of week-long archaeology. Finance began trusting daily positions rather than waiting for month-end. Merchants got settlement transparency in their dashboards, which quietly became a retention feature. Most durably, the canonical ledger became substrate: faster merchant settlement and partner performance scorecards were both built on it later, neither of which was in the original scope.

## Lessons Learned

Reconciliation is a data-contract problem before it is a matching problem; most of our breaks were definitional, not financial. Never treat a settlement file as final, because the file you reconciled yesterday can be amended tomorrow, and ingestion that is not idempotent will eventually lie to your CFO. The exception queue is where the product lives, so invest the design effort there rather than in the happy path. And bring ops in as designers rather than as the people being automated, because their pattern knowledge is the spec.

> How do you reconcile 270M+ payments a year without growing the team? Normalize every partner feed into one canonical ledger, match three ways automatically, and design for exceptions, because the settlement file you trusted yesterday can be amended tomorrow.
