# Homepage Feature Plan

The homepage should answer six questions in under ten seconds. The featured essays support the answers.

| Question | Section | Featured essay |
|---|---|---|
| Who is Rizwan? | Hero + bio strip | — |
| What does he build? | Architecture / RailsMap diagram | **F3** Payment Infrastructure Is State, Trust, Failure |
| Why is the work hard? | Operating reality strip | **F1** Reconciliation Is Not Back Office |
| What proof exists? | Metrics bar + case studies | `/product-work/simpaisa-payment-infrastructure`, `/product-work/tapmad-wallet-billing-migration` |
| Why should Visa/MC/Stripe care? | Selected essays grid | **F2** Hosted vs Direct, **F6** Cross-Border as OS, **F10** EM Pressure-Test |
| How to contact / download resume? | Sticky nav + footer CTA | — |

## Selected essays grid (homepage, 3 cards)

Rotate quarterly. Initial set:
1. **F1** Reconciliation Is Not Back Office — Settlement & Reconciliation
2. **F2** Hosted Checkout vs Direct Card Processing — Payment Infrastructure
3. **F9** Payment Cost: 50% to 1% — Product Strategy (Tapmad credibility)

## "Latest" strip (below the grid)

Auto-populated from the 3 most recent posts in `src/data/posts.ts`. Cap titles at 60 chars on cards.

## Footer essay cluster

Footer shows one essay per pillar (7 links), each pointing to that pillar's page. This gives crawlers a flat link graph from the homepage to every pillar.
