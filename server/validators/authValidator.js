import { body } from 'express-validator';

import validateRequest from '../middleware/validateRequest.js';

export const validateRegister = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('name is required.')
    .bail()
    .isString()
    .withMessage('name must be a string.')
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('name must be between 2 and 50 characters.'),
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('email is required.')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .bail()
    .normalizeEmail(),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('password is required.')
    .bail()
    .isString()
    .withMessage('password must be a string.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  body('role')
    .optional()
    .isIn(['customer', 'admin'])
    .withMessage('Role must be either customer or admin.'),
  validateRequest,
];

export const validateLogin = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('email is required.')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .bail()
    .normalizeEmail(),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('password is required.')
    .bail()
    .isString()
    .withMessage('password must be a string.'),
  validateRequest,
];
