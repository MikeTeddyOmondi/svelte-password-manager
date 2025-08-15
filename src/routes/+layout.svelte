<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<svelte:boundary>
	{#snippet failed(error, reset)}
			<div class="flex min-h-screen w-full justify-center items-center">
				<button class="btn btn-secondary" onclick={reset}>Oops! Try again</button>
			</div>
	{/snippet}

	{#snippet pending()}
		<div class="flex min-h-screen w-full justify-center items-center">
			<p>loading...</p>
		</div>
	{/snippet}

	{@render children()}
</svelte:boundary>