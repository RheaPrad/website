import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	const postModules = import.meta.glob('/src/lib/content/blog-page/**/*.md', { eager: true });

	const posts = Object.entries(postModules)
		.map(([path, m]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return { slug, metadata: m.metadata ?? {}, component: m.default };
		})
		.filter((p) => p.slug && !p.slug.startsWith('.'))
		.sort(
			(a, b) =>
				new Date(b.metadata.date ?? 0).getTime() - new Date(a.metadata.date ?? 0).getTime()
		);

	const images = import.meta.glob('/src/lib/content/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	return { posts, images };
};
