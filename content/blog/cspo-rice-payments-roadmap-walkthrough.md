---
title: "CSPO + RICE in Practice: A Real Payments Roadmap Walkthrough"
slug: "cspo-rice-payments-roadmap-walkthrough"
category: "Product Strategy"
metaTitle: "CSPO + RICE in Practice: A Payments Roadmap Walkthrough | Rizwan Zafar"
metaDescription: "How a CSPO-trained payments PM actually uses RICE on a live quarter. The eight roadmap items, real reach and confidence inputs, the risk-adjusted overlay payments demands, and the four moves the framework gets wrong on its own."
excerpt: "RICE is a clean ranking framework that does not know payments exists. CSPO is a clean product mindset that does not know prioritisation maths. Put together, with a risk-adjusted overlay, they become a working operating system for a payments backlog. Here is the walkthrough."
publishDate: "2026-05-20"
readingTime: "12 min read"
featured: true
tags:
  - product management
  - RICE prioritisation
  - CSPO
  - payments roadmap
  - product strategy
  - risk-adjusted backlog
  - fintech PM
  - product operating model
targetAudience:
  - Senior payments PMs
  - CPOs scaling product orgs
  - PMs preparing for senior interviews
  - Engineering leads moving into product
  - Hiring managers at Visa, Mastercard, Stripe, Adyen
targetKeywords:
  - CSPO in practice
  - RICE prioritisation example
  - payments product roadmap
  - risk-adjusted RICE
  - payments PM operating model
  - product prioritisation fintech
relatedArticles:
  - "/blog/product-management-for-payments-platforms"
  - "/blog/program-vs-product-management-fintech"
  - "/blog/where-ml-beats-ai-payment-problems-llm-cant-touch"
---

# CSPO + RICE in Practice: A Real Payments Roadmap Walkthrough

Every payments PM I have hired in the last five years walked in with two artifacts on their CV: a CSPO certification and a RICE template. Almost none of them could explain how the two tools talk to each other on a live quarter. CSPO trains a product mindset; RICE supplies a ranking formula; neither one tells you what to do when the highest-RICE item on the board would torch a scheme audit if it shipped on schedule.

This is the walkthrough that closes that gap. One quarter. Eight roadmap items. Real reach, impact, confidence, and effort inputs. A risk-adjusted overlay because payments demands one. The four places the framework is incomplete on its own, and what the senior PM does at each of those places that the framework cannot do for them.

## The CSPO mindset, briefly

The Certified Scrum Product Owner curriculum gives the PM five disciplines worth keeping:

1. **Vision before backlog.** Every story descends from a stated product vision. The vision is the appeal layer when prioritisation gets ugly.
2. **Ordered backlog, not a wishlist.** Stories are ranked top to bottom. Two items cannot share a slot.
3. **Value-driven sequencing.** What ships next is what produces the most customer or business value, not what is easiest or what the loudest stakeholder requested.
4. **Acceptance criteria are the contract.** "Done" is defined before work starts, in writing, by the PO.
5. **Inspect and adapt every sprint.** The backlog is rewritten when the world changes; the world changes every sprint in payments.

CSPO is silent on how you decide what is most valuable. That is where RICE comes in.

## RICE, briefly

RICE scores each backlog item against four inputs:

- **Reach**: how many users or transactions the change touches per quarter
- **Impact**: how much it moves the metric on the users it touches (typically scored 0.25 / 0.5 / 1 / 2 / 3)
- **Confidence**: how much of the impact estimate you actually believe (scored 50% / 80% / 100%)
- **Effort**: person-months to ship

`RICE score = (Reach × Impact × Confidence) / Effort`

Higher is better. Items are ranked by score. Then they ship in order.

That is the entire framework. In a SaaS product it works as written. In payments it does not, for reasons we will get to.

## The quarter

Imagine a regulated acquirer-processor in the Gulf, $2B annualised TPV, 1,200 active merchants, six rails (MPGS card acquiring, Mada local debit, Apple Pay, a regional wallet, an account-to-account rail, and SWIFT cross-border outbound). The PM owns the merchant-facing surface and the orchestration logic underneath.

The PM walks into Q1 planning with eight serious candidates on the board.

### The eight backlog items

| #   | Item                                            | One-line description                                           |
| --- | ----------------------------------------------- | -------------------------------------------------------------- |
| A   | Network tokenisation rollout (MDES + VTS)       | Replace PAN-on-file with scheme tokens for all 1,200 merchants |
| B   | Apple Pay enablement                            | Activate Apple Pay on the existing hosted checkout             |
| C   | EMV 3DS2 step-up optimisation                   | Tune the exemption logic + add TRA scoring                     |
| D   | A2A "Pay by Bank" rail                          | New rail integration with the local instant-payment scheme     |
| E   | Settlement T+1 → same-day for premium merchants | Faster funding for top-tier accounts                           |
| F   | Dispute portal v2                               | Self-serve evidence upload + status                            |
| G   | Merchant onboarding KYB automation              | Document extraction + sanctions check + UBO graph              |
| H   | Sub-merchant model for marketplaces             | One PSP licence covering many small sellers                    |

All eight are reasonable. Some quarter, every one of them ships. This quarter, the team has three senior engineering pods and one risk-and-compliance engineer. Capacity for the quarter is ~25 person-months of build, plus ~5 person-months of integration and certification.

### Scoring round 1: clean RICE

The PM walks the board and scores each item against the RICE inputs. Numbers in brackets are illustrative but realistic.

| #   | Item                           | Reach (txns / quarter) | Impact | Confidence | Effort (PM) | RICE      |
| --- | ------------------------------ | ---------------------- | ------ | ---------- | ----------- | --------- |
| A   | Network tokenisation           | 18M                    | 2.0    | 0.8        | 6           | **4,800** |
| B   | Apple Pay                      | 6M                     | 1.0    | 1.0        | 2           | 3,000     |
| C   | 3DS2 step-up optimisation      | 14M                    | 2.0    | 0.8        | 3           | **7,467** |
| D   | A2A rail                       | 1M                     | 3.0    | 0.5        | 8           | 188       |
| E   | Same-day settlement (top tier) | 4M                     | 1.0    | 0.8        | 4           | 800       |
| F   | Dispute portal v2              | 0.05M                  | 3.0    | 1.0        | 3           | 50        |
| G   | KYB automation                 | 0.002M (merchants/qtr) | 3.0    | 0.8        | 5           | 0.96      |
| H   | Sub-merchant model             | 0.001M                 | 3.0    | 0.5        | 6           | 0.25      |

A pure RICE read tells the PM to ship C (3DS2 optimisation), then A (tokenisation), then B (Apple Pay), then E (same-day settlement), and stop there because the engineering pods are full.

Apple Pay, tokenisation, and 3DS2 optimisation cover ~25 person-months. The plan is tidy. The PM is also about to ship a backlog that misses every strategic thing the company actually needs to do.

## Where RICE breaks in payments

Five things RICE does not see.

**Reach is not always users or transactions.** Item G (KYB automation) reaches 0.002M things, that is "two thousand merchants per quarter onboarded". But every one of those merchants is a multi-year revenue stream and a risk surface. Counting them at the same denominator as 18M transactions makes KYB look like a rounding error when it is in fact a frontier-of-the-business problem. Reach in payments is sometimes per-merchant, sometimes per-transaction, sometimes per-regulator-question.

**Impact is not single-dimensional.** 3DS2 optimisation improves auth rate. Tokenisation improves auth rate AND reduces dispute exposure AND lowers PCI scope. RICE collapses those into one impact number. The senior PM has to either run three RICE scores per item (one per outcome) or carry the multi-dimensional impact in a separate column.

**Confidence is the wrong shape.** RICE uses 50 / 80 / 100. In payments, the spread between "this depends on a scheme certification that has a six-week SLA" and "this depends on a scheme certification that has a six-month SLA with one approver in the region" is the entire difference between shipping and not shipping. Confidence in payments is partly probability, partly external dependency latency.

**Effort excludes compliance + certification + audit.** RICE's "effort" is build effort. The actual ship effort for tokenisation includes EMVCo certification, scheme attestation, PCI re-attestation, and a merchant rollout sequence. Build effort might be 6 person-months. Ship effort is 9. The PM who books only the 6 ships nothing for the last quarter.

**The framework does not see regulatory deadlines.** Nowhere in `(Reach × Impact × Confidence) / Effort` does the word "regulator" appear. In our quarter, the central bank has set a hard date for mandatory network tokenisation on all card-on-file merchants. That is not a backlog item with a RICE score. That is a constraint that overrides RICE.

## The risk-adjusted overlay

The senior PM keeps RICE, it is still the cleanest ranking machine for the items the framework can handle, and adds a second pass: a risk-adjusted overlay.

For each item the PM scores three risk dimensions on a 1–5 scale:

- **Regulatory deadline pressure**: 5 = mandated by date X, 1 = no external clock
- **Audit / compliance exposure**: 5 = item is the audit finding, 1 = no compliance touch
- **Reputational / contractual risk**: 5 = if we miss this we lose merchants or licence, 1 = no external visibility

Items scoring 4 or 5 on any axis are pulled above the RICE ranking. Items scoring 3 are reviewed in-line with RICE. Items scoring 1–2 stay where RICE put them.

In our quarter, the overlay looks like this.

| #   | Item                 | Reg pressure           | Audit exposure | Reputational | Override?                       |
| --- | -------------------- | ---------------------- | -------------- | ------------ | ------------------------------- |
| A   | Network tokenisation | 5 (CBUAE date)         | 4              | 3            | **Yes, promote to top**        |
| B   | Apple Pay            | 1                      | 1              | 2            | No                              |
| C   | 3DS2 step-up         | 3                      | 3              | 3            | In-line with RICE               |
| D   | A2A rail             | 2                      | 2              | 3            | No                              |
| E   | Same-day settlement  | 1                      | 2              | 4            | Watch (large merchant pressure) |
| F   | Dispute portal v2    | 2                      | 3              | 4            | Promote one notch               |
| G   | KYB automation       | 4 (sanctions findings) | 5              | 4            | **Yes, promote into top half** |
| H   | Sub-merchant model   | 3                      | 4              | 3            | Watch (depends on legal)        |

The roadmap after the overlay reorders.

| Order        | Item                     | Driver                                    |
| ------------ | ------------------------ | ----------------------------------------- |
| 1            | A, Network tokenisation | Regulatory deadline + RICE-high           |
| 2            | G, KYB automation       | Audit findings, non-negotiable           |
| 3            | C, 3DS2 optimisation    | High RICE, fits remaining capacity        |
| 4            | F, Dispute portal v2    | Reputational pressure + technically small |
| 5 (overflow) | B, Apple Pay            | If capacity opens, easy win               |
| Deferred     | D, E, H                  | Important; not this quarter               |

Now look at the difference. Pure RICE shipped C, A, B, E, three improvements and a cosmetic settlement bump. The risk-adjusted overlay ships A, G, C, F, the regulatory mandate, the audit finding, the auth-rate optimisation, and the merchant pain reducer. Same team, same capacity, a fundamentally different quarter.

## Where the senior PM still has to think

Even after the overlay, four decisions remain that the framework cannot make.

**Sequencing within the quarter.** Tokenisation cannot ship in Sprint 1 because scheme certification has a 4-week clock that starts only after technical readiness. Sprint 1 should ship the readiness milestone; Sprint 2 launches certification; Sprints 3–6 do the merchant rollout. KYB automation can start in Sprint 1 in parallel because it has no scheme dependency. The PM owns this sequencing call; RICE does not see it.

**The cut line.** Apple Pay sits in overflow. If tokenisation finishes a sprint early, the PM has to decide between accelerating dispute portal v2, starting Apple Pay, or pulling a Q2 item forward. Each option has different signalling effects (Apple Pay is a marketing moment; portal v2 is an ops moment; Q2 pull-forward is a velocity moment). RICE cannot make that call.

**The contract with engineering.** "Effort" is a PM estimate that engineering owns. The senior PM does not show up to planning with RICE scores frozen; they show up with a draft, and the effort numbers move once engineering reviews them. If KYB ends up costing 8 person-months instead of 5, the RICE score halves and the overlay still keeps it because the audit-finding driver is unchanged. The framework needs to bend to live data.

**The stakeholder math.** The largest merchant on the platform has been asking for same-day settlement for nine months. They represent 18% of TPV. The risk-adjusted overlay deprioritised it. The PM owes that merchant a conversation, what is shipping this quarter, why, when E gets attention, what the interim mitigation is. RICE produces the ranking. The PM produces the relationship.

## What a CSPO actually does in this quarter

Strip the framework back and look at where the CSPO disciplines show up in practice:

- **Vision.** The roadmap is in service of the product vision ("the most reliable acquirer-processor in the region by audit posture and uptime"). When the regulator deadline forces tokenisation to the top, vision is the appeal layer that makes the trade-off explainable to engineering and to the largest merchant.
- **Ordered backlog.** Items A, G, C, F are now in a single ordered queue. No item is "in parallel" with another at the same priority; sequencing decisions are explicit.
- **Value-driven.** Value here is multi-axis: regulatory exposure averted, audit findings closed, auth-rate basis points, dispute-cycle time. Value never collapses to a single number, but it does collapse to a single ordering.
- **Acceptance criteria.** Tokenisation does not ship when the code is written. It ships when ten reference merchants are migrated, the BIN-routing logic respects the token preference, and the dispute team can pull tokenised PANs from the gateway dashboard. Those acceptance criteria are written before sprint 1.
- **Inspect and adapt.** If the scheme certification slips, the PM does not stick to the plan; they re-rank. Sprint reviews are also re-prioritisation moments.

CSPO is the operating discipline. RICE is the maths. The risk-adjusted overlay is the payments-specific bit nobody puts on a certificate.

## The senior-PM tell

The interview question that separates senior payments PMs from juniors is not "do you use RICE?" It is some variant of: "RICE puts item X at the top. The regulator has a mandatory deadline on item Y. Engineering says item Z is the cheapest. How do you decide?"

The junior answer rationalises the RICE score. The mid-level answer talks about stakeholder management. The senior answer rebuilds the framework on the spot, adds the risk overlay, sequences the dependencies, names the trade-off in writing, and walks out with an ordered backlog the engineering lead can start on Monday.

That answer is not on a slide. It is the operating posture the rest of the org borrows when the quarter gets messy.

## FAQ

**Is RICE still useful in payments?**
Yes. It is still the cleanest ranking machine for items the framework can handle. Where it fails is the items the framework cannot see, regulatory deadlines, audit findings, compliance effort, multi-dimensional impact. The fix is to keep RICE and add the overlay, not to throw RICE out.

**What is the difference between RICE and ICE?**
ICE drops Reach. In payments, Reach is the input that most often misleads the score (per-merchant vs per-transaction confusion), so dropping it does not help; what helps is being explicit about which Reach denominator each item is measured in.

**Why not WSJF?**
Weighted Shortest Job First is a closer fit for payments because "cost of delay" maps cleanly to regulatory deadlines. Many senior payments PMs use a RICE / WSJF hybrid: WSJF for the deadline-bound items, RICE for the discretionary ones. The risk-adjusted overlay does roughly the same thing.

**How often should the backlog re-rank?**
At minimum at sprint review. In practice, whenever scheme certification dates change, regulators publish a new directive, or a large merchant escalates. In payments, "monthly re-rank" is too slow.

**Do you keep one backlog or split it?**
One ordered backlog per product surface. Splitting backlogs by "compliance vs commercial" is the most common mistake, it lets the team pretend the two streams are independent, which they are not. Compliance items consume the same engineering capacity as commercial ones.

**What about discovery work?**
Discovery items get their own RICE pass against discovery-specific impact (decision quality, risk reduction). They do not share a backlog with build items because the effort units are different. The senior PM owns both backlogs.

---

If this resonated, you might also want to read [Product Management for Payments Platforms: What's Different, and What's Not](/blog/product-management-for-payments-platforms), [Program Management vs Product Management in Fintech](/blog/program-vs-product-management-fintech), or [Where ML Beats AI: Six Payment Problems an LLM Cannot Touch](/blog/where-ml-beats-ai-payment-problems-llm-cant-touch).
