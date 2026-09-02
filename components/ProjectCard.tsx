'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Use gallery if available, fallback to single main image
  const images = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [project.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only set up auto-scroll if there are multiple images and user is NOT hovering
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  return (
    <div
      className="home-project-card project-card-carousel-wrap"
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-card-img-wrap">
        {/* Horizontal sliding animation track */}
        <div
          className="project-card-slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`${project.title} slide ${idx + 1}`}
              className="project-card-slide-img"
            />
          ))}
        </div>

        <div className="project-card-badge">{project.category}</div>

        {/* Carousel indicator dots if multiple images */}
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
  );
}
