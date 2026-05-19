---
title: "Where ML Beats AI: Six Payment Problems an LLM Cannot Touch"
slug: "where-ml-beats-ai-payment-problems-llm-cant-touch"
category: "AI in Fintech"
metaTitle: "Where ML Beats AI: Six Payment Problems LLMs Can't Touch | Rizwan Zafar"
metaDescription: "An operator's argument for picking classical ML over LLMs in payments. Six problems where a gradient-boosted model still wins, and why throwing a transformer at them is the wrong move."
excerpt: "There is a quiet AI-in-fintech mistake teams keep making: reaching for an LLM the moment the word 'AI' shows up on the roadmap. Sometimes the right answer is a gradient-boosted tree and a clean feature pipeline. This is the operator's argument for the boring choice."
publishDate: "2026-05-19"
readingTime: "10 min read"
featured: true
tags:
  - machine learning
  - AI in fintech
  - fraud detection
  - credit scoring
  - payment ML
  - gradient boosting
  - LLM limitations
  - production ML
targetAudience:
  - Heads of risk and fraud
  - Payment platform CTOs
  - Product leads weighing AI adoption
  - Fintech engineering managers
targetKeywords:
  - ML vs AI fintech
  - when to use ML vs LLM
  - classical ML payments
  - fraud detection ML model
  - gradient boosting fintech
  - LLM limitations payments
relatedArticles:
  - "/blog/ai-in-payments-four-production-use-cases"
  - "/blog/ai-fraud-detection-vs-rule-engines"
  - "/blog/value-modeling-genai-use-cases-fintech"
---

# Where ML Beats AI: Six Payment Problems an LLM Cannot Touch

There is a quiet mistake teams keep making in fintech: reaching for an LLM the moment the word "AI" shows up on the roadmap. The trade press has trained everyone to equate AI with transformers, and a generation of product reviews now ask "could we use GPT here?" before they ask "what's the actual problem shape?"

Most of the time, the answer is no.

Classical machine learning — gradient-boosted trees, logistic regression, isolation forests, simple anomaly detectors — still beats LLMs on the six highest-value payment problems I can name. By a lot. Not "comparable performance at lower cost." Actually beats. The LLM doesn't even compete.

This is the operator's argument for the boring choice. Six problems, why ML wins, what the typical mistake looks like, and the test that tells you which side of the line you're on.

## The shape of problems LLMs solve

Before the six counterexamples, the fair version: LLMs are extraordinary at problems that are linguistic, generative, ambiguous, and recoverable. Drafting an email a human will edit. Summarising a 50-page dispute file. Extracting structured fields from an unstructured PDF. Answering merchant-support questions where "almost right" is fine and a human is in the loop to fix the 5% it gets wrong.

These problems share a shape:

- The input is text (or can be cleanly tokenised)
- The output is text (or close to it)
- The cost of a wrong answer is **low** (a human catches it, a retry is cheap)
- The correct answer is **fuzzy** — there's no single right output, multiple acceptable ones exist
- The data is **rich per example** — each row carries enough context to reason about

Now look at the six problems below. None of them fit that shape.

## 1. Real-time card fraud scoring

**The problem.** A transaction arrives. You have ~200ms to decide approve / decline / step-up. Inputs: PAN history (tokenised), merchant ID, geography, amount, time-of-day, device fingerprint, velocity counters.

**Why ML wins.** A gradient-boosted tree (XGBoost / LightGBM) trained on hundreds of millions of historical transactions, with engineered features (merchant velocity, PAN velocity, geo-shift, amount-band z-score), returns a probability score in <10ms. The features are numeric and bounded. The label (chargeback in 60 days) is unambiguous and well-supplied. False-positive rate is the optimisation target and the constraint is hard.

**Why LLM loses.** Latency budget is 200ms; LLM inference is 500–2000ms. Cost per call is 100× a tree. The input isn't text — it's structured numerical features. Asking GPT-4 "is this transaction fraudulent?" with a JSON blob in the prompt is throwing away every advantage the boosted tree has.

**The mistake teams make.** "LLM-assisted fraud" demos that show the LLM "reasoning about" a transaction. Looks impressive in slides; the production fraud team still ships the gradient-boosted model because the boosted tree decisions in 8ms and the LLM doesn't.

**Verdict.** Use ML. The LLM is for the analyst's case notes after the fact, not the scoring.

## 2. Authorisation routing decisions

**The problem.** A transaction can be routed through one of three acquirers. Each has a different cost, success rate, latency profile, fraud sensitivity at this PAN/merchant/amount combination. Pick the route that maximises approval rate × margin.

**Why ML wins.** Contextual bandits (or, simpler, a logistic regression with explore-exploit on top) handle this beautifully. The state space is small (route × merchant × amount band × time-of-day × scheme). Reward signal is fast (approve/decline within seconds). Online learning lets the model adapt as acquirers' approval rates shift.

**Why LLM loses.** LLMs don't have a memory of recent acquirer performance. They can't be retrained per merchant. The decision is a pure exploration / exploitation problem with structured inputs and a numeric reward. This is the textbook shape ML was built for.

**The mistake.** "AI-powered smart routing" pitches that involve an LLM scoring routes. The LLM has no situated memory; it's just guessing.

**Verdict.** ML wins by a wide margin.

## 3. Settlement-file reconciliation matching

**The problem.** Two files arrive daily: your platform's transaction log and the acquirer's settlement file. A million rows each. Match them. Surface unmatched lines for ops review.

**Why ML wins.** Most matches are deterministic — transaction ID + amount + date is unique. The interesting cases are the ~1% with small discrepancies (timezone shifts, refund split into two settlement lines, currency rounding). A logistic regression or simple rule-based scorer on the candidate pairs gets you to 99.9% match rate with explainable confidence.

**Why LLM loses.** The cost-per-row is prohibitive. The structure is tabular, not textual. Reconciliation requires deterministic, auditable matches — you have to be able to defend each match to finance. An LLM cannot produce an audit trail that a regulator will accept.

**The mistake.** "GenAI-powered reconciliation" demos that paste settlement rows into a prompt. Looks magical for 10 rows; collapses at 100K.

**Verdict.** ML or pure rule-based. The LLM has no role in the matching step. (It might help an analyst write the explanation memo afterwards — different problem.)

## 4. Credit decisioning at scale

**The problem.** A consumer applies for BNPL / a card / a microloan. Decide approve / decline / refer in <2 seconds based on bureau data, transaction history (if accessible), employer signals, device signals, application metadata.

**Why ML wins.** Credit scoring is the canonical ML problem. The label (default in 12 months) is clear. The features are largely numeric. The regulatory landscape (Equal Credit Opportunity, FCRA in the US; PSD2 + GDPR in the EU; similar regimes in MENA) demands **explainability**. Boosted trees with SHAP values give you per-decision explanations. Black-box LLMs do not.

**Why LLM loses.** Auditability. A credit decision has to be defensible to the regulator, to the customer (under "adverse action notice" laws), and to internal compliance. "The LLM said no" is not an auditable answer. SHAP per feature is.

**The mistake.** "AI-driven credit underwriting" branding that masks a perfectly conventional boosted-tree model behind LLM-themed marketing. Or, worse, an actual LLM doing the underwriting — which will fail the first regulator audit.

**Verdict.** Boosted tree + SHAP every time. The LLM has zero role.

## 5. Velocity- and behaviour-anomaly detection

**The problem.** A customer's spending behaviour shifts suddenly. Spike in transaction volume. New merchant category. Geographic jump. Flag it for review.

**Why ML wins.** Isolation forests, one-class SVMs, exponentially weighted moving averages, simple statistical control charts — these solve velocity anomaly perfectly. They train on the customer's own history and trigger when behaviour deviates by N standard deviations. Cheap, fast, explainable.

**Why LLM loses.** No memory of per-customer baseline. No mechanism for personalised thresholds at scale. The LLM has to be re-prompted with the customer history every call — at 1B+ transactions/month that's economically unviable.

**The mistake.** "AI behavioural fraud" products that secretly run boosted trees underneath with an LLM-themed UI on top.

**Verdict.** Classical statistics + lightweight ML wins outright.

## 6. Risk-tier assignment for merchants

**The problem.** A new merchant applies. Based on business type, geography, expected volume, expected average ticket, public reputation signals, KYB data — assign one of five risk tiers (which determines pricing, payout speed, reserve requirements, monitoring intensity).

**Why ML wins.** Random forests or gradient-boosted trees on the structured KYB features land at 90%+ accuracy versus a human risk team. The decision is auditable. New data shifts the model easily.

**Why LLM loses.** Some of the input is unstructured (the merchant's website, social presence, bank statements) — the LLM is genuinely better at extracting from those documents. But the **final risk-tier decision** is a tabular classification problem. Use the LLM as a feature-extraction step (parse PDFs, summarise documents), then feed structured features into the ML model.

**The mistake.** End-to-end LLM-driven risk tiering. The decision step is the wrong tool for LLM.

**Verdict.** Hybrid — LLM for unstructured extraction, ML for the decision.

## The simple test

Before you commit to an LLM for a payments problem, run it through these five questions. If you can't answer "yes, definitively LLM" to most of them, default to classical ML.

1. **Is the input primarily text or unstructured?** If your inputs are 30 numeric features in a JSON, the answer is no.
2. **Is the output text or freeform?** If the output is approve / decline / a probability, the answer is no.
3. **Is "almost right" acceptable?** In fraud or credit, it's not. Each wrong decision has a defined dollar cost.
4. **Is the per-call cost economically tolerable?** At 25M+ transactions/month, even $0.001/call is $25K/month. At LLM rates ($0.01–$0.10 per call), the math collapses.
5. **Can you afford 500ms+ of latency?** Most payment decisions can't.

If you said "no" to two or more, you have a classical ML problem. Build it that way.

## Where the LLM genuinely earns its place

In the same payments stack, here's where an LLM actually shines:

- **Merchant support deflection** — answering merchant integration questions from documentation. Recoverable wrong answers. Text in, text out.
- **Compelling-evidence drafting** — assembling the dispute response narrative from transaction context + customer communications. Long-form, narrative, human-reviewed.
- **Auto-escalation of incidents** — reading PagerDuty + Slack threads to classify severity and suggest runbooks.
- **KYB document extraction** — pulling structured fields from articles of incorporation, utility bills, bank statements.
- **Internal knowledge retrieval** — RAG over the company's compliance documentation.

These are the four I've shipped in production (described in [AI in Payments: Four Production Use Cases](/blog/ai-in-payments-four-production-use-cases)). None of them sit in a hot path. None of them are scoring transactions. All of them have a human in the loop or a tolerance for occasional misses.

## The deeper point

The "AI gold rush" in fintech is producing a lot of solutions in search of problems. Boards want to see "AI" on the roadmap. Vendors are happy to oblige.

But the operator's job is to pick the right tool. Boosted trees, anomaly detection, contextual bandits, and well-tuned statistical baselines have been winning payment problems for a decade and will continue to win them. The arrival of LLMs is additive — they unlock new problems that were intractable before — but they don't displace the classical-ML wins.

A senior product leader at Visa or Stripe or Adyen who pitches "let's replace our fraud scoring with an LLM" is going to be politely shown the door. A senior product leader who can articulate **where** ML wins, **where** LLMs win, and **where** the hybrid pattern is right — that person gets the job.

The hard skill in 2026 isn't being excited about AI. It's being clear-eyed about when not to use it.

## FAQ

**Aren't LLMs getting cheaper and faster?** Yes. The economics improve every year. But the ceiling for cost and latency is still well above what real-time payments allows. Even at 10× efficiency gains, a tree-based model is still 50–100× cheaper at scale.

**What about hybrid LLM+ML?** The right pattern, as in §6 above. Use LLMs where they're strongest (unstructured extraction, narrative generation), feed structured outputs into ML for the actual decision.

**Could a future LLM replace these models?** Maybe. The economics and latency would have to change by ~100×. Not impossible on a 5-year horizon. But you don't bet a production fraud team on that.

**Why does this matter for personal branding as a payments PM?** Because the AI hype in 2026 is so loud that the operator who can hold a defensible line on **when not to use it** stands out. Hiring committees are tired of "AI roadmaps" with no engineering reality underneath.

**The single biggest sign you're picking the wrong tool?** If your "AI strategy" diagrams all start with "the LLM scores the transaction" and your fraud team is silent. They've already done the math.
