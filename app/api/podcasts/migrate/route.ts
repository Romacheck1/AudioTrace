import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }
    // Create podcasts table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS podcasts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        image_url TEXT,
        duration_ms INTEGER,
        genre VARCHAR(100),
        popularity INTEGER DEFAULT 0,
        feed_url TEXT,
        release_date TIMESTAMP,
        date_added TIMESTAMP DEFAULT NOW(),
        UNIQUE(title, artist)
      )
    `);

    // Migrate existing podcasts from songs table (where album IS NULL)
    const migrateResult = await pool.query(`
      INSERT INTO podcasts (title, artist, image_url, duration_ms, genre, popularity, date_added)
      SELECT title, artist, image_url, duration_ms, genre, popularity, date_added
      FROM songs
      WHERE album IS NULL
      ON CONFLICT (title, artist) DO NOTHING
      RETURNING id, title, artist
    `);

    return NextResponse.json({
      success: true,
      message: `Created podcasts table and migrated ${migrateResult.rows.length} podcasts`,
      migrated: migrateResult.rows.length
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Failed to migrate podcasts', details: error.message },
      { status: 500 }
    );
  }
}


