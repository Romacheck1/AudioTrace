'use client';

interface TimeDropdownProps {
  selectedTime: string;
  onSelect: (time: string) => void;
}

const timeOptions = ['All Time', 'Today', 'This Week', 'This Month', 'This Year', 'Last 7 Days', 'Last 30 Days'];

export default function TimeDropdown({ selectedTime, onSelect }: TimeDropdownProps) {
  return (
    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-400 rounded-lg shadow-lg z-50 min-w-[150px]">
      {timeOptions.map((option) => (
        <button
          key={option}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(option);
          }}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
            selectedTime === option ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

