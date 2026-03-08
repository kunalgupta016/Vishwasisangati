import express from 'express';
import Content from '../models/Content.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Default content
const defaultHeroContent = {
  badge: "Transforming Lives Since 2009",
  title: "Serving Hope To",
  highlightText: "Rural Communities",
  subtitle: "of India",
  description: "Empowering vulnerable communities through education, healthcare, and sustainable development. Together, we're building a brighter future.",
  mainImage: "https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBydXJhbCUyMGRldmVsb3BtZW50JTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjcxMjI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  backgroundImage: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMEluZGlhbiUyMGNoaWxkcmVuJTIwcGxheWluZyUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNzEyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
};

const defaultAboutUsContent = {
  paragraph1: "At Vishwasi Sangati, we believe in people-driven change. Rooted in India since 1994, we work hand-in-hand with the unreached rural communities to alleviate poverty through education, health, and empowerment initiatives for the vulnerable.",
  paragraph2: "From schools and childcare centers to medical camps, sewing workshops, and nutrition campaigns, our mission is simple yet powerful: to equip every child, woman, and family with the tools to live with dignity.",
  quote: "Vishwasi Sangati is a community-led, grassroots organisation founded by a group of pioneers like Late Dr. Emil Jebasingh, Mr. P. Selvaraj and others with a shared vision—to uplift vulnerable rural communities across India.",
  paragraph3: "By empowering youth, women, and local groups, we not only bring development to the doorstep, but ensure it is owned, sustained, and carried forward by the community itself.",
  conclusion: "Through engagement, education, and empathy, we are working together to build a stronger, more resilient India.",
  image: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMEluZGlhbiUyMGNoaWxkcmVuJTIwcGxheWluZyUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNzEyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
};

// GET /api/content/hero
router.get('/hero', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'hero' });
    res.json({ data: content ? content.value : defaultHeroContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero content' });
  }
});

// PUT /api/content/hero (admin only)
router.put('/hero', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'hero' },
      { key: 'hero', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Hero content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update hero content' });
  }
});

// GET /api/content/about-us
router.get('/about-us', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'about-us' });
    res.json({ data: content ? content.value : defaultAboutUsContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about us content' });
  }
});

// PUT /api/content/about-us (admin only)
router.put('/about-us', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'about-us' },
      { key: 'about-us', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'About Us content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update about us content' });
  }
});

// GET /api/content/impact-stats
router.get('/impact-stats', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'impact-stats' });
    res.json({ data: content ? content.value : [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch impact stats' });
  }
});

// PUT /api/content/impact-stats (admin only)
router.put('/impact-stats', verifyToken, async (req, res) => {
  try {
    const { stats } = req.body;
    if (!Array.isArray(stats)) {
      return res.status(400).json({ error: 'Stats must be an array' });
    }
    await Content.findOneAndUpdate(
      { key: 'impact-stats' },
      { key: 'impact-stats', value: stats },
      { upsert: true, new: true }
    );
    res.json({ message: 'Impact stats updated successfully', data: stats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update impact stats' });
  }
});

// GET /api/content/impact-stories
router.get('/impact-stories', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'impact-stories' });
    res.json({ data: content ? content.value : [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch impact stories' });
  }
});

// PUT /api/content/impact-stories (admin only)
router.put('/impact-stories', verifyToken, async (req, res) => {
  try {
    const { stories } = req.body;
    if (!Array.isArray(stories)) {
      return res.status(400).json({ error: 'Stories must be an array' });
    }
    await Content.findOneAndUpdate(
      { key: 'impact-stories' },
      { key: 'impact-stories', value: stories },
      { upsert: true, new: true }
    );
    res.json({ message: 'Impact stories updated successfully', data: stories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update impact stories' });
  }
});

export default router;
