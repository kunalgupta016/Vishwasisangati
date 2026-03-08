import express from 'express';
import Contact from '../models/Contact.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact/submit — Public: submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact submit error:', error.message);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// GET /api/contact/all — Admin only: get all contact submissions
router.get('/all', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      data: contacts.map(c => ({
        key: c._id,
        value: {
          name: c.name,
          email: c.email,
          phone: c.phone,
          message: c.message,
          timestamp: c.createdAt,
          status: c.status
        }
      }))
    });
  } catch (error) {
    console.error('Get contacts error:', error.message);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

export default router;
