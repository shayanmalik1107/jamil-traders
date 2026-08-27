'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Home, ShoppingBag, Building, Trees, Zap, FileText, Cross } from 'lucide-react';
import { EXPERTISE_AREAS } from '@/lib/data';

export default function ExpertisePage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'ShoppingBag': return <ShoppingBag size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'Building': return <Building size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'Trees': return <Trees size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'Zap': return <Zap size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'FileText': return <FileText size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'Cross': return <Cross size={28} style={{ color: 'var(--gold-accent)' }} />;
      case 'Shield': return <Shield size={28} style={{ color: 'var(--gold-accent)' }} />;
      default: return <Building size={28} style={{ color: 'var(--gold-accent)' }} />;
    }
  };

  return (
    <main className="page-main bg-expertise">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill">OUR EXPERTISE</span>
            <span>PRECISION OPTICS & TECHNICAL MASTERY</span>
          </div>
          <h1 className="page-title">
            Every Space Asks <br />
            <span className="hero-title-italic">Something Different of Light.</span>
          </h1>
          <p className="page-subtitle">
            From DIALux photometric simulations and custom architectural plaster-in channels to master electrical installation across Pakistan — explore our comprehensive lighting disciplines.
          </p>
        </div>
      </section>

      {/* Expertise Sections */}
      <section className="expertise-deep-dive-section">
        <div className="home-container">
          <div className="expertise-cards-stack">
            {EXPERTISE_AREAS.map((area) => (
              <div
                key={area.id}
                id={area.id.replace('exp-', '')}
                className={`expertise-detail-card ${area.bgClass}`}
                style={{ backgroundImage: `url('${area.image}')` }}
              >
                <div className="expertise-card-header-row">
                  <div className="expertise-card-num-badge">
                    <span>{area.number}</span>
                  </div>
                  <div className="expertise-card-icon">{getIcon(area.iconName)}</div>
                </div>

                <div className="expertise-card-content-grid">
                  <div className="expertise-card-main">
                    <span className="expertise-card-subtitle">{area.subtitle}</span>
                    <h2 className="expertise-card-title">{area.title}</h2>
                    <p className="expertise-card-desc">{area.description}</p>
                  </div>

                  <div className="expertise-card-features">
                    <h4 className="features-title">KEY CAPABILITIES & SCOPE</h4>
                    <ul className="features-list">
                      {area.keyFeatures.map((feat) => (
                        <li key={feat}>
                          <CheckCircle2 size={15} style={{ color: 'var(--gold-accent)' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="expertise-card-cta">
                      <Link href="/contact" className="hero-cta-btn">
                        <span>CONSULT ON THIS EXPERTISE</span>
                        <div className="hero-cta-arrow">
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
