import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL,
      RENDER: !!process.env.RENDER,
      RAILWAY: !!process.env.RAILWAY_ENVIRONMENT,
    },
    database: {
      urlSet: !!process.env.DATABASE_URL,
      urlLength: process.env.DATABASE_URL?.length || 0,
      urlPreview: process.env.DATABASE_URL 
        ? process.env.DATABASE_URL.substring(0, 30) + '...' 
        : 'NOT SET',
    },
    connection: {
      status: 'unknown',
      error: null as string | null,
    }
  };

  // Try to get database host from connection string
  if (process.env.DATABASE_URL) {
    try {
      const urlParts = process.env.DATABASE_URL.split('@');
      if (urlParts.length > 1) {
        diagnostics.database.host = urlParts[1].split('/')[0];
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }

  // Test database connection
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    diagnostics.connection.status = 'success';
    diagnostics.connection.currentTime = result.rows[0].current_time;
    diagnostics.connection.pgVersion = result.rows[0].pg_version?.substring(0, 50);
    
    // Test a simple query
    const tableTest = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      LIMIT 5
    `);
    diagnostics.connection.tables = tableTest.rows.map((r: any) => r.table_name);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      diagnostics
    });
  } catch (error: any) {
    diagnostics.connection.status = 'failed';
    diagnostics.connection.error = error.message;
    diagnostics.connection.errorCode = error.code;
    diagnostics.connection.errorName = error.name;
    
    // Add helpful suggestions based on error
    const suggestions: string[] = [];
    
    if (error.message?.includes('SSL')) {
      suggestions.push('SSL connection issue - check SSL configuration');
    }
    if (error.message?.includes('timeout') || error.message?.includes('ETIMEDOUT')) {
      suggestions.push('Connection timeout - check if database is accessible and firewall settings');
    }
    if (error.message?.includes('password') || error.message?.includes('authentication')) {
      suggestions.push('Authentication failed - verify database credentials');
    }
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('getaddrinfo')) {
      suggestions.push('DNS resolution failed - check database hostname');
    }
    if (error.message?.includes('ECONNREFUSED')) {
      suggestions.push('Connection refused - check if database is running and accessible');
    }
    if (!process.env.DATABASE_URL) {
      suggestions.push('DATABASE_URL environment variable is not set');
    }
    
    diagnostics.suggestions = suggestions;
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      diagnostics
    }, { status: 500 });
  }
}

