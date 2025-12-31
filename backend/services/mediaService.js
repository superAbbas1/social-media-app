const Media = require('../models/Media');

class MediaService {
  // Get all media
  async getAllMedia() {
    return await Media.find().populate('userId', 'firstName lastName profilePicture').sort({ createdAt: -1 });
  }

  // Get media by ID
  async getMediaById(id) {
    return await Media.findById(id);
  }

  // Create new media
  async createMedia(mediaData) {
    console.log('Service: Creating media', mediaData);
    const media = new Media(mediaData);
    console.log('Service: Media object created', media);
    const savedMedia = await media.save();
    console.log('Service: Media saved to DB', savedMedia._id);
    return savedMedia;
  }

  // Search media
  async searchMedia(query) {
    console.log('Service: Searching for:', query);
    const searchRegex = new RegExp(query, 'i');
    const results = await Media.find({
      $or: [
        { title: searchRegex },
        { caption: searchRegex },
        { location: searchRegex },
        { people: { $regex: searchRegex } }
      ]
    }).populate('userId', 'firstName lastName profilePicture').sort({ createdAt: -1 });
    console.log('Service: Found', results.length, 'results');
    return results;
  }

  // Increment view count
  async incrementView(id) {
    return await Media.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
  }

  // Add rating
  async addRating(id, ratingValue) {
    const media = await Media.findById(id);
    if (!media) throw new Error('Media not found');

    media.ratings.push({ value: ratingValue });
    return await media.save();
  }

  // Get analytics data for a user
  async getAnalytics(userId) {
    const media = await Media.find({ userId });
    const totalMedia = media.length;
    const totalViews = media.reduce((sum, m) => sum + m.views, 0);
    const totalRatings = media.reduce((sum, m) => sum + m.ratings.length, 0);
    const averageRating = totalRatings > 0 ? media.reduce((sum, m) => sum + (m.averageRating || 0), 0) / totalMedia : 0;

    const mediaTypeDistribution = media.reduce((dist, m) => {
      dist[m.mediaType] = (dist[m.mediaType] || 0) + 1;
      return dist;
    }, {});

    return {
      totalMedia,
      totalViews,
      totalRatings,
      averageRating: averageRating.toFixed(2),
      mediaTypeDistribution
    };
  }
}

module.exports = new MediaService();