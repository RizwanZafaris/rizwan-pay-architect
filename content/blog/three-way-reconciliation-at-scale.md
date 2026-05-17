---
title: "Three-Way Reconciliation at Scale"
slug: "three-way-reconciliation-at-scale"
category: "Settlement & Reconciliation"
subcategory: "Reconciliation"
metaTitle: "Three-Way Reconciliation at Scale: A Practitioner Guide | Rizwan Zafar"
metaDescription: "How to design three-way reconciliation across PSP, internal ledger and bank statement at $1B+ GTV, match keys, tolerances, exception taxonomy, and SLAs."
excerpt: "Three-way reconciliation is the only model that survives multi-rail growth. Here is how to actually build it."
publishDate: "2026-05-20"
readingTime: "10 min read"
tags: ["reconciliation", "settlement", "ledger", "controls", "payment infrastructure"]
targetAudience: ["Payments PMs", "Finance leaders", "Platform engineers"]
targetKeywords:
  [
    "three-way reconciliation",
    "payment reconciliation architecture",
    "settlement reconciliation",
    "PSP reconciliation",
  ]
relatedCaseStudies:
  - "/product-work/settlement-reconciliation"
  - "/product-work/settlement-reconciliation"
relatedArticles:
  - "/blog/reconciliation-is-product-infrastructure"
  - "/blog/exception-management-reconciliation"
  - "/blog/ledger-design-for-multi-rail-payments"
---

# Three-Way Reconciliation at Scale

Two-way reconciliation, comparing your ledger to a PSP report, is what most platforms ship first. It works until you grow. At scale, the only model that holds is three-way: PSP, internal ledger, bank statement, matched against a common transaction identity.

## Why two-way breaks

Two-way tells you the PSP agrees with your records. It does not tell you the money actually moved into your bank account. The gap between "PSP says settled" and "bank credited" is where unreconciled cash, FX shortfalls, partner deductions and rolling reserves silently accumulate.

At $1B+ GTV, even a 5 bps unreconciled drift is a $500K hole per year. Two-way reconciliation cannot find it. Three-way can.

## The three legs

**Leg 1, PSP report.** Per-transaction status, gross, fee, net, settlement batch, settlement date.

**Leg 2, Internal ledger.** Every authorisation, capture, refund, chargeback, fee accrual posted as double-entry journal lines, keyed by your own transaction ID.

**Leg 3, Bank statement.** MT940/MX camt.053 or API feed of actual credits and debits into the settlement account, with PSP batch references in the narrative.

Reconciliation is the function that proves all three agree on every transaction and every settlement batch, every day.

## Match keys

The single biggest design choice is the match key. Most failed reconciliation systems chose the wrong one early and never recovered.

- **Per-transaction match**, use your internal txn_id, propagated to the PSP via metadata and surfaced back in the report. This is the gold standard.
- **Per-batch match**, use the PSP batch ID and reconcile aggregates. Necessary for the bank leg. Sufficient only when the PSP guarantees batch immutability.
- **Heuristic match**, amount + date + last-4 + currency. Use only as a last-resort fallback for legacy rails.

Always store the chosen match key, the matched counterpart IDs, and the match confidence score on the ledger entry. Auditors will ask.

## Tolerances

A 0.00 tolerance is impossible at scale because of FX rounding, fractional fees and timing. Define tolerance bands explicitly:

- Currency rounding: ±0.01 in settlement currency
- FX timing: ±0.5% on cross-border legs, escalated above
- Fee variance: ±2% on declared rate cards, escalated above
- Anything else: zero tolerance, treated as an exception

Document the band, who can change it, and require dual approval to widen it. This is a control surface, not a config.

## Exception taxonomy

Every break must classify into a finite, versioned taxonomy. A working starter set:

1. PSP-only (in PSP, not in ledger), usually webhook loss
2. Ledger-only (in ledger, not in PSP), usually duplicate capture or test data
3. Amount mismatch within tolerance, auto-resolve, log
4. Amount mismatch outside tolerance, manual review
5. Status mismatch (e.g. PSP says refunded, ledger says captured)
6. Bank-only credit, partner payout, refund return, or unknown
7. Bank shortfall, PSP claims settled, bank shows less
8. Timing, settled in PSP, not yet in bank, within expected window
9. Stale timing, outside expected window, escalate to PSP

Each exception type has an owner, an SLA, and a runbook. Without those, reconciliation becomes a queue, not a process.

## SLAs

- T+1 for card and wallet reconciliation
- T+2 for cross-border and DCB
- T+5 for chargebacks and reversals
- All exceptions older than SLA flow into a daily review dashboard owned by finance ops, with weekly product review of root causes

## Feedback loop into product

The point of reconciliation is not to clear breaks. It is to eliminate the _categories_ of breaks. Every recurring exception type should produce a product ticket:

- Webhook loss → idempotent webhook handler + reconciliation backfill job
- Duplicate capture → idempotency key enforcement at the API
- Status mismatch → state machine review
- Tolerance widening → renegotiate rate card or fix FX timing

When reconciliation feeds product, the exception backlog shrinks quarter over quarter. When it does not, you are paying ops to clean up the same defects forever.

## What to instrument

- % auto-matched per rail (target >99% after 90 days)
- Mean time to clear exception by type
- Aged exception value at risk
- Recurring root-cause count, trending down
- Reconciliation lag (T+n actually achieved)

## Operator lens

The signal that reconciliation is healthy is not "all green dashboards". It is "the exception taxonomy keeps shrinking". A team that proudly clears 5,000 breaks a day is a team that has built a queue, not a product.

---

Related: [Reconciliation Is Product Infrastructure](/blog/reconciliation-is-product-infrastructure) · [Exception Management](/blog/exception-management-reconciliation) · [Case study: Reconciliation & Ledger Controls](/product-work/settlement-reconciliation)
