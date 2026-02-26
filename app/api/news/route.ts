import { NextResponse } from 'next/server';
import { getPlaceholderData } from '@/lib/db';

/**
 * News API Route
 * 
 * Returns mock news data for frontend display.
 * Simplified frontend-focused implementation.
 */
export async function GET() {
  // Mock news data
  const news = getPlaceholderData('News', 10);
  
  return NextResponse.json(news);
}

