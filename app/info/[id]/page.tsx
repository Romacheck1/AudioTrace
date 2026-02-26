import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import MainSection from '@/components/info/MainSection';
import InformationSection from '@/components/info/InformationSection';
import RelatedSongs from '@/components/info/RelatedSongs';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface InfoPageProps {
  params: Promise<{ id: string }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const song = getPlaceholderItem('Song', id);
  const relatedSongs = getPlaceholderRelated('Song', song.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        {/* 1. Breadcrumb */}
        <Breadcrumb category="Songs" title={song.title} />

        {/* 2. Main Section - Album Art + Song Info */}
        <MainSection song={song} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 3. Action Buttons */}
        <ActionButtons />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 4. Information Section */}
        <InformationSection song={song} />

        {/* 5. Related Songs */}
        <RelatedSongs songs={relatedSongs} />
      </div>
    </div>
  );
}
