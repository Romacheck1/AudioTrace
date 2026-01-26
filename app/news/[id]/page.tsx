import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import NewsMainSection from '@/components/info/NewsMainSection';
import NewsInformationSection from '@/components/info/NewsInformationSection';
import RelatedNews from '@/components/info/RelatedNews';

interface NewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  
  if (!pool) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Database connection unavailable</p>
        </div>
      </div>
    );
  }

  const result = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
  const news = result.rows[0];

  if (!news) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">News source not found</p>
        </div>
      </div>
    );
  }

  const relatedResult = await pool.query(
    'SELECT * FROM news WHERE genre = $1 AND id != $2 LIMIT 3',
    [news.genre, id]
  );
  const relatedNews = relatedResult.rows;

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

