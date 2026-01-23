import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'DATABASE_URL environment variable is not set' },
        { status: 500 }
      );
    }

    // Create movies table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS movies (
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
      message: 'Created movies table',
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Failed to migrate movies', details: error.message },
      { status: 500 }
    );
  }
}

