const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const mediaRoutes = require('./routes/mediaRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', (req, res, next) => {
  console.log('App: Media route accessed', req.method, req.path);
  next();
}, mediaRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Social Media API is running' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;