'use client';

import CategoryHeader from './CategoryHeader';
import CategoryList from './CategoryList';

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
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
  songs?: MediaItem[];
  showTimestamp?: boolean;
}

// 80s neon colors for each card - only computed when needed
const getNeonColor = (index: number) => {
  const colors = [
    { border: '#00ffff', glow: 'rgba(0, 255, 255, 0.3)' }, // Cyan
    { border: '#ff00ff', glow: 'rgba(255, 0, 255, 0.3)' }, // Magenta
    { border: '#9d4edd', glow: 'rgba(157, 78, 221, 0.3)' }, // Purple
    { border: '#ff006e', glow: 'rgba(255, 0, 110, 0.3)' }, // Pink
    { border: '#ffbe0b', glow: 'rgba(255, 190, 11, 0.3)' }, // Yellow
    { border: '#06ffa5', glow: 'rgba(6, 255, 165, 0.3)' }, // Green
    { border: '#3a86ff', glow: 'rgba(58, 134, 255, 0.3)' }, // Blue
    { border: '#ff006e', glow: 'rgba(255, 0, 110, 0.3)' }, // Hot Pink
    { border: '#00f5ff', glow: 'rgba(0, 245, 255, 0.3)' }, // Light Cyan
  ];
  return colors[index % colors.length];
};

export default function CategoryCard({ categoryName, categoryIndex, selectedTime, onTimeSelect, isSelected, onClick, onRemove, songs = [], showTimestamp = true }: CategoryCardProps) {
  const neonColor = isSelected ? getNeonColor(categoryIndex) : null;

  return (
    <div 
      className={`bg-gray-200 rounded-lg flex-1 flex flex-col p-2 relative cursor-pointer transition-all overflow-hidden ${
        isSelected ? 'scale-[1.02]' : ''
      }`}
      onClick={onClick}
      style={{
        height: '384px',
        maxHeight: '384px',
        minHeight: '384px',
        flexShrink: 0,
        ...(isSelected && neonColor ? {
          border: `2px solid ${neonColor.border}`,
          boxShadow: `0 0 10px ${neonColor.glow}, inset 0 0 10px ${neonColor.glow}`,
        } : {
          border: '2px solid transparent',
        })
      }}
    >
      {/* X button - top left, subtle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-400/20 hover:bg-gray-400/40 text-gray-500/60 hover:text-gray-700 transition-all z-10 opacity-40 hover:opacity-100"
        aria-label="Remove card"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <CategoryHeader
        categoryName={categoryName}
        categoryIndex={categoryIndex}
        selectedTime={selectedTime}
        onTimeSelect={onTimeSelect}
        showTimestamp={showTimestamp}
      />
      <CategoryList songs={songs} isCardSelected={isSelected} categoryIndex={categoryIndex} />
    </div>
  );
}

