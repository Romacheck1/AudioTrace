'use client';

import { useRouter } from 'next/navigation';

interface MediaItem {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  duration_ms: number | null;
}

interface CategoryListProps {
  songs?: MediaItem[];
  isCardSelected?: boolean;
  categoryIndex?: number;
}

export default function CategoryList({ songs = [], isCardSelected = false, categoryIndex = 0 }: CategoryListProps) {
  const router = useRouter();

  // Show duration only for Songs (0), Movies (3), and Interviews (8)
  const showDuration = categoryIndex === 0 || categoryIndex === 3 || categoryIndex === 8;

  // Format duration from milliseconds to MM:SS
  const formatDuration = (ms: number | null) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleItemClick = (itemId: number, e: React.MouseEvent) => {
    if (!isCardSelected) {
      // If card is not selected, let the click bubble up to activate the card
      // Don't stop propagation, so the card's onClick handler fires
      return;
    }
    // If card is selected, navigate to appropriate page based on category
    e.stopPropagation();
    // categoryIndex 0 = Songs, 1 = Podcasts, 2 = Audiobooks, 3 = Movies, 4 = Streams, 5 = YouTube, 6 = News, 7 = Radio, 8 = Interviews
    let route = `/info/${itemId}`;
    if (categoryIndex === 1) route = `/podcast/${itemId}`;
    else if (categoryIndex === 2) route = `/audiobook/${itemId}`;
    else if (categoryIndex === 3) route = `/movie/${itemId}`;
    else if (categoryIndex === 4) route = `/stream/${itemId}`;
    else if (categoryIndex === 5) route = `/youtube/${itemId}`;
    else if (categoryIndex === 6) route = `/news/${itemId}`;
    else if (categoryIndex === 7) route = `/radio/${itemId}`;
    else if (categoryIndex === 8) route = `/interview/${itemId}`;
    router.push(route);
  };

  // If no songs, show placeholders
  const displayItems = songs.length > 0 ? songs.slice(0, 10) : Array.from({ length: 5 });

  return (
    <div className={`flex-1 min-h-0 ${isCardSelected ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      <div className="space-y-1">
        {displayItems.map((item, index) => {
          const mediaItem = songs.length > 0 ? item as MediaItem : null;
          const itemId = mediaItem?.id || index + 1;
          
          return (
            <div
              key={mediaItem ? mediaItem.id : index}
              onClick={(e) => handleItemClick(itemId, e)}
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
                {mediaItem?.image_url ? (
                  <img 
                    src={mediaItem.image_url} 
                    alt={`${mediaItem.title} artwork`}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* Title and Artist */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {mediaItem?.title || 'Placeholder Title'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {mediaItem?.artist || 'Placeholder Artist'}
                </div>
              </div>

              {/* Duration - only show for Songs, Movies, and Interviews */}
              {showDuration && (
                <div className="text-xs text-gray-500 px-2">
                  {mediaItem ? formatDuration(mediaItem.duration_ms) : '3:45'}
                </div>
              )}

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

