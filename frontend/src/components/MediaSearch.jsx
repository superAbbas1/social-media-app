import React, { useState } from 'react';

function MediaSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Frontend: Submitting search for:', query);
    onSearch(query);
  };

  return (
    <div className="media-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title, location, or people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default MediaSearch;