'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';

export default function ContentGrid() {
  const CONTAINER_WIDTH = 'w-[1200px]';
  const CONTENT_TOP_MARGIN = 'mt-8';
  const ROW_GAP = 'mb-[15px]';
  const BOX_GAP = 'gap-6';
  
  const categories = ['Songs', 'Podcasts', 'Audiobooks', 'Movies', 'Streams', 'YouTube', 'News', 'Radio', 'Interviews'];
  
  const [selectedTimes, setSelectedTimes] = useState<{ [key: number]: string }>({});
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [categoryOrder, setCategoryOrder] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [hiddenCards, setHiddenCards] = useState<Set<number>>(new Set());

  const handleTimeSelect = (originalIndex: number, time: string) => {
    setSelectedTimes({ ...selectedTimes, [originalIndex]: time });
  };

  const handleCardClick = (positionIndex: number) => {
    const originalIndex = categoryOrder[positionIndex];
    
    if (selectedCards.length === 0) {
      // First selection
      setSelectedCards([positionIndex]);
    } else if (selectedCards.length === 1) {
      if (selectedCards[0] === positionIndex) {
        // Deselect if clicking same card
        setSelectedCards([]);
      } else {
        // Swap positions
        const newOrder = [...categoryOrder];
        const [firstPos, secondPos] = selectedCards[0] < positionIndex 
          ? [selectedCards[0], positionIndex]
          : [positionIndex, selectedCards[0]];
        
        // Swap the category indices at these positions
        [newOrder[firstPos], newOrder[secondPos]] = [newOrder[secondPos], newOrder[firstPos]];
        setCategoryOrder(newOrder);
        setSelectedCards([]);
      }
    }
  };

  const handleRemove = (positionIndex: number) => {
    const originalIndex = categoryOrder[positionIndex];
    setHiddenCards(new Set([...hiddenCards, originalIndex]));
    setSelectedCards(selectedCards.filter(pos => pos !== positionIndex));
  };

  const handleReset = () => {
    setCategoryOrder([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSelectedCards([]);
    setHiddenCards(new Set());
  };

  // Filter out hidden cards and reindex positions
  const visibleOrder = categoryOrder.filter(index => !hiddenCards.has(index));

  return (
    <div className={`hidden xl:block ${CONTAINER_WIDTH} mx-auto ${CONTENT_TOP_MARGIN} flex flex-col relative`}>
      {/* Reset button - positioned on the left */}
      <button
        onClick={handleReset}
        className="absolute left-0 top-0 px-3 py-1.5 text-sm bg-gray-400/30 hover:bg-gray-400/50 text-gray-600 hover:text-gray-800 rounded transition-all"
        aria-label="Reset card order"
      >
        Reset
      </button>

      <div className="flex flex-col">
        {Array.from({ length: 3 }).map((_, rowIndex) => {
          const isLastRow = rowIndex === 2;
          return (
            <div key={rowIndex} className={`flex flex-row ${BOX_GAP} ${!isLastRow ? ROW_GAP : ''}`}>
              {Array.from({ length: 3 }).map((_, colIndex) => {
                const gridIndex = rowIndex * 3 + colIndex;
                if (gridIndex >= visibleOrder.length) {
                  return <div key={`empty-${gridIndex}`} className="flex-1" />;
                }
                
                const originalIndex = visibleOrder[gridIndex];
                const originalPosition = categoryOrder.indexOf(originalIndex);
                const isSelected = selectedCards.includes(originalPosition);
                
                return (
                  <CategoryCard
                    key={`${gridIndex}-${originalIndex}`}
                    categoryName={categories[originalIndex]}
                    categoryIndex={originalIndex}
                    selectedTime={selectedTimes[originalIndex] || 'All Time'}
                    onTimeSelect={(time) => handleTimeSelect(originalIndex, time)}
                    isSelected={isSelected}
                    onClick={() => handleCardClick(originalPosition)}
                    onRemove={() => handleRemove(originalPosition)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
