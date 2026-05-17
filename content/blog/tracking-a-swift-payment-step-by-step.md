---
title: "How to Track a SWIFT Payment Step by Step"
slug: "tracking-a-swift-payment-step-by-step"
category: "SWIFT & Cross-Border Payments"
metaTitle: "How to Track a SWIFT Payment Step by Step | Rizwan Zafar"
metaDescription: "A practical guide to tracking a SWIFT payment using the UETR and gpi Tracker, what to ask your bank and how to read the status."
excerpt: "If your bank cannot tell you where the payment is, the bank does not have the system. The system exists."
publishDate: "2026-07-03"
readingTime: "6 min read"
tags: ["SWIFT tracking", "UETR", "gpi tracker"]
targetKeywords: ["track SWIFT payment", "SWIFT UETR tracking", "how to track international wire"]
relatedArticles:
  - "/blog/swift-gpi-tracking-and-the-end-of-payment-uncertainty"
  - "/blog/swift-payment-delays-what-actually-causes-them"
---

# How to Track a SWIFT Payment Step by Step

Most SWIFT payments today carry a **UETR**, a unique end-to-end transaction reference that follows the payment from origin to credit. With it, the originating bank can query the gpi Tracker and report status in near real time. Without it, the customer is back in the pre-2017 world of phone calls between correspondents.

## Step 1: Get the UETR from the originating bank

After sending the payment, ask the bank for the **UETR** (a 36-character UUID). This is the single most useful piece of information for tracking. If the bank cannot provide one, ask whether the payment was sent as a gpi payment.

## Step 2: Use the bank's tracking surface

Most major banks now expose UETR-based tracking in their corporate banking or business banking portals. Look for "track payment," "wire tracking," or "gpi tracking." Enter the UETR and the bank queries the gpi Tracker on your behalf.

## Step 3: Read the status

Common statuses:

- **Sent / in transit:** Message has been transmitted to the next bank in the chain.
- **At correspondent:** The payment is at an intermediary bank.
- **Credited to beneficiary:** Funds have reached the beneficiary's account.
- **Returned:** The payment is on its way back (with a reason, usually).
- **Pending:** Awaiting compliance, document, or other review.

Each status typically carries timestamps and, where reported, fee deductions.

## Step 4: If status stalls

If the payment stalls at a correspondent for more than a business day, contact the originating bank with the UETR. The bank can send a status-inquiry message (an MT199 or its ISO 20022 equivalent) to the correspondent. Common stall causes are covered in [SWIFT Payment Delays](/blog/swift-payment-delays-what-actually-causes-them).

## Step 5: If the payment must be cancelled

A cancellation request can be initiated by the originating bank. Success depends on where the payment is in the chain and whether downstream correspondents act in time. Refunds, where issued, typically come back with new FX deductions.

## Key takeaways

- The UETR is the field that makes tracking possible.
- Most major banks expose a tracking surface; ask for it.
- Stalled payments almost always sit at a specific correspondent, the system can tell you which.

## FAQ

**Can I track without a UETR?** Older, non-gpi payments are harder to track. Get the UETR before sending.

**Is the gpi Tracker public?** No, it is a bank-only system. Customers access it through their bank.

**How fast should an in-corridor SWIFT payment credit?** With gpi, often within hours. Same-day usable funds is the gpi SLA in many corridors.
