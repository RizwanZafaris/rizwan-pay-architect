import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rizwan Zafar | Payments Product Executive (Dubai)" },
      {
        name: "description",
        content:
          "Open to senior product and payment infrastructure roles in UAE, KSA, Singapore, MENA, Europe and global fintech companies. Get in touch.",
      },
      { property: "og:title", content: "Contact Rizwan Zafar" },
      {
        property: "og:description",
        content: "Open to senior payments product roles. Based in Dubai.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-2 gap-16">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Contact</div>
        <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
          Let's talk payments.
        </h1>
        <p className="mt-5 text-ink-soft text-lg">
          Based in {profile.location}. Open to senior product and payment infrastructure roles in
          UAE, KSA, Singapore, MENA, Europe and global fintech companies.
        </p>
        <div className="mt-10 space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink transition-colors group"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Email</div>
              <div className="font-display text-lg text-ink">{profile.email}</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink transition-colors group"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">LinkedIn</div>
              <div className="font-display text-lg text-ink">/in/rizwanzafar</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <a
            href={profile.personalSite}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink transition-colors group"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Personal site</div>
              <div className="font-display text-lg text-ink">rizwan-zafar.com</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border border-rule rounded-lg px-5 py-4 hover:border-ink transition-colors group"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Twitter / X</div>
              <div className="font-display text-lg text-ink">@rizwan_zafar</div>
            </div>
            <span className="text-ink-soft group-hover:text-ink">→</span>
          </a>
          <div className="border border-rule rounded-lg px-5 py-4">
            <div className="text-xs uppercase tracking-[0.14em] text-ink-soft">Location</div>
            <div className="font-display text-lg text-ink">{profile.location}</div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-rule rounded-lg p-8">
        <h2 className="font-display text-xl text-ink">Send a message</h2>
        {submitted ? (
          <div className="mt-6 text-ink-soft">
            Thank you — your message has been queued. I'll respond from {profile.email}.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="name">Name</label>
              <input id="name" required className="mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:border-ink" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="email">Email</label>
              <input id="email" type="email" required className="mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:border-ink" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="company">Company</label>
              <input id="company" className="mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:border-ink" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.12em] text-ink-soft" htmlFor="msg">Message</label>
              <textarea id="msg" required rows={5} className="mt-1 w-full border border-rule bg-background px-3 py-2 rounded-md text-ink focus:outline-none focus:border-ink" />
            </div>
            <button type="submit" className="inline-flex items-center rounded-md bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors">
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
