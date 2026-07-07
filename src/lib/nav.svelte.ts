/**
 * Shared nav state so a page can make the global header a transparent overlay
 * (for full-bleed heroes) and control its text colour. Pages set `transparent`
 * and `text` in an $effect and reset them on cleanup.
 */
export const navState = $state<{
	transparent: boolean;
	/** 'dark' = dark text (over light imagery), 'light' = white text */
	text: 'light' | 'dark';
}>({
	transparent: false,
	text: 'light'
});

export function resetNav() {
	navState.transparent = false;
	navState.text = 'light';
}
