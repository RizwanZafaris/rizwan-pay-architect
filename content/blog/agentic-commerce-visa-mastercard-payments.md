---
title: "Agentic Commerce: What Visa and Mastercard Are Really Building"
slug: "agentic-commerce-visa-mastercard-payments"
category: "AI in Fintech"
metaTitle: "Agentic Commerce: Visa vs Mastercard | Rizwan Zafar"
metaDescription: "A researched operator view of agentic commerce, Visa Intelligent Commerce, Mastercard Agent Pay, use cases, risks, and what AI shopping agents change in payments."
excerpt: "Agentic commerce is not a better checkout button. It is the arrival of a new economic actor: software that can discover, decide, and pay under human-defined authority."
publishDate: "2026-06-13"
readingTime: "13 min read"
tags:
  - agentic commerce
  - AI payments
  - Visa Intelligent Commerce
  - Mastercard Agent Pay
  - tokenization
  - payment infrastructure
  - digital commerce
targetAudience:
  - Payments product leaders
  - Fintech founders
  - Banks and PSPs
  - Merchant commerce teams
targetKeywords:
  - agentic commerce
  - Visa Intelligent Commerce
  - Mastercard Agent Pay
  - AI shopping agents
  - agentic payments
relatedArticles:
  - "/blog/ai-in-payments-four-production-use-cases"
  - "/blog/mdes-network-tokenisation-how-it-actually-works"
  - "/blog/click-to-pay-vctp-mctp-scheme-led-checkout"
---

# Agentic Commerce: What Visa and Mastercard Are Really Building

Agentic commerce is the moment AI moves from recommendation to execution.

Not "show me running shoes." More like: "Find the best running shoes under $120, make sure they arrive before Friday, avoid brands with poor return policies, use my preferred card, and do not exceed the budget."

That sounds like a consumer convenience feature. It is much bigger than that.

Payments were built around a simple assumption: a human is present at the point of purchase. The customer clicks buy. The merchant receives the order. The issuer authorizes. If something goes wrong, the dispute process reconstructs what happened.

Agentic commerce breaks that assumption. The buyer may not be physically present in the checkout flow. The agent may compare, select, negotiate, reorder, or pay on behalf of the user. The merchant needs to know whether this is a legitimate agent or a bot. The issuer needs to know whether the user actually authorized the purchase. The network needs to make sure the raw card credential is never handed to an AI model. And if there is a dispute, everyone needs an audit trail of intent.

That is why Visa, Mastercard, OpenAI, Stripe, Google, PayPal, Shopify, Amazon, American Express and others are moving quickly. This is not just a shopping UX race. It is a race to define the trust layer for machine-initiated commerce.

## The clean definition

Agentic commerce is digital commerce where an AI agent helps a consumer or business discover, decide, and complete parts of a purchase under defined authority.

Three things make it different from normal e-commerce:

1. **The interface changes.** The customer may start in ChatGPT, Gemini, Copilot, Perplexity, a bank app, a wallet, or an enterprise procurement system, not on a merchant website.
2. **The actor changes.** The agent performs work: search, comparison, cart creation, checkout initiation, payment, post-purchase support.
3. **The control model changes.** The user sets permissions, limits, approvals, merchant categories, or conditions. The agent operates inside those rules.

The important point: agentic commerce is not "AI recommends products." That already exists. Agentic commerce starts when the agent can take a meaningful action in the buying journey.

## What Visa is building

Visa's strategy is best understood as: make AI agents safe and acceptable for the existing payments ecosystem.

Visa introduced **Visa Intelligent Commerce** on April 30, 2025. The announcement positioned it as a suite of APIs and a commercial partner program for AI platforms, developers, merchants, issuers and payment partners. Visa named partners including Anthropic, IBM, Microsoft, Mistral AI, OpenAI, Perplexity, Samsung and Stripe.

The product stack has three practical parts:

**1. AI-ready cards.** Visa replaces raw card details with tokenized digital credentials. The agent does not hold the card number. The credential is activated only under the consumer's instruction and bound to a permissioned context.

**2. Personalization with consent.** Users can allow basic Visa spend and purchase insights to improve recommendations. This matters because agents need context, but payments data is sensitive. Consent becomes a product requirement, not a policy footnote.

**3. Secure AI payments.** Consumers can set limits and conditions. Visa receives commerce signals in real time, which allows transaction controls, fraud monitoring and dispute support to work in an agent-led flow.

Visa then added the **Trusted Agent Protocol** in October 2025, developed with Cloudflare. This is the merchant-facing trust problem: how does a merchant know that an incoming agent is legitimate and acting with commerce intent?

The protocol uses agent-specific cryptographic signatures and carries three important signals:

- **Agent intent:** Is this agent browsing, retrieving product details, or trying to buy?
- **Consumer recognition:** Is there a known customer relationship behind the agent?
- **Payment information:** Can the agent carry the payment data needed for the merchant's preferred checkout path?

Visa also says Trusted Agent Protocol is designed to align with existing web infrastructure, including HTTP Message Signatures and Web Bot Auth, and to complement other emerging protocols such as OpenAI and Stripe's Agentic Commerce Protocol and Coinbase's x402.

In 2026, Visa added two important moves.

First, **Intelligent Commerce Connect** extends the idea beyond a single network. Visa describes it as an agnostic integration that can work across networks, payment schemes, commerce platforms, token providers and agent platforms. It also helps merchants make product catalogs AI-ready so agents can understand and recommend products while customers still complete purchases on the merchant's storefront.

Second, Visa announced a strategic collaboration with **OpenAI** on June 10, 2026. Visa said it would provide its global network, credentialing capabilities, tokenization, risk controls and security infrastructure to support Visa payments inside OpenAI agentic commerce experiences. The stated control model includes spending limits, merchant categories and required approvals.

My read: Visa is not trying to own the AI assistant. Visa is trying to make AI assistants acceptable to banks, merchants and consumers. It wants to be the trusted operating layer between agents and the acceptance world that already exists.

## What Mastercard is building

Mastercard's strategy is similar in destination but different in language. Mastercard is putting heavy emphasis on agent identity, consented intent, tokenized credentials and merchant recognition.

Mastercard announced **Mastercard Agent Pay** in April 2025. The core idea is to let verified AI agents transact on behalf of consumers and businesses using **Mastercard Agentic Tokens**. These build on Mastercard's existing tokenization capabilities, payment passkeys and programmable payment work.

The phrase to pay attention to is not "AI shopping." It is **agentic token**.

A normal network token protects a card credential in a digital payment flow. An agentic token has to do more. It has to show that a specific agent is involved, that the agent is authorized, that the user gave permission, and that the transaction can be traced if something goes wrong.

In late 2025, Mastercard published the **Agent Pay Acceptance Framework**. This is the merchant adoption layer.

The framework focuses on three jobs:

**1. Register and verify agents.** Agents are uniquely identified before they can transact on the Mastercard network.

**2. Enable merchants with minimal lift.** Mastercard describes a path where merchants can verify agent authenticity at the CDN layer using Web Bot Auth, without rebuilding their checkout. Trusted agents can then submit a Dynamic Token Verification Code in existing card payment fields.

**3. Support richer agentic commerce over time.** Mastercard explicitly references deeper integrations through protocols such as MCP, A2A and ACP, where merchants can exchange richer context with agent platforms.

Mastercard's current product language also clusters around four themes:

- **Know your agent:** only registered agents can transact.
- **Interface standards:** agent-commerce data exchange needs to be consistent.
- **Order intent:** user intent should be verified, not inferred.
- **Consumer consent:** authentication and consent need to be visible in the transaction.

In June 2026, Mastercard introduced **Agent Pay for Machines**, which moves beyond consumer shopping into high-frequency, low-latency, low-value automated payments. The use case is machine-driven commerce: agents, systems, devices and services transacting continuously in the background. Mastercard says it supports credentialing, controls and guaranteed settlement across multiple payment types, including cards and stablecoins.

My read: Mastercard wants the agent to become a visible and governed participant in the payment, not an invisible bot pretending to be a browser. That is the right problem. If the transaction says only "card not present," the ecosystem is blind. If the transaction says "authorized agent acting under this user's intent," risk, disputes and acceptance can evolve.

## Visa vs Mastercard: the real difference

Both networks are solving the same structural problem: how to let software act economically without destroying trust.

The difference is in their centre of gravity.

| Dimension              | Visa                                                                                          | Mastercard                                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Core product language  | Intelligent Commerce, Trusted Agent Protocol, AI-ready cards, Intelligent Commerce Connect    | Agent Pay, Agentic Tokens, Agent Pay Acceptance Framework, Agent Pay for Machines                           |
| Primary emphasis       | Secure agent access to Visa's global payment network and merchant acceptance ecosystem        | Registered agents, agentic tokens, verifiable intent, consent and merchant recognition                      |
| Merchant problem       | Identify trusted agents and preserve customer/brand relationship with minimal checkout change | Recognize registered agents and accept secure tokenized agent payments through existing checkout paths      |
| Consumer control model | Spending limits, merchant categories, approvals, tokenized Visa credentials                   | Consent, order intent, payment passkeys, agentic tokens, user-defined limits                                |
| 2026 expansion         | OpenAI partnership and multi-network Intelligent Commerce Connect                             | Machine-to-machine and micro-payment style automation through Agent Pay for Machines                        |
| Strategic posture      | Become the trusted acceptance and security layer for AI-led commerce                          | Make agent-led payments visible, authenticated and scalable across consumer, business and machine use cases |

This is not a winner-takes-all contest. Visa and Mastercard both know the market will not be defined by one protocol, one chatbot or one payment method. The real value will sit in interoperability: agent identity, payment tokenization, user consent, merchant visibility, order context, dispute evidence and settlement reliability.

## What else is happening in the market

Agentic commerce is moving on multiple fronts at once.

**OpenAI and Stripe built the Agentic Commerce Protocol.** OpenAI's Instant Checkout in ChatGPT is powered by ACP, co-developed with Stripe. The merchant remains merchant of record. The order, payment and fulfillment still run through merchant systems. The protocol is designed so merchants can participate without changing their whole back end.

**Google launched Agent Payments Protocol (AP2).** AP2 uses signed "Mandates" as tamper-proof digital contracts that prove the user's instructions. It supports real-time purchases where the user is present and delegated purchases where the user pre-authorizes rules in advance. Google says AP2 is payment-method agnostic, supporting cards, stablecoins and real-time bank transfers.

**PayPal is building merchant rails for AI discovery and checkout.** PayPal announced Agent Ready and Store Sync in October 2025. The idea is to let merchants make catalogs discoverable on AI platforms while retaining merchant-of-record status, buyer protection, dispute resolution and existing PayPal checkout infrastructure.

**Shopify is preparing the merchant catalog layer.** Shopify's guidance is blunt: AI agents need structured product data. Titles, materials, dimensions, prices, inventory, shipping and return policies need to be machine-readable. In an agentic world, a vague product page is not just bad SEO. It is lost distribution.

**Amazon is testing agentic buying from other brand sites.** Amazon's Buy for Me feature lets selected U.S. app users buy products from other brand websites when Amazon does not sell the item. Amazon's agentic AI can complete the purchase on the brand's website using encrypted customer details, while delivery, returns and service remain with the brand.

**American Express is leaning into its closed-loop advantage.** Amex's ACE developer kit focuses on registered agents, account enablement, intent intelligence, tokenized payment credentials and cart context. It is also positioning purchase protection for registered agent purchases where the transaction deviates from authenticated purchase intent.

The pattern is clear. Everyone is building the same primitives:

- Agent identity
- User consent
- Scoped payment credentials
- Machine-readable product and order data
- Merchant-of-record preservation
- Dispute and audit evidence
- Interoperability across agents, merchants, PSPs and networks

That is the stack. The chatbot is only the front door.

## Direct use cases

The first visible use cases will be consumer shopping, but the bigger operating changes will likely show up in business workflows.

**1. Shopping with constraints.** "Buy the best school shoes under $70, black only, delivery before Monday, free returns." The agent compares across merchants, checks policies, selects, and asks for approval.

**2. Replenishment.** Household staples, pet food, office supplies, pharmacy items, packaging stock. The consumer or business sets rules, and the agent reorders within limits.

**3. Travel and hospitality.** Flights, hotels, restaurant bookings, loyalty benefits, card perks and dynamic package selection. This is where payment, identity, loyalty and post-purchase support converge.

**4. B2B procurement.** Approved vendor lists, budget limits, compatibility rules, PO creation, invoice matching, delivery windows and approval chains. This may be more valuable than consumer shopping because the workflow is already rule-heavy and painful.

**5. Subscription optimization.** Agents can monitor recurring payments, cancel unused services, switch plans, negotiate renewals, or move spend to a preferred card.

**6. Accounts payable and receivable.** Agents can assemble invoices, check approvals, route payments, chase collections and reconcile exceptions. The payment itself is only one step in a larger financial workflow.

**7. Machine-to-machine commerce.** APIs, compute, data access, IoT services, micro-insurance, charging networks, logistics events. This is where Mastercard's Agent Pay for Machines becomes strategically interesting: the buyer may be a system with delegated budget, not a person with a cart.

## How this transforms the financial ecosystem

Agentic commerce changes payments at several layers.

**Discovery moves from search to intent.** Today, merchants optimize for human search, paid ads, marketplaces and social feeds. Tomorrow, they also need to be legible to agents. Structured data, accurate inventory, clear return policies and trustworthy reviews become payment-adjacent infrastructure.

**Checkout becomes authorization.** The checkout page is no longer the centre of the experience. The key product surface becomes: what is the agent allowed to do, under what conditions, with which credential, for which merchants, and with what approval path?

**Tokenization becomes the default control layer.** Raw credentials cannot safely sit inside agent environments. The future is scoped tokens: merchant-bound, amount-bound, time-bound, category-bound, or agent-bound.

**Issuers get a new role.** Banks and card issuers can build agent permission dashboards: approved agents, spending limits, category controls, real-time alerts, revocation, and dispute evidence. The issuer app could become the control room for delegated commerce.

**Acquirers and PSPs need new metadata.** "Card not present" is too thin for agentic commerce. PSPs will need fields for agent identity, user intent, cart context, source platform, approval status, token scope and dispute evidence.

**Fraud models need a new class of signal.** Bot traffic used to be mostly bad. In agentic commerce, some bots are legitimate customers. Fraud teams will need to distinguish malicious automation from trusted agents with valid purchase intent.

**Disputes become intent disputes.** Did the agent buy the wrong item? Did it exceed a limit? Did the merchant alter the cart? Did the user approve the final cart? The answer needs signed, structured evidence, not screenshots and emails.

**Regulators will ask different questions.** Who is liable when an agent makes an incorrect purchase? How is consent captured? Can the user revoke authority? Is the agent explainable enough for financial services? Are vulnerable consumers protected from automated overspend?

The short version: payments moves from "authenticate the payer" to "authenticate the payer, the agent, the intent, the credential, and the merchant context."

## The uncomfortable risks

Agentic commerce will not scale just because the demos are impressive.

**Platform power could increase.** If customers buy inside a few dominant AI interfaces, merchants may lose direct discovery, pricing power and customer data. The merchant-of-record language in ACP, PayPal, Visa and Shopify matters because this is the commercial anxiety underneath the technology.

**Subjective intent is hard.** "Buy the cheapest black backpack under $80" is verifiable. "Buy something stylish for my wife" is not. Disputes will be easier where intent is measurable.

**Prompt injection becomes payments risk.** A malicious product page, review, email or website could try to manipulate an agent. Agentic payment systems will need security models that assume the agent reads hostile content.

**Consent fatigue is real.** If users approve every tiny action, agents lose value. If they approve too broadly, they lose control. The product challenge is to make delegation specific enough to be safe and broad enough to be useful.

**Emerging markets may lag if standards are too heavy.** Merchants in Pakistan, Nigeria, Egypt, Kenya or Bangladesh cannot be asked to rebuild everything at once. The winning models will work with existing checkout, wallets, local rails and messy catalog data.

## What banks, PSPs and merchants should do now

You do not need to predict the winning protocol to prepare.

**Banks and issuers should build the permission layer.** Approved agents, spending controls, category limits, merchant allowlists, alerts, revocation and dispute trails. This is the banking product surface of agentic commerce.

**PSPs should prepare their transaction schema.** Add support for agent identity, intent, token scope, cart context, source platform and approval status. These fields will become risk and reconciliation inputs.

**Merchants should fix product data.** AI agents need structured catalogs, clean variants, available inventory, clear shipping policies, clear return terms and factual product attributes. The beautiful landing page is not enough.

**Acquirers should make agent acceptance low-lift.** Merchants will not adopt agentic commerce if the first requirement is a six-month integration. CDN-level verification, existing checkout compatibility and no-code onboarding will matter.

**Risk teams should define agentic fraud typologies early.** Malicious agent, compromised permission, fake merchant, manipulated product data, prompt injection, unauthorized scope expansion, cart substitution. Name the risks before they arrive in production.

## Operator notes

- Agentic commerce is not a new checkout button. It is a new actor in the transaction.
- Visa is building the trusted acceptance and network layer for AI-led payments.
- Mastercard is building the agent identity, token and consent layer for visible agent-led transactions.
- OpenAI/Stripe, Google, PayPal, Shopify, Amazon and Amex are all solving adjacent parts of the same stack.
- The winning merchants will be machine-readable, trustworthy and easy for agents to buy from.
- The winning banks will make delegated commerce controllable, revocable and auditable.
- The winning PSPs will treat agent metadata as core payment infrastructure, not optional enrichment.

## The bottom line

Agentic commerce is not about a bot buying a sweater.

It is about software becoming an economic actor under human-defined authority. Once that happens, every payments question gets sharper: who authorized this, what exactly was authorized, how was the credential scoped, what did the merchant receive, and who is responsible if the agent gets it wrong?

Visa and Mastercard are moving early because they understand the real prize. The next commerce layer will not be won only by the company with the smartest assistant. It will be won by the companies that make agents trusted enough to transact.

## FAQ

**Is agentic commerce live today?** Yes, but in early controlled forms. ChatGPT Instant Checkout, Amazon Buy for Me, PayPal Store Sync, Visa Intelligent Commerce, Mastercard Agent Pay, Google AP2 and Amex ACE all show that the market has moved from theory to infrastructure.

**Will AI agents fully replace checkout pages?** Not soon. Many purchases will still end on merchant storefronts. What changes first is discovery, cart creation, payment initiation and approval.

**Will Visa and Mastercard control agentic commerce?** They will influence the trust layer, especially tokenization, authentication, authorization, issuer controls and merchant acceptance. But the space is multi-protocol and multi-platform by design.

**What is the biggest merchant priority?** Product data. If an AI agent cannot understand your catalog, policies, inventory and pricing, you are invisible in the agentic channel.

**What is the biggest bank priority?** Permissioning. Banks need to let customers safely approve, limit, monitor and revoke agent authority.

**Is B2B bigger than consumer agentic commerce?** It may be. Consumer shopping gets the headlines, but B2B procurement has clearer rules, higher ticket sizes, approval chains and more operational pain.

## References

- [Visa, "Find and Buy with AI: Visa Unveils New Era of Commerce," April 30, 2025](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21361.html)
- [Visa, "Trusted Agent Protocol," October 14, 2025](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21716.html)
- [Visa, "Intelligent Commerce Connect"](https://corporate.visa.com/en/products/intelligent-commerce-connect.html)
- [Visa, "Visa Partners with OpenAI to Power the Next Generation of AI Commerce," June 10, 2026](https://investor.visa.com/news/news-details/2026/Visa-Partners-with-OpenAI-to-Power-the-Next-Generation-of-AI-Commerce/default.aspx)
- [Mastercard, "Mastercard unveils Agent Pay," April 2025](https://www.mastercard.com/us/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html)
- [Mastercard, "Agentic token framework: Driving trusted AI transactions," 2025](https://www.mastercard.com/us/en/news-and-trends/stories/2025/agentic-commerce-framework.html)
- [Mastercard, "Agent Pay for Machines," June 2026](https://www.mastercard.com/us/en/news-and-trends/press/2026/june/mastercard-launches-agent-pay-for-machines.html)
- [OpenAI, "Buy it in ChatGPT: Instant Checkout and the Agentic Commerce Protocol," 2025](https://openai.com/index/buy-it-in-chatgpt/)
- [Google Cloud, "Powering AI commerce with the new Agent Payments Protocol (AP2)," September 16, 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- [PayPal, "PayPal Launches Agentic Commerce Services," October 28, 2025](https://investor.pypl.com/news-and-events/news-details/2025/PayPal-Launches-Agentic-Commerce-Services-to-Power-AI-Driven-Shopping/default.aspx)
- [Shopify, "Agentic Commerce: Benefits & How To Get Started," April 2, 2026](https://www.shopify.com/blog/agentic-commerce)
- [Amazon, "Buy for Me," 2025](https://www.aboutamazon.com/news/retail/amazon-shopping-app-buy-for-me-brands)
- [American Express, "Agentic Commerce Experiences (ACE)"](https://www.americanexpress.com/en-us/company/agentic-commerce/)
