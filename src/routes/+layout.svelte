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
		<button onclick={reset}>Oops! Try again</button>
	{/snippet}

	{#snippet pending()}
		<p>loading...</p>
	{/snippet}

	{@render children()}
</svelte:boundary>