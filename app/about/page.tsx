'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Award, ShieldCheck, Building2 } from 'lucide-react';
import { COMPANY_TIMELINE, CORE_PRINCIPLES } from '@/lib/data';

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

      {/* 5. What Drives Us (4 Principles) */}
      <section className="about-principles-section">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">OUR PHILOSOPHY</span>
              <span>CORE DRIVING VALUES</span>
            </div>
            <h2 className="home-section-title">
              What Drives <span className="hero-title-italic">Us.</span>
            </h2>
          </div>

          <div className="principles-vertical-grid">
            {CORE_PRINCIPLES.map((principle, index) => (
              <div key={principle.title} className="principle-card">
                <div className="principle-num">0{index + 1}</div>
                <div className="principle-body">
                  <h3 className="principle-title">{principle.title}</h3>
                  <span className="principle-subtitle">{principle.subtitle}</span>
                  <p className="principle-desc">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. Recognition & Certifications */}
      <section className="about-recognition-section">
        <div className="home-container">
          <div className="home-section-header">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">VERIFIED STANDARDS</span>
              <span>ACCREDITATIONS & RECOGNITION</span>
            </div>
            <h2 className="home-section-title">
              Recognized for <span className="hero-title-italic">Excellence.</span>
            </h2>
          </div>

          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-card-badge">
                <CheckCircle2 size={12} />
                <span>ISO CERTIFIED</span>
              </div>
              <div className="cert-preview-frame">
                <Award size={36} className="cert-icon-gold" />
                <span className="cert-watermark">ISO 9001:2015</span>
              </div>
              <div className="cert-card-info">
                <h4 className="cert-title">ISO 9001:2015 Quality Management</h4>
                <p className="cert-desc">Certified quality management systems across luxury luminaire design, supply chain, and site execution.</p>
              </div>
            </div>

            <div className="cert-card">
              <div className="cert-card-badge">
                <CheckCircle2 size={12} />
                <span>ACCREDITED</span>
              </div>
              <div className="cert-preview-frame">
                <ShieldCheck size={36} className="cert-icon-gold" />
                <span className="cert-watermark">LUXURY LIGHTING</span>
              </div>
              <div className="cert-card-info">
                <h4 className="cert-title">Middle East Luxury Illumination Accreditation</h4>
                <p className="cert-desc">Recognized for high-end optical engineering and architectural luminaire standards across Asia & GCC.</p>
              </div>
            </div>

            <div className="cert-card">
              <div className="cert-card-badge">
                <CheckCircle2 size={12} />
                <span>COMPLIANT</span>
              </div>
              <div className="cert-preview-frame">
                <Building2 size={36} className="cert-icon-gold" />
                <span className="cert-watermark">OPTICS BOARD</span>
              </div>
              <div className="cert-card-info">
                <h4 className="cert-title">International Optical Sourcing Board</h4>
                <p className="cert-desc">Ethical sourcing authentication for high-grade German optical lenses and Italian crystal luminaires.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
