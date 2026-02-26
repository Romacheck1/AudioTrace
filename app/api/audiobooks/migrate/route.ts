import { NextResponse } from 'next/server';

/**
 * Audiobooks Migration Route
 * 
 * Not available in simplified mock data implementation.
 */
export async function POST() {
  return NextResponse.json(
    { 
      error: 'Not available', 
      message: 'Database migration is not available in the simplified mock data implementation.' 
    },
    { status: 501 }
  );
}

