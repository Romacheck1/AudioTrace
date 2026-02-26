import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        image_url TEXT,
        duration_ms INTEGER,
        genre VARCHAR(100),
        popularity INTEGER DEFAULT 0,
        release_date TIMESTAMP,
        date_added TIMESTAMP DEFAULT NOW(),
        UNIQUE(title, artist)
      )
    `);

    return NextResponse.json({
      success: true,
      message: 'Created news table',
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Failed to migrate news', details: error.message },
      { status: 500 }
    );
  }
}

