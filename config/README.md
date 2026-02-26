# How to Update Card Information

## Quick Guide

To easily change the information displayed on the cards, edit these files:

### 1. Change Card Names or Add/Remove Cards

Edit `config/trendingCards.ts`:

```typescript
export const TRENDING_CARDS: CardConfig[] = [
  {
    id: 0,
    name: 'Songs',              // Change card name here
    apiEndpoint: '/api/songs',  // API endpoint
    showDuration: true,          // Show duration (true/false)
  },
  // Add more cards here...
];
```

### 2. Update Songs Card Data

Edit `app/api/songs/route.ts`:

```typescript
const songs = [
  { 
    id: 1, 
    title: 'Your Song Title',    // Change title
    artist: 'Artist Name',       // Change artist
    image_url: null,             // Add image URL if available
    duration_ms: 200000,         // Duration in milliseconds
    popularity: 95,              // Popularity score
    genre: 'Pop'                 // Genre
  },
  // Add more songs...
];
```

### 3. Update Podcasts Card Data

Edit `app/api/podcasts/route.ts` - same format as songs.

### 4. Update Albums Card Data

Edit `app/api/albums/route.ts` - same format as songs.

### 5. Update Artists Card Data

Edit `app/api/artists/route.ts` - same format as songs.

## Data Format

Each item should have:
- `id`: Unique number (1, 2, 3, etc.)
- `title`: Main title/name
- `artist`: Artist/creator name
- `image_url`: Image URL (or `null`)
- `duration_ms`: Duration in milliseconds (or `null` if not applicable)
- `popularity`: Popularity score (0-100)
- `genre`: Genre/category

## Notes

- Cards are displayed in the order they appear in `trendingCards.ts`
- Only cards with `showDuration: true` will display duration
- Maximum 10 items are shown per card
- All changes take effect immediately after saving

