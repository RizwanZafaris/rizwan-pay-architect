export type Recommendation = {
  name: string;
  title: string;
  company: string;
  quote: string;
  date: string;
  era: "payments" | "legacy"; // modern fintech vs. earlier engineering / PMO era
};

// Modern payments-era recommendations are pending. Legacy entries come from the
// earlier engineering and PMO career and are surfaced in a separate section.
export const recommendations: Recommendation[] = [
  {
    name: "Jan Kosela",
    title: "Lead Electrical Expert",
    company: "Türk Standardları Enstitüsü",
    quote:
      "An optimistic and willing professional who was a joy to work with. He could see the solution to a problem in advance before his colleagues. A man who saw a challenge instead of a problem, and passed every one of them with his iconic smile.",
    date: "Mar 2019",
    era: "legacy",
  },
  {
    name: "Hassam Mehmood",
    title: "Executive Engineer, Instruments & Controls",
    company: "Pakistan Refinery Limited",
    quote:
      "A focused, smart-working and talented individual. Rizwan's ability to juggle multiple tasks was unlike any I've seen before and made a dramatic difference in the productivity of the project. He would be an asset to any team.",
    date: "Jun 2015",
    era: "legacy",
  },
  {
    name: "Naseem Hassan",
    title: "Lead EHS",
    company: "Al-Bario Engineering Pakistan",
    quote:
      "An efficient project engineer with strong command over his area of work and the relevant international standards.",
    date: "Feb 2015",
    era: "legacy",
  },
  {
    name: "Alfred Nilius",
    title: "Director · Inspector (API, ASME, EU standards)",
    company: "Stroj Inspekt",
    quote:
      "I highly recommend Mr. Rizwan as a capable project manager and a strong professional. A good person and a very good friend.",
    date: "Sep 2015",
    era: "legacy",
  },
  {
    name: "Abdul Tawab",
    title: "Director Projects",
    company: "T S Engineering Services",
    quote:
      "A strongly growing project manager with real capacity to coordinate teams, clients and head office.",
    date: "Apr 2015",
    era: "legacy",
  },
  {
    name: "Shariq Ehsan",
    title: "Senior Manager, Digital Marketing",
    company: "Disrupt.com",
    quote: "Rizwan is one of the fastest learners I have ever encountered.",
    date: "Feb 2013",
    era: "legacy",
  },
];

export const paymentsRecommendations = recommendations.filter((r) => r.era === "payments");
export const legacyRecommendations = recommendations.filter((r) => r.era === "legacy");
