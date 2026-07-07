import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	return Object.keys(modules)
		.map((path) => ({ slug: path.split('/').pop()?.replace('.md', '') ?? '' }))
		.filter((e) => e.slug && !e.slug.startsWith('.'));
}

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;

	const modules = import.meta.glob('/src/lib/content/art-page/books/**/*.md', { eager: true });
	const bookModule = Object.entries(modules).find(([path]) => path.includes(`/${slug}.md`))?.[1] as
		| any
		| undefined;

	if (!bookModule) {
		error(404, `Book "${slug}" not found`);
	}

	const images = import.meta.glob('/src/lib/content/art-page/books/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	const meta = bookModule.metadata ?? {};
	const heroPath = meta.hero_image || meta.cover_image || '';
	const hero = heroPath ? images[heroPath] || heroPath : '';

	const allBooks = Object.entries(modules)
		.map(([path, m]: [string, any]) => {
			const s = path.split('/').pop()?.replace('.md', '') ?? '';
			return { slug: s, metadata: m.metadata ?? {} };
		})
		.filter((b) => b.slug && !b.slug.startsWith('.'));

	// Explicit "other_projects" list from the CMS wins; otherwise most recent
	const explicit: string[] = Array.isArray(meta.other_projects) ? meta.other_projects : [];
	let otherBooks;
	if (explicit.length) {
		otherBooks = explicit
			.map((s) => allBooks.find((b) => b.slug === s))
			.filter((b): b is (typeof allBooks)[number] => !!b);
	} else {
		otherBooks = allBooks
			.filter((b) => b.slug !== slug)
			.sort(
				(a, b) =>
					new Date(b.metadata.date ?? 0).getTime() - new Date(a.metadata.date ?? 0).getTime()
			)
			.slice(0, 3);
	}

	// Nav text: manual CMS override wins, else the build-baked auto value
	const manualNav: 'light' | 'dark' | null =
		meta.nav_theme === 'Light text' ? 'light' : meta.nav_theme === 'Dark text' ? 'dark' : null;
	const navText = manualNav ?? meta.nav_text_auto ?? 'light';

	return {
		slug,
		component: bookModule.default,
		metadata: meta,
		hero,
		images,
		otherBooks,
		// consumed by +layout.svelte to make the header a transparent overlay
		nav: { transparent: true, text: navText }
	};
};
