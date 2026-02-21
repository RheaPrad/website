<script lang="ts">
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const book = $derived(metadata ?? {});
</script>

<SiteLayout>
	<article class="container mx-auto px-4 py-12">
		<!-- Hero image -->
		{#if book.cover_image}
			<div class="mb-12">
				<img
					src={images[book.cover_image] || book.cover_image}
					alt={book.title}
					class="h-96 w-full object-cover rounded-lg"
				/>
			</div>
		{/if}

		<!-- Book info -->
		<div class="mb-12 max-w-3xl">
			<h1 class="mb-4 text-4xl font-bold">{book.title}</h1>
			<div class="mb-6 flex flex-wrap gap-4 text-gray-600">
				{#if book.year}
					<span>{book.year}</span>
				{/if}
				{#if book.format}
					<span>{book.format}</span>
				{/if}
			</div>

			<!-- Description/Body -->
			<div class="prose prose-lg">
				{#if component}
					<component.default />
				{/if}
			</div>
		</div>

		<!-- Gallery -->
		{#if book.gallery && book.gallery.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-bold">Gallery</h2>
				<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{#each book.gallery as image}
						<img
							src={images[image] || image}
							alt={book.title}
							class="aspect-square w-full object-cover rounded"
						/>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Other projects -->
		{#if book.other_projects && book.other_projects.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-bold">Other Projects</h2>
				<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{#each book.other_projects as projectSlug}
						<a href="/art/books/{projectSlug}" class="group">
							<div class="aspect-square overflow-hidden rounded bg-gray-200 group-hover:opacity-80 transition">
								<div class="flex items-center justify-center h-full text-gray-600">
									{projectSlug}
								</div>
							</div>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Back link -->
		<div class="mt-12">
			<a href="/art/books" class="text-blue-600 hover:underline">← Back to Books</a>
		</div>
	</article>
</SiteLayout>
