import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ContentGrid from '@/components/ContentGrid';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover and track songs, podcasts, audiobooks, movies, streams, YouTube videos, news, radio, and interviews all in one place.',
  openGraph: {
    title: 'SoundTrace - Track All Your Audio Content',
    description: 'Discover and track songs, podcasts, audiobooks, movies, streams, and more all in one place.',
  },
};

export default function Home() {
  // Page-level spacing
  const PAGE_PADDING = 'px-10';

  return (
    <div className={PAGE_PADDING}>
      <Header />
      <SearchBar />
      <ContentGrid />
      <Footer />
    </div>
  );
}