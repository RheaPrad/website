import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// Get all markdown book modules
	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });

	const books = Object.entries(modules)
		.map(([path, m]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				slug,
				metadata: m.metadata ?? {},
				component: m.default
			};
		})
		.filter((b) => b.slug && !b.slug.startsWith('.'))
		.sort((a, b) => (b.metadata.year ?? 0) - (a.metadata.year ?? 0));

	// Get image glob
	const images = import.meta.glob('/src/lib/content/art-page/books/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	return { books, images };
};
