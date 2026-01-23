interface Youtube {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface RelatedYoutubersProps {
  youtubers: Youtube[];
}

export default function RelatedYoutubers({ youtubers }: RelatedYoutubersProps) {
  const formatSubscribers = (popularity: number | null) => {
    if (!popularity) return '0';
    if (popularity >= 1000000) {
      return `${(popularity / 1000000).toFixed(1)}M`;
    }
    if (popularity >= 1000) {
      return `${(popularity / 1000).toFixed(1)}k`;
    }
    return popularity.toLocaleString();
  };

  if (youtubers.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Channels</h2>
      <div className="space-y-3">
        {youtubers.map((youtuber) => (
          <a
            key={youtuber.id}
            href={`/youtube/${youtuber.id}`}
            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {youtuber.image_url ? (
                <img 
                  src={youtuber.image_url} 
                  alt={`${youtuber.title} channel`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>

            {/* Channel Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{youtuber.title}</p>
              <p className="text-sm text-gray-600 truncate">
                {youtuber.artist}
                {youtuber.genre && ` | ${youtuber.genre}`}
              </p>
            </div>

            {/* Subscribers */}
            <span className="text-sm text-gray-500 flex-shrink-0">{formatSubscribers(youtuber.popularity)} subs</span>

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

