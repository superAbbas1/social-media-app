const express = require('express');
const router = express.Router();
const {
  getAllMedia,
  uploadMedia,
  searchMedia,
  incrementView,
  addRating,
  upload
} = require('../controllers/mediaController');

// GET /api/media - Get all media
router.get('/', getAllMedia);

// POST /api/media - Upload media
router.post('/', upload.single('file'), (req, res, next) => {
  console.log('Route: Upload route hit');
  next();
}, uploadMedia);

// GET /api/media/search - Search media
router.get('/search', searchMedia);

// POST /api/media/:id/view - Increment view count
router.post('/:id/view', incrementView);

// POST /api/media/:id/rate - Add rating
router.post('/:id/rate', addRating);

module.exports = router;