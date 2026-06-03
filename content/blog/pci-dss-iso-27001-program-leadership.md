---
title: "PCI DSS and ISO 27001 as Product Programs"
slug: "pci-dss-iso-27001-program-leadership"
category: "Fraud & Risk"
subcategory: "Compliance"
metaTitle: "Leading PCI DSS and ISO 27001 Programs from Scratch | Rizwan Zafar"
metaDescription: "What it takes to lead PCI DSS and ISO 27001 programs from scratch at a payments platform, scoping, evidence, controls, and the trap of treating compliance as paperwork."
excerpt: "PCI DSS and ISO 27001 are not paperwork projects. Run as product programs, they make the platform measurably stronger."
publishDate: "2026-05-30"
readingTime: "10 min read"
tags: ["PCI DSS", "ISO 27001", "compliance", "security", "program management"]
targetAudience: ["Compliance leaders", "Security leaders", "Payments PMs"]
targetKeywords: ["PCI DSS program", "ISO 27001 implementation", "payments compliance leadership"]
relatedCaseStudies:
  - "/product-work/fraud-risk-aml-cft"
  - "/product-work/simpaisa-payment-infrastructure"
relatedArticles:
  - "/blog/financial-controls-are-product-requirements"
  - "/blog/regulatory-ux-name-on-payment-screen"
  - "/blog/cybersecurity-in-fintech-product-perspective"
---

# PCI DSS and ISO 27001 as Product Programs

The temptation is to treat PCI DSS and ISO 27001 as documents to be assembled before an audit. That approach passes the first audit and creates years of structural debt. Run as product programs, both certifications produce a measurably stronger platform.

## What changes when you treat it as a product program

A document-led approach asks "what evidence do we need?". A product-led approach asks "what controls do we want, and how do we instrument them so evidence is a by-product?".

The shift produces:

- Controls integrated into the product, not bolted on for audit
- Evidence generated automatically from production systems
- Continuous monitoring instead of annual scramble
- Auditors who become reviewers, not authors

That posture also dramatically reduces the cost of the second and third audits, which is where teams that took shortcuts get punished.

## PCI DSS, scoping is the whole game

In a PCI DSS program, scope is the decision that changes the cost curve. The smaller the cardholder data environment (CDE), the cheaper, faster, and safer the program. Specific moves that reduce scope:

- **Hosted fields and tokenisation at the PSP** so card data never touches your servers
- **Network tokens** (MDES, VTS) so stored references are not PANs
- **Network segmentation** that explicitly isolates the CDE from the rest of the platform
- **No call recordings** that capture spoken card data, or scrubbed recordings if unavoidable
- **No card data in logs**, enforced at the logger and verified by automated scanning
- **No card data in tickets**, enforced at the ticketing system

Each of these removes systems, people, and processes from scope. Each removal is leverage that compounds for the next audit.

## ISO 27001, controls as product surfaces

ISO 27001 is broader. It covers the entire information security management system. Treat each Annex A control as a product surface owned by a named role:

- Access control → IAM product owner
- Cryptography → platform security owner
- Operations security → SRE owner
- Communications security → network owner
- Supplier relationships → vendor management owner
- Incident management → on-call owner

Each owner runs their control area like a roadmap: quarterly objectives, instrumented metrics, internal review, and external audit as confirmation.

## Evidence as a by-product

The strongest sign of a healthy program is that evidence is generated automatically:

- IAM changes logged with approver, justification, and ticket reference
- Access reviews triggered on a calendar, completed in-tool, exportable
- Vulnerability scans run on schedule with auto-ticketed findings
- Change management with linked tickets, approvals, deployment record
- Incident post-mortems written from the on-call timeline, not reconstructed

When evidence is a by-product, audit week is a query, not a project.

## The 2024 lesson

I led PCI DSS and ISO 27001 from scratch at Simpaisa while also serving as acting CTO during a regulatory tightening cycle. Three things made it work:

1. **One backlog.** Compliance, security, and platform engineering shared one backlog. No separate "compliance projects" to be deprioritised.
2. **Evidence-first design.** Every new feature shipped with the evidence it would produce for the relevant control.
3. **Auditor as reviewer.** The audit firm joined quarterly reviews, not just the year-end push. They became allies, not adversaries.

The output was a clean first audit on both, no major findings, and a roughly 40% lower second-year audit effort because the muscle was now habitual.

## Common failure modes

- **Document factory.** A team produces policies no one reads, controls no one enforces, evidence no one trusts. Passes audit one, fails audit two.
- **One-off project.** Treated as a project, not a program. Disbands after audit. Re-scrambles the next year at higher cost.
- **Security in a silo.** No product involvement. Controls live outside the SDLC. New features quietly break compliance for months before anyone notices.
- **Scope inflation.** Failed to reduce CDE. Pays the audit cost of a much larger environment forever.

## What to instrument

- % of Annex A controls with named owners
- % of evidence generated automatically vs manually collected
- Open findings by severity, ageing
- Time-to-evidence for ad-hoc auditor requests
- CDE size (systems, people, processes) trending down
- Repeat findings between audits, trending to zero

## Operator lens

The certifications themselves are not the product. The product is the platform that earns them. Run the program that way and the audits become checkpoints, not the work itself.

---

Related: [Financial Controls Are Product Requirements](/blog/financial-controls-are-product-requirements) · [Regulatory UX](/blog/regulatory-ux-name-on-payment-screen)
