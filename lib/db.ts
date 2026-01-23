import { Pool } from 'pg';

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('DB')));
} else {
  console.log('✅ DATABASE_URL is set (length:', process.env.DATABASE_URL.length, ')');
  // Log first part of connection string for debugging (without exposing password)
  const urlParts = process.env.DATABASE_URL.split('@');
  if (urlParts.length > 1) {
    console.log('Database host:', urlParts[1].split('/')[0]);
  }
}

// Determine SSL configuration based on environment
const isProduction = process.env.NODE_ENV === 'production';
const isHosted = !!(
  process.env.VERCEL || 
  process.env.RENDER || 
  process.env.RAILWAY_ENVIRONMENT ||
  process.env.NODE_ENV === 'production'
);

console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  isProduction,
  isHosted,
  VERCEL: !!process.env.VERCEL,
  RENDER: !!process.env.RENDER,
  RAILWAY: !!process.env.RAILWAY_ENVIRONMENT
});

// Configure SSL - try different configurations
// Some databases need different SSL settings
let sslConfig: any = false;

if (isProduction || isHosted) {
  // Try the most common SSL configuration for hosted databases
  sslConfig = {
    rejectUnauthorized: false // Required for Render, Railway, Supabase, etc.
  };
  console.log('SSL enabled for production/hosted environment');
} else if (process.env.DATABASE_URL?.includes('sslmode=require')) {
  sslConfig = { rejectUnauthorized: false };
  console.log('SSL enabled (sslmode=require in connection string)');
} else {
  console.log('SSL disabled (local development)');
}

// Create a connection pool with better error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
  // Connection pool settings for better reliability
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 20000, // Increased to 20 seconds for slower connections
});

// Handle pool errors (don't exit process - let Next.js handle it)
pool.on('error', (err: any) => {
  console.error('❌ Unexpected error on idle client:', err.message);
  console.error('Error code:', err.code || 'N/A');
  console.error('Error details:', {
    name: err.name,
    stack: err.stack?.split('\n').slice(0, 5).join('\n')
  });
  // Don't exit - let the application continue and retry
});

// Test connection on startup (in production)
if (isProduction || isHosted) {
  pool.query('SELECT NOW()')
    .then((result) => {
      console.log('✅ Database connection test successful');
      console.log('Database time:', result.rows[0].now);
    })
    .catch((err: any) => {
      console.error('❌ Database connection test failed');
      console.error('Error message:', err.message);
      console.error('Error code:', err.code || 'N/A');
      console.error('Error name:', err.name);
      console.error('Connection string preview:', process.env.DATABASE_URL?.substring(0, 30) + '...');
      
      // Common error messages and solutions
      if (err.message?.includes('SSL')) {
        console.error('💡 SSL Error - Try checking SSL configuration');
      }
      if (err.message?.includes('timeout')) {
        console.error('💡 Timeout Error - Check if database is accessible and firewall settings');
      }
      if (err.message?.includes('password')) {
        console.error('💡 Authentication Error - Check database credentials');
      }
      if (err.message?.includes('ENOTFOUND') || err.message?.includes('getaddrinfo')) {
        console.error('💡 DNS Error - Check database hostname');
      }
    });
}

export default pool;

