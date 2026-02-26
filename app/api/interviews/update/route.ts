import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // Sample data for popular interview shows/podcasts
    const sampleInterviews = [
      {
        title: 'The Joe Rogan Experience',
        artist: 'Joe Rogan',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 10800000, // 3 hours
        genre: 'Talk',
        popularity: 98
      },
      {
        title: 'Hot Ones',
        artist: 'First We Feast',
        image_url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration_ms: 1800000, // 30 minutes
        genre: 'Entertainment',
        popularity: 95
      },
      {
        title: 'WTF with Marc Maron',
        artist: 'Marc Maron',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 3600000, // 60 minutes
        genre: 'Comedy',
        popularity: 92
      },
      {
        title: 'The Tim Ferriss Show',
        artist: 'Tim Ferriss',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 5400000, // 90 minutes
        genre: 'Business',
        popularity: 90
      },
      {
        title: 'Armchair Expert',
        artist: 'Dax Shepard',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 3600000,
        genre: 'Talk',
        popularity: 88
      },
      {
        title: 'Conan O\'Brien Needs a Friend',
        artist: 'Conan O\'Brien',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 3600000,
        genre: 'Comedy',
        popularity: 87
      },
      {
        title: 'SmartLess',
        artist: 'Jason Bateman, Sean Hayes, Will Arnett',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 3600000,
        genre: 'Comedy',
        popularity: 85
      },
      {
        title: 'The Daily Show',
        artist: 'Trevor Noah',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 1800000,
        genre: 'Comedy',
        popularity: 83
      },
      {
        title: 'Fresh Air',
        artist: 'Terry Gross',
        image_url: 'https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-7c4a2b1c7c0e5e5e5e5e5e5e5e5e5e5.jpg',
        duration_ms: 3600000,
        genre: 'Talk',
        popularity: 89
      },
      {
        title: 'The Graham Norton Show',
        artist: 'Graham Norton',
        image_url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1e92ee613bb13829b8',
        duration_ms: 3600000,
        genre: 'Entertainment',
        popularity: 86
      }
    ];

    const insertedInterviews = [];
    
    for (const interview of sampleInterviews) {
      try {
        const result = await pool.query(
          `INSERT INTO interviews (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [interview.title, interview.artist, interview.image_url, interview.duration_ms, interview.genre, interview.popularity]
        );

        if (result.rows.length > 0) {
          insertedInterviews.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting interview ${interview.title}:`, error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedInterviews.length} interviews`,
      count: insertedInterviews.length,
      interviews: insertedInterviews
    });
  } catch (error: any) {
    console.error('Interview update error:', error);
    return NextResponse.json(
      { error: 'Failed to update interviews', details: error.message },
      { status: 500 }
    );
  }
}

