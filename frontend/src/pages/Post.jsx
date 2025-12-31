import React, { useState } from 'react';
import MediaUpload from '../components/MediaUpload';
import { mediaAPI } from '../services/api';

function Post({ currentUser }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate upload delay for demo
    setTimeout(() => {
      setIsUploading(false);
      window.showToast('Media uploaded successfully!', 'success');
    }, 1000);
  };

  return (
    <div className="post">
      <h2>Create New Post</h2>
      {isUploading && <div className="upload-loading">Uploading your content...</div>}
      <MediaUpload onUpload={handleUpload} currentUser={currentUser} />
    </div>
  );
}

export default Post;