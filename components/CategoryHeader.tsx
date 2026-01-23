'use client';

import { useState } from 'react';
import TimeDropdown from './TimeDropdown';

interface CategoryHeaderProps {
  categoryName: string;
  categoryIndex: number;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export default function CategoryHeader({ categoryName, categoryIndex, selectedTime, onTimeSelect }: CategoryHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-300 rounded-lg h-16 border border-gray-400 mb-2 flex items-center justify-between px-4 relative">
      <span className="text-lg font-semibold -translate-x-0">{categoryName}</span>
      
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center justify-center w-8 h-8 hover:bg-gray-400 rounded transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <TimeDropdown
            selectedTime={selectedTime}
            onSelect={(time) => {
              onTimeSelect(time);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

