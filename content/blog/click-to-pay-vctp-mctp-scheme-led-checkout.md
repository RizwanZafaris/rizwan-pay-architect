---
title: "Click to Pay (VCTP / MCTP): The Scheme-Led Checkout Standard, How It Actually Works"
slug: "click-to-pay-vctp-mctp-scheme-led-checkout"
category: "Payment Infrastructure"
metaTitle: "Click to Pay (VCTP / MCTP): A Product Guide | Rizwan Zafar"
metaDescription: "Click to Pay explained from the operator's lens — what VCTP and MCTP actually are, the merchant + issuer + consumer surface, why it shipped, where it works, where it's still patchy."
excerpt: "Click to Pay is the schemes' answer to Apple Pay and Google Pay — a scheme-owned consumer checkout standard that lifts authorisation rate and removes card-number entry. It works. It's just under-marketed. This is the operator-grade map."
publishDate: "2026-05-20"
readingTime: "11 min read"
tags:
  - Click to Pay
  - VCTP
  - MCTP
  - scheme checkout
  - card networks
  - network tokenisation
  - EMVCo SRC
  - payment infrastructure
  - Visa
  - Mastercard
targetAudience:
  - Acquirer product leads
  - E-commerce checkout PMs
  - Issuer product hires
  - Visa / Mastercard product roles
targetKeywords:
  - Click to Pay
  - VCTP integration
  - MCTP integration
  - EMVCo SRC
  - scheme checkout
  - Click to Pay vs Apple Pay
  - Click to Pay merchant integration
relatedArticles:
  - "/blog/mdes-network-tokenisation-how-it-actually-works"
  - "/blog/mpges-mastercard-payment-gateway-services-architecture"
  - "/blog/cybersource-architecture-visa-payment-gateway"
---

# Click to Pay (VCTP / MCTP): The Scheme-Led Checkout Standard, How It Actually Works

Click to Pay is the schemes' answer to Apple Pay and Google Pay. It's a scheme-owned consumer checkout standard built on top of EMVCo's Secure Remote Commerce (SRC) specification, surfaced to consumers by Visa as **Visa Click to Pay (VCTP)** and by Mastercard as **Mastercard Click to Pay (MCTP)**.

It works. The auth-rate lift is real. The friction reduction is real. And yet — five years after it shipped — most merchants outside the US don't have it integrated, most consumers don't know it exists, and the trade press treats it as either redundant or vapourware.

This is the operator-grade map: what Click to Pay actually does, the product surfaces (merchant, issuer, consumer), how it integrates, why it shipped, and why the integration math is shifting in 2026.

## What Click to Pay actually is

EMVCo defined a spec called **Secure Remote Commerce (SRC)** — a network-neutral way for a consumer to check out at any participating merchant without entering card details. The schemes built consumer-facing implementations on top: Visa Click to Pay, Mastercard Click to Pay, AmEx Click to Pay, Discover Click to Pay.

The four primitives:

1. **A network-issued credential** — when a consumer enrols their card with their issuer's Click to Pay flow, the card is tokenised via MDES / VTS / equivalent. The consumer's Click to Pay identity is bound to that token.
2. **An identity layer** — Click to Pay knows the consumer by phone or email. Across any participating merchant, the consumer presents that identity.
3. **A merchant-facing API surface** — the merchant integrates a Click to Pay SDK or API. At checkout, the merchant offers Click to Pay as a payment option; the consumer recognises their card; one click ships.
4. **A scheme-orchestrated authentication** — the consumer authenticates once via their issuer (biometric, OTP, or device-bound) and that authentication is portable to every subsequent Click to Pay transaction within the session window.

From the consumer's side: it looks like one button on the checkout, recognised across merchants, no card-number entry, no 3DS2 challenge in most cases.

From the merchant's side: it looks like a payment-method option (alongside cards, Apple Pay, Google Pay) that returns a network token plus an authentication signal.

From the scheme's side: it looks like a Visa- or Mastercard-branded checkout running on top of their network-token infrastructure (VTS / MDES) plus an identity layer.

## Why it shipped (and what it's competing with)

Click to Pay exists because of one strategic problem: **the schemes were being disintermediated at consumer checkout.**

Apple Pay and Google Pay are wallet brands. The consumer experiences "I pay with Apple Pay" — not "I pay with my Visa card." Apple takes a cut of every Apple Pay transaction. The card brand on file matters less and less. For Visa and Mastercard, that's an existential risk: lose the brand surface, lose the consumer relationship, lose pricing power.

Click to Pay reverses the framing. The consumer experiences "I pay with my Visa card via Click to Pay." The scheme brand is the visible brand. The scheme runs the identity layer. The scheme orchestrates the auth flow.

What it's competing with:

- **Apple Pay / Google Pay** — device-wallet checkout, dominant in mobile
- **Browser autofill** — Chrome, Safari, Firefox card autofill (varies by region)
- **Merchant card-on-file checkouts** — the merchant remembers the consumer's card
- **Stripe Link / Adyen one-click** — PSP-level consumer checkout brands

The competitive ask is hard. Apple Pay shipped to half a billion devices before Click to Pay shipped to any. The schemes are playing catch-up on consumer mind-share.

## Where Click to Pay genuinely wins

Three places, and they're the reason the integration math is worth doing in 2026.

### 1. Auth-rate uplift

A Click to Pay transaction carries a network token (via VTS / MDES) and a scheme-issued authentication signal. The combination is treated by issuers as **higher-trust** than a manual PAN entry. Auth rates lift accordingly — the published Visa data shows 3–8% lift over manual entry on equivalent transactions, with bigger uplifts in regions where 3DS2 step-up causes the most drop-off.

For a subscription business or an e-commerce platform where every percentage point of auth rate is revenue, the math is straightforward.

### 2. Cross-merchant consumer recognition

Once a consumer is enrolled in Click to Pay at one merchant, they're recognised at every other participating merchant. No re-entry of card details. The recognition signal is the consumer's email or phone; identity is matched on first checkout.

In aggregate, this drops checkout friction for a measurable segment of consumers — especially first-time-buyer flows where card-on-file isn't yet established.

### 3. PSD2 SCA elegance

In Europe, Click to Pay's authentication flow satisfies PSD2 Strong Customer Authentication with less friction than a typical 3DS2 challenge. The issuer-level authentication is reusable within session; subsequent transactions don't need to re-prompt the consumer.

For European merchants, this is the single biggest functional reason to integrate.

## Where it's still patchy (the honest part)

Three real limitations as of 2026.

### 1. Consumer awareness is low outside the US

US e-commerce has visible Click to Pay buttons (the four-arrow SRC icon plus the scheme brand). Outside the US, awareness is low. Many consumers see the Click to Pay button and don't know what it is. Conversion lift depends on consumer recognition; in markets where recognition is below 20%, the lift is muted.

### 2. Enrolment rate depends on issuer cooperation

For Click to Pay to work, the consumer's issuer has to have enrolled the card. Major US issuers have done this at scale; many non-US issuers haven't. In some MENA and South Asian markets, the issuer enrolment rate is below 30%, which caps the addressable Click to Pay surface.

### 3. Merchant coverage isn't universal

Major e-commerce platforms (Shopify, BigCommerce, etc.) have Click to Pay support but it's often opt-in. Smaller merchants have spotty coverage. The network effect that makes Click to Pay valuable — "I see it everywhere" — isn't fully there yet.

## How merchants integrate

Three integration shapes, picked based on stack.

### Pattern A: Via your existing gateway

Most teams should default to this. MPGS, CyberSource, Stripe, Adyen and the major orchestrators have Click to Pay support exposed through their existing APIs. You enable the feature flag, render the Click to Pay button in your checkout, and the gateway handles the SRC orchestration.

The advantage: no separate certification, no separate vendor relationship. The trade-off: you're at the gateway's pace for new Click to Pay features.

### Pattern B: Direct via EMVCo SRC SDK

Available, rarely chosen. The merchant integrates directly with EMVCo SRC, manages the consumer identity layer, handles the per-scheme nuances. Heavy engineering load.

Use only if: you're a large platform with full control over checkout (Shopify-scale) and your gateway's Click to Pay support is materially behind what the schemes have shipped.

### Pattern C: Via a "Click to Pay aggregator" (rare)

A small number of vendors offer Click to Pay as a service abstracted from any specific gateway. Niche use case for merchants who don't want to be locked into a single PSP for Click to Pay support.

## The architecture decisions that compound

Four decisions in the first sprint determine whether Click to Pay delivers the lift.

### 1. Button placement

The Click to Pay button has to be visible **before** the consumer reaches manual card entry. If it's tucked under "Other payment methods" or revealed after manual fields, consumers default to manual entry and the lift never lands.

Right pattern: Click to Pay button as a peer option to Apple Pay / Google Pay, above the manual card form.

### 2. Identity recognition flow

When a returning Click to Pay consumer hits checkout, the SDK can recognise them by email / phone hint or by browser-stored signal. The "I see your card on file" UX should land before any manual fields are shown.

Right pattern: pre-populate Click to Pay recognition asynchronously on checkout page load; if recognised, surface their saved card; otherwise fall through to manual.

### 3. 3DS2 exemption handling

A Click to Pay transaction often qualifies for 3DS2 exemption (the scheme-issued authentication signal). The merchant has to actively pass the exemption flag to the gateway; gateways that default to "always step up" will trigger unnecessary challenges.

Right pattern: configure your gateway to accept Click to Pay's authentication signal as PSD2 SCA delegation.

### 4. Fallback to manual

If the consumer is in a region where Click to Pay isn't supported, or their issuer isn't enrolled, or the SDK can't load, the manual card form has to be the fallback. Some integrations make Click to Pay so prominent that the manual fallback feels broken when it's needed.

Right pattern: Click to Pay button visible but not exclusive. Manual fallback always available, never gated.

## The six failure modes

### 1. Treated as "Apple Pay alternative" only

Some teams integrate Click to Pay assuming it's just another wallet option. It's more — it's the cross-merchant consumer recognition that's the differentiator. Without surfacing the recognition, the value is muted.

### 2. Button placement under "Other"

Already named. Consumers don't dig.

### 3. No PSD2 exemption configuration

EU merchants leave money on the table by triggering 3DS2 step-up on Click to Pay transactions that qualify for exemption. Conversion drops 5-10% on those transactions.

### 4. Underestimating enrolment friction

Some merchants assume issuer enrolment is universal. It's not. Measure enrolment rate by issuer in the first 30 days; if it's below 60%, your Click to Pay surface is capped.

### 5. Single-scheme integration

The merchant integrates VCTP but not MCTP (or vice versa). Half of the consumer's card mix falls through. Click to Pay is most valuable when **all** participating schemes are enabled.

### 6. Treating Click to Pay as the long-term replacement for OEM wallets

It's not. Apple Pay and Google Pay are still the dominant mobile-checkout wallets. Click to Pay shines on desktop and on mobile web where the OEM wallet isn't native. Don't deprecate Apple Pay support; add Click to Pay alongside.

## Why this matters

Click to Pay isn't going to "win" the consumer-wallet war against Apple Pay or Google Pay. That ship sailed five years ago. What it does is meaningfully shift the auth-rate ceiling, reduce checkout friction on desktop web, and handle PSD2 SCA elegantly in regions where it's a real problem.

For a payments product team in 2026, the integration math is straightforward: small engineering investment via your existing gateway, measurable conversion uplift on the segment that does use it, downstream alignment with the schemes' direction. The teams that integrate it sooner accumulate the auth-rate lift over years; the teams that wait keep finding excuses.

For a recruiter scanning a payments product PM's portfolio, "shipped Click to Pay" is a precise, scheme-specific signal — concrete enough that it's hard to fake and current enough that it shows the PM has been paying attention to where the network products are moving.

## FAQ

**VCTP or MCTP — which one to integrate first?** Both, simultaneously, via your existing gateway. The integration cost is marginal once one is in. The card-mix split decides which one delivers more lift volume.

**Click to Pay vs Apple Pay vs Google Pay?** Apple Pay / Google Pay are device-wallets, native on mobile, biometric-authenticated. Click to Pay is scheme-led, network-token-backed, works across desktop and mobile web. Use all three.

**Does Click to Pay work in-app?** Less elegantly. The schemes are pushing toward in-app Click to Pay support but the SDK ergonomics aren't on par with Apple Pay / Google Pay SDKs yet. Default to OEM wallets for in-app.

**Is the data shared across merchants?** Identity recognition is shared (the consumer's email / phone is matched). Card data is not — the merchant only ever sees a network token bound to their specific session.

**What does Click to Pay cost the merchant?** Usually no incremental per-transaction fee from the scheme. Your gateway may charge for the Click to Pay processing path; that varies by contract.

**Is enrolment opt-in?** Yes. Consumers have to enrol their card via their issuer or merchant flow. Some issuers have started "soft enrolling" cards (eligible to use, requires consumer confirmation on first use).

**Why do teams under-adopt Click to Pay?** Because the integration is a few-week engineering job and the lift is gradual rather than dramatic. Teams chasing big visible wins skip it. The teams that keep it in the roadmap absorb the small lift compounded over years.
