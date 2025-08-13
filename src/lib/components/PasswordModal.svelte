<!-- src/lib/components/PasswordModal.svelte -->
<script lang="ts">
	import type { Password } from '$lib/types';

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

	let isEditMode = $state(false);
	let showPassword = $state(false);
	let isSubmitting = $state(false);

	function generateRandomPassword() {
		const charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
		let password = '';
		for (let i = 0; i < 16; i++) {
			const randomIndex = Math.floor(
				(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) * charset.length
			);
			password += charset.charAt(randomIndex);
		}
		formData.password = password;
	}
</script>

<div
	class="modal-overlay"
	role="dialog"
	aria-modal="true"
	onclick={(e) => e.target === e.currentTarget && onclose()}
	onkeydown={(e) => e.key === 'Escape' && onclose()}
	tabindex="-1"
>
	<div class="modal">
		<div class="modal-header">
			<h3 class="modal-title">{title}</h3>
			<button class="close-btn" onclick={onclose}>×</button>
		</div>

		<form
			{...(!isEditMode && createPassword
				? createPassword.enhance(async ({ form, submit }) => {
						isSubmitting = true;
						try {
							await submit();
							onclose();
						} catch (error) {
							alert('Failed to save password');
						} finally {
							isSubmitting = false;
						}
					})
				: {})}
		>
			<div class="form-group">
				<label for="title">Title *</label>
				<input
					id="title"
					name="title"
					type="text"
					class="form-control"
					bind:value={formData.title}
					required
				/>
			</div>

			<div class="form-group">
				<label for="username">Username / Email</label>
				<input
					id="username"
					name="username"
					type="text"
					class="form-control"
					bind:value={formData.username}
				/>
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
					/>
					<div
						style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); display: flex; gap: 4px;"
					>
						<button
							type="button"
							class="password-toggle"
							onclick={() => (showPassword = !showPassword)}
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
				/>
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
				<button type="button" class="btn btn-secondary" onclick={onclose}> Cancel </button>
				<button
					type="submit"
					class="btn btn-primary"
					disabled={isSubmitting}
					onclick={async (e) => {
						if (isEditMode && updatePassword) {
							e.preventDefault();
							isSubmitting = true;
							try {
								await updatePassword({
									id: password?.id,
									...formData
								});
								onclose();
							} catch (error) {
								alert('Failed to update password');
							} finally {
								isSubmitting = false;
							}
						}
					}}
				>
					{isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
				</button>
			</div>
		</form>
	</div>
</div>
