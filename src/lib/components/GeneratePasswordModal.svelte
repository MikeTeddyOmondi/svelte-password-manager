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
		// handleGenerate();
	});
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
			/>
		</div>

		<div class="checkbox-group">
			<div class="checkbox-item">
				<input id="uppercase" type="checkbox" bind:checked={options.includeUppercase} />
				<label for="uppercase">Uppercase (A-Z)</label>
			</div>

			<div class="checkbox-item">
				<input id="lowercase" type="checkbox" bind:checked={options.includeLowercase} />
				<label for="lowercase">Lowercase (a-z)</label>
			</div>

			<div class="checkbox-item">
				<input id="numbers" type="checkbox" bind:checked={options.includeNumbers} />
				<label for="numbers">Numbers (0-9)</label>
			</div>

			<div class="checkbox-item">
				<input id="symbols" type="checkbox" bind:checked={options.includeSymbols} />
				<label for="symbols">Symbols (!@#$...)</label>
			</div>
		</div>

		<div class="form-group">
			<label for="generatedPassword">Generated Password</label>
			<div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
				<input
					id="generatedPassword"
					type="text"
					class="form-control"
					value={generatedPassword}
					readonly
					style="font-family: monospace; flex: 1;"
				/>
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
			<button type="button" class="btn btn-secondary" onclick={onclose}> Close </button>
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
