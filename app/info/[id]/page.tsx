import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import MainSection from '@/components/info/MainSection';
import InformationSection from '@/components/info/InformationSection';
import RelatedSongs from '@/components/info/RelatedSongs';

interface InfoPageProps {
  params: Promise<{ id: string }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { id } = await params;
  
  // Query database directly
  const result = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
  const song = result.rows[0];

  if (!song) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Song not found</p>
        </div>
      </div>
    );
  }

  // Get related songs (same artist, different song)
  const relatedResult = await pool.query(
    'SELECT * FROM songs WHERE artist = $1 AND id != $2 LIMIT 3',
    [song.artist, id]
  );
  const relatedSongs = relatedResult.rows;

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
