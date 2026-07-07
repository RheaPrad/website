import type { PageLoad } from './$types';

export const prerender = true;

const CATEGORIES = ['All', 'Artist Books', 'Picture Books', 'Graphic Novels', 'Miscellany'];

export const load: PageLoad = async () => {
	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	const images = import.meta.glob('/src/lib/content/art-page/books/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	const books = Object.entries(modules)
		.map(([path, m]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			const meta = m.metadata ?? {};
			const cover = meta.cover_image ? images[meta.cover_image] || meta.cover_image : '';
			return {
				slug,
				title: meta.title ?? '',
				date: meta.date ?? '',
				year: meta.date ? String(new Date(meta.date).getFullYear()) : '',
				category: meta.category ?? 'Miscellany',
				cover
			};
		})
		.filter((b) => b.slug && !b.slug.startsWith('.') && b.cover)
		.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

	return { books, categories: CATEGORIES };
};
