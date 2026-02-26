import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import YoutubeMainSection from '@/components/info/YoutubeMainSection';
import YoutubeInformationSection from '@/components/info/YoutubeInformationSection';
import RelatedYoutubers from '@/components/info/RelatedYoutubers';

interface YoutubePageProps {
  params: Promise<{ id: string }>;
}

export default async function YoutubePage({ params }: YoutubePageProps) {
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

  // Query database directly
  const result = await pool.query('SELECT * FROM youtube WHERE id = $1', [id]);
  const youtuber = result.rows[0];

  if (!youtuber) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">YouTuber not found</p>
        </div>
      </div>
    );
  }

  // Get related youtubers (same genre, different youtuber)
  const relatedResult = await pool.query(
    'SELECT * FROM youtube WHERE genre = $1 AND id != $2 LIMIT 3',
    [youtuber.genre, id]
  );
  const relatedYoutubers = relatedResult.rows;

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        {/* 1. Breadcrumb */}
        <Breadcrumb category="YouTube" title={youtuber.title} />

        {/* 2. Main Section - Artwork + YouTuber Info */}
        <YoutubeMainSection youtuber={youtuber} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 3. Action Buttons */}
        <ActionButtons />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 4. Information Section */}
        <YoutubeInformationSection youtuber={youtuber} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 5. Related Youtubers */}
        <RelatedYoutubers youtubers={relatedYoutubers} />
      </div>
    </div>
  );
}

