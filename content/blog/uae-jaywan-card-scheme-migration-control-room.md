---
title: "UAE Jaywan Rollout Needs a Scheme-Migration Control Room"
slug: "uae-jaywan-card-scheme-migration-control-room"
category: "Payment Infrastructure"
metaTitle: "UAE Jaywan Scheme-Migration Control Room"
metaDescription: "Jaywan is now a UAE card rollout. The operator decision is how issuers, acquirers and merchants prove routing, 3DS, disputes and reconciliation."
excerpt: "Jaywan has moved from national card-scheme concept to phased UAE issuance. Here is the scheme-migration control room I would require before scaling it."
publishDate: "2026-08-17"
readingTime: "7 min read"
experiment: "MENA national-card-scheme migration control room"
tags:
  - Jaywan
  - UAE payments
  - card scheme migration
  - payment infrastructure
  - merchant acceptance
targetAudience:
  - UAE payments product leaders
  - issuing and acquiring executives
  - payment processors and gateways
  - merchant operations leaders
targetKeywords:
  - UAE Jaywan card scheme
  - Jaywan card rollout
  - UAE national card scheme
  - card scheme migration controls
relatedArticles:
  - "/blog/bin-routing-scheme-selection-override-default"
  - "/blog/mena-south-asia-payment-infrastructure-country-map"
  - "/blog/three-way-reconciliation-at-scale"
  - "/hire"
---

# UAE Jaywan Rollout Needs a Scheme-Migration Control Room

Jaywan is no longer only a national card-scheme announcement.

The Central Bank of the UAE announced on 20 July 2026 that Jaywan, the UAE's first national card scheme, had begun nationwide card issuance through banks, licensed financial institutions and exchange houses. The same CBUAE release says Jaywan cards are accepted at point-of-sale terminals, e-commerce platforms, ATMs and digital wallets, and can be used for domestic and international payment transactions under applicable rules.

That is the point where the operating problem changes.

A domestic scheme does not succeed because the card has a new logo. It succeeds when issuers, acquirers, processors, gateways, merchants, wallets, dispute teams and finance teams can prove that every transaction has the right rail, the right authentication path, the right customer message and the right settlement evidence.

I would not manage the Jaywan rollout as a brand launch. I would manage it as a scheme-migration control room.

## The Short Answer

**For UAE payments leaders, the Jaywan scale decision should be a control-room decision: before moving meaningful volume, prove issuance readiness, domestic acceptance, co-badge routing, 3-D Secure behaviour, wallet token handling, dispute ownership and reconciliation parity across the full card lifecycle.**

If those controls are not visible, the programme may localise card payments while pushing the hard work into support queues, merchant escalations and finance breaks.

## What Has Actually Changed

CBUAE's launch release matters because it moves Jaywan from infrastructure readiness into active market rollout. Issuance has started in phases. The accepting surfaces are broad: POS, e-commerce, ATM and digital wallets. The participant set is also broad: banks, LFIs, exchange houses, Al Etihad Payments, local payment companies and international payment companies.

Al Etihad Payments describes Jaywan as the UAE's national card payment scheme, built for local needs and connected to global payment networks. Its Jaywan materials emphasise localisation of debit and prepaid card transactions, data processing and storage in the UAE, lower electronic-payment costs for users, merchants and licensed financial institutions, and financial inclusion.

AEP's Jaywan explainer also makes the migration surface explicit. It says Jaywan provides a homegrown option to internationally issued debit and prepaid cards, supports domestic and international transactions, uses partnerships with Visa, Mastercard, Discover and UnionPay, and includes EMV chip technology, tokenisation, fraud monitoring, tap-to-pay and mobile-wallet integration.

That is not a single integration. It is a card-scheme operating model.

## Why A Control Room Beats A Launch Checklist

A launch checklist asks whether the card can transact.

A control room asks whether the system knows what happened when the transaction does not behave cleanly.

That difference matters on a national card rollout. Issuers can be ready before a merchant gateway is ready. POS may work before e-commerce is clean. Domestic routing may pass certification while wallet token routing still follows a different path. A co-badged card may work on one international partner and fail on another. A payment may approve, but the dispute, refund or settlement evidence may still be mapped to the wrong rail.

In my experience running payment platforms, the first serious production issue is rarely a headline outage. It is usually a state mismatch: customer paid, merchant did not release the order, the gateway cannot explain the rail, finance cannot match the clearing record, or support cannot tell the customer whether to retry.

Jaywan's operator risk is exactly there.

## The Five Desks I Would Put In The Room

### Desk 1: Issuance And Cardholder Readiness

The first desk owns issuing readiness.

Every issuer should prove which products are live, which BINs or ranges map to Jaywan, which customer segments can receive debit or prepaid cards, what the cardholder sees in the banking app, and how international usage is explained when a card is co-badged.

The control question is simple: can the issuer show, for one customer, the card product, the supported rails, the digital-wallet state, the risk controls and the customer message in one evidence pack?

If not, the rollout is still a product-ops exercise, not a scalable issuing programme.

### Desk 2: Acceptance And Scheme Routing

The second desk owns merchant acceptance.

This is where the existing card-routing lesson still applies, but it should not swallow the whole programme. Domestic transactions need a local-rail decision. Cross-border or partner-network transactions need the correct fall-through. POS, e-commerce, ATM and wallet transactions need separate evidence because they do not fail in identical ways.

I would require a daily routing report that separates Jaywan-only, co-badged domestic, co-badged international and fallback traffic. The report should show authorization outcome, decline reason, routing rail, merchant category, channel, issuer, gateway and settlement path.

The failure to avoid is a hard-coded international default that leaves the local scheme present on the card but invisible in the transaction data.

### Desk 3: Authentication, Tokenisation And Wallets

The third desk owns authentication and token behaviour.

AEP's materials refer to EMV chip technology, tokenisation, fraud monitoring, tap-to-pay and mobile-wallet integration. Each of those terms hides a production question.

For e-commerce, what Directory Server and 3-D Secure path is used for each Jaywan or co-badged transaction? For wallets, is the token preserving the intended domestic rail, or is the wallet token shifting the transaction to an international network path? For fraud teams, do the risk signals differ when the rail changes?

I would not approve scaled wallet volume until token provisioning, failed token transactions, challenge flows and liability treatment are visible by rail.

### Desk 4: Disputes, Refunds And Reconciliation

The fourth desk owns after-the-payment work.

This is the desk that stops a good launch from becoming a finance problem. Domestic scheme transactions need settlement files, fee lines, chargeback or dispute states, refund references and ledger mapping that finance can reconcile without manual archaeology.

The minimum evidence pack should connect cardholder transaction, merchant order, acquirer record, gateway event, scheme rail, settlement entry, fee line, refund state and support case.

If the same transaction can be routed on Jaywan domestically and an international partner network outside the UAE, the operating model must not assume one dispute or settlement lifecycle.

### Desk 5: Incident, Commercial And Regulator Readiness

The fifth desk owns escalation.

National infrastructure rollouts need a different incident posture from normal product launches. When a card fails, the question may involve issuer configuration, acquirer routing, scheme certification, gateway token support, merchant integration, wallet behaviour or customer education.

The control room should know who can pause a cohort, who can disable a route, who can notify merchants, who can approve customer-facing language, and which regulator or scheme notification threshold applies.

Commercial teams also need truth. If merchants are sold lower cost, domestic processing or better local control, the platform should show which transactions actually took that path and what the trade-off was in approval rate, step-up friction, support contact and reconciliation breaks.

## The Metrics That Should Decide Scale

I would not judge Jaywan readiness by issued-card count alone.

The first scale review should use operational metrics:

1. activated Jaywan cards by issuer and product type;
2. successful domestic authorization rate by channel;
3. co-badge routing share and fallback rate;
4. 3-D Secure challenge and abandonment rate by rail;
5. wallet token provisioning and transaction-failure rate;
6. merchant order mismatch rate;
7. refund, dispute and settlement break rate;
8. support contacts per 10,000 Jaywan transactions.

Those metrics keep the programme honest. They separate real readiness from a ceremonial launch.

## The Operator Decision

Jaywan is strategically important because it localises part of the UAE card-payment stack, strengthens data sovereignty, and gives merchants and financial institutions a domestic scheme option. The CBUAE and AEP source trail supports that direction.

The operator decision is narrower and harder.

Can the ecosystem prove that Jaywan works across the full lifecycle, not just the authorization moment?

My answer would be to run the rollout from a migration control room for the first 90 days of meaningful volume. Give each desk named owners, daily exception data, rail-level reporting and authority to slow a cohort when evidence breaks.

The question I would ask a UAE payments team is not "are Jaywan cards live?"

It is:

**Which transaction class would we pause tomorrow if routing, authentication, settlement or support evidence stopped matching?**

If that answer is clear, Jaywan is becoming infrastructure.

If that answer is unclear, the market has a new payment rail and an old operations problem.

For related operating models, read [BIN routing and scheme selection](/blog/bin-routing-scheme-selection-override-default/), the [MENA and South Asia payment infrastructure map](/blog/mena-south-asia-payment-infrastructure-country-map/), and [three-way reconciliation at scale](/blog/three-way-reconciliation-at-scale/). If your UAE acquiring, issuing or payment infrastructure programme needs a stronger migration control room, start at [/hire/](/hire/).

## FAQ

**Is Jaywan only a domestic card scheme?**

Jaywan is the UAE's national card scheme, but the public materials describe both domestic use and international transactions through applicable rules and global network partnerships. That is why co-badge routing, fallback and customer messaging matter.

**What is the biggest operational risk in a national card rollout?**

The biggest risk is lifecycle mismatch. Authorization may work while wallet routing, dispute handling, refunds, settlement, fee mapping or support evidence still uses the wrong assumptions.

## Sources

- [CBUAE: Mansour bin Zayed inaugurates Jaywan, the UAE's first national card scheme](https://www.centralbank.ae/media/y14hg2wv/mansour-bin-zayed-inaugurates-jaywan-the-uae-s-first-national-card-scheme-en.pdf)
- [CBUAE: Infographic on the UAE's National Card Scheme Jaywan](https://www.centralbank.ae/media/dfwniimg/jaywan-infographic-en.pdf)
- [Al Etihad Payments: About Jaywan](https://aep.ae/en/services/about-jaywan/)
- [Al Etihad Payments: Jaywan](https://aep.ae/en/services/jaywan/)
- [Al Etihad Payments: Jaywan questions answered](https://aep.ae/en/news-media/press-releasesarticles/jaywan-uaes-new-domestic-card-payment-scheme-all-your-questions-answered/)
- [Al Etihad Payments: Jaywan-Mastercard co-badged debit and prepaid cards](https://aep.ae/en/news-media/press-releasesarticles/arabian-business-al-etihad-payments-mastercard-launch-jaywan-co-badged-debit-and-prepaid-cards-in-uae/)
