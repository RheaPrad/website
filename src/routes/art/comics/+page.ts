import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// Get all markdown comic modules
	const modules = import.meta.glob('/src/lib/content/art-page/comics/**/*.md', { eager: true });

	const comics = Object.entries(modules)
		.map(([path, m]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				slug,
				metadata: m.metadata ?? {},
				component: m.default
			};
		})
		.filter((c) => c.slug && !c.slug.startsWith('.'));

	// Get image glob for resolving paths
	const imageModules = import.meta.glob('/src/lib/content/art-page/comics/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default'
	});

	const images: Record<string, string> = {};
	for (const [imagePath, resolver] of Object.entries(imageModules)) {
		images[imagePath] = await (resolver as () => Promise<string>)();
	}

	return { comics, images };
};
