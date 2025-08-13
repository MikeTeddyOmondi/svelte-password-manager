// src/lib/passwords.remote.ts
import * as v from 'valibot';
import { query, command, form } from '$app/server';
import { error } from '@sveltejs/kit';
import CryptoJS from 'crypto-js';
import type { Password, GeneratePasswordOptions } from './types';

// Database imports
import { db, passwords as passwordsTable } from '$lib/db';
import { eq } from 'drizzle-orm';

const MASTER_KEY = 'your-secure-master-key'; // In production, derive from user's master password

// Helper functions
function encryptPassword(password: string): string {
	return CryptoJS.AES.encrypt(password, MASTER_KEY).toString();
}

function decryptPassword(encryptedPassword: string): string {
	const bytes = CryptoJS.AES.decrypt(encryptedPassword, MASTER_KEY);
	return bytes.toString(CryptoJS.enc.Utf8);
}

function generateId(): string {
	return crypto.randomUUID();
}

// Validation schemas
const PasswordSchema = v.object({
	title: v.pipe(v.string(), v.minLength(1, 'Title is required')),
	username: v.string(),
	password: v.pipe(v.string(), v.minLength(1, 'Password is required')),
	website: v.string(),
	notes: v.string()
});

const UpdatePasswordSchema = v.object({
	id: v.pipe(v.string(), v.minLength(1)),
	title: v.pipe(v.string(), v.minLength(1, 'Title is required')),
	username: v.string(),
	password: v.pipe(v.string(), v.minLength(1, 'Password is required')),
	website: v.string(),
	notes: v.string()
});

// Remote functions
export const getPasswords = query(async () => {
	const results = await db.select().from(passwordsTable);
	return results.map((p) => ({
		...p,
		password: decryptPassword(p.password)
	}));
});

export const getPassword = query(v.string(), async (id) => {
	const [result] = await db.select().from(passwordsTable).where(eq(passwordsTable.id, id)).limit(1);

	if (!result) {
		error(404, 'Password not found');
	}

	return {
		...result,
		password: decryptPassword(result.password)
	};
});

export const createPassword = form(async (data) => {
	const title = data.get('title') as string;
	const username = data.get('username') as string;
	const password = data.get('password') as string;
	const website = data.get('website') as string;
	const notes = data.get('notes') as string;

	// Validate the data
	const validatedData = v.parse(PasswordSchema, {
		title,
		username,
		password,
		website,
		notes
	});

	const newPassword: Password = {
		id: generateId(),
		title: validatedData.title,
		username: validatedData.username,
		password: encryptPassword(validatedData.password),
		website: validatedData.website,
		notes: validatedData.notes,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};

	await db.insert(passwordsTable).values(newPassword);

	// Refresh the passwords list
	await getPasswords().refresh();

	return { success: true, id: newPassword.id };
});

export const updatePassword = command(UpdatePasswordSchema, async (data) => {
	const [existingPassword] = await db
		.select()
		.from(passwordsTable)
		.where(eq(passwordsTable.id, data.id))
		.limit(1);

	if (!existingPassword) {
		error(404, 'Password not found');
	}

	await db
		.update(passwordsTable)
		.set({
			title: data.title,
			username: data.username,
			password: encryptPassword(data.password),
			website: data.website,
			notes: data.notes,
			updatedAt: new Date().toISOString()
		})
		.where(eq(passwordsTable.id, data.id));

	// Refresh the passwords list
	await getPasswords().refresh();
});

export const deletePassword = command(v.string(), async (id) => {
	const [existingPassword] = await db
		.select()
		.from(passwordsTable)
		.where(eq(passwordsTable.id, id))
		.limit(1);

	if (!existingPassword) {
		error(404, 'Password not found');
	}

	await db.delete(passwordsTable).where(eq(passwordsTable.id, id));

	// Refresh the passwords list
	await getPasswords().refresh();
});

export const generateSecurePassword = command(
	v.object({
		length: v.pipe(v.number(), v.minValue(8), v.maxValue(128)),
		includeUppercase: v.boolean(),
		includeLowercase: v.boolean(),
		includeNumbers: v.boolean(),
		includeSymbols: v.boolean()
	}),
	async (options: GeneratePasswordOptions) => {
		let charset = '';
		if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
		if (options.includeNumbers) charset += '0123456789';
		if (options.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

		if (charset === '') {
			charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		}

		let password = '';
		for (let i = 0; i < options.length; i++) {
			const randomIndex = Math.floor(
				(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) * charset.length
			);
			password += charset.charAt(randomIndex);
		}

		return password;
	}
);
