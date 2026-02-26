'use client';

import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { TRENDING_CARDS } from '@/config/trendingCards';

/**
 * Media item interface
 */
interface MediaItem {
  id: number;
  title: string;
  artist: string;
  album?: string | null;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

/**
 * ContentGrid Component
 * 
 * Displays trending content cards in a mobile-first 2x2 grid layout.
 * Shows "Trending top ten globally" heading with four cards.
 * Each card shows a list of items that can be expanded.
 * 
 * @component
 */
export default function ContentGrid() {
  const [cardData, setCardData] = useState<{ [key: number]: MediaItem[] }>({});
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Fetches data for all cards
   */
  useEffect(() => {
    const fetchAllCards = async () => {
      setLoading(true);
      const data: { [key: number]: MediaItem[] } = {};

      try {
        // Fetch data for each card
        await Promise.all(
          TRENDING_CARDS.map(async (card) => {
            try {
              const response = await fetch(card.apiEndpoint);
              const result = await response.json();
              if (Array.isArray(result)) {
                data[card.id] = result;
              } else {
                data[card.id] = [];
              }
            } catch (error) {
              console.error(`Failed to fetch ${card.name}:`, error);
              data[card.id] = [];
            }
          })
        );
      } catch (error) {
        console.error('Error fetching card data:', error);
      } finally {
        setCardData(data);
        setLoading(false);
      }
    };

    fetchAllCards();
  }, []);

  /**
   * Handles card click to toggle selection
   * @param cardIndex - Index of the card
   */
  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(selectedCard === cardIndex ? null : cardIndex);
  };

  return (
    <div className="content-grid">
      {/* Heading */}
      <div className="content-grid-heading">
        <h1 className="content-grid-title">
          Trending Top Ten Globally
        </h1>
      </div>

      {/* Cards - 2x2 Grid Layout */}
      {loading ? (
        <div className="content-grid-loading">Loading...</div>
      ) : (
        <div className="content-grid-container">
          {TRENDING_CARDS.map((card) => (
            <CategoryCard
              key={card.id}
              categoryName={card.name}
              categoryIndex={card.id}
              isSelected={selectedCard === card.id}
              onClick={() => handleCardClick(card.id)}
              mediaItems={cardData[card.id] || []}
              showDuration={card.showDuration}
            />
          ))}
        </div>
      )}
    </div>
  );
}
