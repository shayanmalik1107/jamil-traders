'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, X, CheckCircle2, Building2 } from 'lucide-react';
import { PROJECTS, Project } from '@/lib/data';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { label: 'ALL', value: 'ALL' },
    { label: 'RESIDENTIAL', value: 'residential' },
    { label: 'COMMERCIAL', value: 'commercial' },
    { label: 'RETAIL', value: 'retail' },
    { label: 'INSTITUTIONAL', value: 'institutional' },
    { label: 'GOVERNMENT', value: 'government' },
    { label: 'HEALTHCARE', value: 'healthcare' },
    { label: 'OUTDOOR', value: 'outdoor' },
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categorySlug === activeFilter.toLowerCase());

  const getRelatedProjects = (current: Project) => {
    return PROJECTS.filter((p) => p.id !== current.id && p.categorySlug === current.categorySlug).slice(0, 2);
  };

  return (
    <main className="page-main bg-projects">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill">PORTFOLIO</span>
            <span>PROVEN EXCELLENCE</span>
          </div>
          <h1 className="page-title">
            Spaces We've <br />
            <span className="hero-title-italic">Brought to Light.</span>
          </h1>
          <p className="page-subtitle">
            From iconic flagship stores and government civic complexes to private luxury residences across Pakistan — explore our portfolio of precision architectural illumination.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-bar-section">
        <div className="home-container">
          <div className="portfolio-filter-tabs flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`filter-tab-btn ${activeFilter === f.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="home-container">
          <div className="home-projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="home-project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card-img-wrap">
                  <img src={project.image} alt={project.title} className="project-card-img" />
                  <div className="project-card-badge">{project.category}</div>
                </div>
                <div className="project-card-content">
                  <span className="project-card-location">{project.location}</span>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-excerpt">{project.challenge.slice(0, 90)}...</p>
                  <button type="button" className="project-card-link">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDIVIDUAL PROJECT CASE STUDY MODAL */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="project-modal-header">
              <div>
                <span className="project-modal-cat">{selectedProject.category} • {selectedProject.location}</span>
                <h2 className="project-modal-title">{selectedProject.title}</h2>
                {selectedProject.client && (
                  <span className="project-modal-client">Client: {selectedProject.client} ({selectedProject.year})</span>
                )}
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
                  <h4>THE CHALLENGE</h4>
                  <p>{selectedProject.challenge}</p>
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
                        <CheckCircle2 size={14} style={{ color: 'var(--gold-accent)' }} />
                        <span>{lum}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="project-modal-gallery-sec">
                  <h4>PROJECT GALLERY</h4>
                  <div className="project-modal-gallery-grid">
                    {selectedProject.gallery.map((imgUrl, i) => (
                      <img key={i} src={imgUrl} alt={`${selectedProject.title} view ${i + 1}`} className="project-gallery-img" />
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {getRelatedProjects(selectedProject).length > 0 && (
                <div className="project-modal-related-sec">
                  <h4>RELATED PROJECTS</h4>
                  <div className="project-modal-related-grid">
                    {getRelatedProjects(selectedProject).map((rel) => (
                      <div
                        key={rel.id}
                        className="related-project-card"
                        onClick={() => setSelectedProject(rel)}
                      >
                        <img src={rel.image} alt={rel.title} className="related-project-img" />
                        <div className="related-project-info">
                          <h5>{rel.title}</h5>
                          <span>{rel.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="project-modal-actions">
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
    </main>
  );
}
