import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// ── Home settings (featured covers) ────────────────────────────
	const homeModules = import.meta.glob('/src/lib/content/home-page/home.md', { eager: true });
	const homeMeta = (Object.values(homeModules)[0] as any)?.metadata ?? {};

	// ── Recent blog posts ──────────────────────────────────────────
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

	// ── Status line ────────────────────────────────────────────────
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

	// ── Images (all art-page + home-page) ─────────────────────────
	const images = import.meta.glob(
		'/src/lib/content/{home-page,art-page/books,art-page/comics}/**/*.{jpg,jpeg,png,webp}',
		{ query: '?url', import: 'default', eager: true }
	) as Record<string, string>;

	return {
		homeMeta,
		recentPosts,
		buildDate,
		books,
		comics,
		images
	};
};
