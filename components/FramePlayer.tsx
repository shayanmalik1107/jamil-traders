'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Search, ArrowRight, ArrowDown, Menu, X, Sparkles, Building2, ShieldCheck, Award, FileCheck, CheckCircle2, Quote } from 'lucide-react';
import Lenis from 'lenis';

const HERO_TOTAL_FRAMES = 61; // frame_0001.png to frame_0061.png
const HERO_ANIMATION_DURATION_MS = 1500; // 1.5 seconds total

const ABOUT_FRAME_FILES = [
  "frame_001.webp", "frame_002.webp", "frame_003.webp", "frame_038.webp", "frame_039.webp", "frame_040.webp", "frame_041.webp", "frame_042.webp", "frame_043.webp", "frame_044.webp", "frame_045.webp", "frame_046.webp", "frame_047.webp", "frame_048.webp", "frame_049.webp", "frame_050.webp", "frame_051.webp", "frame_052.webp", "frame_053.webp", "frame_054.webp", "frame_055.webp", "frame_056.webp", "frame_057.webp", "frame_058.webp", "frame_059.webp", "frame_060.webp", "frame_061.webp", "frame_062.webp", "frame_063.webp", "frame_064.webp", "frame_065.webp", "frame_066.webp", "frame_067.webp", "frame_068.webp", "frame_069.webp", "frame_070.webp", "frame_071.webp", "frame_072.webp", "frame_073.webp", "frame_074.webp", "frame_075.webp", "frame_076.webp", "frame_077.webp", "frame_078.webp", "frame_079.webp", "frame_080.webp", "frame_081.webp", "frame_082.webp", "frame_083.webp", "frame_084.webp", "frame_085.webp", "frame_086.webp", "frame_087.webp", "frame_088.webp", "frame_089.webp", "frame_090.webp", "frame_091.webp"
];
const ABOUT_TOTAL_FRAMES = ABOUT_FRAME_FILES.length; // 57 frames
const ABOUT_ANIMATION_DURATION_MS = 500; // 0.5 seconds total

// Last frame paths for mobile static display
const HERO_LAST_FRAME = '/lighting_frames_same_as_video/frame_0061.png';
const ABOUT_LAST_FRAME = '/video_frames/frame_091.webp';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [heroLoadedCount, setHeroLoadedCount] = useState<number>(0);
  const [aboutLoadedCount, setAboutLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [aboutTab, setAboutTab] = useState<'PHILOSOPHY' | 'CRAFT' | 'LEGACY'>('PHILOSOPHY');
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setMounted(true);
    // Detect mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock background scroll completely when certificate modal is active
  useEffect(() => {
    if (certModalOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }

    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [certModalOpen]);

  const getHeroFramePath = (index: number) => {
    const padIndex = String(index + 1).padStart(4, '0');
    return `/lighting_frames_same_as_video/frame_${padIndex}.png`;
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

  // Preload frames — skip on mobile (use static img instead)
  useEffect(() => {
    if (isMobile) {
      // On mobile we use static images, no need to preload frame sequences
      setIsLoaded(true);
      return;
    }

    let isCancelled = false;
    const loadedHeroImages: HTMLImageElement[] = new Array(HERO_TOTAL_FRAMES);
    const loadedAboutImages: HTMLImageElement[] = new Array(ABOUT_TOTAL_FRAMES);

    heroImagesRef.current = loadedHeroImages;
    aboutImagesRef.current = loadedAboutImages;

    let heroCount = 0;
    let aboutCount = 0;

    // Safety Fallback: Force reveal page after 400ms so screen NEVER stays stuck black
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    }, 400);

    // Preload Hero Frames First for Superfast First Paint (<0.3s)
    for (let i = 0; i < HERO_TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getHeroFramePath(i);
      const handleLoad = () => {
        if (isCancelled) return;
        heroCount++;
        setHeroLoadedCount(heroCount);
        if (heroCount >= HERO_TOTAL_FRAMES) {
          setIsLoaded(true);
          clearTimeout(safetyTimer);
        }
      };
      img.onload = handleLoad;
      img.onerror = handleLoad;
      if (img.complete) {
        handleLoad();
      }
      loadedHeroImages[i] = img;
    }

    // Preload About Section Frames in background
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
      clearTimeout(safetyTimer);
    };
  }, [isMobile, renderAboutFrame, resizeCanvas]);

  // Scroll listener for Header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Resize listener for both canvases (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleResize = () => {
      resizeCanvas(heroCanvasRef.current);
      renderHeroFrame(HERO_TOTAL_FRAMES - 1);

      resizeCanvas(aboutCanvasRef.current);
      renderAboutFrame(ABOUT_TOTAL_FRAMES - 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, resizeCanvas, renderHeroFrame, renderAboutFrame]);

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

  // Start Hero Animation once preloader completes (desktop only)
  useEffect(() => {
    if (isMobile || !isLoaded) return;

    resizeCanvas(heroCanvasRef.current);
    renderHeroFrame(0);
    heroStartTimeRef.current = performance.now();
    heroRequestRef.current = requestAnimationFrame(animateHero);

    return () => {
      if (heroRequestRef.current) {
        cancelAnimationFrame(heroRequestRef.current);
      }
    };
  }, [isMobile, isLoaded, resizeCanvas, renderHeroFrame, animateHero]);

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

  // Trigger About section animation when section scrolls into view (desktop only)
  useEffect(() => {
    if (isMobile || !isLoaded || !aboutSectionRef.current) return;

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
  }, [isMobile, isLoaded, resizeCanvas, renderAboutFrame, animateAbout]);

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

  const currentLightLevel = isLoaded ? (isMobile ? 1 : animProgress) : 0;

  return (
    <>
      {/* 1. FIRST VIEW: HERO SECTION WITH FRAME ANIMATION (desktop) or STATIC IMAGE (mobile) */}
      <section className="hero-section">
        {/* Desktop: animated canvas */}
        {!isMobile && <canvas ref={heroCanvasRef} />}

        {/* Mobile: static last frame image as full background */}
        {isMobile && (
          <div className="hero-mobile-bg">
            <img
              src={HERO_LAST_FRAME}
              alt="Jameel Traders Lighting"
              className="hero-mobile-bg-img"
            />
            <div className="hero-mobile-bg-overlay" />
          </div>
        )}

        {/* Preloader Overlay (desktop only) */}
        {!isMobile && !isLoaded && (
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
                <span className="hero-eyebrow-pill">EST. 2002</span>
                <span>BESPOKE LIGHTING</span>
                <span>•</span>
                <span>ARCHITECTURAL LUMINAIRES</span>
                <span>•</span>
                <span>ILLUMINATION</span>
              </div>

              <h1 className="hero-title">
                Light That<br />
                <span className="hero-title-italic">Transforms.</span>
              </h1>

              <p className="hero-description">
                We engineer bespoke lighting systems that blend optics, beauty and purpose — bringing spaces to life.
              </p>

              <div className="hero-cta-group">
                <a href="#projects" className="hero-cta-btn">
                  <span>EXPLORE LUMINAIRES</span>
                  <div className="hero-cta-arrow">
                    <ArrowRight size={15} />
                  </div>
                </a>
              </div>
            </div>

            {/* Hero Right Light Bulb Container Wrapper — hidden on mobile */}
            <div className="bulb-card-wrapper">
              {/* User Light Bulb PNG Image Asset Rotated Upside-Down */}
              <img
                src="/bulb.png"
                alt="Light Bulb"
                className="bulb-bg-img"
              />

              {/* Text Content & Button Floating Gracefully Inside Large Bulb Dome */}
              <div className="hero-floating-card">
                <div className="bulb-card-headline-group">
                  <h3 className="bulb-card-title">
                    Where Light<br />
                    <span className="hero-title-italic">Meets Masterpiece.</span>
                  </h3>
                  <p className="bulb-card-sub">
                    Sculpting atmosphere, highlighting architecture, and elevating how illuminated spaces are felt.
                  </p>
                </div>

                <a href="#services" className="hero-cta-btn bulb-discover-btn">
                  <span>DISCOVER LIGHTING</span>
                  <div className="hero-cta-arrow">
                    <ArrowRight size={13} />
                  </div>
                </a>
              </div>
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
                  <span className="hero-capability-tag">01 • LUMINAIRES</span>
                  <span className="hero-capability-title">Bespoke Light Design</span>
                </div>
              </a>

              <div className="hero-capability-divider" />

              <a href="#services" className="hero-capability-item">
                <div className="hero-capability-icon">
                  <Building2 size={14} />
                </div>
                <div className="hero-capability-text">
                  <span className="hero-capability-tag">02 • OPTICS</span>
                  <span className="hero-capability-title">World-Class Fixtures</span>
                </div>
              </a>

              <div className="hero-capability-divider" />

              <a href="#services" className="hero-capability-item">
                <div className="hero-capability-icon">
                  <ShieldCheck size={14} />
                </div>
                <div className="hero-capability-text">
                  <span className="hero-capability-tag">03 • SOLUTIONS</span>
                  <span className="hero-capability-title">Turnkey Illumination</span>
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

      {/* 2. ABOUT SECTION WITH CEO FEATURE & VIDEO FRAME CANVAS BACKDROP */}
      <section id="about" ref={aboutSectionRef} className="about-frame-section">
        {/* Unique Luxury Content Grid Container */}
        <div className="about-hero-container">
          <div className="about-content-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">EST. 2002</span>
              <span>THE LEADERSHIP</span>
              <span>•</span>
              <span>VISIONARY CRAFT</span>
            </div>

            <h2 className="about-hero-title">
              Architecture Is <br />
              <span className="hero-title-italic">The Silence Between Lights.</span>
            </h2>

            {/* Interactive Tab Selector with Animated Sliding Background */}
            <div className="about-tab-selector">
              <div
                className="about-tab-slider-bg"
                style={{
                  transform:
                    aboutTab === 'PHILOSOPHY'
                      ? 'translateX(0%)'
                      : aboutTab === 'CRAFT'
                        ? 'translateX(100%)'
                        : 'translateX(200%)',
                }}
              />
              <button
                type="button"
                className={`about-tab-btn ${aboutTab === 'PHILOSOPHY' ? 'active' : ''}`}
                onClick={() => setAboutTab('PHILOSOPHY')}
              >
                PHILOSOPHY
              </button>
              <button
                type="button"
                className={`about-tab-btn ${aboutTab === 'CRAFT' ? 'active' : ''}`}
                onClick={() => setAboutTab('CRAFT')}
              >
                BESPOKE CRAFT
              </button>
              <button
                type="button"
                className={`about-tab-btn ${aboutTab === 'LEGACY' ? 'active' : ''}`}
                onClick={() => setAboutTab('LEGACY')}
              >
                OUR LEGACY
              </button>
            </div>

            {/* Tab Content Box with Large Gold Quote Icon */}
            <div className="about-tab-card">
              <Quote className="about-card-quote-mark" size={32} />
              <div className="about-tab-quote-body">
                {aboutTab === 'PHILOSOPHY' && (
                  <p className="about-tab-desc">
                    We do not simply illuminate spaces — we curate atmosphere. Every room should feel like a timeless composition where optics, luminaire craft, and human emotion seamlessly converge.
                  </p>
                )}
                {aboutTab === 'CRAFT' && (
                  <p className="about-tab-desc">
                    Mastery lies in optical precision. From hand-blown crystal chandeliers to architectural LED integration, our lighting standards honor absolute perfection without compromise.
                  </p>
                )}
                {aboutTab === 'LEGACY' && (
                  <p className="about-tab-desc">
                    Over two decades of pioneering luxury lighting solutions and turnkey architectural illumination across Asia & the Middle East. Building enduring partnerships rooted in brilliance.
                  </p>
                )}
              </div>
            </div>

            {/* Unique Architectural Excellence & Gold Seal Block */}
            <div className="about-excellence-block">
              <div className="about-excellence-item">
                <div className="about-excellence-badge">
                  <span className="about-excellence-dot" />
                  <span className="about-excellence-tag">OUR COMMITMENT</span>
                </div>
                <span className="about-excellence-title">Optical Precision • Luminaire Artistry • Uncompromising Brilliance</span>
              </div>

              <button
                type="button"
                className="about-seal-badge"
                onClick={() => setCertModalOpen(true)}
                title="Click to view official certificates"
              >
                <svg className="about-seal-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="#C8102E" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M20 8L23.5 15H31L25 19.5L27 27L20 22.5L13 27L15 19.5L9 15H16.5L20 8Z" fill="#C8102E" />
                </svg>
                <div className="about-seal-text">
                  <span>VIEW CERTIFICATES</span>
                  <strong>BRAND STANDARD ↗</strong>
                </div>
              </button>
            </div>

            {/* Stats Metrics */}
            <div className="about-stats-grid">
              <div className="about-stat-item">
                <span className="about-stat-num">25+</span>
                <span className="about-stat-label">YEARS OF ILLUMINATION</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat-item">
                <span className="about-stat-num">450+</span>
                <span className="about-stat-label">LIGHTING PROJECTS</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat-item">
                <span className="about-stat-num">100%</span>
                <span className="about-stat-label">BESPOKE LUMINAIRES</span>
              </div>
            </div>
          </div>

          {/* Right Column: CEO Portrait Card */}
          <div className="about-ceo-card-wrapper">
            <div className="about-ceo-frame">
              <img
                src="/ceo.png"
                alt="Malik Abdul Jamil - Founder & CEO"
                className="about-ceo-img"
              />
              <div className="about-ceo-img-glow" />

              {/* Floating Quote Badge */}
              <div className="about-ceo-quote-badge">
                <div className="about-quote-dot" />
                <div className="about-quote-text">
                  <span>EXCELLENCE IN LIGHTING & DESIGN</span>
                  <strong>JAMIL TRADERS LEADERSHIP</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. CERTIFICATES MODAL POPUP */}
      {certModalOpen && (
        <div className="cert-modal-overlay" data-lenis-prevent onClick={() => setCertModalOpen(false)}>
          <div className="cert-modal-content" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <header className="cert-modal-header">
              <div className="cert-modal-header-left">
                <div className="hero-eyebrow">
                  <span className="hero-eyebrow-pill">VERIFIED ACCREDITATIONS</span>
                  <span>JAMIL TRADERS</span>
                </div>
                <h3 className="cert-modal-title">Official Certificates & Standards</h3>
                <p className="cert-modal-sub">
                  Recognized internationally for optical quality management systems, luxury luminaire standards, and architectural lighting compliance.
                </p>
              </div>

              <button
                type="button"
                className="cert-modal-close-btn"
                onClick={() => setCertModalOpen(false)}
                aria-label="Close certificates modal"
              >
                <X size={20} />
              </button>
            </header>

            <div className="cert-grid">
              {/* Certificate 1 */}
              <div className="cert-card">
                <div className="cert-card-badge">
                  <CheckCircle2 size={12} />
                  <span>VERIFIED ACTIVE</span>
                </div>
                <div className="cert-preview-frame">
                  <Award size={36} className="cert-icon-red" />
                  <span className="cert-watermark">ISO 9001:2015</span>
                  <div className="cert-stamp">VERIFIED CERTIFIED</div>
                </div>
                <div className="cert-card-info">
                  <h4 className="cert-title">ISO 9001:2015 Lighting Quality Management</h4>
                  <span className="cert-issuer">International Organization for Standardization</span>
                  <p className="cert-desc">Official certification for rigorous quality control across luxury luminaire design and architectural lighting trading operations.</p>
                </div>
              </div>

              {/* Certificate 2 */}
              <div className="cert-card">
                <div className="cert-card-badge">
                  <CheckCircle2 size={12} />
                  <span>VERIFIED ACTIVE</span>
                </div>
                <div className="cert-preview-frame">
                  <ShieldCheck size={36} className="cert-icon-red" />
                  <span className="cert-watermark">LUXURY LIGHTING</span>
                  <div className="cert-stamp">ACCREDITED</div>
                </div>
                <div className="cert-card-info">
                  <h4 className="cert-title">Middle East Luxury Illumination Accreditation</h4>
                  <span className="cert-issuer">Global Architectural & Engineering Council</span>
                  <p className="cert-desc">Certified excellence in turnkey lighting execution, optical engineering, and acoustic luminaire integration for high-end spaces.</p>
                </div>
              </div>

              {/* Certificate 3 */}
              <div className="cert-card">
                <div className="cert-card-badge">
                  <CheckCircle2 size={12} />
                  <span>VERIFIED ACTIVE</span>
                </div>
                <div className="cert-preview-frame">
                  <Building2 size={36} className="cert-icon-red" />
                  <span className="cert-watermark">LUMINAIRE TRADING</span>
                  <div className="cert-stamp">COMPLIANT</div>
                </div>
                <div className="cert-card-info">
                  <h4 className="cert-title">International Luminaire Compliance Standard</h4>
                  <span className="cert-issuer">European Lighting & Optical Sourcing Board</span>
                  <p className="cert-desc">Ethical sourcing & premium grade authentication for Italian crystal, architectural brass, and optical LED systems.</p>
                </div>
              </div>

              {/* Certificate 4 */}
              <div className="cert-card">
                <div className="cert-card-badge">
                  <CheckCircle2 size={12} />
                  <span>VERIFIED ACTIVE</span>
                </div>
                <div className="cert-preview-frame">
                  <Sparkles size={36} className="cert-icon-red" />
                  <span className="cert-watermark">LIGHTING EXCELLENCE</span>
                  <div className="cert-stamp">HONOR AWARD</div>
                </div>
                <div className="cert-card-info">
                  <h4 className="cert-title">Bespoke Lighting Design Excellence Shield</h4>
                  <span className="cert-issuer">Architectural Lighting Forum</span>
                  <p className="cert-desc">Awarded for 20+ years of landmark architectural lighting craftsmanship and extraordinary client satisfaction.</p>
                </div>
              </div>
            </div>

            <footer className="cert-modal-footer">
              <span className="cert-footer-note">
                🔒 All certificates issued under license to Jameel Traders (Pvt) Ltd.
              </span>
              <button
                type="button"
                className="hero-talk-btn"
                onClick={() => setCertModalOpen(false)}
              >
                <span>CLOSE WINDOW</span>
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
