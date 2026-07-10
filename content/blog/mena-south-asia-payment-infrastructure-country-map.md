---
title: "MENA + South Asia Payment Infrastructure: A Country-By-Country Operating Map"
slug: "mena-south-asia-payment-infrastructure-country-map"
category: "Emerging Markets"
metaTitle: "MENA + South Asia Payments Infrastructure: Country Map | Rizwan Zafar"
metaDescription: "A country-by-country map of payments across UAE, KSA, Pakistan, Bangladesh, Nepal, Iraq, and Egypt: the regulators, the rails, the wallets, and what actually ships."
excerpt: "Every operator entering MENA or South Asia gets a market deck from the local consulting partner. The deck is well-presented and operationally useless. This is the deck that would actually have helped, the regulators, the rails, the wallets, the flows that matter, and the launch sequence that does not collapse."
publishDate: "2026-05-20"
readingTime: "14 min read"
featured: true
tags:
  - MENA payments
  - South Asia payments
  - emerging markets fintech
  - UAE payments
  - KSA payments
  - Pakistan fintech
  - cross-border corridors
  - payment infrastructure
targetAudience:
  - Cross-border platform PMs
  - Heads of expansion at fintechs
  - Regional VPs evaluating market entry
  - Country GMs in MENA / South Asia
  - VP Product hiring managers at regional fintechs
targetKeywords:
  - MENA payment infrastructure
  - South Asia payment rails
  - UAE KSA payments
  - Pakistan payment system
  - Bangladesh BD payment
  - Egypt Iraq payment infrastructure
  - emerging markets payments
relatedArticles:
  - "/blog/cross-border-corridors-are-operating-systems"
  - "/blog/correspondent-banking-and-emerging-market-corridors"
  - "/blog/emerging-markets-pressure-test-payments"
---

# MENA + South Asia Payment Infrastructure: A Country-By-Country Operating Map

Every operator entering MENA or South Asia gets a market deck from the local consulting partner. The deck has the same shape: GDP growth, population, smartphone penetration, "X% unbanked", a few scheme partnerships listed, a market-size estimate. It is well-presented and operationally useless. The deck does not answer the questions that matter: who is the actual regulator, what rails work in production, where do payments break, what does it take to launch.

This is the deck that would actually have helped. Seven markets, UAE, KSA, Pakistan, Bangladesh, Nepal, Iraq, Egypt, covered the way an operator running live payment corridors across the region would brief a new entrant. For each: the regulator stack, the dominant rails, the wallets, the cross-border position, and the launch sequence that does not collapse.

The shape is intentionally compressed; each market deserves its own deeper essay. The operating map below is the briefing a senior payments leader gives a new hire on day one.

## United Arab Emirates (UAE)

**Primary regulator.** Central Bank of the UAE (CBUAE). The CBUAE Retail Payment Services and Card Schemes regulation (2023) is the operating reference for most fintech entrants. Free-zone regulators (DIFC: DFSA; ADGM: FSRA) cover their respective free-zone licences with passport limitations.

**Dominant rails.**

- **Card acquiring.** International scheme (Visa, Mastercard, Amex). Network International and Magnati dominate large-merchant acquiring; the smaller acquirers (Mastercard Payment Gateway-Services-of-Choice partners) serve mid-market.
- **Local debit.** No domestic-only scheme equivalent to Mada, UAEbenefit/UAE Switch was historically a domestic switch but cards are typically co-badged Visa/Mastercard. Domestic ATM/POS switch via UAESwitch.
- **Real-time bank rail.** Instant Payment Platform (IPP) launched by CBUAE for retail real-time, plus the longer-standing UAEFTS for high-value RTGS.
- **Wallets.** Apple Pay (high iOS share), Google Pay, plus regional wallets (Beam Wallet historically; consolidation underway).

**Cross-border posture.** Major remittance corridor (inbound from rest of world, outbound to South Asia, MENA, Africa). UAE Exchange / Lulu / Al Ansari dominate exchange-based remittance; banks dominate higher-value flows. SWIFT for cross-border bank-to-bank.

**Operating reality.** The UAE is the most operationally mature market on this list. Regulator engagement is high-touch and increasingly prescriptive (the 2023 regulation is the reference text). Licence path is well-documented but slow (12-18 months for full retail payment services licence). Free-zone licences are faster but limit retail consumer activity.

**Launch sequence.** (1) Choose the licensing pathway (CBUAE retail payment services for consumer-facing; DIFC/ADGM for B2B + cross-border + treasury); (2) engage sponsor bank if you do not have your own banking licence; (3) integrate Network International or Magnati as acquiring partner; (4) certify scheme connectivity; (5) AML/CFT + sanctions infrastructure aligned to CBUAE list + OFAC + EU + UN; (6) IPP integration if doing local A2A.

## Kingdom of Saudi Arabia (KSA)

**Primary regulator.** Saudi Central Bank (SAMA, Saudi Arabian Monetary Authority). SAMA's fintech regulatory framework (post-2018) is increasingly aligned to Vision 2030.

**Dominant rails.**

- **Card acquiring.** Heavy international scheme but with mandatory local-rail routing. Geidea, urpay, Hyperpay are mid-large acquiring; Network International + Mastercard Payment Gateway Services serve the international end.
- **Mada (local debit scheme).** The dominant rail. Co-badged with international schemes on most cards. SAMA mandates Mada-first routing on domestic debit transactions. Interchange materially lower than international rails.
- **Real-time bank rail.** SARIE for RTGS / large-value. Sarie Instant Payment System (sarie now real-time) for retail.
- **Wallets.** STC Pay (large), urpay (Saudi Telecom), Apple Pay, Google Pay. Local wallets carry meaningful share, particularly in lower-income segments.

**Cross-border posture.** Major remittance origination corridor (outbound to South Asia, MENA). Inbound is lower but growing as KSA opens. Cross-border remittance is heavily compliance-controlled.

**Operating reality.** SAMA is high-touch, structured, and slow on novel licences. Mada is non-negotiable on routing, international-only routing on domestic debit is a regulator finding. Vision 2030 has accelerated regulator engagement on fintech but the licensing path is still meticulous.

**Launch sequence.** (1) Engage SAMA early for licensing pathway; (2) integrate Mada from day one, international-only is a non-starter; (3) sponsor bank relationship; (4) Geidea or hyperpay for acquiring; (5) STC Pay / urpay integrations if consumer-facing; (6) Arabic-first product experience (not a translation layer); (7) AML/CFT aligned to SAMA + GCC + OFAC.

## Pakistan (PK)

**Primary regulator.** State Bank of Pakistan (SBP). Regulatory framework includes the EMI (Electronic Money Institution) licence for fintechs and the more established PSP / PSO categories.

**Dominant rails.**

- **Card acquiring.** International scheme is dominant; local scheme PayPak (1-Link consortium) plays a growing role on domestic debit. HBL, MCB Bank, Bank Alfalah, Habib Bank, plus Tap Payments and Simpaisa for fintech-focused merchant acquiring.
- **1-Link / NIFT.** 1-Link is the domestic ATM and POS switch, also operating Raast (the SBP's instant payment scheme). NIFT handles inter-bank funds transfer at the higher-value end.
- **Raast.** SBP's instant payment system, peer-to-peer launched in 2021, merchant-acceptance rolling out 2023-2025.
- **Wallets.** Easypaisa and JazzCash dominate the mobile-money landscape. Their reach far exceeds card penetration in many segments.

**Cross-border posture.** Major remittance destination (inbound from GCC, US, UK). Outbound is restricted; foreign exchange controls limit cross-border outflows for consumers.

**Operating reality.** SBP is engaged on fintech but resourced thinly relative to demand. Raast is the strategic rail SBP is pushing; integration is a meaningful differentiator. Easypaisa and JazzCash are the de-facto wallets, any consumer-facing product without one or both has half a market. Foreign exchange controls shape what cross-border products can ship.

**Launch sequence.** (1) Choose licence (EMI / PSP / PSO depending on activity); (2) sponsor bank relationship, usually HBL, MCB, or UBL; (3) 1-Link / PayPak integration; (4) Raast integration (increasingly table-stakes); (5) Easypaisa + JazzCash wallet integrations for consumer flows; (6) AML/CFT aligned to SBP + FATF MENAFATF observations.

## Bangladesh (BD)

**Primary regulator.** Bangladesh Bank. The MFS (Mobile Financial Services) regulatory framework and the PSO (Payment Service Operator) licence cover most fintech activities.

**Dominant rails.**

- **Card acquiring.** International scheme dominant in urban + e-commerce. Card penetration is much lower than wallet penetration outside major cities.
- **NPSB (National Payment Switch Bangladesh).** Inter-bank card and ATM switch.
- **Bangla QR.** The Bangladesh Bank-managed national QR scheme. Increasingly important for merchant acceptance.
- **bKash, Nagad, Rocket.** Mobile money dominates the consumer market. bKash is the largest by a meaningful margin; Nagad (postal service) and Rocket (DBBL) are major.

**Cross-border posture.** Remittance destination (inbound from GCC, US, UK, Malaysia). Foreign exchange controls heavily restrict outflows.

**Operating reality.** Bangladesh Bank is the active regulator but the regulatory pace is slower than UAE/KSA. Mobile money is the consumer rail, card-first products miss the largest segment. Bangla QR is the merchant-acceptance growth lever the regulator is pushing.

**Launch sequence.** (1) PSO licence or MFS partnership; (2) bKash + Nagad integrations for consumer; (3) Bangla QR for merchant acceptance; (4) NPSB integration for card if applicable; (5) AML/CFT + central bank reporting; (6) sponsor bank relationship.

## Nepal (NP)

**Primary regulator.** Nepal Rastra Bank (NRB). The payment system regulation and the PSO licence cover fintech activities.

**Dominant rails.**

- **Card acquiring.** International scheme increasingly available in urban areas. Penetration lower than other markets on this list.
- **NCHL (Nepal Clearing House).** Inter-bank clearing and connectIPS for instant retail payments.
- **connectIPS.** NCHL's instant payment system, available to most banks.
- **Wallets.** eSewa (most established), Khalti, IME Pay are the leading consumer wallets. eSewa has the deepest merchant network.

**Cross-border posture.** Major remittance destination (inbound from India, GCC, Malaysia). Outbound is restricted by foreign exchange controls.

**Operating reality.** Smaller market by transaction volume than its neighbours, but operationally mature in terms of wallet adoption. NRB has been progressive on fintech licensing relative to market size. eSewa is the consumer wallet to integrate first.

**Launch sequence.** (1) PSO licence via NRB; (2) eSewa + Khalti partnerships; (3) connectIPS integration; (4) sponsor bank relationship (one of the larger commercial banks); (5) AML/CFT aligned to NRB framework.

## Iraq (IQ)

**Primary regulator.** Central Bank of Iraq (CBI). Regulatory regime has been rebuilding since 2014; framework formalisation accelerated 2020-2024.

**Dominant rails.**

- **Card acquiring.** International scheme penetration is growing rapidly from a small base. Mastercard's Iraq footprint expanded substantially 2022-2024.
- **Qi Card / Iraqi National Card (Smartcard).** Domestic card scheme with biometric authentication; major channel for government salary disbursement and pensions.
- **ASIA Hawala / Money transfer operators.** Significant share of cross-border + intra-country movement still through MTOs.
- **Wallets.** zainCash, AsiaHawala, FastPay are growing the digital wallet share from a small base.

**Cross-border posture.** Inbound remittance corridor (from GCC, Europe, US). Sanctions complexity is non-trivial, Iraq has nuanced sanctions geography that requires careful counterparty screening.

**Operating reality.** The CBI's regulatory framework is improving but the operating environment remains less mature than the other markets on this list. Cash is still the dominant payment mode in many segments. Government-disbursement use cases (Qi Card) are large and stable. International scheme growth is the structural story.

**Launch sequence.** (1) CBI licensing engagement (longer cycle than UAE/KSA); (2) sponsor bank relationship, choices are limited; (3) international scheme integration with extra attention to sanctions screening; (4) zainCash / AsiaHawala partnerships if consumer-facing; (5) AML/CFT with elevated sanctions discipline (OFAC sub-sanctions on specific Iraqi entities require careful counterparty screening); (6) Arabic-language product as default.

## Egypt (EG)

**Primary regulator.** Central Bank of Egypt (CBE). The Financial Regulatory Authority (FRA) covers some adjacent fintech activities (non-bank lending, capital markets). CBE's payments framework formalised significantly 2020-2024.

**Dominant rails.**

- **Card acquiring.** International scheme dominant; Meeza is the domestic scheme (CBE-mandated co-badging on debit cards). NSGB-now-CIB, NBE, QNB ALAHLI, Banque Misr cover most large acquiring; CIB has the deepest fintech-acquirer relationships.
- **Meeza.** Domestic card scheme with growing merchant acceptance. Mandatory co-badging on domestic debit cards.
- **InstaPay.** CBE's instant payment system, peer-to-peer and merchant accept.
- **Wallets.** Vodafone Cash (largest), Etisalat Cash, Orange Money, plus newer entrants (Khazna, Fawry).
- **Fawry.** Payment acceptance network with deep retail-agent footprint, adjacent rail for bill-payment and cash-collection.

**Cross-border posture.** Remittance destination (inbound from GCC, Europe, US, Saudi Arabia). Outbound is restricted; managed-exchange-rate environment shapes corridor economics.

**Operating reality.** CBE is engaged on fintech but the licensing path is long. Meeza is the strategic rail CBE is pushing, international-only routing on domestic debit is suboptimal. Vodafone Cash + Fawry are the consumer-experience defaults. Foreign exchange volatility and capital-controls shape what cross-border products can profitably ship.

**Launch sequence.** (1) CBE licence or PSP partnership; (2) Meeza integration if doing card acquiring; (3) InstaPay integration; (4) Vodafone Cash / Fawry partnerships for consumer; (5) sponsor bank relationship (CIB / Banque Misr / NBE); (6) Arabic-language product; (7) AML/CFT with FATF-aware tuning.

## What this map does not tell you

Three honest limitations:

**1. Each market changes faster than the deck.** A market deck from 2023 already misrepresents 2025 because Raast, Bangla QR, InstaPay, Mada, Iraq's regulatory framework have all moved meaningfully. The map above is a snapshot; the operator running each corridor reads the local regulator's weekly updates.

**2. Per-market depth is much deeper than this map.** Each section here is one paragraph of what should be a 5,000-word essay. The launch sequence is a starting frame, not a project plan. The operator entering each market spends months on the depth this map summarises.

**3. The map is from one operator's lens.** A remittance operator's map of these markets emphasises rails I have de-emphasised here; a credit operator's map emphasises licensing pathways I have skipped. The operating reality is multi-dimensional; this map prioritises payments infrastructure as the entry lens.

## The pattern across the seven

Three observations that hold across the region:

**1. The domestic scheme matters more than the international one.** Mada (KSA), Meeza (EG), PayPak (PK), Bangla QR (BD), connectIPS (NP), Qi Card (IQ), UAEswitch (UAE), each is the strategic rail the local regulator is pushing. Operators that treat the domestic scheme as "the legacy thing" miss both the interchange savings and the regulator posture.

**2. The wallets are the consumer experience.** Easypaisa, JazzCash, bKash, Nagad, eSewa, Khalti, Vodafone Cash, STC Pay, urpay, Apple Pay/Google Pay. The consumer-facing UX in each market is the wallet, not the card. Operators that ship card-first miss the consumer experience that defines the market.

**3. The cross-border posture is asymmetric.** Each market is dominantly a remittance _destination_ (inbound), with outbound restricted by foreign-exchange controls. Cross-border operators that build for outbound corridors discover the controls late; those that build for inbound have a clearer path.

## The senior PM tell

The interview question that distinguishes regional senior PMs on market entry: "we are launching in market X. What is your 90-day plan?"

The junior answer talks about market sizing. The senior answer reads: regulator engagement (week 1-4); licensing pathway clarity (week 4-8); banking + acquiring partner shortlist (week 6-10); domestic-scheme integration plan (week 8-12); wallet partnership decisions (week 10-12); local team hires (parallel); regulator-facing product tests (week 12 and ongoing). The 90 days does not produce a launched product, it produces a 12-18 month plan that the executive team can sign.

That answer is the operating posture. It is also the answer that distinguishes the PM who has actually entered a market from the PM who has read about doing so.

## FAQ

**What about India?**
India is its own ecosystem, UPI, NPCI, RuPay, Aadhaar, the licensing complexity, and deserves its own essay. The pattern (national rail, mandatory routing, wallet-led consumer UX, restricted outbound cross-border) is similar in shape but the scale and the regulatory specifics are different enough that compressing it into this map would be misleading.

**What about Africa?**
Same answer, Nigeria, Kenya, South Africa, Egypt is partially African in some lenses. The map above covers MENA + South Asia explicitly; Africa is a parallel essay.

**How much does this change year-over-year?**
Regulator framework changes happen on a 2-3 year cadence per market. Rail rollouts happen on a 3-5 year cadence. Wallet competition shifts on a 1-2 year cadence. The map above should be re-validated every 12 months by the operator running each corridor.

**Is local presence required?**
Mostly yes. The regulators in each market generally expect locally-domiciled licence-holding entities or registered cross-border partnerships. Few markets accept fully-remote operators for retail consumer activity.

**What's the right entry order if launching across multiple markets?**
Depends on the operator's home base and product. A common pattern: anchor in UAE (mature, English-friendly, scheme depth); expand to KSA (size, growth); add Pakistan + Egypt + Iraq + Bangladesh as corridor strategy. Nepal usually follows the Pakistan / Bangladesh sequence.

**Where is the biggest under-developed opportunity?**
Iraq, on the structural growth story, with the highest risk profile. Bangladesh QR + merchant acceptance, on the operational depth story. Pakistan + Raast + wallet interop, on the licence-pathway story. The right answer depends on the operator's risk appetite and time horizon.

---

If this resonated, also read [Cross-Border Corridors Are Operating Systems](/blog/cross-border-corridors-are-operating-systems), [Correspondent Banking and Emerging Market Corridors](/blog/correspondent-banking-and-emerging-market-corridors), and [Emerging Markets Pressure-Test Payments](/blog/emerging-markets-pressure-test-payments).
