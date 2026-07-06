// Third-party endorsements shown on the homepage (ported design from the
// 21st.dev "Editorial Testimonial" pattern, rebuilt JS-less on the paper
// system). The homepage section renders ONLY when this array is non-empty,
// so nothing ships until real quotes exist.
//
// HARD RULE — every entry must be a real, attributable statement from a
// named person who is happy to be quoted (a LinkedIn recommendation, a
// former manager or peer at Simpaisa / Daraz / Tapmad, a PMI reference).
// Do NOT invent, paraphrase, or "improve" a quote, and do not add an entry
// on someone's behalf without their words. Same standard as every metric
// on this site: traceable or it doesn't ship.

export type Testimonial = {
  /** The endorsement, verbatim. Keep it tight — one to three sentences. */
  quote: string;
  /** Who said it. */
  author: string;
  /** Their role/title at the time (or now). */
  role: string;
  /** Their organisation. */
  org: string;
  /** How they know Rizwan, e.g. "Reported to Rizwan at Simpaisa". Optional. */
  relationship?: string;
  /** Provenance, e.g. "LinkedIn recommendation". Optional, shown subtly. */
  source?: string;
};

export const testimonials: Testimonial[] = [
  // Awaiting real endorsements from the owner. Populate above; the section
  // lights up automatically once there is at least one entry.
];
