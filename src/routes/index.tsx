import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { caseStudies, caseStudyThumb } from "@/data/caseStudies";
// publishedPosts, not posts: the homepage must never surface a future-dated
// drip essay (raw `posts` made the featured slot and counts drip-leaky).
import { publishedPosts as posts, categories } from "@/data/posts";
import { products } from "@/data/products";
import { absUrl, SITE_URL } from "@/lib/seo";
import { ctaClick, siteSearch } from "@/lib/analytics";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { Reveal } from "@/components/motion/Reveal";
import {
  homeSectionsCss,
  ProofBand,
  IndustryPillars,
  CredentialsStrip,
  GetInTouchBand,
  Testimonials,
  HowIWorkFaq,
  howIWorkFaqs,
} from "@/components/home/homeSections";
import { RevealHeading } from "@/components/RevealHeading";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import portraitPng from "@/assets/rizwan-zafar-cutout.png";
import portraitWebp from "@/assets/rizwan-zafar-cutout.webp";
import portraitWebpSmall from "@/assets/rizwan-zafar-cutout-460.webp";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  // Reference the canonical #person node (defined in __root.tsx, emitted
  // site-wide) by @id instead of forking a second Person entity.
  mainEntity: { "@type": "Person", "@id": `${SITE_URL}#person`, name: profile.name, url: SITE_URL },
};

// FAQPage schema for the "How I work" section — generated from the SAME
// howIWorkFaqs array that renders the accordion, so the structured data and
// the visible answers cannot drift. Answers trace to the verified fact base.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: howIWorkFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const heroScrambleScript = `
(() => {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+";
  const nodes = document.querySelectorAll("[data-text-scramble]");
  const scramble = (node, delay = 0) => {
    const finalText = node.getAttribute("data-text-scramble") || node.textContent || "";
    const letters = Array.from(finalText);
    const duration = 560;
    window.setTimeout(() => {
      const startedAt = performance.now();
      const timer = window.setInterval(() => {
        const progress = Math.min((performance.now() - startedAt) / duration, 1);
        const revealed = Math.floor(progress * (letters.length + 1));
        node.textContent = letters
          .map((char, index) => {
            if (char === " ") return char;
            if (index < revealed) return char;
            return alphabet[Math.floor(Math.random() * alphabet.length)] || char;
          })
          .join("");
        if (progress >= 1) {
          window.clearInterval(timer);
          node.textContent = finalText;
        }
      }, 38);
    }, delay);
  };

  nodes.forEach((node, index) => {
    scramble(node, 260 + index * 90);
    node.addEventListener("mouseenter", () => scramble(node));
    node.addEventListener("focus", () => scramble(node));
  });
})();
`;

// Hero eyebrow typewriter — cycles the label phrases after the ◆ signature
// glyph (which stays fixed). Vanilla, no-JS/reduced-motion safe: the first
// phrase is the static default and the effect simply never starts.
const heroTypewriterScript = `(function(){function init(){try{
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var el=document.querySelector('[data-typewriter]');if(!el)return;
var phrases=(el.getAttribute('data-typewriter')||'').split('|').filter(Boolean);if(phrases.length<2)return;
var pi=0,ci=phrases[0].length,del=false;
function tick(){var cur=phrases[pi];
if(!del){ci++;el.textContent=cur.slice(0,ci);if(ci>=cur.length){del=true;setTimeout(tick,2800);return;}}
else{ci--;el.textContent=cur.slice(0,ci);if(ci<=0){del=false;pi=(pi+1)%phrases.length;setTimeout(tick,340);return;}}
setTimeout(tick,del?26:64);}
setTimeout(tick,2800);
}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rizwan Zafar | Product, Program & Payments Executive, Frontier Markets" },
      {
        name: "description",
        content: `Product & program executive with ${profile.career.years} years of experience across ten markets. Today I run payments moving $1B+ a year for 150+ global merchants.`,
      },
      {
        property: "og:title",
        content: "Rizwan Zafar — Product, Program & Payments Infrastructure for Frontier Markets",
      },
      {
        property: "og:description",
        content:
          "I build payment and product infrastructure for the markets most operators avoid. Simpaisa platform: $1B+ a year, 150+ global merchants including TikTok, Samsung, InDrive, Temu, Spotify and Yango.",
      },
      { property: "og:url", content: absUrl("/") },
      { property: "og:type", content: "profile" },
      {
        name: "twitter:title",
        content: "Rizwan Zafar — Product, Program & Payments Infrastructure for Frontier Markets",
      },
      {
        name: "twitter:description",
        content:
          "Payment infrastructure for the markets most operators avoid. Simpaisa platform: $1B+ a year, 270M+ payments a year, 150+ merchants.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: portraitWebpSmall,
        // Match the <picture> selection so retina screens don't fetch both
        // the 460w preload AND the 920w display asset.
        imageSrcSet: `${portraitWebpSmall} 460w, ${portraitWebp} 920w`,
        imageSizes: "(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px",
        type: "image/webp",
        fetchPriority: "high",
      },
      { rel: "canonical", href: absUrl("/") },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(profilePageJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { children: heroScrambleScript },
      { children: heroCanvasScript },
      { children: heroTypewriterScript },
    ],
  }),
  component: HomePage,
});

// Deterministic string hash (djb2) — seeds the Editor's Picks rotation so a
// given date + 8-hour slot always renders the same board (reproducible
// builds, no Math.random in SSG output).
function pickSeed(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

// Client half of the picks rotation: sets the active 8-hour slot on the side
// list so the CSS below reveals that slot's alternates. Runs without
// hydration (same inline-script pattern as the rest of the site); no-JS
// visitors keep the build-time slot.
// Hero atmosphere — a WebGL2 fragment shader (Matthias Hurrle's fbm "cosmic
// clouds", recoloured to the brand: a light paper base with slow flowing teal
// nebula + soft glow, kept subtle so the ink H1 stays readable). Ported to
// vanilla WebGL2 (no React) for the hydration-stripped build. Decorative +
// aria-hidden, LCP-safe: lazy-inits on the hero canvas, pauses when the hero
// scrolls out of view and when the tab is hidden, caps DPR, and is skipped
// under reduced-motion / when WebGL2 is unavailable (the CSS gradient remains
// the static fallback). Zero dependencies.
const heroCanvasScript = `(function(){function init(){try{
var c=document.querySelector('[data-hero-canvas]');if(!c)return;
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var gl=c.getContext('webgl2',{antialias:true,alpha:false});if(!gl)return;
var VS='#version 300 es\\nprecision highp float;\\nin vec4 position;void main(){gl_Position=position;}';
var FS='#version 300 es\\nprecision highp float;\\nout vec4 O;\\nuniform vec2 resolution;\\nuniform float time;\\n#define FC gl_FragCoord.xy\\n#define T time\\n#define R resolution\\n#define MN min(R.x,R.y)\\n'+
'float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}'+
'float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}'+
'float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}'+
'float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}'+
'void main(void){vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);float bg=clouds(vec2(st.x+T*.13,-st.y));'+
'float g=0.;vec2 uw=uv*(1.-.16*(sin(T*.11)*.5+.5));'+
'for(float i=1.;i<9.;i++){uw+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.17+.1*uw.x);vec2 p=uw;float d=length(p);'+
'g+=.0013/d;float b=noise(i+p+bg*1.731);g+=.0013*b/length(max(p,vec2(b*p.x*.02,p.y)));}'+
/* DARK nebula: near-black base, teal troughs -> cyan ridges ADDED on top,
   sparse cyan filaments; radial vignette drops corners to pure ink so the
   centered H1 keeps its ~18:1 contrast. */
'vec3 base=vec3(0.039,0.039,0.043);vec3 teal=vec3(0.055,0.310,0.310);vec3 cyan=vec3(0.176,0.831,0.749);'+
'float field=clamp(bg*0.40+g*0.55,0.0,1.0);'+
'vec3 glow=mix(teal,cyan,clamp(g*2.4,0.,1.));'+
'vec3 col=base+glow*field*0.42;'+
'col+=cyan*clamp(g,0.,1.)*0.20;'+
'float vig=smoothstep(1.34,0.16,length(uv));col=mix(base,col,vig);'+
'O=vec4(col,1.0);}';
function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)){return null;}return o;}
var vs=sh(gl.VERTEX_SHADER,VS),fs=sh(gl.FRAGMENT_SHADER,FS);if(!vs||!fs)return;
var pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;gl.useProgram(pr);
var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,1,-1,-1,1,1,1,-1]),gl.STATIC_DRAW);
var loc=gl.getAttribLocation(pr,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
var uR=gl.getUniformLocation(pr,'resolution'),uT=gl.getUniformLocation(pr,'time');
function rs(){var d=Math.min(window.devicePixelRatio||1,1.5);var w=Math.max(1,(c.clientWidth*d)|0),h=Math.max(1,(c.clientHeight*d)|0);if(c.width!==w||c.height!==h){c.width=w;c.height=h;gl.viewport(0,0,w,h);}}
var raf=0,run=false,st=null;
function fr(ts){if(!run)return;if(st===null)st=ts;rs();gl.uniform2f(uR,c.width,c.height);gl.uniform1f(uT,(ts-st)/1000);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);raf=requestAnimationFrame(fr);}
function play(){if(run)return;run=true;raf=requestAnimationFrame(fr);}
function stop(){run=false;cancelAnimationFrame(raf);}
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(rs,180);});
var io=new IntersectionObserver(function(e){if(e[0]&&e[0].isIntersecting)play();else stop();},{threshold:0.01});io.observe(c);
document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else if(c.getBoundingClientRect().bottom>0)play();});
}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();`;

const picksRotationScript = `!function(){try{var s=Math.floor(new Date().getUTCHours()/8);var el=document.querySelector("[data-picks-list]");if(el)el.setAttribute("data-pick-slot",String(s))}catch(e){}}();`;

const picksRotationCss = `
[data-picks-list] [data-pick-alt]{display:none}
[data-picks-list][data-pick-slot="0"] [data-pick-alt="0"],
[data-picks-list][data-pick-slot="1"] [data-pick-alt="1"],
[data-picks-list][data-pick-slot="2"] [data-pick-alt="2"]{display:grid}
`;

// Hero cursor parallax — writes normalized --hx/--hy (-1..1, centered) onto
// the hero stage so hero-next.css can "lean" the decorative depth layers
// (rail field ±6px, plus-accents ±10px, portrait glow ±4px). Vanilla inline
// script (no hydration), pointer-fine + hover only, reduced-motion off,
// passive listener, rAF-throttled with a single rect read per frame. Never
// touches the H1 or any text — CSS only transforms aria-hidden layers.
const heroParallaxScript = `(function(){function init(){try{
if(!window.matchMedia)return;
if(!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var st=document.querySelector('[data-hero-stage]');if(!st)return;
var px=0,py=0,raf=0;
function apply(){raf=0;var r=st.getBoundingClientRect();if(!r.width||!r.height)return;
var x=Math.max(-1,Math.min(1,((px-r.left)/r.width)*2-1));
var y=Math.max(-1,Math.min(1,((py-r.top)/r.height)*2-1));
st.style.setProperty('--hx',x.toFixed(3));st.style.setProperty('--hy',y.toFixed(3));}
st.addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(apply);},{passive:true});
st.addEventListener('pointerleave',function(){if(raf){cancelAnimationFrame(raf);raf=0;}
st.style.setProperty('--hx','0');st.style.setProperty('--hy','0');},{passive:true});
}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();`;

function HomePage() {
  // ── Dynamic Editor's Picks ─────────────────────────────────────────────
  // The board refreshes 2-3× per day with zero frameworks, via two layers:
  //  1. BUILD-TIME seeded rotation — the site rebuilds at least twice a day
  //     (daily publish run + the 23:30 UTC cron), and the seed (UTC date +
  //     8-hour slot) rotates the featured essay and each cluster's pick.
  //  2. CLIENT slot rotation — each side-list slot server-renders its 3
  //     rotation candidates (data-pick-alt 0/1/2); a 1-line inline script
  //     flips the visible alternate per 8-hour UTC window between builds.
  // Cluster balance is kept from the earlier fix (one pick per priority
  // cluster so a hot news cluster can't take the whole board), and the
  // cluster list deliberately spans payments AND the product/program
  // management lanes so the board always reflects all three practices.
  const dayStamp = new Date().toISOString().slice(0, 10);
  const buildSlot = Math.floor(new Date().getUTCHours() / 8); // 0 | 1 | 2
  const featuredPool = posts.filter((p) => p.featured);
  const featuredPost = featuredPool.length
    ? featuredPool[pickSeed(`${dayStamp}:${buildSlot}:featured`) % featuredPool.length]
    : posts[0];
  const PICK_ORDER = [
    "Cross-Border Payments",
    "Product Management",
    "Program Management",
    "AI in Fintech",
    "Settlement & Reconciliation",
    "Fraud & Risk",
    "Payment Infrastructure",
    "Product Strategy",
  ] as const;
  // One slot per cluster (first five clusters with content), each carrying
  // its 3 most-recent published essays as rotation alternates, phase-shifted
  // by the build seed.
  const sidePicks: { key: string; alts: typeof posts }[] = [];
  for (const cat of PICK_ORDER) {
    if (sidePicks.length === 5) break;
    const candidates = posts
      .filter((p) => p.category === cat && p.slug !== featuredPost.slug)
      .slice(0, 3);
    if (!candidates.length) continue;
    const start = pickSeed(`${dayStamp}:${buildSlot}:${cat}`) % candidates.length;
    sidePicks.push({
      key: cat,
      alts: [0, 1, 2].map((i) => candidates[(start + i) % candidates.length]),
    });
  }
  // Backfill from the newest list if fewer than 5 clusters had a post.
  for (const p of posts) {
    if (sidePicks.length >= 5) break;
    if (p.slug !== featuredPost.slug && !sidePicks.some((s) => s.alts[0].slug === p.slug)) {
      sidePicks.push({ key: p.slug, alts: [p, p, p] });
    }
  }
  const featuredCases = caseStudies.slice(0, 3);

  // Hot topics map directly to blog filter URLs (?hub=...)
  const CATEGORY_TO_HUB: Record<string, string> = {
    "Cross-Border Payments": "cross-border-payments",
    "Fraud & Risk": "fraud-aml",
    "Merchant Onboarding": "merchant-onboarding",
    "Payment Infrastructure": "payment-infrastructure",
    "Settlement & Reconciliation": "settlement-reconciliation",
    "Emerging Markets": "emerging-markets",
    "Product Strategy": "",
  };
  // One-line editorial descriptions (ISSUE-011) — neutral summaries of what
  // each cluster covers. No metrics, no claims (two-tier gate + no-fabrication
  // guardrail): these describe the TOPIC, never the operator's numbers.
  const TOPIC_BLURBS: Record<string, string> = {
    "Cross-Border Payments":
      "Corridors, correspondent rails, FX and settlement finality — from the operator side.",
    "Fraud & Risk":
      "Fraud controls, chargebacks, sanctions screening and AML/CFT — risk versus conversion.",
    "Merchant Onboarding":
      "KYC/KYB, risk tiering and pricing — the mechanics of taking a merchant live.",
    "Payment Infrastructure":
      "Acquiring, routing, retries and tokenisation — the plumbing under every payment.",
    "Settlement & Reconciliation":
      "Settlement cycles, ledgers and break investigation — keeping books and money in sync.",
    "Emerging Markets":
      "Fragmented rails, local payment methods and regulation — where standard playbooks run out.",
  };
  const hotTopics = categories
    .filter((c) => CATEGORY_TO_HUB[c])
    .map((cat) => ({
      name: cat,
      hub: CATEGORY_TO_HUB[cat],
      count: posts.filter((p) => p.category === cat).length,
      blurb: TOPIC_BLURBS[cat] ?? "",
    }));

  return (
    <div className="home-page">
      {/* Route-scoped CSS for the brand-rebuild sections (proof band, pillars,
          map strip). Inlined per the site's JS-less/no-styles.css-edit rule. */}
      <style dangerouslySetInnerHTML={{ __html: homeSectionsCss }} />
      {/* ============ HERO ============ */}
      <section className="home-signal-field relative overflow-hidden border-b border-rule">
        {/* Hero stage — bounds the WebGL nebula to the hero viewport only (the
            home-signal-field section wraps later blocks too, so an unbounded
            canvas would render a full-page-tall shader). data-hero-stage is
            the cursor-parallax host: heroParallaxScript writes --hx/--hy here
            and hero-next.css leans the decorative layers off those vars. */}
        <div className="relative overflow-hidden" data-hero-stage>
        <script dangerouslySetInnerHTML={{ __html: heroParallaxScript }} />
        {/* WebGL atmosphere backdrop — flowing brand-teal light (heroCanvasScript).
            Behind the grid + content; decorative, LCP-safe, reduced-motion-off. */}
        <canvas
          data-hero-canvas
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
        />
        {/* Studio-light scrim: dims the left (keeps the H1 at ~18:1) and leaves a
            controlled glow pocket on the right where the nebula + portrait sit,
            then vignettes the edges to ink. Sits above the canvas, below content. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,11,0.86) 0%, rgba(10,10,11,0.5) 38%, rgba(10,10,11,0) 66%), radial-gradient(135% 105% at 68% 38%, transparent 38%, rgba(10,10,11,0.74) 100%)",
          }}
        />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 sm:px-6 pt-7 md:pt-9 pb-8 md:pb-12 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT — 58% (7/12). Narrative + proof. Children stage in
              individually (data-hero-in + --i) for a choreographed entrance;
              the H1 stays un-staged so the LCP element paints immediately. */}
          <div className="lg:col-span-7 order-1 relative z-10 min-w-0">
            <div
              data-hero-in
              style={{ ["--i" as string]: 0 }}
              className="inline-flex items-center gap-4 mb-3 md:mb-4"
            >
              <span className="home-rule-animate h-px w-10 bg-[var(--brand)]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆{" "}
                <span data-typewriter="Product · Program · Payments|Frontier markets · Scale|Fintech · Infrastructure">
                  Product · Program · Payments
                </span>
                <span className="rz-caret" aria-hidden>
                  |
                </span>
              </span>
            </div>

            <h1 className="font-instrument tracking-[-0.015em] leading-[0.98] text-[38px] sm:text-[52px] md:text-[62px] lg:text-[74px] text-ink">
              {/* sr-only spaces keep the H1 extracting as readable text for
                  screen readers and AI crawlers — block spans alone concatenate
                  words (same fix as the resume H1). */}
              {/* Line 1 = LCP anchor. NEVER wrapped/transformed/clipped — it
                  paints in place at ~180ms and stays the largest contentful
                  paint. Do not add masks here. */}
              <span className="block">
                I build payment and product infrastructure<span className="sr-only"> </span>
              </span>
              {/* Line 2 = signature line-mask. .rz-line-clip is the overflow edge
                  (net-zero guards → no CLS); .rz-line-rise is the transform-only
                  riser. Both inert without .rz-js, so no-JS / reduced-motion see
                  the final line. Screen-reader text + scramble span intact. */}
              <span className="block rz-line-clip">
                <span className="rz-line-rise">
                  for the markets most operators{" "}
                  <span
                    className="text-scramble italic text-[var(--brand)]"
                    data-text-scramble="avoid."
                    tabIndex={0}
                  >
                    avoid.
                  </span>
                </span>
              </span>
            </h1>

            {/* Two-tier safe: sentence 1 carries only career-scope markers
                ("17 years", "ten markets"); sentence 2 carries only platform
                metrics ("$1B+", "150+ merchants"). The full stop between them is
                a clause boundary for the seo-audit gate — do not merge. Duration
                framing per owner ruling 2026-07-06; the number is computed in
                profile.ts so it can't go stale. */}
            <p
              data-hero-in
              style={{ ["--i" as string]: 1 }}
              className="mt-3.5 md:mt-4 max-w-xl text-[15px] md:text-base text-ink-soft leading-relaxed"
            >
              Product &amp; program executive with{" "}
              <span className="text-ink font-medium">
                {profile.career.years} years of experience
              </span>{" "}
              — ten markets across MENA and South Asia, from Daraz&rsquo;s marketplaces to
              Tapmad&rsquo;s streaming business to Simpaisa&rsquo;s cross-border acquiring, payouts
              &amp; gateway. Today I run payments moving{" "}
              <span className="text-ink font-medium">$1B+ a year</span> for{" "}
              <span className="text-ink font-medium">150+ global merchants</span> including TikTok,
              Samsung, InDrive, Temu, Spotify and Yango.
            </p>

            {/* CTAs — visible in first viewport (ISSUE-006). Strict hierarchy:
                PRIMARY solid-ink pill, SECONDARY outline pill, TERTIARY bare
                text link. All three share the same fixed h-12 row height so
                they sit on one baseline at 320/768/1440 (the old third pill
                was py-2.5/text-sm and broke alignment at 768px). On mobile the
                stack keeps one solid pill only, so the primary stays dominant.
                Gate-A audit 2026-07-08: the booking CTA IS the conversion
                event (PRODUCT.md), so it takes the primary pill; the work and
                journey read paths demote to secondary/tertiary. */}
            <div
              data-hero-in
              style={{ ["--i" as string]: 2 }}
              className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5"
            >
              <a
                href="/contact/#book"
                data-magnetic
                data-analytics-event="cta_click"
                data-analytics-cta-id="book_intro_call"
                data-analytics-cta-location="hero"
                data-analytics-cta-destination="/contact/#book"
                className="rz-cta-primary group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-medium text-background bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                Book a 15-min intro call
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
              <Link
                to="/product-work"
                data-analytics-event="cta_click"
                data-analytics-cta-id="see_case_studies"
                data-analytics-cta-location="hero"
                data-analytics-cta-destination="/product-work"
                onClick={() => ctaClick("see_case_studies", "hero", "/product-work")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base text-ink border border-ink/20 hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                See the work
              </Link>
              {/* Journey CTA: no typed ctaClick() call because the analytics
                  CtaId union has no journey id and that lib is out of scope to
                  extend. The DOM bridge in __root.tsx fires cta_click from the
                  data-analytics-* attributes below, so tracking still works. */}
              <Link
                to="/journey"
                data-analytics-event="cta_click"
                data-analytics-cta-id="the_journey"
                data-analytics-cta-location="hero"
                data-analytics-cta-destination="/journey"
                className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-4 text-[15px] font-medium text-ink-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              >
                <span className="rz-link">The 17-year journey</span>{" "}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </div>

            {/* Certification chip row (ISSUE-007) — upgraded from the old 10px
                mono string to visible bordered text chips (12px, ink-soft on
                paper). Same ◆ mono-label design language; text chips only, no
                fabricated badge icons. Names trace to profile.certifications. */}
            <div
              data-hero-in
              style={{ ["--i" as string]: 3 }}
              className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Certified
              </span>
              <ul
                className="flex flex-wrap items-center gap-1.5"
                aria-label="Professional certifications"
              >
                {["PMP", "PMI-ACP", "CSPO", "CSM", "COBIT 5", "ITIL"].map((cert) => (
                  <li
                    key={cert}
                    className="inline-flex items-center rounded-full border border-rule bg-card px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-none"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Owned-audience capture in the first viewport (ISSUE-008) — the
                essay search that used to sit here moved down into the Hot
                topics / knowledge-base section, which is its real entry point.
                Shared component keeps the Web3Forms wiring + newsletter_signup
                analytics consistent site-wide. */}
            <div data-hero-in style={{ ["--i" as string]: 4 }}>
              <NewsletterSignup placement="hero" fromPage="/" className="mt-5 max-w-xl" />
            </div>
          </div>

          {/* RIGHT — 42% (5/12). Portrait + premium depth backdrop. Enters via a
              transform-only settle (opacity stays 1) so the eager portrait image
              paints immediately and the LCP is unaffected. */}
          <div
            data-hero-portrait
            className="lg:col-span-5 order-2 relative min-w-0"
          >
            {/* Payment-rail field — faint orthogonal circuit routes behind the
                portrait with slow cyan light pulses travelling along them
                (offset-path, styled in hero-next.css). Absolute + aria-hidden
                + pointer-events-none → zero layout impact (CLS 0). Fades in
                after the H1 via .rz-hero-go (+420ms) and is display:none below
                md, where the portrait column collapses. Sits above the nebula
                canvas / glow wash, below the z-10 portrait image. */}
            <div
              aria-hidden="true"
              className="rz-rail-field pointer-events-none absolute -inset-x-6 -inset-y-4"
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 520 640"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
              >
                {/* Rails — 1px orthogonal polylines, rounded corners, mixed
                    whisper opacities. Geometry bleeds past the viewBox edges
                    so routes read as passing through, not starting/ending. */}
                <path className="rz-rail" strokeOpacity={0.12} d="M -24 128 H 168 Q 178 128 178 138 V 356 Q 178 366 188 366 H 544" />
                <path className="rz-rail" strokeOpacity={0.08} d="M 64 -24 V 186 Q 64 196 74 196 H 306 Q 316 196 316 206 V 664" />
                <path className="rz-rail" strokeOpacity={0.14} d="M 544 84 H 396 Q 386 84 386 94 V 258 Q 386 268 376 268 H 128 Q 118 268 118 278 V 664" />
                <path className="rz-rail" strokeOpacity={0.1} d="M -24 492 H 246 Q 256 492 256 482 V 336 Q 256 326 266 326 H 544" />
                <path className="rz-rail" strokeOpacity={0.06} d="M 442 -24 V 142 Q 442 152 452 152 H 544" />
                {/* Junction nodes — tiny solder points where routes turn. */}
                <circle className="rz-rail-node" cx={178} cy={250} r={1.6} />
                <circle className="rz-rail-node" cx={316} cy={330} r={1.6} />
                <circle className="rz-rail-node rz-rail-node-hot" cx={386} cy={176} r={1.8} />
                {/* Light pulses — each offset-path in hero-next.css matches
                    one rail's d exactly; staggered delays feel asynchronous. */}
                <circle className="rz-rail-pulse rz-rail-pulse-1" r={2.4} />
                <circle className="rz-rail-pulse rz-rail-pulse-2" r={2.2} />
                <circle className="rz-rail-pulse rz-rail-pulse-3" r={2.4} />
              </svg>
            </div>
            <div className="home-portrait-frame relative mx-auto w-full max-w-[260px] sm:max-w-[330px] lg:max-w-[400px] aspect-[4/5]">
              {/* Subtle depth: soft radial wash behind the portrait. Inset so
                  it can't touch the column edges and clip awkwardly. */}
              <div
                aria-hidden
                className="rz-glow-par pointer-events-none absolute inset-x-4 inset-y-8 -z-10 rounded-[40%] blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 75%)",
                }}
              />
              {/* Thin brand ring behind the portrait — premium framing without
                  a hard card edge. Slow breathing animation gives the hero a
                  pulse without distracting the viewer. */}
              <div
                aria-hidden
                className="hero-ring-breathe pointer-events-none absolute inset-2 -z-10 rounded-[36%]"
                style={{
                  border: "1px solid color-mix(in oklab, var(--brand) 40%, transparent)",
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--brand) 10%, transparent), 0 0 40px 4px color-mix(in oklab, var(--brand) 15%, transparent)",
                }}
              />

              <picture>
                <source
                  type="image/webp"
                  srcSet={`${portraitWebpSmall} 460w, ${portraitWebp} 920w`}
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px"
                />
                <img
                  src={portraitPng}
                  alt="Portrait of Rizwan Zafar, Chief Product Officer, Payments"
                  width={920}
                  height={1150}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative z-10 h-full w-full object-contain object-bottom"
                />
              </picture>

              {/* Dubai tag — anchored to the top-right of the portrait box,
                  inset so it doesn't float off the column edge. */}
              <div className="absolute top-2 right-2 z-20 bg-card border border-rule px-2.5 py-1 text-[10px] tracking-[0.22em] font-bold uppercase text-ink font-mono-tech shadow-sm">
                Dubai · UAE
              </div>

              {/* Floating signature card — a small crafted personality detail
                  overlapping the lower-left of the portrait. */}
              <div
                data-hero-in
                style={{ ["--i" as string]: 5 }}
                className="home-signature-card absolute -left-3 sm:-left-5 bottom-8 z-20 hidden sm:block rounded-lg border border-rule bg-card px-3.5 py-2.5"
              >
                <div className="text-[9px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                  ◆ Signature
                </div>
                <div className="font-instrument italic text-[19px] leading-tight mt-0.5 text-[var(--brand)]">
                  Rizwan Zafar
                </div>
              </div>

              {/* Decorative accents — positioned at the portrait box's EDGES
                  so they never overlap the face. Each carries a CSS-only
                  ease-in-out animation; prefers-reduced-motion: reduce
                  suppresses all of them. */}
              {(
                [
                  // 3 pluses around the edges
                  // Horizontal positions stay ≤88% — at 94%+ the glyph box
                  // crossed the viewport edge at 1440px and rendered clipped.
                  // Vertical: the top-right plus sits at 34% (mid-right edge),
                  // NOT near 0% — at -2% it collided with the "Dubai · UAE"
                  // label (top-2 right-2) at 1280-1600px widths.
                  {
                    type: "plus",
                    top: "34%",
                    left: "88%",
                    size: "text-4xl md:text-5xl",
                    color: "text-[var(--brand)]",
                    anim: "hero-float-a",
                  },
                  {
                    type: "plus",
                    top: "60%",
                    left: "-4%",
                    size: "text-3xl md:text-4xl",
                    color: "text-[var(--brand)]/80",
                    anim: "hero-float-b",
                  },
                  {
                    type: "plus",
                    top: "94%",
                    left: "86%",
                    size: "text-3xl md:text-4xl",
                    color: "text-[var(--brand)]",
                    anim: "hero-float-a",
                  },
                  // Thin ticks for rhythm, avoiding decorative blobs.
                  {
                    type: "tick",
                    top: "14%",
                    left: "-3%",
                    size: "h-px w-10",
                    color: "bg-[var(--brand)]",
                    anim: "hero-glow-a",
                  },
                  {
                    type: "tick",
                    top: "92%",
                    left: "44%",
                    size: "h-px w-12",
                    color: "bg-[var(--brand)]",
                    anim: "hero-glow-b",
                  },
                ] as const
              ).map((g, i) =>
                // Each accent is wrapped in a .rz-acc-par positioning shell so
                // the cursor-parallax transform (hero-next.css, ±10px off
                // --hx/--hy) can't fight the float/glow keyframe transforms,
                // which stay on the inner span.
                g.type === "plus" ? (
                  <span
                    key={i}
                    aria-hidden
                    className="rz-acc-par pointer-events-none absolute z-20"
                    style={{ top: g.top, left: g.left }}
                  >
                    <span
                      className={`block font-light leading-none select-none ${g.size} ${g.color} ${g.anim}`}
                    >
                      +
                    </span>
                  </span>
                ) : (
                  <span
                    key={i}
                    aria-hidden
                    className="rz-acc-par pointer-events-none absolute z-20"
                    style={{ top: g.top, left: g.left }}
                  >
                    <span className={`block ${g.size} ${g.color} ${g.anim}`} />
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
        </div>

      {/* ============ B. PROOF BAND ============ */}
      <ProofBand />

      {/* ============ D. INDUSTRY PILLARS ============ */}
      {/* Homepage map strip (doc §4C) removed per owner call 2026-07-06 —
          the map lives on /journey only now. MapStrip component kept in
          homeSections.tsx in case this gets revisited. */}
      <IndustryPillars />

      {/* ============ PRODUCT WORK, selected cases ============ */}
      <section className="rz-beam">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)]">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Selected work
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02]">
                <RevealHeading lead="Infrastructure shipped" emphasis="at scale." />
              </h2>
            </div>
            <Link
              to="/product-work"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group py-1.5 -my-1.5"
            >
              <span className="rz-link">All case studies</span>{" "}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5" data-rz-stagger>
            {featuredCases.map((c, i) => {
              // Pull the strongest stat from the case study for the card "art"
              const heroStat = c.metrics?.[0];
              return (
                <Link
                  key={c.slug}
                  to="/product-work/$slug"
                  params={{ slug: c.slug }}
                  style={{ ["--motion-delay" as string]: `${i * 120}ms` }}
                  data-glow
                  className="home-card home-card-lift group relative rounded-lg border border-rule bg-card p-7 flex flex-col h-full"
                >
                    {/* Card hero: Higgsfield-generated brand-coherent thumb
                        with the strongest metric overlaid in display serif. */}
                    <div className="rz-unveil aspect-[5/3] rounded-md mb-5 relative overflow-hidden bg-ink">
                      <img
                        src={caseStudyThumb(c.slug)}
                        alt={c.imageAlt ?? `${c.title} — abstract editorial illustration`}
                        width={800}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {/* Dark gradient overlay so the stat reads cleanly. */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, color-mix(in oklab, #000 30%, transparent) 0%, transparent 35%, color-mix(in oklab, #000 70%, transparent) 100%)",
                        }}
                      />
                      <div className="absolute top-3 left-4 z-10 font-mono-tech text-[10px] tracking-[0.18em] text-background/95 uppercase">
                        ◆ Case study /0{i + 1}
                      </div>
                      {heroStat && (
                        <div className="absolute inset-x-0 bottom-3 z-10 flex flex-col items-center text-center px-4 pointer-events-none">
                          <div className="font-instrument italic text-background text-4xl md:text-5xl leading-none tracking-tight drop-shadow-lg">
                            {heroStat.value}
                          </div>
                          <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-background/80 font-mono-tech">
                            {heroStat.label}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]">
                      {c.category}
                    </span>
                    <h3 className="font-instrument text-xl text-ink mt-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-2 leading-relaxed flex-1">{c.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS, built & building ============ */}
      {/* Press Run 2026-07-08: tinted "signature" ground + more air so this
          featured beat breaks the Pillars→Products→Editor's-Picks paper run,
          and an asymmetric 7/5 spread so the two products read as one editorial
          spread rather than two clones. Cards go bg-card (white) for contrast
          on the tint. No copy change. */}
      <section className="relative bg-surface border-y border-rule rz-beam">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-sm)]">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Products
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02] max-w-3xl">
                <RevealHeading
                  lead="Products I have built, and products I am"
                  emphasis="building."
                />
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group py-1.5 -my-1.5"
            >
              <span className="rz-link">All products</span> <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Homepage shows only PROVEN products. The coming-soon items
              (Felo App, Job Hunt) live at /products in the full pipeline view —
              on the executive scan path they read as off-narrative noise. */}
          <div className="grid md:grid-cols-12 gap-5">
            {products
              .filter((p) => p.status === "shipped-scaled")
              .map((p, i) => {
                const isInternal = p.link.startsWith("/");
                // Asymmetric spread: first (flagship) product takes the wide
                // 7-col field, the second the narrower 5-col field.
                const span = i === 0 ? "md:col-span-7" : "md:col-span-5";
                const CardInner = (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-instrument text-2xl text-ink">{p.name}</div>
                      <span
                        className={`text-[10px] uppercase tracking-[0.18em] font-mono-tech px-2.5 py-1 rounded-full border ${
                          p.status === "coming-soon"
                            ? "border-rule text-ink-soft"
                            : "border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)]"
                        }`}
                      >
                        {p.statusLabel}
                      </span>
                    </div>
                    <p className="mt-3 text-ink-soft leading-relaxed">{p.oneLiner}</p>
                    {p.metrics && p.metrics.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft font-mono-tech">
                        {p.metrics.slice(0, 3).map((m) => (
                          <span key={m.label}>
                            <span className="text-ink font-semibold">{m.value}</span>{" "}
                            <span className="uppercase tracking-[0.12em]">{m.label}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-5 text-sm text-ink group-hover:text-[var(--brand)] inline-flex items-center gap-1.5 transition-colors">
                      {p.ctaLabel ?? "Learn more"}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </>
                );
                return isInternal ? (
                  <Link
                    key={p.slug}
                    to={p.link}
                    data-glow
                    className={`home-card home-card-lift rz-reveal group relative block bg-card border border-rule rounded-lg p-7 ${span}`}
                  >
                    {CardInner}
                  </Link>
                ) : (
                  <a
                    key={p.slug}
                    href={p.link}
                    data-glow
                    className={`home-card home-card-lift rz-reveal group relative block bg-card border border-rule rounded-lg p-7 ${span}`}
                  >
                    {CardInner}
                  </a>
                );
              })}
          </div>
        </div>
      </section>

      {/* ============ J. LOGO MARQUEE, ecosystem ============ */}
      {/* Borrowed-authority heading: these are merchants served by the
          platforms Rizwan has led, not personal clients — the wording keeps
          that distinction honest. */}
      <div className="border-t border-rule bg-surface">
        <Reveal className="mx-auto max-w-6xl px-5 sm:px-6 pt-12 md:pt-16 pb-6">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
            ◆ Ecosystem
          </div>
          <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-2 leading-tight">
            Merchants served by platforms I&rsquo;ve led.
          </h2>
        </Reveal>
      </div>
      <section
        className="marquee-wrap border-b border-rule bg-surface overflow-hidden py-6 md:py-7 w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-inset"
        aria-label="Partner ecosystem, scrolling. Hover or focus to pause."
        tabIndex={0}
      >
        <div className="flex gap-12 marquee-track whitespace-nowrap w-max">
          {[...profile.partners, ...profile.partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              // The second half is a visual loop duplicate — hide it from
              // screen readers so the brand list isn't announced twice.
              aria-hidden={i >= profile.partners.length || undefined}
              className="font-instrument text-xl sm:text-2xl md:text-4xl text-ink/70 tracking-tight inline-flex items-center gap-12"
            >
              {p}
              <span className="text-[var(--brand)]">✦</span>
            </span>
          ))}
        </div>
      </section>

        {/* ============ HOT TOPICS, horizontal cards ============ */}
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-[var(--space-section-md)] pb-14">
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div
              className="home-soft-reveal md:col-span-4"
              style={{ "--motion-delay": "180ms" } as CSSProperties}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Hot topics
              </div>
              <h2 className="font-instrument text-2xl md:text-3xl text-ink mt-3 leading-tight">
                Search the payments knowledge base.
              </h2>
              <p className="text-xs text-ink-soft mt-2">
                Essays across payment infrastructure, settlement, risk, SWIFT, onboarding and
                complex-market execution.
              </p>
              {/* Knowledge-base search (ISSUE-008) — relocated from the hero;
                  this section is its real entry point. The role="search" +
                  data-analytics-* bridge attributes travel with it unchanged. */}
              <form
                action="/blog/"
                method="get"
                role="search"
                data-analytics-event="site_search"
                data-analytics-search-location="home"
                onSubmit={(event) => {
                  const q = new FormData(event.currentTarget).get("q");
                  siteSearch(typeof q === "string" ? q : "", "home");
                }}
                className="home-search-panel mt-4 rounded-lg border border-rule bg-card/90 p-2 flex flex-col gap-2"
                style={{ "--motion-delay": "220ms" } as CSSProperties}
              >
                <label htmlFor="home-blog-search" className="sr-only">
                  Search payments essays
                </label>
                <input
                  id="home-blog-search"
                  name="q"
                  type="search"
                  placeholder="Search SWIFT, reconciliation, KYB..."
                  className="min-w-0 flex-1 rounded-md border border-transparent bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-[var(--brand)]"
                />
                <button
                  type="submit"
                  className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-background hover:bg-[var(--brand)] transition-colors"
                >
                  Search essays
                </button>
              </form>
            </div>
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotTopics.map((t, i) => (
                <Link
                  key={t.name}
                  to="/topics/$hub"
                  params={{ hub: t.hub }}
                  data-glow
                  className="home-topic-card home-card-lift group relative overflow-hidden rounded-lg min-h-[132px] p-4 flex flex-col justify-between border border-rule bg-card text-ink"
                  style={{ "--motion-delay": `${220 + i * 45}ms` } as CSSProperties}
                >
                  {/* Article-count watermark. Kept fully INSIDE the card and
                      quiet — the old 110px corner numeral spilled past the
                      card edge and dominated the (then-empty) body, which
                      review read as broken. */}
                  <div
                    aria-hidden
                    className="absolute bottom-1 right-3 font-instrument italic text-[var(--brand)]/8 text-[56px] leading-none select-none pointer-events-none tabular-nums"
                  >
                    {String(t.count).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="font-instrument text-lg leading-tight group-hover:text-[var(--brand)] transition-colors">
                      {t.name}
                    </div>
                    {/* One-line editorial summary (ISSUE-011) — what the
                        cluster covers, never a metric or a claim. */}
                    {t.blurb && (
                      <p className="mt-1.5 text-[11px] text-ink-soft leading-snug">{t.blurb}</p>
                    )}
                  </div>
                  <div className="relative text-[10px] font-mono-tech uppercase tracking-[0.18em] mt-3 text-ink-soft">
                    {t.count} {t.count === 1 ? "article" : "articles"} · Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EDITOR'S PICKED ============ */}
      <section className="relative rz-beam">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)]">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Editor's picks · rotates through the day
              </div>
              <h2 className="font-instrument text-4xl md:text-6xl text-ink mt-3 leading-[1.02]">
                <RevealHeading lead="The posts I'd read" emphasis="first." />
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5 group py-1.5 -my-1.5"
            >
              <span className="rz-link">All posts</span> <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Big featured + small list (magazine layout) */}
          <div className="grid lg:grid-cols-12 gap-8">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group lg:col-span-7 block"
            >
              {/* Magazine cover treatment — uses the post's own title at hero
                  scale as the artwork, not a generic gradient placeholder. */}
              <div
                className="aspect-[16/10] rounded-lg border border-rule mb-5 relative overflow-hidden bg-ink"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, color-mix(in oklab, var(--brand) 68%, var(--ink)) 0%, var(--ink) 46%, color-mix(in oklab, var(--rule) 12%, var(--ink)) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"
                  aria-hidden
                />
                {/* Top-left category chip */}
                <div className="absolute top-5 left-5 text-[10px] font-mono-tech uppercase tracking-[0.22em] text-background/95 bg-background/20 rounded-full px-3 py-1 border border-background/15">
                  ◆ Featured · {featuredPost.category}
                </div>
                {/* Bottom-left: oversized issue numeral as second-read moment */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 -left-2 font-instrument italic text-background/8 text-[180px] md:text-[260px] leading-none select-none pointer-events-none"
                >
                  №01
                </div>
                {/* Bottom-right: the post title in display serif, magazine-cover scale */}
                <div className="absolute bottom-5 right-5 max-w-[78%] text-right">
                  <div className="font-instrument italic text-background/95 leading-[0.95] text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    {featuredPost.title.length > 60
                      ? featuredPost.title.slice(0, 58) + "…"
                      : featuredPost.title}
                  </div>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-background/70 font-mono-tech">
                    {featuredPost.readingTime} · Read essay →
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-ink-soft">
                {featuredPost.readingTime}
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-ink mt-3 leading-tight group-hover:text-[var(--brand)] transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-ink-soft mt-3 leading-relaxed max-w-2xl">
                {featuredPost.thesis ?? featuredPost.description}
              </p>
            </Link>

            <div
              className="lg:col-span-5 flex flex-col divide-y divide-rule"
              data-picks-list
              data-pick-slot={buildSlot}
            >
              <style dangerouslySetInnerHTML={{ __html: picksRotationCss }} />
              {sidePicks.map((slot, i) => (
                // min-height pins the slot geometry so client-side alternate
                // swaps (different title lengths) can't reflow the section.
                <div key={slot.key} className="py-5 first:pt-0 min-h-[104px]">
                  {slot.alts.map((p, a) => (
                    <Link
                      key={`${p.slug}-${a}`}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      data-pick-alt={a}
                      className="group grid grid-cols-[auto_1fr] gap-4 items-start"
                    >
                      <div className="font-instrument text-3xl text-[var(--brand)] leading-none w-10">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-ink-soft">
                          {p.category} · {p.readingTime}
                        </div>
                        <h4 className="font-instrument text-lg text-ink mt-1.5 leading-snug line-clamp-2 group-hover:text-[var(--brand)] transition-colors">
                          {p.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
              <script dangerouslySetInnerHTML={{ __html: picksRotationScript }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT BAND, sticker style ============ */}
      <section className="relative border-y border-rule bg-surface-2/60 rz-beam">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-md)] grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            <div
              className="home-card rz-reveal rounded-lg p-8 text-background relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--brand) 80%, var(--ink)), color-mix(in oklab, var(--ink) 90%, var(--brand)))",
              }}
            >
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] opacity-80">
                ◆ About me
              </div>
              {/* Career-scope only, each on its own line (two-tier clean). The
                  platform "$1B+" appears below in the band prose in its own
                  sentence, never joined to a career marker in one clause. */}
              <div className="font-instrument text-3xl mt-3 leading-tight">
                {profile.career.years} years.
                <br />
                {profile.career.marketCount} markets.
                <br />
                {profile.career.industryCount} industries.
              </div>
              {/* mt-[18px] + py-1.5 keeps the visual 24px gap while growing
                  the hit area to 32px (Gate-A 2026-07-08, WCAG 2.5.8). */}
              <Link
                to="/resume"
                className="mt-[18px] py-1.5 -mb-1.5 inline-flex items-center gap-1.5 text-sm group"
              >
                View resume{" "}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-instrument text-2xl md:text-[34px] text-ink leading-[1.25]">
              Before payments, I learned reliability in systems where failure had real consequences.
              That operating discipline now shapes how I build financial infrastructure:{" "}
              <span className="italic text-[var(--brand)]">
                controlled, scalable, auditable, and resilient.
              </span>{" "}
              At Simpaisa today that platform moves $1B+ a year.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.metrics.slice(0, 4).map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <div className="home-card rz-reveal rounded-lg border border-rule bg-card p-4 h-full">
                    <div className="font-mono-tech text-xl text-ink">
                      <AnimatedMetric value={m.value} />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-1 font-mono-tech">
                      {m.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ G. CREDENTIALS STRIP ============ */}
      <CredentialsStrip />

      {/* ============ TESTIMONIALS (renders only with real quotes) ======= */}
      <Testimonials />

      {/* ============ HOW I WORK / FAQ ============ */}
      <HowIWorkFaq />

      {/* ============ I. GET-IN-TOUCH BAND (audience router) ============ */}
      <GetInTouchBand />

      {/* Owned-audience surface — the newsletter the "Building?" card points to.
          Kept as the shared NewsletterSignup so the Web3Forms wiring and the
          newsletter_signup analytics event stay consistent site-wide. */}
      <div className="mx-auto max-w-3xl px-5 sm:px-6 pb-24">
        <NewsletterSignup placement="home_get_in_touch" fromPage="/" />
      </div>
    </div>
  );
}
