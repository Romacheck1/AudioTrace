'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';

export default function ContentGrid() {
  const CONTAINER_WIDTH = 'w-[1200px]';
  const CONTENT_TOP_MARGIN = 'mt-16';
  const ROW_GAP = 'mb-[15px]';
  const BOX_GAP = 'gap-6';
  
  const categories = ['Songs', 'Podcasts', 'Audiobooks', 'Movies', 'Streams', 'YouTube', 'News', 'Radio', 'Interviews'];
  
  const [selectedTimes, setSelectedTimes] = useState<{ [key: number]: string }>({});

  const handleTimeSelect = (categoryIndex: number, time: string) => {
    setSelectedTimes({ ...selectedTimes, [categoryIndex]: time });
  };

  return (
    <div className={`hidden xl:block ${CONTAINER_WIDTH} mx-auto ${CONTENT_TOP_MARGIN} flex flex-col`}>
      {Array.from({ length: 3 }).map((_, rowIndex) => {
        const isLastRow = rowIndex === 2;
        return (
          <div key={rowIndex} className={`flex flex-row ${BOX_GAP} ${!isLastRow ? ROW_GAP : ''}`}>
            {Array.from({ length: 3 }).map((_, colIndex) => {
              const categoryIndex = rowIndex * 3 + colIndex;
              return (
                <CategoryCard
                  key={categoryIndex}
                  categoryName={categories[categoryIndex]}
                  categoryIndex={categoryIndex}
                  selectedTime={selectedTimes[categoryIndex] || 'All Time'}
                  onTimeSelect={(time) => handleTimeSelect(categoryIndex, time)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
