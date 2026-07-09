---
title: "CyberSource Architecture: The Visa-Owned Payment Gateway, How It Differs From MPGS"
slug: "cybersource-architecture-visa-payment-gateway"
category: "Payment Infrastructure"
metaTitle: "CyberSource Architecture: How Visa's Payment Gateway Works | Rizwan Zafar"
metaDescription: "A field guide to CyberSource: Decision Manager, Token Management Service, Flex Microform, Payouts, and where the architecture differs meaningfully from MPGS."
excerpt: "CyberSource is the gateway Visa wants you to standardise on. The product surface is broader than MPGS: Decision Manager and Flex Microform have no Mastercard equivalents, but the integration patterns and lifecycle traps are different in important ways."
publishDate: "2026-05-20"
readingTime: "12 min read"
tags:
  - CyberSource
  - Visa
  - payment gateway
  - Decision Manager
  - Flex Microform
  - Token Management Service
  - VTS
  - payment infrastructure
  - scheme products
targetAudience:
  - Acquirer + PSP product managers
  - Visa product hires
  - Payments architects evaluating gateway choice
  - Risk leads evaluating Decision Manager
targetKeywords:
  - CyberSource architecture
  - CyberSource vs MPGS
  - CyberSource Decision Manager
  - Flex Microform integration
  - Visa payment gateway
  - CyberSource Token Management Service
relatedArticles:
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/mdes-network-tokenisation-how-it-actually-works"
  - "/blog/hosted-checkout-vs-direct-card-processing"
---

# CyberSource Architecture: The Visa-Owned Payment Gateway, How It Differs From MPGS

If MPGS is the gateway Mastercard wants you to standardise on, CyberSource is Visa's answer. They look similar from the outside — both white-labelled, both scheme-owned, both bundled with their parent network's certifications. Underneath, the architecture diverges in ways that matter once you're past the pilot phase.

This is the operator-grade map of CyberSource: what's in the product, where it's strictly stronger than MPGS, where it's weaker, the four integration patterns, and the failure modes that show up when teams treat it as a like-for-like alternative.

## What CyberSource is

CyberSource is Visa's enterprise payment gateway, acquired by Visa in 2010. Like MPGS, it's not consumer-facing — the merchant's brand sits on the checkout; CyberSource sits behind it. Unlike MPGS, the product line has been broadened over fifteen years of Visa investment into a wider suite:

- **Payment Acceptance** — card acquiring, 3DS2 step-up, recurring, refunds (the MPGS-comparable core)
- **Decision Manager** — Visa's behavioural fraud-decisioning engine, with a feature store that draws from the global Visa network
- **Token Management Service (TMS)** — gateway tokens, network tokens (via VTS), and a portable card-on-file vault
- **Flex Microform** — Visa's iframe-based card-data-capture solution (CyberSource's Hosted Session equivalent, with some meaningful differences)
- **Payouts** — push-to-card and account, integrated with Visa Direct
- **Account Updater** — automatic refresh of card-on-file when the issuer reissues
- **Reporting Suite** — settlement files, dispute exports, reconciliation primitives

That's a wider footprint than MPGS by design. Visa's strategic bet is that CyberSource is "the platform" — fewer reasons for the merchant to integrate with a third-party fraud engine, a third-party tokenisation service, or a third-party payouts product.

## Where CyberSource is strictly stronger than MPGS

Three areas, and they matter.

### 1. Decision Manager — fraud signal from the Visa network

This is CyberSource's most differentiated product. Decision Manager is a behavioural fraud engine with access to features derived from the **global Visa transaction graph**: cross-merchant velocity, identity fingerprints across acquirers, network-level chargeback patterns. No equivalent exists in MPGS's stock product (MPGS leaves fraud to the acquirer or a third-party vendor).

For merchants whose own fraud signal is thin (new acquirers, low-volume verticals, regions where local data is scarce), Decision Manager gives a meaningful uplift over a from-scratch ML model. The trade-off is that you're locked into the Decision Manager rule format and feature set — porting rules to a different engine later is painful.

**Use when:** Your fraud team is small and you want a strong baseline that ships in weeks rather than months.

**Don't use when:** Your fraud team is mature and has invested in its own feature store and ML pipeline. At that point Decision Manager becomes redundant and the per-decision cost adds up.

### 2. Token Management Service + Account Updater

CyberSource's TMS is more product-shaped than MPGS's tokenisation. TMS exposes a portable card-on-file vault that can be addressed by your own application code: store any card (CyberSource gateway token, VTS network token, OEM wallet DPAN), retrieve by your own merchant-side reference, manage lifecycle through a single API.

Pair it with Account Updater (which subscribes to issuer-reissue events on Visa cards and automatically refreshes the underlying PAN behind the gateway token) and you get a true card-on-file product, not just a tokenisation primitive.

MPGS has tokenisation and partial lifecycle handling, but you build the merchant-side vault and the recovery flows yourself.

### 3. Flex Microform vs Hosted Session

Both are iframe-based card-capture patterns. The architectural difference: Flex Microform exposes a **JavaScript SDK** that the merchant page loads, and the SDK manages the iframe lifecycle, validation, tokenisation and 3DS2 step-up. MPGS's Hosted Session expects more orchestration on the merchant's server side.

In practice, Flex Microform's "JS SDK does the work" pattern is easier to integrate for teams whose backend isn't payment-specialised. For sophisticated teams with their own checkout state machine, Hosted Session's "server-orchestrated" pattern offers more control. Neither is wrong; the choice depends on team shape.

## Where MPGS is strictly stronger

Three areas, and the operator has to weigh them.

### 1. Mastercard scheme certification

CyberSource handles Mastercard transactions, but every scheme-specific change (rule update, regulatory mandate, certification renewal) comes through Visa first and Mastercard second. MPGS reverses that ordering. For an acquirer whose volume is Mastercard-heavy, MPGS reduces the lag between "Mastercard announces a change" and "your gateway absorbs it."

### 2. Multi-acquirer routing flexibility

MPGS exposes a relatively clean "this transaction can route through acquirer A or acquirer B" model. CyberSource is more opinionated — Visa's preferred routing is woven into the product. Teams that want to operate a true multi-acquirer strategy (especially with non-Visa-affiliated acquirers in some regions) sometimes find MPGS less prescriptive.

### 3. Per-transaction cost (often)

This varies by negotiation and volume, but in practice CyberSource's bundled-product pricing makes the per-transaction cost higher than MPGS for teams that don't use the wider Decision Manager / TMS stack. You're paying for product surface you might not need.

## The four integration patterns

CyberSource integration shapes are similar to MPGS but worth naming explicitly.

### Pattern A: Hosted Checkout (Secure Acceptance)

CyberSource renders the full payment page. Merchant redirects; customer transacts; CyberSource redirects back with a result. Lowest PCI scope.

Same trade-offs as MPGS Hosted Checkout: brand interruption, limited UX control, conversion ceiling.

### Pattern B: Flex Microform

CyberSource's JavaScript SDK loads on the merchant page. The merchant's checkout HTML renders, the SDK inserts an iframe over the card-number field, all card data flows through CyberSource without touching the merchant's server.

Tokenisation, 3DS2 step-up and capture flow through the same SDK.

**This is the integration pattern most new CyberSource customers should default to.** The PCI scope is narrow, the UX control is full, and the SDK absorbs the lifecycle complexity.

### Pattern C: REST API direct

Server-to-server integration with raw card data in the request. Same trap as MPGS Direct API: PCI scope blows up. Almost no greenfield merchant should be here.

### Pattern D: Simple Order API (legacy)

CyberSource's older XML-based integration, predating REST. Still supported because some enterprise customers haven't migrated. New integrations should use REST.

## The architecture decisions that compound

Five decisions in the first integration sprint determine CyberSource lifetime cost. (The pattern parallels MPGS but the specifics differ.)

### 1. Reference number design

CyberSource keys transactions off a `merchantReferenceCode`. Same trap as MPGS order ID: don't reuse. Use the same `{internal_order}-{attempt_n}` pattern; reconciliation joins on the prefix.

### 2. Token Management Service strategy

The temptation in the first sprint is to use CyberSource gateway tokens "for now" and consider network tokens later. As with MPGS, this is the wrong call. **Default to TMS-managed network tokens (via VTS) from day one.** Account Updater only works against a well-shaped TMS vault.

### 3. Decision Manager rule strategy

If you're using Decision Manager, the first decision is: how much do you customise? CyberSource ships strong default rule packs per industry. Customising aggressively in week one feels productive but locks you into Decision Manager's expression language and makes a future migration to a different engine painful.

The right pattern: **start with default rule packs + 2–3 simple customisations**. Let the data accumulate for 90 days before doing deeper customisation. If at 90 days you want to migrate to your own ML model, the cost of removing 3 customisations is low; the cost of removing 300 is brutal.

### 4. 3DS2 + step-up logic

CyberSource handles 3DS2 orchestration. The exemption logic (TRA, low-value, recurring, trusted beneficiary) is yours to configure via the API. **Default-on aggressive step-up will tank your conversion.** Wire merchant-side exemption rules before launch.

### 5. Webhook ↔ settlement-file reconciliation

CyberSource emits webhooks on transaction lifecycle. They will arrive out of order. The settlement file is ground truth. Build reconciliation against the settlement file from day one; never trust webhooks as the source of truth.

## The six failure modes specific to CyberSource

### 1. Decision Manager treated as "the fraud strategy"

Decision Manager is a strong baseline, not a complete fraud strategy. Teams that treat it as the whole answer skip the per-merchant velocity, the customer-trust signals from their own platform, the chargeback feedback loop. Two years in, the team realises Decision Manager has plateaued and they have no in-house feature store to fall back on.

**Fix:** treat Decision Manager as one signal among several. Build your own feature pipeline in parallel from week one. Decision Manager scores → your own model scores → combined logic decides.

### 2. TMS as "just a tokenisation service"

TMS is a card-on-file vault. Used well, it's the merchant's card-on-file product. Used badly, it's a token wrapper that the merchant then duplicates in their own database "for fallback."

**Fix:** make TMS the single source of truth for any card-on-file reference. Your database has TMS references; you don't store anything that looks like a card.

### 3. Flex Microform JavaScript SDK pinned at integration version

The SDK gets updates — new card-network features, improved 3DS2 friction logic, security patches. Teams pin the SDK version at integration time and never upgrade.

**Fix:** SDK upgrades on a quarterly cadence. CyberSource publishes a changelog; product owns reviewing it.

### 4. Account Updater not subscribed to the right BIN ranges

Account Updater works on Visa BINs by default. If your card mix is heavy on Mastercard / Amex, Account Updater coverage is partial. Teams sometimes assume it's universal and discover the gap when the first wave of subscription failures hits.

**Fix:** measure Account Updater coverage rate by network and by issuer in the first 30 days. If coverage is below 90% of your card mix, pair with MDES-side equivalents.

### 5. Simple Order API still in production

The legacy XML API works but lacks support for newer CyberSource features (advanced exemptions, new tokenisation options, latest Decision Manager rule packs). Teams stay on it because "it works" and accumulate a migration debt.

**Fix:** migrate to REST. Allocate the engineering time; the longer you wait, the more it costs.

### 6. Hosted Checkout chosen, conversion plateaus

Same trap as MPGS. The first integration is Hosted Checkout because it's fast; conversion plateaus 6 months later; the team rebuilds on Flex Microform at the cost of every downstream surface that assumed redirect-based UX.

**Fix:** if your merchant base will ever care about checkout UX, start on Flex Microform from day one. The integration is slightly more work; the migration cost later is 3–4×.

## CyberSource vs MPGS — the actual decision framework

Three questions decide which one is right for your stack:

1. **Card-mix.** Heavy on Visa? CyberSource. Heavy on Mastercard? MPGS. Mixed? You'll end up integrating both eventually; pick the network you have the deeper relationship with.

2. **Do you need Decision Manager's network-level fraud signal?** New acquirers, thin local data, small fraud team → CyberSource. Mature fraud team with their own feature store → MPGS (cheaper, less product surface you don't use).

3. **What's your multi-acquirer story?** Single sponsor bank, Visa-aligned → CyberSource. Multi-sponsor or non-Visa-affiliated acquirers → MPGS's routing model is less opinionated.

Most large acquirers run **both** in production. They route Mastercard scheme volume through MPGS, Visa scheme volume through CyberSource, and unify the merchant product surface in their own platform layer. The decision then becomes "in which scheme bucket does this transaction belong" rather than "MPGS or CyberSource."

## Why this matters

A senior product hire at Visa or one of Visa's regional offices will be asked about CyberSource within the first interview round. So will a hire at a large acquirer evaluating gateway consolidation. So will a payment-orchestration product lead pitching multi-gateway routing.

The candidate who understands CyberSource as a **product suite** (Decision Manager, TMS, Flex Microform, Payouts, Account Updater) rather than "Visa's MPGS equivalent" has a 30-minute conversation about architecture. The candidate who can articulate where CyberSource is genuinely stronger, where MPGS is genuinely stronger, and how a real multi-gateway operator strategy looks — that candidate gets the job.

## FAQ

**Is CyberSource open to non-Visa cards?** Yes — it processes Mastercard, Amex, Discover, JCB, regional networks. Visa just owns the company.

**Can I use CyberSource without Decision Manager?** Yes. Decision Manager is a separately licensed product. Many merchants use CyberSource Payment Acceptance + their own fraud engine.

**Does CyberSource handle PSD2 SCA?** Yes — orchestration. The exemption logic is your responsibility (same pattern as MPGS).

**Account Updater vs Visa Token Service direct?** AU is a service that refreshes underlying PANs behind gateway tokens. VTS issues network tokens. They're complementary — VTS-issued tokens managed by TMS, with AU subscribed for the lifecycle events.

**How long does a CyberSource integration take?** Hosted Checkout: 4–6 weeks. Flex Microform: 10–16 weeks for production-grade. REST API direct: don't.

**Is CyberSource cheaper than building your own?** For 95% of teams, yes. The build-vs-buy break-even is somewhere north of $5B annual GTV with a serious payments engineering org.

**The single biggest mistake new CyberSource customers make?** Treating Decision Manager as the complete fraud strategy and never building their own signal layer. The first chargeback wave teaches you otherwise.
