const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, login, updateProfilePicture } = require('../controllers/authController');

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/update-profile-picture
router.post('/update-profile-picture', upload.single('profilePicture'), updateProfilePicture);

module.exports = router;