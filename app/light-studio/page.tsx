'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function LightStudioPage() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1100);

  // Resize the iframe to fit the studio content (same-origin, so we can read it)
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | null = null;

    const fit = () => {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      setHeight(doc.documentElement.scrollHeight);
      observer?.disconnect();
      observer = new ResizeObserver(() => setHeight(doc.documentElement.scrollHeight));
      observer.observe(doc.body);
    };

    frame.addEventListener('load', fit);
    if (frame.contentDocument?.readyState === 'complete') fit();
    return () => {
      frame.removeEventListener('load', fit);
      observer?.disconnect();
    };
  }, []);

  return (
    <main className="page-main">
      <iframe
        ref={frameRef}
        src="/light-studio.html"
        title="Light Studio"
        style={{ width: '100%', height, border: 0, display: 'block' }}
      />
    </main>
  );
}
