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
    <div className="category-header">
      <span className="category-header-title">{categoryName}</span>
    </div>
  );
}
