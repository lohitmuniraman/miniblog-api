
import express from 'express';
import { login, profile, register, updateUser, userList } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, userList);
router.get('/user', authenticate, profile);
router.get('/user/:userId', authenticate, profile);
router.patch('/user', authenticate, updateUser);

export default router;
