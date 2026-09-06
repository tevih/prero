import { describe, expect, it } from 'vitest';

import { projects } from '../../src/data/work';
import {
	bio,
	credentials,
	experience,
	links,
	nav,
	origin,
	press,
	services,
	site,
	skills,
	testimonials,
} from '../../src/data/site';
import { guide, intro, note, outro, tips } from '../../src/data/guide';

describe('site metadata', () => {
	it('has a well-formed email and phone that agree with each other', () => {
		expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
		expect(site.phoneHref).toBe(`+1${site.phone.replace(/\D/g, '')}`);
	});

	it('exposes every nav entry as a root-relative directory URL', () => {
		for (const item of nav) {
			expect(item.href, `${item.label} href`).toMatch(/^\/([a-z0-9-]+\/)?$/);
			expect(item.label.trim()).not.toBe('');
		}
	});

	it('has no duplicate nav labels or hrefs', () => {
		expect(new Set(nav.map((n) => n.href)).size).toBe(nav.length);
		expect(new Set(nav.map((n) => n.label)).size).toBe(nav.length);
	});
});

describe('projects', () => {
	it('still carries every project migrated from the source site', () => {
		// 17 came across in the migration; adding more is fine, losing one is not.
		expect(projects.length).toBeGreaterThanOrEqual(17);
	});

	it('gives every project a title, client, discipline and image', () => {
		for (const project of projects) {
			expect(project.title.trim(), 'title').not.toBe('');
			expect(project.client.trim(), `${project.title} client`).not.toBe('');
			expect(project.discipline.trim(), `${project.title} discipline`).not.toBe('');
			expect(project.image, `${project.title} image`).toBeDefined();
		}
	});

	it('resolves every image to real dimensions through the asset pipeline', () => {
		for (const project of projects) {
			expect(project.image.width, `${project.title} width`).toBeGreaterThan(0);
			expect(project.image.height, `${project.title} height`).toBeGreaterThan(0);
			expect(project.image.src, `${project.title} src`).toBeTruthy();
		}
	});

	it('has no duplicate titles or reused images', () => {
		expect(new Set(projects.map((p) => p.title)).size).toBe(projects.length);
		expect(new Set(projects.map((p) => p.image.src)).size).toBe(projects.length);
	});
});

describe('bio content', () => {
	it('keeps the biography, services, experience and credentials populated', () => {
		expect(bio.length).toBeGreaterThanOrEqual(2);
		expect(services.length).toBeGreaterThanOrEqual(1);
		expect(experience.length).toBeGreaterThanOrEqual(1);
		expect(credentials.length).toBeGreaterThanOrEqual(1);
		expect(testimonials.length).toBeGreaterThanOrEqual(1);
	});

	it('attributes every testimonial to a named person with a title', () => {
		for (const t of testimonials) {
			expect(t.quote.length, `${t.name} quote`).toBeGreaterThan(40);
			expect(t.name.trim(), 'name').not.toBe('');
			expect(t.title.trim(), `${t.name} title`).not.toBe('');
		}
	});

	it('points every outbound link at an absolute http(s) URL', () => {
		for (const link of [...links, ...press]) {
			expect(link.href, `${link.label} href`).toMatch(/^https?:\/\//);
		}
	});

	it('ends the skills list on the Night Vision gag so the punchline lands', () => {
		expect(skills.at(-1)).toBe('Night Vision');
	});

	it('has no duplicate services or skills', () => {
		expect(new Set(services).size).toBe(services.length);
		expect(new Set(skills).size).toBe(skills.length);
	});
});

describe('origin story', () => {
	it('marks exactly one accented word, and that word appears in its line', () => {
		const accented = origin.filter((line) => line.accent);
		expect(accented).toHaveLength(1);
		expect(accented[0].text).toContain(accented[0].accent!);
	});

	it('reserves the accent for the thesis of the whole site', () => {
		expect(accentWord()).toBe('better');
	});

	function accentWord() {
		return origin.find((l) => l.accent)?.accent;
	}
});

describe('supporting MDD guide', () => {
	it('has tips with unique titles', () => {
		expect(tips.length).toBeGreaterThanOrEqual(1);
		expect(new Set(tips.map((t) => t.title)).size).toBe(tips.length);
	});

	it('gives every tip at least one block of content', () => {
		for (const tip of tips) {
			expect(tip.blocks.length, `${tip.title} blocks`).toBeGreaterThan(0);
			for (const block of tip.blocks) {
				if (block.type === 'list') {
					expect(block.items?.length, `${tip.title} list`).toBeGreaterThan(0);
				} else {
					expect(block.text?.trim(), `${tip.title} paragraph`).not.toBe('');
				}
			}
		}
	});

	it('keeps the preface, disclaimer and closing intact', () => {
		expect(intro.length).toBeGreaterThanOrEqual(10);
		expect(note).toContain('I am not a mental health professional');
		expect(outro.length).toBeGreaterThanOrEqual(3);
		expect(guide.title).toContain('For Dummies');
		expect(guide.version).toMatch(/^Version \d+\.\d+$/);
	});
});

describe('typography hygiene', () => {
	const strings = [
		...origin.map((o) => o.text),
		...bio,
		...services,
		...credentials,
		...testimonials.map((t) => t.quote),
		...tips.flatMap((t) => t.blocks.map((b) => b.text ?? (b.items ?? []).join(' '))),
	];

	it('uses typographic quotes and apostrophes, never straight ones', () => {
		const offenders = strings.filter((s) => /['"]/.test(s));
		expect(offenders, `straight quotes in: ${offenders.slice(0, 3).join(' | ')}`).toHaveLength(0);
	});

	it('leaves no double spaces or stray whitespace', () => {
		for (const s of strings) {
			expect(s, 'double space').not.toMatch(/ {2}/);
			expect(s).toBe(s.trim());
		}
	});
});

describe('project detail copy', () => {
	it('has narrative copy for every project', async () => {
		const { descriptions } = await import('../../src/data/descriptions');
		const { projects } = await import('../../src/data/work');
		for (const project of projects) {
			const blocks = descriptions[project.slug];
			expect(blocks, `${project.slug} copy`).toBeDefined();
			expect(blocks.length, `${project.slug} blocks`).toBeGreaterThan(0);
		}
	});

	it('never leaves a sentence dangling where an inline link was dropped', async () => {
		const { descriptions } = await import('../../src/data/descriptions');
		for (const [slug, blocks] of Object.entries(descriptions)) {
			for (const block of blocks) {
				const texts = block.type === 'list' ? (block.items ?? []) : [block.text ?? ''];
				for (const text of texts) {
					expect(text, `${slug} ends mid-sentence: "${text.slice(-60)}"`).toMatch(
						/[.!?”"')\]]$/,
					);
				}
			}
		}
	});

	it('points every live product site at an absolute URL', async () => {
		const { projectSites } = await import('../../src/data/descriptions');
		for (const [slug, href] of Object.entries(projectSites)) {
			expect(href, `${slug} site`).toMatch(/^https?:\/\//);
		}
	});
});
