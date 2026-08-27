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

  const { addItem, items, setIsDrawerOpen } = useProjectList();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = [
    { label: 'ALL CATEGORIES', value: 'ALL' },
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
              return (
                <div key={product.id} className="product-card">
                  <div className="product-card-img-wrap" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.name} className="product-card-img" />
                    <div className="product-card-env-badge">{product.environment}</div>
                  </div>

                  <div className="product-card-body">
                    <span className="product-card-category">{product.category}</span>
                    <h3 className="product-card-name" onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    <div className="product-card-specs-preview">
                      <span>{product.specs.wattage}</span>
                      <span>•</span>
                      <span>{product.specs.colorTemp}</span>
                    </div>

                    <div className="product-card-actions">
                      <button
                        type="button"
                        className="product-card-details-btn"
                        onClick={() => setSelectedProduct(product)}
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
                {/* Left Column: Image */}
                <div className="product-modal-img-col">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="product-modal-main-img" />
                  <div className="product-modal-badge">{selectedProduct.environment} Luminaire</div>
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
                      <div className="spec-row">
                        <span>WATTAGE:</span>
                        <strong>{selectedProduct.specs.wattage}</strong>
                      </div>
                      <div className="spec-row">
                        <span>LUMEN OUTPUT:</span>
                        <strong>{selectedProduct.specs.lumenOutput}</strong>
                      </div>
                      <div className="spec-row">
                        <span>COLOR TEMPERATURE:</span>
                        <strong>{selectedProduct.specs.colorTemp}</strong>
                      </div>
                      <div className="spec-row">
                        <span>DIMENSIONS:</span>
                        <strong>{selectedProduct.specs.dimensions}</strong>
                      </div>
                      <div className="spec-row">
                        <span>IP RATING:</span>
                        <strong>{selectedProduct.specs.ipRating}</strong>
                      </div>
                      {selectedProduct.specs.optics && (
                        <div className="spec-row">
                          <span>OPTICS:</span>
                          <strong>{selectedProduct.specs.optics}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.material && (
                        <div className="spec-row">
                          <span>MATERIAL:</span>
                          <strong>{selectedProduct.specs.material}</strong>
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
