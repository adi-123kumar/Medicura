import { CATEGORIES } from '../config/categories';

export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// MBBS India profiles live at /colleges/<slug>; the other categories keep their category in the URL.
export const collegeUrl = (college) =>
  college.category === 'mbbs-india' ? `/colleges/${college.slug}` : `/colleges/${college.category}/${college.slug}`;

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

/** Link to the contact form, optionally pre-filled for a college or a course. */
export function contactUrl({ college, interest } = {}) {
  const p = new URLSearchParams();
  if (college) {
    p.set('college', college.slug);
    p.set('category', college.category);
  }
  if (interest) p.set('interest', interest);
  const qs = p.toString();
  return `/contact${qs ? `?${qs}` : ''}#inquiry`;
}
