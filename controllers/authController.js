import { JWT_SECRET } from '../config/env.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Author from '../models/authorModel.js';

export async function signup (req, res) {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    hashedPassword: req.body.password,
  };
  let existingUser = await User.findOne({ email: newUser.email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(newUser.hashedPassword, 10);
  newUser.hashedPassword = hashedPassword;

  const newAuthor = {
    username: newUser.username,
  }
  const author = await Author.create(newAuthor);
  newUser.authorId = author._id;

  const user = await User.create(newUser);

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 3600000,
  });

  res.status(201).json({ message: 'Signup successful', status: "ok", userDetails: newUser});
}

export async function login (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 3600000,
  });

  res.status(200).json({ message: 'Logged in successfully', status: "ok", userDetails: user});
}

export function logout (req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(200).json({ message: 'Logged out successfully' });
}