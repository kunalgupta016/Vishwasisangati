import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/signup — Create the first admin account (Public, but only works if no admins exist)
router.post('/signup', async (req, res) => {
  try {
    // Check if any admins already exist
    const adminCount = await User.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ error: 'Initial setup is already complete. Please ask an existing admin to create an account for you.' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message || 'Failed to create account' });
  }
});

// GET /api/auth/admins — Admin only: list all admins
router.get('/admins', verifyToken, async (req, res) => {
  try {
    const admins = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ data: admins });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// POST /api/auth/admins — Admin only: create a new admin
router.post('/admins', verifyToken, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: 'Admin created successfully', data: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// DELETE /api/auth/admins/:id — Admin only: delete an admin
router.delete('/admins/:id', verifyToken, async (req, res) => {
  try {
    const adminIdToDelete = req.params.id;
    
    // Prevent an admin from deleting themselves
    if (adminIdToDelete === req.user.id.toString()) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    const result = await User.findByIdAndDelete(adminIdToDelete);
    if (!result) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

// POST /api/auth/login — Login and return JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// GET /api/auth/me — Verify token and return user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
