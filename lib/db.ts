import { Pool, PoolConfig } from 'pg';

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('DB')));
}

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
const isRender = !!process.env.RENDER;
const isVercel = !!process.env.VERCEL;
const isRailway = !!process.env.RAILWAY_ENVIRONMENT;
const isHosted = isRender || isVercel || isRailway || isProduction;

// Parse connection string to determine connection type
let isInternalConnection = false;
let connectionHost = '';

if (process.env.DATABASE_URL) {
  try {
    const urlParts = process.env.DATABASE_URL.split('@');
    if (urlParts.length > 1) {
      connectionHost = urlParts[1].split('/')[0];
       // Internal connections on Render:
      // - Have hostnames like "dpg-xxxxx-a" (no .render.com)
      // - Or contain ".internal" 
      // External connections have ".render.com" in hostname
      if (isRender) {
        isInternalConnection = connectionHost.includes('.internal') || 
                              !connectionHost.includes('.render.com');
      } else {
        // For other platforms, check for internal indicators
        isInternalConnection = connectionHost.includes('.internal') || 
                              connectionHost.includes('localhost') ||
                              connectionHost.includes('127.0.0.1');
      }
    }
  } catch (e) {
    // Ignore parsing errors
  }
}

// Determine SSL configuration - FIXED for common hosting platforms
let sslConfig: any = false;

if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL.toLowerCase();
  
  // Priority 1: Check connection string for explicit SSL requirements
  if (url.includes('sslmode=require')) {
    sslConfig = { rejectUnauthorized: false };
  } 
  // Priority 2: Render internal connections (no SSL needed)
  else if (isRender && isInternalConnection) {
    sslConfig = false;
  }
  // Priority 3: External connections on hosted platforms (SSL required)
  else if (isHosted && !isInternalConnection) {
    sslConfig = { rejectUnauthorized: false };
  }
  // Priority 4: Vercel/Railway always need SSL
  else if (isVercel || isRailway) {
    sslConfig = { rejectUnauthorized: false };
  }
  // Priority 5: Production but unknown platform - try SSL
  else if (isProduction) {
    sslConfig = { rejectUnauthorized: false };
  }
  // Default: Local development - no SSL
  else {
    sslConfig = false;
  }
  
  console.log('SSL Configuration:', {
    sslEnabled: sslConfig !== false,
    isInternal: isInternalConnection,
    platform: isRender ? 'Render' : isVercel ? 'Vercel' : isRailway ? 'Railway' : 'Unknown',
    host: connectionHost.substring(0, 50)
  });
}

// Create pool configuration
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
  max: 10, // Reduced for better reliability
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000, // Increased timeout
  // Add keep-alive settings
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
};

// Create the connection pool
const pool = new Pool(poolConfig);

// Handle pool errors gracefully
pool.on('error', (err: any) => {
  console.error('❌ Pool error:', err.message);
  // Don't exit - let Next.js handle reconnection
});

// Test connection on startup and log configuration
if (isHosted && process.env.DATABASE_URL) {
  pool.query('SELECT NOW()')
    .then((result) => {
      console.log('✅ Database connection test successful');
      console.log('Database time:', result.rows[0].now);
    })
    .catch((err: any) => {
      console.error('❌ Database connection test failed');
      console.error('Error:', err.message);
      console.error('SSL Config:', sslConfig);
      console.error('Is Internal:', isInternalConnection);
      console.error('Platform:', isRender ? 'Render' : isVercel ? 'Vercel' : isRailway ? 'Railway' : 'Unknown');
    });
}

export default pool;

