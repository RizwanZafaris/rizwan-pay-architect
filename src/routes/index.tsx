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
var FS='#version 300 es\\n'+
'precision highp float;\\n'+
'out vec4 O;\\n'+
'uniform vec2 resolution;\\n'+
'uniform float time;\\n'+
/* 21st.dev shader-background port (plasma lines + light dots riding them),
   recolored: purple/indigo -> brand teal/cyan on warm near-black. Grid
   branch of the original removed (unused). Lines read as living payment
   rails behind the monument type. */
'const float overallSpeed=0.2;\\n'+
'const float gridSmoothWidth=0.015;\\n'+
'const float minLineWidth=0.01;\\n'+
'const float maxLineWidth=0.2;\\n'+
'const float lineSpeed=1.0*overallSpeed;\\n'+
'const float lineAmplitude=1.0;\\n'+
'const float lineFrequency=0.2;\\n'+
'const float warpSpeed=0.2*overallSpeed;\\n'+
'const float warpFrequency=0.5;\\n'+
'const float warpAmplitude=1.0;\\n'+
'const float offsetFrequency=0.5;\\n'+
'const float offsetSpeed=1.33*overallSpeed;\\n'+
'const float minOffsetSpread=0.6;\\n'+
'const float maxOffsetSpread=2.0;\\n'+
'const int linesPerGroup=16;\\n'+
'const vec4 lineColor=vec4(0.11,0.52,0.47,1.0);\\n'+
'const vec4 bgColor1=vec4(0.039,0.039,0.043,1.0);\\n'+
'const vec4 bgColor2=vec4(0.045,0.106,0.104,1.0);\\n'+
'#define drawCircle(pos,radius,coord) smoothstep(radius+gridSmoothWidth,radius,length(coord-(pos)))\\n'+
'#define drawSmoothLine(pos,halfWidth,t) smoothstep(halfWidth,0.0,abs(pos-(t)))\\n'+
'#define drawCrispLine(pos,halfWidth,t) smoothstep(halfWidth+gridSmoothWidth,halfWidth,abs(pos-(t)))\\n'+
'float random(float t){return (cos(t)+cos(t*1.3+1.3)+cos(t*1.4+1.4))/3.0;}\\n'+
'float getPlasmaY(float x,float horizontalFade,float offset){return random(x*lineFrequency+time*lineSpeed)*horizontalFade*lineAmplitude+offset;}\\n'+
'void main(void){\\n'+
'vec2 fragCoord=gl_FragCoord.xy;\\n'+
'vec2 uv=fragCoord.xy/resolution.xy;\\n'+
'vec2 space=(fragCoord-resolution.xy/2.0)/resolution.x*2.0*5.0;\\n'+
'float horizontalFade=1.0-(cos(uv.x*6.28)*0.5+0.5);\\n'+
'float verticalFade=1.0-(cos(uv.y*6.28)*0.5+0.5);\\n'+
'space.y+=random(space.x*warpFrequency+time*warpSpeed)*warpAmplitude*(0.5+horizontalFade);\\n'+
'space.x+=random(space.y*warpFrequency+time*warpSpeed+2.0)*warpAmplitude*horizontalFade;\\n'+
'vec4 lines=vec4(0.0);\\n'+
'for(int l=0;l<linesPerGroup;l++){\\n'+
'float normalizedLineIndex=float(l)/float(linesPerGroup);\\n'+
'float offsetTime=time*offsetSpeed;\\n'+
'float offsetPosition=float(l)+space.x*offsetFrequency;\\n'+
'float rand=random(offsetPosition+offsetTime)*0.5+0.5;\\n'+
'float halfWidth=mix(minLineWidth,maxLineWidth,rand*horizontalFade)/2.0;\\n'+
'float offset=random(offsetPosition+offsetTime*(1.0+normalizedLineIndex))*mix(minOffsetSpread,maxOffsetSpread,horizontalFade);\\n'+
'float linePosition=getPlasmaY(space.x,horizontalFade,offset);\\n'+
'float line=drawSmoothLine(linePosition,halfWidth,space.y)/2.0+drawCrispLine(linePosition,halfWidth*0.15,space.y);\\n'+
'float circleX=mod(float(l)+time*lineSpeed,25.0)-12.0;\\n'+
'vec2 circlePosition=vec2(circleX,getPlasmaY(circleX,horizontalFade,offset));\\n'+
'float circle=drawCircle(circlePosition,0.01,space)*4.0;\\n'+
'line=line+circle;\\n'+
'lines+=line*lineColor*rand;}\\n'+
'vec4 col=mix(bgColor1,bgColor2,uv.x);\\n'+
'col*=(0.55+0.45*verticalFade);\\n'+
'col+=lines*0.85;\\n'+
/* cyan lift on the brightest cores so dots read as signal, then a radial
   vignette drops the corners to ink for the monument type contrast. */
'col.rgb+=vec3(0.176,0.831,0.749)*clamp(lines.g-0.55,0.0,1.0)*0.5;\\n'+
'vec2 cuv=(fragCoord-0.5*resolution.xy)/min(resolution.x,resolution.y);\\n'+
'float vig=smoothstep(1.42,0.2,length(cuv));\\n'+
'col.rgb=mix(bgColor1.rgb,col.rgb,vig);\\n'+
'O=vec4(col.rgb,1.0);}';
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

// 21st.dev "particle-text-effect" port — vanilla canvas (the site ships no
// hydration, so the original React/useEffect component would never run).
// Faithful physics (steering particles, proximity slow-down, color blending,
// hold-to-scatter) with brand adaptations: teal/cyan/off-white particle ramp
// instead of random RGB, warm near-black motion-blur trail, IO play/pause,
// reduced-motion = static first word, resize re-targets the current word.
const particleWordsScript = `(function(){function init(){try{
var c=document.querySelector('[data-particle-words]');if(!c)return;
var ctx=c.getContext('2d');if(!ctx)return;
var WORDS=['PAYMENTS','WALLETS','CROSS-BORDER','SETTLEMENT','FRONTIER MARKETS'];
var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function size(){var w=c.clientWidth|0,h=c.clientHeight|0;if(w&&h&&(c.width!==w||c.height!==h)){c.width=w;c.height=h;return true;}return false;}
size();
function drawStatic(){ctx.fillStyle='#0a0a0b';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#2dd4bf';ctx.font='800 '+Math.min(150,c.width/(WORDS[0].length*0.62))+'px Inter,Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(WORDS[0],c.width/2,c.height/2);}
if(reduced){drawStatic();return;}
var parts=[],frame=0,wi=0,run=false,raf=0,mouse={x:0,y:0,down:false};
function rand(a,b){return a+Math.random()*(b-a);}
function pickColor(){var t=Math.random();return t<0.55?{r:45,g:212,b:191}:(t<0.85?{r:94,g:234,b:212}:{r:242,g:240,b:236});}
function edgePos(){var cx=c.width/2,cy=c.height/2,m=(c.width+c.height)/2;var dx=Math.random()*c.width-cx,dy=Math.random()*c.height-cy;var mg=Math.sqrt(dx*dx+dy*dy)||1;return{x:cx+dx/mg*m,y:cy+dy/mg*m};}
function makeP(){var ms=rand(4,10);var p={x:0,y:0,vx:0,vy:0,tx:0,ty:0,ms:ms,mf:ms*0.05,cw:0,cb:rand(0.0025,0.03),sr:10,sg:10,sb:11,tr:10,tg:10,tb:11,dead:false};var rp=edgePos();p.x=rp.x;p.y=rp.y;return p;}
function blendStart(p){p.sr=p.sr+(p.tr-p.sr)*p.cw;p.sg=p.sg+(p.tg-p.sg)*p.cw;p.sb=p.sb+(p.tb-p.sb)*p.cw;p.cw=0;}
function kill(p){if(!p.dead){var rp=edgePos();p.tx=rp.x;p.ty=rp.y;blendStart(p);p.tr=10;p.tg=10;p.tb=11;p.dead=true;}}
function nextWord(word){var oc=document.createElement('canvas');oc.width=c.width;oc.height=c.height;var o=oc.getContext('2d');
o.fillStyle='#fff';o.font='800 '+Math.min(150,c.width/(word.length*0.62))+'px Inter,Arial,sans-serif';o.textAlign='center';o.textBaseline='middle';o.fillText(word,c.width/2,c.height/2);
var px=o.getImageData(0,0,c.width,c.height).data;var col=pickColor();var idx=0;var step=c.width<640?5:6;
var coords=[];for(var i=0;i<px.length;i+=step*4)coords.push(i);
for(var i=coords.length-1;i>0;i--){var j=(Math.random()*(i+1))|0;var t=coords[i];coords[i]=coords[j];coords[j]=t;}
for(var k=0;k<coords.length;k++){var ci=coords[k];if(px[ci+3]>0){var x=(ci/4)%c.width,y=((ci/4)/c.width)|0,p;
if(idx<parts.length){p=parts[idx];p.dead=false;idx++;}else{p=makeP();parts.push(p);}
blendStart(p);p.tr=col.r;p.tg=col.g;p.tb=col.b;p.tx=x;p.ty=y;}}
for(var k2=idx;k2<parts.length;k2++)kill(parts[k2]);}
function loop(){if(!run)return;
ctx.fillStyle='rgba(10,10,11,0.12)';ctx.fillRect(0,0,c.width,c.height);
for(var i=parts.length-1;i>=0;i--){var p=parts[i];
var dx=p.tx-p.x,dy=p.ty-p.y,d=Math.sqrt(dx*dx+dy*dy),prox=d<100?d/100:1;
if(d>0){dx=dx/d*p.ms*prox;dy=dy/d*p.ms*prox;}
var sx=dx-p.vx,sy=dy-p.vy,sm=Math.sqrt(sx*sx+sy*sy);
if(sm>0){sx=sx/sm*p.mf;sy=sy/sm*p.mf;}
p.vx+=sx;p.vy+=sy;p.x+=p.vx;p.y+=p.vy;
if(p.cw<1)p.cw=Math.min(p.cw+p.cb,1);
ctx.fillStyle='rgb('+((p.sr+(p.tr-p.sr)*p.cw)|0)+','+((p.sg+(p.tg-p.sg)*p.cw)|0)+','+((p.sb+(p.tb-p.sb)*p.cw)|0)+')';
ctx.fillRect(p.x,p.y,2,2);
if(p.dead&&(p.x<-4||p.x>c.width+4||p.y<-4||p.y>c.height+4))parts.splice(i,1);}
if(mouse.down){for(var m=0;m<parts.length;m++){var q=parts[m],qx=q.x-mouse.x,qy=q.y-mouse.y;if(qx*qx+qy*qy<2500)kill(q);}}
frame++;if(frame%240===0){wi=(wi+1)%WORDS.length;nextWord(WORDS[wi]);}
raf=requestAnimationFrame(loop);}
function play(){if(run)return;run=true;raf=requestAnimationFrame(loop);}
function stop(){run=false;cancelAnimationFrame(raf);}
ctx.fillStyle='#0a0a0b';ctx.fillRect(0,0,c.width,c.height);
nextWord(WORDS[0]);
if(window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches){
c.addEventListener('pointerdown',function(e){mouse.down=true;var r=c.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;},{passive:true});
c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;},{passive:true});
window.addEventListener('pointerup',function(){mouse.down=false;},{passive:true});}
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(size())nextWord(WORDS[wi]);},200);});
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(e){if(e[0]&&e[0].isIntersecting)play();else stop();},{threshold:0.05});io.observe(c);}else{play();}
document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else if(c.getBoundingClientRect().bottom>0)play();});
}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();`;

// 21st.dev "the-infinite-grid" port — the framer-motion cursor-mask reveal
// becomes CSS mask vars driven by one rAF-throttled pointermove (fine
// pointers only); the grid drift is a pure CSS background-position loop.
const gridRevealScript = `(function(){function init(){try{
if(!window.matchMedia)return;
if(!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var s=document.querySelector('[data-igrid]');if(!s)return;var raf=0,x=0,y=0;
function up(){raf=0;s.style.setProperty('--gmx',x+'px');s.style.setProperty('--gmy',y+'px');}
s.addEventListener('pointermove',function(e){var r=s.getBoundingClientRect();x=e.clientX-r.left;y=e.clientY-r.top;if(!raf)raf=requestAnimationFrame(up);},{passive:true});
}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();`;

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
        {/* Payment-rail field — now a full-bleed stage layer (v2 monument
            hero): faint circuit routes with cyan pulses travelling them,
            scaled-and-cropped by preserveAspectRatio slice. The pulses'
            offset-paths in hero-next.css use viewBox units, so they scale
            with the SVG untouched. Under the portrait and scrim. */}
        <div
          aria-hidden="true"
          className="rz-rail-field pointer-events-none absolute inset-0 z-0"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 520 640"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path className="rz-rail" strokeOpacity={0.12} d="M -24 128 H 168 Q 178 128 178 138 V 356 Q 178 366 188 366 H 544" />
            <path className="rz-rail" strokeOpacity={0.08} d="M 64 -24 V 186 Q 64 196 74 196 H 306 Q 316 196 316 206 V 664" />
            <path className="rz-rail" strokeOpacity={0.14} d="M 544 84 H 396 Q 386 84 386 94 V 258 Q 386 268 376 268 H 128 Q 118 268 118 278 V 664" />
            <path className="rz-rail" strokeOpacity={0.1} d="M -24 492 H 246 Q 256 492 256 482 V 336 Q 256 326 266 326 H 544" />
            <path className="rz-rail" strokeOpacity={0.06} d="M 442 -24 V 142 Q 442 152 452 152 H 544" />
            <circle className="rz-rail-node" cx={178} cy={250} r={1.6} />
            <circle className="rz-rail-node" cx={316} cy={330} r={1.6} />
            <circle className="rz-rail-node rz-rail-node-hot" cx={386} cy={176} r={1.8} />
            <circle className="rz-rail-pulse rz-rail-pulse-1" r={2.4} />
            <circle className="rz-rail-pulse rz-rail-pulse-2" r={2.2} />
            <circle className="rz-rail-pulse rz-rail-pulse-3" r={2.4} />
          </svg>
        </div>
        {/* Cinematic scrim — darkens the left/text field, seats the portrait
            into the stage, and fades the base so the monument type stays at
            AA+ everywhere it crosses the portrait. Above portrait (z-[1]),
            below content (z-10). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.62) 46%, rgba(10,10,11,0.22) 76%, rgba(10,10,11,0.05) 100%), linear-gradient(180deg, rgba(10,10,11,0.4) 0%, transparent 26%, transparent 70%, rgba(10,10,11,0.85) 100%)",
          }}
        />

        {/* Portrait — no longer a framed column: a cinematic cut-out layer
            anchored to the stage's bottom-right, BEHIND the monument type
            (z-0, under the scrim). Eager + high priority: it is part of the
            first paint. Hidden below md, where type carries the viewport. */}
        <div
          data-hero-portrait
          className="pointer-events-none absolute bottom-0 right-0 z-0 hidden md:block h-[62svh] lg:h-[70svh] aspect-[4/5] max-w-[40vw]"
        >
          <div
            aria-hidden
            className="rz-glow-par pointer-events-none absolute inset-x-[8%] inset-y-[14%] -z-10 rounded-[45%] blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(60% 60% at 55% 42%, color-mix(in oklab, var(--brand) 24%, transparent), transparent 74%)",
            }}
          />
          <picture>
            <source
              type="image/webp"
              srcSet={`${portraitWebpSmall} 460w, ${portraitWebp} 920w`}
              sizes="(max-width: 1024px) 44vw, 40vw"
            />
            <img
              src={portraitPng}
              alt="Portrait of Rizwan Zafar, Chief Product Officer, Payments"
              width={920}
              height={1150}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-contain object-bottom"
            />
          </picture>
        </div>

        {/* ── Monument content: top status rail / full-width H1 / grounded
            subline+CTA row / bottom hairline rail. flex-col justify-between
            fills the 100svh stage. ── */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-5 sm:px-8 lg:px-12 pt-28 md:min-h-[100svh] md:pt-36 pb-6 md:pb-8">
          {/* TOP — status rail: eyebrow left, location + availability right. */}
          <div
            data-hero-in
            style={{ ["--i" as string]: 0 }}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
          >
            <span className="inline-flex items-center gap-4">
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
            </span>
            <span className="hidden sm:inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
              <span>Dubai · UAE</span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse"
                />
                Open to senior roles
              </span>
            </span>
          </div>

          {/* CENTER — the monument. Same sentence, recomposed to four short
              lines so the face can run at 7.4vw full-bleed. sr-only spaces
              keep the H1 extracting as one readable sentence. */}
          <h1 className="font-instrument tracking-[-0.02em] leading-[0.95] text-ink text-[clamp(2.75rem,7vw,8.5rem)] py-6 md:py-10">
            {/* Line 1 = LCP anchor. NEVER wrapped/transformed/clipped. */}
            <span className="block">
              I build payment<span className="sr-only"> </span>
            </span>
            <span className="block">
              and product infrastructure<span className="sr-only"> </span>
            </span>
            <span className="block">
              for the markets<span className="sr-only"> </span>
            </span>
            {/* Final line = signature line-mask rise, carries the scramble. */}
            <span className="block rz-line-clip">
              <span className="rz-line-rise">
                most operators{" "}
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

          {/* GROUND — subline left, CTAs right, then the hairline rail. */}
          <div>
            <div className="max-w-2xl">
              {/* Two-tier safe: sentence 1 carries only career-scope markers
                  ("17 years", "ten markets"); sentence 2 carries only platform
                  metrics ("$1B+", "150+ merchants"). The full stop between them
                  is a clause boundary for the seo-audit gate — do not merge. */}
              <p
                data-hero-in
                style={{ ["--i" as string]: 1 }}
                className="max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-base"
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
              <div
                data-hero-in
                style={{ ["--i" as string]: 2 }}
                className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center"
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
                {/* Journey CTA: no typed ctaClick() call — the DOM bridge in
                    __root.tsx fires cta_click from the data-analytics-*
                    attributes (the CtaId union has no journey id). */}
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
            </div>

            {/* Bottom hairline rail: certifications left, scroll cue right.
                Same ◆ mono language; text chips only, no fabricated badges.
                Names trace to profile.certifications. */}
            <div
              data-hero-in
              style={{ ["--i" as string]: 3 }}
              className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule pt-4 md:mt-10"
            >
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5">
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
                      className="inline-flex items-center rounded-full border border-rule bg-card/60 px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-ink-soft font-mono-tech leading-none"
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              </span>
              <span
                aria-hidden
                className="hidden items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech md:inline-flex"
              >
                Scroll
                <span className="rz-scroll-cue text-[var(--brand)]">↓</span>
              </span>
            </div>
          </div>
        </div>
        </div>

      {/* ============ B. PROOF BAND ============ */}
      <ProofBand />

      {/* ============ SIGNAL WORDS (21st.dev particle-text port) ============ */}
      {/* Domain vocabulary forming and dissolving as steering particles —
          words trace to site content (no new claims). Decorative: canvas is
          aria-hidden with an sr-only list mirror; reduced-motion renders the
          first word statically; no-JS shows the ink ground only. */}
      <section className="rz-beam relative overflow-hidden border-b border-rule bg-background">
        <canvas
          data-particle-words
          aria-hidden
          className="block h-[280px] w-full md:h-[360px]"
        />
        <ul className="sr-only" aria-label="Operating domains">
          <li>Payments</li>
          <li>Wallets</li>
          <li>Cross-border</li>
          <li>Settlement</li>
          <li>Frontier markets</li>
        </ul>
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 hidden text-center text-[9px] uppercase tracking-[0.22em] text-ink-soft/70 font-mono-tech md:block">
          Hold and drag to scatter
        </div>
        <script dangerouslySetInnerHTML={{ __html: particleWordsScript }} />
      </section>

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
              <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.02]">
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
          {/* V2 monument pass: the 3-up card grid is gone. Each featured
              case is a full-width editorial panel — image field one side,
              display-scale hero metric + title the other, alternating
              direction. Same data, links and rz-unveil image treatment. */}
          <div data-rz-stagger className="flex flex-col gap-14 md:gap-24">
            {featuredCases.map((c, i) => {
              const heroStat = c.metrics?.[0];
              const flip = i % 2 === 1;
              return (
                <Link
                  key={c.slug}
                  to="/product-work/$slug"
                  params={{ slug: c.slug }}
                  className="group relative grid items-center gap-6 md:grid-cols-12 md:gap-12"
                >
                  <div
                    className={`rz-unveil relative aspect-[16/10] overflow-hidden rounded-lg bg-ink md:col-span-7 ${
                      flip ? "md:order-2" : ""
                    }`}
                  >
                    <img
                      src={caseStudyThumb(c.slug)}
                      alt={c.imageAlt ?? `${c.title} — abstract editorial illustration`}
                      width={800}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 [transition-timing-function:var(--ease-soft)] group-hover:scale-[1.035]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, color-mix(in oklab, #000 32%, transparent) 0%, transparent 40%, color-mix(in oklab, #000 45%, transparent) 100%)",
                      }}
                    />
                    <div className="absolute top-4 left-5 z-10 font-mono-tech text-[10px] tracking-[0.18em] text-background/95 uppercase">
                      ◆ Case study /0{i + 1}
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-[var(--brand)]">
                      {c.category}
                    </span>
                    {heroStat && (
                      <div className="mt-4">
                        <div className="font-instrument italic leading-none tracking-tight text-ink text-5xl md:text-6xl lg:text-7xl">
                          {heroStat.value}
                        </div>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-soft font-mono-tech">
                          {heroStat.label}
                        </div>
                      </div>
                    )}
                    <h3 className="font-instrument text-2xl md:text-3xl text-ink mt-5 leading-tight transition-colors group-hover:text-[var(--brand)]">
                      {c.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-ink-soft mt-3 leading-relaxed max-w-md">
                      {c.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-[var(--brand)]">
                      Read case study
                      <span
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </div>
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
      <section data-igrid className="relative bg-surface border-y border-rule rz-beam overflow-hidden">
        {/* 21st.dev infinite-grid port: drifting base grid + cursor-revealed
            cyan grid (CSS mask at --gmx/--gmy) + brand glow field. All
            aria-hidden, pointer-events-none, behind the z-10 content. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="rz-igrid-base" />
          <div className="rz-igrid-reveal" />
          <div className="rz-igrid-glow rz-igrid-glow-a" />
          <div className="rz-igrid-glow rz-igrid-glow-b" />
        </div>
        <script dangerouslySetInnerHTML={{ __html: gridRevealScript }} />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-[var(--space-section-sm)]">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] font-mono-tech font-semibold">
                ◆ Products
              </div>
              <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.02] max-w-3xl">
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
              <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5.5rem)] text-ink mt-3 leading-[1.02]">
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
            {/* V2 monument pass: the mint gradient card is gone — the career
                scope reads as stacked statement numerals on the open ground. */}
            <div className="rz-reveal">
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[var(--brand)] font-semibold">
                ◆ About me
              </div>
              {/* Career-scope only, each on its own line (two-tier clean). The
                  platform "$1B+" appears below in the band prose in its own
                  sentence, never joined to a career marker in one clause. */}
              <div className="font-instrument text-ink mt-5 leading-[1.08] text-[clamp(2.5rem,4.2vw,4rem)]">
                {profile.career.years} <span className="text-ink-soft">years.</span>
                <br />
                {profile.career.marketCount} <span className="text-ink-soft">markets.</span>
                <br />
                {profile.career.industryCount} <span className="text-ink-soft">industries.</span>
              </div>
              {/* py-1.5 keeps the visual gap while growing the hit area to
                  32px (Gate-A 2026-07-08, WCAG 2.5.8). */}
              <Link
                to="/resume"
                className="mt-6 py-1.5 -mb-1.5 inline-flex items-center gap-1.5 text-sm text-ink group"
              >
                <span className="rz-link">View resume</span>{" "}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-instrument text-[26px] md:text-[38px] lg:text-[42px] text-ink leading-[1.22]">
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
