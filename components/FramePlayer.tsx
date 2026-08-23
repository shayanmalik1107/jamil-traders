'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Search, ArrowRight, ArrowDown, Menu, X, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import Lenis from 'lenis';

const HERO_TOTAL_FRAMES = 49; // frame_0000 to frame_0048
const HERO_ANIMATION_DURATION_MS = 1500; // 1.5 seconds total

const ABOUT_FRAME_FILES = [
  "frame_001.webp","frame_002.webp","frame_003.webp","frame_038.webp","frame_039.webp","frame_040.webp","frame_041.webp","frame_042.webp","frame_043.webp","frame_044.webp","frame_045.webp","frame_046.webp","frame_047.webp","frame_048.webp","frame_049.webp","frame_050.webp","frame_051.webp","frame_052.webp","frame_053.webp","frame_054.webp","frame_055.webp","frame_056.webp","frame_057.webp","frame_058.webp","frame_059.webp","frame_060.webp","frame_061.webp","frame_062.webp","frame_063.webp","frame_064.webp","frame_065.webp","frame_066.webp","frame_067.webp","frame_068.webp","frame_069.webp","frame_070.webp","frame_071.webp","frame_072.webp","frame_073.webp","frame_074.webp","frame_075.webp","frame_076.webp","frame_077.webp","frame_078.webp","frame_079.webp","frame_080.webp","frame_081.webp","frame_082.webp","frame_083.webp","frame_084.webp","frame_085.webp","frame_086.webp","frame_087.webp","frame_088.webp","frame_089.webp","frame_090.webp","frame_091.webp"
];
const ABOUT_TOTAL_FRAMES = ABOUT_FRAME_FILES.length; // 57 frames
const ABOUT_ANIMATION_DURATION_MS = 500; // 0.5 seconds total

export default function FramePlayer() {
  // Hero canvas refs
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroImagesRef = useRef<HTMLImageElement[]>([]);
  const heroRequestRef = useRef<number | null>(null);
  const heroStartTimeRef = useRef<number | null>(null);

  // About canvas refs
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const aboutCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const aboutImagesRef = useRef<HTMLImageElement[]>([]);
  const aboutRequestRef = useRef<number | null>(null);
  const aboutStartTimeRef = useRef<number | null>(null);
  const [aboutHasPlayed, setAboutHasPlayed] = useState<boolean>(false);

  const [mounted, setMounted] = useState<boolean>(false);
  const [heroLoadedCount, setHeroLoadedCount] = useState<number>(0);
  const [aboutLoadedCount, setAboutLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Lenis Inertial Smooth Scrolling physics
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const getHeroFramePath = (index: number) => {
    const padIndex = String(index).padStart(4, '0');
    return `/frames/frame_${padIndex}.webp`;
  };

  const getAboutFramePath = (index: number) => {
    return `/video_frames/${ABOUT_FRAME_FILES[index]}`;
  };

  // Resize canvas helper
  const resizeCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }, []);

  // Render hero frame
  const renderHeroFrame = useCallback((frameIdx: number) => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = heroImagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Render about frame with instant fallback to prevent any black flash
  const renderAboutFrame = useCallback((frameIdx: number) => {
    const canvas = aboutCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = aboutImagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = aboutImagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = aboutImagesRef.current.find((i) => i && i.complete && i.naturalWidth > 0) as HTMLImageElement;
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Preload frames (Eager Hero Preload for < 0.3s page reveal)
  useEffect(() => {
    let isCancelled = false;
    const loadedHeroImages: HTMLImageElement[] = new Array(HERO_TOTAL_FRAMES);
    const loadedAboutImages: HTMLImageElement[] = new Array(ABOUT_TOTAL_FRAMES);

    heroImagesRef.current = loadedHeroImages;
    aboutImagesRef.current = loadedAboutImages;

    let heroCount = 0;
    let aboutCount = 0;

    // Preload Hero Frames First for Superfast First Paint (<0.3s)
    for (let i = 0; i < HERO_TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getHeroFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        heroCount++;
        setHeroLoadedCount(heroCount);
        if (heroCount === HERO_TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        heroCount++;
        setHeroLoadedCount(heroCount);
        if (heroCount === HERO_TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      loadedHeroImages[i] = img;
    }

    // Preload About Section Frames in background immediately as Hero finishes
    for (let i = 0; i < ABOUT_TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getAboutFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        aboutCount++;
        setAboutLoadedCount(aboutCount);
        if (i === 0 || aboutCount === 1) {
          resizeCanvas(aboutCanvasRef.current);
          renderAboutFrame(0);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        aboutCount++;
        setAboutLoadedCount(aboutCount);
      };
      loadedAboutImages[i] = img;
    }

    return () => {
      isCancelled = true;
    };
  }, [renderAboutFrame, resizeCanvas]);

  // Scroll listener for Header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Resize listener for both canvases
  useEffect(() => {
    const handleResize = () => {
      resizeCanvas(heroCanvasRef.current);
      renderHeroFrame(HERO_TOTAL_FRAMES - 1);

      resizeCanvas(aboutCanvasRef.current);
      renderAboutFrame(ABOUT_TOTAL_FRAMES - 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resizeCanvas, renderHeroFrame, renderAboutFrame]);

  // Hero Animation loop
  const animateHero = useCallback((timestamp: number) => {
    if (!heroStartTimeRef.current) {
      heroStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - heroStartTimeRef.current;
    const currentProgress = Math.min(elapsed / HERO_ANIMATION_DURATION_MS, 1);

    const targetFrame = Math.min(
      Math.floor(currentProgress * HERO_TOTAL_FRAMES),
      HERO_TOTAL_FRAMES - 1
    );

    setAnimProgress(currentProgress);
    renderHeroFrame(targetFrame);

    if (currentProgress < 1) {
      heroRequestRef.current = requestAnimationFrame(animateHero);
    } else {
      setAnimProgress(1);
      renderHeroFrame(HERO_TOTAL_FRAMES - 1);
    }
  }, [renderHeroFrame]);

  // Start Hero Animation once preloader completes
  useEffect(() => {
    if (isLoaded) {
      resizeCanvas(heroCanvasRef.current);
      renderHeroFrame(0);
      heroStartTimeRef.current = performance.now();
      heroRequestRef.current = requestAnimationFrame(animateHero);
    }

    return () => {
      if (heroRequestRef.current) {
        cancelAnimationFrame(heroRequestRef.current);
      }
    };
  }, [isLoaded, resizeCanvas, renderHeroFrame, animateHero]);

  // About Animation Loop (Strictly 1 Second Duration: 1000ms)
  const animateAbout = useCallback((timestamp: number) => {
    if (!aboutStartTimeRef.current) {
      aboutStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - aboutStartTimeRef.current;
    const progress = Math.min(elapsed / ABOUT_ANIMATION_DURATION_MS, 1);

    const targetFrame = Math.min(
      Math.floor(progress * ABOUT_TOTAL_FRAMES),
      ABOUT_TOTAL_FRAMES - 1
    );

    renderAboutFrame(targetFrame);

    if (progress < 1) {
      aboutRequestRef.current = requestAnimationFrame(animateAbout);
    } else {
      renderAboutFrame(ABOUT_TOTAL_FRAMES - 1);
    }
  }, [renderAboutFrame]);

  // Trigger About section animation when section scrolls into view
  useEffect(() => {
    if (!isLoaded || !aboutSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resizeCanvas(aboutCanvasRef.current);
            renderAboutFrame(0);
            aboutStartTimeRef.current = performance.now();
            if (aboutRequestRef.current) {
              cancelAnimationFrame(aboutRequestRef.current);
            }
            aboutRequestRef.current = requestAnimationFrame(animateAbout);
            setAboutHasPlayed(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(aboutSectionRef.current);

    return () => {
      observer.disconnect();
      if (aboutRequestRef.current) {
        cancelAnimationFrame(aboutRequestRef.current);
      }
    };
  }, [isLoaded, resizeCanvas, renderAboutFrame, animateAbout]);

  const totalAllFrames = HERO_TOTAL_FRAMES + ABOUT_TOTAL_FRAMES;
  const currentLoadedAll = heroLoadedCount + aboutLoadedCount;
  const loadingPercentage = Math.round((currentLoadedAll / totalAllFrames) * 100);

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'JOURNAL', href: '#journal' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const currentLightLevel = isLoaded ? animProgress : 0;

  if (!mounted) return null;

  return (
    <>
      {/* Permanent Fixed Header Navbar Across All Sections */}
      <header className={`hero-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <a href="#" className="hero-logo">
          <svg
            className="hero-logo-icon"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 40V18L24 8L36 18V40H30V22L24 17L18 22V40H12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M6 40H42"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="hero-logo-text">
            <span className="hero-brand-name">JAMEEL</span>
            <span className="hero-brand-sub">TRADERS</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <ul className="hero-nav">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`hero-nav-item ${activeNav === item.label ? 'active' : ''}`}
                  onClick={() => setActiveNav(item.label)}
                >
                  <span>{item.label}</span>
                  {activeNav === item.label && <div className="hero-nav-active-dot" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="hero-header-actions">
          <a href="#contact" className="hero-talk-btn">
            <span>LET'S TALK</span>
            <div className="hero-talk-btn-arrow">
              <ArrowRight size={13} />
            </div>
          </a>

          <button
            className="hero-icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay">
          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`mobile-nav-link ${activeNav === item.label ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNav(item.label);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 1. FIRST VIEW: HERO SECTION WITH FRAME ANIMATION */}
      <section className="hero-section">
        {/* Hero Background Frame Canvas */}
        <canvas ref={heroCanvasRef} />

        {/* Preloader Overlay */}
        {!isLoaded && (
          <div className="loader-overlay">
            <div className="loader-content">
              <div className="loader-spinner" />
              <div className="loader-title">Loading Luxury Experience</div>
              <div className="loader-bar-bg">
                <div
                  className="loader-bar-fill"
                  style={{ width: `${loadingPercentage}%` }}
                />
              </div>
              <div className="loader-text">
                {currentLoadedAll} / {totalAllFrames} Assets Loaded ({loadingPercentage}%)
              </div>
            </div>
          </div>
        )}

        {/* Hero Container */}
        <div
          className="hero-container"
          style={{
            '--light-level': currentLightLevel,
          } as React.CSSProperties}
        >
          {/* Hero Main Content */}
          <main className="hero-body">
            <div className="hero-body-left">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-pill">EST. 1998</span>
                <span>TIMELESS</span>
                <span>•</span>
                <span>FUNCTIONAL</span>
                <span>•</span>
                <span>EXTRAORDINARY</span>
              </div>

              <h1 className="hero-title">
                Spaces<br />
                That <span className="hero-title-italic">Inspire.</span>
              </h1>

              <p className="hero-description">
                We craft timeless interiors that blend function, beauty and purpose — turning spaces into stories.
              </p>

              <div className="hero-cta-group">
                <a href="#projects" className="hero-cta-btn">
                  <span>EXPLORE OUR WORK</span>
                  <div className="hero-cta-arrow">
                    <ArrowRight size={15} />
                  </div>
                </a>
                <a href="#about" className="hero-secondary-btn">
                  <span>OUR CRAFT</span>
                </a>
              </div>
            </div>

            {/* Hero Right Floating Glass Card — Product Specifications */}
            <div className="hero-floating-card">
              <div className="hero-card-badge">
                <Sparkles size={13} className="hero-card-icon" />
                <span>FEATURED SPECIFICATION</span>
              </div>

              <div className="hero-card-product-specs">
                <div className="hero-product-spec-item">
                  <span className="hero-spec-label">COLLECTION</span>
                  <span className="hero-spec-value">Calacatta & Onyx</span>
                </div>
                <div className="hero-card-divider" />
                <div className="hero-product-spec-item">
                  <span className="hero-spec-label">FINISH</span>
                  <span className="hero-spec-value">Hand-Honed Brass</span>
                </div>
              </div>

              <p className="hero-card-desc">
                Direct importers of Italian marble, architectural wood veneers, and bespoke brass metalwork engineered for elite luxury interiors.
              </p>
            </div>
          </main>

          {/* Hero Footer Bar */}
          <footer className="hero-footer">
            <div className="hero-capabilities-grid">
              <a href="#services" className="hero-capability-item">
                <div className="hero-capability-icon">
                  <Sparkles size={14} />
                </div>
                <div className="hero-capability-text">
                  <span className="hero-capability-tag">01 • INTERIORS</span>
                  <span className="hero-capability-title">Bespoke Design</span>
                </div>
              </a>

              <div className="hero-capability-divider" />

              <a href="#services" className="hero-capability-item">
                <div className="hero-capability-icon">
                  <Building2 size={14} />
                </div>
                <div className="hero-capability-text">
                  <span className="hero-capability-tag">02 • TRADING</span>
                  <span className="hero-capability-title">World-Class Materials</span>
                </div>
              </a>

              <div className="hero-capability-divider" />

              <a href="#services" className="hero-capability-item">
                <div className="hero-capability-icon">
                  <ShieldCheck size={14} />
                </div>
                <div className="hero-capability-text">
                  <span className="hero-capability-tag">03 • CONTRACTING</span>
                  <span className="hero-capability-title">Turnkey Execution</span>
                </div>
              </a>
            </div>

            <a href="#about" className="hero-scroll-indicator" aria-label="Scroll to about section">
              <span className="hero-scroll-text">SCROLL</span>
              <div className="hero-scroll-btn">
                <ArrowDown size={14} />
              </div>
            </a>
          </footer>
        </div>
      </section>

      {/* 2. ABOUT SECTION WITH 1-SECOND VIDEO FRAME BACKGROUND */}
      <section id="about" ref={aboutSectionRef} className="about-frame-section">
        {/* Canvas for 1s Video Frame Background */}
        <canvas ref={aboutCanvasRef} className="about-canvas" />

        {/* Minimal Overlay Badge as Requested */}
        <div className="about-overlay-content">
          <div className="about-badge">
            <span className="about-badge-dot" />
            <span>ABOUT • 0.5s FRAME SEQUENCE</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS PLACEHOLDER SECTION */}
      <section id="projects" className="projects-section">
        <div className="about-container">
          <div className="about-header">
            <span className="about-eyebrow">SELECTED PORTFOLIO</span>
            <h2 className="about-title">Crafted for Distinction</h2>
          </div>

          <div className="projects-grid">
            <div
              className="project-card"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80)',
              }}
            >
              <div className="project-overlay" />
              <div className="project-info">
                <span className="project-category">RESIDENTIAL VILLA</span>
                <h3 className="project-title">The Grand Horizon Estate</h3>
              </div>
            </div>

            <div
              className="project-card"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80)',
              }}
            >
              <div className="project-overlay" />
              <div className="project-info">
                <span className="project-category">COMMERCIAL TOWER</span>
                <h3 className="project-title">Aura Executive Suites</h3>
              </div>
            </div>

            <div
              className="project-card"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url(https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80)',
              }}
            >
              <div className="project-overlay" />
              <div className="project-info">
                <span className="project-category">HOSPITALITY</span>
                <h3 className="project-title">Luxe Lounge & Spa</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

