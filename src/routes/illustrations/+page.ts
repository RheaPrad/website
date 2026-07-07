import type { PageLoad } from './$types';

export const prerender = true;

const CATEGORIES = ['All', 'Comics', 'Illustration', 'Character Design', 'Miscellany'];

export const load: PageLoad = async () => {
	const modules = import.meta.glob('/src/lib/content/art-page/illustrations/**/*.md', {
		eager: true
	});
	// Broad glob so entries can reference any art-page image
	const images = import.meta.glob('/src/lib/content/art-page/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	const items = Object.entries(modules)
		.map(([path, m]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			const meta = m.metadata ?? {};
			const src = meta.image ? images[meta.image] || meta.image : '';
			return {
				slug,
				title: meta.title ?? '',
				category: meta.category ?? 'Miscellany',
				caption: meta.caption ?? '',
				date: meta.date ?? '',
				src
			};
		})
		.filter((i) => i.slug && !i.slug.startsWith('.') && i.src)
		.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

	return { items, categories: CATEGORIES };
};
