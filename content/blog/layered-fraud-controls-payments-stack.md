---
title: "Layered Fraud Controls in the Payments Stack"
slug: "layered-fraud-controls-payments-stack"
category: "Fraud & Risk"
subcategory: "Fraud"
metaTitle: "Layered Fraud Controls in the Payments Stack | Rizwan Zafar"
metaDescription: "How to design layered fraud controls across device, identity, transaction, behavioural and network layers — without crushing conversion or throughput."
excerpt: "No single fraud control survives a determined attacker. Layered controls do, and they do it without crushing conversion."
publishDate: "2026-05-28"
readingTime: "9 min read"
tags: ["fraud", "risk", "payment infrastructure", "controls"]
targetAudience: ["Risk leaders", "Payments PMs"]
targetKeywords: ["layered fraud controls", "payment fraud architecture", "fraud prevention layers"]
relatedCaseStudies:
  - "/product-work/fraud-risk-aml-cft"
  - "/product-work/simpaisa-payment-infrastructure"
relatedArticles:
  - "/blog/chargebacks-product-problem"
  - "/blog/aml-cft-rules-vs-models"
  - "/blog/regulatory-ux-name-on-payment-screen"
---

# Layered Fraud Controls in the Payments Stack

Fraud teams that rely on a single control — a model, a 3DS challenge, a velocity rule — lose to determined attackers within a quarter. The teams that hold up over years run layered defenses, each layer cheap on conversion, each layer covering a different attack class.

## The five layers

A working stack has five layers, applied in order:

1. **Device and connection.** Device fingerprint, IP reputation, ASN class, headless-browser detection, geo consistency, time-of-day patterns. Cheap, fast, runs on every request.

2. **Identity and account.** Email age and reputation, phone tenure, address normalisation, prior account linkage. Runs at signup and at first transaction.

3. **Transaction.** Amount profile, merchant category, BIN risk, currency, basket composition, card-on-file age, velocity across cards, devices, addresses.

4. **Behavioural.** Typing cadence, form interaction patterns, navigation paths, anomaly detection against the user's own baseline. Runs in the background.

5. **Network.** Cross-platform consortia, card-testing pattern detection, mule-account graphs, sanctions and PEP overlays.

Each layer rejects, flags, or steps up. The decision is composable — no layer makes a unilateral block except for hard policy violations.

## Step-up beats block

Hard blocks are expensive. They cause false-positive damage and they teach attackers exactly where your threshold is. Step-up authentication — 3DS, OTP, biometric, document re-verification — is almost always the better intermediate response.

A working step-up policy:

- Low-risk → frictionless
- Medium-risk → silent step-up (network token, risk-based 3DS)
- High-risk → explicit challenge (OTP, biometric)
- Very-high-risk → manual review or decline

The risk score is composed across all five layers. Tune step-up thresholds per vertical and per geography.

## Rules and models, both

The "rules vs models" debate is unproductive. Production fraud stacks need both:

- **Rules** for known patterns, regulatory requirements, and explainability to ops. They are auditable, debuggable, and fast.
- **Models** for emerging patterns, multi-feature interactions, and adaptive scoring. They cover what rules miss.

Run them in parallel. Use the rule outcome when explainability matters (chargeback representment, regulator audit, merchant dispute). Use the model when sensitivity matters (catching novel attacks early).

## Card testing — a special case

Card testing is the single most common attack on new platforms. Pattern: high volume of low-value attempts against a single merchant or BIN, often from many IPs.

Specific controls:

- Per-IP attempt cap with exponential backoff
- Per-BIN attempt cap across merchants
- Per-merchant decline rate cap, with automatic throttling
- Velocity decay on email and device fingerprints
- Sandboxing of new merchants for the first 1,000 transactions

These five controls alone block 80–90% of card testing without a model in sight.

## Account takeover

ATO is harder because the credentials are valid. The signal is in behaviour change:

- New device + new geo + new beneficiary within minutes
- Sudden change in transaction profile
- Session resumed from a different ASN class
- Password change followed by withdrawal attempt

Step-up rather than block, escalate on confirmed signals, freeze and notify on confirmed compromise.

## Feedback loops

Every fraud control needs a feedback loop:

- Chargeback outcomes feed back to score the original decision
- Manual review outcomes feed back to retrain the model
- New attack patterns produce new rules within 24 hours
- Quarterly review of false positives per control

A control without a feedback loop drifts. Within six months it is either too tight or too loose.

## What to instrument

- Fraud rate by vertical, per cohort
- False positive rate per control
- Step-up rate and pass rate
- Time-to-detect on novel patterns
- Manual review queue depth and SLA
- Chargeback rate, trending

## Operator lens

The cheapest fraud control is the one you ship before you need it. The most expensive one is the one you ship after a regulator asks. Layered defenses are not a project — they are a posture, maintained continuously, reviewed every quarter against new attack patterns.

---

Related: [Chargebacks Are a Product Problem](/blog/chargebacks-product-problem) · [AML/CFT: Rules vs Models](/blog/aml-cft-rules-vs-models)
