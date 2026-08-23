'use client';

import dynamic from 'next/dynamic';

const FramePlayer = dynamic(() => import('@/components/FramePlayer'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <FramePlayer />
    </main>
  );
}
