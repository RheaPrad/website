import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()?.replace('.md', '') ?? ''
	}));
}

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;

	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	const bookModule = Object.entries(modules).find(([path]) =>
		path.includes(`/${slug}.md`)
	)?.[1] as any;

	if (!bookModule) {
		error(404, `Book "${slug}" not found`);
	}

	const images = import.meta.glob('/src/lib/content/art-page/books/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	// Build other books automatically
	const otherBooks = Object.entries(modules)
		.map(([path, m]: [string, any]) => {
			const s = path.split('/').pop()?.replace('.md', '') ?? '';
			return { slug: s, metadata: m.metadata ?? {} };
		})
		.filter((b) => b.slug && b.slug !== slug && !b.slug.startsWith('.'))
		.sort(
			(a, b) =>
				new Date(b.metadata.date ?? 0).getTime() - new Date(a.metadata.date ?? 0).getTime()
		)
		.slice(0, 3);

	return {
		slug,
		component: bookModule.default,
		metadata: bookModule.metadata,
		images,
		otherBooks
	};
};
