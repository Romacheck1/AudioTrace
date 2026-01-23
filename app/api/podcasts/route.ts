import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'DATABASE_URL environment variable is not set' },
        { status: 500 }
      );
    }

    // Fetch from podcasts table
    const result = await pool.query(
      'SELECT * FROM podcasts ORDER BY popularity DESC LIMIT 10'
    );
    
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcasts', details: error.message },
      { status: 500 }
    );
  }
}

