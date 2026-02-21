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
		.sort((a, b) => new Date(b.metadata.date ?? 0).getTime() - new Date(a.metadata.date ?? 0).getTime());

	// Get image glob
	const images = import.meta.glob('/src/lib/content/art-page/books/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	return { books, images };
};
