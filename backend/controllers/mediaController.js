const mongoose = require('mongoose');
const multer = require('multer');
const Media = require('../models/Media');
const mediaService = require('../services/mediaService');
const uploadToBlob = require('../utils/blob');

// Define multer upload here and export it so routes import from controller
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// ===============================
// GET ALL MEDIA
// ===============================
const getAllMedia = async (req, res) => {
  try {
    const media = await mediaService.getAllMedia();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// UPLOAD MEDIA (AZURE BLOB ONLY)
// ===============================
const uploadMedia = async (req, res) => {
  console.log('Backend: Upload request received (mediaController)');

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const {
      userId,
      title,
      caption,
      location,
      people
    } = req.body;

    if (!userId || !caption || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Upload file to Azure Blob Storage
    console.log('mediaController: calling uploadToBlob for file:', req.file.originalname);
    const fileUrl = await uploadToBlob(req.file);
    console.log('mediaController: uploadToBlob returned URL:', fileUrl);

    const media = await Media.create({
      userId: new mongoose.Types.ObjectId(userId),
      title,
      caption,
      location,
      people: people || [],
      fileUrl,
      mediaType: req.file.mimetype.startsWith('video') ? 'video' : 'image'
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

// ===============================
// SEARCH MEDIA
// ===============================
const searchMedia = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const media = await mediaService.searchMedia(q);
    res.json(media);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// INCREMENT VIEW
// ===============================
const incrementView = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await mediaService.incrementView(id);

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ADD RATING
// ===============================
const addRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const media = await mediaService.addRating(id, rating);
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMedia,
  uploadMedia,
  searchMedia,
  incrementView,
  addRating,
  upload
};
