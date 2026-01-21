import Header from '@/components/Header';
import ContentGrid from '@/components/ContentGrid';
import Footer from '@/components/Footer';

export default function Home() {
  // Page-level spacing
  const PAGE_PADDING = 'px-10';

  return (
    <div className={PAGE_PADDING}>
      <Header />
      <ContentGrid />
      <Footer />
    </div>
  );
}