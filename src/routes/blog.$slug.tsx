import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPost, getRelated, isPostPublished, publishedPosts, type Post } from "@/data/posts";
import { profile } from "@/data/profile";
import { PLATFORM } from "@/content/facts";
import { hubForPost } from "@/data/hubs";
import { absUrl, SITE_URL, OG_IMAGE_URL, titleFor, trimToMax } from "@/lib/seo";
import { DiagramFigure, postDiagrams } from "@/components/diagrams/Diagrams";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { trackEvent } from "@/lib/analytics";
import { marked } from "marked";
// 64×64 author avatar (24KB WebP, same asset the /about hero uses).
import authorPortrait from "@/assets/rizwan-zafar-cutout-460.webp";

const OG_IMAGE_OVERRIDES: Record<string, string> = {
  "uae-einvoicing-provider-readiness-gates":
    "/og/blog/uae-einvoicing-provider-readiness-gates-v2026081301.png",
  "fednow-intermediary-banks-cross-border-rulebook":
    "/og/blog/fednow-intermediary-banks-cross-border-rulebook-v20260812.png",
  "openai-daybreak-cyber-access-control-model":
    "/og/blog/openai-daybreak-cyber-access-control-model-v20260812.png",
  "psr-app-fraud-reimbursement-control-loop":
    "/og/blog/psr-app-fraud-reimbursement-control-loop-v20260811.png",
  "marqeta-riskified-issuer-authorization-false-declines":
    "/og/blog/marqeta-riskified-issuer-authorization-false-declines-v20260810.png",
  "checkout-uae-svf-liquidity-controls":
    "/og/blog/checkout-uae-svf-liquidity-controls-v20260809.png",
  "boe-payment-third-party-risk-programme-gates":
    "/og/blog/boe-payment-third-party-risk-programme-gates-v20260809.png",
  "solana-pay-agent-payment-approval-controls":
    "/og/blog/solana-pay-agent-payment-approval-controls-v20260809.png",
  "splitit-1stmile-card-linked-installment-controls":
    "/og/blog/splitit-1stmile-card-linked-installment-controls-v20260808.png",
  "uk-open-banking-billion-payments-product-scorecard":
    "/og/blog/uk-open-banking-billion-payments-product-scorecard-v20260808.png",
  "worldline-digital-euro-pilot-programme-gates":
    "/og/blog/worldline-digital-euro-pilot-programme-gates-v20260808.png",
  "github-copilot-agent-metrics-adoption-governance":
    "/og/blog/github-copilot-agent-metrics-adoption-governance-v20260808.png",
  "visa-intelligent-authorisation-acquirer-routing-evidence":
    "/og/blog/visa-intelligent-authorisation-acquirer-routing-evidence-v20260806.png",
  "adyen-personalize-checkout-product-governance":
    "/og/blog/adyen-personalize-checkout-product-governance-v20260806.png",
  "pwc-label-carf-reporting-programme-gates":
    "/og/blog/pwc-label-carf-reporting-programme-gates-v20260806.png",
  "openai-hugging-face-eval-containment-controls":
    "/og/blog/openai-hugging-face-eval-containment-controls-v20260806.png",
  "thredd-pliant-us-credit-issuing-controls":
    "/og/blog/thredd-pliant-us-credit-issuing-controls-v20260805.png",
  "openai-presence-agent-product-change-loop":
    "/og/blog/openai-presence-agent-product-change-loop-v20260805.png",
  "deepmind-ai-control-roadmap-programme-gates":
    "/og/blog/deepmind-ai-control-roadmap-programme-gates-v20260805.png",
  "loopx-agent-state-kernel-governance":
    "/og/blog/loopx-agent-state-kernel-governance-v20260805.png",
  "adyen-peak-season-acquiring-control-room":
    "/og/blog/adyen-peak-season-acquiring-control-room-v20260804.png",
  "which-moneysupermarket-comparison-trust-loop":
    "/og/blog/which-moneysupermarket-comparison-trust-loop-v20260804.png",
  "kaneo-minimal-pmo-governance-boundary":
    "/og/blog/kaneo-minimal-pmo-governance-boundary-v20260804.png",
  "tencentdb-agent-memory-governance":
    "/og/blog/tencentdb-agent-memory-governance-v20260804.png",
  "mastercard-scam-merchant-monitoring-acquirer-operations":
    "/og/blog/mastercard-scam-merchant-monitoring-acquirer-operations-v20260801.png",
  "natwest-uinsure-home-insurance-tracker-product-loop":
    "/og/blog/natwest-uinsure-home-insurance-tracker-product-loop-v20260801.png",
  "scotpayments-2-platform-migration-resilience-programme":
    "/og/blog/scotpayments-2-platform-migration-resilience-programme-v20260801.png",
  "github-copilot-gemini-deprecation-model-fallback-contract":
    "/og/blog/github-copilot-gemini-deprecation-model-fallback-contract-v20260801.png",
  "marqeta-zerohash-stablecoin-card-programme-controls":
    "/og/blog/marqeta-zerohash-stablecoin-card-programme-controls-v20260728.png",
  "microsoft-project-perception-agentic-security-stack":
    "/og/blog/microsoft-project-perception-agentic-security-stack-v20260728.png",
  "idenfy-card-verification-risk-gate": "/og/blog/idenfy-card-verification-risk-gate-v2026072701.png",
  "ecommpay-small-business-payments-product-ladder":
    "/og/blog/ecommpay-small-business-payments-product-ladder-v2026072701.png",
  "mastercard-virtual-card-controls-programme-gates":
    "/og/blog/mastercard-virtual-card-controls-programme-gates-v2026072701.png",
  "alibaba-open-code-review-agent-governance":
    "/og/blog/alibaba-open-code-review-agent-governance-v2026072701.png",
  "capital-one-discover-network-issuer-routing-strategy":
    "/og/blog/capital-one-discover-network-issuer-routing-strategy-v20260722.png",
  "klarna-bnpl-economics-product-scorecard":
    "/og/blog/klarna-bnpl-economics-product-scorecard-v20260722.png",
  "mambu-swift-connectivity-programme-operating-model":
    "/og/blog/mambu-swift-connectivity-programme-operating-model-v20260722.png",
  "agent-payment-guard-x402-risk-gates":
    "/og/blog/agent-payment-guard-x402-risk-gates-v20260722.png",
  "checkout-friction-acceptance-operating-model":
    "/og/blog/checkout-friction-acceptance-operating-model-v20260721.png",
  "adyen-orb-talonone-product-integration-model":
    "/og/blog/adyen-orb-talonone-product-integration-model-v20260721.png",
  "omniroute-ai-gateway-routing-control-model":
    "/og/blog/omniroute-ai-gateway-routing-control-model-v20260721.png",
  "marqeta-stip-issuer-resilience-operating-model":
    "/og/blog/marqeta-stip-issuer-resilience-operating-model-v20260720.png",
  "stripe-projects-agent-product-controls":
    "/og/blog/stripe-projects-agent-product-controls-v20260720.png",
  "ktransformers-local-inference-cost-control":
    "/og/blog/ktransformers-local-inference-cost-control-v20260720.png",
  "acceptance-rate-operating-model": "/og/blog/acceptance-rate-operating-model-v20260719.png",
  "spreedly-standalone-vault-product-strategy":
    "/og/blog/spreedly-standalone-vault-product-strategy-v20260719.png",
  "wero-migration-delivery-gates": "/og/blog/wero-migration-delivery-gates-v20260719.png",
  "nvidia-langchain-agent-harness-evals":
    "/og/blog/nvidia-langchain-agent-harness-evals-v20260719.png",
  "mastercard-wallet-services-tokenization-operating-model":
    "/og/blog/mastercard-wallet-services-tokenization-operating-model-v20260717.png",
  "caixabank-merchant-platform-product-system":
    "/og/blog/caixabank-merchant-platform-product-system-v20260717.png",
  "uk-financial-services-ai-adoption-plan-delivery-governance":
    "/og/blog/uk-financial-services-ai-adoption-plan-delivery-governance-v20260717.png",
  "microsoft-foundry-production-agent-control-plane":
    "/og/blog/microsoft-foundry-production-agent-control-plane-v20260717.png",
  "ajman-bank-afs-merchant-acquiring-operating-model":
    "/og/blog/ajman-bank-afs-merchant-acquiring-operating-model-v20260715.png",
  "checkout-ai-payment-optimization-control-loops":
    "/og/blog/checkout-ai-payment-optimization-control-loops-v20260715.png",
  "satispay-mastercard-wallet-card-programme":
    "/og/blog/satispay-mastercard-wallet-card-programme-v20260709.png",
  "pnc-mobile-app-modernization-product-migration":
    "/og/blog/pnc-mobile-app-modernization-product-migration-v20260709.png",
  "baringa-uk-payments-migration-delivery-gates":
    "/og/blog/baringa-uk-payments-migration-delivery-gates-v20260709.png",
  "github-copilot-opentelemetry-agent-auditability":
    "/og/blog/github-copilot-opentelemetry-agent-auditability-v20260709.png",
  "checkout-unified-payin-payout-control-plane":
    "/og/blog/checkout-unified-payin-payout-control-plane-v20260707.png",
  "agent-skills-ai-coding-operating-model":
    "/og/blog/agent-skills-ai-coding-operating-model-v20260707.png",
  "cross-river-stripe-agentic-card-mandate-controls":
    "/og/blog/cross-river-stripe-agentic-card-mandate-controls-v20260706.png",
  "amex-apple-pay-rewards-wallet-control-plane":
    "/og/blog/amex-apple-pay-rewards-wallet-control-plane-v20260705.png",
  "github-copilot-agent-session-streaming-governance":
    "/og/blog/github-copilot-agent-session-streaming-governance-v20260705.png",
  "adyen-refund-concentration-fraud-lifecycle-controls":
    "/og/blog/adyen-refund-concentration-fraud-lifecycle-controls-v20260704.png",
  "uk-retail-payments-core-product-programme-boundary":
    "/og/blog/uk-retail-payments-core-product-programme-boundary-v20260704.png",
  "amex-network-international-uae-acceptance-operating-model":
    "/og/blog/amex-network-international-uae-acceptance-operating-model-v20260703.png",
  "github-models-retirement-ai-platform-exit-plan":
    "/og/blog/github-models-retirement-ai-platform-exit-plan-v20260702.png",
  "visa-mastercard-open-usd-stablecoin-network-economics":
    "/og/blog/visa-mastercard-open-usd-stablecoin-network-economics-v20260701.png",
  "processor-only-card-issuing-operating-model":
    "/og/blog/processor-only-card-issuing-operating-model-v20260701.png",
  "gov-uk-pay-adyen-1000-service-migration":
    "/og/blog/gov-uk-pay-adyen-1000-service-migration-v20260630.png",
  "mercado-pago-claude-plugin-payment-integration-agent":
    "/og/blog/mercado-pago-claude-plugin-payment-integration-agent-v20260630.png",
  "revolut-adyen-uae-licences-dubai-fintech-signal":
    "/og/blog/revolut-adyen-uae-licences-dubai-fintech-signal-v20260630.png",
  "adyen-uae-license-merchant-acquiring-local-settlement":
    "/og/blog/adyen-uae-license-merchant-acquiring-local-settlement-v20260630.png",
  "lean-ziina-uae-one-tap-pay-by-bank": "/og/blog/lean-ziina-uae-one-tap-pay-by-bank-v20260627.png",
  "gocardless-sequence-direct-debit-product-design":
    "/og/blog/gocardless-sequence-direct-debit-product-design-v20260627.png",
  "us-bank-gigsafe-instant-payout-programme":
    "/og/blog/us-bank-gigsafe-instant-payout-programme-v20260627.png",
  "forter-ai-agents-commerce-risk-radar":
    "/og/blog/forter-ai-agents-commerce-risk-radar-v20260627.png",
  "visa-dcap-acquiring-economics-data-only-3ds":
    "/og/blog/visa-dcap-acquiring-economics-data-only-3ds-v20260627.png",
  "github-desktop-worktrees-ai-agent-control":
    "/og/blog/github-desktop-worktrees-ai-agent-control-v20260627.png",
  "thredd-sutton-bin-sponsorship-operating-model":
    "/og/blog/thredd-sutton-bin-sponsorship-operating-model-v20260630.png",
  "authorization-rate-merchant-pnl-operating-model":
    "/og/blog/authorization-rate-merchant-pnl-operating-model-v20260630.png",
  "openai-broadcom-jalapeno-ai-unit-economics":
    "/og/blog/openai-broadcom-jalapeno-ai-unit-economics-v20260629.png",
};

// Pull Q&A pairs out of a "## FAQ" section so we can emit FAQPage JSON-LD.
// Question lines are "**…?**" inside the section; the answer is everything until the next "**…?**".
function extractFAQs(md: string): { question: string; answer: string }[] {
  // Find the FAQ heading.
  const headingMatch = md.match(/^##\s+(?:FAQ|Frequently Asked Questions)\s*$/im);
  if (!headingMatch || headingMatch.index === undefined) return [];

  // Slice from after the FAQ heading to either the next H2 (end of section) or end of document.
  const afterHeading = md.slice(headingMatch.index + headingMatch[0].length);
  const nextSectionMatch = afterHeading.match(/^##\s/m);
  const body = nextSectionMatch?.index
    ? afterHeading.slice(0, nextSectionMatch.index)
    : afterHeading;
  if (!body.trim()) return [];

  // Split on "**…?**" question lines. Skip the first chunk (everything before the first Q).
  const parts = body.split(/^\s*\*\*(.+?\?)\*\*\s*/m);
  const out: { question: string; answer: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const question = parts[i].trim();
    const answer = (parts[i + 1] ?? "").replace(/\s+/g, " ").trim();
    if (question && answer) out.push({ question, answer });
  }
  return out;
}

// Detect a sequential step/checklist structure ("## Step 1: …" or "## 1. …")
// and emit HowTo JSON-LD — one of the most-lifted formats for AI Overviews &
// voice answers. Only fires when ≥3 ordered step-headings exist, so ordinary
// essays don't get mis-tagged.
function extractHowToSteps(md: string): { name: string; text: string }[] {
  const lines = md.split("\n");
  const isStep = (h: string) => /^(step\s+\d+\b|\d+[.):]\s)/i.test(h.trim());
  const steps: { name: string; buf: string[] }[] = [];
  let cur: { name: string; buf: string[] } | null = null;
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      if (cur) steps.push(cur);
      const heading = h2[1].replace(/\*\*/g, "").trim();
      cur = isStep(heading) ? { name: heading, buf: [] } : null;
      continue;
    }
    if (cur) cur.buf.push(line);
  }
  if (cur) steps.push(cur);
  return steps
    .map((s) => ({
      name: s.name,
      text: s.buf
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`#>]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 320),
    }))
    .filter((s) => s.text);
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    // Dynamic import so the heavy posts-content map (~150KB minified) does not get
    // bundled into the main entry chunk. Vite splits this into its own lazy chunk
    // that is only fetched when a /blog/$slug route is hit.
    const { getPostContent } = await import("@/data/posts-content");
    return { post, content: getPostContent(params.slug) ?? "", related: getRelated(params.slug) };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const content = loaderData?.content ?? "";
    if (!p) return { meta: [{ title: "Essay" }] };
    const url = absUrl(`/blog/${params.slug}`);
    const published = isPostPublished(p);
    const ogImagePath = OG_IMAGE_OVERRIDES[params.slug] ?? `/og/blog/${params.slug}.png`;
    const ogImage = published ? absUrl(ogImagePath) : OG_IMAGE_URL;
    const wordCount = content.trim().split(/\s+/).length;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: p.title,
      description: p.description,
      image: [ogImage],
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
        name: profile.name,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
        name: profile.name,
        url: SITE_URL,
      },
      keywords: p.tags.join(", "),
      articleSection: p.category,
      wordCount,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: "rzifi.com" },
      about: [
        { "@type": "Thing", name: p.category },
        ...p.tags.slice(0, 8).map((tag) => ({ "@type": "Thing", name: tag })),
      ],
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      // Speakable: tells Google Assistant / AI Overviews / voice answer
      // engines which parts of the page to read aloud. We mark the H1 and
      // the first paragraph of body (`.prose-editorial > p:first-of-type`).
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".prose-editorial > p:first-of-type"],
      },
    };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Essays", item: absUrl("/blog") },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    };

    const faqs = extractFAQs(content);
    const faqJsonLd =
      faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }
        : null;

    const howToSteps = extractHowToSteps(content);
    const howToJsonLd =
      howToSteps.length >= 3
        ? {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: p.title,
            description: p.description,
            step: howToSteps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.name,
              text: s.text,
            })),
          }
        : null;

    const scripts: Array<{ type: string; children: string }> = [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
      { type: "application/ld+json", children: JSON.stringify(crumbs) },
    ];
    if (faqJsonLd)
      scripts.push({ type: "application/ld+json", children: JSON.stringify(faqJsonLd) });
    if (howToJsonLd)
      scripts.push({ type: "application/ld+json", children: JSON.stringify(howToJsonLd) });

    // Use frontmatter `metaTitle` if it fits, else append the brand suffix
    // when the title is short enough, else smart-truncate.
    const titleTag = titleFor(p.title, { meta: p.metaTitle });
    // Meta description must stay under 160 chars (Google snippet truncation).
    // Many frontmatter `metaDescription`s exceed that — smart-trim here so
    // we don't have to hand-edit 55 markdown files.
    const metaDescription = trimToMax(p.description, 160);

    return {
      meta: [
        { title: titleTag },
        { name: "description", content: metaDescription },
        ...(!published ? [{ name: "robots", content: "noindex, follow" }] : []),
        { name: "keywords", content: p.tags.join(", ") },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:alt", content: `${p.title} — ${profile.name}` },
        { property: "article:published_time", content: p.date },
        { property: "article:modified_time", content: p.updated ?? p.date },
        { property: "article:section", content: p.category },
        { property: "article:author", content: profile.name },
        ...p.tags.map((tag) => ({ property: "article:tag", content: tag })),
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:image:alt", content: `${p.title} — ${profile.name}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">Essay not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-brand underline">
        Back to essays
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-instrument text-3xl text-ink">This essay could not be loaded</h1>
      <p className="mt-4 text-ink-soft">{error.message}</p>
      <Link to="/blog" className="mt-6 inline-block text-brand underline">
        Back to essays
      </Link>
    </div>
  ),
  component: BlogPostPage,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatArticleDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

marked.use({
  renderer: {
    checkbox({ checked }) {
      // Task-list boxes are visual reading aids, not operable form controls.
      // Keep them visible while removing inert, unlabeled controls from the
      // accessibility tree.
      return `<input ${checked ? 'checked="" ' : ""}disabled="" type="checkbox" aria-hidden="true" tabindex="-1"> `;
    },
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugify(tokens.map((t) => t.raw ?? "").join(""));
      // The essay body was the longest static surface on the site: an animated
      // header and a staggered "related" footer sandwiching a motionless wall
      // of prose. motion.css defines exactly ONE sanctioned reveal for this —
      // `.rz-section-head[data-rz-reveal]`, a 14px rise + fade over
      // --dur-section — and, remarkably, it was applied to zero elements
      // anywhere in the codebase. This is its canonical home.
      //
      // Scoped to depth === 2 on purpose. The renderer handles every depth, and
      // the contract says SECTION HEADINGS only; letting `###` sub-points rise
      // too would turn "one beat per argument turn" into "everything moves".
      // The engine (__root.tsx) already observes [data-rz-reveal], so this adds
      // no JS, and the reduced-motion / no-JS paths are already covered.
      const reveal = depth === 2 ? ' data-rz-reveal class="rz-section-head"' : "";
      return `<h${depth} id="${id}"${reveal}>${text}</h${depth}>\n`;
    },
  },
});

function renderContent(md: string) {
  const html = marked.parse(stripUnpublishedBlogLinks(md), { async: false }) as string;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const publishedSlugs = new Set(publishedPosts.map((p) => p.slug));

function stripUnpublishedBlogLinks(md: string) {
  return md.replace(/\[([^\]]+)\]\(\/blog\/([^/#?)]+)\/?\)/g, (match, label, slug) =>
    publishedSlugs.has(slug) ? match : label,
  );
}

function extractTOC(md: string) {
  return md
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => {
      const text = l.replace(/^##\s+/, "").trim();
      return { id: slugify(text), text };
    });
}

const ARTICLE_UTILITIES_SCRIPT = `(() => {
  const article = document.querySelector('[data-article-reader]');
  if (!article || article.dataset.bound === 'true') return;
  article.dataset.bound = 'true';
  const html = document.documentElement;
  html.classList.add('article-reader-active');
  const body = article.querySelector('[data-article-body]');
  const bar = article.querySelector('[data-article-progress] > span');
  const rail = article.querySelector('[data-article-rail-progress]');
  const links = [...article.querySelectorAll('[data-article-toc-link]')];
  const ids = [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))];
  const headings = ids.map((href) => document.getElementById(href.slice(1))).filter(Boolean);
  const mapNav = article.querySelector('[data-article-map-nav]');
  const marker = article.querySelector('[data-article-toc-marker]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const controller = 'AbortController' in window ? new AbortController() : null;
  const manualCleanups = [];
  const timers = new Set();
  const listen = (target, type, handler, options = {}) => {
    if (controller) target.addEventListener(type, handler, { ...options, signal: controller.signal });
    else {
      target.addEventListener(type, handler, options);
      manualCleanups.push(() => target.removeEventListener(type, handler, options));
    }
  };
  const later = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
    return timer;
  };
  const clearLater = (timer) => {
    if (!timer) return;
    window.clearTimeout(timer);
    timers.delete(timer);
  };

  let frame = 0;
  let measureFrame = 0;
  let readyFrame = 0;
  let lifecycle = null;
  let resizeObserver = null;
  let cleaned = false;
  let progressStart = 0;
  let progressLength = 1;
  let headingPoints = [];
  let activeId = null;

  const transitionTitle = article.querySelector('[data-essay-transition-target]');
  const clearTransitionNames = () => {
    article.querySelectorAll('[data-essay-transition-title],[data-essay-transition-target]').forEach((node) => {
      node.style.removeProperty('view-transition-name');
      node.removeAttribute('data-shared-title-active');
    });
  };
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    if (controller) controller.abort();
    manualCleanups.forEach((dispose) => dispose());
    if (lifecycle) lifecycle.disconnect();
    if (resizeObserver) resizeObserver.disconnect();
    if (frame) cancelAnimationFrame(frame);
    if (measureFrame) cancelAnimationFrame(measureFrame);
    if (readyFrame) cancelAnimationFrame(readyFrame);
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
    clearTransitionNames();
    html.classList.remove('article-reader-active');
  };

  if ('MutationObserver' in window && document.body) {
    lifecycle = new MutationObserver(() => {
      if (article.isConnected) return;
      cleanup();
    });
    lifecycle.observe(document.body, { childList: true, subtree: true });
  }

  const supportsSharedTitle =
    !reduceMotion && 'CSS' in window && CSS.supports('view-transition-name: essay-title');
  if (supportsSharedTitle && transitionTitle) {
    try {
      const raw = sessionStorage.getItem('rz-essay-transition');
      const pending = raw ? JSON.parse(raw) : null;
      const fresh = pending && Date.now() - Number(pending.timestamp || 0) < 5000;
      if (fresh && pending.slug === article.getAttribute('data-article-slug')) {
        transitionTitle.style.viewTransitionName = 'essay-title';
        transitionTitle.setAttribute('data-shared-title-active', '');
        sessionStorage.removeItem('rz-essay-transition');
        listen(window, 'pagereveal', (event) => {
          if (event.viewTransition && event.viewTransition.finished) {
            event.viewTransition.finished.finally(clearTransitionNames);
          } else later(clearTransitionNames, 500);
        }, { once: true });
        later(clearTransitionNames, 2200);
      } else if (raw) sessionStorage.removeItem('rz-essay-transition');
    } catch (_) {
      try { sessionStorage.removeItem('rz-essay-transition'); } catch (_) {}
    }
  } else {
    try { sessionStorage.removeItem('rz-essay-transition'); } catch (_) {}
  }

  if (!reduceMotion) {
    article.classList.add('article-motion');
    readyFrame = requestAnimationFrame(() => {
      readyFrame = requestAnimationFrame(() => {
        readyFrame = 0;
        article.classList.add('article-ready');
      });
    });
  }

  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    let activeDesktopLink = null;
    links.forEach((link) => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
        if (mapNav && mapNav.contains(link)) activeDesktopLink = link;
      } else link.removeAttribute('aria-current');
    });
    if (marker && mapNav && activeDesktopLink) {
      const navRect = mapNav.getBoundingClientRect();
      const linkRect = activeDesktopLink.getBoundingClientRect();
      const y = linkRect.top - navRect.top + linkRect.height / 2 - 3;
      marker.style.transform = 'translate3d(0,' + y + 'px,0)';
      marker.classList.add('is-visible');
    } else if (marker) marker.classList.remove('is-visible');
  };

  const measure = () => {
    measureFrame = 0;
    if (!body) return;
    const scroll = window.scrollY;
    const rect = body.getBoundingClientRect();
    progressStart = scroll + rect.top - window.innerHeight * 0.22;
    progressLength = Math.max(1, body.offsetHeight - window.innerHeight * 0.58);
    headingPoints = headings.map((heading) => ({
      id: heading.id,
      top: scroll + heading.getBoundingClientRect().top,
    }));
    activeId = null;
    updateProgress();
  };

  const updateProgress = () => {
    frame = 0;
    if (!body) return;
    const progress = Math.max(0, Math.min(1, (window.scrollY - progressStart) / progressLength));
    article.style.setProperty('--article-progress', String(progress));
    if (bar) bar.style.transform = 'scaleX(' + progress + ')';
    if (rail) rail.style.transform = 'scaleY(' + progress + ')';
    if (headingPoints.length) {
      const readingLine = window.scrollY + window.innerHeight * 0.24;
      let current = '';
      for (const point of headingPoints) {
        if (point.top <= readingLine) current = point.id;
        else break;
      }
      setActive(current);
    }
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
  const scheduleMeasure = () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  };
  listen(window, 'scroll', onScroll, { passive: true });
  listen(window, 'resize', scheduleMeasure, { passive: true });
  if ('ResizeObserver' in window && body) {
    resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(body);
  }
  measure();

  links.forEach((link) => {
    listen(link, 'click', () => {
      const disclosure = link.closest('details');
      if (disclosure) disclosure.open = false;
    });
  });

  listen(article, 'click', (event) => {
    if (
      !supportsSharedTitle ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;
    const link = event.target.closest && event.target.closest('[data-essay-transition-link]');
    if (!link) return;
    const title = link.querySelector('[data-essay-transition-title]');
    const slug = link.getAttribute('data-essay-transition-link');
    if (!title || !slug) return;
    title.style.viewTransitionName = 'essay-title';
    try {
      sessionStorage.setItem('rz-essay-transition', JSON.stringify({ slug, timestamp: Date.now() }));
    } catch (_) {}
    later(() => title.style.removeProperty('view-transition-name'), 1600);
  });

  article.querySelectorAll('[data-copy-article]').forEach((button) => {
    let resetTimer = 0;
    listen(button, 'click', async () => {
      const shareGroup = button.closest('[data-article-share]');
      const status = shareGroup && shareGroup.querySelector('[data-share-status]');
      const label = button.querySelector('[data-copy-label]');
      clearLater(resetTimer);
      try {
        await navigator.clipboard.writeText(location.href.split('#')[0]);
        button.dataset.copyState = 'copied';
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Link copied';
      } catch (_) {
        button.dataset.copyState = 'error';
        if (label) label.textContent = 'Copy manually';
        if (status) status.textContent = 'Copy the address from your browser';
      }
      resetTimer = later(() => {
        button.dataset.copyState = '';
        if (label) label.textContent = 'Copy link';
        if (status) status.textContent = '';
      }, 2400);
    });
  });
})();`;

function ArticleShare({ post }: { post: Post }) {
  const url = absUrl(`/blog/${post.slug}`);
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const email = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`;
  return (
    <div className="article-share" role="group" aria-label="Share this essay" data-article-share>
      <button type="button" data-copy-article>
        <span data-copy-label>Copy link</span>
        <span className="article-share-check" aria-hidden="true">
          ✓
        </span>
      </button>
      <a href={linkedIn} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={email}>Email</a>
      <span className="sr-only" role="status" aria-live="polite" data-share-status />
    </div>
  );
}

// End-of-essay conversion block. Routes the reader (organic or AI-referred)
// from the most-linked, most-indexed surface (essays) toward the parent topic
// hub, a relevant case study, and the recruiter actions — the linking the
// content roadmap mandated but the route never rendered. Plain <a> with
// trailing slashes (matches canonical form, no 301 hop) + data-analytics-*
// so the static inline analytics bridge tracks each cta_click without JS.
function EssayFooterCTA({ post }: { post: Post }) {
  return (
    <section className="article-closing-cta">
      <div className="article-closing-cta-inner" data-rz-reveal>
        <div className="article-closing-conversation">
          <div className="article-closing-cta-kicker">Continue the conversation</div>
          <h2>Building through similar complexity?</h2>
          <p>
            Discuss the operating decisions behind the essay, or explore where my experience can
            help.
          </p>
          <div className="article-closing-actions">
            <a
              href="/contact/#book"
              data-analytics-event="cta_click"
              data-analytics-cta-id="book_intro_call"
              data-analytics-cta-location="blog_post_footer"
              data-analytics-cta-destination="/contact/#book"
              className="article-closing-action-primary"
            >
              Book introduction
            </a>
            <a
              href={`mailto:${profile.email}`}
              data-analytics-event="cta_click"
              data-analytics-placement="essay_footer"
              data-analytics-target="email"
              className="article-closing-action-secondary"
            >
              Email Rizwan
            </a>
          </div>
        </div>
        <NewsletterSignup
          placement="essay_footer"
          fromPage={`/blog/${post.slug}`}
          className="article-ending-newsletter"
        />
      </div>
    </section>
  );
}

// Author-entity note. This remains a visible Person-hub link for the
// BlogPosting -> #person authorship signal, but closes the essay as an
// editorial colophon rather than a boxed profile card.
function EssayAuthorBox({ post }: { post: Post }) {
  const closingThought = post.thesis ?? post.description;
  const quoteLength = closingThought.length;
  const quoteLengthClass =
    quoteLength > 210
      ? " article-ending-quote-long"
      : quoteLength > 130
        ? " article-ending-quote-medium"
        : "";

  return (
    <div className="article-ending-thesis" data-rz-stagger>
      <blockquote className={`article-ending-quote${quoteLengthClass}`}>
        <span className="article-ending-quote-mark" aria-hidden="true">
          “
        </span>
        <p>{closingThought}</p>
      </blockquote>
      <aside className="article-author-note" aria-label={`About ${profile.name}`}>
        <p className="article-author-note-copy">
          Payments product &amp; program leader &mdash; scaled a regulated multi-rail platform from
          $0 to {PLATFORM.gtv} GTV across {PLATFORM.marketsWord} frontier markets. These essays are
          the public version of how I think through the work.
        </p>
        <div className="article-author-identity">
          <span className="article-author-portrait">
            <img
              src={authorPortrait}
              alt={profile.name}
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
            />
          </span>
          <div className="min-w-0">
            <div className="article-author-label">Written by</div>
            <Link to="/resume" className="article-author-name">
              {profile.name}
            </Link>
            <p className="article-author-role">{profile.role}</p>
          </div>
        </div>
        <div className="article-author-links">
          <Link to="/resume">View resume →</Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </aside>
    </div>
  );
}

function ArticleEnding({
  post,
  newer,
  older,
}: {
  post: Post;
  newer: Post | null;
  older: Post | null;
}) {
  return (
    <section className="article-ending" aria-labelledby={`article-ending-${post.slug}`}>
      <div className="article-ending-inner">
        <h2 id={`article-ending-${post.slug}`} className="sr-only">
          Closing thought and further reading
        </h2>
        <EssayAuthorBox post={post} />
        <div className="article-ending-navigation" data-rz-stagger>
          <div className="article-ending-share">
            <div className="article-ending-share-label">Share article</div>
            <ArticleShare post={post} />
          </div>
          {(newer || older) && (
            <nav
              className={`article-sequence${newer && older ? "" : " article-sequence-single"}`}
              aria-label="Previous and next essays"
            >
              {older && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: older.slug }}
                  rel="prev"
                  data-essay-transition-link={older.slug}
                  className="article-sequence-previous"
                >
                  <span className="article-sequence-arrow" aria-hidden="true">
                    ←
                  </span>
                  <span className="article-sequence-copy">
                    <span className="article-sequence-label">Previous article</span>
                    <strong data-essay-transition-title>{older.title}</strong>
                    <span className="article-sequence-meta">
                      {older.category} · {older.readingTime}
                    </span>
                  </span>
                </Link>
              )}
              {newer && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: newer.slug }}
                  rel="next"
                  data-essay-transition-link={newer.slug}
                  className="article-sequence-next"
                >
                  <span className="article-sequence-copy">
                    <span className="article-sequence-label">Next article</span>
                    <strong data-essay-transition-title>{newer.title}</strong>
                    <span className="article-sequence-meta">
                      {newer.category} · {newer.readingTime}
                    </span>
                  </span>
                  <span className="article-sequence-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

function relatedArtwork(post: Post) {
  return OG_IMAGE_OVERRIDES[post.slug] ?? `/og/blog/${post.slug}.png`;
}

function RelatedReading({ posts }: { posts: Post[] }) {
  return (
    <section className="article-related-reading" aria-labelledby="related-reading-heading">
      <div className="article-related-inner">
        <header className="article-related-intro" data-rz-reveal>
          <div className="article-related-kicker">
            <span aria-hidden="true" /> Keep reading
          </div>
          <h2 id="related-reading-heading">Ideas that continue the thread.</h2>
          <Link to="/blog" activeOptions={{ exact: true }} className="article-related-all">
            View all essays <span aria-hidden="true">→</span>
          </Link>
        </header>
        <div className="article-related-grid" data-rz-stagger>
          {posts.map((relatedPost, index) => (
            <Link
              key={relatedPost.slug}
              to="/blog/$slug"
              params={{ slug: relatedPost.slug }}
              data-essay-transition-link={relatedPost.slug}
              className="article-related-story"
            >
              <figure className="article-related-media">
                <img
                  src={relatedArtwork(relatedPost)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={630}
                  sizes="(max-width: 640px) 92vw, (max-width: 1023px) 44vw, 22vw"
                />
                <span className="article-related-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figure>
              <div className="article-related-copy">
                <span className="article-related-category">{relatedPost.category}</span>
                <h3 data-essay-transition-title>{relatedPost.title}</h3>
                <p>{relatedPost.thesis ?? relatedPost.description}</p>
                <span className="article-related-meta">
                  {relatedPost.readingTime}
                  <span className="article-related-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPostPage() {
  const {
    post: p,
    content,
    related,
  } = Route.useLoaderData() as {
    post: Post;
    content: string;
    related: Post[];
  };
  const toc = extractTOC(content);
  const diagram = postDiagrams[p.slug];
  const hub = hubForPost(p);

  // Fire blog_view once per post mount with post-specific dimensions that the
  // generic GA4 page view cannot carry.
  useEffect(() => {
    trackEvent("blog_view", {
      blog_slug: p.slug,
      blog_category: p.category,
      blog_reading_time: p.readingTime,
    });
  }, [p.slug, p.category, p.readingTime]);

  const currentIndex = publishedPosts.findIndex((post) => post.slug === p.slug);
  const newer = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;
  const older =
    currentIndex >= 0 && currentIndex < publishedPosts.length - 1
      ? publishedPosts[currentIndex + 1]
      : null;

  return (
    <article
      className="blog-article-page overflow-x-clip"
      data-article-reader
      data-article-slug={p.slug}
    >
      <div className="article-reading-progress" data-article-progress aria-hidden="true">
        <span />
      </div>
      <header className="article-hero rz-beam relative overflow-hidden border-b border-rule bg-surface">
        <div className="article-hero-inner mx-auto max-w-6xl px-5 sm:px-6 pt-14 pb-12 md:pt-16 md:pb-16">
          <Link
            to="/blog"
            className="article-arrival-back inline-flex py-2 -my-2 text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink font-mono-tech"
          >
            ← Essays
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8 min-w-0">
              {/* Mono eyebrow: ◆ hub (linked) · category · date · reading time */}
              <div className="article-arrival-meta flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] font-mono-tech">
                {hub ? (
                  <Link
                    to="/topics/$hub"
                    params={{ hub: hub.slug }}
                    className="inline-flex py-2 -my-2 items-center gap-2 text-[var(--brand)] font-semibold hover:opacity-80 transition-opacity"
                  >
                    ◆ {hub.shortTitle}
                  </Link>
                ) : (
                  <span className="text-[var(--brand)] font-semibold">◆ {p.category}</span>
                )}
                <span className="text-ink-soft">{p.category}</span>
                <span className="text-ink-soft">
                  {formatArticleDate(p.date)} · {p.readingTime}
                </span>
              </div>
              <h1
                data-essay-transition-target
                className="article-arrival-title font-instrument text-[clamp(2.25rem,4.6vw,4.25rem)] text-ink mt-5 leading-[1.03] max-w-4xl"
              >
                {p.title}
              </h1>
              <p className="article-arrival-lede mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
                {p.thesis ?? p.description}
              </p>
              <div className="article-arrival-byline mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono-tech">
                By {profile.name}
              </div>
            </div>
            {/* Reader utilities — facts and share actions, without repeating the lede. */}
            <div className="article-arrival-utilities lg:col-span-4 min-w-0 border-t border-rule pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
                Article
              </div>
              <dl className="article-facts">
                <div>
                  <dt>Reading time</dt>
                  <dd>{p.readingTime}</dd>
                </div>
                <div>
                  <dt>Sections</dt>
                  <dd>{toc.length}</dd>
                </div>
                <div>
                  <dt>{p.updated ? "Updated" : "Published"}</dt>
                  <dd>{formatArticleDate(p.updated ?? p.date)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <ArticleShare post={p} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 grid lg:grid-cols-12 gap-10">
        {/* TOC */}
        {toc.length > 0 && (
          <nav
            className="hidden lg:block lg:col-span-3 order-1"
            aria-labelledby="article-map-heading"
          >
            <div
              className="article-desktop-map-shell relative pl-5 lg:sticky lg:top-24"
              data-article-map-shell
            >
              <div className="article-rail-progress" aria-hidden="true">
                <span data-article-rail-progress />
              </div>
              <div
                id="article-map-heading"
                className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] mb-3 font-mono-tech font-semibold"
              >
                ◆ Article map
              </div>
              <div className="article-map-nav" data-article-map-nav>
                <span className="article-map-marker" data-article-toc-marker aria-hidden="true" />
                <ul className="space-y-2 text-sm leading-snug">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        data-article-toc-link
                        className="article-map-link text-ink-soft hover:text-ink transition-colors"
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        )}

        {/* Body */}
        <div className="lg:col-span-9 order-2 min-w-0" data-article-body>
          {toc.length > 0 && (
            <details className="article-mobile-map lg:hidden">
              <summary>
                <span id="article-mobile-map-heading" className="article-mobile-map-title">
                  In this essay
                </span>
                <span className="article-mobile-map-meta">
                  {toc.length} sections <i aria-hidden="true" />
                </span>
              </summary>
              <div className="article-mobile-map-disclosure">
                <div>
                  <nav aria-labelledby="article-mobile-map-heading">
                    <ol>
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} data-article-toc-link>
                            {t.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </div>
            </details>
          )}
          <div className="prose-editorial max-w-3xl">
            {renderContent(content)}
            {diagram ? (
              <DiagramFigure title={diagram.title} caption={diagram.caption}>
                <diagram.component />
              </DiagramFigure>
            ) : null}
          </div>
          <div className="mt-10 pt-8 border-t border-rule">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-3 font-mono-tech">
              Tags
            </div>
            <div className="flex flex-wrap gap-2 font-sans">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="blog-tag-chip text-xs px-2.5 py-1 border border-rule rounded-full text-ink-soft bg-surface"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArticleEnding post={p} newer={newer} older={older} />
      {related.length > 0 && <RelatedReading posts={related} />}
      <EssayFooterCTA post={p} />
      <script dangerouslySetInnerHTML={{ __html: ARTICLE_UTILITIES_SCRIPT }} />
    </article>
  );
}
