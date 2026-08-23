'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Search, ArrowRight, ArrowDown, Menu, X, Sparkles, Building2, ShieldCheck } from 'lucide-react';

const HERO_TOTAL_FRAMES = 49; // frame_0000 to frame_0048
const HERO_ANIMATION_DURATION_MS = 2800; // 2.8 seconds total

const ABOUT_FRAME_FILES = [
  "frame_001.png","frame_002.png","frame_003.png","frame_038.png","frame_039.png","frame_040.png","frame_041.png","frame_042.png","frame_043.png","frame_044.png","frame_045.png","frame_046.png","frame_047.png","frame_048.png","frame_049.png","frame_050.png","frame_051.png","frame_052.png","frame_053.png","frame_054.png","frame_055.png","frame_056.png","frame_057.png","frame_058.png","frame_059.png","frame_060.png","frame_061.png","frame_062.png","frame_063.png","frame_064.png","frame_065.png","frame_066.png","frame_067.png","frame_068.png","frame_069.png","frame_070.png","frame_071.png","frame_072.png","frame_073.png","frame_074.png","frame_075.png","frame_076.png","frame_077.png","frame_078.png","frame_079.png","frame_080.png","frame_081.png","frame_082.png","frame_083.png","frame_084.png","frame_085.png","frame_086.png","frame_087.png","frame_088.png","frame_089.png","frame_090.png","frame_091.png"
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

  const getHeroFramePath = (index: number) => {
    const padIndex = String(index).padStart(4, '0');
    return `/frames/frame_${padIndex}.png`;
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

  // Render about frame
  const renderAboutFrame = useCallback((frameIdx: number) => {
    const canvas = aboutCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = aboutImagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Preload all hero & about frames
  useEffect(() => {
    let isCancelled = false;
    const loadedHeroImages: HTMLImageElement[] = new Array(HERO_TOTAL_FRAMES);
    const loadedAboutImages: HTMLImageElement[] = new Array(ABOUT_TOTAL_FRAMES);

    let heroCount = 0;
    let aboutCount = 0;

    const checkAllLoaded = () => {
      if (heroCount === HERO_TOTAL_FRAMES && aboutCount === ABOUT_TOTAL_FRAMES && !isCancelled) {
        heroImagesRef.current = loadedHeroImages;
        aboutImagesRef.current = loadedAboutImages;
        setIsLoaded(true);
      }
    };

    // Preload hero frames
    for (let i = 0; i < HERO_TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getHeroFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        heroCount++;
        setHeroLoadedCount(heroCount);
        checkAllLoaded();
      };
      img.onerror = () => {
        if (isCancelled) return;
        heroCount++;
        setHeroLoadedCount(heroCount);
        checkAllLoaded();
      };
      loadedHeroImages[i] = img;
    }

    // Preload about frames
    for (let i = 0; i < ABOUT_TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getAboutFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        aboutCount++;
        setAboutLoadedCount(aboutCount);
        checkAllLoaded();
      };
      img.onerror = () => {
        if (isCancelled) return;
        aboutCount++;
        setAboutLoadedCount(aboutCount);
        checkAllLoaded();
      };
      loadedAboutImages[i] = img;
    }

    return () => {
      isCancelled = true;
    };
  }, []);

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
          {/* Header Navigation Bar */}
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

          {/* Hero Main Content */}
          <main className="hero-body">
            <div className="hero-eyebrow">
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

            <a href="#projects" className="hero-cta-btn">
              <span>EXPLORE OUR WORK</span>
              <div className="hero-cta-arrow">
                <ArrowRight size={15} />
              </div>
            </a>
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

