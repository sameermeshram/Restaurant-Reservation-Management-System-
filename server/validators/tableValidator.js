import { body } from 'express-validator';

import validateRequest from '../middleware/validateRequest.js';

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export const validateCreateTable = [
  body('tableNumber')
    .exists({ checkFalsy: true })
    .withMessage('tableNumber is required.')
    .bail()
    .isString()
    .withMessage('tableNumber must be a string.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('tableNumber cannot be empty.'),
  body('capacity')
    .exists({ checkNull: true })
    .withMessage('capacity is required.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('capacity must be a number greater than 0.')
    .toInt(),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value.'),
  validateRequest,
];

export const validateUpdateTable = (req, res, next) => {
  const { tableNumber, capacity, isActive } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one field is required for update.',
    });
  }

  if (hasOwn(req.body, 'tableNumber')) {
    if (!tableNumber || String(tableNumber).trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'tableNumber cannot be empty.',
      });
    }
  }

  if (hasOwn(req.body, 'capacity')) {
    if (typeof capacity !== 'number' || capacity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'capacity must be a number greater than 0.',
      });
    }
  }

  if (hasOwn(req.body, 'isActive') && typeof isActive !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'isActive must be a boolean value.',
    });
  }

  next();
};
