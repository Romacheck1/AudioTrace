import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * Radio API Route
 * 
 * Returns mock radio data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock radio data
  const radio = getPlaceholderData('Radio', 10);
  
  return NextResponse.json(radio);
}

