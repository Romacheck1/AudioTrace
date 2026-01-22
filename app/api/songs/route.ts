import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE')));
      return NextResponse.json(
        { error: 'Database configuration error', message: 'DATABASE_URL environment variable is not set' },
        { status: 500 }
      );
    }

    const result = await pool.query('SELECT * FROM songs ORDER BY popularity DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs', details: error.message },
      { status: 500 }
    );
  }
}

