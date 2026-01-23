'use client';

import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';

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

interface Podcast {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface Audiobook {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface Movie {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface Stream {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface Youtube {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface News {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface Radio {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface Interview {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

export default function ContentGrid() {
  const CONTAINER_WIDTH = 'w-[1200px]';
  const CONTENT_TOP_MARGIN = 'mt-8';
  const ROW_GAP = 'mb-[15px]';
  const BOX_GAP = 'gap-6';
  
  const categories = ['Songs', 'Podcasts', 'Audiobooks', 'Movies', 'Streams', 'YouTube', 'News', 'Radio', 'Interviews'];
  
  const [selectedTimes, setSelectedTimes] = useState<{ [key: number]: string }>({});
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [categoryOrder, setCategoryOrder] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [hiddenCards, setHiddenCards] = useState<Set<number>>(new Set());
  const [songs, setSongs] = useState<Song[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [youtube, setYoutube] = useState<Youtube[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [radio, setRadio] = useState<Radio[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  // Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        const data = await response.json();
        if (Array.isArray(data)) {
          setSongs(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setSongs([]);
        }
      } catch (error) {
        console.error('Failed to fetch songs:', error);
        setSongs([]);
      }
    };

    fetchSongs();
  }, []);

  // Fetch podcasts from API
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('/api/podcasts');
        const data = await response.json();
        if (Array.isArray(data)) {
          setPodcasts(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setPodcasts([]);
        }
      } catch (error) {
        console.error('Failed to fetch podcasts:', error);
        setPodcasts([]);
      }
    };

    fetchPodcasts();
  }, []);

  // Fetch audiobooks from API
  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch('/api/audiobooks');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAudiobooks(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setAudiobooks([]);
        }
      } catch (error) {
        console.error('Failed to fetch audiobooks:', error);
        setAudiobooks([]);
      }
    };

    fetchAudiobooks();
  }, []);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();
        if (Array.isArray(data)) {
          setMovies(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setMovies([]);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  // Fetch streams from API
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams');
        const data = await response.json();
        if (Array.isArray(data)) {
          setStreams(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setStreams([]);
        }
      } catch (error) {
        console.error('Failed to fetch streams:', error);
        setStreams([]);
      }
    };

    fetchStreams();
  }, []);

  // Fetch youtube from API
  useEffect(() => {
    const fetchYoutube = async () => {
      try {
        const response = await fetch('/api/youtube');
        const data = await response.json();
        if (Array.isArray(data)) {
          setYoutube(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setYoutube([]);
        }
      } catch (error) {
        console.error('Failed to fetch youtube:', error);
        setYoutube([]);
      }
    };

    fetchYoutube();
  }, []);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        if (Array.isArray(data)) {
          setNews(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setNews([]);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  // Fetch radio from API
  useEffect(() => {
    const fetchRadio = async () => {
      try {
        const response = await fetch('/api/radio');
        const data = await response.json();
        if (Array.isArray(data)) {
          setRadio(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setRadio([]);
        }
      } catch (error) {
        console.error('Failed to fetch radio:', error);
        setRadio([]);
      }
    };

    fetchRadio();
  }, []);

  // Fetch interviews from API
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('/api/interviews');
        const data = await response.json();
        if (Array.isArray(data)) {
          setInterviews(data);
        } else if (data.error) {
          console.error('API error:', data.error);
          setInterviews([]);
        }
      } catch (error) {
        console.error('Failed to fetch interviews:', error);
        setInterviews([]);
      }
    };

    fetchInterviews();
  }, []);

  const handleTimeSelect = (originalIndex: number, time: string) => {
    setSelectedTimes({ ...selectedTimes, [originalIndex]: time });
  };

  const handleCardClick = (positionIndex: number) => {
    const originalIndex = categoryOrder[positionIndex];
    
    if (selectedCards.length === 0) {
      // First selection
      setSelectedCards([positionIndex]);
    } else if (selectedCards.length === 1) {
      if (selectedCards[0] === positionIndex) {
        // Deselect if clicking same card
        setSelectedCards([]);
      } else {
        // Swap positions
        const newOrder = [...categoryOrder];
        const [firstPos, secondPos] = selectedCards[0] < positionIndex 
          ? [selectedCards[0], positionIndex]
          : [positionIndex, selectedCards[0]];
        
        // Swap the category indices at these positions
        [newOrder[firstPos], newOrder[secondPos]] = [newOrder[secondPos], newOrder[firstPos]];
        setCategoryOrder(newOrder);
        setSelectedCards([]);
      }
    }
  };

  const handleRemove = (positionIndex: number) => {
    const originalIndex = categoryOrder[positionIndex];
    setHiddenCards(new Set([...hiddenCards, originalIndex]));
    setSelectedCards(selectedCards.filter(pos => pos !== positionIndex));
  };

  const handleReset = () => {
    setCategoryOrder([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSelectedCards([]);
    setHiddenCards(new Set());
  };

  // Filter out hidden cards and reindex positions
  const visibleOrder = categoryOrder.filter(index => !hiddenCards.has(index));

  return (
    <div className={`hidden lg:block ${CONTAINER_WIDTH} mx-auto ${CONTENT_TOP_MARGIN} flex flex-col relative`}>
      {/* Reset button - positioned on the left */}
      <button
        onClick={handleReset}
        className="absolute left-0 top-0 px-3 py-1.5 text-sm bg-gray-400/30 hover:bg-gray-400/50 text-gray-600 hover:text-gray-800 rounded transition-all"
        aria-label="Reset card order"
      >
        Reset
      </button>

      <div className="flex flex-col">
        {Array.from({ length: 3 }).map((_, rowIndex) => {
          const isLastRow = rowIndex === 2;
          return (
            <div key={rowIndex} className={`flex flex-row items-start ${BOX_GAP} ${!isLastRow ? ROW_GAP : ''}`}>
              {Array.from({ length: 3 }).map((_, colIndex) => {
                const gridIndex = rowIndex * 3 + colIndex;
                if (gridIndex >= visibleOrder.length) {
                  return <div key={`empty-${gridIndex}`} className="flex-1" />;
                }
                
                const originalIndex = visibleOrder[gridIndex];
                const originalPosition = categoryOrder.indexOf(originalIndex);
                const isSelected = selectedCards.includes(originalPosition);
                
                // Determine which media items to pass based on category index
                let mediaItems: (Song | Podcast | Audiobook | Movie | Stream | Youtube | News | Radio | Interview)[] = [];
                if (originalIndex === 0) mediaItems = songs;
                else if (originalIndex === 1) mediaItems = podcasts;
                else if (originalIndex === 2) mediaItems = audiobooks;
                else if (originalIndex === 3) mediaItems = movies;
                else if (originalIndex === 4) mediaItems = streams;
                else if (originalIndex === 5) mediaItems = youtube;
                else if (originalIndex === 6) mediaItems = news;
                else if (originalIndex === 7) mediaItems = radio;
                else if (originalIndex === 8) mediaItems = interviews;
                
                return (
                  <CategoryCard
                    key={`${gridIndex}-${originalIndex}`}
                    categoryName={categories[originalIndex]}
                    categoryIndex={originalIndex}
                    selectedTime={selectedTimes[originalIndex] || 'All Time'}
                    onTimeSelect={(time) => handleTimeSelect(originalIndex, time)}
                    isSelected={isSelected}
                    onClick={() => handleCardClick(originalPosition)}
                    onRemove={() => handleRemove(originalPosition)}
                    songs={mediaItems} // Pass appropriate media items
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
