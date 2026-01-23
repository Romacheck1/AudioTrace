# Database Connection Troubleshooting Guide

## Common Issues on Hosted Platforms

### 1. Environment Variable Not Set

**Symptom:** `DATABASE_URL environment variable is not set` error

**Solution:**
- Go to your hosting platform's environment variables settings
- Add `DATABASE_URL` with your PostgreSQL connection string
- Format: `postgresql://user:password@host:port/database`
- **Important:** Restart your application after adding the variable

**Platforms:**
- **Vercel:** Project Settings → Environment Variables
- **Render:** Environment → Environment Variables
- **Railway:** Variables tab
- **Heroku:** Settings → Config Vars

### 2. SSL Configuration Issues

**Symptom:** `SSL connection required` or `self-signed certificate` errors

**Solution:**
The updated `lib/db.ts` now automatically handles SSL:
- Production/hosted: SSL enabled with `rejectUnauthorized: false`
- Local: SSL disabled (unless connection string requires it)

If you still have issues, check your database provider's SSL requirements:
- **Render:** Requires SSL
- **Railway:** Requires SSL
- **Supabase:** Requires SSL
- **Neon:** Requires SSL

### 3. Connection String Format

**Common Formats:**

**Standard PostgreSQL:**
```
postgresql://user:password@host:port/database
```

**With SSL (Render, Railway):**
```
postgresql://user:password@host:port/database?sslmode=require
```

**With SSL and specific options:**
```
postgresql://user:password@host:port/database?sslmode=require&sslcert=path/to/cert
```

### 4. Network/Firewall Issues

**Symptom:** Connection timeout errors

**Solution:**
- Check if your database allows connections from your hosting platform
- Some databases require IP whitelisting
- Check database firewall settings
- Ensure database is publicly accessible (if needed)

### 5. Database Not Running or Inaccessible

**Symptom:** `Connection refused` or `ECONNREFUSED`

**Solution:**
- Verify database is running
- Check database status in your hosting platform
- Verify connection credentials
- Test connection from local machine first

## Testing Database Connection

### Test Locally

```bash
# Test connection string format
psql "postgresql://user:password@host:port/database"

# Or test with Node.js
node -e "const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT NOW()').then(r => { console.log('Connected:', r.rows[0]); process.exit(0); }).catch(e => { console.error('Error:', e.message); process.exit(1); });"
```

### Test in Production

Check your hosting platform logs for:
- `✅ Database connection successful` - Connection working
- `❌ Database connection failed` - Connection failed with error message

## Platform-Specific Notes

### Render
- Requires SSL
- Connection string format: `postgresql://user:password@host:port/database`
- Set `DATABASE_URL` in Environment Variables
- Database must be in same region for best performance

### Vercel
- Requires SSL for external databases
- Set `DATABASE_URL` in Environment Variables
- May need to allow Vercel IPs in database firewall

### Railway
- Requires SSL
- Usually provides `DATABASE_URL` automatically
- Check Variables tab if not set

### Heroku
- Uses `DATABASE_URL` automatically for Heroku Postgres
- For external databases, set `DATABASE_URL` manually
- Requires SSL for external connections

## Debugging Steps

1. **Check Environment Variable:**
   ```bash
   # In your hosting platform, verify DATABASE_URL is set
   # Check logs for: "DATABASE_URL exists: true"
   ```

2. **Check Connection String:**
   - Verify format is correct
   - Check for special characters in password (may need URL encoding)
   - Ensure no extra spaces or quotes

3. **Check SSL:**
   - Verify SSL is enabled in database settings
   - Check if `rejectUnauthorized: false` is needed

4. **Check Network:**
   - Verify database is accessible from hosting platform
   - Check firewall rules
   - Verify database is running

5. **Check Logs:**
   - Look for connection errors in hosting platform logs
   - Check database logs for connection attempts
   - Look for timeout errors

## Quick Fix Checklist

- [ ] `DATABASE_URL` is set in hosting platform environment variables
- [ ] Connection string format is correct
- [ ] Database is running and accessible
- [ ] SSL is properly configured (for hosted databases)
- [ ] Firewall allows connections from hosting platform
- [ ] Application has been restarted after adding environment variable
- [ ] Database credentials are correct
- [ ] Database exists and is accessible

## Still Having Issues?

1. Check hosting platform logs for specific error messages
2. Test connection string locally first
3. Verify database provider's connection requirements
4. Check if database has connection limits
5. Verify billing/account status (some free tiers have limits)

