const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analyticsController');

// GET /api/analytics - Get analytics data
router.get('/', getAnalytics);

module.exports = router;