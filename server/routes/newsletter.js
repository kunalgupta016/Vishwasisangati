import express from 'express';
import Newsletter from '../models/Newsletter.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/newsletter/subscribe — Public: subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({ message: 'Email already subscribed' });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Newsletter subscribe error:', error.message);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// GET /api/newsletter/subscribers — Admin only: get all subscribers
router.get('/subscribers', verifyToken, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({
      data: subscribers.map(s => ({
        key: s._id,
        value: {
          email: s.email,
          subscribedAt: s.subscribedAt,
          status: s.status
        }
      })),
      count: subscribers.length
    });
  } catch (error) {
    console.error('Get subscribers error:', error.message);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

export default router;
