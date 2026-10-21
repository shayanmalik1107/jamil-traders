import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X, CheckCircle2, ArrowUpRight, Play } from 'lucide-react';
import { PROJECTS, EXPERTISE_AREAS, Project, getYoutubeEmbedUrl } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

const CLIENT_LOGOS = [
  { src: '/logo/ajlogo.png', alt: 'AJ Enterprises' },
  { src: '/logo/Bold Generation Wordmark.png', alt: 'Bold Generation' },
  { src: '/logo/Farooq Hospital West Wood Logo.png', alt: 'Farooq Hospital' },
  { src: '/logo/Golden Family Emblem.png', alt: 'Golden Family' },
  { src: '/logo/Shalamar Hospital Logo.png', alt: 'Shalamar Hospital' },
  { src: '/logo/The United Mall Logo.png', alt: 'The United Mall' },
];

export default function HomeSections() {
  const [activeProjectCategory, setActiveProjectCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState<boolean>(false);

  // Clients carousel state
  const [logoIndex, setLogoIndex] = useState(0);
  const [logosPerPage, setLogosPerPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setLogosPerPage(4);
      else if (w >= 1024) setLogosPerPage(3);
      else if (w >= 640) setLogosPerPage(2);
      else setLogosPerPage(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.ceil(CLIENT_LOGOS.length / logosPerPage);
  const clampedIndex = Math.min(logoIndex, totalPages - 1);

  const goToPage = useCallback((page: number) => {
    setLogoIndex(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  // Touch / drag handlers
  const onDragStart = (clientX: number) => { dragStartX.current = clientX; };
  const onDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 40) goToPage(clampedIndex + (diff > 0 ? 1 : -1));
    dragStartX.current = null;
  };

  const filteredProjects = activeProjectCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categorySlug === activeProjectCategory.toLowerCase());

  const HOME_LIMIT = activeProjectCategory === 'ALL' ? 6 : 4;
  const displayedProjects = filteredProjects.slice(0, HOME_LIMIT);
  const hasMore = filteredProjects.length > HOME_LIMIT;

  const categories = [
    { label: 'ALL', value: 'ALL' },
    { label: 'RESIDENTIAL', value: 'residential' },
    { label: 'COMMERCIAL', value: 'commercial' },
    { label: 'RETAIL', value: 'retail' },
    { label: 'GOVERNMENT', value: 'government' },
    { label: 'HEALTHCARE', value: 'healthcare' },
    { label: 'OUTDOOR', value: 'outdoor' },
  ];

  return (
    <>
      {/* CLIENTS CAROUSEL — directly below hero */}
      <section className="home-section home-section-clients">
        <div className="clients-section-header">
          <div className="hero-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="hero-eyebrow-pill">CLIENTS</span>
            <span>TRUSTED BY INDUSTRY LEADERS</span>
          </div>
          <h2 className="home-section-title" style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            Chosen for Spaces <span className="hero-title-italic">That Matter.</span>
          </h2>
        </div>

        {/* Carousel viewport */}
        <div className="clients-carousel-outer">
          <div
            className="clients-carousel-viewport"
            ref={carouselRef}
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseUp={(e) => onDragEnd(e.clientX)}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          >
            <div
              className="clients-carousel-track"
              style={{
                transform: `translateX(-${clampedIndex * 100}%)`,
                gridTemplateColumns: `repeat(${totalPages}, 100%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="clients-carousel-page">
                  {CLIENT_LOGOS.slice(pageIdx * logosPerPage, pageIdx * logosPerPage + logosPerPage).map((logo) => (
                    <div key={logo.alt} className="client-logo-item">
                      <img src={logo.src} alt={logo.alt} className="client-logo-img" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="clients-carousel-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot${clampedIndex === i ? ' active' : ''}`}
                onClick={() => goToPage(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — SELECTED WORK / PORTFOLIO */}
      <section id="projects" className="home-section home-section-projects">
        <div className="home-container">
          <div className="home-section-header-flex">
            <div>
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-pill">PORTFOLIO SPOTLIGHT</span>
                <span>PROOF OF CAPABILITY</span>
              </div>
              <h2 className="home-section-title">
                Light, In <span className="hero-title-italic">Practice.</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="portfolio-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`filter-tab-btn ${activeProjectCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setActiveProjectCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="home-projects-grid">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>

          <div className="home-section-cta-wrap" style={{ marginTop: '3rem' }}>
            <Link href="/projects" className="hero-cta-btn">
              <span>{hasMore ? `EXPLORE ALL ${filteredProjects.length} PROJECTS` : 'VIEW FULL PORTFOLIO'}</span>
              <div className="hero-cta-arrow">
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CERTIFICATES SECTION */}
      <section className="home-section home-section-certs">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">CERTIFICATIONS</span>
              <span>QUALITY & COMPLIANCE</span>
            </div>
            <h2 className="home-section-title">
              Certified for <span className="hero-title-italic">Excellence.</span>
            </h2>
          </div>
          <div className="certs-grid">
            <div className="cert-card">
              <img src="/cert1.png" alt="Certificate 1" className="cert-img" />
            </div>
            <div className="cert-card">
              <img src="/cert2.png" alt="Certificate 2" className="cert-img" />
            </div>
            <div className="cert-card">
              <img src="/cert3.png" alt="Certificate 3" className="cert-img" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — LIGHTING EXPERTISE / SERVICES */}
      <section id="expertise" className="home-section home-section-expertise">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">OUR EXPERTISE & SERVICES</span>
              <span>TECHNICAL & ARTISTIC CAPABILITIES</span>
            </div>
            <h2 className="home-section-title">
              One Language. <br />
              <span className="hero-title-italic">Many Applications.</span>
            </h2>
          </div>

          <div className="expertise-line-cards-stack">
            {EXPERTISE_AREAS.slice(0, 5).map((exp) => (
              <Link key={exp.id} href="/expertise" className="expertise-line-card">
                <div className="expertise-line-card-left">
                  <div className="expertise-line-num">{exp.number}</div>
                  <div className="expertise-line-info">
                    <span className="expertise-line-subtitle">{exp.subtitle}</span>
                    <h3 className="expertise-line-title">{exp.title}</h3>
                    <p className="expertise-line-desc">{exp.description}</p>
                    <div className="expertise-line-features">
                      {exp.keyFeatures.slice(0, 3).map((feat) => (
                        <span key={feat} className="expertise-feature-pill">
                          <CheckCircle2 size={12} style={{ color: '#C8102E' }} />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="expertise-line-card-right">
                  <div className="expertise-line-img-box">
                    <img src={exp.image} alt={exp.title} className="expertise-line-img" />
                    <div className="expertise-line-img-badge">LIGHTING PROJECT</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="home-section-cta-wrap">
            <Link href="/expertise" className="hero-cta-btn">
              <span>EXPLORE ALL EXPERTISE AREAS</span>
              <div className="hero-cta-arrow">
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRODUCT SPOTLIGHT */}
      <section id="products" className="home-section home-section-spotlight">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">PRODUCT SPOTLIGHT</span>
              <span>LUMINAIRES WITH PURPOSE</span>
            </div>
            <h2 className="home-section-title">
              The Right Light <br />
              <span className="hero-title-italic">Has a Purpose.</span>
            </h2>
          </div>

          <div className="spotlight-collections-grid">
            {/* Collection 1 */}
            <div className="spotlight-card">
              <div className="spotlight-card-bg" style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.35) 100%), url(https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80)` }} />
              <div className="spotlight-card-content">
                <span className="spotlight-cat-tag">COLLECTION 01</span>
                <h3 className="spotlight-title">ARCHITECTURAL LIGHTING</h3>
                <p className="spotlight-desc">Precision optical downlights, anti-glare spots, and wall washers.</p>
                <Link href="/products?category=architectural" className="spotlight-btn">
                  <span>VIEW COLLECTION</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Collection 2 */}
            <div className="spotlight-card">
              <div className="spotlight-card-bg" style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.35) 100%), url(https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80)` }} />
              <div className="spotlight-card-content">
                <span className="spotlight-cat-tag">COLLECTION 02</span>
                <h3 className="spotlight-title">INTERIOR LIGHTING</h3>
                <p className="spotlight-desc">Low-voltage 48V magnetic tracks, linear coves & luxury pendants.</p>
                <Link href="/products?category=interior" className="spotlight-btn">
                  <span>VIEW COLLECTION</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Collection 3 */}
            <div className="spotlight-card">
              <div className="spotlight-card-bg" style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.35) 100%), url(https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80)` }} />
              <div className="spotlight-card-content">
                <span className="spotlight-cat-tag">COLLECTION 03</span>
                <h3 className="spotlight-title">OUTDOOR LIGHTING</h3>
                <p className="spotlight-desc">IP67 exterior facade grazers, path bollards & underwater projectors.</p>
                <Link href="/products?category=exterior" className="spotlight-btn">
                  <span>VIEW COLLECTION</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div className="home-section-cta-wrap" style={{ marginTop: '3.5rem' }}>
            <Link href="/products" className="hero-cta-btn">
              <span>EXPLORE ALL PRODUCTS</span>
              <div className="hero-cta-arrow">
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — THE NUMBERS */}
      <section className="home-section home-section-numbers">
        <div className="home-container">
          <div className="numbers-bar-grid">
            <div className="number-stat-card">
              <span className="stat-big-val">20+ YEARS</span>
              <span className="stat-big-lbl">Lighting expertise since 2002</span>
            </div>
            <div className="number-divider" />
            <div className="number-stat-card">
              <span className="stat-big-val">MULTIPLE CITIES</span>
              <span className="stat-big-lbl">Projects across Pakistan</span>
            </div>
            <div className="number-divider" />
            <div className="number-stat-card">
              <span className="stat-big-val">MULTIPLE SECTORS</span>
              <span className="stat-big-lbl">From residences to institutions</span>
            </div>
          </div>
        </div>
      </section>




      {/* SECTION 9 — FINAL CTA */}
      <section className="home-section home-section-final-cta">
        <div className="home-container">
          <div className="final-cta-content">
            <span className="hero-eyebrow-pill">LET'S BUILD TOGETHER</span>
            <h2 className="final-cta-title">
              Have a Space <span className="hero-title-italic">in Mind?</span>
            </h2>
            <p className="final-cta-subtitle">
              Tell us what you're building. We'll help you see it differently.
            </p>

            <div className="final-cta-buttons">
              <Link href="/contact" className="hero-cta-btn">
                <span>START A PROJECT</span>
                <div className="hero-cta-arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>
              <Link href="/contact" className="hero-secondary-btn">
                <span>CONTACT US</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT CASE STUDY DETAIL MODAL */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => {
            setSelectedProject(null);
            setIsPlayingHeroVideo(false);
          }}
        >
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="project-modal-header">
              <div className="project-modal-header-left">
                {selectedProject.logo && (
                  <div className="project-modal-logo-round-wrap">
                    <img
                      src={selectedProject.logo}
                      alt={`${selectedProject.title} logo`}
                      className="project-modal-logo-round"
                    />
                  </div>
                )}
                <div>
                  <span className="project-modal-cat">{selectedProject.category} • {selectedProject.location}</span>
                  <h3 className="project-modal-title">{selectedProject.title}</h3>
                  {selectedProject.client && (
                    <span className="project-modal-client">
                      Client: {selectedProject.client} ({selectedProject.year || '2024'})
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="project-modal-close"
                onClick={() => {
                  setSelectedProject(null);
                  setIsPlayingHeroVideo(false);
                }}
              >
                <X size={20} />
              </button>
            </header>

            <div className="project-modal-body">
              <div className="project-modal-hero-img-wrap">
                {selectedProject.youtubeUrl && isPlayingHeroVideo ? (
                  <iframe
                    src={`${getYoutubeEmbedUrl(selectedProject.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${selectedProject.title} Video Showcase`}
                    className="project-modal-hero-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="project-modal-hero-container-relative"
                    onClick={() => {
                      if (selectedProject.youtubeUrl) {
                        setIsPlayingHeroVideo(true);
                      }
                    }}
                    style={{ cursor: selectedProject.youtubeUrl ? 'pointer' : 'default', width: '100%', height: '100%', position: 'relative' }}
                  >
                    <img src={selectedProject.image} alt={selectedProject.title} className="project-modal-hero-img" />
                    {selectedProject.youtubeUrl && (
                      <button
                        type="button"
                        className="project-card-center-play-btn"
                        aria-label="Play Project Video"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingHeroVideo(true);
                        }}
                      >
                        <div className="center-play-circle pulse-animation">
                          <Play size={28} fill="white" color="white" style={{ marginLeft: '3px' }} />
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="project-modal-sections-grid">
                <div className="project-modal-sec">
                  <h4>SCOPE OF WORK</h4>
                  <p className="project-modal-bold-text"><strong>{selectedProject.challenge}</strong></p>
                </div>

                <div className="project-modal-sec">
                  <h4>THE LIGHTING APPROACH</h4>
                  <p>{selectedProject.approach}</p>
                </div>

                <div className="project-modal-sec">
                  <h4>THE SOLUTION</h4>
                  <p>{selectedProject.solution}</p>
                </div>

                <div className="project-modal-sec">
                  <h4>PRODUCTS / LIGHTING TYPES USED</h4>
                  <ul className="project-modal-luminaires-list">
                    {selectedProject.luminairesUsed.map((lum) => (
                      <li key={lum}>
                        <CheckCircle2 size={14} style={{ color: '#C8102E' }} />
                        <span>{lum}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="project-modal-gallery-sec" style={{ marginTop: '1.25rem' }}>
                  <h4>PROJECT GALLERY</h4>
                  <div className="project-modal-gallery-grid">
                    {selectedProject.gallery.map((mediaUrl, i) =>
                      /\.(mov|mp4|webm)(\?.*)?$/i.test(mediaUrl) ? (
                        <video
                          key={i}
                          src={mediaUrl}
                          controls
                          playsInline
                          className="project-gallery-img"
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <img
                          key={i}
                          src={mediaUrl}
                          alt={`${selectedProject.title} view ${i + 1}`}
                          className="project-gallery-img"
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="project-modal-actions" style={{ marginTop: '1.5rem' }}>
                <Link
                  href="/contact"
                  className="hero-cta-btn"
                  onClick={() => {
                    setSelectedProject(null);
                    setIsPlayingHeroVideo(false);
                  }}
                >
                  <span>START A SIMILAR PROJECT</span>
                  <div className="hero-cta-arrow">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YOUTUBE VIDEO PLAYER MODAL */}
      {activeVideoUrl && (
        <div
          className="project-video-modal-overlay"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div
            className="project-video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-video-modal-header">
              <div className="project-video-modal-title-group">
                <span className="project-video-modal-tag">PROJECT VIDEO</span>
                <h3 className="project-video-modal-title">{selectedProject?.title || 'Project Showcase'}</h3>
              </div>
              <button
                type="button"
                className="project-video-modal-close"
                onClick={() => setActiveVideoUrl(null)}
                aria-label="Close Video"
              >
                <X size={18} />
              </button>
            </div>
            <div className="project-video-iframe-wrap">
              <iframe
                src={`${getYoutubeEmbedUrl(activeVideoUrl)}?autoplay=1&rel=0&modestbranding=1`}
                title="Project Video Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
