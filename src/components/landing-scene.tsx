"use client";

import { ArrowDown, ArrowUpRight, Code2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import strategic tech icons from Simple Icons library
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiThreedotjs, 
  SiNodedotjs, 
  SiPostgresql, 
  SiPython,
  SiFigma, 
  SiGithub, 
  SiGreensock 
} from "react-icons/si";

// Array mapping your strategic tech stack
const techCards = [
  { label: "Frontend", value: "Next.js / React", className: "tech-card--frontend", symbol: "nextjs", rx: -6, ry: 16, duration: "5s", isBg: false, type: "capsule" },
  { label: "Language", value: "TypeScript", className: "tech-card--typescript", symbol: "typescript", rx: 7, ry: -18, duration: "6.5s", isBg: false, type: "icon" },
  { label: "Styling", value: "Tailwind CSS", className: "tech-card--tailwind", symbol: "tailwind", rx: -10, ry: 22, duration: "7.2s", isBg: false, type: "capsule" },
  { label: "Craft", value: "Creative GSAP", className: "tech-card--code", symbol: "gsap", rx: -4, ry: 13, duration: "5.8s", isBg: false, type: "capsule" },
  { label: "Graphics", value: "WebGL / Three.js", className: "tech-card--graphics", symbol: "threejs", rx: 8, ry: -15, duration: "8s", isBg: false, type: "capsule" },
  { label: "Status", value: "Available", className: "tech-card--focus", symbol: "status", rx: 5, ry: -12, duration: "6.1s", isBg: true, type: "status-1x1" },
  
  // Custom Strategic Tech Cards (aligned with industry standard and Alvalen stack)
  { label: "Backend", value: "Node.js / NestJS", className: "tech-card--backend", symbol: "nodejs", rx: -8, ry: -14, duration: "5.4s", isBg: true, type: "capsule" },
  { label: "Database", value: "PostgreSQL / SQL", className: "tech-card--database", symbol: "postgresql", rx: 9, ry: -16, duration: "6.8s", isBg: false, type: "capsule" },
  { label: "Language", value: "Python", className: "tech-card--state", symbol: "python", rx: -12, ry: 20, duration: "7s", isBg: false, type: "icon" },
  { label: "Metrics", value: "Malang, GMT+7", className: "tech-card--devops", symbol: "metrics", rx: 6, ry: -12, duration: "5.9s", isBg: true, type: "dashboard-4x4" },
  { label: "Design", value: "Figma Design", className: "tech-card--figma", symbol: "figma", rx: -10, ry: 18, duration: "6.3s", isBg: false, type: "icon" },
  { label: "GitHub", value: "@Alvalens", className: "tech-card--testing", symbol: "github", rx: 8, ry: -14, duration: "6s", isBg: false, type: "capsule" }
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

    // Track active hover tilt listeners for proper cleanup
    const elements = document.querySelectorAll(".tech-card-inner, .code-block-inner") as NodeListOf<HTMLElement>;

    const onMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      
      const rx = -(dy / yc) * 18;
      const ry = (dx / xc) * 18;
      
      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 600,
        ease: "power2.out",
        duration: 0.3,
        overwrite: "auto"
      });
    };

    const onMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rx = card.style.getPropertyValue("--rx") || "0deg";
      const ry = card.style.getPropertyValue("--ry") || "0deg";
      
      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        ease: "power2.out",
        duration: 0.6,
        overwrite: "auto"
      });
    };

    elements.forEach((el) => {
      el.addEventListener("mousemove", onMouseMove as EventListener);
      el.addEventListener("mouseleave", onMouseLeave as EventListener);
    });

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (reduceMotion.matches) return;

      // Stagger initial Z-depth states at mount to create immediate 3D depth layering
      // 1. Staggered Background plane (behind character) - start with depth blur (DoF)
      gsap.set(".code-block--2", { z: -240, filter: "blur(2.5px)" });
      gsap.set(".tech-card--focus", { z: -220, filter: "blur(2px)" });
      gsap.set(".tech-card--backend", { z: -260, filter: "blur(2.5px)" });
      gsap.set(".tech-card--devops", { z: -200, filter: "blur(2px)" });
      
      // 2. Staggered Foreground plane (in front of character) - all sharing same base CSS dimensions
      gsap.set(".tech-card--frontend", { z: 60, filter: "blur(0px)" });
      gsap.set(".code-block--1", { z: 120, filter: "blur(0px)" });
      gsap.set(".tech-card--state", { z: 80, filter: "blur(0px)" });
      gsap.set(".tech-card--figma", { z: 100, filter: "blur(0px)" });
      gsap.set(".tech-card--testing", { z: 120, filter: "blur(0px)" });
      
      // Right side foreground cards
      gsap.set(".tech-card--typescript", { z: 130, filter: "blur(0px)" });
      gsap.set(".tech-card--database", { z: 110, filter: "blur(0px)" });
      gsap.set(".tech-card--tailwind", { z: 150, filter: "blur(0px)" });
      
      // Giant cards directly in front of character (starts closer, size is driven by perspective depth)
      gsap.set(".tech-card--graphics", { z: 340, filter: "blur(0px)" });
      gsap.set(".tech-card--code", { z: 320, filter: "blur(0px)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
        },
      });

      timeline
        .to(".office-layer", { scale: 1.18, filter: "blur(6px)", ease: "none" }, 0)
        .to(".portrait-layer", { scale: 1.12, yPercent: 3.5, xPercent: 0, ease: "none" }, 0)
        .to(".scene-vignette", { opacity: 0.80, ease: "none" }, 0)
        
        // Brand Title zooms fast in the absolute foreground (on top of character and front cards)
        .to(".scene-intro", { scale: 1.45, xPercent: -35, yPercent: 0, ease: "none" }, 0)
        
        // Background layer card movements (move forward slowly behind character, moderate 3D rotation, sharpen as they focus)
        .to(".tech-card--focus", { xPercent: 15, yPercent: 0, scale: 1.0, z: -60, filter: "blur(0px)", rotateX: -5, rotateY: -35, rotateZ: 2, ease: "none" }, 0)
        .to(".code-block--2", { xPercent: 18, yPercent: 0, scale: 1.0, z: -70, filter: "blur(0px)", rotateX: -8, rotateY: -40, rotateZ: -2, ease: "none" }, 0)
        .to(".tech-card--backend", { xPercent: -20, yPercent: -5, scale: 1.0, z: -50, filter: "blur(0px)", rotateX: -5, rotateY: -35, rotateZ: 3, ease: "none" }, 0) /* Corrected rotateY from +35 to -35 */
        .to(".tech-card--devops", { xPercent: 15, yPercent: -5, scale: 1.0, z: -40, filter: "blur(0px)", rotateX: -5, rotateY: -35, rotateZ: 2, ease: "none" }, 0)
        
        // Foreground layer card movements (all scale targets near 1.0, elements that zoom beyond Z: 600 blur out as they pass the lens)
        .to(".tech-card--frontend", { xPercent: -35, yPercent: -15, scale: 1.0, z: 500, rotateX: 10, rotateY: 35, rotateZ: 4, ease: "none" }, 0)
        .to(".tech-card--tailwind", { xPercent: 35, yPercent: 0, scale: 1.0, z: 820, filter: "blur(5.5px)", rotateX: -10, rotateY: -45, rotateZ: 10, ease: "none" }, 0)
        .to(".code-block--1", { xPercent: -30, yPercent: 0, scale: 1.0, z: 300, rotateX: 10, rotateY: 40, rotateZ: -10, ease: "none" }, 0)
        .to(".tech-card--state", { xPercent: -35, yPercent: -5, scale: 1.0, z: 500, rotateX: 8, rotateY: 30, rotateZ: -3, ease: "none" }, 0)
        .to(".tech-card--figma", { xPercent: -45, yPercent: 10, scale: 1.0, z: 520, rotateX: -8, rotateY: 35, rotateZ: 4, ease: "none" }, 0)
        .to(".tech-card--testing", { xPercent: 30, yPercent: 10, scale: 1.0, z: 720, filter: "blur(4.5px)", rotateX: 10, rotateY: -35, rotateZ: -8, ease: "none" }, 0)
        .to(".tech-card--typescript", { xPercent: 35, yPercent: -5, scale: 1.0, z: 780, filter: "blur(5px)", rotateX: -10, rotateY: -45, rotateZ: 3, ease: "none" }, 0)
        .to(".tech-card--database", { xPercent: 25, yPercent: 5, scale: 1.0, z: 760, filter: "blur(4.5px)", rotateX: 10, rotateY: -40, rotateZ: -4, ease: "none" }, 0) /* Added filter blur */
        
        // Giant creative cards floating directly in front of character (scales capped at 1.05/1.02 to avoid pixelation)
        .to(".tech-card--graphics", { xPercent: 12, yPercent: -15, scale: 1.05, z: 640, filter: "blur(5px)", rotateX: -10, rotateY: -65, rotateZ: -5, ease: "none" }, 0)
        .to(".tech-card--code", { xPercent: -24, yPercent: -22, scale: 1.02, z: 620, filter: "blur(4px)", rotateX: 10, rotateY: 65, rotateZ: 5, ease: "none" }, 0)
        
        .to(".scroll-cue", { opacity: 0, y: 30, ease: "none" }, 0.15);
    }, sceneRef);

    return () => {
      context.revert();
      elements.forEach((el) => {
        el.removeEventListener("mousemove", onMouseMove as EventListener);
        el.removeEventListener("mouseleave", onMouseLeave as EventListener);
      });
    };
  }, []);

  // SVG Brand Logo renderer
  const renderTechIcon = (iconKey: string) => {
    const props = { size: 15, className: "tech-logo-svg" };
    switch (iconKey) {
      case "nextjs": return <SiNextdotjs {...props} />;
      case "tailwind": return <SiTailwindcss {...props} />;
      case "typescript": return <SiTypescript {...props} />;
      case "threejs": return <SiThreedotjs {...props} />;
      case "nodejs": return <SiNodedotjs {...props} />;
      case "postgresql": return <SiPostgresql {...props} />;
      case "python": return <SiPython {...props} />;
      case "figma": return <SiFigma {...props} />;
      case "github": return <SiGithub {...props} />;
      case "gsap": return <SiGreensock {...props} />;
      default: return null;
    }
  };

  // Card sub-renderer based on type
  const renderCardInner = (card: typeof techCards[0]) => {
    if (card.type === "icon") {
      return (
        <div 
          className="tech-card-inner tech-card-inner--icon"
          style={{
            "--rx": `${card.rx}deg`,
            "--ry": `${card.ry}deg`,
            "--float-duration": card.duration,
          } as React.CSSProperties}
        >
          <span className="tech-symbol">{renderTechIcon(card.symbol)}</span>
          <span className="icon-name">{card.label}</span>
        </div>
      );
    }

    if (card.type === "status-1x1") {
      return (
        <div 
          className="tech-card-inner tech-card-inner--status"
          style={{
            "--rx": `${card.rx}deg`,
            "--ry": `${card.ry}deg`,
            "--float-duration": card.duration,
          } as React.CSSProperties}
        >
          <span className="status-dot-pulse" />
          <span className="status-text">ACTIVE</span>
        </div>
      );
    }

    if (card.type === "dashboard-4x4") {
      return (
        <div 
          className="tech-card-inner tech-card-inner--dashboard"
          style={{
            "--rx": `${card.rx}deg`,
            "--ry": `${card.ry}deg`,
            "--float-duration": card.duration,
          } as React.CSSProperties}
        >
          <div className="db-grid">
            <div className="db-item">
              <span className="db-label">LOC</span>
              <span className="db-value">MLG</span>
            </div>
            <div className="db-item">
              <span className="db-label">GMT</span>
              <span className="db-value">+7</span>
            </div>
            <div className="db-item">
              <span className="db-label">ROLE</span>
              <span className="db-value">DEV</span>
            </div>
            <div className="db-item">
              <span className="db-label">WORK</span>
              <span className="db-value">OPEN</span>
            </div>
          </div>
        </div>
      );
    }

    // Default 1x2 capsule
    return (
      <div 
        className="tech-card-inner"
        style={{
          "--rx": `${card.rx}deg`,
          "--ry": `${card.ry}deg`,
          "--float-duration": card.duration,
        } as React.CSSProperties}
      >
        <span className="tech-symbol">{renderTechIcon(card.symbol)}</span>
        <div>
          <p>{card.label}</p>
          <h2>{card.value}</h2>
        </div>
      </div>
    );
  };

  return (
    <main className="portfolio-shell">
      <section ref={sceneRef} className="scene-scroll" aria-label="Alvalen Shafel introduction">
        <div className="scene-stage">
          <div className="office-layer" aria-hidden="true" />
          <div className="scene-grain" aria-hidden="true" />
          <div className="scene-vignette" aria-hidden="true" />
          <div className="scene-halo" aria-hidden="true" />

          <header className="scene-nav">
            <a className="wordmark" href="#intro" aria-label="Alvalens home">ALVALENS<span>®</span></a>
            <div className="nav-status"><span /> Available for select work</div>
            <a className="nav-contact" href="mailto:alvalen.shafel04@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
          </header>

          <div className="scene-intro">
            <h1 className="hero-name">Alvalen</h1>
            <h1 className="hero-surname">Shafel</h1>
            <div className="hero-subtitle">
              <span className="subtitle-tag">// Creative Developer</span>
              <span className="subtitle-tag">Design Engineer</span>
            </div>
          </div>

          {/* Background 3D Layer (Behind Portrait) */}
          <div className="tech-constellation tech-constellation--bg" aria-hidden="true">
            {techCards.filter(c => c.isBg).map((card) => (
              <article key={card.className} className={`tech-card ${card.className}`}>
                {renderCardInner(card)}
              </article>
            ))}

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
            {techCards.filter(c => !c.isBg).map((card) => (
              <article key={card.className} className={`tech-card ${card.className}`}>
                {renderCardInner(card)}
              </article>
            ))}

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
