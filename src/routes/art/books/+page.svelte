<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { books, images } = $derived(data);
</script>

<section class="px-6 pt-10 pb-12 md:px-10 md:pt-12 lg:px-[169px] lg:pt-[72px] lg:pb-[80px]">
	<h1
		class="mb-8 font-sans
		       text-[32px] font-normal md:text-[40px] lg:mb-[56px] lg:text-[48px]"
	>
		BOOKS
	</h1>

	<div class="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
		{#each books as book}
			<a href="/art/books/{book.slug}" class="group block">
				<div class="mb-3 overflow-hidden md:mb-4">
					{#if book.metadata.cover_image}
						<img
							src={images[book.metadata.cover_image] || book.metadata.cover_image}
							alt={book.metadata.title}
							class="aspect-3/4 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
						/>
					{:else}
						<div class="flex aspect-3/4 items-center justify-center bg-gray-100">
							<span class="text-sm text-gray-400">No cover</span>
						</div>
					{/if}
				</div>
				<p
					class="font-sans text-[14px]
					       font-normal group-hover:underline md:text-[18px] lg:text-[20px]"
				>
					{book.metadata.title}
				</p>
				{#if book.metadata.date}
					<p class="mt-1 font-sans text-[13px] text-gray-500 md:text-[15px]">
						{new Date(book.metadata.date).getFullYear()}
					</p>
				{/if}
			</a>
		{/each}
	</div>

	{#if books.length === 0}
		<p class="font-sans text-gray-600">No books found.</p>
	{/if}
</section>
