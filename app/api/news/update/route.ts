import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // Sample data for popular news sources/podcasts
    const sampleNews = [
      {
        title: 'The Daily',
        artist: 'The New York Times',
        image_url: 'https://static01.nyt.com/images/2021/05/11/podcasts/the-daily-artwork/the-daily-artwork-square320.jpg',
        duration_ms: 1800000, // 30 minutes
        genre: 'News',
        popularity: 95
      },
      {
        title: 'Up First',
        artist: 'NPR',
        image_url: 'https://media.npr.org/assets/img/2018/08/03/npr_upfirst_podcasttile_sq-7c4a2b1c7c0e5e5e5e5e5e5e5e5e5e5e5.jpg',
        duration_ms: 900000, // 15 minutes
        genre: 'News',
        popularity: 92
      },
      {
        title: 'BBC World Service',
        artist: 'BBC',
        image_url: 'https://ichef.bbci.co.uk/images/ic/1200x675/p08bqy5m.jpg',
        duration_ms: 1800000,
        genre: 'News',
        popularity: 90
      },
      {
        title: 'CNN 5 Things',
        artist: 'CNN',
        image_url: 'https://cdn.cnn.com/cnn/.e/img/3.0/global/misc/cnn-logo.png',
        duration_ms: 600000, // 10 minutes
        genre: 'News',
        popularity: 88
      },
      {
        title: 'The Journal',
        artist: 'WSJ',
        image_url: 'https://m.wsj.net/video/20200124/012420wsjpodcast/012420wsjpodcast_1280x720.jpg',
        duration_ms: 1200000, // 20 minutes
        genre: 'News',
        popularity: 85
      },
      {
        title: 'Today Explained',
        artist: 'Vox',
        image_url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/8928761/today_explained_artwork.jpg',
        duration_ms: 1500000, // 25 minutes
        genre: 'News',
        popularity: 83
      },
      {
        title: 'Morning Edition',
        artist: 'NPR',
        image_url: 'https://media.npr.org/assets/img/2018/08/03/npr_morningedition_podcasttile_sq-7c4a2b1c7c0e5e5e5e5e5e5e5e5e5e5.jpg',
        duration_ms: 3600000, // 60 minutes
        genre: 'News',
        popularity: 87
      },
      {
        title: 'The Intelligence',
        artist: 'The Economist',
        image_url: 'https://www.economist.com/sites/default/files/20180824_WOC978.png',
        duration_ms: 1200000,
        genre: 'News',
        popularity: 80
      },
      {
        title: 'Post Reports',
        artist: 'Washington Post',
        image_url: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/2I5KJZJ5ZQI6XKQZQZQZQZQZQZQ.jpg&w=1440',
        duration_ms: 1800000,
        genre: 'News',
        popularity: 82
      },
      {
        title: 'Global News Podcast',
        artist: 'BBC',
        image_url: 'https://ichef.bbci.co.uk/images/ic/1200x675/p08bqy5m.jpg',
        duration_ms: 1800000,
        genre: 'News',
        popularity: 89
      }
    ];

    const insertedNews = [];
    
    for (const news of sampleNews) {
      try {
        const result = await pool.query(
          `INSERT INTO news (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [news.title, news.artist, news.image_url, news.duration_ms, news.genre, news.popularity]
        );

        if (result.rows.length > 0) {
          insertedNews.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting news ${news.title}:`, error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedNews.length} news sources`,
      count: insertedNews.length,
      news: insertedNews
    });
  } catch (error: any) {
    console.error('News update error:', error);
    return NextResponse.json(
      { error: 'Failed to update news', details: error.message },
      { status: 500 }
    );
  }
}

