import Header from '@/components/Header';
import ContentGrid from '@/components/ContentGrid';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AudioTrace - Discover Songs & Podcasts',
  description: 'Your one stop shop to finding all things audio related. Discover songs and podcasts in one place.',
  openGraph: {
    title: 'AudioTrace - Discover Songs & Podcasts',
    description: 'Your one stop shop to finding all things audio related.',
  },
};

/**
 * Home Page
 * 
 * Mobile-first layout with Header, Content Cards (Songs & Podcasts), and Footer.
 * Simple vertical stack structure optimized for mobile devices.
 * 
 * @component
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-6">
        <ContentGrid />
      </main>
      <Footer />
    </div>
  );
}
