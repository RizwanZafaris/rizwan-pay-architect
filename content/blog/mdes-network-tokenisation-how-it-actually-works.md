---
title: "MDES + Network Tokenisation: How It Actually Works (and Why You Should Default to It)"
slug: "mdes-network-tokenisation-how-it-actually-works"
category: "Payment Infrastructure"
metaTitle: "MDES + Network Tokenisation: A Field Guide | Rizwan Zafar"
metaDescription: "MDES, Visa Token Service, network tokens vs gateway tokens, the lifecycle the schemes own, Apple/Google Pay plumbing, and why every new card-on-file integration should default to network tokens."
excerpt: "Network tokens are the most under-explained product in payments. They are the difference between a 60% authorisation rate and a 90% authorisation rate on stored cards. Default to them. Build for them. Migrate to them."
publishDate: "2026-05-19"
readingTime: "11 min read"
featured: true
tags:
  - MDES
  - VTS
  - network tokenisation
  - tokenisation
  - card on file
  - Apple Pay
  - Google Pay
  - payment infrastructure
  - Mastercard
  - Visa
targetAudience:
  - Acquirer + issuer product teams
  - Card-on-file PMs at marketplaces and OTT platforms
  - Wallet platform product leads
  - Visa / Mastercard / Stripe / Adyen product hires
targetKeywords:
  - MDES tokenisation
  - network tokens vs gateway tokens
  - MDES vs VTS
  - card on file network tokens
  - Apple Pay tokenisation
  - Visa Token Service
  - Mastercard Digital Enablement Service
relatedArticles:
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/hosted-checkout-vs-direct-card-processing"
  - "/blog/virtual-card-accounts-product-guide"
---

# MDES + Network Tokenisation: How It Actually Works (and Why You Should Default to It)

Network tokens are the most under-explained product in payments. They are the difference between a 60% authorisation rate and a 90% authorisation rate on stored cards. They are the reason Apple Pay actually works at scale. They are the migration most card-on-file businesses keep postponing and then regret.

This is the operator-grade map: what MDES is, what its Visa counterpart VTS is, what changes when a network token replaces a PAN, the lifecycle the scheme owns instead of you, and the integration patterns that ship.

## The primitives

There are three kinds of card credential. Treat them as architecturally different from day one.

### 1. PAN (Primary Account Number)

The 16-digit number on the front of the physical card. Tied to a specific plastic. Compromised if the plastic is lost. Issuer reissues the card → PAN changes → every saved-card integration breaks until the cardholder re-enters details.

PAN should not exist in your architecture after 2026 except inside the schemes' own systems. If you're storing PANs, your PCI scope is Level 1, your audit cost is high, and your authorisation rate on stored cards is at the mercy of issuer reissue events.

### 2. Gateway token

A reference issued by a payment gateway (Stripe, MPGS, Adyen, etc.). Opaque to everyone except that gateway. Works only inside that gateway's ecosystem.

Cheap to use, fast to issue, narrow PCI scope. The big limitation: it's tied to the gateway. You change gateway → you lose the token estate. You add a second gateway → the cards aren't portable.

### 3. Network token

A credential issued by the scheme itself (Mastercard MDES, Visa Token Service, AmEx, Discover) that **replaces the PAN** on file. It looks like a PAN, behaves like a PAN, but:

- The scheme owns its lifecycle
- It's bound to a specific merchant / use case / device
- When the underlying card is reissued, the network token continues working with the new PAN underneath — invisible to the merchant
- It's portable across gateways that support network tokens
- Network rules treat it as lower risk → authorisation rate is meaningfully higher

This third primitive is the one that changes the economics of card-on-file. The first two are well-understood. The third is the one most teams under-invest in.

## What MDES actually is

MDES (Mastercard Digital Enablement Service) is Mastercard's network-token issuance service.

What MDES does:

- Takes a real PAN from an authorised requester (your gateway, an OEM Pay wallet, a merchant)
- Issues a network token bound to:
  - The requester (your merchant ID or wallet ID)
  - The use case (card-on-file, OEM wallet, e-commerce, in-app)
  - Optional device binding (for OEM wallets)
- Stores the PAN-to-token mapping in Mastercard's vault
- Forwards authorisation requests using the token, with the issuer ultimately seeing the original PAN
- Manages the lifecycle: if the cardholder's physical card is reissued, the token continues to work seamlessly

MDES is the plumbing under Apple Pay, Google Pay, Samsung Pay, Click to Pay, and every modern card-on-file integration on Mastercard rails.

VTS (Visa Token Service) is the Visa equivalent. Same primitives, different control plane.

## The lifecycle the scheme owns

This is the part that sells network tokenisation when teams understand it.

In the PAN / gateway-token world:

1. Customer's physical card is lost / reissued / expires
2. Issuer issues a new PAN
3. Every saved-card integration that used the old PAN now fails authorisation
4. Customer has to re-enter card details on every site, app, subscription
5. Some subset of customers churn; the rest just stop paying for the subscription

In the network-token world:

1. Customer's physical card is lost / reissued / expires
2. Issuer issues a new PAN, registers it with MDES / VTS
3. MDES / VTS updates the PAN-to-token mapping invisibly
4. The merchant's saved network token continues to work
5. The customer does nothing; the subscription keeps charging

Estimates vary by region and segment but in the markets I've worked, the gap is roughly:

- **Card reissue events per year:** 12–25% of all active cards
- **Recovery rate on PAN-based card-on-file after reissue:** ~40–60% (everyone else churns or has to manually update)
- **Recovery rate on network-token card-on-file:** ~95–99% (transparent to the merchant)

For a subscription business, that delta compounds. If your churn is 10% / month and 3% of that is card-related, fixing the card path drops churn meaningfully. The financial case for network tokens is rarely about the cost-per-token; it's about the recovered revenue.

## How issuance actually flows

The integration shape is consistent across MDES, VTS and the other schemes' equivalents.

1. **PAN capture.** The merchant or wallet captures the PAN through PCI-compliant channels (Hosted Session iframe, Apple Pay token request, etc.).
2. **Provisioning request.** The merchant's gateway sends a "tokenise this PAN for this use case" request to MDES / VTS.
3. **Issuer authorisation.** The issuer is consulted (some issuers auto-approve, some do step-up via the issuer app, some decline).
4. **Token issuance.** If approved, MDES / VTS returns the network token.
5. **Token storage.** The merchant stores the network token in its card-on-file vault (not the PAN).
6. **Subsequent transactions.** Every future transaction uses the token; MDES / VTS handles the translation back to the underlying PAN at authorisation time.

The merchant's PCI scope after this is narrower than a gateway-token estate because the token is scheme-controlled and explicitly out of PCI scope when stored with the right marker.

## The integration patterns that ship

There are four common integration shapes. Pick based on your role in the stack.

### Pattern A: Gateway-mediated (most common)

You integrate with MPGS, Stripe, Adyen, etc. The gateway integrates with MDES / VTS on your behalf. You see tokens and lifecycle events through the gateway API.

**Pros:** Easy. The gateway absorbs MDES contracts, certification, lifecycle management.

**Cons:** You're locked to that gateway for token operations. The token doesn't move with you if you switch gateways. (Some gateways now offer "portable" network tokens that they manage but expose by network reference — verify before relying on it.)

**Use when:** You're a merchant or a small acquirer. 90% of integrations are here.

### Pattern B: Direct as Token Requestor (advanced)

You contract directly with Mastercard / Visa as a registered Token Requestor (TR). You hold the certification, you hit MDES / VTS APIs directly.

**Pros:** Tokens are yours, portable across any gateway.

**Cons:** Significant compliance overhead — scheme certification, ongoing audit, vault security obligations. Engineering load is substantial.

**Use when:** You're a large acquirer, a major PSP, or a wallet platform. Stripe, Adyen, Apple, Google all operate as Token Requestors directly.

### Pattern C: OEM Wallet (Apple Pay / Google Pay)

The device wallet handles tokenisation. Apple Pay's "Add card to Wallet" flow registers a device-bound MDES token. The merchant never sees a PAN; the merchant sees a Device-PAN (DPAN) that only works on that specific device.

**Pros:** Lowest-friction consumer flow. Biometric auth. PSD2 SCA automatically satisfied.

**Cons:** The token is device-bound. Useless for true card-on-file (where you want to charge later without the device present).

**Use when:** In-store / in-app one-time payments. Not for subscriptions.

### Pattern D: Click to Pay (VCTP / MCTP)

Scheme-level Click to Pay services run on MDES / VTS underneath. The consumer's browser-stored network token is used at checkout. The merchant doesn't manage tokenisation; the scheme does.

**Pros:** Highest auth rate (network token + scheme orchestration). Cross-merchant identity.

**Cons:** Coverage still patchy by region in 2026. Best-in-class for Mastercard / Visa cards; outside that, doesn't apply.

**Use when:** Consumer-facing e-commerce checkouts targeting card-heavy markets (US, UK, EU).

## The failure modes

Six patterns that ruin network-token rollouts:

### 1. Gateway tokens "for now", network tokens "later"

Already named in [MPGS Architecture](/blog/mpges-mastercard-payment-gateway-services-architecture). Migration is brutal. Default to network tokens from day one.

### 2. Storing the PAN alongside the network token "for fallback"

Defeats the entire purpose. PCI scope blows up. Auth rate doesn't improve. Storage cost grows. **Don't do this.** If you need a fallback, the gateway's vault is the fallback, not yours.

### 3. Treating token issuance as synchronous

Issuance can fail (issuer declines, MDES timeout, network glitch). Building synchronous-only flows means the first transaction in a saved-card flow either succeeds with a brand-new token or fails entirely. Better pattern: tokenise async after a successful first transaction; until the token lands, charge against the gateway token.

### 4. No re-tokenisation on lifecycle events

MDES sends lifecycle webhooks: token suspended, token resumed, token deleted (cardholder removed the card from a wallet). Most teams set up the issuance webhook and skip the others. Result: charging tokens that the cardholder revoked, generating disputes.

### 5. Single-Token-Requestor lock-in

If you go direct as a Token Requestor, the tokens are bound to your TRID (Token Requestor ID). If you sell the business, transfer the merchant book, or change schemes, those tokens are stuck.

The middle path: use multiple gateways that operate as Token Requestors, and design your card-on-file vault to reference whichever gateway holds the token. Add an abstraction layer.

### 6. Treating Apple Pay / Google Pay as "tokenisation done"

OEM wallet DPANs are device-bound. They are not card-on-file tokens. A customer who adds a card to Apple Pay still needs a separate card-on-file network token for subscription billing. Most teams discover this when their first wave of Apple Pay subscribers hit renewal and the charge fails.

## Why this matters

Card-on-file is the largest single revenue surface in modern payments. Subscriptions, marketplaces, ride-share, OTT, BNPL, recurring B2B — every one of them lives or dies on card-on-file authorisation rate.

Strong card-on-file teams treat network tokens as **the default credential**, not a future optimisation. They build their card-on-file vault around network tokens. They wire lifecycle webhooks day one. They monitor token-vs-PAN authorisation rate as a primary KPI.

The teams that don't treat tokenisation seriously hit a 70%-ish authorisation ceiling and never understand why their subscription churn is what it is.

## FAQ

**MDES or VTS — which one?** Both. Your card mix decides which gets more volume. You'll integrate with both via the gateway (or directly, if you're a TR).

**Is MDES expensive?** Per-call cost is meaningful but small. Per-saved-card cost is essentially zero. The economics swing on recovered authorisations against the cost of churn from PAN-reissue events.

**Does Apple Pay use MDES?** Yes — Apple is a registered Token Requestor; the DPANs in Apple Wallet are MDES / VTS tokens.

**Can I use a network token in-store?** Yes (via contactless NFC), but the token form factor is device-bound in that case. Online card-on-file network tokens are a different shape.

**What's Click to Pay's relationship to MDES?** Click to Pay is the consumer-facing brand. MDES (for Mastercard cards) and VTS (for Visa cards) are the underlying tokenisation services. Click to Pay sits on top.

**How long does network-token migration take?** For an existing card-on-file estate of 1M+ cards: 4–8 months realistic. The pattern: tokenise on next charge attempt, fall back to gateway token if MDES declines, monitor coverage daily.

**The single biggest reason teams under-adopt network tokens?** Because the immediate cost (per-call, integration effort) is visible and the benefit (lifted authorisation rate on a small subset of transactions) is invisible until you measure it. Measure first. The numbers usually decide.
