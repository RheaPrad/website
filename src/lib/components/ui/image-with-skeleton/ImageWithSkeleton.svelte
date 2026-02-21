<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';

	let {
		src,
		alt = '',
		class: className = '',
		aspectRatio = '3/4',
		fill = false
	}: {
		src: string;
		alt?: string;
		class?: string;
		aspectRatio?: string;
		/** When true, wrapper stretches to fill parent (no intrinsic aspect ratio) */
		fill?: boolean;
	} = $props();

	let loaded = $state(false);
</script>

<div
	class="relative overflow-hidden {fill ? 'h-full w-full' : ''}"
	style={fill ? undefined : `aspect-ratio: ${aspectRatio}`}
>
	{#if !loaded}
		<Skeleton class="absolute inset-0 h-full w-full rounded-none" />
	{/if}
	<img
		{src}
		{alt}
		class="h-full w-full object-cover transition-opacity duration-300 {loaded
			? 'opacity-100'
			: 'opacity-0'} {className}"
		onload={() => (loaded = true)}
	/>
</div>
