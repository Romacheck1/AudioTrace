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

    // Fetch top podcasts from iTunes API
    const response = await fetch(
      'https://itunes.apple.com/search?term=popular&media=podcast&limit=10&country=us'
    );
    
    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.statusText}`);
    }

    const data = await response.json();
    const podcasts = data.results || [];

    if (podcasts.length === 0) {
      return NextResponse.json(
        { error: 'No podcasts found', message: 'iTunes API returned no results' },
        { status: 404 }
      );
    }

    // Insert/update each podcast in the database
    const insertedPodcasts = [];
    
    for (const podcast of podcasts) {
      try {
        // Map iTunes fields to database schema
        const title = podcast.collectionName || podcast.trackName || 'Unknown Podcast';
        const artist = podcast.artistName || 'Unknown Artist';
        const imageUrl = podcast.artworkUrl600 || podcast.artworkUrl100 || null;
        const durationMs = podcast.trackTimeMillis || null;
        const genre = podcast.primaryGenreName || null;
        const popularity = podcast.trackCount || 0; // Using trackCount as popularity proxy
        const album = null; // Podcasts don't have albums

        // Insert or update into podcasts table (using title + artist as unique identifier)
        const result = await pool.query(
          `INSERT INTO podcasts (title, artist, image_url, duration_ms, genre, popularity, feed_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity,
             feed_url = EXCLUDED.feed_url
           RETURNING id, title, artist`,
          [title, artist, imageUrl, durationMs, genre, popularity, podcast.feedUrl || null]
        );

        // Add to inserted list
        if (result.rows.length > 0) {
          insertedPodcasts.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting podcast ${podcast.collectionName}:`, error.message);
        // Continue with next podcast even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedPodcasts.length} podcasts`,
      count: insertedPodcasts.length,
      podcasts: insertedPodcasts
    });
  } catch (error: any) {
    console.error('Podcast update error:', error);
    return NextResponse.json(
      { error: 'Failed to update podcasts', details: error.message },
      { status: 500 }
    );
  }
}

