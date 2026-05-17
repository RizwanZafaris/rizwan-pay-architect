---
title: "Ledger Design for Multi-Rail Payments"
slug: "ledger-design-for-multi-rail-payments"
category: "Settlement & Reconciliation"
subcategory: "Ledger"
metaTitle: "Ledger Design for Multi-Rail Payment Platforms | Rizwan Zafar"
metaDescription: "How to design a double-entry payment ledger that holds across cards, wallets, IBFT, DCB and cross-border rails at $1B+ GTV, entities, postings, and invariants."
excerpt: "The ledger is the source of truth for the entire platform. Most teams discover this after they have shipped the wrong one."
publishDate: "2026-05-23"
readingTime: "11 min read"
tags: ["ledger", "double-entry", "reconciliation", "payment infrastructure"]
targetAudience: ["Payments PMs", "Platform engineers", "Finance leaders"]
targetKeywords:
  [
    "payment ledger design",
    "double-entry ledger payments",
    "multi-rail ledger",
    "fintech ledger architecture",
  ]
relatedCaseStudies:
  - "/product-work/settlement-reconciliation"
  - "/product-work/simpaisa-payment-infrastructure"
relatedArticles:
  - "/blog/three-way-reconciliation-at-scale"
  - "/blog/reconciliation-is-product-infrastructure"
  - "/blog/financial-controls-are-product-requirements"
---

# Ledger Design for Multi-Rail Payments

A payment platform without a canonical ledger is a collection of integrations pretending to be a system. The ledger is the only artifact that lets you answer "where is the money right now?", at any scale, across any rail, on any day.

## The shape of a working ledger

A working ledger has four invariants. Break any one and the rest of the platform pays for it forever.

1. **Double-entry.** Every event produces equal-and-opposite debits and credits across at least two accounts. No single-entry shortcuts, ever.
2. **Append-only.** Postings are immutable once written. Corrections are new postings with reversal references, not edits.
3. **Multi-currency at the entry.** Every line carries the transaction currency, the settlement currency, and the FX rate used. Do not convert at read time.
4. **Idempotent.** A duplicate event produces zero new postings. The idempotency key lives on the posting batch, not on the engine.

If your current ledger violates any of these, fix that first. Everything else is downstream.

## Account model

A useful chart of accounts for a multi-rail payments platform contains at least:

- **Merchant payable**, money owed to each merchant, per currency
- **PSP receivable**, money owed to us by each PSP, per partner, per currency
- **Bank cash**, actual cash in our settlement accounts, per bank, per currency
- **Fee revenue**, accrued and settled fees, per rail, per merchant tier
- **Refund liability**, outstanding refund obligations
- **Chargeback reserve**, risk hold against pending chargebacks
- **FX gain/loss**, realised and unrealised FX
- **Rolling reserve**, per-merchant reserve held against risk
- **Float**, intentional and unintentional float, separately tracked

Every transaction touches at least three of these. The set is finite. Resist the temptation to create a new account per partner, instead, model the partner as a dimension on existing accounts.

## Posting patterns

A successful card capture in a cross-border corridor produces, at minimum:

```
Dr  PSP receivable (merchant currency, gross)
Cr  Merchant payable (merchant currency, gross - fee)
Cr  Fee revenue (merchant currency, fee)
```

When the PSP settles:

```
Dr  Bank cash (settlement currency, net of FX)
Cr  PSP receivable (merchant currency, gross)
Dr/Cr FX gain/loss (the difference)
```

When the merchant is paid out:

```
Dr  Merchant payable (merchant currency)
Cr  Bank cash (settlement currency, net of payout FX)
Dr/Cr FX gain/loss
```

Document the posting pattern for every transaction type, capture, refund, chargeback, fee accrual, reserve hold, reserve release, partner adjustment. New rails get reviewed against this catalogue before launch.

## The single biggest mistake

The single biggest mistake teams make is using the PSP's transaction ID as the primary key for ledger postings. Do not. Use your own transaction ID, generated at the API boundary, and store the PSP ID as a foreign reference.

The reason is simple: you will change PSPs, switch routing, and add fallback rails. Your ledger must survive every one of those without a migration.

## Read patterns

The ledger answers four questions in production:

1. **What is each merchant's available balance right now?**, sum of merchant payable, net of pending refunds and reserves
2. **What does each PSP owe us right now?**, open PSP receivable balance, aged
3. **What is in each bank account right now?**, bank cash balance, reconciled to bank feed
4. **What is the platform P&L this month?**, fee revenue minus FX loss minus write-offs

Build these as materialised views, refreshed on every posting. Do not compute them on demand from event scans.

## Performance

A ledger that handles 25M+ monthly transactions does roughly 100M+ postings per month. The pattern that scales:

- Append-only postings table partitioned by date
- Per-account running balance maintained transactionally with each posting
- Daily snapshot table for fast historical reads
- Cold storage rollover after 13 months, with on-demand rehydration

## Operator lens

The ledger you can explain to your CFO on a whiteboard in 10 minutes is the ledger that will survive your platform's growth. The ledger that requires a 40-slide deck is the one that will be rebuilt in 18 months.

---

Related: [Three-Way Reconciliation at Scale](/blog/three-way-reconciliation-at-scale) · [Financial Controls Are Product Requirements](/blog/financial-controls-are-product-requirements)
