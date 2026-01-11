const User = require('../models/User');
const uploadToBlob = require('../utils/blob');

// Signup
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password // In production, hash this!
    });

    const savedUser = await user.save();
    res.status(201).json({
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      profilePicture: savedUser.profilePicture
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email, password }); // In production, compare hashed password
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Profile Picture
const updateProfilePicture = async (req, res) => {
  try {
    console.log('Update profile picture request received');
    console.log('Query:', req.query);
    console.log('File:', req.file);
    console.log('Body:', req.body);

    const { userId } = req.query;

    if (!userId) {
      console.log('No userId provided');
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Finding user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Upload profile picture to Azure Blob Storage
    console.log('authController: calling uploadToBlob for profile picture:', req.file.originalname);
    const blobUrl = await uploadToBlob(req.file);
    console.log('authController: uploadToBlob returned URL:', blobUrl);

    user.profilePicture = blobUrl;
    console.log('Saving user with new profile picture (blob):', user.profilePicture);
    await user.save();

    console.log('Profile picture updated successfully');
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Error in updateProfilePicture:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  updateProfilePicture
};