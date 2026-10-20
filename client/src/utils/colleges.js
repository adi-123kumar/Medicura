import { CATEGORIES } from '../config/categories';

export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const collegeUrl = (college) => `/colleges/${college.category}/${college.slug}`;

export const findCollege = (categoryKey, slug) =>
  CATEGORIES[categoryKey]?.colleges.find((c) => c.slug === slug) || null;

/** [{ name, count }] sorted by count desc */
export function groupCounts(colleges) {
  const map = new Map();
  colleges.forEach((c) => map.set(c.group, (map.get(c.group) || 0) + 1));
  return [...map].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const sumSeats = (colleges) => colleges.reduce((n, c) => n + (c.seats || 0), 0);

export const formatNumber = (n) => new Intl.NumberFormat('en-IN').format(n);

export function categoryStats(category) {
  const list = category.colleges;
  return {
    groups: { value: groupCounts(list).length, label: category.groupLabel === 'States' ? 'States covered' : 'Countries covered' },
    colleges: { value: list.length, label: 'Colleges listed' },
    seats: { value: sumSeats(list), label: 'Seats listed' },
    government: { value: list.filter((c) => c.type === 'Government').length, label: 'Government colleges' },
  };
}

export const waLink = (number, text) => `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
