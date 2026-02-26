'use client';

import { useState, useEffect } from 'react';

interface Radio {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface RadioInformationSectionProps {
  radio: Radio;
}

export default function RadioInformationSection({ radio }: RadioInformationSectionProps) {
  const sampleText = `This is a detailed description for the radio station "${radio.title}" (${radio.artist}). They broadcast ${radio.genre || 'diverse'} music and programming, providing listeners with a unique audio experience. Known for their curated playlists and engaging DJs, this station has built a loyal following of music enthusiasts. Their programming typically features a mix of ${radio.genre === 'Eclectic' ? 'various genres and styles' : radio.genre === 'Alternative' ? 'alternative and indie music' : 'carefully selected tracks'} that appeal to their audience. The station continues to be a go-to source for discovering new music and enjoying quality radio content.`;
  
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 15;
    const typeText = () => {
      if (currentIndex < sampleText.length) {
        setDisplayedText(sampleText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };
    const timer = setTimeout(typeText, 300);
    return () => clearTimeout(timer);
  }, [sampleText]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Information</h2>
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 min-h-[300px] relative">
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

