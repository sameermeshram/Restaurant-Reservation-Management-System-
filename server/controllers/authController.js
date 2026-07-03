import asyncHandler from '../middleware/asyncHandler.js';
import * as authService from '../services/authService.js';

const mapUserResponse = (userDoc) => ({
  id: userDoc._id,
  name: userDoc.name,
  email: userDoc.email,
  role: userDoc.role,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  const accessToken = user.generateAccessToken();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: mapUserResponse(user),
      accessToken,
      tokenType: 'Bearer',
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(req.body);
  const accessToken = user.generateAccessToken();

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: mapUserResponse(user),
      accessToken,
      tokenType: 'Bearer',
    },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user._id);

  res.status(200).json({
    success: true,
    data: {
      user: mapUserResponse(user),
    },
  });
});

export const getAdminResource = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin resource accessed successfully',
  });
});
