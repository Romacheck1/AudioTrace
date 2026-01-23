import { Pool, PoolConfig } from 'pg';

// Check for database URL in multiple possible environment variable names
// Different hosting platforms use different names
const getDatabaseUrl = (): string | undefined => {
  // Priority order: Check common environment variable names
  return process.env.DATABASE_URL || 
         process.env.POSTGRES_URL || 
         process.env.POSTGRES_CONNECTION_STRING ||
         process.env.POSTGRES_INTERNAL_URL ||
         process.env.POSTGRES_EXTERNAL_URL ||
         process.env.DB_URL ||
         process.env.DATABASE_CONNECTION_STRING;
};

const databaseUrl = getDatabaseUrl();

// Only log errors at runtime, not during build
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
if (!databaseUrl && !isBuildTime) {
  console.warn('⚠️ Database URL not set');
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

if (databaseUrl) {
  try {
    const urlParts = databaseUrl.split('@');
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

if (databaseUrl) {
  const url = databaseUrl.toLowerCase();
  
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

// Create pool only if database URL exists
let pool: Pool | null = null;

if (databaseUrl) {
  const poolConfig: PoolConfig = {
    connectionString: databaseUrl,
    ssl: sslConfig,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
  };

  pool = new Pool(poolConfig);

  pool.on('error', (err: any) => {
    console.error('❌ Pool error:', err.message);
  });

  if (isHosted && !isBuildTime) {
    pool.query('SELECT NOW()')
      .then((result) => {
        console.log('✅ Database connection successful');
      })
      .catch((err: any) => {
        console.error('❌ Database connection failed:', err.message);
      });
  }
}

export default pool as Pool;

