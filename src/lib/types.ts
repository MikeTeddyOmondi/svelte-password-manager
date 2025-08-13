// src/lib/types.ts
export interface Password {
	id: string;
	title: string;
	username: string;
	password: string;
	website: string;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export interface PasswordFormData {
	title: string;
	username: string;
	password: string;
	website: string;
	notes: string;
}

export interface GeneratePasswordOptions {
	length: number;
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeNumbers: boolean;
	includeSymbols: boolean;
}
