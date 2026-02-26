import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // Sample data for popular radio stations/shows
    const sampleRadio = [
      {
        title: 'BBC Radio 1',
        artist: 'BBC',
        image_url: 'https://ichef.bbci.co.uk/images/ic/1200x675/p08bqy5m.jpg',
        duration_ms: null, // Live radio
        genre: 'Pop',
        popularity: 95
      },
      {
        title: 'NPR Music',
        artist: 'NPR',
        image_url: 'https://media.npr.org/assets/img/2018/08/03/npr_music_podcasttile_sq-7c4a2b1c7c0e5e5e5e5e5e5e5e5e5e5.jpg',
        duration_ms: null,
        genre: 'Music',
        popularity: 90
      },
      {
        title: 'KEXP',
        artist: 'KEXP Seattle',
        image_url: 'https://www.kexp.org/static/images/kexp-logo-square.png',
        duration_ms: null,
        genre: 'Alternative',
        popularity: 88
      },
      {
        title: 'WFMU',
        artist: 'WFMU',
        image_url: 'https://wfmu.org/wp-content/uploads/2018/01/wfmu-logo-square.png',
        duration_ms: null,
        genre: 'Eclectic',
        popularity: 85
      },
      {
        title: 'BBC Radio 6 Music',
        artist: 'BBC',
        image_url: 'https://ichef.bbci.co.uk/images/ic/1200x675/p08bqy5m.jpg',
        duration_ms: null,
        genre: 'Alternative',
        popularity: 87
      },
      {
        title: 'KCRW',
        artist: 'KCRW',
        image_url: 'https://www.kcrw.com/music/shows/kcrw-music/shows/kcrw-music-square.jpg',
        duration_ms: null,
        genre: 'Eclectic',
        popularity: 83
      },
      {
        title: 'Radio Paradise',
        artist: 'Radio Paradise',
        image_url: 'https://www.radioparadise.com/graphics/rp_logo_square.png',
        duration_ms: null,
        genre: 'Eclectic',
        popularity: 82
      },
      {
        title: 'SomaFM',
        artist: 'SomaFM',
        image_url: 'https://somafm.com/img/somafm-square.png',
        duration_ms: null,
        genre: 'Electronic',
        popularity: 80
      },
      {
        title: 'WFUV',
        artist: 'WFUV',
        image_url: 'https://www.wfuv.org/sites/default/files/wfuv-logo-square.png',
        duration_ms: null,
        genre: 'Adult Alternative',
        popularity: 81
      },
      {
        title: 'KUTX',
        artist: 'KUTX',
        image_url: 'https://www.kutx.org/wp-content/uploads/2018/01/kutx-logo-square.png',
        duration_ms: null,
        genre: 'Alternative',
        popularity: 79
      }
    ];

    const insertedRadio = [];
    
    for (const radio of sampleRadio) {
      try {
        const result = await pool.query(
          `INSERT INTO radio (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [radio.title, radio.artist, radio.image_url, radio.duration_ms, radio.genre, radio.popularity]
        );

        if (result.rows.length > 0) {
          insertedRadio.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting radio ${radio.title}:`, error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedRadio.length} radio stations`,
      count: insertedRadio.length,
      radio: insertedRadio
    });
  } catch (error: any) {
    console.error('Radio update error:', error);
    return NextResponse.json(
      { error: 'Failed to update radio', details: error.message },
      { status: 500 }
    );
  }
}

