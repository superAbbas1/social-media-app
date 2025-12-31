import React from 'react';

function MediaList({ media }) {
  return (
    <div className="media-list">
      <h3>Your Uploaded Media</h3>
      {media.length === 0 ? (
        <p>No media uploaded yet.</p>
      ) : (
        <ul>
          {media.map((item) => (
            <li key={item._id}>
              <strong>{item.title}</strong> - {item.mediaType} - Views: {item.views} - Avg Rating: {
                item.ratings.length > 0
                  ? (item.ratings.reduce((sum, r) => sum + r.value, 0) / item.ratings.length).toFixed(1)
                  : 'N/A'
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MediaList;