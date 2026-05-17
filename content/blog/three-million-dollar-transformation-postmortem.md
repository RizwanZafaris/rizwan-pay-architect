---
title: "Running a $3M Digital Transformation Programme: A Postmortem (TapmadTV)"
slug: "three-million-dollar-transformation-postmortem"
category: "Program Management"
metaTitle: "Postmortem: $3M Digital Transformation Programme (TapmadTV) | Rizwan Zafar"
metaDescription: "A practitioner postmortem on running a $3M digital transformation programme to launch Pakistan's first licensed OTT platform — 5 workstreams, 25 people, 8 international vendors, on-schedule landing."
excerpt: "What it actually took to land a $3M transformation programme on schedule across 5 technology workstreams and 8 vendors — and the three things I would do differently."
publishDate: "2026-04-22"
readingTime: "9 min read"
tags:
  - programme management
  - PMO
  - digital transformation
  - postmortem
  - vendor governance
  - PMBOK
  - SteerCo
  - case study
targetAudience:
  - Heads of PMO
  - Programme managers
  - Transformation leads
  - CIOs / CTOs
targetKeywords:
  - digital transformation programme
  - $3M transformation
  - PMO case study
  - programme postmortem
relatedArticles:
  - "/blog/building-pmo-from-scratch-fintech"
  - "/blog/pmbok-plus-agile-hybrid-frameworks"
  - "/blog/raid-steerco-pmo-stack-that-ships"
---

# Running a $3M Digital Transformation Programme: A Postmortem (TapmadTV)

In 2016 I took on a $3M digital transformation programme at TapmadTV — Pakistan's first licensed OTT streaming platform. 5 technology workstreams (iOS, Android, web, CMS, CDN), 25-person team, 8 international vendors, a regulator-facing launch date with no slip room.

It landed on schedule. This is the postmortem — what worked, what didn't, and what I would do differently.

## The setup

- **Programme value:** $3M
- **Duration:** ~9 months from kickoff to launch
- **Team:** 25 internal across product, engineering, content ops; 8 international vendors
- **Workstreams:** mobile (iOS, Android), web, CMS infrastructure, CDN provisioning, content rights & launch ops
- **Governance:** monthly SteerCo with the board's tech committee; weekly programme reviews; daily standups inside workstreams
- **Methodology:** PMBOK stage gates for capital workstreams (CDN, CMS), Agile for product workstreams (mobile, web)
- **My role:** Programme Manager / PMO Lead. Reported to CEO and board's tech committee.

## What worked

**1. The hybrid PMBOK + Agile model from day one.** We did not try to run everything Agile or everything stage-gated. CDN provisioning and CMS infrastructure ran on stage gates with vendor SLAs; mobile, web and content ops ran on sprints. The boundaries were explicit and the join points were managed by the PMO.

**2. The vendor war room.** For the last six weeks before launch, all eight vendors had a representative in a single Slack channel with twice-daily standups. Issues that had been email-tag for weeks resolved in minutes. This is the highest-leverage PMO move I've ever made.

**3. RAID register with teeth.** Every entry had an owner, a target date, and a decision path. Anything past 30 days without movement got escalated to SteerCo. RAID review was a real ceremony, not a status meeting.

**4. SteerCo at 90 minutes, every month.** Tight agenda: in-flight workstreams (RAG + RAID), upcoming gate decisions, escalations needing the board's input. Documented decisions. We held the cadence.

**5. Single source of truth.** One tracker for everything. Every workstream, every milestone, every dependency. The fight to maintain it was constant; the value was constant.

## What didn't work

**1. Underestimating content-rights complexity.** I treated content rights as a workstream of equal weight to the tech workstreams. In hindsight, content rights had more lawyer-time, more cross-jurisdictional uncertainty and more potential to slip the launch than any tech workstream. It got the PMO attention proportional to its budget, not its risk. Lesson: PMO attention should follow risk, not budget.

**2. Late integration testing.** Mobile apps integrating with backend CMS happened too late. We discovered a session-state bug in week 32 that should have surfaced in week 20. Fix shipped in time; should not have been that close.

**3. Over-relying on vendor self-reporting.** Two of the eight vendors reported green when they were yellow. We caught it through joint planning, not from their status reports. Lesson: triangulate vendor status; don't trust the report.

**4. No formal go/no-go decision before launch.** We had implicit go/no-go through the regulator engagement, but no formal stage-gate "go" decision documented. In a postmortem this looked like governance debt. Lesson: every launch has an explicit go/no-go with a named decision-maker.

## What I would do differently

**1. Front-load risk-weighted PMO attention.** The first SteerCo would have a "top 5 things most likely to slip the launch" agenda, regardless of which workstream they live in. PMO attention follows that list.

**2. Integration testing on a sprint cadence from day one.** Not waiting for "the integration sprint." Each workstream is responsible for a minimum integration check every two weeks, even if the dependencies aren't fully built.

**3. Vendor health independent of vendor reporting.** Build a second-channel signal — independent observation of vendor velocity, code commits, deliverable quality. Compare to their RAG reports weekly.

**4. Formal go/no-go documentation.** Every major launch milestone gets a go/no-go meeting with a named decision-maker, a documented decision, and a documented "what would have made us say no."

**5. Postmortem as a programme deliverable.** Not "we'll do a retro after launch." A scheduled postmortem written up as a programme artefact, presented to SteerCo, with named action owners.

## What landed long after launch

- The PMO playbook I built for this programme became the standard for the next two TapmadTV product cycles.
- The vendor war room model became my default for any multi-vendor launch since.
- Two of the original vendor relationships are still active 9 years later.

## What it taught me about transformation programmes specifically

Three things:

**1. The first-of-its-kind premium is real.** Pakistan's first licensed OTT platform was a regulator-watched launch. Programmes with a regulatory novelty premium need extra governance budget, not less, even if that feels like overhead.

**2. International vendors need joint rituals, not just SLAs.** SLAs document what should happen. Joint rituals (planning, standups, war rooms) make it happen. The SLA is for the dispute; the ritual is for the delivery.

**3. The PMO is a tempo function.** Its job is to keep the programme moving at the right pace — not too fast (skipping evidence), not too slow (losing momentum). Tempo is measured by how often decisions actually get made.

## FAQ

**What was the team's biggest fear pre-launch?** CDN capacity. We had not load-tested at peak-event scale, and the launch was timed with a major sporting event.

**What was the biggest surprise post-launch?** How much of the post-launch operating cost came from content-ops, not tech.

**How do you size a programme like this today?** Same way: workstreams × team size × time × overhead. The variables haven't changed. The tooling has gotten better.

**Would you take on a programme like this again?** Yes. The constraints of first-of-its-kind launches are where the best PMO work happens.
