'use client';

import { useState, useEffect } from 'react';

interface Podcast {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface PodcastInformationSectionProps {
  podcast: Podcast;
}

export default function PodcastInformationSection({ podcast }: PodcastInformationSectionProps) {
  // Sample text for podcast description - will come from API later
  const fullText = `${podcast.title} is a popular podcast hosted by ${podcast.artist}, exploring topics in ${podcast.genre || 'various genres'}. With ${podcast.popularity || 'numerous'} episodes, this podcast has built a dedicated following of listeners who appreciate its engaging content and insightful discussions. The show features in-depth conversations, expert interviews, and thought-provoking analysis that keeps audiences coming back for more. Each episode offers a unique perspective on current events, culture, and ideas, making it a must-listen for anyone interested in ${podcast.genre || 'entertaining and informative content'}. The podcast has received widespread acclaim for its production quality, engaging hosts, and ability to make complex topics accessible to a broad audience.`;

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

