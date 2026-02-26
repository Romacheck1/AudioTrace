import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import PodcastMainSection from '@/components/info/PodcastMainSection';
import PodcastInformationSection from '@/components/info/PodcastInformationSection';
import RelatedPodcasts from '@/components/info/RelatedPodcasts';
import type { Metadata } from 'next';

interface PodcastPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    if (!pool) {
      return {
        title: 'Podcast',
        description: 'Podcast information',
      };
    }
    
    const result = await pool.query('SELECT * FROM podcasts WHERE id = $1', [id]);
    const podcast = result.rows[0];
    
    if (!podcast) {
      return {
        title: 'Podcast Not Found',
        description: 'The requested podcast could not be found.',
      };
    }
    
    return {
      title: `${podcast.title} by ${podcast.artist}`,
      description: podcast.description || `Listen to ${podcast.title} by ${podcast.artist}. ${podcast.genre ? `Genre: ${podcast.genre}.` : ''}`,
      openGraph: {
        title: `${podcast.title} by ${podcast.artist}`,
        description: podcast.description || `Listen to ${podcast.title} by ${podcast.artist}`,
        images: podcast.image_url ? [podcast.image_url] : [],
        type: 'music.song',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${podcast.title} by ${podcast.artist}`,
        description: podcast.description || `Listen to ${podcast.title} by ${podcast.artist}`,
        images: podcast.image_url ? [podcast.image_url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Podcast',
      description: 'Podcast information',
    };
  }
}

export default async function PodcastPage({ params }: PodcastPageProps) {
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

