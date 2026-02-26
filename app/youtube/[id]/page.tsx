import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import YoutubeMainSection from '@/components/info/YoutubeMainSection';
import YoutubeInformationSection from '@/components/info/YoutubeInformationSection';
import RelatedYoutubers from '@/components/info/RelatedYoutubers';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface YoutubePageProps {
  params: Promise<{ id: string }>;
}

export default async function YoutubePage({ params }: YoutubePageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const youtuber = getPlaceholderItem('Youtube', id);
  const relatedYoutubers = getPlaceholderRelated('Youtube', youtuber.genre || 'Sample Genre', parseInt(id), 3);

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

