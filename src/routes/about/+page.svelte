<script lang="ts">
	import type { PageData } from './$types';
	import linkedinIcon from '$lib/assets/icons/LinkedIn.png';
	import instagramIcon from '$lib/assets/icons/Instagram.png';
	import mailIcon from '$lib/assets/icons/Mail.png';
	import behanceIcon from '$lib/assets/icons/Behance.png';
	import blueskyIcon from '$lib/assets/icons/Bluesky.png';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const about = $derived(metadata ?? {});

	const socialLinks = $derived(
		[
			{ key: 'linkedin', href: about.linkedin, icon: linkedinIcon, label: 'LinkedIn' },
			{ key: 'instagram', href: about.instagram, icon: instagramIcon, label: 'Instagram' },
			{ key: 'email', href: about.email ? `mailto:${about.email}` : '', icon: mailIcon, label: 'Email' },
			{ key: 'behance', href: about.behance, icon: behanceIcon, label: 'Behance' },
			{ key: 'bluesky', href: about.bluesky, icon: blueskyIcon, label: 'Bluesky' }
		].filter((s) => s.href)
	);
</script>

<article
	class="px-6 pt-10 pb-12
	       md:px-10 md:pt-12
	       lg:pt-[72px] lg:pr-[131px] lg:pb-[80px] lg:pl-[131px]"
>
	<!-- Main layout: stacked on mobile, side-by-side on lg -->
	<div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[80px]">
		<!-- Left: heading + bio -->
		<div class="order-2 min-w-0 flex-1 lg:order-1">
			<h1
				class="mb-8 font-sans
				       text-[32px] font-normal md:text-[40px] lg:mb-[40px] lg:text-[48px]"
			>
				ABOUT
			</h1>

			{#if component}
				<div
					class="font-sans text-[15px]
					       leading-[1.7] font-normal md:text-[18px] lg:text-[20px]"
				>
					<svelte:component this={component} />
				</div>
			{/if}
		</div>

		<!-- Right: photo -->
		<div class="order-1 w-full lg:order-2 lg:w-[564px] lg:shrink-0">
			{#if about.photo}
				<img
					src={images[about.photo] || about.photo}
					alt="Rhea Pradeep"
					class="h-[280px] w-full object-cover object-top md:h-[420px] lg:h-[680px]"
				/>
			{:else}
				<div
					class="flex h-[280px] w-full items-center justify-center
					       bg-gray-100 md:h-[420px] lg:h-[680px]"
				>
					<span class="text-gray-400">Photo</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Contact section -->
	<div class="mt-12 lg:mt-[80px]">
		<h2 class="mb-6 font-sans text-[22px] font-normal md:text-[28px] lg:mb-8 lg:text-[32px]">
			GET IN TOUCH
		</h2>
		{#if about.email}
			<a
				href="mailto:{about.email}"
				class="font-sans text-[18px] text-gray-800 underline hover:opacity-70 md:text-[22px] lg:text-[26px]"
			>
				{about.email}
			</a>
		{/if}
	</div>

	<!-- Social icons -->
	<div class="mt-8 flex justify-start gap-4 lg:mt-10">
		{#each socialLinks as s (s.key)}
			<a
				href={s.href}
				aria-label={s.label}
				target={s.href.startsWith('mailto:') ? undefined : '_blank'}
				rel="noopener noreferrer"
				class="block h-[39px] w-[39px] transition-transform hover:scale-110"
			>
				<img src={s.icon} alt={s.label} class="h-full w-full object-contain" />
			</a>
		{/each}
	</div>
</article>
