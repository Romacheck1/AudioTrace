'use client';

/**
 * Footer Component
 * 
 * Clean, minimal mobile-first footer with decorative elements.
 * Simplified footer without navigation links.
 * 
 * @component
 */
export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-black relative overflow-hidden mt-8 md:mt-12 shadow-sm">
      {/* Decorative semi-circles - left side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
        {[1, 2, 3].map((index) => {
          const colors = ['#ef4444', '#3b82f6', '#fde047'];
          const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
          const margins = ['ml-0', '-ml-2', '-ml-3'];
          return (
            <svg 
              key={index} 
              className={`${sizes[index - 1]} ${margins[index - 1]} md:w-12 md:h-12 lg:w-16 lg:h-16`} 
              viewBox="0 0 50 50"
              style={{ opacity: 0.5 }}
            >
              <path
                d="M 25 7 A 18 18 0 0 1 25 43"
                fill="none"
                stroke={colors[index - 1]}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          );
        })}
      </div>
      
      {/* Decorative semi-circles - right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
        {[1, 2, 3].map((index) => {
          const colors = ['#ef4444', '#3b82f6', '#fde047'];
          const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
          const margins = ['mr-0', '-mr-2', '-mr-3'];
          return (
            <svg 
              key={index} 
              className={`${sizes[index - 1]} ${margins[index - 1]} md:w-12 md:h-12 lg:w-16 lg:h-16 scale-x-[-1]`} 
              viewBox="0 0 50 50"
              style={{ opacity: 0.5 }}
            >
              <path
                d="M 25 7 A 18 18 0 0 1 25 43"
                fill="none"
                stroke={colors[index - 1]}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          );
        })}
      </div>
      
      {/* Footer content */}
      <div className="relative z-10 px-4 py-6 md:py-8 flex items-center justify-center min-h-[60px] md:min-h-[80px]">
        <p className="text-xs md:text-sm text-gray-600 font-medium">
          AudioTrace © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
