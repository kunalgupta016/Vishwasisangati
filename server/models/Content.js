import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
contentSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

export default mongoose.model('Content', contentSchema);
