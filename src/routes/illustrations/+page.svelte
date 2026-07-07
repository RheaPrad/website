<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageData } from './$types';

	type Item = { slug: string; title: string; category: string; src: string };

	const { data } = $props<{ data: PageData }>();
	const { items, categories } = $derived(data);

	let active = $state('All');
	const filtered = $derived(
		active === 'All' ? items : items.filter((i: Item) => i.category === active)
	);

	// Lightbox state
	let open = $state(false);
	let selected = $state<Item | null>(null);

	function openLightbox(item: Item) {
		selected = item;
		open = true;
	}
</script>

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
		{#each filtered as item (item.slug)}
			<button
				type="button"
				onclick={() => openLightbox(item)}
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

<!-- Lightbox -->
<Dialog.Root bind:open>
	<Dialog.Content
		class="w-auto max-w-[94vw] border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-[88vw]"
	>
		{#if selected}
			<img
				src={selected.src}
				alt={selected.title}
				class="mx-auto max-h-[86vh] w-auto max-w-full object-contain"
			/>
			<Dialog.Title class="sr-only">{selected.title}</Dialog.Title>
			{#if selected.title}
				<p class="mt-3 text-center font-sans text-[14px] text-white/90">{selected.title}</p>
			{/if}
		{/if}
	</Dialog.Content>
</Dialog.Root>
