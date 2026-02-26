'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function AdminPage() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMigratingAudiobooks, setIsMigratingAudiobooks] = useState(false);
  const [isUpdatingAudiobooks, setIsUpdatingAudiobooks] = useState(false);
  const [isMigratingMovies, setIsMigratingMovies] = useState(false);
  const [isUpdatingMovies, setIsUpdatingMovies] = useState(false);
  const [isMigratingStreams, setIsMigratingStreams] = useState(false);
  const [isUpdatingStreams, setIsUpdatingStreams] = useState(false);
  const [isMigratingYoutube, setIsMigratingYoutube] = useState(false);
  const [isUpdatingYoutube, setIsUpdatingYoutube] = useState(false);
  const [isMigratingNews, setIsMigratingNews] = useState(false);
  const [isUpdatingNews, setIsUpdatingNews] = useState(false);
  const [isMigratingRadio, setIsMigratingRadio] = useState(false);
  const [isUpdatingRadio, setIsUpdatingRadio] = useState(false);
  const [isMigratingInterviews, setIsMigratingInterviews] = useState(false);
  const [isUpdatingInterviews, setIsUpdatingInterviews] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleMigrate = async () => {
    setIsMigrating(true);
    setResult(null);

    try {
      const response = await fetch('/api/podcasts/migrate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Migration completed successfully',
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to migrate',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to migrate',
      });
    } finally {
      setIsMigrating(false);
    }
  };

  const handleUpdatePodcasts = async () => {
    setIsUpdating(true);
    setResult(null);

    try {
      const response = await fetch('/api/podcasts/update', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Successfully updated ${data.count} podcasts`,
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to update podcasts',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to update podcasts',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMigrateAudiobooks = async () => {
    setIsMigratingAudiobooks(true);
    setResult(null);

    try {
      const response = await fetch('/api/audiobooks/migrate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Migration completed successfully',
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to migrate',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to migrate',
      });
    } finally {
      setIsMigratingAudiobooks(false);
    }
  };

  const handleUpdateAudiobooks = async () => {
    setIsUpdatingAudiobooks(true);
    setResult(null);

    try {
      const response = await fetch('/api/audiobooks/update', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Successfully updated ${data.count} audiobooks`,
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to update audiobooks',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to update audiobooks',
      });
    } finally {
      setIsUpdatingAudiobooks(false);
    }
  };

  const handleMigrateMovies = async () => {
    setIsMigratingMovies(true);
    setResult(null);

    try {
      const response = await fetch('/api/movies/migrate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Migration completed successfully',
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to migrate',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to migrate',
      });
    } finally {
      setIsMigratingMovies(false);
    }
  };

  const handleUpdateMovies = async () => {
    setIsUpdatingMovies(true);
    setResult(null);

    try {
      const response = await fetch('/api/movies/update', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Successfully updated ${data.count} movies`,
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to update movies',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to update movies',
      });
    } finally {
      setIsUpdatingMovies(false);
    }
  };

  const handleMigrateStreams = async () => {
    setIsMigratingStreams(true);
    setResult(null);

    try {
      const response = await fetch('/api/streams/migrate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Migration completed successfully',
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to migrate',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to migrate',
      });
    } finally {
      setIsMigratingStreams(false);
    }
  };

  const handleUpdateStreams = async () => {
    setIsUpdatingStreams(true);
    setResult(null);

    try {
      const response = await fetch('/api/streams/update', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Successfully updated ${data.count} streams`,
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to update streams',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to update streams',
      });
    } finally {
      setIsUpdatingStreams(false);
    }
  };

  const handleMigrateYoutube = async () => {
    setIsMigratingYoutube(true);
    setResult(null);

    try {
      const response = await fetch('/api/youtube/migrate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Migration completed successfully',
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to migrate',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to migrate',
      });
    } finally {
      setIsMigratingYoutube(false);
    }
  };

  const handleUpdateYoutube = async () => {
    setIsUpdatingYoutube(true);
    setResult(null);

    try {
      const response = await fetch('/api/youtube/update', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Successfully updated ${data.count} youtubers`,
        });
      } else {
        setResult({
          success: false,
          error: data.error || data.message || 'Failed to update youtube',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to update youtube',
      });
    } finally {
      setIsUpdatingYoutube(false);
    }
  };

  const handleMigrateNews = async () => {
    setIsMigratingNews(true);
    setResult(null);
    try {
      const response = await fetch('/api/news/migrate', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, message: data.message || 'Migration completed successfully' });
      } else {
        setResult({ success: false, error: data.error || data.message || 'Failed to migrate' });
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message || 'Failed to migrate' });
    } finally {
      setIsMigratingNews(false);
    }
  };

  const handleUpdateNews = async () => {
    setIsUpdatingNews(true);
    setResult(null);
    try {
      const response = await fetch('/api/news/update', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, message: data.message || `Successfully updated ${data.count} news sources` });
      } else {
        setResult({ success: false, error: data.error || data.message || 'Failed to update news' });
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message || 'Failed to update news' });
    } finally {
      setIsUpdatingNews(false);
    }
  };

  const handleMigrateRadio = async () => {
    setIsMigratingRadio(true);
    setResult(null);
    try {
      const response = await fetch('/api/radio/migrate', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, message: data.message || 'Migration completed successfully' });
      } else {
        setResult({ success: false, error: data.error || data.message || 'Failed to migrate' });
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message || 'Failed to migrate' });
    } finally {
      setIsMigratingRadio(false);
    }
  };

  const handleUpdateRadio = async () => {
    setIsUpdatingRadio(true);
    setResult(null);
    try {
      const response = await fetch('/api/radio/update', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, message: data.message || `Successfully updated ${data.count} radio stations` });
      } else {
        setResult({ success: false, error: data.error || data.message || 'Failed to update radio' });
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message || 'Failed to update radio' });
    } finally {
      setIsUpdatingRadio(false);
    }
  };

  const handleMigrateInterviews = async () => {
    setIsMigratingInterviews(true);
    setResult(null);
    try {
      const response = await fetch('/api/interviews/migrate', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, message: data.message || 'Migration completed successfully' });
      } else {
        setResult({ success: false, error: data.error || data.message || 'Failed to migrate' });
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message || 'Failed to migrate' });
    } finally {
      setIsMigratingInterviews(false);
    }
  };

  const handleUpdateInterviews = async () => {
    setIsUpdatingInterviews(true);
    setResult(null);
    try {
      const response = await fetch('/api/interviews/update', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, message: data.message || `Successfully updated ${data.count} interviews` });
      } else {
        setResult({ success: false, error: data.error || data.message || 'Failed to update interviews' });
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message || 'Failed to update interviews' });
    } finally {
      setIsUpdatingInterviews(false);
    }
  };

  return (
    <div className="px-10">
      <Header />
      
      <div className="w-[1200px] mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Setup Podcasts Table</h2>
          <p className="text-gray-600 mb-4">
            Create the podcasts table and migrate existing podcast data from the songs table.
          </p>
          
          <button
            onClick={handleMigrate}
            disabled={isMigrating}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${
              isMigrating
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isMigrating ? 'Migrating...' : 'Migrate to Podcasts Table'}
          </button>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update Podcasts</h2>
          <p className="text-gray-600 mb-4">
            Fetch the top 10 popular podcasts from iTunes and update the database.
          </p>
          
          <button
            onClick={handleUpdatePodcasts}
            disabled={isUpdating}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isUpdating
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isUpdating ? 'Updating...' : 'Update Podcasts'}
          </button>

          {result && (
            <div className={`mt-4 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <p className="font-semibold">✓ {result.message}</p>
              ) : (
                <p className="font-semibold">✗ {result.error}</p>
              )}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup Audiobooks Table</h2>
          <p className="text-gray-600 mb-4">
            Create the audiobooks table.
          </p>
          
          <button
            onClick={handleMigrateAudiobooks}
            disabled={isMigratingAudiobooks}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${
              isMigratingAudiobooks
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isMigratingAudiobooks ? 'Migrating...' : 'Create Audiobooks Table'}
          </button>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update Audiobooks</h2>
          <p className="text-gray-600 mb-4">
            Fetch the top 10 popular audiobooks from iTunes and update the database.
          </p>
          
          <button
            onClick={handleUpdateAudiobooks}
            disabled={isUpdatingAudiobooks}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isUpdatingAudiobooks
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isUpdatingAudiobooks ? 'Updating...' : 'Update Audiobooks'}
          </button>

          {result && (
            <div className={`mt-4 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <p className="font-semibold">✓ {result.message}</p>
              ) : (
                <p className="font-semibold">✗ {result.error}</p>
              )}
            </div>
          )}
        </div>

        {/* Movies Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup Movies Table</h2>
          <p className="text-gray-600 mb-4">
            Create the movies table.
          </p>
          
          <button
            onClick={handleMigrateMovies}
            disabled={isMigratingMovies}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${
              isMigratingMovies
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isMigratingMovies ? 'Creating Table...' : 'Create Movies Table'}
          </button>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update Movies</h2>
          <p className="text-gray-600 mb-4">
            Fetch the top 10 popular movies from iTunes and update the database.
          </p>
          
          <button
            onClick={handleUpdateMovies}
            disabled={isUpdatingMovies}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isUpdatingMovies
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isUpdatingMovies ? 'Updating...' : 'Update Movies'}
          </button>

          {result && (
            <div className={`mt-4 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <p className="font-semibold">✓ {result.message}</p>
              ) : (
                <p className="font-semibold">✗ {result.error}</p>
              )}
            </div>
          )}
        </div>

        {/* Streams Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup Streams Table</h2>
          <p className="text-gray-600 mb-4">
            Create the streams table for Twitch streamers.
          </p>
          
          <button
            onClick={handleMigrateStreams}
            disabled={isMigratingStreams}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${
              isMigratingStreams
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isMigratingStreams ? 'Creating Table...' : 'Create Streams Table'}
          </button>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update Streams</h2>
          <p className="text-gray-600 mb-4">
            Add the top 10 popular Twitch streamers to the database.
          </p>
          
          <button
            onClick={handleUpdateStreams}
            disabled={isUpdatingStreams}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isUpdatingStreams
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isUpdatingStreams ? 'Updating...' : 'Update Streams'}
          </button>

          {result && (
            <div className={`mt-4 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <p className="font-semibold">✓ {result.message}</p>
              ) : (
                <p className="font-semibold">✗ {result.error}</p>
              )}
            </div>
          )}
        </div>

        {/* YouTube Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup YouTube Table</h2>
          <p className="text-gray-600 mb-4">
            Create the youtube table for YouTubers.
          </p>
          
          <button
            onClick={handleMigrateYoutube}
            disabled={isMigratingYoutube}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${
              isMigratingYoutube
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isMigratingYoutube ? 'Creating Table...' : 'Create YouTube Table'}
          </button>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update YouTube</h2>
          <p className="text-gray-600 mb-4">
            Add the top 10 popular YouTubers to the database.
          </p>
          
          <button
            onClick={handleUpdateYoutube}
            disabled={isUpdatingYoutube}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isUpdatingYoutube
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isUpdatingYoutube ? 'Updating...' : 'Update YouTube'}
          </button>

          {result && (
            <div className={`mt-4 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.success ? (
                <p className="font-semibold">✓ {result.message}</p>
              ) : (
                <p className="font-semibold">✗ {result.error}</p>
              )}
            </div>
          )}
        </div>

        {/* News Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup News Table</h2>
          <p className="text-gray-600 mb-4">Create the news table for news sources.</p>
          <button onClick={handleMigrateNews} disabled={isMigratingNews} className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${isMigratingNews ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}>
            {isMigratingNews ? 'Creating Table...' : 'Create News Table'}
          </button>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update News</h2>
          <p className="text-gray-600 mb-4">Add the top 10 popular news sources to the database.</p>
          <button onClick={handleUpdateNews} disabled={isUpdatingNews} className={`px-6 py-3 rounded-lg font-semibold transition-colors ${isUpdatingNews ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
            {isUpdatingNews ? 'Updating...' : 'Update News'}
          </button>
          {result && (
            <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {result.success ? <p className="font-semibold">✓ {result.message}</p> : <p className="font-semibold">✗ {result.error}</p>}
            </div>
          )}
        </div>

        {/* Radio Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup Radio Table</h2>
          <p className="text-gray-600 mb-4">Create the radio table for radio stations.</p>
          <button onClick={handleMigrateRadio} disabled={isMigratingRadio} className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${isMigratingRadio ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}>
            {isMigratingRadio ? 'Creating Table...' : 'Create Radio Table'}
          </button>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update Radio</h2>
          <p className="text-gray-600 mb-4">Add the top 10 popular radio stations to the database.</p>
          <button onClick={handleUpdateRadio} disabled={isUpdatingRadio} className={`px-6 py-3 rounded-lg font-semibold transition-colors ${isUpdatingRadio ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
            {isUpdatingRadio ? 'Updating...' : 'Update Radio'}
          </button>
          {result && (
            <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {result.success ? <p className="font-semibold">✓ {result.message}</p> : <p className="font-semibold">✗ {result.error}</p>}
            </div>
          )}
        </div>

        {/* Interviews Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Setup Interviews Table</h2>
          <p className="text-gray-600 mb-4">Create the interviews table for interview shows.</p>
          <button onClick={handleMigrateInterviews} disabled={isMigratingInterviews} className={`px-6 py-3 rounded-lg font-semibold transition-colors mr-4 ${isMigratingInterviews ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}>
            {isMigratingInterviews ? 'Creating Table...' : 'Create Interviews Table'}
          </button>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Update Interviews</h2>
          <p className="text-gray-600 mb-4">Add the top 10 popular interview shows to the database.</p>
          <button onClick={handleUpdateInterviews} disabled={isUpdatingInterviews} className={`px-6 py-3 rounded-lg font-semibold transition-colors ${isUpdatingInterviews ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
            {isUpdatingInterviews ? 'Updating...' : 'Update Interviews'}
          </button>
          {result && (
            <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {result.success ? <p className="font-semibold">✓ {result.message}</p> : <p className="font-semibold">✗ {result.error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

