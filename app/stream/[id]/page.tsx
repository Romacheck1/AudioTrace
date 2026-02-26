import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import StreamMainSection from '@/components/info/StreamMainSection';
import StreamInformationSection from '@/components/info/StreamInformationSection';
import RelatedStreams from '@/components/info/RelatedStreams';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface StreamPageProps {
  params: Promise<{ id: string }>;
}

export default async function StreamPage({ params }: StreamPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const stream = getPlaceholderItem('Stream', id);
  const relatedStreams = getPlaceholderRelated('Stream', stream.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        {/* 1. Breadcrumb */}
        <Breadcrumb category="Streams" title={stream.title} />

        {/* 2. Main Section - Artwork + Stream Info */}
        <StreamMainSection stream={stream} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 3. Action Buttons */}
        <ActionButtons />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 4. Information Section */}
        <StreamInformationSection stream={stream} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 5. Related Streams */}
        <RelatedStreams streams={relatedStreams} />
      </div>
    </div>
  );
}

