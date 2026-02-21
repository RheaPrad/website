<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const book = $derived(metadata ?? {});
</script>

<!-- Full-bleed hero image -->
{#if book.cover_image}
	<div class="h-[240px] w-full md:h-[480px] lg:h-[860px]">
		<img
			src={images[book.cover_image] || book.cover_image}
			alt={book.title}
			class="h-full w-full object-cover"
		/>
	</div>
{/if}

<!-- Info block -->
<div
	class="px-6 pt-8 pb-8
	       md:px-10 md:pt-12 md:pb-10
	       lg:pt-[72px] lg:pr-[169px] lg:pb-[56px] lg:pl-[169px]"
>
	<h1
		class="mb-3 font-sans
		       text-[26px] font-normal md:text-[36px] lg:mb-4 lg:text-[48px]"
	>
		{book.title}{book.date ? `, ${new Date(book.date).getFullYear()}` : ''}
	</h1>
	{#if book.format}
		<p
			class="mb-6 font-sans
			       text-[15px] font-normal text-gray-600 md:text-[18px] lg:mb-8 lg:text-[20px]"
		>
			{book.format}
		</p>
	{/if}

	{#if component}
		<div
			class="max-w-[720px] font-sans
			       text-[15px] leading-[1.7] font-normal md:text-[18px] lg:text-[20px]"
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
	<section class="flex flex-col items-center gap-4 px-6 py-10 lg:py-[56px]">
		<h2
			class="mb-2
			       font-display text-[22px] tracking-[0.32px] uppercase lg:mb-4 lg:text-[32px]"
		>
			Other Projects
		</h2>
		<p
			class="flex
			       flex-wrap justify-center gap-2 text-center
			       font-display text-[14px] tracking-[2px] lg:gap-0 lg:text-[20px] lg:tracking-[2.6px]"
		>
			{#each book.other_projects as slug, i}
				<a href="/art/books/{slug}" class="capitalize hover:underline">
					{slug.replace(/-/g, ' ')}
				</a>{#if i < book.other_projects.length - 1}<span class="mx-3 text-gray-400 lg:mx-4">|</span
					>{/if}
			{/each}
		</p>
	</section>
{/if}
