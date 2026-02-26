'use client';

import { useState, useEffect } from 'react';

interface Audiobook {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface AudiobookInformationSectionProps {
  audiobook: Audiobook;
}

export default function AudiobookInformationSection({ audiobook }: AudiobookInformationSectionProps) {
  // Sample text for audiobook description - will come from API later
  const fullText = `${audiobook.title} by ${audiobook.artist} is an engaging audiobook that brings the written word to life through expert narration. This ${audiobook.genre || 'compelling'} work offers listeners an immersive experience, allowing them to enjoy the story while on the go. The audiobook features professional voice acting, clear audio quality, and a pace that keeps listeners engaged from start to finish. Whether you're commuting, exercising, or relaxing at home, this audiobook provides an excellent way to enjoy literature. The narrator's skillful delivery brings depth to the characters and helps listeners connect with the story in a unique way. This production has received praise for its quality and accessibility, making it a popular choice among audiobook enthusiasts.`;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    // Start typing after a short delay
    const timer = setTimeout(typeText, 300);
    return () => clearTimeout(timer);
  }, [fullText]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Information</h2>
      
      {/* Text box for API content */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 min-h-[300px] relative">
        {/* AI Loading Icon */}
        {isTyping && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">AI Loading...</span>
          </div>
        )}

        <p className="text-gray-700 leading-relaxed">
          {displayedText}
          {isTyping && <span className="inline-block w-0.5 h-5 bg-gray-700 ml-1 animate-pulse"></span>}
        </p>
      </div>
    </div>
  );
}

