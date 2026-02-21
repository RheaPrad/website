<script lang="ts">
	import portrait from '$lib/content/home-page/checkers.webp';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { homeMeta, recentPosts, buildDate, books, comics, images } = $derived(data);

	const featuredBook = $derived(resolve(homeMeta.featured_book ?? ''));
	const featuredComic = $derived(resolve(homeMeta.featured_comic ?? ''));

	const buildDateFormatted = $derived(
		new Date(buildDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
	);

	function shortDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function resolve(path: string) {
		return images[path] || path;
	}
</script>

<!-- Hero -->
<section class="relative h-[340px] overflow-hidden md:h-[500px] lg:h-[440px]">
	<img
		src={portrait}
		alt="Rhea Pradeep"
		class="absolute inset-0 h-full w-full object-cover object-[25%_35%]"
	/>
	<div
		class="absolute inset-0 flex items-end justify-end bg-black/30
		       px-6 pb-8 md:px-10 md:pb-12 lg:pb-[80px] lg:pl-[169px]"
	>
		<div class="text-right text-white">
			<h1
				class="font-display text-[36px]
				       leading-none font-medium tracking-[3px]
				       uppercase md:text-[52px] lg:text-[72px] lg:tracking-[4px]"
			>
				Rhea Pradeep
			</h1>
			<p
				class="mt-3 font-sans
				       text-[16px] font-normal tracking-[0.5px] md:text-[20px] lg:mt-4 lg:text-[24px]"
			>
				Visual storyteller &amp; illustrator
			</p>
		</div>
	</div>
</section>

<!-- ── Status line ──────────────────────────────────────────────── -->
<div class="pt-16">
	<div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
		<!-- Label -->
		<span class="self-center pb-0.5 font-sans text-[11px] tracking-[1px] text-gray-500 uppercase">
			added
		</span>

		<!-- Book thumbnails -->
		{#each books as book (book.slug)}
			{#if book.cover}
				<a
					href="/art/books/{book.slug}"
					class="flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
				>
					<img src={resolve(book.cover)} alt={book.title} class="h-[52px] w-[39px] object-cover" />
					<span class="max-w-[56px] text-center font-sans text-[10px] leading-tight text-gray-500">
						{book.title}
					</span>
					{#if book.year}
						<span class="font-sans text-[9px] leading-none text-gray-500">{book.year}</span>
					{/if}
				</a>
			{/if}
		{/each}

		<!-- Divider -->
		{#if comics.length > 0}
			<span class="self-center pb-4 font-sans text-[13px] text-gray-200">/</span>
		{/if}

		<!-- Comic thumbnails -->
		{#each comics as comic (comic.slug)}
			{#if comic.image}
				<a
					href="/art/comics"
					class="flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
				>
					<img
						src={resolve(comic.image)}
						alt={comic.title}
						class="h-[52px] w-[65px] object-cover"
					/>
					<span class="max-w-[70px] text-center font-sans text-[10px] leading-tight text-gray-500">
						{comic.title}
					</span>
					{#if comic.year}
						<span class="font-sans text-[9px] leading-none text-gray-500">{comic.year}</span>
					{/if}
				</a>
			{/if}
		{/each}

		<!-- Build date -->
		<span class="ml-1 self-center pb-0.5 font-sans text-[11px] text-gray-500">
			— {buildDateFormatted}
		</span>
	</div>
</div>

<!-- Featured Work -->
<section class="px-6 py-10 md:px-10 md:py-14 lg:px-[169px] lg:py-[80px]">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
		<!-- Books -->
		<a href="/art/books" class="group block">
			<div class="mb-4 overflow-hidden">
				<img
					src={featuredBook}
					alt="Books"
					class="aspect-3/4 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
			</div>
			<div class="flex items-center justify-between">
				<span
					class="font-display text-[16px] font-medium tracking-[2.6px] uppercase md:text-[20px]"
				>
					Books
				</span>
				<span class="text-[18px] transition-transform duration-200 group-hover:translate-x-1"
					>→</span
				>
			</div>
		</a>

		<!-- Comics -->
		<a href="/art/comics" class="group block">
			<div class="mb-4 overflow-hidden">
				<img
					src={featuredComic}
					alt="Comics"
					class="aspect-3/4 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
			</div>
			<div class="flex items-center justify-between">
				<span
					class="font-display text-[16px] font-medium tracking-[2.6px] uppercase md:text-[20px]"
				>
					Comics
				</span>
				<span class="text-[18px] transition-transform duration-200 group-hover:translate-x-1"
					>→</span
				>
			</div>
		</a>

		<!-- Notebook -->
		<a href="/blog" class="group block">
			<div
				class="mb-4 flex aspect-3/4 flex-col justify-end overflow-hidden bg-[#363b51] p-6 md:p-8"
			>
				{#if recentPosts.length > 0}
					<p class="mb-2 font-sans text-[11px] tracking-[1.5px] text-white/50 uppercase">Latest</p>
					<p class="font-sans text-[18px] leading-snug text-white md:text-[20px]">
						{recentPosts[0].metadata.title || 'Untitled'}
					</p>
					{#if recentPosts[0].metadata.date}
						<p class="mt-2 font-sans text-[12px] text-white/50">
							{shortDate(recentPosts[0].metadata.date)}
						</p>
					{/if}
				{:else}
					<p class="font-sans text-[16px] text-white/60">Notes &amp; observations</p>
				{/if}
			</div>
			<div class="flex items-center justify-between">
				<span
					class="font-display text-[16px] font-medium tracking-[2.6px] uppercase md:text-[20px]"
				>
					Blog
				</span>
				<span class="text-[18px] transition-transform duration-200 group-hover:translate-x-1"
					>→</span
				>
			</div>
		</a>
	</div>
</section>
