'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COMPANY_TIMELINE } from '@/lib/data';

export default function AboutPage() {
  return (
    <main className="page-main bg-about">
      {/* 1. Page Hero */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill">COMPANY STORY</span>
            <span>ESTABLISHED 2002</span>
          </div>
          <h1 className="page-title">
            More Than What <br />
            <span className="hero-title-italic">We Illuminate.</span>
          </h1>
          <p className="page-subtitle">
            Over two decades of defining atmosphere, sculpting architectural form, and delivering optical perfection for Pakistan’s finest spaces.
          </p>
        </div>
      </section>

      {/* 2. Visual Timeline */}
      <section className="about-timeline-section">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">OUR JOURNEY</span>
              <span>MILESTONES & EVOLUTION</span>
            </div>
            <h2 className="home-section-title">
              Built Over <span className="hero-title-italic">Two Decades.</span>
            </h2>
          </div>

          <div className="timeline-track">
            {COMPANY_TIMELINE.map((item, index) => (
              <div key={item.year} className="timeline-step-item">
                <div className="timeline-year-badge">{item.year}</div>
                <div className="timeline-node-dot" />
                <div className="timeline-content-box">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Founder / CEO Feature */}
      <section className="about-ceo-section">
        <div className="home-container">
          <div className="ceo-feature-grid">
            <div className="ceo-feature-img-wrap">
              <img src="/ceo.png" alt="Malik Abdul Jamil" className="ceo-feature-img" />
              <div className="ceo-feature-glow" />
            </div>

            <div className="ceo-feature-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-pill">LEADERSHIP VISION</span>
                <span>FOUNDER & CEO</span>
              </div>
              <h2 className="ceo-feature-heading">The Vision Behind the Light.</h2>
              <p className="ceo-feature-p">
                “When we established Jameel Traders in 2002, light in local architecture was often treated as an afterthought — a simple functional necessity. We set out to change that narrative.”
              </p>
              <p className="ceo-feature-p">
                “Over the past 24 years, our team has partnered with leading architects, engineers, and property owners across Pakistan to demonstrate that light defines the true soul of architecture. Every fixture we select and install carries our unwavering commitment to optical excellence and aesthetic longevity.”
              </p>

              <div className="ceo-author-tag">
                <strong>Malik Abdul Jamil</strong>
                <span>Chief Executive Officer, Jameel Traders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Screen Mission Statement */}
      <section className="about-mission-statement-section">
        <div className="home-container">
          <div className="mission-statement-box">
            <h2 className="mission-statement-headline">
              “We don't start with a fixture. <br />
              <span className="hero-title-italic">We start with the space.”</span>
            </h2>
            <p className="mission-statement-desc">
              Before choosing a single luminaire, we analyze human behavior, spatial proportions, structural materials, and natural daylight transition. The fixture is merely the instrument; atmosphere is our true deliverable.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
