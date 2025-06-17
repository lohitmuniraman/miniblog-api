
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, username });
  
  res.status(201).json({ user: { username: user.username, email: user.email } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' })

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  res.json({ token, user: { username: user.username, email: user.email, userId: user._id } });
};

export const userList = async (req: Request, res: Response) => {
  const users = await User.find()

  res.json(users.map(user => ({ email: user.email, username: user.username, userId: user._id })))
}

export const profile = async (req: Request, res: Response) => {
  // @ts-expect-error reading user from req
  const userId = req?.user?.id

  const user = await User.findOne({ _id: userId })
  res.json({ username: user?.username, email: user?.email })
}