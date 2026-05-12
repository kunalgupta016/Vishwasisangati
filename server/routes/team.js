import express from 'express';
import TeamMember from '../models/TeamMember.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/team - Get all active team members
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json({ data: teamMembers });
  } catch (error) {
    console.error('Fetch team members error:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// GET /api/team/all - Get all team members (admin only)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ order: 1 });
    res.json({ data: teamMembers });
  } catch (error) {
    console.error('Fetch all team members error:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// POST /api/team - Create new team member (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, position, photo, bio, order } = req.body;

    if (!name?.trim() || !position?.trim()) {
      return res.status(400).json({ error: 'Name and position are required' });
    }

    const teamMember = new TeamMember({
      name: name.trim(),
      position: position.trim(),
      photo: photo || '',
      bio: bio || '',
      order: Number.isFinite(Number(order)) ? Number(order) : 0
    });
    await teamMember.save();
    res.status(201).json({ message: 'Team member created successfully', data: teamMember });
  } catch (error) {
    console.error('Create team member error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Failed to create team member' });
  }
});

// PUT /api/team/:id - Update team member (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, position, photo, bio, order, isActive } = req.body;

    if (!name?.trim() || !position?.trim()) {
      return res.status(400).json({ error: 'Name and position are required' });
    }

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        position: position.trim(),
        photo: photo || '',
        bio: bio || '',
        order: Number.isFinite(Number(order)) ? Number(order) : 0,
        isActive,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json({ message: 'Team member updated successfully', data: teamMember });
  } catch (error) {
    console.error('Update team member error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Failed to update team member' });
  }
});

// DELETE /api/team/:id - Delete team member (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router;
