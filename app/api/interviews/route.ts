import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * Interviews API Route
 * 
 * Returns mock interview data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock interview data
  const interviews = getPlaceholderData('Interview', 10);
  
  return NextResponse.json(interviews);
}

