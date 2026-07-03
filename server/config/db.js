import mongoose from 'mongoose';
import env from './env.js';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  const mongoURI = env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoURI);
  logger.info('MongoDB connected successfully.');
};

export default connectDB;
