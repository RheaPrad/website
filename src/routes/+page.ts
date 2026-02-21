import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// Recent blog posts
	const postModules = import.meta.glob('/src/lib/content/blog-page/**/*.md', { eager: true });
	const recentPosts = Object.entries(postModules)
		.map(([path, m]: [string, any]) => ({
			slug: path.split('/').pop()?.replace('.md', '') ?? '',
			metadata: m.metadata ?? {}
		}))
		.filter((p) => p.slug && !p.slug.startsWith('.'))
		.sort(
			(a, b) =>
				new Date(b.metadata.date ?? 0).getTime() - new Date(a.metadata.date ?? 0).getTime()
		)
		.slice(0, 3);

	// Status line — build date is baked in at prerender time
	const buildDate = new Date().toISOString();

	const bookModules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	const books = Object.entries(bookModules)
		.map(([path, m]: [string, any]) => ({
			slug: path.split('/').pop()?.replace('.md', '') ?? '',
			title: (m.metadata ?? {}).title ?? '',
			cover: (m.metadata ?? {}).cover_image ?? '',
			year: (m.metadata ?? {}).date
				? String(new Date((m.metadata ?? {}).date).getFullYear())
				: ''
		}))
		.filter((b) => b.slug && !b.slug.startsWith('.'))
		.slice(0, 3);

	const comicModules = import.meta.glob('/src/lib/content/art-page/comics/**/*.md', {
		eager: true
	});
	const comics = Object.entries(comicModules)
		.map(([path, m]: [string, any]) => ({
			slug: path.split('/').pop()?.replace('.md', '') ?? '',
			title: (m.metadata ?? {}).title ?? '',
			image: (m.metadata ?? {}).image ?? '',
			year: (m.metadata ?? {}).date
				? String(new Date((m.metadata ?? {}).date).getFullYear())
				: ''
		}))
		.filter((c) => c.slug && !c.slug.startsWith('.'))
		.slice(0, 2);

	const images = import.meta.glob(
		'/src/lib/content/art-page/{books,comics}/**/*.{jpg,jpeg,png,webp}',
		{ query: '?url', import: 'default', eager: true }
	) as Record<string, string>;

	return { recentPosts, buildDate, books, comics, images };
};
