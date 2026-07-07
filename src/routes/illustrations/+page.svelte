<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { Lightbox, type LightboxItem } from '$lib/components/ui/lightbox';
	import Seo from '$lib/components/Seo.svelte';
	import type { PageData } from './$types';

	type Item = { slug: string; title: string; category: string; caption?: string; src: string };

	const { data } = $props<{ data: PageData }>();
	const { items, categories } = $derived(data);

	let active = $state('All');
	const filtered = $derived<Item[]>(
		active === 'All' ? items : items.filter((i: Item) => i.category === active)
	);

	// Lightbox: navigable across the currently-filtered set
	let open = $state(false);
	let index = $state(0);
	const lightboxItems = $derived<LightboxItem[]>(
		filtered.map((i) => ({ src: i.src, title: i.title, caption: i.caption || i.category }))
	);

	function openLightbox(i: number) {
		index = i;
		open = true;
	}
</script>

<Seo
	title="Illustrations"
	description="Illustrations, comics, and character design by Rhea Pradeep."
/>

<section class="px-6 pt-8 pb-14 md:px-10 md:pt-10 lg:px-[100px] lg:pt-[56px] lg:pb-[80px]">
	<!-- Filter buttons -->
	<div class="mb-8 flex flex-wrap justify-center gap-3 md:mb-10 lg:mb-12">
		{#each categories as category (category)}
			<button
				type="button"
				onclick={() => (active = category)}
				aria-pressed={active === category}
				class="rounded-full px-5 py-2 font-sans text-[13px] tracking-[0.5px] transition-colors
				       md:text-[14px]
				       {active === category
					? 'bg-primary text-white'
					: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
			>
				{category}
			</button>
		{/each}
	</div>

	<!-- Masonry grid -->
	<div class="mx-auto max-w-[1180px] columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
		{#each filtered as item, i (item.slug)}
			<button
				type="button"
				onclick={() => openLightbox(i)}
				animate:flip={{ duration: 400 }}
				in:fade={{ duration: 250 }}
				out:fade={{ duration: 150 }}
				class="group mb-3 block w-full break-inside-avoid overflow-hidden md:mb-4"
				aria-label="Open {item.title}"
			>
				<img
					src={item.src}
					alt={item.title}
					loading="lazy"
					class="w-full transition-transform duration-500 group-hover:scale-[1.03]"
				/>
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="mt-6 text-center font-sans text-gray-500">No work in this category yet.</p>
	{/if}
</section>

<Lightbox items={lightboxItems} bind:open bind:index />
