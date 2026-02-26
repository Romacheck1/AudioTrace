import { NextResponse } from 'next/server';

/**
 * Artists API Route
 * 
 * Returns mock artist data for frontend display.
 * Update this data to change what appears in the Artists card.
 */
export async function GET() {
  // Mock artist data - UPDATE THIS DATA TO CHANGE THE ARTISTS CARD
  const artists = [
    { id: 1, title: 'Taylor Swift', artist: 'Pop Icon', image_url: null, duration_ms: null, popularity: 100, genre: 'Pop' },
    { id: 2, title: 'The Weeknd', artist: 'R&B Superstar', image_url: null, duration_ms: null, popularity: 98, genre: 'R&B' },
    { id: 3, title: 'Bad Bunny', artist: 'Reggaeton King', image_url: null, duration_ms: null, popularity: 96, genre: 'Reggaeton' },
    { id: 4, title: 'Harry Styles', artist: 'Pop Rock Star', image_url: null, duration_ms: null, popularity: 94, genre: 'Pop' },
    { id: 5, title: 'Olivia Rodrigo', artist: 'Pop Rock Artist', image_url: null, duration_ms: null, popularity: 92, genre: 'Pop Rock' },
    { id: 6, title: 'Dua Lipa', artist: 'Pop Sensation', image_url: null, duration_ms: null, popularity: 90, genre: 'Pop' },
    { id: 7, title: 'Doja Cat', artist: 'Hip Hop Artist', image_url: null, duration_ms: null, popularity: 88, genre: 'Hip Hop' },
    { id: 8, title: 'Billie Eilish', artist: 'Alternative Pop', image_url: null, duration_ms: null, popularity: 86, genre: 'Alternative' },
    { id: 9, title: 'Post Malone', artist: 'Hip Hop Artist', image_url: null, duration_ms: null, popularity: 84, genre: 'Hip Hop' },
    { id: 10, title: 'Ed Sheeran', artist: 'Pop Singer', image_url: null, duration_ms: null, popularity: 82, genre: 'Pop' },
  ];

  return NextResponse.json(artists);
}

