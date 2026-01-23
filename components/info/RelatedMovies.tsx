interface Movie {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface RelatedMoviesProps {
  movies: Movie[];
}

export default function RelatedMovies({ movies }: RelatedMoviesProps) {
  const formatDuration = (ms: number | null) => {
    if (!ms) return '0:00';
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Movies</h2>
      <div className="space-y-3">
        {movies.map((movie) => (
          <a
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {movie.image_url ? (
                <img 
                  src={movie.image_url} 
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>

            {/* Movie Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{movie.title}</p>
              <p className="text-sm text-gray-600 truncate">
                {movie.artist}
                {movie.genre && ` | ${movie.genre}`}
              </p>
            </div>

            {/* Duration */}
            <span className="text-sm text-gray-500 flex-shrink-0">{formatDuration(movie.duration_ms)}</span>

            {/* Arrow Icon */}
            <svg 
              className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

