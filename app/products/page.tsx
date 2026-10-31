'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ShoppingBag, X, CheckCircle2, SlidersHorizontal, Play, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data';
import { useProjectList } from '@/context/ProjectListContext';

function ProductVideoPlayer({
  src,
  poster,
  height = '340px'
}: {
  src: string;
  poster?: string;
  height?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [src]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = true;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => { });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        background: '#09090b',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        muted
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#09090b',
          display: 'block'
        }}
      />

      {/* Prominent Center Play Button when paused */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handleTogglePlay}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(9, 9, 11, 0.88)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            border: '2px solid #C8102E',
            padding: '12px 24px',
            borderRadius: '999px',
            boxShadow: '0 8px 30px rgba(200, 16, 46, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#C8102E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(200, 16, 46, 0.6)'
            }}
          >
            <Play size={16} style={{ fill: '#ffffff', color: '#ffffff', marginLeft: '2px' }} />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em' }}>
            PLAY DEMO VIDEO
          </span>
        </button>
      )}
    </div>
  );
}

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
      const matchCat =
        selectedCategory === 'ALL' ||
        p.categorySlug === selectedCategory.toLowerCase() ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'interior' && p.category.toLowerCase().includes('indoor')) ||
        (selectedCategory === 'landscape' && p.category.toLowerCase().includes('outdoor'));
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
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img"
                      style={product.id === 'prod-23' ? { transform: 'scale(1)', transformOrigin: 'center center' } : undefined}
                    />
                    <div className="product-card-env-badge">{product.environment}</div>
                    {product.video && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(200, 16, 46, 0.92)',
                          backdropFilter: 'blur(4px)',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                          zIndex: 2
                        }}
                      >
                        <Play size={10} style={{ fill: '#ffffff' }} />
                        <span>VIDEO &amp; SHAPES</span>
                      </div>
                    )}
                    {product.specs.finishColor === 'White & Black' && (
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
                {/* Left Column: Image, Video & Shape Galleries */}
                <div className="product-modal-img-col">
                  {(() => {
                    const activeMedia = activeModalImg || selectedProduct.image;
                    const isVideoMedia = /\.(mov|mp4|webm)(\?.*)?$/i.test(activeMedia);
                    const isShapeMedia = selectedProduct.shapeImages?.includes(activeMedia);

                    return (
                      <>
                        <div
                          style={{
                            position: 'relative',
                            background: isVideoMedia || isShapeMedia ? '#09090b' : '#ffffff',
                            borderRadius: '18px',
                            overflow: 'hidden',
                            border: '1px solid rgba(200, 16, 46, 0.15)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {isVideoMedia ? (
                            <ProductVideoPlayer key={activeMedia} src={activeMedia} poster={selectedProduct.image} height="340px" />
                          ) : (
                            <img
                              src={activeMedia}
                              alt={selectedProduct.name}
                              className="product-modal-main-img"
                              style={{
                                background: isShapeMedia ? '#09090b' : '#ffffff',
                                height: '340px',
                                objectFit: 'contain',
                                ...(selectedProduct.id === 'prod-23' ? { transform: 'scale(1.2)', transformOrigin: 'center center' } : {})
                              }}
                            />
                          )}
                          <div
                            className="product-modal-badge"
                            style={
                              isVideoMedia
                                ? { background: '#C8102E', color: '#ffffff', border: '1px solid #ffffff' }
                                : isShapeMedia
                                  ? { background: '#09090b', color: '#ffffff', border: '1px solid rgba(200, 16, 46, 0.45)' }
                                  : activeMedia === '/R2.jpeg'
                                    ? { background: '#854d0e', color: '#fef08a', border: '1px solid #ca8a04', fontWeight: 800 }
                                    : activeMedia === '/R1.jpeg'
                                      ? { background: '#1e293b', color: '#f1f5f9', border: '1px solid #94a3b8', fontWeight: 800 }
                                      : undefined
                            }
                          >
                            {isVideoMedia
                              ? 'Live Demo Video'
                              : isShapeMedia
                                ? 'Projected Shape'
                                : activeMedia === '/R2.jpeg'
                                  ? 'Solid Brass Material Cap'
                                  : activeMedia === '/R1.jpeg'
                                    ? 'Stainless Steel Cap'
                                    : `${selectedProduct.environment} Luminaire`}
                          </div>
                        </div>

                        {/* Normal Gallery: K2 to K4, R1/R2 and main image */}
                        {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                          <div style={{ marginTop: '0.9rem' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C8102E', letterSpacing: '0.12em', marginBottom: '0.45rem', textTransform: 'uppercase' }}>
                              {selectedProduct.id === 'prod-25'
                                ? 'Available Material Caps & Finishes (2)'
                                : `Product Views & Technical Datasheets (${selectedProduct.gallery.length})`}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(selectedProduct.gallery.length + (selectedProduct.video ? 1 : 0), 6)}, 1fr)`, gap: '0.45rem' }}>
                              {selectedProduct.gallery.map((gImg, idx) => {
                                const isSelected = activeMedia === gImg;
                                return (
                                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <img
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
                                    {selectedProduct.id === 'prod-25' && (
                                      <span style={{
                                        fontSize: '0.62rem',
                                        fontWeight: isSelected ? 800 : 600,
                                        color: isSelected ? '#C8102E' : '#64748b',
                                        textAlign: 'center',
                                        lineHeight: 1.2
                                      }}>
                                        {idx === 0 ? 'Stainless Steel' : 'Brass Cap'}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}

                              {/* Quick Video Selector Thumbnail */}
                              {selectedProduct.video && (
                                <button
                                  type="button"
                                  onClick={() => setActiveModalImg(selectedProduct.video!)}
                                  style={{
                                    width: '100%',
                                    height: '56px',
                                    background: activeMedia === selectedProduct.video ? '#C8102E' : '#09090b',
                                    borderRadius: '8px',
                                    border: activeMedia === selectedProduct.video ? '2px solid #ffffff' : '1px solid rgba(200, 16, 46, 0.35)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '2px',
                                    cursor: 'pointer',
                                    padding: '2px',
                                    transition: 'all 0.2s ease',
                                    transform: activeMedia === selectedProduct.video ? 'scale(1.04)' : 'scale(1)',
                                    boxShadow: activeMedia === selectedProduct.video ? '0 4px 12px rgba(200, 16, 46, 0.35)' : 'none'
                                  }}
                                  title="Play demonstration video in main viewer"
                                >
                                  <Play size={16} style={{ fill: '#ffffff', color: '#ffffff' }} />
                                  <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>VIDEO</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Dedicated Separate Section for Projected Shape / Gobo Images (K5 to K7) */}
                        {selectedProduct.shapeImages && selectedProduct.shapeImages.length > 0 && (
                          <div
                            style={{
                              marginTop: '1.1rem',
                              padding: '0.9rem',
                              background: 'linear-gradient(135deg, rgba(200, 16, 46, 0.05) 0%, rgba(24, 24, 27, 0.03) 100%)',
                              borderRadius: '16px',
                              border: '1px solid rgba(200, 16, 46, 0.18)',
                              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '4px' }}>
                              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C8102E', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Sparkles size={13} style={{ color: '#C8102E' }} />
                                <span>PROJECTED SHAPES &amp; PATTERNS ({selectedProduct.shapeImages.length})</span>
                              </div>
                              <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#ffffff', background: '#C8102E', padding: '2px 8px', borderRadius: '999px', letterSpacing: '0.04em' }}>
                                OPTICAL GOBOS
                              </span>
                            </div>

                            <p style={{ fontSize: '0.72rem', color: '#52525b', margin: '0 0 0.65rem 0', lineHeight: 1.45 }}>
                              Interchangeable gobo pattern optics for sharp architectural &amp; facade projections. Click any shape to preview:
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedProduct.shapeImages.length}, 1fr)`, gap: '0.55rem' }}>
                              {selectedProduct.shapeImages.map((sImg, sIdx) => {
                                const isSelected = activeMedia === sImg;
                                return (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => setActiveModalImg(sImg)}
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      gap: '0.3rem',
                                      cursor: 'pointer',
                                      background: isSelected ? 'rgba(200, 16, 46, 0.06)' : '#ffffff',
                                      border: isSelected ? '2px solid #C8102E' : '1px solid rgba(200, 16, 46, 0.16)',
                                      borderRadius: '12px',
                                      padding: '5px',
                                      transition: 'all 0.2s ease',
                                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                                      boxShadow: isSelected ? '0 4px 12px rgba(200, 16, 46, 0.18)' : '0 1px 3px rgba(0,0,0,0.04)'
                                    }}
                                  >
                                    <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#09090b', borderRadius: '8px', overflow: 'hidden', padding: '3px' }}>
                                      <img
                                        src={sImg}
                                        alt={`Projection Shape Pattern ${sIdx + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                      />
                                    </div>
                                    <span style={{ fontSize: '0.67rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#C8102E' : '#3f3f46' }}>
                                      Shape {sIdx + 1}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
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
                      {selectedProduct.specs.outputParam && (
                        <div className="spec-row">
                          <span>OUTPUT PARAMETER:</span>
                          <strong>{selectedProduct.specs.outputParam}</strong>
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
                          <span>CONTROL MODE:</span>
                          <strong>{selectedProduct.specs.controlType || selectedProduct.specs.control}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.patterns && (
                        <div className="spec-row">
                          <span>NUMBER OF PATTERNS:</span>
                          <strong>{selectedProduct.specs.patterns}</strong>
                        </div>
                      )}
                      {selectedProduct.specs.projectionRatio && (
                        <div className="spec-row">
                          <span>PROJECTION ASPECT RATIO:</span>
                          <strong>{selectedProduct.specs.projectionRatio}</strong>
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
                      {selectedProduct.id === 'prod-25' && (
                        <div className="spec-row">
                          <span>CAP FINISH OPTIONS:</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={() => setActiveModalImg('/R1.jpeg')}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                border: ((activeModalImg || selectedProduct.image) === '/R1.jpeg') ? '2px solid #C8102E' : '1px solid #cbd5e1',
                                background: ((activeModalImg || selectedProduct.image) === '/R1.jpeg') ? 'rgba(200, 16, 46, 0.05)' : '#ffffff',
                                color: '#0f172a',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              title="Click to view Stainless Steel Cap"
                            >
                              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)', border: '1px solid #64748b' }} />
                              Stainless Steel Cap (R1)
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveModalImg('/R2.jpeg')}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                border: ((activeModalImg || selectedProduct.image) === '/R2.jpeg') ? '2px solid #C8102E' : '1px solid #ca8a04',
                                background: ((activeModalImg || selectedProduct.image) === '/R2.jpeg') ? 'rgba(200, 16, 46, 0.05)' : '#fefce8',
                                color: '#854d0e',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              title="Click to view Solid Brass Material Cap"
                            >
                              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 100%)', border: '1px solid #a16207' }} />
                              Solid Brass Material Cap (R2)
                            </button>
                          </div>
                        </div>
                      )}
                      {selectedProduct.specs.finishColor && (
                        <div className="spec-row">
                          <span>AVAILABLE COLORS:</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            {selectedProduct.specs.finishColor === 'White & Black' ? (
                              <>
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
                              </>
                            ) : (
                              <strong>{selectedProduct.specs.finishColor}</strong>
                            )}
                          </div>
                        </div>
                      )}
                      {selectedProduct.specs.dimensions && (
                        <div className="spec-row">
                          <span>DIMENSIONS:</span>
                          <strong>{selectedProduct.specs.dimensions}</strong>
                        </div>
                      )}
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

                  {/* Video Demonstration Section */}
                  {selectedProduct.video && (
                    <div className="product-modal-sec" style={{ marginTop: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
                        <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Play size={13} style={{ color: '#C8102E', fill: '#C8102E' }} />
                          <span>LIVE DEMONSTRATION VIDEO</span>
                        </h4>
                        <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#C8102E', background: 'rgba(200, 16, 46, 0.08)', padding: '2px 8px', borderRadius: '6px' }}>
                          Architectural Projection Demo
                        </span>
                      </div>
                      <ProductVideoPlayer src={selectedProduct.video} poster={selectedProduct.image} height="240px" />
                    </div>
                  )}

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
