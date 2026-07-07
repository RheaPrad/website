import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import fancyImages from './src/lib/mdsvex-plugins/fancy-images.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'], remarkPlugins: [fancyImages] })],
	compilerOptions: { compatibility: { componentApi: 4 } },
	kit: {
		adapter: adapter(),
		prerender: {
			// Don't fail the whole build on links that are still WIP: nav pages
			// not built yet, or CMS-uploaded assets (e.g. resume) not present.
			handleHttpError: ({ path, message }) => {
				const wip = ['/now'];
				if (wip.some((p) => path === p || path.startsWith(`${p}/`))) return;
				if (path.endsWith('.pdf')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
