import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export const registerUser = async (payload) => {
  const { name, email, password, role } = payload;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError('Email is already registered', 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    throw new AppError('Invalid email or password', 401);
  }

  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};
