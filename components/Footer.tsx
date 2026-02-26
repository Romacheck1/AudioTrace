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
    <footer className="footer">
      {/* Decorative semi-circles - left side */}
      <div className="footer-decoration footer-decoration-left">
        {[1, 2, 3].map((index) => {
          const colors = ['#ef4444', '#3b82f6', '#fde047'];
          const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
          return (
            <svg 
              key={index} 
              className={`footer-semi-circle footer-semi-circle-left ${sizes[index - 1]} md:w-12 md:h-12 lg:w-16 lg:h-16`} 
              viewBox="0 0 50 50"
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
      <div className="footer-decoration footer-decoration-right">
        {[1, 2, 3].map((index) => {
          const colors = ['#ef4444', '#3b82f6', '#fde047'];
          const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12'];
          return (
            <svg 
              key={index} 
              className={`footer-semi-circle footer-semi-circle-right ${sizes[index - 1]} md:w-12 md:h-12 lg:w-16 lg:h-16`} 
              viewBox="0 0 50 50"
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
      <div className="footer-content">
        <p className="footer-text">
          AudioTrace © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
