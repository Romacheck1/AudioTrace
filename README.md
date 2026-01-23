# SoundTrace

Hello! This project / Web Service is dedicated to every incomplete full-stack web service in the process of teaching myself how to code.

SoundTrace is a web service that tracks various forms of audio like Songs / Podcasts / Streams / Audio Books all in one spot.

## Version 0.3

This is a big one! We now have ALL NINE content cards fully functional - Songs, Podcasts, Audiobooks, Movies, Streams, YouTube, News, Radio, and Interviews. Each card has its own database table, API routes for fetching and updating data, and dedicated info pages with detailed views. The admin panel lets you manage all the different content types, and clicking on any item takes you to a beautifully designed info page with breadcrumbs, action buttons, related content, and even a cool typing animation for descriptions. The whole app is structured really cleanly with separate components for everything, making it easy to maintain and expand. We're using PostgreSQL for all our data storage and Next.js API routes for the backend - everything is connected and working smoothly.

## Version 0.2

Added a fully functional content grid with category cards! Each card represents a different content type (Songs, Podcasts, Audiobooks, etc.) and displays real data from our PostgreSQL database. The Songs card now shows actual song information with album art, titles, artists, and durations. Cards can be selected (with a cool neon border effect), swapped around, or removed. There's also a search bar that routes to a search results page, and clicking on songs takes you to a detailed info page with breadcrumbs, action buttons, and related songs. The whole thing has this retro-futuristic 80s vibe with neon accents and smooth interactions.

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

**Backend:**
- Next.js API Routes
- PostgreSQL
- Connection pooling with SSL support

**Deployment:**
- Render (Hosting)
- PostgreSQL (Database)

### Project Structure

```
soundtrace/
├── app/                    # Next.js App Router pages
│   ├── api/               # Backend API routes
│   ├── [content-type]/    # Dynamic info pages
│   ├── admin/             # Admin panel
│   └── search/            # Search results
├── components/            # React components
│   ├── info/              # Info page components
│   └── [shared components]
├── lib/                   # Utilities
│   └── db.ts              # Database connection
└── public/                # Static assets
```

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXT_PUBLIC_SITE_URL` - Your site URL
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:port/database
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### API Routes

The application includes RESTful API routes for all content types:
- `GET /api/[type]` - Fetch all items
- `POST /api/[type]/update` - Update/create items
- `GET /api/[type]/migrate` - Database migrations

### License

Private project - All rights reserved
