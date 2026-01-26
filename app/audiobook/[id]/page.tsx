import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import AudiobookMainSection from '@/components/info/AudiobookMainSection';
import AudiobookInformationSection from '@/components/info/AudiobookInformationSection';
import RelatedAudiobooks from '@/components/info/RelatedAudiobooks';

interface AudiobookPageProps {
  params: Promise<{ id: string }>;
}

export default async function AudiobookPage({ params }: AudiobookPageProps) {
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
  const result = await pool.query('SELECT * FROM audiobooks WHERE id = $1', [id]);
  const audiobook = result.rows[0];

  if (!audiobook) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Audiobook not found</p>
        </div>
      </div>
    );
  }

  // Get related audiobooks (same artist, different audiobook)
  const relatedResult = await pool.query(
    'SELECT * FROM audiobooks WHERE artist = $1 AND id != $2 LIMIT 3',
    [audiobook.artist, id]
  );
  const relatedAudiobooks = relatedResult.rows;

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

