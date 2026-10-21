'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, X, Sparkles, Building2, ShieldCheck, Award, CheckCircle2, Quote } from 'lucide-react';
import Lenis from 'lenis';

interface BannerItem {
  id: number;
  src: string;
  desktopSrc?: string;
  title: string;
  subtitle: string;
  tag: string;
  alt: string;
}

const BANNERS: BannerItem[] = [
  {
    id: 1,
    src: '/bannerbg1.png',
    title: 'Linear Lighting Architecture',
    subtitle: 'Geometric Suspended Luminaire Profiles',
    tag: 'AUDITORIUM & HALLS',
    alt: 'Jamil Traders Linear Lighting Architecture',
  },
  {
    id: 2,
    src: '/bannerbg2.png',
    title: 'Warm Ambient Illumination',
    subtitle: 'Dual-Emission Architectural Wall Sconces',
    tag: 'TRAVERTINE GALLERY',
    alt: 'Jamil Traders Ambient Wall Sconces',
  },
  {
    id: 3,
    src: '/bannerbg3.png',
    title: 'Architectural Colonnade',
    subtitle: 'Rhythmic Recessed Beams & Accent Optics',
    tag: 'OUTDOOR & PERGOLA',
    alt: 'Jamil Traders Architectural Colonnade Lighting',
  },
  {
    id: 4,
    src: '/bannerbg4.png',
    title: 'Luxury Living Atmosphere',
    subtitle: 'Seamless Concealed Cove & Spotlights',
    tag: 'RESIDENTIAL SUITE',
    alt: 'Jamil Traders Luxury Living Illumination',
  },
];

export default function FramePlayer() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loaderProgress, setLoaderProgress] = useState<number>(0);
  const [isWritingComplete, setIsWritingComplete] = useState<boolean>(false);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  const [aboutTab, setAboutTab] = useState<'PHILOSOPHY' | 'CRAFT' | 'LEGACY'>('PHILOSOPHY');
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setMounted(true);
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

  // Preload First Banner Image & Brand Logo to power the loading screen
  useEffect(() => {
    let isCancelled = false;
    let banner1Loaded = false;
    let logoLoaded = false;

    // 1. High-priority preload for Banner 1 — loader ends when THIS is ready
    const banner1Img = new Image();
    (banner1Img as any).fetchPriority = 'high';
    banner1Img.src = '/bannerbg1.png';
    banner1Img.onload = () => {
      banner1Loaded = true;
    };
    banner1Img.onerror = () => {
      banner1Loaded = true;
    };

    // 2. High-priority preload for Brand Logo
    const logoImg = new Image();
    (logoImg as any).fetchPriority = 'high';
    logoImg.src = '/logojamiltraders.png';
    logoImg.onload = () => {
      logoLoaded = true;
    };
    logoImg.onerror = () => {
      logoLoaded = true;
    };

    // 3. Preload remaining banners quietly in background
    ['/bannerbg2.png', '/bannerbg3.png', '/bannerbg4.png'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 4. Smooth continuous writing progress indicator tied to Banner 1
    let displayVal = 0;
    let completionTriggered = false;
    let animId: number;
    const startTime = performance.now();
    const MIN_WRITING_TIME_MS = 650; // Fluid sweep so text reveal is gracefully readable

    const updateProgress = (now: number) => {
      if (isCancelled) return;

      const elapsed = now - startTime;
      const isAssetReady = banner1Loaded && logoLoaded;

      // Real proportion capped at 0.75 until banner1 is verified loaded
      const timeRatio = Math.min(elapsed / MIN_WRITING_TIME_MS, 1);
      const target = isAssetReady ? timeRatio : Math.min(timeRatio * 0.75, 0.75);

      displayVal += (target - displayVal) * 0.16;

      if (isAssetReady && elapsed >= MIN_WRITING_TIME_MS && displayVal >= 0.96) {
        if (!completionTriggered) {
          completionTriggered = true;
          setLoaderProgress(1);
          setIsWritingComplete(true);

          // Brief moment on completed text, then split slices
          setTimeout(() => {
            if (!isCancelled) {
              setIsSplitting(true);
              setTimeout(() => {
                if (!isCancelled) {
                  setIsLoaded(true);
                }
              }, 550);
            }
          }, 120);
        }
      } else if (!completionTriggered) {
        setLoaderProgress(Math.min(displayVal, 0.99));
        animId = requestAnimationFrame(updateProgress);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      isCancelled = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Auto-advance banner carousel every 5.5s once hero is loaded
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isLoaded, currentBannerIndex]);

  const handleNextBanner = useCallback(() => {
    setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const handlePrevBanner = useCallback(() => {
    setCurrentBannerIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  const handleSelectBanner = useCallback((idx: number) => {
    setCurrentBannerIndex(idx);
  }, []);

  const SLICE_COUNT = 12; // 12 vertical slices for loading screen curtain

  return (
    <>
      {/* 1. FIRST VIEW: HERO SECTION WITH FULL-SCREEN ARCHITECTURAL BACKGROUND IMAGES */}
      <section className="hero-section">
        {/* Full Hero Background Image Carousel */}
        <div className="hero-banners-ambient" aria-hidden="true">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`hero-ambient-slide ${index === currentBannerIndex ? 'active' : ''}`}
            >
              <img
                src={(!isMobile && banner.desktopSrc) ? banner.desktopSrc : banner.src}
                alt={banner.alt}
                className="hero-ambient-img"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        <div className="hero-backdrop-scrim" aria-hidden="true" />

        {/* Loading Screen Overlay with Logo & Progressive Jamil Traders Text Writing */}
        {!isLoaded && (
          <div className={`rope-loader-overlay ${isSplitting ? 'splitting' : ''}`}>
            {/* 12 Vertical Slice Panels Split in 2 Halves (Left half -> Left, Right half -> Right) */}
            <div className="loader-slices-container">
              {Array.from({ length: SLICE_COUNT }).map((_, idx) => {
                const isLeftHalf = idx < SLICE_COUNT / 2;
                const dirClass = isLeftHalf ? 'slide-left' : 'slide-right';
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
              {/* Brand Logo */}
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

        {/* Hero Content Container */}
        <div className="hero-container">
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

            {/* Right Side: Interactive Architectural Luminaire Showcase */}
            <div className="hero-banner-controls">
              <div className="banner-control-glass">
                {/* Scene Badge & Tag Header */}
                <div className="banner-control-header">
                  <div className="banner-control-badge">
                    <span className="banner-badge-dot" />
                    <span>SCENE 0{currentBannerIndex + 1} / 0{BANNERS.length}</span>
                  </div>
                  <span className="banner-control-tag">{BANNERS[currentBannerIndex].tag}</span>
                </div>

                <div className="banner-control-info">
                  <h3 className="banner-control-title">{BANNERS[currentBannerIndex].title}</h3>
                  <p className="banner-control-sub">{BANNERS[currentBannerIndex].subtitle}</p>
                </div>

                {/* Progress Indicators for all 4 banners */}
                <div className="banner-pills-row">
                  {BANNERS.map((banner, idx) => (
                    <button
                      key={banner.id}
                      type="button"
                      className={`banner-pill-btn ${idx === currentBannerIndex ? 'active' : ''}`}
                      onClick={() => handleSelectBanner(idx)}
                      aria-label={`Switch to banner ${idx + 1}: ${banner.title}`}
                    >
                      <span className="banner-pill-bar" />
                      <span className="banner-pill-label">0{idx + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Prev / Next controls */}
                <div className="banner-nav-arrows">
                  <button
                    type="button"
                    className="banner-nav-arrow-btn"
                    onClick={handlePrevBanner}
                    aria-label="Previous banner"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="banner-nav-arrow-btn"
                    onClick={handleNextBanner}
                    aria-label="Next banner"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
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
