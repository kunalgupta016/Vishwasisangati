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

// --- Navbar ---
const defaultNavbarContent = {
  menuItems: [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/#about" },
    { label: "Core Initiatives", href: "/#initiatives" },
    { label: "Impact Stories", href: "/#stories" },
    { label: "Contact", href: "/#contact" }
  ]
};

router.get('/navbar', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'navbar' });
    res.json({ data: content ? content.value : defaultNavbarContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch navbar content' });
  }
});

router.put('/navbar', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'navbar' },
      { key: 'navbar', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Navbar content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update navbar content' });
  }
});

// --- Vision & Mission ---
const defaultVisionMissionContent = {
  sectionSubtitle: "Who We Are",
  sectionTitle: "Our Vision & Mission",
  sectionDescription: "Driven by compassion, guided by purpose",
  visionText: "A resilient India where every child, woman, and family lives with dignity, opportunity, and hope for a brighter tomorrow.",
  missionParagraph1: "To alleviate poverty and uplift vulnerable rural communities by providing access to education, healthcare, and sustainable livelihoods.",
  missionParagraph2: "Through women's empowerment, youth engagement, and community-led initiatives, we nurture people-driven change that is owned, sustained, and carried forward by the communities themselves.",
  missionHighlight: "From schools and childcare centers to medical camps, sewing workshops, and nutrition campaigns—we equip every child, woman, and family with the tools to live with dignity.",
  coreValues: [
    { label: "Compassion", emoji: "❤️" },
    { label: "Integrity", emoji: "🤝" },
    { label: "Empowerment", emoji: "💪" },
    { label: "Sustainability", emoji: "🌱" }
  ]
};

router.get('/vision-mission', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'vision-mission' });
    res.json({ data: content ? content.value : defaultVisionMissionContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vision-mission content' });
  }
});

router.put('/vision-mission', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'vision-mission' },
      { key: 'vision-mission', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Vision & Mission content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vision-mission content' });
  }
});

// --- Our Work ---
const defaultOurWorkContent = {
  sectionSubtitle: "Core Initiatives",
  sectionTitle: "Our Work",
  sectionDescription: "We focus on three key areas to create meaningful and lasting impact in communities",
  programs: [
    {
      title: "Education Program",
      description: "Providing quality education through 27 evening tuition centers and 2 educational institutions, enrolling 610+ children and supporting 415 students in schools.",
      image: "https://images.unsplash.com/photo-1771765780945-c788a6ce4b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3MjcxMTY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "GraduationCap",
      stats: "610+ Children",
      color: "#0F6B6B"
    },
    {
      title: "Healthcare Initiative",
      description: "Delivering essential healthcare through 10 Primary Health Centers, medical camps across 36 villages, and distributing 12,000+ vitamin tablets across 6 states.",
      image: "https://images.unsplash.com/photo-1710074213374-e68503a1b795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGNsaW5pYyUyMEluZGlhfGVufDF8fHx8MTc3MjcxMTY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "Stethoscope",
      stats: "19,389 Visits",
      color: "#E87D3E"
    },
    {
      title: "Community Development",
      description: "Empowering 62 communities through relief & rehabilitation, women's skill training for 465+ women, and tribal education programs for Chenchu tribal children.",
      image: "https://images.unsplash.com/photo-1769366056117-e1c3dceee209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMHJ1cmFsJTIwdmlsbGFnZXxlbnwxfHx8fDE3NzI3MTE2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "Users",
      stats: "62 Communities",
      color: "#0F6B6B"
    }
  ]
};

router.get('/our-work', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'our-work' });
    res.json({ data: content ? content.value : defaultOurWorkContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch our-work content' });
  }
});

router.put('/our-work', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'our-work' },
      { key: 'our-work', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Our Work content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update our-work content' });
  }
});

// --- Testimonials ---
const defaultTestimonialsContent = {
  sectionSubtitle: "Testimonials",
  sectionTitle: "What People Say",
  sectionDescription: "Hear from our volunteers and community members about their experiences",
  testimonials: [
    {
      quote: "Volunteering with Vishwasi Sangati has been the most rewarding experience of my life. Seeing the direct impact of our work in communities is truly inspiring.",
      name: "Priya Sharma",
      role: "Volunteer since 2023",
      image: "https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzI3MTA2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    },
    {
      quote: "The education program has transformed our village. Children now have access to quality learning resources and a brighter future ahead.",
      name: "Rajesh Kumar",
      role: "Community Leader",
      image: "https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzI3MDExNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    },
    {
      quote: "Being part of the healthcare initiative has allowed me to contribute my medical skills to those who need it most. It's deeply fulfilling work.",
      name: "Dr. Anjali Verma",
      role: "Medical Volunteer",
      image: "https://images.unsplash.com/photo-1765648684555-de2d0f6af467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMHdvbWFuJTIwaGFwcHl8ZW58MXx8fHwxNzcyNzExNjU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    }
  ]
};

router.get('/testimonials', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'testimonials' });
    res.json({ data: content ? content.value : defaultTestimonialsContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials content' });
  }
});

router.put('/testimonials', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'testimonials' },
      { key: 'testimonials', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Testimonials content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonials content' });
  }
});

// --- Featured Project ---
const defaultFeaturedProjectContent = {
  sectionSubtitle: "Spotlight",
  sectionTitle: "Featured Project",
  sectionDescription: "Discover our flagship initiative making a tangible difference",
  title: "Poshan Maa — Nutrition Initiative",
  description: "Our flagship nutrition program providing balanced meals to children and mothers across rural communities. Through Poshan Maa, we've served over 15,876 nutrition meals, combating malnutrition and ensuring healthy growth for the next generation. This initiative spans across multiple states, reaching the most vulnerable families.",
  image: "https://images.unsplash.com/photo-1733809701005-0b1c0ad53c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwcHJvamVjdCUyMGhlbHBpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzcyNzExNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  stats: [
    { icon: "MapPin", label: "6 States" },
    { icon: "Users", label: "15,876+ Meals" },
    { icon: "Heart", label: "194 Children in Care" }
  ],
  ctaText: "Support This Project"
};

router.get('/featured-project', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'featured-project' });
    res.json({ data: content ? content.value : defaultFeaturedProjectContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured project content' });
  }
});

router.put('/featured-project', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'featured-project' },
      { key: 'featured-project', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Featured project content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update featured project content' });
  }
});

// --- Footer ---
const defaultFooterContent = {
  description: "Empowering communities through dedicated service, sustainable development, and compassionate action since 2009.",
  address: "Plot No: 193 & 194, Vishwa Vani Building Road No.2, Bhaagvan Colony, Chakripuram, ECIL - Post Hyderabad",
  email: "vishwasisangati@gmail.com",
  phone: "+91 98480 51358",
  socialLinks: [
    { platform: "Facebook", url: "#" },
    { platform: "Twitter", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "Linkedin", url: "#" }
  ],
  quickLinks: [
    { label: "About Us", href: "#about" },
    { label: "Our Mission", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Careers", href: "#careers" },
    { label: "Blog", href: "#blog" }
  ],
  programs: [
    { label: "Education", href: "#education" },
    { label: "Healthcare", href: "#healthcare" },
    { label: "Community Development", href: "#development" },
    { label: "Women Empowerment", href: "#women" },
    { label: "Skill Training", href: "#training" }
  ],
  donateCta: {
    title: "Make a Difference Today",
    description: "Your contribution can change lives. Join us in our mission to build stronger, healthier communities."
  },
  copyright: "© 2026 Vishwasi Sangati. All rights reserved."
};

router.get('/footer', async (req, res) => {
  try {
    const content = await Content.findOne({ key: 'footer' });
    res.json({ data: content ? content.value : defaultFooterContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch footer content' });
  }
});

router.put('/footer', verifyToken, async (req, res) => {
  try {
    await Content.findOneAndUpdate(
      { key: 'footer' },
      { key: 'footer', value: req.body },
      { upsert: true, new: true }
    );
    res.json({ message: 'Footer content updated successfully', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update footer content' });
  }
});

export default router;
