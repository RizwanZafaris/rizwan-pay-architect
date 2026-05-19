---
title: "Where PMOs Fail: Six Patterns I've Watched in Fintech Programmes"
slug: "where-pmos-fail-six-patterns-fintech-programmes"
category: "Program Management"
metaTitle: "Where PMOs Fail: Six Patterns in Fintech Programmes | Rizwan Zafar"
metaDescription: "After standing up PMOs from scratch twice and reviewing others, the six failure patterns that show up most often. What they look like, why they happen, how to fix them."
excerpt: "PMOs don't fail because the PMs are bad. They fail because the function gets miscast as governance theatre instead of decision-making infrastructure. Six failure shapes, the symptoms, the fix."
publishDate: "2026-05-19"
readingTime: "11 min read"
featured: true
tags:
  - PMO
  - program management
  - PMO failures
  - fintech operations
  - delivery governance
  - SteerCo
  - RAID
  - org design
targetAudience:
  - PMO directors and heads of delivery
  - CPOs and COOs in fintech
  - Programme managers
  - Founders building delivery functions
targetKeywords:
  - PMO failure patterns
  - why PMOs fail
  - PMO theatre
  - fintech PMO failure
  - PMO maturity model
  - SteerCo broken
  - RAID register failure
relatedArticles:
  - "/blog/building-pmo-from-scratch-fintech"
  - "/blog/raid-steerco-pmo-stack-that-ships"
  - "/blog/program-vs-product-management-fintech"
---

# Where PMOs Fail: Six Patterns I've Watched in Fintech Programmes

PMOs don't fail because the PMs are bad. They fail because the function gets miscast — set up as governance theatre instead of decision-making infrastructure, then quietly routed around by everyone who has actual work to do.

After standing up PMOs from scratch twice (Wing Logic, $12M portfolio; Simpaisa, $1B+ TPV across 12 squads) and observing others across the fintech market, six failure patterns recur. They're not stages — a PMO can be in two or three of them at once. They're shapes. If you recognise the shape, you know what to do.

## 1. The "Coordinator" PMO

**What it looks like.** The PMO produces RAG (Red / Amber / Green) status reports, runs weekly stand-ups, maintains a single Confluence page of "all initiatives". The PMs are senior in title but operate as schedulers. Decisions are made elsewhere — usually in the CEO's office, often informally — and the PMO is informed after the fact.

**Symptom.** Ask the PMO lead "what was the most consequential decision the PMO drove last month?" If the answer is a date change or a meeting agenda, you have this PMO.

**Why it happens.** The PMO is set up to remove burden from product and engineering — "tell us the status, we'll roll it up." That's the wrong framing. The PMO that adds value isn't reporting on decisions; it's forcing them.

**Why it's expensive.** This PMO scales linearly with company size. Every new squad means a new status reporter. The PMO becomes a cost centre instead of a leverage point.

**Fix.** Re-charter every PMO meeting around decisions, not status. Every agenda item ends with a documented decision and a named owner. Status updates take 30 seconds, not 5 minutes. The room asks "what changed since last week?" not "what's red?"

## 2. The "RAID Register" PMO

**What it looks like.** There's a beautiful RAID (Risks, Assumptions, Issues, Dependencies) register. 80+ entries. Updated weekly. Owners assigned. Target dates filled in.

The same 60 of those entries are open today as were open six months ago.

**Symptom.** Pull the RAID register. Sort by "open since". If 30%+ of entries are older than 90 days, this is the PMO you're looking at.

**Why it happens.** The PMO is treating RAID as a log instead of a register. A log records — a register forces action. The discipline that turns one into the other is missing: weekly review with the owner sitting in the room, and a hard escalation rule (any entry open past 30 days without movement gets escalated to SteerCo).

**Why it's expensive.** Stale RAID destroys the credibility of the artefact. Eventually nobody bothers updating it because nobody acts on what's there. The PMO has built a graveyard.

**Fix.** Three rules:

- Every entry has an owner who is **a person**, not a team
- Every entry has a target close date, and missed dates trigger an escalation
- Every weekly RAID review is a closing exercise, not a reading exercise — the goal is to remove items, not document them

## 3. The "SteerCo Theatre" PMO

**What it looks like.** SteerCo runs monthly. 90 minutes. 12 attendees. Beautiful slides. Polite questions. Decisions deferred to "we'll take it offline" or "let's get more data."

A year later, the same workstreams are still labelled as "in progress" with no consequential decisions made.

**Symptom.** Pull the last 6 SteerCo decision logs. Count the binding decisions made (escalation closed, scope changed, budget reallocated, programme killed). If the number per meeting is <2, you have SteerCo Theatre.

**Why it happens. **Two reasons. First, escalations arrive at SteerCo without a recommendation — the PMO surfaces problems but doesn't propose decisions. Second, the room has too many people for accountability to land on anyone.

**Why it's expensive.** SteerCo is the most expensive hour in the company calendar — 12 senior people × 90 minutes = ~18 person-hours per session. If it's not driving binding decisions, that's pure waste.

**Fix.**

- Every escalation arrives with a **proposed decision**. The PMO drafts the recommendation; SteerCo accepts, amends or rejects.
- Document the decision in the meeting, not after. If the decision can't land in the meeting, the item is back at the next SteerCo with the same recommendation.
- Trim the attendee list. The directly accountable people only. Observers attend the readout, not the meeting.

## 4. The "Tool-First" PMO

**What it looks like.** The PMO has been live for 4 months. Half the budget has gone into Jira customisations, a custom dashboarding layer, and three integrations between Confluence and a project portfolio management tool nobody asked for.

The squads still don't update their statuses. The dashboards are technically working but read by nobody.

**Symptom.** Walk into the PMO area. If the loudest conversations are about tooling, integration projects, or "next quarter we'll roll out the new dashboard," this is the PMO.

**Why it happens.** PMO leads who came from operational PM backgrounds (rather than from product / engineering leadership) reach for tools first because tooling feels like progress. It is not progress. Adoption is progress.

**Why it's expensive.** Tools without adoption are sunk cost. The first 6 months of tool investment that didn't get used has to be junked, and the team that fought to deploy it resents the rollback.

**Fix.**

- Start with Jira + Confluence stock. No customisation in the first 90 days.
- Add a tool only after the manual practice has been adopted by at least three squads voluntarily.
- The rule of thumb: ritual before tool. Once the ritual exists, the tool encodes it. Without the ritual, the tool is decoration.

## 5. The "Above-the-Line" PMO

**What it looks like.** The PMO reports to the CEO. It has a strong relationship with the board. It produces excellent quarterly programme reviews. The CEO is happy.

The squads doing the actual work are barely aware the PMO exists. They route around it. Their Jira boards are different from the PMO's portfolio view. Their weekly rituals don't include anyone from the PMO.

**Symptom.** Ask a senior IC engineer or a squad PM: "what does the PMO do for you?" If the answer is a shrug, this is the PMO.

**Why it happens.** Most often, the PMO was set up by the CEO or board to give them visibility, and the staffing optimised for executive reporting rather than squad-level value. The PMs are good at slides; they're not in the trenches.

**Why it's expensive.** Two parallel realities — the PMO's reality and the squads' reality — diverge. Decisions made at SteerCo don't propagate down. Squads keep shipping; PMO keeps reporting; the gap grows.

**Fix.** Pull the PMO down into the work. Two changes:

- Every PMO PM owns specific squads, not abstract initiatives. Their job is to make those squads ship better.
- The PMO meets the squads where they are — in the squad's rituals, not in PMO-mandated meetings.

## 6. The "First Hire Was Wrong" PMO

**What it looks like.** The first PMO lead was the most available, not the most right. Usually a senior PM from a non-payments / non-fintech background, hired during a delivery crisis. They built the PMO around their previous company's playbook, which doesn't match the regulated-payments cadence.

Six months in, the PMO is functional but never lands. Squads complain about the rituals. Compliance and risk don't trust the governance artefacts. The CEO is starting to wonder whether the PMO function is even needed.

**Symptom.** Compare the PMO's rituals to the operating realities of regulated payments. If the PMO doesn't have an audit-evidence layer, doesn't know what a stage gate looks like, can't speak to PCI / ISO programme management, the wrong person is leading it.

**Why it happens.** The CEO under-specifies the role. The job description says "Head of PMO." It doesn't say "must have run capital workstreams under regulator-facing audit deadlines in regulated payments." Without that specificity, the hiring funnel converges on generalists.

**Why it's expensive.** Replacing a PMO lead is a 3-month exercise of unwinding and rebuilding. The credibility damage to the function takes longer.

**Fix.** Two things, depending on timing:

- If you're hiring now: write a job spec that names the specific failures you want avoided. "Has run RAID governance through a regulator-facing capital workstream" is a real requirement; "has PMO experience" is not.
- If you've hired the wrong person already: be honest fast. The fix is replacement, not coaching. The damage of dragging it out is greater than the damage of the change.

## The pattern underneath the patterns

All six failure modes share a single root cause: **the PMO has been miscast as an oversight function rather than a decision-making function.**

Oversight asks "are we on plan?" Decision-making asks "what should we do next?" An oversight PMO reports. A decision-making PMO drives.

If you find your PMO drifting into any of these six patterns, the recovery move is the same: re-anchor every PMO ritual around decisions. Every meeting ends with a documented decision. Every register entry has an action and a date. Every escalation arrives with a recommendation. Every status update earns its place by surfacing what changed.

When the PMO drives decisions, the value is obvious within a quarter. The squads feel it (their blockers move faster). The CEO feels it (the agenda items in 1:1s shrink because PMO is closing them). The board feels it (programme reviews show movement, not motion).

When the PMO drifts back to oversight, the symptoms return within two quarters. This is the only function in the company that requires constant re-anchoring. The drift gravity is strong because oversight is genuinely useful — just not the highest use of the function.

## What good looks like at 12 months

A working PMO at 12 months has these signs:

- A senior person outside the PMO can name three specific decisions the PMO drove this quarter
- RAID has fewer than 20 open entries, with median age under 60 days
- SteerCo lands at least 3 documented decisions per session
- New squads ask the PMO for support before being assigned; they're not avoiding the function
- The PMO lead is invited to the executive team's most consequential planning sessions; they don't have to fight for the seat
- When the PMO is on holiday, things break. (This is the bluntest test. If nothing breaks, the PMO isn't doing anything.)

## Why this matters

Boards have learned to ask about PMOs because they've seen well-run ones make a 10× difference to portfolio outcomes. They've also seen badly-run ones become a permanent cost line with no measurable output.

The discriminator isn't the org chart. It isn't the tool stack. It isn't the headcount. It's whether the function has been chartered to make decisions or to oversee them.

If you're being hired into a PMO leadership role, this is the question to ask in the interview: "Show me the last three decisions the PMO has driven." If the answer is a long pause, you're being hired into a turnaround. That's a real job — but it's a different job than the one being advertised, and the salary should reflect it.

## FAQ

**How big should a PMO be?** For a 200-person fintech with 12 squads: 3–5 PMs, 1 PMO lead, 1 portfolio analyst. More than that and the function starts staffing itself. Less than that and a single illness collapses the operating rhythm.

**Where should the PMO report?** COO or CPO, ideally. Reporting to CEO is fine in early-stage but tends to skew the PMO toward "above the line" failure mode.

**Should the PMO own product roadmap decisions?** No. Roadmap decisions sit with product. The PMO owns delivery governance — making sure the product team's commitments translate into shippable work and that the dependencies between squads are managed.

**Is RACI useful?** Yes, but only if used sparingly. A RACI for every decision drowns the function in bureaucracy. A RACI for the 5 highest-risk decisions per quarter is exactly the right discipline.

**Should the PMO own AI / GenAI rollouts?** It depends on shape. Process automation (RAG, document extraction, support deflection) — yes. Product features that ship to merchants — no, that's product. The line is whether the AI is operational or customer-facing.

**The single biggest sign a PMO is failing?** When senior ICs and squad leads start scheduling parallel meetings to "actually get things done." That's the company telling you the PMO has become a tax.
