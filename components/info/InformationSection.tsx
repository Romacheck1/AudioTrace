'use client';

import { useState, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string | null;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface InformationSectionProps {
  song: Song;
}

export default function InformationSection({ song }: InformationSectionProps) {
  // Sample text for "Blinding Lights" by The Weeknd - will come from API later
  const fullText = `"Blinding Lights" is a synth-pop and new wave song by Canadian singer The Weeknd, released as the second single from his fourth studio album "After Hours" in November 2019. The track was written by The Weeknd, along with producers Max Martin and Oscar Holter, and quickly became one of the most successful songs of 2020. The song features a retro 1980s-inspired synth-pop sound with pulsating synthesizers, driving basslines, and The Weeknd's signature falsetto vocals. Lyrically, "Blinding Lights" explores themes of loneliness, longing, and the desire for connection in the nightlife, with references to Las Vegas and the neon-lit atmosphere of the city. The track's infectious melody and nostalgic production style resonated with audiences worldwide, helping it achieve massive commercial success. "Blinding Lights" spent a record-breaking 90 weeks on the Billboard Hot 100 chart, including four weeks at number one, and became one of the best-selling singles of all time. The song's music video, directed by Anton Tammi, features The Weeknd driving through empty city streets at night, perfectly capturing the song's atmospheric and melancholic mood. The track received critical acclaim for its production, The Weeknd's vocal performance, and its ability to blend modern pop sensibilities with 1980s nostalgia.`;

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
  }, []);

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

