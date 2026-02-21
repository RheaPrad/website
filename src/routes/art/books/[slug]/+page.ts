import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	return [
		{ slug: 'canidae' },
		{ slug: 'cell-block-tango' },
		{ slug: 'house-of-memories' },
		{ slug: 'orullaigal' },
		{ slug: 'who-is-ready-for-sadhya' }
	];
}

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;

	// Get markdown modules
	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	const bookModule = Object.entries(modules).find(([path]: [string, any]) =>
		path.includes(`/${slug}.md`)
	)?.[1] as any;

	if (!bookModule) {
		error(404, `Book "${slug}" not found`);
	}

	// Get image glob for this book's gallery
	const imageModules = import.meta.glob('/src/lib/content/art-page/books/**/*.{jpg,jpeg,png}', {
		query: '?url',
		import: 'default'
	});

	const images: Record<string, string> = {};
	for (const [path, resolver] of Object.entries(imageModules)) {
		images[path] = await (resolver as () => Promise<string>)();
	}

	return {
		slug,
		component: bookModule.default,
		metadata: bookModule.metadata,
		images
	};
};
