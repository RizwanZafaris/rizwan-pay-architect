---
title: "Mastercard Send + Visa Direct: Push-Payment Architecture: Compared"
slug: "mastercard-send-visa-direct-push-payments"
category: "Payment Infrastructure"
metaTitle: "Mastercard Send vs Visa Direct: Push Payment Architecture | Rizwan Zafar"
metaDescription: "How the two scheme push-payment rails actually compare, eligibility, OCT vs Send mechanics, fund-source variants, settlement, deliverability, and the four product surfaces where the choice between them matters."
excerpt: "Mastercard Send and Visa Direct are the two card-rail push-payment products that quietly underpin the gig-economy, insurance-disbursement, gaming, marketplace-payout and remittance flows users now treat as instant. They look interchangeable in marketing decks. They are not."
publishDate: "2026-05-20"
readingTime: "12 min read"
featured: true
tags:
  - Visa Direct
  - Mastercard Send
  - push payments
  - OCT
  - card disbursement
  - payment infrastructure
  - payouts
  - cross-border
targetAudience:
  - Payouts product managers
  - Disbursement platform architects
  - Marketplace and gig-economy PMs
  - Cross-border payments leads
  - VP Product at fintechs running payouts
targetKeywords:
  - Visa Direct vs Mastercard Send
  - push payment architecture
  - OCT card disbursement
  - card payout rails
  - scheme push payments
  - cross-border card push
relatedArticles:
  - "/blog/cross-border-corridors-are-operating-systems"
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/swift-vs-domestic-rails-when-to-use-what"
---

# Mastercard Send + Visa Direct: Push-Payment Architecture: Compared

For most of card-rail history, the cards were the receive-only side of the network. Money came in (cardholder pushes funds to merchant); money did not go out. The two scheme push-payment products, Visa Direct and Mastercard Send, are what changed that. Both let a regulated payer push funds _to_ a card credential at the receiving end, in something close to real time, through the same global card network that the cardholder uses for everyday purchases.

In marketing decks, the products look interchangeable: "send money to any card, near-instant, global reach." In implementation, they share an underlying primitive (the Original Credit Transaction, OCT) but differ in eligibility, fund-source variants, settlement mechanics, deliverability profile, and the kinds of payouts each one ships well.

This is the operator's compare-and-contrast: how each product is wired, where they diverge, the four product surfaces where the choice between them matters, and the six failure modes both produce when teams ship them as black-box features.

## The underlying primitive: OCT

Both products are wrappers around the **Original Credit Transaction** (OCT), a scheme message type that initiates a credit _to_ a card. Mechanically it is a debit-flow inverted: the originator pushes funds, the issuing bank credits the cardholder's account, the scheme settles between the originator and the issuer like any other transaction.

OCT is not new, it has existed in the scheme rulebooks for over a decade. What changed is the productisation: Visa and Mastercard built API products, eligibility programmes, fund-source variants, and operator support around OCT that turned it from a niche message type into a global push-payment rail.

Three things to know about the OCT primitive that both rails inherit:

**1. Acceptance is per-issuer.** The receiving card must be on an issuer that supports OCT. Coverage is global on paper; per-issuer it is patchy. Even within a single market, some issuers honour OCTs cleanly while others reject them or hold them for review.

**2. Settlement runs on standard scheme cycles.** The cardholder sees the funds quickly (often seconds); the originator's settlement and the scheme's settlement run on the standard T+1 / T+2 timetable. The "instant" is a UI promise; the money-movement is scheme-paced.

**3. Refundability is constrained.** An OCT is not freely reversible. A mistaken OCT cannot be unwound the way an authorisation can be voided, it requires a dispute (and the dispute path for push payments is narrower than for purchases).

## Product comparison

| Dimension                         | Visa Direct                                                                      | Mastercard Send                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Underlying message                | OCT (Visa)                                                                       | OCT (Mastercard), also marketed as MoneySend                                              |
| Card eligibility                  | Visa-branded cards globally; eligibility surfaced via VTS / lookup               | Mastercard / Maestro / Cirrus-branded cards globally; eligibility via Send Eligibility API |
| Fund-source variants              | Cards, bank accounts (via RTP / FAST / SEPA Instant), wallets (via integrations) | Cards, bank accounts (via Mastercard Move + bank rails), wallets                           |
| Cross-border                      | Yes, Visa Direct Cross-Border + FX engine                                       | Yes, Send cross-border with scheme-managed FX                                             |
| Real-time deliverability          | Sub-30s typical to Visa Fast Funds-enabled issuers                               | Sub-30s typical to Send Fast-supporting issuers                                            |
| Per-issuer deliverability profile | Visa Direct publishes "Fast Funds" indicator per BIN                             | Send publishes "Send Fast" eligibility per BIN                                             |
| Limits                            | Per-scheme per-issuer; programme-configurable                                    | Per-scheme per-issuer; programme-configurable                                              |
| API surface                       | Visa Developer Platform, Visa Direct Payouts, Funds Transfer, Cross-Border APIs | Mastercard Developers, Send Payments API, Mastercard Move                                 |
| Regulator + AML                   | Originator carries AML / sanctions / reporting per market                        | Originator carries AML / sanctions / reporting per market                                  |
| Refund / dispute                  | Scheme rules per region; not freely reversible                                   | Scheme rules per region; not freely reversible                                             |

The dimensions where the difference shows up in production:

**Card reach in the originator's market.** In any given market, one rail's issuer support is typically deeper than the other's. In MENA / GCC, Visa Direct issuer coverage tends to be wider; in parts of LATAM and Central Asia, Send has historically had stronger penetration. The senior PM picks per market based on actual deliverability rate, not on marketing claims.

**Fund-source flexibility.** Mastercard's Mastercard Move umbrella stitches bank rails + cards + wallets into a single send. Visa Direct + Visa B2B Connect overlap but route through slightly different settlement paths. For multi-rail disbursement (payouts that fall back from card to bank when the card disbursement fails), Move has historically had a more integrated story.

**Cross-border FX mechanics.** Both rails do cross-border. The FX rate, the FX-margin transparency, the funding-side currency support, and the time-to-receive vary by corridor. The senior PM running a remittance product runs the same corridor through both rails for a week and reads the actual receive-side numbers before locking in.

## The four product surfaces where the choice matters

### 1. Gig-economy / marketplace payouts

A rideshare platform paying drivers daily, a creator marketplace paying out earnings weekly, a freelance platform disbursing on milestone completion. The payee usually has one card and one bank account; the payout often needs to land in hours, not days.

- The card rail wins on speed and on the payee's experience.
- The bank rail wins on reliability and on lower per-transaction cost.
- Multi-rail (card-first with bank-fallback) wins on both.

Either Send or Direct works. The choice usually defers to:

- Which scheme has better issuer support in the payee's primary market.
- Which fund-source variant pairs better with the platform's existing acquiring relationship (often: same scheme on both sides for operational simplicity).
- Which scheme's eligibility API the engineering team prefers.

### 2. Insurance and government disbursements

Higher per-transaction amounts; lower frequency; payee identity is verified and stable. The choice criteria shift:

- **Reliability over speed.** A 24-hour delay on an insurance claim payout is annoying; a failed disbursement is a reputational hit.
- **Regulatory acceptability.** Public-sector disbursement programmes often have rail preferences set by procurement, not by product.
- **Per-payee profiling.** High-value payouts may justify per-payee deliverability checks before initiating, where the Send / Direct lookup APIs become first-class.

### 3. Remittance and cross-border payouts

The corridor maths dominates:

- **Receiving-side rail support.** Many emerging-market BINs support neither rail or only one. The senior PM has a corridor map showing which rail works at scale per corridor.
- **FX margin.** Scheme-managed FX is convenient and opaque. The senior PM tracks the receive-side amount and compares to alternative rails (SWIFT, local instant rails, stablecoin) per corridor.
- **AML / regulatory carry.** Cross-border push payments to cards carry remittance-reporting obligations under local AML rules. The originator owns the reporting, not the scheme. The senior PM ships this as a programme, not a checkbox.

### 4. B2B vendor payouts

Higher amounts; often a 1099 / VAT context; payee is a business, not a consumer. Card rails are less natural here:

- The payee often does not have a business card that supports OCT receipt.
- Limits frequently bind on B2B amounts.
- Reporting (1099-NEC in the US, equivalent in other markets) is friendlier with bank-rail audit trails.

For B2B, the senior PM usually defaults to bank rails (Mastercard Track + Move B2B, Visa B2B Connect, SWIFT) and uses card push only when the payee specifically asks for it.

## Six failure modes both rails produce

**1. Eligibility lookups not run.** Pushing to a non-OCT-eligible card produces a decline that looks like a transient error. The receiving-card eligibility API exists; many integrations skip it. The senior PM ships the eligibility check pre-send as a guard rail.

**2. Send-fast / Fast-Funds assumption.** "Real-time" depends on issuer-side Fast support. Roughly 30–60% of issuers globally support it; the rest are slower (often T+1). Treating "real-time" as the default produces support tickets when the payee waits and the funds do not arrive.

**3. Limits exceeded silently.** Per-issuer, per-scheme, per-corridor limits change. A push that worked yesterday fails today because the issuer reduced its inbound limit overnight. Limit visibility is poor at the API layer; the senior PM ships a daily limit health-check that pings each corridor.

**4. AML / reporting carry mis-set.** The originator owns the AML obligation. Marketing decks make the rails feel like the scheme is the regulated party; they are not. Programmes that ship push payments without standing up the AML / sanctions / reporting pipeline produce regulator findings.

**5. Refund path missing.** Mistaken OCTs are not freely reversible. A payouts product without a defined refund / claw-back / dispute path ends up handling errors manually for years. The senior PM defines refund mechanics before launch.

**6. Cross-border tax / regulatory mismatches.** Sending a card-rail push to a payee in a market with cross-border remittance restrictions, capital-controls, or specific licensing requirements creates regulatory exposure for the originator. The senior PM maintains a per-corridor regulatory-eligibility map.

## What a push-payment programme actually looks like

A working set of deliverables for a senior PM standing up a Send / Direct programme over two quarters:

1. **Rail abstraction.** A single internal API that fronts both Visa Direct and Mastercard Send; the rail decision is per-payee, per-corridor.
2. **Eligibility lookup pipeline.** Per-card eligibility check, cached with a TTL appropriate to the rail's eligibility refresh cycle.
3. **Per-corridor deliverability profile.** Per-rail, per-corridor, per-issuer deliverability tracking; refreshed weekly.
4. **Multi-rail fallback.** Card-first, bank-fallback (or vice versa) per payee preference.
5. **AML / sanctions pipeline.** Pre-send screening, post-send reporting, audit-evidenced.
6. **Refund / dispute runbook.** Defined paths for mistaken disbursements, recalled payouts, dispute escalation.
7. **Programme KPIs.** Per-rail success rate, time-to-funds-available, per-corridor reach, FX margin transparency, per-corridor regulator finding count.

Two quarters is realistic for greenfield. For an existing payouts platform retrofitting both rails: closer to three quarters.

## The senior-PM tell

The interview question that separates senior payouts PMs: "your gig-economy platform runs on Visa Direct. Send issuer coverage is 15 points higher in the payee's primary market. What do you do?"

The junior answer says: switch. The senior answer reads: confirm the coverage delta with 60 days of actual deliverability data; check whether the funding side and operating model carry the switch cleanly; assess the regulator profile (does the AML pipeline support multi-rail or only Visa today?); pilot Send to 5% of payees in that market for 30 days; if pilot holds, run multi-rail with eligibility-routed selection per payee, not a hard switch. Document the rail choice criteria so the platform can re-route per corridor as scheme coverage shifts.

That answer is the difference between a product team that ships push payments and one that ships a rail decision they have to redo in 12 months.

## FAQ

**Are Visa Direct and Mastercard Send the same product?**
No. They share an underlying primitive (OCT) but the eligibility APIs, fund-source variants, cross-border mechanics, and operator support differ. Treat them as related but distinct rails.

**Can a Visa Direct push land on a Mastercard card?**
No. The rail is scheme-specific. Visa Direct pushes to Visa-branded receiving cards; Mastercard Send pushes to Mastercard/Maestro/Cirrus. Multi-rail platforms ship both.

**How fast is "real-time"?**
Issuer-dependent. For Fast Funds / Send Fast-enabled issuers, sub-30 seconds is normal. For non-Fast issuers, the funds may take hours to next-day. The senior PM publishes the actual time-to-funds per corridor, not a portfolio average.

**What about Mastercard Move?**
Mastercard Move is the umbrella product that bundles Send (card rail), bank rails, and wallet rails under a single API surface. For multi-rail disbursement, Move is the modern entry point; Send sits inside it.

**Does Visa Direct Cross-Border have a Mastercard equivalent?**
Yes, Mastercard Cross-Border Services covers cross-border push (and pull) across cards + bank rails. The corridor coverage and FX mechanics differ from Visa Direct Cross-Border; the senior PM benchmarks per corridor.

**How do I choose between Send / Direct and SWIFT / local rails?**
For consumer-to-consumer or business-to-consumer disbursements where the payee's primary credential is a card, Send / Direct usually wins on speed and UX. For B2B, regulated high-value, or markets without card-rail issuer depth, SWIFT / local instant rails are usually the right call. The senior PM ships both and routes per use case.

---

If this resonated, also read [Cross-Border Corridors Are Operating Systems](/blog/cross-border-corridors-are-operating-systems), [SWIFT vs Domestic Rails: When To Use What](/blog/swift-vs-domestic-rails-when-to-use-what), and [MPGS Architecture](/blog/mpges-mastercard-payment-gateway-services-architecture).
