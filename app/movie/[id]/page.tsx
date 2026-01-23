import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import MovieMainSection from '@/components/info/MovieMainSection';
import MovieInformationSection from '@/components/info/MovieInformationSection';
import RelatedMovies from '@/components/info/RelatedMovies';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  
  // Query database directly
  const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
  const movie = result.rows[0];

  if (!movie) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Movie not found</p>
        </div>
      </div>
    );
  }

  // Get related movies (same director/artist, different movie)
  const relatedResult = await pool.query(
    'SELECT * FROM movies WHERE artist = $1 AND id != $2 LIMIT 3',
    [movie.artist, id]
  );
  const relatedMovies = relatedResult.rows;

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

