import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CLIENT_LOGOS, EXPERTISE_AREAS, Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

export default function HomeSections() {
  const [activeProjectCategory, setActiveProjectCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeProjectCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categorySlug === activeProjectCategory.toLowerCase());

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
      {/* SECTION 3 — LIGHTING EXPERTISE / SERVICES */}
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

      {/* SECTION 4 — SELECTED WORK / PORTFOLIO */}
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
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>

          <div className="home-section-cta-wrap" style={{ marginTop: '3rem' }}>
            <Link href="/projects" className="hero-cta-btn">
              <span>VIEW FULL PORTFOLIO</span>
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

      {/* SECTION 7 — TRUSTED BY / CLIENTS */}
      <section className="home-section home-section-clients">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">PROVEN REPUTATION</span>
              <span>CLIENTS & PARTNERSHIPS</span>
            </div>
            <h2 className="home-section-title">
              Chosen for Spaces <br />
              <span className="hero-title-italic">That Matter.</span>
            </h2>
          </div>

          <div className="client-logos-grid">
            {CLIENT_LOGOS.map((client) => (
              <div key={client.name} className="client-logo-card">
                <div className="client-card-inner">
                  <span className="client-card-cat">{client.category}</span>
                  <h4 className="client-card-name">{client.name}</h4>
                  <span className="client-card-highlight">{client.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — CEO PERSPECTIVE */}
      <section className="home-section home-section-ceo">
        <div className="home-container">
          <div className="ceo-perspective-card">
            <div className="ceo-card-left">
              <img src="/ceo.png" alt="Malik Abdul Jamil" className="ceo-portrait-img" />
              <div className="ceo-portrait-glow" />
            </div>

            <div className="ceo-card-right">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-pill">A STANDARD BUILT OVER TIME</span>
                <span>LEADERSHIP STATEMENT</span>
              </div>

              <h2 className="ceo-quote-heading">
                “Quality, creativity and trust are not features of our work. They are the standard behind it.”
              </h2>

              <div className="ceo-signature-block">
                <strong className="ceo-name-text">Malik Abdul Jamil</strong>
                <span className="ceo-title-text">Chief Executive Officer, Jamil Traders</span>
              </div>

              <div className="ceo-cta-wrap">
                <Link href="/about" className="hero-cta-btn">
                  <span>MEET THE COMPANY</span>
                  <div className="hero-cta-arrow">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
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
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
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
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>
            </header>

            <div className="project-modal-body">
              <div className="project-modal-hero-img-wrap">
                <img src={selectedProject.image} alt={selectedProject.title} className="project-modal-hero-img" />
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
                    {selectedProject.gallery.map((imgUrl, i) => (
                      <img key={i} src={imgUrl} alt={`${selectedProject.title} view ${i + 1}`} className="project-gallery-img" />
                    ))}
                  </div>
                </div>
              )}

              <div className="project-modal-actions" style={{ marginTop: '1rem' }}>
                <Link
                  href="/contact"
                  className="hero-cta-btn"
                  onClick={() => setSelectedProject(null)}
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
    </>
  );
}
