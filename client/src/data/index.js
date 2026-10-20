import { indiaCollegeProfiles } from './india';
import { abroadCollegeProfiles } from './abroad';
import { mdmsCollegeProfiles } from './mdms';
import { normalizeCollege } from './normalize';

const build = (list, category) =>
  list.map((c) => normalizeCollege(c, category)).sort((a, b) => a.order - b.order);

export const indiaColleges = build(indiaCollegeProfiles, 'mbbs-india');
export const abroadColleges = build(abroadCollegeProfiles, 'mbbs-abroad');
export const mdmsColleges = build(mdmsCollegeProfiles, 'md-ms');

export const ALL_COLLEGES = [...indiaColleges, ...abroadColleges, ...mdmsColleges];
