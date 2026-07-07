<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { posts, images } = $derived(data);

	function postDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function isoDate(dateStr: string) {
		return new Date(dateStr).toISOString().split('T')[0];
	}

	function resolve(path: string) {
		return images[path] || path;
	}
</script>

<Seo title="Blog" description="Notes, sketches, and writing by Rhea Pradeep." />

<div class="px-6 py-12 md:px-10 lg:px-[169px] lg:py-[72px]">
	<div class="h-feed mx-auto max-w-[600px]">
		<span class="hidden p-author h-card">
			<a class="u-url p-name" href="/about">Rhea Pradeep</a>
		</span>

		{#if posts.length === 0}
			<p class="font-sans text-sm text-gray-400">Nothing here yet.</p>
		{:else}
			<div class="space-y-16 md:space-y-24">
				{#each posts as post (post.slug)}
					{@const meta = post.metadata}
					{@const hasImage = !!meta.image}
					{@const hasTitle = !!meta.title}

					<article class="h-entry">
						<!-- Date -->
						{#if meta.date}
							<time
								class="dt-published mb-5 block font-sans text-[11px] tracking-[1.5px] uppercase text-gray-300"
								datetime={isoDate(meta.date)}
							>
								{postDate(meta.date)}
							</time>
						{/if}

						<!-- Image -->
						{#if hasImage}
							<div class="mb-5">
								<a href="/blog/{post.slug}" class="u-url block">
									<img src={resolve(meta.image)} alt={meta.title || ''} class="u-photo w-full" />
								</a>
							</div>
						{/if}

						<!-- Title -->
						{#if hasTitle}
							<h2
								class="p-name mb-4 font-sans font-normal leading-snug
								       {hasImage ? 'text-[20px] md:text-[22px]' : 'text-[26px] md:text-[32px]'}"
							>
								{#if !hasImage}
									<a href="/blog/{post.slug}" class="u-url hover:underline">{meta.title}</a>
								{:else}
									{meta.title}
								{/if}
							</h2>
						{/if}

						<!-- Body -->
						{#if post.component}
							<div
								class="e-content font-sans leading-[1.8] text-gray-700
								       {hasTitle || hasImage
									? 'text-[15px] md:text-[17px]'
									: 'text-[19px] md:text-[22px] text-gray-800'}"
							>
								<svelte:component this={post.component} />
							</div>
						{/if}

						<!-- Permalink -->
						<div class="mt-5 text-right">
							<a
								href="/blog/{post.slug}"
								class="u-url font-sans text-[11px] tracking-[1px] text-gray-300 transition-colors hover:text-gray-500"
							>↗</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</div>
