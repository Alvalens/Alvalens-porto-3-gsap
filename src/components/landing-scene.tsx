"use client";

import { ArrowDown, ArrowUpRight, Code2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const techCards = [
  { label: "Frontend", value: "Next.js / React", className: "tech-card--frontend", symbol: "01", rx: -6, ry: 16, duration: "5s", isBg: false, variant: "default" },
  { label: "Language", value: "TypeScript", className: "tech-card--typescript", symbol: "TS", rx: 7, ry: -18, duration: "6.5s", isBg: false, variant: "lg" },
  { label: "Styling", value: "Tailwind CSS v4", className: "tech-card--tailwind", symbol: "✨", rx: -10, ry: 22, duration: "7.2s", isBg: false, variant: "lg" },
  { label: "Craft", value: "Creative GSAP", className: "tech-card--code", symbol: "{ }", rx: -4, ry: 13, duration: "5.8s", isBg: false, variant: "lg" },
  { label: "Graphics", value: "WebGL / Three.js", className: "tech-card--graphics", symbol: "3D", rx: 8, ry: -15, duration: "8s", isBg: false, variant: "lg" },
  { label: "Focus", value: "Digital products", className: "tech-card--focus", symbol: "+", rx: 5, ry: -12, duration: "6.1s", isBg: true, variant: "sm" },
  
  // New Tech Stack Cards with variations
  { label: "Backend", value: "Node.js / Express", className: "tech-card--backend", symbol: "JS", rx: -8, ry: 14, duration: "5.4s", isBg: true, variant: "default" },
  { label: "Database", value: "PostgreSQL / Prisma", className: "tech-card--database", symbol: "DB", rx: 9, ry: -16, duration: "6.8s", isBg: false, variant: "lg" },
  { label: "State", value: "Zustand / Redux", className: "tech-card--state", symbol: "Z", rx: -12, ry: 20, duration: "7s", isBg: false, variant: "sm" },
  { label: "DevOps", value: "Docker / Vercel", className: "tech-card--devops", symbol: "🐋", rx: 6, ry: -12, duration: "5.9s", isBg: true, variant: "sq" },
  { label: "Design", value: "Figma / UI Design", className: "tech-card--figma", symbol: "Fi", rx: -10, ry: 18, duration: "6.3s", isBg: false, variant: "sq" },
  { label: "Testing", value: "Jest / Cypress", className: "tech-card--testing", symbol: "T", rx: 8, ry: -14, duration: "6s", isBg: false, variant: "sm" }
];

const codeBlocks = [
  {
    code: `const dev = {\n  name: "Alvalen",\n  role: "Creative Dev",\n  focus: "WebGL & GSAP"\n};`,
    className: "code-block--1",
    rx: 12,
    ry: -10,
    duration: "9s",
    isBg: false
  },
  {
    code: `// Scroll dolly zoom physics\nconst zoom = scroll * speed;\nstage.dolly(zoom);`,
    className: "code-block--2",
    rx: -8,
    ry: 14,
    duration: "7.5s",
    isBg: true
  }
];

export default function LandingScene() {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (reduceMotion.matches) return;

      // Stagger initial Z-depth states at mount to create immediate 3D depth layering
      // 1. Staggered Background plane (behind character)
      gsap.set(".code-block--2", { z: -240 });
      gsap.set(".tech-card--focus", { z: -220 });
      gsap.set(".tech-card--backend", { z: -260 });
      gsap.set(".tech-card--devops", { z: -200 });
      
      // 2. Staggered Foreground plane (in front of character)
      gsap.set(".tech-card--frontend", { z: 60 });
      gsap.set(".code-block--1", { z: 120 }); /* Starts further back than the Craft card */
      gsap.set(".tech-card--state", { z: 80 });
      gsap.set(".tech-card--figma", { z: 100 });
      gsap.set(".tech-card--testing", { z: 120 });
      
      // Right side foreground cards start closer to camera to look bigger
      gsap.set(".tech-card--typescript", { z: 130 });
      gsap.set(".tech-card--database", { z: 110 });
      gsap.set(".tech-card--tailwind", { z: 150 });
      
      // Giant cards directly in front of character (starts close and massive)
      gsap.set(".tech-card--graphics", { z: 340 });
      gsap.set(".tech-card--code", { z: 320 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
        },
      });

      timeline
        .to(".office-layer", { scale: 1.04, ease: "none" }, 0)
        .to(".portrait-layer", { scale: 1.12, yPercent: 3.5, xPercent: 0, ease: "none" }, 0)
        .to(".scene-vignette", { opacity: 0.80, ease: "none" }, 0)
        
        // Brand Title zooms fast in the absolute foreground (on top of character and front cards)
        .to(".scene-intro", { scale: 1.45, xPercent: -35, yPercent: 0, ease: "none" }, 0)
        
        // Background layer card movements (move forward slowly behind character, moderate 3D rotation)
        .to(".tech-card--focus", { xPercent: 15, yPercent: 0, scale: 1.30, z: -60, rotateX: -5, rotateY: -35, rotateZ: 2, ease: "none" }, 0)
        .to(".code-block--2", { xPercent: 18, yPercent: 0, scale: 1.28, z: -70, rotateX: -8, rotateY: -40, rotateZ: -2, ease: "none" }, 0)
        .to(".tech-card--backend", { xPercent: -20, yPercent: -5, scale: 1.25, z: -50, rotateX: -5, rotateY: 35, rotateZ: 3, ease: "none" }, 0)
        .to(".tech-card--devops", { xPercent: 15, yPercent: -5, scale: 1.26, z: -40, rotateX: -5, rotateY: -35, rotateZ: 2, ease: "none" }, 0)
        
        // Foreground layer card movements (zoom past character - dynamic 3D rotation)
        .to(".tech-card--frontend", { xPercent: -35, yPercent: -15, scale: 1.50, z: 500, rotateX: 10, rotateY: 35, rotateZ: 4, ease: "none" }, 0)
        .to(".tech-card--tailwind", { xPercent: 35, yPercent: 0, scale: 1.95, z: 820, rotateX: -10, rotateY: -45, rotateZ: 10, ease: "none" }, 0)
        .to(".code-block--1", { xPercent: -30, yPercent: 0, scale: 1.55, z: 300, rotateX: 10, rotateY: 40, rotateZ: -10, ease: "none" }, 0) /* Pushed physically behind Craft */
        .to(".tech-card--state", { xPercent: -35, yPercent: -5, scale: 1.50, z: 500, rotateX: 8, rotateY: 30, rotateZ: -3, ease: "none" }, 0)
        .to(".tech-card--figma", { xPercent: -45, yPercent: 10, scale: 1.55, z: 520, rotateX: -8, rotateY: 35, rotateZ: 4, ease: "none" }, 0)
        .to(".tech-card--testing", { xPercent: 30, yPercent: 10, scale: 1.75, z: 720, rotateX: 10, rotateY: -35, rotateZ: -8, ease: "none" }, 0)
        .to(".tech-card--typescript", { xPercent: 35, yPercent: -5, scale: 1.85, z: 780, rotateX: -10, rotateY: -45, rotateZ: 3, ease: "none" }, 0)
        .to(".tech-card--database", { xPercent: 25, yPercent: 5, scale: 1.80, z: 760, rotateX: 10, rotateY: -40, rotateZ: -4, ease: "none" }, 0)
        
        // Giant creative cards floating directly in front of character, zooming massive in front of camera lens
        .to(".tech-card--graphics", { xPercent: 12, yPercent: -15, scale: 1.15, z: 640, rotateX: -10, rotateY: -65, rotateZ: -5, ease: "none" }, 0)
        .to(".tech-card--code", { xPercent: -12, yPercent: 15, scale: 1.10, z: 620, rotateX: 10, rotateY: 65, rotateZ: 5, ease: "none" }, 0)
        
        .to(".scroll-cue", { opacity: 0, y: 30, ease: "none" }, 0.15);
    }, sceneRef);

    return () => context.revert();
  }, []);

  return (
    <main className="portfolio-shell">
      <section ref={sceneRef} className="scene-scroll" aria-label="Alvalen Shafel introduction">
        <div className="scene-stage">
          <div className="office-layer" aria-hidden="true" />
          <div className="scene-grain" aria-hidden="true" />
          <div className="scene-vignette" aria-hidden="true" />

          <header className="scene-nav">
            <a className="wordmark" href="#intro" aria-label="Alvalens home">ALVALENS<span>®</span></a>
            <div className="nav-status"><span /> Available for select work</div>
            <a className="nav-contact" href="mailto:alvalen.shafel04@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
          </header>

          <div className="scene-intro">
            <h1 className="hero-name">Alvalen</h1>
            <span className="hero-surname">Shafel</span>
          </div>

          {/* Background 3D Layer (Behind Portrait) */}
          <div className="tech-constellation tech-constellation--bg" aria-hidden="true">
            {techCards.filter(c => c.isBg).map((card) => {
              const variantClass = card.variant === "lg" ? "tech-card--lg-variant" :
                                   card.variant === "sq" ? "tech-card--sq-variant" :
                                   card.variant === "sm" ? "tech-card--sm-variant" : "";
              return (
                <article key={card.label} className={`tech-card ${card.className}`}>
                  <div 
                    className={`tech-card-inner ${variantClass}`}
                    style={{
                      "--rx": `${card.rx}deg`,
                      "--ry": `${card.ry}deg`,
                      "--float-duration": card.duration,
                    } as React.CSSProperties}
                  >
                    <span className="tech-symbol">{card.symbol}</span>
                    <div>
                      <p>{card.label}</p>
                      <h2>{card.value}</h2>
                    </div>
                  </div>
                </article>
              );
            })}

            {codeBlocks.filter(b => b.isBg).map((block, idx) => (
              <div key={idx} className={`code-block ${block.className}`}>
                <div 
                  className="code-block-inner"
                  style={{
                    "--rx": `${block.rx}deg`,
                    "--ry": `${block.ry}deg`,
                    "--float-duration": block.duration,
                  } as React.CSSProperties}
                >
                  <pre><code>{block.code}</code></pre>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Portrait Layer */}
          <div className="portrait-layer" aria-hidden="true" />

          {/* Foreground 3D Layer (In Front of Portrait) */}
          <div className="tech-constellation tech-constellation--fg" aria-label="Core skills and code stacks">
            {techCards.filter(c => !c.isBg).map((card) => {
              const variantClass = card.variant === "lg" ? "tech-card--lg-variant" :
                                   card.variant === "sq" ? "tech-card--sq-variant" :
                                   card.variant === "sm" ? "tech-card--sm-variant" : "";
              return (
                <article key={card.label} className={`tech-card ${card.className}`}>
                  <div 
                    className={`tech-card-inner ${variantClass}`}
                    style={{
                      "--rx": `${card.rx}deg`,
                      "--ry": `${card.ry}deg`,
                      "--float-duration": card.duration,
                    } as React.CSSProperties}
                  >
                    <span className="tech-symbol">{card.symbol}</span>
                    <div>
                      <p>{card.label}</p>
                      <h2>{card.value}</h2>
                    </div>
                  </div>
                </article>
              );
            })}

            {codeBlocks.filter(b => !b.isBg).map((block, idx) => (
              <div key={idx} className={`code-block ${block.className}`}>
                <div 
                  className="code-block-inner"
                  style={{
                    "--rx": `${block.rx}deg`,
                    "--ry": `${block.ry}deg`,
                    "--float-duration": block.duration,
                  } as React.CSSProperties}
                >
                  <pre><code>{block.code}</code></pre>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-cue"><span>Scroll to enter</span><ArrowDown size={16} /></div>
        </div>
      </section>

      <section className="after-scene" aria-label="Portfolio preview">
        <p className="eyebrow"><Code2 size={14} /> The next chapter</p>
        <h2>Selected work<br />is on its way.</h2>
        <p>This is the opening scene. Next, we can turn the projects, experience, and contact sections from your original portfolio into the rest of the journey.</p>
      </section>
    </main>
  );
}
