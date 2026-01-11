import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUsers, FaEye, FaStar } from 'react-icons/fa';
import { mediaAPI } from '../services/api';

function MediaItem({ media, onRate }) {
  const [rating, setRating] = useState('');
  const [user, setUser] = useState(null);

  const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url; // Azure Blob
    return `http://localhost:5000${url}`;   // legacy local
  };


  useEffect(() => {
    // Use the populated user data from the media object
    if (media.userId) {
      setUser({
        firstName: media.userId.firstName,
        lastName: media.userId.lastName,
        profilePicture: media.userId.profilePicture
      });
    } else {
      // Fallback to placeholder if no user data
      setUser({
        firstName: 'User',
        lastName: 'Name',
        profilePicture: '/uploads/default-avatar.png'
      });
    }
  }, [media]);

  const handleView = async () => {
    try {
      await mediaAPI.view(media._id);
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  const handleRate = async () => {
    if (!rating) return;
    try {
      await mediaAPI.rate(media._id, parseInt(rating));
      setRating('');
      onRate(); // Refresh the feed
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  const averageRating = media.ratings.length > 0
    ? (media.ratings.reduce((sum, r) => sum + r.value, 0) / media.ratings.length).toFixed(1)
    : 'No ratings';

  return (
    <div className="media-item">
      <div className="media-header">
        <img
          src={
            user?.profilePicture
              ? resolveMediaUrl(user.profilePicture)
              : '/default-avatar.svg'
          }
          alt="Profile"
          className="profile-pic"
        />

        <div className="user-info">
          <h4>{user?.firstName} {user?.lastName}</h4>
          <span className="post-time">{new Date(media.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <h4 className="media-title">{media.title}</h4>

      {media.mediaType === 'image' ? (
        <img
          src={resolveMediaUrl(media.fileUrl)}
          alt={media.title}
          onClick={handleView}
          className="media-content"
        />

      ) : (
        <video
          src={resolveMediaUrl(media.fileUrl)}
          controls
          onPlay={handleView}
          className="media-content"
        />

      )}

      <p className="media-caption">{media.caption}</p>

      <div className="media-meta">
        {media.location && (
          <div className="meta-item">
            <FaMapMarkerAlt />
            <span>{media.location}</span>
          </div>
        )}
        {media.people && media.people.length > 0 && (
          <div className="meta-item">
            <FaUsers />
            <span>{media.people.join(', ')}</span>
          </div>
        )}
        <div className="meta-item">
          <FaEye />
          <span>{media.views} views</span>
        </div>
        <div className="meta-item">
          <FaStar />
          <span>{averageRating} avg rating</span>
        </div>
      </div>

      <div className="rating-section">
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Rate (1-5)</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <button onClick={handleRate} disabled={!rating}>Submit Rating</button>
      </div>
    </div>
  );
}

export default MediaItem;