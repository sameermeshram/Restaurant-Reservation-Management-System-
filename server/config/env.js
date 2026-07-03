import 'dotenv/config';

import { cleanEnv, num, str, url } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: num({ default: 5000 }),
  MONGODB_URI: str(),
  CLIENT_ORIGIN: url({ default: 'http://localhost:3000' }),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: '1d' }),
  BCRYPT_SALT_ROUNDS: num({ default: 10 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }),
  RATE_LIMIT_MAX: num({ default: 100 }),
  JSON_BODY_LIMIT: str({ default: '10kb' }),
});

export default env;
