---
title: "99.5%: Automated Multi-Country Reconciliation and the Unglamorous Side of Payment Success"
category: ecommerce
tags: [reconciliation, settlement-accuracy, disputes, payment-operations, finance-ops]
anonymized_entity: "a major e-commerce marketplace (five South Asian markets)"
---

## Challenge

Payment success is usually told as an authorization story; ours broke after the approval. Across five markets, a major e-commerce marketplace was reconciling settlements substantially in spreadsheets — different processors per market, different file formats, cutoffs, currencies, and fee logic. Discrepancies surfaced late or not at all. Finance burned days on manual matching, disputed transactions lacked a single evidence record, and the honest answer to "is this settlement complete and correct?" was too often "probably."

## Context

The marketplace operated under a global parent group whose reconciliation expectations were set at global-marketplace scale, while local reality was a patchwork of partner-specific formats and manual process. Surge-era volumes from the COVID period had pushed manual reconciliation past its breaking point. The cost was not only labor: unexplained settlement gaps aged into write-offs, disputes dragged because evidence lived in five different systems, and every new payments initiative — new methods, new markets — quietly added reconciliation debt that nobody had priced.

## Approach

We built reconciliation as a product, with users and service objectives, rather than as a finance chore with a macro. The platform ingested processor settlement files and internal ledger events, normalized both into a canonical transaction model, and matched at transaction level across all five markets. Everything that failed to match landed in an exception queue with a taxonomy, an owner, and an aging clock. Disputes plugged into the same spine: one transaction, one unified evidence record, assembled automatically instead of hunted across systems by hand.

## Product Strategy

Three choices defined the product. First, accuracy as an explicit target the system and team were managed against — not an aspiration, a number with consequences. Second, automate the matching, humanize the exceptions: machines handle the overwhelming majority that reconciles cleanly, and human effort concentrates where judgment matters. Third, treat partner files as untrusted input — validated, contract-tested, and checksummed on arrival. That last stance sounds paranoid right up until the day it saves you.

## Execution

That day came in the first month, before the paranoia was in place. One processor changed its settlement file format without notice, and for several days the change silently corrupted matching — the system reported clean reconciliation against misparsed data, which is worse than no system at all. It nearly destroyed the platform's credibility with finance while we were still earning it. The recovery: reprocess the affected window transparently, then build what should have existed from the start — schema validation and contract tests on every inbound file, checksums, and alerting on statistical anomalies in match rates. Partner format drift became a detected event instead of a silent failure. Rollout then went market by market, hardest formats first, so the canonical model absorbed the worst cases early instead of meeting them at the end.

## Metrics

- Settlement accuracy: 99.5% via automated reconciliation across the five markets
- Dispute resolution time: shortened materially once unified evidence records replaced manual assembly — I will keep that figure qualitative
- Scale: multi-country reconciliation operating to a global-marketplace standard

## Results

Finance closed faster and trusted the number, which changed the texture of every downstream conversation — settlement stopped being a recurring investigation and became a report. Write-offs from unexplained discrepancies shrank as exceptions were caught inside partner dispute windows instead of after them. Disputes resolved faster on automatically assembled evidence. And new payment methods and markets onboarded onto the reconciliation spine as a checklist item rather than a fresh spreadsheet, which quietly removed a tax from the entire payments roadmap.

## Lessons Learned

Reconciliation is the least glamorous system in payments and the one that determines whether anything else is real — money you cannot account for is money you do not have. Automate the matching and spend your humans on exceptions; the ratio is what makes the economics work. Treat every partner file as untrusted input, because format drift without notice is a when, not an if — our worst incident was self-inflicted by trusting too early. And put an explicit accuracy target on settlement the way you would put a latency target on an API: what gets a target gets owned.

> Authorization rates win the meeting, but reconciliation decides whether the money was ever really yours — 99.5% settlement accuracy is a product decision, not an accounting outcome.
