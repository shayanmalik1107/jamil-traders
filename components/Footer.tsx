'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Sparkles, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="main-site-footer bg-footer">
      {/* Top Banner CTA Strip */}
      <div className="footer-top-strip">
        <div className="footer-container">
          <div className="footer-strip-content">
            <div className="footer-strip-left">
              <span className="hero-eyebrow-pill">EST. 2002</span>
              <h3 className="footer-strip-title">
                Ready to transform your space with light?
              </h3>
            </div>
            <div className="footer-strip-right">
              <Link href="/contact" className="hero-cta-btn">
                <span>START A PROJECT</span>
                <div className="hero-cta-arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-body">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Column 1: Brand & Philosophy */}
            <div className="footer-col footer-col-brand">
              <Link href="/" className="hero-logo footer-logo">
                <svg
                  className="hero-logo-icon"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 40V18L24 8L36 18V40H30V22L24 17L18 22V40H12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 40H42"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="hero-logo-text">
                  <span className="hero-brand-name">JAMEEL</span>
                  <span className="hero-brand-sub">TRADERS</span>
                </div>
              </Link>

              <p className="footer-brand-desc">
                We design, supply and deliver lighting experiences that transform how spaces are seen, felt, and remembered. Premier architectural & commercial luminaires across Pakistan.
              </p>

              <div className="footer-badge">
                <Sparkles size={14} style={{ color: 'var(--gold-accent)' }} />
                <span>OVER 2 DECADES OF ILLUMINATION EXCELLENCE</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">NAVIGATION</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/projects">Selected Work / Projects</Link></li>
                <li><Link href="/products">Product Catalogue</Link></li>
                <li><Link href="/expertise">Lighting Expertise</Link></li>
                <li><Link href="/about">Company & Story</Link></li>
                <li><Link href="/industries">Industries & Applications</Link></li>
                <li><Link href="/contact">Start a Project / Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Expertise Areas */}
            <div className="footer-col">
              <h4 className="footer-col-title">EXPERTISE</h4>
              <ul className="footer-links">
                <li><Link href="/expertise#residential">Residential Lighting</Link></li>
                <li><Link href="/expertise#commercial">Commercial & Retail</Link></li>
                <li><Link href="/expertise#architectural">Architectural Optics</Link></li>
                <li><Link href="/expertise#landscape">Landscape & Facade</Link></li>
                <li><Link href="/expertise#electrical">Electrical Installation</Link></li>
                <li><Link href="/expertise#healthcare">Institutional & Healthcare</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact & Locations */}
            <div className="footer-col">
              <h4 className="footer-col-title">CONTACT & SHOWROOMS</h4>
              <ul className="footer-contact-list">
                <li>
                  <MapPin size={16} className="footer-contact-icon" />
                  <span>Main Showroom & Corporate Office, Lahore, Pakistan</span>
                </li>
                <li>
                  <Phone size={16} className="footer-contact-icon" />
                  <span>+92 (042) 3578-9000 / +92 300 8456-789</span>
                </li>
                <li>
                  <Mail size={16} className="footer-contact-icon" />
                  <span>info@jameeltraders.com</span>
                </li>
              </ul>

              <div className="footer-socials">
                <a href="#" aria-label="Instagram" className="footer-social-icon"><Instagram size={16} /></a>
                <a href="#" aria-label="LinkedIn" className="footer-social-icon"><Linkedin size={16} /></a>
                <a href="#" aria-label="Facebook" className="footer-social-icon"><Facebook size={16} /></a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              <span>© {new Date().getFullYear()} Jameel Traders. All rights reserved.</span>
            </div>
            <div className="footer-bottom-right">
              <span>Spaces That Inspire™</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
