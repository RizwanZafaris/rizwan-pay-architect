import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl, OG_IMAGE_URL, SITE_URL } from "@/lib/seo";
import { profile } from "@/data/profile";

// Product Manager OS: the public repository page.
//
// SUBJECT: github.com/RizwanZafaris/product-manager-OS, MIT licensed, tagged
// v0.3.0. Every claim below is checked against the repo contents at that tag:
//   - 6 stages / 6 gates            os/OPERATING-LOOP.md, os/STAGE-GATES.md
//   - the Conductor, a stage-gated  os/CONDUCTOR.md, skills/conductor/
//     interviewer with resumable
//     STATE.md
//   - 67 templates in 8 folders     templates/{discovery,definition,architecture,
//                                   execution,delivery,operate,planning,ai}
//   - 11 knowledge cards + 18 index knowledge/INDEX.md
//   - roles + domains sub-layers    knowledge/roles/, knowledge/domains/
//   - learn/, 3 paths + a tutor     learn/INDEX.md
//   - 7 skills, 5 agent files       skills/, agents/
//   - 4 usage methods               README.md "Four ways to run it"
//   - 3 routing tiers               routing/README.md
//   - regulated module byte-exact   modules/regulated/README.md, source repo
//                                   github.com/RizwanZafaris/regulated-ai-prd
// Do NOT add adoption numbers, star counts or outcome claims here. The repo
// makes none, and a page that oversells a document system is the exact
// failure the repo's own README argues against.
//
// FACTS: this page carries no platform/career metric, so it imports nothing
// from @/content/facts by design. If a payments number ever lands here, it
// must come from that module (see scripts/check-facts.ts).

const REPO_URL = "https://github.com/RizwanZafaris/product-manager-OS";
const REGULATED_REPO_URL = "https://github.com/RizwanZafaris/product-manager-OS/tree/main/modules/regulated";
const CONTRIBUTING_URL = `${REPO_URL}/blob/main/CONTRIBUTING.md`;
const ISSUES_URL = `${REPO_URL}/issues`;

// The six stages and the gate each one has to clear, verbatim from
// os/OPERATING-LOOP.md.
const stages = [
  { n: "01", stage: "Discover", gate: "Gate 1", gateName: "Problem worth solving" },
  { n: "02", stage: "Define", gate: "Gate 2", gateName: "Requirements signed off" },
  { n: "03", stage: "Design", gate: "Gate 3", gateName: "Architecture and risks reviewed" },
  { n: "04", stage: "Build", gate: "Gate 4", gateName: "Acceptance criteria met" },
  { n: "05", stage: "Deliver", gate: "Gate 5", gateName: "Release readiness green" },
  { n: "06", stage: "Operate", gate: "Gate 6", gateName: "Outcomes verified" },
] as const;

// Two tracks plus the optional module, all of which run across the loop
// rather than inside one stage.
const overlays = [
  {
    name: "Planning",
    body: "Roadmap and OKRs feed every stage. Reviewed on their own cadence, not at a gate.",
  },
  {
    name: "AI overlay",
    body: "Eval specs, guardrails and red-team review, active whenever the product itself contains a model.",
  },
  {
    name: "Regulated overlay",
    body: "Activates when a financial or data regulator governs the product. Hooks in at Gate 2 and Gate 5.",
  },
] as const;

// The six layers from docs/ARCHITECTURE.md. Counts are file counts in the
// repository, not claims about usage.
const layers = [
  {
    dir: "os/",
    label: "Operating loop",
    answers:
      "The six stages, the six gates, which document a decision deserves, and where filled artifacts live. The Conductor protocol that runs the loop as an interview sits here too.",
  },
  {
    dir: "knowledge/",
    label: "Knowledge, roles, domains",
    answers:
      "Eleven canon cards with named attribution, plus eighteen indexed methods, each stating its trap and when to skip it. Two sub-layers sit beside them: roles, an eight-rung PM ladder, and domains, ten domain cards from ecommerce to a fintech pointer.",
  },
  {
    dir: "templates/",
    label: "Templates",
    answers:
      "67 fill-in documents across discovery, definition, architecture, execution, delivery, operate, planning and AI. Every one carries its stage, its knowledge card and its exit gate in the header.",
  },
  {
    dir: "skills/, agents/",
    label: "Skills and agents",
    answers:
      "Seven skills, including a product-analyst research skill and a feedback-synthesis skill, and five agent instruction files. Each skill is a readable procedure with two frontmatter fields, no vendor account required.",
  },
  {
    dir: "learn/",
    label: "Learning paths",
    answers:
      "Three stepped paths over fictional products, foundations, transitioning into PM, and senior sharpening, each ending at a real gate checklist, plus a tutor skill that scores a filled artifact the way the Conductor cross-examines an answer.",
  },
  {
    dir: "system/, routing/",
    label: "Prompts and routing",
    answers:
      "A boot prompt and role prompts that assume no file access, plus an OmniRoute config that sends extraction, drafting and judgment work to three different model tiers.",
  },
] as const;

// The Conductor's own contract, condensed from os/CONDUCTOR.md, for the
// callout that leads the "How it works" section below.
const conductorPoints = [
  "One question at a time, with a recommended default so agreeing costs one word",
  "A vague answer gets cross-examined against an evidence ladder, capped at two pushes",
  "Each gate has to pass on evidence before the next stage opens, and a human signs it, never the Conductor",
  "Every accepted answer lands in STATE.md immediately, so any session can say resume and pick up where it stopped",
] as const;

// The four usage methods, from the README section of the same name.
const methods = [
  {
    n: "01",
    title: "Bare templates, no model",
    body: "Clone the repository, copy the template you need, fill it in with any editor. The gates are checklists a human works through. Nothing in the knowledge or template layer depends on an AI layer existing.",
  },
  {
    n: "02",
    title: "Any chat model",
    body: "Paste the boot prompt into ChatGPT, Gemini, Claude or a free model. It installs the loop, the gate discipline, the evidence rules and the team of roles, and it assumes no file access. When it needs a file it asks for it by exact repo path.",
  },
  {
    n: "03",
    title: "Agent CLIs",
    body: "Claude Code reads CLAUDE.md, Codex and other runtimes read AGENTS.md, and both pick up the procedures in skills/ and the instruction files in agents/. Say start for the conducted interview above, or ask for the artifact you need directly.",
  },
  {
    n: "04",
    title: "API driven with OmniRoute",
    body: "Point the routing config at an OmniRoute instance and each stage of a pipeline calls its own tier: extraction on a cheap tier, drafting on a coding tier, judgment on a frontier reasoning tier.",
  },
] as const;

const audiences = [
  {
    title: "PMs who own a product end to end",
    body: "Discovery through post-launch verification in one place, instead of a discovery tool, a spec tool, a tracker and judgment stored nowhere.",
  },
  {
    title: "Teams shipping under a regulator",
    body: "Markets, jurisdictions and locales are first-class fields in the discovery and compliance templates, and the regulated overlay is a module rather than an afterthought.",
  },
  {
    title: "Anyone using a model for product work",
    body: "Every prompt is a file you can read, diff and fork. There is no wrapper, no account and no hosted prompt you cannot inspect.",
  },
  {
    title: "People who want the structure without the AI",
    body: "If the model is free tier, offline or wrong, the artifacts and the gates still function. That is a design rule in the repo, not a hope.",
  },
] as const;

// From the README's "What this is not". Kept on the page because a build page
// that only lists strengths is an advertisement.
const limits = [
  "Not a replacement for talking to customers. The discovery templates demand interview evidence; they do not generate it.",
  "Not an autopilot. Gates are signed by people with the standing to stop a stage.",
  "Not a claim that a model's output is evidence. Thin input produces confident, thin output, and the gates exist to catch that.",
  "Not legal or regulatory advice. The regulated module names the questions and where the primary text sits, never the answer for your entity.",
] as const;

const primaryCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-8 py-4 text-base font-medium shadow-sm transition duration-200 hover:bg-brand hover:text-[var(--brand-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-4 text-base text-ink transition-colors hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const pmosJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "@id": `${absUrl("/product-manager-os")}#repository`,
  name: "Product Manager OS",
  url: absUrl("/product-manager-os"),
  codeRepository: REPO_URL,
  programmingLanguage: "Markdown",
  license: "https://opensource.org/licenses/MIT",
  description:
    "An open-source operating system for product management: a stage-gated Conductor that interviews before it writes, a six-stage loop with six gates, 67 fill-in lifecycle templates, eleven PM canon cards, role and domain knowledge layers, a learning path, and a regulated overlay.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: profile.name,
    url: SITE_URL,
  },
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
};

export const Route = createFileRoute("/product-manager-os")({
  head: () => ({
    meta: [
      { title: "Product Manager OS | Rizwan Zafar" },
      {
        name: "description",
        content:
          "Product Manager OS: an open-source repo for running a product from discovery to sunset. The Conductor interviews stage by stage; 67 templates do the rest.",
      },
      {
        property: "og:title",
        content: "Product Manager OS, an open-source product operating loop",
      },
      {
        property: "og:description",
        content:
          "The Conductor interviews you stage by stage. Six gates, 67 fill-in templates, eleven PM canon cards and AI layers you can remove. MIT licensed, readable, forkable.",
      },
      { property: "og:url", content: absUrl("/product-manager-os") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:alt", content: "Product Manager OS, an open-source repository" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Product Manager OS" },
      {
        name: "twitter:description",
        content:
          "An open-source operating loop for product work, led by a stage-gated interviewer: six gates, 67 templates, eleven canon cards, and AI layers that are optional by design.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: absUrl("/product-manager-os") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(pmosJsonLd) }],
  }),
  component: ProductManagerOsPage,
});

function ProductManagerOsPage() {
  return (
    <div className="overflow-x-clip">
      {/* ── Header: what it is, and the one action that matters ── */}
      <header className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Open source · MIT
          </div>
          <h1 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.0] max-w-4xl">
            Product Manager <span className="italic text-[var(--brand)]">OS.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Run a product from discovery to sunset: gated templates, PM canon cards, and AI skills
            that work without AI. I built it as a document system first and an AI system second.
            Every template works with a text editor and a pencil, and every prompt in it is a file
            you can read, diff and fork.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={REPO_URL}
              rel="noopener"
              data-analytics-event="cta_click"
              data-analytics-cta-id="pmos_github"
              data-analytics-cta-location="pmos_hero"
              data-analytics-cta-destination={REPO_URL}
              className={primaryCtaClass}
            >
              View the repository on GitHub
              <span aria-hidden>→</span>
            </a>
            <a href="#loop" className={secondaryCtaClass}>
              See the operating loop
            </a>
          </div>
        </div>
        {/* Ledger strip: file counts in the repository, nothing else. */}
        <div className="border-t border-rule bg-surface">
          <ul
            data-rz-stagger
            className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[color:var(--rule)]"
          >
            {[
              { v: "6", l: "stages, six gates" },
              { v: "67", l: "fill-in templates" },
              { v: "11", l: "PM canon cards" },
              { v: "10", l: "domain cards" },
            ].map((p) => (
              <li key={p.l} className="px-5 py-6 sm:px-6 md:py-8">
                <div className="font-mono-tech text-xl md:text-2xl text-ink leading-none tabular-nums">
                  {p.v}
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft mt-2 font-mono-tech">
                  {p.l}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ── The problem it answers ── */}
      <section className="border-b border-rule" aria-labelledby="problem-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ The problem
            </div>
            <h2
              id="problem-heading"
              className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-snug"
            >
              A PM&apos;s tools are scattered, and judgment lives nowhere.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Discovery lives in one product, specs in another, delivery in a tracker. The templates
              a PM actually uses arrive as screenshots of somebody else&apos;s Notion, the advice
              arrives as a thread, and neither one tells you what has to be true before the next
              stage opens.
            </p>
            <p>
              The strongest open systems each own one segment. One owns spec to code, one owns
              discovery, one owns agentic build. None of them chains discovery through requirements,
              architecture, delivery and post-launch verification in a single system, and none
              carries a regulated overlay, a canon layer with named attribution, tiered model
              routing or a consistency gate across the whole tree.
            </p>
            <p>
              The AI era made this worse rather than better. A model will happily produce a
              confident PRD from thin evidence, and there is no structure in the default workflow
              that stops it. This repository is my answer: the whole loop in one place, with gates
              that can fail, and with the model demoted from author to accelerant.
            </p>
          </div>
        </div>
      </section>

      {/* ── The operating loop, drawn ── */}
      <section
        id="loop"
        className="rz-beam relative border-b border-rule"
        aria-labelledby="loop-heading"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
            ◆ The operating loop
          </div>
          <h2 id="loop-heading" className="font-instrument text-2xl md:text-3xl text-ink mt-3">
            Six stages. Six gates. A gate that cannot fail is a ceremony.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            One product runs through six stages. A stage opens when the previous gate is signed and
            closes when its own gate is signed. Gates are documents, not meetings: a gate passes
            when its checklist is filled in and signed, and a gate with an unknown on it does not
            pass.
          </p>

          <figure className="mt-8">
            <ol data-rz-stagger className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {stages.map((s) => (
                <li
                  key={s.stage}
                  className="flex flex-col border border-rule bg-card px-4 py-5 rounded-lg"
                >
                  <span
                    className="font-mono-tech text-[11px] tracking-[0.22em] text-[var(--brand)]"
                    aria-hidden
                  >
                    {s.n}
                  </span>
                  <span className="font-instrument text-xl text-ink mt-1.5 leading-tight">
                    {s.stage}
                  </span>
                  <span className="mt-4 pt-3 border-t border-rule text-[10px] uppercase tracking-[0.16em] text-[var(--accent-emerald)] font-mono-tech">
                    {s.gate}
                  </span>
                  <span className="mt-1.5 text-xs leading-snug text-ink-soft">{s.gateName}</span>
                </li>
              ))}
            </ol>
            <div className="mt-3 flex items-center gap-3 border border-rule border-dashed bg-surface px-4 py-3 rounded-lg">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                Gate 6 loops back to Discover
              </span>
              <span className="flex-1 border-t border-rule border-dashed" aria-hidden />
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                persist · pivot · sunset
              </span>
            </div>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {overlays.map((o) => (
                <li key={o.name} className="border border-rule bg-surface px-4 py-4 rounded-lg">
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-ink">
                    {o.name}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{o.body}</p>
                </li>
              ))}
            </ul>
            <figcaption className="mt-5 text-xs text-ink-soft font-mono-tech tracking-wide leading-relaxed">
              The loop is defined in os/OPERATING-LOOP.md and the gate checklists in
              os/STAGE-GATES.md. The three tracks above run across every stage rather than inside
              one of them.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── What is actually in the repository ── */}
      <section className="border-b border-rule" aria-labelledby="layers-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ What it is
          </div>
          <h2 id="layers-heading" className="font-instrument text-2xl md:text-3xl text-ink mt-3">
            Six layers, and dependencies that point one way.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Templates cite knowledge cards. Skills cite templates. System prompts cite skills and
            templates by exact repo path. Routing serves all of them. Nothing in the knowledge,
            role, domain or template layer depends on an AI layer existing, which is what makes the
            first usage method below possible.
          </p>
          <ul
            data-rz-stagger
            className="mt-8 divide-y divide-[color:var(--rule)] border-y border-rule"
          >
            {layers.map((l) => (
              <li key={l.dir} className="py-6 md:grid md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <div className="font-mono-tech text-sm text-[var(--brand)]">{l.dir}</div>
                  <div className="font-display text-base text-ink mt-1">{l.label}</div>
                </div>
                <p className="mt-2 md:mt-0 md:col-span-9 text-sm leading-relaxed text-ink-soft">
                  {l.answers}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The four usage methods ── */}
      <section className="rz-beam relative border-b border-rule" aria-labelledby="methods-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
            ◆ How it works
          </div>
          <h2 id="methods-heading" className="font-instrument text-2xl md:text-3xl text-ink mt-3">
            Say &quot;start.&quot; The Conductor interviews before it writes.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            The fastest way in is a conversation. The Conductor, the interviewer defined in
            os/CONDUCTOR.md, runs the six stages above as a sequence of interviews rather than a
            blank template. It asks one question at a time, and a vague answer gets cross-examined,
            at most twice, against an evidence ladder that runs from observed behavior down to team
            belief, then is either accepted as offered or parked with an owner and a date. A stage
            does not open until the previous gate passes on evidence, and the Conductor never signs
            it, a named human does.
          </p>
          <ul data-rz-stagger className="mt-6 grid gap-3 sm:grid-cols-2">
            {conductorPoints.map((point) => (
              <li
                key={point}
                className="flex gap-2.5 rounded-lg border border-rule bg-surface px-4 py-3 text-sm leading-relaxed text-ink-soft"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-instrument text-lg md:text-xl text-ink mt-10">
            Four ways to run it, with or without the interview.
          </h3>
          <div data-rz-stagger className="mt-6 grid gap-4 md:grid-cols-2">
            {methods.map((m) => (
              <article
                key={m.n}
                data-glow
                className="relative flex flex-col rounded-lg border border-rule bg-card p-6 transition-colors hover:border-ink/30"
              >
                <span
                  className="font-mono-tech text-[11px] tracking-[0.22em] text-[var(--brand)]"
                  aria-hidden
                >
                  {m.n}
                </span>
                <h3 className="font-instrument text-xl md:text-2xl text-ink mt-2 leading-tight">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
            The boot prompt is model agnostic on purpose. It assumes no file access, carries a
            manifest of every file in the repository so it asks by exact path instead of inventing
            one, and it installs the same gate discipline whether the session is running on a
            frontier model or a free one.
          </p>
        </div>
      </section>

      {/* ── The regulated module ── */}
      <section className="border-b border-rule" aria-labelledby="regulated-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ The regulated module
            </div>
            <h2
              id="regulated-heading"
              className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-snug"
            >
              Where this came from, and why it is pinned.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              The OS grew out of an earlier repository of mine, a PRD system for AI features that
              ship under a financial or data regulator. That system is imported here in full as{" "}
              <span className="font-mono-tech text-sm text-ink">modules/regulated/</span>: a
              section-zero regulatory overlay, eval-set acceptance criteria, guardrails with named
              owners, and its own review gate. It activates at Gate 2, before requirements freeze,
              and again at Gate 5, before release.
            </p>
            <p>
              The citation-bearing files inside the module are byte-exact copies, pinned by hash in
              the quality gate and never edited here. A fix happens in the source repository and is
              re-copied. That is deliberate: a compliance artifact that quietly drifts from its
              source is worse than no artifact, because it still looks maintained.
            </p>
            <p>
              This is also the reason the wider repo does not assume a US software company.
              Discovery and compliance templates ask for markets, jurisdictions and locales as
              first-class fields, and the planning material treats a regulator&apos;s calendar as
              something that outranks a prioritization score.
            </p>
            <p>
              <a
                href={REGULATED_REPO_URL}
                rel="noopener"
                data-analytics-event="cta_click"
                data-analytics-cta-id="pmos_regulated_repo"
                data-analytics-cta-location="pmos_regulated"
                data-analytics-cta-destination={REGULATED_REPO_URL}
                className="text-ink underline-offset-4 hover:underline hover:text-[var(--brand)] transition-colors"
              >
                Read the regulated AI PRD module →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Who it is for, and what it is not ── */}
      <section className="border-b border-rule" aria-labelledby="audience-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-emerald)] font-mono-tech">
            ◆ Who it is for
          </div>
          <h2 id="audience-heading" className="font-instrument text-2xl md:text-3xl text-ink mt-3">
            Built for the PM who has to sign the gate.
          </h2>
          <div data-rz-stagger className="mt-8 grid gap-4 md:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-lg border border-rule bg-surface p-6">
                <h3 className="font-display text-base text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-rule bg-card p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
              What it is not
            </div>
            <ul className="mt-3 space-y-2.5">
              {limits.map((l) => (
                <li key={l} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Contribution path ── */}
      <section className="border-b border-rule" aria-labelledby="contribute-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
              ◆ Contributing
            </div>
            <h2
              id="contribute-heading"
              className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-snug"
            >
              Small and specific beats large and sweeping.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Issues and pull requests are open, and I merge everything personally. A new template
              needs a real problem statement in the pull request, fill-in fields with guidance, and
              an exit gate at the bottom. A knowledge card needs the framework in your own words
              with a named attribution line, never reproduced book text. Skills follow the two-field
              frontmatter convention, and a skill that needs a paid tool to work will not be merged.
            </p>
            <p>
              One rule governs everything else: any factual claim carries a public source, and
              unsourced numbers are removed on sight. Template field names and file paths stay
              stable within a major version, so a copy you filled in last quarter keeps matching the
              template it came from.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              <a
                href={CONTRIBUTING_URL}
                rel="noopener"
                className="text-ink underline-offset-4 hover:underline hover:text-[var(--brand)] transition-colors"
              >
                Contribution guide →
              </a>
              <a
                href={ISSUES_URL}
                rel="noopener"
                className="text-ink underline-offset-4 hover:underline hover:text-[var(--brand)] transition-colors"
              >
                Open an issue →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing rail ── */}
      <section className="rz-beam relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16 flex flex-wrap gap-x-8 gap-y-5 items-center justify-between">
          <p className="max-w-xl font-instrument text-xl md:text-2xl text-ink leading-snug">
            Clone it, fork it, or tell me where it breaks.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={REPO_URL}
              rel="noopener"
              data-analytics-event="cta_click"
              data-analytics-cta-id="pmos_github"
              data-analytics-cta-location="pmos_footer"
              data-analytics-cta-destination={REPO_URL}
              className="inline-flex h-11 items-center rounded-full bg-ink text-background px-5 text-sm font-medium hover:bg-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              GitHub repository
            </a>
            <Link
              to="/products"
              className="inline-flex h-11 items-center rounded-full border border-ink/20 px-5 text-sm text-ink hover:border-ink/50 hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Other products
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full border border-ink/20 px-5 text-sm text-ink hover:border-ink/50 hover:bg-ink/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
