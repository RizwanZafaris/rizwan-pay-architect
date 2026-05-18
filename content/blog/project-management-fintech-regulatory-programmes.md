---
title: "Project Management for Fintech Regulatory Programmes: PCI DSS, ISO 27001, SOC 2, AML/CFT"
slug: "project-management-fintech-regulatory-programmes"
category: "Program Management"
metaTitle: "Project Management for Fintech Regulatory Programmes (PCI, ISO, SOC 2, AML) | Rizwan Zafar"
metaDescription: "How to run regulatory programmes (PCI DSS, ISO 27001, SOC 2, AML/CFT) as actual projects with hard audit dates: scope, evidence, remediation, audit handling, document control, and the operational handoff that decides whether the certification survives."
excerpt: "A regulatory programme is not a compliance exercise. It is a project with an immovable deadline (the audit), an external grader (the auditor), and a delivery cost (remediation) that gets paid up front or many times over."
publishDate: "2026-05-14"
readingTime: "11 min read"
tags:
  - project management
  - PCI DSS
  - ISO 27001
  - SOC 2
  - AML CFT
  - regulatory programme
  - audit readiness
  - compliance project management
  - evidence management
  - remediation
targetAudience:
  - Project managers running compliance programmes
  - PMO leads in fintech
  - Heads of security and compliance
  - CISOs and audit committee chairs
  - VP Engineering hiring compliance leads
targetKeywords:
  - project management compliance
  - PCI DSS project plan
  - ISO 27001 project management
  - SOC 2 project management
  - AML CFT programme management
  - regulatory audit readiness
relatedArticles:
  - "/blog/building-pmo-from-scratch-fintech"
  - "/blog/pmbok-plus-agile-hybrid-frameworks"
  - "/blog/program-vs-product-management-fintech"
---

# Project Management for Fintech Regulatory Programmes: PCI DSS, ISO 27001, SOC 2, AML/CFT

A regulatory programme is not a compliance exercise. It is a project with an immovable deadline (the audit), an external grader (the auditor), and a delivery cost (remediation) that gets paid up front or many times over.

Project managers who treat regulatory work as a slow-moving checklist generate the same outcome every time: a frantic six-week sprint before the audit, a list of findings, a remediation period, and the same fire drill twelve months later. Project managers who treat it as a project with engineering rigour generate certifications that compound year over year and an audit that becomes a routine business event.

This is the playbook from running PCI DSS, ISO 27001, SOC 2, and AML/CFT programmes inside regulated payments organisations.

## The four major programmes by shape

Each programme has a different shape and rewards a different cadence.

### PCI DSS

- **Owner**: the PCI Security Standards Council, enforced by acquirers and schemes
- **Scope**: any system that stores, processes, or transmits cardholder data
- **Cadence**: annual (Report on Compliance for Level 1; SAQ for lower levels)
- **Distinctive trait**: scope-driven. Reduce scope, reduce cost, reduce risk. Tokenisation and payment-page hosting are the most effective scope-reducers in the industry.

### ISO 27001

- **Owner**: ISO, audited by accredited certification bodies
- **Scope**: an Information Security Management System covering whatever you defined as in-scope
- **Cadence**: three-year cycle (Stage 1 + Stage 2 in year one, surveillance audits in years two and three, recertification in year three)
- **Distinctive trait**: management-system driven. The audit cares less about specific controls and more about whether the ISMS itself is operating: risk assessment, treatment plan, internal audit, management review.

### SOC 2

- **Owner**: AICPA framework, audited by CPA firms
- **Scope**: the Trust Services Criteria you select (Security is mandatory; Availability, Confidentiality, Processing Integrity, Privacy are optional)
- **Cadence**: Type I (point in time) then Type II (period, typically 6-12 months). Annual thereafter.
- **Distinctive trait**: evidence-period driven. You cannot remediate yesterday's gap; the auditor wants evidence across the full observation window.

### AML/CFT

- **Owner**: national regulator (FCA, FinCEN, MAS, SBP, RBI, BNM)
- **Scope**: the entire institution; customer due diligence, transaction monitoring, sanctions screening, suspicious activity reporting, training, governance
- **Cadence**: ongoing, with regulator-led inspections at variable intervals
- **Distinctive trait**: never-finished. AML/CFT is not a project that completes; it is a programme that ages. Project managers handle the build phase; the operational owner runs it forever.

## The shared spine

Despite the surface differences, every regulatory programme runs on the same five-phase spine. A project manager who recognises this stops treating each programme as a new puzzle.

### 1. Scope

Wrong scope kills the programme before evidence collection begins. The PM job in this phase is to make scope decisions explicit, documented, and signed off by the audit sponsor.

- For PCI: which systems touch cardholder data, and which are fully isolated? Network segmentation diagrams. Token vaulting. Hosted-page choices.
- For ISO 27001: what is the ISMS boundary? Which products, which entities, which geographies?
- For SOC 2: which Trust Services Criteria? Which subservice organisations? Which complementary user-entity controls?
- For AML: which customer segments, which products, which jurisdictions?

Scope decisions in regulatory programmes are reversible at very high cost. The PM forces the decision upfront; otherwise it gets made implicitly halfway through and re-litigated under audit pressure.

### 2. Gap assessment

A control-by-control assessment of where the current state meets the requirement and where it does not. Output: a gap register with owner, target close date, evidence required.

The PM discipline here: do not let gap assessment become a wish list. Every gap entry has a single owner, a binary state (closed or not), and an acceptance criterion that the auditor will recognise.

### 3. Remediation

The actual work: building the missing controls, tightening the loose ones, documenting the implicit ones. This is where most programmes break, because remediation gets treated as "engineering will figure it out" instead of "engineering needs PM-managed delivery the same as any other workstream."

Three remediation anti-patterns to design out:

- **The compliance-only fix**: a control implemented to pass audit but not integrated into the operating reality. The audit passes; the control decays; the next audit finds it as a gap again.
- **The hero remediation**: one engineer pulled out of product work for six weeks to close 40 controls. The work ships, the engineer burns out, the controls have no ongoing owner.
- **The remediation backlog**: gaps logged, not closed. The list grows. The next gap assessment finds the same items plus new ones.

The PM treats remediation as a planned workstream with capacity, dependencies, and acceptance criteria. Each gap closes with evidence, and the evidence is filed before the gap is marked closed.

### 4. Evidence collection

The single most underrated discipline. Evidence is not "we have this control"; it is "here is the artefact the auditor will look at, and here is the trail from policy through implementation to operation."

The PM job: design the evidence system before evidence is collected. A typical regulatory programme produces 200-800 evidence items across the audit cycle. If they live in inboxes, shared drives, and tribal knowledge, the pre-audit fire drill is inevitable.

Good evidence systems share these traits:

- **Single repository** with structured taxonomy mapped to controls
- **Versioning** so you can show "as of this date" state
- **Approval workflow**: policies, procedures, and management reviews have signed-off versions, not draft floating around
- **Refresh cadence**: evidence ages. Reviews, attestations, and risk assessments have expiry dates; the system flags expiring items.

### 5. Audit

The audit itself is the easiest phase if the previous four were done well. The PM job in audit phase is logistics, traffic control, and protecting auditor time.

- Single point of contact for the auditor; all evidence requests routed through them
- Daily 30-minute auditor-to-team sync to triage requests
- A running "auditor open items" list, visible to the team, closed daily
- Pre-audit walkthrough so the auditor sees the system before they ask questions
- Findings register kept live during the audit, not assembled at the end

## The remediation backlog: why it should never be a backlog

The fastest way to spot a programme in trouble: ask for the remediation backlog. If there is one, the programme is failing.

A backlog implies items waiting their turn. Remediation items are not waiting; they are unmet regulatory requirements with an expiry date attached to the audit. They are not "should we do this?" decisions. They are "we are doing this on this date or we miss the audit" commitments.

The healthy pattern: every gap, the moment it is identified, gets:

- An owner (named, not "the security team")
- A target close date (specific, not "Q3")
- An evidence acceptance criterion (what document or log will be produced)
- A weekly status (red / amber / green)

Gaps move from open to closed. They do not sit in a backlog.

## Working with auditors

A common project-management instinct is to manage auditors like vendors. This is wrong. Auditors are not vendors. They are external observers whose time is the most expensive resource in the programme and whose findings determine the outcome.

Three principles:

1. **Make their job easy.** Pre-prepared evidence, clean documentation, prompt responses. Every minute they waste hunting is a minute they cannot spend testing the controls that matter.
2. **Do not negotiate findings during fieldwork.** Save the discussion for the closing meeting and the draft report. Trying to argue an auditor out of a finding mid-test makes the rest of the audit harder.
3. **Build a multi-year relationship.** The auditor who knows your programme from last year audits faster and finds the right issues. Switching audit firms every year to "stay independent" is usually a tax for limited benefit.

## The handoff: where most programmes die

A regulatory programme is run as a project, but the result is an operating responsibility. PCI DSS is not a project; it is an annual obligation. ISO 27001 is not a project; it is an ongoing ISMS. SOC 2 Type II is not a project; it is a continuous control environment.

The handoff from project mode to operations mode is where most certifications quietly decay. The pattern:

- Year one: project, executive attention, dedicated resource, certification achieved
- Year two: project resource redeployed, surveillance audit passes (controls still warm)
- Year three: controls drift, surveillance audit picks up findings, recertification under pressure

The PM job in the final phase of the project is to design the operating model so the certification holds. That means:

- Named operating owner for every control family
- Quarterly internal audit cadence
- Management review on the calendar (and actually held)
- Risk assessment refresh schedule
- Evidence refresh calendar
- Training cadence

If the project closes without this in place, the certification is on borrowed time.

## Document control as a project discipline

Auditors read documents before they meet people. The state of your policies, procedures, standards, and records is the first impression the audit forms.

Three document-control disciplines that distinguish run-of-the-mill programmes from durable ones:

1. **Hierarchy is real.** Policy (board-level intent), Standard (technical baseline), Procedure (how-to). They reference each other, they live in one place, they are versioned.
2. **Owner per document.** Every document has a single owner and a review date. Documents without owners decay; documents with owners get reviewed on schedule.
3. **Change is logged.** Every change has a reason, an approver, and an effective date. Auditors are not satisfied by "this is the current version"; they want the change history.

This sounds bureaucratic. In practice, it is the difference between a four-week audit and a two-week audit.

## What good looks like

A regulatory project is being run well when:

- Scope is documented, signed off, and unchanged since the project plan was approved
- The gap register is current, owned, and visibly closing every week
- Evidence lives in a single repository, mapped to controls, with refresh dates
- The audit calendar is built backwards from the audit date with at least 12 weeks of evidence-collection buffer
- The auditor relationship is multi-year and the auditor knows the programme
- The handoff to operations is planned from project kickoff, not invented at the end
- The next year's surveillance audit is on the work plan today, not deferred

## FAQ

**How big a team for a fintech's first PCI Level 1 programme?** Typically a PM, a security architect, an infrastructure lead, a developer with payments-flow expertise, and a compliance partner. Plus 1-2 engineers for remediation. The auditor is external. Total 6-8 people across 6-9 months.

**ISO 27001 in-house or with a consultancy?** Consultancy for the first cycle, then in-house. Consultants accelerate the ISMS build; the ongoing operation should not depend on them.

**SOC 2 Type I or jump straight to Type II?** Most B2B fintechs jump to Type II because their customers will not accept Type I. The trade-off is that Type II requires an evidence window (typically 6-12 months), so plan accordingly.

**Can one PM run all four programmes?** Not well. A senior compliance PM can run two if the cycles are staggered. AML/CFT in particular has enough operational depth that it deserves a dedicated owner once the institution is past early stage.

**How do I prevent control decay between audits?** Quarterly internal audits with the same rigour as the external. Find the issues yourself before the external auditor finds them. This is the single most effective discipline for keeping certifications alive.

**What is the most common PM mistake?** Treating remediation as a backlog rather than a planned, capacity-managed workstream. Backlogs grow; remediation has to close.
