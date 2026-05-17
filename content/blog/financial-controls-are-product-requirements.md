---
title: "Financial Controls Are Product Requirements, Not Compliance Afterthoughts"
slug: "financial-controls-are-product-requirements"
category: "Settlement & Reconciliation"
metaTitle: "Financial Controls Are Product Requirements | Rizwan Zafar"
metaDescription: "Why financial controls — segregation of duties, audit trails, maker-checker, reversals — are product requirements, not compliance afterthoughts."
excerpt: "If your audit trail is reconstructed from logs, you do not have controls. You have archaeology."
publishDate: "2026-05-26"
readingTime: "9 min read"
tags: ["financial controls", "audit", "SOX-like", "segregation of duties", "ledger", "compliance"]
targetAudience: ["Fintech CFOs", "Platform PMs", "Audit + compliance"]
targetKeywords:
  [
    "financial controls fintech",
    "audit trail payment platform",
    "segregation of duties payments",
    "maker checker payments",
  ]
relatedCaseStudies:
  - "/product-work/settlement-reconciliation"
relatedArticles:
  - "/blog/reconciliation-is-product-infrastructure"
  - "/blog/three-way-reconciliation-at-scale"
---

# Financial Controls Are Product Requirements.

Every payment platform eventually meets an external auditor. The platforms that pass that meeting are the ones that built controls as product requirements from the start. The platforms that fail it are the ones that ship features and reconstruct controls from logs the night before fieldwork.

I have stood up the financial-control side of a payments platform processing $1B+ GTV, reconciled across cards, wallets, IBFT, DCB, and bank rails, and walked external auditors through the system. The lesson is consistent: controls are not a compliance overlay. They are a product surface that, if missing, will eventually cost the company the license to operate.

## Table of contents

- The compliance overlay trap
- What "financial controls" actually means in software
- Segregation of duties as a product feature
- The maker-checker pattern
- Reversals, adjustments, and the principle of explicit movement
- Audit trails that survive scrutiny
- Why this matters to regulators and partners
- Rizwan's operator lens
- Key takeaways
- FAQ

## The compliance overlay trap

The default failure pattern: engineering ships features, finance and compliance write policies, and a quarter before audit someone discovers the policies do not match the code. A scramble follows. Controls are described in documents, demonstrated in slides, and not enforced in the platform.

This works once. By the second audit, the auditor asks for evidence of operation, not evidence of policy. At that point, the only acceptable answer is "the platform enforces this and here is the log."

Controls are software requirements. Treat them as one.

## What "financial controls" actually means in software

For a payments platform, the controls that matter most are:

- **Segregation of duties.** No single human can both initiate and approve a movement above defined thresholds.
- **Maker-checker.** Every privileged action has two named actors, recorded with timestamps and intent.
- **Authorization limits.** Every actor and every API key has explicit, enforceable limits.
- **Audit trail.** Every state-changing action is recorded with the actor, the input, the resulting state transition, and the precise time.
- **Reconciliation.** Every transaction is three-way matched, with exceptions typed and tracked.
- **Reversals.** Every reversal posts as an explicit, additive entry — never as a mutation of the original record.
- **Access reviews.** Every privileged role is reviewed on a known cadence, with revocation logged.

Each of these is a product feature with a backlog ticket, a test, and a runtime enforcement point. None of them are documents.

## Segregation of duties as a product feature

The pattern that works at scale is role-typed authorization in the platform itself:

- The role of "initiator" can submit a payout request.
- The role of "approver" can approve a payout request.
- The role of "viewer" can read but neither submit nor approve.
- The platform enforces — at the API and at the UI — that the same actor cannot occupy both initiator and approver for the same request.

This is not a Jira workflow. It is a constraint enforced by the platform on every call. The auditor's question is "show me a payout where the same user did both," and the correct answer is "the platform makes that impossible."

## The maker-checker pattern

Maker-checker is the simplest, most universally accepted control pattern in finance software. Implementation requirements:

- Every privileged action has a pending state.
- A second, distinct actor moves the action from pending to executed.
- The platform records both actors, both timestamps, and the exact payload.
- Time-based escalation is explicit (after N hours, pending → expired, not pending → executed).

Done well, maker-checker is invisible to the merchant and bulletproof to the auditor. Done badly, it is a "comments" field in a spreadsheet.

## Reversals, adjustments, and the principle of explicit movement

The single most common control failure: a customer support agent edits a transaction to fix a problem.

The correct pattern is the principle of explicit movement: every change to money is an additive, posted entry. A reversal is a new entry that offsets the original. An adjustment is a new entry with an explicit reason code. The original record is never mutated.

This sounds heavy-handed. It is the only way the platform can answer the auditor's hardest question: "what was the state of this transaction on this exact date and time?"

## Audit trails that survive scrutiny

A real audit trail has four properties:

1. **Append-only.** No record is mutated or deleted; corrections are additive.
2. **Actor-attributed.** Every entry names the human or service that produced it.
3. **Intent-captured.** Every entry records why, not just what.
4. **Independently queryable.** The audit log is reachable without going through the production application.

If the audit trail is reconstructed from application logs, it is not an audit trail. It is archaeology.

## Why this matters to regulators and partners

Central banks, sponsoring banks, and scheme compliance teams evaluate fintech platforms on the operability of their controls — not on the existence of their policies. A platform that demonstrates segregation of duties, maker-checker, and an append-only audit trail at the click of a button is a platform that gets license renewals and partner expansions.

The opposite — a platform that produces evidence in PDFs the night before an audit — is a platform whose license, sponsorship, or scheme registration is one finding away from suspension.

## Rizwan's operator lens

The work at Simpaisa that produced the cleanest audits was not a compliance project. It was a platform project. The team modeled controls as first-class entities — roles, limits, maker-checker pairs, posted entries — and surfaced them in the same admin console the ops team used every day. The auditor's first walkthrough took ninety minutes instead of three days. The cost saved in audit time was real. The cost saved in incident risk was larger.

## Key takeaways

- Financial controls are product requirements, not compliance overlays.
- Segregation of duties and maker-checker must be enforced by the platform, not policy.
- The principle of explicit movement: every change to money is an additive posted entry.
- Audit trails are append-only, actor-attributed, intent-captured, and independently queryable.
- Regulators and partners evaluate operability, not policy.

## FAQ

**Do small fintechs need this?** Yes, from day one for the maker-checker pattern. The cost of retrofitting after the first incident is far higher than the cost of building it in.

**Is an immutable ledger required?** Append-only is required. Cryptographic immutability is helpful but not the only acceptable implementation.

**Where do most platforms first fail an audit?** Reversals implemented as mutations of the original record, and missing actor attribution on admin actions.

---

### LinkedIn teaser

> If your audit trail is reconstructed from application logs, you do not have controls. You have archaeology.
>
> Controls are product requirements. The platforms that pass audits are the ones that shipped them on sprint one.
