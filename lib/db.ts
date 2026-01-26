import { Pool, PoolConfig } from 'pg';

const getDatabaseUrl = (): string | undefined => {
  // In development, prioritize DATABASE_URL_LOCAL if set
  const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  if (isDevelopment && process.env.DATABASE_URL_LOCAL) {
    let url = process.env.DATABASE_URL_LOCAL;
    
    // Fix missing port in connection string (common issue with Render URLs)
    // Format: postgresql://user:pass@host/dbname should be postgresql://user:pass@host:5432/dbname
    if (url.includes('@') && !url.match(/@[^:]+:\d+\//)) {
      // If host doesn't have a port, add default PostgreSQL port
      url = url.replace(/@([^/]+)\//, '@$1:5432/');
      console.log('[DB] Added default port 5432 to DATABASE_URL_LOCAL');
    }
    
    return url;
  }
  
  // Otherwise, use the standard fallback chain
  return process.env.DATABASE_URL || 
         process.env.POSTGRES_URL || 
         process.env.POSTGRES_CONNECTION_STRING ||
         process.env.POSTGRES_INTERNAL_URL ||
         process.env.POSTGRES_EXTERNAL_URL ||
         process.env.DB_URL ||
         process.env.DATABASE_CONNECTION_STRING;
};

const databaseUrl = getDatabaseUrl();
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

// Determine environment
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
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
      if (isRender) {
        isInternalConnection = connectionHost.includes('.internal') || 
                              !connectionHost.includes('.render.com');
      } else {
        isInternalConnection = connectionHost.includes('.internal') || 
                              connectionHost.includes('localhost') ||
                              connectionHost.includes('127.0.0.1');
      }
    }
  } catch (e) {
    // Ignore parsing errors
  }
}

let sslConfig: any = false;

if (databaseUrl) {
  const url = databaseUrl.toLowerCase();
  
  // Check if URL contains render.com or other remote hosts (even from local dev)
  const isRemoteDatabase = url.includes('.render.com') || 
                           url.includes('.vercel.app') || 
                           url.includes('.railway.app') ||
                           url.includes('amazonaws.com') ||
                           url.includes('azure.com');
  
  if (url.includes('sslmode=require')) {
    sslConfig = { rejectUnauthorized: false };
  } else if (isRender && isInternalConnection) {
    sslConfig = false;
  } else if (isRemoteDatabase) {
    // Remote databases (like Render) accessed from anywhere need SSL
    sslConfig = { rejectUnauthorized: false };
  } else if (isHosted && !isInternalConnection) {
    sslConfig = { rejectUnauthorized: false };
  } else if (isVercel || isRailway) {
    sslConfig = { rejectUnauthorized: false };
  } else if (isProduction) {
    sslConfig = { rejectUnauthorized: false };
  } else {
    // Local databases don't need SSL
    sslConfig = false;
  }
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
    console.error('Pool error:', err.message);
  });

  // Test connection in both hosted and local development
  if (!isBuildTime) {
    pool.query('SELECT NOW()')
      .then(() => {
        const env = isDevelopment ? 'local development' : 'hosted';
        console.log(`[${env}] Database connection successful`);
        console.log(`[${env}] Connected to host: ${connectionHost || 'unknown'}`);
      })
      .catch((err: any) => {
        const env = isDevelopment ? 'local development' : 'hosted';
        console.error(`[${env}] Database connection failed:`, err.message);
        console.error(`[${env}] Error code:`, err.code);
        console.error(`[${env}] Connection string host:`, connectionHost || 'unknown');
        console.error(`[${env}] SSL config:`, sslConfig);
        if (err.code === 'ECONNREFUSED') {
          console.error(`[${env}] Connection refused - check if database is running and port is correct`);
        } else if (err.code === 'ENOTFOUND') {
          console.error(`[${env}] Host not found - check database hostname`);
        } else if (err.message.includes('password authentication')) {
          console.error(`[${env}] Authentication failed - check username and password`);
        } else if (err.message.includes('SSL')) {
          console.error(`[${env}] SSL connection issue - trying with SSL disabled`);
        }
      });
  }
}

// Export pool with proper null handling
export default pool;

// Helper function to check if pool is available
export function isPoolAvailable(): boolean {
  return pool !== null;
}

