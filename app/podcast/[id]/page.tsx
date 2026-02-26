import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import PodcastMainSection from '@/components/info/PodcastMainSection';
import PodcastInformationSection from '@/components/info/PodcastInformationSection';
import RelatedPodcasts from '@/components/info/RelatedPodcasts';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';
import type { Metadata } from 'next';

interface PodcastPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const { id } = await params;
  const podcast = getPlaceholderItem('Podcast', id);
  
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
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const podcast = getPlaceholderItem('Podcast', id);
  const relatedPodcasts = getPlaceholderRelated('Podcast', podcast.genre || 'Sample Genre', parseInt(id), 3);

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

