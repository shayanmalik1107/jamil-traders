'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Search, ArrowRight, ArrowDown, Menu, X, Sparkles, Building2, ShieldCheck, Award, FileCheck, CheckCircle2, Quote } from 'lucide-react';
import Lenis from 'lenis';

const HERO_TOTAL_FRAMES = 61; // frame_0001.webp to frame_0061.webp
const HERO_ANIMATION_DURATION_MS = 1500; // 1.5 seconds total

// Hero static image for mobile display
const HERO_LAST_FRAME = '/lighting_frames_same_as_video/frame_0061.webp';

// Top-level document tagging to capture hard reload vs SPA navigation accurately
if (typeof window !== 'undefined' && !(window as any).__JT_DOC_TAGGED__) {
  (window as any).__JT_DOC_TAGGED__ = true;
  const isDocReload =
    typeof performance !== 'undefined' &&
    performance.getEntriesByType &&
    performance.getEntriesByType('navigation').length > 0 &&
    (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'reload';

  const currentPath = window.location.pathname;
  (window as any).__JT_DOC_INITIAL_PATH__ = currentPath;
  (window as any).__JT_DOC_WAS_RELOAD_ON_HOME__ = (isDocReload && currentPath === '/');

  if (isDocReload && currentPath === '/') {
    sessionStorage.removeItem('jt_hero_anim_played');
  } else if (currentPath !== '/') {
    sessionStorage.setItem('jt_hero_anim_played', 'true');
  }
}

export default function FramePlayer() {
  // Hero canvas refs
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroImagesRef = useRef<HTMLImageElement[]>([]);
  const heroRequestRef = useRef<number | null>(null);
  const heroStartTimeRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [heroLoadedCount, setHeroLoadedCount] = useState<number>(0);
  const [loaderProgress, setLoaderProgress] = useState<number>(0); // 0 to 1 progressive writing progress
  const [isWritingComplete, setIsWritingComplete] = useState<boolean>(false);
  const loadedCountRef = useRef<number>(0);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [aboutTab, setAboutTab] = useState<'PHILOSOPHY' | 'CRAFT' | 'LEGACY'>('PHILOSOPHY');
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      sessionStorage.setItem('jt_hero_anim_played', 'true');
    }

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
    return `/lighting_frames_same_as_video/frame_${padIndex}.webp`;
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

  // Render hero frame with nearest-frame fallback so animation never drops or stalls
  const renderHeroFrame = useCallback((frameIdx: number) => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = heroImagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
      // Find closest earlier loaded frame
      for (let i = frameIdx - 1; i >= 0; i--) {
        const prev = heroImagesRef.current[i];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
      }
      // If none earlier, check next loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIdx + 1; i < heroImagesRef.current.length; i++) {
          const next = heroImagesRef.current[i];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Check if hero animation should play
  const shouldPlayHeroAnimation = useCallback(() => {
    if (typeof window === 'undefined') return false;

    try {
      const win = window as any;
      if (win.__JT_DOC_WAS_RELOAD_ON_HOME__) {
        win.__JT_DOC_WAS_RELOAD_ON_HOME__ = false;
        sessionStorage.setItem('jt_hero_anim_played', 'true');
        return true;
      }
      if (win.__JT_DOC_INITIAL_PATH__ && win.__JT_DOC_INITIAL_PATH__ !== '/') {
        sessionStorage.setItem('jt_hero_anim_played', 'true');
        return false;
      }
      const hasPlayed = sessionStorage.getItem('jt_hero_anim_played') === 'true';
      if (hasPlayed) {
        return false;
      }
      if (window.location.pathname === '/') {
        sessionStorage.setItem('jt_hero_anim_played', 'true');
        return true;
      }
      sessionStorage.setItem('jt_hero_anim_played', 'true');
      return false;
    } catch (e) {
      return false;
    }
  }, []);

  // Fast Buffered Preloading & Snappy Text Writing Animation
  useEffect(() => {
    let isCancelled = false;
    const isMobileDevice = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    if (isMobileDevice) {
      // ON MOBILE: ONLY PRELOAD THE SINGLE HERO STATIC IMAGE AND HEADER LOGO
      let mobileLoadedCount = 0;

      const onMobileImageDone = () => {
        if (!isCancelled) {
          mobileLoadedCount += 1;
          loadedCountRef.current = mobileLoadedCount;
          setHeroLoadedCount(mobileLoadedCount);
        }
      };

      const heroImg = new Image();
      (heroImg as any).fetchPriority = 'high';
      heroImg.src = HERO_LAST_FRAME;
      heroImg.onload = onMobileImageDone;
      heroImg.onerror = onMobileImageDone;

      const logoImg = new Image();
      (logoImg as any).fetchPriority = 'high';
      logoImg.src = '/logojamiltraders.png';
      logoImg.onload = onMobileImageDone;
      logoImg.onerror = onMobileImageDone;

      const MIN_WRITE_DURATION_MS = 800;
      const startTime = performance.now();
      let animFrameId: number;

      const animateWriting = (now: number) => {
        if (isCancelled) return;
        const elapsed = now - startTime;
        const timeRatio = Math.min(elapsed / MIN_WRITE_DURATION_MS, 1);
        const isReady = mobileLoadedCount >= 1;

        const progress = isReady
          ? timeRatio
          : Math.min(timeRatio, 0.45);

        setLoaderProgress(progress);

        if (progress < 1 || !isReady) {
          animFrameId = requestAnimationFrame(animateWriting);
        } else {
          setLoaderProgress(1);
          setIsWritingComplete(true);

          setTimeout(() => {
            if (!isCancelled) {
              setIsSplitting(true);
              setTimeout(() => {
                if (!isCancelled) {
                  setIsLoaded(true);
                }
              }, 600);
            }
          }, 150);
        }
      };

      animFrameId = requestAnimationFrame(animateWriting);

      return () => {
        isCancelled = true;
        if (animFrameId) cancelAnimationFrame(animFrameId);
      };
    }

    // ON DESKTOP: SMART BUFFERED PRELOADING (DOES NOT FREEZE ON 61 FRAMES)
    const loadedHeroImages: HTMLImageElement[] = new Array(HERO_TOTAL_FRAMES);
    heroImagesRef.current = loadedHeroImages;
    loadedCountRef.current = 0;

    // Buffer threshold: First 8 frames + last frame is enough to begin smooth playback
    const BUFFER_READY_FRAMES = 8;

    for (let i = 0; i < HERO_TOTAL_FRAMES; i++) {
      const img = new Image();
      if (i < BUFFER_READY_FRAMES || i === HERO_TOTAL_FRAMES - 1) {
        (img as any).fetchPriority = 'high';
      }
      img.src = getHeroFramePath(i);
      const onDone = () => {
        if (!isCancelled) {
          loadedCountRef.current += 1;
          setHeroLoadedCount(loadedCountRef.current);
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
      loadedHeroImages[i] = img;
    }

    // Preload header logo with high priority
    const desktopLogoImg = new Image();
    (desktopLogoImg as any).fetchPriority = 'high';
    desktopLogoImg.src = '/logojamiltraders.png';

    // Snappy writing pace (850ms)
    const MIN_WRITE_DURATION_MS = 850;
    const startTime = performance.now();
    let animFrameId: number;

    const animateWriting = (now: number) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / MIN_WRITE_DURATION_MS, 1);
      
      // Buffer is ready as soon as the first few frames are loaded
      const isBufferReady = loadedCountRef.current >= Math.min(BUFFER_READY_FRAMES, 5);

      const progress = isBufferReady
        ? timeRatio
        : Math.min(timeRatio, 0.45);

      setLoaderProgress(progress);

      if (progress < 1 || !isBufferReady) {
        animFrameId = requestAnimationFrame(animateWriting);
      } else {
        setLoaderProgress(1);
        setIsWritingComplete(true);

        setTimeout(() => {
          if (!isCancelled) {
            setIsSplitting(true);
            setTimeout(() => {
              if (!isCancelled) {
                setIsLoaded(true);
              }
            }, 600);
          }
        }, 150);
      }
    };

    animFrameId = requestAnimationFrame(animateWriting);

    return () => {
      isCancelled = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
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

  // Resize listener for hero canvas (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleResize = () => {
      resizeCanvas(heroCanvasRef.current);
      renderHeroFrame(HERO_TOTAL_FRAMES - 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, resizeCanvas, renderHeroFrame]);

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

  // Start Hero Canvas Frame Animation immediately when loading screen split begins
  useEffect(() => {
    if (isMobile || !isSplitting) return;

    resizeCanvas(heroCanvasRef.current);
    renderHeroFrame(0);
    heroStartTimeRef.current = performance.now();
    heroRequestRef.current = requestAnimationFrame(animateHero);

    return () => {
      if (heroRequestRef.current) {
        cancelAnimationFrame(heroRequestRef.current);
      }
    };
  }, [isMobile, isSplitting, resizeCanvas, renderHeroFrame, animateHero]);

  const SLICE_COUNT = 12; // 12 narrow vertical slices across loading screen
  const currentLightLevel = isLoaded ? (isMobile ? 1 : animProgress) : (isSplitting ? animProgress : 0);

  return (
    <>
      {/* 1. FIRST VIEW: HERO SECTION WITH FRAME ANIMATION (desktop) or STATIC IMAGE (mobile) */}
      <section className="hero-section">
        {/* Desktop: animated canvas */}
        {!isMobile && <canvas ref={heroCanvasRef} />}

        {/* Mobile: static last frame image as full background with no overlay */}
        {isMobile && (
          <div className="hero-mobile-bg">
            <img
              src={HERO_LAST_FRAME}
              alt="Jameel Traders Lighting"
              className="hero-mobile-bg-img"
            />
          </div>
        )}

        {/* Loading Screen Overlay with Marquee Image & Progressive Jamil Traders Text Writing */}
        {!isLoaded && (
          <div className={`rope-loader-overlay ${isSplitting ? 'splitting' : ''}`}>
            {/* 12 Vertical Slice Panels Split in 2 Halves (Left half -> Left, Right half -> Right) */}
            <div className="loader-slices-container">
              {Array.from({ length: SLICE_COUNT }).map((_, idx) => {
                const isLeftHalf = idx < SLICE_COUNT / 2;
                const dirClass = isLeftHalf ? 'slide-left' : 'slide-right';
                // Stagger delay from center outward wave to left and right edges
                const distFromCenter = isLeftHalf ? (SLICE_COUNT / 2 - 1 - idx) : (idx - SLICE_COUNT / 2);
                const delayMs = distFromCenter * 45; 
                return (
                  <div
                    key={idx}
                    className={`loader-slice ${dirClass}`}
                    style={{
                      left: `${(idx / SLICE_COUNT) * 100}%`,
                      width: `${100 / SLICE_COUNT + 0.15}%`,
                      transitionDelay: `${delayMs}ms`,
                    }}
                  />
                );
              })}
            </div>

            {/* Center Loading Content */}
            <div className={`rope-loader-center ${isSplitting ? 'fade-out-logo' : ''}`}>
              {/* Official Brand Logo from Header */}
              <div className="loader-image-wrapper">
                <img
                  src="/logojamiltraders.png"
                  alt="Jamil Traders Logo"
                  className="loader-marquee-img"
                />
              </div>

              {/* Jamil Traders Progressive Text Writing Loading Animation */}
              <div className="loader-writing-wrap">
                <div className={`loader-writing-box ${isWritingComplete ? 'complete' : ''}`}>
                  {/* Faint base guide text */}
                  <span className="loader-writing-ghost" aria-hidden="true">
                    JAMIL TRADERS
                  </span>

                  {/* Active glowing illuminated text written as progress increases */}
                  <span
                    className="loader-writing-active"
                    style={{
                      clipPath: `inset(0 ${Math.max(0, (1 - loaderProgress) * 100).toFixed(2)}% 0 0)`,
                    }}
                  >
                    JAMIL TRADERS
                  </span>

                  {/* Luminous writing stylus / spark point at the leading edge */}
                  {loaderProgress > 0 && loaderProgress < 1 && (
                    <span
                      className="loader-writing-spark"
                      style={{
                        left: `${(loaderProgress * 100).toFixed(2)}%`,
                      }}
                    />
                  )}
                </div>

                <div className="loader-sub-title">BRIGHTEN YOUR LIFE</div>
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

      {/* 2. ABOUT SECTION WITH CEO FEATURE */}
      <section id="about" className="about-frame-section">
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
