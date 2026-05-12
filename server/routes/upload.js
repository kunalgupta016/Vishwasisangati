import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/auth.js';
import Media from '../models/Media.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed'));
    }
    cb(null, true);
  }
});
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.set('Content-Type', media.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(media.data);
  } catch (error) {
    res.status(404).json({ error: 'Media not found' });
  }
});

router.post('/', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const media = await Media.create({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
      size: req.file.size
    });

    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://vishwasisangati.onrender.com'
      : `${req.protocol}://${req.get('host')}`;

    res.json({ url: `${baseUrl}/api/upload/${media._id}` });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Failed to upload media' });
  }
});

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Image must be smaller than 5MB' });
  }

  res.status(400).json({ error: error.message || 'Upload failed' });
});

export default router;
