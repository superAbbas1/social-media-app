const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllMedia,
  uploadMedia,
  searchMedia,
  incrementView,
  addRating
} = require('../controllers/mediaController');

router.get('/', getAllMedia);
router.post('/', upload.single('file'), uploadMedia);
router.get('/search', searchMedia);
router.post('/:id/view', incrementView);
router.post('/:id/rate', addRating);

module.exports = router;