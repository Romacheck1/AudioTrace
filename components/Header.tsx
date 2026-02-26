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
    <header className="header">
      {/* Decorative diagonal stripes - top left */}
      <div className="header-stripe header-stripe-red"></div>
      <div className="header-stripe header-stripe-blue"></div>
      <div className="header-stripe header-stripe-yellow"></div>
      
      {/* Main content */}
      <div className="header-content">
        {/* AudioTrace logo */}
        <div 
          className="header-logo"
          onClick={() => router.push('/')}
        >
          AudioTrace
        </div>
              
        {/* Tagline - responsive visibility */}
        <p className="header-tagline">
          Your one stop shop for audio content.
        </p>

        {/* Decorative circle accents - bottom right */}
        <div className="header-decoration">
          <svg className="header-circle" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="58" fill="none" stroke="#fde047" strokeWidth="12" opacity="0.6"/>
            <circle cx="70" cy="70" r="37" fill="none" stroke="#3b82f6" strokeWidth="12" opacity="0.6"/>
            <circle cx="70" cy="70" r="23" fill="#ef4444" opacity="0.7"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
