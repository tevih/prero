// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves the repo at https://<user>.github.io/<repo>/.
// Override with SITE / BASE_PATH when deploying somewhere else (a custom
// domain wants SITE=https://example.com and BASE_PATH=/).
const site = process.env.SITE ?? 'https://tevih.github.io';
const base = process.env.BASE_PATH ?? '/prero';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	devToolbar: { enabled: false },
	vite: {
		plugins: [tailwindcss()],
	},
});
