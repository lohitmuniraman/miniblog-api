
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    title: { type: String, required: true }
}, { timestamps: true });

export const Blog = mongoose.model('Blog', BlogSchema);
