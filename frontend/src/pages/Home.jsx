import React, { useState, useEffect } from 'react';
import MediaFeed from '../components/MediaFeed';
import MediaSearch from '../components/MediaSearch';
import { mediaAPI } from '../services/api';

function Home({ currentUser }) {
  const [media, setMedia] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await mediaAPI.getAll();
      setMedia(response.data);
    } catch (error) {
      console.error('Error loading media:', error);
    }
  };

  const handleSearch = async (query) => {
    console.log('Home: Handling search for:', query);
    setSearchQuery(query);
    if (query.trim()) {
      try {
        console.log('Home: Calling search API');
        const response = await mediaAPI.search(query);
        console.log('Home: Search results:', response.data);
        setMedia(response.data);
      } catch (error) {
        console.error('Home: Search error:', error);
      }
    } else {
      console.log('Home: Empty query, loading all media');
      loadMedia();
    }
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <p>Welcome, {currentUser.firstName} {currentUser.lastName}!</p>
      <MediaSearch onSearch={handleSearch} />
      <MediaFeed media={media} onRate={loadMedia} />
    </div>
  );
}

export default Home;