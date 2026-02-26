import { NextResponse } from 'next/server';

/**
 * Audiobooks Update Route
 * 
 * Not available in simplified mock data implementation.
 */
export async function POST() {
  return NextResponse.json(
    { 
      error: 'Not available', 
      message: 'Database updates are not available in the simplified mock data implementation.' 
    },
    { status: 501 }
  );
}

