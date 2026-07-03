import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from './asyncHandler.js';

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
};

export const protect = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new AppError('Authentication required', 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError('Server authentication is not configured', 500);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError('Invalid token user', 401);
  }

  req.user = user;
  next();
});

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Authentication required', 401));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new AppError('Forbidden: insufficient permissions', 403));
  }

  next();
};
