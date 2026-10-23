'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, X, CheckCircle2, Play } from 'lucide-react';
import { PROJECTS, Project, getYoutubeEmbedUrl } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState<boolean>(false);
  const [modalHeroImage, setModalHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveFilter(cat.toLowerCase());
    }
    const projId = searchParams.get('id') || searchParams.get('project');
    if (projId) {
      const match = PROJECTS.find((p) => p.id.toLowerCase() === projId.toLowerCase());
      if (match) {
        setSelectedProject(match);
      }
    }
  }, [searchParams]);

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
        <div
          className="project-modal-overlay"
          onClick={() => {
            setSelectedProject(null);
            setIsPlayingHeroVideo(false);
            setModalHeroImage(null);
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
                onClick={() => {
                  setSelectedProject(null);
                  setIsPlayingHeroVideo(false);
                  setModalHeroImage(null);
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
                    style={{
                      cursor: selectedProject.youtubeUrl ? 'pointer' : 'default',
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    {selectedProject.imageFit === 'blurred' ? (
                      <div className="blurred-letterbox-wrap">
                        <img src={modalHeroImage || selectedProject.image} aria-hidden="true" className="blurred-letterbox-bg" alt="" />
                        <img src={modalHeroImage || selectedProject.image} alt={selectedProject.title} className="blurred-letterbox-fg" />
                      </div>
                    ) : (
                      <img
                        src={modalHeroImage || selectedProject.image}
                        alt={selectedProject.title}
                        className="project-modal-hero-img"
                      />
                    )}
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
                <div className="project-modal-gallery-sec">
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
                      ) : selectedProject.imageFit === 'blurred' ? (
                        <div
                          key={i}
                          className={`blurred-letterbox-thumb${
                            (modalHeroImage || selectedProject.image) === mediaUrl ? ' modal-thumb-active' : ''
                          }`}
                          onClick={() => {
                            setModalHeroImage(mediaUrl);
                            setIsPlayingHeroVideo(false);
                          }}
                        >
                          <img src={mediaUrl} aria-hidden="true" className="blurred-letterbox-bg" alt="" />
                          <img src={mediaUrl} alt={`${selectedProject.title} view ${i + 1}`} className="blurred-letterbox-fg" />
                        </div>
                      ) : (
                        <img
                          key={i}
                          src={mediaUrl}
                          alt={`${selectedProject.title} view ${i + 1}`}
                          className={`project-gallery-img modal-thumb${selectedProject.imageFit === 'fill' ? ' img-fit-contain' : ''}${
                            (modalHeroImage || selectedProject.image) === mediaUrl ? ' modal-thumb-active' : ''
                          }`}
                          onClick={() => {
                            setModalHeroImage(mediaUrl);
                            setIsPlayingHeroVideo(false);
                          }}
                          style={{ cursor: 'pointer' }}
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
                    setModalHeroImage(null);
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
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="page-loading-skeleton" style={{ minHeight: '60vh' }} />}>
      <ProjectsPageContent />
    </Suspense>
  );
}

