import React, { useState, useEffect } from 'react';
import MediaItem from '../components/MediaItem';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { mediaAPI, analyticsAPI, authAPI } from '../services/api';

function Profile({ currentUser, onUserUpdate }) {
  const [userMedia, setUserMedia] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    loadUserMedia();
    loadAnalytics();
  }, [currentUser]);

  const loadUserMedia = async () => {
    try {
      const response = await mediaAPI.getAll();
      // Filter media by current user
      const filteredMedia = response.data.filter(media => media.userId._id === currentUser._id);
      setUserMedia(filteredMedia);
    } catch (error) {
      console.error('Error loading user media:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const response = await analyticsAPI.get(currentUser._id);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleProfilePictureUpdate = async () => {
    if (!profilePictureFile) {
      window.showToast('Please select a file first', 'error');
      return;
    }

    console.log('Starting profile picture update...');
    console.log('File selected:', profilePictureFile);
    console.log('User ID:', currentUser._id);

    setIsUpdatingProfile(true);
    const formData = new FormData();
    formData.append('profilePicture', profilePictureFile);

    try {
      console.log('Making API call to update profile picture...');
      const response = await authAPI.updateProfilePicture(formData, currentUser._id);
      console.log('API response:', response);
      onUserUpdate(response.data);
      setProfilePictureFile(null);
      window.showToast('Profile picture updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile picture:', error);
      console.error('Error details:', error.response?.data || error.message);
      window.showToast(`Error updating profile picture: ${error.response?.data?.error || error.message}`, 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-header">
          <img
            src={currentUser.profilePicture ? `http://localhost:5000${currentUser.profilePicture}` : '/default-avatar.svg'}
            alt="Profile"
            className="profile-pic-large"
          />
          <div className="profile-details">
            <h3>{currentUser.firstName} {currentUser.lastName}</h3>
            <p><strong>Email:</strong> {currentUser.email}</p>
          </div>
        </div>

        <div className="profile-picture-update">
          <h4>Update Profile Picture</h4>
          <div className="profile-picture-form">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              disabled={isUpdatingProfile}
            />
            <button
              onClick={handleProfilePictureUpdate}
              disabled={!profilePictureFile || isUpdatingProfile}
            >
              {isUpdatingProfile ? 'Updating...' : 'Update Picture'}
            </button>
          </div>
        </div>
      </div>

      <AnalyticsDashboard analytics={analytics} />

      <div className="user-media-section">
        <h3>Your Uploaded Media</h3>
        {userMedia.length > 0 ? (
          <div className="media-grid">
            {userMedia.map(media => (
              <MediaItem key={media._id} media={media} onRate={loadUserMedia} />
            ))}
          </div>
        ) : (
          <p className="no-media">You haven't uploaded any media yet. <a href="#post">Create your first post!</a></p>
        )}
      </div>
    </div>
  );
}

export default Profile;