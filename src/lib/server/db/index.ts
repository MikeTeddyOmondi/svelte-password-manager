// src/lib/db/index.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

export let client = undefined as unknown as ReturnType<typeof createClient>
export let db = undefined as unknown as ReturnType<typeof drizzle>

export function initDatabase() {
  client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
  });
  db = drizzle(client, { schema });
}

// Export schema for use in other files
export { passwords } from './schema';
