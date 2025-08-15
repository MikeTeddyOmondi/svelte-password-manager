// src/lib/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const passwords = sqliteTable('passwords', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	username: text('username').notNull(),
	password: text('password').notNull(), // Will store encrypted password
	website: text('website'),
	notes: text('notes'),
	createdAt: text('createdAt').notNull(), // Store as ISO string
	updatedAt: text('updatedAt').notNull() // Store as ISO string
});
