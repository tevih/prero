import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { parseHTML } from 'linkedom';
import { beforeAll, describe, expect, it } from 'vitest';

const DIST = resolve(__dirname, '../../dist');

/** Mirrors astro.config.mjs — GitHub Pages serves the site under /<repo>/. */
const BASE = (process.env.BASE_PATH ?? '/prero').replace(/\/$/, '');

/** Turns a built href back into a dist-relative route. */
const toRoute = (href: string) => {
	const path = href.split('#')[0].split('?')[0];
	return path.startsWith(BASE) ? path.slice(BASE.length) || '/' : path;
};

/** Every .html file in dist, keyed by the route that serves it. */
function collectPages(dir: string, pages: Record<string, string> = {}) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) collectPages(full, pages);
		else if (entry.name === 'index.html') {
			const rel = relative(DIST, full).replace(/index\.html$/, '');
			pages[`/${rel}`] = readFileSync(full, 'utf8');
		}
	}
	return pages;
}

let pages: Record<string, string>;
const docs = new Map<string, ReturnType<typeof parseHTML>['document']>();

beforeAll(() => {
	if (!existsSync(DIST)) {
		throw new Error('dist/ is missing — run `npm run build` before the build tests.');
	}
	pages = collectPages(DIST);
	for (const [route, html] of Object.entries(pages)) {
		docs.set(route, parseHTML(html).document);
	}
});

const PAGE_ROUTES = ['/', '/bio/', '/contact/', '/supporting-mdd/', '/work/'];

describe('build output', () => {
	it('emits every top-level route plus one page per project', () => {
		const routes = Object.keys(pages);
		for (const route of PAGE_ROUTES) expect(routes, route).toContain(route);
		const projectRoutes = routes.filter((r) => r.startsWith('/work/') && r !== '/work/');
		expect(projectRoutes).toHaveLength(17);
		expect(routes).toHaveLength(PAGE_ROUTES.length + 17);
	});

	it('gives each page a unique, non-empty title and description', () => {
		const titles = new Set<string>();
		for (const [route, doc] of docs) {
			const title = doc.querySelector('title')?.textContent?.trim() ?? '';
			const desc = doc
				.querySelector('meta[name="description"]')
				?.getAttribute('content')
				?.trim();

			expect(title, `${route} title`).not.toBe('');
			expect(title, `${route} title`).toContain('Gabriel Prero');
			expect(titles.has(title), `${route} duplicate title "${title}"`).toBe(false);
			titles.add(title);

			expect(desc, `${route} description`).toBeTruthy();
			expect(desc!.length, `${route} description length`).toBeGreaterThan(40);
		}
	});

	it('declares a language and a favicon on every page', () => {
		for (const [route, doc] of docs) {
			expect(doc.documentElement.getAttribute('lang'), `${route} lang`).toBe('en');
			expect(doc.querySelector('link[rel="icon"]'), `${route} favicon`).not.toBeNull();
		}
	});

	it('renders no unresolved template values', () => {
		for (const [route, html] of Object.entries(pages)) {
			expect(html, `${route} undefined`).not.toMatch(/>\s*undefined\s*</);
			expect(html, `${route} NaN`).not.toMatch(/>\s*NaN\s*</);
			expect(html, `${route} object`).not.toContain('[object Object]');
		}
	});
});

describe('accessibility basics', () => {
	it('gives every page exactly one h1', () => {
		for (const [route, doc] of docs) {
			expect(doc.querySelectorAll('h1').length, `${route} h1 count`).toBe(1);
		}
	});

	it('never skips a heading level', () => {
		for (const [route, doc] of docs) {
			const levels = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
				Number(h.tagName[1]),
			);
			for (let i = 1; i < levels.length; i++) {
				expect(
					levels[i] - levels[i - 1],
					`${route} jumps h${levels[i - 1]} → h${levels[i]}`,
				).toBeLessThanOrEqual(1);
			}
		}
	});

	it('gives every image meaningful alt text', () => {
		for (const [route, doc] of docs) {
			const imgs = [...doc.querySelectorAll('img')];
			for (const img of imgs) {
				const alt = img.getAttribute('alt');
				expect(alt, `${route} ${img.getAttribute('src')} alt`).toBeTruthy();
				expect(alt!.trim().length, `${route} alt too short`).toBeGreaterThan(3);
			}
		}
	});

	it('offers a skip link that targets the main landmark', () => {
		for (const [route, doc] of docs) {
			const skip = doc.querySelector('a[href="#main"]');
			expect(skip, `${route} skip link`).not.toBeNull();
			expect(doc.querySelector('#main'), `${route} #main target`).not.toBeNull();
			expect(doc.querySelectorAll('main').length, `${route} main count`).toBe(1);
		}
	});

	it('labels every nav landmark', () => {
		for (const [route, doc] of docs) {
			for (const nav of doc.querySelectorAll('nav')) {
				expect(
					nav.getAttribute('aria-label'),
					`${route} unlabelled nav`,
				).toBeTruthy();
			}
		}
	});

	it('marks the current page in the primary nav', () => {
		for (const [route, doc] of docs) {
			const current = doc.querySelectorAll('a[aria-current="page"]');
			expect(current.length, `${route} aria-current`).toBe(1);
		}
	});

	it('gives external links rel="noopener noreferrer"', () => {
		for (const [route, doc] of docs) {
			for (const a of doc.querySelectorAll('a[target="_blank"]')) {
				expect(a.getAttribute('rel'), `${route} ${a.getAttribute('href')}`).toContain(
					'noopener',
				);
			}
		}
	});
});

describe('links', () => {
	it('resolves every internal link to a built route', () => {
		for (const [route, doc] of docs) {
			for (const a of doc.querySelectorAll('a[href^="/"]')) {
				const href = a.getAttribute('href')!;
				expect(
					Object.keys(pages),
					`${route} links to missing route ${href}`,
				).toContain(toRoute(href));
			}
		}
	});

	it('prefixes every internal link and asset with the deploy base', () => {
		for (const [route, doc] of docs) {
			const refs = [
				...[...doc.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')!),
				...[...doc.querySelectorAll('img[src^="/"]')].map((i) => i.getAttribute('src')!),
				...[...doc.querySelectorAll('link[href^="/"]')].map((l) => l.getAttribute('href')!),
			];
			for (const ref of refs) {
				expect(ref, `${route} unprefixed ${ref}`).toMatch(new RegExp(`^${BASE}/`));
			}
		}
	});

	it('resolves every in-page anchor to an element that exists', () => {
		for (const [route, doc] of docs) {
			for (const a of doc.querySelectorAll('a[href^="#"]')) {
				const id = a.getAttribute('href')!.slice(1);
				if (!id) continue;
				expect(doc.getElementById(id), `${route} dangling anchor #${id}`).not.toBeNull();
			}
		}
	});

	it('exposes contact details as actionable mailto/tel links', () => {
		const doc = docs.get('/contact/')!;
		expect(doc.querySelector('a[href^="mailto:"]')).not.toBeNull();
		expect(doc.querySelector('a[href^="tel:+1"]')).not.toBeNull();
	});
});

describe('content made it into the HTML', () => {
	it('lists all 17 projects on the work page', () => {
		const doc = docs.get('/work/')!;
		expect(doc.querySelectorAll('ol > li').length).toBe(17);
		expect(doc.querySelectorAll('article').length).toBe(17);
	});

	it('renders the alarm-clock story with its single red accent', () => {
		const doc = docs.get('/')!;
		expect(doc.body.textContent).toContain(
			'I entered the field of design because of my alarm clock.',
		);
		// The story lives in the one section set on ink; scope to it so the
		// section-head numerals elsewhere on the page do not count.
		const story = doc.querySelector('section.bg-ink')!;
		expect(story, 'origin section').not.toBeNull();
		const accents = story.querySelectorAll('span.text-red');
		expect(accents.length, 'exactly one accented word in the story').toBe(1);
		expect(accents[0].textContent).toBe('better');
	});

	it('renders all 12 tips with matching anchors in the guide', () => {
		const doc = docs.get('/supporting-mdd/')!;
		for (let i = 1; i <= 12; i++) {
			expect(doc.getElementById(`tip-${i}`), `tip-${i} section`).not.toBeNull();
		}
		expect(doc.querySelectorAll('section[id^="tip-"]').length).toBe(12);
	});

	it('carries a crisis resource on the guide', () => {
		const text = docs.get('/supporting-mdd/')!.body.textContent ?? '';
		expect(text).toContain('988');
		expect(text).toContain('Suicide');
	});

	it('shows the copyright credit in the footer of every page', () => {
		for (const [route, doc] of docs) {
			const footer = doc.querySelector('footer')?.textContent ?? '';
			expect(footer, `${route} credit`).toContain('Gabriel Prero 2023');
		}
	});
});

describe('image pipeline', () => {
	it('serves optimised webp with responsive srcset and explicit dimensions', () => {
		for (const [route, doc] of docs) {
			for (const img of doc.querySelectorAll('img')) {
				const src = img.getAttribute('src') ?? '';
				expect(src, `${route} unoptimised image ${src}`).toMatch(
					new RegExp(`^${BASE}/_astro/.*\\.webp$`),
				);
				expect(img.getAttribute('width'), `${route} width attr`).toBeTruthy();
				expect(img.getAttribute('height'), `${route} height attr`).toBeTruthy();
				expect(img.getAttribute('srcset'), `${route} srcset`).toBeTruthy();
			}
		}
	});

	it('lazy-loads images below the fold', () => {
		const doc = docs.get('/work/')!;
		const lazy = [...doc.querySelectorAll('img')].filter(
			(i) => i.getAttribute('loading') === 'lazy',
		);
		expect(lazy.length).toBeGreaterThan(10);
	});
});

describe('project detail pages', () => {
	const detailRoutes = () =>
		Object.keys(pages).filter((r) => r.startsWith('/work/') && r !== '/work/');

	it('is reachable from every card on the work index', () => {
		const doc = docs.get('/work/')!;
		const linked = new Set(
			[...doc.querySelectorAll('a[href^="/"]')]
				.map((a) => toRoute(a.getAttribute('href')!))
				.filter((r) => r.startsWith('/work/') && r !== '/work/'),
		);
		// 17 index rows and 17 plates both link out, deduped to 17 destinations.
		expect(linked.size).toBe(17);
		for (const route of detailRoutes()) expect(linked, route).toContain(route);
	});

	it('wraps every plate image in a link on the index pages', () => {
		for (const route of ['/', '/work/']) {
			const doc = docs.get(route)!;
			for (const article of doc.querySelectorAll('article')) {
				const link = article.querySelector('a');
				expect(link, `${route} card without a link`).not.toBeNull();
				expect(link!.querySelector('img'), `${route} link without an image`).not.toBeNull();
				expect(link!.getAttribute('href'), `${route} card href`).toMatch(/\/work\/[a-z0-9-]+\/$/);
			}
		}
	});

	it('gives each project a lead image, narrative and gallery', () => {
		for (const route of detailRoutes()) {
			const doc = docs.get(route)!;
			const imgs = doc.querySelectorAll('img');
			expect(imgs.length, `${route} images`).toBeGreaterThanOrEqual(4);

			const text = doc.body.textContent ?? '';
			expect(text.length, `${route} copy length`).toBeGreaterThan(400);

			expect(doc.querySelectorAll('figure').length, `${route} plates`).toBeGreaterThanOrEqual(3);
			expect(doc.querySelector('h1')?.textContent?.trim(), `${route} h1`).toBeTruthy();
		}
	});

	it('offers previous/next navigation that lands on real projects', () => {
		for (const route of detailRoutes()) {
			const doc = docs.get(route)!;
			const nav = doc.querySelector('nav[aria-label="Project navigation"]');
			expect(nav, `${route} prev/next nav`).not.toBeNull();

			const targets = [...nav!.querySelectorAll('a')].map((a) =>
				toRoute(a.getAttribute('href')!),
			);
			expect(targets, `${route} prev/next count`).toHaveLength(2);
			for (const t of targets) {
				expect(detailRoutes(), `${route} → ${t}`).toContain(t);
				expect(t, `${route} links to itself`).not.toBe(route);
			}
		}
	});

	it('links back to the work index from every project', () => {
		for (const route of detailRoutes()) {
			const hrefs = [...docs.get(route)!.querySelectorAll('a[href^="/"]')].map((a) =>
				toRoute(a.getAttribute('href')!),
			);
			expect(hrefs, `${route} back link`).toContain('/work/');
		}
	});

	it('numbers plates in the captions without gaps', () => {
		for (const route of detailRoutes()) {
			const doc = docs.get(route)!;
			const captions = [...doc.querySelectorAll('figcaption')].map(
				(c) => c.textContent?.replace(/\s+/g, ' ').trim() ?? '',
			);
			captions.forEach((caption, i) => {
				const n = String(i + 1).padStart(2, '0');
				expect(caption, `${route} caption ${i}`).toBe(
					`${n} / ${String(captions.length).padStart(2, '0')}`,
				);
			});
		}
	});
});

describe('shared hosting artifacts', () => {
	it('ships a 404 page with working navigation', () => {
		const file = join(DIST, '404.html');
		expect(existsSync(file), 'dist/404.html').toBe(true);

		const doc = parseHTML(readFileSync(file, 'utf8')).document;
		expect(doc.querySelectorAll('h1')).toHaveLength(1);
		expect(doc.querySelector('title')?.textContent).toContain('Gabriel Prero');

		// Apache serves this from any depth, so its links must resolve absolutely.
		const links = [...doc.querySelectorAll('a[href^="/"]')].map((a) =>
			toRoute(a.getAttribute('href')!),
		);
		for (const route of PAGE_ROUTES) {
			expect(links, `404 links to ${route}`).toContain(route);
		}
	});

	it('ships an .htaccess that Apache can use', () => {
		const file = join(DIST, '.htaccess');
		expect(existsSync(file), 'dist/.htaccess — public/ dotfiles must be copied').toBe(true);

		const conf = readFileSync(file, 'utf8');
		expect(conf, 'directory index').toContain('DirectoryIndex index.html');
		expect(conf, 'error document').toContain('ErrorDocument 404 /404.html');
		expect(conf, 'immutable asset caching').toMatch(/max-age=31536000, immutable/);
		expect(conf, 'html must revalidate').toMatch(/max-age=0, must-revalidate/);
	});
});
