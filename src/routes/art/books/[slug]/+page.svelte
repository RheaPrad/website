<script lang="ts">
	import { ImageWithSkeleton } from '$lib/components/ui/image-with-skeleton';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images, otherBooks } = $derived(data);
	const book = $derived(metadata ?? {});
</script>

<!-- Full-bleed hero image -->
{#if book.cover_image}
	<div class="h-[240px] w-full md:h-[480px] lg:h-[860px]">
		<ImageWithSkeleton
			src={images[book.cover_image] || book.cover_image}
			alt={book.title}
			fill
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
			{#each book.gallery as g}
				{@const image = typeof g === 'string' ? g : g.image}
				<ImageWithSkeleton src={images[image] || image} alt={book.title} aspectRatio="3/4" />
			{/each}
		</div>
	</section>
{/if}

<!-- More Books -->
{#if otherBooks && otherBooks.length > 0}
	<section
		class="border-t border-gray-100 px-6 py-10
		       md:px-10 md:py-14
		       lg:px-[169px] lg:py-[80px]"
	>
		<h2
			class="mb-6 font-display text-[14px] tracking-[2px] uppercase text-gray-400
			       md:text-[15px] lg:mb-10"
		>
			More Books
		</h2>
		<div class="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
			{#each otherBooks as other}
				<a href="/art/books/{other.slug}" class="group block">
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
