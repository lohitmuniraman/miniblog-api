
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const User = mongoose.model('User', UserSchema);
