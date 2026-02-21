<script lang="ts">
	import { page } from '$app/stores';
	import { Linkedin, Mail, Instagram } from '@lucide/svelte';

	interface Props {
		children?: any;
	}

	let { children }: Props = $props();
</script>

<!-- Top bar -->
<header class="sticky top-0 z-50 bg-[#363b51] text-white">
	<div class="container mx-auto flex items-center justify-between px-4 py-4">
		<a href="/" class="flex items-center gap-2">
			<div class="h-10 w-10 rounded-full bg-white"></div>
			<span class="font-semibold">Rhea Pradeep</span>
		</a>

		<nav class="hidden gap-8 md:flex">
			<a href="/art/books" class="transition hover:text-[#a8b2d1]">Books</a>
			<a href="/art/comics" class="transition hover:text-[#a8b2d1]">Comics</a>
			<a href="/about" class="transition hover:text-[#a8b2d1]">About</a>
		</nav>

		<!-- Mobile menu button -->
		<button class="md:hidden rounded px-3 py-2 hover:bg-gray-700">
			Menu
		</button>
	</div>
</header>

<!-- Main content -->
<main class="min-h-screen">
	{@render children()}
</main>

<!-- Footer -->
<footer class="bg-[#363b51] text-white">
	<div class="container mx-auto px-4 py-8">
		<div class="flex items-center justify-center gap-4">
			<a
				href="https://linkedin.com/in/rhea-pradeep"
				aria-label="LinkedIn"
				class="transition hover:text-[#a8b2d1]"
			>
				<Linkedin size={20} />
			</a>
			<a
				href="mailto:hello@rheapradeep.com"
				aria-label="Email"
				class="transition hover:text-[#a8b2d1]"
			>
				<Mail size={20} />
			</a>
			<a
				href="https://instagram.com"
				aria-label="Instagram"
				class="transition hover:text-[#a8b2d1]"
			>
				<Instagram size={20} />
			</a>
		</div>
	</div>
</footer>
