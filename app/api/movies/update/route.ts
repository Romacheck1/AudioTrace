import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database configuration error', message: 'Database connection is not available. Please set DATABASE_URL environment variable.' },
        { status: 500 }
      );
    }

    // iTunes Search API doesn't support movies, so we'll use sample movie data
    // In production, you could integrate with TMDB API or another movie database
    const sampleMovies = [
      {
        title: 'Inception',
        artist: 'Christopher Nolan',
        image_url: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6y.jpg',
        duration_ms: 8880000, // 148 minutes
        genre: 'Sci-Fi',
        popularity: 95
      },
      {
        title: 'The Matrix',
        artist: 'Lana Wachowski, Lilly Wachowski',
        image_url: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        duration_ms: 8160000, // 136 minutes
        genre: 'Action',
        popularity: 92
      },
      {
        title: 'Interstellar',
        artist: 'Christopher Nolan',
        image_url: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        duration_ms: 10140000, // 169 minutes
        genre: 'Sci-Fi',
        popularity: 88
      },
      {
        title: 'The Dark Knight',
        artist: 'Christopher Nolan',
        image_url: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        duration_ms: 9120000, // 152 minutes
        genre: 'Action',
        popularity: 96
      },
      {
        title: 'Pulp Fiction',
        artist: 'Quentin Tarantino',
        image_url: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        duration_ms: 9240000, // 154 minutes
        genre: 'Crime',
        popularity: 94
      },
      {
        title: 'Fight Club',
        artist: 'David Fincher',
        image_url: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        duration_ms: 8340000, // 139 minutes
        genre: 'Drama',
        popularity: 90
      },
      {
        title: 'The Shawshank Redemption',
        artist: 'Frank Darabont',
        image_url: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        duration_ms: 8520000, // 142 minutes
        genre: 'Drama',
        popularity: 98
      },
      {
        title: 'Forrest Gump',
        artist: 'Robert Zemeckis',
        image_url: 'https://image.tmdb.org/t/p/w500/arw2vcBvePOVz6PX6HXbQ7X3iN2.jpg',
        duration_ms: 8520000, // 142 minutes
        genre: 'Drama',
        popularity: 91
      },
      {
        title: 'The Godfather',
        artist: 'Francis Ford Coppola',
        image_url: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        duration_ms: 10500000, // 175 minutes
        genre: 'Crime',
        popularity: 97
      },
      {
        title: 'Goodfellas',
        artist: 'Martin Scorsese',
        image_url: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
        duration_ms: 8700000, // 145 minutes
        genre: 'Crime',
        popularity: 93
      }
    ];

    // Insert/update each movie in the database
    const insertedMovies = [];
    
    for (const movie of sampleMovies) {
      try {
        // Insert or update into movies table (using title + artist as unique identifier)
        const result = await pool.query(
          `INSERT INTO movies (title, artist, image_url, duration_ms, genre, popularity)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (title, artist) DO UPDATE SET
             image_url = EXCLUDED.image_url,
             duration_ms = EXCLUDED.duration_ms,
             genre = EXCLUDED.genre,
             popularity = EXCLUDED.popularity
           RETURNING id, title, artist`,
          [movie.title, movie.artist, movie.image_url, movie.duration_ms, movie.genre, movie.popularity]
        );

        // Add to inserted list
        if (result.rows.length > 0) {
          insertedMovies.push(result.rows[0]);
        }
      } catch (error: any) {
        console.error(`Error inserting movie ${movie.title}:`, error.message);
        // Continue with next movie even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${insertedMovies.length} movies`,
      count: insertedMovies.length,
      movies: insertedMovies
    });
  } catch (error: any) {
    console.error('Movie update error:', error);
    return NextResponse.json(
      { error: 'Failed to update movies', details: error.message },
      { status: 500 }
    );
  }
}

