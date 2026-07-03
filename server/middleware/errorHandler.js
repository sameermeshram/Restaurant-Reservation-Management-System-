import AppError from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateKeyError = (err) => {
  const duplicateField = Object.keys(err.keyValue || {})[0] || 'field';
  return new AppError(`Duplicate value for ${duplicateField}`, 409);
};

const handleValidationError = (err) => {
  const message = Object.values(err.errors)
    .map((entry) => entry.message)
    .join(', ');
  return new AppError(message || 'Validation failed', 400);
};

const handleJsonWebTokenError = () => new AppError('Invalid authentication token', 401);

const handleTokenExpiredError = () => new AppError('Authentication token expired', 401);

const handleBadJsonError = () => new AppError('Invalid JSON payload', 400);

export const globalErrorHandler = (error, req, res, next) => {
  let err = error;

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    err = handleBadJsonError();
  }

  if (err.name === 'CastError') {
    err = handleCastError(err);
  }

  if (err.code === 11000) {
    err = handleDuplicateKeyError(err);
  }

  if (err.name === 'ValidationError') {
    err = handleValidationError(err);
  }

  if (err.name === 'JsonWebTokenError') {
    err = handleJsonWebTokenError();
  }

  if (err.name === 'TokenExpiredError') {
    err = handleTokenExpiredError();
  }

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  const isOperational = err.isOperational || statusCode < 500;
  const message = isProduction && !isOperational ? 'Internal Server Error' : err.message;

  if (statusCode >= 500) {
    logger.error('Unhandled server error', {
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.warn('Request error', {
      message: err.message,
      path: req.originalUrl,
      method: req.method,
      statusCode,
    });
  }

  res.status(statusCode).json({
    success: false,
    status: err.status || (statusCode < 500 ? 'fail' : 'error'),
    message,
    stack: isProduction ? undefined : err.stack,
  });
};
