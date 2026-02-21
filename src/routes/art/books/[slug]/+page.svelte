<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const book = $derived(metadata ?? {});
</script>

<!-- Full-bleed hero image -->
{#if book.cover_image}
	<div class="w-full h-[240px] md:h-[480px] lg:h-[860px]">
		<img
			src={images[book.cover_image] || book.cover_image}
			alt={book.title}
			class="w-full h-full object-cover"
		/>
	</div>
{/if}

<!-- Info block -->
<div
	class="px-6 pt-8 pb-8
	       md:px-10 md:pt-12 md:pb-10
	       lg:pl-[169px] lg:pr-[169px] lg:pt-[72px] lg:pb-[56px]"
>
	<h1
		class="font-['Inter_Variable',sans-serif] font-normal
		       text-[26px] md:text-[36px] lg:text-[48px] mb-3 lg:mb-4"
	>
		{book.title}{book.year ? `, ${book.year}` : ''}
	</h1>
	{#if book.format}
		<p
			class="font-['Inter_Variable',sans-serif] font-normal
			       text-[15px] md:text-[18px] lg:text-[20px] text-gray-600 mb-6 lg:mb-8"
		>
			{book.format}
		</p>
	{/if}

	{#if component}
		<div
			class="font-['Inter_Variable',sans-serif] font-normal
			       text-[15px] md:text-[18px] lg:text-[20px] leading-[1.7] max-w-[720px]"
		>
			<svelte:component this={component} />
		</div>
	{/if}
</div>

<!-- Gallery -->
{#if book.gallery && book.gallery.length > 0}
	<section
		class="px-6 pb-10
		       md:px-10 md:pb-14
		       lg:px-[169px] lg:pb-[80px]"
	>
		<div class="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-3 lg:gap-4">
			{#each book.gallery as image}
				<img src={images[image] || image} alt={book.title} class="w-full object-cover" />
			{/each}
		</div>
	</section>
{/if}

<!-- Other Projects -->
{#if book.other_projects && book.other_projects.length > 0}
	<section class="py-10 lg:py-[56px] flex flex-col items-center gap-4 px-6">
		<h2
			class="font-['Josefin_Sans_Variable',sans-serif]
			       text-[22px] lg:text-[32px] tracking-[0.32px] uppercase mb-2 lg:mb-4"
		>
			Other Projects
		</h2>
		<p
			class="font-['Josefin_Sans_Variable',sans-serif]
			       text-[14px] lg:text-[20px] tracking-[2px] lg:tracking-[2.6px]
			       text-center flex flex-wrap justify-center gap-2 lg:gap-0"
		>
			{#each book.other_projects as slug, i}
				<a href="/art/books/{slug}" class="hover:underline capitalize">
					{slug.replace(/-/g, ' ')}
				</a>{#if i < book.other_projects.length - 1}<span class="mx-3 lg:mx-4 text-gray-400">|</span>{/if}
			{/each}
		</p>
	</section>
{/if}
