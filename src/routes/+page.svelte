<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import { Pause, Play } from '@lucide/svelte';
	import instagramIcon from '$lib/assets/icons/Instagram.png';
	import linkedinIcon from '$lib/assets/icons/LinkedIn.png';
	import mailIcon from '$lib/assets/icons/Mail.png';
	import behanceIcon from '$lib/assets/icons/Behance.png';
	import blueskyIcon from '$lib/assets/icons/Bluesky.png';
	import EmailLink from '$lib/components/EmailLink.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { slides, socials, seo } = $derived(data);

	let api = $state<CarouselAPI>();
	let paused = $state(false);
	let selected = $state(0);

	// Track the active slide so we can show its caption
	$effect(() => {
		if (!api) return;
		const update = () => (selected = api!.selectedScrollSnap());
		api.on('select', update);
		update();
		return () => api?.off('select', update);
	});

	// Autoplay — advance while not paused (a single slide never loops)
	$effect(() => {
		if (!api || paused || slides.length < 2) return;
		const id = setInterval(() => api?.scrollNext(), 4500);
		return () => clearInterval(id);
	});

	const caption = $derived(slides[selected]?.caption ?? '');

	const socialLinks = $derived(
		[
			{ key: 'instagram', href: socials.instagram, icon: instagramIcon, label: 'Instagram' },
			{ key: 'linkedin', href: socials.linkedin, icon: linkedinIcon, label: 'LinkedIn' },
			{
				key: 'email',
				href: socials.email ? `mailto:${socials.email}` : '',
				icon: mailIcon,
				label: 'Email'
			},
			{ key: 'behance', href: socials.behance, icon: behanceIcon, label: 'Behance' },
			{ key: 'bluesky', href: socials.bluesky, icon: blueskyIcon, label: 'Bluesky' }
		].filter((s) => s.href)
	);

	function togglePause() {
		paused = !paused;
	}
</script>

<Seo type="profile" title={seo?.title} description={seo?.description} image={seo?.image} />

<!-- Full-bleed looping carousel — click anywhere to pause/play -->
<section class="relative h-[calc(100vh-109px)] w-full overflow-hidden bg-black select-none">
	<Carousel.Root class="h-full" opts={{ loop: true }} setApi={(a) => (api = a)}>
		<Carousel.Content class="ms-0 h-full">
			{#each slides as slide (slide.src)}
				<Carousel.Item class="h-full ps-0">
					<img
						src={slide.src}
						alt={slide.caption || ''}
						draggable="false"
						class="h-[calc(100vh-109px)] w-full object-cover object-center"
					/>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>

	<!-- Click surface for pause/play (sits above the carousel, below overlays) -->
	<button
		type="button"
		class="absolute inset-0 z-10 cursor-pointer"
		onclick={togglePause}
		aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
	></button>

	<!-- Optional caption (CMS-driven, per slide) -->
	{#if caption}
		<div
			class="pointer-events-none absolute right-6 bottom-20 left-6 z-20 md:bottom-6 md:max-w-[60%]"
		>
			<p
				class="font-sans text-[15px] leading-snug font-normal text-white
				       [text-shadow:0_1px_6px_rgba(0,0,0,0.6)] md:text-[18px]"
			>
				{caption}
			</p>
		</div>
	{/if}

	<!-- Pause indicator -->
	<div
		class="pointer-events-none absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center
		       rounded-full bg-black/25 text-white backdrop-blur-sm transition-opacity duration-300
		       {paused ? 'opacity-100' : 'opacity-0'}"
		aria-hidden="true"
	>
		{#if paused}
			<Play size={16} />
		{:else}
			<Pause size={16} />
		{/if}
	</div>

	<!-- Social icons (above the click surface, so links stay clickable) -->
	<div class="absolute right-5 bottom-5 z-20 flex items-center gap-1.5">
		{#each socialLinks as s (s.key)}
			{#if s.href.startsWith('mailto:')}
				<EmailLink
					email={s.href.slice('mailto:'.length)}
					label={s.label}
					side="top"
					class="block h-10 w-10 transition-transform hover:scale-110"
				>
					<img
						src={s.icon}
						alt={s.label}
						class="h-full w-full object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
					/>
				</EmailLink>
			{:else}
				<a
					href={s.href}
					aria-label={s.label}
					target="_blank"
					rel="noopener noreferrer"
					class="block h-10 w-10 transition-transform hover:scale-110"
				>
					<img
						src={s.icon}
						alt={s.label}
						class="h-full w-full object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
					/>
				</a>
			{/if}
		{/each}
	</div>
</section>
