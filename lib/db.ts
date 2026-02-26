// Placeholder data utilities for detail pages

export function getPlaceholderData(type: string, limit: number = 10): any[] {
  const placeholders: any[] = [];
  for (let i = 1; i <= limit; i++) {
    placeholders.push({
      id: i,
      title: `Sample ${type} ${i}`,
      artist: `Sample Artist ${i}`,
      image_url: null,
      duration_ms: null,
      genre: 'Sample Genre',
      popularity: 100 - i,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  return placeholders;
}

export function getPlaceholderItem(type: string, id: string): any {
  return {
    id: parseInt(id),
    title: `Sample ${type} ${id}`,
    artist: `Sample Artist ${id}`,
    image_url: null,
    duration_ms: null,
    genre: 'Sample Genre',
    popularity: 100,
    description: `This is a placeholder description for ${type} ${id}.`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function getPlaceholderRelated(type: string, genre: string, excludeId: number, limit: number = 3): any[] {
  const placeholders: any[] = [];
  for (let i = 1; i <= limit; i++) {
    placeholders.push({
      id: excludeId + i,
      title: `Related ${type} ${i}`,
      artist: `Related Artist ${i}`,
      image_url: null,
      duration_ms: null,
      genre: genre,
      popularity: 100 - i,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  return placeholders;
}
