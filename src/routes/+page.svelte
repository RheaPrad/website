<script lang="ts">
	import portrait from '$lib/content/home-page/portrait_r.jpg';
	import checkers from '$lib/content/home-page/checkers.jpg';
	import bookCover from '$lib/content/art-page/books/canidae/canidae_pages-to-jpg-0001.jpg';
	import comicImage from '$lib/content/art-page/comics/rhea-pradeep_crosscutting.png';
</script>

<!-- Hero -->
<section class="relative h-[340px] md:h-[500px] lg:h-[640px] overflow-hidden">
	<img
		src={portrait}
		alt="Rhea Pradeep"
		class="absolute inset-0 w-full h-full object-cover object-top"
	/>
	<div
		class="absolute inset-0 bg-black/30 flex items-end
		       pb-8 px-6 md:pb-12 md:px-10 lg:pb-[80px] lg:pl-[169px]"
	>
		<div class="text-white">
			<h1
				class="font-['Josefin_Sans_Variable',sans-serif] font-medium
				       text-[36px] md:text-[52px] lg:text-[72px]
				       tracking-[3px] lg:tracking-[4px] leading-none uppercase"
			>
				Rhea Pradeep
			</h1>
			<p
				class="font-['Inter_Variable',sans-serif] font-normal
				       text-[16px] md:text-[20px] lg:text-[24px] mt-3 lg:mt-4 tracking-[0.5px]"
			>
				visual storyteller &amp; illustrator
			</p>
		</div>
	</div>
</section>

<!-- Featured Work -->
<section class="px-6 py-10 md:px-10 md:py-14 lg:px-[169px] lg:py-[80px]">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
		<!-- Books -->
		<a href="/art/books" class="group block">
			<div class="overflow-hidden mb-4">
				<img
					src={bookCover}
					alt="Books"
					class="w-full aspect-3/4 object-cover group-hover:scale-[1.02] transition-transform duration-300"
				/>
			</div>
			<div class="flex items-center justify-between">
				<span
					class="font-['Josefin_Sans_Variable',sans-serif] font-medium
					       text-[16px] md:text-[20px] tracking-[2.6px] uppercase"
				>
					Books
				</span>
				<span class="text-[18px] group-hover:translate-x-1 transition-transform duration-200">→</span>
			</div>
		</a>

		<!-- Comics -->
		<a href="/art/comics" class="group block">
			<div class="overflow-hidden mb-4">
				<img
					src={comicImage}
					alt="Comics"
					class="w-full aspect-3/4 object-cover group-hover:scale-[1.02] transition-transform duration-300"
				/>
			</div>
			<div class="flex items-center justify-between">
				<span
					class="font-['Josefin_Sans_Variable',sans-serif] font-medium
					       text-[16px] md:text-[20px] tracking-[2.6px] uppercase"
				>
					Comics
				</span>
				<span class="text-[18px] group-hover:translate-x-1 transition-transform duration-200">→</span>
			</div>
		</a>

		<!-- Sketchbook -->
		<a href="/sketchbook" class="group block sm:col-span-2 lg:col-span-1">
			<div class="overflow-hidden mb-4">
				<img
					src={checkers}
					alt="Sketchbook"
					class="w-full aspect-3/4 object-cover group-hover:scale-[1.02] transition-transform duration-300"
				/>
			</div>
			<div class="flex items-center justify-between">
				<span
					class="font-['Josefin_Sans_Variable',sans-serif] font-medium
					       text-[16px] md:text-[20px] tracking-[2.6px] uppercase"
				>
					Sketchbook
				</span>
				<span class="text-[18px] group-hover:translate-x-1 transition-transform duration-200">→</span>
			</div>
		</a>
	</div>
</section>
