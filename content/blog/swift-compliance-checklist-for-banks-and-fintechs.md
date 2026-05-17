---
title: "A SWIFT Compliance Checklist for Banks and Fintechs"
slug: "swift-compliance-checklist-for-banks-and-fintechs"
category: "SWIFT & Cross-Border Payments"
metaTitle: "SWIFT Compliance Checklist for Banks and Fintechs | Rizwan Zafar"
metaDescription: "A practitioner checklist for SWIFT-related compliance, sanctions, AML/CFT, CSP, ISO 20022 readiness, gpi adoption, and audit trail."
excerpt: "A working checklist of the SWIFT compliance items that audits, sponsors, and regulators actually ask about."
publishDate: "2026-07-17"
readingTime: "7 min read"
tags: ["SWIFT compliance", "CSP", "AML CFT", "sanctions", "checklist"]
targetKeywords: ["SWIFT compliance checklist", "SWIFT CSP requirements", "SWIFT audit readiness"]
relatedArticles:
  - "/blog/swift-aml-cft-sanctions-screening"
  - "/blog/iso-20022-migration-what-product-teams-must-know"
  - "/blog/financial-controls-are-product-requirements"
---

# A SWIFT Compliance Checklist for Banks and Fintechs

A working checklist of the SWIFT-related compliance items that auditors, bank sponsors, and regulators actually ask about. Treat this as a starting point, not a substitute for jurisdiction-specific advice.

## 1. SWIFT Customer Security Programme (CSP)

- [ ] Annual self-attestation completed against the current CSCF (Customer Security Controls Framework).
- [ ] Independent assessment performed where required by your tier.
- [ ] Mandatory and advisory controls scoped, owned, and tracked in the security backlog.
- [ ] Architecture conforms to one of the supported types (A1/A2/A3/A4/B).
- [ ] SWIFT-related infrastructure segmented from general corporate network.
- [ ] Privileged access controls and MFA enforced on operator and admin accounts.

## 2. Sanctions screening

- [ ] Lists cover all jurisdictions touched by the bank/fintech (OFAC, UN, EU, UK HMT, local).
- [ ] List updates automated to the issuing authority's cadence.
- [ ] Matcher tuned with documented thresholds, reviewed quarterly.
- [ ] Both real-time screening (per-message) and batch re-screening (lists update against existing relationships).
- [ ] Review queue with documented SLA and audit trail.

## 3. AML/CFT monitoring

- [ ] Pattern-based transaction monitoring rules and/or models in production.
- [ ] Typologies updated against FATF and local FIU guidance.
- [ ] Alert disposition with documented investigative steps.
- [ ] Suspicious activity reporting workflow with required filing timelines.

## 4. ISO 20022 readiness

- [ ] In-scope cross-border flows live on MX (CBPR+ coexistence ended November 2025).
- [ ] Capture-side UX collects structured originator and beneficiary fields.
- [ ] Internal data model MX-shaped, not MT-shaped.
- [ ] Translation layer for any remaining legacy MT counterparties.

## 5. SWIFT gpi adoption

- [ ] gpi membership active for in-scope flows.
- [ ] UETR captured, persisted, and exposed to the relevant business users.
- [ ] gpi Tracker integrated into operational tooling.
- [ ] Customer-facing status surfaces use gpi data where available.

## 6. Audit trail and controls

- [ ] Append-only ledger of every SWIFT message sent, received, and acted upon.
- [ ] Maker-checker enforced on payment initiation above thresholds.
- [ ] Segregation of duties enforced by the platform, not policy.
- [ ] Annual control testing performed and documented.
- [ ] External audit walkthrough rehearsed at least annually.

## 7. Charge bearer and fee transparency

- [ ] Charge-bearer default (OUR/SHA/BEN) matched to use case.
- [ ] FX margin disclosed where regulator requires; transparent line-item by preference.
- [ ] gpi fee data surfaced where available.

## 8. Vendor and partner management

- [ ] Correspondent banks' compliance attestations on file.
- [ ] Service-provider security assessments current.
- [ ] Contractual right-to-audit clauses on critical vendors.
- [ ] Incident-notification clauses on payment-related vendors.

## 9. Incident response

- [ ] Documented runbook for SWIFT-related incidents (fraudulent message attempts, CSP control failures, gpi outages).
- [ ] Tested annually with a tabletop or full exercise.
- [ ] Notification paths to SWIFT, regulators, and sponsoring banks pre-defined.

## 10. Training

- [ ] Operator training on payment initiation, screening review, and incident response.
- [ ] Compliance training updated to current sanctions regimes and AML typologies.
- [ ] Engineering training on CSP architectural requirements.

## Key takeaways

- Compliance is not a single document; it is the operating condition of the platform.
- The most expensive findings come from gaps the platform cannot demonstrate at click of a button.
- Build the controls in product, and the checklist becomes a status report rather than a project.

## FAQ

**Is this enough for a license application?** No, license applications require jurisdiction-specific tailoring. This checklist is the operating layer underneath.

**How often should this be reviewed?** Quarterly, with the annual CSP attestation as a hard anchor.
