# Build a Password Manager using Svelte 5

A secure password manager built with Svelte 5, SvelteKit, and experimental remote functions feature.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete passwords
- 🔐 **Encryption**: Passwords are encrypted using AES encryption
- 🎯 **Type Safety**: Full TypeScript support with remote functions
- 🎨 **Modern UI**: Clean, responsive design with animations
- 🔍 **Search**: Real-time password searching
- 🎲 **Password Generator**: Customizable secure password generation
- 📱 **Mobile Friendly**: Responsive design for all screen sizes
- 🚀 **Svelte 5 Runes**: Uses latest Svelte 5 reactivity features

## Tech Stack

- **Svelte 5**: Latest version with runes ($state, $props, $derived, $effect)
- **SvelteKit**: Full-stack web framework
- **Remote Functions**: Experimental type-safe server communication
- **TypeScript**: Full type safety
- **Valibot**: Schema validation
- **CryptoJS**: Password encryption
- **CSS**: Custom styling with modern design

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Create a new SvelteKit project:**

```bash
npm create sveltekit@latest password-manager
cd password-manager
```

2. **Install dependencies:**

```bash
npm install valibot crypto-js @types/crypto-js
```

3. **Enable experimental features:** Update your `svelte.config.js`:

```js
export default {
    kit: {
        adapter: adapter(),
        experimental: {
            remoteFunctions: true
        }
    }
};
```

4. **Copy the provided files:**
  

- `src/lib/passwords.remote.ts` - Remote functions for CRUD operations
  
- `src/lib/components/PasswordModal.svelte` - Modal for creating/editing passwords
  
- `src/lib/components/GeneratePasswordModal.svelte` - Password generator modal
  
- `src/routes/+page.svelte` - Main application page
  
- `src/app.html` - HTML layout with styles
  

5. **Run the development server:**

```bash
npm run dev
```

6. **Open your browser:** Visit `http://localhost:5173`

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── PasswordModal.svelte
│   │   └── GeneratePasswordModal.svelte
│   ├── passwords.remote.ts
│   └── types.ts
├── routes/
│   └── +page.svelte
├── app.html
└── app.d.ts
```

## Key Features Explained

### Remote Functions

This app uses SvelteKit's experimental remote functions for type-safe server communication:

- `query()` - For reading data (getPasswords, getPassword)
- `command()` - For mutations (updatePassword, deletePassword)
- `form()` - For form submissions (createPassword)

### Svelte 5 Runes

The app showcases Svelte 5's new reactivity system:

- `$state()` - Reactive state variables
- `$props()` - Component props with destructuring
- `$derived()` - Computed values that automatically update
- `$effect()` - Side effects that run when dependencies change

### Security Features

- Passwords are encrypted using AES encryption before storage
- Client-side password generation with customizable options
- Input validation using Valibot schemas
- Secure password visibility toggling

### User Experience

- Real-time search across titles, usernames, and websites
- Copy-to-clipboard functionality for passwords and usernames
- Responsive design that works on mobile and desktop
- Loading states and error handling
- Confirmation dialogs for destructive actions

## Production Considerations

**⚠️ Important**: This is a demo application. For production use:

1. **Database**: Replace in-memory storage with a real database (PostgreSQL, SQLite, etc.)
2. **Authentication**: Add user authentication and session management
3. **Master Password**: Implement proper master password derivation (PBKDF2, Argon2)
4. **HTTPS**: Always use HTTPS in production
5. **Backup**: Implement data backup and recovery
6. **Security Audit**: Conduct thorough security review

## Development Tips

- The remote functions are automatically cached while on the page
- Use `refresh()` method to update queries after mutations
- Single-flight mutations prevent unnecessary server round-trips
- Form validation happens both client-side and server-side

## Browser Support

- Modern browsers with ES2022+ support
- Chrome/Edge 95+
- Firefox 94+
- Safari 15+

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

---

## Notes

Created is a comprehensive Svelte 5 password manager application with experimental remote functions enabled.

## Key Features:

🔐 **Full CRUD Operations**: Create, read, update, and delete passwords
🛡️ **Security**: AES encryption for password storage  
🎯 **Type Safety**: Full TypeScript with remote functions
🔍 **Search**: Real-time password filtering
🎲 **Password Generator**: Customizable secure password generation
📱 **Responsive**: Mobile-friendly design
⚡ **Svelte 5 Runes**: Uses latest reactivity features ($state, $props, $derived, $effect)

## What's Included:

1. **Configuration** (`svelte.config.js` & `package.json`) - Enables experimental remote functions
2. **Remote Functions** (`passwords.remote.ts`) - Type-safe server communication with query, command, and form functions
3. **Main Layout** (`app.html`) - Beautiful responsive CSS styling
4. **Main Page** (`+page.svelte`) - Core application with password list, search, and modals
5. **Password Modal** (`PasswordModal.svelte`) - Create/edit password form
6. **Generator Modal** (`GeneratePasswordModal.svelte`) - Secure password generation
7. **Types** (`app.d.ts`) - TypeScript declarations
8. **Setup Guide** (`README.md`) - Complete installation and usage instructions

## Svelte 5 & Remote Functions Features:

- **Runes**: Uses `$state()`, `$props()`, `$derived()`, and `$effect()` for reactive state management
- **Remote Functions**: Type-safe `query()`, `command()`, and `form()` functions that run on server but are called from client
- **Validation**: Uses Valibot for schema validation of remote function inputs
- **Single-Flight Mutations**: Efficient data updates without extra server round-trips
- **Automatic Caching**: Queries are automatically cached and refreshed when needed

## Security Features:

- AES encryption for stored passwords
- Input validation on both client and server
- Secure password generation with customizable options
- Copy-to-clipboard functionality
- Password visibility toggling

The app demonstrates modern Svelte 5 patterns with the experimental remote functions feature, providing a clean separation between client and server code while maintaining type safety throughout. The remote functions automatically handle serialization, caching, and error handling.

To get started, follow the setup instructions in the README. The app uses in-memory storage for demo purposes, but includes notes on how to integrate with a real database for production use.

---

## Source

### svelte.config.ts

```ts
// svelte.config.ts
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
```

### package.json

```json
// package.json
{
	"name": "svelte5-password-manager",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^3.0.0",
		"@sveltejs/kit": "^2.7.0",
		"@sveltejs/vite-plugin-svelte": "^4.0.0",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"typescript": "^5.0.0",
		"vite": "^5.0.3"
	},
	"dependencies": {
		"valibot": "^0.42.0",
		"crypto-js": "^4.2.0",
		"@types/crypto-js": "^4.2.0"
	},
	"type": "module"
} 
```

### src/lib/passwords.remote.ts

```ts
// src/lib/passwords.remote.ts
import * as v from 'valibot';
import { query, command, form } from '$app/server';
import { error } from '@sveltejs/kit';
import CryptoJS from 'crypto-js';

// Types
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

// In-memory storage (in production, use a proper database)
let passwords: Password[] = [];
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
	return passwords.map(p => ({
		...p,
		password: decryptPassword(p.password)
	}));
});

export const getPassword = query(v.string(), async (id) => {
	const password = passwords.find(p => p.id === id);
	if (!password) {
		error(404, 'Password not found');
	}
	
	return {
		...password,
		password: decryptPassword(password.password)
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

	passwords.push(newPassword);

	// Refresh the passwords list
	await getPasswords().refresh();

	return { success: true, id: newPassword.id };
});

export const updatePassword = command(UpdatePasswordSchema, async (data) => {
	const index = passwords.findIndex(p => p.id === data.id);
	if (index === -1) {
		error(404, 'Password not found');
	}

	passwords[index] = {
		...passwords[index],
		title: data.title,
		username: data.username,
		password: encryptPassword(data.password),
		website: data.website,
		notes: data.notes,
		updatedAt: new Date().toISOString()
	};

	// Refresh the passwords list
	await getPasswords().refresh();
});

export const deletePassword = command(v.string(), async (id) => {
	const index = passwords.findIndex(p => p.id === id);
	if (index === -1) {
		error(404, 'Password not found');
	}

	passwords.splice(index, 1);

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
	async (options) => {
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
			password += charset.charAt(Math.floor(Math.random() * charset.length));
		}

		return password;
	}
); 
```

### src/app.html

```html
<!-- src/app.html -->
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Password Manager</title>
		<style>
			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			
			body {
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				min-height: 100vh;
			}

			.container {
				max-width: 1200px;
				margin: 0 auto;
				padding: 20px;
			}

			.card {
				background: white;
				border-radius: 12px;
				box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
				padding: 24px;
				margin-bottom: 20px;
			}

			.btn {
				padding: 12px 20px;
				border: none;
				border-radius: 8px;
				cursor: pointer;
				font-weight: 600;
				transition: all 0.2s;
				text-decoration: none;
				display: inline-block;
				text-align: center;
			}

			.btn:hover {
				transform: translateY(-2px);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			}

			.btn-primary {
				background: #667eea;
				color: white;
			}

			.btn-secondary {
				background: #6c757d;
				color: white;
			}

			.btn-danger {
				background: #dc3545;
				color: white;
			}

			.btn-success {
				background: #28a745;
				color: white;
			}

			.form-group {
				margin-bottom: 20px;
			}

			.form-group label {
				display: block;
				margin-bottom: 8px;
				font-weight: 600;
				color: #333;
			}

			.form-control {
				width: 100%;
				padding: 12px;
				border: 2px solid #e1e5e9;
				border-radius: 8px;
				font-size: 16px;
				transition: border-color 0.2s;
			}

			.form-control:focus {
				outline: none;
				border-color: #667eea;
			}

			.password-item {
				border: 1px solid #e1e5e9;
				border-radius: 8px;
				padding: 20px;
				margin-bottom: 16px;
				transition: all 0.2s;
			}

			.password-item:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			}

			.password-header {
				display: flex;
				justify-content: between;
				align-items: center;
				margin-bottom: 12px;
			}

			.password-title {
				font-size: 18px;
				font-weight: 600;
				color: #333;
			}

			.password-website {
				color: #667eea;
				text-decoration: none;
				font-size: 14px;
			}

			.password-actions {
				display: flex;
				gap: 8px;
			}

			.modal-overlay {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 1000;
			}

			.modal {
				background: white;
				border-radius: 12px;
				padding: 24px;
				max-width: 500px;
				width: 90%;
				max-height: 80vh;
				overflow-y: auto;
			}

			.modal-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;
			}

			.modal-title {
				font-size: 20px;
				font-weight: 600;
			}

			.close-btn {
				background: none;
				border: none;
				font-size: 24px;
				cursor: pointer;
				color: #6c757d;
			}

			.password-field {
				position: relative;
			}

			.password-toggle {
				position: absolute;
				right: 12px;
				top: 50%;
				transform: translateY(-50%);
				background: none;
				border: none;
				cursor: pointer;
				color: #6c757d;
			}

			.header {
				text-align: center;
				margin-bottom: 40px;
			}

			.header h1 {
				color: white;
				font-size: 32px;
				margin-bottom: 8px;
			}

			.header p {
				color: rgba(255, 255, 255, 0.8);
				font-size: 16px;
			}

			.loading {
				text-align: center;
				padding: 40px;
				color: #6c757d;
			}

			.empty-state {
				text-align: center;
				padding: 40px;
				color: #6c757d;
			}

			.generate-password {
				display: flex;
				gap: 12px;
				align-items: center;
			}

			.checkbox-group {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 12px;
				margin-bottom: 16px;
			}

			.checkbox-item {
				display: flex;
				align-items: center;
				gap: 8px;
			}

			.search-box {
				width: 100%;
				padding: 12px;
				border: 2px solid #e1e5e9;
				border-radius: 8px;
				font-size: 16px;
				margin-bottom: 20px;
			}

			@media (max-width: 768px) {
				.container {
					padding: 10px;
				}
				
				.password-header {
					flex-direction: column;
					align-items: flex-start;
				}
				
				.password-actions {
					margin-top: 12px;
				}
			}
		</style>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html> 
```

### src/routes/+page.svelte

```html
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { 
		getPasswords, 
		createPassword, 
		updatePassword, 
		deletePassword, 
		generateSecurePassword,
		type Password
	} from '$lib/passwords.remote';
	import PasswordModal from '$lib/components/PasswordModal.svelte';
	import GeneratePasswordModal from '$lib/components/GeneratePasswordModal.svelte';

	// Svelte 5 runes
	let searchTerm = $state('');
	let showCreateModal = $state(false);
	let showEditModal = $state(false);
	let showGenerateModal = $state(false);
	let editingPassword = $state<Password | null>(null);
	let showPasswords = $state<Record<string, boolean>>({});

	// Reactive derived state
	const filteredPasswords = $derived(() => {
		const passwords = getPasswords().current || [];
		if (!searchTerm.trim()) return passwords;
		
		const term = searchTerm.toLowerCase();
		return passwords.filter(p => 
			p.title.toLowerCase().includes(term) ||
			p.username.toLowerCase().includes(term) ||
			p.website.toLowerCase().includes(term)
		);
	});

	function togglePasswordVisibility(id: string) {
		showPasswords[id] = !showPasswords[id];
	}

	function handleEdit(password: Password) {
		editingPassword = password;
		showEditModal = true;
	}

	async function handleDelete(id: string) {
		if (confirm('Are you sure you want to delete this password?')) {
			try {
				await deletePassword(id);
			} catch (error) {
				alert('Failed to delete password');
			}
		}
	}

	function handleCloseModal() {
		showCreateModal = false;
		showEditModal = false;
		showGenerateModal = false;
		editingPassword = null;
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			// You could show a toast notification here
		});
	}

	const passwordsQuery = getPasswords();
</script>

<div class="container">
	<div class="header">
		<h1>🔐 Password Manager</h1>
		<p>Securely store and manage your passwords</p>
	</div>

	<div class="card">
		<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
			<h2>Your Passwords</h2>
			<div style="display: flex; gap: 12px;">
				<button class="btn btn-secondary" onclick={() => showGenerateModal = true}>
					Generate Password
				</button>
				<button class="btn btn-primary" onclick={() => showCreateModal = true}>
					Add Password
				</button>
			</div>
		</div>

		<input
			class="search-box"
			type="text"
			placeholder="Search passwords..."
			bind:value={searchTerm}
		>

		{#if passwordsQuery.error}
			<div class="loading">
				<p>❌ Error loading passwords</p>
			</div>
		{:else if passwordsQuery.loading}
			<div class="loading">
				<p>🔄 Loading passwords...</p>
			</div>
		{:else}
			{#each filteredPasswords as password (password.id)}
				<div class="password-item">
					<div class="password-header">
						<div>
							<div class="password-title">{password.title}</div>
							{#if password.website}
								<a href={password.website} class="password-website" target="_blank" rel="noopener noreferrer">
									{password.website}
								</a>
							{/if}
						</div>
						<div class="password-actions">
							<button class="btn btn-secondary" onclick={() => handleEdit(password)}>
								Edit
							</button>
							<button class="btn btn-danger" onclick={() => handleDelete(password.id)}>
								Delete
							</button>
						</div>
					</div>

					<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
						<div>
							<strong>Username:</strong>
							<div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
								<span>{password.username}</span>
								{#if password.username}
									<button
										class="btn btn-secondary"
										style="padding: 4px 8px; font-size: 12px;"
										onclick={() => copyToClipboard(password.username)}
									>
										Copy
									</button>
								{/if}
							</div>
						</div>

						<div>
							<strong>Password:</strong>
							<div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
								<span>
									{showPasswords[password.id] ? password.password : '••••••••'}
								</span>
								<button
									class="btn btn-secondary"
									style="padding: 4px 8px; font-size: 12px;"
									onclick={() => togglePasswordVisibility(password.id)}
								>
									{showPasswords[password.id] ? 'Hide' : 'Show'}
								</button>
								<button
									class="btn btn-secondary"
									style="padding: 4px 8px; font-size: 12px;"
									onclick={() => copyToClipboard(password.password)}
								>
									Copy
								</button>
							</div>
						</div>
					</div>

					{#if password.notes}
						<div style="margin-top: 12px;">
							<strong>Notes:</strong>
							<p style="margin-top: 4px; color: #6c757d;">{password.notes}</p>
						</div>
					{/if}

					<div style="margin-top: 12px; font-size: 12px; color: #6c757d;">
						Created: {new Date(password.createdAt).toLocaleDateString()}
						{#if password.updatedAt !== password.createdAt}
							• Updated: {new Date(password.updatedAt).toLocaleDateString()}
						{/if}
					</div>
				</div>
			{:else}
				<div class="empty-state">
					<p>🔍 No passwords found</p>
					{#if searchTerm}
						<p>Try adjusting your search terms</p>
					{:else}
						<p>Get started by adding your first password</p>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

{#if showCreateModal}
	<PasswordModal
		{createPassword}
		onclose={handleCloseModal}
		title="Add New Password"
	/>
{/if}

{#if showEditModal && editingPassword}
	<PasswordModal
		{updatePassword}
		password={editingPassword}
		onclose={handleCloseModal}
		title="Edit Password"
	/>
{/if}

{#if showGenerateModal}
	<GeneratePasswordModal
		{generateSecurePassword}
		onclose={handleCloseModal}
	/>
{/if} 
```

### src/lib/components/PasswordModal.svelte

```html
<!-- src/lib/components/PasswordModal.svelte -->
<script lang="ts">
	import type { Password } from '$lib/passwords.remote';

	interface Props {
		createPassword?: any;
		updatePassword?: any;
		password?: Password | null;
		title: string;
		onclose: () => void;
	}

	let { createPassword, updatePassword, password = null, title, onclose }: Props = $props();

	// Form state using Svelte 5 runes
	let formData = $state({
		title: password?.title || '',
		username: password?.username || '',
		password: password?.password || '',
		website: password?.website || '',
		notes: password?.notes || ''
	});

	let showPassword = $state(false);
	let isSubmitting = $state(false);

	const isEditMode = password !== null;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		isSubmitting = true;

		try {
			if (isEditMode && updatePassword) {
				await updatePassword({
					id: password.id,
					...formData
				});
			} else if (createPassword) {
				// Create FormData for the form remote function
				const form = new FormData();
				form.append('title', formData.title);
				form.append('username', formData.username);
				form.append('password', formData.password);
				form.append('website', formData.website);
				form.append('notes', formData.notes);

				await createPassword.enhance(async ({ submit }) => {
					await submit();
				})(event);
			}
			onclose();
		} catch (error) {
			alert('Failed to save password');
		} finally {
			isSubmitting = false;
		}
	}

	function generateRandomPassword() {
		const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
		let password = '';
		for (let i = 0; i < 16; i++) {
			password += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		formData.password = password;
	}
</script>

<div class="modal-overlay" onclick={(e) => e.target === e.currentTarget && onclose()}>
	<div class="modal">
		<div class="modal-header">
			<h3 class="modal-title">{title}</h3>
			<button class="close-btn" onclick={onclose}>×</button>
		</div>

		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="title">Title *</label>
				<input
					id="title"
					name="title"
					type="text"
					class="form-control"
					bind:value={formData.title}
					required
				>
			</div>

			<div class="form-group">
				<label for="username">Username / Email</label>
				<input
					id="username"
					name="username"
					type="text"
					class="form-control"
					bind:value={formData.username}
				>
			</div>

			<div class="form-group">
				<label for="password">Password *</label>
				<div class="password-field">
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						class="form-control"
						bind:value={formData.password}
						required
						style="padding-right: 80px;"
					>
					<div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); display: flex; gap: 4px;">
						<button
							type="button"
							class="password-toggle"
							onclick={() => showPassword = !showPassword}
							title={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? '👁️' : '👁️‍🗨️'}
						</button>
					</div>
				</div>
				<button
					type="button"
					class="btn btn-secondary"
					style="margin-top: 8px; padding: 6px 12px; font-size: 14px;"
					onclick={generateRandomPassword}
				>
					Generate Random Password
				</button>
			</div>

			<div class="form-group">
				<label for="website">Website</label>
				<input
					id="website"
					name="website"
					type="url"
					class="form-control"
					bind:value={formData.website}
					placeholder="https://example.com"
				>
			</div>

			<div class="form-group">
				<label for="notes">Notes</label>
				<textarea
					id="notes"
					name="notes"
					class="form-control"
					bind:value={formData.notes}
					rows="3"
					style="resize: vertical;"
				></textarea>
			</div>

			<div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
				<button type="button" class="btn btn-secondary" onclick={onclose}>
					Cancel
				</button>
				<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
				</button>
			</div>
		</form>
	</div>
</div> 
```

### src/lib/components/GeneratePasswordModal.svelte

```html
<!-- src/lib/components/GeneratePasswordModal.svelte -->
<script lang="ts">
	interface Props {
		generateSecurePassword: any;
		onclose: () => void;
	}

	let { generateSecurePassword, onclose }: Props = $props();

	// Form state using Svelte 5 runes
	let options = $state({
		length: 16,
		includeUppercase: true,
		includeLowercase: true,
		includeNumbers: true,
		includeSymbols: true
	});

	let generatedPassword = $state('');
	let isGenerating = $state(false);

	async function handleGenerate() {
		isGenerating = true;
		try {
			generatedPassword = await generateSecurePassword(options);
		} catch (error) {
			alert('Failed to generate password');
		} finally {
			isGenerating = false;
		}
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(generatedPassword).then(() => {
			// You could show a toast notification here
		});
	}

	// Generate initial password
	$effect(() => {
		handleGenerate();
	});
</script>

<div class="modal-overlay" onclick={(e) => e.target === e.currentTarget && onclose()}>
	<div class="modal">
		<div class="modal-header">
			<h3 class="modal-title">Generate Secure Password</h3>
			<button class="close-btn" onclick={onclose}>×</button>
		</div>

		<div class="form-group">
			<label for="length">Password Length: {options.length}</label>
			<input
				id="length"
				type="range"
				min="8"
				max="64"
				bind:value={options.length}
				class="form-control"
				style="margin-top: 8px;"
			>
		</div>

		<div class="checkbox-group">
			<div class="checkbox-item">
				<input
					id="uppercase"
					type="checkbox"
					bind:checked={options.includeUppercase}
				>
				<label for="uppercase">Uppercase (A-Z)</label>
			</div>

			<div class="checkbox-item">
				<input
					id="lowercase"
					type="checkbox"
					bind:checked={options.includeLowercase}
				>
				<label for="lowercase">Lowercase (a-z)</label>
			</div>

			<div class="checkbox-item">
				<input
					id="numbers"
					type="checkbox"
					bind:checked={options.includeNumbers}
				>
				<label for="numbers">Numbers (0-9)</label>
			</div>

			<div class="checkbox-item">
				<input
					id="symbols"
					type="checkbox"
					bind:checked={options.includeSymbols}
				>
				<label for="symbols">Symbols (!@#$...)</label>
			</div>
		</div>

		<div class="form-group">
			<label>Generated Password</label>
			<div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
				<input
					type="text"
					class="form-control"
					value={generatedPassword}
					readonly
					style="font-family: monospace; flex: 1;"
				>
				<button
					type="button"
					class="btn btn-secondary"
					onclick={copyToClipboard}
					disabled={!generatedPassword}
				>
					Copy
				</button>
			</div>
		</div>

		<div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
			<button type="button" class="btn btn-secondary" onclick={onclose}>
				Close
			</button>
			<button
				type="button"
				class="btn btn-primary"
				onclick={handleGenerate}
				disabled={isGenerating}
			>
				{isGenerating ? 'Generating...' : 'Generate New'}
			</button>
		</div>
	</div>
</div> 
```

### src/app.d.ts

```ts
// src/app.d.ts
import type { Password } from '$lib/passwords.remote';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

// src/lib/types.ts
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
```

---
