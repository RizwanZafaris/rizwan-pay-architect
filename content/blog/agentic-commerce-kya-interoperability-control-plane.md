---
title: "KYA Makes Agent Payments An Identity Control Plane"
slug: "agentic-commerce-kya-interoperability-control-plane"
category: "AI & Product Operations"
metaTitle: "KYA Makes Agent Payments An Identity Control Plane"
metaDescription: "Ant, Mastercard and Visa's Know-Your-Agent collaboration turns agentic commerce into identity, authorization and evidence work for payment operators."
excerpt: "Know-Your-Agent will matter only if payment operators can prove who controls the agent, what it is allowed to do, how it was certified, and which transaction evidence survives exceptions."
publishDate: "2026-09-12"
readingTime: "7 min read"
experiment: "Agentic commerce KYA operating model"
tags:
  - Know-Your-Agent
  - agentic commerce
  - AI payments
  - payment identity
  - wallet interoperability
targetAudience:
  - Wallet product leaders
  - PSP and acquirer teams
  - AI commerce builders
  - Risk and payment operations leaders
targetKeywords:
  - Know Your Agent payments
  - agentic commerce KYA
  - AI agent payment identity
  - wallet agentic commerce controls
relatedArticles:
  - "/blog/mastercard-agent-connect-merchant-control-plane"
  - "/blog/agentic-commerce-visa-mastercard-payments"
  - "/blog/cross-river-stripe-agentic-card-mandate-controls"
  - "/hire"
---

# KYA Makes Agent Payments An Identity Control Plane

Agentic commerce is getting its next operating layer: agent identity.

On 10 September 2026, [Ant International announced](https://www.ant-intl.com/en/news/detail/?id=ant-international-mastercard-and-visa-initiate-collaboration-on-know-your-agent-interoperability-to-scale-agentic-commerce) that Ant International, Mastercard and Visa had begun collaborating on a Know-Your-Agent interoperability framework. The stated aim is to help card networks, digital wallet ecosystems, agent platforms and marketplaces identify and onboard agents across networks, using shared principles while preserving each network's own verification and decisioning.

One day later, Ant International said its [Agentic Mobile Protocol](https://www.prnewswire.com/apac/news-releases/ant-internationals-agentic-mobile-protocol-rolls-out-globally-with-wallets-and-acquirers-initiating-collaboration-on-kya-interoperability-framework-with-mastercard-and-visa-302876108.html) was rolling out through the Alipay+ ecosystem, with 10 wallet partners and seven acquiring partners in Phase I. The same release repeated the KYA collaboration and tied it to SAFR and BuildFin.ai work convened around responsible AI in financial services.

The useful reading is not "AI agents can now pay everywhere."

The useful reading is this:

**Agentic commerce will not scale until payment operators can prove who controls the agent, what task the user authorized, how the agent was certified, which rail accepted the risk, and what evidence survives when the transaction breaks.**

That is an identity control-plane problem.

## What The Sources Confirm

The 10 September announcement describes three collaboration themes: cross-network operator traceability, shared certification requirements and continuous transaction monitoring.

Those words are doing real work.

Operator traceability means an agent should be linked back to a validated operator, cardholder, business or organization. Shared certification means the agent is assessed against security and behavioral requirements before it is treated as trusted. Continuous monitoring means the trust decision is not a one-time badge; transaction and identity signals keep feeding the assessment.

The 11 September AMP rollout adds scale context. Ant says the Alipay+ ecosystem has more than 50 mobile payment partners, over 10 national QR schemes, 150 million merchants and 2 billion consumer accounts. It also says Phase I involves 10 Alipay+ wallet partners serving 1.5 billion user accounts, plus acquirers including Adyen, Allinpay, Checkout.com, Fiserv, Global Payments, Nuvei and Worldline.

That is why the identity question matters. Agent payments are not only card payments with a new front end. They may sit across wallets, QR schemes, acquirers, marketplaces, AI platforms and card networks.

Claim boundary: these announcements do not create a universal KYA standard, prove production interoperability, create a new regulation or mandate one network product. They show where the operating model is moving.

## The Agent Is Not The Customer

A normal payment stack usually knows the customer, the merchant, the payment credential and the risk decision.

Agentic commerce introduces another actor.

The agent may search, compare, select, negotiate, fill a cart, request a wallet action and trigger payment. The customer still owns the intent. The merchant still owns the offer. The wallet or card network still owns parts of authorization and risk. But the agent becomes the actor that connects the steps.

If the stack cannot identify that actor, every downstream process becomes weaker.

Fraud teams cannot tell whether a pattern came from a compromised user, a rogue agent, a weak marketplace integration or a permitted automation. Support teams cannot reconstruct what the agent was asked to do. Dispute teams cannot tell whether the agent stayed inside the user's instruction. Product teams cannot segment performance by agent type or policy version.

In that world, the payment may authorize but the operating model is blind.

## KYA Needs More Than A Registry

A registry is necessary, but it is not sufficient.

Payment operators need a live identity object that answers six questions:

- Who operates this agent?
- Which user, business or organization authorized this task?
- What is the agent allowed to do?
- Which certification or trust checks have passed?
- Which rail, wallet, merchant and acquirer accepted the action?
- What should happen if the agent behaves differently from its declared scope?

The object should travel with the transaction, or at least be reconstructable from transaction references. Otherwise KYA becomes a directory that compliance can admire and operations cannot use.

The practical fields are not exotic: agent ID, operator ID, task scope, user authorization timestamp, budget or limit, merchant participation rule, certification status, risk score, policy version, payment credential scope, monitoring outcome and exception owner.

If those fields are missing, agentic commerce will look like ordinary card-not-present or wallet traffic after the fact. That erases the context that makes the risk governable.

## The User Authorizes A Task, Not An Account

The most important product distinction is task authorization.

Traditional payment setup often asks whether a credential can be used. Agentic payment has to ask what the agent is permitted to accomplish.

"Book me a hotel under $300 a night near DIFC" is not the same as "use my wallet whenever this agent asks." The user's instruction has boundaries: category, merchant type, location, budget, dates, cancellation rules, payment method and whether human review is required before final payment.

That authorization should be explicit enough to survive audit.

It should also be revocable. If a user changes a trip plan, if a merchant changes price, if an agent fails certification, or if monitoring flags unusual behavior, the system needs a clean way to reduce scope, pause, request review or stop.

This is where KYA becomes a product-control layer, not only a risk taxonomy.

## What Wallets And Acquirers Should Build

Wallets need agent delegation controls that users can understand.

The customer should see which agent is connected, what task it can perform, which payment instrument it can use, what limits apply, and how to revoke it. The product should avoid account handover language. The better phrase is task permission.

Acquirers and PSPs need merchant-side acceptance controls.

Not every merchant will want every agent. A serious merchant interface should allow policies by agent, marketplace, product category, basket size, region, payment method and risk tier. Some merchants may allow agents to discover products but require human review before payment. Others may allow repeat low-risk purchases but block regulated or high-return categories.

Networks and schemes need evidence formats that survive routing.

If one ecosystem certifies an agent and another rail sees the payment, the receiving side needs enough signal to make a decision without blindly trusting an opaque badge. That is the interoperability challenge hidden inside KYA.

## Gulf And MENA Relevance

The Gulf and MENA angle is not that this announcement proves a local rollout.

The relevance is that regional payments already depend on wallet ecosystems, QR schemes, cross-border acceptance, local acquiring and merchant onboarding. Ant says Alipay+ connects more than 10 national QR schemes across Asia and the Middle East. If agentic payment moves into those wallet and QR surfaces, regional PSPs and banks will need evidence that is more granular than "wallet transaction approved."

For a Gulf operator, the first readiness file is simple:

- which agent types are allowed;
- which customer tasks can be delegated;
- which wallet or credential scopes are permitted;
- which merchant categories are excluded;
- how agent identity appears in risk and reconciliation;
- how a customer revokes an agent task;
- which team owns disputes when the agent followed the payment rules but violated the user's intent.

That file is small enough to write now and important enough not to postpone.

## The Scorecard

Measure agent payments as a controlled channel, not as a demo.

Track agent registration requests, certification pass rate, wallet-link completion, task-authorization completion, revocation rate, agent-led cart conversion, human-review rate, risk hold rate, authorization approval, post-payment exception rate, dispute rate and time to reconstruct evidence.

Segment by agent platform, wallet, merchant category, rail, market, policy version and authorization scope.

The best early signal is not volume. It is whether the good transactions complete cleanly and the ambiguous ones stop with enough evidence to explain why.

## Operator Takeaway

Know-Your-Agent is useful only if it changes the operating truth of a payment.

The question for product and risk teams is not "do we have an agent ID?"

It is:

**Can we prove who controlled the agent, what the user allowed, what the merchant accepted, which trust checks passed, which rail made the decision and who owns the exception?**

That is the work that turns agentic commerce from a payment experiment into payment infrastructure.

For adjacent context, read [Mastercard Agent Connect and merchant control](/blog/mastercard-agent-connect-merchant-control-plane/), [agentic commerce across Visa and Mastercard](/blog/agentic-commerce-visa-mastercard-payments/) and [agentic card mandate controls](/blog/cross-river-stripe-agentic-card-mandate-controls/). For help turning this into a launch gate, start at [/hire/](/hire/).

## FAQ

**What is Know-Your-Agent in payments?**

Know-Your-Agent is the emerging idea that AI agents involved in commerce should be identifiable, attributable to an operator or user, certified against trust requirements and monitored during transactions.

**Did Ant, Mastercard and Visa launch a universal standard?**

No. The public announcement says they began collaborating on a KYA interoperability framework based on shared principles while preserving each network's own verification and decisioning.

**Why does KYA matter for wallets?**

Wallets need to distinguish between a user authorizing a task and a user handing over account control. That difference drives consent, limits, revocation, monitoring and dispute handling.

**What should a PSP or acquirer do first?**

Define the fields needed to accept agent-led transactions safely: agent ID, operator attribution, task scope, customer authorization, merchant policy, certification status, monitoring outcome and exception owner.

## Sources

- [Ant International: Know-Your-Agent interoperability collaboration, 10 September 2026](https://www.ant-intl.com/en/news/detail/?id=ant-international-mastercard-and-visa-initiate-collaboration-on-know-your-agent-interoperability-to-scale-agentic-commerce)
- [Ant International / PRNewswire: AMP rollout and KYA collaboration, 11 September 2026](https://www.prnewswire.com/apac/news-releases/ant-internationals-agentic-mobile-protocol-rolls-out-globally-with-wallets-and-acquirers-initiating-collaboration-on-kya-interoperability-framework-with-mastercard-and-visa-302876108.html)
- [MAS: Safeguards for Agentic Finance at Runtime media release, 3 July 2026](https://www.mas.gov.sg/news/media-releases/2026/mas-partners-industry-to-develop-safeguards-for-ai-agents-in-finance)
- [MAS: SAFR information paper, 3 July 2026](https://www.mas.gov.sg/publications/monographs-or-information-paper/2026/safeguards-for-agentic-finance-at-runtime)
