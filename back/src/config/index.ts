import { config } from 'dotenv';
config({ path: `.env.local` });

export const { NODE_ENV, PORT } = process.env;
export const { DATABASE_URL } = process.env;
