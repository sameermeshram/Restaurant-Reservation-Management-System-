import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';

import env from './config/env.js';
import swaggerSpec from './config/swagger.js';
import indexRoutes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();

app.disable('x-powered-by');

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

const morganStream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use('/api', limiter);
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream: morganStream }));
app.use(cookieParser());
app.use(express.json({ limit: env.JSON_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: env.JSON_BODY_LIMIT }));
app.use(mongoSanitize());
app.use(xss());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Restaurant Reservation API is running',
  });
});

app.get('/api-docs.json', (req, res) => {
  res.status(200).json(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', indexRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
