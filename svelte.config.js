import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import fancyImages from './src/lib/mdsvex-plugins/fancy-images.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'], remarkPlugins: [fancyImages] })],
	compilerOptions: { compatibility: { componentApi: 4 } },
	kit: { adapter: adapter() }
};

export default config;
