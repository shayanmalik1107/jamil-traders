'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useProjectList } from '@/context/ProjectListContext';

export default function ProjectListDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    clearList,
    totalItemsCount,
  } = useProjectList();

  const [step, setStep] = useState<'LIST' | 'FORM' | 'SUCCESS'>('LIST');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectLocation: '',
    projectNotes: '',
  });

  if (!isDrawerOpen) return null;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SUCCESS');
    setTimeout(() => {
      clearList();
    }, 500);
  };

  const resetDrawer = () => {
    setStep('LIST');
    setIsDrawerOpen(false);
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <ShoppingBag size={20} style={{ color: 'var(--gold-accent)' }} />
            <h3>PROJECT LIGHTING LIST</h3>
            <span className="drawer-badge">{totalItemsCount} ITEMS</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="drawer-body">
          {step === 'SUCCESS' ? (
            <div className="drawer-success-view">
              <div className="drawer-success-icon">
                <CheckCircle2 size={48} style={{ color: 'var(--gold-accent)' }} />
              </div>
              <h4 className="drawer-success-title">Project Quote Request Sent!</h4>
              <p className="drawer-success-desc">
                Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Our architectural lighting engineering team will review your project list and contact you within 24 hours with a comprehensive specification quote and BOQ.
              </p>
              <button
                type="button"
                className="hero-cta-btn"
                onClick={resetDrawer}
                style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
              >
                <span>CLOSE WINDOW</span>
              </button>
            </div>
          ) : step === 'FORM' ? (
            <form onSubmit={handleSubmitQuote} className="drawer-form">
              <div className="drawer-form-header">
                <h4>Request Project Specification Quote</h4>
                <p>Fill in your project details to receive formal pricing and DIALux photometrics.</p>
              </div>

              <div className="drawer-form-grid">
                <div className="form-group">
                  <label>YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architect Ali Raza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>COMPANY / FIRM</label>
                  <input
                    type="text"
                    placeholder="e.g. Studio Design Associates"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    placeholder="ali@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>PROJECT LOCATION</label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 6, Lahore"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>PROJECT NOTES / REQUIREMENTS</label>
                  <textarea
                    rows={3}
                    placeholder="Provide any ceiling heights, dimming requirements, or timeline..."
                    value={formData.projectNotes}
                    onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                  />
                </div>
              </div>

              <div className="drawer-form-actions">
                <button
                  type="button"
                  className="drawer-back-btn"
                  onClick={() => setStep('LIST')}
                >
                  ← BACK TO LIST
                </button>
                <button type="submit" className="hero-cta-btn">
                  <span>SUBMIT QUOTE REQUEST</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="drawer-empty-state">
                  <ShoppingBag size={40} className="drawer-empty-icon" />
                  <h4>Your Project List is Empty</h4>
                  <p>Browse our architectural product catalogue and click "Add to Project List" to save luminaires for your project quote.</p>
                </div>
              ) : (
                <div className="drawer-items-list">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="drawer-item-card">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="drawer-item-img"
                      />
                      <div className="drawer-item-info">
                        <span className="drawer-item-cat">{product.category}</span>
                        <h4 className="drawer-item-name">{product.name}</h4>
                        <span className="drawer-item-spec">
                          {product.specs.wattage} • {product.specs.colorTemp}
                        </span>

                        <div className="drawer-item-qty-row">
                          <div className="qty-picker">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span>{quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="drawer-item-remove"
                            onClick={() => removeItem(product.id)}
                            title="Remove from project list"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {step === 'LIST' && items.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-row">
              <span>Total Selected Luminaires:</span>
              <strong>{totalItemsCount} Units</strong>
            </div>

            <div className="drawer-action-buttons">
              <button
                type="button"
                className="drawer-clear-btn"
                onClick={clearList}
              >
                CLEAR LIST
              </button>
              <button
                type="button"
                className="hero-cta-btn"
                onClick={() => setStep('FORM')}
              >
                <span>PROCEED TO QUOTE →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
