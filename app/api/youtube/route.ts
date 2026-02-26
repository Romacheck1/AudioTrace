import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * YouTube API Route
 * 
 * Returns mock YouTube data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock YouTube data
  const youtube = getPlaceholderData('Youtube', 10);
  
  return NextResponse.json(youtube);
}

