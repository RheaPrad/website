<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { comics, images } = $derived(data);
</script>

<section
	class="px-6 pt-10 pb-12
	       md:px-10 md:pt-12
	       lg:pl-[131px] lg:pr-[131px] lg:pt-[72px] lg:pb-[80px]"
>
	<h1
		class="font-['Inter_Variable',sans-serif] font-normal
		       text-[32px] md:text-[40px] lg:text-[48px] mb-8 lg:mb-[56px]"
	>
		COMICS
	</h1>

	<div class="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
		{#each comics as comic}
			<div>
				{#if comic.metadata.image}
					<img
						src={images[comic.metadata.image] || comic.metadata.image}
						alt={comic.metadata.title}
						class="w-full object-contain"
					/>
				{:else}
					<div class="w-full h-48 md:h-64 bg-gray-100 flex items-center justify-center">
						<span class="text-gray-400">No image</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	{#if comics.length === 0}
		<p class="font-['Inter_Variable',sans-serif] text-gray-600">No comics found.</p>
	{/if}
</section>
