import { NextResponse } from 'next/server';

/**
 * Albums API Route
 * 
 * Returns mock album data for frontend display.
 * Update this data to change what appears in the Albums card.
 */
export async function GET() {
  // Mock album data - UPDATE THIS DATA TO CHANGE THE ALBUMS CARD
  const albums = [
    { id: 1, title: 'Midnights', artist: 'Taylor Swift', image_url: null, duration_ms: null, popularity: 98, genre: 'Pop' },
    { id: 2, title: 'Harry\'s House', artist: 'Harry Styles', image_url: null, duration_ms: null, popularity: 96, genre: 'Pop' },
    { id: 3, title: 'Un Verano Sin Ti', artist: 'Bad Bunny', image_url: null, duration_ms: null, popularity: 94, genre: 'Reggaeton' },
    { id: 4, title: 'Sour', artist: 'Olivia Rodrigo', image_url: null, duration_ms: null, popularity: 92, genre: 'Pop Rock' },
    { id: 5, title: 'Planet Her', artist: 'Doja Cat', image_url: null, duration_ms: null, popularity: 90, genre: 'Pop' },
    { id: 6, title: 'Future Nostalgia', artist: 'Dua Lipa', image_url: null, duration_ms: null, popularity: 88, genre: 'Pop' },
    { id: 7, title: 'Fine Line', artist: 'Harry Styles', image_url: null, duration_ms: null, popularity: 86, genre: 'Pop' },
    { id: 8, title: 'After Hours', artist: 'The Weeknd', image_url: null, duration_ms: null, popularity: 84, genre: 'R&B' },
    { id: 9, title: 'folklore', artist: 'Taylor Swift', image_url: null, duration_ms: null, popularity: 82, genre: 'Indie Folk' },
    { id: 10, title: 'DAMN.', artist: 'Kendrick Lamar', image_url: null, duration_ms: null, popularity: 80, genre: 'Hip Hop' },
  ];

  return NextResponse.json(albums);
}

