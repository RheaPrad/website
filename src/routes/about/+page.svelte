<script lang="ts">
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const about = $derived(metadata ?? {});
</script>

<SiteLayout>
	<article class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			<!-- Photo -->
			<div class="flex items-center justify-center">
				{#if about.photo}
					<img
						src={images[about.photo] || about.photo}
						alt="Rhea Pradeep"
						class="h-96 w-96 rounded-lg object-cover"
					/>
				{:else}
					<div class="h-96 w-96 rounded-lg bg-gray-200 flex items-center justify-center">
						<span class="text-gray-500">Photo</span>
					</div>
				{/if}
			</div>

			<!-- Bio and contact -->
			<div>
				<h1 class="mb-6 text-4xl font-bold">About</h1>

				{#if component}
					<div class="prose prose-lg mb-8">
						<component.default />
					</div>
				{/if}

				<!-- Social links -->
				<div class="mt-8 space-y-3 pt-8 border-t">
					<h2 class="font-semibold">Contact</h2>
					{#if about.email}
						<div>
							<a href="mailto:{about.email}" class="text-blue-600 hover:underline">
								{about.email}
							</a>
						</div>
					{/if}
					{#if about.linkedin}
						<div>
							<a href={about.linkedin} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
								LinkedIn
							</a>
						</div>
					{/if}
					{#if about.instagram}
						<div>
							<a href={about.instagram} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
								Instagram
							</a>
						</div>
					{/if}
					{#if about.bluesky}
						<div>
							<a href={about.bluesky} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
								Bluesky
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</article>
</SiteLayout>
