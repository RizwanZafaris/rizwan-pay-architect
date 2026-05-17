# Rizwan Zafar — Website Content Index

Operator-grade content library for a payments product executive. Every entry is scoped through Rizwan's lens: Simpaisa CPO, $1B+ GTV, 25M+ monthly transactions, MENA + South Asia, Tapmad (50%→1% payment cost, 5M subs), Daraz payments ops.

This index is the **single source of truth** for the editorial system. Articles are generated in batches against this list.

---

## Folder plan

```
/content
  /blog/[slug].md                  → essays, ~900–1,800 words, 2,000+ for flagships
  /case-studies/[slug].md          → product-work deep dives (already exist on site)
  /categories/[category].md        → category landing copy + pillar map
  INDEX.md                         → this file
  CLUSTER_MAP.md                   → SEO pillar + supporting page map
  CALENDAR_90D.md                  → 90-day publishing calendar
  HOMEPAGE_FEATURE_PLAN.md         → which essays anchor the homepage
```

Slugs are lowercase-kebab. Frontmatter is YAML. Body is markdown with `## Sections` and a `## FAQ` block. JSON-LD schema is emitted by `src/routes/blog.$slug.tsx` from frontmatter.

---

## Priority scoring

| Score | Meaning                                                         |
| ----- | --------------------------------------------------------------- |
| 5     | Flagship essay. Recruiter-grade. Must publish in first 30 days. |
| 4     | High-intent SEO + credibility. Publish in first 60 days.        |
| 3     | Useful, supports a cluster. Publish in 60–90 days.              |
| 2     | Defensible but generic. Publish only after clusters are filled. |
| 1     | Skip or rewrite as a section inside another post.               |

---

## Batch 1 — Payments, SWIFT, Fintech, Banking, Settlement, Onboarding, Risk

### Flagship essays (priority 5)

| #   | Slug                                           | Title                                                                              | Category                      | Intent                | Audience                             | Why Rizwan publishes                                                                |
| --- | ---------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------- | --------------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| F1  | `reconciliation-is-product-infrastructure`     | Reconciliation Is Not Back Office. It Is Product Infrastructure.                   | Settlement & Reconciliation   | Thought leadership    | Payments PMs, fintech CFOs           | Defines a category most teams underweight; ties to `reconciliation-ledger-controls` |
| F2  | `hosted-checkout-vs-direct-card-processing`    | Hosted Checkout Is Easy. Direct Card Processing Is Where Product Maturity Shows.   | Payment Infrastructure        | Educational + opinion | Fintech PMs, Stripe/Adyen recruiters | Demonstrates depth on MPGS/MDES, tokenization, 3DS, PCI scope                       |
| F3  | `payment-infrastructure-state-trust-failure`   | Payment Infrastructure Is Not Just APIs. It Is State, Trust, and Failure Handling. | Payment Infrastructure        | Thought leadership    | Senior PMs, platform leaders         | Reframes infra as a product problem at $1B+ scale                                   |
| F4  | `merchant-onboarding-growth-risk-compliance`   | Merchant Onboarding Is Where Growth, Risk, and Compliance Collide.                 | Merchant Onboarding           | Thought leadership    | Fintech PMs, risk leaders            | Links to `merchant-onboarding-kyc` case study                                       |
| F5  | `regulatory-ux-name-on-payment-screen`         | Regulatory UX: Why the Name on a Payment Screen Can Block a Launch.                | Fraud, Risk & Compliance      | Operator essay        | Regulated-product PMs                | Distinctive angle; unteachable from textbooks                                       |
| F6  | `cross-border-corridors-are-operating-systems` | Cross-Border Corridors Are Operating Systems, Not Routes.                          | SWIFT & Cross-Border Payments | Thought leadership    | Wise / Thunes / corridor PMs         | Anchors cross-border cluster; links to `cross-border-corridors-fx`                  |
| F7  | `financial-controls-are-product-requirements`  | Financial Controls Are Product Requirements.                                       | Settlement & Reconciliation   | Operator essay        | Fintech CFOs, platform PMs           | Connects product to audit, SOX-like discipline                                      |
| F8  | `local-payment-methods-developer-experience`   | Why Local Payment Methods Are Developer Experience Problems.                       | Payment Infrastructure        | Educational           | Devs, DevRel, fintech PMs            | Already exists as short post; **expand to flagship**                                |
| F9  | `payment-cost-50-to-1`                         | Payment Cost Is a Product Variable: From 50% to 1%.                                | Product Strategy              | Case-study essay      | OTT/subscription PMs                 | Already exists; **expand to flagship with rail-mix math**                           |
| F10 | `emerging-markets-pressure-test-payments`      | How Emerging Markets Pressure-Test Payment Product Strategy.                       | Emerging Markets              | Thought leadership    | Visa/Mastercard EM teams             | Distinctive geography credential                                                    |

### SWIFT & Cross-Border cluster (priority 4–5)

| #   | Slug                                                    | Title                                                                              | Priority | Notes                         |
| --- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------- | ----------------------------- |
| S1  | `swift-payment-explained`                               | How SWIFT Payment Works: A Complete Overview                                       | 4        | Pillar page for SWIFT cluster |
| S2  | `swift-vs-wire-transfer`                                | SWIFT Payment vs Wire Transfer: Key Differences                                    | 4        | High-volume SEO query         |
| S3  | `iso-20022-migration-what-product-teams-must-know`      | ISO 20022 Migration: What Payment Product Teams Must Know                          | 5        | 2025/26 deadline relevance    |
| S4  | `swift-gpi-tracking-and-the-end-of-payment-uncertainty` | SWIFT gpi, Tracking, and the End of Payment Uncertainty                            | 4        | Operator-grade angle          |
| S5  | `swift-aml-cft-sanctions-screening`                     | SWIFT, AML/CFT, and Sanctions Screening in Practice                                | 4        | Compliance-led                |
| S6  | `swift-vs-card-rails-vs-local-wallets`                  | SWIFT vs Card Rails vs Local Wallets: When to Use What                             | 5        | Distinctive comparison piece  |
| S7  | `correspondent-banking-and-emerging-market-corridors`   | Correspondent Banking and the Reality of Emerging-Market Corridors                 | 4        | Ties to Rizwan's geography    |
| S8  | `swift-fees-fx-and-the-true-cost-of-cross-border`       | SWIFT Fees, FX, and the True Cost of a Cross-Border Payment                        | 4        | High SEO intent               |
| S9  | `swift-payment-delays-what-actually-causes-them`        | SWIFT Payment Delays: What Actually Causes Them                                    | 3        | Operational realism           |
| S10 | `swift-in-2026-trends-to-watch`                         | SWIFT in 2026: ISO 20022, Instant Rails, and the Pressure on Correspondent Banking | 4        | Annual trend piece            |
| S11 | `tracking-a-swift-payment-step-by-step`                 | How to Track a SWIFT Payment Step by Step                                          | 3        | Practical SEO                 |
| S12 | `swift-and-cryptocurrency-the-honest-take`              | SWIFT and Cryptocurrency: The Honest Take                                          | 3        | Counter-hype angle            |
| S13 | `swift-messaging-formats-mt-vs-mx`                      | SWIFT Messaging Formats: MT vs MX (and Why It Matters Now)                         | 4        | ISO 20022 companion           |
| S14 | `swift-for-emerging-markets-banking`                    | The Role of SWIFT in Emerging-Markets Banking                                      | 4        | Geography credential          |
| S15 | `swift-compliance-checklist-for-banks-and-fintechs`     | A SWIFT Compliance Checklist for Banks and Fintechs                                | 4        | Lead-magnet style             |

Remaining SWIFT topics from the brief (1, 3, 4, 7, 8, 14, 17, 20, 21, 24, 26, 30, 36, 39, 40, 44, 45, 46, 48, 50) are consolidated into the above to avoid thin duplication. Each consolidated topic is folded as a section of its pillar.

### Fintech cluster (priority 3–4)

| #   | Slug                                                   | Title                                                                  | Priority |
| --- | ------------------------------------------------------ | ---------------------------------------------------------------------- | -------- |
| FT1 | `fintech-regulation-2026-what-product-teams-must-know` | Fintech Regulation 2026: What Product Teams Must Know                  | 4        |
| FT2 | `fintech-financial-inclusion-emerging-markets`         | Fintech and Financial Inclusion in Emerging Markets: Beyond the Slogan | 4        |
| FT3 | `cybersecurity-in-fintech-product-perspective`         | Cybersecurity in Fintech: A Product Perspective                        | 3        |
| FT4 | `how-fintech-actually-disrupts-banking`                | How Fintech Actually Disrupts Banking (and Where It Doesn't)           | 4        |
| FT5 | `ai-and-ml-in-payments-where-it-works-where-it-doesnt` | AI and ML in Payments: Where It Works, Where It Doesn't                | 4        |
| FT6 | `fintech-partnerships-with-banks-the-product-playbook` | Fintech–Bank Partnerships: The Product Playbook                        | 3        |
| FT7 | `launching-a-fintech-in-a-regulated-market`            | Launching a Fintech in a Regulated Market: A Field Guide               | 4        |
| FT8 | `big-data-in-payments-product-decisions`               | Big Data in Payments: Product Decisions, Not Dashboards                | 3        |

### Banking cluster (priority 3)

| #   | Slug                                                  | Title                                                              | Priority |
| --- | ----------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| B1  | `digital-transformation-in-banking-product-view`      | Digital Transformation in Banking, From a Product View             | 3        |
| B2  | `open-banking-product-opportunities-emerging-markets` | Open Banking Product Opportunities in Emerging Markets             | 4        |
| B3  | `mobile-banking-changing-customer-behavior`           | How Mobile Banking Reshaped Customer Behavior in MENA + South Asia | 3        |
| B4  | `cross-border-banking-challenges`                     | The Real Challenges of Cross-Border Banking                        | 3        |
| B5  | `banks-and-financial-inclusion`                       | Banks, Wallets, and the Last Mile of Financial Inclusion           | 3        |

### Settlement & Reconciliation cluster (priority 4–5)

| #   | Slug                                    | Title                                                        | Priority |
| --- | --------------------------------------- | ------------------------------------------------------------ | -------- |
| SR1 | `three-way-reconciliation-at-scale`     | Three-Way Reconciliation at Scale: Architecture and Pitfalls | 5        |
| SR2 | `settlement-windows-and-merchant-trust` | Settlement Windows and the Math of Merchant Trust            | 4        |
| SR3 | `exception-management-reconciliation`   | Exception Management Is the Real Product in Reconciliation   | 4        |
| SR4 | `ledger-design-for-multi-rail-payments` | Ledger Design for Multi-Rail Payment Platforms               | 4        |

### Merchant Onboarding cluster (priority 4)

| #   | Slug                                             | Title                                                      | Priority            |
| --- | ------------------------------------------------ | ---------------------------------------------------------- | ------------------- |
| MO1 | `kyb-automation-without-blowing-up-risk`         | KYB Automation Without Blowing Up Risk                     | 4                   |
| MO2 | `risk-tiering-merchants-product-decision`        | Risk Tiering Merchants Is a Product Decision, Not a Policy | 4                   |
| MO3 | `onboarding-conversion-vs-default-rate-tradeoff` | The Onboarding Conversion vs Default Rate Tradeoff         | 4                   |
| MO4 | `kyc-conversion-designed-together`               | KYC, Risk, and Conversion Should Be Designed Together      | 4 (expand existing) |

### Fraud, Risk & Compliance cluster (priority 4)

| #   | Slug                                             | Title                                                   | Priority |
| --- | ------------------------------------------------ | ------------------------------------------------------- | -------- |
| FR1 | `layered-fraud-controls-payments-stack`          | Layered Fraud Controls Built Into the Payments Stack    | 4        |
| FR2 | `chargebacks-product-problem`                    | Chargebacks Are a Product Problem, Not a Dispute Queue  | 4        |
| FR3 | `pci-dss-iso-27001-program-leadership`           | Standing Up PCI DSS and ISO 27001 Programs From Scratch | 4        |
| FR4 | `aml-cft-rules-vs-models`                        | AML/CFT: When to Use Rules, When to Use Models          | 4        |
| FR5 | `sanctions-screening-without-killing-throughput` | Sanctions Screening Without Killing Throughput          | 3        |

---

## Batch 2 — Product Management (fintech-flavored)

Each PM topic is rewritten for regulated payments products. Default priority 3 unless noted.

| #    | Slug                                          | Title                                                                          | Priority |
| ---- | --------------------------------------------- | ------------------------------------------------------------------------------ | -------- |
| PM1  | `user-research-in-payments-product`           | User Research in Payments: Six Audiences, One Product                          | 4        |
| PM2  | `product-management-in-fintech-startups`      | Product Management in Fintech Startups: Speed Without Wreckage                 | 4        |
| PM3  | `mvp-in-regulated-payments`                   | How to Build an MVP When the M Includes "Money" and the V Includes "Regulator" | 4        |
| PM4  | `innovation-vs-stability-in-payments`         | Balancing Innovation and Stability in Payments                                 | 3        |
| PM5  | `agile-vs-waterfall-payment-product`          | Agile vs Waterfall in Payment Product Teams                                    | 3        |
| PM6  | `data-analytics-payment-product-decisions`    | Using Data Analytics to Drive Payment Product Decisions                        | 3        |
| PM7  | `cross-functional-collaboration-payments`     | Cross-Functional Collaboration in Payments (PM × Eng × Risk × Ops × Finance)   | 4        |
| PM8  | `future-of-product-management-payments`       | The Future of Product Management in Payments                                   | 3        |
| PM9  | `product-vision-strategy-regulated-platforms` | Product Vision and Strategy for Regulated Platforms                            | 4        |
| PM10 | `product-failures-payment-systems`            | Handling Product Failures in Payment Systems                                   | 3        |
| PM11 | `ai-in-product-management-payments`           | The Impact of AI on Product Management in Payments                             | 3        |
| PM12 | `payment-product-launches-best-practices`     | Best Practices for Payment Product Launches                                    | 4        |

---

## Batch 3 — Project Management, PMO, Leadership, Design Thinking

All reframed as execution discipline for regulated payment product environments.

### Project Management

| #   | Slug                                       | Title                                                         | Priority |
| --- | ------------------------------------------ | ------------------------------------------------------------- | -------- |
| PJ1 | `product-vs-project-management-in-fintech` | Product vs Project Management in Fintech                      | 3        |
| PJ2 | `risk-management-payment-launches`         | Risk Management in Payment Product Launches                   | 4        |
| PJ3 | `multi-market-payment-rollouts`            | Running Multi-Market Payment Rollouts Without Losing the Plot | 4        |
| PJ4 | `regulated-delivery-discipline`            | Regulated Delivery: Discipline for High-Stakes Releases       | 4        |
| PJ5 | `post-mortems-payment-incidents`           | Post-Mortems for Payment Incidents                            | 4        |
| PJ6 | `remote-project-management-fintech`        | Remote Project Management for Distributed Fintech Teams       | 3        |
| PJ7 | `stakeholder-management-payment-partners`  | Stakeholder Management Across Banks, PSPs, and Regulators     | 4        |
| PJ8 | `gantt-charts-when-they-still-help`        | Gantt Charts: Where They Still Help in Payment Programs       | 2        |

### PMO

| #    | Slug                                     | Title                                                        | Priority |
| ---- | ---------------------------------------- | ------------------------------------------------------------ | -------- |
| PMO1 | `pmo-execution-discipline-payment-scale` | The PMO as Execution Discipline Behind Payment Product Scale | 4        |
| PMO2 | `pmo-governance-regulated-fintech`       | PMO Governance in Regulated Fintech                          | 3        |
| PMO3 | `pmo-measuring-success`                  | Measuring PMO Success in a Product-Led Org                   | 3        |
| PMO4 | `pmo-and-agile-fintech`                  | Implementing Agile Practices in a Fintech PMO                | 3        |
| PMO5 | `pmo-change-management-payments`         | The PMO's Role in Change Management for Payment Platforms    | 3        |
| PMO6 | `pmo-risk-management`                    | The PMO's Role in Risk Management for Payment Programs       | 3        |

### Leadership

| #   | Slug                                      | Title                                                                   | Priority |
| --- | ----------------------------------------- | ----------------------------------------------------------------------- | -------- |
| L1  | `leading-cross-functional-payments-teams` | Leading Cross-Functional Payments Teams (Eng × Risk × Ops × Compliance) | 4        |
| L2  | `crisis-leadership-payment-incidents`     | Crisis Leadership During Payment Incidents                              | 4        |
| L3  | `acting-cto-as-cpo`                       | Acting CTO While Being CPO: When and How                                | 3        |
| L4  | `leading-through-regulatory-tightening`   | Leading Product Through Regulatory Tightening                           | 4        |
| L5  | `partner-governance-banks-psps`           | Partner Governance with Banks and PSPs                                  | 4        |

### Design Thinking

| #   | Slug                                     | Title                                      | Priority |
| --- | ---------------------------------------- | ------------------------------------------ | -------- |
| DT1 | `design-thinking-payment-failure-states` | Design Thinking for Payment Failure States | 4        |
| DT2 | `design-thinking-compliance-ux`          | Design Thinking for Compliance UX          | 4        |
| DT3 | `design-thinking-merchant-dashboards`    | Design Thinking for Merchant Dashboards    | 3        |
| DT4 | `design-thinking-onboarding-fintech`     | Design Thinking for Fintech Onboarding     | 4        |
| DT5 | `empathy-in-payment-product-design`      | Empathy in Payment Product Design          | 3        |

---

## Batch 4 — Startups, SaaS, OTT

### Startups (fintech-scaling lens)

| #   | Slug                                        | Title                                                                 | Priority |
| --- | ------------------------------------------- | --------------------------------------------------------------------- | -------- |
| ST1 | `launching-fintech-startup-emerging-market` | Launching a Fintech Startup in an Emerging Market                     | 4        |
| ST2 | `scaling-regulated-fintech-startup`         | Scaling a Regulated Fintech: Governance, Compliance, Banking Partners | 4        |
| ST3 | `unit-economics-payment-startups`           | Unit Economics for Payment Startups                                   | 4        |
| ST4 | `licensing-fintech-startups`                | Licensing for Fintech Startups: A Practical Map                       | 4        |
| ST5 | `mvp-payments-startup`                      | The MVP for a Payments Startup                                        | 3        |
| ST6 | `frontier-market-product-market-fit`        | Product-Market Fit in Frontier Markets                                | 3        |

### SaaS

| #   | Slug                                      | Title                                             | Priority               |
| --- | ----------------------------------------- | ------------------------------------------------- | ---------------------- |
| SS1 | `saas-billing-payments-architecture`      | SaaS Billing and Payments Architecture            | 4                      |
| SS2 | `subscription-retention-payment-recovery` | Subscription Retention Is Mostly Payment Recovery | 5 (Tapmad credibility) |
| SS3 | `saas-pricing-and-payment-rails`          | SaaS Pricing and the Payment Rails You Choose     | 3                      |
| SS4 | `api-integration-saas-payments`           | API Integration in SaaS Payment Products          | 3                      |
| SS5 | `saas-churn-payment-failures`             | Why SaaS Churn Is Often a Payment Failure Problem | 4                      |
| SS6 | `data-analytics-saas-payments`            | Data Analytics for SaaS Payment Performance       | 3                      |

### OTT

| #   | Slug                                | Title                                                     | Priority   |
| --- | ----------------------------------- | --------------------------------------------------------- | ---------- |
| OT1 | `ott-monetization-emerging-markets` | OTT Monetization in Emerging Markets: DCB, Wallets, Cards | 5 (Tapmad) |
| OT2 | `dcb-vs-wallet-vs-card-ott`         | DCB vs Wallet vs Card for OTT Billing                     | 5 (Tapmad) |
| OT3 | `ott-payment-failure-recovery`      | OTT Payment Failure Recovery: Dunning That Actually Works | 4          |
| OT4 | `ott-subscriber-retention-payments` | OTT Subscriber Retention Through Payment UX               | 4          |
| OT5 | `ott-cost-of-payment-by-rail`       | The Cost of Payment by Rail in OTT                        | 4          |
| OT6 | `5g-and-ott-payment-experience`     | 5G and the OTT Payment Experience                         | 2          |

---

## Total active titles in this index

- Batch 1 (payments/SWIFT/banking/risk): **52 articles** (10 flagship + 42 supporting)
- Batch 2 (product management): **12 articles**
- Batch 3 (PM / PMO / leadership / design thinking): **24 articles**
- Batch 4 (startups / SaaS / OTT): **18 articles**

**Total: 106 publishable articles** (consolidated from the ~250 raw titles in the brief by merging duplicates and dropping low-credibility entries). This is the maximum a single executive operator should ship in 18 months without sacrificing quality.
