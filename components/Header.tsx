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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Line 1: HOME, PROJECTS, PRODUCTS, EXPERTISE, ABOUT
  const line1Links = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'EXPERTISE', href: '/expertise' },
    { label: 'ABOUT', href: '/about' },
  ];

  // Line 2: INDUSTRIES, CONTACT
  const line2Links = [
    { label: 'INDUSTRIES', href: '/industries' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const allNavLinks = [...line1Links, ...line2Links];
  const navLinks = allNavLinks;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`hero-header ${isScrolled ? 'is-scrolled' : ''}`}>
        {/* Extra Large Logo on Left */}
        <div className="hero-header-left">
          <Link href="/" className="hero-logo">
            <img
              src="/logojamiltraders.png"
              alt="Jamil Traders Logo"
              className="hero-logo-img"
            />
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

        {/* Center 2-Tier Stack (Desktop Only) */}
        <div className="hero-header-right desktop-only-flex">
          {/* Line 1: HOME, PROJECTS, PRODUCTS, EXPERTISE, ABOUT */}
          <div className="hero-header-line1">
            <nav className="desktop-nav">
              <ul className="hero-nav">
                {line1Links.map((item) => {
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
          </div>

          {/* Line 2: INDUSTRIES, CONTACT + PROJECT LIST + START A PROJECT */}
          <div className="hero-header-line2">
            <nav className="desktop-nav">
              <ul className="hero-nav">
                {line2Links.map((item) => {
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

            <div className="hero-header-actions">
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

              <Link href="/contact" className="hero-talk-btn">
                <span>START A PROJECT</span>
                <div className="hero-talk-btn-arrow">
                  <ArrowRight size={13} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Nav Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <nav className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
          {/* Drawer Header */}
          <div className="mobile-nav-drawer-header">
            <Link href="/" className="hero-logo" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/logojamiltraders.png"
                alt="Jamil Traders Logo"
                className="hero-logo-img"
              />
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
