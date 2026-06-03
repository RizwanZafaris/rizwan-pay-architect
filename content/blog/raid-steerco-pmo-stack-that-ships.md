---
title: "RAID Logs, SteerCo and the PMO Stack That Actually Ships at $1B+ Scale"
slug: "raid-steerco-pmo-stack-that-ships"
category: "Program Management"
metaTitle: "RAID, SteerCo and the PMO Stack at $1B+ Scale | Rizwan Zafar"
metaDescription: "What an actually-working PMO stack looks like at $1B+ TPV, RAID register design, SteerCo cadence, OKR + RICE prioritisation, escalation paths, and the rituals that compound."
excerpt: "Most PMO failure modes come from registers without owners, SteerCos without decisions, and OKRs without consequences. Fix the stack, fix the delivery."
publishDate: "2026-04-20"
readingTime: "9 min read"
tags:
  - PMO
  - RAID
  - SteerCo
  - OKR
  - RICE
  - programme governance
  - delivery
  - fintech operations
targetAudience:
  - PMO directors
  - Heads of delivery
  - Programme managers
  - Operations leads
targetKeywords:
  - PMO stack
  - RAID register
  - SteerCo governance
  - OKR fintech
  - programme governance at scale
relatedArticles:
  - "/blog/building-pmo-from-scratch-fintech"
  - "/blog/pmbok-plus-agile-hybrid-frameworks"
  - "/blog/three-million-dollar-transformation-postmortem"
---

# RAID Logs, SteerCo and the PMO Stack That Actually Ships at $1B+ Scale

Most PMO failure modes come from registers without owners, SteerCos without decisions, and OKRs without consequences. The stack itself is not the problem, the discipline around the stack is.

This is the working PMO stack from running 12 cross-functional squads at $1B+ TPV across five regulated markets at Simpaisa.

## The five-layer stack

1. **RAID register**, the operating memory
2. **SteerCo**, the decision cadence
3. **OKRs**, the strategic alignment
4. **RICE / MoSCoW**, the prioritisation discipline
5. **Escalation paths**, the un-stuck button

Each layer has a job. Each layer is one ritual away from becoming theatre. The PMO's job is to keep each layer's ritual real.

## RAID register: the operating memory

The RAID (Risks, Assumptions, Issues, Dependencies) register is the most under-respected artefact in most PMOs. Done well, it is the institutional memory of the programme. Done badly, it is a graveyard.

**Design principles:**

- **Single register, not one per workstream.** Cross-cutting risk is the most expensive risk; a per-workstream register hides it.
- **Every entry has an owner, a target date, and a decision path.** "TBD" in any of these three columns means the entry is not real.
- **Categorise correctly.** A risk is something that might happen. An issue is something that has happened. An assumption is something we're betting on being true. A dependency is something outside our control. These are not interchangeable.
- **Weekly review with teeth.** Anything past 30 days without movement gets an escalation decision: act, accept, escalate, kill.

**What RAID is not:** a status report. A status report describes what is. A RAID describes what could go wrong, what is going wrong, and what we are assuming. Keep these separate.

## SteerCo: the decision cadence

Monthly. 90 minutes. Standing agenda. Documented decisions.

**Standing agenda:**

- **In-flight programmes** (5 min), RAG status, on-plan / off-plan, exception only
- **RAID escalations** (15 min), items needing leadership input
- **Gate decisions** (30 min), capital workstream gate sign-offs with documented decision
- **Strategic items** (30 min), what's changing, what's new, what's stopping
- **Decisions log** (10 min), recap and document

**SteerCo failure modes to design out:**

- **Status theatre.** If a workstream is on plan with no exception, it doesn't need 5 minutes. It needs 30 seconds.
- **Decision avoidance.** Items get "discussed" but not decided. Fix: every agenda item ends with a documented decision or a named owner and date.
- **No escalation pre-work.** People bring problems to SteerCo without a recommendation. Fix: every escalation must come with a proposed decision.

The SteerCo is your decision-making rhythm. If you are not making decisions there, you are running a status meeting in expensive clothing.

## OKRs: the strategic alignment

Quarterly. Three to five Os per quarter, max. Three KRs per O.

**OKR design principles for a fintech PMO:**

- **OKRs are organisation-level, not project-level.** "Ship Project X" is not an OKR. "Hit $X GTV in market Y" is.
- **KRs are measurable and time-bound.** No fuzzy KRs.
- **30/30/40 rule:** 30% of OKRs should be near-certain (operational), 30% should be stretch (strategic), 40% should be in the middle. If everything's a stretch, nothing's a stretch.
- **Quarterly grade, weekly check.** Read the OKRs every week to keep them top of mind. Grade them quarterly with honesty.

**OKR failure modes:**

- **OKRs become project lists.** Fix: every OKR has to roll up to a strategic theme; if it doesn't, it's not an OKR.
- **OKRs change mid-quarter.** Fix: the only legitimate reason to change is external shock. Otherwise, hold.
- **OKRs have no consequence.** Fix: discuss them in performance reviews. If they don't matter for the people writing them, they don't matter at all.

## RICE / MoSCoW: the prioritisation discipline

For portfolio-level prioritisation. Both have a place:

- **RICE** (Reach × Impact × Confidence ÷ Effort), good for product-feature prioritisation where you have rough quantitative inputs
- **MoSCoW** (Must / Should / Could / Won't), good for programme-level scope decisions where the conversation is more qualitative

In practice, most fintechs use RICE for product prioritisation within squads and MoSCoW for cross-cutting programme scope. Both at quarterly cadence.

**Common failure modes:**

- Numbers are gamed. Fix: use the framework to surface the conversation, not to outsource the decision.
- Effort is under-estimated. Fix: have engineering, not product, score effort.
- Confidence is over-estimated. Fix: review confidence retrospectively each quarter.

## Escalation paths: the un-stuck button

Most programmes don't slip on hard problems. They slip on stuck decisions.

**Three escalation paths, named:**

1. **In-squad** (within a workstream), squad lead decides; resolves in days
2. **Cross-squad** (between workstreams), PMO convenes the relevant leads; resolves in a week
3. **SteerCo** (organisation-level), surfaces at next SteerCo; resolves in a month

If something is stuck longer than its tier, it auto-escalates. The PMO maintains the auto-escalation discipline.

**Escalation failure modes:**

- Things stay stuck because no one wants to escalate. Fix: PMO auto-escalates; it's not a judgement.
- Escalations bypass tiers. Fix: hold the tiers; escalations that bypass tiers are themselves an escalation.

## The PMO meta-ritual: quarterly retrospective

The PMO on itself. What's working? What's slowing teams down? Change one thing per quarter. Compound the improvements.

This is the only ritual that improves all the others.

## Operating bar at 12 months

- RAID is alive; weekly-reviewed; entries don't go stale
- SteerCo runs in 90 minutes with documented decisions
- OKRs are read weekly, graded honestly quarterly
- Portfolio prioritisation happens in real conversations, not retrospectively
- Escalations resolve at the right tier within the right timeframe
- The PMO improves itself once per quarter, on the record

## FAQ

**How many people in a PMO at $1B+ TPV scale?** 3–6. PMO lead, portfolio analyst, programme managers for major workstreams. Don't over-staff.

**How do I get adoption of the stack?** Adoption follows decisions. If RAID review actually decides things, people respect it. If it's status theatre, they don't.

**What tooling do you use?** Jira for execution, Confluence for documentation, a custom dashboard layer on top. Tooling matters less than discipline.

**What's the biggest mistake PMO leads make?** Confusing motion for progress. A busy PMO is not necessarily a productive PMO. Measure decisions per cycle, not meetings per week.
