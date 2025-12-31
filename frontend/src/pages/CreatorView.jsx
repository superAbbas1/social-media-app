import React, { useState, useEffect } from 'react';
import MediaUpload from '../components/MediaUpload';
import MediaList from '../components/MediaList';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { mediaAPI, analyticsAPI } from '../services/api';

function CreatorView() {
  const [media, setMedia] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    loadMedia();
    loadAnalytics();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await mediaAPI.getAll();
      setMedia(response.data);
    } catch (error) {
      console.error('Error loading media:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const response = await analyticsAPI.get();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleUpload = () => {
    loadMedia();
    loadAnalytics();
  };

  return (
    <div className="creator-view">
      <h2>Creator View</h2>
      <MediaUpload onUpload={handleUpload} />
      <AnalyticsDashboard analytics={analytics} />
      <MediaList media={media} />
    </div>
  );
}

export default CreatorView;