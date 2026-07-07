<!--
	Email link with click-to-copy on desktop, mailto on mobile/touch.
	On pointer devices, clicking copies the address and a tooltip confirms it.
	On touch devices (no hover), it falls through to normal mailto behaviour.
-->
<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Snippet } from 'svelte';

	interface Props {
		email: string;
		label?: string;
		class?: string;
		side?: 'top' | 'right' | 'bottom' | 'left';
		children: Snippet;
	}

	let { email, label = 'Email', class: className = '', side = 'top', children }: Props = $props();

	let isDesktop = $state(false);
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	$effect(() => {
		const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
		isDesktop = mq.matches;
		const onChange = (e: MediaQueryListEvent) => (isDesktop = e.matches);
		mq.addEventListener('change', onChange);
		return () => {
			mq.removeEventListener('change', onChange);
			clearTimeout(timer);
		};
	});

	async function handleClick(event: MouseEvent) {
		// Touch devices keep the native mailto behaviour.
		if (!isDesktop || !navigator.clipboard) return;

		event.preventDefault();
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			// Clipboard blocked — let the tooltip label stay as-is.
			return;
		}
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1600);
	}
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<a
					{...props}
					href={`mailto:${email}`}
					aria-label={label}
					class={className}
					onclick={handleClick}
				>
					{@render children()}
				</a>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content {side}>
			{copied ? 'Copied!' : 'Click to copy'}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
