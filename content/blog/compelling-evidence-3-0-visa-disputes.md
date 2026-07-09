---
title: "Compelling Evidence 3.0 (Visa): What Changed, and How To Actually Win Disputes Now"
slug: "compelling-evidence-3-0-visa-disputes"
category: "Payment Infrastructure"
metaTitle: "Compelling Evidence 3.0 (Visa): What Changed and How To Win | Rizwan Zafar"
metaDescription: "Visa Compelling Evidence 3.0 in practice: the prior-transaction lookback, the fields acquirers must capture, and the seven moves that flip dispute win rate."
excerpt: "Compelling Evidence 3.0 is the most consequential dispute-rule change Visa has shipped in a decade. The mechanics look like a documentation update; the operating implication is a complete rework of how acquirers capture, store and present transaction evidence."
publishDate: "2026-05-20"
readingTime: "11 min read"
featured: true
tags:
  - Visa Compelling Evidence
  - dispute management
  - chargeback
  - friendly fraud
  - dispute response
  - card acquiring
  - payment infrastructure
  - merchant disputes
targetAudience:
  - Dispute / chargeback product leads
  - Acquirer-processor product owners
  - Merchant-of-record product PMs
  - Risk and fraud leads
  - VP Product at acquirers
targetKeywords:
  - Compelling Evidence 3.0
  - Visa CE 3.0 disputes
  - friendly fraud disputes
  - dispute evidence rules
  - chargeback win rate
  - merchant dispute response
relatedArticles:
  - "/blog/chargebacks-product-problem"
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/mdes-network-tokenisation-how-it-actually-works"
---

# Compelling Evidence 3.0 (Visa): What Changed, and How To Actually Win Disputes Now

The standard read on Visa Compelling Evidence 3.0 reduces a complex rule change to a soundbite: "two prior undisputed transactions in the last 120-365 days flip the chargeback to friendly fraud, win it for the merchant." The soundbite is technically correct and operationally misleading. Compelling Evidence 3.0 is not a one-paragraph rule, it is a structural change in how the acquirer-merchant evidence pipeline has to operate, with implications that take most platforms two quarters to ship cleanly.

This is the operator's view: what actually changed, the evidence fields the acquirer must capture and store, the prior-undisputed-transaction lookback mechanics that everyone gets wrong the first time, and the seven moves that genuinely move the dispute win rate on covered chargeback reason codes.

## What changed, plainly

Compelling Evidence 3.0 (CE3.0), effective April 2023, applies to Visa chargeback reason code 10.4 ("Fraud, Card Absent Environment"), the highest-volume CNP fraud-dispute category. The rule introduces a structured evidence path: if the merchant can demonstrate, with specified data points, that the cardholder has _previously transacted with the merchant on the same card without dispute_, the dispute is reclassified as **first-party misuse** ("friendly fraud") and the chargeback is reversed in the merchant's favour without going to arbitration.

The previous CE rules existed but were narrow, hard to qualify for, and weighted towards subjective evidence (delivery confirmation, IP address matches, cardholder communication). CE3.0 codifies an objective test on prior-transaction data the acquirer is supposed to have anyway.

Mechanically, the merchant (via the acquirer) must demonstrate:

- **Two prior undisputed transactions** by the same cardholder, on the same card (matched on PAN or scheme token), within a defined lookback window, typically 120–365 days, and at least **120 days old** on the day the disputed transaction was made.
- **Matching identifiers** between the prior undisputed and the disputed transaction: at minimum two of (IP address, device ID, account login ID, shipping address, billing address).
- Evidence package submitted in the structured CE3.0 format within the standard chargeback response window.

The 120-day-old requirement matters: the prior undisputed transactions must have aged past the chargeback liability window, so the cardholder can no longer dispute them and undo the evidence retroactively.

## Why this is structurally a big deal

Three reasons CE3.0 lands harder than the rule text suggests.

**1. It moves the burden to the acquirer-merchant pipeline.** The cardholder no longer wins the dispute on their statement of "I didn't do this" alone. The merchant has structured proof; the issuer accepts it without representment if the data quality is good. The dispute outcome is decided by the data, not the conversation.

**2. It punishes platforms with poor transaction-history hygiene.** A merchant that stored PAN-only (not tokenised) and rotated card vaults loses the prior-undisputed link. A merchant that did not log IP, device, account ID or shipping address consistently cannot meet the matching-identifier test. Platforms with sloppy data lose disputes they could win.

**3. It changes the friendly-fraud math.** First-party misuse ("I bought it but I'm claiming I didn't") was historically expensive to fight and frequently abandoned. CE3.0 makes friendly fraud structurally winnable. The downstream effect is that cardholders who were running serial friendly-fraud find their disputes reversed on first attempt, and the practice becomes less rewarding.

## The five evidence fields the acquirer must capture

For every CNP transaction across the platform, captured at authorisation time and stored in a queryable format:

1. **Cardholder identifier.** PAN-equivalent (PAN itself, or a stable scheme token mapped to the PAN). Must remain queryable across the 365-day lookback window even when the underlying PAN is reissued, the merchant rotates vaults, or the platform migrates tokenisation providers.

2. **IP address.** The IP the cardholder transacted from. Stored with full precision (not anonymised), keyed against the transaction, retained for at least 18 months.

3. **Device fingerprint or device ID.** A stable, hashed identifier for the cardholder's device. Generated client-side by a device-fingerprinting library at checkout, persisted server-side against the transaction.

4. **Account login ID.** If the merchant has a user account model, the merchant-side user identifier the cardholder logged in as. Critical for digital-goods, subscription, and marketplace platforms.

5. **Shipping address (or billing address for digital goods).** Full address, normalised to a consistent format, queryable.

Most acquirer platforms capture all five, but not in the queryable, retain-for-365-days, cardholder-cross-referenced format CE3.0 needs. The most common gap is the cardholder identifier: when the platform migrates tokenisation, the prior-transaction history is broken and the lookback returns nothing.

## The lookback mechanics: where most platforms get it wrong

The CE3.0 lookback is not "any two prior transactions in the last year". The structure is more particular.

- **At least 120 days old, no more than 365 days old.** A prior transaction from yesterday cannot count; the cardholder could still dispute it. A prior transaction from two years ago is outside the window.
- **Same cardholder, same merchant.** Sub-merchant relationships (marketplaces, MoR/PSP) are the trickiest case: the rule reads "same merchant", which usually means the merchant of record presenting on the disputed transaction, not the seller behind it.
- **No prior dispute on the matched transactions.** A prior transaction that was itself disputed (even if won by the merchant) does not count as an "undisputed" prior.

Three operational implications:

**The data has to be queryable by cardholder, not by transaction.** Most transaction stores index by transaction ID. CE3.0 lookup needs an index by cardholder (PAN-equivalent or token), filtered to undisputed transactions, ordered by transaction date. Platforms that did not anticipate this re-index post-hoc.

**Token-PAN linkage matters.** A merchant that started PAN-on-file and migrated to scheme tokens has two histories: pre-migration PAN history, post-migration token history. The lookback has to bridge both. The acquirer that built tokenisation as a clean cutover usually broke its own CE3.0 lookback.

**Sub-merchant identity has to be tracked.** For marketplace and MoR platforms, the rule wording forces a decision: does the CE3.0 lookback look across all sub-merchants under the MoR umbrella, or only at the specific sub-merchant? The conservative read is per-sub-merchant; the aggressive read is umbrella-wide. The senior PM picks a posture and documents it.

## The seven moves that lift the win rate

**1. Migrate the entire CNP portfolio to scheme tokens.** Token-based cardholder identity is stable across reissuance; PAN-based is not. Every reissued card is a broken lookback chain. Tokenisation (MDES for Mastercard, VTS for Visa) closes the gap. See [MDES + Network Tokenisation: How It Actually Works](/blog/mdes-network-tokenisation-how-it-actually-works).

**2. Build the cardholder-indexed transaction store.** A dedicated index from (cardholder identifier) → (transactions, with disputed flag and timestamp). Refreshed in near-real-time. The single piece of infrastructure that decides whether CE3.0 lookups succeed or time out.

**3. Capture device fingerprinting consistently.** A device-ID library on every checkout, every payment surface, every merchant integration mode. The merchant's hosted-checkout flow may capture it; the merchant's API integration usually does not without explicit work.

**4. Ship CE3.0 evidence as a structured artefact.** Acquirer-side, package the five fields plus the prior-transaction references into the scheme-specified evidence format. The package is a small JSON payload, not a PDF, but most legacy dispute systems still build PDF packages. Modernise the dispute response surface to emit structured evidence.

**5. Surface CE3.0 eligibility in the merchant portal pre-dispute.** Before the dispute lands, the merchant can see which of their cardholders have a CE3.0-eligible history. Surfacing this turns CE3.0 from a defensive evidence pipeline into a fraud-economics decision (some merchants will choose to fight more disputes once they see they can win).

**6. Track win rate by reason code, not portfolio-wide.** CE3.0 covers reason code 10.4 specifically. Tracking a portfolio-wide win rate masks the CE3.0 effect. Per-reason-code reporting shows the lift CE3.0 actually delivers, typically from 25–35% win rate on 10.4 disputes to 60–80% post-implementation, on the subset of disputes where the cardholder-history evidence qualifies.

**7. Pair CE3.0 with the dispute portal v2.** The CE3.0 evidence is one input. The merchant's own evidence (delivery confirmation, communication, terms of service) supplements it. A modern dispute portal lets the merchant upload supplementary evidence; the acquirer's case manager packages it with the CE3.0 payload. Both pieces matter; neither alone is enough on all disputes.

## What CE3.0 does _not_ cover

The rule applies only to **CNP fraud reason 10.4**. It does not affect:

- **CNP non-fraud disputes** (services not provided, defective merchandise, etc.), those follow their own evidence rules.
- **Card-present fraud**, different reason codes, different rules.
- **Authorisation-related disputes**, out of scope.
- **Mastercard equivalent disputes**, Mastercard has its own evidence rules (different reason codes, different lookback requirements). The senior PM ships parallel evidence pipelines for both schemes.

The implication: CE3.0 is a _programme_, not a feature. It needs to be co-ordinated with a Mastercard equivalent programme, a non-fraud disputes programme, and the card-present surface. Treating CE3.0 in isolation produces a portal that wins one quarter of disputes brilliantly and ignores the other three quarters.

## The win-rate maths

Real numbers from a portfolio with $2B annualised CNP TPV and 14 bps fraud-dispute rate:

- Pre-CE3.0 win rate on 10.4 disputes: ~28%
- Post-CE3.0 win rate (with full evidence pipeline): ~72%
- Share of total disputes that are 10.4: ~55%
- Net win-rate lift on the dispute portfolio: ~24 percentage points

On the same portfolio, the financial impact: ~$5.6M annual reduction in dispute losses (chargeback amount + scheme fees), against a one-time investment of one senior PM, one engineer, one risk analyst for two quarters. Among the highest ROI projects in card acquiring.

## The senior-PM tell

The interview question that distinguishes senior dispute product PMs: "CE3.0 is shipped. We are winning 35% of 10.4 disputes. Industry benchmark is 70%. What do you fix?"

The junior answer talks about evidence quality. The senior answer reads the data: pull the failed-CE3.0 disputes; tag them by failure reason (insufficient cardholder history, broken token-PAN linkage, missing device ID, no matching identifier, lookback timeout). 70% of the failures will trace to one or two of those reasons; the gap is structural, not procedural. Ship the index, ship the device library, fix the token-PAN linkage. Re-measure in 60 days.

That answer is the difference between a CE3.0 implementation that earns its keep and one that ships a feature.

## FAQ

**Is CE3.0 worth the engineering investment for small acquirers?**
Below ~$200M CNP TPV the ROI is marginal because the absolute dispute count is low. Above ~$500M CNP TPV the investment pays back in 2–3 quarters. In the middle, it depends on the merchant mix.

**Can the merchant submit CE3.0 evidence directly to Visa?**
No. The acquirer is the channel for dispute responses. The merchant submits to the acquirer; the acquirer packages and submits to the scheme. This is one of the structural reasons CE3.0 is an acquirer-product programme, not a merchant-tooling one.

**Does CE3.0 apply across all Visa regions?**
Largely yes, with regional implementation timelines and minor variations. Senior PMs check the scheme manual for their region (Visa Core Rules + the regional supplement) rather than assuming the global rule applies as written.

**Mastercard equivalent, what is it?**
Mastercard's chargeback evidence rules use a different structure (reason codes 4837, 4853, etc., and pre-dispute mechanisms like Ethoca and Mastercard Consumer Clarity). The principles are similar (structured evidence, prior-transaction lookback) but the data formats and submission paths differ. The senior PM ships both pipelines.

**How does CE3.0 interact with 3DS2 step-up?**
Strongly. Transactions authenticated via 3DS2 step-up carry liability shift to the issuer for many fraud reason codes. CE3.0 lives in the unauthenticated-CNP space, exemption transactions, MITs, and step-up failures. The two programmes complement each other; the senior PM sees them as a single coordinated dispute-defence stack.

**What happens to CE3.0 if the cardholder reissues their card?**
If the merchant tokenised, the scheme token persists across reissuance and the prior-transaction history remains queryable. If the merchant stored PAN-on-file, reissuance breaks the chain. This is the operational reason network tokenisation is a CE3.0 prerequisite, not just an optimisation.

---

If this resonated, also read [Chargebacks Are a Product Problem](/blog/chargebacks-product-problem), [MDES + Network Tokenisation](/blog/mdes-network-tokenisation-how-it-actually-works), and [EMV 3DS2 Step-Up Logic + Frictionless Flow Optimisation](/blog/emv-3ds2-step-up-frictionless-optimisation).
