'use client';

interface CategoryListProps {
  itemCount?: number;
}

export default function CategoryList({ itemCount = 5 }: CategoryListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300 transition-colors cursor-pointer group"
          >
            {/* Index/Number */}
            <div className="w-6 text-center text-sm text-gray-500 group-hover:text-gray-700">
              {index + 1}
            </div>

            {/* Placeholder Image */}
            <div className="w-12 h-12 bg-gray-400 rounded flex-shrink-0"></div>

            {/* Title and Artist */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                Placeholder Title
              </div>
              <div className="text-xs text-gray-500 truncate">
                Placeholder Artist
              </div>
            </div>

            {/* Duration */}
            <div className="text-xs text-gray-500 px-2">
              3:45
            </div>

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
        ))}
      </div>
    </div>
  );
}

