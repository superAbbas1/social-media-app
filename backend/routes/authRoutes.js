const express = require('express');
const router = express.Router();
const { signup, login, updateProfilePicture } = require('../controllers/authController');
// Use memory-storage multer middleware so files go to Azure via controller
const upload = require('../middleware/upload');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/update-profile-picture
router.post('/update-profile-picture', upload.single('profilePicture'), updateProfilePicture);

module.exports = router;