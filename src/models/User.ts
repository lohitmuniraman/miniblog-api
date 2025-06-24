
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  resetPassword: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
