---
title: "Building a PMO from Scratch in a Fintech: A 90-Day Playbook"
slug: "building-pmo-from-scratch-fintech"
category: "Program Management"
metaTitle: "Build a PMO from Scratch in a Fintech (90-Day Playbook) | Rizwan Zafar"
metaDescription: "A practitioner playbook for standing up a PMO from scratch inside a fintech — what to build in the first 90 days, what to skip, what to govern centrally, and what to keep in the squads."
excerpt: "A fintech PMO is not a governance overlay. It's the operating system that lets product, engineering, risk and compliance ship together at regulated-payments cadence."
publishDate: "2026-04-28"
readingTime: "9 min read"
tags:
  - PMO
  - programme management
  - fintech operations
  - delivery governance
  - PMBOK
  - Agile
  - hybrid frameworks
  - org design
targetAudience:
  - Fintech founders
  - CPOs / CTOs / COOs
  - PMO directors and heads of delivery
targetKeywords:
  - build PMO from scratch
  - fintech PMO
  - PMO playbook
  - hybrid PMBOK Agile
relatedArticles:
  - "/blog/pmbok-plus-agile-hybrid-frameworks"
  - "/blog/raid-steerco-pmo-stack-that-ships"
  - "/blog/three-million-dollar-transformation-postmortem"
---

# Building a PMO from Scratch in a Fintech: A 90-Day Playbook

A fintech PMO is not a governance overlay. It is the operating system that lets product, engineering, risk and compliance ship together at regulated-payments cadence. Done well, it is invisible. Done badly, it is a meeting-generation machine.

I have stood up PMOs from scratch twice — once at Wing Logic (a Dubai project portfolio firm) and once at Simpaisa (B2B payments, $0 → $1B+ TPV). This is the 90-day playbook.

## Day 1–30: Make the work visible

The first month is anthropology, not architecture. You cannot govern what you cannot see.

**Inventory in week 1.** List every initiative currently in flight. Owner, status, dependencies, target date. Half will be inaccurate. That's fine — the inaccuracy is the signal.

**RAID register in week 2.** One register. Risks, Assumptions, Issues, Dependencies. Every entry has an owner, a target date, and a decision path. Anything older than 30 days without movement gets a decision: act, accept, escalate.

**Single source of truth in week 3.** Pick one tool (Jira is fine, Linear is fine, Confluence is fine). Move every initiative into it. Kill the parallel spreadsheets. This is the single biggest fight you will have in month one. Win it.

**Stakeholder map in week 4.** Who owns budget, who owns risk acceptance, who owns regulator engagement, who owns sponsor-bank relationship. Put names in cells, not departments.

**What to skip in days 1–30:** anything that looks like a governance framework, a stage-gate document, a steering committee charter. Tools first; ceremony second.

## Day 31–60: Govern the few things that need governing

Once the work is visible, decide what needs central governance and what doesn't.

**Central governance is the right answer for:**

- Anything touching regulatory exposure (PCI DSS scope changes, AML programme changes, sponsor-bank-affecting changes)
- Capital projects above a threshold
- Cross-team dependencies that cross the squad boundary
- Vendor selection above a threshold
- Anything with a board-reportable milestone

**Squad governance is the right answer for:**

- Feature delivery within a squad's mandate
- Sprint planning and execution
- Hiring within approved headcount
- Tactical vendor work below threshold

Document the line. Defend the line. Most PMO failures are the PMO drifting across the line and slowing squads down.

**SteerCo cadence in week 5.** Monthly for the leadership team. Standard agenda: in-flight programmes (RAG status + RAID), upcoming gate decisions, escalations needing leadership input. 90 minutes maximum. Document decisions, not discussions.

**Quarterly planning in week 8.** This is where the PMO earns its keep. OKR alignment, dependency mapping, capacity planning across squads. RICE or MoSCoW for portfolio prioritisation. The PMO is the convener, not the decider.

## Day 61–90: Build the rituals that compound

The first two months were defensive. Month three is offensive — building the rituals that make the operating system improve itself.

**Weekly programme review in week 9.** PMO + workstream leads, 60 minutes, focused on the next 30 days. What's blocked? Who needs help? What decision can we push? No status theatre.

**Monthly portfolio review in week 10.** PMO + leadership. Are we on plan? What needs to change? Where are we over-investing? Where are we under-investing? Use real data.

**Quarterly retrospective in week 12.** PMO on itself. What's working in the operating model? What's slowing teams down? Change one thing per quarter. Compound the improvements.

**Stage-gate template by week 13.** For capital projects only. Stage-gates kill velocity if applied to product work — they earn their cost on regulatory or capital workstreams where evidence trails are required.

## What to centrally own vs delegate

Central: RAID register, SteerCo agenda, quarterly planning, vendor governance above threshold, regulatory milestone tracking.

Delegate: sprint execution, intra-squad ceremonies, technical decisions, hiring within approved plan, vendor work below threshold.

The PMO is a coordination function. It does not own delivery — workstream leads do.

## Common failure modes

**The PMO becomes a status-collection function.** Symptom: workstream leads complain about reporting overhead. Fix: kill any report that does not lead to a decision.

**The PMO becomes the bottleneck on every decision.** Symptom: decisions queue at the PMO. Fix: make decision rights explicit; PMO escalates, doesn't decide.

**The PMO drifts into product strategy.** Symptom: PMO is debating roadmap. Fix: PMO is downstream of product strategy, not parallel to it.

**Tool sprawl returns.** Symptom: people start tracking work in Slack threads, spreadsheets, parallel boards. Fix: this is a recurring battle. Win it again.

## What good looks like at 90 days

- Every active initiative is in one tool with an owner and a status
- RAID is alive and weekly-reviewed
- Monthly SteerCo runs in 90 minutes with documented decisions
- Quarterly planning is the moment portfolio choices happen
- Squads spend more time delivering than reporting
- Leadership knows the state of every programme in under 30 minutes

## FAQ

**Do I need a dedicated PMO function in a 50-person fintech?** Yes, at minimum a part-time named role. Without one, the coordination work gets distributed badly and slowly poisons execution.

**What about a 200-person fintech?** Yes, a small dedicated team (3–5 people). PMO lead, portfolio analyst, programme managers for the major workstreams.

**Tool stack?** Jira or Linear for execution, Confluence or Notion for documentation, a single dashboard layer (we used a custom view on top of Jira). Don't overthink the tools.

**How do you measure PMO effectiveness?** Time-to-decision on escalations, percentage of programmes hitting their committed dates, leadership's ability to answer "what's the status of X" in under 30 seconds without a meeting.
