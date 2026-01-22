interface Song {
  id: number;
  title: string;
  artist: string;
  album: string | null;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface MainSectionProps {
  song: Song;
}

export default function MainSection({ song }: MainSectionProps) {
  // Format duration from milliseconds to MM:SS
  const formatDuration = (ms: number | null) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format popularity/rating
  const formatRating = (popularity: number | null) => {
    if (!popularity) return '0';
    return popularity.toLocaleString();
  };

  // Mock star rating (in future, this would come from DB)
  const starRating = 4.9;
  const reviewCount = '8k';

  return (
    <div className="flex gap-8 mb-8 flex-col lg:flex-row items-start lg:items-end">
      {/* Album Art - Left */}
      <div className="w-full lg:w-64 h-64 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
        {song.image_url ? (
          <img 
            src={song.image_url} 
            alt={`${song.title} album art`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>

      {/* Song Info - Right */}
      <div className="flex-1 flex flex-col justify-between lg:h-64">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">{song.title}</h1>
          <p className="text-4xl text-red-700 mb-3">{song.artist}</p>
          {song.album && (
            <>
              <p className="text-base text-blue-500 mb-3">{song.album}</p>
            </>
          )}
        </div>

        {/* Subtle divider */}
        <div className="border-t border-gray-300 my-4 opacity-30"></div>

        {/* Bottom section: Metadata + Stars */}
        <div>
          {/* Metadata - Right above stars */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-base text-gray-600 mb-2">
            <span>Duration: {formatDuration(song.duration_ms)}</span>
            {song.genre && <span>Genre: {song.genre}</span>}
            <span>Rating: {formatRating(song.popularity)}</span>
          </div>

          {/* Star Rating - Aligned to bottom */}
          <div className="flex items-center gap-2 text-base text-gray-600">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  className="w-5 h-5 text-yellow-400" 
                  fill={star <= Math.floor(starRating) ? "currentColor" : star === Math.ceil(starRating) && starRating % 1 !== 0 ? "currentColor" : "none"} 
                  viewBox="0 0 24 24"
                  style={star === Math.ceil(starRating) && starRating % 1 !== 0 ? { clipPath: 'inset(0 50% 0 0)' } : {}}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span>{starRating}</span>
            <span>({reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

