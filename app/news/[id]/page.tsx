import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import NewsMainSection from '@/components/info/NewsMainSection';
import NewsInformationSection from '@/components/info/NewsInformationSection';
import RelatedNews from '@/components/info/RelatedNews';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface NewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const news = getPlaceholderItem('News', id);
  const relatedNews = getPlaceholderRelated('News', news.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8">
        <Breadcrumb category="News" title={news.title} />
        <NewsMainSection news={news} />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <ActionButtons />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <NewsInformationSection news={news} />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <RelatedNews news={relatedNews} />
      </div>
    </div>
  );
}

