<script lang="ts">
	interface Props {
		src: any;
		alt: string;
		class?: string;
		sizes?: string;
		fetchpriority?: 'high' | 'low' | 'auto';
		loading?: 'lazy' | 'eager';
		width?: number;
		height?: number;
		[key: string]: any;
	}

	let {
		src,
		alt,
		class: className = '',
		sizes,
		fetchpriority,
		loading,
		width,
		height,
		...restProps
	}: Props = $props();
</script>

{#if typeof src === 'object' && src !== null}
	<enhanced:img {src} {alt} class={className} {sizes} {fetchpriority} {loading} {...restProps} />
{:else}
	<img {src} {alt} class={className} {width} {height} {...restProps} />
{/if}
