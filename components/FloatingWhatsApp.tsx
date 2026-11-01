'use client';

import React from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function FloatingWhatsApp() {
  const whatsappUrl = 'https://wa.me/923334207691?text=Hello%20Jameel%20Traders,%20I%20would%20like%20to%20inquire%20about%20your%20lighting%20products.';

  return (
    <aside aria-label="WhatsApp quick chat" className="floating-whatsapp-wrapper">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with Jameel Traders on WhatsApp"
        title="Chat with Jameel Traders on WhatsApp"
      >
        <span className="floating-whatsapp-pulse" aria-hidden="true" />
        <WhatsAppIcon size={30} color="#ffffff" />
        <span className="floating-whatsapp-tooltip" role="tooltip">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
