import { NextResponse } from 'next/server';

/**
 * Songs API Route
 * 
 * Returns mock song data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock song data - UPDATE THIS DATA TO CHANGE THE SONGS CARD
  const songs = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', image_url: null, duration_ms: 200000, popularity: 95, genre: 'Pop' },
    { id: 2, title: 'Watermelon Sugar', artist: 'Harry Styles', image_url: null, duration_ms: 174000, popularity: 92, genre: 'Pop' },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', image_url: null, duration_ms: 203000, popularity: 90, genre: 'Pop' },
    { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', image_url: null, duration_ms: 178000, popularity: 88, genre: 'Pop Rock' },
    { id: 5, title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', image_url: null, duration_ms: 141000, popularity: 87, genre: 'Pop' },
    { id: 6, title: 'Heat Waves', artist: 'Glass Animals', image_url: null, duration_ms: 238000, popularity: 85, genre: 'Indie Pop' },
    { id: 7, title: 'Peaches', artist: 'Justin Bieber', image_url: null, duration_ms: 198000, popularity: 84, genre: 'Pop' },
    { id: 8, title: 'Montero', artist: 'Lil Nas X', image_url: null, duration_ms: 137000, popularity: 83, genre: 'Hip Hop' },
    { id: 9, title: 'Save Your Tears', artist: 'The Weeknd', image_url: null, duration_ms: 215000, popularity: 82, genre: 'Pop' },
    { id: 10, title: 'Levitating', artist: 'Dua Lipa feat. DaBaby', image_url: null, duration_ms: 203000, popularity: 81, genre: 'Pop' },
  ];

  return NextResponse.json(songs);
}
