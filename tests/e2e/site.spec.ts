import { expect, test, type Page } from '@playwright/test';

const BASE = process.env.BASE_PATH ?? '/prero';
const path = (p: string) => `${BASE}${p}`;

const PAGES = [
	{ route: '/', heading: 'Gabriel Prero' },
	{ route: '/work/', heading: 'Work' },
	{ route: '/bio/', heading: 'Bio' },
	{ route: '/contact/', heading: 'Say hello' },
	{ route: '/supporting-mdd/', heading: 'For Dummies' },
	{ route: '/design-guide/', heading: 'Design guide' },
];

/** Fails the test if the page logs an error or throws. */
function watchForErrors(page: Page) {
	const errors: string[] = [];
	page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
	page.on('pageerror', (err) => errors.push(err.message));
	return errors;
}

test.describe('pages', () => {
	for (const { route, heading } of PAGES) {
		test(`${route} renders with one h1 and no console errors`, async ({ page }) => {
			const errors = watchForErrors(page);
			const response = await page.goto(path(route));

			expect(response?.status()).toBe(200);
			const h1 = page.locator('h1');
			await expect(h1).toHaveCount(1);
			await expect(h1).toContainText(heading);
			await expect(page).toHaveTitle(/Gabriel Prero/);
			expect(errors, `console errors on ${route}`).toEqual([]);
		});
	}

	test('marks the current page in the nav', async ({ page }) => {
		await page.goto(path('/bio/'));
		await expect(page.locator('a[aria-current="page"]')).toHaveCount(1);
		await expect(page.locator('a[aria-current="page"]').first()).toContainText(/Bio/i);
	});
});

test.describe('project detail', () => {
	test('opens a project by clicking its image on the work index', async ({ page }) => {
		await page.goto(path('/work/'));

		const card = page.locator('article a').first();
		const href = await card.getAttribute('href');
		expect(href).toMatch(/\/work\/[a-z0-9-]+\/$/);

		// Click the image itself, which is what the request was about.
		await card.locator('img').click();
		await page.waitForURL(`**${href}`);

		await expect(page.locator('h1')).toHaveCount(1);
		await expect(page.locator('figure img').first()).toBeVisible();
	});

	test('opens a project from the typographic index row', async ({ page }) => {
		await page.goto(path('/work/'));
		const row = page.locator('ol li a').first();
		const href = await row.getAttribute('href');
		await row.click();
		await page.waitForURL(`**${href}`);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('is reachable by keyboard and opens on Enter', async ({ page }) => {
		await page.goto(path('/work/'));
		const card = page.locator('article a').first();
		const href = await card.getAttribute('href');

		await card.focus();
		await expect(card).toBeFocused();
		await page.keyboard.press('Enter');
		await page.waitForURL(`**${href}`);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('shows the lead image, narrative and numbered plates', async ({ page }) => {
		await page.goto(path('/work/closets-by-liberty/'));

		await expect(page.locator('h1')).toContainText('Closets By Liberty');
		await expect(page.getByText('Liberty Hardware').first()).toBeVisible();

		const plates = page.locator('figure');
		await expect(plates.first()).toBeVisible();
		expect(await plates.count()).toBeGreaterThanOrEqual(3);
		await expect(page.locator('figcaption').first()).toHaveText(/^01 \/ \d\d$/);
	});

	test('walks to the next project and back to the index', async ({ page }) => {
		await page.goto(path('/work/closets-by-liberty/'));
		const first = await page.locator('h1').textContent();

		await page.getByRole('link', { name: /Next/ }).click();
		await expect(page.locator('h1')).not.toHaveText(first!);

		await page.getByRole('link', { name: /All work/ }).click();
		await page.waitForURL(`**${path('/work/')}`);
		await expect(page.locator('h1')).toContainText('Work');
	});

	test('every project page loads without errors', async ({ page }) => {
		await page.goto(path('/work/'));
		const hrefs = await page.locator('ol li a').evaluateAll((els) =>
			els.map((e) => (e as HTMLAnchorElement).getAttribute('href')!),
		);
		expect(hrefs.length).toBeGreaterThanOrEqual(1);

		for (const href of hrefs) {
			const errors = watchForErrors(page);
			const res = await page.goto(href);
			expect(res?.status(), href).toBe(200);
			await expect(page.locator('h1'), href).toHaveCount(1);
			expect(errors, href).toEqual([]);
		}
	});
});

test.describe('imagery', () => {
	test('renders plates in grayscale and restores colour on hover', async ({ page }) => {
		test.skip(
			test.info().project.name === 'mobile',
			'hover is not a meaningful gesture on touch',
		);

		await page.goto(path('/work/'));
		const img = page.locator('article img').first();
		await img.scrollIntoViewIfNeeded();

		await expect(img).toHaveCSS('filter', /grayscale\(1\)/);
		await img.hover();
		// The transition settles on grayscale(0) rather than dropping the filter.
		await expect(img).toHaveCSS('filter', /grayscale\(0\)/);
	});
});

test.describe('navigation', () => {
	test('mobile menu opens, lists every page and closes', async ({ page }) => {
		test.skip(test.info().project.name !== 'mobile', 'menu is mobile-only');

		await page.goto(path('/'));
		// The button's label flips to "Close", so hold it by id, not by name.
		const toggle = page.locator('#menu-toggle');
		const panel = page.locator('#menu-panel');

		await expect(panel).toBeHidden();
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect(toggle).toHaveText('Menu');

		await toggle.click();
		await expect(panel).toBeVisible();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		await expect(toggle).toHaveText('Close');
		await expect(panel.locator('a')).toHaveCount(5);

		await toggle.click();
		await expect(panel).toBeHidden();
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect(toggle).toHaveText('Menu');
	});

	test('the mobile menu navigates', async ({ page }) => {
		test.skip(test.info().project.name !== 'mobile', 'menu is mobile-only');

		await page.goto(path('/'));
		await page.locator('#menu-toggle').click();
		await page.locator('#menu-panel a', { hasText: 'Work' }).click();
		await page.waitForURL(`**${path('/work/')}`);
		await expect(page.locator('h1')).toContainText('Work');
	});

	test('the skip link is the first stop and reaches the main landmark', async ({ page }) => {
		await page.goto(path('/'));
		const skip = page.locator('a[href="#main"]');

		// Safari only tabs to links when the user opts in, so assert tab order
		// on Chromium and verify the link itself works on every engine.
		if (test.info().project.name === 'desktop') {
			await page.keyboard.press('Tab');
			await expect(skip).toBeFocused();
		}

		await skip.focus();
		// It is visually hidden until focused, then it must be readable.
		await expect(skip).toBeVisible();
		await skip.press('Enter');
		await expect(page).toHaveURL(/#main$/);
		await expect(page.locator('#main')).toBeVisible();
	});

	test('guide anchors jump to the matching tip', async ({ page }) => {
		await page.goto(path('/supporting-mdd/'));
		await page.locator('a[href="#tip-4"]').click();
		await expect(page.locator('#tip-4')).toBeInViewport();
	});
});

test.describe('motion', () => {
	test('reveals content on scroll', async ({ page }) => {
		await page.goto(path('/'));
		const revealed = page.locator('[data-reveal].is-in').first();
		await expect(revealed).toHaveCount(1);
		await expect(revealed).toHaveCSS('opacity', '1');
	});

	test('shows all content immediately under prefers-reduced-motion', async ({ browser }) => {
		const context = await browser.newContext({ reducedMotion: 'reduce' });
		const page = await context.newPage();
		await page.goto(path('/'));

		// With motion off the reveal styles never apply, so nothing is transparent.
		const hidden = await page
			.locator('[data-reveal]')
			.evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
		expect(hidden).toBe(0);
		await context.close();
	});
});
