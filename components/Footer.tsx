'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  
  // Colors for semi-circles
  const colors = ['red', 'blue', 'yellow'];
  
  // Navigation labels with routes
  const navItems = [
    { label: 'About', route: '/about' },
    { label: 'F.A.Q', route: '/faq' },
    { label: 'Socials', route: '/socials' },
    { label: 'Legal', route: '/legal' },
    { label: 'Roadmap', route: '/roadmap' },
    { label: 'Updates', route: '/updates' }
  ];
  
  // Layout constants
  const CONTAINER_WIDTH = 'w-[1200px]';
  const FOOTER_HEIGHT = 'h-[75px]';
  
  // Spacing constants
  const FOOTER_TOP_MARGIN = 'mt-[25px]';
  const FOOTER_BOTTOM_MARGIN = 'mb-[25px]';
  const FOOTER_PADDING = 'px-6';

  return (
    <div className={`hidden lg:block ${CONTAINER_WIDTH} ${FOOTER_HEIGHT} mx-auto bg-white border border-black ${FOOTER_TOP_MARGIN} ${FOOTER_BOTTOM_MARGIN} relative overflow-hidden flex items-center justify-between ${FOOTER_PADDING}`}>
      {/* Left side semi-circles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center translate-x-[54px]">
        {[1, 2, 3].map((index) => (
          <svg key={index} className="w-28 h-28 -ml-15" viewBox="0 0 50 50">
            <circle 
              cx="25" 
              cy="25" 
              r="20" 
              fill="none" 
              stroke={colors[index - 1]}
              strokeWidth="5"
              strokeDasharray="62.8 62.8"
              transform="rotate(90 25 25)"
            />
          </svg>
        ))}
      </div>
      
      {/* Right side semi-circles - rotated inward */}
      <div className="absolute right-0 top-1/2 flex items-center" style={{ transform: 'translateY(-50%) translateX(-54px) scaleX(-1)' }}>
        {[1, 2, 3].map((index) => (
          <svg key={index} className="w-28 h-28 -ml-15" viewBox="0 0 50 50">
            <circle 
              cx="25" 
              cy="25" 
              r="20" 
              fill="none" 
              stroke={colors[index - 1]}
              strokeWidth="5"
              strokeDasharray="62.8 62.8"
              transform="rotate(90 25 25)"
            />
          </svg>
        ))}
      </div>
      
      {/* Center navigation pills */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
        {navItems.map((item, index) => {
          const pillColors = ['red', 'blue', 'yellow', 'red', 'blue', 'yellow'];
          const bgColor = pillColors[index] === 'red' ? 'bg-red-500 hover:bg-red-400' : pillColors[index] === 'blue' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-yellow-500 hover:bg-yellow-400';
          return (
            <div
              key={item.label}
              onClick={() => router.push(item.route)}
              className={`px-6 py-1.5 rounded-full border border-black ${bgColor} text-white text-lg whitespace-nowrap transition-colors cursor-pointer`}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}