import { NextResponse } from 'next/server';

/**
 * Podcasts API Route
 * 
 * Returns mock podcast data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock podcast data - UPDATE THIS DATA TO CHANGE THE PODCASTS CARD
  const podcasts = [
    { id: 1, title: 'The Joe Rogan Experience', artist: 'Joe Rogan', image_url: null, duration_ms: 7200000, popularity: 95, genre: 'Comedy' },
    { id: 2, title: 'The Daily', artist: 'The New York Times', image_url: null, duration_ms: 1800000, popularity: 92, genre: 'News' },
    { id: 3, title: 'Crime Junkie', artist: 'Audiochuck', image_url: null, duration_ms: 2400000, popularity: 90, genre: 'True Crime' },
    { id: 4, title: 'Stuff You Should Know', artist: 'iHeartRadio', image_url: null, duration_ms: 3600000, popularity: 88, genre: 'Education' },
    { id: 5, title: 'My Favorite Murder', artist: 'Exactly Right', image_url: null, duration_ms: 3600000, popularity: 87, genre: 'True Crime' },
    { id: 6, title: 'The Tim Ferriss Show', artist: 'Tim Ferriss', image_url: null, duration_ms: 5400000, popularity: 85, genre: 'Business' },
    { id: 7, title: 'Radiolab', artist: 'WNYC Studios', image_url: null, duration_ms: 2400000, popularity: 84, genre: 'Science' },
    { id: 8, title: 'How I Built This', artist: 'NPR', image_url: null, duration_ms: 3600000, popularity: 83, genre: 'Business' },
    { id: 9, title: 'The Ben Shapiro Show', artist: 'The Daily Wire', image_url: null, duration_ms: 3600000, popularity: 82, genre: 'Politics' },
    { id: 10, title: 'Conan O\'Brien Needs a Friend', artist: 'Team Coco', image_url: null, duration_ms: 3600000, popularity: 81, genre: 'Comedy' },
  ];

  return NextResponse.json(podcasts);
}
