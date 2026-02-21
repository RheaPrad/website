<script lang="ts">
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { books, images } = $derived(data);
</script>

<SiteLayout>
	<section class="container mx-auto px-4 py-12">
		<h1 class="mb-12 text-4xl font-bold">Books</h1>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each books as book}
				<a href="/art/books/{book.slug}" class="group block">
					<div class="mb-4 overflow-hidden rounded-lg bg-gray-100">
						{#if book.metadata.cover_image}
							<img
								src={images[book.metadata.cover_image] || book.metadata.cover_image}
								alt={book.metadata.title}
								class="aspect-[3/4] w-full object-cover group-hover:scale-105 transition duration-200"
							/>
						{:else}
							<div class="aspect-[3/4] flex items-center justify-center">
								<span class="text-gray-400">No cover</span>
							</div>
						{/if}
					</div>
					<h2 class="font-semibold group-hover:underline">{book.metadata.title}</h2>
					{#if book.metadata.year}
						<p class="text-sm text-gray-600">{book.metadata.year}</p>
					{/if}
				</a>
			{/each}
		</div>

		{#if books.length === 0}
			<p class="text-gray-600">No books found.</p>
		{/if}
	</section>
</SiteLayout>
