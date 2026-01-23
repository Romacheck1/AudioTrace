import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'DATABASE_URL environment variable is not set' },
        { status: 500 }
      );
    }

    const result = await pool.query(
      'SELECT * FROM news ORDER BY popularity DESC LIMIT 10'
    );
    
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error.message },
      { status: 500 }
    );
  }
}

