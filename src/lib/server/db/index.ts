// src/lib/db/index.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from '$env/dynamic/private';
import * as schema from './schema';
import 'dotenv/config';

console.log({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });

export const client = createClient({
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, { schema });

// Export schema for use in other files
export { passwords } from './schema';
