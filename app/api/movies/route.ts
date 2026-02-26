import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * Movies API Route
 * 
 * Returns mock movie data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock movie data
  const movies = getPlaceholderData('Movie', 10);
  
  return NextResponse.json(movies);
}

