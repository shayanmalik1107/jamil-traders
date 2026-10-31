'use client';

import React, { useState } from 'react';
import { Send, Upload, Phone, Mail, MapPin, CheckCircle2, Clock } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa',
    location: '',
    description: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('company', formData.company);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('projectType', formData.projectType);
      data.append('location', formData.location);
      data.append('description', formData.description);

      if (selectedFile) {
        data.append('file', selectedFile);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact form error:', err);
      setErrorMessage(err?.message || 'Something went wrong while submitting. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-main bg-contact">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill">LET'S BUILD TOGETHER</span>
            <span>PROMPT ENGINEERING RESPONSE</span>
          </div>
          <h1 className="page-title">
            Start a <br />
            <span className="hero-title-italic">Project.</span>
          </h1>
          <p className="page-subtitle">
            Tell us what you're building. Whether you need photometrics, custom fixture specifications, or full turnkey execution across Pakistan — our team is ready.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="home-container">
          <div className="contact-grid">
            {/* Form Column */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success-state">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={54} style={{ color: 'var(--gold-accent)' }} />
                  </div>
                  <h3 className="success-title">Project Inquiry Received!</h3>
                  <p className="success-desc">
                    Thank you <strong>{formData.name}</strong>. Our senior lighting engineering team has received your project briefing and uploaded files. We will review your requirements and reach out within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="hero-cta-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedFile(null);
                    }}
                    style={{ marginTop: '1.5rem' }}
                  >
                    <span>SUBMIT ANOTHER INQUIRY</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="project-inquiry-form">
                  <div className="form-title-block">
                    <h3 className="form-heading">Tell Us About Your Project</h3>
                    <p className="form-subheading">Fill in the fields below and attach any architectural floor plans or moodboards.</p>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label>YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Architect Ali Raza"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label>COMPANY / PRACTICE</label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Design Associates"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label>EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        placeholder="ali@studio.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label>PHONE / WHATSAPP *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label>PROJECT TYPE</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      >
                        <option value="Residential Villa">Residential Villa / Modern Home</option>
                        <option value="Retail Flagship">Retail & Brand Flagship</option>
                        <option value="Commercial Office">Commercial Corporate Tower</option>
                        <option value="Hospitality">Hotel, Lounge or Restaurant</option>
                        <option value="Landscape & Outdoor">Landscape & Facade Illumination</option>
                        <option value="Healthcare">Healthcare & Clinical Wing</option>
                        <option value="Government">Government & Civic Structure</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label>PROJECT LOCATION</label>
                      <input
                        type="text"
                        placeholder="e.g. DHA Phase 6, Lahore"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label>WHAT ARE YOU PLANNING?</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your vision, ceiling heights, specific luminaire preferences, or project timeline..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {/* Drag and Drop File Upload Area */}
                  <div className="form-field-group">
                    <label>UPLOAD DRAWINGS / MOODBOARD (PDF, DWG, PNG, JPG)</label>
                    <div className="file-drop-zone">
                      <input
                        type="file"
                        id="drawings-upload"
                        onChange={handleFileChange}
                        accept=".pdf,.dwg,.png,.jpg,.jpeg,.zip"
                        className="file-input-hidden"
                      />
                      <label htmlFor="drawings-upload" className="file-drop-label">
                        <Upload size={24} className="file-drop-icon" />
                        {selectedFile ? (
                          <div className="file-selected-text">
                            <strong>{selectedFile.name}</strong>
                            <span>({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                        ) : (
                          <div>
                            <strong>Click or drag floor plans & drawings here</strong>
                            <span>Supports PDF, DWG, PNG, JPG up to 25MB</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {errorMessage && (
                    <div style={{
                      padding: '12px 16px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      borderRadius: '8px',
                      fontSize: '14px',
                      marginBottom: '1rem',
                    }}>
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="hero-cta-btn form-submit-btn"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    <span>{isSubmitting ? 'TRANSMITTING INQUIRY...' : 'TELL US ABOUT YOUR PROJECT'}</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Details Column */}
            <div className="contact-details-col">
              {/* WhatsApp Quick Action */}
              <a
                href="https://wa.me/923334207691?text=Hello%20Jameel%20Traders,%20I%20would%20like%20to%20discuss%20a%20lighting%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-action-card"
              >
                <div className="whatsapp-card-icon">
                  <WhatsAppIcon size={26} color="#ffffff" />
                </div>
                <div className="whatsapp-card-text">
                  <span className="whatsapp-badge">INSTANT CHAT</span>
                  <h4 className="whatsapp-title">Connect on WhatsApp</h4>
                  <p className="whatsapp-desc">Direct line to our technical project consultant.</p>
                </div>
              </a>

              {/* Showroom & Office Box */}
              <div className="info-box-card">
                <h4 className="info-box-heading">Main Corporate Showroom</h4>
                <ul className="info-box-list">
                  <li>
                    <MapPin size={18} className="info-icon" />
                    <div>
                      <strong>Lahore Showroom & Head Office</strong>
                      <span>90C, Second Floor, DHA Phase 8, Commercial Broadway, Lahore, Pakistan</span>
                    </div>
                  </li>
                  <li>
                    <Phone size={18} className="info-icon" />
                    <div>
                      <strong>Telephone & WhatsApp</strong>
                      <span><a href="https://wa.me/923334207691" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', fontWeight: 600 }}>03334207691 <WhatsAppIcon size={14} color="#25D366" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 3 }} /></a></span>
                    </div>
                  </li>
                  <li>
                    <Mail size={18} className="info-icon" />
                    <div>
                      <strong>Email Inquiries</strong>
                      <span><a href="mailto:jamiltraders1972@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>jamiltraders1972@gmail.com</a></span>
                    </div>
                  </li>
                  <li>
                    <Clock size={18} className="info-icon" />
                    <div>
                      <strong>Operating Hours</strong>
                      <span>Monday – Saturday: 10:00 AM – 8:00 PM</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map Placeholder Card */}
              <div className="map-placeholder-card">
                <div className="map-bg-pattern">
                  <MapPin size={36} className="map-pin-pulse" />
                  <span className="map-label">LAHORE CORPORATE SHOWROOM</span>
                  <span className="map-sub">Serving Lahore, Islamabad, Karachi & Nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
