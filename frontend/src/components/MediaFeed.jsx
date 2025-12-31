import React from 'react';
import MediaItem from './MediaItem';

function MediaFeed({ media, onRate }) {
  return (
    <div className="media-feed">
      <h3>Media Feed</h3>
      {media.length === 0 ? (
        <p>No media found.</p>
      ) : (
        <div className="media-grid">
          {media.map((item) => (
            <MediaItem key={item._id} media={item} onRate={onRate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaFeed;