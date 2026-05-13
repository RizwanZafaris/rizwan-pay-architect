import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Rizwan Zafar | Payments Product Executive" },
      {
        name: "description",
        content:
          "Resume of Rizwan Zafar — Payments Product Executive: $1B+ GTV, 25M+ monthly transactions, settlement, KYC/KYB, AML/CFT, fraud, cross-border and FX.",
      },
      { property: "og:title", content: "Resume — Rizwan Zafar" },
      { property: "og:description", content: "Executive resume — payments product, infrastructure and risk." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Resume</div>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
            {profile.name}
          </h1>
          <p className="mt-2 text-ink-soft">{profile.role} · {profile.location}</p>
        </div>
        <a
          href={profile.resumeHref}
          download
          className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
        >
          Download Resume (PDF)
        </a>
      </div>

      <section className="mt-10">
        <p className="text-lg text-ink leading-relaxed font-display">{profile.positioning}</p>
      </section>

      <section className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 border-y border-rule py-6">
        {profile.metrics.map((m) => (
          <div key={m.label}>
            <div className="font-display text-xl text-ink">{m.value}</div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft mt-1">{m.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink mb-6">Experience</h2>
        <div className="space-y-10">
          {profile.experience.map((e) => (
            <div key={e.company} className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3 text-sm text-ink-soft">
                <div>{e.period}</div>
                <div className="text-[11px] uppercase tracking-[0.12em] mt-1">{e.location}</div>
              </div>
              <div className="md:col-span-9">
                <div className="font-display text-lg text-ink">{e.role} · {e.company}</div>
                <ul className="mt-3 space-y-2 text-ink-soft">
                  {e.bullets.map((b) => (
                    <li key={b} className="pl-4 relative">
                      <span className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-accent-emerald" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {profile.skills.map((s) => (
            <div key={s.group}>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft mb-3">{s.group}</div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span key={i} className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink bg-surface">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Education</h2>
          <ul className="space-y-4">
            {profile.education.map((e) => (
              <li key={`${e.school}-${e.degree}`}>
                <div className="font-display text-base text-ink">{e.degree}</div>
                <div className="text-sm text-ink-soft">{e.school}</div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mt-1">
                  {e.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Certifications</h2>
          <ul className="space-y-2 text-ink-soft">
            {profile.certifications.map((c) => <li key={c}>· {c}</li>)}
          </ul>
          <h2 className="font-display text-2xl text-ink mb-4 mt-10">Honors</h2>
          <ul className="space-y-3">
            {profile.honors.map((h) => (
              <li key={h.title}>
                <div className="font-display text-base text-ink">{h.title}</div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mt-1">
                  {h.issuer} · {h.year}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Volunteering</h2>
          <ul className="space-y-4">
            {profile.volunteering.map((v) => (
              <li key={`${v.org}-${v.role}`}>
                <div className="font-display text-base text-ink">{v.role}</div>
                <div className="text-sm text-ink-soft">{v.org}</div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mt-1">
                  {v.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Open to roles in</h2>
          <div className="flex flex-wrap gap-2">
            {profile.openRolesIn.map((r) => (
              <span key={r} className="text-xs px-2.5 py-1 border border-rule rounded-full text-ink bg-surface">
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-rule pt-8">
        <a
          href={profile.resumeHref}
          download
          className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors"
        >
          Download Resume (PDF)
        </a>
      </section>
    </div>
  );
}
