'use client';

import CategoryHeader from './CategoryHeader';
import CategoryList from './CategoryList';

interface CategoryCardProps {
  categoryName: string;
  categoryIndex: number;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export default function CategoryCard({ categoryName, categoryIndex, selectedTime, onTimeSelect }: CategoryCardProps) {
  return (
    <div className="bg-gray-200 rounded-lg h-96 border border-gray-300 flex-1 flex flex-col p-2">
      <CategoryHeader
        categoryName={categoryName}
        categoryIndex={categoryIndex}
        selectedTime={selectedTime}
        onTimeSelect={onTimeSelect}
      />
      <CategoryList itemCount={5} />
    </div>
  );
}

