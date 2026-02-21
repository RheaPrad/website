import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// Get markdown modules
	const modules = import.meta.glob('/src/lib/content/about-page/**/*.md', { eager: true });
	const aboutModule = Object.values(modules).find((m: any) => m.metadata) as any;

	// Get image glob for the about page
	const images = import.meta.glob('/src/lib/content/about-page/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	return {
		component: aboutModule?.default,
		metadata: aboutModule?.metadata ?? {},
		images
	};
};
