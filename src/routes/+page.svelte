<script lang="ts">
	import {
		getPasswords,
		createPassword,
		updatePassword,
		deletePassword,
		generateSecurePassword
	} from '$lib/passwords.remote';
	import type { Password } from '$lib/types';
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
		return passwords.filter(
			(p) =>
				p.title.toLowerCase().includes(term) ||
				p.username.toLowerCase().includes(term) ||
				p.website?.toLowerCase().includes(term)
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
		<div
			style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;"
		>
			<h2>Your Passwords</h2>
			<div style="display: flex; gap: 12px;">
				<button class="btn btn-secondary" onclick={() => (showGenerateModal = true)}>
					Generate Password
				</button>
				<button class="btn btn-primary" onclick={() => (showCreateModal = true)}>
					Add Password
				</button>
			</div>
		</div>

		<input
			class="search-box"
			type="text"
			placeholder="Search passwords..."
			bind:value={searchTerm}
		/>

		<!-- {#if passwordsQuery.error}
			<div class="loading">
				<p>❌ Error loading passwords</p>
			</div>
		{:else if passwordsQuery.loading}
			<div class="loading">
				<p>🔄 Loading passwords...</p>
			</div>
		{:else} -->
			{#each await passwordsQuery as password (password.id)}
				<div class="password-item">
					<div class="password-header">
						<div>
							<div class="password-title">{password.title}</div>
							{#if password.website}
								<a
									href={password.website}
									class="password-website"
									target="_blank"
									rel="noopener noreferrer"
								>
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
		<!-- {/if} -->
	</div>
</div>

{#if showCreateModal}
	<PasswordModal {createPassword} onclose={handleCloseModal} title="Add New Password" />
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
	<GeneratePasswordModal {generateSecurePassword} onclose={handleCloseModal} />
{/if}
