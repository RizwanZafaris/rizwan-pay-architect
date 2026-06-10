---
title: "Sanctions Screening at Scale Without Killing Conversion: Audit-Clean Across Five Jurisdictions"
category: remittance
tags: [sanctions-screening, pep-screening, aml-compliance, case-management, audit-readiness]
anonymized_entity: "a cross-border remittance provider"
---

## Challenge

Every transfer we processed was screened, sender and beneficiary, against sanctions and PEP lists in every jurisdiction we touched, and the screening was drowning us. Name matching across transliterated scripts produced floods of false positives, every hit paused a transfer, and senders watching "in review" abandoned us for competitors. The quieter danger was worse: genuinely suspicious cases sat in the same queue as the noise. Compliance requested more analysts every quarter. My mandate was to scale screening throughput without missing a single true hit and without the conversion cost that pauses were inflicting.

## Context

We operated across 5 jurisdictions, each with its own AML rules, list requirements, and audit expectations, in corridors where names cross scripts: Arabic, Urdu, and Cyrillic names romanized differently by every system that touches them, so the same person arrives spelled five ways. Sanctions and AML screening at scale was table stakes for our banking partners and our licenses, not a differentiator we could trade away. The uncomfortable arithmetic: most analyst hours went to clearing matches that were obviously false to a human within seconds, which meant our scarcest compliance resource was spent on the least risky work.

## Approach

We rebuilt screening as a tiered system. Strong matches auto-held immediately, exactly as before. The fuzzy band, where the volume lived, was scored against contextual data the matcher had been ignoring: date of birth, geography, ID attributes, and corridor patterns, to auto-clear the demonstrably false and route the genuinely ambiguous to analysts with evidence pre-assembled. Escalations carried four-eyes review. List updates were automated and versioned, so we could prove which list revision screened which transaction. The audit trail was designed first, not retrofitted: every decision reproducible, every threshold change logged.

## Product Strategy

Two metrics, strictly ordered. Screening recall came first, because a missed true hit is an existential event and no efficiency gain justifies one. Time-to-release came second. I refused to frame the program as reducing compliance workload, because that framing loses the only stakeholders who can approve it. The frame was precision: every analyst-hour spent clearing an obvious false positive is an hour not spent on a real risk, so precision is itself a compliance control. Risk appetite per jurisdiction was documented with each compliance officer, not set by product.

## Execution

The rollout nearly ended in its first month. Our initial calibration of the auto-clear band tested as too aggressive, and the head of compliance halted everything, correctly. The rebuild became the program's foundation: a champion-challenger validation where the new logic ran in shadow against months of historical alerts and went live only after demonstrating zero missed true positives against every analyst-confirmed hit on record. That shadow run converted compliance from blockers into co-owners, because the evidence was theirs. The most valuable model inputs came from analyst tacit knowledge: corridor-specific naming conventions, patronymics and honorifics that matchers mis-parse as surnames, encoded as features instead of folklore.

## Metrics

- Audit-clean across all 5 jurisdictions, with no findings through successive examinations
- False-positive queue reduced by a double-digit percentage
- Time-to-release for held transfers cut from days to hours
- Screening throughput scaled with volume on a flat analyst team
- Zero missed true hits in shadow validation and in production review

## Results

Completion rates on held transfers recovered, and "stuck transfer" complaints stopped dominating support queues. Bank partner due diligence accelerated because we could demonstrate controls live, reproducing any historical decision on request, rather than describing them in a questionnaire. Examiners in one jurisdiction spent their time on reproducibility, got it instantly, and finished early. The screening platform itself became corridor-launch infrastructure: every new market inherited it on day one rather than rebuilding compliance from scratch.

## Lessons Learned

False positives are a compliance risk, not merely a cost, because they bury the true hits in noise; arguing that case is what wins compliance leaders to automation. Shadow validation against full history is the only honest way to tune screening, and it doubles as the political instrument that earns trust. Analysts are the spec: their seconds-long judgments encode exactly the features your scoring needs. And build the audit trail before the automation, because reproducibility is what examiners actually examine.

> How do you scale sanctions screening without killing conversion? Auto-clear only what you can prove safe against your full alert history, route the ambiguous with evidence attached, and measure recall before speed, because one buried true hit costs more than every false positive combined.
