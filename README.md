# AudioTrace

A lightweight, mobile-first web application for discovering and tracking songs and podcasts. Built with simplicity and performance in mind.

## Overview

AudioTrace provides a clean, focused interface for browsing songs and podcasts. The application features a mobile-first design that works seamlessly across all device sizes, with a simple vertical card layout that prioritizes content discovery.

## Features

- **Songs & Podcasts**: Browse two main content categories in an intuitive card-based interface
- **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **Interactive Cards**: Tap cards to expand and view detailed item lists
- **Clean UI**: Minimalist design with colorful accents and smooth interactions
- **Fast Performance**: Lightweight codebase for quick loading and smooth scrolling

## Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

**Backend:**
- Next.js API Routes (simplified, returns mock data)
- Minimal API endpoints for songs and podcasts only

**Deployment:**
- Vercel (Hosting)

## Project Structure

```
AudioTrace/
├── app/                    # Next.js App Router pages
│   ├── api/               # Backend API routes
│   │   ├── songs/         # Songs API endpoint
│   │   └── podcasts/      # Podcasts API endpoint
│   ├── info/              # Song detail pages
│   ├── podcast/           # Podcast detail pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Site header with branding
│   ├── Footer.tsx         # Site footer with navigation
│   ├── ContentGrid.tsx    # Main content grid (Songs & Podcasts)
│   ├── CategoryCard.tsx   # Individual category card component
│   ├── CategoryHeader.tsx # Card header component
│   └── CategoryList.tsx   # List of items within a card
├── lib/                   # Utilities
│   └── db.ts             # Database utilities
└── public/                # Static assets
```

## Layout Structure

The application follows a simple vertical stack layout:

```
┌─────────────┐
│   Header    │
├─────────────┤
│             │
│ Songs Card  │
│             │
├─────────────┤
│             │
│Podcasts Card│
│             │
├─────────────┤
│   Footer    │
└─────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd AudioTrace-main
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables (if needed)
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues

- **Port already in use**: Kill the process using port 3000 manually or restart your terminal
- **Build errors**: Clear `.next` folder and `node_modules`, then reinstall dependencies
- **Stale connections**: Restart your terminal/IDE

## API Routes

The application includes minimal API routes that return mock data:

- `GET /api/songs` - Returns mock songs list (10 items)
- `GET /api/podcasts` - Returns mock podcasts list (10 items)

**Note:** The backend is simplified and frontend-focused. API routes return static mock data directly without database dependencies.

## Component Documentation

### ContentGrid

Main component that displays Songs and Podcasts cards in a vertical stack. Handles data fetching and card selection state.

**Props:** None

**State:**
- `songs`: Array of song items
- `podcasts`: Array of podcast items
- `selectedCard`: Currently selected card index (0 for Songs, 1 for Podcasts)

### CategoryCard

Displays a single category (Songs or Podcasts) with expandable item list.

**Props:**
- `categoryName`: Display name of the category
- `categoryIndex`: Index of category (0 = Songs, 1 = Podcasts)
- `isSelected`: Whether the card is currently selected
- `onClick`: Click handler function
- `mediaItems`: Array of media items to display

### CategoryList

Displays a scrollable list of media items within a category card.

**Props:**
- `mediaItems`: Array of media items to display
- `isCardSelected`: Whether parent card is selected (enables item clicks)
- `categoryIndex`: Category index for navigation routing

## Design Principles

- **Mobile-First**: All components designed for mobile screens first, then enhanced for larger screens
- **Simplicity**: Minimal UI elements focused on content discovery
- **Performance**: Lightweight components and efficient rendering
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Touch-Friendly**: Large tap targets and smooth interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project - All rights reserved

## Notes

- The application uses mock data returned directly from simplified API routes
- Card selection is managed at the ContentGrid level
- All components are optimized for mobile touch interactions
- Headers and footers are compact and mobile-first optimized
- Backend is minimal - only essential API routes remain
- Single-page application - only home page exists
