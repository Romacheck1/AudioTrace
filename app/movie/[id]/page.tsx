import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import MovieMainSection from '@/components/info/MovieMainSection';
import MovieInformationSection from '@/components/info/MovieInformationSection';
import RelatedMovies from '@/components/info/RelatedMovies';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const movie = getPlaceholderItem('Movie', id);
  const relatedMovies = getPlaceholderRelated('Movie', movie.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        {/* 1. Breadcrumb */}
        <Breadcrumb category="Movies" title={movie.title} />

        {/* 2. Main Section - Artwork + Movie Info */}
        <MovieMainSection movie={movie} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 3. Action Buttons */}
        <ActionButtons />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 4. Information Section */}
        <MovieInformationSection movie={movie} />

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-6 opacity-30"></div>

        {/* 5. Related Movies */}
        <RelatedMovies movies={relatedMovies} />
      </div>
    </div>
  );
}

