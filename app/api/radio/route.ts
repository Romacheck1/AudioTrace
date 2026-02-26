import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    const result = await pool.query(
      'SELECT * FROM radio ORDER BY popularity DESC LIMIT 10'
    );
    
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch radio', details: error.message },
      { status: 500 }
    );
  }
}

