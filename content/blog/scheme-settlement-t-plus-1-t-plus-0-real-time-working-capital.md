---
title: "Scheme Settlement: T+1 vs T+0 vs Real-Time and the Working-Capital Math That Decides"
slug: "scheme-settlement-t-plus-1-t-plus-0-real-time-working-capital"
category: "Settlement & Reconciliation"
metaTitle: "Scheme Settlement: T+1 vs T+0 vs Real-Time | Rizwan Zafar"
metaDescription: "How card scheme settlement actually works, T+1 vs T+0 vs same-day vs real-time, the funding-side mechanics, the working-capital cost of each cadence, and the four decisions a senior PM owns on settlement timing."
excerpt: "Every PM in card acquiring eventually meets the merchant who wants 'same-day settlement'. The mechanics behind the ask are usually misunderstood by both sides. Scheme settlement timing is partly a product feature, partly a working-capital problem, and almost entirely about which balance sheet carries the float."
publishDate: "2026-05-20"
readingTime: "12 min read"
featured: true
tags:
  - scheme settlement
  - T+1 settlement
  - same-day settlement
  - real-time settlement
  - working capital
  - merchant funding
  - card acquiring
  - settlement reconciliation
targetAudience:
  - Acquirer product managers
  - Settlement and finance leads
  - Treasury and capital teams
  - Merchant-success and account-management leads
  - VP Product at acquirer-processors
targetKeywords:
  - scheme settlement timing
  - T+1 vs same-day settlement
  - real-time settlement card
  - merchant settlement working capital
  - acquirer funding mechanics
  - same-day funding merchant
relatedArticles:
  - "/blog/settlement-windows-and-merchant-trust"
  - "/blog/reconciliation-is-product-infrastructure"
  - "/blog/three-way-reconciliation-at-scale"
---

# Scheme Settlement: T+1 vs T+0 vs Real-Time and the Working-Capital Math That Decides

Every PM working on a card acquirer eventually has a meeting with a merchant who wants "same-day settlement". The conversation is usually friendly until the PM tries to explain why the platform settles on T+1, the merchant points to a competitor who advertises T+0, and the PM realises they have never written down what settlement timing actually costs.

Settlement timing is partly a product feature, partly a working-capital problem, and almost entirely a question of which party's balance sheet carries the float between the cardholder's authorisation and the merchant's available funds. The senior PM owns four decisions on settlement timing; the rest of the conversation is plumbing.

This is the operator's view: what the scheme settlement cycle actually does, how T+1 / T+0 / same-day / real-time differ in plumbing, the working-capital math behind each, the four senior-PM decisions on settlement, and the six failure modes the conversation produces when teams ship "faster settlement" without thinking through the carry.

## What the scheme settlement cycle actually does

A card authorisation is not money movement. It is a _promise_: the issuer holds funds against the cardholder's available limit. The actual money does not move on auth day.

The settlement cycle is the daily reconciled netting between the scheme's parties:

1. **Capture.** The acquirer or merchant captures the authorisation (often same-day, sometimes delayed).
2. **Presentment.** The acquirer submits a settlement file to the scheme for the day's captured transactions (typically end-of-day cut-over).
3. **Scheme netting.** The scheme nets settlement positions across all member banks. Each member ends the cycle owing or being owed a net position to the scheme.
4. **Scheme settlement.** The scheme draws (or pays) net positions via the central scheme settlement bank, on T+1 in most regions.
5. **Funding to the merchant.** The acquirer, once funded by the scheme, pays out to the merchant's bank account per the agreed funding cadence.

The default scheme cadence is **T+1** for most international card scheme settlement. The cycle for a Monday transaction:

- Monday: authorisation
- Monday end-of-day: presentment to scheme
- Tuesday morning: scheme settles to acquirer
- Tuesday afternoon: acquirer settles to merchant

The merchant sees funds available on Tuesday. The cardholder's issuer carries the float for the ~24 hours.

Three variations on this cadence are what "T+0", "same-day", and "real-time" usually mean.

## T+1 vs T+0 vs same-day vs real-time

The terms are used inconsistently across the industry. Strict definitions:

**T+1 settlement.** The scheme settles to the acquirer on the business day after authorisation. The merchant sees funds available 1 business day after the transaction (sometimes 2, depending on the bank rail used for the final-mile payout).

**T+0 / same-day settlement.** The merchant sees funds available on the _same calendar day_ as the transaction. Two distinct mechanisms produce same-day funding:

- _Scheme-supported same-day._ Some schemes have introduced same-day settlement windows in certain regions. The scheme runs a second daily cycle, and the acquirer can present transactions for the earlier cut-over.
- _Acquirer-funded same-day._ The acquirer pays the merchant out of its own balance sheet (an advance) before the scheme has settled. The acquirer carries the float between funding the merchant and receiving the scheme settlement.

**Real-time settlement.** A near-instant payout per transaction, almost always acquirer-funded and routed via a real-time bank rail (RTP, FedNow, FAST, SADAD-Now, IPN, UPI etc.). The merchant sees funds within seconds of the transaction settling.

**Weekly / monthly settlement.** Some platforms settle to merchants on a weekly or monthly cadence (the acquirer collects daily, but pays the merchant once per cycle). Operationally rare on card acquiring; common in marketplace / MoR contexts.

The headline difference between T+1 (scheme-paced) and same-day/real-time (acquirer-funded) is **who carries the float**. T+1 is a money-movement timing. Same-day and real-time are _credit products_ dressed as money-movement timing, the acquirer is lending the merchant money against future scheme settlement.

## The working-capital math

A real example. A merchant doing $500M annualised TPV with a 0.5% chargeback / refund rate.

| Cadence                               | Daily merchant float carried by acquirer                 | Working-capital cost @ 6% annual cost of funds |
| ------------------------------------- | -------------------------------------------------------- | ---------------------------------------------- |
| T+1 (scheme-paced)                    | $0 (acquirer is funded by scheme before paying merchant) | $0                                             |
| T+0 same-day                          | ~$1.4M (acquirer pays before scheme settles same day)    | ~$84k/year                                     |
| Real-time                             | ~$1.4M average + intraday spikes                         | ~$84k/year + intraday liquidity reserve        |
| Same-day with chargeback risk reserve | ~$1.4M + 0.5% reserve held                               | Carry + reserve drag                           |

For a merchant generating $500M TPV, the working-capital cost of moving from T+1 to T+0 is in the $80–100k range _annually_, plus the intraday liquidity reserve the acquirer has to maintain to absorb spikes.

Two implications:

**Same-day funding is rarely worth re-pricing for.** Most merchants do not have a $100k/year willingness to pay for a faster cycle, but they often do have a 5-basis-point willingness. 5 bps on $500M is $250k, which covers the carry plus a margin. The senior PM prices same-day as a basis-point upcharge, not a feature.

**The reserve is the real cost.** The intraday liquidity reserve to absorb chargeback / refund risk is bigger than the funding-cost carry. A merchant with a 0.5% chargeback rate forces the acquirer to hold roughly 0.5% of TPV in reserve against the same-day funding. On $500M TPV, the reserve is $2.5M of unproductive balance sheet, closer to the real cost than the interest on the daily float.

## The four senior-PM decisions on settlement timing

### Decision 1: What cadence is the default offer?

Most acquirers default to T+1 (or T+2 in some markets). The senior PM owns the question: is the default still right for the merchant mix we have today?

Three factors decide:

- **Merchant tier mix.** A portfolio dominated by SMEs is happy on T+1. A portfolio with large e-commerce merchants is increasingly demanding T+0.
- **Cost-of-funds.** When cost-of-funds is low, faster cadences are cheap to offer. When it climbs (2022–2024 environment), the carry becomes painful.
- **Competitive pressure.** Local competitors offering same-day reset the table; the senior PM has to decide whether to match, price the upgrade, or differentiate elsewhere.

### Decision 2: Which cadences are offered, to whom, at what price?

A working tiered model:

- **Standard** (T+1, included). Default for SMBs and mid-market.
- **Premium** (T+0 same-day, priced upcharge or basis-point uplift). Available to merchants above a volume threshold and a chargeback-rate threshold.
- **Real-time** (per-transaction payout, priced as a per-payment fee + basis-point uplift). Reserved for highest-tier merchants with established chargeback profile.

Each tier has explicit eligibility criteria (volume floor, chargeback rate ceiling, settlement history) and a clear contract on what happens when criteria are breached (the merchant moves down a tier on the first day they breach; moves up a tier after 90 days of clean criteria).

### Decision 3: How is the reserve sized?

Reserve sizing is part risk model, part finance call. A working rubric:

- **No-reserve T+1.** Acquirer is funded by scheme before paying merchant. No carry, no reserve required.
- **Light-reserve same-day.** Reserve = chargeback-rolling-rate × 90-day rolling TPV (typical: 0.3–1.5% of TPV held in reserve).
- **Full-reserve real-time.** Reserve = expected daily chargeback drawdown × cycle days held (typical: 2–5% of monthly TPV).

Reserves are repriced quarterly. Merchants that demonstrate cleaner chargeback rates earn reserve reductions; merchants that breach earn increases. The reserve is a credit product, not a payment-product feature.

### Decision 4: When is settlement actually held?

Even merchants on the standard cadence sometimes see settlement held, funds withheld for fraud review, AML hold, account dispute, or a sudden chargeback spike. The senior PM owns the _hold-and-release_ policy:

- What triggers a hold (fraud signal, AML alert, sudden volume spike, breach of merchant agreement).
- The review SLA (how fast the hold is resolved; usually 1–5 business days).
- The merchant communication (how the merchant is notified; what evidence the merchant can provide to release).
- The escalation path (who can release; what audit trail is kept).

Most acquirers ship settlement timing as a product feature and treat hold-and-release as an ops policy. The senior PM treats them as one product surface, the merchant sees both as "when do I get my money".

## Six failure modes settlement programmes ship

**1. Marketing the cadence ahead of the operational reality.** "Same-day settlement" advertised on the website while only 30% of transactions actually arrive same-day. The merchant trusts the headline; the support tickets do not match. Truth in marketing the actual delivered cadence.

**2. Funding cycle ignores the cardholder issuer cycle.** The scheme cut-over time is fixed; transactions captured after cut-over roll to the next cycle. A "same-day" merchant whose traffic peaks in the evening sees a meaningful share of transactions miss the cut-over. The senior PM tracks per-merchant time-of-day distribution and adjusts marketing per merchant.

**3. Reserve mechanics undocumented to the merchant.** The merchant sees money "missing" and lodges a complaint. The reserve is in their contract but invisible in their portal. Surface the reserve in real time; show the merchant exactly how much is on hold, why, and the release schedule.

**4. Real-time payout rail breaks silently.** Real-time bank rails have downtime windows. When the real-time rail is down, the platform either falls back to T+1 (and lies about real-time) or queues funds (and produces a backlog). Plan the fallback explicitly; surface the actual cadence per payout.

**5. Hold-and-release without an SLA.** Settlement holds are routine; SLAs on hold resolution are rare. Merchants on a 7-day hold without communication assume the worst. SLAs (24h initial response, 5-day full review) are operational hygiene.

**6. Cross-currency settlement assumed instantaneous.** Multi-currency merchant settlement (acquire in USD, settle in AED) has its own FX cycle. Adding FX windows to the "same-day" promise produces 48-hour funding that the merchant did not expect. Document the FX cadence per currency pair.

## The senior-PM tell

The interview question that separates senior settlement PMs: "your largest merchant is asking for same-day. The CFO says cost-of-funds makes it unprofitable. The competitive landscape says we lose them in 90 days if we don't ship it. What do you do?"

The junior answer picks a side. The senior answer reframes: same-day is not the question, the question is _what working-capital product does the largest merchant actually need_, and what is the right price for it. Often the answer is "same-day on the top 30% of the merchant's traffic (the part with cleanest chargeback profile), priced at 6 bps, with a defined reserve". That deal lets the acquirer ship the headline without taking the full portfolio carry, and lets the merchant get the cashflow lift on the part of their book that matters.

That answer is the operating posture. It is also the conversation that wins the merchant retention without breaking the cost-of-funds math.

## FAQ

**Why does T+1 still dominate?**
Scheme settlement is T+1 because the underlying scheme clearing cycle is T+1. Same-day and real-time are acquirer-funded credit products layered over T+1. The default cadence is what the rails support natively; anything faster is a balance-sheet decision.

**Is real-time always acquirer-funded?**
In card acquiring, almost always. Some schemes have piloted near-real-time scheme settlement, but the headline real-time products in market are acquirer-funded payouts on real-time bank rails.

**How do real-time bank rails (FedNow, RTP, FAST) fit?**
They are the rail the acquirer uses to push the payout to the merchant once the acquirer decides to fund. The schemes still settle on T+1 between scheme members; the acquirer's payout to the merchant goes via the real-time bank rail. Two cycles, one customer experience.

**Does this map to non-card rails?**
Partially. Bank-to-bank rails (SEPA, FAST, RTP) have their own settlement cadences (often near-real-time on the rail itself). The working-capital math still applies whenever the platform pays the merchant before the underlying rail has settled.

**Should we offer same-day to all merchants?**
No. The right answer is tiered offers with eligibility criteria, reserve mechanics, and pricing. Offering same-day to everyone produces unsustainable carry and uncontrolled reserve drawdowns.

**How is settlement timing reported to the merchant?**
Per-batch detail with the cycle the batch is settling under, the gross amount, the reserve withheld, the net payable, the expected funds-available timestamp. Surface it in real time in the merchant portal.

---

If this resonated, also read [Settlement Windows and Merchant Trust](/blog/settlement-windows-and-merchant-trust), [Reconciliation Is Product Infrastructure](/blog/reconciliation-is-product-infrastructure), and [Three-Way Reconciliation at Scale](/blog/three-way-reconciliation-at-scale).
