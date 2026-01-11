const express = require('express');
const router = express.Router();

// Multer middleware exported from controller (memory storage for Azure Blob)
const { upload } = require('../controllers/mediaController');

// Controllers
const {
  getAllMedia,
  uploadMedia,
  searchMedia,
  incrementView,
  addRating
} = require('../controllers/mediaController');

// GET /api/media - Get all media
router.get('/', getAllMedia);

// POST /api/media - Upload media (image/video)
router.post('/', upload.single('file'), uploadMedia);

// GET /api/media/search - Search media
router.get('/search', searchMedia);

// POST /api/media/:id/view - Increment view count
router.post('/:id/view', incrementView);

// POST /api/media/:id/rate - Add rating
router.post('/:id/rate', addRating);

module.exports = router;