'use client';

import dynamic from 'next/dynamic';
import HomeSections from '@/components/HomeSections';

const FramePlayer = dynamic(() => import('@/components/FramePlayer'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <FramePlayer />
      <HomeSections />
    </main>
  );
}
