import { CAREER, PLATFORM } from "@/content/facts";

// Shared by the visible native-details accordion and the FAQPage JSON-LD so
// the structured data cannot drift from the recruiter-facing copy.
export const HOW_I_WORK_FAQS: { q: string; a: string }[] = [
  {
    q: "What roles are you focused on?",
    a: "Senior product and program leadership in payments and fintech infrastructure — Director or VP of Product, Head of Product, and senior program or PMO roles. I own the full lifecycle: strategy, roadmap, PMO governance, execution and P&L.",
  },
  {
    q: "Which markets have you worked across?",
    a: `${CAREER.marketsWordCap} markets across MENA and South Asia over my career, spanning payments, e-commerce and streaming. At Simpaisa specifically, I run the platform across ${PLATFORM.marketsWord} regulated frontier markets.`,
  },
  {
    q: "How technical are you?",
    a: "I started in engineering and still operate close to the build. At Simpaisa I led a 40-plus engineer organisation across 12 squads and served as acting CTO through 2024 alongside the CPO role.",
  },
  {
    q: "What does your product scope cover?",
    a: "Regulated payment infrastructure end to end: card acquiring, merchant onboarding and KYC/KYB, pay-in and payout rails, cross-border corridors, settlement and reconciliation, fraud and AML/CFT controls, and AI-augmented operations.",
  },
  {
    q: "How do you use AI in delivery?",
    a: "I run three production GenAI systems in a regulated payments environment — merchant-integration support, incident auto-escalation and partner-support automation — plus a fraud/AML pilot with a banking partner.",
  },
  {
    q: "Where are you based and how do you work?",
    a: "Dubai (GST, UTC+4), which overlaps cleanly with Europe, MENA and South Asia working hours and with US East Coast mornings. I work async-first with a weekly live cadence.",
  },
];
