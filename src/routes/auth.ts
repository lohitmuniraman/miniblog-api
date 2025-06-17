
import express from 'express';
import { login, profile, register, userList } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/userList', authenticate, userList);
router.get('/profile', authenticate, profile);

export default router;
