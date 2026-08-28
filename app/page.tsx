'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HomeSections from '@/components/HomeSections';

function HeroSkeleton() {
  return (
    <section className="hero-section" style={{ minHeight: '100dvh', background: '#080705' }}>
      <div className="hero-container">
        <main className="hero-body">
          <div className="hero-body-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-pill">EST. 2002</span>
              <span>BESPOKE LIGHTING</span>
              <span>•</span>
              <span>ARCHITECTURAL LUMINAIRES</span>
            </div>

            <h1 className="hero-title">
              Light That<br />
              <span className="hero-title-italic">Transforms.</span>
            </h1>

            <p className="hero-description">
              We engineer bespoke lighting systems that blend optics, beauty and purpose — bringing spaces to life.
            </p>

            <div className="hero-cta-group">
              <div className="hero-cta-btn">
                <span>EXPLORE LUMINAIRES</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

const FramePlayer = dynamic(() => import('@/components/FramePlayer'), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

export default function Home() {
  return (
    <main>
      <FramePlayer />
      <HomeSections />
    </main>
  );
}

