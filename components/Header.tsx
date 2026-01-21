'use client';

export default function Header() {
  // Layout constants
  const CONTAINER_WIDTH = 'w-[1200px]';
  const HEADER_HEIGHT = 'h-[75px]';
  
  // Spacing constants
  const HEADER_TOP_MARGIN = 'mt-[25px]';
  const HEADER_PADDING = 'px-6';
  
  // Header element positioning
  const STRIPE_BASE_CLASSES = 'absolute top-0 left-0 w-7.5 h-[200px] rotate-45 origin-top-left -translate-y-10';
  const AUDIOTRACE_CLASSES = 'text-3xl font-bold text-black ml-70 z-10 mt-5';
  const WORDING_CLASSES = 'text-sm text-gray-400 font-semibold italic whitespace-nowrap -mt-7 z-10 ml-175';
  const CIRCLES_CONTAINER_CLASSES = 'absolute bottom-0 right-0 z-20 translate-x-1/2 translate-y-1/2';

  return (
    <div className={`hidden xl:block ${CONTAINER_WIDTH} ${HEADER_HEIGHT} mx-auto bg-white border border-black ${HEADER_TOP_MARGIN} relative overflow-hidden flex items-center justify-between ${HEADER_PADDING}`}>
      {/* Diagonal stripes - top left */}
      <div className={`${STRIPE_BASE_CLASSES} bg-red-500 translate-x-15`}></div>
      <div className={`${STRIPE_BASE_CLASSES} bg-blue-500 translate-x-30`}></div>
      <div className={`${STRIPE_BASE_CLASSES} bg-yellow-300 translate-x-45`}></div>
      
      {/* AudioTrace name - midway left */}
      <div 
        className={`${AUDIOTRACE_CLASSES} cursor-pointer`}
        onClick={() => window.location.reload()}
      >
        AudioTrace
      </div>
              
      {/* Wording */}
      <p className={WORDING_CLASSES}>
        Your one stop shop to finding all things audio related.
      </p>

      {/* Circle stripes - layered circles - bottom right */}
      <div className={CIRCLES_CONTAINER_CLASSES}>
        <svg className="w-48 h-48" viewBox="0 0 140 140">
          {/* Yellow ring - largest, outer */}
          <circle cx="70" cy="70" r="58" fill="none" stroke="#fde047" strokeWidth="14"/>
          {/* Blue ring - middle */}
          <circle cx="70" cy="70" r="37" fill="none" stroke="#3b82f6" strokeWidth="14"/>
          {/* Red circle - center */}
          <circle cx="70" cy="70" r="23" fill="#ef4444"/>
        </svg>
      </div>
    </div>
  );
}

