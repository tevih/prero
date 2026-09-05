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
	title: string;
	client: string;
	image: ImageMetadata;
	discipline: string;
}

export const projects: Project[] = [
	{ title: 'Closets By Liberty', client: 'Liberty Hardware', image: closetsByLiberty, discipline: 'Home storage' },
	{ title: 'Cabinet Hardware for The Home Depot', client: 'Liberty Hardware', image: cabinetHardware, discipline: 'Hardware' },
	{ title: 'Bath Storage', client: 'HPI', image: bathStorage, discipline: 'Home organization' },
	{ title: 'Off the Wall', client: 'HPI', image: offTheWall, discipline: 'Home organization' },
	{ title: 'Project 62 Hook for Target', client: 'Liberty Hardware', image: project62Hook, discipline: 'Hardware' },
	{ title: 'Durabilt Ironing Board', client: 'HPI', image: durabilt, discipline: 'Metal forming' },
	{ title: 'Dryer Sheet Management', client: 'HPI', image: dryerSheet, discipline: 'Injection molding' },
	{ title: 'Theta', client: 'Cephius LLC', image: theta, discipline: 'Product design' },
	{ title: 'The Loop', client: 'Loft 312 Inc.', image: theLoop, discipline: 'Furniture' },
	{ title: 'TricorBraun Design', client: 'TricorBraun', image: tricorbraun, discipline: 'Packaging' },
	{ title: 'Menorahs', client: 'tag', image: menorahs, discipline: 'Home décor' },
	{ title: 'Swingline', client: 'ACCO Brands', image: swingline, discipline: 'Office supply' },
	{ title: 'Home Décor', client: 'tag', image: homeDecor, discipline: 'Ceramics' },
	{ title: 'Bamboocell', client: 'Concept', image: bamboocell, discipline: 'Sustainable design' },
	{ title: 'A+A Wayfinders', client: 'UIC', image: wayfinders, discipline: 'Environmental' },
	{ title: 'TFG Rebrand', client: 'TFG', image: tfgRebrand, discipline: 'Brand + product' },
	{ title: 'Otto-Bench', client: 'Life Fitness', image: ottoBench, discipline: 'Furniture' },
];
