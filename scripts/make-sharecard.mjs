#!/usr/bin/env node
/**
 * Generates the default social share card (Open Graph / Twitter image) as a
 * 1200×630 collage of the comics. This is a placeholder — a purpose-made card
 * can replace static/sharecard.jpg later. Uses `sharp` (no system deps), so it
 * runs in CI too. Run manually with: node scripts/make-sharecard.mjs
 */
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const COMICS_DIR = 'src/lib/content/art-page/comics';
const OUT = 'static/sharecard.jpg';

const W = 1200;
const H = 630;
const GAP = 12;
// Muted sage green — matches the site's --primary (oklch(0.619 0.0719 155.11)).
const BG = { r: 124, g: 152, b: 129 };

const cellW = Math.floor((W - GAP * 3) / 2);
const cellH = Math.floor((H - GAP * 3) / 2);

const positions = [
	{ left: GAP, top: GAP },
	{ left: GAP * 2 + cellW, top: GAP },
	{ left: GAP, top: GAP * 2 + cellH },
	{ left: GAP * 2 + cellW, top: GAP * 2 + cellH }
];

// Wide 4-koma reads best in a landscape cell, so lead with it.
const order = [
	'rhea-pradeep_4koma.webp',
	'rhea-pradeep_crosscutting.webp',
	'rhea-pradeep_wordless-2.webp',
	'teaching-comic.webp'
];

const available = new Set(readdirSync(COMICS_DIR).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)));
const files = order.filter((f) => available.has(f)).slice(0, 4);
if (files.length < 4) {
	// Backfill with whatever else is present so we always fill the grid.
	for (const f of available) {
		if (files.length >= 4) break;
		if (!files.includes(f)) files.push(f);
	}
}

const cells = await Promise.all(
	files.slice(0, 4).map(async (file, i) => ({
		input: await sharp(join(COMICS_DIR, file))
			.resize(cellW, cellH, { fit: 'cover', position: 'attention' })
			.toBuffer(),
		left: positions[i].left,
		top: positions[i].top
	}))
);

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
	.composite(cells)
	.jpeg({ quality: 84, mozjpeg: true })
	.toFile(OUT);

console.log(`Wrote ${OUT} (${W}×${H}) from ${files.length} comics.`);
