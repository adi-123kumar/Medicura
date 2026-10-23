import { indiaCollegeProfiles } from './india';
import { abroadCollegeProfiles } from './abroad';
import { mdmsCollegeProfiles } from './mdms';
import { normalizeCollege } from './normalize';

const slugify = (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Different colleges can share a name in different cities; make every URL unique.
function build(list, category) {
  const seen = new Set();
  return list
    .map((raw) => {
      let slug = raw.slug;
      if (seen.has(slug)) slug = `${raw.slug}-${slugify(raw.city || 'campus')}`;
      let n = 2;
      while (seen.has(slug)) slug = `${raw.slug}-${slugify(raw.city || 'campus')}-${n++}`;
      seen.add(slug);
      return normalizeCollege({ ...raw, slug }, category);
    })
    .sort((a, b) => a.order - b.order);
}

export const indiaColleges = build(indiaCollegeProfiles, 'mbbs-india');
export const abroadColleges = build(abroadCollegeProfiles, 'mbbs-abroad');
export const mdmsColleges = build(mdmsCollegeProfiles, 'md-ms');

export const ALL_COLLEGES = [...indiaColleges, ...abroadColleges, ...mdmsColleges];
