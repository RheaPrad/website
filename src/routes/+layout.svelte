<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import portrait from '$lib/content/home-page/portrait_r.webp';
	import * as Popover from '$lib/components/ui/popover';
	import { page } from '$app/state';
	import linkedinIcon from '$lib/assets/icons/LinkedIn.png';
	import instagramIcon from '$lib/assets/icons/Instagram.png';
	import mailIcon from '$lib/assets/icons/Mail.png';
	import blueskyIcon from '$lib/assets/icons/Bluesky.png';

	let { children } = $props();

	// Home is a full-bleed carousel with its own overlaid social icons
	const isHome = $derived(page.url.pathname === '/');

	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '/art/books', label: 'books' },
		{ href: '/art/comics', label: 'comics' },
		{ href: '/blog', label: 'blog' },
		{ href: '/about', label: 'contact' }
	];

	const socialLinks = [
		{ href: 'https://linkedin.com/in/rhea-pradeep', icon: linkedinIcon, label: 'LinkedIn' },
		{ href: 'https://instagram.com', icon: instagramIcon, label: 'Instagram' },
		{ href: 'mailto:hello@rheapradeep.com', icon: mailIcon, label: 'Email' },
		{ href: 'https://bsky.app', icon: blueskyIcon, label: 'Bluesky' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- ─── Header ─────────────────────────────────────────────── -->
<header class="flex h-[109px] items-center bg-primary px-6 lg:px-[26px]">
	<!-- Logo -->
	<a href="/" class="flex-shrink-0">
		<img class="h-[58px] w-[58px] rounded-full object-cover" src={portrait} alt="Rhea Pradeep" />
	</a>

	<!-- Desktop nav -->
	<nav
		class="ml-auto hidden items-center gap-10 font-display text-[20px]
		       font-medium tracking-[2.6px] text-white lg:flex"
	>
		{#each navLinks as link}
			<a href={link.href} class="transition-opacity hover:opacity-70">{link.label}</a>
		{/each}
	</nav>

	<!-- Mobile hamburger -->
	<div class="ml-auto flex lg:hidden">
		<Popover.Root bind:open={mobileOpen}>
			<Popover.Trigger>
				{#snippet child({ props })}
					<button
						{...props}
						class="flex touch-manipulation items-center gap-2.5 text-white"
						aria-label="Toggle menu"
					>
						<div class="relative flex h-8 w-5 items-center justify-center">
							<div class="relative size-5">
								<span
									class="absolute start-0 block h-0.5 w-5 bg-white transition-all duration-100
									       {mobileOpen ? 'top-[0.5rem] -rotate-45' : 'top-1'}"
								></span>
								<span
									class="absolute start-0 block h-0.5 w-5 bg-white transition-all duration-100
									       {mobileOpen ? 'top-[0.5rem] rotate-45' : 'top-3'}"
								></span>
							</div>
						</div>
						<span class="font-display text-[16px] font-medium tracking-[2.6px]"> Menu </span>
					</button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content
				class="mt-8 w-(--bits-popover-content-available-width) rounded-none
				       border-none
				       bg-primary p-0 shadow-none backdrop-blur-sm"
				align="end"
				side="bottom"
				sideOffset={0}
			>
				<nav class="flex flex-col justify-end gap-8 px-6 py-10 text-right">
					{#each navLinks as link}
						<a
							href={link.href}
							onclick={() => {
								mobileOpen = false;
							}}
							class="font-display text-[28px]
							       font-medium tracking-[2.6px] text-white transition-opacity hover:opacity-70"
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
<main class="flex-1">
	{@render children()}
</main>

<!-- ─── Footer ────────────────────────────────────────────── -->
{#if !isHome}
<footer
	class="flex h-[109px] items-center justify-center gap-6 bg-primary
	       px-6 lg:justify-end lg:gap-[51px] lg:px-[26px]"
>
	{#each socialLinks as s (s.label)}
		<a
			href={s.href}
			aria-label={s.label}
			target={s.href.startsWith('mailto:') ? undefined : '_blank'}
			rel="noopener noreferrer"
			class="flex h-[39px] w-[39px] items-center justify-center rounded-full bg-white
			       transition-transform hover:scale-110"
		>
			<img src={s.icon} alt={s.label} class="h-[30px] w-[30px] object-contain" />
		</a>
	{/each}
</footer>
{/if}
