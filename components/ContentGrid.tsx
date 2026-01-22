'use client';

import { useEffect, useState } from 'react';

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

export default function ContentGrid() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(data => {
        // Check if it's an error response
        if (data.error) {
          console.error('API error:', data.error, data.details);
          setSongs([]);
        } else if (Array.isArray(data)) {
          // Get top 10 songs
          setSongs(data.slice(0, 10));
        } else {
          console.error('API returned non-array data:', data);
          setSongs([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching songs:', err);
        setSongs([]);
        setLoading(false);
      });
  }, []);

  // Layout constants
  const CONTAINER_WIDTH = 'w-[1200px]';
  
  // Spacing constants
  const CONTENT_TOP_MARGIN = 'mt-16';
  const ROW_GAP = 'mb-[15px]';
  const BOX_GAP = 'gap-6';
  
  // Box styling
  const BOX_CLASSES = 'bg-gray-200 rounded-lg h-96 border border-gray-300 flex-1 flex flex-col overflow-hidden';

  // Categories for the cards
  const categories = [
    { name: 'Songs', type: 'songs' },
    { name: 'Podcasts', type: 'podcasts' },
    { name: 'Audiobooks', type: 'audiobooks' },
    { name: 'Streams', type: 'streams' },
  ];

  if (loading) {
    return (
      <div className={`hidden xl:block ${CONTAINER_WIDTH} mx-auto ${CONTENT_TOP_MARGIN} flex justify-center items-center h-96`}>
        <p className="text-gray-500">Loading songs...</p>
      </div>
    );
  }

  return (
    <div className={`hidden xl:block ${CONTAINER_WIDTH} mx-auto ${CONTENT_TOP_MARGIN} flex flex-col`}>
      {Array.from({ length: 4 }).map((_, rowIndex) => {
        const isLastRow = rowIndex === 3;
        const category = categories[rowIndex];
        
        return (
          <div key={rowIndex} className={`flex flex-row ${BOX_GAP} ${!isLastRow ? ROW_GAP : ''}`}>
            {Array.from({ length: 3 }).map((_, colIndex) => {
              // First card in first row is Songs category
              if (rowIndex === 0 && colIndex === 0) {
                return (
                  <div key={colIndex} className={BOX_CLASSES}>
                    {/* Category Header */}
                    <div className="p-4 border-b border-gray-300 bg-white">
                      <h2 className="font-bold text-xl">{category.name}</h2>
                    </div>
                    
                    {/* Scrollable Song List */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {songs.length === 0 ? (
                        <p className="text-gray-500 text-sm">No songs available</p>
                      ) : (
                        <div className="space-y-3">
                          {songs.map((song, index) => (
                            <div key={song.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
                              {/* Rank Number */}
                              <span className="text-gray-400 font-bold text-sm w-6">{index + 1}</span>
                              
                              {/* Song Image */}
                              {song.image_url ? (
                                <img 
                                  src={song.image_url} 
                                  alt={`${song.title} by ${song.artist}`}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-300 rounded"></div>
                              )}
                              
                              {/* Song Info */}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{song.title}</p>
                                <p className="text-gray-600 text-xs truncate">{song.artist}</p>
                              </div>
                              
                              {/* Popularity */}
                              {song.popularity !== null && (
                                <span className="text-gray-400 text-xs">{song.popularity}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              
              // Other cards are placeholders for now
              return <div key={colIndex} className={BOX_CLASSES}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
