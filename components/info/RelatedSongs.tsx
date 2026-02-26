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

interface RelatedSongsProps {
  songs: Song[];
}

export default function RelatedSongs({ songs }: RelatedSongsProps) {
  // Format duration from milliseconds to MM:SS
  const formatDuration = (ms: number | null) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (songs.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Songs</h2>
      <div className="space-y-3">
        {songs.map((song) => (
          <a
            key={song.id}
            href={`/info/${song.id}`}
            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {song.image_url ? (
                <img 
                  src={song.image_url} 
                  alt={`${song.title} album art`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{song.title}</p>
              <p className="text-sm text-gray-600 truncate">
                {song.artist}
                {song.album && ` | ${song.album}`}
                {song.album && song.album.includes('202') && `, ${song.album.match(/\d{4}/)?.[0] || ''}`}
              </p>
            </div>

            {/* Duration */}
            <span className="text-sm text-gray-500 flex-shrink-0">{formatDuration(song.duration_ms)}</span>

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

