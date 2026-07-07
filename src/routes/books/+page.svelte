<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Seo from '$lib/components/Seo.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { books, categories } = $derived(data);

	let active = $state('All');

	const filtered = $derived(
		active === 'All' ? books : books.filter((b: { category: string }) => b.category === active)
	);
</script>

<Seo title="Books" description="Books, comics, and printed work by Rhea Pradeep." />

<section class="px-6 pt-8 pb-14 md:px-10 md:pt-10 lg:px-[100px] lg:pt-[56px] lg:pb-[80px]">
	<!-- Filter buttons -->
	<div class="mb-8 flex flex-wrap justify-center gap-3 md:mb-10 lg:mb-12">
		{#each categories as category (category)}
			<button
				type="button"
				onclick={() => (active = category)}
				aria-pressed={active === category}
				class=" px-5 py-2 font-sans text-xl font-semibold tracking-[0.5px] transition-colors

				       {active === category
					? 'bg-primary text-white'
					: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
			>
				{category}
			</button>
		{/each}
	</div>

	<!-- Grid -->
	<div class="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:gap-4 lg:gap-5">
		{#each filtered as book (book.slug)}
			<a
				href="/books/{book.slug}"
				animate:flip={{ duration: 450 }}
				in:fade={{ duration: 250 }}
				out:fade={{ duration: 150 }}
				class="group relative block aspect-square overflow-hidden bg-gray-100"
			>
				<img
					src={book.cover}
					alt={book.title}
					loading="lazy"
					class="h-full w-full object-cover object-center transition-transform duration-500
					       group-hover:scale-[1.03]"
				/>

				<!-- Hover: transparent → black gradient with title + year -->
				<div
					class="pointer-events-none absolute inset-0 flex flex-col justify-end
					       bg-gradient-to-t from-black/85 via-black/25 to-transparent
					       p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100
					       md:p-6 lg:p-8"
				>
					<h2
						class="font-sans text-[18px] leading-tight font-medium text-white md:text-[22px] lg:text-[26px]"
					>
						{book.title}
					</h2>
					{#if book.year}
						<p class="mt-1 font-sans text-[13px] text-white/75 md:text-[15px]">
							{book.year}
						</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="mt-6 font-sans text-gray-500">No books in this category yet.</p>
	{/if}
</section>
