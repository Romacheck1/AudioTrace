import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * Streams API Route
 * 
 * Returns mock stream data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock stream data
  const streams = getPlaceholderData('Stream', 10);
  
  return NextResponse.json(streams);
}

