'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ShoppingBag, X, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data';
import { useProjectList } from '@/context/ProjectListContext';

function ProductCatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedEnv, setSelectedEnv] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeModalImg, setActiveModalImg] = useState<string | null>(null);

  const { addItem, items, setIsDrawerOpen } = useProjectList();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const prodId = searchParams.get('id') || searchParams.get('product');
    if (prodId) {
      const match = PRODUCTS.find((p) => p.id.toLowerCase() === prodId.toLowerCase());
      if (match) {
        setSelectedProduct(match);
      }
    }
  }, [searchParams]);

  const categories = [
    { label: 'ALL CATEGORIES', value: 'ALL' },
    { label: 'OUTDOOR LIGHTS', value: 'outdoor' },
    { label: 'ARCHITECTURAL', value: 'architectural' },
    { label: 'INTERIOR', value: 'interior' },
    { label: 'DECORATIVE', value: 'decorative' },
    { label: 'COMMERCIAL', value: 'commercial' },
    { label: 'EXTERIOR & FACADE', value: 'facade' },
    { label: 'LANDSCAPE', value: 'landscape' },
  ];

  const environments = [
    { label: 'ALL LOCATIONS', value: 'ALL' },
    { label: 'INDOOR', value: 'Indoor' },
    { label: 'OUTDOOR', value: 'Outdoor' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.categorySlug === selectedCategory.toLowerCase() || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchEnv = selectedEnv === 'ALL' || p.environment === selectedEnv || p.environment === 'Indoor / Outdoor';
      return matchCat && matchEnv;
    });
  }, [selectedCategory, selectedEnv]);

  const isProductInList = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <>
      {/* Catalogue Filter Bar */}
      <section className="catalogue-filter-bar">
        <div className="home-container">
          <div className="filter-controls-row">
            <div className="filter-group-item">
              <SlidersHorizontal size={16} style={{ color: 'var(--gold-accent)' }} />
              <span className="filter-label-text">CATEGORY:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group-item">
              <span className="filter-label-text">ENVIRONMENT:</span>
              <select
                value={selectedEnv}
                onChange={(e) => setSelectedEnv(e.target.value)}
                className="filter-select"
              >
                {environments.map((env) => (
                  <option key={env.value} value={env.value}>
                    {env.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-summary-text">
              Showing <strong>{filteredProducts.length}</strong> Luminaire Systems
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="products-grid-section">
        <div className="home-container">
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const inList = isProductInList(product.id);
              const handleOpen = () => {
                setSelectedProduct(product);
                setActiveModalImg(null);
              };
              return (
                <div key={product.id} className="product-card">
                  <div className="product-card-img-wrap" onClick={handleOpen}>
                    <img src={product.image} alt={product.name} className="product-card-img" />
                    <div className="product-card-env-badge">{product.environment}</div>
                    {product.specs.finishColor && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: 'rgba(15, 23, 42, 0.88)',
                          backdropFilter: 'blur(6px)',
                          color: '#f8fafc',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                        }}
                      >
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', border: '1px solid #cbd5e1' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000000', border: '1px solid #64748b' }} />
                        <span>WHITE &amp; BLACK</span>
                      </div>
                    )}
                  </div>

                  <div className="product-card-body">
                    <span className="product-card-category">{product.category}</span>
                    <h3 className="product-card-name" onClick={handleOpen}>
                      {product.name}
                    </h3>
                    <div className="product-card-specs-preview">
                      <span>{product.specs.wattage}</span>
                      <span>•</span>
                      <span>{product.specs.colorTemp}</span>
                      {product.specs.finishColor && (
                        <>
                          <span>•</span>
                          <span style={{ color: '#C8102E', fontWeight: 600 }}>{product.specs.finishColor}</span>
                        </>
                      )}
                    </div>

                    <div className="product-card-actions">
                      <button
                        type="button"
                        className="product-card-details-btn"
                        onClick={handleOpen}
                      >
                        VIEW SPECS
                      </button>

                      <button
                        type="button"
                        className={`product-card-add-list-btn ${inList ? 'added' : ''}`}
                        onClick={() => addItem(product)}
                      >
                        <ShoppingBag size={14} />
                        <span>{inList ? 'ADDED' : 'ADD TO PROJECT LIST'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="product-modal-header">
              <div>
                <span className="product-modal-cat">{selectedProduct.category} • {selectedProduct.environment}</span>
                <h2 className="product-modal-title">{selectedProduct.name}</h2>
              </div>
              <button
                type="button"
                className="product-modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                <X size={20} />
              </button>
            </header>

            <div className="product-modal-body">
              <div className="product-modal-grid">
                {/* Left Column: Image & Gallery */}
                <div className="product-modal-img-col">
                  <div style={{ position: 'relative', background: '#ffffff', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(200, 16, 46, 0.12)' }}>
                    <img
                      src={activeModalImg || selectedProduct.image}
                      alt={selectedProduct.name}
                      className="product-modal-main-img"
                    />
                    <div className="product-modal-badge">{selectedProduct.environment} Luminaire</div>
                  </div>

                  {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                    <div style={{ marginTop: '0.9rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C8102E', letterSpacing: '0.12em', marginBottom: '0.45rem', textTransform: 'uppercase' }}>
                        Product Views & Technical Datasheets ({selectedProduct.gallery.length})
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(selectedProduct.gallery.length, 6)}, 1fr)`, gap: '0.45rem' }}>
                        {selectedProduct.gallery.map((gImg, idx) => {
                          const isSelected = (activeModalImg || selectedProduct.image) === gImg;
                          return (
                            <img
                              key={idx}
                              src={gImg}
                              alt={`${selectedProduct.name} preview ${idx + 1}`}
                              onClick={() => setActiveModalImg(gImg)}
                              style={{
                                width: '100%',
                                height: '56px',
                                objectFit: 'contain',
                                background: '#ffffff',
                                padding: '3px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: isSelected ? '2px solid #C8102E' : '1px solid rgba(200, 16, 46, 0.15)',
                                opacity: isSelected ? 1 : 0.75,
                                transition: 'all 0.2s ease',
                                transform: isSelected ? 'scale(1.04)' : 'scale(1)'
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Info & Specs */}
                <div className="product-modal-info-col">
                  <p className="product-modal-description">{selectedProduct.description}</p>

                  {/* Applications */}
                  <div className="product-modal-sec">
                    <h4>RECOMMENDED APPLICATIONS</h4>
                    <div className="product-applications-tags">
                      {selectedProduct.applications.map((app) => (
                        <span key={app} className="app-tag">{app}</span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Specs Table */}
                  <div className="product-modal-sec">
                    <h4>TECHNICAL SPECIFICATIONS</h4>
                    <div className="product-specs-table">
                      {selectedProduct.specs.type && (
                        <div className="spec-row">
                          <span>TYPE:</span>
                          <strong>{selectedProduct.specs.type}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.effect && (
                        <div className="spec-row">
                          <span>LIGHTING EFFECT:</span>
                          <strong style={{ color: '#C8102E' }}>{selectedProduct.specs.effect}</strong>
                        </div>
                      )}
                      <div className="spec-row">
                        <span>WATTAGE:</span>
                        <strong>{selectedProduct.specs.wattage}</strong>
                      </div>
                      {selectedProduct.specs.chipBrand && (
                        <div className="spec-row">
                          <span>LED ENGINE:</span>
                          <strong>{selectedProduct.specs.chipBrand}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.powerFactor && (
                        <div className="spec-row">
                          <span>POWER FACTOR (PF):</span>
                          <strong>{selectedProduct.specs.powerFactor}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.beamAngle && (
                        <div className="spec-row">
                          <span>BEAM ANGLE:</span>
                          <strong>{selectedProduct.specs.beamAngle}</strong>
                        </div>
                      )}
                      <div className="spec-row">
                        <span>COLOR TEMPERATURE:</span>
                        <strong>{selectedProduct.specs.colorTemp}</strong>
                      </div>
                      {selectedProduct.specs.cri && (
                        <div className="spec-row">
                          <span>COLOR RENDERING (CRI):</span>
                          <strong style={{ color: '#C8102E' }}>{selectedProduct.specs.cri}</strong>
                        </div>
                      )}
                      <div className="spec-row">
                        <span>LUMEN OUTPUT:</span>
                        <strong>{selectedProduct.specs.lumenOutput}</strong>
                      </div>
                      {selectedProduct.specs.voltage && (
                        <div className="spec-row">
                          <span>INPUT VOLTAGE:</span>
                          <strong>{selectedProduct.specs.voltage}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.frequency && (
                        <div className="spec-row">
                          <span>FREQUENCY:</span>
                          <strong>{selectedProduct.specs.frequency}</strong>
                        </div>
                      )}
                      {(selectedProduct.specs.controlType || selectedProduct.specs.control) && (
                        <div className="spec-row">
                          <span>CONTROL TYPE:</span>
                          <strong>{selectedProduct.specs.controlType || selectedProduct.specs.control}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.projectionDistance && (
                        <div className="spec-row">
                          <span>PROJECTION DISTANCE:</span>
                          <strong>{selectedProduct.specs.projectionDistance}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.ledDensity && (
                        <div className="spec-row">
                          <span>LED DENSITY:</span>
                          <strong>{selectedProduct.specs.ledDensity}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.operatingTemp && (
                        <div className="spec-row">
                          <span>OPERATING TEMP:</span>
                          <strong>{selectedProduct.specs.operatingTemp}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.finishColor && (
                        <div className="spec-row">
                          <span>AVAILABLE COLORS:</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              color: '#0f172a',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', border: '1px solid #94a3b8' }} />
                              White
                            </span>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid #334155',
                              background: '#0f172a',
                              color: '#f8fafc',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000000', border: '1px solid #64748b' }} />
                              Black
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="spec-row">
                        <span>DIMENSIONS:</span>
                        <strong>{selectedProduct.specs.dimensions}</strong>
                      </div>
                      <div className="spec-row">
                        <span>IP RATING:</span>
                        <strong>{selectedProduct.specs.ipRating}</strong>
                      </div>
                      {selectedProduct.specs.material && (
                        <div className="spec-row">
                          <span>MATERIAL & HOUSING:</span>
                          <strong>{selectedProduct.specs.material}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.lifetime && (
                        <div className="spec-row">
                          <span>RATED LIFETIME:</span>
                          <strong>{selectedProduct.specs.lifetime}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.warranty && (
                        <div className="spec-row">
                          <span>WARRANTY:</span>
                          <strong style={{ color: '#2e7d32' }}>{selectedProduct.specs.warranty}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="product-modal-actions-row">
                    <button
                      type="button"
                      className="hero-cta-btn"
                      onClick={() => {
                        addItem(selectedProduct);
                        setSelectedProduct(null);
                        setIsDrawerOpen(true);
                      }}
                    >
                      <ShoppingBag size={15} />
                      <span>ADD TO PROJECT LIST</span>
                    </button>

                    <Link
                      href="/contact"
                      className="hero-secondary-btn"
                      onClick={() => setSelectedProduct(null)}
                    >
                      <span>REQUEST A QUOTE</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="page-main bg-products">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill">ARCHITECTURAL CATALOGUE</span>
            <span>SPECIFICATION GRADE LUMINAIRES</span>
          </div>
          <h1 className="page-title">
            Lighting, Chosen <br />
            <span className="hero-title-italic">With Intention.</span>
          </h1>
          <p className="page-subtitle">
            Explore our curated portfolio of architectural downlights, 48V magnetic tracks, IP67 facade grazers, and bespoke luminaires engineered for optical precision.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="home-container" style={{ color: '#a1a1aa', padding: '2rem 0' }}>Loading Catalogue...</div>}>
        <ProductCatalogueContent />
      </Suspense>
    </main>
  );
}
