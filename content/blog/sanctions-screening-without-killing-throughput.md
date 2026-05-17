---
title: "Sanctions Screening Without Killing Throughput"
slug: "sanctions-screening-without-killing-throughput"
category: "Fraud & Risk"
subcategory: "Sanctions"
metaTitle: "Sanctions Screening Without Killing Throughput | Rizwan Zafar"
metaDescription: "How to design sanctions screening that catches what it must catch without flooding ops with false positives or breaking real-time transaction performance."
excerpt: "Sanctions screening is a latency problem and a false-positive problem dressed up as a compliance problem."
publishDate: "2026-06-01"
readingTime: "8 min read"
tags: ["sanctions", "screening", "compliance", "AML"]
targetAudience: ["Compliance leaders", "Risk leaders", "Payments PMs"]
targetKeywords:
  ["sanctions screening", "real-time sanctions screening", "sanctions false positives"]
relatedCaseStudies:
  - "/product-work/fraud-risk-aml-cft"
relatedArticles:
  - "/blog/aml-cft-rules-vs-models"
  - "/blog/swift-aml-cft-sanctions-screening"
  - "/blog/kyb-automation-without-blowing-up-risk"
---

# Sanctions Screening Without Killing Throughput

Sanctions screening fails in two directions. Too loose, and prohibited parties transact through your platform. Too tight, and ops drowns in false positives while real transactions miss settlement windows. The middle is engineered, not bought.

## The shape of the problem

Sanctions lists are public, but matching is hard. The same person appears with different transliterations, spellings, dates of birth, and middle names. The list itself updates daily. Your screening must:

- Match across name variations, scripts, and orderings
- Run in real time at transaction screening points
- Run in batch for daily re-screening of the entire customer base
- Maintain audit trails for every screening decision
- Tune match confidence to balance precision and recall
- Stay current with list updates within hours

Throwing a vendor at it without understanding the levers gives you a system that either misses real hits or buries ops under false ones.

## Screen at the right points

Not every event needs full screening. A working policy:

- **Onboarding** — full screening on all parties (entity, UBOs, directors, signatories)
- **Daily re-screening** — full screening on the active customer base against the latest lists
- **Transaction screening** — counterparty screening for cross-border, beneficiary screening for payouts, originator screening for incoming wires
- **Event triggers** — re-screen on UBO change, jurisdiction change, list addition

Domestic, low-risk, low-value transactions between already-screened parties do not need transaction-time screening. Build the policy so this is explicit, not implicit.

## Match algorithms

Different match types catch different things:

- **Exact match** — too tight, misses almost everything real
- **Phonetic match** (Soundex, Metaphone) — catches transliterations within a script
- **Tokenised match** with edit distance — catches typos and word reordering
- **Cross-script transliteration** (Arabic ↔ Latin, Cyrillic ↔ Latin) — non-negotiable for cross-border
- **Date-of-birth corroboration** — sharply reduces false positives when DOB is available
- **Address and nationality corroboration** — secondary signals to confirm or refute

A modern screening engine combines several. The match score is composed, not single-source. Tune the threshold for each list separately — OFAC SDN, UN, EU, UK HMT, and your jurisdiction's local list often have different precision characteristics.

## False positive reduction

A screening engine that produces 5% false positives on transaction screening is unworkable at scale. Specific reductions:

- **Allow-listing** — confirmed-clear matches do not re-alert on identical re-screens
- **DOB-aware scoring** — penalise score when DOB available and mismatched
- **Common-name de-prioritisation** — common names require higher score for alert
- **Field-aware matching** — match company name to entity records, person name to individual records, not cross-matched

Each of these is a tuning lever, owned by compliance with documented thresholds.

## The review queue

When a hit happens, ops needs:

- Side-by-side display of customer record vs list entry
- All available corroborating fields
- Search across related accounts
- Decision options: clear, escalate, freeze, file SAR
- Auto-applied disposition on clear with documented rationale
- All actions logged immutably

Queue tiering applies here too: L1 clears obvious false positives, L2 handles partial matches, L3 handles confirmed or near-confirmed hits.

## Latency

Real-time screening must run inside the transaction approval path without blowing the latency budget. Practical targets:

- p50 < 50ms
- p95 < 200ms
- p99 < 500ms

Achieving this requires the screening cache, the list index, and the matching engine to live in the same region as the transaction service. A screening call across regions to a third-party API in the hot path will not meet these numbers.

## What to instrument

- Screening latency p50/p95/p99
- Alert volume per list per day
- Clear rate, escalation rate, freeze rate
- Time-to-clear on alerts
- List currency (time from official update to in-system)
- Audit trail completeness on a sampled basis

## Operator lens

Sanctions screening is one of the few areas where regulators actively test the design. Your control is judged not only by its outcomes but by the engineering choices behind it. A defensible program writes those choices down, reviews them quarterly, and adjusts them with documented rationale.

---

Related: [AML/CFT Rules vs Models](/blog/aml-cft-rules-vs-models) · [SWIFT, AML/CFT and Sanctions Screening](/blog/swift-aml-cft-sanctions-screening)
