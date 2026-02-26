import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import StreamMainSection from '@/components/info/StreamMainSection';
import StreamInformationSection from '@/components/info/StreamInformationSection';
import RelatedStreams from '@/components/info/RelatedStreams';

interface StreamPageProps {
  params: Promise<{ id: string }>;
}

export default async function StreamPage({ params }: StreamPageProps) {
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
  const result = await pool.query('SELECT * FROM streams WHERE id = $1', [id]);
  const stream = result.rows[0];

  if (!stream) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Stream not found</p>
        </div>
      </div>
    );
  }

  // Get related streams (same genre, different stream)
  const relatedResult = await pool.query(
    'SELECT * FROM streams WHERE genre = $1 AND id != $2 LIMIT 3',
    [stream.genre, id]
  );
  const relatedStreams = relatedResult.rows;

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

