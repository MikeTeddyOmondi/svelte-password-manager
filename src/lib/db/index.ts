// src/lib/db/index.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

export const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, { schema });

// Export schema for use in other files
export { passwords } from './schema';
