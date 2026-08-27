'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { INDUSTRIES } from '@/lib/data';

export default function IndustriesPage() {
  return (
    <main className="page-main bg-industries">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill">SECTOR APPLICATION</span>
            <span>TAILORED LIGHTING SOLUTIONS</span>
          </div>
          <h1 className="page-title">
            Where Light <br />
            <span className="hero-title-italic">Works.</span>
          </h1>
          <p className="page-subtitle">
            Every sector poses unique optical, mechanical, and emotional lighting requirements. Explore how Jameel Traders solves challenges across Pakistan’s key industries.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="industries-cards-section">
        <div className="home-container">
          <div className="industries-stack">
            {INDUSTRIES.map((industry, i) => (
              <div key={industry.id} className="industry-card">
                <div className="industry-card-img-wrap">
                  <img src={industry.image} alt={industry.title} className="industry-card-img" />
                  <div className="industry-card-badge">SECTOR 0{i + 1}</div>
                </div>

                <div className="industry-card-body">
                  <span className="industry-subtitle">{industry.subtitle}</span>
                  <h2 className="industry-title">{industry.title}</h2>
                  <p className="industry-desc">{industry.description}</p>

                  <div className="industry-details-grid">
                    <div className="industry-detail-block">
                      <h4>THE LIGHTING CHALLENGE</h4>
                      <p>{industry.challenge}</p>
                    </div>

                    <div className="industry-detail-block">
                      <h4>OUR OPTICAL APPROACH</h4>
                      <p>{industry.approach}</p>
                    </div>
                  </div>

                  <div className="industry-products-box">
                    <h4>RECOMMENDED LUMINAIRE SYSTEMS</h4>
                    <div className="industry-products-tags">
                      {industry.recommendedProducts.map((prod) => (
                        <span key={prod} className="industry-prod-pill">
                          <CheckCircle2 size={13} style={{ color: 'var(--gold-accent)' }} />
                          <span>{prod}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="industry-actions">
                    <Link href={`/contact?sector=${industry.id}`} className="hero-cta-btn">
                      <span>PLAN A {industry.title.split(' ')[0]} PROJECT</span>
                      <div className="hero-cta-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </Link>
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
