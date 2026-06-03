---
title: "PSD2 SCA Exemptions: TRA, Low-Value, Recurring, Trusted Beneficiary, MIT, and How To Actually Use Them"
slug: "psd2-sca-exemptions-tra-low-value-recurring"
category: "Payment Infrastructure"
metaTitle: "PSD2 SCA Exemptions Explained: TRA, Low-Value, Recurring | Rizwan Zafar"
metaDescription: "How the five PSD2 SCA exemptions actually work, TRA, low-value, recurring, trusted beneficiary, MIT, when each one applies, the issuer-side reality, and the auth-rate maths behind exemption strategy."
excerpt: "PSD2 SCA exemptions can materially lift card-not-present conversion. The five exemptions are well-documented in the RTS; the mechanics that make them ship are not."
publishDate: "2026-05-20"
readingTime: "11 min read"
featured: true
tags:
  - PSD2
  - SCA
  - 3DS2
  - TRA exemption
  - low-value exemption
  - recurring payments
  - MIT
  - card acquiring
  - authorisation rate
targetAudience:
  - Acquirer product managers
  - Payment platform architects
  - Fraud-risk leads
  - 3DS2 / scheme product owners
  - Senior PMs at Visa / Mastercard / Stripe / Adyen
targetKeywords:
  - PSD2 SCA exemptions
  - TRA exemption explained
  - low-value exemption SCA
  - recurring payment SCA exemption
  - trusted beneficiary 3DS2
  - MIT exemption
relatedArticles:
  - "/blog/emv-3ds2-step-up-frictionless-optimisation"
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/mdes-network-tokenisation-how-it-actually-works"
---

# PSD2 SCA Exemptions: TRA, Low-Value, Recurring, Trusted Beneficiary, MIT, and How To Actually Use Them

If you read only the PSD2 Regulatory Technical Standards on Strong Customer Authentication, the exemptions look mechanical: a checklist, five doors, walk through the right one and the issuer leaves the cardholder alone. The first time a senior payments PM tries to operationalise that checklist, the picture changes. The doors are open in writing and partly closed in practice. The issuer can override every exemption you flag, the scheme will count fraud across all your TRA traffic regardless of which acquirer triggered it, and the merchant cares about abandon-recovery, not exemption taxonomy.

This is the operator's view of the five PSD2 SCA exemptions: what each one actually does, the issuer-side reality that overrides the rulebook, the auth-rate maths behind exemption strategy, and the six places a real exemption programme breaks down at scale.

## The five exemptions in one paragraph each

**Transaction Risk Analysis (TRA).** Available to issuer and acquirer; depends on both parties maintaining a low enough portfolio fraud rate to qualify for one of three TRA bands (€100 / €250 / €500). Below the band's ceiling, the acquirer can request frictionless processing for the transaction; the issuer's TRA score is what decides the response. Single biggest exemption in volume; single biggest risk surface.

**Low-value transaction.** Available below €30, with a maximum of five consecutive low-value transactions or €100 cumulative since the last SCA, whichever comes first. Simple in principle; in practice, the counters are issuer-side and the merchant has no visibility into them.

**Recurring transactions.** Available for fixed-amount, same-merchant subscriptions where the first transaction was authenticated with SCA. The exemption applies only to subsequent transactions of the _same_ amount; any change in the amount resets the cycle.

**Trusted beneficiary.** Available when the cardholder has added the merchant to their issuer-side "trusted" list. Set at the issuer; visible to the acquirer only by outcome. Useful where it applies, but the activation flow is outside the merchant's control.

**Merchant-initiated transaction (MIT).** Strictly speaking not an SCA exemption, MITs are out of scope of SCA, but operationally they live in the same flow logic. Any MIT (post-authentication recurring, account top-up, unscheduled MIT for hotel incidental charges, etc.) sidesteps SCA when correctly flagged with the MIT indicator and a valid prior authentication reference.

## Issuer-side reality

The single thing most acquirer-side product teams underestimate is that the exemption flag is a _request_, not a _grant_. The cardholder's issuing bank holds the decision. Five things the issuer can do regardless of what you flag:

1. **Step up anyway.** The issuer can override any acquirer exemption request and force SCA. They do this when their own fraud model is twitchy on the issuer side, when the cardholder has been flagged for high-risk activity, or when their TRA bandwidth is exhausted.

2. **Soft-decline anyway.** Even with an exemption granted, the issuer can decline for risk, balance, or velocity reasons unrelated to authentication.

3. **Maintain a separate TRA band.** The issuer's TRA fraud rate is calculated across all the issuer's traffic; not by acquirer, not by merchant. An issuer in band 1 (€100 ceiling) will not honour TRA above €100 even if your acquirer is in band 3 (€500).

4. **Refuse trusted-beneficiary requests.** If the issuer's UX never surfaces the "add to trusted list" option (most don't, surprisingly), the trusted-beneficiary exemption is a paper rule with no operational signal.

5. **Count fraud differently.** PSD2 SCA fraud-rate maths counts fraud per €1,000 of transactions. The issuer and the acquirer maintain separate calculations. If your acquirer-side TRA fraud rate is 5 bps and the issuer-side is 18 bps, the issuer downgrades its band; transactions you flag for TRA come back step-up regardless.

The implication: an exemption strategy that does not track **per-issuer outcome** is flying blind. Two acquirers running identical exemption logic see different frictionless rates because their merchant mix sends them to different issuer pools.

## The fraud-rate maths

Acquirer TRA bands are tied to portfolio fraud rate (basis points of transaction value):

| Band | Fraud rate ceiling | TRA exemption ceiling |
| ---- | ------------------ | --------------------- |
| 1    | ≤ 13 bps           | €100                  |
| 2    | ≤ 6 bps            | €250                  |
| 3    | ≤ 1 bp             | €500                  |

The ceilings are _transaction value_, not _transaction count_. Two practical consequences:

**Band drift is a slow tide.** Fraud rate is rolling-90-day. A bad week does not cost you the band. A bad quarter does. Senior PMs watch the rolling rate weekly and the trend daily.

**Band recovery is slow.** Once you drop from band 3 to band 2, you cannot ship back. The portfolio has to maintain the lower rate for the full rolling window. A 30-day spike that drops you out costs you ~60 days of merchant-facing exemption ceiling.

**Band 3 is a competitive moat.** Acquirers in band 3 ship 80%+ frictionless rates on routine traffic; band 1 acquirers cap at 35–45% even with everything else optimal. The frictionless rate becomes part of merchant pricing negotiations, it is worth real basis points of auth-rate margin.

## When each exemption is the right call

A working operating posture: flag exemptions in this precedence order, fall through to step-up only when none match.

1. **MIT**, for any payer-not-present recurring or unscheduled MIT with a valid prior authentication reference. This is the cleanest path; it skips SCA cleanly.
2. **Recurring**, for fixed-amount, same-merchant subscriptions where the first transaction was authenticated.
3. **Trusted beneficiary**, when the issuer has flagged the merchant as trusted for this cardholder. Read the inbound signal; do not invent it.
4. **Low-value**, below €30. Cheap when it works; the issuer counter is the catch.
5. **TRA**, for everything above €30 where merchant mix and fraud profile justify it. Highest-volume exemption; highest risk surface.

If none apply, request step-up. Do not flag an exemption you cannot defend in a scheme audit. Flagging exemptions you have no basis for is the fastest way to drop a band.

## The exemption-strategy decisions a senior PM owns

**Per-merchant exemption profile.** Not every merchant fits every exemption. A grocery chain with 80% sub-€30 transactions runs heavy on low-value. A streaming service runs heavy on MIT + recurring. A B2B billing platform runs heavy on TRA at the high end. The senior PM ships per-merchant exemption profiles, not portfolio defaults.

**Per-issuer scoring.** Once the platform has 3+ months of data, the senior PM tags each major issuer with its observed override rate for each exemption type. Issuers that override TRA above €200 90% of the time get a lower TRA ceiling in your flagging logic for cardholders on their BINs. Issuers that honour trusted-beneficiary cleanly get the trusted-beneficiary route requested even when other exemptions also apply.

**Step-up recovery flows.** Step-up is not the end of the world; an abandoned step-up is. The product surface that recovers a half-completed 3DS2 step-up (offline-authentication retry, OTP resend, friendly error copy, fallback to an alternative payment method) recovers 5–15% of transactions that would otherwise be lost. This is part of the exemption programme, not separate from it.

**Per-band ceiling enforcement.** The acquirer's actual exemption ceiling is the lower of the acquirer's band and the issuer's band. The senior PM ships logic that respects both. Requesting a €450 TRA exemption from an issuer in band 1 is not a product decision; it is a scheme audit finding.

**Fraud-rate guard-rails.** The exemption programme has its own KPIs, frictionless rate, step-up rate, fraud rate per €1,000, with hard floors written into the OKR slate. When the fraud rate creeps toward the band ceiling, the programme tightens automatically (lower per-issuer TRA caps, higher exemption-decline rates on marginal BINs), not after a quarterly review.

## Six places exemption programmes break in production

**1. Stale per-issuer scoring.** Issuers change their internal models without telling acquirers. A BIN that was honouring 90% of TRA requests last quarter is honouring 40% this quarter. The exemption programme has to re-score per-issuer every 30 days at minimum.

**2. Counter desynchronisation on low-value.** The acquirer thinks the cardholder is on transaction 3 of 5; the issuer thinks 5 of 5. The next request is step-up. Acquirer-side low-value counters are best-effort; treat them as a hint, not a contract.

**3. Recurring-amount drift.** A subscription that bumps the amount by 1% (currency rounding, FX float) breaks the recurring exemption. Suddenly the issuer step-ups. Recurring exemption logic must clamp to _exact_ amounts in the original authorisation currency.

**4. MIT flag missing on captured authorisations.** The MIT indicator must be present at authorisation, not at capture. Sending MIT at capture is operationally invisible until the issuer chargeback comes in 60 days later with "no SCA evidence" reason.

**5. Scheme TRA reporting lag.** The scheme calculates your band fraud rate on a rolling 90-day window with a 7–10 day reporting lag. The internal dashboard sees the rate in real time; the scheme's view of you lags. Senior PMs ship both views.

**6. Cross-border exemption rules.** SCA exemptions are EEA-mandated. Cross-border transactions where either the issuer or the acquirer sits outside the EEA may or may not honour exemption requests depending on the scheme's "best-effort" rules. The exemption programme has to flag these and lower expectations.

## Auth-rate maths: what an exemption programme is worth

A working back-of-envelope: every 10 percentage points of frictionless rate is worth ~1.5 to ~2.5 percentage points of authorisation rate, depending on the merchant mix and the step-up abandonment rate.

A platform that moves from 40% frictionless to 70% frictionless across the portfolio captures ~5–7 points of auth rate. On $2B annualised TPV that is $100M–$140M of additional successfully authorised volume per year. The investment is one senior PM, two engineers, one fraud-risk analyst, and 12 months of disciplined per-issuer iteration. Almost no other single product programme produces the same return.

## The senior-PM tell

The interview question that distinguishes senior payments PMs on SCA work is not "what are the exemptions?" It is "your platform sits in TRA band 1, your competitor sits in band 3, and the largest merchant is asking why. What is your plan?"

The junior answer recites the rulebook. The mid-level answer talks about reducing fraud. The senior answer reads: prove the band gap is real (it usually is, in the merchant's view, even when the rate technically qualifies); ship a tightened TRA programme on the highest-fraud merchant cohort that pulled the band down; isolate the per-issuer profile that drove the bad rate (often a single BIN range carries 30%+ of fraud); negotiate per-merchant ceiling differentiation with the scheme; expect to recover one band in six months and the second in another four.

That answer is the operating posture. It is also the answer that wins the merchant conversation.

## FAQ

**Is SCA still required for cards issued outside the EEA?**
Strictly, no. Operationally, many issuers outside the EEA honour the 3DS2 step-up flow because it lowers their fraud loss. Acquirers in the EEA must apply SCA only when both parties are in the EEA, but the platform behaviour is often "request step-up where the issuer supports it" regardless.

**Does TRA work for one-leg-out transactions?**
Best-effort. Schemes publish "one-leg-out" guidance that says exemption requests can be sent and may be honoured; the issuer outside the EEA is under no obligation. Senior PMs treat one-leg-out TRA as a 50/50 bet and instrument it separately.

**Can the merchant override the acquirer's exemption decision?**
No. The merchant requests a payment; the acquirer decides which exemption (if any) to flag; the issuer decides whether to honour. Merchant override is not a thing the rulebook contemplates.

**What about delegated authentication (Mastercard / Visa delegated SCA)?**
Delegated SCA programmes let large merchants authenticate the cardholder via their own credentials (e.g., Apple Face ID inside the merchant app) and pass that as evidence to the issuer. Operationally an additional exemption-like path; reserved for top-tier merchants with high-trust authentication and direct scheme arrangements.

**How is exemption performance reported back to the merchant?**
At a minimum monthly per merchant: frictionless rate, step-up rate, step-up abandonment, auth-rate delta vs portfolio. Some platforms expose this in real time. Reporting transparency is itself a sales lever.

**What happens to exemption strategy when 3DS3 (or whatever comes next) lands?**
Pattern repeats: new specifications open new exemption surfaces; the senior PM owns the migration. The discipline (per-issuer scoring, per-merchant profiles, fraud-rate guard-rails) carries forward.

---

If this resonated, also read [EMV 3DS2 Step-Up Logic + Frictionless Flow Optimisation](/blog/emv-3ds2-step-up-frictionless-optimisation), [MDES + Network Tokenisation](/blog/mdes-network-tokenisation-how-it-actually-works), and [MPGS Architecture](/blog/mpges-mastercard-payment-gateway-services-architecture).
