---
title: "One Tap or No Sale: Rebuilding Carrier-Billing Checkout as the Monetization Core"
category: ott
tags: [payment-conversion, checkout-ux, direct-carrier-billing, funnel-instrumentation, failure-handling]
anonymized_entity: "a large OTT streaming platform (South Asia's leading streaming service)"
---

## Challenge

Carrier billing gave us reach; the raw flows then leaked users at every step. The first DCB checkout we shipped was an integration, not a product: SMS round-trips, PIN entries, consent screens written by lawyers, and silent failures whenever a prepaid balance came up short. For a streaming platform whose entire economic event is the moment a viewer becomes a payer, every leak in that flow was the business model leaking.

## Context

This was South Asia's leading streaming service, with a mass free audience and DCB live across all four major telecom operators. The structural quirk of the market: prepaid balances are small and volatile. A charge can fail at four in the afternoon and succeed at seven in the evening because the user topped up in between. Treating "payment failed" as a single outcome — which our first implementation did — meant treating a temporarily broke sports fan the same as a wrong number.

## Approach

We decided to treat payment conversion as a product surface with its own roadmap, instrumentation, and weekly review — not a checkout setting. Step one was measurement: every stage from paywall view to confirmed charge, segmented by operator, plan, and failure reason. Step two was rebuilding the happy path around one tap. Step three, which mattered more than either, was building a failure taxonomy and giving each failure class its own recovery treatment.

## Product Strategy

On-net users could be identified through their carrier connection, so subscribing became a single confirmed tap: no number entry, no SMS round-trip, consent presented clearly on one screen. Off-net and Wi-Fi users got a designed fallback flow instead of an error. Failures were split into insufficient balance, technical decline, and consent timeout — the first earned a retry pathway timed around top-up behavior, the second went to per-operator engineering escalation, the third got a simplified re-prompt. I also made an unfashionable call: we kept consent more explicit than the aggressive one-tap patterns common in the carrier-billing industry. That industry carried a history of accidental subscriptions and regulator backlash, and complaint rates — not conversion — were what could get a service switched off an operator's platform.

## Execution

Each operator required separate negotiation on flow design, and one nearly broke the program: a compliance team insisted on an extra confirmation SMS that, in testing, gutted completion. We spent weeks negotiating an alternative — a single-screen consent with on-screen confirmation that satisfied their consumer-protection requirements without the dead-end round-trip. The instrumentation also surfaced an uncomfortable truth early: a large share of what we had been calling drop-off was insufficient balance, which no amount of screen polish would fix. That finding redirected effort from redesigning pages to building retry and recovery logic, which is where the real money turned out to be.

## Metrics

I will keep this section honest rather than impressive: the step-level conversion deltas are not mine to publish. What I can say is that completion improved materially on every one of the four operators after the one-tap and failure-handling work, that insufficient-balance recovery became a meaningful contributor to monthly paid activations, and that this conversion engine underpinned the platform's growth from zero to 5M paid subscribers in under three years.

## Results

Payment conversion became a managed KPI with a named owner, reviewed weekly alongside content metrics — which, inside a streaming company, is a cultural statement. Complaint rates stayed low enough that no operator ever throttled or suspended our billing access, an existential risk in this channel that rarely makes it into case studies. The failure taxonomy outlived the original flows and became the foundation for the later involuntary-churn and renewal-recovery work.

## Lessons Learned

In subscription businesses, the checkout is the product; everything upstream of it is an audience. Instrument before you redesign — our intuition about why users dropped was wrong, and the data moved the roadmap from screens to retries. Name every failure before you fix any of them; "payment failed" is not a category, it is a surrender. And in regulated, operator-mediated channels, the only conversion rate that matters is the one you can sustain without complaints — the aggressive flow that gets you suspended converts at zero.

> Payment conversion is not a funnel number you report — it is a product you build, instrument, and defend.
