'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { Project, getYoutubeEmbedUrl } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const images = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [project.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Drag state for manual swipe on card slider
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleDragStart = (x: number) => {
    dragStart.current = x;
    isDragging.current = false;
  };
  const handleDragMove = (x: number) => {
    if (dragStart.current !== null && Math.abs(x - dragStart.current) > 5) {
      isDragging.current = true;
    }
  };
  const handleDragEnd = (x: number, e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 40) {
      e.stopPropagation();
      setCurrentIndex((prev) =>
        diff > 0
          ? Math.min(prev + 1, images.length - 1)
          : Math.max(prev - 1, 0)
      );
    }
    dragStart.current = null;
  };

  useEffect(() => {
    if (images.length <= 1 || isHovered || isVideoModalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length, isHovered, isVideoModalOpen]);

  return (
    <>
      <div
        className="home-project-card project-card-carousel-wrap"
        onClick={(e) => { if (!isDragging.current) onClick(project); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="project-card-img-wrap"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX, e)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, e)}
          style={{ cursor: images.length > 1 ? 'grab' : 'default', userSelect: 'none' }}
        >
          <div
            className="project-card-slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((mediaUrl, idx) => {
              const isVid = /\.(mov|mp4|webm)(\?.*)?$/i.test(mediaUrl);
              return isVid ? (
                <video
                  key={idx}
                  src={mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="project-card-slide-img"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : (
                <img
                  key={idx}
                  src={mediaUrl}
                  alt={`${project.title} slide ${idx + 1}`}
                  className="project-card-slide-img"
                />
              );
            })}
          </div>

          <div className="project-card-badge">{project.category}</div>

          {project.youtubeUrl && currentIndex === 0 && (
            <button
              type="button"
              className="project-card-center-play-btn"
              aria-label="Play Project Video"
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoModalOpen(true);
              }}
            >
              <div className="center-play-circle pulse-animation">
                <Play size={24} fill="white" color="white" style={{ marginLeft: '3px' }} />
              </div>
            </button>
          )}

          {images.length > 1 && (
            <div className="project-card-carousel-dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="project-card-content">
          <div className="project-card-title-row">
            {project.logo && (
              <div className="project-card-logo-round-wrap">
                <img src={project.logo} alt={`${project.title} Logo`} className="project-card-logo-round" />
              </div>
            )}
            <div className="project-card-title-text-group">
              <span className="project-card-location">{project.location}</span>
              <h3 className="project-card-title">{project.title}</h3>
            </div>
          </div>

          {project.challenge && (
            <div className="project-card-scope-block">
              <span className="project-card-scope-label">SCOPE OF WORK</span>
              <p className="project-card-excerpt-bold">
                <strong>{project.challenge.slice(0, 95)}...</strong>
              </p>
            </div>
          )}

          <button type="button" className="project-card-link">
            <span>VIEW CASE STUDY</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* YOUTUBE VIDEO EMBED MODAL */}
      {isVideoModalOpen && project.youtubeUrl && (
        <div
          className="project-video-modal-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setIsVideoModalOpen(false);
          }}
        >
          <div
            className="project-video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-video-modal-header">
              <div className="project-video-modal-title-group">
                <span className="project-video-modal-tag">PROJECT VIDEO</span>
                <h3 className="project-video-modal-title">{project.title}</h3>
              </div>
              <button
                type="button"
                className="project-video-modal-close"
                onClick={() => setIsVideoModalOpen(false)}
                aria-label="Close Video"
              >
                <X size={18} />
              </button>
            </div>
            <div className="project-video-iframe-wrap">
              <iframe
                src={`${getYoutubeEmbedUrl(project.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.title} Video Showcase`}
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
