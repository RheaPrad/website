import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// ── Home settings (carousel slides + captions) ─────────────────
	const homeModules = import.meta.glob('/src/lib/content/home-page/home.md', { eager: true });
	const homeMeta = (Object.values(homeModules)[0] as any)?.metadata ?? {};

	// ── Social links (managed on the About page) ───────────────────
	const aboutModules = import.meta.glob('/src/lib/content/about-page/about.md', { eager: true });
	const about = (Object.values(aboutModules)[0] as any)?.metadata ?? {};

	// ── Resolve image urls ─────────────────────────────────────────
	const images = import.meta.glob('/src/lib/content/home-page/**/*.{jpg,jpeg,png,webp}', {
		query: '?url',
		import: 'default',
		eager: true
	}) as Record<string, string>;
	const resolve = (p: string) => images[p] || p;

	let slides: { src: string; caption: string }[] = Array.isArray(homeMeta.carousel)
		? homeMeta.carousel
				.filter((s: any) => s?.image)
				.map((s: any) => ({ src: resolve(s.image), caption: s.caption ?? '' }))
		: [];

	// Fallback: use every landing image if the CMS carousel is empty
	if (slides.length === 0) {
		slides = Object.entries(images)
			.filter(([p]) => /landing-\d+/.test(p))
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([, src]) => ({ src, caption: '' }));
	}

	const socials = {
		instagram: about.instagram ?? '',
		linkedin: about.linkedin ?? '',
		email: about.email ?? '',
		behance: about.behance ?? '',
		bluesky: about.bluesky ?? ''
	};

	// Optional homepage SEO overrides from the CMS; the share image is resolved
	// through the home images map so it points at a real built asset.
	const homeSeo = homeMeta.seo ?? {};
	const seo = {
		title: homeSeo.title ?? '',
		description: homeSeo.description ?? '',
		image: homeSeo.image ? resolve(homeSeo.image) : ''
	};

	return { slides, socials, seo };
};
