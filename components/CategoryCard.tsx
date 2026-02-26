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
  const getNeonClass = (index: number) => {
    const classes = ['neon-cyan', 'neon-magenta', 'neon-orange', 'neon-teal'];
    return classes[index % classes.length];
  };

  const neonClass = getNeonClass(categoryIndex);

  return (
    <div 
      className={`category-card ${neonClass} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
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
