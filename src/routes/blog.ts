
import express from 'express';
import { authenticate } from '../middleware/auth';
import { createBlog, getBlog, listBlogs, updateBlog } from '../controllers/blogController';
const router = express.Router();

router.post('/blog', authenticate, createBlog)
router.get('/blog', authenticate, listBlogs)
router.get('/blog/:blogId', authenticate, getBlog)
router.patch('/blog', authenticate, updateBlog)

export default router;
