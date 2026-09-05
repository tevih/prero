/**
 * Prefixes a root-relative path with Astro's configured base.
 *
 * GitHub Pages serves this project at /<repo>/, so every internal link has to
 * carry that prefix. BASE_URL is '/' in dev and when deployed to a domain root.
 */
export function url(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}
