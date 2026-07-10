---
title: "Open Banking Product Architecture: Aggregator vs Direct, AISP vs PISP, and Where the Value Actually Lives"
slug: "open-banking-product-architecture"
category: "Payment Infrastructure"
metaTitle: "Open Banking Product Architecture (PSD2, AISP, PISP, A2A) | Rizwan Zafar"
metaDescription: "The product architecture of open banking: aggregator vs direct, AISP vs PISP scope, authentication UX as the entire product, A2A vs card-rail economics, and where the durable value lives beyond data access."
excerpt: "Teams that treat open banking as data access ship pretty dashboards and weak businesses. The ones who treat it as a workflow product, with bank data as raw material, build category leaders."
publishDate: "2026-05-17"
readingTime: "11 min read"
featured: true
tags:
  - open banking
  - PSD2
  - PSD3
  - AISP
  - PISP
  - A2A payments
  - aggregator
  - account-to-account
  - variable recurring payments
  - VRP
targetAudience:
  - Open banking product leads
  - A2A payments product managers
  - Fintech architects evaluating data aggregators
  - Payments PMs at incumbents (Visa, Mastercard, Stripe)
  - Treasury and payouts product teams
targetKeywords:
  - open banking product architecture
  - AISP vs PISP
  - Plaid vs Tink vs TrueLayer
  - account-to-account payments
  - PSD2 PSD3
  - variable recurring payments
  - open banking authentication UX
relatedArticles:
  - "/blog/virtual-card-accounts-product-guide"
  - "/blog/product-management-for-payments-platforms"
  - "/blog/hosted-checkout-vs-direct-card-processing"
---

# Open Banking Product Architecture: Aggregator vs Direct, AISP vs PISP, and Where the Value Actually Lives

A decade after PSD2 forced the doors open, most teams still ship the wrong open banking product. They confuse data access for value, treat the authentication flow as a thing the engineers will figure out, and assume "we'll add A2A payments later" is a sentence that means something.

Open banking is not a data product. It is a workflow product that happens to use bank data as its raw material. Teams that miss this build pretty dashboards and weak businesses. Teams that get it build category leaders.

## The regulatory canvas (in five lines)

- **EU / UK (PSD2, going PSD3 / PSR)**: licensed AISP and PISP roles, strong customer authentication (SCA), 90-day reauthentication (loosening under PSD3), API access mandated for banks
- **UK (CMA9 + OBL standards)**: the most mature consent and API standard in the world; the reason London is where open banking actually works
- **Brazil (Open Finance)**: the most ambitious scope (banking + insurance + investments + pensions), national-scale Pix integration
- **India (Account Aggregator framework)**: consent-managed, regulator-supervised, sector-spanning
- **US**: market-driven, no equivalent of PSD2 until CFPB 1033 (now in force); aggregator-dominated stack
- **Australia (CDR)**: similar to EU model, slower adoption, broader sector reach

The product job is to architect for the strictest regime you serve and degrade gracefully where the API permits less. Architecting for the loosest regime first is how teams end up rebuilding the consent stack on every market expansion.

## AISP vs PISP: the difference that matters

The two regulated open banking roles are routinely confused, including by teams that hold the licences.

- **AISP (Account Information Service Provider)**: read-only access to account balances, transaction history, account holder information. The "see" role.
- **PISP (Payment Initiation Service Provider)**: initiates a payment from the user's bank account, with the user's consent, directly into the merchant's account. The "move" role.

The scope difference is not academic. It changes:

- **Authentication frequency**: AISP often needs reauth every 90 days; PISP authenticates per payment
- **Liability**: AISP is liable for data handling; PISP is liable for payment initiation accuracy and any unauthorised transaction
- **Reconciliation surface**: AISP returns data; PISP returns a payment status that you have to track to terminal state
- **Commercial model**: AISP monetises through workflow (KYC, affordability, accounting); PISP monetises through the payment itself

The most common product mistake: bolting a PISP flow onto an AISP product without rebuilding the consent UX, the audit trail, or the failure handling. The user sees one button; the regulator sees two separate authorisations being conflated. This is a finding waiting to happen.

## Aggregator vs direct: the architectural choice

Almost every team faces this decision in year one.

**Option A: Aggregator (Plaid, Tink, TrueLayer, Yapily, Salt Edge, MX, Finicity)**

- One contract, one API, one consent model across hundreds of banks
- Coverage you cannot match on day one
- Authentication UX they own (you get what they ship)
- Margin compression: their fee + your fee
- Vendor concentration risk and roadmap dependence

**Option B: Direct bank-by-bank**

- You own the user experience end-to-end
- You eat the integration cost per bank (and per spec drift per bank, of which there is a lot)
- You become a regulated entity in every market you operate in
- Margin retained
- Time to coverage: years, not weeks

**Option C: Hybrid (aggregator for long tail, direct for top 5 banks)**

- The best architectural answer for serious players
- Adds complexity: two integration paths, two consent flows to unify
- Common at Stripe, Adyen, Wise, Klarna

The right answer depends on whether open banking is your product or a feature of your product. If it is the product, you eventually go hybrid. If it is a feature, stay on the aggregator and reinvest the saved engineering into the workflow on top.

## Authentication UX is the entire product

This is the single most common failure mode. A team builds a beautiful onboarding flow, then hands users to a bank's redirect or embedded SCA flow that looks like 2008. The drop-off at the bank handoff is brutal: 30-60% is normal, 70% is not unheard of, and that is the number that decides the business.

What separates good open banking UX from bad:

- **Bank selection pre-search**: do not show the user a list of 300 banks; predict from email domain, BIN, IP region
- **Pre-handoff explanation**: one sentence on what is about to happen, why, and how long it will take. Skipping this triples drop-off.
- **App-to-app flows where supported**: redirect into the bank's app via universal link is dramatically higher-converting than browser SCA. Wire this everywhere the rail supports it.
- **Failure handling**: every bank handoff fails sometimes. The recovery flow (retry, switch bank, fall back to manual) is the difference between an 85% and a 65% success rate.
- **Consent renewal UX**: under PSD2, 90-day reauth is a recurring drop-off cliff. Design the renewal in advance, not as an afterthought.

You can have the best aggregator in the world and ship a 40%-conversion product if you ignore this layer.

## A2A payments: where the value is moving

Variable Recurring Payments (VRP, UK), SEPA Instant + open banking initiation (EU), Pix initiation (Brazil), UPI (India). These are not extensions of open banking. They are open banking's reason to exist as a commercial category.

The economics:

- **Cost per transaction**: 5-10x cheaper than card rails for the merchant, often near-zero at scale
- **Settlement speed**: instant or near-instant in most modern regimes
- **No interchange, no scheme fees, no chargebacks** (in most regimes)
- **Conversion**: meaningfully lower than card on first attempt, comparable after habit formation

The structural trade-off:

- Cards offer chargeback protection, which consumers value (and which merchants pay for through interchange)
- A2A is push-payment with limited reversal rights; consumers feel exposed; merchants love it
- The product job: pair A2A with merchant-side guarantees (refund policy, hold-and-release, escrow) so the consumer's loss of chargeback protection is replaced with something they actually trust

The teams winning at A2A are not selling "cheaper payments." They are selling "guaranteed settlement with better cashflow" to merchants, and "instant confirmation with explicit refund SLA" to consumers. Two different value propositions, both built on the same rail.

## Where the durable value lives

If you build an open banking product, here is where the moat is and is not.

**Not where the value is:**

- Raw data access (commoditised; aggregators win)
- The SCA flow (the bank owns it; you can polish, not replace)
- Bank coverage (table stakes within 18 months of launch in any market)

**Where the value actually is:**

- **Workflow on top of the data**: affordability scoring, cashflow-based underwriting, accounting reconciliation, KYC enrichment, treasury management
- **Initiation use cases with payment context**: bill pay, payroll, invoice payment, marketplace settlement
- **Trust layer**: consent management, audit trail, regulatory reporting, breach notification
- **Cross-market normalisation**: the same data model, the same consent UX, the same reconciliation contract across EU, UK, Brazil, India, US

The single most defensible position is owning the workflow that turns raw open banking data and initiation into a business outcome the merchant or user did not have to build themselves.

## Reconciliation: the invisible product

A PISP product that does not reconcile to terminal state is a liability dressed as a feature.

Three disciplines:

1. **State-machine the payment**: initiated → authenticated → submitted-to-bank → pending → settled (or failed / cancelled / returned). No collapsed states.
2. **Webhook-or-poll hybrid**: never trust one. Webhooks drop; polling is expensive; do both for terminal-state confidence.
3. **Settlement-file reconciliation**: the bank or scheme produces a daily file. Match every PISP transaction to a settled bank line, every day, no drift.

A2A does not have chargebacks, but it has plenty of "money left the user's account and never arrived" failure modes. Reconciliation is the product surface that catches those.

## Cross-border open banking: still embryonic

Open banking is national, almost everywhere. Cross-border initiation (EU user pays a UK merchant via open banking) works on SEPA rails for EUR-to-EUR but is genuinely hard everywhere else. The teams pretending otherwise are routing through correspondent banking under the hood and calling it open banking.

Watch SEPA Instant + SCT Inst + the cross-border PISP licences as the real cross-border open banking story matures over the next 24 months.

## Operating bar

An open banking product team is shipping well when:

- AISP and PISP scopes are architecturally separated, even if commercially bundled
- The authentication UX has been A/B tested and optimised at every step, with conversion measured per bank
- Aggregator and direct integrations are unified behind a single internal consent model
- Reconciliation closes the loop on every PISP transaction within the same business day, zero open older than 24 hours
- The workflow on top (not the raw data) is the product
- Multi-market architecture exists from day one, even if only one market is live
- The PSD3 / PSR transition is in the 18-month roadmap, not a fire drill

## FAQ

**Plaid, Tink, or TrueLayer?** Plaid for US-led products. Tink for EU coverage (especially Nordic and DACH). TrueLayer for UK PISP leadership. Real players use more than one.

**Do I need to be a licensed AISP or PISP?** Only if you initiate or read directly. If you go through an aggregator that holds the licence, their licence covers you for that scope. The moment you direct-integrate, you need your own.

**Is open banking going to kill card payments?** No, but it will eat the parts of card payments where chargeback protection is overpriced relative to the value to the consumer. Subscriptions, bill pay, payroll, marketplace settlement are the obvious losers for cards.

**Why is the UK so much further ahead?** CMA9 + OBL standards forced a single consent model and API spec across the nine largest banks. Mandate, standardisation, and an open ecosystem regulator. The EU got the rules; the UK got the rails.

**What is VRP, and why is it the most important UK story?** Variable Recurring Payments let a PISP initiate a series of payments under a one-time consent, with defined limits. It is the technical primitive that makes A2A subscription, bill pay, and merchant-initiated A2A actually work at consumer-payment scale. The product surface is real and just maturing.

**Where does AI fit?** Two places. First, in workflow on top (categorisation, cashflow prediction, affordability). Second, in agent-initiated payments via PISP, with consent enforcement at initiation. The second is early but credible.
