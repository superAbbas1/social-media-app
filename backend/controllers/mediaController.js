const { BlobServiceClient } = require("@azure/storage-blob");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

const mediaService = require('../services/mediaService');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|mp4/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get all media
const getAllMedia = async (req, res) => {
  try {
    const media = await mediaService.getAllMedia();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload media
const uploadMedia = async (req, res) => {
  console.log('Backend: Upload request received');
  console.log('Backend: Request body', req.body);
  console.log('Backend: Request file', req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const blobName =
      uuidv4() + path.extname(req.file.originalname);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype
      }
    });

    const mediaUrl = blockBlobClient.url;

    const media = new Media({
      title: req.body.title,
      caption: req.body.caption,
      location: req.body.location,
      people: req.body.people,
      mediaUrl,
      mediaType: req.file.mimetype.startsWith("video") ? "video" : "image"
    });

    await media.save();

    res.status(201).json(media);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Search media
const searchMedia = async (req, res) => {
  try {
    const { q } = req.query;
    console.log('Backend: Search request for query:', q);

    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const media = await mediaService.searchMedia(q);
    console.log('Backend: Search results count:', media.length);

    res.json(media);
  } catch (error) {
    console.error('Backend: Search error', error);
    res.status(500).json({ error: error.message });
  }
};

// Increment view
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

// Add rating
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