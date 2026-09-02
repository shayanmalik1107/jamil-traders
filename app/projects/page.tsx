'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { PROJECTS, Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

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
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INDIVIDUAL PROJECT CASE STUDY MODAL */}
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
                  <h2 className="project-modal-title">{selectedProject.title}</h2>
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
                <div className="project-modal-gallery-sec">
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
    </main>
  );
}

