import type { ImageMetadata } from 'astro';

import bathStorage from '../assets/work/bath-storage.jpg';
import bamboocell from '../assets/work/bamboocell.jpg';
import cabinetHardware from '../assets/work/cabinet-hardware.jpg';
import closetsByLiberty from '../assets/work/closets-by-liberty.jpg';
import dryerSheet from '../assets/work/dryer-sheet.jpg';
import durabilt from '../assets/work/durabilt.jpg';
import homeDecor from '../assets/work/home-decor.png';
import menorahs from '../assets/work/menorahs.jpg';
import offTheWall from '../assets/work/off-the-wall.jpg';
import ottoBench from '../assets/work/otto-bench.jpg';
import project62Hook from '../assets/work/project-62-hook.jpg';
import swingline from '../assets/work/swingline.jpg';
import tfgRebrand from '../assets/work/tfg-rebrand.jpg';
import theLoop from '../assets/work/the-loop.jpg';
import theta from '../assets/work/theta.jpg';
import tricorbraun from '../assets/work/tricorbraun.jpg';
import wayfinders from '../assets/work/wayfinders.jpg';

export interface Project {
	slug: string;
	title: string;
	client: string;
	image: ImageMetadata;
	discipline: string;
}

export const projects: Project[] = [
	{ slug: 'closets-by-liberty', title: 'Closets By Liberty', client: 'Liberty Hardware', image: closetsByLiberty, discipline: 'Home storage' },
	{ slug: 'cabinet-hardware', title: 'Cabinet Hardware for The Home Depot', client: 'Liberty Hardware', image: cabinetHardware, discipline: 'Hardware' },
	{ slug: 'bath-storage', title: 'Bath Storage', client: 'HPI', image: bathStorage, discipline: 'Home organization' },
	{ slug: 'off-the-wall', title: 'Off the Wall', client: 'HPI', image: offTheWall, discipline: 'Home organization' },
	{ slug: 'project-62-hook', title: 'Project 62 Hook for Target', client: 'Liberty Hardware', image: project62Hook, discipline: 'Hardware' },
	{ slug: 'durabilt', title: 'Durabilt Ironing Board', client: 'HPI', image: durabilt, discipline: 'Metal forming' },
	{ slug: 'dryer-sheet', title: 'Dryer Sheet Management', client: 'HPI', image: dryerSheet, discipline: 'Injection molding' },
	{ slug: 'theta', title: 'Theta', client: 'Cephius LLC', image: theta, discipline: 'Product design' },
	{ slug: 'the-loop', title: 'The Loop', client: 'Loft 312 Inc.', image: theLoop, discipline: 'Furniture' },
	{ slug: 'tricorbraun', title: 'TricorBraun Design', client: 'TricorBraun', image: tricorbraun, discipline: 'Packaging' },
	{ slug: 'menorahs', title: 'Menorahs', client: 'tag', image: menorahs, discipline: 'Home décor' },
	{ slug: 'swingline', title: 'Swingline', client: 'ACCO Brands', image: swingline, discipline: 'Office supply' },
	{ slug: 'home-decor', title: 'Home Décor', client: 'tag', image: homeDecor, discipline: 'Ceramics' },
	{ slug: 'bamboocell', title: 'Bamboocell', client: 'Concept', image: bamboocell, discipline: 'Sustainable design' },
	{ slug: 'wayfinders', title: 'A+A Wayfinders', client: 'UIC', image: wayfinders, discipline: 'Environmental' },
	{ slug: 'tfg-rebrand', title: 'TFG Rebrand', client: 'TFG', image: tfgRebrand, discipline: 'Brand + product' },
	{ slug: 'otto-bench', title: 'Otto-Bench', client: 'Life Fitness', image: ottoBench, discipline: 'Furniture' },
];

/** Gallery images per project, resolved from src/assets/projects/<slug>/NN.(jpg|png). */
const galleryFiles = import.meta.glob<{ default: ImageMetadata }>(
	'../assets/projects/**/*.{jpg,png}',
	{ eager: true },
);

// import.meta.glob gives no ordering guarantee, so sort on the zero-padded filenames.
const galleries = new Map<string, ImageMetadata[]>();
for (const [path, mod] of Object.entries(galleryFiles).sort(([a], [b]) => a.localeCompare(b))) {
	const slug = path.split('/').at(-2)!;
	const images = galleries.get(slug) ?? [];
	images.push(mod.default);
	galleries.set(slug, images);
}

export const galleryFor = (slug: string): ImageMetadata[] => galleries.get(slug) ?? [];

export const projectBySlug = (slug: string): Project | undefined =>
	projects.find((p) => p.slug === slug);
