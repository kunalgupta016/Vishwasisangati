import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  photo: { type: String, required: false, default: '' }, // URL to the photo
  bio: { type: String, default: '' },
  order: { type: Number, default: 0 }, // For ordering team members
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
teamMemberSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

export default mongoose.model('TeamMember', teamMemberSchema);
