# Content Repurposing Framework — One-to-Many, Without the Spam

_The brief asked for 13 derivative formats per blog. With 84 essays that is ~1,100
artifacts — exactly the thin-content failure mode the audit just diagnosed on the site
itself. This framework produces the same reach with a tenth of the output: repurpose
**A-tier essays only**, into the channels where the target audience demonstrably is._

## The rule

**Only A-tier essays get repurposed** (13 today; ~20 after the retrofit). B/C/D essays
earn repurposing by being upgraded first. Every derivative must carry: one canonical
number, one operator anecdote, one link back to the source essay (UTM-tagged
`utm_source=<channel>&utm_medium=repurpose&utm_campaign=<slug>`).

## Channel priority (audience-weighted, not format-maximal)

| Priority | Channel | Formats | Why |
|---|---|---|---|
| 1 | **LinkedIn** | Long post · short post · document/carousel | The only channel where Visa/Mastercard/Stripe recruiters actually scroll. See `03-linkedin-engine.md` |
| 2 | **X** | Thread (5–8 tweets) · single contrarian post | Payments-infra Twitter is small but dense (scheme people, PSP founders); low cost from the LinkedIn long post |
| 3 | **Newsletter (Substack or native)** | Monthly digest: 1 flagship + 2 shorts + 1 "from the pager" anecdote | Owns the audience; recruiters forward emails, not feeds |
| 4 | **Medium** | Adapted article with `rel=canonical` → rzifi.com (Medium supports canonical on import — never paste without it) | Borrowed distribution without duplicate-content damage |
| 5 | **Video (deferred until the 3 scripted Looms ship)** | 10-min Loom walkthrough → YouTube; 60–90s vertical cut | Highest trust signal; gated on recording, not writing |
| 6 | **Podcast (guest, not own)** | The 10/30-min "scripts" become guest-pitch talking points for payments podcasts | Hosting a podcast is a content-ops tax; guesting borrows audiences |
| — | Instagram | Skip | Zero recruiter density for this audience; carousel effort goes to LinkedIn documents instead |

## The per-essay derivative kit (A-tier only)

From one flagship essay produce, in this order, ~90 minutes total:
1. **LinkedIn long post** (150–220w): hook from the essay's sharpest claim + the
   anecdote + one number + comment-prompt CTA. Publish Tue/Wed.
2. **LinkedIn document** (6–9 slides): the essay's framework as slides — title slide
   states the named framework; last slide = rzifi.com/blog/slug.
3. **X thread**: long post split 5–8 ways; first tweet = the number-shock hook.
4. **Short post** (LinkedIn + X, same week +3 days): the essay's single most
   contrarian sentence, standalone.
5. **Newsletter block** (saved to the monthly draft).
6. **Medium adaptation** (only for the 5 most search-competitive flagships; canonical set).

## Worked example — `reconciliation-is-product-infrastructure` (Tier A, 10/10)

- **LinkedIn long:** Hook: "Our reconciliation system processes 270M+ payments a year.
  It has never once been demoed to a customer. It is still the most valuable product
  we built." → 3 lines on break-rate economics → "Ops headcount stayed flat while
  volume scaled 10x — that line is the product." → CTA: "What's the most valuable
  thing your team built that nobody demos? ↓"
- **Document:** "Reconciliation is a product, not a back office" — 7 slides: the claim ·
  break-rate table · the 3 design decisions · what breaks at 10x · STP linkage (90%) ·
  the org chart implication · link slide.
- **X thread:** 6 tweets from the same skeleton; tweet 1 = the headcount-flat line.
- **Short:** "If your reconciliation lives in a spreadsheet, your settlement SLA is a
  rumor." (standalone, 3 days later)
- **Newsletter:** flagship slot in the monthly digest with the break-rate table inline.
- **Medium:** yes (high search competition on "payment reconciliation") — canonical set.

## Production ritual

One 90-minute block per week (pairs with the LinkedIn batch ritual in `03`): pick the
week's flagship → run the kit top to bottom → schedule. Track per-derivative UTMs in
GA4 monthly; a channel that produces zero rzifi.com sessions for two consecutive months
gets cut without sentiment.
