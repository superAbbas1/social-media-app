import React, { useState, useEffect } from 'react';
import MediaFeed from '../components/MediaFeed';
import MediaSearch from '../components/MediaSearch';
import { mediaAPI } from '../services/api';

function ConsumerView() {
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
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await mediaAPI.search(query);
        setMedia(response.data);
      } catch (error) {
        console.error('Error searching media:', error);
      }
    } else {
      loadMedia();
    }
  };

  return (
    <div className="consumer-view">
      <h2>Consumer View</h2>
      <MediaSearch onSearch={handleSearch} />
      <MediaFeed media={media} onRate={loadMedia} />
    </div>
  );
}

export default ConsumerView;