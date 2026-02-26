import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * Audiobooks API Route
 * 
 * Returns mock audiobook data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock audiobook data
  const audiobooks = getPlaceholderData('Audiobook', 10);
  
  return NextResponse.json(audiobooks);
}

