---
title: "Prefunding, Netting, and the Cutoff Redesign That Took Payouts from Days to Hours"
category: remittance
tags: [settlement, prefunding, netting, treasury-operations, cross-border-payments]
anonymized_entity: "a cross-border remittance provider"
---

## Challenge

Our liquidity was trapped in the wrong places at the wrong times. Every corridor was prefunded independently, sized by fear rather than forecast, while beneficiaries still waited through weekends because we missed partner cutoffs we did not really understand. Each new corridor made the treasury buffer balloon further, and the CFO's observation was hard to argue with: float was growing faster than volume. My mandate was the pair everyone assured me was a contradiction: make payouts faster and shrink the capital tied up making them happen.

## Context

We operated 5 frontier-market corridors in exotic currency pairs with thin FX markets, mismatched banking weekends, and payout partners who required prefunded accounts before releasing a single payment. We had committed to a 99.95% settlement SLA with those partners, which meant under-funding a corridor was not a cost-saving lever but a breach. Every corridor ran on its own holiday calendar and its own payday rhythm, and our prefunding process acknowledged neither, topping up reactively whenever balances looked thin to whoever checked.

## Approach

Three moves, in order of increasing difficulty. First, multi-currency prefunding driven by corridor-level forecasting that modeled day-of-week patterns, payday cycles, and holiday seasonality instead of a flat safety buffer. Second, netting between flows where money moved in both directions and the legal framework permitted offsetting, so we stopped shipping the same liquidity past itself. Third, a cutoff redesign: mapping every partner's actual operational cutoff against its published one, then re-sequencing our entire batch schedule around reality rather than documentation.

## Product Strategy

I framed treasury as a product whose user is the beneficiary, with one north star: time from sender payment to funds available. Float was the constraint, never the goal. The decisive move was making the trade-off explicit: every hour of buffer trimmed raises SLA breach risk, so we drew the curve, put it in front of finance and risk, and chose an operating point together. That sounds procedural, but it ended years of the float being set by whoever had most recently been burned.

## Execution

The forecast model nearly failed its first real test: a major religious holiday cluster, when remittance volume surges exactly as receiving-market banks close for days. Our model had trained on months containing no such cluster and saw nothing coming; a treasury analyst's warning made us pre-position manually that week, and the SLA survived by less margin than I ever want again. Per-corridor holiday calendars and pre-positioning rules became first-class model inputs after that, not adjustments. The cutoff work produced the cheapest win of the program: one partner's published cutoff turned out to be hours later than their operational one, because their ops team ran the batch early. Empirically testing true cutoffs across every partner recovered hours of payout speed without a line of product code. Netting, meanwhile, consumed more lawyer-hours than engineer-hours, and we only switched it on where both legs had clean legal basis.

## Metrics

- 99.95% settlement SLA held through the redesign
- Beneficiary funds availability on key corridors improved from days to hours
- Multi-currency prefunding live across 5 frontier-market corridors
- Prefunded float reduced by a double-digit percentage while volume grew

## Results

Faster payouts became the claim our payout partners marketed to their own senders, which is the best kind of marketing: someone else's. The float reduction freed capital that funded corridor expansion instead of sitting as insurance. Treasury moved from reactive topping-up to a forecast-driven runbook with named escalation paths, and SLA conversations with partners flipped from defending misses to negotiating from strength.

## Lessons Learned

Cutoffs are empirical facts, not documentation; nobody at the partner is lying, but the published time and the operational time drift apart in both directions, and only testing reveals which. Float forecasting is a calendar problem before it is a statistics problem, because paydays and holidays move more money than any trend line. Netting is a legal product with a financial benefit, not the reverse, and sequencing the lawyers first saves months. Above all, make the float-versus-SLA trade-off explicit and choose the point on the curve deliberately, because if you do not choose it, incidents will choose it for you.

> How do you make remittance payouts faster while shrinking float? Forecast prefunding per corridor around paydays and holidays, net flows where the law allows, and empirically test every partner's real cutoff, because the published one is often hours wrong.
