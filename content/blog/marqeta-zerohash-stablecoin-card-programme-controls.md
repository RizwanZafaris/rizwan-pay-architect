---
title: "Marqeta and zerohash Turn Stablecoins Into Card Programme Controls"
slug: "marqeta-zerohash-stablecoin-card-programme-controls"
category: "Card Issuing"
metaTitle: "Marqeta zerohash Stablecoin Card Controls"
metaDescription: "Marqeta and zerohash show why stablecoin-backed cards need issuer controls, custody boundaries, ledger latency, and dispute-ready operations."
excerpt: "A stablecoin-backed card programme is not a crypto shortcut. It is an issuing operating model where custody, authorization, ledgering, fiat merchant settlement, risk policy, and customer disclosures have to meet inside one decision loop."
publishDate: "2026-07-28"
readingTime: "7 min read"
experiment: "operator story"
tags:
  - Marqeta
  - zerohash
  - stablecoin cards
  - card issuing
  - issuer processing
  - ledger controls
targetAudience:
  - Fintech CPOs
  - Card programme leaders
  - Issuer processing teams
  - Stablecoin product leaders
targetKeywords:
  - Marqeta zerohash stablecoin cards
  - stablecoin card programme controls
  - issuer processing stablecoin cards
  - card issuing ledger controls
relatedArticles:
  - "/blog/processor-only-card-issuing-operating-model"
  - "/blog/marqeta-stip-issuer-resilience-operating-model"
  - "/blog/cross-river-stripe-agentic-card-mandate-controls"
  - "/blog/reconciliation-is-product-infrastructure"
---

# Marqeta and zerohash Turn Stablecoins Into Card Programme Controls

The lazy read of stablecoin cards is that crypto is finally coming to everyday spending.

The operator read is more useful: a stablecoin-backed card turns issuer processing into a boundary-control problem.

On July 22, 2026, [zerohash and Marqeta announced](https://www.globenewswire.com/news-release/2026/07/22/3331228/0/en/zerohash-and-marqeta-announce-partnership-to-enable-stablecoin-spending-across-global-card-networks.html) a partnership to integrate zerohash stablecoin infrastructure with Marqeta's card issuing capabilities. The companies said Marqeta customers would be able to embed stablecoin payments into new or existing financial products without rebuilding core systems. They also described a split operating model: zerohash handles custody, compliance, liquidity, and onchain money movement, while Marqeta manages card issuance, acceptance, bank relationships, and network relationships.

That split is the story. The product is a controlled handoff between token custody, card authorization, merchant settlement, ledger state, and customer recourse.

## The Short Answer

**Stablecoin-backed cards should be managed as card programmes with a digital-asset funding source, not as crypto products with a card attached. The issuer operating model needs one decision layer for available balance, card controls, counterparty risk, settlement, disputes, refunds, and customer disclosures.**

## The Partnership Splits The Stack

The announcement draws a clear division of labor. zerohash provides the stablecoin infrastructure; Marqeta provides the issuing platform and network-facing card programme layer.

That is commercially sensible. It lets non-crypto companies expose stablecoin balances without building their own custody, liquidity, and blockchain operations. It also lets crypto-native companies reach merchants through ordinary card acceptance.

The card transaction asks a fast question: should this authorization be approved now? The stablecoin system asks whether the customer balance is real, transferable, compliant, liquid, and available for this purpose. The platform is coordinating two operating systems.

That is why this belongs in the issuing lane. The card is the control point where balance, risk, spend policy, merchant data, and settlement expectations become a yes-or-no authorization.

## Authorization Does Not Wait For Settlement

[Marqeta's platform overview](https://www.marqeta.com/docs/developer-guides/platform-overview) describes the card programme role clearly: the platform works with card networks and issuing banks to issue cards, authorize transactions, and communicate with settlement entities. In its [European ecosystem guide](https://www.marqeta.com/docs/developer-guides/mq-eu-ecosystem), Marqeta says customers using a Just-in-Time gateway participate in authorization decisioning and that most customer approval criteria rely on their ledger and internal risk policies. It also warns that Marqeta allows three seconds for a JIT gateway to approve or decline an authorization.

That three-second window is the product constraint.

A stablecoin balance can be visible onchain and still be operationally awkward at the moment of card authorization. The chain, custody ledger, customer ledger, JIT gateway, and issuer processor all need a consistent answer fast enough for the network path.

The wrong design is to check the stablecoin world only after the card path has approved. That creates reconciliation exceptions and disputes where the platform cannot explain which balance state was trusted.

The better design is a pre-authorization funding state:

- stablecoin balance available;
- asset and jurisdiction allowed;
- conversion or fiat-cover model selected;
- card controls passed;
- customer disclosure accepted;
- exception path defined before approval.

That state should be machine-readable and auditable. It should not be reconstructed from logs after an incident.

## The Ledger Boundary Is Where Risk Hides

zerohash documentation describes [custody services](https://docs.zerohash.com/docs/zerohash-custody) with controls such as MPC protection, policy-engine integration, transfer limits, segregated accounts, audits, and licensing disclosures. Its [about page](https://docs.zerohash.com/page/about-zero-hash) also says crypto and stablecoin services are powered and administered by zerohash, not by partner platforms, and that stablecoin holdings are not FDIC or SIPC protected in the U.S.

If the user sees one card product, the operator still needs several ledgers to agree:

- the stablecoin custody ledger;
- the customer wallet or account ledger;
- the card authorization decision record;
- the issuer processor and network-clearing record;
- the finance reconciliation ledger.

The customer does not care which ledger was "technically" right. Support, compliance, and finance need one explainable state when the transaction is declined, reversed, partially funded, refunded, charged back, or settled after a network delay.

This is the same lesson behind [issuer resilience](/blog/marqeta-stip-issuer-resilience-operating-model): the rail's fallback behavior becomes a product commitment. A stablecoin card programme needs the same discipline.

## Compliance Is Not Outsourced By Integration

The press release says the partnership is designed to help customers avoid taking on additional regulatory burden. That may be true for specific responsibilities handled by zerohash. It should not be read as a product free pass.

The programme owner still has to define the customer, jurisdictions, disclosures, token or chain suspension playbooks, sanctions handling, transaction monitoring, and support language.

If the card programme is sold to a consumer, the burden is higher. A customer who taps a card does not think in terms of custody provider, issuer processor, liquidity desk, or network settlement. The product must hide complexity without hiding accountability.

That means compliance, risk, operations, and product should review the control map together before launch, not after the first exception queue appears.

## The Scorecard I Would Run

For a stablecoin-backed card programme, I would measure:

- authorization approval rate by funding asset and jurisdiction;
- JIT gateway latency and timeout rate;
- stablecoin balance mismatch rate at authorization time;
- card declines caused by custody or compliance holds;
- refund completion time by original funding asset;
- dispute rate by merchant category and asset;
- reconciliation breaks between custody, card, and finance ledgers;
- blocked transactions by sanctions, chain, wallet, and velocity rule;
- disclosure acceptance and complaint rate.

The target is controlled spend where the platform can prove why a transaction was approved, declined, reversed, or escalated.

That is where [reconciliation is product infrastructure](/blog/reconciliation-is-product-infrastructure), not back-office cleanup.

## What Fintech Leaders Should Try Next

Before launching a stablecoin card, map one purchase from funding source to merchant settlement: customer balance, custody account, authorization request, card control, conversion decision, approval response, clearing file, refund path, dispute path, and final ledger entry. Then mark which system owns the state, which team owns the policy, and which field support can safely show the customer.

If your team is designing card issuing, stablecoin funding, or multi-rail payment operations, [work with Rizwan](/hire/) to build the issuing controls, ledger boundaries, and programme scorecard before the first pilot turns into an exception backlog.

## Operator Takeaway

Marqeta and zerohash are not just connecting stablecoins to card networks. They are exposing the control problem every stablecoin card programme has to solve.

The debate point: when a stablecoin-backed card transaction fails, can your team explain the decision from custody balance to network response, or only point at the vendor that returned the last status code?

## FAQ

**What did Marqeta and zerohash announce in July 2026?**

They announced a partnership to integrate zerohash stablecoin infrastructure with Marqeta's card issuing capabilities so customers can embed stablecoin spending into new or existing financial products.

**Why is this an issuing topic rather than a crypto topic?**

Because the card programme still has to authorize transactions, apply spend controls, communicate with banks and networks, manage merchant-facing fiat settlement, handle disputes, and reconcile ledgers.

**What should product leaders test first?**

Start with the authorization and ledger boundary. Prove that the programme can decide whether funds are available, compliant, and usable within the network authorization window.
