import { Pool } from 'pg';

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('DB')));
}

// Determine SSL configuration based on environment
// Production databases (like Render, Railway, etc.) typically require SSL
// Local databases usually don't need SSL
const isProduction = process.env.NODE_ENV === 'production';
const isHosted = process.env.VERCEL || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT;

// Configure SSL - required for most hosted PostgreSQL services
const sslConfig = isProduction || isHosted 
  ? {
      rejectUnauthorized: false, // Required for Render, Railway, etc.
      require: true
    }
  : process.env.DATABASE_URL?.includes('sslmode=require') 
    ? { rejectUnauthorized: false }
    : false; // No SSL for local development

// Create a connection pool with better error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
  // Connection pool settings for better reliability
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection cannot be established
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection on startup (in production)
if (isProduction || isHosted) {
  pool.query('SELECT NOW()')
    .then(() => {
      console.log('✅ Database connection successful');
    })
    .catch((err) => {
      console.error('❌ Database connection failed:', err.message);
      console.error('Connection string format:', process.env.DATABASE_URL?.substring(0, 20) + '...');
    });
}

export default pool;

