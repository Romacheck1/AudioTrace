/**
 * Trending Cards Configuration
 * 
 * Easily update card information here.
 * Each card represents a trending category in America.
 */

export interface CardConfig {
  id: number;
  name: string;
  apiEndpoint: string;
  showDuration: boolean;
}

export const TRENDING_CARDS: CardConfig[] = [
  {
    id: 0,
    name: 'Songs',
    apiEndpoint: '/api/songs',
    showDuration: true,
  },
  {
    id: 1,
    name: 'Podcasts',
    apiEndpoint: '/api/podcasts',
    showDuration: false,
  },
  {
    id: 2,
    name: 'Albums',
    apiEndpoint: '/api/albums',
    showDuration: false,
  },
  {
    id: 3,
    name: 'Artists',
    apiEndpoint: '/api/artists',
    showDuration: false,
  },
];

