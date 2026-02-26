import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import AudiobookMainSection from '@/components/info/AudiobookMainSection';
import AudiobookInformationSection from '@/components/info/AudiobookInformationSection';
import RelatedAudiobooks from '@/components/info/RelatedAudiobooks';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface AudiobookPageProps {
  params: Promise<{ id: string }>;
}

export default async function AudiobookPage({ params }: AudiobookPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const audiobook = getPlaceholderItem('Audiobook', id);
  const relatedAudiobooks = getPlaceholderRelated('Audiobook', audiobook.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        {/* 1. Breadcrumb */}
        <Breadcrumb category="Audiobooks" title={audiobook.title} />

        {/* 2. Main Section - Artwork + Audiobook Info */}
        <AudiobookMainSection audiobook={audiobook} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 3. Action Buttons */}
        <ActionButtons />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 4. Information Section */}
        <AudiobookInformationSection audiobook={audiobook} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 5. Related Audiobooks */}
        <RelatedAudiobooks audiobooks={relatedAudiobooks} />
      </div>
    </div>
  );
}

