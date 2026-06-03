---
title: "Virtual Card Accounts (VCA): The Quiet Backbone of B2B, Travel and Marketplace Payments"
slug: "virtual-card-accounts-product-guide"
category: "Payment Infrastructure"
metaTitle: "Virtual Card Accounts (VCA): A Product Guide for Payments Teams | Rizwan Zafar"
metaDescription: "What virtual card accounts (VCAs) are, how they're issued, where they win against ACH and wires, the control surface that matters, and how product teams should think about interchange, reconciliation, and the four real use cases."
excerpt: "VCAs look like a card primitive. They are actually a control primitive. The product job is to decide which controls travel with the number, and which sit in the platform."
publishDate: "2026-05-18"
readingTime: "10 min read"
featured: true
tags:
  - virtual card accounts
  - VCA
  - B2B payments
  - travel payments
  - AP automation
  - interchange
  - issuing
  - Visa
  - Mastercard
targetAudience:
  - B2B fintech product leads
  - AP automation product teams
  - Travel and expense product managers
  - Issuing platform PMs
  - Payments architects at Visa, Mastercard, Stripe
targetKeywords:
  - virtual card account
  - VCA product guide
  - B2B virtual cards
  - travel VCA
  - lodged card vs single-use
  - VCA issuing stack
  - virtual card interchange
relatedArticles:
  - "/blog/open-banking-product-architecture"
  - "/blog/product-management-for-payments-platforms"
  - "/blog/hosted-checkout-vs-direct-card-processing"
---

# Virtual Card Accounts (VCA): The Quiet Backbone of B2B, Travel and Marketplace Payments

Virtual card accounts (VCAs) are one of the most quietly successful payment primitives of the last decade. They underpin a meaningful share of corporate AP, almost all of online travel agency settlement, large parts of media buying and ad-platform payouts, and most modern expense platforms. And yet most product teams treat them as "just a card number you generate on demand."

That framing is wrong. A virtual card account is not a card number. It is a control primitive with a card number bolted to it for distribution.

The product job is to decide which controls travel with the number, and which sit in the platform.

## What a VCA actually is

A VCA is a 16-digit PAN (Primary Account Number) issued against an underlying funding source, with controls applied at issuance time that the scheme rails enforce at authorisation time.

The pieces:

- **The PAN itself**, generated against a BIN range owned by the issuer or BIN sponsor
- **The funding source**, typically a deposit account at the issuer or a credit line
- **The control envelope**: spend limit, MCC (Merchant Category Code) restrictions, validity window, single-use vs multi-use, geography
- **The settlement instruction**: where the money lands when the transaction posts, and how it is reconciled back to the issuing platform

The PAN is what the merchant sees. The control envelope is the product. The funding and settlement are the plumbing.

## What a VCA is not

It is not a tokenised version of a physical card. Network tokens (Visa Token Service, Mastercard MDES) are a different primitive: they replace the PAN with a device-bound token for repeat use. A VCA is a fresh credential, issued purpose-built, often single-use, with controls the underlying card does not have.

It is not a wallet. A wallet is a customer-side concept. A VCA is an issuer-side concept.

It is not "just digital issuing." Digital issuing is the broader category (Marqeta, Stripe Issuing, Lithic, Adyen Issuing). VCAs are the use case where the card never gets pushed to a device, and the spend control is the product.

## The four real use cases

Most VCA product strategy is downstream of which use case you are serving. They look similar; the product trade-offs are very different.

### 1. B2B accounts-payable

The buyer's AP team approves an invoice and the platform generates a single-use VCA for the exact amount, payable to the supplier. The supplier processes the card like any other Visa/Mastercard transaction. The buyer gets card-level reconciliation, interchange rebate (often the commercial driver), and 30-60 days of credit-line float depending on the funding structure.

**Product trade-offs:**

- Suppliers need to accept cards. Many large suppliers refuse, or surcharge. The product needs a "supplier enablement" workflow and a fallback to ACH or wire.
- The "exact amount" assumption breaks under partial shipments, returns, and tax variances. Either you allow over-tolerance (and lose control) or you handle splits (and add complexity).
- Reconciliation matching back to the originating invoice ID is the entire product. Without it, the AP team prefers ACH.

### 2. Travel: OTA-to-supplier settlement

An online travel agency takes the customer's booking, charges their card, and pays the hotel or airline using a VCA generated for the exact reservation. The hotel runs the card on arrival. The VCA is locked to the booking value, valid for the stay window, restricted to lodging MCCs.

**Product trade-offs:**

- Validity-window precision is critical. Too tight, the merchant declines on early check-in. Too loose, the OTA carries authorisation risk for weeks.
- Currency conversion. The VCA usually settles in one currency; the hotel charges in another. Who eats the FX?
- Interchange revenue is the silent engine of the OTA model. Lose the interchange differential, lose the margin.

### 3. Marketplace and creator payouts

A platform pays out to thousands of small sellers, creators, or contractors. ACH is slow and fee-bearing per transaction; international ACH is worse. VCA payouts give the recipient a card credential they can spend immediately, while the platform retains the control envelope (jurisdiction, expiry, max balance).

**Product trade-offs:**

- This is often where "card" and "wallet" blur. If the recipient never wants the card and only wants to cash out, you have built a worse Stripe Connect.
- KYC on the recipient is non-negotiable. The card credential makes the recipient a regulated user of the issuing programme.

### 4. Expense and employee spend controls

Each employee, project, or team gets a VCA with hard limits, MCC restrictions, and approval workflows. The control envelope replaces the corporate-card policy doc.

**Product trade-offs:**

- The control envelope must be programmable in the moment, not just at issuance. Real-time auth rules (Marqeta-style JIT funding, or Stripe Issuing's `authorization_request` webhook) are what separate a real expense product from a "many corporate cards."
- The user experience for the spender is the product, not the controls. If declines feel random, adoption dies.

## How VCAs are issued: the stack

Three layers, often confused:

1. **Scheme (Visa, Mastercard, Amex)**: owns the rails, sets interchange, certifies issuers
2. **Issuer / BIN sponsor**: holds the regulatory licence, owns the BIN, takes the credit risk. Examples: Marqeta's bank partners, Stripe's issuing partners, Sutton, Cross River, i2c.
3. **Issuing platform / programme manager**: the product layer (Marqeta, Stripe Issuing, Lithic, Adyen Issuing) that exposes APIs for card creation, control rules, real-time authorisations, transaction webhooks.

If you are a fintech building a VCA product, you sit on top of layer 3. The decision tree:

- **Build on a programme manager (Stripe Issuing, Marqeta, Lithic)**: 80% of fintechs. Faster to market, less control, lower margin, scheme certification handled.
- **Become your own programme manager**: rare. Only justified if VCAs are the core product and the volumes warrant the operational burden.
- **Become your own issuer**: rarer still. Requires a bank charter or an acquisition. Worth it only when interchange economics justify the regulatory load.

## The control surface that actually matters

When evaluating a VCA product (yours or a competitor's), these are the controls that separate real products from PAN-generators:

- **Spend limit and limit type**: hard, soft, recurring, lifetime
- **MCC allow-list and block-list**, with the ability to combine
- **Validity window**, with sub-day precision
- **Geographic restriction**, at country and currency level
- **Single-use vs multi-use vs recurring**
- **Per-merchant locking** (this VCA only works at this exact merchant)
- **Real-time JIT funding hooks**: the issuer asks your platform "should I approve this auth?" with up to ~2 seconds of decision time
- **Webhook fidelity on transaction state**: auth, capture, refund, dispute, all with original-transaction linkage

If any of these are missing or batchy, the product is half-built.

## Interchange: the silent revenue engine

VCA economics are interchange economics. Commercial-card interchange in most regions is meaningfully higher than consumer-card or ACH. That spread is what funds the rebates, the float, the platform fees, and the engineering investment in the control surface.

The product implication: every VCA decision should be evaluated against its interchange impact.

- **Routing**: which scheme do you issue against? Visa vs Mastercard commercial cards have different interchange tables in different markets.
- **MCC mix**: travel MCCs and B2B MCCs price differently from retail.
- **Geography**: domestic vs cross-border interchange spreads are wide.
- **Card type**: corporate purchasing card vs corporate T&E card vs single-use B2B card all sit at different interchange tiers.

Programme managers will not optimise this for you. The PM job is to understand the table and design issuance toward favourable cells.

## Reconciliation: the make-or-break

VCAs generate huge transaction volume with weak default reconciliation. The PAN does not tell you which invoice, which booking, or which employee triggered the spend. The platform has to remember.

Three reconciliation disciplines that distinguish good products:

1. **Issuance-time tagging**: every VCA carries an internal correlation ID (invoice ID, booking ID, employee ID) that the platform stores alongside the PAN. Without this, you cannot reconcile.
2. **Authorisation-and-capture matching**: cards authorise once, capture once or many times, refund sometimes. The platform must close the loop per original auth.
3. **Settlement-file ingestion**: the scheme settlement file lands in batch. Match it back to the platform's transaction log at the line level, every day, zero drift.

Reconciliation is not the boring part. It is the part that decides whether finance trusts the platform.

## Operating bar

A VCA product team is shipping well when:

- Card issuance is sub-second from API call to usable PAN
- The control envelope covers all eight surfaces above
- Real-time JIT funding is wired and used for at least one use case
- Reconciliation has zero unmatched transactions older than 24 hours
- Interchange economics are tracked per cell, not in aggregate
- The supplier-enablement workflow has a metric ("share of spend routed to card") and a team that owns it
- Disputes flow back into the issuing programme without manual escalation

## FAQ

**What's the difference between a VCA and a tokenised card?** A tokenised card replaces an existing PAN with a device-bound token. A VCA is a freshly issued PAN with controls. Different primitives, different use cases.

**Why would a buyer pay by VCA instead of ACH?** Interchange rebate, credit-line float, card-level reconciliation, and supplier-side automation. The rebate alone often exceeds the per-transaction cost differential.

**Why do suppliers accept VCAs at all?** Faster settlement than ACH (1-3 days vs 5-10 for paper checks), guaranteed funds (no NSF risk), and integration into their existing card-acceptance stack.

**Single-use or lodged?** Single-use for one-off invoices and bookings; lodged (long-lived, fixed amount per period) for recurring vendor relationships. The control envelope differs accordingly.

**Should I build on Stripe Issuing or Marqeta?** Stripe Issuing if you are already in the Stripe ecosystem and your volumes are modest. Marqeta if you need deep JIT funding, complex control rules, or international issuing breadth.

**What about Apple Pay / Google Pay on a VCA?** Some programme managers support pushing the VCA to a wallet for in-person and mobile spend. The control envelope still applies. This is the bridge between VCAs and traditional digital issuing.

**Where does this go next?** Two directions. First, deeper integration with open banking for funding (instead of a card-against-deposit, a card-against-real-time-pull). Second, agent-initiated VCAs: an AI procurement agent generating a VCA per purchase, with policy enforced at issuance. Both are early.
