import { body } from 'express-validator';

import validateRequest from '../middleware/validateRequest.js';

export const validateCreateReservation = [
  body('reservationDate')
    .exists({ checkFalsy: true })
    .withMessage('reservationDate is required.')
    .bail()
    .isISO8601()
    .withMessage('reservationDate must be a valid date.'),
  body('timeSlot')
    .exists({ checkFalsy: true })
    .withMessage('timeSlot is required.')
    .bail()
    .isString()
    .withMessage('timeSlot must be a string.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('timeSlot cannot be empty.'),
  body('guests')
    .exists({ checkNull: true })
    .withMessage('guests is required.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('guests must be a number greater than 0.')
    .toInt(),
  body('status')
    .optional()
    .isIn(['confirmed', 'cancelled'])
    .withMessage('status must be confirmed or cancelled.'),
  validateRequest,
];

export const validateUpdateReservation = [
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error('At least one field is required for update.');
    }
    return true;
  }),
  body('table')
    .optional()
    .isMongoId()
    .withMessage('table must be a valid id.'),
  body('reservationDate')
    .optional()
    .isISO8601()
    .withMessage('reservationDate must be a valid date.'),
  body('timeSlot')
    .optional()
    .isString()
    .withMessage('timeSlot must be a string.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('timeSlot cannot be empty.'),
  body('guests')
    .optional()
    .isInt({ min: 1 })
    .withMessage('guests must be a number greater than 0.')
    .toInt(),
  body('status')
    .optional()
    .isIn(['confirmed', 'cancelled'])
    .withMessage('status must be confirmed or cancelled.'),
  validateRequest,
];
