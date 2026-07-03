import { validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
    value: error.value,
    location: error.location,
  }));

  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors,
  });
};

export default validateRequest;
