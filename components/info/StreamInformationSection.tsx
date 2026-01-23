'use client';

import { useState, useEffect } from 'react';

interface Stream {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface StreamInformationSectionProps {
  stream: Stream;
}

export default function StreamInformationSection({ stream }: StreamInformationSectionProps) {
  const sampleText = `This is a detailed description for the streamer "${stream.title}" (${stream.artist}). They are a popular content creator in the ${stream.genre || 'gaming'} category on Twitch, known for entertaining streams and engaging with their community. With an average of ${stream.popularity ? (stream.popularity / 1000).toFixed(1) : 'N/A'}k viewers, they have built a dedicated following through consistent streaming and high-quality content. Their streams typically feature ${stream.genre === 'Gaming' ? 'gameplay, commentary, and interactive moments with viewers' : 'discussions, reactions, and community engagement'}.`;
  
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

