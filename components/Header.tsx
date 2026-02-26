'use client';

import { useRouter } from 'next/navigation';

/**
 * Header Component
 * 
 * Clean, modern mobile-first header with AudioTrace branding.
 * Features subtle decorative elements and improved spacing.
 * 
 * @component
 */
export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full bg-white border-b-2 border-black relative overflow-hidden shadow-sm">
      {/* Decorative diagonal stripes - top left */}
      <div className="absolute top-0 left-0 w-3 h-16 md:w-4 md:h-24 bg-red-500 rotate-45 origin-top-left -translate-y-5 md:-translate-y-6 translate-x-1 md:translate-x-2 opacity-90"></div>
      <div className="absolute top-0 left-0 w-3 h-16 md:w-4 md:h-24 bg-blue-500 rotate-45 origin-top-left -translate-y-5 md:-translate-y-6 translate-x-3 md:translate-x-5 opacity-90"></div>
      <div className="absolute top-0 left-0 w-3 h-16 md:w-4 md:h-24 bg-yellow-300 rotate-45 origin-top-left -translate-y-5 md:-translate-y-6 translate-x-5 md:translate-x-8 opacity-90"></div>
      
      {/* Main content */}
      <div className="relative z-10 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between min-h-[56px] md:min-h-[64px]">
        {/* AudioTrace logo */}
        <div 
          className="text-2xl md:text-3xl font-bold text-black cursor-pointer hover:opacity-80 transition-opacity tracking-tight"
          onClick={() => router.push('/')}
        >
          AudioTrace
        </div>
              
        {/* Tagline - responsive visibility */}
        <p className="hidden sm:block text-xs md:text-sm text-gray-600 font-medium italic text-right max-w-[180px] md:max-w-none ml-4">
          Your one stop shop for audio content.
        </p>

        {/* Decorative circle accents - bottom right */}
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2 hidden md:block opacity-60">
          <svg className="w-24 h-24 lg:w-32 lg:h-32" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="58" fill="none" stroke="#fde047" strokeWidth="12" opacity="0.6"/>
            <circle cx="70" cy="70" r="37" fill="none" stroke="#3b82f6" strokeWidth="12" opacity="0.6"/>
            <circle cx="70" cy="70" r="23" fill="#ef4444" opacity="0.7"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
