---
title: "AML/CFT: Rules vs Models, and Why You Need Both"
slug: "aml-cft-rules-vs-models"
category: "Fraud & Risk"
subcategory: "AML/CFT"
metaTitle: "AML/CFT: Rules vs Models, and Why You Need Both | Rizwan Zafar"
metaDescription: "Where rules belong, where models belong, and how to design an AML/CFT detection stack that is both defensible to regulators and effective at catching real bad actors."
excerpt: "Rules are explainable and weak. Models are powerful and unexplainable. Production AML needs both, layered."
publishDate: "2026-05-31"
readingTime: "9 min read"
tags: ["AML", "CFT", "compliance", "fraud", "risk"]
targetAudience: ["Compliance leaders", "Risk leaders", "Payments PMs"]
targetKeywords: ["AML rules vs models", "AML transaction monitoring", "CFT detection design"]
relatedCaseStudies:
  - "/product-work/fraud-risk-aml-cft"
relatedArticles:
  - "/blog/layered-fraud-controls-payments-stack"
  - "/blog/sanctions-screening-without-killing-throughput"
  - "/blog/swift-aml-cft-sanctions-screening"
---

# AML/CFT: Rules vs Models, and Why You Need Both

The AML/CFT detection debate runs in cycles. The current cycle says "models are the future, rules are legacy". The previous cycle said "models are unexplainable, rules are defensible". Both are partly right. Production AML needs both, layered.

## What each is good at

**Rules** encode known typologies. Velocity, threshold, jurisdiction, beneficiary patterns, structuring detection. They are:

- Explainable to regulators line-by-line
- Auditable in plain language
- Easy to debug and tune
- Cheap to operate
- Weak against novel patterns
- Easily reverse-engineered by sophisticated actors

**Models** encode latent patterns across many features. Graph-based account linking, behavioural anomaly detection, peer-group deviation. They are:

- Strong against novel patterns
- Capture multi-feature interactions humans miss
- Improve with data
- Difficult to explain at decision level
- Risky to deploy as the sole decision authority
- Drift if not monitored

The answer is not to pick one. It is to design a stack where each plays its strength.

## A workable architecture

Three layers:

1. **Hard rules** — regulatory thresholds, structuring detection, sanctions, PEP, jurisdiction prohibitions. Block or escalate. No model overrides allowed.

2. **Risk scoring** — combined output of rule-based scores and model-based scores into a single risk band. Drives review prioritisation, step-up, enhanced due diligence.

3. **Investigation tooling** — visualisations, network graphs, peer-group comparison. Models surface candidates. Humans investigate and decide.

Hard rules are deterministic. Risk scoring is probabilistic. Investigation is human. Each layer has its own owner and its own metrics.

## Explainability matters at the decision boundary

Regulators care about the decisions you act on, not the scores you compute. A model can drive prioritisation without driving the decision itself, as long as the final action is grounded in observable evidence captured by a human analyst with a documented rationale.

This is the architectural trick that lets models live in production without an explainability crisis: the model accelerates, humans decide, the decision is explainable.

## Tuning the rules

Hard rules need quarterly review. Without it they drift either too loose (catching nothing) or too tight (drowning ops in false positives). A working review:

- Look at every rule's hit rate, true positive rate, and false positive rate
- Look at every typology not currently covered, against recent enforcement actions in your jurisdiction
- Add, retire, or retune rules with documented justification
- Test the changes in shadow mode for 30 days before promotion

Skip this and the rule book becomes archaeology.

## Monitoring the models

Models need continuous monitoring. The non-negotiable set:

- Drift detection on input features
- Score distribution monitoring per cohort
- Outcome feedback from investigation results
- Performance bands by geography, vertical, and merchant tier
- Quarterly retraining with fresh outcome labels
- Annual model risk review with external validation

A model in production without these is a regulatory finding waiting to happen.

## Suspicious activity reports

SAR/STR filing is downstream of all of this. The quality of your filings is the regulator's view of the quality of your program. Make sure:

- Every filing has a clear typology hypothesis, not just "unusual activity"
- Filings include the rule or model that triggered, plus the human rationale
- Filings link to all related accounts and transactions
- Filings cite the underlying evidence (KYC, transaction history, prior alerts)

Volume of filings is not a quality signal in either direction. Some regulators read low volume as under-detection; others read high volume as defensive over-filing. The narrative quality is what they actually grade.

## What to instrument

- Rule hit rates, TP/FP per rule
- Model score distributions, drift indicators
- Investigation queue depth, ageing, throughput
- SAR/STR filing rate and acceptance rate
- Mean time from alert to filing decision
- Regulatory inquiry response time

## Operator lens

The teams that fail AML inspections are not the ones with simple rule books or basic models. They are the ones whose program cannot explain, in plain language, why the controls are what they are. The architecture above is defensible because each layer answers a different question and the answers fit together.

---

Related: [Sanctions Screening Without Killing Throughput](/blog/sanctions-screening-without-killing-throughput) · [SWIFT, AML/CFT and Sanctions Screening](/blog/swift-aml-cft-sanctions-screening)
