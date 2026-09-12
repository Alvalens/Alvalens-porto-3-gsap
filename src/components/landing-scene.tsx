"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
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
  SiSpringboot,
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
  { label: "Backend", value: "Java Spring Boot", className: "tech-card--state", symbol: "springboot", rx: -12, ry: 20, duration: "7s", isBg: false, type: "icon" },
  { label: "Metrics", value: "Malang, GMT+7", className: "tech-card--devops", symbol: "metrics", rx: 6, ry: -12, duration: "5.9s", isBg: true, type: "dashboard-4x4" },
  { label: "Design", value: "Figma Design", className: "tech-card--figma", symbol: "figma", rx: -10, ry: 18, duration: "6.3s", isBg: false, type: "icon" },
  { label: "GitHub", value: "@Alvalens", className: "tech-card--testing", symbol: "github", rx: 8, ry: -14, duration: "6s", isBg: false, type: "capsule" }
];

// Official Full Stack SWE Project Data mapping
const projectsData = [
  {
    id: "intervyou",
    num: "01",
    title: "Intervyou AI",
    year: "2025",
    url: "https://www.intervyou.me",
    desc: "Google for Startups & NVIDIA backed SaaS platform providing realistic voice interview simulations. Leverages Gemini logic, responsive gesture tracking, and Midtrans payment processing for 3,000+ active users.",
    tags: ["NextJS", "TypeScript", "Prisma", "MySQL", "Midtrans", "GCP"],
    img: "/image/projects/web/intervyou/intervyou-thumbnail.jpg",
    featured: true
  },
  {
    id: "iv-kogen",
    num: "02",
    title: "iv-kogen",
    year: "2026",
    url: "#",
    desc: "Brand-aware AI content studio transforming brand guidelines into Instagram Carousels, Video Scripts, and Captions. Grounded in institutional style guides using sentence-aware chunking, batch embeddings, and Gemini RAG modules.",
    tags: ["NextJS", "TypeScript", "Gemini API", "RAG", "PostgreSQL", "Prisma"],
    img: "/image/projects/ai/iv-kogen/iv-kogen-thumbnail.png",
    featured: false
  },
  {
    id: "quanta",
    num: "03",
    title: "Quanta",
    year: "2026",
    url: "https://medium.com/@alvalens/automating-rationality-why-i-built-an-ai-sentinel-for-my-idx-portfolio-5020cc8e4ea4",
    desc: "Self-hosted AI agent monitoring a personal IDX stock portfolio. Scans news, technical indicators (OBV, PER, SMA-200), and schedules to push color-coded recommendations to Discord using Gemini AI Tool Calling.",
    tags: ["React", "NodeJS", "Express", "Prisma", "Gemini API", "AI Tool Calling"],
    img: "/image/projects/web/quanta/quanta-thumbnail.png",
    featured: false
  },
  {
    id: "modesakti",
    num: "04",
    title: "ModeSakti",
    year: "2026",
    url: "http://modesakti.com",
    desc: "National educational repository for Indonesian teachers to submit and discover inclusive innovations. Engineered with role-based validation workflow, server-side tables, Spatie permissions, and custom credentialing.",
    tags: ["PHP", "Laravel", "Inertia.js", "React", "Shadcn UI", "MySQL"],
    img: "/image/projects/web/modesakti/modesakti-thumbnail.png",
    featured: false
  }
];

// Official Career History Data mapping
const experienceData = [
  {
    time: "Aug 2026 – Present",
    role: "Fullstack Engineer",
    company: "Vouch Technology PTE LTD",
    companyShort: "Vouch Technology",
    desc: "Shipping full-stack production features within days, including bringing a new platform from development to go-live in roughly two weeks. Engineered production AI systems with tool calling and graceful error recovery, and built core product workflows spanning payments, background processing, and third-party integrations.",
    skills: ["Next.js", "Node.js", "Generative AI", "Stripe", "GCP Cloud Tasks"]
  },
  {
    time: "Jun 2025 – Present",
    role: "Founder & Chief Technology Officer (Part-time)",
    company: "Intervyou (Google for Startups & NVIDIA Inception)",
    companyShort: "Intervyou",
    desc: "Bootstrapped an AI-powered SaaS to 3,000+ registered users and profitability on GCP Cloud Run. Architected a multi-agent AI assessment engine for content, audio, and non-verbal evaluation, and designed a token-based monetization system for B2B pilots across SMK Telkom schools.",
    skills: ["Next.js", "Node.js", "Multi-Agent AI", "GCP Cloud Run", "PostgreSQL", "Sentry"]
  },
  {
    time: "Aug 2025 – Aug 2026",
    role: "Fullstack Programmer",
    company: "MGG Software PTE LTD (Singapore Government Platform)",
    companyShort: "MGG Software",
    desc: "Contributed to a large-scale Singapore government enterprise platform on Spring Boot and React.js. Resolved a critical silent data-loss bug across 8 workflow services, cut endpoint latency ~50% on high-traffic modules, and delivered a third-party government integration with zero post-launch incidents.",
    skills: ["Java Spring Boot", "React.js", "MSSQL", "Oracle", "Azure AD", "Hibernate"]
  },
  {
    time: "Feb 2025 – Aug 2025",
    role: "IT Implementation Specialist",
    company: "Joki Proyek (Contract)",
    companyShort: "Joki Proyek",
    desc: "Engineered internal microservices architecture. Refactored legacy monolithic modules and optimized messaging systems using Laravel, Next.js, MySQL, PostgreSQL, and Docker containerizations.",
    skills: ["Next.js", "Laravel", "MySQL", "PostgreSQL", "MongoDB", "Docker"]
  },
  {
    time: "Jul 2024 – Jan 2025",
    role: "AI Trainer",
    company: "Outlier AI (Remote Freelance)",
    companyShort: "Outlier AI",
    desc: "Trained Large Language Models (LLM) using RLHF (Reinforcement Learning from Human Feedback), focusing on enhancing human language alignment, response verification, and fine-tuning prompt behaviors.",
    skills: ["Generative AI", "RLHF", "LLM", "Prompt Engineering"]
  },
  {
    time: "Sep 2023 – Jul 2025",
    role: "Web Developer & AI Consultant",
    company: "Freelance (Malang)",
    companyShort: "Freelance",
    desc: "Architected a multi-modal AI mental health support system integrating Gemini API with a RAG pipeline and domain-specific fine-tuning. Implemented RBAC across multi-tenant apps and maintained 70–80% client retention across 15+ delivered projects spanning LMS, E-Commerce, and ERP systems.",
    skills: ["Gemini API", "RAG", "Laravel", "MySQL", "RBAC"]
  },
  {
    time: "Aug 2023 – Feb 2025",
    role: "IoT and Fullstack Developer",
    company: "PT Hafdzamedia Teknologi Aplikasi",
    companyShort: "Hafdzamedia",
    desc: "Diagnosed N+1 query bottlenecks, cutting response times from 3–8s to under 300ms. Engineered real-time LMS features with Firebase Realtime Database and Laravel Broadcasting, implemented Redis caching for payments, and established zero-downtime CI/CD pipelines via GitHub Actions.",
    skills: ["Laravel", "Firebase", "Redis", "MySQL", "GitHub Actions"]
  }
];

export default function LandingScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState("intervyou");
  const [activeExp, setActiveExp] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Track active hover tilt listeners for proper cleanup
    const elements = document.querySelectorAll(".tech-card-inner") as NodeListOf<HTMLElement>;

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
      gsap.set(".tech-card--focus", { z: -220, filter: "blur(2px)" });
      gsap.set(".tech-card--backend", { z: -260, filter: "blur(2.5px)" });
      gsap.set(".tech-card--devops", { z: -200, filter: "blur(2px)" });
      
      // 2. Staggered Foreground plane (in front of character) - all sharing same base CSS dimensions
      gsap.set(".tech-card--frontend", { z: 60, filter: "blur(0px)" });
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
        .to(".tech-card--backend", { xPercent: -20, yPercent: -5, scale: 1.0, z: -50, filter: "blur(0px)", rotateX: -5, rotateY: -35, rotateZ: 3, ease: "none" }, 0)
        .to(".tech-card--devops", { xPercent: 15, yPercent: -5, scale: 1.0, z: -40, filter: "blur(0px)", rotateX: -5, rotateY: -35, rotateZ: 2, ease: "none" }, 0)
        
        // Foreground layer card movements (all scale targets near 1.0, elements that zoom beyond Z: 600 blur out as they pass the lens)
        .to(".tech-card--frontend", { xPercent: -35, yPercent: -15, scale: 1.0, z: 500, rotateX: 10, rotateY: 35, rotateZ: 4, ease: "none" }, 0)
        .to(".tech-card--tailwind", { xPercent: 35, yPercent: 0, scale: 1.0, z: 820, filter: "blur(5.5px)", rotateX: -10, rotateY: -45, rotateZ: 10, ease: "none" }, 0)
        .to(".tech-card--state", { xPercent: -35, yPercent: -5, scale: 1.0, z: 500, rotateX: 8, rotateY: 30, rotateZ: -3, ease: "none" }, 0)
        .to(".tech-card--figma", { xPercent: -45, yPercent: 10, scale: 1.0, z: 520, rotateX: -8, rotateY: 35, rotateZ: 4, ease: "none" }, 0)
        .to(".tech-card--testing", { xPercent: 30, yPercent: 10, scale: 1.0, z: 720, filter: "blur(4.5px)", rotateX: 10, rotateY: -35, rotateZ: -8, ease: "none" }, 0)
        .to(".tech-card--typescript", { xPercent: 35, yPercent: -5, scale: 1.0, z: 780, filter: "blur(5px)", rotateX: -10, rotateY: -45, rotateZ: 3, ease: "none" }, 0)
        .to(".tech-card--database", { xPercent: 25, yPercent: 5, scale: 1.0, z: 760, filter: "blur(4.5px)", rotateX: 10, rotateY: -40, rotateZ: -4, ease: "none" }, 0)
        
        // Giant creative cards floating directly in front of character (scales capped at 1.05/1.02 to avoid pixelation)
        .to(".tech-card--graphics", { xPercent: 12, yPercent: -15, scale: 1.05, z: 640, filter: "blur(5px)", rotateX: -10, rotateY: -65, rotateZ: -5, ease: "none" }, 0)
        .to(".tech-card--code", { xPercent: -24, yPercent: -22, scale: 1.02, z: 620, filter: "blur(4px)", rotateX: 10, rotateY: 65, rotateZ: 5, ease: "none" }, 0)
        
        .to(".scroll-cue", { opacity: 0, y: 30, ease: "none" }, 0.15)

        // Cinematic camera exit dissolve sequence at the end of scroll scrub (starting at position 0.65 to 1.0)
        .to(".portrait-layer", { scale: 1.15, yPercent: 18, opacity: 0, ease: "power1.inOut" }, 0.65)
        .to(".office-layer", { scale: 1.25, filter: "blur(14px)", opacity: 0.06, ease: "power1.inOut" }, 0.7)
        .to(".tech-constellation--fg", { opacity: 0, filter: "blur(8px)", ease: "power1.inOut" }, 0.6)
        .to(".tech-constellation--bg", { opacity: 0, filter: "blur(8px)", ease: "power1.inOut" }, 0.6)
        .to(".scene-vignette", { opacity: 0.96, ease: "power1.inOut" }, 0.7)
        .to(".scene-intro", { scale: 1.25, opacity: 0, filter: "blur(8px)", ease: "power1.inOut" }, 0.65);
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
      case "springboot": return <SiSpringboot {...props} />;
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
              <span className="subtitle-tag">// Full Stack Software Engineer</span>
              <span className="subtitle-tag">Enterprise Systems & AI Products</span>
            </div>
          </div>

          {/* Background 3D Layer (Behind Portrait) */}
          <div className="tech-constellation tech-constellation--bg" aria-hidden="true">
            {techCards.filter(c => c.isBg).map((card) => (
              <article key={card.className} className={`tech-card ${card.className}`}>
                {renderCardInner(card)}
              </article>
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
          </div>

          <div className="scroll-cue"><span>Scroll to enter</span><ArrowDown size={16} /></div>
        </div>
      </section>

      {/* 1. ABOUT SECTION (Epic Editorial Spread) */}
      <section id="about" className="portfolio-section about-section" aria-label="About Alvalen">
        <div className="section-container">
          <div className="about-editorial-grid">
            <div className="about-visual">
              <div className="editorial-portrait-frame">
                <img src="/image/me-about-custom.png" alt="Alvalen Shafel" className="portrait-img" />
              </div>
              <div className="portrait-caption">
                <span>PORTRAIT // SF24</span>
                <span>MALANG, ID — 7°58'S</span>
              </div>

              {/* Interests Matrix Redesigned as clean, epic editorial text index */}
              <div className="editorial-interests">
                <h3>INTERESTS</h3>
                <div className="interests-list">
                  <div className="interest-item">
                    <span className="interest-num">I.</span>
                    <div className="interest-content">
                      <span className="interest-title">Gaming</span>
                      <p className="interest-desc">Immersive simulation, RPG, and tactical systems.</p>
                    </div>
                  </div>

                  <div className="interest-item">
                    <span className="interest-num">II.</span>
                    <div className="interest-content">
                      <span className="interest-title">Photography</span>
                      <p className="interest-desc">Street, editorial B&W framing, and focal captures.</p>
                    </div>
                  </div>

                  <div className="interest-item">
                    <span className="interest-num">III.</span>
                    <div className="interest-content">
                      <span className="interest-title">Videography</span>
                      <p className="interest-desc">Cinematic narratives, color grading, and sequences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-content">
              <p className="eyebrow">IDENTITY</p>
              <h2 className="section-title">Who Am I?</h2>
              
              <div className="editorial-panels">
                <div className="editorial-panel">
                  <span className="editorial-panel-eyebrow">01 / SYSTEMS</span>
                  <h3>Enterprise & Web Ecosystems</h3>
                  <p>
                    I am a <strong>Product-Minded Software Engineer</strong> specialized in bridging the gap between <strong>Modern Web Ecosystems and Enterprise Architectures</strong>. My journey is defined by high-stakes projects, ranging from government-scale microservices to scalable deployment pipelines.
                  </p>
                </div>

                <div className="editorial-panel">
                  <span className="editorial-panel-eyebrow">02 / LEADERSHIP</span>
                  <h3>Enterprise & AI SaaS Builder</h3>
                  <p>
                    Recognized as <strong>Best Computer Science Graduate</strong>, I bring a systems-engineering mindset to everything I build — from architecting enterprise-grade backends to founding and monetizing an AI SaaS product. My work spans full-stack product engineering and hands-on AI engineering across multi-agent pipelines and RAG architectures.
                  </p>
                </div>

                <div className="editorial-panel">
                  <span className="editorial-panel-eyebrow">03 / ACADEMICS</span>
                  <h3>Foundational Roots</h3>
                  <p>
                    Computer Science graduate from <strong>Universitas Negeri Malang</strong>. Blending algorithms and database theory with active, real-world product development, RAG embeddings, and full-stack software lifecycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNCONVENTIONAL PROJECTS LIST */}
      <section id="projects" className="portfolio-section projects-section" aria-label="Selected Projects">
        <div className="section-container">
          <p className="eyebrow">SELECTED WORKS</p>
          <h2 className="section-title">Projects</h2>
          
          <div className="projects-list">
            {projectsData.map((project) => (
              <a 
                key={project.id}
                href={project.url}
                target={project.url === "#" ? undefined : "_blank"}
                rel={project.url === "#" ? undefined : "noopener noreferrer"}
                className={`project-row ${activeProject === project.id ? "project-row--active" : ""}`}
                onMouseEnter={() => setActiveProject(project.id)}
                onClick={(e) => project.url === "#" && e.preventDefault()}
              >
                <div className="project-row-header">
                  <div className="project-row-title-block">
                    <span className="project-row-num">{project.num}</span>
                    <h3 className="project-row-title">
                      {project.title}
                      {project.featured && <span className="featured-badge">Featured</span>}
                    </h3>
                  </div>
                  <div className="project-row-meta">
                    <span className="project-row-year">{project.year}</span>
                    <span className="project-row-arrow">↗</span>
                  </div>
                </div>
                <div className="project-row-body">
                  <div className="project-row-content">
                    <div>
                      <p className="project-row-desc">{project.desc}</p>
                      <div className="project-row-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="project-row-media">
                      <img src={project.img} alt={project.title} className="project-row-img" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE ACCORDION SECTION */}
      <section id="experience" className="portfolio-section experience-section" aria-label="Professional Experience">
        <div className="section-container">
          <p className="eyebrow">CAREER PATH</p>
          <h2 className="section-title">Experience</h2>
          
          <div className="experience-accordion">
            {experienceData.map((exp, idx) => {
              const isActive = activeExp === idx;
              return (
                <div 
                  key={idx}
                  className={`experience-column ${isActive ? "experience-column--active" : ""}`}
                  onMouseEnter={() => setActiveExp(idx)}
                >
                  {/* Collapsed State layout details */}
                  <div className="exp-collapsed-indicator">
                    <span className="exp-num">{`0${idx + 1}`}</span>
                    <span className="exp-vert-company">{exp.companyShort}</span>
                  </div>

                  {/* Expanded Content layout details */}
                  <div className="exp-expanded-content">
                    <div className="exp-expanded-header">
                      <span className="exp-expanded-time">{exp.time}</span>
                      <span className="exp-expanded-company">{exp.company}</span>
                    </div>
                    
                    <div className="exp-expanded-body">
                      <h3 className="exp-expanded-role">{exp.role}</h3>
                      <p className="exp-expanded-desc">{exp.desc}</p>
                    </div>
                    
                    <div className="exp-expanded-footer">
                      <div className="exp-expanded-tags">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="exp-expanded-tag-pill">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FOOTER / CONTACT SECTION */}
      <footer id="contact" className="portfolio-footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>ALVALENS<span>®</span></h2>
              <p>Architecting production-ready engines — from high-traffic microservices to RAG-powered AI platforms.</p>
            </div>
            <div className="footer-contact">
              <p className="eyebrow">GET IN TOUCH</p>
              <a href="mailto:alvalen.shafel04@gmail.com" className="email-link">alvalen.shafel04@gmail.com</a>
              <div className="social-links">
                <a href="https://github.com/Alvalens" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/alvalen-shafel-8a081a254/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/alvalens_/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com/alvalen.shafel" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Alvalens. All rights reserved.</p>
            <p>Built with Next.js, GSAP & Tailwind v4</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
