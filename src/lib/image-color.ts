/**
 * Client-side extraction of a hero image's dominant colour and top-strip
 * brightness. Used to tint the book title and pick a contrasting nav colour.
 * Runs only in the browser (needs canvas).
 */
export type HeroColors = {
	/** Legible-on-white dominant colour, e.g. "rgb(70, 110, 90)" */
	dominant: string;
	/** True when the top of the image is light (=> nav should use dark text) */
	lightTop: boolean;
};

function relLuminance(r: number, g: number, b: number) {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getHeroColors(src: string): Promise<HeroColors> {
	return new Promise((resolve) => {
		const fallback: HeroColors = { dominant: '', lightTop: true };
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => {
			try {
				const w = 72;
				const h = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth));
				const canvas = document.createElement('canvas');
				canvas.width = w;
				canvas.height = h;
				const ctx = canvas.getContext('2d', { willReadFrequently: true });
				if (!ctx) return resolve(fallback);
				ctx.drawImage(img, 0, 0, w, h);
				const { data } = ctx.getImageData(0, 0, w, h);

				const buckets = new Map<string, { r: number; g: number; b: number; w: number }>();
				const topRows = Math.max(1, Math.round(h * 0.16));
				let topLum = 0;
				let topCount = 0;

				for (let y = 0; y < h; y++) {
					for (let x = 0; x < w; x++) {
						const i = (y * w + x) * 4;
						const r = data[i];
						const g = data[i + 1];
						const b = data[i + 2];
						const a = data[i + 3];
						if (a < 128) continue;

						if (y < topRows) {
							topLum += relLuminance(r, g, b);
							topCount++;
						}

						const max = Math.max(r, g, b);
						const min = Math.min(r, g, b);
						const sat = max === 0 ? 0 : (max - min) / max;
						// Favour saturated, mid-tone pixels; ignore near-black / near-white
						const lum = relLuminance(r, g, b);
						if (lum < 22 || lum > 236) continue;
						const weight = 1 + sat * 4;

						const key = `${r >> 4},${g >> 4},${b >> 4}`;
						const e = buckets.get(key) ?? { r: 0, g: 0, b: 0, w: 0 };
						e.r += r * weight;
						e.g += g * weight;
						e.b += b * weight;
						e.w += weight;
						buckets.set(key, e);
					}
				}

				let best: { r: number; g: number; b: number; w: number } | null = null;
				for (const e of buckets.values()) if (!best || e.w > best.w) best = e;

				let dominant = '';
				if (best) {
					let r = Math.round(best.r / best.w);
					let g = Math.round(best.g / best.w);
					let b = Math.round(best.b / best.w);
					// Ensure legibility on white: darken if too light
					const lum = relLuminance(r, g, b);
					if (lum > 165) {
						const k = 165 / lum;
						r = Math.round(r * k);
						g = Math.round(g * k);
						b = Math.round(b * k);
					}
					dominant = `rgb(${r}, ${g}, ${b})`;
				}

				const avgTop = topCount ? topLum / topCount : 255;
				resolve({ dominant, lightTop: avgTop > 140 });
			} catch {
				resolve(fallback);
			}
		};
		img.onerror = () => resolve(fallback);
		img.src = src;
	});
}
