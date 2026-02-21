<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const post = $derived(metadata ?? {});

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function isoDate(dateStr: string) {
		return new Date(dateStr).toISOString().split('T')[0];
	}
</script>

<article
	class="h-entry px-6 pt-10 pb-16
	       md:px-10 md:pt-12
	       lg:px-[169px] lg:pt-[72px] lg:pb-[80px]"
>
	<!-- p-author h-card -->
	<span class="p-author h-card hidden">
		<a class="u-url p-name" href="/about">Rhea Pradeep</a>
	</span>

	<!-- Date -->
	{#if post.date}
		<time
			class="dt-published mb-4 block font-sans text-[13px] text-gray-400 md:text-[14px]"
			datetime={isoDate(post.date)}
		>
			{formatDate(post.date)}
		</time>
	{/if}

	<!-- Image -->
	{#if post.image}
		<div class="mb-6 md:mb-8">
			<img
				src={images[post.image] || post.image}
				alt={post.title || ''}
				class="u-photo w-full object-cover"
			/>
		</div>
	{/if}

	<!-- Title -->
	{#if post.title}
		<h1 class="p-name mb-6 font-sans text-[28px] font-normal md:text-[36px] lg:mb-8 lg:text-[48px]">
			{post.title}
		</h1>
	{/if}

	<!-- Body -->
	{#if component}
		<div
			class="e-content max-w-[720px] font-sans text-[15px] leading-[1.7] md:text-[18px] lg:text-[20px]"
		>
			<svelte:component this={component} />
		</div>
	{/if}

	<!-- Back link -->
	<div class="mt-10 lg:mt-[56px]">
		<a
			href="/blog"
			class="font-sans text-[14px] text-gray-400 transition-colors hover:text-gray-800"
		>
			← blog
		</a>
	</div>
</article>
