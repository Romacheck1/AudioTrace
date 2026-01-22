'use client';

import { useRouter } from 'next/navigation';

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

interface CategoryListProps {
  songs?: Song[];
  isCardSelected?: boolean;
}

export default function CategoryList({ songs = [], isCardSelected = false }: CategoryListProps) {
  const router = useRouter();

  // Format duration from milliseconds to MM:SS
  const formatDuration = (ms: number | null) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleItemClick = (songId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (!isCardSelected) {
      return; // Don't navigate if card is not selected
    }
    router.push(`/info/${songId}`);
  };

  // If no songs, show placeholders
  const displayItems = songs.length > 0 ? songs.slice(0, 10) : Array.from({ length: 5 });

  return (
    <div className={`flex-1 ${isCardSelected ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      <div className="space-y-1">
        {displayItems.map((item, index) => {
          const song = songs.length > 0 ? item as Song : null;
          const songId = song?.id || index + 1;
          
          return (
            <div
              key={song ? song.id : index}
              onClick={(e) => handleItemClick(songId, e)}
              className={`flex items-center gap-3 px-2 py-2 rounded transition-colors group ${
                isCardSelected 
                  ? 'hover:bg-gray-300 cursor-pointer' 
                  : 'opacity-60'
              }`}
            >
              {/* Index/Number */}
              <div className="w-6 text-center text-sm text-gray-500 group-hover:text-gray-700">
                {index + 1}
              </div>

              {/* Image */}
              <div className="w-12 h-12 bg-gray-400 rounded flex-shrink-0 overflow-hidden">
                {song?.image_url ? (
                  <img 
                    src={song.image_url} 
                    alt={`${song.title} album art`}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* Title and Artist */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {song?.title || 'Placeholder Title'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {song?.artist || 'Placeholder Artist'}
                </div>
              </div>

              {/* Duration */}
              <div className="text-xs text-gray-500 px-2">
                {song ? formatDuration(song.duration_ms) : '3:45'}
              </div>

              {/* More Options (hidden by default, shown on hover) */}
              <div className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

