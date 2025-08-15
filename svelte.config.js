import adapter from '@sveltejs/adapter-node'; // Node adapter
// import adapter from '@sveltejs/adapter-vercel'; // Vercel adapter
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		// async flag
		experimental: { async: true }
	},
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		},
		prerender: {
			entries: [] // Disable all prerendering
		}
	}
};

export default config;
