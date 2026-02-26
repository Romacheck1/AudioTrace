'use client';

interface CategoryHeaderProps {
  categoryName: string;
  categoryIndex: number;
  showTimestamp?: boolean;
}

/**
 * CategoryHeader Component
 * 
 * Displays the category name in a header bar.
 * Simplified for mobile-first design without time filtering.
 * 
 * @component
 * @param {CategoryHeaderProps} props - Component props
 */
export default function CategoryHeader({ 
  categoryName, 
  categoryIndex,
  showTimestamp = false 
}: CategoryHeaderProps) {
  return (
    <div className="bg-gray-300 rounded-lg h-14 border border-gray-400 flex items-center justify-between px-4">
      <span className="text-lg font-bold text-gray-900">{categoryName}</span>
    </div>
  );
}
