import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // Sample data for popular YouTubers
    // In production, you could integrate with YouTube Data API (requires API key)
    const sampleYoutubers = [
      {
        title: 'MrBeast',
        artist: 'MrBeast',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null, // Channels don't have fixed duration
        genre: 'Entertainment',
        popularity: 250000000 // Subscriber count
      },
      {
        title: 'PewDiePie',
        artist: 'PewDiePie',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 111000000
      },
      {
        title: 'Markiplier',
        artist: 'Markiplier',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 38000000
      },
      {
        title: 'Dude Perfect',
        artist: 'Dude Perfect',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Sports',
        popularity: 60000000
      },
      {
        title: 'Like Nastya',
        artist: 'Like Nastya',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Kids',
        popularity: 115000000
      },
      {
        title: 'Kids Diana Show',
        artist: 'Kids Diana Show',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Kids',
        popularity: 110000000
      },
      {
        title: 'SET India',
        artist: 'SET India',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Entertainment',
        popularity: 165000000
      },
      {
        title: 'T-Series',
        artist: 'T-Series',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Music',
        popularity: 260000000
      },
      {
        title: 'Cocomelon',
        artist: 'Cocomelon - Nursery Rhymes',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Kids',
        popularity: 175000000
      },
      {
        title: 'Minecraft',
        artist: 'Minecraft',
        image_url: 'https://yt3.googleusercontent.com/ytc/AIdro_nU3vKqJ8x1XvYQqZQZQZQZQZQZQZQZQZQZQZQZQZQ=s900-c-k-c0x00ffffff-no-rj',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 30000000
      }
    ];

    // Insert/update each youtuber in the database
    const insertedYoutubers = [];
    
    for (const youtuber of sampleYoutubers) {
      try {
        // Insert or update into youtube table (using title + artist as unique identifier)
        const result = await pool.query(
          `INSERT INTO youtube (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [youtuber.title, youtuber.artist, youtuber.image_url, youtuber.duration_ms, youtuber.genre, youtuber.popularity]
        );

        // Add to inserted list
        if (result.rows.length > 0) {
          insertedYoutubers.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting youtuber ${youtuber.title}:`, error.message);
        // Continue with next youtuber even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedYoutubers.length} youtubers`,
      count: insertedYoutubers.length,
      youtubers: insertedYoutubers
    });
  } catch (error: any) {
    console.error('Youtube update error:', error);
    return NextResponse.json(
      { error: 'Failed to update youtube', details: error.message },
      { status: 500 }
    );
  }
}

