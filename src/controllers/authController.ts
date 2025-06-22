
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { email, password, username, name, isAdmin } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, username, name, isAdmin });

  res.status(201).json({ user: { username: user.username, email: user.email } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' })

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const userData = { userId: user._id, username: user.username, name: user.name, email: user.email, isAdmin: user.isAdmin, resetPassword: user.resetPassword };

  const token = jwt.sign(userData, process.env.JWT_SECRET!, { expiresIn: '24h' });
  res.json({ token, user: userData });
};

export const userList = async (req: Request, res: Response) => {
  const users = await User.find()

  res.json(users.map(user => ({ userId: user._id, email: user.email, username: user.username, name: user.name, createdAt: user.createdAt, isAdmin: user.isAdmin })));
}

export const updateUser = async (req: Request, res: Response) => {
  // @ts-expect-error reading user from req
  const isAdmin = req?.user?.isAdmin

  if (!isAdmin) return res.status(403).json({ message: 'Unauthorized access' });
  const { userId, name, username, email, resetPassword } = req.body;

  const updateResponse = await User.updateOne({ _id: userId }, { username, name, email, resetPassword });
  if (!updateResponse.matchedCount) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User updated successfully' });
}

export const profile = async (req: Request, res: Response) => {
  // @ts-expect-error reading user from req
  const userId = req.params.userId || req?.user?.userId

  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const userData = { userId: user._id, username: user.username, name: user.name, email: user.email, isAdmin: user.isAdmin, resetPassword: user.resetPassword };
  res.json(userData);
}
