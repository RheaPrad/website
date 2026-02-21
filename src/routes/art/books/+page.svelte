<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { books, images } = $derived(data);
</script>

<section class="px-6 pt-10 pb-12 md:px-10 md:pt-12 lg:px-[169px] lg:pt-[72px] lg:pb-[80px]">
	<h1
		class="font-['Inter_Variable',sans-serif] font-normal
		       text-[32px] md:text-[40px] lg:text-[48px] mb-8 lg:mb-[56px]"
	>
		BOOKS
	</h1>

	<div class="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
		{#each books as book}
			<a href="/art/books/{book.slug}" class="group block">
				<div class="overflow-hidden mb-3 md:mb-4">
					{#if book.metadata.cover_image}
						<img
							src={images[book.metadata.cover_image] || book.metadata.cover_image}
							alt={book.metadata.title}
							class="aspect-3/4 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
						/>
					{:else}
						<div class="aspect-3/4 bg-gray-100 flex items-center justify-center">
							<span class="text-gray-400 text-sm">No cover</span>
						</div>
					{/if}
				</div>
				<p
					class="font-['Inter_Variable',sans-serif] font-normal
					       text-[14px] md:text-[18px] lg:text-[20px] group-hover:underline"
				>
					{book.metadata.title}
				</p>
				{#if book.metadata.year}
					<p class="font-['Inter_Variable',sans-serif] text-[13px] md:text-[15px] text-gray-500 mt-1">
						{book.metadata.year}
					</p>
				{/if}
			</a>
		{/each}
	</div>

	{#if books.length === 0}
		<p class="font-['Inter_Variable',sans-serif] text-gray-600">No books found.</p>
	{/if}
</section>
