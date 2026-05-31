---
title: "BIN Routing and Scheme Selection: When To Override the Card-Brand Default"
slug: "bin-routing-scheme-selection-override-default"
category: "Payment Infrastructure"
metaTitle: "BIN Routing and Scheme Selection: When To Override Defaults | Rizwan Zafar"
metaDescription: "The operator's guide to BIN routing, co-badged cards, scheme selection logic, regulator pressure on choice of brand, the four override patterns that move auth rate, and the six failure modes acquirers ship without realising."
excerpt: "BIN routing is the last unglamorous lever in card acquiring. It sits below product, below 3DS2, below tokenisation, and on a portfolio the size of a billion, it moves more authorisation rate than most things the team will ship this year."
publishDate: "2026-05-20"
readingTime: "11 min read"
featured: true
tags:
  - BIN routing
  - scheme selection
  - co-badged cards
  - card acquiring
  - authorisation rate
  - interchange
  - payment infrastructure
  - debit routing
targetAudience:
  - Acquirer product managers
  - Payments architects
  - Pricing and interchange leads
  - Acquirer-processor product owners
  - VP Product at acquirers
targetKeywords:
  - BIN routing payments
  - scheme selection card
  - co-badged card routing
  - debit routing Durbin
  - interchange optimisation routing
  - card acquiring routing
relatedArticles:
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/cybersource-architecture-visa-payment-gateway"
  - "/blog/psd2-sca-exemptions-tra-low-value-recurring"
---

# BIN Routing and Scheme Selection: When To Override the Card-Brand Default

For most of the card-acquiring stack, the scheme is set the moment the cardholder hands over the card: a Visa BIN goes to Visa, a Mastercard BIN goes to Mastercard, the acquirer's job is to forward the message. That single sentence has been the default for two decades, and it is wrong in roughly 40% of real card portfolios, co-badged cards, debit cards in regulated routing markets, local-scheme dual-rail debit, and merchant-selected scheme-of-preference programmes all give the acquirer a genuine choice, and the choice is worth real auth-rate and interchange basis points.

This is the operator's view of BIN routing, what choice actually exists, when overriding the card-brand default is the right call, the four patterns that move portfolio auth rate, and the six places acquirers ship routing logic that quietly costs them margin.

## Where the choice actually exists

Four routing surfaces where the acquirer makes a real decision, not just a forwarding decision.

**1. Co-badged cards.** A physical card that carries two scheme logos (Visa + a local scheme like Cartes Bancaires, Bancontact, Mada, Mir, RuPay, PROS, JCB, Verve, etc.). The merchant or acquirer can choose which rail to route on, transaction by transaction. The default is often the international scheme; the local scheme is usually cheaper and frequently has higher auth rates on domestic traffic.

**2. Dual-rail debit (US Durbin world).** US debit cards carry a signature network (Visa / Mastercard) and at least one PIN network (NYCE, STAR, Pulse, Maestro). Post-Durbin, the merchant has the legal right to choose the routing for in-store and (since 2023) card-not-present transactions. The choice has direct interchange implications.

**3. Local-scheme override on domestic traffic.** Many markets have a national debit scheme that _must_ be offered as an option (Mada in Saudi, NPCI/RuPay in India, BCEL/POS in Vietnam, Mir in Russia, PROS in the Philippines, Verve in Nigeria). Even when the cardholder presents a Visa or Mastercard, regulator pressure may push the acquirer to surface a local-rail option.

**4. Multi-acquirer routing.** Less about scheme choice, more about acquirer choice, but operationally the same logic. Large merchants with two or more acquirers route transactions to the acquirer with the highest expected auth rate per BIN range. This is the same logic engine as scheme routing, applied one layer up.

The acquirer that treats all four as "the network on the card" is leaving real money on the table.

## What "default" gets you, and what "override" buys you

A simple framing. The default rail (the card-brand logo on the front of the card) optimises for the _scheme's_ economics: the international brand wants the international rail. The override rail (whichever co-badge or local rail is also available) often optimises for the _merchant's_ and _acquirer's_ economics.

Three things the override usually buys you, when it applies:

**Lower interchange.** Domestic schemes are frequently cheaper. Mada in Saudi runs at fractions of Visa/Mastercard interchange on domestic traffic. Mir in Russia runs lower than Visa international rates. In the US dual-rail world, debit interchange is regulated lower; PIN routing is often lower-cost than signature routing.

**Higher auth rate on domestic traffic.** Local schemes tend to have closer issuer relationships in their home market. The auth rate on Mada-routed Saudi traffic frequently runs 2–4 points above the same transactions routed via Visa.

**Faster settlement.** Local schemes often settle T+0 or T+1; international schemes are typically T+2. For merchant cash-cycle reasons, this can be more valuable than the interchange delta.

What the default usually buys you that the override does not:

- **Brand reach.** The international scheme works everywhere; the local scheme works in one market. Routing logic applies only to domestic transactions.
- **Scheme tooling depth.** Visa and Mastercard ship richer tokenisation, 3DS2 step-up, dispute, and recurring tooling than most local schemes.
- **Cross-border processing.** Local schemes typically do not process cross-border at all.

The override is a domestic optimisation. It does not (and is not meant to) replace the international rail.

## The four routing patterns that move auth rate

### Pattern 1: Per-BIN local-first routing for co-badged cards

On any card BIN that the acquirer's BIN file marks as co-badged, route the domestic transaction to the local scheme by default. Surface the international scheme only when the domestic rail is unavailable or the transaction is cross-border.

Implementation: a BIN-aware routing service that reads the card's network rail support from the BIN file, checks transaction geography, picks the local rail if domestic, falls through to the international rail otherwise.

The auth-rate lift: 1–3 points on co-badged volume in markets where the local scheme has a stronger issuer footprint.

The trap: BIN files go stale. Co-badge status changes when issuers reissue cards. The routing service has to refresh the BIN data weekly at minimum and gracefully handle the case where the BIN file disagrees with the cardholder's actual card.

### Pattern 2: Issuer-routing optimisation for dual-rail debit (US)

For US debit, score each transaction against the per-issuer historical auth rate on signature vs. PIN. Route to the higher-performing rail for that issuer, that merchant category, that transaction size band. Re-score per-issuer monthly.

This is the most analytical of the four patterns and the hardest to ship cleanly. The data plumbing, per-issuer, per-MCC, per-amount auth-rate tables, is significant. The lift is meaningful: 0.5 to 2 points on debit traffic, plus interchange savings that frequently cover the engineering cost in the first quarter.

### Pattern 3: Merchant-preference override on multi-rail markets

Large merchants in multi-rail markets often have preferences for non-economic reasons (operational simplicity, settlement timing, dispute experience). Let them override the platform default per merchant, per geography, per amount range. Surface the auth-rate difference in the merchant portal so the trade-off is visible.

The lift is sometimes negative (merchant choice does not always optimise auth rate) but the merchant trust gained is worth more than the lost basis points. This pattern is about transparency, not optimisation.

### Pattern 4: Acquirer-of-acquirers routing for large merchants

Merchants connected to two or more acquirers use the acquirer's routing logic to pick the best acquirer per BIN range. From the acquirer's perspective, this is mostly defensive: the merchant routes a higher share of profitable BINs to whichever acquirer scores better on them. Sophisticated acquirers expose their per-BIN auth rate to merchants in real time so the merchant's router can make the right call.

## The six failure modes acquirers ship without realising

**1. Hard-coded default to the international scheme.** The most common failure. The routing engine reads "Visa" off the BIN and forwards to Visa even when the card is co-badged with Mada / RuPay / Mir / local rail. The platform has no per-merchant or per-region override path. Easy to detect (sample 100 co-badged transactions; check the rail they ran on); usually 90%+ international by default; usually a multi-point auth-rate cost that nobody attributed correctly.

**2. Stale BIN files.** The routing decision is only as good as the BIN data. A BIN file that is 18 months old will route as Visa cards that have since been reissued as co-badged Visa+Mada. The platform behaves correctly against an outdated map. Refresh weekly; alert on >0.5% routing-mismatch errors (where the scheme rejects because the BIN no longer supports that rail).

**3. Routing logic outside the post-auth retry path.** When the international rail declines a transaction, a co-badged card _can_ be retried on the local rail. Most platforms do not. The retry-on-local-rail logic, gated on decline reason ("issuer unavailable", "do not honor" with retry-on-different-rail allowed by the scheme rule), recovers 1–2% of declined volume.

**4. No per-merchant routing override.** Routing is set portfolio-wide and merchants cannot opt out, opt in, or alter. Large merchants with operational reasons to prefer one rail go to a competitor.

**5. Routing ignores 3DS2 step-up posture.** Local schemes often have weaker 3DS2 step-up flows. Routing to the local scheme for cost reasons can push step-up rates up on cardholder-present-not-present traffic. The auth-rate gain from cheaper routing is wiped out by the step-up abandonment. Routing logic has to score expected step-up rate alongside interchange and per-BIN auth rate.

**6. Routing decisions invisible to dispute and reconciliation.** When a co-badged card runs on the local rail, the dispute lifecycle and the settlement file format differ. Platforms that route on Pattern 1 but reconcile assuming the international rail produce break-rate spikes that cost more in ops time than the routing saved.

## Regulator pressure: the policy direction

Routing autonomy is moving from "available where regulators allow" to "required where regulators mandate". Three live examples:

- **Saudi Arabia (SAMA).** Mada must be offered as a local-rail option on co-badged cards. Acquirers that route co-badged Saudi cards to Visa/MasterCard by default without surfacing Mada are at scheme-and-regulator risk simultaneously.
- **India (NPCI).** RuPay has been pushed as the preferred rail for domestic debit through a series of merchant discount rate (MDR) and government-procurement directives.
- **Europe (EBA + EC).** The European Commission's Payment Services Regulation (PSR) drafts have proposed stronger rules on choice of brand at the point of sale, particularly for e-commerce, making the default-to-international posture progressively harder to defend.

The strategic read: in five years, acquirers that built routing as a real product surface will be the ones meeting regulator obligations. The ones running default-only routing will be retrofitting.

## What a routing programme actually looks like

A working set of deliverables for a senior PM running a routing programme over two quarters:

1. **BIN file refresh pipeline**, automated weekly refresh, per-source reconciliation, alerting on routing-mismatch declines.
2. **Routing decision service**, pluggable rules: per-merchant defaults, per-region defaults, per-BIN overrides, retry-on-alt-rail logic.
3. **Per-issuer scoring**, auth-rate, decline-reason, step-up-abandonment per issuer per rail per MCC; refreshed monthly.
4. **Merchant-facing routing controls**, per-merchant preferences, per-merchant reporting on routing decisions and outcomes.
5. **Reconciliation parity**, routing-aware settlement file parsing; routing-aware dispute case logic.
6. **Programme KPIs**, auth-rate delta on routed traffic, interchange savings, step-up rate delta, dispute rate delta, reconciliation break rate.

Two quarters is realistic. The auth-rate and interchange uplift across $1B+ TPV justifies it inside the first quarter that the routing engine ships.

## The senior-PM tell

The interview question that separates senior payments PMs on routing is "we have 200 large merchants and a default-to-Visa routing rule. Show me what you would change in the first 90 days."

The junior answer talks about BIN files. The senior answer reads: pull the co-badge share of the portfolio (often 30–50% in MENA, India, Russia, parts of LATAM); identify the top 10 merchants where local-rail routing would lift auth rate by 2+ points; ship a per-merchant override surface for those 10; instrument routing-decision logging end-to-end so the next 60 days has data; brief the scheme account managers (both sides) before the change goes live so neither one is surprised.

That answer is the operating posture. It is also the answer that produces a 2-quarter ROI plan the CFO will sign off on.

## FAQ

**Why does this rarely come up in product reviews?**
Because the lift is hidden behind a dashboard that nobody owns. Auth-rate dashboards usually show the portfolio rate, not the per-rail rate. Once the per-rail decomposition is built and surfaced, the routing conversation starts itself.

**Is the lift real or marketing?**
Real. On portfolios with meaningful co-badged share, the 1–3 point lift on routed traffic translates to portfolio-level auth-rate movement that shows on the quarterly review. Routing is the last unglamorous lever that genuinely produces basis points.

**Do schemes object to local-rail routing?**
Officially no, the scheme rules accommodate choice of brand. Operationally the scheme account managers may push back on aggressive local-first routing. The senior PM owns the relationship; the data tends to settle the conversation.

**Does routing logic affect tokenisation?**
Yes. Network tokens are scheme-specific. A card tokenised on Visa is not the same token on the local rail. Routing-aware platforms maintain the appropriate token per rail and treat the network choice as part of the credential lifecycle.

**What happens with Apple Pay / Google Pay / scheme-hosted wallets?**
Wallet-presented cards usually route to the wallet's tokenised network (typically Visa or Mastercard). The routing override surface is reduced; the local-rail co-badge is usually not preserved through the wallet token. Plan for declining co-badge override leverage on wallet traffic.

**Is this a frontier-market topic only?**
No. Dual-rail debit in the US, choice-of-brand in Europe, and local-scheme mandates in MENA, Russia, India, and Southeast Asia mean routing is live in every major card market. The shape of the choice varies; the discipline does not.

---

If this resonated, also read [MPGS Architecture](/blog/mpges-mastercard-payment-gateway-services-architecture), [CyberSource Architecture](/blog/cybersource-architecture-visa-payment-gateway), and [PSD2 SCA Exemptions](/blog/psd2-sca-exemptions-tra-low-value-recurring).
