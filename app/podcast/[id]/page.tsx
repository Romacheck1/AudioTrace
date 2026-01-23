import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import PodcastMainSection from '@/components/info/PodcastMainSection';
import PodcastInformationSection from '@/components/info/PodcastInformationSection';
import RelatedPodcasts from '@/components/info/RelatedPodcasts';

interface PodcastPageProps {
  params: Promise<{ id: string }>;
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const { id } = await params;
  
  // Query database directly
  const result = await pool.query('SELECT * FROM podcasts WHERE id = $1', [id]);
  const podcast = result.rows[0];

  if (!podcast) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Podcast not found</p>
        </div>
      </div>
    );
  }

  // Get related podcasts (same artist, different podcast)
  const relatedResult = await pool.query(
    'SELECT * FROM podcasts WHERE artist = $1 AND id != $2 LIMIT 3',
    [podcast.artist, id]
  );
  const relatedPodcasts = relatedResult.rows;

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        {/* 1. Breadcrumb */}
        <Breadcrumb category="Podcasts" title={podcast.title} />

        {/* 2. Main Section - Artwork + Podcast Info */}
        <PodcastMainSection podcast={podcast} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 3. Action Buttons */}
        <ActionButtons />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 4. Information Section */}
        <PodcastInformationSection podcast={podcast} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 5. Related Podcasts */}
        <RelatedPodcasts podcasts={relatedPodcasts} />
      </div>
    </div>
  );
}

