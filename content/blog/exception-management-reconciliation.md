---
title: "Exception Management in Reconciliation"
slug: "exception-management-reconciliation"
category: "Settlement & Reconciliation"
subcategory: "Reconciliation"
metaTitle: "Exception Management in Payment Reconciliation | Rizwan Zafar"
metaDescription: "How to design exception management for payment reconciliation so finance ops scales sublinearly with GTV — taxonomy, routing, SLAs, and product feedback loops."
excerpt: "Exception management is where reconciliation either becomes a product or becomes a permanent ops queue."
publishDate: "2026-05-22"
readingTime: "9 min read"
tags: ["reconciliation", "operations", "exception management", "controls"]
targetAudience: ["Payments PMs", "Finance ops leaders"]
targetKeywords: ["reconciliation exception management", "payment break management", "reconciliation operations"]
relatedCaseStudies:
  - "/product-work/settlement-reconciliation"
relatedArticles:
  - "/blog/three-way-reconciliation-at-scale"
  - "/blog/reconciliation-is-product-infrastructure"
  - "/blog/ledger-design-for-multi-rail-payments"
---

# Exception Management in Reconciliation

Reconciliation engines find breaks. Exception management is what you do with them. Most platforms invest 80% of the budget in the engine and 5% in the exception workflow. That ratio is exactly backwards.

## The shape of the problem

At $1B+ GTV with multi-rail acceptance, 0.5–2% of transactions generate exceptions on any given day. Most are trivial — timing windows, fee variance within tolerance — and should auto-resolve. The remaining 5–15% of *those* are real money at risk.

Without a structured workflow, finance ops becomes a queue that grows with GTV. With one, the queue is bounded and shrinks quarter over quarter as defects feed back into product.

## Five principles

**1. Classify before routing.** Every break enters with an exception type from a versioned taxonomy. No untyped breaks reach a human queue.

**2. Auto-resolve aggressively but transparently.** Anything within tolerance, anything matching a known partner-side timing pattern, anything that clears on the next reconciliation cycle — auto-resolve and log. Never delete; always log with the resolution reason.

**3. Route by owner, not by team.** Each exception type has a named owner role (finance ops, partner ops, treasury, product engineering). Routing is automatic. SLAs are per-type, not per-team.

**4. Age, then escalate.** Every exception has a clock. Past SLA, it escalates to the type owner's manager. Past 2x SLA, it escalates to a daily standup. Past 3x SLA, it becomes a P1.

**5. Feed product weekly.** A weekly review of recurring exception types produces product tickets, not ops process changes. Process change is the fallback when product cannot fix root cause.

## The workflow

A working exception management workflow has five states:

1. **Detected** — engine logs the break with classification
2. **Auto-resolved** — within tolerance or known-pattern, closed automatically
3. **Pending owner review** — routed to owner queue with SLA clock
4. **In partner escalation** — owner has reached out to PSP, bank, or merchant; clock paused
5. **Closed** — resolved with documented reason and journal entry, or written off with approval

Each state transition is a logged event. The full lifecycle is queryable for audit.

## Tooling

You do not need a fancy platform to start. The minimum viable stack:

- A breaks table in your data warehouse, partitioned by type and date
- A dashboard per owner role with aging breakdown
- A workflow tool (Linear, Jira, or built-in) for the manual queue
- A weekly trend report sent to product, finance, and ops leadership

Buy or build a dedicated reconciliation platform only after you understand the shape of your exceptions. Otherwise you will buy the wrong thing.

## Write-offs

Some exceptions cannot be resolved. Stale partner-side credits, vanished webhooks for transactions no one remembers, fractional FX drift below collection threshold. Write-offs need:

- A policy with a per-transaction and aggregate monthly cap
- Dual approval above the threshold
- A monthly write-off report to the CFO
- A trend line that should go down over time, not up

A growing write-off line is a product defect, not a finance event.

## What to instrument

- Exception detection rate by type
- Auto-resolution rate (target >70% by month 6)
- Mean time to resolve by type
- Aged exception value at risk
- Write-off rate as % of GTV (target <1 bps)
- Product tickets opened from reconciliation findings

## Operator lens

A finance ops team that grows linearly with GTV is a sign that exception management was never built. A finance ops team that grows sublinearly while GTV doubles is a sign that the loop from reconciliation back into product is actually closing.

---

Related: [Three-Way Reconciliation at Scale](/blog/three-way-reconciliation-at-scale) · [Ledger Design for Multi-Rail Payments](/blog/ledger-design-for-multi-rail-payments)
