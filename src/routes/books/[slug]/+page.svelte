<script lang="ts">
	import { ImageWithSkeleton } from '$lib/components/ui/image-with-skeleton';
	import { Lightbox, type LightboxItem } from '$lib/components/ui/lightbox';
	import { getHeroColors } from '$lib/image-color';
	import { navState, resetNav } from '$lib/nav.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, hero, images, otherBooks, nav } = $derived(data);
	const book = $derived(metadata ?? {});

	// SSR-safe defaults; refined client-side from the hero image
	let titleColor = $state<string>('');
	const cmsNavTheme = $derived<'light' | 'dark' | null>(
		book.nav_theme === 'Light text' ? 'light' : book.nav_theme === 'Dark text' ? 'dark' : null
	);

	// Drive the global transparent nav for this page
	$effect(() => {
		navState.transparent = !!nav?.transparent;
		navState.text = cmsNavTheme ?? nav?.text ?? 'light';
		return () => resetNav();
	});

	// Colours are baked into frontmatter at build time (instant, no flash).
	// Only fall back to client-side extraction for images that haven't been
	// processed yet (e.g. just added via the CMS before the next build).
	$effect(() => {
		if (!hero) return;
		const needsColor = !book.title_color && !book.title_color_auto;
		const needsNav = !cmsNavTheme && !book.nav_text_auto;
		if (!needsColor && !needsNav) return;
		let cancelled = false;
		getHeroColors(hero).then(({ dominant, lightTop }) => {
			if (cancelled) return;
			if (needsColor && dominant) titleColor = dominant;
			if (needsNav) navState.text = lightTop ? 'dark' : 'light';
		});
		return () => {
			cancelled = true;
		};
	});

	const effectiveTitleColor = $derived(book.title_color || book.title_color_auto || titleColor || '');

	const metaLine = $derived(
		[
			book.pages ? `${book.pages} pages` : '',
			book.dimensions ?? '',
			book.date ? String(new Date(book.date).getFullYear()) : ''
		]
			.filter(Boolean)
			.join('  |  ')
	);

	// Normalise gallery (supports both plain-string and {image, caption} items)
	const gallery = $derived(
		(book.gallery ?? []).map((g: string | { image: string; caption?: string }) => {
			const path = typeof g === 'string' ? g : g.image;
			return { src: images[path] || path, caption: typeof g === 'string' ? '' : (g.caption ?? '') };
		})
	);

	// Lightbox for the gallery
	let lbOpen = $state(false);
	let lbIndex = $state(0);
	const lightboxItems = $derived<LightboxItem[]>(
		gallery.map((g: { src: string; caption: string }) => ({
			src: g.src,
			title: book.title,
			caption: g.caption
		}))
	);

	function openLightbox(i: number) {
		lbIndex = i;
		lbOpen = true;
	}
</script>

<!-- Full-bleed hero — starts at the very top, variable height -->
{#if hero}
	<div class="w-full">
		<img src={hero} alt={book.title} class="block h-auto w-full" />
	</div>
{/if}

<!-- Info block -->
<article class="mx-auto max-w-[860px] px-6 pt-10 pb-4 md:pt-14 lg:pt-[72px]">
	{#if book.category}
		<span
			class="inline-block rounded-full border border-gray-300 px-4 py-1.5 font-sans text-[13px]
			       text-gray-600 md:text-[14px]"
		>
			{book.category}
		</span>
	{/if}

	<h1
		class="mt-6 font-sans text-[32px] font-normal tracking-[0.08em] uppercase md:text-[42px] lg:text-[46px]"
		style={effectiveTitleColor ? `color:${effectiveTitleColor}` : undefined}
	>
		{book.title}
	</h1>

	{#if metaLine}
		<p class="mt-2 font-sans text-[14px] text-gray-400 md:text-[15px]">{metaLine}</p>
	{/if}

	<hr class="my-7 border-t border-gray-200 md:my-9" />

	{#if component}
		<div
			class="max-w-[720px] font-sans text-[15px] leading-[1.75] font-normal text-gray-800
			       md:text-[17px]
			       [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-70
			       [&_em]:italic [&_p]:mb-5"
		>
			<svelte:component this={component} />
		</div>
	{/if}
</article>

<!-- Masonry gallery -->
{#if gallery.length > 0}
	<section class="mx-auto max-w-[1180px] px-6 pt-6 pb-14 md:pt-8 md:pb-20 lg:px-10">
		<div class="columns-2 gap-2 md:gap-3 lg:columns-3 lg:gap-4">
			{#each gallery as image, i (image.src)}
				<button
					type="button"
					onclick={() => openLightbox(i)}
					class="group mb-2 block w-full break-inside-avoid overflow-hidden md:mb-3 lg:mb-4"
					aria-label={image.caption || book.title}
				>
					<img
						src={image.src}
						alt={image.caption || book.title}
						loading="lazy"
						class="block w-full transition-transform duration-500 group-hover:scale-[1.03]"
					/>
				</button>
			{/each}
		</div>
	</section>
{/if}

<!-- Other Projects (kept from our existing design) -->
{#if otherBooks && otherBooks.length > 0}
	<section class="border-t border-gray-100 px-6 py-12 md:px-10 md:py-16 lg:px-[169px]">
		<h2 class="mb-8 text-center font-display text-[20px] tracking-[2px] text-gray-800 uppercase md:text-[24px] lg:mb-12">
			Other Projects
		</h2>
		<div class="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
			{#each otherBooks as other (other.slug)}
				<a href="/books/{other.slug}" class="group block">
					{#if other.metadata.cover_image}
						<div class="mb-3 overflow-hidden">
							<ImageWithSkeleton
								src={images[other.metadata.cover_image] || other.metadata.cover_image}
								alt={other.metadata.title}
								aspectRatio="3/4"
								class="transition-transform duration-300 group-hover:scale-[1.02]"
							/>
						</div>
					{/if}
					<p class="font-sans text-[14px] font-normal group-hover:underline md:text-[16px]">
						{other.metadata.title}
					</p>
					{#if other.metadata.date}
						<p class="mt-1 font-sans text-[12px] text-gray-500 md:text-[14px]">
							{new Date(other.metadata.date).getFullYear()}
						</p>
					{/if}
				</a>
			{/each}
		</div>
	</section>
{/if}

<Lightbox items={lightboxItems} bind:open={lbOpen} bind:index={lbIndex} />
