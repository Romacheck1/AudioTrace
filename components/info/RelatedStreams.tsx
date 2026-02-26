interface Stream {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface RelatedStreamsProps {
  streams: Stream[];
}

export default function RelatedStreams({ streams }: RelatedStreamsProps) {
  const formatViewers = (popularity: number | null) => {
    if (!popularity) return '0';
    if (popularity >= 1000) {
      return `${(popularity / 1000).toFixed(1)}k`;
    }
    return popularity.toLocaleString();
  };

  if (streams.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Streams</h2>
      <div className="space-y-3">
        {streams.map((stream) => (
          <a
            key={stream.id}
            href={`/stream/${stream.id}`}
            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {stream.image_url ? (
                <img 
                  src={stream.image_url} 
                  alt={`${stream.title} avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>

            {/* Stream Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{stream.title}</p>
              <p className="text-sm text-gray-600 truncate">
                {stream.artist}
                {stream.genre && ` | ${stream.genre}`}
              </p>
            </div>

            {/* Viewers */}
            <span className="text-sm text-gray-500 flex-shrink-0">{formatViewers(stream.popularity)} viewers</span>

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

