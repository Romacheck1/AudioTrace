import { Pool, PoolConfig } from 'pg';

const getDatabaseUrl = (): string | undefined => {
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
  
  if (url.includes('sslmode=require')) {
    sslConfig = { rejectUnauthorized: false };
  } else if (isRender && isInternalConnection) {
    sslConfig = false;
  } else if (isHosted && !isInternalConnection) {
    sslConfig = { rejectUnauthorized: false };
  } else if (isVercel || isRailway) {
    sslConfig = { rejectUnauthorized: false };
  } else if (isProduction) {
    sslConfig = { rejectUnauthorized: false };
  } else {
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

  if (isHosted && !isBuildTime) {
    pool.query('SELECT NOW()')
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err: any) => {
        console.error('Database connection failed:', err.message);
      });
  }
}

export default pool as Pool;

