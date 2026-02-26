'use client';

/**
 * Media item interface
 */
interface MediaItem {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  duration_ms: number | null;
}

interface CategoryListProps {
  mediaItems?: MediaItem[];
  isCardSelected?: boolean;
  categoryIndex?: number;
  showDuration?: boolean;
}

/**
 * CategoryList Component
 * 
 * Displays a scrollable list of media items.
 * Items are displayed when the parent card is selected.
 * 
 * Mobile-first design with touch-friendly interactions.
 * 
 * @component
 * @param {CategoryListProps} props - Component props
 */
export default function CategoryList({ 
  mediaItems = [], 
  isCardSelected = false, 
  categoryIndex = 0,
  showDuration = false
}: CategoryListProps) {
  /**
   * Formats duration from milliseconds to MM:SS format
   * @param ms - Duration in milliseconds
   * @returns Formatted duration string
   */
  const formatDuration = (ms: number | null) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Show placeholders if no items available
  const displayItems = mediaItems.length > 0 
    ? mediaItems.slice(0, 10) 
    : Array.from({ length: 5 });

  return (
    <div className={`category-list ${isCardSelected ? 'expanded' : ''}`}>
      <div className="space-y-2">
        {displayItems.map((item, index) => {
          const mediaItem = mediaItems.length > 0 ? item as MediaItem : null;
          
          return (
            <div
              key={mediaItem ? mediaItem.id : index}
              className={`category-item ${isCardSelected ? 'active' : ''}`}
            >
              {/* Index Number */}
              <div className="category-item-index">
                {index + 1}
              </div>

              {/* Image */}
              <div className="category-item-image">
                {mediaItem?.image_url ? (
                  <img 
                    src={mediaItem.image_url} 
                    alt={`${mediaItem.title} artwork`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="category-item-image-placeholder">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title and Artist */}
              <div className="category-item-content">
                <div className="category-item-title">
                  {mediaItem?.title || 'Placeholder Title'}
                </div>
                <div className="category-item-artist">
                  {mediaItem?.artist || 'Placeholder Artist'}
                </div>
              </div>

              {/* Duration - only show if showDuration is true */}
              {showDuration && (
                <div className="category-item-duration">
                  {mediaItem ? formatDuration(mediaItem.duration_ms) : '3:45'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
