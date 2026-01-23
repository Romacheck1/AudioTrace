# SoundTrace - Hosting Requirements & Setup Guide

## ✅ Current Status

### What's Already Set Up

1. **Next.js Application**
   - ✅ Next.js 16.1.4 with App Router
   - ✅ TypeScript configuration
   - ✅ Tailwind CSS for styling
   - ✅ Server-side rendering (SSR) ready

2. **Database**
   - ✅ PostgreSQL database connection configured
   - ✅ Database connection pool setup (`lib/db.ts`)
   - ✅ 9 content type tables: songs, podcasts, audiobooks, movies, streams, youtube, news, radio, interviews
   - ✅ API routes for fetching data (`/api/[type]/route.ts`)

3. **API Routes**
   - ✅ GET endpoints for all content types
   - ✅ Update endpoints for data management
   - ✅ Migration routes for table creation

4. **SEO & Metadata**
   - ✅ Root layout metadata configured
   - ✅ Dynamic metadata for info pages
   - ✅ robots.txt file
   - ✅ Dynamic sitemap generation
   - ✅ Open Graph and Twitter Card support

5. **Responsiveness**
   - ✅ Desktop breakpoints configured (lg: 1024px+)
   - ✅ Fixed-width containers (1200px) for desktop

---

## 🔧 What Needs to Be Set Up

### 1. **Summarization API** ⚠️ REQUIRED

**Status:** Not implemented

**What's Needed:**
- An API service to generate summaries/descriptions for content items
- Integration point in your application to call this API
- Error handling and fallback behavior

**Recommended Options:**

**Option A: OpenAI API**
```typescript
// Example: app/api/summarize/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { content, type } = await request.json();
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Generate a concise summary for this ${type} content.`
      },
      {
        role: "user",
        content: content
      }
    ],
    max_tokens: 200,
  });
  
  return NextResponse.json({ summary: response.choices[0].message.content });
}
```

**Option B: Hugging Face API**
- Free tier available
- Models: facebook/bart-large-cnn, google/pegasus-xsum
- Requires API key from Hugging Face

**Option C: Custom Summarization Service**
- Build your own using libraries like `@tensorflow/tfjs` or `transformers.js`
- More control but requires ML expertise

**Integration Points:**
- Add to info pages when description is missing
- Admin panel for bulk summarization
- Background job for auto-summarization

**Environment Variables Needed:**
```env
SUMMARIZATION_API_KEY=your_api_key_here
SUMMARIZATION_API_URL=https://api.example.com/summarize
# OR
OPENAI_API_KEY=your_openai_key_here
```

---

### 2. **Backend Request Handling** ⚠️ REQUIRED FOR PRODUCTION

**Status:** Partially implemented (API routes exist but need production hardening)

**Current State:**
- ✅ API routes exist in `/app/api/`
- ✅ Database queries implemented
- ⚠️ Missing: Error handling, rate limiting, CORS, authentication

**What Needs to Be Added:**

#### A. **Error Handling & Validation**
```typescript
// Example improvements needed:
- Input validation (Zod or similar)
- Proper error responses
- Error logging
- Graceful degradation
```

#### B. **Rate Limiting**
```typescript
// Install: npm install @upstash/ratelimit @upstash/redis
// Or use Next.js middleware with rate limiting
```

#### C. **CORS Configuration**
```typescript
// If API needs to be accessed from external domains
// Add CORS headers in API routes or middleware
```

#### D. **Authentication (for Admin/Update Routes)**
```typescript
// Protect admin and update routes
// Options: NextAuth.js, Clerk, Auth0, or custom JWT
```

#### E. **Request Logging & Monitoring**
```typescript
// Add logging for production
// Consider: Sentry, LogRocket, or custom logging service
```

---

### 3. **Environment Variables** ⚠️ REQUIRED

**Create `.env.local` file (for local) and set in hosting platform:**

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Site URL (for SEO metadata and sitemap)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Summarization API (when implemented)
SUMMARIZATION_API_KEY=your_key_here
# OR
OPENAI_API_KEY=your_openai_key_here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: Authentication (if adding auth)
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=https://your-domain.com
```

---

### 4. **Hosting Platform Setup**

**Recommended Platforms:**

#### **Option A: Vercel** (Recommended for Next.js)
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Configure PostgreSQL database (or use external)
4. Deploy automatically on push

**Steps:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_SITE_URL
```

#### **Option B: Render**
1. Create new Web Service
2. Connect repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add PostgreSQL database service
6. Set environment variables

#### **Option C: Railway**
1. Create new project
2. Deploy from GitHub
3. Add PostgreSQL service
4. Set environment variables

---

### 5. **Database Setup for Production**

**Current:** Using connection pool with SSL

**Production Checklist:**
- ✅ SSL connection configured
- ⚠️ Connection pooling (already using Pool)
- ⚠️ Database migrations (need to run migrate routes or use migration tool)
- ⚠️ Backup strategy
- ⚠️ Connection retry logic

**Recommended:**
- Use a managed PostgreSQL service (Render, Supabase, Neon, Railway)
- Set up automated backups
- Monitor connection pool size
- Add connection retry logic

---

### 6. **Performance Optimizations**

**Current State:**
- ✅ Server-side rendering
- ⚠️ Image optimization (not using Next.js Image component)
- ⚠️ Caching strategy
- ⚠️ API response caching

**Recommended Additions:**

```typescript
// Add caching headers to API routes
export async function GET() {
  const data = await fetchData();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}

// Use Next.js Image component for images
import Image from 'next/image';
```

---

### 7. **Monitoring & Analytics**

**Recommended:**
- Google Analytics or Plausible Analytics
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics, or custom)
- Uptime monitoring (UptimeRobot, Pingdom)

---

## 📋 Pre-Deployment Checklist

- [ ] Set all environment variables in hosting platform
- [ ] Update `NEXT_PUBLIC_SITE_URL` in production
- [ ] Update `robots.txt` sitemap URL with production domain
- [ ] Run database migrations
- [ ] Test all API endpoints
- [ ] Set up summarization API (if needed)
- [ ] Configure error logging
- [ ] Set up monitoring/analytics
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Verify database connections work
- [ ] Test search functionality
- [ ] Verify all info pages load correctly
- [ ] Check SEO metadata in production
- [ ] Verify sitemap.xml is accessible

---

## 🚀 Deployment Steps

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push
   ```

2. **Set Up Hosting Platform**
   - Connect repository
   - Configure build settings
   - Add environment variables

3. **Set Up Database**
   - Create PostgreSQL database
   - Run migrations (via API routes or migration tool)
   - Test connection

4. **Deploy**
   - Push to main branch (auto-deploy if configured)
   - Or manually trigger deployment

5. **Post-Deployment**
   - Verify site loads
   - Test API endpoints
   - Check database connections
   - Verify SEO metadata
   - Test search functionality

---

## 🔐 Security Considerations

**Before Going Live:**
- [ ] Remove any hardcoded secrets
- [ ] Use environment variables for all sensitive data
- [ ] Add rate limiting to API routes
- [ ] Implement authentication for admin routes
- [ ] Add input validation to all API endpoints
- [ ] Set up CORS properly if needed
- [ ] Enable HTTPS (usually automatic on hosting platforms)
- [ ] Review and sanitize all user inputs

---

## 📞 Support & Resources

- Next.js Docs: https://nextjs.org/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Vercel Deployment: https://vercel.com/docs
- Render Docs: https://render.com/docs

---

**Last Updated:** Current Date
**Version:** 0.3

