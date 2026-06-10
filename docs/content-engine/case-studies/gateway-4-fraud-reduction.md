---
title: "Holding Fraud Losses Under 0.1% of GTV Without Strangling Approvals"
category: payment-gateway
tags: [fraud-prevention, velocity-rules, device-signals, aml-cft, risk-management]
anonymized_entity: "a leading payment gateway in emerging markets"
---

## Challenge

Fraud attempts at our gateway were growing faster than volume, and our response was a blunt instrument: every attack produced new blocking rules, and every new rule killed good transactions along with bad ones. The breaking point was a merchant escalation showing that their approval rate had dropped after we tightened rules following an attack on a different merchant entirely. My mandate had two halves that most fraud programs treat as one: hold fraud losses under 0.1% of GTV, and protect the approval rates merchants were paying us for.

## Context

The gateway processed 270M+ payments a year and over $1B in annual GTV across cards, mobile wallets, bank transfers, and carrier billing, and each rail attracted its own fraud. Cards drew automated testing of stolen credentials. Wallets drew account takeover, often via SIM swap. Carrier billing drew subscription abuse. As a regulated, PCI-DSS Level 1 and ISO 27001 certified entity we also carried AML/CFT obligations, with monitoring, case management, and reporting, and the analyst team handling those cases was drowning in alerts tuned years earlier. One more piece of local reality mattered: in our markets, a single smartphone often serves an entire household.

## Approach

We replaced the single rule pile with layered controls: real-time monitoring with per-rail baselines, velocity limits per instrument, device, and merchant, device signals, and behavioral features feeding a risk score that decided allow, challenge, or block. Confirmed-fraud outcomes fed back into the models weekly. The AML/CFT case management workflow was rebuilt around prioritized queues with full context attached, instead of chronological triage. Every new control shipped in shadow mode before it was allowed to block anything.

## Product Strategy

The metric pair was the strategy: fraud loss as a share of GTV and approval rate, on the same dashboard, owned by the same team. A fraud team measured only on losses will torch approvals to zero out its own number, so I framed the north star as net good GTV approved. Risk appetite was set per merchant category rather than gateway-wide, because a tolerable fraud rate for digital goods is an intolerable one for high-ticket categories. Shadow mode was non-negotiable for every control, no matter how obvious it looked.

## Execution

The first device-fingerprinting rules nearly discredited the program: they read shared devices as fraud rings and started blocking entire households. An analyst caught it by noticing the false positives clustered geographically in exactly the neighborhoods where device sharing is normal. We rebuilt the features around that market reality, treating shared devices as context rather than evidence. A weekend card-testing attack later proved the layered model: velocity rules contained it within hours, but our first containment also swept up a merchant's flash-sale traffic, which taught us to pair every attack response with an approval-impact readout before it ships. On the AML side, priority scoring of the alert queue, built with the analysts rather than for them, moved high-risk cases from waiting days to being touched within hours.

## Metrics

- Fraud losses held below 0.1% of GTV
- 97% payment success rate maintained while controls tightened
- False positives down double-digit after the device-sharing rebuild
- High-risk alert time-to-touch cut from days to hours
- PCI-DSS Level 1 and ISO 27001 audits passed without findings

## Results

Merchants stopped treating risk reviews as adversarial, because we could show approval impact alongside fraud impact for every control. The rules library and feature store became reusable infrastructure, so new rails launched with day-one protection instead of learning by bleeding. The fraud-and-approvals dashboard became a sales artifact in enterprise deals, and the case-management rebuild gave compliance leadership numbers they could defend to regulators and auditors without preparation weeks.

## Lessons Learned

A fraud number without an approval number is meaningless, and reporting them separately guarantees someone optimizes one at the other's expense. Local context beats imported best practice: a shared device is a family before it is a ring, and models trained on developed-market assumptions misfire here. Shadow mode is cheap insurance against expensive confidence. And analysts are sensors, not overhead; both of our worst false-positive patterns were caught by humans noticing what the dashboards averaged away.

> How do you hold fraud under 0.1% of GTV without strangling approvals? Put losses and approval rate on the same dashboard owned by the same team, ship every control in shadow first, and tune your signals to local reality, because in emerging markets a shared device is a household, not a fraud ring.
