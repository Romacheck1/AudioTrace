import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'DATABASE_URL environment variable is not set' },
        { status: 500 }
      );
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS radio (
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
      message: 'Created radio table',
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Failed to migrate radio', details: error.message },
      { status: 500 }
    );
  }
}

