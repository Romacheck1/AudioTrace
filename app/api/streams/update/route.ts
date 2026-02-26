import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // Sample data for popular Twitch streamers
    // In production, you could integrate with Twitch API (requires OAuth/client ID)
    const sampleStreams = [
      {
        title: 'xQc',
        artist: 'xQcOW',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-300x300.png',
        duration_ms: null, // Streams are live, no fixed duration
        genre: 'Gaming',
        popularity: 120000 // Average viewers
      },
      {
        title: 'Kai Cenat',
        artist: 'KaiCenat',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/kaicenat-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Just Chatting',
        popularity: 95000
      },
      {
        title: 'pokimane',
        artist: 'pokimane',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/pokimane-profile_image-a0b2b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 85000
      },
      {
        title: 'shroud',
        artist: 'shroud',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/shroud-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 75000
      },
      {
        title: 'Asmongold',
        artist: 'Asmongold',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 70000
      },
      {
        title: 'HasanAbi',
        artist: 'HasanAbi',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/hasanabi-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Just Chatting',
        popularity: 65000
      },
      {
        title: 'summit1g',
        artist: 'summit1g',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/summit1g-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 60000
      },
      {
        title: 'Ludwig',
        artist: 'Ludwig',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ludwig-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 55000
      },
      {
        title: 'Mizkif',
        artist: 'Mizkif',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/mizkif-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Just Chatting',
        popularity: 50000
      },
      {
        title: 'Sykkuno',
        artist: 'Sykkuno',
        image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/sykkuno-profile_image-8a8c5b5c8f0c8f0c-300x300.png',
        duration_ms: null,
        genre: 'Gaming',
        popularity: 45000
      }
    ];

    // Insert/update each stream in the database
    const insertedStreams = [];
    
    for (const stream of sampleStreams) {
      try {
        // Insert or update into streams table (using title + artist as unique identifier)
        const result = await pool.query(
          `INSERT INTO streams (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [stream.title, stream.artist, stream.image_url, stream.duration_ms, stream.genre, stream.popularity]
        );

        // Add to inserted list
        if (result.rows.length > 0) {
          insertedStreams.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting stream ${stream.title}:`, error.message);
        // Continue with next stream even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedStreams.length} streams`,
      count: insertedStreams.length,
      streams: insertedStreams
    });
  } catch (error: any) {
    console.error('Stream update error:', error);
    return NextResponse.json(
      { error: 'Failed to update streams', details: error.message },
      { status: 500 }
    );
  }
}

