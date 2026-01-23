# SoundTrace - Testing Checklist

## ✅ Build Status
- [x] Production build successful
- [x] TypeScript compilation passed
- [x] All routes generated correctly

## 🔍 Quick Test Checklist

### 1. Environment Variables
Verify these are set (check `.env.local` or hosting platform):
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain (or localhost:3000 for local)
- [ ] (Optional) `SUMMARIZATION_API_KEY` - If you've set up summarization

### 2. Database Connection Test
```bash
# Start dev server and check console for database connection
npm run dev
```
- [ ] No database connection errors in console
- [ ] API routes can fetch data

### 3. Page Tests

#### Home Page (`/`)
- [ ] Page loads without errors
- [ ] Header displays correctly
- [ ] Search bar visible
- [ ] Content grid displays (9 category cards)
- [ ] Footer displays correctly

#### Search Page (`/search`)
- [ ] Page loads
- [ ] Shows list of all database entries
- [ ] Names are sorted alphabetically
- [ ] Count displays correctly

#### Info Pages (test at least one of each type)
- [ ] `/podcast/[id]` - Loads podcast details
- [ ] `/info/[id]` - Loads song details  
- [ ] `/audiobook/[id]` - Loads audiobook details
- [ ] `/movie/[id]` - Loads movie details
- [ ] `/stream/[id]` - Loads stream details
- [ ] `/youtube/[id]` - Loads YouTube details
- [ ] `/news/[id]` - Loads news details
- [ ] `/radio/[id]` - Loads radio details
- [ ] `/interview/[id]` - Loads interview details

### 4. API Routes Test

Test these endpoints (use browser or curl):
```bash
# Test API endpoints
curl http://localhost:3000/api/songs
curl http://localhost:3000/api/podcasts
curl http://localhost:3000/api/audiobooks
# etc...
```

- [ ] `/api/songs` - Returns JSON array
- [ ] `/api/podcasts` - Returns JSON array
- [ ] `/api/audiobooks` - Returns JSON array
- [ ] `/api/movies` - Returns JSON array
- [ ] `/api/streams` - Returns JSON array
- [ ] `/api/youtube` - Returns JSON array
- [ ] `/api/news` - Returns JSON array
- [ ] `/api/radio` - Returns JSON array
- [ ] `/api/interviews` - Returns JSON array

### 5. SEO Tests

- [ ] `/sitemap.xml` - Generates and loads correctly
- [ ] `/robots.txt` - Accessible at `/robots.txt`
- [ ] Page source shows proper meta tags (view page source)
- [ ] Open Graph tags present (test with https://www.opengraph.xyz/)
- [ ] Twitter Card tags present

### 6. Responsiveness Test

- [ ] Desktop (1024px+) - All components visible
- [ ] Desktop (1280px+) - Layout looks good
- [ ] Check browser console for any errors

### 7. Production Build Test

```bash
npm run build
npm start
```

- [ ] Production build completes
- [ ] Production server starts
- [ ] Pages load correctly in production mode

## 🐛 Common Issues to Check

1. **Database Connection Errors**
   - Verify `DATABASE_URL` is correct
   - Check database is accessible
   - Verify SSL settings match your database provider

2. **Missing Environment Variables**
   - Check `.env.local` file exists (for local)
   - Verify variables are set in hosting platform (for production)

3. **Build Errors**
   - Check TypeScript errors
   - Verify all imports are correct
   - Check for missing dependencies

4. **Runtime Errors**
   - Check browser console for errors
   - Check server logs
   - Verify API routes return data

## 🚀 Quick Test Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 Test Results

Date: ___________
Tester: ___________

**Build:** ✅ / ❌
**Database Connection:** ✅ / ❌
**Pages Load:** ✅ / ❌
**API Routes:** ✅ / ❌
**SEO:** ✅ / ❌
**Responsiveness:** ✅ / ❌

**Notes:**
_________________________________________________
_________________________________________________
_________________________________________________

