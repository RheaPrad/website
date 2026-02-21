<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import portrait from '$lib/content/home-page/portrait_r.webp';
	import { Linkedin, Instagram, Mail } from '@lucide/svelte';
	import * as Popover from '$lib/components/ui/popover';

	let { children } = $props();

	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '/art/books', label: 'books' },
		{ href: '/art/comics', label: 'comics' },
		{ href: '/about', label: 'contact' }
	];

	const blueskyPath =
		'M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07c-20.703 73.984-96.144 92.854-163.25 81.433c117.3 19.964 147.14 86.092 82.697 152.22c-122.39 125.59-175.91-31.511-189.63-71.766c-2.514-7.38-3.69-10.832-3.708-7.896c-0.017-2.936-1.193.516-3.707 7.896c-13.714 40.255-67.233 197.36-189.63 71.766c-64.444-66.128-34.605-132.26 82.697-152.22c-67.108 11.421-142.55-7.45-163.25-81.433C20.155 217.613 10 86.535 10 68.825c0-88.687 77.742-60.816 125.72-24.795z';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- ─── Header ─────────────────────────────────────────────── -->
<header class="bg-[#363b51] h-[109px] flex items-center px-6 lg:px-[26px]">
	<!-- Logo -->
	<a href="/" class="flex-shrink-0">
		<img class="w-[58px] h-[58px] rounded-full object-cover" src={portrait} alt="Rhea Pradeep" />
	</a>

	<!-- Desktop nav -->
	<nav
		class="hidden lg:flex justify-between w-[1076px] mx-auto text-white
		       font-display font-medium text-[20px] tracking-[2.6px]"
	>
		{#each navLinks as link}
			<a href={link.href} class="hover:opacity-70 transition-opacity">{link.label}</a>
		{/each}
	</nav>

	<!-- Mobile hamburger -->
	<div class="flex lg:hidden ml-auto">
		<Popover.Root bind:open={mobileOpen}>
			<Popover.Trigger>
				{#snippet child({ props })}
					<button
						{...props}
						class="flex items-center gap-2.5 text-white touch-manipulation"
						aria-label="Toggle menu"
					>
						<div class="relative flex h-8 w-5 items-center justify-center">
							<div class="relative size-5">
								<span
									class="bg-white absolute start-0 block h-0.5 w-5 transition-all duration-100
									       {mobileOpen ? 'top-[0.5rem] -rotate-45' : 'top-1'}"
								></span>
								<span
									class="bg-white absolute start-0 block h-0.5 w-5 transition-all duration-100
									       {mobileOpen ? 'top-[0.5rem] rotate-45' : 'top-3'}"
								></span>
							</div>
						</div>
						<span
							class="font-display font-medium text-[16px] tracking-[2.6px]"
						>
							Menu
						</span>
					</button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content
				class="bg-[#363b51]/95 backdrop-blur-sm
				       w-(--bits-popover-content-available-width)
				       rounded-none border-none shadow-none p-0"
				align="end"
				side="bottom"
				sideOffset={0}
			>
				<nav class="flex flex-col gap-8 px-6 py-10">
					{#each navLinks as link}
						<a
							href={link.href}
							onclick={() => {
								mobileOpen = false;
							}}
							class="text-white font-display
							       font-medium text-[28px] tracking-[2.6px] hover:opacity-70 transition-opacity"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</Popover.Content>
		</Popover.Root>
	</div>
</header>

<!-- ─── Page content ──────────────────────────────────────── -->
{@render children()}

<!-- ─── Footer ────────────────────────────────────────────── -->
<footer
	class="bg-[#363b51] h-[109px] flex items-center justify-center lg:justify-end
	       px-6 lg:px-[26px] gap-6 lg:gap-[51px]"
>
	<a
		href="https://linkedin.com/in/rhea-pradeep"
		aria-label="LinkedIn"
		target="_blank"
		rel="noopener noreferrer"
		class="w-[39px] h-[39px] rounded-full border border-white/40 flex items-center justify-center
		       text-white hover:border-white transition-colors"
	>
		<Linkedin size={18} />
	</a>
	<a
		href="https://instagram.com"
		aria-label="Instagram"
		target="_blank"
		rel="noopener noreferrer"
		class="w-[39px] h-[39px] rounded-full border border-white/40 flex items-center justify-center
		       text-white hover:border-white transition-colors"
	>
		<Instagram size={18} />
	</a>
	<a
		href="mailto:hello@rheapradeep.com"
		aria-label="Email"
		class="w-[39px] h-[39px] rounded-full border border-white/40 flex items-center justify-center
		       text-white hover:border-white transition-colors"
	>
		<Mail size={18} />
	</a>
	<a
		href="https://bsky.app"
		aria-label="Bluesky"
		target="_blank"
		rel="noopener noreferrer"
		class="w-[39px] h-[39px] rounded-full border border-white/40 flex items-center justify-center
		       text-white hover:border-white transition-colors"
	>
		<svg width="18" height="18" viewBox="0 0 600 530" fill="currentColor" aria-hidden="true">
			<path d={blueskyPath} />
		</svg>
	</a>
</footer>
