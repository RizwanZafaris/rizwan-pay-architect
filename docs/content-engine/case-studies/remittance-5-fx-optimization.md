---
title: "Real-Time FX and Dynamic Corridor Pricing: Holding Margin Without Losing the Rate Shoppers"
category: remittance
tags: [fx-pricing, dynamic-pricing, treasury-exposure, corridor-economics, cross-border-payments]
anonymized_entity: "a cross-border remittance provider"
---

## Challenge

Our FX rates were set each morning and held all day, in currencies that did not hold still. When markets moved, one of two bad things happened: the corridor quietly lost money on every transfer, or our rate went uncompetitive and volume drained to whoever had repriced. Senders rate-shop relentlessly, comparing apps and aggregator sites before every transfer, while our treasury carried prefunded positions exposed to every move. Pricing decisions were settled in weekly arguments between growth, which wanted sharp rates, and finance, which wanted floors. My mandate was to price in real time without blowing up either margin or treasury.

## Context

We operated 5 frontier-market corridors in exotic pairs with thin liquidity and episodic volatility around policy announcements, in a product category where price sensitivity is absolute: a visibly better rate moves corridor share within days, and loyalty is a rounding error. Multi-currency prefunding meant FX exposure was structural rather than incidental; we held the currencies we paid out in, so every position was a bet whether we intended one or not. The morning-rate ritual had survived because changing it required pricing, treasury, and finance to agree on something.

## Approach

We built real-time FX with dynamic corridor pricing: live rate feeds into a pricing engine carrying per-corridor margin floors and competitive ceilings, refresh cadence tuned to each pair's liquidity, and quote-hold windows so the rate a sender confirmed was honored even if the market moved mid-session. On the treasury side, hedging where pairs were hedgeable, and position limits with faster recycling where they were not, because pretending an unhedgeable currency is hedged is how exposure hides.

## Product Strategy

Margin versus competitiveness became an explicit dial per corridor instead of a permanent argument. Flagship corridors priced to defend share; corridors where our payout coverage was genuinely differentiated priced to earn margin, because senders there were choosing us for reach, not rate. A weekly pricing council of growth, treasury, and finance owned the dials with corridor-level economics in front of them. Two guardrails were hard-coded: margin floors the engine could not breach, and treasury exposure limits that pricing could not silently expand by winning too much volume in the wrong currency.

## Execution

The first engine repriced too eagerly and nearly poisoned the launch: rates moved between quote and confirmation, senders saw a different rate at payment than at decision, and abandonment spiked with angry tickets behind it. We had built accuracy and shipped betrayal. Quote-hold windows fixed it: the rate a sender sees is locked for the session, with the hold risk sized per corridor by volatility and explicitly owned by treasury rather than denied. The second scare made the discipline permanent: a thin-liquidity currency gapped overnight on a policy announcement. Position limits contained the loss to survivable, and that single night won treasury its formal hedging mandate faster than a year of analysis had.

## Metrics

- Real-time FX with dynamic corridor pricing live across 5 frontier-market corridors
- Quote-to-confirmation abandonment down double-digit after hold windows shipped
- Corridor margins held above floor through volatility events
- Treasury exposure stayed inside limits through the worst single-day move of the period
- Multi-currency prefunding efficiency improved as pricing and treasury ran on shared forecasts

## Results

Pricing became a growth instrument with a steering wheel: measurable share gains on corridors priced to win, margin recovery where coverage differentiated us, and finance finally able to predict corridor economics instead of discovering them. The pricing council outlived the project as the standing forum where corridor decisions get made. The quietest win was trust: the rate you see is the rate you get stopped being a support-ticket category at all.

## Lessons Learned

A quoted rate is a promise, and breaking it at confirmation is the most expensive way to save basis points, because senders forgive a worse rate faster than a changed one. Price per corridor, never per company, since averages hide both the bleeding and the opportunity. Volatility is a treasury problem before it is a pricing problem, and position limits are the control that lets pricing be brave. And give the margin-versus-share argument a table, data, and a weekly cadence, or it will keep being settled by whoever shouted last.

> How do you run real-time FX pricing in volatile remittance corridors? Lock the rate the sender sees, set margin-versus-share dials per corridor through a standing pricing council, and cap treasury exposure independently, because the engine prices the corridor but the limits keep the company.
