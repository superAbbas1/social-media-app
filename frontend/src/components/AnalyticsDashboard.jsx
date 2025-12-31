import React from 'react';

function AnalyticsDashboard({ analytics }) {
  return (
    <div className="analytics-dashboard">
      <h3>Analytics Dashboard</h3>
      <div className="analytics-grid">
        <div className="analytics-item">
          <h4>Total Media</h4>
          <p>{analytics.totalMedia || 0}</p>
        </div>
        <div className="analytics-item">
          <h4>Total Views</h4>
          <p>{analytics.totalViews || 0}</p>
        </div>
        <div className="analytics-item">
          <h4>Total Ratings</h4>
          <p>{analytics.totalRatings || 0}</p>
        </div>
        <div className="analytics-item">
          <h4>Average Rating</h4>
          <p>{analytics.averageRating || 0}</p>
        </div>
        <div className="analytics-item">
          <h4>Media Type Distribution</h4>
          <p>Images: {analytics.mediaTypeDistribution?.image || 0}</p>
          <p>Videos: {analytics.mediaTypeDistribution?.video || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;