import * as dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config({ path: '.env' });
}

import { z } from 'zod';

const envSchema = z.object({
  // ENV
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  API_NAME: z.string().default('Template API'),
  API_PORT: z.coerce.number().default(3333),
  API_ID: z.coerce.number(),

  // API KEY
  API_KEY: z.string().default(''),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('😢 Invalid enviroment variables!', _env.error.format());
  throw new Error('Invalid enviroment variables!');
}

export const env = _env.data;
