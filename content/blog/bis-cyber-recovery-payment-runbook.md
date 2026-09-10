---
title: "BIS Turns Cyber Recovery Into A Payment Runbook"
slug: "bis-cyber-recovery-payment-runbook"
category: "AI & Product Operations"
metaTitle: "BIS Turns Cyber Recovery Into A Payment Runbook"
metaDescription: "BIS and CPMI-IOSCO show why payment cyber resilience now needs faster patching, third-party dependency maps and recovery evidence."
excerpt: "BIS FSI's frontier-AI cyber paper and CPMI-IOSCO's FMI toolkit make cyber resilience a payment runbook problem: patch faster, map dependencies and prove recovery."
publishDate: "2026-09-10"
readingTime: "7 min read"
experiment: "Cyber resilience runbooks for payments"
tags:
  - BIS
  - cyber resilience
  - payment infrastructure
  - third-party risk
  - operational resilience
targetAudience:
  - payment infrastructure leaders
  - bank technology risk teams
  - FMI and processor operations owners
  - fintech product and programme leaders
targetKeywords:
  - BIS frontier AI cyber risk
  - payment cyber resilience runbook
  - FMI third party risk
  - cyber recovery payments
relatedArticles:
  - "/blog/frontier-ai-payment-recovery-gates"
  - "/blog/boe-payment-third-party-risk-programme-gates"
  - "/blog/reconciliation-is-product-infrastructure"
  - "/hire"
---

# BIS Turns Cyber Recovery Into A Payment Runbook

Cyber resilience in payments is becoming a speed problem.

On 9 September 2026, the BIS Financial Stability Institute published _When machines attack: frontier AI cyber threats and policy responses in the financial sector_. Its central operator message is blunt: frontier AI can compress the window between vulnerability discovery and exploitation. The paper says these models can autonomously identify critical vulnerabilities, develop exploits and conduct more complex multi-step cyber operations. It also says the same capabilities can help defenders discover vulnerabilities, detect threats and respond to incidents faster.

One day earlier, CPMI-IOSCO published two consultative items for financial market infrastructures: a cyber resilience toolkit and a discussion paper on FMI reliance on third-party service providers. The toolkit is voluntary and non-binding. The discussion paper is also consultative. Neither document creates a new payment product rule.

That boundary matters. The useful reading is not "new regulation landed."

The useful reading is this: payment operators need runbooks that execute at AI-compressed speed and survive third-party dependency failure.

## The Operator Summary

**Banks, PSPs, processors and FMIs should treat cyber recovery as a payment-state runbook. The gate is not whether a cyber policy exists. It is whether the team can patch fast enough, isolate a compromised dependency, preserve payment state, recover transaction evidence and explain every affected customer, merchant, partner and settlement record without rebuilding the truth by hand.**

If that evidence is missing, cyber resilience is still mostly theatre.

## What The Sources Confirm

The BIS FSI paper confirms three practical points for financial institutions.

First, frontier AI changes the cyber tempo. The paper says the risk is not only better phishing or faster code generation. It points to compressed remediation windows, a higher likelihood of breach and amplified third-party dependencies.

Second, the paper does not argue for a brand-new AI-specific cyber regime. It says authorities are reinforcing existing cyber risk and operational resilience frameworks while adapting supervisory expectations to the faster threat environment.

Third, the paper makes response and recovery more important, not less. If exploitation can move faster, the operating question becomes whether governance, patching, incident response and recovery can move faster without losing control of payment state.

The CPMI-IOSCO material adds the FMI angle. The cyber toolkit is meant to support FMIs in strengthening cyber resilience frameworks and implementing operational-resilience-related components of the Principles for Financial Market Infrastructures. The third-party discussion paper explores increased FMI reliance on service providers, especially for critical services, and how those dependencies may amplify risks.

The claim limit is equally important. These sources do not prove that a specific payment rail, bank, processor or vendor is unsafe. They do not mandate one architecture. They point to a control problem that payment teams should make concrete.

## The Payment-State Problem

Payment cyber incidents are difficult because money movement has state.

A retail website can be down and come back. A payment system has to know which instructions were received, which authorizations were issued, which clearing files were sent, which settlement entries posted, which reversals or chargebacks were opened, which messages reached customers and which partner confirmations are missing.

That state is scattered across channels, gateways, fraud tools, case systems, ledgers, bank files, networks, observability platforms and vendor dashboards. A cyber incident makes the scatter visible.

Frontier AI raises the pressure because it can shorten the time available for manual triage. If an exploit chain moves faster, a payments team cannot wait for a weekly risk committee, a vague vendor update or a manual spreadsheet to understand exposure. The state map has to exist before the incident.

The runbook should answer six questions fast:

- Which payment journeys are affected?
- Which dependencies are involved?
- Which states can still be trusted?
- Which work can continue in degraded mode?
- Which transactions need customer, merchant, bank or counterparty action?
- Which residual population remains unresolved?

If the team cannot answer those questions, faster incident response language will not help.

## Six Runbook Gates

The first gate is dependency inventory by payment state. Do not list vendors only by contract owner. Map them to payment steps: authentication, checkout, authorization, screening, fraud scoring, ledger posting, clearing, settlement, reconciliation, disputes, support and customer messaging.

The second gate is patch decision authority. BIS FSI's compressed-window point means patching cannot depend on unclear ownership. Critical payment dependencies need pre-agreed owners, severity thresholds, rollback plans and communication paths.

The third gate is isolation without evidence loss. A payment team must be able to remove a compromised connector, model, workflow tool, cloud service or operations platform while preserving queues, logs, case notes and transaction references. Isolation that loses evidence is not resilience.

The fourth gate is degraded operation. The team should prove how payments continue when an AI assistant, fraud tool, vendor dashboard, case system or observability layer is unavailable. A degraded mode should not be invented during the outage.

The fifth gate is third-party incident choreography. CPMI-IOSCO's third-party paper is useful because critical services often sit outside the operator. The runbook needs provider contacts, data required from the provider, substitute evidence, customer messaging ownership and a decision path if the provider cannot restore in time.

The sixth gate is reconciliation after recovery. The incident is not closed when systems turn green. It is closed when affected transactions are counted, classified and owned: completed, delayed, reversed, manually completed, partner action required, customer action required or unresolved.

## What Product Leaders Should Change

The product change is to make recovery observable.

For every critical payment journey, add a recovery section to the product requirements. It should name the state model, the critical dependencies, the fallback route, the customer-visible language, the owner of unresolved cases and the reconciliation evidence required after an incident.

This is not only a technology-risk task. Product owns the promise. Operations owns the work. Risk and compliance own the control expectations. Engineering owns the isolation and restoration path. Programme leadership owns the decision cadence.

The most valuable artefact is a short recovery file per journey:

- state diagram;
- dependency map;
- severity and patch thresholds;
- degraded-mode workflow;
- vendor evidence checklist;
- customer and partner communication templates;
- reconciliation closeout rules.

That file should be tested with real examples, not reviewed as a static policy attachment.

## Metrics Before Scale

The scorecard should measure tempo and evidence.

Start with coverage: percentage of critical payment journeys mapped to dependencies and owners. Then measure readiness: workflows with tested degraded modes, current vendor contacts, patch decision thresholds and rollback plans.

Add incident metrics: time to identify affected payment population, time to isolate the dependency, time to switch to degraded mode, time to recover trusted evidence and age of unresolved transactions after service restoration.

Add third-party metrics: critical dependencies per provider, concentration by journey, provider recovery-time evidence, last test date and known gaps.

Finally, measure customer truth. Can support tell a merchant or customer what happened without asking three teams to reconstruct the transaction? Can finance reconcile the final position? Can risk explain which records were affected and which were clean?

That is where cyber resilience becomes product quality.

## The Operator Decision

If I were approving a payment platform, processor dependency or AI-assisted operations workflow after reading the BIS and CPMI-IOSCO material, I would not ask for a bigger cyber policy.

I would ask for the runbook.

Show the state map. Show the dependency map. Show who can patch. Show the isolation switch. Show degraded mode. Show the vendor incident script. Show the transaction population after recovery. Show the unresolved cases and owners.

The question is simple:

**Can the payment business recover faster than the incident creates ambiguity?**

If the answer is yes, resilience is becoming operational.

If the answer is no, the organisation may have controls on paper and uncertainty in production.

For adjacent operating models, read [frontier AI payment recovery gates](/blog/frontier-ai-payment-recovery-gates/), [third-party risk programme gates](/blog/boe-payment-third-party-risk-programme-gates/), and [reconciliation as product infrastructure](/blog/reconciliation-is-product-infrastructure/). For help turning payment resilience into launch-ready evidence, start at [/hire/](/hire/).

## FAQ

**Did BIS or CPMI-IOSCO create a new payment rule on 8-9 September 2026?**

No. The BIS FSI paper is policy analysis. The CPMI-IOSCO toolkit and third-party discussion paper are consultative, and the toolkit is described as voluntary and non-binding.

**What is the practical payment takeaway?**

Payment teams should treat cyber recovery as a runbook tied to transaction state, third-party dependencies, degraded operations and reconciliation evidence.

**Where should a payment operator start?**

Pick one critical journey, such as card authorization, instant payout, account funding or settlement-file processing. Map its dependencies, disable one non-core dependency in a controlled exercise, and prove which transactions were affected and how they were closed.

## Sources

- [BIS FSI: When machines attack: frontier AI cyber threats and policy responses in the financial sector](https://www.bis.org/publications/fsi-paper-28-when-machines-attack-frontier-ai-cyber-threats-and-policy-responses-financial-sector)
- [BIS CPMI-IOSCO: Cyber resilience toolkit: practical considerations for FMIs](https://www.bis.org/publications/cpmi-iosco-cyber-resilience-toolkit-practical-considerations-fmis)
- [BIS CPMI-IOSCO: FMIs' reliance on third-party service providers: challenges and risks](https://www.bis.org/publications/cpmi-iosco-fmis-reliance-third-party-service-providers-challenges-and-risks)
- [BIS CPMI-IOSCO media release on the FMI cyber toolkit and third-party service provider discussion paper](https://www.bis.org/media-releases/20260908-global-standard-setting-bodies-publish-toolkit-cyber-resilience-fmis-and-discussion-paper-fmis)
