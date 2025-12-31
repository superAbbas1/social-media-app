import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API
export const authAPI = {
  signup: (userData) => {
    console.log('API: Signing up user', userData);
    return api.post('/auth/signup', userData);
  },
  login: (credentials) => {
    console.log('API: Logging in user', credentials);
    return api.post('/auth/login', credentials);
  },
  updateProfilePicture: (formData, userId) => {
    console.log('API: Updating profile picture for user', userId);
    return api.post(`/auth/update-profile-picture?userId=${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Media API
export const mediaAPI = {
  getAll: () => {
    console.log('API: Fetching all media');
    return api.get('/media');
  },
  upload: (formData) => {
    console.log('API: Uploading media', formData);
    return api.post('/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  search: (query) => {
    console.log('API: Searching media', query);
    return api.get(`/media/search?q=${query}`);
  },
  view: (id) => {
    console.log('API: Incrementing view for', id);
    return api.post(`/media/${id}/view`);
  },
  rate: (id, rating) => {
    console.log('API: Rating media', id, rating);
    return api.post(`/media/${id}/rate`, { rating });
  },
};

// Analytics API
export const analyticsAPI = {
  get: (userId) => {
    console.log('API: Getting analytics for user', userId);
    return api.get(`/analytics?userId=${userId}`);
  },
};

export default api;