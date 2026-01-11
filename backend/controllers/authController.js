const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '7d' }
  );
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Stricter Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com'];
    const domain = email.split('@')[1];
    if (disposableDomains.includes(domain)) {
      return res.status(400).json({ message: 'Disposable emails are not allowed' });
    }

    // Stricter Password Validation
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      return res.status(400).json({ message: 'Password must contain uppercase, lowercase and numbers' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    
    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { name, email, sub: googleId, picture } = ticket.getPayload();
    
    let user = await User.findOne({ email });
    
    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.profilePicture = picture || user.profilePicture;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        profilePicture: picture,
        isVerified: true
      });
    }
    
    const token = generateToken(user);
    
    res.json({
      success: true,
      message: 'Google Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Google authentication failed' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, updatedAt: Date.now() },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
