<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import BiggerPicture from 'bigger-picture/svelte';
	import 'bigger-picture/css';

	let bp: any;

	onMount(() => {
		bp = BiggerPicture({
			target: document.body
		});

		// Delegate clicks on .gallery-link to BiggerPicture
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest('a.gallery-link') as HTMLAnchorElement;

			if (link) {
				e.preventDefault();

				// Find all gallery links container / sibling items
				// We can just query all links to make a global gallery or scoped to a container
				// Usually, it's scoped to the closest common container or just all gallery links
				const container = link.closest('.bp-gallery-container') || document.body;
				const items = container.querySelectorAll('a.gallery-link');

				bp.open({
					items,
					el: link
				});
			}
		};

		document.body.addEventListener('click', handleClick);

		return () => {
			document.body.removeEventListener('click', handleClick);
		};
	});
</script>
