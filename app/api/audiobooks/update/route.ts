import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // Fetch top audiobooks from iTunes API
    const response = await fetch(
      'https://itunes.apple.com/search?term=popular&media=audiobook&limit=10&country=us'
    );
    
    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.statusText}`);
    }

    const data = await response.json();
    const audiobooks = data.results || [];

    if (audiobooks.length === 0) {
      return NextResponse.json(
        { error: 'No audiobooks found', message: 'iTunes API returned no results' },
        { status: 404 }
      );
    }

    // Insert/update each audiobook in the database
    const insertedAudiobooks = [];
    
    for (const audiobook of audiobooks) {
      try {
        // Map iTunes fields to database schema
        const title = audiobook.collectionName || audiobook.trackName || 'Unknown Audiobook';
        const artist = audiobook.artistName || 'Unknown Author';
        const imageUrl = audiobook.artworkUrl600 || audiobook.artworkUrl100 || null;
        const durationMs = audiobook.trackTimeMillis || null;
        const genre = audiobook.primaryGenreName || null;
        const popularity = audiobook.trackCount || 0; // Using trackCount as popularity proxy

        // Insert or update into audiobooks table (using title + artist as unique identifier)
        const result = await pool.query(
          `INSERT INTO audiobooks (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [title, artist, imageUrl, durationMs, genre, popularity]
        );

        // Add to inserted list
        if (result.rows.length > 0) {
          insertedAudiobooks.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting audiobook ${audiobook.collectionName}:`, error.message);
        // Continue with next audiobook even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedAudiobooks.length} audiobooks`,
      count: insertedAudiobooks.length,
      audiobooks: insertedAudiobooks
    });
  } catch (error: any) {
    console.error('Audiobook update error:', error);
    return NextResponse.json(
      { error: 'Failed to update audiobooks', details: error.message },
      { status: 500 }
    );
  }
}

