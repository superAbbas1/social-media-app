import React, { useState } from 'react';
import { mediaAPI } from '../services/api';

function MediaUpload({ onUpload, currentUser }) {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    location: '',
    people: '',
    mediaType: 'image'
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || isUploading) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('title', formData.title);
    uploadData.append('caption', formData.caption);
    uploadData.append('location', formData.location);
    uploadData.append('people', formData.people);
    uploadData.append('mediaType', formData.mediaType);
    uploadData.append('userId', currentUser._id);

    console.log('Frontend: Preparing upload data', {
      title: formData.title,
      caption: formData.caption,
      location: formData.location,
      people: formData.people,
      mediaType: formData.mediaType,
      file: file.name
    });

    try {
      console.log('Frontend: Sending upload request');
      const response = await mediaAPI.upload(uploadData);
      console.log('Frontend: Upload successful', response.data);
      setFormData({
        title: '',
        caption: '',
        location: '',
        people: '',
        mediaType: 'image'
      });
      setFile(null);
      onUpload();
    } catch (error) {
      console.error('Frontend: Upload failed', error);
      console.error('Frontend: Error details', error.response?.data || error.message);
      window.showToast('Error uploading media', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="media-upload">
      <div className="upload-header">
        <h3>Create New Post</h3>
        <p>Share your moments with the world! Upload photos or videos with detailed information.</p>
      </div>

      {isUploading && (
        <div className="upload-loading">
          Uploading your post... Please wait while we process your content
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-section">
          <h4>Media Details</h4>
          <div className="form-group">
            <label>Media Type:</label>
            <select name="mediaType" value={formData.mediaType} onChange={handleChange} disabled={isUploading}>
              <option value="image">📸 Image</option>
              <option value="video">🎥 Video</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your post a catchy title..."
              required
              disabled={isUploading}
            />
          </div>

          <div className="form-group">
            <label>Caption:</label>
            <textarea
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Tell your story... What's happening in this moment?"
              rows="4"
              required
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Location & People</h4>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where was this taken? (e.g., New York City, Central Park)"
              required
              disabled={isUploading}
            />
          </div>

          <div className="form-group">
            <label>People in this post:</label>
            <input
              type="text"
              name="people"
              value={formData.people}
              onChange={handleChange}
              placeholder="Tag people (comma-separated, e.g., John Doe, Jane Smith)"
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Upload File</h4>
          <div className="form-group">
            <label>Choose your file:</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              required
              disabled={isUploading}
            />
            <small className="file-hint">
              Supported formats: JPG, PNG, GIF for images; MP4, WebM for videos. Max size: 50MB
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isUploading || !file} className="upload-submit-btn">
            {isUploading ? '🚀 Publishing...' : '📤 Publish Post'}
          </button>
        </div>
      </form>

      <div className="upload-tips">
        <h4>💡 Posting Tips</h4>
        <ul>
          <li>Use descriptive titles and captions to engage your audience</li>
          <li>Tag locations and people to help others discover your content</li>
          <li>Choose high-quality images/videos for better engagement</li>
          <li>Be authentic and share your unique perspective</li>
        </ul>
      </div>
    </div>
  );
}

export default MediaUpload;