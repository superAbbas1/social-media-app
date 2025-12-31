const mediaService = require('../services/mediaService');

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const analytics = await mediaService.getAnalytics(userId);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAnalytics
};