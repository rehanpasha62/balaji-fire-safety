import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public (should be protected in production)
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id)
      });
    }
  } catch (error) {
    console.error('❌ Register Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      console.log('❌ Login failed: Missing username or password');
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    console.log('🔍 Attempting login for username:', username);

    // Check for admin (must include +password since it's not selected by default)
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin) {
      console.log('❌ Login failed: Admin not found with username:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('✅ Admin found:', admin.username);

    // Verify password
    const isPasswordMatch = await admin.matchPassword(password);
    console.log('🔐 Password match result:', isPasswordMatch);

    if (isPasswordMatch) {
      console.log('✅ Login successful for:', username);
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id)
      });
    } else {
      console.log('❌ Login failed: Invalid password for username:', username);
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('❌ Get Profile Error:', error);
    res.status(500).json({ message: error.message });
  }
};
