'use client';

import CategoryHeader from './CategoryHeader';
import CategoryList from './CategoryList';

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

interface CategoryCardProps {
  categoryName: string;
  categoryIndex: number;
  isSelected: boolean;
  onClick: () => void;
  mediaItems: MediaItem[];
  showDuration?: boolean;
}

/**
 * CategoryCard Component
 * 
 * A card component that displays a category with a list of items.
 * When selected, the card expands to show items.
 * 
 * Mobile-first design with responsive styling.
 * 
 * @component
 * @param {CategoryCardProps} props - Component props
 */
export default function CategoryCard({ 
  categoryName, 
  categoryIndex, 
  isSelected, 
  onClick, 
  mediaItems = [],
  showDuration = false
}: CategoryCardProps) {
  // Neon accent colors for selected state - supports 4 cards
  const getNeonColor = (index: number) => {
    const colors = [
      { border: '#00ffff', glow: 'rgba(0, 255, 255, 0.3)' }, // Cyan for Songs
      { border: '#ff00ff', glow: 'rgba(255, 0, 255, 0.3)' }, // Magenta for Podcasts
      { border: '#ff6b35', glow: 'rgba(255, 107, 53, 0.3)' }, // Orange for Albums
      { border: '#4ecdc4', glow: 'rgba(78, 205, 196, 0.3)' }, // Teal for Artists
    ];
    return colors[index % colors.length];
  };

  const neonColor = isSelected ? getNeonColor(categoryIndex) : null;

  return (
    <div 
      className={`
        bg-gray-200 rounded-lg flex flex-col p-4 cursor-pointer 
        transition-all overflow-hidden border-2
        ${isSelected ? 'scale-[1.02]' : ''}
      `}
      onClick={onClick}
      style={{
        minHeight: isSelected ? '500px' : '400px',
        maxHeight: isSelected ? '600px' : '400px',
        ...(isSelected && neonColor ? {
          borderColor: neonColor.border,
          boxShadow: `0 0 10px ${neonColor.glow}, inset 0 0 10px ${neonColor.glow}`,
        } : {
          borderColor: 'transparent',
        })
      }}
    >
      <CategoryHeader
        categoryName={categoryName}
        categoryIndex={categoryIndex}
        showTimestamp={false}
      />
      <CategoryList 
        mediaItems={mediaItems} 
        isCardSelected={isSelected} 
        categoryIndex={categoryIndex}
        showDuration={showDuration}
      />
    </div>
  );
}
