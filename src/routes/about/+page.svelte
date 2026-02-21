<script lang="ts">
	import { Linkedin, Instagram, Mail } from '@lucide/svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { metadata, component, images } = $derived(data);
	const about = $derived(metadata ?? {});

	const blueskyPath =
		'M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07c-20.703 73.984-96.144 92.854-163.25 81.433c117.3 19.964 147.14 86.092 82.697 152.22c-122.39 125.59-175.91-31.511-189.63-71.766c-2.514-7.38-3.69-10.832-3.708-7.896c-0.017-2.936-1.193.516-3.707 7.896c-13.714 40.255-67.233 197.36-189.63 71.766c-64.444-66.128-34.605-132.26 82.697-152.22c-67.108 11.421-142.55-7.45-163.25-81.433C20.155 217.613 10 86.535 10 68.825c0-88.687 77.742-60.816 125.72-24.795z';
</script>

<article
	class="px-6 pt-10 pb-12
	       md:px-10 md:pt-12
	       lg:pl-[131px] lg:pr-[131px] lg:pt-[72px] lg:pb-[80px]"
>
	<!-- Main layout: stacked on mobile, side-by-side on lg -->
	<div class="flex flex-col gap-10 lg:flex-row lg:gap-[80px] lg:items-start">
		<!-- Left: heading + bio -->
		<div class="flex-1 min-w-0 order-2 lg:order-1">
			<h1
				class="font-sans font-normal
				       text-[32px] md:text-[40px] lg:text-[48px] mb-8 lg:mb-[40px]"
			>
				CONTACT
			</h1>

			{#if component}
				<div
					class="font-sans font-normal
					       text-[15px] md:text-[18px] lg:text-[20px] leading-[1.7]"
				>
					<svelte:component this={component} />
				</div>
			{/if}
		</div>

		<!-- Right: photo -->
		<div class="w-full order-1 lg:order-2 lg:w-[564px] lg:shrink-0">
			{#if about.photo}
				<img
					src={images[about.photo] || about.photo}
					alt="Rhea Pradeep"
					class="w-full h-[280px] md:h-[420px] lg:h-[680px] object-cover object-top"
				/>
			{:else}
				<div
					class="w-full h-[280px] md:h-[420px] lg:h-[680px] bg-gray-100
					       flex items-center justify-center"
				>
					<span class="text-gray-400">Photo</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Social icons -->
	<div class="flex justify-center gap-6 lg:gap-[51px] mt-12 lg:mt-[80px]">
		{#if about.linkedin}
			<a
				href={about.linkedin}
				aria-label="LinkedIn"
				target="_blank"
				rel="noopener noreferrer"
				class="w-[39px] h-[39px] rounded-full bg-[#363b51] flex items-center justify-center
				       text-white hover:opacity-80 transition-opacity"
			>
				<Linkedin size={18} />
			</a>
		{/if}
		{#if about.instagram}
			<a
				href={about.instagram}
				aria-label="Instagram"
				target="_blank"
				rel="noopener noreferrer"
				class="w-[39px] h-[39px] rounded-full bg-[#363b51] flex items-center justify-center
				       text-white hover:opacity-80 transition-opacity"
			>
				<Instagram size={18} />
			</a>
		{/if}
		{#if about.email}
			<a
				href="mailto:{about.email}"
				aria-label="Email"
				class="w-[39px] h-[39px] rounded-full bg-[#363b51] flex items-center justify-center
				       text-white hover:opacity-80 transition-opacity"
			>
				<Mail size={18} />
			</a>
		{/if}
		{#if about.bluesky}
			<a
				href={about.bluesky}
				aria-label="Bluesky"
				target="_blank"
				rel="noopener noreferrer"
				class="w-[39px] h-[39px] rounded-full bg-[#363b51] flex items-center justify-center
				       text-white hover:opacity-80 transition-opacity"
			>
				<svg width="18" height="18" viewBox="0 0 600 530" fill="currentColor" aria-hidden="true">
					<path d={blueskyPath} />
				</svg>
			</a>
		{/if}
	</div>
</article>
