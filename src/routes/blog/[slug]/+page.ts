import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	const modules = import.meta.glob('/src/lib/content/blog-page/**/*.md', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()?.replace('.md', '') ?? ''
	}));
}

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	const modules = import.meta.glob('/src/lib/content/blog-page/**/*.md', { eager: true });
	const match = Object.entries(modules).find(([path]) => path.includes(`/${slug}.md`));

	if (!match) {
		error(404, `Post "${slug}" not found`);
	}

	const mod = match[1] as any;

	const images = import.meta.glob('/src/lib/content/blog-page/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	return {
		slug,
		component: mod.default,
		metadata: mod.metadata ?? {},
		images
	};
};
