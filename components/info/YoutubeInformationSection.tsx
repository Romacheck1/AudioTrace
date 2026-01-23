'use client';

import { useState, useEffect } from 'react';

interface Youtube {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface YoutubeInformationSectionProps {
  youtuber: Youtube;
}

export default function YoutubeInformationSection({ youtuber }: YoutubeInformationSectionProps) {
  const formatSubscribers = (popularity: number | null) => {
    if (!popularity) return '0';
    if (popularity >= 1000000) {
      return `${(popularity / 1000000).toFixed(1)}M`;
    }
    if (popularity >= 1000) {
      return `${(popularity / 1000).toFixed(1)}k`;
    }
    return popularity.toLocaleString();
  };

  const sampleText = `This is a detailed description for the YouTube channel "${youtuber.title}" (${youtuber.artist}). They are a popular content creator in the ${youtuber.genre || 'entertainment'} category on YouTube, known for creating engaging videos and building a strong community. With over ${formatSubscribers(youtuber.popularity)} subscribers, they have established themselves as one of the top creators on the platform. Their content typically features ${youtuber.genre === 'Gaming' ? 'gameplay, commentary, and entertaining moments' : youtuber.genre === 'Kids' ? 'educational content, songs, and fun activities for children' : 'diverse content including vlogs, challenges, and entertaining videos'}. The channel continues to grow and produce high-quality content for their dedicated audience.`;
  
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

