import type { Metadata } from 'next';
import './globals.css';
import { ProjectListProvider } from '@/context/ProjectListContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectListDrawer from '@/components/ProjectListDrawer';

export const metadata: Metadata = {
  title: 'Jameel Traders — Spaces That Inspire | Architectural Lighting & Illumination',
  description: 'Pioneering architectural lighting, commercial luminaires, and turnkey electrical illumination across Pakistan since 2002.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ProjectListProvider>
          <Header />
          {children}
          <ProjectListDrawer />
          <Footer />
        </ProjectListProvider>
      </body>
    </html>
  );
}
