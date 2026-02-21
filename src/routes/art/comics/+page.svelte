<script lang="ts">
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { comics, images } = $derived(data);
</script>

<SiteLayout>
	<section class="container mx-auto px-4 py-12">
		<h1 class="mb-12 text-4xl font-bold">Comics</h1>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			{#each comics as comic}
				<div class="group">
					<div class="block overflow-hidden rounded-lg bg-gray-100">
						{#if comic.metadata.image}
							<img
								src={images[comic.metadata.image] || comic.metadata.image}
								alt={comic.metadata.title}
								class="aspect-square w-full object-cover group-hover:scale-105 transition duration-200"
							/>
						{:else}
							<div class="aspect-square flex items-center justify-center">
								<span class="text-gray-400">No image</span>
							</div>
						{/if}
					</div>
					<h2 class="mt-4 text-xl font-semibold">{comic.metadata.title}</h2>
				</div>
			{/each}
		</div>

		{#if comics.length === 0}
			<p class="text-gray-600">No comics found.</p>
		{/if}
	</section>
</SiteLayout>
