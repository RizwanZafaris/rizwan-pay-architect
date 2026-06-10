---
title: "Recovering 120K+ Failed Payments a Month with Smart-Retry Orchestration"
category: payment-gateway
tags: [smart-retry, payment-orchestration, transaction-routing, decline-management, emerging-markets]
anonymized_entity: "a leading payment gateway in emerging markets"
---

## Challenge

At a leading payment gateway in emerging markets, failed transactions were our largest silent leak. Wallet rails dropped sessions at peak hours, bank rails timed out, and carrier billing declined customers whose balance refresh was simply pending. Every decline was treated as final. Merchants saw the gap between attempts and settlements and asked hard questions in quarterly reviews. My mandate was blunt: recover whatever was genuinely recoverable without double-charging a single customer.

## Context

The gateway processed 270M+ payments a year and over $1B in annual GTV across cards, mobile wallets, bank transfers, and carrier billing. Each rail failed differently. A wallet's "insufficient funds" sometimes meant a stale balance cache. A bank timeout often meant the transaction had succeeded but the confirmation died in transit. There was no unified decline taxonomy, so operations retried by hand, inconsistently, and occasionally double-charged customers, which is how the problem landed on my desk in the first place.

## Approach

We started with months of decline data and built a taxonomy before writing any retry logic: terminal declines that should never be retried, recoverable technical failures that should be retried quickly, and state-dependent failures like insufficient balance that should be retried on schedules tied to real behavior, such as salary cycles and wallet top-up patterns. On top of that taxonomy we built retry orchestration: per-class timing rules, alternate-rail routing when the customer had a second instrument on file, and strict idempotency keys so a retry could never become a duplicate charge.

## Product Strategy

I framed recovery as a product line, not an ops patch. The north-star metric was net recovered GTV. The guardrails were duplicate-charge incidents and customer complaints, owned by the same team that owned the upside, so nobody could chase recovery at the customer's expense. We launched in shadow mode first, logging what the engine would have recovered for several weeks. That gave finance and risk a concrete number to approve rather than a theory to debate, and rollout then proceeded merchant segment by merchant segment.

## Execution

The hard engineering was idempotency on rails that do not support it natively. We built a transaction-state reconciler that checked rail-side status before any retry fired, because the most dangerous failure is the one that already succeeded. The first version almost discredited the whole program: it retried insufficient-balance declines immediately, burned partner API quota, recovered almost nothing, and earned us a rate-limit warning from a wallet partner. We rebuilt that class around behavioral scheduling and the economics flipped. Partner management mattered as much as code; once we shared our retry schedules with the rails, our traffic looked predictable instead of abusive, and one partner even raised our limits.

## Metrics

- 120K+ failed transactions recovered every month
- $14M+ in GTV recovered monthly through the retry engine
- 97% overall payment success rate after full rollout
- 90% straight-through processing, with no human touch on the recovered flow
- Duplicate-charge guardrail held; no confirmed double charges reached customers after launch

## Results

Recovered GTV became a board-slide number and, unexpectedly, a sales asset: merchants could see recovery line items in their own dashboards, which made the value tangible rather than claimed. Merchants who had been piloting a competing gateway consolidated their volume with us, citing net success rate as the deciding factor. The decline taxonomy outlived the project itself and became the shared language between product, operations, and partner banks whenever a rail misbehaved.

## Lessons Learned

Shadow mode bought us political capital that no deck could have. Retrying without rail-side state verification is how you double-charge someone's grocery money, and in emerging markets that is a trust event, not a refund event. The biggest recovery gains came from the least glamorous work: classifying declines correctly before touching any retry timing. If I ran it again, I would involve the partner rails in the taxonomy from day one instead of month four, because their internal codes explained failures we had spent weeks guessing at.

> How do you recover failed payments at scale? Classify every decline first, retry only the recoverable classes on schedules the rail can honor, and verify transaction state before any retry so recovery never becomes a double charge.
