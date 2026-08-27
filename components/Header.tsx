'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, ShoppingBag } from 'lucide-react';
import { useProjectList } from '@/context/ProjectListContext';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { totalItemsCount, setIsDrawerOpen } = useProjectList();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'EXPERTISE', href: '/expertise' },
    { label: 'ABOUT', href: '/about' },
    { label: 'INDUSTRIES', href: '/industries' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`hero-header ${isScrolled ? 'is-scrolled' : ''}`}>
        {/* Logo — always visible */}
        <Link href="/" className="hero-logo">
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

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="hero-nav">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`hero-nav-item ${active ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {active && <div className="hero-nav-active-dot" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="hero-header-actions">
          {/* Project List Quick Badge Button — desktop only shows text */}
          <button
            type="button"
            className="project-list-header-btn"
            onClick={() => setIsDrawerOpen(true)}
            title="View Saved Project Luminaires"
          >
            <ShoppingBag size={16} />
            <span className="project-list-btn-text">PROJECT LIST</span>
            {totalItemsCount > 0 && (
              <span className="project-list-badge">{totalItemsCount}</span>
            )}
          </button>

          <Link href="/contact" className="hero-talk-btn desktop-only-btn">
            <span>START A PROJECT</span>
            <div className="hero-talk-btn-arrow">
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="hero-icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-In Nav Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <nav className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
          {/* Drawer Header */}
          <div className="mobile-nav-drawer-header">
            <Link href="/" className="hero-logo" onClick={() => setMobileMenuOpen(false)}>
              <svg className="hero-logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 40V18L24 8L36 18V40H30V22L24 17L18 22V40H12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M6 40H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="hero-logo-text">
                <span className="hero-brand-name">JAMEEL</span>
                <span className="hero-brand-sub">TRADERS</span>
              </div>
            </Link>
            <button className="mobile-nav-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          {/* Nav Links */}
          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Drawer Footer */}
          <div className="mobile-nav-footer">
            <button
              type="button"
              className="mobile-project-list-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDrawerOpen(true);
              }}
            >
              <ShoppingBag size={18} />
              <span>MY PROJECT LIST ({totalItemsCount})</span>
            </button>
            <Link
              href="/contact"
              className="hero-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>START A PROJECT</span>
              <div className="hero-cta-arrow">
                <ArrowRight size={13} />
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
